import { SITE, WORKING_HOURS } from "@/constants/site";

export const STORE_TIMEZONE = "Europe/London";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MS_MINUTE = 60 * 1000;

function getLondonParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: STORE_TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const lookup = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])
  );

  return {
    dayName: lookup.weekday,
    dayIndex: DAY_NAMES.indexOf(lookup.weekday),
    minutes: Number(lookup.hour) * 60 + Number(lookup.minute),
  };
}

function parseTime(value) {
  const text = value.trim();
  const match12 = text.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    let hours = Number(match12[1]);
    const minutes = Number(match12[2]);
    const period = match12[3].toUpperCase();

    if (period === "AM") {
      if (hours === 12) hours = 0;
    } else if (hours !== 12) {
      hours += 12;
    }

    return hours * 60 + minutes;
  }

  const match24 = text.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    return Number(match24[1]) * 60 + Number(match24[2]);
  }

  return null;
}

export function parseHoursRange(hoursText) {
  const text = hoursText.trim();

  if (!text || /^closed$/i.test(text)) {
    return { type: "closed" };
  }

  const [openText, closeText] = text.split("-").map((part) => part.trim());
  const openMinutes = parseTime(openText);
  const closeMinutes = parseTime(closeText);

  if (openMinutes === null || closeMinutes === null) {
    return { type: "closed" };
  }

  if (openMinutes === 0 && closeMinutes === 0) {
    return { type: "24hours" };
  }

  if (openMinutes === closeMinutes) {
    return { type: "closed" };
  }

  return {
    type: "range",
    openMinutes,
    closeMinutes,
    overnight: closeMinutes < openMinutes,
  };
}

function getDaySchedule(orderType, dayName) {
  const schedule = WORKING_HOURS[orderType] ?? WORKING_HOURS.collection;
  const entry = schedule.find((item) => item.day === dayName);
  if (!entry) return { type: "closed" };
  return parseHoursRange(entry.hours);
}

function isOpenAtMinutes(daySchedule, minutes) {
  if (daySchedule.type === "closed") return false;
  if (daySchedule.type === "24hours") return true;

  const { openMinutes, closeMinutes, overnight } = daySchedule;

  if (overnight) {
    return minutes >= openMinutes || minutes < closeMinutes;
  }

  return minutes >= openMinutes && minutes < closeMinutes;
}

function formatMinutes12(minutes) {
  const hours24 = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(mins).padStart(2, "0")} ${period}`;
}

function formatDuration(totalMinutes) {
  const minutes = Math.max(1, Math.round(totalMinutes));
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;

  if (hours > 0 && remainder > 0) {
    return `${hours} hr${hours === 1 ? "" : "s"} ${remainder} min`;
  }

  if (hours > 0) {
    return `${hours} hr${hours === 1 ? "" : "s"}`;
  }

  return `${remainder} min`;
}

function getNextOpenDate(orderType, fromDate = new Date()) {
  const { dayIndex, minutes } = getLondonParts(fromDate);

  for (let offset = 0; offset < 8; offset += 1) {
    const dayName = DAY_NAMES[(dayIndex + offset) % 7];
    const daySchedule = getDaySchedule(orderType, dayName);

    if (daySchedule.type === "closed") continue;

    if (daySchedule.type === "24hours") {
      const openDate = new Date(fromDate.getTime() + offset * 24 * 60 * MS_MINUTE);
      return { openDate, dayName, daySchedule };
    }

    const opensLaterToday =
      offset === 0 && minutes < daySchedule.openMinutes;

    if (opensLaterToday || offset > 0) {
      const minutesUntilMidnight = offset * 24 * 60 - minutes;
      const minutesUntilOpen =
        minutesUntilMidnight + daySchedule.openMinutes;
      const openDate = new Date(fromDate.getTime() + minutesUntilOpen * MS_MINUTE);
      return { openDate, dayName, daySchedule };
    }
  }

  return null;
}

export function getStoreAvailability(orderType = "collection", now = new Date()) {
  const { dayName, minutes } = getLondonParts(now);
  const todaySchedule = getDaySchedule(orderType, dayName);
  const isOpen = isOpenAtMinutes(todaySchedule, minutes);
  const todayHours =
    WORKING_HOURS[orderType]?.find((item) => item.day === dayName)?.hours ??
    "Closed";

  if (isOpen) {
    return {
      isOpen: true,
      orderType,
      dayName,
      todayHours,
      timezoneLabel: STORE_TIMEZONE,
      locationLabel: `${SITE.address.city}, UK`,
      statusLabel: "Open now",
      statusDetail: `Accepting ${orderType} orders until closing time today.`,
    };
  }

  const nextOpen = getNextOpenDate(orderType, now);
  const minutesUntilOpen = nextOpen
    ? Math.max(1, Math.ceil((nextOpen.openDate.getTime() - now.getTime()) / MS_MINUTE))
    : null;

  return {
    isOpen: false,
    orderType,
    dayName,
    todayHours,
    timezoneLabel: STORE_TIMEZONE,
    locationLabel: `${SITE.address.city}, UK`,
    statusLabel: "Currently unavailable",
    statusDetail: nextOpen
      ? `Opens in ${formatDuration(minutesUntilOpen)} (${formatMinutes12(nextOpen.daySchedule.openMinutes ?? 0)}${nextOpen.dayName !== dayName ? ` on ${nextOpen.dayName}` : " today"}).`
      : "Please check our working hours and try again later.",
    opensInLabel: minutesUntilOpen ? formatDuration(minutesUntilOpen) : null,
    nextOpenDay: nextOpen?.dayName ?? null,
    nextOpenTime: nextOpen
      ? formatMinutes12(nextOpen.daySchedule.openMinutes ?? 0)
      : null,
  };
}

export function isStoreOpen(orderType = "collection", now = new Date()) {
  return getStoreAvailability(orderType, now).isOpen;
}

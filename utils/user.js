export function getUserInitials(name, email) {
  const source = (name || email || "?").trim();

  if (!source) return "?";

  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  if (source.includes("@")) {
    return source.slice(0, 2).toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

export function buildUserRecord({ name, email, phone = "", authType = "login", guest = false }) {
  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    authType,
    guest: guest || authType === "guest",
    loggedInAt: new Date().toISOString(),
  };
}

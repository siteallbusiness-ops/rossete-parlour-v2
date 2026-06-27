import Image from "next/image";
import { cn } from "@/utils/cn";
import styles from "./ResponsiveImage.module.css";

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  objectFit = "cover",
  className = "",
  sizes,
  ...props
}) {
  const imageClass = cn(
    styles.image,
    fill && styles.fill,
    styles[`fit-${objectFit}`],
    className
  );

  if (fill) {
    return (
      <div className={styles.wrapper}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={imageClass}
          sizes={sizes || "100vw"}
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={imageClass}
      sizes={sizes}
      {...props}
    />
  );
}

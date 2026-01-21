"use client";

import Image from "next/image";
import { useState } from "react";

type SafeImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || "/no-image.png");

  return (
    <Image
      alt={alt}
      className={className}
      height={height}
      src={imgSrc}
      width={width}
      onError={() => setImgSrc("/no-image.png")}
    />
  );
}

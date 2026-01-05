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
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc("/no-image.png")}
    />
  );
}

"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function GalleryImage({ src, alt }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) return <span style={{ fontSize: "2rem", opacity: 0.3 }}>🎨</span>;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

import React from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: "lazy" | "eager";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  placeholderColor?: string;
}

export default function ProgressiveImage({
  src,
  alt,
  className = "",
  containerClassName = "w-full h-full",
  loading = "lazy",
  referrerPolicy = "no-referrer",
  placeholderColor = "bg-slate-800"
}: ProgressiveImageProps) {
  return (
    <div className={`relative overflow-visible ${placeholderColor} ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy={referrerPolicy}
        className={`w-full h-full object-cover opacity-100 block relative z-10 ${className}`}
      />
    </div>
  );
}

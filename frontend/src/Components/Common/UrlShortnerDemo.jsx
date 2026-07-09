import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function UrlShortnerDemo({
  className,
  originalUrl = "https://example.com",
  shortenedUrl = "https://ex.com",
}) {
  return (
    <div
      className={twMerge(
        clsx(
          "relative overflow-hidden rounded-full bg-blue-500/5 py-2 px-4 text-blue-500 font-semibold group cursor-pointer",
          className,
        ),
      )}
    >
      <p
        className={twMerge(
          clsx(
            "transition-all duration-300",
            "group-hover:-translate-y-8 group-hover:opacity-0",
          ),
        )}
      >
        {originalUrl}
      </p>

      <p
        className={twMerge(
          clsx(
            "absolute inset-0 flex items-center justify-center",
            "translate-y-8 opacity-0 transition-all duration-300",
            "group-hover:translate-y-0 group-hover:opacity-100",
          ),
        )}
      >
        {shortenedUrl}
      </p>
    </div>
  );
}

export default UrlShortnerDemo;

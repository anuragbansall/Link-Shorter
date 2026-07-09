import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function Avatar({ children, className }) {
  return (
    <div
      className={twMerge(
        clsx(
          "w-12 h-12 rounded-full border border-blue-500/10 text-blue-500 font-semibold text-2xl flex justify-center items-center bg-white/30 shrink-0",
          className,
        ),
      )}
    >
      {children}
    </div>
  );
}

export default Avatar;

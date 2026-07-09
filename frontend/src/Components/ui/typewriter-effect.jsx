"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { twMerge } from "tailwind-merge";

export function TypewriterEffect({
  words = [],
  className = "",
  cursorClassName = "",
}) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (!isInView) return;

    animate(
      "[data-char]",
      {
        opacity: 1,
        display: "inline-block",
      },
      {
        duration: 0.2,
        delay: stagger(0.05),
        ease: "easeOut",
      },
    );
  }, [isInView, animate]);

  return (
    <div
      className={twMerge(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className,
      )}
    >
      <motion.div
        ref={scope}
        className="inline-flex flex-wrap items-center gap-1"
      >
        {words.map((word, wordIndex) => (
          <div
            key={wordIndex}
            className={twMerge("inline-flex mr-2", word.className)}
          >
            {word.text.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                data-char
                initial={{
                  opacity: 0,
                  display: "none",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={twMerge(
            "inline-block h-4 w-1 rounded-sm bg-blue-500 md:h-6 lg:h-10",
            cursorClassName,
          )}
        />
      </motion.div>
    </div>
  );
}

export function TypewriterEffectSmooth({
  words = [],
  className = "",
  cursorClassName = "",
}) {
  return (
    <div
      className={twMerge("my-6 flex items-center justify-center", className)}
    >
      <motion.div
        className="overflow-hidden"
        initial={{ width: 0 }}
        whileInView={{ width: "fit-content" }}
        viewport={{ once: true }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
      >
        <div className="flex flex-wrap items-center gap-2 whitespace-nowrap text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold">
          {words.map((word, index) => (
            <span key={index} className={twMerge("mr-2", word.className)}>
              {word.text}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={twMerge(
          "ml-1 h-4 w-1 rounded-sm bg-blue-500 sm:h-6 xl:h-12",
          cursorClassName,
        )}
      />
    </div>
  );
}

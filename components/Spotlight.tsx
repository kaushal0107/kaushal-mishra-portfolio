"use client";

import { useCallback } from "react";

/**
 * Card wrapper that tracks the cursor and feeds --mx/--my to the
 * `.spotlight` gradient in globals.css.
 */
export default function Spotlight({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Tag onMouseMove={onMouseMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}

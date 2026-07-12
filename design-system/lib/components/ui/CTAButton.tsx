"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonSize } from "./Button";

export interface CTAButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Called after the confirm gradient has been shown (i.e. advance to next screen). */
  onAdvance?: () => void;
  /** How long the accent-interaction gradient is held before advancing (ms). */
  holdMs?: number;
  children?: ReactNode;
}

/**
 * Primary CTA with the confirm→advance interaction: on click the button fills
 * with the accent-interaction gradient, holds briefly, then fires onAdvance.
 * Use for confirming/advancing CTAs (초대 보내기, 저장, 이 시간으로 확정).
 */
export function CTAButton({
  size = "lg",
  fullWidth = false,
  onAdvance,
  holdMs = 950,
  className,
  children,
  disabled,
  ...rest
}: CTAButtonProps) {
  const [confirming, setConfirming] = useState(false);

  function handleClick() {
    if (confirming || disabled) return;
    setConfirming(true);
    window.setTimeout(() => {
      onAdvance?.();
      setConfirming(false);
    }, holdMs);
  }

  return (
    <button
      className={["ds-button", className].filter(Boolean).join(" ")}
      data-variant="primary"
      data-size={size}
      data-full={fullWidth ? "true" : undefined}
      data-confirming={confirming ? "true" : undefined}
      aria-busy={confirming || undefined}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

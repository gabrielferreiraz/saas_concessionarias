"use client";

import { startTransition } from "react";
import { trackLeadClick } from "@/src/actions/leads";

interface WhatsAppTrackedLinkProps {
  href: string;
  children: React.ReactNode;
  vehicleId?: string;
  className?: string;
  "aria-label"?: string;
}

export function WhatsAppTrackedLink({
  href,
  children,
  vehicleId,
  className,
  "aria-label": ariaLabel,
}: WhatsAppTrackedLinkProps) {
  const handleClick = () => {
    startTransition(() => {
      trackLeadClick(vehicleId);
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

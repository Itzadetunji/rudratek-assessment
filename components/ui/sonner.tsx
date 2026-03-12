"use client";

import type * as React from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="system"
      toastOptions={{
        classNames: {
          toast:
            "border border-border/60 bg-background/90 text-foreground backdrop-blur-md",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };

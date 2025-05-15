import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
      <HeroUIProvider>
        <ToastProvider />
        {children}</HeroUIProvider>
  );
}

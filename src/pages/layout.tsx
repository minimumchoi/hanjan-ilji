import Navigation from "@/components/Navigation";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <main className="pb-[3.75rem]">{children}</main>
      <Navigation />
    </div>
  );
}

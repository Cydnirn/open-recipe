import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Appbar from "@/components/Appbar";

export const metadata: Metadata = {
  title: "Open Recipe",
  description: "Create And Share Recipe",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className="h-20" />
      {children}
      <Appbar />
    </main>
  );
}

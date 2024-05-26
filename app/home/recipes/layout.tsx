import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Recepify - Your Recipes"
}

export default function RecipesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Recipe - Open Recipe",
  description: "Create a new recipe on Open Recipe",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function NewRecipeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-default min-h-screen h-fit w-full">
      <div className="mx-auto flex w-[95%] flex-col justify-center">
        {children}
      </div>
    </main>
  );
}

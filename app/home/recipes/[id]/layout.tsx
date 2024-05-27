export default function RecipeIdLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="mx-auto flex w-[95%] flex-col">{children}</main>;
}

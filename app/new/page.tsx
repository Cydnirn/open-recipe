import NewRecipeForm from "@/components/New/Form";
import Link from "next/link";

export default function NewRecipe() {
  return (
    <main>
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-semibold">Create New Recipe</h1>
          <Link href={"/"}>
            <div className="cursor-pointer border border-black px-2 transition-all duration-300 hover:border-red-500 hover:text-red-500">
              <p>X</p>
            </div>
          </Link>
        </div>
        <p className=" text-xs font-light">This is where you create recipe</p>
        <NewRecipeForm />
      </div>
    </main>
  );
}

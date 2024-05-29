import EditRecipeForm from "@/components/Edit/Form";
import Link from "next/link";

export default function RecipeEditId({ params }: { params: { id: string } }) {
  return (
    <main className="h-fit">
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-semibold">Edit Recipe</h1>
          <Link href={"/home/recipes"}>
            <div className="cursor-pointer border border-black px-2 transition-all duration-300 hover:border-red-500 hover:text-red-500">
              <p>X</p>
            </div>
          </Link>
        </div>
        <p className=" text-xs font-light">This is where you create recipe</p>
        <EditRecipeForm id={params.id} />
      </div>
    </main>
  );
}

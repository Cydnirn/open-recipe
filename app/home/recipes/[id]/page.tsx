import RecipeId from "@/components/RecipeId";

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <div className="mt-10 flex justify-between">
      <RecipeId id={params.id} />
    </div>
  );
}

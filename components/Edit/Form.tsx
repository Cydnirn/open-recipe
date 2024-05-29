import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import RecipeReducer from "./RecipeReducer";
import { useEffect, useState } from "react";

const client = generateClient<Schema>({ authMode: "userPool" });

export default function EditRecipeForm(props: { id: string }) {
  const { id } = props;
  const [recipe, setRecipe] = useState<Schema["Recipe"]["type"]>();

  const fetchRecipe = async () => {
    const { data } = await client.models.Recipe.get({ id });
    if (!data) return;
    setRecipe(data);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  //const Recipe = RecipeReducer(recipe);
  return (
    <div>
      <h1>Edit Recipe</h1>
    </div>
  );
}

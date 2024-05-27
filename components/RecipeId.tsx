"use client";

import { Schema } from "@/amplify/data/resource";
import { Card } from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export default function RecipeId(props: { id: string }) {
  const { id } = props;
  const [Recipe, setRecipe] = useState<Schema["Recipe"]["type"] | null>();

  const fetchRecipe = async () => {
    const { data } = await client.models.Recipe.get({ id });
    console.log(data);
    setRecipe(data);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <section className="w-full">
      {!Recipe ? (
        <p>Loading...</p>
      ) : (
        <div className="flex w-full justify-start gap-10">
          <div className="flex w-1/2 justify-center">
            <StorageImage
              path={Recipe.picture ?? ""}
              alt={Recipe.title}
              width={600}
              height={600}
              className="h-[10rem] w-full object-cover"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className=" font-bold">{Recipe.title}</h1>
              <p className="text-xs">Created By {Recipe.createdBy}</p>
            </div>
            <p>{Recipe.description}</p>
            <p className="font-semibold">Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {Recipe.ingredients &&
                Recipe.ingredients.map((ing) => (
                  <Card
                    key={ing}
                    variation="outlined"
                    className="cursor-default transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <p>{ing}</p>
                  </Card>
                ))}
            </div>
            <p className="font-semibold">Steps</p>
            <div className="flex flex-wrap gap-2">
              {Recipe.instructions &&
                Recipe.instructions.map((step) => (
                  <Card
                    key={step}
                    variation="outlined"
                    className="cursor-default transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <p>{step}</p>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

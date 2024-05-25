"use client";

import { StorageManager } from "@aws-amplify/ui-react-storage";
import AmplifyComp from "../Amplify";
import { useEffect, useState } from "react";
import { uuid as v4 } from "uuidv4";
import { Button, Card, Input } from "@aws-amplify/ui-react";

const fileProcess = async ({ file }: { file: File }, id: string) => {
  const ext = file.name.split(".").pop();
  return { file, key: `${id}.${ext}` };
};

const Ingredients = ["Tomato", "Carrot", "Chicken"];

export default function NewRecipeForm() {
  const [id, setId] = useState("");
  const [newIngredients, setNewIngredients] = useState(false);
  useEffect(() => {
    setId(v4());
  }, []);
  return (
    <AmplifyComp>
      <div className="flex w-full justify-between gap-5">
        <div className="w-1/2">
          <StorageManager
            acceptedFileTypes={["images/*"]}
            path={"recipes/images/"}
            maxFileCount={1}
            processFile={(e) => fileProcess(e, id)}
            isResumable
          />
        </div>
        <div className="flex w-1/2 flex-col items-center">
          <Card
            width={"100%"}
            height={"fit-content"}
            borderRadius={"medium"}
            className="flex flex-col gap-5"
            variation="outlined"
          >
            <h1 className="mx-auto text-2xl font-bold">Recipe Data</h1>
            <Input placeholder="Your Recipe Name" />
            <p className="font-semibold">Ingredients</p>
            {newIngredients && (
              <Input
                placeholder={`${Ingredients[Math.floor(Math.random() * Ingredients.length)]}`}
              />
            )}
            <Button
              variation="primary"
              onClick={() => setNewIngredients(!newIngredients)}
            >
              {!newIngredients ? "Add New Ingredients" : "Cancel"}
            </Button>
          </Card>
        </div>
      </div>
    </AmplifyComp>
  );
}
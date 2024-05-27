"use client";

import { StorageManager } from "@aws-amplify/ui-react-storage";
import AmplifyComp from "../Amplify";
import { FormEvent, useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  Alert,
  Button,
  Card,
  Input,
  Label,
  TextAreaField,
} from "@aws-amplify/ui-react";
import RecipeReducer from "./RecipeReducer";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import { fetchUserAttributes } from "aws-amplify/auth";

const fileProcess = async ({ file }: { file: File }, id: string) => {
  const ext = file.name.split(".").pop();
  return { file, key: `${id}.${ext}` };
};

const IngredientsPlaceholder = ["Tomato", "Carrot", "Chicken"];

const client = generateClient<Schema>({ authMode: "userPool" });

export default function NewRecipeForm() {
  const Recipe = RecipeReducer();
  const route = useRouter();

  const [error, setError] = useState("");
  const [_, setId] = useState("");
  const [newIngredients, setNewIngredients] = useState(false);
  const [newSteps, setNewSteps] = useState(false);

  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { ...Recipe.state };
    console.log(data);

    const res = await client.models.Recipe.create({
      id: data.id,
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      picture: data.picture,
      state: data.state,
      createdBy: (await fetchUserAttributes()).preferred_username ?? "",
    });
    console.log(res);
    if (res.errors) {
      return setError(res.errors[0].message);
    }
    route.replace("/");
  };

  useEffect(() => {
    const id = v4();
    setId(id);
    Recipe.updateId(id);
  }, []);
  return (
    <AmplifyComp>
      <div className="flex w-full flex-col items-center justify-between gap-5 md:flex-row md:items-start">
        <div className="h-auto w-full flex-1 md:w-1/2">
          <StorageManager
            acceptedFileTypes={["images/*"]}
            path={"recipes/images/"}
            maxFileCount={1}
            processFile={(e) => fileProcess(e, Recipe.state.id)}
            isResumable
            onUploadSuccess={(e) => {
              console.log(e);
              Recipe.updatePicture(e.key ?? "");
            }}
          />
        </div>
        <form
          className="flex w-full flex-col items-center md:w-1/2"
          onSubmit={handleSubmit}
        >
          <Card
            width={"100%"}
            height={"fit-content"}
            borderRadius={"medium"}
            className="flex flex-col gap-5"
            variation="outlined"
          >
            <h1 className="mx-auto text-2xl font-bold">Recipe Data</h1>
            <div className="flex flex-col gap-2">
              <Label htmlFor="recipe_name">Recipe Name</Label>
              <Input
                id="recipe_name"
                name="recipe_name"
                placeholder="Your Recipe Name"
                onChange={(e) => {
                  Recipe.updateName(e.currentTarget.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <TextAreaField
                descriptiveText="Describe your tasty recipe 😋"
                label="Recipe Description"
                rows={4}
                id="recipe_description"
                name="recipe_description"
                placeholder="Your Recipe Description"
                onChange={(e) => {
                  Recipe.updateDescription(e.currentTarget.value);
                }}
                required
              />
            </div>
            <p className="font-semibold">Ingredients</p>
            {!Recipe.state.ingredients.length && !newIngredients && (
              <p className="font-thin">No Ingredients Added yet</p>
            )}
            <div className="flex flex-wrap gap-2">
              {Recipe.state.ingredients.map((ing, index) => (
                <Card
                  key={ing}
                  variation="outlined"
                  onClick={() => {
                    Recipe.deleteIngredient(index);
                  }}
                  className="cursor-pointer transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
                >
                  <p>{ing}</p>
                </Card>
              ))}
            </div>
            {newIngredients && (
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Recipe.updateIngredients(e.currentTarget.value);
                    e.currentTarget.value = "";
                    setNewIngredients(false);
                  }
                }}
                onChange={(e) => setIngredients(e.currentTarget.value)}
                placeholder={`${IngredientsPlaceholder[Math.floor(Math.random() * IngredientsPlaceholder.length)]}`}
              />
            )}
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-center">
              {newIngredients && (
                <Button
                  className="md:w-1/4"
                  onClick={(e) => {
                    Recipe.updateIngredients(ingredients ?? "");
                    setIngredients("");
                    setNewIngredients(false);
                  }}
                >
                  Save
                </Button>
              )}
              <Button
                variation="primary"
                onClick={() => setNewIngredients(!newIngredients)}
                className="md:w-1/4"
              >
                {!newIngredients ? "Add New Ingredients" : "Cancel"}
              </Button>
            </div>
            <p className="font-semibold">Steps</p>
            {!steps.length && !newSteps && (
              <p className="font-thin">No Steps Added yet</p>
            )}
            {Recipe.state.instructions.map((step, index) => (
              <Card
                key={index}
                variation="outlined"
                onClick={() => {
                  Recipe.deleteStep(index);
                }}
                className="cursor-pointer transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <p>{step}</p>
              </Card>
            ))}
            {newSteps && (
              <TextAreaField
                label="Recipe Steps"
                rows={4}
                id="recipe_steps"
                name="recipe_steps"
                placeholder="Your Recipe Steps"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Recipe.updateSteps(e.currentTarget.value);
                    e.currentTarget.value = "";
                    setNewSteps(false);
                  }
                }}
                onChange={(e) => setSteps(e.currentTarget.value)}
              />
            )}
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-center">
              {newSteps && (
                <Button
                  className="md:w-1/4"
                  onClick={() => {
                    Recipe.updateSteps(steps ?? "");
                    setNewSteps(false);
                  }}
                >
                  Save
                </Button>
              )}
              <Button
                variation="primary"
                onClick={() => setNewSteps(!newSteps)}
                className="md:w-1/4"
              >
                {!newSteps ? "Add New Steps" : "Cancel"}
              </Button>
            </div>
            <Button
              variation="primary"
              type="submit"
              isDisabled={!Recipe.state.title}
            >
              Create Recipe
            </Button>
          </Card>
        </form>
      </div>
      {error && (
        <Alert
          isDismissible
          onDismiss={() => setError("")}
          variation="error"
          heading="Recipe Error"
        >
          {error}
        </Alert>
      )}
    </AmplifyComp>
  );
}

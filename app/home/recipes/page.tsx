"use client";

import { Schema } from "@/amplify/data/resource";
import AmplifyComp from "@/components/Amplify";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";

const client = generateClient<Schema>();

export default function Recipe() {
  const [recipes, setRecipes] = useState<Schema["Recipe"]["type"][]>();

  const fetchRecipes = async () => {
    const { data } = await client.models.Recipe.list({
      filter: { state: { eq: "published" }, owner: { eq: "1" } },
    });
    setRecipes(data);
  };

  return (
    <main>
      <AmplifyComp></AmplifyComp>
      <div>
        <h1>Hello World</h1>
      </div>
    </main>
  );
}

"use client";
import { Schema } from "@/amplify/data/resource";
import AmplifyComp from "@/components/Amplify";
import { IRecipe } from "@/types/Recipe.types";
import {
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
} from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export default function HomePage() {
  const [Recipes, setRecipes] = useState<Schema["Recipe"]["type"][]>();

  const fetchRecipes = async () => {
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    const { data } = await client.models.Recipe.list({
      //filter: { owner: { eq: currentUser.username } },
    });
    console.log(data);
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <main className="mt-5 h-screen w-full">
      <AmplifyComp>
        <div className="mx-auto mb-20 flex w-[95%] flex-col justify-center">
          {!Recipes ? (
            <p>Loading...</p>
          ) : (
            <Collection
              items={Recipes}
              isPaginated
              isSearchable
              searchPlaceholder="Find Recipe"
              searchFilter={(Recipe, text) =>
                (Recipe as IRecipe).title
                  .toLowerCase()
                  .startsWith(text.toLowerCase())
              }
              itemsPerPage={10}
              type={"list"}
              direction={"row"}
              wrap={"wrap"}
              className="mx-auto flex w-full justify-center"
            >
              {(item) => (
                <Link href={`/home/recipes/${item.id}`}>
                  <Card
                    key={item.id}
                    width={"20rem"}
                    height={"30rem"}
                    borderRadius={"medium"}
                    className="flex cursor-pointer flex-col gap-5 transition duration-150 hover:border-2 hover:border-red-500"
                    variation="outlined"
                  >
                    <Heading level={4}>{item.title}</Heading>
                    <StorageImage
                      path={item.picture ?? ""}
                      alt={item.title}
                      width={250}
                      height={150}
                      className="h-[10rem] w-full object-cover"
                    />
                    <Divider padding={"xs"} />
                    <Flex
                      direction={"column"}
                      className="flex-1 flex-grow"
                      justifyContent={"space-between"}
                    >
                      <p>
                        {item.description.length > 150
                          ? item.description.substring(0, 150) + "..."
                          : item.description}
                      </p>
                      <p>{item.createdBy}</p>
                    </Flex>
                  </Card>
                </Link>
              )}
            </Collection>
          )}
        </div>
      </AmplifyComp>
    </main>
  );
}

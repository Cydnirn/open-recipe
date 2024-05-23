"use client";
import Recipe, { IRecipe } from "@/data/recipe";
import {
  Card,
  Collection,
  Divider,
  Flex,
  Heading,
} from "@aws-amplify/ui-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="h-screen w-full mt-5">
      <div className="mx-auto mb-20 flex w-[95%] flex-col justify-center">
        <Collection
          items={Recipe}
          isPaginated
          isSearchable
          searchPlaceholder="Find Recipe"
          searchFilter={(Recipe, text) =>
            (Recipe as IRecipe).name
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
            <Card
              key={item.id}
              width={"20rem"}
              height={"30rem"}
              borderRadius={"medium"}
              className="flex cursor-pointer flex-col gap-5 transition duration-150 hover:border-2 hover:border-red-500"
              variation="outlined"
            >
              <Heading level={4}>{item.name}</Heading>
              <Image
                src={item.picture}
                alt={item.name}
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
          )}
        </Collection>
      </div>
    </main>
  );
}

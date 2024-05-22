"use client";
import Recipe from "@/data/recipe";
import { Card, Collection, Divider, Flex, Heading } from "@aws-amplify/ui-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <main className='w-full h-full'>
            <div className='w-[95%] mx-auto'>
                <Collection items={Recipe} type={"list"} direction={"row"}>
                    {(item) => (
                        <Card
                            key={item.id}
                            width={"20rem"}
                            height={"30rem"}
                            borderRadius={"medium"}
                            className='flex gap-5 flex-col cursor-pointer hover:border-red-500 hover:border-2 transition duration-150'
                            variation='outlined'
                        >
                            <Heading level={4}>{item.name}</Heading>
                            <Image
                                src={item.picture}
                                alt={item.name}
                                width={250}
                                height={150}
                                className='h-[10rem] w-full object-cover'
                            />
                            <Divider padding={"xs"} />
                            <Flex
                                direction={"column"}
                                className='flex-grow flex-1'
                                justifyContent={"space-between"}
                            >
                                <p>{item.description}</p>
                                <p>{item.createdBy}</p>
                            </Flex>
                        </Card>
                    )}
                </Collection>
            </div>
        </main>
    );
}

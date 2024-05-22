"use client";

import { Flex } from "@aws-amplify/ui-react";
import {
    IconDefinition,
    faBook,
    faFeatherPointed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AppbarIcon(props: {
    icon: IconDefinition;
    path: string;
    curPath: string;
}) {
    const { path, curPath, icon } = props;
    return (
        <div
            className={`${
                curPath === path ? "text-red-500" : ""
            } cursor-pointer hover:text-red-500 transition-all duration-150 hover:text-[30px]`}
        >
            <FontAwesomeIcon icon={icon} />
        </div>
    );
}

export default function Appbar() {
    const path = usePathname();
    return (
        <div className='fixed bottom-5 left-1/2 transform -translate-x-1/2 rounded-lg w-fit max-w-1/4 min-h-12 h-fit bg-default text-black flex items-center text-[25px] px-5 border border-black justify-center'>
            <Flex
                gap={15}
                alignItems={"center"}
                width={"relative.full"}
                justifyContent={"center"}
            >
                <Link href={"/"}>
                    <AppbarIcon path='/' curPath={path} icon={faBook} />
                </Link>
                <Link href={"/home/recipes"}>
                    <AppbarIcon
                        path='/home/recipes'
                        curPath={path}
                        icon={faFeatherPointed}
                    />
                </Link>
            </Flex>
        </div>
    );
}

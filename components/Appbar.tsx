"use client";

import { Flex } from "@aws-amplify/ui-react";
import {
    IconDefinition,
    faBook,
    faFeatherPointed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AppbarIcon(props: { icon: IconDefinition }) {
    const { icon } = props;
    return (
        <div className='cursor-pointer hover:text-red-500 transition-all duration-150 hover:text-[30px]'>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
}

export default function Appbar() {
    return (
        <div className='fixed bottom-5 left-1/2 transform -translate-x-1/2 rounded-lg w-fit max-w-1/4 min-h-12 h-fit bg-default text-black flex items-center text-[25px] px-5 border border-black justify-center'>
            <Flex gap={15} alignItems={"center"} width={"relative.full"} justifyContent={"center"}>
                <AppbarIcon icon={faBook} />
                <AppbarIcon icon={faFeatherPointed} />
            </Flex>
        </div>
    );
}

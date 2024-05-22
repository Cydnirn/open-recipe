import { Inter, Raleway, Lora, Pacifico } from "next/font/google";

const Rale = Raleway({ subsets: ["latin-ext"] });
const Lra = Lora({ subsets: ["latin-ext"] });
const Pacific = Pacifico({ subsets: ["latin-ext"], weight: ["400"] });
const inter = Inter({ subsets: ["latin"] });

export const font = { Rale, Lra, Pacific, inter };

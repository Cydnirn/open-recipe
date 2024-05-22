import type { Metadata } from "next";
import { font } from "./fonts";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Appbar from "@/components/Appbar";

Amplify.configure(outputs);

export const metadata: Metadata = {
    title: "Open Recipe",
    description: "Create And Share Recipe",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={font.Rale.className}>
                <Navbar />
                {children}
                <Appbar />
            </body>
        </html>
    );
}

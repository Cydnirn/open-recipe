import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import type { Metadata } from "next";
import { font } from "./fonts";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";

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
            <body className={font.Rale.className}>{children}</body>
        </html>
    );
}

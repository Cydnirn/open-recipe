import type { Metadata } from "next";
import { font } from "./fonts";
import { Amplify } from "aws-amplify";
import outputs from "../amplifyConfigure.json";

import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import AmplifyComp from "@/components/Amplify";

Amplify.configure(outputs, { ssr: true });

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
                <AmplifyComp>{children}</AmplifyComp>
            </body>
        </html>
    );
}

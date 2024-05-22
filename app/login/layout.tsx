import { Metadata } from "next"

export const metadata:Metadata = {
    title: "Login",
    description: "Login or Sign Up"
}

export default function LoginLayout({children,}:Readonly<{children:React.ReactNode}>){
    return (
        <div>
            {children}
        </div>
    )
}
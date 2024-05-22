import { Amplify } from "aws-amplify";
import config from "../amplifyConfigure.json";

Amplify.configure(config, { ssr: true });

export default function AmplifyComp({
    children
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return <>{children}</>;
}

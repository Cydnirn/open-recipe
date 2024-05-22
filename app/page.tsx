import HomeLayout from "./home/layout";
import HomePage from "./home/page";

export default function RootPage() {
    return (
        <HomeLayout>
            <HomePage />
        </HomeLayout>
    );
}

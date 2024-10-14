import { Header } from "@/components/Header";
import { Publickeyform } from "@/components/publickeys/Publickeyform";
import { Publickeytable } from "@/components/publickeys/Publickeytable";

export default function MyComponent() {
    return (
        <div>
            <Header />
            <div className="flex w-full">
                <div className="w-1/4 px-6 py-16">
                    <Publickeyform />
                </div>
                <div className="w-3/4 px-10 py-16">
                    <Publickeytable />
                </div>
            </div>
        </div>
    );
}

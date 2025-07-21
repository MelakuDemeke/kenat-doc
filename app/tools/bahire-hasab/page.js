import Head from "next/head";
import BahireHasabExample from "@/components/BahireHasabExample";

export default function BahireHasabPage() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <h1 className="text-4xl font-bold text-center my-6">Bahire Hasab - Ethiopian Movable Feasts Calculator</h1>
                <BahireHasabExample />
            </div>
        </>
    );
}

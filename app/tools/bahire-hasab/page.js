import BahireHasabExample from "@/components/BahireHasabExample";

export default function BahireHasabPage() {
    return (
        <div className="flex flex-col min-h-screen k-page">
            <header className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-12 pt-16 lg:pt-24">
                <h1 className="text-[2.6rem] sm:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
                    Bahire Hasab Calculator
                </h1>
                <p className="mt-5 max-w-2xl text-lg sm:text-xl k-muted leading-relaxed">
                    Bahire Hasab (ባሕረ ሐሳብ) is the Ethiopian Orthodox calculation of the year&apos;s movable fasts and
                    feasts. Pick an Ethiopian year to see its Evangelist, the start of Nineveh, Lent, Fasika and every
                    other movable feast.
                </p>
            </header>
            <BahireHasabExample />
        </div>
    );
}

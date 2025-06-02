export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white dark:bg-black text-black dark:text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Kenat: Ethiopian Calendar Toolkit</h1>
          <p className="text-xl mb-8">
            Convert dates, explore calendar grids, and utilize Geez numerals with ease.
          </p>
          <a
            href="/doc"
            className="bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-3 rounded shadow hover:opacity-90 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-black text-black dark:text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Kenat?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Feature title="🔄 Bidirectional Date Conversion" desc="Convert seamlessly between Ethiopian and Gregorian dates." />
            <Feature title="📅 Month Calendar Grids" desc="Generate and render accurate Ethiopian month layouts." />
            <Feature title="🔢 Geez Numerals Support" desc="Display dates in traditional Ethiopian script for cultural precision." />
            <Feature title="🕒 Ethiopian Time System" desc="Format and convert between 12-hour Geez time and 24-hour standard." />
            <Feature title="🕌 Holidays Included" desc="Supports major national, religious, and cultural holidays." />
            <Feature title="📐 Date Arithmetic" desc="Add or subtract days, months, or years with accuracy." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-black text-black dark:text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="mb-8">Dive into the documentation or contribute on GitHub.</p>
          <div className="flex justify-center space-x-4">
            <a
              href="/doc"
              className="bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-3 rounded shadow hover:opacity-90 transition"
            >
              Documentation
            </a>
            <a
              href="https://github.com/MelakuDemeke/kenat"
              className="bg-black dark:bg-white text-white dark:text-black font-semibold px-6 py-3 rounded shadow hover:opacity-90 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>

  );
}

function Feature({ title, desc }) {
  return (
    <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-black">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
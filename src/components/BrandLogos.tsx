const brands = [
  { name: "Ford", logoText: "Ford" },
  { name: "Walgreens", logoText: "Walgreens" },
  { name: "Toyota", logoText: "TOYOTA" },
  { name: "Target", logoText: "TARGET" },
  { name: "Amazon", logoText: "amazon" },
  { name: "Uber", logoText: "Uber" },
  { name: "Hilton", logoText: "Hilton" },
  { name: "Tesla", logoText: "TESLA" },
  { name: "GM", logoText: "GM" },
  { name: "The Home Depot", logoText: "THE HOME DEPOT" },
];

export function BrandLogos() {
  return (
    <section className="py-14 bg-white">
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="font-poppins text-3xl md:text-4xl font-extrabold mb-8 tracking-tight pink-cyan-text">
          Brands That Trust Us
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              <span className="font-poppins font-bold text-lg md:text-xl text-gray-700">
                {brand.logoText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

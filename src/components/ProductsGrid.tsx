import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Tablecloths",
    image: "/images/products/main%20page/tablecloths.png",
    href: "/trade-show/tablecloths",
  },
  {
    name: "Car Magnets",
    image: "/images/products/main%20page/vehicle_magnets.png",
    href: "/vehicle-signs/magnetic-signs",
  },
  {
    name: "Retractable Banners",
    image: "/images/products/main%20page/retractable_roll_up_banner.png",
    href: "/custom-banners/roll-up-banners",
  },
  {
    name: "Backdrop Banners",
    image: "/images/products/main%20page/backdrop_banners.png",
    href: "/custom-banners/step-and-repeat-banners",
  },
  {
    name: "Vinyl Decals",
    image: "/images/products/main%20page/vinyl_sticker.png",
    href: "/custom-decals/window-decals",
  },
  {
    name: "Flags",
    image: "/images/products/main%20page/flags.png",
    href: "/custom-flags/flags",
  },
  {
    name: "Fabric Banners",
    image: "/images/products/main%20page/fabric_banner.png",
    href: "/custom-banners/fabric-banners",
  },
  {
    name: "Event Tents",
    image: "/images/products/main%20page/event_tents.png",
    href: "/trade-show/custom-canopy-tents",
  },
  {
    name: "Business Cards",
    image: "/images/products/main%20page/business_cards.png",
    href: "/marketing-materials/business-cards",
  },
  {
    name: "Labels and Stickers",
    image: "/images/products/main%20page/sticker_and_labels.png",
    href: "/custom-decals/sheet-stickers",
  },
  {
    name: "Neon Sign",
    image: "/images/products/main%20page/neon_sign.jpeg",
    href: "https://neonfl.com",
  },
  {
    name: "Programmable LED Sign",
    image: "/images/products/main%20page/programmable_led_sign.jpeg",
    href: "https://led-signs.us/",
  },
];

export function ProductsGrid() {
  return (
    <section
      className="py-4 md:py-6"
      style={{
        background: "linear-gradient(160deg, #f0faff 0%, #fdf0f8 100%)",
      }}
    >
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-6 tracking-tight pink-cyan-text">
          Custom Signage, LED Signs &amp; Banners
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => {
            const isExternal = product.href.startsWith("http");
            return (
              <Link
                key={product.name}
                href={product.href}
                className="group"
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {/* Pure CSS hover via product-card-hover */}
                <div className="product-card-hover bg-white rounded-xl p-4 mb-3 aspect-square flex items-center justify-center relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                    quality={85}
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center font-bold text-gray-800 text-xs sm:text-sm md:text-base transition-all group-hover:pink-cyan-text">
                  {product.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Tablecloths",
    image: "/images/products/main-page/tablecloths-oakland-park-printing-fl.webp",
    href: "/trade-show/tablecloths",
  },
  {
    name: "Car Magnets",
    image: "/images/products/main-page/vehicle_magnets-oakland-park-printing-fl.webp",
    href: "/vehicle-signs/magnetic-signs",
  },
  {
    name: "Retractable Banners",
    image: "/images/products/main-page/retractable_roll_up_banner-oakland-park-printing-fl.webp",
    href: "/custom-banners/roll-up-banners",
  },
  {
    name: "Backdrop Banners",
    image: "/images/products/main-page/backdrop_banners-oakland-park-printing-fl.webp",
    href: "/custom-banners/step-and-repeat-banners",
  },
  {
    name: "Vinyl Decals",
    image: "/images/products/main-page/vinyl_sticker-oakland-park-printing-fl.webp",
    href: "/custom-decals/window-decals",
  },
  {
    name: "Flags",
    image: "/images/products/main-page/flags-oakland-park-printing-fl.webp",
    href: "/custom-flags/flags",
  },
  {
    name: "Fabric Banners",
    image: "/images/products/main-page/fabric_banner-oakland-park-printing-fl.webp",
    href: "/custom-banners/fabric-banners",
  },
  {
    name: "Event Tents",
    image: "/images/products/main-page/event_tents-oakland-park-printing-fl.webp",
    href: "/trade-show/custom-canopy-tents",
  },
  {
    name: "Business Cards",
    image: "/images/products/main-page/business_cards-oakland-park-printing-fl.webp",
    href: "/marketing-materials/business-cards",
  },
  {
    name: "Labels and Stickers",
    image: "/images/products/main-page/sticker_and_labels-oakland-park-printing-fl.webp",
    href: "/custom-decals/sheet-stickers",
  },
  {
    name: "Neon Sign",
    image: "/images/products/main-page/neon_sign-oakland-park-printing-fl.webp",
    href: "/neon-signs",
  },
  {
    name: "Programmable LED Sign",
    image: "/images/products/main-page/programmable_led_sign-oakland-park-printing-fl.webp",
    href: "/led-display-signs/programmable-led-sign",
  },
];

interface ProductsGridProps {
  isSpanish?: boolean;
}

export function ProductsGrid({ isSpanish = false }: ProductsGridProps = {}) {
  const displayProducts = products.map((item) => {
    if (!isSpanish) return item;
    const esMap: Record<string, { name: string; href: string }> = {
      "Tablecloths": { name: "Manteles Impresos", href: "/es/banners-y-pancartas" },
      "Car Magnets": { name: "Magnéticos de Vehículo", href: "/es/cotizacion" },
      "Retractable Banners": { name: "Banners Retráctiles", href: "/es/banners-y-pancartas" },
      "Backdrop Banners": { name: "Banners de Fondo (Backdrops)", href: "/es/banners-y-pancartas" },
      "Vinyl Decals": { name: "Vinilos para Vitrina", href: "/es/cotizacion" },
      "Flags": { name: "Banderas Publicitarias", href: "/es/banners-y-pancartas" },
      "Fabric Banners": { name: "Banners de Tela Sublimada", href: "/es/banners-y-pancartas" },
      "Event Tents": { name: "Carpas para Eventos", href: "/es/banners-y-pancartas" },
      "Business Cards": { name: "Tarjetas de Presentación", href: "/es/cotizacion" },
      "Labels and Stickers": { name: "Etiquetas y Stickers", href: "/es/cotizacion" },
      "Neon Sign": { name: "Letreros de Neón LED", href: "/es/letreros-led-y-neon" },
      "Programmable LED Sign": { name: "Pantallas LED Programables", href: "/es/letreros-led-y-neon" },
    };
    const mapped = esMap[item.name];
    return mapped ? { ...item, name: mapped.name, href: mapped.href } : item;
  });

  return (
    <section
      className="py-4 md:py-6"
      style={{
        background: "linear-gradient(160deg, #f0faff 0%, #fdf0f8 100%)",
      }}
    >
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-4 md:mb-6 tracking-tight pink-cyan-text">
          {isSpanish ? "Letreros Comerciales, Pantallas LED y Banners" : "Custom Signage, LED Signs & Banners"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {displayProducts.map((product) => {
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

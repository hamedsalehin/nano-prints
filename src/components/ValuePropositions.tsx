import Image from "next/image";
import Link from "next/link";

const valueProps = [
  {
    icon: "/icons/same-assets/593408931.svg",
    title: "Award-Winning Support",
    description:
      "Experience top-rated customer service every step of your purchase.",
    even: true,
  },
  {
    icon: "/icons/same-assets/3683589186.svg",
    title: "Tax Exempt Savings",
    description:
      "Qualify for tax exemption on eligible orders and stretch your budget even further.",
    even: false,
  },
  {
    icon: "/icons/same-assets/3064715821.svg",
    title: "Expert Design Services",
    description:
      "Our professional in-house team brings your custom sign vision to life, hassle-free.",
    even: true,
  },
  {
    icon: "/icons/same-assets/3700267247.svg",
    title: "Exclusive Corporate Pricing",
    description:
      "Secure discounted rates on bulk orders for brand consistency and cost savings.",
    link: "Learn More",
    even: false,
  },
  {
    icon: "/icons/same-assets/2316830229.svg",
    title: "100% Satisfaction Guaranteed",
    description:
      "Not completely satisfied with your product? Our customer love team will make it right.",
    even: true,
  },
  {
    icon: "/icons/same-assets/1104967888.svg",
    title: "Free Artwork Check",
    description:
      "We'll review any artwork for free so your sign design is pixel perfect.",
    even: false,
  },
];

export function ValuePropositions() {
  return (
    <section className="py-4 md:py-6 bg-[linear-gradient(160deg,#fdf0f8_0%,#f0faff_100%)]">
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="bg-white rounded-2xl p-6 flex items-start gap-4 value-card-hover shadow-sm"
            >
              {/* Icon background — alternates pink/cyan tint */}
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                  prop.even
                    ? "bg-[linear-gradient(135deg,rgba(255,45,120,0.12),rgba(176,32,255,0.08))]"
                    : "bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(176,32,255,0.08))]"
                }`}
              >
                <Image
                  src={prop.icon}
                  alt={prop.title}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-sm sm:text-base text-gray-900 mb-1">
                  {prop.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {prop.description}
                  {prop.link && (
                    <>
                      {" "}
                      <Link
                        href="/contact-us"
                        className="font-semibold hover:underline text-[#ff2d78]"
                        aria-label={`${prop.link} about ${prop.title}`}
                      >
                        {prop.link}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

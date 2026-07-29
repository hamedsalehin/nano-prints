import Image from "next/image";

export function ExpertsSection() {
  return (
    <section className="py-6 md:py-10 relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/experts_section_image.jpeg"
          alt="Local print shop and custom signage facility"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        {/* Logo-inspired pink/cyan tinted overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,45,120,0.65)_0%,rgba(0,0,0,0.5)_50%,rgba(0,229,255,0.5)_100%)]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        <div
          className="rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center bg-[rgba(255,255,255,0.97)] shadow-[0_0_40px_rgba(255,45,120,0.25),0_0_80px_rgba(0,229,255,0.12)]"
        >
          <h2 className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Premium Custom Signage, LED Signs &amp; Banners in Fort Lauderdale
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
            Welcome to Nano Signs, the print shop with the fastest turnaround times in Broward.
            Whether you want to design and order online or visit us in person, we are your
            premier source for custom signs, LED signs, retractable banners, business cards,
            and all other marketing materials. Serving Fort Lauderdale, Fort Lauderdale, and the
            wider Broward County area, our custom print and design experts ensure fast, professional
            production to elevate your brand presence.
          </p>
          <a
            href="tel:305-967-1005"
            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 font-bold rounded-full text-white transition-all duration-300 hover:scale-105 hover:opacity-90 bg-[linear-gradient(135deg,#ff2d78,#00e5ff)] shadow-[0_0_20px_rgba(255,45,120,0.45),0_0_40px_rgba(0,229,255,0.2)]"
          >
            Call for a Sign Quote: 305-967-1005
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

function Pinterest(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.436 2.981 7.436 6.963 0 4.156-2.618 7.502-6.257 7.502-1.221 0-2.37-.635-2.763-1.385l-.754 2.875c-.272 1.037-1.01 2.336-1.506 3.125 1.185.363 2.449.559 3.761.559 6.621 0 11.988-5.368 11.988-11.988C24.035 5.367 18.638 0 12.017 0z"/>
    </svg>
  );
}

const footerLinks = {
  helpCenter: {
    title: "Help Center",
    links: [
      { name: "Contact Us", href: "/contact-us" },
      { name: "Frequently Asked Questions", href: "/faq" },
      { name: "Corporate Pricing", href: "/corporate-pricing" },
      { name: "Get a Quote", href: "/get-a-quote" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Locations", href: "/locations" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
    ],
  },
  products: {
    title: "Products",
    links: [
      { name: "Custom Signs", href: "/custom-signs" },
      { name: "Programmable LED Signs", href: "/custom-signs/programmable-led-sign" },
      { name: "Neon Signs", href: "/neon-signs" },
      { name: "Roll Up Banners", href: "/custom-banners/roll-up-banners" },
      { name: "Vehicle Signs", href: "/vehicle-signs" },
      { name: "Decals", href: "/custom-decals" },
    ],
  },
};

const paymentMethods = [
  {
    name: "Mastercard",
    icon: "https://ext.same-assets.com/1114826555/2789702158.svg",
  },
  {
    name: "Visa",
    icon: "https://ext.same-assets.com/1114826555/794747697.svg",
  },
  {
    name: "Discover",
    icon: "https://ext.same-assets.com/1114826555/3085012672.svg",
  },
  {
    name: "PayPal",
    icon: "https://ext.same-assets.com/1114826555/4065183383.svg",
  },
];

const bottomLinks = [
  { name: "Return Policy", href: "/return-policy" },
];

const socialIcons = [
  { Icon: Facebook, name: "Facebook", href: "https://facebook.com/signsnano" },
  { Icon: Instagram, name: "Instagram", href: "https://instagram.com/nanosigns" },
  { Icon: Linkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/nano-signs" },
  { Icon: Pinterest, name: "Pinterest", href: "https://www.pinterest.com/nanosigns" },
  { Icon: Youtube, name: "YouTube", href: "https://www.youtube.com/@NanoSignsPrint" },
  { Icon: Twitter, name: "X", href: "https://x.com/nanosigns1" },
];

export function Footer({ light = false }: { light?: boolean } = {}) {
  return (
    <footer
      className={light ? "text-slate-600 bg-slate-50 border-t border-gray-200" : "text-white"}
      style={
        light
          ? undefined
          : {
              background:
                "linear-gradient(160deg, #0d0d1a 0%, #130a1f 50%, #001a22 100%)",
            }
      }
    >
      {/* Top gradient accent line */}
      {!light && (
        <div
          className="h-1 w-full bg-[linear-gradient(90deg,#ff2d78_0%,#b020ff_50%,#00e5ff_100%)]"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and Contact */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/nano logo complete.png"
                alt="Nano Signs"
                width={160}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className={`text-sm mb-6 leading-relaxed ${light ? "text-slate-500" : "text-gray-400"}`}>
              Your trusted custom printing expert in Fort Lauderdale, FL. Quality
              signs, banners, and more.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:305-967-1005"
                className={`flex items-center gap-2 transition-colors ${light ? "text-slate-600 hover:text-[#ff2d78]" : "text-gray-300 hover:text-[#ff2d78]"}`}
              >
                <Phone
                  className="w-4 h-4 flex-shrink-0 text-[#ff2d78]"
                />
                <span>305-967-1005</span>
              </a>
              <a
                href="tel:305-967-9654"
                className={`flex items-center gap-2 transition-colors ${light ? "text-slate-600 hover:text-[#ff2d78]" : "text-gray-300 hover:text-[#ff2d78]"}`}
              >
                <Phone
                  className="w-4 h-4 flex-shrink-0 text-[#ff2d78]"
                />
                <span>305-967-9654</span>
              </a>
              <a
                href="mailto:info@nano-signs.com"
                className={`flex items-center gap-2 transition-colors ${light ? "text-slate-600 hover:text-[#ff2d78]" : "text-gray-300 hover:text-[#00e5ff]"}`}
              >
                <Mail
                  className={`w-4 h-4 flex-shrink-0 ${light ? "text-[#ff2d78]" : "text-[#00e5ff]"}`}
                />
                <span>Email Support</span>
              </a>
              <div className={`flex items-start gap-2 ${light ? "text-slate-600" : "text-gray-300"}`}>
                <MapPin
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${light ? "text-[#ff2d78]" : "text-[#00e5ff]"}`}
                />
                <span>4567 Powerline Rd, Fort Lauderdale, FL 33309</span>
              </div>
            </div>

            {/* Social icons — pure CSS hover via .social-icon-hover */}
            <div className="flex gap-3">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  className={`social-icon-hover p-2 rounded-full ${light ? "bg-slate-200 border border-slate-350" : ""}`}
                  aria-label={social.name}
                >
                  <social.Icon className={`w-5 h-5 ${light ? "text-slate-600 hover:text-white" : ""}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Help Center */}
          <div>
            <h3 className={`font-poppins font-bold mb-4 ${light ? "text-slate-800" : "pink-cyan-text"}`}>
              {footerLinks.helpCenter.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.helpCenter.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-colors text-sm ${light ? "text-slate-500 hover:text-[#ff2d78]" : "text-gray-400 hover:text-[#00e5ff]"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`font-poppins font-bold mb-4 ${light ? "text-slate-800" : "pink-cyan-text"}`}>
              {footerLinks.company.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-colors text-sm ${light ? "text-slate-500 hover:text-[#ff2d78]" : "text-gray-400 hover:text-[#00e5ff]"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className={`font-poppins font-bold mb-4 ${light ? "text-slate-800" : "pink-cyan-text"}`}>
              {footerLinks.products.title}
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-colors text-sm ${light ? "text-slate-500 hover:text-[#ff2d78]" : "text-gray-400 hover:text-[#00e5ff]"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className={`text-sm mb-2 ${light ? "text-slate-400" : "text-gray-500"}`}>We accept:</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <img
                    key={method.name}
                    src={method.icon}
                    alt={method.name}
                    width={38}
                    height={24}
                    className="h-6 bg-white rounded px-1 border border-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* City Business License & Authority Trust Banner */}
        <div className={`mt-8 p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-opensans ${light ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-gray-900/60 border-gray-800 text-gray-300"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-[#ff2d78] shrink-0 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-900">City of Oakland Park Licensed &amp; Registered Business</p>
              <p className="text-slate-500 font-medium">Licensed Commercial Sign Contractor &amp; Print Fabricator • Broward County, FL</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-extrabold shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 border border-green-200 rounded-xl shadow-xs">
              ✓ Oakland Park City License
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl shadow-xs">
              ✓ Fully Insured &amp; Certified
            </span>
          </div>
        </div>

        {/* Google Maps Location Embed */}
        <div className={`mt-12 rounded-2xl overflow-hidden shadow-lg h-[250px] w-full border ${light ? "border-slate-200" : "border-gray-800"}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d7160.8801455159755!2d-80.15735434976504!3d26.182359067699164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x88d903da421a5ec5%3A0xdd627ecbac01c685!2s4567%20Powerline%20Rd%2C%20Fort%20Lauderdale%2C%20FL%2033309!3m2!1d26.1835062!2d-80.1554943!5e0!3m2!1sen!2sus!4v1781380571760!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nano Signs Location"
          ></iframe>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={light ? "border-t border-slate-200" : "border-t border-[rgba(255,45,120,0.2)]"}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              {bottomLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors text-sm ${light ? "text-slate-400 hover:text-[#ff2d78]" : "text-gray-500 hover:text-[#ff2d78]"}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <p className={`text-sm ${light ? "text-slate-400" : "text-gray-600"}`}>
              © 2020 – {new Date().getFullYear()} Nano Signs. All rights reserved. | Serving Fort Lauderdale &amp; Broward County Since 2020.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

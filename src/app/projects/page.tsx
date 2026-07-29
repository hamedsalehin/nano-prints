import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { MapPin, ArrowRight, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign & Print shop Portfolio Fort Lauderdale FL | Nano Signs",
  description:
    "Explore Nano Signs' portfolio of completed custom business signs, LED displays, neon led signs, large format banner printing & vehicle wraps in Fort Lauderdale .",
  alternates: { canonical: "https://nano-signs.com/projects" },
  openGraph: {
    title: "Sign & Print shop Portfolio Fort Lauderdale FL | Nano Signs",
    description:
      "Explore Nano Signs' portfolio of completed custom business signs, LED displays, neon led signs, large format banner printing & vehicle wraps in Fort Lauderdale .",
    url: "https://nano-signs.com/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign & Print shop Portfolio Fort Lauderdale FL | Nano Signs",
    description:
      "Explore Nano Signs' portfolio of completed custom business signs, LED displays, neon led signs, large format banner printing & vehicle wraps in Fort Lauderdale .",
  },
};

const projects = [
  {
    "id": 1,
    "title": "Custom Logo Neon",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Logo Neon",
    "image": "/images/projects/gallery/project-1.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 2,
    "title": "Fully Customizable led neon",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Fully Customizable led neon",
    "image": "/images/projects/gallery/project-2.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 3,
    "title": "Neon LED",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Neon LED",
    "image": "/images/projects/gallery/project-3.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 4,
    "title": "happy birthday Neon LED",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "happy birthday Neon LED",
    "image": "/images/projects/gallery/project-4.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 5,
    "title": "Neon sign with transparent background",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Neon sign with transparent background",
    "image": "/images/projects/gallery/project-5.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 6,
    "title": "Coroplast Signs(10mm)",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Coroplast Signs(10mm)",
    "image": "/images/projects/gallery/project-6.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 7,
    "title": "Coroplast Signs(yard sign)",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Coroplast Signs(yard sign)",
    "image": "/images/projects/gallery/project-7.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 8,
    "title": "Channel letter & Menue signage",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Channel letter & Menue signage",
    "image": "/images/projects/gallery/project-8.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 9,
    "title": "Vinyl Banner&Coroplast sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Vinyl Banner&Coroplast sign",
    "image": "/images/projects/gallery/project-9.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 10,
    "title": "Neon LED &Window Decale",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Neon LED &Window Decale",
    "image": "/images/projects/gallery/project-10.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 11,
    "title": "Channel letter Sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Channel letter Sign",
    "image": "/images/projects/gallery/project-11.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 12,
    "title": "channel letter illuminated",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "channel letter illuminated",
    "image": "/images/projects/gallery/project-12.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 13,
    "title": "Channel letter Lighting",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Channel letter Lighting",
    "image": "/images/projects/gallery/project-13.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 14,
    "title": "Canvas Printing",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Canvas Printing",
    "image": "/images/projects/gallery/project-14.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 15,
    "title": "Canvas with Wood Frame",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Canvas with Wood Frame",
    "image": "/images/projects/gallery/project-15.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 16,
    "title": "Push Through Letter",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Push Through Letter",
    "image": "/images/projects/gallery/project-16.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 17,
    "title": "Push Through signage",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Push Through signage",
    "image": "/images/projects/gallery/project-17.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 18,
    "title": "Custom Hoodies printing",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Hoodies printing",
    "image": "/images/projects/gallery/project-18.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 19,
    "title": "Sweatshirts printing",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Sweatshirts printing",
    "image": "/images/projects/gallery/project-19.webp",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 20,
    "title": "T-shirt printing",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "T-shirt printing",
    "image": "/images/projects/gallery/project-20.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 21,
    "title": "Custom Neon Led",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Neon Led",
    "image": "/images/projects/gallery/project-21.webp",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 22,
    "title": "Custom Neon LED sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Neon LED sign",
    "image": "/images/projects/gallery/project-22.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 23,
    "title": "Custom Channel Letter",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Channel Letter",
    "image": "/images/projects/gallery/project-23.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 24,
    "title": "electric and light-up signs",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "electric and light-up signs",
    "image": "/images/projects/gallery/project-24.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 25,
    "title": "Backlite front store sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Backlite front store sign",
    "image": "/images/projects/gallery/project-25.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 26,
    "title": "installation pylon sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "installation pylon sign",
    "image": "/images/projects/gallery/project-26.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 27,
    "title": "Car Decals",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Car Decals",
    "image": "/images/projects/gallery/project-27.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 28,
    "title": "Custom Car Decals",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Car Decals",
    "image": "/images/projects/gallery/project-28.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 29,
    "title": "Car Decals",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Car Decals",
    "image": "/images/projects/gallery/project-29.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 30,
    "title": "custom metal A-frames.",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "custom metal A-frames.",
    "image": "/images/projects/gallery/project-30.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 31,
    "title": "custom metal a-frames.",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "custom metal a-frames.",
    "image": "/images/projects/gallery/project-31.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 32,
    "title": "custom metal A-frames.",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "custom metal A-frames.",
    "image": "/images/projects/gallery/project-32.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 33,
    "title": "Roll up Banner",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Roll up Banner",
    "image": "/images/projects/gallery/project-33.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 34,
    "title": "Retractable banner",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Retractable banner",
    "image": "/images/projects/gallery/project-34.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 35,
    "title": "Pull up banner",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Pull up banner",
    "image": "/images/projects/gallery/project-35.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 36,
    "title": "x-stand banner",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "x-stand banner",
    "image": "/images/projects/gallery/project-36.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 37,
    "title": "window Decale(Perforated)",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "window Decale(Perforated)",
    "image": "/images/projects/gallery/project-37.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 38,
    "title": "Installation（Pylon sign）",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Installation（Pylon sign）",
    "image": "/images/projects/gallery/project-38.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 39,
    "title": "Canvas Signs(Wood Frame)",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Canvas Signs(Wood Frame)",
    "image": "/images/projects/gallery/project-39.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 40,
    "title": "Letter acrylic",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Letter acrylic",
    "image": "/images/projects/gallery/project-40.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 41,
    "title": "backlit acrylic gold",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "backlit acrylic gold",
    "image": "/images/projects/gallery/project-41.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 42,
    "title": "illuminated signage for dental clinic",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "illuminated signage for dental clinic",
    "image": "/images/projects/gallery/project-42.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 43,
    "title": "Printing Banner Stands",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Printing Banner Stands",
    "image": "/images/projects/gallery/project-43.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 44,
    "title": "Design, print and install",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Design, print and install",
    "image": "/images/projects/gallery/project-44.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 45,
    "title": "Lightbox signage",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Lightbox signage",
    "image": "/images/projects/gallery/project-45.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 46,
    "title": "Lightbox installation for Trinacria café",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Lightbox installation for Trinacria café",
    "image": "/images/projects/gallery/project-46.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 47,
    "title": "Programmable LED Sign For cleo nail",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Programmable LED Sign For cleo nail",
    "image": "/images/projects/gallery/project-47.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 48,
    "title": "Neon LED for cleo nail",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Neon LED for cleo nail",
    "image": "/images/projects/gallery/project-48.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 49,
    "title": "illuminate cut out for canabis",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "illuminate cut out for canabis",
    "image": "/images/projects/gallery/project-49.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 50,
    "title": "Scrolling LED sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Scrolling LED sign",
    "image": "/images/projects/gallery/project-50.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 51,
    "title": "programmable lED sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "programmable lED sign",
    "image": "/images/projects/gallery/project-51.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 52,
    "title": "3D letter For hair by nicky salon",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "3D letter For hair by nicky salon",
    "image": "/images/projects/gallery/project-52.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 53,
    "title": "Neon LED For hair by nicky salon",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Neon LED For hair by nicky salon",
    "image": "/images/projects/gallery/project-53.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 54,
    "title": "Full color LED Sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Full color LED Sign",
    "image": "/images/projects/gallery/project-54.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 55,
    "title": "Halo Light signage",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Halo Light signage",
    "image": "/images/projects/gallery/project-55.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 56,
    "title": "Neon LED For cheat day restaurant",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Neon LED For cheat day restaurant",
    "image": "/images/projects/gallery/project-56.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 57,
    "title": "Custom Neon LED",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Custom Neon LED",
    "image": "/images/projects/gallery/project-57.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 58,
    "title": "Window Decal(Large format) For midass Beauty",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Window Decal(Large format) For midass Beauty",
    "image": "/images/projects/gallery/project-58.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 59,
    "title": "LED sign For middas Beauty",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "LED sign For middas Beauty",
    "image": "/images/projects/gallery/project-59.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 60,
    "title": "Window Decal",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Window Decal",
    "image": "/images/projects/gallery/project-60.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 61,
    "title": "Coroplast Sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Coroplast Sign",
    "image": "/images/projects/gallery/project-61.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 62,
    "title": "Coroplast Sign",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Coroplast Sign",
    "image": "/images/projects/gallery/project-62.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 63,
    "title": "Mesh Banner For spot exchange",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Mesh Banner For spot exchange",
    "image": "/images/projects/gallery/project-63.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  },
  {
    "id": 64,
    "title": "Mesh Banner Printing",
    "location": "Florida",
    "category": "Custom Signage",
    "description": "Mesh Banner Printing",
    "image": "/images/projects/gallery/project-64.jpg",
    "tags": [
      "Custom",
      "Signage"
    ],
    "rating": 5
  }
];

const stats = [
  { label: "Projects Completed", value: "2,500+" },
  { label: "5-Star Reviews", value: "1,100+" },
  { label: "Cities Served", value: "35+" },
  { label: "Years in Business", value: "12+" },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero */}
      <section
        className="relative text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 font-poppins">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-poppins tracking-tight mb-5">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff9a00]">
              Completed Projects
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real signage solutions delivered to real businesses across South Florida. From LED billboards to glowing neon — here's our work.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-[#ff2d78] font-poppins">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="relative w-full md:w-56 h-52 md:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 224px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-[#ff2d78] uppercase tracking-wider font-poppins mb-1">
                  {project.category}
                </span>
                <h2 className="text-base font-bold text-gray-900 font-poppins leading-snug mb-2">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {project.location}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    {Array.from({ length: project.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ff2d78] text-[#ff2d78]" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-[#ff2d78] to-[#ff6b00] rounded-3xl p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black font-poppins mb-4">
            Your Business Could Be Our Next Project
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
            Get a free quote and join hundreds of South Florida businesses who trust Nano Signs for their custom signage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-a-quote"
              className="bg-white text-[#ff2d78] font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins hover:bg-gray-100 transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/contact-us"
              className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins transition-colors border border-white/30"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

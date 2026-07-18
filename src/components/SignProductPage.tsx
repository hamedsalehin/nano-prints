"use client";

import { useState, useMemo, useEffect, ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Star,
  Info,
  Clock,
  UploadCloud,
  Loader2,
} from "lucide-react";
import { useCart } from "./CartContext";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";
import { SeoContentBlock } from "@/components/SeoContentBlock";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";

/* ─── Generic Types ─────────────────────────────── */
export interface SizeOption {
  label: string;
  value: string;
  basePrice: number;
  quantityPrices?: Record<number, number>;
}
export interface SelectOption {
  label: string;
  value: string;
  priceAdder: number;
  priceMultiplier?: number;
  description?: string;
  image?: string;
  sizePriceAdders?: Record<string, number>;
}
export interface ToggleOption {
  id: string;
  label: string;
  priceAdder: number;
  priceMultiplier?: number;
  description?: string;
  sizePriceAdders?: Record<string, number>;
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface ReviewItem {
  author: string;
  rating: number;
  text: string;
}
export interface SpecRow {
  key: string;
  value: string;
}

export interface ProductPageConfig {
  title: string;
  subtitle: string;
  breadcrumb: string;
  breadcrumbHref: string;
  promoText: string;
  image: string;
  images?: string[];
  ratingCount: string;
  ratingScore: string;
  sizes: SizeOption[];
  selects?: { label: string; options: SelectOption[] }[];
  toggleGroups?: { label: string; options: ToggleOption[] }[];
  qtyDiscount: string;
  keyFeatures: string[];
  useCases: string[];
  specs: SpecRow[];
  faqs: FaqItem[];
  reviews: ReviewItem[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  uniqueCallout?: {
    icon: ReactNode;
    heading: string;
    body: string;
    color: string;
  };
  description?: string;
  minQuantity?: number;
  quantityOptions?: number[];
  bulkDiscounts?: { minQty: number; discountPercent: number }[];
  quantityPrices?: Record<number, number>;
  id?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? "fill-[#ff2d78] text-[#ff2d78]" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function ShippingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [nextShipDate, setNextShipDate] = useState("");

  useEffect(() => {
    // Calculate next shipping date
    const today = new Date();
    const shipDate = new Date(today);

    // If it's after 5 PM, it ships the next business day
    if (today.getHours() >= 17) {
      shipDate.setDate(today.getDate() + 1);
    }

    // Adjust for weekend (Saturday=6, Sunday=0)
    while (shipDate.getDay() === 0 || shipDate.getDay() === 6) {
      shipDate.setDate(shipDate.getDate() + 1);
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    setNextShipDate(shipDate.toLocaleDateString("en-US", options));

    const timer = setInterval(() => {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setHours(17, 0, 0, 0); // 5:00 PM cutoff

      let diff = cutoff.getTime() - now.getTime();
      if (diff < 0) {
        // Cutoff passed, countdown to tomorrow's cutoff
        cutoff.setDate(cutoff.getDate() + 1);
        diff = cutoff.getTime() - now.getTime();
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-3.5 text-xs text-green-800 font-semibold flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-green-600 shrink-0 animate-pulse" />
        <span>
          Order in the next{" "}
          <span className="font-extrabold">
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        </span>
      </div>
      <div>
        Ships:{" "}
        <span className="underline font-extrabold text-green-900">
          {nextShipDate}
        </span>
      </div>
    </div>
  );
}

function RelatedProducts({ breadcrumbHref, currentTitle }: { breadcrumbHref: string, currentTitle: string }) {
  if (!breadcrumbHref) return null;
  const categorySlug = breadcrumbHref.replace(/^\//, "").split("/")[0];
  const categoryData = PRODUCTS_REGISTRY[categorySlug];
  if (!categoryData) return null;

  const related = categoryData.products
    .filter(p => p.name !== currentTitle)
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-poppins text-gray-900 text-center mb-10">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/${categorySlug}/${p.id}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 h-[320px]"
            >
              <div className="w-full h-[220px] bg-gray-50 flex items-center justify-center relative overflow-hidden p-6 border-b border-gray-100">
                <div className="w-full h-full relative z-10">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    unoptimized={p.image.startsWith("/api/")}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <h3 className="font-bold text-center text-gray-900 leading-snug group-hover:text-[#ff2d78] transition-colors">
                  {p.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DynamicProductSeo({ cfg }: { cfg: ProductPageConfig }) {
  const categoryName = cfg.breadcrumb || "Signs";
  const productName = cfg.title || "Custom Sign";
  const location = "Fort Lauderdale & Broward County";

  return (
    <section className="bg-slate-50 py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed font-opensans space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-poppins mb-4">
          Custom {productName} Printing in {location}
        </h2>
        <p>
          Elevate your brand visibility with our premium <strong>{productName}</strong>. 
          As a leading provider of custom <strong>{categoryName}</strong> in {location}, 
          Nano Signs is dedicated to delivering high-quality, durable, and visually striking signage solutions. 
          {cfg.subtitle && ` ${cfg.subtitle}`} Our state-of-the-art printing technology ensures that your {productName.toLowerCase()} will feature vibrant colors and crisp details that capture attention.
        </p>

        {cfg.description && (
          <>
            <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
              Product Overview
            </h3>
            <p className="whitespace-pre-line">
              {cfg.description}
            </p>
          </>
        )}

        <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
          Why Choose Our {productName}?
        </h3>
        <p>
          When it comes to selecting the perfect <strong>{categoryName}</strong>, quality and durability are paramount. 
          Our {productName.toLowerCase()} is specifically engineered to meet the demands of both indoor and outdoor environments. 
          {cfg.keyFeatures && cfg.keyFeatures.length > 0 && (
            ` Featuring ${cfg.keyFeatures.slice(0, 3).join(", ").toLowerCase()}, `
          )} 
          this product offers unparalleled performance. Whether you are using it for a short-term promotional event or a long-term permanent installation, you can trust that your investment will withstand the elements and continue to represent your brand professionally.
        </p>

        {cfg.useCases && cfg.useCases.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
              Ideal Applications and Use Cases
            </h3>
            <p>
              The versatility of our <strong>{productName}</strong> makes it an excellent choice for a wide variety of applications. 
              Our clients frequently utilize this product for <strong>{cfg.useCases.join(", ")}</strong>. 
              By integrating these custom {categoryName.toLowerCase()} into your marketing strategy, you can effectively communicate your message to your target audience and drive engagement.
            </p>
          </>
        )}

        {cfg.faqs && cfg.faqs.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
              Common Questions About {productName}
            </h3>
            <div className="space-y-4">
              {cfg.faqs.map((faq, idx) => (
                <div key={idx}>
                  <strong className="block text-slate-700">{faq.q}</strong>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {(categoryName.toLowerCase().includes("neon") || categoryName.toLowerCase().includes("led")) && (
          <>
            <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
              Energy-Efficient Custom LED Neon Signs
            </h3>
            <p>
              Our custom <strong>LED neon signs</strong> are the perfect alternative to traditional glass neon. 
              They provide the same mesmerizing, nostalgic glow but are crafted using modern, eco-friendly LED flex tubing. 
              This means your <strong>custom neon led signage</strong> is completely shatterproof, cool to the touch, and significantly more energy-efficient, drastically reducing your electricity costs. 
              Whether you are looking for a vibrant neon led logo for your office, a romantic neon backdrop for a wedding, or an eye-catching open sign for your storefront, our programmable and static led display signs deliver maximum brightness with zero maintenance. 
              Installation is a breeze, and every led neon sign comes equipped with a low-voltage adapter and mounting hardware, ensuring you can illuminate your space instantly and safely.
            </p>
          </>
        )}

        <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
          Fast Turnaround and Expert Support
        </h3>
        <p>
          At Nano Signs, we understand that time is often of the essence. That is why we offer rapid production times and expedited shipping options for our <strong>{productName}</strong>. 
          Our dedicated team of design and print experts is always available to assist you with file preparation, ensuring that your artwork is perfectly optimized for production. 
          Order your custom {categoryName.toLowerCase()} today and experience the difference of working with a true industry leader in custom printing.
        </p>
      </div>
    </section>
  );
}

export function SignProductPage({ cfg: rawCfg }: { cfg: ProductPageConfig }) {
  const cfg = useMemo(() => {
    const updatedSelects = [...(rawCfg.selects || [])];
    const hasTurnaround = updatedSelects.some(
      (s) => s.label.toLowerCase().includes("turnaround")
    );
    if (!hasTurnaround) {
      updatedSelects.push({
        label: "Turnaround",
        options: [
          {
            label: "Standard 4-5 business days",
            value: "standard",
            priceAdder: 0,
            priceMultiplier: 1.0,
          },
          {
            label: "Rush services 1-2 days",
            value: "rush",
            priceAdder: 0,
            priceMultiplier: 1.5,
          },
        ],
      });
    }
    return { ...rawCfg, selects: updatedSelects };
  }, [rawCfg]);

  const [selectedSize, setSelectedSize] = useState(() => cfg.sizes[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [userClickedThumbnail, setUserClickedThumbnail] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { addItem } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      setPdfError("Please sign in or create an account to upload your design.");
      setShowAuthModal(true);
      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      setPdfError("Only PDF, PNG, or JPG files are accepted.");
      return;
    }

    setPdfError(null);
    setPdfUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `designs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("designs")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("designs").getPublicUrl(filePath);

      setPdfUrl(publicUrl);
      setPdfName(file.name);
    } catch (err) {
      console.error("PDF upload failed:", err);
      setPdfError(
        err instanceof Error
          ? err.message
          : "Failed to upload design file. Please try again.",
      );
    } finally {
      setPdfUploading(false);
    }
  };

  const handleRemovePdf = () => {
    setPdfUrl(null);
    setPdfName(null);
    setPdfError(null);
  };

  const handleAddToCart = () => {
    const customOptions: Record<string, string> = {};
    Object.entries(selectValues).forEach(([k, v]) => {
      customOptions[k] = v.label;
    });
    Object.entries(toggleValues).forEach(([k, v]) => {
      customOptions[k] = v.label;
    });

    addItem({
      productTitle: cfg.title,
      size: selectedSize.label,
      quantity,
      unitPrice,
      totalPrice: Number(totalPrice),
      designUrl: pdfUrl || undefined,
      designFilename: pdfName || undefined,
      customOptions,
    });
  };

  useEffect(() => {
    setSelectedSize(cfg.sizes[0]);
    
    // Reset selects and toggles
    const newSelects: Record<string, SelectOption> = {};
    cfg.selects?.forEach((s) => {
      newSelects[s.label] = s.options[0];
    });
    setSelectValues(newSelects);

    const newToggles: Record<string, ToggleOption> = {};
    cfg.toggleGroups?.forEach((g) => {
      newToggles[g.label] = g.options[0];
    });
    setToggleValues(newToggles);

    setActiveImageIndex(0);
    setUserClickedThumbnail(false);
    const defaultMin = cfg.minQuantity || (cfg.quantityOptions ? cfg.quantityOptions[0] : 1);
    setQuantity(defaultMin);
  }, [cfg]);
  const [selectValues, setSelectValues] = useState<
    Record<string, SelectOption>
  >(() => {
    const init: Record<string, SelectOption> = {};
    cfg.selects?.forEach((s) => {
      init[s.label] = s.options[0];
    });
    return init;
  });
  const [toggleValues, setToggleValues] = useState<
    Record<string, ToggleOption>
  >(() => {
    const init: Record<string, ToggleOption> = {};
    cfg.toggleGroups?.forEach((g) => {
      init[g.label] = g.options[0];
    });
    return init;
  });
  const [quantity, setQuantity] = useState(() => cfg.minQuantity || (cfg.quantityOptions ? cfg.quantityOptions[0] : 1));
  const [activeTab, setActiveTab] = useState("overview");

  const galleryImages = useMemo(() => {
    const imagesList = cfg.images && cfg.images.length > 0 ? cfg.images : [cfg.image];
    return Array.from(new Set(imagesList.filter(Boolean)));
  }, [cfg.images, cfg.image]);

  const currentImage = useMemo(() => {
    if (userClickedThumbnail) {
      return galleryImages[activeImageIndex] || galleryImages[0] || "";
    }
    for (const val of Object.values(selectValues)) {
      if (val.image) return val.image;
    }
    return galleryImages[activeImageIndex] || galleryImages[0] || "";
  }, [selectValues, galleryImages, activeImageIndex, userClickedThumbnail]);

  const activeIndex = useMemo(() => {
    if (userClickedThumbnail) return activeImageIndex;
    const idx = galleryImages.indexOf(currentImage);
    return idx !== -1 ? idx : activeImageIndex;
  }, [userClickedThumbnail, activeImageIndex, galleryImages, currentImage]);

  const unitPrice = useMemo(() => {
    let baseUnitPrice = selectedSize.basePrice;
    const sizeQtyPrices = (selectedSize as any).quantityPrices;
    if (sizeQtyPrices && sizeQtyPrices[quantity] !== undefined) {
      baseUnitPrice = sizeQtyPrices[quantity] / quantity;
    } else if (cfg.quantityPrices && cfg.quantityPrices[quantity] !== undefined) {
      baseUnitPrice = cfg.quantityPrices[quantity] / quantity;
    }

    let price = baseUnitPrice;
    let multiplier = 1;

    Object.values(selectValues).forEach((v) => {
      const adder = (v as any).sizePriceAdders?.[selectedSize.value] ?? v.priceAdder ?? 0;
      price += adder;
      if (v.priceMultiplier !== undefined) {
        multiplier *= v.priceMultiplier;
      }
    });
    Object.values(toggleValues).forEach((v) => {
      const adder = (v as any).sizePriceAdders?.[selectedSize.value] ?? v.priceAdder ?? 0;
      price += adder;
      if (v.priceMultiplier !== undefined) {
        multiplier *= v.priceMultiplier;
      }
    });

    let discount = 1;

    console.log("CALCULATING PRICE", { baseUnitPrice, price, multiplier, selectValues, toggleValues });
    if (cfg.bulkDiscounts && cfg.bulkDiscounts.length > 0) {
      const sortedDiscounts = [...cfg.bulkDiscounts].sort((a, b) => b.minQty - a.minQty);
      const matchedDiscount = sortedDiscounts.find((d) => quantity >= d.minQty);
      if (matchedDiscount) {
        discount = (100 - matchedDiscount.discountPercent) / 100;
      }
    } else {
      discount = 1; // Strictly respect chart pricing, no hidden bulk discounts unless explicitly configured
    }

    return price * discount * multiplier;
  }, [selectedSize, selectValues, toggleValues, quantity, cfg.bulkDiscounts, cfg.quantityPrices]);

  const isBulkDiscountApplied = useMemo(() => {
    if (cfg.bulkDiscounts) {
      const minQty = Math.min(...cfg.bulkDiscounts.map((d) => d.minQty));
      return quantity >= minQty;
    }
    const sizeQtyPrices = (selectedSize as any).quantityPrices;
    if (cfg.quantityPrices || sizeQtyPrices) {
      return quantity > (cfg.quantityOptions ? cfg.quantityOptions[0] : 1);
    }
    return quantity >= 5;
  }, [cfg, selectedSize, quantity]);

  const totalPrice = (unitPrice * quantity).toFixed(2);
  const originalTotalPrice = ((unitPrice / 0.75) * quantity).toFixed(2); // 25% off display

  const customizeUrl = useMemo(() => {
    const parts = selectedSize.value.split("x");
    const pId = cfg.id || "51060";
    
    const selVals: Record<string, string> = {};
    Object.entries(selectValues).forEach(([k, v]) => {
      selVals[k] = v.value;
    });
    const selQuery = encodeURIComponent(JSON.stringify(selVals));

    if (parts.length === 2) {
      const height = parts[0];
      const width = parts[1];
      return `/PrintDesignExperience/Load?productId=${pId}&width=${width}&height=${height}&quantity=${quantity}&selects=${selQuery}`;
    }
    return `/PrintDesignExperience/Load?productId=${pId}&quantity=${quantity}&selects=${selQuery}`;
  }, [selectedSize.value, cfg.id, selectValues, quantity]);

  // Dynamic preview calculations
  const aspect = useMemo(() => {
    const dims = selectedSize.label.match(/\d+(\.\d+)?/g)?.map(Number);
    if (!dims || dims.length < 2) return 4 / 3;
    const [d1, d2] = dims;

    // Check if vertical orientation is selected in selects or toggle values
    let isVertical = false;
    const orientSelect = Object.entries(selectValues).find(([k]) =>
      k.toLowerCase().includes("orientation"),
    );
    if (
      orientSelect &&
      orientSelect[1].value.toLowerCase().includes("vertical")
    ) {
      isVertical = true;
    }
    const orientToggle = Object.entries(toggleValues).find(([k]) =>
      k.toLowerCase().includes("orientation"),
    );
    if (orientToggle && orientToggle[1].id.toLowerCase().includes("vertical")) {
      isVertical = true;
    }

    if (cfg.title.toLowerCase().includes("parking") || isVertical) {
      // Parking signs and products with selected vertical orientation are portrait
      const w = Math.min(d1, d2);
      const h = Math.max(d1, d2);
      return w / h;
    } else {
      // Most other products are landscape by default
      const w = Math.max(d1, d2);
      const h = Math.min(d1, d2);
      return w / h;
    }
  }, [selectedSize.label, cfg.title, selectValues, toggleValues]);

  const hasRoundedCorners = useMemo(() => {
    const cornerToggle = Object.entries(toggleValues).find(([k]) =>
      k.toLowerCase().includes("corner"),
    );
    if (cornerToggle && cornerToggle[1].id.toLowerCase().includes("round"))
      return true;
    const cornerSelect = Object.entries(selectValues).find(([k]) =>
      k.toLowerCase().includes("corner"),
    );
    if (cornerSelect && cornerSelect[1].value.toLowerCase().includes("round"))
      return true;
    return false;
  }, [toggleValues, selectValues]);

  const hasStakes = useMemo(() => {
    const stakeToggle = Object.entries(toggleValues).find(([k]) =>
      k.toLowerCase().includes("stake"),
    );
    if (
      stakeToggle &&
      !["none", "no_stake", "sign_only"].includes(stakeToggle[1].id)
    )
      return true;
    const stakeSelect = Object.entries(selectValues).find(([k]) =>
      k.toLowerCase().includes("stake"),
    );
    if (
      stakeSelect &&
      !["none", "no_stake", "sign_only"].includes(stakeSelect[1].value)
    )
      return true;
    return false;
  }, [toggleValues, selectValues]);

  const hasGrommets = useMemo(() => {
    const grommetToggle = Object.entries(toggleValues).find(
      ([k]) =>
        k.toLowerCase().includes("grommet") || k.toLowerCase().includes("hole"),
    );
    if (
      grommetToggle &&
      !["none", "no_grommets", "no_holes", "sign_only"].includes(
        grommetToggle[1].id,
      )
    )
      return true;
    const grommetSelect = Object.entries(selectValues).find(
      ([k]) =>
        k.toLowerCase().includes("grommet") || k.toLowerCase().includes("hole"),
    );
    if (
      grommetSelect &&
      !["none", "no_grommets", "no_holes", "sign_only"].includes(
        grommetSelect[1].value,
      )
    )
      return true;
    return false;
  }, [toggleValues, selectValues]);

  const acrylicType = useMemo(() => {
    const typeSelect = Object.entries(selectValues).find(([k]) =>
      k.toLowerCase().includes("acrylic type"),
    );
    return typeSelect ? typeSelect[1].value : "clear";
  }, [selectValues]);

  const isAFrame = cfg.title.toLowerCase().includes("a-frame");
  const frameMaterial = useMemo(() => {
    const fm = Object.entries(selectValues).find(([k]) =>
      k.toLowerCase().includes("frame material"),
    );
    return fm ? fm[1].value : "plastic";
  }, [selectValues]);

  const isRealEstate = cfg.title.toLowerCase().includes("real estate");
  const accessoryType = useMemo(() => {
    const acc = Object.entries(toggleValues).find(([k]) =>
      k.toLowerCase().includes("accessories"),
    );
    return acc ? acc[1].id : "none";
  }, [toggleValues]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b text-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-gray-500">
          <Link href="/" className="hover:text-[#ff2d78] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={cfg.breadcrumbHref}
            className="hover:text-[#ff2d78] transition-colors"
          >
            {cfg.breadcrumb}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{cfg.title}</span>
        </div>
      </div>

      {/* Promo */}
      <div
        className="text-white text-center py-2 text-sm font-bold tracking-wide"
        style={{
          background: "linear-gradient(90deg, #ff2d78, #b020ff, #00e5ff)",
        }}
      >
        {cfg.promoText}
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── LEFT ── */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2">
              {cfg.title}
            </h1>
            <p className="text-gray-500 mb-3">{cfg.subtitle}</p>
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={5} />
              <span className="text-sm text-gray-500">
                {cfg.ratingScore} / 5 ({cfg.ratingCount} Reviews)
              </span>
            </div>

            {/* Dynamic Product Visual Configurator Preview */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-square bg-slate-50 border border-slate-100 shadow-inner mb-6 rounded-2xl transition-all duration-300 cursor-zoom-in overflow-hidden"
            >
              <Image
                src={currentImage}
                alt={`${cfg.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={90}
                unoptimized={currentImage.startsWith("/api/")}
                className="object-cover"
                priority
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                     key={idx}
                     onClick={() => {
                       setActiveImageIndex(idx);
                       setUserClickedThumbnail(true);
                     }}
                     className={`w-16 h-16 rounded-lg border-2 cursor-pointer p-1 bg-gray-50 transition-all ${
                       activeIndex === idx
                         ? "border-[#ff2d78] ring-2 ring-pink-100"
                         : "border-gray-150 hover:border-gray-350"
                     }`}
                     aria-label={`View product gallery image ${idx + 1}`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img}
                        alt={`Product thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        unoptimized={img.startsWith("/api/")}
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Unique callout */}
            {cfg.uniqueCallout && (
              <div
                className={`${cfg.uniqueCallout.color} rounded-2xl p-5 mb-8 flex gap-4`}
              >
                <div className="flex-shrink-0 mt-1">
                  {cfg.uniqueCallout.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-1">
                    {cfg.uniqueCallout.heading}
                  </h3>
                  <p className="text-sm opacity-80">{cfg.uniqueCallout.body}</p>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                {
                  icon: <Truck className="w-5 h-5 text-[#ff2d78]" />,
                  t: "Next Day Ship",
                  s: "Order by 5 PM",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-[#00e5ff]" />,
                  t: "100% Guarantee",
                  s: "Love it or reprint",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5 text-[#ff2d78]" />,
                  t: "Free Proof",
                  s: "Before we print",
                },
                {
                  icon: <Star className="w-5 h-5 text-[#00e5ff]" />,
                  t: "Top Rated",
                  s: cfg.ratingScore + " stars",
                },
              ].map((b) => (
                <div
                  key={b.t}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                >
                  {b.icon}
                  <div>
                    <p className="text-xs font-bold leading-tight">{b.t}</p>
                    <p className="text-[10px] text-gray-500">{b.s}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b mb-8">
              <div className="flex overflow-x-auto">
                {["overview", "specs", "faqs", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-bold capitalize whitespace-nowrap border-b-2 -mb-px transition-colors ${activeTab === tab ? "border-[#ff2d78] text-[#ff2d78]" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                  >
                    {tab === "faqs"
                      ? "FAQs"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6">
                {cfg.description && (
                  <div
                    className="text-gray-600 text-sm leading-relaxed mb-6 font-opensans border-b border-gray-150 pb-6 space-y-4"
                    dangerouslySetInnerHTML={{ __html: cfg.description }}
                  />
                )}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {cfg.keyFeatures?.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#ff2d78] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,45,120,0.06), rgba(0,229,255,0.06))",
                    }}
                  >
                    <h3 className="font-bold mb-3">Great For</h3>
                    <div className="flex flex-wrap gap-2">
                      {cfg.useCases?.map((t) => (
                        <span
                          key={t}
                          className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="rounded-2xl border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {cfg.specs?.map((s) => (
                      <tr key={s.key} className="odd:bg-gray-50">
                        <td className="px-5 py-3 font-bold text-gray-700 w-2/5">
                          {s.key}
                        </td>
                        <td className="px-5 py-3 text-gray-600">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="space-y-4">
                {[
                  ...(cfg.faqs || []),
                  { q: "How long does shipping and production take?", a: "We offer some of the fastest turnaround times in the industry. Depending on the product, most orders are produced within 1-3 business days. Delivery times vary based on your location and the shipping method selected at checkout. Rush options are available!" },
                  { q: "Can I get a custom size or shape?", a: "Yes! We specialize in custom printing. While our website lists standard sizes, we can produce signs, banners, and decals in virtually any custom size or contour shape. Please contact us or request a custom quote." },
                  { q: "What file formats do you accept for artwork?", a: "For the highest quality print, we recommend vector files (.AI, .EPS, .SVG, or .PDF). We also accept high-resolution images (.JPG, .PNG) at 300 DPI. Our team provides a free artwork check before printing." },
                  { q: "Do you offer bulk or wholesale discounts?", a: "Absolutely. We offer competitive corporate pricing and volume discounts on large orders. The more you buy, the more you save. Please reach out to our team for bulk pricing details." },
                  { q: "Are your outdoor signs weather-resistant?", a: "Yes! Most of our outdoor signage products—including aluminum, coroplast, and outdoor vinyl banners—are fully weatherproof, UV-resistant, and designed to withstand rain, wind, and harsh sun." }
                ].map(({ q, a }, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold mb-2">{q}</h4>
                    <p className="text-gray-600 text-sm">{a}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {cfg.reviews?.map((r) => (
                  <div key={r.author} className="bg-gray-50 rounded-xl p-5">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-sm">{r.author}</span>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-gray-600 text-sm">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Configurator ── */}
          <div className="w-full lg:w-[420px] shrink-0 font-opensans">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 sticky top-6">
              {/* Price */}
              {unitPrice > 0 && (
                <div className="pb-5 border-b mb-5">
                  <div className="flex items-end gap-2.5 mb-1.5">
                    <span className="text-4xl font-extrabold text-gray-900 font-poppins">
                      ${totalPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through font-semibold mb-0.5">
                      ${originalTotalPrice}
                    </span>
                    <span className="text-red-500 font-extrabold text-sm mb-1 bg-red-50 px-2 py-0.5 rounded-full">
                      25% OFF
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-semibold">
                      ${unitPrice.toFixed(2)} each
                    </span>
                    {isBulkDiscountApplied && (
                      <span className="text-green-600 font-extrabold">
                        Bulk Discount Applied!
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Size */}
                <div>
                  <label className="block text-sm font-bold mb-2">Size</label>
                  <div className="relative">
                    <select
                      value={selectedSize.value}
                      onChange={(e) => {
                        setSelectedSize(
                          cfg.sizes.find((s) => s.value === e.target.value)!,
                        );
                        setUserClickedThumbnail(false);
                      }}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] cursor-pointer font-semibold"
                    >
                      {cfg.sizes.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Selects */}
                {cfg.selects?.map((sel) => (
                  <div key={sel.label}>
                    <label className="block text-sm font-bold mb-2">
                      {sel.label}
                    </label>
                    <div className="relative">
                      <select
                        value={selectValues[sel.label]?.value}
                        onChange={(e) => {
                          const found = sel.options.find(
                            (o) => o.value === e.target.value,
                          );
                          if (found) {
                            setSelectValues((prev) => ({
                              ...prev,
                              [sel.label]: found,
                            }));
                            setUserClickedThumbnail(false);
                          }
                        }}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] cursor-pointer font-semibold"
                      >
                        {sel.options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                            {o.priceAdder > 0 && selectedSize.basePrice > 0
                              ? ` (+$${o.priceAdder.toFixed(2)})`
                              : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {selectValues[sel.label]?.description && (
                      <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1 leading-normal">
                        <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />{" "}
                        {selectValues[sel.label].description}
                      </p>
                    )}
                    {sel.label === "Turnaround Time" && (
                      <p className="mt-1.5 text-xs text-[#ff2d78] font-bold">
                        * Contact store for same day service inquiries
                      </p>
                    )}
                  </div>
                ))}

                {/* Toggle groups */}
                {cfg.toggleGroups?.map((grp) => (
                  <div key={grp.label}>
                    <label className="block text-sm font-bold mb-2">
                      {grp.label}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {grp.options.map((o) => (
                        <button
                          key={o.id}
                          onClick={() => {
                            setToggleValues((prev) => ({
                              ...prev,
                              [grp.label]: o,
                            }));
                            setUserClickedThumbnail(false);
                          }}
                          className={`p-3 text-left rounded-xl border-2 transition-all duration-200 ${toggleValues[grp.label]?.id === o.id ? "border-[#ff2d78] bg-pink-50" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                          <span className="block text-xs font-bold text-gray-900">
                            {o.label}
                          </span>
                          {o.priceAdder > 0 && selectedSize.basePrice > 0 && (
                            <span className="text-[10px] text-gray-500 font-semibold">
                              +${o.priceAdder.toFixed(2)}
                            </span>
                          )}
                          {o.description && (
                            <span className="block text-[10px] text-gray-400 mt-0.5 leading-normal">
                              {o.description}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    {cfg.quantityOptions ? (
                      <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden px-4 py-2.5">
                        <select
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
                          className="appearance-none bg-transparent pr-7 focus:outline-none font-extrabold text-sm text-gray-900 cursor-pointer"
                        >
                          {cfg.quantityOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    ) : (
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(cfg.minQuantity || 1, quantity - 1))}
                          className="px-4 py-2.5 hover:bg-gray-100 text-lg font-bold transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          min={cfg.minQuantity || 1}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(
                                cfg.minQuantity || 1,
                                parseInt(e.target.value) || (cfg.minQuantity || 1),
                              ),
                            )
                          }
                          className="w-16 text-center bg-transparent focus:outline-none font-extrabold text-sm text-gray-900"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2.5 hover:bg-gray-100 text-lg font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}
                    <span className="text-xs text-gray-500 font-semibold">
                      {cfg.qtyDiscount}
                    </span>
                  </div>
                  {/* Qty tiers */}
                  {!cfg.quantityPrices && unitPrice > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
                      {(cfg.bulkDiscounts || [
                        { minQty: 5, discountPercent: 3 },
                        { minQty: 10, discountPercent: 6 },
                        { minQty: 25, discountPercent: 10 },
                        { minQty: 50, discountPercent: 13 },
                      ]).map((d) => (
                        <div
                          key={d.minQty}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-1.5 shadow-sm"
                        >
                          <div className="text-gray-700">{d.minQty}+</div>
                          <div className="text-green-600">{d.discountPercent}% off</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Date Countdown Widget */}
              <div className="mt-6">
                <ShippingCountdown />
              </div>

              <div className="space-y-3 mt-4">
                {unitPrice > 0 ? (
                  <>
                    {/* Upload Finished Design Button */}
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handlePdfUpload}
                        onClick={(e) => {
                          if (!user) {
                            e.preventDefault();
                            setPdfError("Please sign in or create an account to upload your design.");
                            setShowAuthModal(true);
                          }
                        }}
                        id="pdf-upload-input"
                        className="hidden"
                        disabled={pdfUploading}
                      />
                      {pdfUrl ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-green-800 font-semibold animate-in fade-in duration-300">
                          <div className="flex items-center gap-2 min-w-0">
                            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                            <span
                              className="truncate block max-w-[220px]"
                              title={pdfName || "Finished Design.pdf"}
                            >
                              {pdfName || "Finished Design.pdf"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemovePdf}
                            className="text-red-500 hover:text-red-700 underline font-bold shrink-0 ml-2 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="pdf-upload-input"
                          className="w-full cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-pink-200 hover:border-[#ff2d78] text-gray-800 bg-pink-50/10 hover:bg-pink-50/30 active:scale-[0.98] font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider font-poppins text-center"
                        >
                          {pdfUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#ff2d78]" />
                              Uploading file...
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-4 h-4 text-[#ff2d78]" />
                              Upload Your Own Finished Design (PDF, PNG, JPG)
                            </>
                          )}
                        </label>
                      )}
                      {pdfError && (
                        <p className="text-[11px] text-red-500 font-semibold mt-1 animate-in fade-in duration-250">
                          ⚠️ {pdfError}
                        </p>
                      )}
                    </div>

                    <Link
                      href={customizeUrl}
                      className="w-full block text-center active:scale-[0.98] text-white font-extrabold py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
                        boxShadow: "0 0 20px rgba(255,45,120,0.4)",
                      }}
                    >
                      Customize & Upload Artwork
                    </Link>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-extrabold py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins"
                    >
                      Add to Cart
                    </button>
                    <p className="text-center text-xs text-gray-400 font-semibold pt-1">
                      Free artwork check included with every order
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      href="/get-a-quote"
                      className="w-full flex items-center justify-center bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-extrabold py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins"
                    >
                      Request Custom Quote
                    </Link>
                    <p className="text-center text-xs text-gray-400 font-semibold pt-1">
                      Contact us for a personalized quote for your custom dimensions.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products */}
      <RelatedProducts breadcrumbHref={cfg.breadcrumbHref || ""} currentTitle={cfg.title || ""} />

      <DynamicProductSeo cfg={cfg} />
      <Footer />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200"
            aria-label="Close image preview"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <Image
              src={currentImage}
              alt={cfg.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              quality={90}
              unoptimized={currentImage.startsWith("/api/")}
              className="object-contain"
            />
          </div>
          
          {/* Subtitle */}
          <p className="text-white/80 font-poppins text-center mt-4 text-sm font-medium">
            {activeImageIndex === 0 ? cfg.title : `${cfg.title} - View ${activeImageIndex + 1}`}
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  MessageCircle,
  HelpCircle,
  Package,
  Menu,
  X,
  ChevronDown,
  Info,
  Home,
  Sparkles,
  BookOpen,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";
// productsRegistry is lazy-loaded on first search to avoid bundling 469KB into the critical path
import type { ProductsRegistryType } from "@/lib/productsRegistry";

const navItems = [
  { name: "Signs", href: "/custom-signs" },
  { name: "Banners", href: "/custom-banners" },
  { name: "Flags", href: "/custom-flags" },
  { name: "Vehicle Signs", href: "/vehicle-signs" },
  { name: "Tradeshow", href: "/trade-show" },
  { name: "Stickers & Decals", href: "/custom-decals" },
  { name: "Marketing Materials", href: "/marketing-materials" },
  { name: "Promotional Products", href: "/promotional-products" },
  { name: "Neon Signs", href: "https://neonFL.com", isExternal: true },
  {
    name: "Programmable LED Signs",
    href: "/led-display-signs",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRefDesktop = useRef<HTMLFormElement>(null);
  const searchRefMobile = useRef<HTMLFormElement>(null);
  const [registry, setRegistry] = useState<ProductsRegistryType | null>(null);
  const { user, signOut, setShowAuthModal } = useAuth();
  const { items, setCartOpen } = useCart();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({});
  const router = useRouter();

  // Eagerly (but non-blocking) load productsRegistry after first paint
  useEffect(() => {
    import("@/lib/productsRegistry").then((mod) => {
      setRegistry(mod.PRODUCTS_REGISTRY);
    });
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0 && registry) {
      const query = searchQuery.toLowerCase();
      const matched: any[] = [];
      for (const [categoryKey, categoryData] of Object.entries(registry)) {
        if (categoryData.products) {
          for (const product of categoryData.products) {
            const searchString = `${product.name} ${product.description} ${categoryKey} ${categoryData.title || ""} ${categoryData.categoryDescriptionText || ""} ${product.config?.keyFeatures?.join(" ") || ""}`.toLowerCase();
            const tokens = query.split(/\s+/).filter(Boolean);
            const isMatch = tokens.every(token => searchString.includes(token));
            
            if (isMatch) {
              matched.push({
                ...product,
                categoryHref: `/${categoryKey}`,
                href: `/${categoryKey}/${product.id}`
              });
            }
          }
        }
      }
      setSuggestions(matched.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, registry]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRefDesktop.current && !searchRefDesktop.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (searchRefMobile.current && !searchRefMobile.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileCategory = (name: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <header className="w-full">
      {/* Top utility bar — simple white */}
      <div className="bg-white border-b border-gray-150 text-gray-500 text-xs py-1.5 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-end gap-4 md:gap-6">
          <Link
            href="/PrintDesignExperience/Load"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Design Online"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Design Online</span>
          </Link>
          <Link
            href="/about-us"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="About Us"
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">About Us</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Blog"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Blog</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Projects"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </Link>
          <Link
            href="/locations"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Locations"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Locations</span>
          </Link>
          <a
            href="mailto:info@nano-signs.com"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Email support"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Email Us</span>
          </a>
          <Link
            href="/contact-us"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Contact Us"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Us</span>
          </Link>
          <a
            href="tel:305-967-1005"
            className="flex items-center gap-1.5 hover:text-[#ff2d78] transition-colors duration-200"
            aria-label="Call support at 305-967-1005"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">305-967-1005</span>
          </a>
        </div>
      </div>

      {/* Main header — white with pink/cyan search accents */}
      <div className="bg-white border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 pt-1.5 pb-1.5 md:pt-2.5 md:pb-2">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Home Button */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/nano logo complete.webp"
                  alt="Nano Signs Logo"
                  width={180}
                  height={70}
                  className="h-10 md:h-14 w-auto object-contain"
                  priority
                />
              </Link>
              <Link 
                href="/" 
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:text-[#ff2d78] hover:bg-pink-50 transition-colors border border-gray-100 shadow-sm"
                aria-label="Home"
              >
                <Home className="w-5 h-5" />
              </Link>
            </div>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <form ref={searchRefDesktop} onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim().length > 0) setShowSuggestions(true);
                  }}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#ff2d78] transition-colors duration-200"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-0 top-0 h-full px-5 rounded-r-full text-white font-semibold text-sm brand-gradient hover:opacity-90 transition-opacity"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Suggestions Dropdown Desktop */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <ul className="py-2">
                      {suggestions.map((suggestion, idx) => (
                        <li key={idx}>
                          <Link
                            href={suggestion.href}
                            onClick={(e) => e.preventDefault()}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              router.push(suggestion.href);
                              setShowSuggestions(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                          >
                            <div className="relative w-10 h-10 flex-shrink-0 bg-gray-50 rounded border border-gray-100 overflow-hidden">
                              <Image
                                src={suggestion.image}
                                alt={suggestion.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {suggestion.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {suggestion.price}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          if (searchQuery.trim()) {
                            setShowSuggestions(false);
                            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                          }
                        }}
                        className="text-xs font-bold text-[#ff2d78] hover:text-[#00e5ff] transition-colors"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* User Sign In / Account Dropdown */}
              <div className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-[#ff2d78] transition-colors duration-200"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium truncate max-w-[100px]">
                        {user.user_metadata?.full_name ||
                          user.email?.split("@")[0] ||
                          "Account"}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-white border border-pink-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 font-opensans">
                        <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 font-semibold">
                          Signed in as:
                          <div className="text-gray-900 font-bold truncate mt-0.5">
                            {user.email}
                          </div>
                        </div>
                        <Link
                          href="/account/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-[#ff2d78] font-semibold transition-colors"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-[#ff2d78] transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign In</span>
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                )}
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 text-gray-700 hover:text-[#ff2d78] transition-colors duration-200"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {items.length > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-extrabold animate-in zoom-in duration-300 bg-[linear-gradient(135deg,#ff2d78,#00e5ff)]"
                    >
                      {items.length}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                  Cart
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 text-gray-700 hover:text-[#ff2d78] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-2">
            <form ref={searchRefMobile} onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setShowSuggestions(true);
                }}
                placeholder="Search products..."
                className="w-full px-3.5 py-1.5 border border-gray-200 rounded-full text-xs focus:outline-none focus:border-[#ff2d78] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ff2d78]"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Suggestions Dropdown Mobile */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <ul className="py-1">
                    {suggestions.map((suggestion, idx) => (
                      <li key={idx}>
                          <Link
                            href={suggestion.href}
                            onClick={(e) => e.preventDefault()}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              router.push(suggestion.href);
                              setShowSuggestions(false);
                              setSearchQuery("");
                              setMobileMenuOpen(false);
                            }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors"
                        >
                          <div className="relative w-8 h-8 flex-shrink-0 bg-gray-50 rounded border border-gray-100 overflow-hidden">
                            <Image
                              src={suggestion.image}
                              alt={suggestion.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">
                              {suggestion.name}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 text-center">
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (searchQuery.trim()) {
                          setShowSuggestions(false);
                          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="text-[10px] font-bold text-[#ff2d78] hover:text-[#00e5ff] transition-colors"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Desktop Navigation — static cyan to pink gradient */}
        <nav className="hidden md:block w-full brand-gradient relative z-40">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex justify-center items-center">
              {navItems.map((item) => {
                // Determine if this item has products in the registry
                const categoryKey = item.href.replace("/", "");
                const categoryData = registry?.[categoryKey];
                const hasProducts = categoryData && categoryData.products && categoryData.products.length > 0;

                return (
                  <li
                    key={item.name}
                    className="relative text-center flex-shrink-0 group"
                  >
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative px-1.5 lg:px-2.5 xl:px-3.5 py-2 font-bold text-white hover:text-[#00e5ff] transition-colors duration-200 font-poppins text-[12px] lg:text-[14px] xl:text-[15.5px] whitespace-nowrap after:content-[''] after:absolute after:h-[3px] after:bg-[#00e5ff] after:bottom-0 after:left-0 after:w-full after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <>
                        <Link
                          href={item.href}
                          className="flex items-center gap-1 w-full h-full relative px-1.5 lg:px-2.5 xl:px-3.5 py-2 font-bold text-white hover:text-[#00e5ff] transition-colors duration-200 font-poppins text-[12px] lg:text-[14px] xl:text-[15.5px] whitespace-nowrap after:content-[''] after:absolute after:h-[3px] after:bg-[#00e5ff] after:bottom-0 after:left-0 after:w-full after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200"
                        >
                          {item.name}
                          {hasProducts && <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />}
                        </Link>
                        {/* Dropdown Menu */}
                        {hasProducts && (
                          <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform origin-top-left -translate-y-2 group-hover:translate-y-0 shadow-xl rounded-lg border border-gray-100 bg-white w-64 text-left overflow-hidden z-50">
                            <ul className="py-2 max-h-[70vh] overflow-y-auto">
                              {categoryData.products.map((product) => {
                                const bHref = product.config?.breadcrumbHref;
                                const href = !bHref
                                  ? `${item.href}/${product.id}`
                                  : bHref.endsWith(`/${product.id}`)
                                  ? bHref
                                  : `${bHref}/${product.id}`;
                                return (
                                  <li key={product.id}>
                                    <Link
                                      href={href}
                                      className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#ff2d78] hover:bg-slate-50 transition-colors duration-150"
                                    >
                                      {product.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t brand-gradient max-h-[80vh] overflow-y-auto">
            <ul className="py-2">
              {navItems.map((item) => {
                const categoryKey = item.href.replace("/", "");
                const categoryData = registry?.[categoryKey];
                const hasProducts = categoryData && categoryData.products && categoryData.products.length > 0;
                const isExpanded = expandedMobileCategories[item.name];

                return (
                  <li key={item.name} className="flex flex-col border-b border-white/10 last:border-0">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-sm font-bold text-white hover:text-[#00e5ff] hover:bg-white/10 transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex-1 block px-4 py-3 text-sm font-bold text-white hover:text-[#00e5ff] hover:bg-white/10 transition-colors"
                          >
                            {item.name}
                          </Link>
                          {(hasProducts) && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleMobileCategory(item.name);
                              }}
                              className="p-3 text-white hover:text-[#00e5ff] transition-colors"
                              aria-label={`Toggle ${item.name}`}
                            >
                              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>
                        {hasProducts && isExpanded && (
                          <ul className="bg-black/20 py-1">
                            {categoryData.products.map((product) => {
                              const bHref = product.config?.breadcrumbHref;
                              const href = !bHref
                                ? `${item.href}/${product.id}`
                                : bHref.endsWith(`/${product.id}`)
                                ? bHref
                                : `${bHref}/${product.id}`;
                              return (
                                <li key={product.id}>
                                  <Link
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-8 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                                  >
                                    {product.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}

              {/* Mobile Auth Items */}
              <li className="border-t border-white/20 mt-2 pt-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-xs text-white/60 font-semibold truncate">
                      Signed in: {user.email}
                    </div>
                    <Link
                      href="/account/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-bold text-white hover:text-[#00e5ff] hover:bg-white/10 transition-colors"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left block px-4 py-3 text-sm font-bold text-red-200 hover:bg-white/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-bold text-white hover:text-[#00e5ff] hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Promo banner — white with pink text */}
      <div className="py-1.5 text-center bg-white border-b border-pink-100">
        <p className="text-xs md:text-sm font-bold text-[#ff2d78] tracking-wide px-4 flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
          <span className="hidden md:inline">✨ Custom Printing &amp; Signage — Fast Turnaround!</span>
          <a
            href="tel:305-967-1005"
            className="hidden md:inline underline hover:no-underline hover:text-[#b020ff] transition-colors"
          >
            Call 305-967-1005
          </a>
          <span className="hidden md:inline text-gray-300 font-normal">|</span>
          {/* Desktop Version */}
          <span className="hidden md:inline text-gray-500 font-semibold">
            Can't find the product you're looking for? No worries!{" "}
            <span className="text-black font-bold">WE PRINT EVERYTHING, </span>
            <Link
              href="/get-a-quote"
              className="underline font-bold text-[#ff2d78] hover:text-[#b020ff] transition-colors"
            >
              ask for a quote
            </Link>{" "}
            and get your prices within 12 hours.
          </span>

          {/* Mobile Version */}
          <span className="inline md:hidden text-gray-500 font-semibold">
            <span className="text-black font-bold">WE PRINT EVERYTHING, </span>
            <Link
              href="/get-a-quote"
              className="underline font-bold text-[#ff2d78] hover:text-[#b020ff] transition-colors"
            >
              get your custom quote in 12 hrs
            </Link>
          </span>
        </p>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import {
  Search,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ArrowUpLeft,
  Phone,
  Mail,
  Globe,
  MapPin,
  Percent,
  DollarSign,
  Calendar,
  Clock,
  ShoppingCart,
  ShieldAlert,
  Construction,
  TriangleAlert,
  Shield,
  CheckCircle2,
  User,
  Award,
  Flame,
  Facebook,
  Instagram,
  MessageSquare,
  Star,
  Heart,
  Smile,
  ThumbsUp,
  HelpCircle,
} from "lucide-react";

// Clipart definition
export interface ClipartItem {
  id: string;
  name: string;
  category: string;
  // We can render this as a component reference
  component: React.ComponentType<{ className?: string }>;
}

const CLIPART_ITEMS: ClipartItem[] = [
  // Arrows
  { id: "arrow-up", name: "Arrow Up", category: "Arrows", component: ArrowUp },
  {
    id: "arrow-right",
    name: "Arrow Right",
    category: "Arrows",
    component: ArrowRight,
  },
  {
    id: "arrow-down",
    name: "Arrow Down",
    category: "Arrows",
    component: ArrowDown,
  },
  {
    id: "arrow-left",
    name: "Arrow Left",
    category: "Arrows",
    component: ArrowLeft,
  },
  {
    id: "arrow-up-right",
    name: "Arrow Diagonal Right",
    category: "Arrows",
    component: ArrowUpRight,
  },
  {
    id: "arrow-up-left",
    name: "Arrow Diagonal Left",
    category: "Arrows",
    component: ArrowUpLeft,
  },

  // Business & Contact
  { id: "phone", name: "Phone", category: "Business", component: Phone },
  { id: "mail", name: "Email", category: "Business", component: Mail },
  { id: "globe", name: "Website", category: "Business", component: Globe },
  {
    id: "map-pin",
    name: "Address Pin",
    category: "Business",
    component: MapPin,
  },
  {
    id: "percent",
    name: "Discount Percent",
    category: "Business",
    component: Percent,
  },
  {
    id: "dollar-sign",
    name: "Price Tag",
    category: "Business",
    component: DollarSign,
  },
  {
    id: "calendar",
    name: "Calendar Event",
    category: "Business",
    component: Calendar,
  },
  {
    id: "clock",
    name: "Business Hours",
    category: "Business",
    component: Clock,
  },
  {
    id: "shopping-cart",
    name: "Shopping Cart",
    category: "Business",
    component: ShoppingCart,
  },

  // Signs & Warnings
  {
    id: "shield-alert",
    name: "Warning Shield",
    category: "Symbols",
    component: ShieldAlert,
  },
  {
    id: "construction",
    name: "Construction Cone",
    category: "Symbols",
    component: Construction,
  },
  {
    id: "triangle-alert",
    name: "Alert Sign",
    category: "Symbols",
    component: TriangleAlert,
  },
  {
    id: "shield",
    name: "Security Shield",
    category: "Symbols",
    component: Shield,
  },
  {
    id: "check-circle",
    name: "Verified Badge",
    category: "Symbols",
    component: CheckCircle2,
  },
  { id: "user", name: "Visitor Symbol", category: "Symbols", component: User },
  { id: "award", name: "Award Medal", category: "Symbols", component: Award },
  { id: "flame", name: "Fire Danger", category: "Symbols", component: Flame },

  // Social Media
  {
    id: "facebook",
    name: "Facebook logo",
    category: "Social",
    component: Facebook,
  },
  {
    id: "instagram",
    name: "Instagram logo",
    category: "Social",
    component: Instagram,
  },
  {
    id: "message-square",
    name: "Chat bubble",
    category: "Social",
    component: MessageSquare,
  },

  // Shapes / Extras
  { id: "star", name: "Star rating", category: "Shapes", component: Star },
  { id: "heart", name: "Heart shape", category: "Shapes", component: Heart },
  { id: "smile", name: "Happy Face", category: "Shapes", component: Smile },
  {
    id: "thumbs-up",
    name: "Like Thumbs Up",
    category: "Shapes",
    component: ThumbsUp,
  },
  {
    id: "help-circle",
    name: "Question Icon",
    category: "Shapes",
    component: HelpCircle,
  },
];

const CATEGORIES = ["All", "Arrows", "Business", "Symbols", "Social", "Shapes"];

interface ClipartLibraryProps {
  onSelect: (clipart: ClipartItem) => void;
}

export function ClipartLibrary({ onSelect }: ClipartLibraryProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = CLIPART_ITEMS.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800">
      {/* Search Bar */}
      <div className="p-3 border-b border-slate-800 bg-slate-950/50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search clipart..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Categories Row */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#ff2d78] text-slate-950 shadow-sm"
                : "bg-slate-800 text-slate-300 hover:bg-slate-750"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Clipart Grid */}
      <div className="flex-grow p-4 overflow-y-auto max-h-[380px] grid grid-cols-4 gap-3 bg-slate-950/20">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const IconComponent = item.component;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                title={item.name}
                className="aspect-square bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-[#ff2d78]/50 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all group hover:scale-[1.03] active:scale-[0.98]"
              >
                <IconComponent className="w-7 h-7 text-slate-300 group-hover:text-[#ff2d78] transition-colors" />
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-full text-center group-hover:text-slate-200">
                  {item.name}
                </span>
              </button>
            );
          })
        ) : (
          <div className="col-span-4 text-center py-8 text-sm text-slate-500">
            No cliparts match your search.
          </div>
        )}
      </div>
    </div>
  );
}

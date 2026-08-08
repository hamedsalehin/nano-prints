"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Type,
  Square,
  Image as ImageIcon,
  Grid,
  Layers,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  AlertTriangle,
  ShieldCheck,
  ShoppingCart,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Check,
  Sparkles,
  HelpCircle,
  Trash2,
  Copy,
  RefreshCw,
  Upload,
  Loader2,
  Mail,
  Download,
  X,
} from "lucide-react";
import * as Icons from "lucide-react";
import { DesignCanvas, CanvasElement } from "@/components/DesignCanvas";
import { ClipartLibrary, ClipartItem } from "@/components/ClipartLibrary";
import { useAuth } from "@/components/AuthContext";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { useCart } from "@/components/CartContext";
import { supabase } from "@/lib/supabaseClient";

// Product templates
const PRESET_TEMPLATES = [
  {
    id: "for-sale",
    name: "Classic For Sale",
    elements: [
      {
        id: "sale-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#ffffff",
        borderWidth: 4,
        borderColor: "#dc2626",
      },
      {
        id: "sale-header-bg",
        type: "shape",
        x: 4,
        y: 4,
        width: 92,
        height: 26,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#dc2626",
      },
      {
        id: "sale-header-txt",
        type: "text",
        x: 10,
        y: 6,
        width: 80,
        height: 22,
        rotation: 0,
        content: "FOR SALE",
        fontFamily: "Impact",
        fontSize: 60,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "sale-info-txt",
        type: "text",
        x: 10,
        y: 35,
        width: 80,
        height: 18,
        rotation: 0,
        content: "BY OWNER",
        fontFamily: "Inter",
        fontSize: 28,
        color: "#000000",
        bold: true,
        align: "center",
      },
      {
        id: "sale-phone-lbl",
        type: "text",
        x: 10,
        y: 55,
        width: 80,
        height: 12,
        rotation: 0,
        content: "CALL TO INQUIRE:",
        fontFamily: "Inter",
        fontSize: 18,
        color: "#4b5563",
        align: "center",
      },
      {
        id: "sale-phone-num",
        type: "text",
        x: 10,
        y: 70,
        width: 80,
        height: 18,
        rotation: 0,
        content: "555-0199",
        fontFamily: "Impact",
        fontSize: 44,
        color: "#dc2626",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "open-house",
    name: "Open House Banner",
    elements: [
      {
        id: "oh-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1e3a8a",
        borderWidth: 4,
        borderColor: "#facc15",
      },
      {
        id: "oh-header",
        type: "text",
        x: 10,
        y: 12,
        width: 80,
        height: 20,
        rotation: 0,
        content: "OPEN HOUSE",
        fontFamily: "Montserrat",
        fontSize: 50,
        color: "#facc15",
        bold: true,
        align: "center",
      },
      {
        id: "oh-arrow",
        type: "clipart",
        x: 38,
        y: 38,
        width: 24,
        height: 24,
        rotation: 90,
        clipartId: "arrow-up",
        color: "#facc15",
      },
      {
        id: "oh-details",
        type: "text",
        x: 10,
        y: 70,
        width: 80,
        height: 16,
        rotation: 0,
        content: "SUNDAY 1 - 4 PM",
        fontFamily: "Inter",
        fontSize: 24,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "hiring",
    name: "Help Wanted / Hiring",
    elements: [
      {
        id: "h-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#0f172a",
        borderWidth: 6,
        borderColor: "#eab308",
      },
      {
        id: "h-badge",
        type: "shape",
        x: 35,
        y: 8,
        width: 30,
        height: 12,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#eab308",
      },
      {
        id: "h-badge-txt",
        type: "text",
        x: 35,
        y: 9,
        width: 30,
        height: 10,
        rotation: 0,
        content: "NOW HIRING",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#000000",
        bold: true,
        align: "center",
      },
      {
        id: "h-title",
        type: "text",
        x: 5,
        y: 24,
        width: 90,
        height: 22,
        rotation: 0,
        content: "WE ARE HIRING",
        fontFamily: "Impact",
        fontSize: 52,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "h-role",
        type: "text",
        x: 10,
        y: 50,
        width: 80,
        height: 12,
        rotation: 0,
        content: "FULL-TIME ASSOCIATES",
        fontFamily: "Inter",
        fontSize: 22,
        color: "#eab308",
        bold: true,
        align: "center",
      },
      {
        id: "h-apply",
        type: "text",
        x: 10,
        y: 68,
        width: 80,
        height: 10,
        rotation: 0,
        content: "Apply inside or scan QR code",
        fontFamily: "Inter",
        fontSize: 16,
        color: "#94a3b8",
        align: "center",
      },
      {
        id: "h-web",
        type: "text",
        x: 10,
        y: 80,
        width: 80,
        height: 10,
        rotation: 0,
        content: "www.yoursite.com",
        fontFamily: "Courier New",
        fontSize: 18,
        color: "#ffffff",
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "security",
    name: "Security Warning",
    elements: [
      {
        id: "s-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#ffffff",
        borderWidth: 6,
        borderColor: "#dc2626",
      },
      {
        id: "s-header-bg",
        type: "shape",
        x: 4,
        y: 4,
        width: 92,
        height: 20,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#dc2626",
      },
      {
        id: "s-header-txt",
        type: "text",
        x: 10,
        y: 6,
        width: 80,
        height: 16,
        rotation: 0,
        content: "WARNING",
        fontFamily: "Impact",
        fontSize: 44,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "s-shield",
        type: "clipart",
        x: 38,
        y: 28,
        width: 24,
        height: 24,
        rotation: 0,
        clipartId: "shield-alert",
        color: "#dc2626",
      },
      {
        id: "s-body-1",
        type: "text",
        x: 5,
        y: 58,
        width: 90,
        height: 12,
        rotation: 0,
        content: "PRIVATE PROPERTY",
        fontFamily: "Inter",
        fontSize: 26,
        color: "#000000",
        bold: true,
        align: "center",
      },
      {
        id: "s-body-2",
        type: "text",
        x: 5,
        y: 72,
        width: 90,
        height: 18,
        rotation: 0,
        content: "24 HOUR VIDEO SURVEILLANCE",
        fontFamily: "Inter",
        fontSize: 20,
        color: "#4b5563",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const BUSINESS_CARD_TEMPLATES = [
  {
    id: "bc-modern",
    name: "Modern Executive",
    elements: [
      {
        id: "bc-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#0f172a",
        borderWidth: 2,
        borderColor: "#fde047",
      },
      {
        id: "bc-name",
        type: "text",
        x: 8,
        y: 20,
        width: 84,
        height: 16,
        rotation: 0,
        content: "JOHNATHAN DOE",
        fontFamily: "Montserrat",
        fontSize: 32,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "bc-title",
        type: "text",
        x: 8,
        y: 38,
        width: 84,
        height: 10,
        rotation: 0,
        content: "CHIEF EXECUTIVE OFFICER",
        fontFamily: "Inter",
        fontSize: 16,
        color: "#fde047",
        bold: true,
        align: "left",
      },
      {
        id: "bc-divider",
        type: "shape",
        x: 8,
        y: 50,
        width: 40,
        height: 1,
        rotation: 0,
        shapeType: "line",
        fillColor: "#fde047",
      },
      {
        id: "bc-phone",
        type: "text",
        x: 8,
        y: 58,
        width: 84,
        height: 8,
        rotation: 0,
        content: "📞 +1 (555) 019-9234",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#cbd5e1",
        align: "left",
      },
      {
        id: "bc-email",
        type: "text",
        x: 8,
        y: 68,
        width: 84,
        height: 8,
        rotation: 0,
        content: "✉️ john.doe@company.com",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#cbd5e1",
        align: "left",
      },
      {
        id: "bc-web",
        type: "text",
        x: 8,
        y: 78,
        width: 84,
        height: 8,
        rotation: 0,
        content: "🌐 www.company.com",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#cbd5e1",
        align: "left",
      },
    ] as CanvasElement[],
  },
  {
    id: "bc-creative",
    name: "Creative Studio",
    elements: [
      {
        id: "bc-c-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1e3a8a",
        borderWidth: 0,
      },
      {
        id: "bc-c-circle",
        type: "shape",
        x: 65,
        y: 15,
        width: 25,
        height: 50,
        rotation: 0,
        shapeType: "circle",
        fillColor: "#ff2d78",
      },
      {
        id: "bc-c-name",
        type: "text",
        x: 8,
        y: 25,
        width: 60,
        height: 18,
        rotation: 0,
        content: "Jane Smith",
        fontFamily: "Playfair Display",
        fontSize: 36,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "bc-c-title",
        type: "text",
        x: 8,
        y: 45,
        width: 60,
        height: 10,
        rotation: 0,
        content: "Creative Director",
        fontFamily: "Inter",
        fontSize: 16,
        color: "#00e5ff",
        italic: true,
        align: "left",
      },
      {
        id: "bc-c-web",
        type: "text",
        x: 8,
        y: 75,
        width: 84,
        height: 8,
        rotation: 0,
        content: "hello@janesmith.design • janesmith.design",
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#ffffff",
        align: "left",
      },
    ] as CanvasElement[],
  },
];

const TSHIRT_TEMPLATES = [
  {
    id: "ts-staff",
    name: "Company Staff Tee",
    elements: [
      {
        id: "ts-bg-outline",
        type: "shape",
        x: 5,
        y: 5,
        width: 90,
        height: 90,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1e293b",
        borderWidth: 4,
        borderColor: "#ffffff",
      },
      {
        id: "ts-company",
        type: "text",
        x: 10,
        y: 20,
        width: 80,
        height: 16,
        rotation: 0,
        content: "NANO PRINTS",
        fontFamily: "Impact",
        fontSize: 48,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "ts-staff-lbl",
        type: "text",
        x: 20,
        y: 40,
        width: 60,
        height: 20,
        rotation: 0,
        content: "STAFF",
        fontFamily: "Montserrat",
        fontSize: 60,
        color: "#ff2d78",
        bold: true,
        align: "center",
      },
      {
        id: "ts-slogan",
        type: "text",
        x: 10,
        y: 68,
        width: 80,
        height: 10,
        rotation: 0,
        content: "How Can I Help You?",
        fontFamily: "Inter",
        fontSize: 20,
        color: "#00e5ff",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "ts-event",
    name: "Event Crew Tee",
    elements: [
      {
        id: "ts-ev-bg",
        type: "shape",
        x: 5,
        y: 5,
        width: 90,
        height: 90,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#0f172a",
        borderWidth: 2,
        borderColor: "#00e5ff",
      },
      {
        id: "ts-ev-year",
        type: "text",
        x: 10,
        y: 18,
        width: 80,
        height: 10,
        rotation: 0,
        content: "EST. 2026",
        fontFamily: "Inter",
        fontSize: 16,
        color: "#fde047",
        bold: true,
        align: "center",
      },
      {
        id: "ts-ev-title",
        type: "text",
        x: 10,
        y: 32,
        width: 80,
        height: 22,
        rotation: 0,
        content: "CREW",
        fontFamily: "Impact",
        fontSize: 70,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "ts-ev-subtitle",
        type: "text",
        x: 10,
        y: 62,
        width: 80,
        height: 10,
        rotation: 0,
        content: "ANNUAL SUMMIT",
        fontFamily: "Montserrat",
        fontSize: 22,
        color: "#00e5ff",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const MUG_TEMPLATES = [
  {
    id: "mug-morning",
    name: "Morning Motivation",
    elements: [
      {
        id: "mug-m-text",
        type: "text",
        x: 10,
        y: 25,
        width: 80,
        height: 35,
        rotation: 0,
        content: "BUT FIRST,\nCOFFEE.",
        fontFamily: "Playfair Display",
        fontSize: 40,
        color: "#0f172a",
        bold: true,
        align: "center",
      },
      {
        id: "mug-m-sub",
        type: "text",
        x: 10,
        y: 70,
        width: 80,
        height: 8,
        rotation: 0,
        content: "Nano Prints Family",
        fontFamily: "Montserrat",
        fontSize: 16,
        color: "#ff2d78",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "mug-corporate",
    name: "Classic Corporate Logo",
    elements: [
      {
        id: "mug-c-circle",
        type: "shape",
        x: 40,
        y: 15,
        width: 20,
        height: 20,
        rotation: 0,
        shapeType: "circle",
        fillColor: "#1e3a8a",
        borderWidth: 2,
        borderColor: "#00e5ff",
      },
      {
        id: "mug-c-title",
        type: "text",
        x: 10,
        y: 42,
        width: 80,
        height: 12,
        rotation: 0,
        content: "YOUR LOGO HERE",
        fontFamily: "Montserrat",
        fontSize: 24,
        color: "#0f172a",
        bold: true,
        align: "center",
      },
      {
        id: "mug-c-slogan",
        type: "text",
        x: 10,
        y: 60,
        width: 80,
        height: 8,
        rotation: 0,
        content: "INNOVATING THE FUTURE",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#64748b",
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const TOTE_BAG_TEMPLATES = [
  {
    id: "tote-eco",
    name: "Eco-Friendly Leaf",
    elements: [
      {
        id: "tote-e-circle",
        type: "shape",
        x: 38,
        y: 15,
        width: 24,
        height: 24,
        rotation: 0,
        shapeType: "circle",
        fillColor: "#14532d",
      },
      {
        id: "tote-e-title",
        type: "text",
        x: 5,
        y: 48,
        width: 90,
        height: 16,
        rotation: 0,
        content: "GO GREEN",
        fontFamily: "Montserrat",
        fontSize: 32,
        color: "#14532d",
        bold: true,
        align: "center",
      },
      {
        id: "tote-e-slogan",
        type: "text",
        x: 10,
        y: 68,
        width: 80,
        height: 10,
        rotation: 0,
        content: "REUSE • RECYCLE • RENEW",
        fontFamily: "Inter",
        fontSize: 16,
        color: "#16a34a",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "tote-market",
    name: "Local Farmer's Market",
    elements: [
      {
        id: "tote-m-border",
        type: "shape",
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        rotation: 0,
        shapeType: "rect",
        fillColor: "transparent",
        borderWidth: 4,
        borderColor: "#b45309",
      },
      {
        id: "tote-m-title",
        type: "text",
        x: 15,
        y: 25,
        width: 70,
        height: 18,
        rotation: 0,
        content: "LOCAL FRESH",
        fontFamily: "Impact",
        fontSize: 38,
        color: "#b45309",
        bold: true,
        align: "center",
      },
      {
        id: "tote-m-sub",
        type: "text",
        x: 15,
        y: 48,
        width: 70,
        height: 10,
        rotation: 0,
        content: "FARMER'S MARKET",
        fontFamily: "Montserrat",
        fontSize: 20,
        color: "#78350f",
        bold: true,
        align: "center",
      },
      {
        id: "tote-m-est",
        type: "text",
        x: 15,
        y: 65,
        width: 70,
        height: 8,
        rotation: 0,
        content: "ESTABLISHED 2026",
        fontFamily: "Courier New",
        fontSize: 14,
        color: "#b45309",
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const PEN_TEMPLATES = [
  {
    id: "pen-classic",
    name: "Corporate Pen Branding",
    elements: [
      {
        id: "pen-logo-txt",
        type: "text",
        x: 2,
        y: 40,
        width: 96,
        height: 20,
        rotation: 0,
        content: "Nano Prints ★ www.nanoprints.com",
        fontFamily: "Arial",
        fontSize: 18,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const NOTEBOOK_TEMPLATES = [
  {
    id: "nb-exec",
    name: "Executive Monogram",
    elements: [
      {
        id: "nb-gold-plate",
        type: "shape",
        x: 35,
        y: 35,
        width: 30,
        height: 30,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#fde047",
        borderWidth: 2,
        borderColor: "#ca8a04",
      },
      {
        id: "nb-monogram",
        type: "text",
        x: 35,
        y: 40,
        width: 30,
        height: 20,
        rotation: 0,
        content: "N",
        fontFamily: "Playfair Display",
        fontSize: 48,
        color: "#0f172a",
        bold: true,
        align: "center",
      },
      {
        id: "nb-name",
        type: "text",
        x: 10,
        y: 75,
        width: 80,
        height: 8,
        rotation: 0,
        content: "JOURNAL",
        fontFamily: "Montserrat",
        fontSize: 18,
        color: "#cbd5e1",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const KEYCHAIN_TEMPLATES = [
  {
    id: "kc-acrylic",
    name: "Logo Keychain",
    elements: [
      {
        id: "kc-circle",
        type: "shape",
        x: 25,
        y: 25,
        width: 50,
        height: 50,
        rotation: 0,
        shapeType: "circle",
        fillColor: "#ff2d78",
      },
      {
        id: "kc-text",
        type: "text",
        x: 5,
        y: 40,
        width: 90,
        height: 20,
        rotation: 0,
        content: "NP",
        fontFamily: "Impact",
        fontSize: 44,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const DOOR_HANGER_TEMPLATES = [
  {
    id: "dh-services",
    name: "Lawn Care & Landscaping",
    elements: [
      {
        id: "dh-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#14532d",
        borderWidth: 4,
        borderColor: "#facc15",
      },
      {
        id: "dh-header",
        type: "text",
        x: 5,
        y: 15,
        width: 90,
        height: 14,
        rotation: 0,
        content: "GREEN LAWN CARE",
        fontFamily: "Montserrat",
        fontSize: 24,
        color: "#facc15",
        bold: true,
        align: "center",
      },
      {
        id: "dh-promo",
        type: "text",
        x: 5,
        y: 32,
        width: 90,
        height: 12,
        rotation: 0,
        content: "FREE ESTIMATES!",
        fontFamily: "Impact",
        fontSize: 28,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "dh-points",
        type: "text",
        x: 10,
        y: 48,
        width: 80,
        height: 24,
        rotation: 0,
        content: "✔ Lawn Mowing & Edging\n✔ Hedge Trimming\n✔ Garden Cleanup",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#cbd5e1",
        align: "left",
      },
      {
        id: "dh-call",
        type: "text",
        x: 5,
        y: 78,
        width: 90,
        height: 10,
        rotation: 0,
        content: "Call 555-0122 Today",
        fontFamily: "Montserrat",
        fontSize: 18,
        color: "#facc15",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const POSTCARD_TEMPLATES = [
  {
    id: "pc-direct-mail",
    name: "VIP Discount Postcard",
    elements: [
      {
        id: "pc-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#0f172a",
        borderWidth: 4,
        borderColor: "#ff2d78",
      },
      {
        id: "pc-tag",
        type: "text",
        x: 10,
        y: 12,
        width: 80,
        height: 8,
        rotation: 0,
        content: "EXCLUSIVE INVITATION",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ff2d78",
        bold: true,
        align: "center",
      },
      {
        id: "pc-title",
        type: "text",
        x: 10,
        y: 25,
        width: 80,
        height: 16,
        rotation: 0,
        content: "SAVE 25% OFF",
        fontFamily: "Impact",
        fontSize: 48,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "pc-desc",
        type: "text",
        x: 10,
        y: 48,
        width: 80,
        height: 10,
        rotation: 0,
        content: "Bring this card to our store or order online using code:",
        fontFamily: "Inter",
        fontSize: 13,
        color: "#94a3b8",
        align: "center",
      },
      {
        id: "pc-code",
        type: "text",
        x: 20,
        y: 62,
        width: 60,
        height: 12,
        rotation: 0,
        content: "VIP25OFF",
        fontFamily: "Courier New",
        fontSize: 24,
        color: "#00e5ff",
        bold: true,
        align: "center",
      },
      {
        id: "pc-web",
        type: "text",
        x: 10,
        y: 80,
        width: 80,
        height: 8,
        rotation: 0,
        content: "www.nanoprints.com",
        fontFamily: "Montserrat",
        fontSize: 14,
        color: "#ffffff",
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const FLYER_TEMPLATES = [
  {
    id: "fl-summit",
    name: "Corporate Tech Summit",
    elements: [
      {
        id: "fl-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#020617",
        borderWidth: 2,
        borderColor: "#00e5ff",
      },
      {
        id: "fl-date",
        type: "text",
        x: 10,
        y: 15,
        width: 80,
        height: 8,
        rotation: 0,
        content: "OCTOBER 15-16, 2026",
        fontFamily: "Montserrat",
        fontSize: 16,
        color: "#00e5ff",
        bold: true,
        align: "center",
      },
      {
        id: "fl-title",
        type: "text",
        x: 5,
        y: 26,
        width: 90,
        height: 22,
        rotation: 0,
        content: "TECH SUMMIT 2026",
        fontFamily: "Impact",
        fontSize: 48,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "fl-divider",
        type: "shape",
        x: 30,
        y: 52,
        width: 40,
        height: 1,
        rotation: 0,
        shapeType: "line",
        fillColor: "#00e5ff",
      },
      {
        id: "fl-loc",
        type: "text",
        x: 10,
        y: 58,
        width: 80,
        height: 8,
        rotation: 0,
        content: "Fort Lauderdale Convention Center",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#cbd5e1",
        bold: true,
        align: "center",
      },
      {
        id: "fl-register",
        type: "text",
        x: 10,
        y: 72,
        width: 80,
        height: 10,
        rotation: 0,
        content: "Register online: summit.nanoprints.com",
        fontFamily: "Montserrat",
        fontSize: 16,
        color: "#fde047",
        bold: true,
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const BROCHURE_TEMPLATES = [
  {
    id: "br-services",
    name: "Business Services Pamphlet",
    elements: [
      {
        id: "br-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#ffffff",
        borderWidth: 4,
        borderColor: "#1e3a8a",
      },
      {
        id: "br-header",
        type: "text",
        x: 10,
        y: 10,
        width: 80,
        height: 14,
        rotation: 0,
        content: "BUSINESS SERVICES",
        fontFamily: "Montserrat",
        fontSize: 24,
        color: "#1e3a8a",
        bold: true,
        align: "center",
      },
      {
        id: "br-p1-bg",
        type: "shape",
        x: 8,
        y: 28,
        width: 26,
        height: 50,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#f1f5f9",
      },
      {
        id: "br-p2-bg",
        type: "shape",
        x: 37,
        y: 28,
        width: 26,
        height: 50,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#f1f5f9",
      },
      {
        id: "br-p3-bg",
        type: "shape",
        x: 66,
        y: 28,
        width: 26,
        height: 50,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#f1f5f9",
      },
      {
        id: "br-p1-txt",
        type: "text",
        x: 9,
        y: 35,
        width: 24,
        height: 40,
        rotation: 0,
        content: "PANEL 1\n\n• Planning\n• Research\n• Design",
        fontFamily: "Inter",
        fontSize: 10,
        color: "#1e293b",
        bold: true,
        align: "center",
      },
      {
        id: "br-p2-txt",
        type: "text",
        x: 38,
        y: 35,
        width: 24,
        height: 40,
        rotation: 0,
        content: "PANEL 2\n\n• Execution\n• Testing\n• Launch",
        fontFamily: "Inter",
        fontSize: 10,
        color: "#1e293b",
        bold: true,
        align: "center",
      },
      {
        id: "br-p3-txt",
        type: "text",
        x: 67,
        y: 35,
        width: 24,
        height: 40,
        rotation: 0,
        content: "PANEL 3\n\n• Support\n• Growth\n• Scale",
        fontFamily: "Inter",
        fontSize: 10,
        color: "#1e293b",
        bold: true,
        align: "center",
      },
      {
        id: "br-footer",
        type: "text",
        x: 10,
        y: 84,
        width: 80,
        height: 8,
        rotation: 0,
        content: "Visit www.nanoprints.com for info",
        fontFamily: "Inter",
        fontSize: 12,
        color: "#64748b",
        align: "center",
      },
    ] as CanvasElement[],
  },
];

const ROLLUP_TEMPLATES = [
  {
    id: "rollup-welcome",
    name: "Event Welcome Banner",
    elements: [
      {
        id: "ru-bg",
        type: "shape",
        x: 2,
        y: 2,
        width: 96,
        height: 96,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#0f172a",
        borderWidth: 4,
        borderColor: "#eab308",
      },
      {
        id: "ru-logo-bg",
        type: "shape",
        x: 38,
        y: 6,
        width: 24,
        height: 10,
        rotation: 0,
        shapeType: "circle",
        fillColor: "#eab308",
      },
      {
        id: "ru-title",
        type: "text",
        x: 5,
        y: 22,
        width: 90,
        height: 12,
        rotation: 0,
        content: "WELCOME",
        fontFamily: "Montserrat",
        fontSize: 48,
        color: "#eab308",
        bold: true,
        align: "center",
      },
      {
        id: "ru-sub",
        type: "text",
        x: 5,
        y: 36,
        width: 90,
        height: 8,
        rotation: 0,
        content: "TO THE ANNUAL GALA",
        fontFamily: "Inter",
        fontSize: 18,
        color: "#ffffff",
        align: "center",
      },
      {
        id: "ru-divider",
        type: "shape",
        x: 20,
        y: 48,
        width: 60,
        height: 1,
        rotation: 0,
        shapeType: "line",
        fillColor: "#eab308",
      },
      {
        id: "ru-date",
        type: "text",
        x: 5,
        y: 56,
        width: 90,
        height: 8,
        rotation: 0,
        content: "OCTOBER 14, 2026",
        fontFamily: "Montserrat",
        fontSize: 20,
        color: "#ffffff",
        bold: true,
        align: "center",
      },
      {
        id: "ru-footer",
        type: "text",
        x: 5,
        y: 78,
        width: 90,
        height: 12,
        rotation: 0,
        content: "NANO SIGPS PRESENTS",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#94a3b8",
        align: "center",
      },
    ] as CanvasElement[],
  },
  {
    id: "medical-services",
    name: "Medical Services Banner",
    elements: [
      {
        id: "med-bg-image",
        type: "image",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        imageUrl: "/templates/medical_bg.png",
        aspectLocked: true,
      },
      {
        id: "med-doctor",
        type: "image",
        x: 40,
        y: 40,
        width: 58,
        height: 52,
        rotation: 0,
        imageUrl: "/templates/doctor.png",
        aspectLocked: true,
      },
      {
        id: "med-logo",
        type: "text",
        x: 8,
        y: 5,
        width: 30,
        height: 8,
        rotation: 0,
        content: "YOUR\nLOGO",
        fontFamily: "Inter",
        fontSize: 22,
        color: "#0c59b2",
        bold: true,
        align: "left",
      },
      {
        id: "med-title",
        type: "text",
        x: 8,
        y: 11,
        width: 80,
        height: 18,
        rotation: 0,
        content: "MEDICAL\nSERVICES",
        fontFamily: "Impact",
        fontSize: 54,
        color: "#0c59b2",
        bold: true,
        align: "left",
      },
      {
        id: "med-sub",
        type: "text",
        x: 8,
        y: 40,
        width: 80,
        height: 6,
        rotation: 0,
        content: "WHY CHOOSE US ?",
        fontFamily: "Inter",
        fontSize: 24,
        color: "#000000",
        bold: true,
        align: "left",
      },
      {
        id: "med-pill-1",
        type: "shape",
        x: 5,
        y: 47,
        width: 42,
        height: 5.5,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1d70d8",
      },
      {
        id: "med-check-1",
        type: "clipart",
        x: 7,
        y: 48,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "check",
        color: "#ffffff",
      },
      {
        id: "med-text-1",
        type: "text",
        x: 12,
        y: 48.5,
        width: 33,
        height: 3,
        rotation: 0,
        content: "Expert Medical Team",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-pill-2",
        type: "shape",
        x: 5,
        y: 53.5,
        width: 42,
        height: 5.5,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1d70d8",
      },
      {
        id: "med-check-2",
        type: "clipart",
        x: 7,
        y: 54.5,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "check",
        color: "#ffffff",
      },
      {
        id: "med-text-2",
        type: "text",
        x: 12,
        y: 55,
        width: 33,
        height: 3,
        rotation: 0,
        content: "Personalized Plans",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-pill-3",
        type: "shape",
        x: 5,
        y: 60,
        width: 42,
        height: 5.5,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1d70d8",
      },
      {
        id: "med-check-3",
        type: "clipart",
        x: 7,
        y: 61,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "check",
        color: "#ffffff",
      },
      {
        id: "med-text-3",
        type: "text",
        x: 12,
        y: 61.5,
        width: 33,
        height: 3,
        rotation: 0,
        content: "24/7 Emergencies",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-pill-4",
        type: "shape",
        x: 5,
        y: 66.5,
        width: 42,
        height: 5.5,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1d70d8",
      },
      {
        id: "med-check-4",
        type: "clipart",
        x: 7,
        y: 67.5,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "check",
        color: "#ffffff",
      },
      {
        id: "med-text-4",
        type: "text",
        x: 12,
        y: 68,
        width: 33,
        height: 3,
        rotation: 0,
        content: "Compassionate Care",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-pill-5",
        type: "shape",
        x: 5,
        y: 73,
        width: 42,
        height: 5.5,
        rotation: 0,
        shapeType: "rect",
        fillColor: "#1d70d8",
      },
      {
        id: "med-check-5",
        type: "clipart",
        x: 7,
        y: 74,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "check",
        color: "#ffffff",
      },
      {
        id: "med-text-5",
        type: "text",
        x: 12,
        y: 74.5,
        width: 33,
        height: 3,
        rotation: 0,
        content: "Advanced Tech",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-contact-lbl",
        type: "text",
        x: 8,
        y: 83.5,
        width: 40,
        height: 3,
        rotation: 0,
        content: "CONTACT US",
        fontFamily: "Inter",
        fontSize: 14,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-phone-icon",
        type: "clipart",
        x: 8,
        y: 87.5,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "phone",
        color: "#ffffff",
      },
      {
        id: "med-phone-txt",
        type: "text",
        x: 13,
        y: 88,
        width: 35,
        height: 3,
        rotation: 0,
        content: "+123-456-7890",
        fontFamily: "Inter",
        fontSize: 12,
        color: "#ffffff",
        bold: true,
        align: "left",
      },
      {
        id: "med-email-icon",
        type: "clipart",
        x: 8,
        y: 91.5,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "mail",
        color: "#ffffff",
      },
      {
        id: "med-email-txt",
        type: "text",
        x: 13,
        y: 92,
        width: 35,
        height: 3,
        rotation: 0,
        content: "hello@reallygreatsite.com",
        fontFamily: "Inter",
        fontSize: 12,
        color: "#ffffff",
        align: "left",
      },
      {
        id: "med-web-icon",
        type: "clipart",
        x: 8,
        y: 95.5,
        width: 3.5,
        height: 3.5,
        rotation: 0,
        clipartId: "globe",
        color: "#ffffff",
      },
      {
        id: "med-web-txt",
        type: "text",
        x: 13,
        y: 96,
        width: 35,
        height: 3,
        rotation: 0,
        content: "www.reallygreatsite.com",
        fontFamily: "Inter",
        fontSize: 12,
        color: "#ffffff",
        align: "left",
      },
    ] as CanvasElement[],
  },
];

const FONTS = [
  "Inter",
  "Arial",
  "Impact",
  "Georgia",
  "Courier New",
  "Montserrat",
  "Playfair Display",
];

const BOARD_SIZES = [
  { label: '18" x 24" (Standard)', width: 24, height: 18, priceAdder: 0 },
  { label: '24" x 36" (Large)', width: 36, height: 24, priceAdder: 9.5 },
  { label: '12" x 18" (Small)', width: 18, height: 12, priceAdder: -1.5 },
  { label: '36" x 48" (Jumbo)', width: 48, height: 36, priceAdder: 24.0 },
];

const MATERIALS = [
  {
    label: "Corrugated Plastic (Yard Sign)",
    value: "coroplast",
    basePrice: 15.99,
    desc: "Lightweight, waterproof 4mm board.",
  },
  {
    label: "Heavy Duty Aluminum",
    value: "aluminum",
    basePrice: 27.99,
    desc: "Rust-proof, long-lasting premium metal.",
  },
  {
    label: "Foam Board",
    value: "foamboard",
    basePrice: 22.99,
    desc: "Sleek, rigid surface perfect for indoor presentation.",
  },
];

const BACKGROUND_COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Yellow", value: "#facc15" },
  { name: "Red", value: "#dc2626" },
  { name: "Navy Blue", value: "#1e3a8a" },
  { name: "Dark Slate", value: "#0f172a" },
  { name: "Forest Green", value: "#14532d" },
  { name: "Light Gray", value: "#f1f5f9" },
];

const GRADIENTS = [
  { name: "None", value: "" },
  {
    name: "Sunset Gold",
    value: "linear-gradient(135deg, #fef08a 0%, #fde047 100%)",
  },
  {
    name: "Corporate Blue",
    value: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
  },
  {
    name: "Alert Orange",
    value: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
  },
  {
    name: "Premium Slate",
    value: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  },
];

interface TemplatePreviewProps {
  elements: CanvasElement[];
  canvasSize: { width: number; height: number };
  bgColor: string;
  bgGradient: string;
  bgImage: string | null;
}

function TemplatePreview({
  elements,
  canvasSize,
  bgColor,
  bgGradient,
  bgImage,
}: TemplatePreviewProps) {
  const refWidth = canvasSize.width > canvasSize.height ? 650 : 400;

  const renderClipartPreview = (clipartId: string, color: string = "#000000") => {
    const standardIcons = Icons as unknown as Record<
      string,
      React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    >;
    const formattedId = clipartId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const IconComp = standardIcons[formattedId] || Icons.HelpCircle;
    return <IconComp className="w-full h-full" style={{ color }} />;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded bg-slate-950 border border-slate-800 shadow-inner"
      style={{
        aspectRatio: `${canvasSize.width} / ${canvasSize.height}`,
        backgroundColor: bgColor,
        backgroundImage:
          bgGradient ||
          (bgImage ? `url(${bgImage})` : "none"),
        backgroundSize: "cover",
        backgroundPosition: "center",
        containerType: "inline-size",
      }}
    >
      <div className="absolute inset-0 pointer-events-none rounded select-none">
        {elements.map((el, idx) => {
          const opacity = el.opacity !== undefined ? el.opacity : 1;
          return (
            <div
              key={el.id}
              className="absolute"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.width}%`,
                height: `${el.height}%`,
                transform: `rotate(${el.rotation || 0}deg)`,
                transformOrigin: "center center",
                opacity: opacity,
                zIndex: idx,
              }}
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden select-none pointer-events-none">
                {el.type === "text" && (
                  <div
                    className="w-full h-full flex items-center select-none pointer-events-none truncate"
                    style={{
                      fontFamily: el.fontFamily || "Inter",
                      color: el.color || "#000000",
                      fontWeight: el.bold ? "bold" : "normal",
                      fontStyle: el.italic ? "italic" : "normal",
                      textDecoration: el.underline ? "underline" : "none",
                      justifyContent:
                        el.align === "left"
                          ? "flex-start"
                          : el.align === "right"
                            ? "flex-end"
                            : "center",
                      textAlign: el.align || "center",
                      fontSize: `${((el.fontSize || 32) / refWidth) * 100}cqw`,
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.1",
                      WebkitTextStroke: el.strokeColor
                        ? `${((el.strokeWidth || 1) / refWidth) * 100}cqw ${el.strokeColor}`
                        : "none",
                    }}
                  >
                    {el.content}
                  </div>
                )}

                {el.type === "shape" && (
                  <div className="w-full h-full flex items-center justify-center p-[0.5px]">
                    {el.shapeType === "rect" && (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${Math.max(0.5, (el.borderWidth / refWidth) * 100)}cqw solid ${el.borderColor || "#000"}`
                            : "none",
                          borderRadius: "1px",
                        }}
                      />
                    )}
                    {el.shapeType === "circle" && (
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${Math.max(0.5, (el.borderWidth / refWidth) * 100)}cqw solid ${el.borderColor || "#000"}`
                            : "none",
                        }}
                      />
                    )}
                    {el.shapeType === "triangle" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,5 95,95 5,95"
                          fill={el.fillColor || "#3b82f6"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "star" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,2 64,36 100,36 71,57 81,95 50,72 19,95 29,57 0,36 36,36"
                          fill={el.fillColor || "#eab308"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "line" && (
                      <div
                        className="w-full"
                        style={{
                          height: `${Math.max(0.5, ((el.borderWidth || 4) / refWidth) * 100)}cqw`,
                          backgroundColor: el.fillColor || "#000",
                        }}
                      />
                    )}
                  </div>
                )}

                {el.type === "clipart" && el.clipartId && (
                  <div className="w-full h-full p-[1.5px] flex items-center justify-center">
                    {renderClipartPreview(el.clipartId, el.color)}
                  </div>
                )}

                {el.type === "image" && el.imageUrl && (
                  <div className="w-full h-full relative p-0">
                    <img
                      src={el.imageUrl}
                      alt="Template image preview"
                      className="w-full h-full object-fill pointer-events-none"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DesignPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId") || "51060";
  const urlWidth = searchParams.get("width");
  const urlHeight = searchParams.get("height");

  const { addItem } = useCart();

  const registryProduct = React.useMemo(() => {
    if (!productId) return null;
    for (const category of Object.values(PRODUCTS_REGISTRY)) {
      const found = category.products.find((p) => p.id === productId);
      if (found) return found;
    }
    return null;
  }, [productId]);

  const categoryKey = React.useMemo(() => {
    if (!productId) return null;
    for (const [key, category] of Object.entries(PRODUCTS_REGISTRY)) {
      const found = category.products.some((p) => p.id === productId);
      if (found) return key;
    }
    return null;
  }, [productId]);

  const [selectValues, setSelectValues] = useState<Record<string, any>>({});

  const availableTemplates = React.useMemo(() => {
    if (productId === "rollup" || productId === "roll-up-banners" || urlHeight === "79" || urlHeight === "80") {
      return ROLLUP_TEMPLATES;
    }
    if (productId === "business-cards") {
      return BUSINESS_CARD_TEMPLATES;
    }
    if (productId === "t-shirts") {
      return TSHIRT_TEMPLATES;
    }
    if (productId === "mugs") {
      return MUG_TEMPLATES;
    }
    if (productId === "tote-bags") {
      return TOTE_BAG_TEMPLATES;
    }
    if (productId === "pens") {
      return PEN_TEMPLATES;
    }
    if (productId === "notebooks") {
      return NOTEBOOK_TEMPLATES;
    }
    if (productId === "keychains") {
      return KEYCHAIN_TEMPLATES;
    }
    if (productId === "door-hangers") {
      return DOOR_HANGER_TEMPLATES;
    }
    if (productId === "postcard" || productId === "postcards") {
      return POSTCARD_TEMPLATES;
    }
    if (productId === "flyer" || productId === "flyers") {
      return FLYER_TEMPLATES;
    }
    if (productId === "brochures") {
      return BROCHURE_TEMPLATES;
    }
    return PRESET_TEMPLATES;
  }, [productId, urlHeight]);

  const availableMaterials = React.useMemo(() => {
    if (productId === "rollup" || productId === "roll-up-banners" || urlHeight === "79" || urlHeight === "80") {
      return [
        {
          label: "Standard (13oz Vinyl)",
          value: "standard",
          basePrice: 93.27,
          desc: "Classic, durable, and fade-resistant.",
        },
        {
          label: "Polyester Greyback",
          value: "polyester",
          basePrice: 108.27,
          desc: "Smooth, wrinkle-resistant with lightblock backing.",
        },
        {
          label: "Eco-Wise PVC Free",
          value: "eco",
          basePrice: 103.27,
          desc: "Environmentally friendly 13oz material.",
        },
      ];
    }
    return MATERIALS;
  }, [productId, urlHeight]);

  // State Management
  const [elements, setElementsRaw] = useState<CanvasElement[]>([
    {
      id: "init-bg",
      type: "shape",
      x: 2,
      y: 2,
      width: 96,
      height: 96,
      rotation: 0,
      shapeType: "rect",
      fillColor: "#ffffff",
      borderWidth: 4,
      borderColor: "#000",
    },
    {
      id: "text-1",
      type: "text",
      x: 10,
      y: 35,
      width: 80,
      height: 30,
      rotation: 0,
      content: "YOUR DESIGN HERE",
      fontFamily: "Impact",
      fontSize: 56,
      color: "#000000",
      bold: true,
      align: "center",
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Double-Sided Pages Support
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");
  const [frontElements, setFrontElements] = useState<CanvasElement[]>(() => [
    {
      id: "init-bg",
      type: "shape",
      x: 2,
      y: 2,
      width: 96,
      height: 96,
      rotation: 0,
      shapeType: "rect",
      fillColor: "#ffffff",
      borderWidth: 4,
      borderColor: "#000",
    },
    {
      id: "text-1",
      type: "text",
      x: 10,
      y: 35,
      width: 80,
      height: 30,
      rotation: 0,
      content: "YOUR DESIGN HERE",
      fontFamily: "Impact",
      fontSize: 56,
      color: "#000000",
      bold: true,
      align: "center",
    },
  ]);
  const [backElements, setBackElements] = useState<CanvasElement[]>([
    {
      id: "init-bg",
      type: "shape",
      x: 2,
      y: 2,
      width: 96,
      height: 96,
      rotation: 0,
      shapeType: "rect",
      fillColor: "#ffffff",
      borderWidth: 4,
      borderColor: "#000",
    },
    {
      id: "text-1",
      type: "text",
      x: 10,
      y: 35,
      width: 80,
      height: 30,
      rotation: 0,
      content: "BACK SIDE DESIGN",
      fontFamily: "Impact",
      fontSize: 56,
      color: "#000000",
      bold: true,
      align: "center",
    },
  ]);

  // Canvas Aesthetics for Front and Back
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgGradient, setBgGradient] = useState("");
  const [bgImage, setBgImage] = useState<string | null>(null);

  const [frontBgColor, setFrontBgColor] = useState("#ffffff");
  const [frontBgGradient, setFrontBgGradient] = useState("");
  const [frontBgImage, setFrontBgImage] = useState<string | null>(null);

  const [backBgColor, setBackBgColor] = useState("#ffffff");
  const [backBgGradient, setBackBgGradient] = useState("");
  const [backBgImage, setBackBgImage] = useState<string | null>(null);

  // Undo/Redo History
  const [history, setHistory] = useState<CanvasElement[][]>([[
    {
      id: "init-bg",
      type: "shape",
      x: 2,
      y: 2,
      width: 96,
      height: 96,
      rotation: 0,
      shapeType: "rect",
      fillColor: "#ffffff",
      borderWidth: 4,
      borderColor: "#000",
    },
    {
      id: "text-1",
      type: "text",
      x: 10,
      y: 35,
      width: 80,
      height: 30,
      rotation: 0,
      content: "YOUR DESIGN HERE",
      fontFamily: "Impact",
      fontSize: 56,
      color: "#000000",
      bold: true,
      align: "center",
    },
  ]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Canvas Settings
  const [activeTab, setActiveTab] = useState<
    "templates" | "text" | "shapes" | "clipart" | "upload" | "background" | null
  >(null);
  const [canvasSize, setCanvasSize] = useState(BOARD_SIZES[0]);
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [doubleSided, setDoubleSided] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isPricingExpanded, setIsPricingExpanded] = useState(false);

  // Wrapper setter for elements that also writes to side buffers
  const setElements = React.useCallback(
    (newElements: React.SetStateAction<CanvasElement[]>) => {
      setElementsRaw((prev) => {
        const next = typeof newElements === "function" ? newElements(prev) : newElements;
        if (activeSide === "front") {
          setFrontElements(next);
        } else {
          setBackElements(next);
        }
        return next;
      });
    },
    [activeSide]
  );

  const handleSwitchSide = (side: "front" | "back") => {
    if (side === activeSide) return;

    // Save current active state to source buffer
    if (activeSide === "front") {
      setFrontElements(elements);
      setFrontBgColor(bgColor);
      setFrontBgGradient(bgGradient);
      setFrontBgImage(bgImage);
    } else {
      setBackElements(elements);
      setBackBgColor(bgColor);
      setBackBgGradient(bgGradient);
      setBackBgImage(bgImage);
    }

    // Load state from target buffer
    const targetElements = side === "front" ? frontElements : backElements;
    const targetBgColor = side === "front" ? frontBgColor : backBgColor;
    const targetBgGradient = side === "front" ? frontBgGradient : backBgGradient;
    const targetBgImage = side === "front" ? frontBgImage : backBgImage;

    setElementsRaw(targetElements);
    setBgColor(targetBgColor);
    setBgGradient(targetBgGradient);
    setBgImage(targetBgImage);
    setActiveSide(side);
    setSelectedId(null);

    // Reset history index for this side switch
    setHistory([targetElements]);
    setHistoryIndex(0);
  };

  useEffect(() => {
    if (!doubleSided && activeSide === "back") {
      handleSwitchSide("front");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubleSided, activeSide]);

  useEffect(() => {
    if (productId === "rollup" || productId === "roll-up-banners" || urlHeight === "79" || urlHeight === "80") {
      const initialRollupElements: CanvasElement[] = [
        {
          id: "init-bg",
          type: "shape",
          x: 2,
          y: 2,
          width: 96,
          height: 96,
          rotation: 0,
          shapeType: "rect",
          fillColor: "#ffffff",
          borderWidth: 4,
          borderColor: "#000",
        },
        {
          id: "text-1",
          type: "text",
          x: 10,
          y: 25,
          width: 80,
          height: 15,
          rotation: 0,
          content: "YOUR ROLLUP",
          fontFamily: "Impact",
          fontSize: 44,
          color: "#000000",
          bold: true,
          align: "center",
        },
        {
          id: "text-2",
          type: "text",
          x: 10,
          y: 45,
          width: 80,
          height: 15,
          rotation: 0,
          content: "DESIGN HERE",
          fontFamily: "Impact",
          fontSize: 44,
          color: "#000000",
          bold: true,
          align: "center",
        },
      ];
      setElements(initialRollupElements);
      setHistory([initialRollupElements]);
      setHistoryIndex(0);
      let w = 33;
      let h = 80;
      let label = '33" x 80" (Banner)';
      let priceAdder = 0;

      if (registryProduct) {
        const defaultSize = registryProduct.config.sizes[0];
        let initialSize = defaultSize;
        if (urlWidth && urlHeight) {
          const matched = registryProduct.config.sizes.find((s: any) => {
            const parts = s.value.split('x');
            return parts.includes(urlWidth) && parts.includes(urlHeight);
          });
          if (matched) {
            initialSize = matched;
          }
        }
        const parts = initialSize.value.split('x');
        const dim1 = parseFloat(parts[0]) || 33;
        const dim2 = parseFloat(parts[1]) || 80;
        w = Math.min(dim1, dim2);
        h = Math.max(dim1, dim2);
        label = initialSize.label;
        priceAdder = initialSize.basePrice - defaultSize.basePrice;
      } else if (urlWidth && urlHeight) {
        const dim1 = parseFloat(urlWidth) || 33;
        const dim2 = parseFloat(urlHeight) || 80;
        w = Math.min(dim1, dim2);
        h = Math.max(dim1, dim2);
        label = `${w}" x ${h}" (Banner)`;
      }

      setCanvasSize({
        label,
        width: w,
        height: h,
        priceAdder,
      });
      setMaterial({
        label: "Standard (13oz Vinyl)",
        value: "standard",
        basePrice: 93.27,
        desc: "Classic, durable, and fade-resistant.",
      });
    } else if (registryProduct) {
      const defaultSize = registryProduct.config.sizes[0];
      let initialSize = defaultSize;
      
      if (urlWidth && urlHeight) {
        const matched = registryProduct.config.sizes.find((s: any) => {
          const parts = s.value.split('x');
          return parts.includes(urlWidth) && parts.includes(urlHeight);
        });
        if (matched) {
          initialSize = matched;
        }
      }
      
      const parts = initialSize.value.split('x');
      let h = parseFloat(parts[0]) || 2;
      let w = parseFloat(parts[1]) || 3.5;
      
      if (productId === "business-cards") {
        w = 3.5;
        h = 2;
      }
      
      setCanvasSize({
        label: initialSize.label,
        width: w,
        height: h,
        priceAdder: initialSize.basePrice - defaultSize.basePrice,
      });
    } else if (urlWidth && urlHeight) {
      let w = parseFloat(urlWidth) || 24;
      let h = parseFloat(urlHeight) || 18;
      if (productId === "business-cards") {
        w = 3.5;
        h = 2;
      }
      setCanvasSize({
        label: `${h}" x ${w}" (Custom)`,
        width: w,
        height: h,
        priceAdder: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, urlWidth, urlHeight, registryProduct]);

  // Canvas Aesthetics
  const [showGrid, setShowGrid] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Initialize options from registry product or query params
  useEffect(() => {
    if (registryProduct) {
      const initialSelects: Record<string, any> = {};
      registryProduct.config.selects?.forEach((s) => {
        initialSelects[s.label] = s.options[0];
      });

      const urlSelects = searchParams.get("selects");
      if (urlSelects) {
        try {
          const parsed = JSON.parse(decodeURIComponent(urlSelects));
          Object.entries(parsed).forEach(([key, val]) => {
            const selectDef = registryProduct.config.selects?.find(s => s.label === key);
            if (selectDef) {
              const matchedOption = selectDef.options.find(o => o.value === val);
              if (matchedOption) {
                initialSelects[key] = matchedOption;
              }
            }
          });
        } catch (e) {
          console.error("Failed to parse selects from URL:", e);
        }
      }
      setSelectValues(initialSelects);

      const urlQty = searchParams.get("quantity");
      if (urlQty) {
        setQuantity(parseInt(urlQty) || 100);
      } else {
        const defaultMin = registryProduct.config.minQuantity || (registryProduct.config.quantityOptions ? registryProduct.config.quantityOptions[0] : 100);
        setQuantity(defaultMin);
      }

      const sidesSelect =
        initialSelects["Sides"] ||
        initialSelects["Back Side"] ||
        initialSelects["Backside Printing"] ||
        initialSelects["Printing"];
      if (
        sidesSelect &&
        (sidesSelect.value === "double" ||
          sidesSelect.value === "double_sided")
      ) {
        setDoubleSided(true);
      }
    }
  }, [registryProduct, searchParams]);

  // Orientation handler to dynamically swap canvasSize width and height
  useEffect(() => {
    if (selectValues["Orientation"]) {
      const orientationVal = selectValues["Orientation"].value;
      const isVertical = orientationVal.toLowerCase().includes("vertical");
      const currentWidth = canvasSize.width;
      const currentHeight = canvasSize.height;
      const minDim = Math.min(currentWidth, currentHeight);
      const maxDim = Math.max(currentWidth, currentHeight);

      if (isVertical && (currentWidth !== minDim || currentHeight !== maxDim)) {
        setCanvasSize(prev => ({
          ...prev,
          width: minDim,
          height: maxDim,
        }));
      } else if (!isVertical && (currentWidth !== maxDim || currentHeight !== minDim)) {
        setCanvasSize(prev => ({
          ...prev,
          width: maxDim,
          height: minDim,
        }));
      }
    }
  }, [selectValues, canvasSize.width, canvasSize.height]);

  // Auth
  const { user, setShowAuthModal } = useAuth();

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "review" | "shipping" | "success"
  >("review");
  const [modalPreviewSide, setModalPreviewSide] = useState<"front" | "back">("front");

  // Shipping form state
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPostal, setShippingPostal] = useState("");

  // Finished design file upload (optional PDF/AI/EPS)
  const finishedDesignRef = useRef<HTMLInputElement>(null);
  const [finishedDesignFile, setFinishedDesignFile] = useState<File | null>(
    null,
  );

  // Order submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [confirmedShortId, setConfirmedShortId] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [emailsInitialized, setEmailsInitialized] = useState(true);
  const [emailErrors, setEmailErrors] = useState<{ admin?: any; customer?: any } | null>(null);

  const exportDesignToPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    const frontEl = document.getElementById("export-canvas-front");
    const backEl = document.getElementById("export-canvas-back");

    if (!frontEl) {
      throw new Error("Export canvas elements not found in DOM.");
    }

    // Capture front side
    const frontCanvas = await html2canvas(frontEl, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });
    const frontImg = frontCanvas.toDataURL("image/jpeg", 0.95);

    const currentWidth = canvasSize.width;
    const currentHeight = canvasSize.height;

    const wPts = currentWidth * 72;
    const hPts = currentHeight * 72;

    const doc = new jsPDF({
      orientation: wPts > hPts ? "landscape" : "portrait",
      unit: "pt",
      format: [wPts, hPts],
    });

    doc.addImage(frontImg, "JPEG", 0, 0, wPts, hPts);

    if (doubleSided && backEl) {
      const backCanvas = await html2canvas(backEl, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });
      const backImg = backCanvas.toDataURL("image/jpeg", 0.95);
      doc.addPage([wPts, hPts], wPts > hPts ? "landscape" : "portrait");
      doc.addImage(backImg, "JPEG", 0, 0, wPts, hPts);
    }

    return doc;
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const doc = await exportDesignToPdf();
      const filename = `${(registryProduct ? registryProduct.name : "design").toLowerCase().replace(/[^a-z0-9]+/g, "_")}_design.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error("Failed to download PDF:", err);
      alert("Failed to export PDF. Please check your console for details.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleAddDesignToCartAndCheckout = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let designUrl = "";
      let designFilename = "";

      if (finishedDesignFile) {
        // 1. Upload pre-existing custom artwork file
        const fileBuffer = await finishedDesignFile.arrayBuffer();
        const fileBytes = new Uint8Array(fileBuffer);
        const safeFileName = `${user.id}/${Date.now()}-${finishedDesignFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("designs")
          .upload(safeFileName, fileBytes, {
            contentType: finishedDesignFile.type || "application/pdf",
            upsert: false,
          });

        if (uploadError) {
          throw new Error("Failed to upload custom artwork file: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("designs")
          .getPublicUrl(uploadData.path);
        designUrl = publicUrlData.publicUrl;
        designFilename = finishedDesignFile.name;
      } else {
        // 2. Export canvas layout as PDF and upload to Supabase storage
        try {
          const doc = await exportDesignToPdf();
          const pdfBlob = doc.output("blob");
          const safeFileName = `${user.id}/${Date.now()}-canvas_design.pdf`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("designs")
            .upload(safeFileName, pdfBlob, {
              contentType: "application/pdf",
              upsert: false,
            });

          if (uploadError) {
            throw new Error("Failed to upload canvas design PDF: " + uploadError.message);
          }

          const { data: publicUrlData } = supabase.storage
            .from("designs")
            .getPublicUrl(uploadData.path);
          designUrl = publicUrlData.publicUrl;
          designFilename = "canvas_design.pdf";
        } catch (pdfErr: any) {
          throw new Error("Failed to compile and upload design PDF. " + (pdfErr.message || ""));
        }
      }

      // Add custom design item to cart
      addItem({
        productTitle: registryProduct ? registryProduct.name : material.label,
        size: canvasSize.label,
        quantity,
        unitPrice: Number(calculatedPrice.unitPrice),
        totalPrice: Number(calculatedPrice.total),
        designUrl,
        designFilename,
        customOptions: {
          Material: material.label,
          Size: canvasSize.label,
          Sides: doubleSided ? "Double-sided" : "Single-sided",
          Quantity: String(quantity),
          ...Object.entries(selectValues).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {}),
        },
      });

      // Close modal and redirect to Checkout page
      setIsCheckoutOpen(false);
      router.push("/checkout");
    } catch (err: any) {
      console.error("Failed to add custom design to cart:", err);
      setSubmitError(err.message || "Failed to process design order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Push state to history
  const historyPush = (newElements: CanvasElement[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push([...newElements]);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setElements([...history[prevIndex]]);
      setSelectedId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setElements([...history[nextIndex]]);
      setSelectedId(null);
    }
  };

  // Add Element functions
  const addTextElement = () => {
    const newEl: CanvasElement = {
      id: `text_${Date.now()}`,
      type: "text",
      x: 20,
      y: 40,
      width: 60,
      height: 18,
      rotation: 0,
      content: "Edit this text",
      fontFamily: "Inter",
      fontSize: 24,
      color: "#000000",
      bold: false,
      italic: false,
      underline: false,
      align: "center",
    };
    const updated = [...elements, newEl];
    setElements(updated);
    historyPush(updated);
    setSelectedId(newEl.id);
  };

  const addShapeElement = (
    shapeType: "rect" | "circle" | "triangle" | "star" | "line",
  ) => {
    const newEl: CanvasElement = {
      id: `shape_${Date.now()}`,
      type: "shape",
      shapeType,
      x: 35,
      y: 35,
      width: 30,
      height: 30,
      rotation: 0,
      fillColor: shapeType === "star" ? "#eab308" : "#3b82f6",
      borderWidth: 0,
      borderColor: "#000000",
    };
    const updated = [...elements, newEl];
    setElements(updated);
    historyPush(updated);
    setSelectedId(newEl.id);
  };

  const addClipartElement = (clipart: ClipartItem) => {
    const newEl: CanvasElement = {
      id: `clipart_${Date.now()}`,
      type: "clipart",
      clipartId: clipart.id,
      x: 40,
      y: 40,
      width: 20,
      height: 20,
      rotation: 0,
      color: "#000000",
    };
    const updated = [...elements, newEl];
    setElements(updated);
    historyPush(updated);
    setSelectedId(newEl.id);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // Mock quality analysis based on file size
      const quality =
        file.size > 800000 ? "excellent" : file.size > 200000 ? "good" : "poor";

      // Load image to get natural dimensions and set correct aspect ratio
      const img = new Image();
      img.onload = () => {
        const naturalW = img.naturalWidth;
        const naturalH = img.naturalHeight;
        const aspectRatio = naturalW / naturalH;

        // Target ~40% of canvas width, calculate height from aspect ratio
        // Account for the canvas aspect ratio so the element looks correct
        const canvasAspect = canvasSize.width / canvasSize.height;
        const elWidth = 40;
        const elHeight = (elWidth / aspectRatio) * canvasAspect;

        const newEl: CanvasElement = {
          id: `img_${Date.now()}`,
          type: "image",
          imageUrl: url,
          imageFile: file,
          resolutionQuality: quality,
          x: 30,
          y: Math.max(5, 50 - elHeight / 2),
          width: elWidth,
          height: Math.min(90, elHeight),
          rotation: 0,
        };

        const updated = [...elements, newEl];
        setElements(updated);
        historyPush(updated);
        setSelectedId(newEl.id);
      };
      img.src = url;
    }
  };

  const loadTemplate = (tmpl: { name: string; elements: CanvasElement[] }) => {
    // Confirm replacement
    if (
      window.confirm(
        `Load "${tmpl.name}" template? This will replace your current design.`,
      )
    ) {
      setElements([...tmpl.elements]);
      historyPush(tmpl.elements);
      setSelectedId(null);
    }
  };

  // Helper to update specific properties on the selected element
  const updateSelectedElement = (properties: Partial<CanvasElement>) => {
    if (!selectedId) return;
    const updated = elements.map((el) => {
      if (el.id === selectedId) {
        return { ...el, ...properties };
      }
      return el;
    });
    setElements(updated);
    // Don't push to history here on slider move, we trigger push on change complete/mouseup if needed
    // But for select changes, inline updates, etc., we can push
  };

  // Trigger push to history on final input action
  const commitPropertyChange = () => {
    historyPush(elements);
  };

  // Price calculations
  const calculatedPrice = React.useMemo(() => {
    if (registryProduct) {
      const cfg = registryProduct.config;
      const matchedSize = cfg.sizes.find((s: any) => s.label === canvasSize.label) || cfg.sizes[0];
      let baseUnitPrice = matchedSize.basePrice;
      const sizeQtyPrices = (matchedSize as any).quantityPrices;
      if (sizeQtyPrices && sizeQtyPrices[quantity] !== undefined) {
        baseUnitPrice = sizeQtyPrices[quantity] / quantity;
      } else if (cfg.quantityPrices && cfg.quantityPrices[quantity] !== undefined) {
        baseUnitPrice = cfg.quantityPrices[quantity] / quantity;
      }

      let price = baseUnitPrice;
      let multiplier = 1;

      Object.entries(selectValues).forEach(([k, v]: [string, any]) => {
        if (v) {
          if (v.priceAdder !== undefined) {
            price += v.priceAdder;
          }
          if (v.priceMultiplier !== undefined) {
            multiplier *= v.priceMultiplier;
          }
        }
      });

      const hasSidesSelect = Object.keys(selectValues).some(
        (k) =>
          k.toLowerCase() === "sides" ||
          k.toLowerCase() === "back side" ||
          k.toLowerCase() === "print direction"
      );
      if (doubleSided && !hasSidesSelect) {
        multiplier *= 1.25; // Surcharge of +25% for double sided printing
      }

      let discount = 1;
      if (cfg.bulkDiscounts) {
        const sortedDiscounts = [...cfg.bulkDiscounts].sort((a, b) => b.minQty - a.minQty);
        const matchedDiscount = sortedDiscounts.find((d) => quantity >= d.minQty);
        if (matchedDiscount) {
          discount = (100 - matchedDiscount.discountPercent) / 100;
        }
      } else if (cfg.quantityPrices || sizeQtyPrices) {
        discount = 1;
      } else {
        if (quantity >= 100) discount = 0.82;
        else if (quantity >= 50) discount = 0.87;
        else if (quantity >= 25) discount = 0.9;
        else if (quantity >= 10) discount = 0.94;
        else if (quantity >= 5) discount = 0.97;
      }

      const finalUnitPrice = price * discount * multiplier;
      const subtotal = finalUnitPrice * quantity;

      return {
        unitPrice: finalUnitPrice.toFixed(2),
        total: subtotal.toFixed(2),
        savings: (subtotal / 0.75 - subtotal).toFixed(2),
      };
    } else {
      let base = material.basePrice;
      base += canvasSize.priceAdder;

      let multiplier = 1;
      if (doubleSided) {
        multiplier *= 1.25; // 25% surcharge for double sided printing
      }

      const extraElements = Math.max(0, elements.length - 4);
      base += extraElements * 0.5;

      let discount = 1;
      if (quantity >= 50) discount = 0.85;
      else if (quantity >= 25) discount = 0.9;
      else if (quantity >= 10) discount = 0.95;

      const finalUnitPrice = base * discount * multiplier;
      const subtotal = finalUnitPrice * quantity;

      return {
        unitPrice: finalUnitPrice.toFixed(2),
        total: subtotal.toFixed(2),
        savings: (base * quantity - subtotal).toFixed(2),
      };
    }
  }, [registryProduct, selectValues, doubleSided, quantity, material, canvasSize, elements.length]);

  const handleAddToCart = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const customOptions: Record<string, string> = {
        Sides: doubleSided ? "Double-sided" : "Single-sided",
      };

      Object.entries(selectValues).forEach(([k, v]: [string, any]) => {
        if (v && v.label) {
          customOptions[k] = v.label;
        }
      });

      // Make sure we save the latest active state to side buffers
      let finalFrontElements = frontElements;
      let finalFrontBgColor = frontBgColor;
      let finalFrontBgGradient = frontBgGradient;
      let finalFrontBgImage = frontBgImage;

      let finalBackElements = backElements;
      let finalBackBgColor = backBgColor;
      let finalBackBgGradient = backBgGradient;
      let finalBackBgImage = backBgImage;

      if (activeSide === "front") {
        finalFrontElements = elements;
        finalFrontBgColor = bgColor;
        finalFrontBgGradient = bgGradient;
        finalFrontBgImage = bgImage;
      } else {
        finalBackElements = elements;
        finalBackBgColor = bgColor;
        finalBackBgGradient = bgGradient;
        finalBackBgImage = bgImage;
      }

      if (doubleSided) {
        customOptions["Design Data"] = JSON.stringify({
          doubleSided: true,
          front: {
            elements: finalFrontElements,
            bgColor: finalFrontBgColor,
            bgGradient: finalFrontBgGradient,
            bgImage: finalFrontBgImage,
          },
          back: {
            elements: finalBackElements,
            bgColor: finalBackBgColor,
            bgGradient: finalBackBgGradient,
            bgImage: finalBackBgImage,
          },
        });
      } else {
        customOptions["Design Data"] = JSON.stringify({
          doubleSided: false,
          elements: finalFrontElements,
          bgColor: finalFrontBgColor,
          bgGradient: finalFrontBgGradient,
          bgImage: finalFrontBgImage,
        });
      }

      // Generate the visual proof PDF and upload to Supabase
      console.log("Generating visual proof PDF...");
      const doc = await exportDesignToPdf();
      const pdfBlob = doc.output("blob");
      
      const fileName = `online_design_${Date.now()}.pdf`;
      const filePath = `designs/${fileName}`;
      
      console.log("Uploading visual proof PDF to Supabase...");
      const { error: uploadError } = await supabase.storage
        .from("designs")
        .upload(filePath, pdfBlob, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("designs")
        .getPublicUrl(filePath);

      const designUrl = publicUrlData.publicUrl;
      const designFilename = fileName;

      addItem({
        productTitle: registryProduct ? registryProduct.name : material.label,
        size: canvasSize.label,
        quantity,
        unitPrice: parseFloat(calculatedPrice.unitPrice),
        totalPrice: parseFloat(calculatedPrice.total),
        designUrl,
        designFilename,
        customOptions,
      });

      console.log("Item added to cart with design attachment:", designUrl);
    } catch (err) {
      console.error("Failed to add custom design to cart:", err);
      alert(
        err instanceof Error
          ? `Failed to generate/upload design proof: ${err.message}`
          : "An unexpected error occurred while saving your design. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedEl = elements.find((el) => el.id === selectedId);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* ── TOP HEADER / TOOLBAR ── */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 z-10">
        <div className="flex items-center gap-4">
          <Link
            href={categoryKey && productId ? `/${categoryKey}/${productId}` : "/custom-signs"}
            className="flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
            Back to {registryProduct ? registryProduct.name : "Signs"}
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="text-[#ff2d78] font-extrabold font-poppins text-lg tracking-wider">
              NANO
            </span>
            <span className="font-semibold text-slate-200 text-sm bg-slate-800 px-2 py-0.5 rounded uppercase tracking-wide">
              Design Studio
            </span>
          </div>
          <nav className="hidden xl:flex items-center gap-3 text-xs text-slate-400 border-l border-slate-800 pl-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/custom-signs" className="hover:text-white transition-colors">Signs</Link>
            <Link href="/custom-banners" className="hover:text-white transition-colors">Banners</Link>
            <Link href="/custom-flags" className="hover:text-white transition-colors">Flags</Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="designer-toolbar hidden md:flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={handleUndo}
            disabled={historyIndex === 0}
            className="p-2 hover:bg-slate-800 text-slate-350 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            className="p-2 hover:bg-slate-800 text-slate-350 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg transition-colors ${showGrid ? "bg-[#ff2d78] text-slate-950 font-bold" : "text-slate-350 hover:bg-slate-800"}`}
            title="Toggle Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSnapToGrid(!snapToGrid)}
            className={`p-2 rounded-lg transition-all text-xs font-bold ${snapToGrid ? "bg-slate-800 text-[#ff2d78] border border-[#ff2d78]/40" : "text-slate-400 hover:bg-slate-800 border border-transparent"}`}
            title="Snap to Grid (5% increments)"
          >
            Snap
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <button
            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
            className="p-2 hover:bg-slate-800 text-slate-350 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold px-2 text-slate-400 min-w-[3rem] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
            className="p-2 hover:bg-slate-800 text-slate-350 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-800 mx-1" />

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to clear your design?")
              ) {
                setElements([]);
                historyPush([]);
                setSelectedId(null);
              }
            }}
            className="p-2 hover:bg-red-950/40 text-red-400 hover:text-red-300 rounded-lg transition-colors"
            title="Clear Design"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Order / Checkout CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-xs text-slate-400">Estimated Total:</span>
            <div className="text-base font-bold text-[#ff2d78]">
              ${calculatedPrice.total}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isSubmitting}
            className="bg-[#ff2d78] hover:opacity-90 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-pink-500/20 flex items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Proofing...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE PANELS ── */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden relative bg-slate-950">
        {/* HORIZONTAL NAV BAR (Desktop: Left Vertical, Mobile: Bottom Horizontal) */}
        <div className="designer-nav flex flex-row md:flex-col items-center justify-start md:justify-start gap-2 md:gap-4 px-4 py-2 md:px-2 md:py-4 bg-slate-900 border-t md:border-t-0 md:border-r border-slate-800 z-30 fixed bottom-0 left-0 right-0 md:relative md:bottom-auto w-full md:w-20 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto no-scrollbar shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none shrink-0">
          {(
            [
              "templates",
              "text",
              "shapes",
              "clipart",
              "upload",
              "background",
            ] as const
          ).map((tab) => {
            let Icon = HelpCircle;
            if (tab === "templates") Icon = Sparkles;
            else if (tab === "text") Icon = Type;
            else if (tab === "shapes") Icon = Square;
            else if (tab === "clipart") Icon = Layers;
            else if (tab === "upload") Icon = ImageIcon;
            else if (tab === "background") Icon = RefreshCw;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(activeTab === tab ? null : tab)}
                className={`py-2 px-3 md:py-3 md:px-2 w-auto md:w-full flex flex-row md:flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all shrink-0 ${
                  activeTab === tab
                    ? "border-[#ff2d78] text-[#ff2d78] bg-slate-800/60"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
                title={tab.charAt(0).toUpperCase() + tab.slice(1)}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
                  {tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* FLOATING OPTIONS PANEL */}
        {activeTab && (
          <div className="absolute left-0 md:left-20 bottom-14 md:bottom-auto md:top-0 z-40 w-full md:w-80 h-auto max-h-[65vh] md:max-h-full md:h-full bg-slate-900/95 md:bg-slate-900 backdrop-blur-md border-t md:border-t-0 md:border-r border-slate-800 rounded-t-2xl md:rounded-none shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-left-8">
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-slate-800 bg-slate-950/80">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{activeTab}</span>
              <button onClick={() => setActiveTab(null)} className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 md:p-5 overflow-y-auto space-y-5 flex-grow no-scrollbar">
            {activeTab === "templates" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Preset Sign Layouts
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableTemplates.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => loadTemplate(tmpl)}
                      className="w-full text-left bg-slate-800/60 hover:bg-slate-750 border border-slate-700/80 hover:border-[#ff2d78]/60 rounded-xl overflow-hidden transition-all group shadow-sm hover:-translate-y-0.5 flex flex-col focus:outline-none focus:ring-2 focus:ring-[#ff2d78]/45"
                      title={`Load ${tmpl.name} template`}
                    >
                      <div className="w-full p-1.5 bg-slate-950/40 border-b border-slate-850/40 aspect-[4/3] flex items-center justify-center overflow-hidden">
                        <TemplatePreview
                          elements={tmpl.elements}
                          canvasSize={canvasSize}
                          bgColor={bgColor}
                          bgGradient={bgGradient}
                          bgImage={bgImage}
                        />
                      </div>
                      <div className="p-2 w-full flex-grow flex flex-col justify-between bg-slate-900/30">
                        <div className="font-bold text-slate-200 group-hover:text-[#ff2d78] transition-colors text-[10px] truncate leading-tight">
                          {tmpl.name}
                        </div>
                        <div className="text-[8px] text-slate-450 mt-1 uppercase tracking-wider font-semibold">
                          {tmpl.elements.length} layers
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "text" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Text Overlays
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Add high-contrast typography elements to ensure signs are
                  legible from distance.
                </p>
                <button
                  onClick={addTextElement}
                  className="w-full bg-slate-800 hover:bg-slate-750 border-2 border-dashed border-slate-700 hover:border-[#ff2d78] text-[#ff2d78] font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Type className="w-5 h-5" />
                  Add Custom Text Line
                </button>
              </div>
            )}

            {activeTab === "shapes" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Add Vector Shapes
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      type: "rect" as const,
                      label: "Rectangle",
                      icon: <Square className="w-5 h-5" />,
                    },
                    {
                      type: "circle" as const,
                      label: "Circle",
                      icon: (
                        <div className="w-5 h-5 rounded-full border-2 border-current" />
                      ),
                    },
                    {
                      type: "triangle" as const,
                      label: "Triangle",
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12,3 22,21 2,21" strokeWidth="2" />
                        </svg>
                      ),
                    },
                    {
                      type: "star" as const,
                      label: "Star",
                      icon: (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polygon
                            points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
                            strokeWidth="2"
                          />
                        </svg>
                      ),
                    },
                    {
                      type: "line" as const,
                      label: "Border Line",
                      icon: <div className="w-5 h-1 bg-current rounded" />,
                    },
                  ].map((sh) => (
                    <button
                      key={sh.type}
                      onClick={() => addShapeElement(sh.type)}
                      className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-[#ff2d78]/40 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-slate-200 transition-all hover:scale-[1.02] active:scale-[0.97]"
                    >
                      {sh.icon}
                      <span className="text-xs font-semibold">{sh.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "clipart" && (
              <div className="h-full flex flex-col">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Clipart Library
                </h3>
                <div className="flex-grow">
                  <ClipartLibrary onSelect={addClipartElement} />
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Upload Assets
                </h3>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-[#ff2d78] rounded-xl p-6 text-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/85 transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-[#ff2d78] mx-auto mb-2 transition-colors" />
                  <span className="block text-sm font-bold text-slate-350 group-hover:text-slate-200">
                    Select Logo or Artwork
                  </span>
                  <span className="block text-[10px] text-slate-500 mt-1">
                    Supports PNG, JPG, SVG up to 10MB
                  </span>
                </div>
                <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-800">
                  <h4 className="text-[11px] font-bold text-[#ff2d78] flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> High-Resolution
                    Printing
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    We automatically scan your image's DPI resolution. Poor
                    quality images will display a warning to ensure you review
                    before ordering.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "background" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Background Solid Colors
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {BACKGROUND_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => {
                          setBgColor(c.value);
                          setBgGradient("");
                          historyPush(elements);
                        }}
                        className={`w-full aspect-square rounded-lg border border-slate-700 relative flex items-center justify-center transition-transform hover:scale-105 ${
                          bgColor === c.value && !bgGradient
                            ? "ring-2 ring-[#ff2d78]"
                            : ""
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      >
                        {bgColor === c.value && !bgGradient && (
                          <Check
                            className={`w-4 h-4 ${c.value === "#ffffff" || c.value === "#facc15" ? "text-black" : "text-white"}`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Background Gradients
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {GRADIENTS.map((g) => (
                      <button
                        key={g.name}
                        onClick={() => {
                          setBgGradient(g.value);
                          historyPush(elements);
                        }}
                        className={`h-10 rounded-lg border border-slate-700 relative text-left p-2 flex items-center justify-between transition-all hover:border-slate-500 overflow-hidden ${
                          bgGradient === g.value
                            ? "ring-2 ring-[#ff2d78] font-bold"
                            : ""
                        }`}
                        style={{ background: g.value || "rgb(30, 41, 59)" }}
                      >
                        <span className="text-[10px] text-white bg-slate-950/40 px-1 py-0.5 rounded font-medium">
                          {g.name}
                        </span>
                        {bgGradient === g.value && (
                          <Check className="w-4 h-4 text-white shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        )}

        {/* 2. CENTRAL WORKSPACE (THE CANVAS CONTAINER) */}
        <div className="flex-grow flex flex-col overflow-auto relative p-4 pb-24 md:pb-4 z-10 bg-slate-100" onClick={() => { if (activeTab) setActiveTab(null); if (selectedId) setSelectedId(null); }}>
          <div className="flex flex-col items-center justify-center shrink-0 min-h-full min-w-full animate-in fade-in zoom-in-95 duration-200" style={{ margin: "auto" }}>
            {doubleSided && (
              <div className="mb-6 flex gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-lg z-20">
                <button
                  onClick={() => handleSwitchSide("front")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeSide === "front"
                      ? "bg-[#ff2d78] text-slate-950 shadow"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  Page 1 (Front Side)
                </button>
                <button
                  onClick={() => handleSwitchSide("back")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeSide === "back"
                      ? "bg-[#ff2d78] text-slate-950 shadow"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  Page 2 (Back Side)
                </button>
              </div>
            )}
            <div
              style={{
                width: `${(canvasSize.width > canvasSize.height ? 650 : 400) * (zoomLevel / 100)}px`,
                transition: "width 0.15s ease-out",
              }}
              className="flex items-center justify-center shadow-2xl ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <DesignCanvas
                elements={elements}
                selectedId={selectedId}
                canvasSize={canvasSize}
                backgroundColor={bgColor}
                backgroundGradient={bgGradient}
                backgroundImage={bgImage}
                showGrid={showGrid}
                snapToGrid={snapToGrid}
                onElementsChange={setElements}
                onSelectElement={setSelectedId}
                historyPush={historyPush}
              />
            </div>
          </div>

          {/* Quick Helper Banner */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 max-w-sm shadow-xl pointer-events-none text-xs">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
            <span className="text-slate-350">
              {selectedId
                ? "Drag handles to resize. Drag center to move. Click outside to deselect."
                : "Select an element to edit properties, or click sidebar tabs to add elements."}
            </span>
          </div>
        </div>

        {/* 3. RIGHT SIDEBAR PANEL (CONTEXT PROPERTIES & DYNAMIC PRICING) */}
        {selectedEl && (
          <div className="absolute right-0 md:right-4 bottom-14 md:bottom-auto md:top-20 z-40 w-full md:w-80 max-h-[65vh] md:max-h-[75vh] bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-right-8 designer-context-panel">
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-slate-800 bg-slate-950/80">
              <span className="text-xs font-bold text-[#ff2d78] uppercase tracking-wider flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Modify {selectedEl.type}</span>
              <button onClick={() => setSelectedId(null)} className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 md:p-5 overflow-y-auto space-y-5 flex-grow no-scrollbar">
              <div className="space-y-4">
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const duplicated: CanvasElement = {
                          ...selectedEl,
                          id: `el_${Date.now()}`,
                          x: Math.min(80, selectedEl.x + 5),
                          y: Math.min(80, selectedEl.y + 5),
                        };
                        const updated = [...elements, duplicated];
                        setElements(updated);
                        historyPush(updated);
                        setSelectedId(duplicated.id);
                      }}
                      className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const updated = elements.filter(
                          (item) => item.id !== selectedEl.id,
                        );
                        setElements(updated);
                        historyPush(updated);
                        setSelectedId(null);
                      }}
                      className="p-1.5 hover:bg-red-950/40 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Specific Control Toggles */}
                {selectedEl.type === "text" && (
                  <div className="space-y-4">
                    {/* Text Area */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Text Content
                      </label>
                      <textarea
                        value={selectedEl.content || ""}
                        onChange={(e) =>
                          updateSelectedElement({ content: e.target.value })
                        }
                        onBlur={commitPropertyChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78]"
                        rows={3}
                      />
                    </div>

                    {/* Font Family & Size */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Font Family
                        </label>
                        <select
                          value={selectedEl.fontFamily || "Inter"}
                          onChange={(e) => {
                            updateSelectedElement({
                              fontFamily: e.target.value,
                            });
                            commitPropertyChange();
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78]"
                        >
                          {FONTS.map((font) => (
                            <option key={font} value={font} className="bg-slate-900 text-white">
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Font Size (px)
                        </label>
                        <input
                          type="number"
                          value={selectedEl.fontSize || 24}
                          onChange={(e) =>
                            updateSelectedElement({
                              fontSize: Math.max(
                                8,
                                parseInt(e.target.value) || 12,
                              ),
                            })
                          }
                          onBlur={commitPropertyChange}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78]"
                        />
                      </div>
                    </div>

                    {/* Text Styling Modifiers */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                        Style
                      </label>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            updateSelectedElement({ bold: !selectedEl.bold });
                            commitPropertyChange();
                          }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                            selectedEl.bold
                              ? "bg-[#ff2d78] border-[#ff2d78] text-slate-950"
                              : "bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-800"
                          }`}
                        >
                          B
                        </button>
                        <button
                          onClick={() => {
                            updateSelectedElement({
                              italic: !selectedEl.italic,
                            });
                            commitPropertyChange();
                          }}
                          className={`flex-1 py-1.5 text-xs italic rounded-lg border transition-all ${
                            selectedEl.italic
                              ? "bg-[#ff2d78] border-[#ff2d78] text-slate-950"
                              : "bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-800"
                          }`}
                        >
                          I
                        </button>
                        <button
                          onClick={() => {
                            updateSelectedElement({
                              underline: !selectedEl.underline,
                            });
                            commitPropertyChange();
                          }}
                          className={`flex-1 py-1.5 text-xs underline rounded-lg border transition-all ${
                            selectedEl.underline
                              ? "bg-[#ff2d78] border-[#ff2d78] text-slate-950"
                              : "bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-800"
                          }`}
                        >
                          U
                        </button>
                      </div>
                    </div>

                    {/* Alignment */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Alignment
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-950/40 p-1 rounded-lg border border-slate-800">
                        {(["left", "center", "right"] as const).map((al) => (
                          <button
                            key={al}
                            onClick={() => {
                              updateSelectedElement({ align: al });
                              commitPropertyChange();
                            }}
                            className={`py-1.5 rounded flex items-center justify-center transition-all ${
                              selectedEl.align === al
                                ? "bg-slate-800 text-[#ff2d78]"
                                : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <line
                                x1="3"
                                y1="6"
                                x2="21"
                                y2="6"
                                strokeWidth="2"
                              />
                              <line
                                x1="6"
                                y1="12"
                                x2="18"
                                y2="12"
                                strokeWidth="2"
                              />
                              <line
                                x1="3"
                                y1="18"
                                x2="21"
                                y2="18"
                                strokeWidth="2"
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color & Border Outline */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Text Color
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={selectedEl.color || "#000000"}
                            onChange={(e) =>
                              updateSelectedElement({ color: e.target.value })
                            }
                            onBlur={commitPropertyChange}
                            className="bg-transparent border-0 cursor-pointer w-8 h-8 rounded-lg"
                          />
                          <span className="text-xs uppercase font-mono">
                            {selectedEl.color || "#000000"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Outline Stroke
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            value={selectedEl.strokeColor || "#ffffff"}
                            onChange={(e) =>
                              updateSelectedElement({
                                strokeColor: e.target.value,
                                strokeWidth: selectedEl.strokeWidth || 1,
                              })
                            }
                            onBlur={commitPropertyChange}
                            className="bg-transparent border-0 cursor-pointer w-8 h-8 rounded-lg"
                          />
                          <input
                            type="number"
                            value={selectedEl.strokeWidth || 0}
                            min={0}
                            max={8}
                            onChange={(e) =>
                              updateSelectedElement({
                                strokeWidth: parseInt(e.target.value) || 0,
                              })
                            }
                            onBlur={commitPropertyChange}
                            className="w-12 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-center text-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedEl.type === "shape" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Fill Color
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={selectedEl.fillColor || "#3b82f6"}
                          onChange={(e) =>
                            updateSelectedElement({ fillColor: e.target.value })
                          }
                          onBlur={commitPropertyChange}
                          className="bg-transparent border-0 cursor-pointer w-8 h-8 rounded-lg"
                        />
                        <span className="text-xs uppercase font-mono">
                          {selectedEl.fillColor || "#3b82f6"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Border Width
                        </label>
                        <input
                          type="number"
                          value={selectedEl.borderWidth || 0}
                          min={0}
                          max={20}
                          onChange={(e) =>
                            updateSelectedElement({
                              borderWidth: parseInt(e.target.value) || 0,
                            })
                          }
                          onBlur={commitPropertyChange}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Border Color
                        </label>
                        <input
                          type="color"
                          value={selectedEl.borderColor || "#000000"}
                          onChange={(e) =>
                            updateSelectedElement({
                              borderColor: e.target.value,
                            })
                          }
                          onBlur={commitPropertyChange}
                          className="bg-transparent border-0 cursor-pointer w-8 h-8 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedEl.type === "clipart" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Clipart Tint Color
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={selectedEl.color || "#000000"}
                          onChange={(e) =>
                            updateSelectedElement({ color: e.target.value })
                          }
                          onBlur={commitPropertyChange}
                          className="bg-transparent border-0 cursor-pointer w-8 h-8 rounded-lg"
                        />
                        <span className="text-xs uppercase font-mono">
                          {selectedEl.color || "#000000"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedEl.type === "image" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800 text-[11px] leading-relaxed">
                      <div className="font-bold mb-1">
                        Resolution Quality Check:
                      </div>
                      {selectedEl.resolutionQuality === "excellent" && (
                        <div className="text-green-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> High DPI
                          (Perfect for Print)
                        </div>
                      )}
                      {selectedEl.resolutionQuality === "good" && (
                        <div className="text-[#ff2d78] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Good Quality
                        </div>
                      )}
                      {selectedEl.resolutionQuality === "poor" && (
                        <div className="text-red-400 font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Low
                          Resolution Warning! Layout might print blurry.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Shared Properties: Rotation & Opacity */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">
                      Rotation (°)
                    </label>
                    <input
                      type="number"
                      value={selectedEl.rotation || 0}
                      onChange={(e) =>
                        updateSelectedElement({
                          rotation: parseInt(e.target.value) || 0,
                        })
                      }
                      onBlur={commitPropertyChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">
                      Opacity (%)
                    </label>
                    <input
                      type="number"
                      value={Math.round(
                        (selectedEl.opacity !== undefined
                          ? selectedEl.opacity
                          : 1) * 100,
                      )}
                      min={10}
                      max={100}
                      onChange={(e) => {
                        const val = Math.max(
                          10,
                          Math.min(100, parseInt(e.target.value) || 100),
                        );
                        updateSelectedElement({ opacity: val / 100 });
                      }}
                      onBlur={commitPropertyChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>
            ) : (
              {/* Default properties: Canvas parameters */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Canvas Settings
                </span>

                {/* Sizes Selection */}
                {registryProduct ? (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Size Selection
                    </label>
                    <select
                      value={canvasSize.label}
                      onChange={(e) => {
                        const sizeOpt = registryProduct.config.sizes.find(
                          (s) => s.label === e.target.value,
                        );
                        if (sizeOpt) {
                          const parts = sizeOpt.value.split("x");
                          let h = parseFloat(parts[0]) || 2;
                          let w = parseFloat(parts[1]) || 3.5;
                          if (productId === "business-cards") {
                            w = 3.5;
                            h = 2;
                          }
                          if (productId === "rollup" || productId === "roll-up-banners" || sizeOpt.value.includes("33x80") || sizeOpt.value.includes("46x80")) {
                            const dim1 = w;
                            const dim2 = h;
                            w = Math.min(dim1, dim2);
                            h = Math.max(dim1, dim2);
                          }
                          setCanvasSize({
                            label: sizeOpt.label,
                            width: w,
                            height: h,
                            priceAdder: sizeOpt.basePrice - registryProduct.config.sizes[0].basePrice,
                          });
                        }
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78] font-semibold"
                    >
                      {registryProduct.config.sizes.map((sz) => (
                        <option key={sz.value} value={sz.label} className="bg-slate-900 text-white">
                          {sz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  /* Sign Sizes fallback */
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Board Dimensions
                    </label>
                    {productId === "rollup" || productId === "roll-up-banners" || urlHeight === "79" || urlHeight === "80" ? (
                      <div className="w-full bg-slate-950/45 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-semibold">
                        {canvasSize.width}" x {canvasSize.height}" (Fixed Size)
                      </div>
                    ) : (
                      <select
                        value={canvasSize.label}
                        onChange={(e) => {
                          const found = BOARD_SIZES.find(
                            (s) => s.label === e.target.value,
                          );
                          if (found) setCanvasSize(found);
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78]"
                      >
                        {BOARD_SIZES.map((sz) => (
                          <option key={sz.label} value={sz.label} className="bg-slate-900 text-white">
                            {sz.label}{" "}
                            {sz.priceAdder > 0
                              ? `(+${sz.priceAdder.toFixed(2)})`
                              : sz.priceAdder < 0
                                ? `(-${Math.abs(sz.priceAdder).toFixed(2)})`
                                : ""}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}

                {/* Materials Selection / Dynamic selects */}
                {registryProduct ? (
                  <>
                    {registryProduct.config.selects?.map((sel) => (
                      <div key={sel.label}>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          {sel.label}
                        </label>
                        <select
                          value={selectValues[sel.label]?.value || ""}
                          onChange={(e) => {
                            const opt = sel.options.find(
                              (o) => o.value === e.target.value,
                            );
                            if (opt) {
                              setSelectValues((prev) => ({
                                ...prev,
                                [sel.label]: opt,
                              }));
                              const labelLower = sel.label.toLowerCase();
                              if (
                                labelLower === "sides" ||
                                labelLower === "back side" ||
                                labelLower === "backside printing" ||
                                labelLower === "printing"
                              ) {
                                setDoubleSided(opt.value === "double" || opt.value === "double_sided");
                              }
                            }
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78] font-semibold"
                        >
                          {sel.options.map((o) => (
                            <option key={o.value} value={o.value} className="bg-slate-900 text-white">
                              {o.label}
                              {o.priceAdder > 0
                                ? ` (+${o.priceAdder.toFixed(2)})`
                                : ""}
                            </option>
                          ))}
                        </select>
                        {selectValues[sel.label]?.description && (
                          <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                            {selectValues[sel.label].description}
                          </p>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  /* Sign Material fallback */
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Product Material
                    </label>
                    <select
                      value={material.value}
                      onChange={(e) => {
                        const found = availableMaterials.find(
                          (m) => m.value === e.target.value,
                        );
                        if (found) setMaterial(found);
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#ff2d78]"
                    >
                      {availableMaterials.map((m) => (
                        <option key={m.value} value={m.value} className="bg-slate-900 text-white">
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-normal">
                      {material.desc}
                    </p>
                  </div>
                )}

                {/* Single/Double Sided Toggle - only show if there is no explicit sides select */}
                {(["door-hangers", "flyers"].includes(productId)) && (!registryProduct || 
                  !registryProduct.config.selects?.some(s => s.label.toLowerCase() === "sides" || s.label.toLowerCase() === "back side" || s.label.toLowerCase() === "backside printing" || s.label.toLowerCase() === "printing")
                ) && (
                  <div className="flex items-center justify-between py-2 border-t border-b border-slate-800">
                    <div>
                      <label className="text-[11px] font-bold text-slate-350 block">
                        Double-Sided Printing
                      </label>
                      <span className="text-[10px] text-slate-500 block">
                        Print design on both sides (+25%)
                      </span>
                    </div>
                    <button
                      onClick={() => setDoubleSided(!doubleSided)}
                      className={`w-11 h-6 rounded-full relative transition-colors ${doubleSided ? "bg-[#ff2d78]" : "bg-slate-700"}`}
                    >
                      <div
                        className={`w-4 h-4 bg-slate-950 rounded-full absolute top-1 transition-transform ${doubleSided ? "left-6" : "left-1"}`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section B: Pricing Configuration (Floating Bottom Right) */}
        <div className={`absolute right-0 md:right-4 bottom-14 md:bottom-4 z-30 w-full md:w-80 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-t-2xl md:rounded-2xl shadow-2xl transition-all duration-300 ${selectedEl || activeTab ? 'translate-y-[150%] md:translate-y-0 md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto' : 'translate-y-0 opacity-100'}`}>
          {/* Mobile Collapse Toggle */}
          <button 
            className="w-full flex md:hidden items-center justify-between p-3 border-b border-slate-800 bg-slate-800/30 rounded-t-2xl active:bg-slate-800/60"
            onClick={() => setIsPricingExpanded(!isPricingExpanded)}
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Total</span>
              <span className="text-sm font-bold text-[#ff2d78]">${calculatedPrice.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{isPricingExpanded ? "Close" : "Checkout"}</span>
              <ChevronDown className={`w-4 h-4 text-[#ff2d78] transition-transform duration-300 ${isPricingExpanded ? "rotate-0" : "rotate-180"}`} />
            </div>
          </button>

          <div className={`p-4 md:p-5 space-y-4 ${isPricingExpanded ? "block" : "hidden md:block"}`}>
              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">
                  Order Quantity
                </label>
                <div className="flex items-center gap-3">
                  {registryProduct?.config.quantityOptions ? (
                    <div className="relative flex bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 shadow-inner">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
                        className="appearance-none bg-transparent pr-7 focus:outline-none font-bold text-xs text-slate-100 cursor-pointer"
                      >
                        {registryProduct.config.quantityOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="flex bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-12 text-center bg-transparent focus:outline-none font-bold text-xs text-slate-100"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                  <span className="text-[10px] text-slate-500">
                    {registryProduct ? registryProduct.config.qtyDiscount : "Buy 10+ for 5% off, 25+ for 10% off"}
                  </span>
                </div>
              </div>

              {/* Price Breakdown Summary */}
              <div className="bg-slate-950/60 rounded-xl border border-slate-800 p-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Unit Cost:</span>
                  <span>${calculatedPrice.unitPrice} each</span>
                </div>
                <div className="h-px bg-slate-800 my-1" />
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-350">
                    Final Subtotal:
                  </span>
                  <span className="text-xl font-bold text-[#ff2d78]">
                    ${calculatedPrice.total}
                  </span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={isSubmitting}
                className="w-full bg-[#ff2d78] hover:opacity-90 text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg hover:shadow-pink-500/10 mb-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    Generating Proof...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </div>
      </div>

      {/* ── 4. CHECKOUT PREVIEW MODAL ── */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Left Hand Render Preview */}
            <div className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 relative">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest absolute top-4 left-4">
                Visual Proof
              </h3>

              {(() => {
                let proofElements = elements;
                let proofBgColor = bgColor;
                let proofBgGradient = bgGradient;
                let proofBgImage = bgImage;

                if (doubleSided) {
                  const currentFront = activeSide === "front" ? elements : frontElements;
                  const currentBack = activeSide === "back" ? elements : backElements;
                  const currentFrontBg = activeSide === "front" ? bgColor : frontBgColor;
                  const currentBackBg = activeSide === "back" ? bgColor : backBgColor;
                  const currentFrontGrad = activeSide === "front" ? bgGradient : frontBgGradient;
                  const currentBackGrad = activeSide === "back" ? bgGradient : backBgGradient;
                  const currentFrontImg = activeSide === "front" ? bgImage : frontBgImage;
                  const currentBackImg = activeSide === "back" ? bgImage : backBgImage;

                  proofElements = modalPreviewSide === "front" ? currentFront : currentBack;
                  proofBgColor = modalPreviewSide === "front" ? currentFrontBg : currentBackBg;
                  proofBgGradient = modalPreviewSide === "front" ? currentFrontGrad : currentBackGrad;
                  proofBgImage = modalPreviewSide === "front" ? currentFrontImg : currentBackImg;
                }

                return (
                  <div
                    className="w-full aspect-[4/3] rounded-xl border border-slate-800 shadow-xl overflow-hidden relative flex items-center justify-center"
                    style={{
                      backgroundColor: proofBgColor,
                      backgroundImage:
                        proofBgGradient || (proofBgImage ? `url(${proofBgImage})` : "none"),
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {doubleSided && (
                      <div className="absolute top-4 right-4 flex gap-1 bg-slate-900/80 border border-slate-800 rounded-lg p-0.5 z-40 pointer-events-auto">
                        <button
                          onClick={() => setModalPreviewSide("front")}
                          className={`px-2 py-1 text-[10px] font-bold rounded ${
                            modalPreviewSide === "front"
                              ? "bg-[#ff2d78] text-slate-950"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Front
                        </button>
                        <button
                          onClick={() => setModalPreviewSide("back")}
                          className={`px-2 py-1 text-[10px] font-bold rounded ${
                            modalPreviewSide === "back"
                              ? "bg-[#ff2d78] text-slate-950"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Back
                        </button>
                      </div>
                    )}
                    {proofElements.map((el) => (
                      <div
                        key={el.id}
                        className="absolute flex items-center justify-center pointer-events-none"
                        style={{
                          left: `${el.x}%`,
                          top: `${el.y}%`,
                          width: `${el.width}%`,
                          height: `${el.height}%`,
                          transform: `rotate(${el.rotation || 0}deg)`,
                          transformOrigin: "center center",
                          opacity: el.opacity !== undefined ? el.opacity : 1,
                        }}
                      >
                        {el.type === "text" && (
                          <div
                            className="w-full h-full text-center flex items-center justify-center select-none truncate"
                            style={{
                              fontFamily: el.fontFamily || "Inter",
                              color: el.color || "#000000",
                              fontWeight: el.bold ? "bold" : "normal",
                              fontStyle: el.italic ? "italic" : "normal",
                              textDecoration: el.underline ? "underline" : "none",
                              fontSize: `${(el.fontSize || 24) * 0.55}px`,
                              lineHeight: "1.1",
                              WebkitTextStroke: el.strokeColor
                                ? `${(el.strokeWidth || 1) * 0.55}px ${el.strokeColor}`
                                : "none",
                            }}
                          >
                            {el.content}
                          </div>
                        )}
                        {el.type === "shape" && (
                          <div className="w-full h-full flex items-center justify-center p-1">
                            {el.shapeType === "rect" && (
                              <div
                                className="w-full h-full"
                                style={{
                                  backgroundColor: el.fillColor,
                                  border: el.borderWidth
                                    ? `${el.borderWidth * 0.5}px solid ${el.borderColor}`
                                    : "none",
                                }}
                              />
                            )}
                            {el.shapeType === "circle" && (
                              <div
                                className="w-full h-full rounded-full"
                                style={{
                                  backgroundColor: el.fillColor,
                                  border: el.borderWidth
                                    ? `${el.borderWidth * 0.5}px solid ${el.borderColor}`
                                    : "none",
                                }}
                              />
                            )}
                          </div>
                        )}
                        {el.type === "clipart" && el.clipartId && (
                          <div className="w-full h-full p-1.5 text-center flex items-center justify-center">
                            <Layers
                              className="w-6 h-6"
                              style={{ color: el.color }}
                            />
                          </div>
                        )}
                        {el.type === "image" && el.imageUrl && (
                          <div className="w-full h-full p-0.5 flex items-center justify-center">
                            <img
                              src={el.imageUrl}
                              alt="preview"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="mt-4 text-[10px] text-slate-500 text-center">
                Mock representation of final printed product dimensions (
                {canvasSize.width}"x{canvasSize.height}")
              </div>
            </div>

            {/* Right Hand Form Details */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between overflow-y-auto">
              {checkoutStep === "review" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-slate-100 font-poppins">
                      Order Details
                    </h2>
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded bg-slate-800"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-3 text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Product:</span>
                      <span className="font-semibold text-slate-200">
                        {material.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Dimensions:</span>
                      <span className="font-semibold text-slate-200">
                        {canvasSize.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Sides:</span>
                      <span className="font-semibold text-slate-200">
                        {doubleSided
                          ? "Double-sided Printing"
                          : "Single-sided Printing"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Quantity:</span>
                      <span className="font-semibold text-slate-200">
                        {quantity} units
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800/80">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-green-400 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-green-500" /> Free
                      Artwork Check
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Our in-house design experts will automatically audit
                      alignment, color spacing, and image resolution before
                      printing.
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-400">Total Price:</span>
                      <span className="font-bold text-[#ff2d78]">
                        ${calculatedPrice.total}
                      </span>
                    </div>
                    {!user && (
                      <div className="bg-amber-950/40 border border-amber-800 rounded-lg p-3 text-xs text-amber-300 flex items-start gap-2 mb-3">
                        <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                        <span>
                          You must be <strong>signed in</strong> to place an order. Please log in first.
                        </span>
                      </div>
                    )}

                    {submitError && (
                      <div className="bg-red-950/50 border border-red-800 rounded-lg p-3 text-xs text-red-300 flex items-start gap-2 mb-3">
                        <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-red-400" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button
                      onClick={handleAddDesignToCartAndCheckout}
                      disabled={isSubmitting || !user}
                      className="w-full bg-[#ff2d78] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4.5 h-4.5 animate-spin" /> Preparing Checkout...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4.5 h-4.5" /> Add to Cart &amp; Checkout
                        </>
                      )}
                    </button>
                    {/* Other steps are now handled on the unified /checkout page */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offscreen Export Container */}
      <div
        className="absolute overflow-hidden pointer-events-none select-none"
        style={{ left: "-9999px", top: "-9999px" }}
      >
        <div
          id="export-canvas-front"
          style={{
            width: "800px",
            height: `${800 * (canvasSize.height / canvasSize.width)}px`,
            position: "relative",
            backgroundColor: activeSide === "front" ? bgColor : frontBgColor,
            backgroundImage: activeSide === "front" ? (bgGradient || (bgImage ? `url(${bgImage})` : "none")) : (frontBgGradient || (frontBgImage ? `url(${frontBgImage})` : "none")),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {(activeSide === "front" ? elements : frontElements)
            .filter((el) => !(el.x + el.width <= 0 || el.x >= 100 || el.y + el.height <= 0 || el.y >= 100))
            .map((el) => (
            <div
              key={el.id}
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.width}%`,
                height: `${el.height}%`,
                transform: `rotate(${el.rotation || 0}deg)`,
                transformOrigin: "center center",
                opacity: el.opacity !== undefined ? el.opacity : 1,
              }}
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                {el.type === "text" && (
                  <div
                    className="w-full h-full flex items-center truncate"
                    style={{
                      fontFamily: el.fontFamily || "Inter",
                      color: el.color || "#000000",
                      fontWeight: el.bold ? "bold" : "normal",
                      fontStyle: el.italic ? "italic" : "normal",
                      textDecoration: el.underline ? "underline" : "none",
                      justifyContent:
                        el.align === "left"
                          ? "flex-start"
                          : el.align === "right"
                            ? "flex-end"
                            : "center",
                      textAlign: el.align || "center",
                      fontSize: `${el.fontSize || 32}px`,
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.1",
                      WebkitTextStroke: el.strokeColor
                        ? `${el.strokeWidth || 1}px ${el.strokeColor}`
                        : "none",
                    }}
                  >
                    {el.content || ""}
                  </div>
                )}

                {el.type === "shape" && (
                  <div className="w-full h-full flex items-center justify-center p-1">
                    {el.shapeType === "rect" && (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${el.borderWidth}px solid ${el.borderColor || "#000"}`
                            : "none",
                          borderRadius: "2px",
                        }}
                      />
                    )}
                    {el.shapeType === "circle" && (
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${el.borderWidth}px solid ${el.borderColor || "#000"}`
                            : "none",
                        }}
                      />
                    )}
                    {el.shapeType === "triangle" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,5 95,95 5,95"
                          fill={el.fillColor || "#3b82f6"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "star" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,2 64,36 100,36 71,57 81,95 50,72 19,95 29,57 0,36 36,36"
                          fill={el.fillColor || "#eab308"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "line" && (
                      <div
                        className="w-full"
                        style={{
                          height: `${el.borderWidth || 4}px`,
                          backgroundColor: el.fillColor || "#000",
                        }}
                      />
                    )}
                  </div>
                )}

                {el.type === "clipart" && el.clipartId && (
                  <div className="w-full h-full p-1.5 flex items-center justify-center">
                    {(() => {
                      const formattedId = el.clipartId
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join("");
                      const IconComp = (Icons as any)[formattedId] || Icons.HelpCircle;
                      return <IconComp className="w-full h-full" style={{ color: el.color }} />;
                    })()}
                  </div>
                )}

                {el.type === "image" && el.imageUrl && (
                  <div className="w-full h-full relative flex items-center justify-center p-0.5">
                    <img
                      src={el.imageUrl}
                      alt="Uploaded element"
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          id="export-canvas-back"
          style={{
            width: "800px",
            height: `${800 * (canvasSize.height / canvasSize.width)}px`,
            position: "relative",
            backgroundColor: activeSide === "back" ? bgColor : backBgColor,
            backgroundImage: activeSide === "back" ? (bgGradient || (bgImage ? `url(${bgImage})` : "none")) : (backBgGradient || (backBgImage ? `url(${backBgImage})` : "none")),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {(activeSide === "back" ? elements : backElements)
            .filter((el) => !(el.x + el.width <= 0 || el.x >= 100 || el.y + el.height <= 0 || el.y >= 100))
            .map((el) => (
            <div
              key={el.id}
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.width}%`,
                height: `${el.height}%`,
                transform: `rotate(${el.rotation || 0}deg)`,
                transformOrigin: "center center",
                opacity: el.opacity !== undefined ? el.opacity : 1,
              }}
            >
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                {el.type === "text" && (
                  <div
                    className="w-full h-full flex items-center truncate"
                    style={{
                      fontFamily: el.fontFamily || "Inter",
                      color: el.color || "#000000",
                      fontWeight: el.bold ? "bold" : "normal",
                      fontStyle: el.italic ? "italic" : "normal",
                      textDecoration: el.underline ? "underline" : "none",
                      justifyContent:
                        el.align === "left"
                          ? "flex-start"
                          : el.align === "right"
                            ? "flex-end"
                            : "center",
                      textAlign: el.align || "center",
                      fontSize: `${el.fontSize || 32}px`,
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.1",
                      WebkitTextStroke: el.strokeColor
                        ? `${el.strokeWidth || 1}px ${el.strokeColor}`
                        : "none",
                    }}
                  >
                    {el.content || ""}
                  </div>
                )}

                {el.type === "shape" && (
                  <div className="w-full h-full flex items-center justify-center p-1">
                    {el.shapeType === "rect" && (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${el.borderWidth}px solid ${el.borderColor || "#000"}`
                            : "none",
                          borderRadius: "2px",
                        }}
                      />
                    )}
                    {el.shapeType === "circle" && (
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: el.fillColor || "#3b82f6",
                          border: el.borderWidth
                            ? `${el.borderWidth}px solid ${el.borderColor || "#000"}`
                            : "none",
                        }}
                      />
                    )}
                    {el.shapeType === "triangle" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,5 95,95 5,95"
                          fill={el.fillColor || "#3b82f6"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "star" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          points="50,2 64,36 100,36 71,57 81,95 50,72 19,95 29,57 0,36 36,36"
                          fill={el.fillColor || "#eab308"}
                          stroke={el.borderColor || "#000"}
                          strokeWidth={el.borderWidth ? el.borderWidth * 2 : 0}
                        />
                      </svg>
                    )}
                    {el.shapeType === "line" && (
                      <div
                        className="w-full"
                        style={{
                          height: `${el.borderWidth || 4}px`,
                          backgroundColor: el.fillColor || "#000",
                        }}
                      />
                    )}
                  </div>
                )}

                {el.type === "clipart" && el.clipartId && (
                  <div className="w-full h-full p-1.5 flex items-center justify-center">
                    {(() => {
                      const formattedId = el.clipartId
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join("");
                      const IconComp = (Icons as any)[formattedId] || Icons.HelpCircle;
                      return <IconComp className="w-full h-full" style={{ color: el.color }} />;
                    })()}
                  </div>
                )}

                {el.type === "image" && el.imageUrl && (
                  <div className="w-full h-full relative flex items-center justify-center p-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={el.imageUrl}
                      alt="Uploaded element"
                      className="max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesignPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-200">
          Loading designer...
        </div>
      }
    >
      <DesignPageContent />
    </React.Suspense>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Info, ShieldCheck, Zap, Scissors } from "lucide-react";

interface Option {
  label: string;
  value: string;
  priceModifier?: number;
  description?: string;
}

interface ProductConfiguratorProps {
  basePrice: number;
  sizes: Option[];
  materials: Option[];
  sides: Option[];
  cassettes: Option[];
  coatings: Option[];
  productId?: string;
}

export function ProductConfigurator({
  basePrice,
  sizes,
  materials,
  sides,
  cassettes,
  coatings,
  productId = "51060",
}: ProductConfiguratorProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedSide, setSelectedSide] = useState(sides[0]);
  const [selectedCassette, setSelectedCassette] = useState(cassettes[0]);
  const [selectedCoating, setSelectedCoating] = useState(coatings[0]);
  const [quantity, setQuantity] = useState(1);

  const customizeUrl = useMemo(() => {
    const parts = selectedSize.value.split("x");
    if (parts.length === 2) {
      const height = parts[0];
      const width = parts[1];
      return `/PrintDesignExperience/Load?productId=${productId}&width=${width}&height=${height}`;
    }
    return `/PrintDesignExperience/Load?productId=${productId}`;
  }, [productId, selectedSize.value]);

  const totalPrice = useMemo(() => {
    let price = basePrice;
    price += selectedSize.priceModifier || 0;
    price += selectedMaterial.priceModifier || 0;
    price += selectedSide.priceModifier || 0;
    price += selectedCassette.priceModifier || 0;
    price += selectedCoating.priceModifier || 0;

    // Quantity discounts
    let discount = 1;
    if (quantity >= 25) discount = 0.9;
    else if (quantity >= 10) discount = 0.95;
    else if (quantity >= 5) discount = 0.98;

    return (price * quantity * discount).toFixed(2);
  }, [
    basePrice,
    selectedSize,
    selectedMaterial,
    selectedSide,
    selectedCassette,
    selectedCoating,
    quantity,
  ]);

  const unitPrice = (parseFloat(totalPrice) / quantity).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-6">
      <div className="space-y-6">
        {/* Price Display */}
        <div className="pb-6 border-b border-gray-100">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold text-gray-900">
              ${totalPrice}
            </span>
            <span className="text-gray-500 mb-1 text-sm">Total</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">${unitPrice} each</span>
            {quantity >= 5 && (
              <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                Bulk Discount Applied!
              </span>
            )}
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-5">
          {/* Size */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Size (H x W)
            </label>
            <div className="relative">
              <select
                value={selectedSize.value}
                onChange={(e) =>
                  setSelectedSize(
                    sizes.find((s) => s.value === e.target.value)!,
                  )
                }
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#ff2d78] cursor-pointer text-sm"
              >
                {sizes.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Material
            </label>
            <div className="relative">
              <select
                value={selectedMaterial.value}
                onChange={(e) =>
                  setSelectedMaterial(
                    materials.find((m) => m.value === e.target.value)!,
                  )
                }
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer text-sm"
              >
                {materials.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <p className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
              <Info className="w-3 h-3" /> {selectedMaterial.description}
            </p>
          </div>

          {/* Sides */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Sides
            </label>
            <div className="grid grid-cols-2 gap-3">
              {sides.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedSide(option)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                    selectedSide.value === option.value
                      ? "border-[#ff2d78] bg-pink-50 text-gray-900 border-2"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cassette */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Cassette Type
            </label>
            <div className="relative">
              <select
                value={selectedCassette.value}
                onChange={(e) =>
                  setSelectedCassette(
                    cassettes.find((c) => c.value === e.target.value)!,
                  )
                }
                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer text-sm"
              >
                {cassettes.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Coating */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Protective Coating
            </label>
            <div className="grid grid-cols-2 gap-3">
              {coatings.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCoating(option)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                    selectedCoating.value === option.value
                      ? "border-[#ff2d78] bg-pink-50 text-gray-900 border-2"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center bg-transparent focus:outline-none font-bold text-sm"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Buy 5+ for 2% off, 10+ for 5% off
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <Link
            href={customizeUrl}
            className="w-full block text-center text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
            }}
          >
            Customize Now
          </Link>
          <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]">
            Add to Cart
          </button>
        </div>

        {/* Trust Factors */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="flex flex-col items-center text-center gap-1">
            <Zap className="w-5 h-5 text-[#ff2d78]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Fast Ship
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <ShieldCheck className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

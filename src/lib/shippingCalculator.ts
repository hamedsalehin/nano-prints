// ── Core Shipping Calculator Engine ──────────────────────────────────────────

export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  deliveryEstimate: string;
  description: string;
}

export interface PhysicalSpecs {
  weightLbs: number;
  isFreight: boolean;
  lengthInches: number;
  widthInches: number;
  heightInches: number;
}

/**
 * Parses size strings like "18\" x 24\"", "8' x 10'", "3ft x 8ft", or "24x36"
 * and returns dimensions in inches and area in square feet.
 */
export function parseDimensions(sizeStr: string): { width: number; height: number; areaSqFt: number } {
  if (!sizeStr) return { width: 12, height: 12, areaSqFt: 1 };

  try {
    const clean = sizeStr.replace(/\\/g, "").replace(/"/g, "").replace(/”/g, "").replace(/’/g, "'").trim();
    // split by x, * or by
    const parts = clean.split(/x|\*|by/i).map(p => p.trim());
    if (parts.length >= 2) {
      const w = parseFloat(parts[0]);
      const h = parseFloat(parts[1]);

      const isWFeet = parts[0].includes("'") || parts[0].toLowerCase().includes("ft");
      const isHFeet = parts[1].includes("'") || parts[1].toLowerCase().includes("ft");

      const wIn = isWFeet ? w * 12 : w;
      const hIn = isHFeet ? h * 12 : h;

      if (isNaN(wIn) || isNaN(hIn)) {
        return { width: 12, height: 12, areaSqFt: 1 };
      }

      return {
        width: wIn,
        height: hIn,
        areaSqFt: (wIn * hIn) / 144
      };
    }
  } catch (e) {
    console.warn("Failed to parse size string:", sizeStr, e);
  }

  return { width: 12, height: 12, areaSqFt: 1 };
}

/**
 * Determines weight, freight eligibility, and bounding box dimensions for an item.
 */
export function getItemPhysicalSpecs(
  productTitle: string,
  sizeStr: string,
  customOptions: Record<string, string> = {}
): PhysicalSpecs {
  const title = productTitle.toLowerCase();
  const { width, height, areaSqFt } = parseDimensions(sizeStr);

  let weightLbs = 1.0;
  let isFreight = false;
  let lengthInches = Math.max(width, height);
  let widthInches = Math.min(width, height);
  let heightInches = 1.0; // thickness/depth

  // 1. Check by Category / Product Title
  if (title.includes("banner")) {
    if (title.includes("retractable") || title.includes("roll up") || title.includes("roll-up")) {
      weightLbs = 12.0;
      lengthInches = 36.0;
      widthInches = 6.0;
      heightInches = 6.0;
    } else {
      // Standard vinyl banner (~0.1 lbs per sqft) or fabric banner (~0.06 lbs per sqft)
      const multiplier = title.includes("fabric") ? 0.07 : 0.11;
      weightLbs = Math.max(1.0, areaSqFt * multiplier);
      lengthInches = Math.max(12, lengthInches);
      widthInches = Math.max(6, widthInches / 4); // rolled up banner dimensions
      heightInches = 4.0;
    }
  } else if (title.includes("tablecloth") || title.includes("runner")) {
    weightLbs = 2.5;
    lengthInches = 12.0;
    widthInches = 12.0;
    heightInches = 3.0;
  } else if (title.includes("tent") || title.includes("canopy")) {
    // Event Canopy Tents are heavy and large, triggers freight
    weightLbs = 48.0;
    lengthInches = 62.0;
    widthInches = 10.0;
    heightInches = 10.0;
    isFreight = true;
  } else if (title.includes("tension fabric") || title.includes("pop up display")) {
    weightLbs = 28.0;
    lengthInches = 36.0;
    widthInches = 12.0;
    heightInches = 12.0;
  } else if (title.includes("a-frame")) {
    weightLbs = 22.0;
    lengthInches = 42.0;
    widthInches = 26.0;
    heightInches = 5.0;
  } else if (title.includes("yard sign")) {
    // Yard signs weight = coroplast + stakes
    const quantity = parseInt(customOptions["Quantity"] || "1") || 1;
    let unitWeight = 0.3; // coroplast sheet
    const hardware = (customOptions["Stands / Stakes"] || customOptions["Stakes"] || "").toLowerCase();
    
    if (hardware.includes("wood yard arm") || hardware.includes("l-shaped")) {
      unitWeight += 5.5; // heavy wood/metal arm post
    } else if (hardware.includes("h-stake") || hardware.includes("wire")) {
      unitWeight += 0.8; // standard H-stake
    }
    
    weightLbs = unitWeight;
    lengthInches = Math.max(18, lengthInches);
    widthInches = Math.max(24, widthInches);
    heightInches = 0.5;
  } else if (title.includes("real estate panel")) {
    let unitWeight = 1.8;
    const frame = (customOptions["Frame / Post"] || customOptions["Frame"] || "").toLowerCase();
    if (frame.includes("metal frame") || frame.includes("banjo")) {
      unitWeight += 14.0;
    } else if (frame.includes("post") || frame.includes("colonial")) {
      unitWeight += 8.5;
    }
    weightLbs = unitWeight;
  } else if (title.includes("aluminum")) {
    weightLbs = Math.max(1.0, areaSqFt * 0.75); // ~0.75 lbs/sqft
  } else if (title.includes("acrylic")) {
    weightLbs = Math.max(1.5, areaSqFt * 1.25); // ~1.25 lbs/sqft
  } else if (title.includes("coroplast")) {
    weightLbs = Math.max(0.5, areaSqFt * 0.25); // ~0.25 lbs/sqft
  } else if (title.includes("foam board")) {
    weightLbs = Math.max(0.5, areaSqFt * 0.15); // ~0.15 lbs/sqft
  } else if (title.includes("parking sign")) {
    weightLbs = 3.0; // standard parking signs are aluminum
    const hardware = (customOptions["Post or Bracket"] || "").toLowerCase();
    if (hardware.includes("u-channel") || hardware.includes("post")) {
      weightLbs += 12.0; // heavy steel post
    }
  } else if (title.includes("business card")) {
    // Business cards: weight per unit
    weightLbs = 4.0 / 1000; // ~4 lbs per 1000 cards
    lengthInches = 8.0;
    widthInches = 4.0;
    heightInches = 3.0;
  } else if (title.includes("postcard") || title.includes("flyer") || title.includes("brochure") || title.includes("door hanger")) {
    weightLbs = 1.2 / 100; // ~1.2 lbs per 100 flyers/postcards
    lengthInches = 11.0;
    widthInches = 8.5;
    heightInches = 2.0;
  } else if (title.includes("t-shirt") || title.includes("t shirt") || title.includes("apparel")) {
    weightLbs = 0.5;
  } else if (title.includes("mug") || title.includes("cup")) {
    weightLbs = 1.3;
    lengthInches = 5.0;
    widthInches = 5.0;
    heightInches = 5.0;
  } else if (title.includes("pen")) {
    weightLbs = 0.03;
  } else if (title.includes("keychain")) {
    weightLbs = 0.05;
  } else if (title.includes("notebook")) {
    weightLbs = 0.4;
  } else if (title.includes("tote bag")) {
    weightLbs = 0.3;
  }

  // 2. Classify based on dimensional properties
  const girth = lengthInches + 2 * (widthInches + heightInches);
  if (weightLbs > 150 || lengthInches > 96 || girth > 130) {
    isFreight = true;
  }

  return {
    weightLbs,
    isFreight,
    lengthInches,
    widthInches,
    heightInches,
  };
}

/**
 * Calculates the shipping rates based on items in the cart and ZIP code.
 */
export function calculateShippingRates(
  items: { productTitle: string; size: string; quantity: number; customOptions?: Record<string, string> }[],
  zipCode: string,
  options: { residential?: boolean; liftgate?: boolean } = {}
): ShippingRate[] {
  let totalWeight = 0;
  let hasFreightItem = false;
  let maxSingleDimension = 0;

  for (const item of items) {
    const specs = getItemPhysicalSpecs(item.productTitle, item.size, item.customOptions || {});
    const itemTotalWeight = specs.weightLbs * item.quantity;
    totalWeight += itemTotalWeight;

    if (specs.isFreight) {
      hasFreightItem = true;
    }

    const itemMaxDim = Math.max(specs.lengthInches, specs.widthInches);
    if (itemMaxDim > maxSingleDimension) {
      maxSingleDimension = itemMaxDim;
    }
  }

  // Freight is triggered if total weight > 150 lbs, maximum single dimension > 96", or marked as freight (e.g. event canopy)
  if (totalWeight > 150 || maxSingleDimension > 96) {
    hasFreightItem = true;
  }

  // Determine if any item has rush turnaround
  let hasRush = false;
  let hasStandard = false;
  for (const item of items) {
    if (item.customOptions?.["Turnaround"] === "Rush services 1-2 days") {
      hasRush = true;
    } else {
      hasStandard = true;
    }
  }

  // 1. Free Local Pickup is always available
  const rates: ShippingRate[] = [
    {
      id: "local_pickup",
      name: "Free Local Pickup",
      price: 0.0,
      deliveryEstimate: "Next Business Day",
      description: "Pick up at our Fort Lauderdale / Oakland Park headquarters: 4567 Powerline Rd",
    },
  ];

  const zip = zipCode.trim();
  const isSouthFlorida = zip.startsWith("330") || zip.startsWith("331") || zip.startsWith("332") || zip.startsWith("333") || zip.startsWith("334");
  const isFlorida = zip.startsWith("32") || zip.startsWith("33") || zip.startsWith("34");

  // Zone distance multiplier
  let zoneMultiplier = 1.0;
  if (!isFlorida) {
    zoneMultiplier = 1.4; // Out of state
  } else if (!isSouthFlorida) {
    zoneMultiplier = 1.15; // North/Central Florida
  }

  if (hasFreightItem) {
    // LTL Freight rates
    let baseFreight = 120.0;
    if (!isSouthFlorida) {
      baseFreight = 180.0;
    }
    if (!isFlorida) {
      baseFreight = 290.0;
    }

    // Weight adder
    const weightAdder = totalWeight * 1.1 * zoneMultiplier;
    let freightCost = baseFreight + weightAdder;

    // Surcharges
    if (options.residential !== false) {
      freightCost += 55.0; // Residential delivery surcharge (default to true/enabled unless specified commercial)
    }
    if (options.liftgate) {
      freightCost += 45.0; // Liftgate service surcharge
    }

    // Round to 2 decimal places
    freightCost = Math.round(freightCost * 100) / 100;

    rates.push({
      id: "ltl_freight",
      name: "LTL Freight Shipping",
      price: freightCost,
      deliveryEstimate: isSouthFlorida ? "2-3 Business Days" : "4-7 Business Days",
      description: `Freight LTL delivery for heavy/oversized items. ${
        options.liftgate ? "Includes liftgate unload." : "Dock or manual unloading required."
      }`,
    });
  } else {
    // Standard Courier Shipping
    let baseStandard = 9.95;
    let baseExpedited = 24.95;

    if (!isSouthFlorida) {
      baseStandard = 14.95;
      baseExpedited = 39.95;
    }
    if (!isFlorida) {
      baseStandard = 19.95;
      baseExpedited = 59.95;
    }

    // Add per-lb charge
    const standardCost = Math.round((baseStandard + totalWeight * 0.75 * zoneMultiplier) * 100) / 100;
    const expeditedCost = Math.round((baseExpedited + totalWeight * 1.5 * zoneMultiplier) * 100) / 100;

    rates.push({
      id: "standard_ground",
      name: "Standard Courier (Ground)",
      price: standardCost,
      deliveryEstimate: hasRush && !hasStandard ? "1-2 Business Days" : "4-5 Business Days",
      description: "Delivered directly to your door via UPS or FedEx Ground.",
    });

    rates.push({
      id: "expedited_courier",
      name: "Expedited Courier (Express)",
      price: expeditedCost,
      deliveryEstimate: "1-2 Business Days",
      description: "Prioritized express shipment for fast delivery.",
    });
  }

  return rates;
}

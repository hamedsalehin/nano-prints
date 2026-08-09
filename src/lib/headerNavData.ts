// Lightweight header navigation data (ONLY 2 KB vs 480 KB full productsRegistry)
export interface HeaderNavProduct {
  id: string;
  name: string;
  breadcrumbHref?: string | null;
}

export const HEADER_NAV_PRODUCTS: Record<string, HeaderNavProduct[]> = {
  "neon-signs": [
    {
      "id": "good-vibes-only",
      "name": "Neon LED Good Vibes Only",
      "breadcrumbHref": null
    },
    {
      "id": "lets-party",
      "name": "Neon LED Let's Party",
      "breadcrumbHref": null
    },
    {
      "id": "game-on",
      "name": "Neon LED Game On",
      "breadcrumbHref": null
    },
    {
      "id": "dream-big",
      "name": "Neon LED Dream Big",
      "breadcrumbHref": null
    },
    {
      "id": "bar-open",
      "name": "Neon LED Bar Open",
      "breadcrumbHref": null
    },
    {
      "id": "hustle",
      "name": "Neon LED Hustle",
      "breadcrumbHref": null
    },
    {
      "id": "open-24-7",
      "name": "Neon LED Open 24/7",
      "breadcrumbHref": null
    },
    {
      "id": "stay-wild",
      "name": "Neon LED Stay Wild",
      "breadcrumbHref": null
    },
    {
      "id": "love-her-wild",
      "name": "Neon LED Love Her Wild",
      "breadcrumbHref": null
    },
    {
      "id": "glow-getter",
      "name": "Neon LED Glow Getter",
      "breadcrumbHref": null
    },
    {
      "id": "man-cave",
      "name": "Neon LED Man Cave",
      "breadcrumbHref": null
    },
    {
      "id": "adventure-awaits",
      "name": "Neon LED Adventure Awaits",
      "breadcrumbHref": "/neon-signs"
    }
  ],
  "custom-banners": [
    {
      "id": "vinyl-banners",
      "name": "Vinyl Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "fabric-banners",
      "name": "Fabric Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "mesh-banners",
      "name": "Mesh Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "pole-banners",
      "name": "Pole Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "breakaway-banners",
      "name": "Breakaway Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "vertical-banners",
      "name": "Vertical Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "roll-up-banners",
      "name": "Retractable / Roll-Up Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "x-banner-stands",
      "name": "X-Banner Stands",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "step-and-repeat-banners",
      "name": "Backdrop Banners",
      "breadcrumbHref": "/custom-banners"
    },
    {
      "id": "tabletop-retractable-banners",
      "name": "Tabletop Retractables",
      "breadcrumbHref": "/custom-banners"
    }
  ],
  "custom-flags": [
    {
      "id": "feather-flags",
      "name": "Feather Flags",
      "breadcrumbHref": "/custom-flags"
    },
    {
      "id": "teardrop-flags",
      "name": "Teardrop Flags",
      "breadcrumbHref": "/custom-flags"
    },
    {
      "id": "straight-flags",
      "name": "Straight Flags",
      "breadcrumbHref": "/custom-flags"
    },
    {
      "id": "flags",
      "name": "Standard Flags",
      "breadcrumbHref": "/custom-flags"
    },
    {
      "id": "pennant-flags",
      "name": "Pennant Flags",
      "breadcrumbHref": "/custom-flags"
    }
  ],
  "vehicle-signs": [
    {
      "id": "bumper-stickers",
      "name": "Bumper Stickers",
      "breadcrumbHref": "/vehicle-signs"
    },
    {
      "id": "license-plates",
      "name": "License Plates",
      "breadcrumbHref": "/vehicle-signs"
    },
    {
      "id": "magnetic-signs",
      "name": "Magnetic Car Signs",
      "breadcrumbHref": "/vehicle-signs"
    },
    {
      "id": "car-door-decals",
      "name": "Car Door Decals",
      "breadcrumbHref": "/vehicle-signs"
    },
    {
      "id": "car-window-decals",
      "name": "Car Window Decals",
      "breadcrumbHref": "/vehicle-signs"
    }
  ],
  "trade-show": [
    {
      "id": "tablecloths",
      "name": "Tablecloths",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "table-runners",
      "name": "Table Runners",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "fitted-tablecloths",
      "name": "Fitted Tablecloths",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "round-tablecloths",
      "name": "Round Tablecloths",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "stretch-tablecloths",
      "name": "Stretch Tablecloths",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "pop-up-displays",
      "name": "Pop-Up Displays",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "step-and-repeat-banner",
      "name": "Backdrop Banners",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "roll-up-banners",
      "name": "Retractable Banner",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "roll-up-banners",
      "name": "Roll Up Banners",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "x-banner-stand",
      "name": "X-Banners",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "tabletop-retractable-banners",
      "name": "Tabletop Retractable Banners",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "custom-canopy-tents",
      "name": "Canopies",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "feather-flags",
      "name": "Feather Flags",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "vinyl-banners",
      "name": "Vinyl Banners",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "business-cards",
      "name": "Business Cards",
      "breadcrumbHref": "/trade-show"
    },
    {
      "id": "postcards",
      "name": "Postcards",
      "breadcrumbHref": "/trade-show"
    }
  ],
  "custom-decals": [
    {
      "id": "bumper-stickers",
      "name": "Bumper Stickers",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "car-door-decals",
      "name": "Car Door Decals",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "car-window-decals",
      "name": "Car Window Decals",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "window-decals",
      "name": "Window Decals",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "roll-labels",
      "name": "Roll Labels",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "window-clings",
      "name": "Static Window Clings",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "sheet-stickers",
      "name": "Sheet Stickers",
      "breadcrumbHref": "/custom-decals"
    },
    {
      "id": "return-address-labels",
      "name": "Return Address Labels",
      "breadcrumbHref": "/custom-decals"
    }
  ],
  "sign-accessories": [
    {
      "id": "h-frames",
      "name": "Metal H-Frame Stakes",
      "breadcrumbHref": "/sign-accessories"
    }
  ],
  "marketing-materials": [
    {
      "id": "business-cards",
      "name": "Business Cards",
      "breadcrumbHref": "/marketing-materials"
    },
    {
      "id": "postcards",
      "name": "Postcards",
      "breadcrumbHref": "/marketing-materials"
    },
    {
      "id": "flyers",
      "name": "Flyers",
      "breadcrumbHref": "/marketing-materials"
    },
    {
      "id": "brochures",
      "name": "Folded Brochures",
      "breadcrumbHref": "/marketing-materials"
    },
    {
      "id": "door-hangers",
      "name": "Door Hangers",
      "breadcrumbHref": "/marketing-materials"
    }
  ],
  "promotional-products": [
    {
      "id": "t-shirts",
      "name": "T-Shirts",
      "breadcrumbHref": "/promotional-products"
    },
    {
      "id": "mugs",
      "name": "Coffee Mugs & Tumblers",
      "breadcrumbHref": "/promotional-products"
    },
    {
      "id": "tote-bags",
      "name": "Canvas Tote Bags",
      "breadcrumbHref": "/promotional-products"
    },
    {
      "id": "pens",
      "name": "Logo Pens",
      "breadcrumbHref": "/promotional-products"
    },
    {
      "id": "notebooks",
      "name": "Journals & Notebooks",
      "breadcrumbHref": "/promotional-products"
    },
    {
      "id": "keychains",
      "name": "Logo Keychains",
      "breadcrumbHref": "/promotional-products"
    },
    {
      "id": "fridge-magnets",
      "name": "Fridge Magnets",
      "breadcrumbHref": "/promotional-products"
    }
  ],
  "custom-signs": [
    {
      "id": "plastic-yard-sign",
      "name": "Plastic yard sign",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "yard-signs",
      "name": "Yard Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "real-estate-panels",
      "name": "Real Estate Panels",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "aluminum-signs",
      "name": "Aluminum Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "a-frame-signs",
      "name": "A-Frame Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "foam-board-signs",
      "name": "High Quality Foam Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "acrylic-signs",
      "name": "Acrylic Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "coroplast-signs",
      "name": "Coroplast Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "window-signs",
      "name": "Window Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "parking-signs",
      "name": "Parking Signs",
      "breadcrumbHref": "/custom-signs"
    },
    {
      "id": "channel-letter-signs",
      "name": "Channel Letter Signs",
      "breadcrumbHref": "/custom-signs"
    }
  ]
};

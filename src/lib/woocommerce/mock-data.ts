import { Product, ProductCategory, JournalArticle } from "@/types/woocommerce";

export const MOCK_CATEGORIES: ProductCategory[] = [
  {
    id: 1,
    name: "The Chronograph",
    slug: "the-chronograph",
    description: "High-precision split-second timers engineered with architectural sub-dials and ceramic tachymeter bezels.",
    count: 6,
    image: {
      id: 101,
      src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85",
      alt: "NOIRÉ Chronograph Collection",
    },
  },
  {
    id: 2,
    name: "The Automatic",
    slug: "the-automatic",
    description: "Self-winding calibers featuring 72-hour power reserves, visible exhibition casebacks, and micro-rotor balance.",
    count: 8,
    image: {
      id: 102,
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
      alt: "NOIRÉ Automatic Collection",
    },
  },
  {
    id: 3,
    name: "The Classic",
    slug: "the-classic",
    description: "Enduring proportions, guilloché dials, and hand-stitched alligator-grain leather straps.",
    count: 5,
    image: {
      id: 103,
      src: "https://images.unsplash.com/photo-1547996160-71dfabb172e8?auto=format&fit=crop&w=1400&q=85",
      alt: "NOIRÉ Classic Collection",
    },
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "noire-s01-monolith",
    name: "NOIRÉ S-01 Monolith",
    slug: "noire-s01-monolith",
    price: "4200",
    regular_price: "4200",
    description: `The NOIRÉ S-01 Monolith represents the apex of modern minimalist horology. Housed in a 40mm micro-blasted 316L stainless steel case with diamond-like carbon (DLC) obsidian coating, it holds our proprietary Caliber N-01 automatic movement with an exceptional 72-hour power reserve.

The dial is rendered in deep light-absorbent obsidian with precision laser-etched markers, flanked by faceted rhodium-plated hands filled with Grade X1 Swiss Super-LumiNova. An anti-reflective double-domed sapphire crystal guards the face while an exhibition sapphire caseback reveals the hand-chamfered Côtes de Genève bridges and custom tungsten oscillating weight.`,
    short_description: "40mm DLC Obsidian Steel · Caliber N-01 In-House Movement · 72h Reserve",
    sku: "NR-S01-MONO",
    is_in_stock: true,
    stock_quantity: 14,
    average_rating: "4.95",
    review_count: 38,
    featured: true,
    editionBadge: "Flagship Edition",
    categories: [MOCK_CATEGORIES[1]],
    images: [
      {
        id: 201,
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ S-01 Monolith Front Dial",
      },
      {
        id: 202,
        src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ S-01 Monolith Case Profile & Crown",
      },
      {
        id: 203,
        src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ S-01 Monolith Macro Details",
      },
    ],
    specs: {
      movement: "Caliber N-01 Automatic (28,800 vph / 4Hz)",
      caliber: "N-01 In-House Automatic",
      powerReserve: "72 Hours",
      caseDiameter: "40 mm",
      caseThickness: "10.4 mm",
      caseMaterial: "Forged 316L Steel with DLC Obsidian Finish",
      dialColor: "Matte Obsidian with Sunray Sub-ring",
      crystal: "Double-domed Sapphire with 5-layer Internal AR",
      waterResistance: "10 ATM / 100 Meters / 330 Feet",
      strapMaterial: "Full-Grain Tuscan Calfskin & Quick-Release Steel Clasp",
      lugWidth: "20 mm",
      warranty: "5-Year International Manufacture Warranty",
    },
  },
  {
    id: "noire-chrono-01-silver",
    name: "NOIRÉ Chrono 01 — Silver / Noir",
    slug: "noire-chrono-01-silver",
    price: "2850",
    regular_price: "2850",
    description: `Engineered for instantaneous measurement and immaculate legibility, the Chrono 01 blends racing heritage with architectural restraint. The dual-register dial provides 30-minute elapsed timing and running seconds, balanced by recessed sub-dials with radial snailing.

The polished and brushed multi-faceted case features integrated pump pushers designed for precise haptic engagement. A bidirectional ceramic tachymeter scale enables effortless speed calculation.`,
    short_description: "41mm Dual-Register Chronograph · Column Wheel Movement · Ceramic Bezel",
    sku: "NR-CHR-01-SLV",
    is_in_stock: true,
    stock_quantity: 9,
    average_rating: "4.90",
    review_count: 24,
    featured: true,
    editionBadge: "Bestseller",
    categories: [MOCK_CATEGORIES[0]],
    images: [
      {
        id: 204,
        src: "https://images.unsplash.com/photo-1547996160-71dfabb172e8?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Chrono 01 Watch Display",
      },
      {
        id: 205,
        src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Chrono 01 Angle View",
      },
    ],
    specs: {
      movement: "Caliber N-CHR Column-Wheel Chronograph",
      caliber: "N-CHR 31-Jewel Automatic",
      powerReserve: "60 Hours",
      caseDiameter: "41 mm",
      caseThickness: "12.2 mm",
      caseMaterial: "Brushed & Mirror-Polished 316L Stainless Steel",
      dialColor: "Brushed Graphite with Snailing Sub-dials",
      crystal: "Box-Domed Sapphire Crystal",
      waterResistance: "10 ATM / 100 Meters",
      strapMaterial: "Three-Link Solid Stainless Steel Bracelet with Micro-Adjustment",
      lugWidth: "21 mm",
      warranty: "5-Year International Manufacture Warranty",
    },
  },
  {
    id: "noire-automatique-ivory",
    name: "NOIRÉ Automatique — Grand Date Ivory",
    slug: "noire-automatique-ivory",
    price: "3400",
    regular_price: "3400",
    description: `A warm, contemplative expression of classic watchmaking. The Automatique Ivory features a vitreous enamel-finished dial in Warm Ivory with heat-blued steel hands that shimmer under changing light conditions.

The dual-aperture grand date display at 12 o'clock provides crisp instantaneous date changes at midnight, driven by an auxiliary mechanical gear train.`,
    short_description: "39mm Warm Ivory Enamel Dial · Blued Steel Hands · Grand Date Aperture",
    sku: "NR-AUT-IVR-39",
    is_in_stock: true,
    stock_quantity: 6,
    average_rating: "5.0",
    review_count: 19,
    featured: true,
    editionBadge: "Limited Production",
    categories: [MOCK_CATEGORIES[1], MOCK_CATEGORIES[2]],
    images: [
      {
        id: 206,
        src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Automatique Ivory Dial",
      },
      {
        id: 207,
        src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Automatique Ivory Profile",
      },
    ],
    specs: {
      movement: "Caliber N-02 Automatique with Grand Date Module",
      caliber: "N-02 High-Beat (28,800 vph)",
      powerReserve: "68 Hours",
      caseDiameter: "39 mm",
      caseThickness: "9.8 mm",
      caseMaterial: "Polished 316L Stainless Steel with Step Bezel",
      dialColor: "Warm Ivory Enamel with Hand-Painted Roman Numerals",
      crystal: "Curved Sapphire Crystal with Anti-Reflective Treatment",
      waterResistance: "5 ATM / 50 Meters",
      strapMaterial: "Hand-Stitched Saddle Brown Horween Shell Cordovan",
      lugWidth: "20 mm",
      warranty: "5-Year International Manufacture Warranty",
    },
  },
  {
    id: "noire-heritage-tourbillon",
    name: "NOIRÉ Heritage Tourbillon — Muted Slate",
    slug: "noire-heritage-tourbillon",
    price: "5900",
    regular_price: "5900",
    description: `A triumphant synthesis of haute horlogerie and contemporary industrial design. The Heritage Tourbillon showcases a flying 60-second tourbillon cage at 6 o'clock, counteracting earth's gravitational pull on the balance spring.

The openworked slate dial allows light to filter through the intricate hand-beveled gear train, finished in anthracite ruthenium for a dramatic, brooding aesthetic.`,
    short_description: "42mm Flying 60-Second Tourbillon · Titanium Cage · Openwork Ruthenium Architecture",
    sku: "NR-HRT-TB-01",
    is_in_stock: true,
    stock_quantity: 3,
    average_rating: "5.0",
    review_count: 11,
    featured: true,
    editionBadge: "Haute Horlogerie",
    categories: [MOCK_CATEGORIES[1]],
    images: [
      {
        id: 208,
        src: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Heritage Tourbillon Openwork Dial",
      },
      {
        id: 209,
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Heritage Tourbillon Close-up",
      },
    ],
    specs: {
      movement: "Caliber N-TB01 Manual-Wind Flying Tourbillon",
      caliber: "N-TB01 21,600 vph Titanium Tourbillon",
      powerReserve: "96 Hours (Dual Barrel)",
      caseDiameter: "42 mm",
      caseThickness: "11.1 mm",
      caseMaterial: "Grade 5 Satin-Brushed Titanium with Polished Chamfers",
      dialColor: "Skeletonized Slate & Ruthenium PVD Bridges",
      crystal: "Sapphire Crystal Top and Exhibition Back",
      waterResistance: "5 ATM / 50 Meters",
      strapMaterial: "Matte Black Alligator Grain with Titanium Deployment Clasp",
      lugWidth: "22 mm",
      warranty: "5-Year International Manufacture Warranty",
    },
  },
  {
    id: "noire-minimaliste-38",
    name: "NOIRÉ Minimaliste — Ultra-Thin 38mm",
    slug: "noire-minimaliste-38",
    price: "2150",
    regular_price: "2150",
    description: `A study in radical reduction. Measuring merely 7.2mm in total case height, the Minimaliste 38 slips effortlessly beneath the tailored dress cuff. Its monochromatic dial eschews unnecessary complications in favor of pure, uninterrupted elegance.

Powered by our ultra-thin manual-wind movement, every morning winding ritual connects the wearer directly with the heart of mechanical timekeeping.`,
    short_description: "38mm Ultra-Thin 7.2mm Profile · Manual-Wind Caliber · Pure Minimalist Dial",
    sku: "NR-MIN-38-BLK",
    is_in_stock: true,
    stock_quantity: 18,
    average_rating: "4.88",
    review_count: 32,
    featured: false,
    editionBadge: "Ultra-Thin",
    categories: [MOCK_CATEGORIES[2]],
    images: [
      {
        id: 210,
        src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Minimaliste 38 Profile and Dial",
      },
      {
        id: 211,
        src: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Minimaliste 38 Leather Strap",
      },
    ],
    specs: {
      movement: "Caliber N-THIN Ultra-Slim Manual-Wind",
      caliber: "N-THIN 2.4mm Movement Thickness",
      powerReserve: "48 Hours",
      caseDiameter: "38 mm",
      caseThickness: "7.2 mm",
      caseMaterial: "Mirror-Polished 316L Stainless Steel",
      dialColor: "Opaline Warm Silver with Rhodium Batons",
      crystal: "Ultra-Flat Sapphire Crystal with AR Coating",
      waterResistance: "3 ATM / 30 Meters",
      strapMaterial: "Black French Calfskin with Tapered Stitching",
      lugWidth: "19 mm",
      warranty: "5-Year International Manufacture Warranty",
    },
  },
  {
    id: "noire-chronometre-bronze",
    name: "NOIRÉ Chronomètre — Marine Bronze",
    slug: "noire-chronometre-bronze",
    price: "3100",
    regular_price: "3100",
    description: `Cast in CuSn8 marine-grade bronze, each timepiece develops a completely unique organic patina over time, recording the personal journey and voyages of its owner. 

Featuring a deep petroleum green dial and bronze dive bezel with ceramic ball-bearing detents, it recalls naval chronometers created for open-ocean exploration.`,
    short_description: "41mm Marine CuSn8 Bronze · 300m Professional Diver · Living Patina",
    sku: "NR-CHR-BRZ-41",
    is_in_stock: true,
    stock_quantity: 8,
    average_rating: "4.92",
    review_count: 17,
    featured: false,
    editionBadge: "Living Patina",
    categories: [MOCK_CATEGORIES[0]],
    images: [
      {
        id: 212,
        src: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Chronomètre Bronze",
      },
      {
        id: 213,
        src: "https://images.unsplash.com/photo-1547996160-71dfabb172e8?auto=format&fit=crop&w=1400&q=85",
        alt: "NOIRÉ Chronomètre Bronze Angle",
      },
    ],
    specs: {
      movement: "Caliber N-03 Heavy-Duty Automatic",
      caliber: "N-03 Shock-Resistant (Incabloc)",
      powerReserve: "55 Hours",
      caseDiameter: "41 mm",
      caseThickness: "12.8 mm",
      caseMaterial: "Solid CuSn8 Marine Bronze with Titanium Caseback",
      dialColor: "Deep Forest Petroleum with Gilded Accents",
      crystal: "4.0mm Domed Sapphire Crystal",
      waterResistance: "30 ATM / 300 Meters / 1000 Feet",
      strapMaterial: "Vintage Waxed Brown Leather + Vulcanized Rubber NATO",
      lugWidth: "22 mm",
      warranty: "5-Year International Manufacture Warranty",
    },
  },
];

export const MOCK_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    slug: "automatic-vs-quartz-what-actually-matters",
    title: "Automatic vs Quartz: What Actually Matters in Modern Horology?",
    subtitle: "Beyond the ticking second hand lies a philosophical question of permanence, human craft, and mechanical soul.",
    excerpt: "While electronic quartz oscillators offer unmatched micro-second precision, mechanical calibers endure across generations. Here is why the modern connoisseur still chooses the heartbeat of a spring.",
    category: "HOROLOGY ESSAY",
    date: "OCTOBER 2026",
    readTime: "6 MIN READ",
    author: {
      name: "Marcus Vance",
      role: "Lead Horological Curator",
    },
    coverImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1400&q=85",
    content: [
      "In an era where every smartphone, laptop, and microwave oven broadcasts atomic time synchronized to satellite cesium clocks, the fundamental premise of a wristwatch has shifted.",
      "A timepiece is no longer an instrument purely of utility; it is an intimate expression of kinetic art. When you strap on a mechanical watch, you carry an uninterrupted direct mechanical lineage that stretches back to Christiaan Huygens and Thomas Mudge.",
      "The mechanical escapement breathes. It relies on the subtle tension of a mainspring wound either by the deliberate ritual of your fingertips or the kinetic cadence of your wrist throughout the day."
    ]
  },
  {
    id: "art-2",
    slug: "how-to-choose-the-right-watch-size",
    title: "The Anatomy of Proportion: How to Choose the Right Watch Size",
    subtitle: "Why case diameter is only half the equation — and why lug-to-lug distance defines true wrist presence.",
    excerpt: "The classic mistake made by novice collectors is evaluating a timepiece solely by its millimeter diameter. True ergonomics are governed by geometry, bevel angles, and wrist curvature.",
    category: "GUIDE & MEASUREMENT",
    date: "SEPTEMBER 2026",
    readTime: "5 MIN READ",
    author: {
      name: "Helena Laurent",
      role: "Design Director",
    },
    coverImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85",
    content: [
      "A 40mm watch from one manufacturer can drape softly and discreetly across a modest 6.5-inch wrist, while a 39mm piece from another can overhang awkwardly like a dinner plate.",
      "The secret lies in three critical dimensions: the lug-to-lug span, the lug curvature downward toward the bone, and the case thickness relative to the bezel diameter.",
      "At NOIRÉ, we sculpt our cases with aggressive downward bevels so the strap drops immediately around the carpal contour, creating a bespoke tailored silhouette regardless of wrist circumference."
    ]
  },
  {
    id: "art-3",
    slug: "how-to-care-for-a-mechanical-timepiece",
    title: "The Preservation Ritual: Caring for a Fine Mechanical Timepiece",
    subtitle: "Practical rituals for safeguarding gaskets, escapements, and synthetic rubies for half a century.",
    excerpt: "Mechanical timepieces require neither fuss nor overprotection, but three silent enemies — magnetism, thermal shock, and dry gaskets — can silently compromise your watch.",
    category: "CARE & ARCHIVE",
    date: "AUGUST 2026",
    readTime: "7 MIN READ",
    author: {
      name: "Jean-Philippe Mercier",
      role: "Master Watchmaker",
    },
    coverImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85",
    content: [
      "A watch movement contains over 180 microscopic moving components vibrating at 28,800 beats per hour. That amounts to more than 250 million oscillations per year.",
      "To keep this microscopic symphony performing with chronometric poise, simple preventive rituals pay immense dividends over decades.",
      "First: beware of everyday neodymium magnets found in laptop clasps, tablet cases, and speaker docks. Second: always ensure screw-down crowns are securely seated before water immersion."
    ]
  }
];

export const MOCK_CRAFTSMANSHIP_POINTS = [
  {
    id: "dial",
    title: "The Dial Architecture",
    tagline: "Microscopic Depth & Glare Elimination",
    description: "Every NOIRÉ dial undergoes a 24-step finishing process. Sub-dials are diamond-cut with circular snailing, and applied indices are hand-polished to catch light at the faintest angle.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    specs: ["Hand-applied faceted indices", "Grade X1 Swiss Super-LumiNova", "Anti-reflective lacquer treatment"]
  },
  {
    id: "movement",
    title: "Caliber N-01 Movement",
    tagline: "In-House 72-Hour Kinematics",
    description: "Operating at 4Hz (28,800 vibrations per hour), our in-house calibers feature Côtes de Genève circular graining, flame-blued screws, and a tungsten rotor engineered for maximum kinetic energy capture.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85",
    specs: ["28,800 vph / 4Hz beat rate", "31 Synthetic Ruby Jewels", "Free-sprung Glucydur balance"]
  },
  {
    id: "case",
    title: "Forged 316L Monobloc Case",
    tagline: "Surgical Grade Metallurgy",
    description: "Machined from a single solid billet of 316L austenitic stainless steel, alternating between satin hairline brushing along the flanks and mirror-polished chamfers executed entirely by hand.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
    specs: ["Hand-lapped 45° bevels", "Ultra-low carbon corrosion immunity", "Recessed ergonomic crown guard"]
  },
  {
    id: "crystal",
    title: "Double-Domed Box Sapphire",
    tagline: "Virtually Unscratchable Optical Purity",
    description: "Cut from synthetic single-crystal corundum with a Mohs hardness rating of 9 (second only to diamond). 5 layers of colorless anti-reflective coating on both inner and outer surfaces eliminate reflections.",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85",
    specs: ["Mohs 9 scratch hardness", "5-layer dual-sided AR coating", "Box-domed vintage silhouette"]
  },
  {
    id: "strap",
    title: "Tuscan Calfskin & Solid Links",
    tagline: "Artisanal Tactile Comfort",
    description: "Vegetable-tanned full-grain leather sourced from historic Santa Croce sull'Arno tanneries, saddle-stitched with waxed linen thread. Metal bracelets feature screwed solid links and seamless micro-adjustment.",
    image: "https://images.unsplash.com/photo-1547996160-71dfabb172e8?auto=format&fit=crop&w=1200&q=85",
    specs: ["Vegetable-tanned full grain", "Milled solid steel clasp", "Quick-release spring bar mechanism"]
  },
];

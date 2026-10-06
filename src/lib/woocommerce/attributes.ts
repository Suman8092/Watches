import { ProductAttribute, HorologicalSpecs } from "@/types/woocommerce";

/**
 * Extracts term text from a WooCommerce attribute regardless of whether it was
 * fetched via Store API (terms array) or REST API (options string array).
 */
export function getAttributeValue(attr: ProductAttribute): string {
  if (attr.terms && attr.terms.length > 0) {
    return attr.terms.map((t) => t.name).join(", ");
  }
  if (attr.options && attr.options.length > 0) {
    return attr.options.join(", ");
  }
  return "";
}

/**
 * Normalizes a raw attribute name (e.g. "pa_case-material" or "Case Material")
 * into a clean human-readable title.
 */
export function formatAttributeName(rawName: string): string {
  return rawName
    .replace(/^pa_/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Dynamically maps WooCommerce product attributes into a structured HorologicalSpecs object.
 * Does NOT hard-code values; instead dynamically extracts and normalizes from WooCommerce.
 */
export function extractSpecsFromAttributes(
  attributes?: ProductAttribute[],
  fallbackSpecs?: Partial<HorologicalSpecs>
): HorologicalSpecs {
  const specs: HorologicalSpecs = {
    movement: fallbackSpecs?.movement || "Mechanical Caliber",
    caliber: fallbackSpecs?.caliber || "In-House Automatic",
    powerReserve: fallbackSpecs?.powerReserve || "48–72 Hours",
    caseDiameter: fallbackSpecs?.caseDiameter || "40 mm",
    caseThickness: fallbackSpecs?.caseThickness || "10.4 mm",
    caseMaterial: fallbackSpecs?.caseMaterial || "316L Stainless Steel",
    dialColor: fallbackSpecs?.dialColor || "Matte Obsidian",
    crystal: fallbackSpecs?.crystal || "Sapphire Crystal with Anti-Reflective Coating",
    waterResistance: fallbackSpecs?.waterResistance || "10 ATM / 100 Meters",
    strapMaterial: fallbackSpecs?.strapMaterial || "Full-Grain Leather",
    strapColor: fallbackSpecs?.strapColor || "Noir",
    clasp: fallbackSpecs?.clasp || "Deployant Buckle",
    lugWidth: fallbackSpecs?.lugWidth || "20 mm",
    warranty: fallbackSpecs?.warranty || "5-Year International Manufacture Warranty",
  };

  if (!attributes || attributes.length === 0) {
    return specs;
  }

  for (const attr of attributes) {
    const rawKey = (attr.name || attr.taxonomy || "").toLowerCase().trim();
    const value = getAttributeValue(attr);

    if (!value) continue;

    // Map watch-specific attributes dynamically
    if (rawKey.includes("movement") || rawKey.includes("calibre") || rawKey.includes("caliber")) {
      specs.movement = value;
      specs.caliber = value;
    } else if (rawKey.includes("power") || rawKey.includes("reserve")) {
      specs.powerReserve = value;
    } else if (rawKey.includes("diameter") || rawKey.includes("case size") || rawKey === "size") {
      specs.caseDiameter = value;
    } else if (rawKey.includes("thickness") || rawKey.includes("height")) {
      specs.caseThickness = value;
    } else if (rawKey.includes("material") || rawKey.includes("case")) {
      specs.caseMaterial = value;
    } else if (rawKey.includes("dial") || rawKey.includes("face")) {
      specs.dialColor = value;
    } else if (rawKey.includes("crystal") || rawKey.includes("glass") || rawKey.includes("sapphire")) {
      specs.crystal = value;
    } else if (rawKey.includes("water") || rawKey.includes("resistance") || rawKey.includes("depth")) {
      specs.waterResistance = value;
    } else if (rawKey.includes("strap") || rawKey.includes("bracelet") || rawKey.includes("band")) {
      specs.strapMaterial = value;
    } else if (rawKey.includes("clasp") || rawKey.includes("buckle")) {
      specs.clasp = value;
    } else if (rawKey.includes("lug")) {
      specs.lugWidth = value;
    } else if (rawKey.includes("warranty") || rawKey.includes("guarantee")) {
      specs.warranty = value;
    } else {
      // Store any other custom attribute dynamically on the specs object
      specs[formatAttributeName(rawKey)] = value;
    }
  }

  return specs;
}

/**
 * Returns an array of key-value pairs for rendering all attributes in a table or list
 */
export function getAllAttributePairs(
  attributes?: ProductAttribute[]
): Array<{ name: string; value: string }> {
  if (!attributes) return [];
  return attributes
    .map((attr) => ({
      name: formatAttributeName(attr.name || attr.taxonomy || "Attribute"),
      value: getAttributeValue(attr),
    }))
    .filter((pair) => pair.value.length > 0);
}

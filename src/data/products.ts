import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_campaign_editorial_1790578199548.jpg';
export const CRAFT_IMAGE = '/src/assets/images/craft_textile_detail_1790578255116.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'memosi-trench-01',
    name: 'The Atelier Double-Breasted Trench',
    subtitle: 'Signature Oversized Silhouette in Heavy Cotton Gabardine',
    category: 'outerwear',
    categoryLabel: 'Coats & Outerwear',
    price: 490,
    images: [
      '/src/assets/images/hero_campaign_editorial_1790578199548.jpg',
      '/src/assets/images/product_tailored_blazer_1790578227881.jpg',
      '/src/assets/images/craft_textile_detail_1790578255116.jpg',
    ],
    description: 'An architectural reinterpretation of the classic trench coat, cut from water-repellent Italian organic cotton gabardine. Features an exaggerated storm flap, raglan shoulders for effortless layering, horn button closures, and a generous belted waist.',
    details: [
      'Oversized silhouette with drape belt',
      'Double-breasted front with natural horn buttons',
      'Deep welt storm pockets with fleece lining',
      'Concealed back vent with button closure',
      'Hand-finished lapel edges in Como, Italy'
    ],
    composition: '100% Organic Italian Cotton Gabardine; Lining: 100% Cupro',
    fit: 'Designed for an relaxed, editorial fit. Take your normal size for the intended drape, or size down for a closer fit.',
    care: 'Specialist dry clean only. Cool iron on reverse using a pressing cloth.',
    colors: [
      { name: 'Dune Beige', hex: '#D7CEBE' },
      { name: 'Oatmeal', hex: '#EBE6DC' },
      { name: 'Noir', hex: '#1C1917' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 4,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'memosi-knit-02',
    name: 'Chunky Ribbed Cashmere Crewneck',
    subtitle: '7-Gauge Grade-A Mongolian Cashmere',
    category: 'knitwear',
    categoryLabel: 'Knitwear & Cashmere',
    price: 340,
    images: [
      '/src/assets/images/product_cashmere_knit_1790578214857.jpg',
      '/src/assets/images/craft_textile_detail_1790578255116.jpg',
    ],
    description: 'Spun from plush 7-gauge two-ply Mongolian cashmere, this ribbed sweater balances warmth with extraordinary softness. Features dropped shoulders, a classic crew neckline with tubular rib finishing, and elongated sleeves designed to fold naturally at the wrist.',
    details: [
      'Substantial 7-gauge medium-weight ribbed knit',
      'Seamless knitted construction for reduced textile waste',
      'Dropped shoulder architecture',
      'Shape-retaining ribbed cuffs and hem'
    ],
    composition: '100% Certified Sustainable Mongolian Cashmere',
    fit: 'Gentle boxy silhouette. True to size with a comfortable, cozy volume.',
    care: 'Hand wash cold in cashmere shampoo, dry flat, or green dry clean.',
    colors: [
      { name: 'Warm Ecru', hex: '#EFECE6' },
      { name: 'Sandstone', hex: '#DFD8CA' },
      { name: 'Warm Charcoal', hex: '#322E2B' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    stockCount: 7,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'memosi-blazer-03',
    name: 'Architectural Sand Wool Blazer',
    subtitle: 'Structured Shoulders & Double-Breasted Cut',
    category: 'tailoring',
    categoryLabel: 'Tailoring & Suiting',
    price: 520,
    images: [
      '/src/assets/images/product_tailored_blazer_1790578227881.jpg',
      '/src/assets/images/hero_campaign_editorial_1790578199548.jpg',
    ],
    description: 'Tailored from crisp mid-weight virgin wool sourced from Biella, Italy. Lightly padded shoulders yield a confident masculine silhouette with feminine proportions, paired with peak lapels and tortoiseshell buttons.',
    details: [
      'Structured peak lapel with collar felt underlay',
      'Double-breasted 4-button closure',
      'Dual flap hip pockets and slanted breast welt pocket',
      'Full interior canvas horsehair chest piece for lasting shape'
    ],
    composition: '100% Virgin Wool (280g); Lining: 100% Viscose Rayon',
    fit: 'Structured tailored cut. True to size.',
    care: 'Specialist dry clean only. Steam gently.',
    colors: [
      { name: 'Sand Beige', hex: '#C9BCAB' },
      { name: 'Ivory Bone', hex: '#F5F2EB' },
      { name: 'Graphite', hex: '#262423' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 5,
    isNew: false,
    isFeatured: true
  },
  {
    id: 'memosi-dress-04',
    name: 'Bias-Cut Silk Charmeuse Slip Dress',
    subtitle: '22-Momme Heavyweight Mulberry Silk',
    category: 'dresses',
    categoryLabel: 'Silk & Eveningwear',
    price: 380,
    images: [
      '/src/assets/images/product_silk_slip_dress_1790578241588.jpg',
      '/src/assets/images/craft_textile_detail_1790578255116.jpg',
    ],
    description: 'Cut on the true bias from fluid 22-momme pure mulberry silk charmeuse, this gown skims the contours of the body with liquid grace. Subtle cowl neckline, discreet adjustable spaghetti straps, and an ankle-grazing column hem.',
    details: [
      '45-degree true bias cut for natural stretch and contouring',
      'Delicate micro-rolled hem sewn by hand',
      'Low scooped back with slender straps',
      'Self-faced bust lining for non-sheer coverage'
    ],
    composition: '100% Grade 6A Pure Mulberry Silk (22-momme)',
    fit: 'Skims effortlessly over hips. Bias cut expands and drapes naturally.',
    care: 'Delicate hand wash with pH-neutral silk wash or dry clean.',
    colors: [
      { name: 'Ivory Cream', hex: '#FAF7F0' },
      { name: 'Champagne Taupe', hex: '#D6CBB9' },
      { name: 'Midnight Onyx', hex: '#141312' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    stockCount: 3,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'memosi-trousers-05',
    name: 'Pleated Belgian Linen Wide-Leg Trouser',
    subtitle: 'High-Rise Waist with Deep Front Knife Pleats',
    category: 'trousers',
    categoryLabel: 'Tailoring & Suiting',
    price: 290,
    images: [
      '/src/assets/images/product_cashmere_knit_1790578214857.jpg',
      '/src/assets/images/product_tailored_blazer_1790578227881.jpg',
    ],
    description: 'Woven from long-staple flax cultivated in Flanders, Belgium, these trousers combine breathable natural linen with impeccable drape. Features double knife pleats, a wide relaxed leg, and internal waistband curtaining.',
    details: [
      'High-rise waist with tailored extension tab',
      'Deep dual front pleats for fluid movement',
      'Side slip pockets and clean back welt pocket',
      'Unfinished hem allowance for custom tailoring'
    ],
    composition: '100% Masters of Linen Certified Belgian Flax',
    fit: 'High rise with a generous wide-leg profile.',
    care: 'Gentle machine wash cold or dry clean. Hang dry in shade.',
    colors: [
      { name: 'Natural Flax', hex: '#E2DBD0' },
      { name: 'Chalk White', hex: '#F9F8F6' },
      { name: 'Muted Taupe', hex: '#B8AD9C' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 8,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'memosi-coat-06',
    name: 'Hand-Stitched Cashmere Cocoon Overcoat',
    subtitle: 'Double-Faced Unlined Cashmere Blend with Raglan Sleeves',
    category: 'outerwear',
    categoryLabel: 'Coats & Outerwear',
    price: 820,
    images: [
      '/src/assets/images/hero_campaign_editorial_1790578199548.jpg',
      '/src/assets/images/craft_textile_detail_1790578255116.jpg',
    ],
    description: 'Crafted from double-faced cashmere and virgin wool, joined and hand-sewn along every seam with invisible thread. The unlined interior ensures a featherweight drape that envelops the wearer in uninterrupted warmth.',
    details: [
      'Master artisan hand-split and hand-stitched seams',
      'Double-faced weave requiring zero synthetic lining',
      'Sculptural shawl collar transitioning to clean lapels',
      'Concealed horn snap fastenings'
    ],
    composition: '65% Virgin Wool, 35% Mongolian Cashmere',
    fit: 'Cocoon drape. Generously sized to accommodate chunky knits underneath.',
    care: 'Specialist dry clean only. Store in breathable canvas garment bag.',
    colors: [
      { name: 'Biscotti Tan', hex: '#D2C3B0' },
      { name: 'Desert Dune', hex: '#E7DEC9' },
      { name: 'Dark Truffle', hex: '#2B2623' }
    ],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 2,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'memosi-knit-07',
    name: 'Fine Gauge Merino Polo Sweater',
    subtitle: 'Extrafine 19.5-Micron Merino Wool in Seamless Knit',
    category: 'knitwear',
    categoryLabel: 'Knitwear & Cashmere',
    price: 240,
    images: [
      '/src/assets/images/product_cashmere_knit_1790578214857.jpg',
      '/src/assets/images/hero_campaign_editorial_1790578199548.jpg',
    ],
    description: 'A contemporary wardrobe staple knit from ultra-fine Australian merino wool with a butter-soft hand feel. Clean open polo collar with no buttons for a relaxed, European minimalist look that works under blazers or alone.',
    details: [
      'Open Johnny collar without placket buttons',
      'Fine 16-gauge light knit suitable for four-season layering',
      'Ribbed micro hem and sleeve cuffs',
      'Naturally thermo-regulating and odor-resistant'
    ],
    composition: '100% Non-Mulesed Extra-Fine Merino Wool',
    fit: 'Regular tailored fit. Clean lines through chest and shoulders.',
    care: 'Hand wash cold with wool detergent. Reshape while damp.',
    colors: [
      { name: 'Alabaster White', hex: '#F6F4EE' },
      { name: 'Soft Sand', hex: '#D8CEBE' },
      { name: 'Anthracite', hex: '#2D2B29' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 11,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'memosi-acc-08',
    name: 'Sculpted Saddle Leather Belt',
    subtitle: 'Vegetable-Tanned Italian Calfskin with Brushed Brass Hardware',
    category: 'accessories',
    categoryLabel: 'Accessories & Leather',
    price: 180,
    images: [
      '/src/assets/images/craft_textile_detail_1790578255116.jpg',
      '/src/assets/images/product_tailored_blazer_1790578227881.jpg',
    ],
    description: 'Handcrafted in Tuscany from 3.5mm full-grain vegetable-tanned calfskin. Features hand-burnished edges, natural wax finish that develops an individual patina over time, and custom-cast solid brass buckle with satin finish.',
    details: [
      '30mm versatile width designed for trousers or cinching outerwear',
      'Hand-burnished waxed edges',
      'Solid brass buckle with hypoallergenic matte finish',
      'Discreet debossed memosi maker mark'
    ],
    composition: '100% Full-Grain Vegetable-Tanned Italian Vachetta Leather',
    fit: '5 punch holes spaced 1 inch apart. Size 80 corresponds to waist 30-32".',
    care: 'Condition once per season with natural beeswax leather balm.',
    colors: [
      { name: 'Desert Sand', hex: '#C2B199' },
      { name: 'Warm Cognac', hex: '#8E5E3A' },
      { name: 'Matte Black', hex: '#1F1E1D' }
    ],
    sizes: ['75 (28-30")', '85 (32-34")', '95 (36-38")'],
    inStock: true,
    stockCount: 6,
    isNew: false,
    isFeatured: false
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'outerwear', label: 'Coats & Outerwear' },
  { id: 'knitwear', label: 'Knitwear & Cashmere' },
  { id: 'tailoring', label: 'Tailoring & Suiting' },
  { id: 'dresses', label: 'Dresses & Silk' },
  { id: 'trousers', label: 'Trousers' },
  { id: 'accessories', label: 'Accessories' }
];

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
} as const;

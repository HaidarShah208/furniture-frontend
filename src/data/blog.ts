export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  featured?: boolean;
  tags: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "art-of-mixing-modern-and-traditional",
    title: "The Art of Mixing Modern and Traditional Furniture",
    excerpt:
      "Discover how contrasting eras can create a harmonious interior that feels both timeless and contemporary.",
    content: [
      "The most compelling interiors are rarely confined to a single era. They draw from the past and the present, weaving together pieces that might seem contradictory on paper yet feel perfectly balanced in person. At LUXE, we believe the tension between a hand-carved Victorian console and a clean-lined contemporary sofa is exactly what gives a room its soul.",
      "Start with a foundation — choose whether your dominant language is modern or traditional. If you lean modern, let the bones of the room (walls, flooring, large upholstery) stay minimal and let a few antique accent pieces provide warmth. If you lean traditional, reverse the formula: ornate architectural details paired with streamlined furniture keep the space from feeling heavy.",
      "Material consistency is your secret weapon. A walnut dining table from the 1920s and a walnut-framed modern mirror share a visual thread that ties the room together even when their silhouettes differ wildly. Similarly, brass hardware on a heritage sideboard echoes a contemporary brass floor lamp.",
      "Proportion matters more than period. A massive antique armoire can anchor a room, but it needs breathing space — surround it with low-profile modern seating to keep sightlines open. Conversely, a delicate mid-century accent chair looks intentional beside a substantial traditional sofa rather than lost.",
      "Colour is the great unifier. When mixing eras, a restrained palette — think warm neutrals, deep greens, or muted blues — lets each piece shine without visual noise. Add texture through fabrics: a linen slipcover on a vintage frame, a bouclé cushion on a modern bench.",
      "Finally, trust your instincts. If a piece makes you pause in admiration, it belongs in your space regardless of its date of origin. The best rooms are curated, not matched — and that confidence is what separates decoration from design.",
    ],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=90",
    date: "Jul 28, 2026",
    category: "Interior Design",
    readTime: "6 min read",
    author: {
      name: "Elena Marchetti",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      role: "Design Director",
    },
    featured: true,
    tags: ["Interior Design", "Styling", "Modern", "Traditional"],
  },
  {
    slug: "sustainable-luxury-commitment",
    title: "Sustainable Luxury: Our Commitment to the Planet",
    excerpt:
      "How we source responsibly without compromising on the beauty and quality you expect from LUXE.",
    content: [
      "Luxury and sustainability are not opposing forces — they are natural allies. The finest materials have always been those treated with reverence: old-growth forests managed for centuries, leather tanned with vegetable dyes, stone quarried with precision rather than haste. At LUXE, we formalise that reverence into a set of commitments that guide every collection.",
      "Every timber species we use is FSC-certified or reclaimed. Our walnut comes from managed plantations in Oregon, our oak from sustainable forestry cooperatives in France. Reclaimed teak — salvaged from decommissioned Indonesian fishing boats — adds character that no virgin wood can replicate.",
      "Our leather is a by-product of the food industry, never sourced for hide alone. We work exclusively with tanneries that hold Gold-rated certification from the Leather Working Group, ensuring water usage, energy consumption, and chemical management meet the highest environmental standards.",
      "Packaging is the unsung villain of furniture logistics. We have eliminated single-use polystyrene entirely, replacing it with moulded recycled cardboard and biodegradable cornstarch packing. Fabric wraps are reusable and collected by our delivery teams for the next shipment.",
      "Longevity is the ultimate sustainability strategy. A LUXE piece that lasts 30 years displaces five or six disposable alternatives. That is why we offer a lifetime structural warranty, a repair service, and a buy-back programme that gives pre-loved furniture a second chapter.",
      "We publish an annual impact report detailing our carbon footprint, water usage, and waste diversion rate. Transparency is not a marketing exercise — it is an accountability mechanism that keeps us honest and improving.",
    ],
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=90",
    date: "Jul 22, 2026",
    category: "Sustainability",
    readTime: "8 min read",
    author: {
      name: "James Thornton",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      role: "Head of Sustainability",
    },
    tags: ["Sustainability", "Materials", "Craftsmanship"],
  },
  {
    slug: "caring-for-solid-wood-furniture",
    title: "Caring for Your Solid Wood Furniture",
    excerpt:
      "Expert tips from our craftsmen on maintaining the beauty of your investment for generations.",
    content: [
      "Solid wood furniture is a living material — it breathes, ages, and develops a patina that synthetic alternatives can never replicate. With proper care, your LUXE pieces will look more beautiful with every passing year. Here is what our master craftsmen recommend.",
      "Dust regularly with a soft, lint-free cloth. Microfibre works best because it traps particles rather than pushing them across the surface. Always dust in the direction of the grain to avoid micro-scratches. Avoid feather dusters — they merely redistribute dust.",
      "Protect surfaces from heat and moisture. Always use coasters under glasses and trivets under hot dishes. Water rings and heat marks penetrate the finish and can be difficult to reverse. If a spill occurs, blot immediately with a dry cloth — never rub.",
      "Condition oiled and waxed finishes every six months. We recommend LUXE Wood Nourish, a blend of natural beeswax and linseed oil that replenishes the wood without building up a plastic-like film. Apply a thin coat, let it absorb for twenty minutes, then buff with a clean cloth.",
      "Position furniture away from direct sunlight and heat sources. UV rays bleach wood over time, and fluctuating temperatures cause expansion and contraction that can lead to cracking. If a piece must sit near a window, consider UV-filtering curtains or blinds.",
      "For lacquered finishes, a damp cloth followed by a dry one is sufficient for routine cleaning. Avoid silicone-based polishes — they create a cloudy build-up that dulls the lustre. If scratches appear, our complimentary touch-up service can restore the surface to its original condition.",
    ],
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=90",
    date: "Jul 15, 2026",
    category: "Care Guide",
    readTime: "5 min read",
    author: {
      name: "Marco Bellini",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      role: "Master Craftsman",
    },
    tags: ["Care Guide", "Wood", "Maintenance"],
  },
  {
    slug: "small-space-luxury-design",
    title: "Luxury Living in Small Spaces: A Design Guide",
    excerpt:
      "Proof that square footage is no barrier to sophisticated, curated interiors that feel generous.",
    content: [
      "The notion that luxury requires vast square footage is one of interior design's most persistent myths. Some of the most refined spaces in the world — Parisian apartments, Tokyo penthouses, Milanese pieds-à-terre — prove that restraint and curation can achieve what sheer size cannot.",
      "The first principle is editing. In a compact room, every piece must earn its place. A single statement armchair has more presence than a pair of generic seats. A sculptural floor lamp eliminates the need for side tables. When each object is exceptional, the room feels intentional rather than cramped.",
      "Scale is critical. Furniture that is too large overwhelms a small room, but pieces that are too small look lost and create visual clutter. Measure twice, visualise three times, and choose items whose proportions match the architecture. Our compact-living collection is designed with exactly this balance in mind.",
      "Vertical space is an untapped luxury. Tall, narrow bookcases draw the eye upward and create an illusion of height. Wall-mounted consoles free floor space while providing display and storage. Pendant lights replace table lamps, liberating surface area for objects you actually want to see.",
      "Mirrors and light are your most powerful tools. A large mirror opposite a window doubles the perceived depth of a room. Warm, layered lighting — a combination of ambient, task, and accent — adds dimension that makes a space feel curated and complete.",
      "Finally, invest in multi-functional pieces that do not look like compromises. Our extendable dining tables, storage ottomans, and modular sofas were designed to adapt without sacrificing aesthetics. In a small space, versatility is the ultimate luxury.",
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=90",
    date: "Jul 8, 2026",
    category: "Interior Design",
    readTime: "7 min read",
    author: {
      name: "Elena Marchetti",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      role: "Design Director",
    },
    tags: ["Interior Design", "Small Spaces", "Styling"],
  },
  {
    slug: "marble-in-modern-interiors",
    title: "The Enduring Allure of Marble in Modern Interiors",
    excerpt:
      "From Calacatta to Emperador, explore how marble elevates furniture from functional to sculptural.",
    content: [
      "Marble has captivated builders, sculptors, and designers for millennia. Its veining is nature's fingerprint — no two slabs are identical, which means every LUXE marble piece is a one-of-one creation. In an age of mass production, that uniqueness is profoundly luxurious.",
      "Calacatta marble, quarried in the Apuan Alps of Tuscany, is prized for its warm white background and dramatic gold-grey veining. We use it for our Luna Dining Table tops, where the expansive surface lets the stone's movement tell its full story.",
      "Emperador Dark, from southeastern Spain, offers a moody alternative — rich chocolate-brown with fine cream veining. It pairs beautifully with brass and dark walnut, creating tablescapes that feel both grounded and opulent.",
      "Marble requires respect. It is porous, so spills should be wiped promptly. Acidic substances — citrus juice, wine, vinegar — can etch the surface if left unattended. We seal every marble top with a penetrating impregnator that provides invisible protection without altering the stone's natural feel.",
      "For those who love the look but want lower maintenance, our engineered marble alternatives use a natural marble veneer bonded to a honeycomb aluminium core. The result is lighter, more resistant to thermal shock, and visually indistinguishable from solid stone.",
      "Whether you choose solid or engineered, marble transforms a piece of furniture into a conversation. It connects your home to geological time — millions of years of heat, pressure, and mineral migration crystallised into a surface you can touch every day.",
    ],
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=90",
    date: "Jun 30, 2026",
    category: "Materials",
    readTime: "6 min read",
    author: {
      name: "James Thornton",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      role: "Head of Sustainability",
    },
    tags: ["Materials", "Marble", "Design"],
  },
  {
    slug: "bedroom-sanctuary-guide",
    title: "Designing Your Bedroom as a Sanctuary",
    excerpt:
      "Transform your most private space into a haven of rest with considered material and colour choices.",
    content: [
      "The bedroom is the last thing you see at night and the first thing you see in the morning. It deserves the same — if not more — design attention as the living room you show to guests. A well-designed bedroom is not about extravagance; it is about creating conditions for genuine rest.",
      "Start with the bed. It is the room's focal point, so choose a frame that communicates calm authority. Our upholstered platform beds in muted linen or velvet set a tone of softness and warmth. A solid wood headboard adds structure without visual weight.",
      "Layering is the key to a bed that looks and feels inviting. Begin with crisp percale sheets, add a lightweight duvet, then drape a textured throw at the foot. Two or three cushions in varying sizes provide dimension without the pillow fortress that makes the bed feel like a chore to remake.",
      "Nightstands should be functional, not decorative afterthoughts. Choose pieces with at least one drawer to contain the visual noise of chargers, books, and glasses. Our floating nightstands free floor space and create a sense of lightness.",
      "Lighting is non-negotiable. Overhead lighting should be dimmable or avoided entirely in favour of sconces and table lamps. Warm colour temperatures — 2700K to 3000K — support melatonin production and signal to your body that it is time to wind down.",
      "Finally, declutter ruthlessly. The bedroom is not a home office, a gym, or a storage unit. If an item does not contribute to rest or getting dressed, it belongs elsewhere. A serene bedroom is, above all, an edited one.",
    ],
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=90",
    date: "Jun 22, 2026",
    category: "Interior Design",
    readTime: "6 min read",
    author: {
      name: "Elena Marchetti",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      role: "Design Director",
    },
    tags: ["Interior Design", "Bedroom", "Styling"],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 3): BlogArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return blogArticles.slice(0, limit);
  return blogArticles
    .filter((a) => a.slug !== currentSlug && a.tags.some((t) => current.tags.includes(t)))
    .slice(0, limit);
}

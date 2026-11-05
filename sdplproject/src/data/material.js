export const MATERIAL_SPECS = {
  basic: {
    cement: "Maha Cement, Dalmia, DSP",
    steel: "Rungta Steel, Beekay Steel, Shyam Steel",
    bricks: "Fly Ash Bricks",
    sanitary: "Parryware, Essco",
    electrical: "Anchor, Finolex - Economy",
    tiles: "Orientbell, Asian Granito (AGL), Varmora, Simpolo",
    painting: "Berger Bison, Asian Paints Tractor, Birla Opus Fresh",
    doorFrame: "Sal Wood Frame",
    windowFrame: "Indal Aluminium / Prominence uPVC",
    doorsAndLocks: "Main Door: Godrej Mortise or Europa Mortise"
  },
  classic: {
    cement: "JSW, Ramco, JK Lakshmi",
    steel: "Kamdhenu, Vizag Steel, SRMB Steel, JSW",
    bricks: "Fly Ash Bricks",
    sanitary: "Johnson, Somany, Kerovit",
    electrical: "Anchor, Havells, Polycab",
    tiles: "Kajaria, Somany, Johnson, Nitco",
    painting: "Asian Paints Apcolite, Berger Easy Clean, Dulux Promise, Nippon Matex",
    doorFrame: "Teak Mixed Wood",
    windowFrame: "Fenesta, Hindalco Aluminium, Eternia uPVC",
    doorsAndLocks: "Bedroom Doors: Godrej Cylindrical or Dorset"
  },
  premium: {
    cement: "Nuvoco, UltraTech, ACC Gold, Ambuja Plus",
    steel: "Jindal Panther, Tata Tiscon, SAIL, SeQR, JSW NeoSteel",
    bricks: "Fly Ash Bricks / Red Bricks / Hollow Bricks",
    sanitary: "Hindware, Jaquar, CER",
    electrical: "Legrand + ABB + Havells Premium",
    tiles: "Cera Tiles, RAK Ceramics, Simpolo Premium, Kajaria Premium",
    painting: "Asian Paints Royale, Berger Silk Luxury, Dulux Velvet Touch",
    doorFrame: "Burma Teak, African Teak",
    windowFrame: "Fenesta, Hindalco Aluminium, Eternia uPVC",
    doorsAndLocks: "Bathroom Doors: Stainless Steel Privacy Lock"
  }
};

export const EXTRA_WORK_ITEMS = [
  "1. Staircase headroom and parapet work, if not included in the agreed scope.",
  "2. Additional elevation/design work or changes to the approved plan.",
  "3. Decorative or special plaster/design work.",
  "4. Underground water tank, sewerage/septic tank and boundary wall.",
  "5. Additional floors above the ground floor.",
  "6. The notes indicate an additional rate of approximately ₹ as per market price per sq. ft. per floor.",
  "7. The final rate must be agreed based on the work. Any extra.",
  "8. Changed or Omitted work not listed in the agreed scope."
];

export const CORE_HOUSE_SPECS = {
  basic: {
    cement: MATERIAL_SPECS.basic.cement,
    steel: MATERIAL_SPECS.basic.steel,
    bricks: MATERIAL_SPECS.basic.bricks,
    concrete: "PCC and RCC as per approved structural design",
    foundation: "Site excavation, PCC, footings and plinth beam",
    structure: "RCC columns, beams and slabs",
    masonry: "Fly ash brick / block masonry",
    electrical: "Basic concealed electrical conduits",
    plumbing: "Basic plumbing sleeves and drainage provisions"
  },

  classic: {
    cement: MATERIAL_SPECS.classic.cement,
    steel: MATERIAL_SPECS.classic.steel,
    bricks: MATERIAL_SPECS.classic.bricks,
    concrete: "PCC and RCC as per approved structural design",
    foundation: "Site excavation, PCC, footings and plinth beam",
    structure: "RCC columns, beams and slabs",
    masonry: "Fly ash brick / block masonry",
    electrical: "Concealed electrical conduits",
    plumbing: "Plumbing sleeves and drainage provisions"
  },

  premium: {
    cement: MATERIAL_SPECS.premium.cement,
    steel: MATERIAL_SPECS.premium.steel,
    bricks: MATERIAL_SPECS.premium.bricks,
    concrete: "PCC and RCC as per approved structural design",
    foundation: "Site excavation, PCC, footings and plinth beam",
    structure: "RCC columns, beams and slabs",
    masonry: "Approved brick / block masonry",
    electrical: "Concealed electrical conduits",
    plumbing: "Plumbing sleeves and drainage provisions"
  }
};

export const CORE_HOUSE_LABELS = {
  cement: "Cement",
  steel: "Steel",
  bricks: "Bricks / Blocks",
  concrete: "Concrete",
  foundation: "Foundation Work",
  structure: "RCC Structure",
  masonry: "Masonry Work",
  electrical: "Electrical Provisions",
  plumbing: "Plumbing Provisions"
};
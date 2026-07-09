// Rate matrix based on your exact pricing structure
export const CALCULATION_RATES = {
  coreHouse: { basic: 1100, classic: 1250, premium: 1450 },
  lockAndKey: { basic: 1700, classic: 2100, premium: 2500 },
  semiFurnished: { basic: 2100, classic: 2500, premium: 3000 },
  fullyFurnished: { basic: 2800, classic: 3400, premium: 4200 }
};

// Fixed pricing for optional add-ons
export const ADD_ON_PRICES = {
  modularKitchen: 250000,
  falseCeiling: 120000,
  compoundWall: 180000,
  borewell: 80000,
  solarSystem: 250000,
  smartHome: 300000,
  lift: 800000
};
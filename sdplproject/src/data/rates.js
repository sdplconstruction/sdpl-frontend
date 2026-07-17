// Rate matrix based on your exact pricing structure
export const CALCULATION_RATES = {
  coreHouse: { basic: 1200, classic: 1350, premium: 1450 },
  lockAndKey: { basic: 1700, classic: 2100, premium: 2500 },
  semiFurnished: { basic: 2100, classic: 2500, premium: 3000 },
  fullyFurnished: { basic: 2800, classic: 3400, premium: 4200 }
};

// Fixed pricing for optional add-ons
export const ADD_ON_PRICES = {
  modularKitchen: 300000,
  falseCeiling: 120000,
  compoundWall: 300000,
  borewell: 150000,
  solarSystem: 250000,
  smartHome: 400000,
  lift: 500000
};
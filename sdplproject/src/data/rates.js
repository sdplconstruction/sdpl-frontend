// Rate matrix based on your exact spreadsheet pricing structure
export const CALCULATION_RATES = {
  coreHouse: { basic: 999, classic: 1200, premium: 1400 },
  lockAndKey: { basic: 1600, classic: 1800, premium: 2200 },
  semiFurnished: { basic: 1800, classic: 2000, premium: 2400 },
  fullyFurnished: { basic: 2500, classic: 3000, premium: 3500 }
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


let item = {
  department: "Belts",
  style: "004007861",
  styleColor: "004007861 010",
  description: "Button Hipslung Belt",
  colorCode: "NAT",
  cost: 13.17,
  retail: 29.99,
  pricingStatus: "markdown",
  season: "Spring/Summer",
  grossMarginPercent: 666,
  grossMarginDollars: 666,
};

let sales = {
  lastWeekSellThrough: 666,
  toDateSellThrough: 666,
  averageUnitRetail: 666,
  averagePerStore: 666,
  weeklySales: [
    {weekEndingDate: '3/26/11',  salesUnits: 81,  salesDollars: 2138.7078},
    {weekEndingDate: '4/2/11',   salesUnits: 93,  salesDollars: 2455.5534},
    {weekEndingDate: '4/9/11',   salesUnits: 120, salesDollars: 3168.456},
    {weekEndingDate: '4/16/11',  salesUnits: 210, salesDollars: 5544.798},
    {weekEndingDate: '4/23/11',  salesUnits: 252, salesDollars: 6653.7576},
    {weekEndingDate: '4/30/11',  salesUnits: 207, salesDollars: 5465.5866},
    {weekEndingDate: '5/7/11',   salesUnits: 324, salesDollars: 8554.8312},
    {weekEndingDate: '5/14/11',  salesUnits: 399, salesDollars: 10535.1162},
    {weekEndingDate: '5/21/11',  salesUnits: 396, salesDollars: 10455.9048},
    {weekEndingDate: '5/28/11',  salesUnits: 288, salesDollars: 7604.2944},
    {weekEndingDate: '6/4/11',   salesUnits: 270, salesDollars: 7129.026},
    {weekEndingDate: '6/11/11',  salesUnits: 66,  salesDollars: 1742.6508},
  ],
};

let stores = {
  storeGroup: "ALL",
  storeCount: 379,
};

let inventory = {
  retailDC: 2475,
  committed: 2707,
  totalAvailable: 3526,
  storesWithInventory: 371,
  avgCommitted: 666,
  onOrder: {
    dueThisWeek: 0,
    nextPODueDate: "",
    nextPOQuantity: 0,
    totalOnOrder: 0
  },
};

window.DATA = {
  item,
  sales,
  stores,
  inventory
};


let sellThrough = (inventorySold, totalInventory) => {
  return inventorySold / totalInventory;
};

let avgUnitRetail = (totalSalesDollars, salesUnits) => {
  return totalSalesDollars / salesUnits;
};

let avgPerStore = (salesUnits, storesWithInventory) => {
  return salesUnits / storesWithInventory;
};

let grossMarginPercent = (cost, retail) => {
  return ( (retail - cost) / retail );
};

let grossMarginDollars = (cost, retail) => {
  return (retail - cost);
};

avgCommitted: function () {
  return this.totalAvailable / this.storesWithInventory;
};
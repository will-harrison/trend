function nest(seq, keys) {
  // console.log(seq);
  if (!keys.length)
    return seq;
  var first = keys[0];
  var rest = keys.slice(1);
  return _.mapValues(_.groupBy(seq, first), function (value) {
    return nest(value, rest)
  });
};

function traverse(seq, data) {
  // console.log(data['S3 11']['Knit Tops']);
  return _.reduce(seq, (memo, val, index) => {
    let keys = _.keys(memo);
    // console.log("index", memo);
    // console.log("val", val);
    // console.log("keys", keys);
    // console.log(memo[keys[val]]);

    return memo[keys[val]];
  }, data)
};


let Lens =  React.createClass({
  render: function(){
    console.log("started");
    let {items } = this.props;
          // <Stores stores={stores} />
    return (
      <div className="app container">
        <div className="flex">
          <Item item={items}/>
        </div>
        <div className="flex">
          <Inventory inventory={items} />
        </div>
        <div className="flex">
          <Sales sales={items} />
        </div>
      </div>
    );
  },
});

let Item = React.createClass({
  render() {
    let {item, stores, inventory} = this.props;
    let gmDollars = item.retail - item.cost;
    let gmPercent = Math.round((gmDollars / item.retail) * 100, 2);
    console.log(gmDollars);
    return (
      <div className="item wrap">
        <div className="description">{item.description}</div>
        <div className="style">{item.style}</div>
        <div className="details">
          <img src="http://lorempixel.com/200/300/" />
          <table className="data">
            <tbody>
              <Row value={item.style} />
              <Row label="Department" value={item.department} />
              <Row label="Cost" prefix="$"
                value={item.cost} />
              <Row label="Retail" prefix="$"
                value={item.retail} />
            </tbody>
            <tbody>
              <Row value={item.department} />
              <Row label="Gross Margin" />
              <Row suffix="%"
                value={gmPercent} />
              <Row prefix="$"
                value={gmDollars} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});


let Row = React.createClass({
  render() {
    let {label, suffix, prefix, value} = this.props;
    let cc = _.kebabCase(this.props.label || this.props.cc);
    let header = label && <th>{label}</th>;
    return (
      <tr>
        {header}
        <td className={cc} colSpan={label ? 1 : 2}>
          {prefix}{value}{suffix}
        </td>
      </tr>
    );
  }
});



let StoresWithInventory = React.createClass({
  render() {
    let storesWithInventory = this.props.inv;
    return (
      <table className="stores-with-inventory wrap">
        <tbody>
          <Row label="Stores with inventory"
            value={storesWithInventory} />
        </tbody>
      </table>
    );
  }
});

let Inventory = React.createClass({
  render() {
    let inventory = this.props.inventory
    return (
      <table className="inventory wrap">
        <tbody>
          <Row value={inventory.committed} label="Committed Inventory" />
          <Row value={inventory.totalAvailable} label="Total Available Inventory" />
          <Row value={inventory.storesWithInventory} label="Stores with Inventory" />
          <Row value={inventory.avgCommitted} label="Avg Committed Inventory" />
          <Row value={inventory.onOrder} label="dueThisWeek" />
          <Row value={inventory.onOrder.nextPODueDate} label="Next PO Due" />
          <Row value={inventory.onOrder.nextPOQuantity} label="Next PO Qty" />
          <Row value={inventory.onOrder.totalOnOrder} label="Total On Order" />
          <StoresWithInventory inv={inventory.storesWithInventory} />
        </tbody>
      </table>
    );
  }
});


let Sales = React.createClass({
  render() {
    let sales = this.props.sales;
    let lwSales = sales.weeklySales[0];
    return (
      <table className="sales wrap">
        <tbody>
          <Row label="Week Ending Date:" value={lwSales.weekEndingDate} />
          <Row label="Sales Units:" value={lwSales.salesUnits} />
          <Row label="Sales $:" value={lwSales.salesDollars} />
          <Row label="LW Sell Through %:" value={sales.lastWeekSellThrough} />
          <Row label="To date Sell Through%:" value={sales.toDateSellThrough} />
          <Row label="Avg Unit Retail:" value={sales.averageUnitRetail} />
          <Row label="Avg Units per Store:" value={sales.averagePerStore} />
        </tbody>
      </table>
    );
  }
});

// let Row = React.createClass({
//   render() {
//     let {label, suffix, prefix, value} = this.props;
//     let cc = _.kebabCase(this.props.label || this.props.cc);
//     let header = label && <th>{label}</th>;
//     return (
//       <tr>
//         {header}
//         <td className={cc + " wrap"} colSpan={label ? 1 : 2}>
//           {prefix}{value}{suffix}
//         </td>
//       </tr>
//     );
//   }
// });

window.Lens = Lens;

// React.render(<Lens />,
//   document.getElementById("lens"));

console.log("working");
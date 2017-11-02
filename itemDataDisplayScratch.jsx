let Data = React.createClass({
  render() {
    let items = window.ITEMS;

    let department = _.groupBy(items, i => i.category);
    let colorByDepartment = _.groupBy(department, i => i.colorDesc);

    let filtered = _(items)
      .filter(i => {return {i}})
      // .filter(i => i.colorDesc == "BLK")
      // .filter(i => i.category==="Blazers")
      // .filter(i => i.sku == "004006546 030")

    let groups = ["season", "category"]
    let grouped = _(filtered)
      .groupBy(i => i[groups[0]])
      .mapValues(a => _(a)
        .groupBy(i => i[groups[1]])
        .mapValues(a => _(a)).value())
      .value()


    // let reduced = _(filtered)
    //   .reduce((memo, i) => memo + i.WTDSales, 0)
    // console.log(reduced);

    let groupBy = _(filtered)
      .groupBy(i => i.season)
      .mapValues(byFlowCode => _(byFlowCode)
        .groupBy(i => i.category)
        .mapValues(byDepartmentName => _(byDepartmentName)
          .groupBy(i => i.styleDesc)
          .mapValues(byStyle => _(byStyle)
          .sortBy(i => i.colorCode)
            .map(i => {return `${i.styleDesc} ${i.colorDesc}`} )
            // .mapValues(bySKU => _(bySKU)
            // .value())
          .value())
        .value())
      .value())
    .value();


    // let { items, filter } = this.state;
    // let criteria = _.map([filter], ([property, value]) =>
    //   item => item[property] === value);
    // console.log({criteria});
    // items = _.foldr(criteria, (items, criterion) =>
    //   items.filter(criterion), _(items)).value();
    // console.log(items);

    let WTDSalesByDepartment = _(filtered)
      .groupBy(i => i.category)
      .mapValues(byDepartmentName => _(byDepartmentName)
          .groupBy(i => i.colorDesc)
          .mapValues(byColorDesc => _(byColorDesc)
          .sum(i => i.WTDSales))
        .value())
      .value()


    let aggregateProperties = [
      {property: "WTDSales", agg: "sum"},
      {property: "planAPS", agg: ""},
      {property: "committedInventory", agg: ""},
      {property: "total", agg: ""}
      ];

    let blah = _(filtered)
      .groupBy(i => i.season)
      .mapValues(byFlowCode => _(byFlowCode)
        .groupBy(i => i.category)
        .mapValues(byDepartmentName => _(byDepartmentName)
          .value())
        .value())
      .value();


    // let WTDSalesByDepartment = _(filtered).mapKeys(i=>i)

    let grouper = _.foldr(groups, (memo, group) => {
      let seed = `.groupBy(i => i.${group}).mapValues(by${group} => _(by${group})`
    }, "");

    console.log(grouper);


// example code from tester.jsx
    // let criteria = _.map([filter], ([property, value]) =>
    //   item => item[property] === value);
    // console.log({criteria});
    // items = _.foldr(criteria, (items, criterion) =>
    //   items.filter(criterion), _(items)).value();
    // console.log(items);



    // let _WTDSales = _(filtered)
    //   .groupBy(i => i.season)
    //   .mapValues(byFlowCode => _(byFlowCode)
    //     .sum(i => i.WTDSales))
        // .groupBy(i => i.Style)
        // .mapValues(bySKU => _(bySKU)
          // .value())
      // .value();
      // _.sum(i, value => value.WTDSales))

    let _WTDSales = _(grouped).mapValues(i=>i.WTDSales)//.sum(i=>i.WTDSales);
    // let _WTDSales = _(grouped)
    //   .map(g => g.WTDSales)
    //   .sum(g => g)
    //   // .value();






    let AvgSales = _.sum(blah["U3 11"]["Blazers"], i=> i.WTDSales) / _.size(blah, i=>i);
    console.log(AvgSales);
    let AvgCommitted = _.sum(grouped, i=>i.committedInventory / i.storesWithInventory);
    let GrossMarginDollars = _.sum(grouped, i=>i.retailPrice) - _.sum(grouped, i=>i.unitCost);
    let GrossMarginPercent = GrossMarginDollars / _.sum(grouped, i=>i.retailPrice);




        // <DisplayData data={WTDSalesByDepartment} title={"WTDSalesByDepartment"} />
    return (
      <div className="uk-grid uk-grid-1-10 uk-container-center">
        <input type="text" defaultValue="filter"
        <DisplayData data={WTDSalesByDepartment} title={"WTDSalesByDepartment"} />
        <DisplayData data={blah} title={"blah"} />
      </div>
    );
  }
});

let DisplayData = React.createClass({
  render() {
    let { data, title } = this.props;
    return (
      <div>
        <div>{title}</div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
});

React.render(<Data />,
  document.getElementById("data"));
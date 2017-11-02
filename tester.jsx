let GoodStuff = {
  update(mods) {
    this.setState(React.addons.update(this.state, mods));
  },
};



let Rollup = React.createClass({
  mixins: [GoodStuff],
  getInitialState() {
    let items = window.ITEMS;
    let filter = [];
    return { items, filter };
  },
  applyFilter(event) {
    let property = "departmentName";
    let value = "Sweaters";
    this.update({
      filter: { $set: [property, value] }
    });
  },
  render() {
    let { items, filter } = this.state;
    let criteria = _.map([filter], ([property, value]) =>
      item => item[property] === value);
    console.log({criteria});
    items = _.foldr(criteria, (items, criterion) =>
      items.filter(criterion), _(items)).value();
    console.log(items);

     // <pre>{JSON.stringify(items, null, 2)}</pre>
    return (
      <div className="uk-container uk-container-center">
        <div onClick={this.applyFilter} className="uk-block uk-block-muted uk-text-center">
          <Title title={"Fashion! Tee Shirt"} />
        </div>
        <div className="uk-grid uk-container-center">
          <ProductImage />
          <Chart chart="bar-chart" />
        </div>
        <div className="uk-grid uk-grid-width-1-2 uk-container-center">
          <Inventory items={items} />
          <Financial items={items} />
        </div>
      </div>
    );
  },
});


let Title = React.createClass({
  render() {
    let { title } = this.props;
    return (
      <div className="uk-width-1-1 uk-heading-large">{title}</div>
    );
  },
});

let ProductImage = React.createClass({
  render() {
    return (
      <div className="uk-width-3-10">
        <a href={"http://image.spreadshirtmedia.net/image-server/v1/products/111128348/views/1,width=480,height=480.png/1850.png"} data-uk-lightbox >
          <img className="uk-thumbnail uk-thumbnail-small uk-thumbnail-expand" src="http://image.spreadshirtmedia.net/image-server/v1/products/111128348/views/1,width=280,height=280.png/1850.png" alt="" />
        </a>
      </div>
    );
  },
});

let Chart = React.createClass({
  render() {
    let { chart } = this.props;
    return (
      <div className="uk-width-7-10">
        <a href={"http://www.visualmining.com/wp-content/uploads/2013/02/lineSet2_withDropShadow.png"} data-uk-lightbox >
          <img className="uk-thumbnail uk-thumbnail-small uk-thumbnail-expand" src="http://www.visualmining.com/wp-content/uploads/2013/02/lineSet2_withDropShadow.png" alt="" />
        </a>
      </div>
    );
  },
});

let Inventory = React.createClass({
  render() {
    let { items } = this.props;
    let maxStores = _.max(items, i => i.storesWithInventory);
    console.log(maxStores);
    let avgCommitted = _.sum(items, i => i.totalInventory) / maxStores;
    // let storesWithInventory =
    // let
    return (
      <Panel
        title={"Stores with inventory"}
        body={"348 / " + maxStores + "- 93%"} />
    );
  },
});

let Financials = React.createClass({
  render() {
    let { financials } = this.props;
    return (
      <div className="uk-panel">
        <span>{"financials"}</span>
        <Financial value={_WTDSales} />
      </div>
    );
  },
});

let Financial = React.createClass({
  render() {
    let { items } = this.props;
    let _WTDSales = _.sum(items, i => i.WTDSales);
    let _planAPS = _.sum(items, i => i.planAPS) / _.size(items);
    let avgRetail = _.sum(items, i => i.retailPrice) / _.size(items);
    let avgCost = _.sum(items, i => i.unitCost) / _.size(items);
    let _grossMarginDollars = (avgRetail - avgCost);
    let _grossMarginPercent = (_grossMarginDollars / avgRetail);

    return (
      <div className="uk-grid">
        <div className="uk-width-1-1">
          <Panel
            title={"WTD Sales Units"}
            body={_WTDSales} />
          <Panel
            title={"Gross Margin $"}
            body={_grossMarginDollars} />
          <Panel
            title={"Gross Margin %"}
            body={_grossMarginPercent} />
        </div>
      </div>
    );
  },
});

let Panel = React.createClass({
  render() {
    let { title, body } = this.props;
          // {"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation"}
    return (
      <div className="uk-grid uk-panel uk-panel-divider">
        <div className="uk-width-1-2  uk-panel-header">
          <h3 className="uk-panel-title">{title}</h3>
          <h3 style={{"marginTop": "-15px"}}>{body}</h3>
        </div>
        <div className="uk-width-1-2">
        <Vizualization height={"100px"} width={"30px"}>
          <Boxplot />
        </Vizualization>
        </div>
      </div>
    );
  }
});

let Vizualization = React.createClass({
  render() {
    let { type, data, options } = this.props;
    return (
      <svg {...this.props}>{this.props.children}</svg>
    );
  }
});

let Rectangle = React.createClass({
  render() {
      // <rect {...this.props}>{this.props.children}</rect>
      // <div />
        // <transform="scale(1,-1)" />
        // <transform="translate(0,100)" />
    return (
      <g className="box">
        <line className="center" x1="27" y1="268.10726685023343" x2="27" y2="169.77133963845324" style={{opacity: 1, strokeDasharray: "3,3"}}></line>
        <rect className="box" x="0" y="183.96683826170238" width="54" height="40.629115287920484"></rect>
        <line className="median" x1="0" y1="199.28468813599903" x2="54" y2="199.28468813599903"></line>
        <line className="whisker" x1="0" y1="268.10726685023343" x2="54" y2="268.10726685023343" style={{opacity: 1, fill: "steelblue", stroke: "#000", strokeWidth: "1px"}}></line>
        <line className="whisker" x1="0" y1="169.77133963845324" x2="54" y2="169.77133963845324" style={{opacity: 1, fill: "steelblue", stroke: "#000", strokeWidth: "1px"}}></line>
        <circle className="outlier" r="5" cx="27" cy="287.32192026816716" style={{opacity: 1}}></circle>
        <circle className="outlier" r="5" cx="27" cy="0" style={{opacity: 1}}></circle>
      </g>
    );
  },
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

// React.render(<Rollup />,
//   document.getElementById("app"));


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
  }


let Data = React.createClass({
  getInitialState() {
    return {
      items: window.ITEMS,
      groups: ["season", "category", "item", "sku"],
      currentGrouping: [3, 1],
      filters: [],
      exclusions: [],
      currentSort: "WTDSales",
    }
  },

  filterItems() {
    let items = this.state.items;
    let filters = this.state.filters;
    return items;
    if (filters.length) {
      // console.log(filters);
      return (
        _(items)
          .filters( i => i.season === filter[0] )
        );
    }
    return items;
  },


  groupItems() {
    let items = this.filterItems();
    let grouping = this.state.groups.slice(0, this.state.currentGrouping.length);
    let currentGroup = _.first(grouping);
    return nest(items, grouping)
  },

  handleChange(event) {
    return this.setState({currentFilter: event.target.value})
  },


  handleFilter() {
    let categories = ["U3 11", "U2 11", "U1 11", "S3 11", "S1 11", "E1 10", "S2 11", "H1 10"];//["Knit Tops", "Blazers", "Tee Shirts", "Sweaters"]
    return this.setState({currentFilter: _.sample(categories)})
  },




  handleArrows(event) {
    // console.log(event.type, event.which, event.timeStamp, event.keyCode);
    let groups = this.state.groups;
    let localGrouping = this.state.currentGrouping;
    let currentIndex = _.last(localGrouping);
    // this.traverse();
    switch(event.keyCode) {
      case 37:
        // console.log("left");
        if ( localGrouping.length !== 1 ) {
          localGrouping.pop();
          this.setState({ currentGrouping: localGrouping })
        };
        break;
      case 39:
        // console.log("right");
        if (localGrouping.length < this.state.groups.length) {
          localGrouping.push(0);
          this.setState({ currentGrouping: localGrouping })
        };
        break;
      case 38:
        // console.log("up");
        if (currentIndex > 0) {
          localGrouping.pop();
          localGrouping.push(currentIndex - 1)
          this.setState( {currentGrouping: localGrouping} )};
        break;
      case 40:
        // console.log("down");
        if (currentIndex < 10) {
          localGrouping.pop();
          localGrouping.push(currentIndex + 1)
          this.setState( {currentGrouping: localGrouping} )};
        break;
      default:
        // console.log("?");
        break;
    }
    console.log(this.state.currentGrouping);
  },

  render() {

    let groupedItems = this.groupItems();
    let displayItems = traverse(this.state.currentGrouping, groupedItems);

    let WTDSales = _.sum(displayItems, i => i.WTDSales);
    console.log(WTDSales);

        // <DisplayData data={WTDSalesByDepartment} title={"WTDSalesByDepartment"} />
    return (
      <div className="uk-grid uk-grid-1-10 uk-container-center"
           onKeyDown={this.handleArrows}>
        <div>
          <button onClick={this.handleFilter}>
            filter
          </button>
        </div>
        <DisplayData data={displayItems} title={"display items"} />
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
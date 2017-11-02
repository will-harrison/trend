// groups data set by an array of groupings, state.groups

function nest(seq, keys) {
  if (!keys.length)
    return seq;
  var first = _.first(keys);
  return _.mapValues(_.groupBy(seq, first), function (value) {
    return nest(value, _.rest(keys))
  });
};

// traverses the data set using index of state.currentGrouping
// as the depth, and value as the index of the current group's keys
function traverse(seq, data) {
  return _.reduce(seq, (memo, val, index) => {
    let keys = _.keys(memo);
    return memo[keys[val]];
  }, data)
};

function getKeys(seq, data) {
  let keys = [];
  _.reduce(seq, (memo, val, index) => {
    let currentKeys = _.keys(memo);
    keys.push(currentKeys);
    return memo[currentKeys[val]];
  }, data);
  return keys;
};


function getDescription(item, group) {
  let desc = {
    sku: item.itemDesc + " - " + item.colorDesc + " - " + item.sku,
    item: item.itemDesc + " - " + item.item,
    category: item.category,
    department: item.department,
    colorDesc: item.colorDesc
  };
  return desc[group]
  };

let App = React.createClass({

  getInitialState() {
    return {
      items: window.ITEMS,
      groups: ["department", "category", "item", "sku"],
      currentGrouping: [0 ],
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
      return (
        _(items)
          .filters( i => i.season === filter[0] )
        );
    }
    console.log("filterItems", items);
    return items;
  },


  groupItems() {
    let items = this.filterItems();
    let grouping = this.state.groups.slice(0, this.state.currentGrouping.length);
    return nest(items, grouping)
  },

  displayItems() {
    console.log(this.groupItems());
    return traverse(this.state.currentGrouping, this.groupItems())
  },

  handleArrows(event) {
    event.preventDefault();
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
  },



  computeProps(items) {
// TODO WH: refactor to reduce statement
    let lensIndex = this.state.currentGrouping.length - 1;
    let lensGroup = this.state.groups[lensIndex];
    let lensValue = this.state.currentGrouping[lensIndex];
    let parentIndex = this.state.currentGrouping.length - 2;
    let parentGroup = this.state.groups[parentIndex];
    let parentValue = this.state.currentGrouping[parentIndex];
    let childrenIndex = this.state.currentGrouping.length;
    let childrenGroup = this.state.groups[childrenIndex];
    let childrenValue = this.state.currentGrouping[childrenIndex];


    let description = {
      sku: items[0].itemDesc + " - " + items[0].colorDesc + " - " + items[0].sku,
      item: items[0].itemDesc + " - " + items[0].item,
      category: items[0].category,
      department: items[0].department,
      colorDesc: items[0].colorDesc
      };

    return {
      parent: {
        index: parentValue,
        group: parentGroup,
        keys: _.keys(traverse(_.initial(_.initial(this.state.currentGrouping)), this.groupItems())) || [],
        description: description[parentGroup] },
      lens: {
        index: lensValue,
        group: lensGroup,
        keys: _.keys(traverse(_.initial(this.state.currentGrouping), this.groupItems())),
        description: description[lensGroup] },
      children: {
        index: childrenValue || 0,
        group: childrenGroup,
// TODO WH: _.uniq not working here
        keys: _.values(traverse(this.state.currentGrouping, this.groupItems()), i => i[childrenGroup]),
        description: description[childrenGroup] },
    };
  },


  render() {
    let cp = this.computeProps(this.displayItems());
    return (
      <div className="uk-container uk-container-center uk-height-1-1 uk-vertical-align"
        onKeyDown={this.handleArrows}>
        <div className="uk-grid uk-vertical-align-middle">
          <div className="parent uk-width-2-10">
            <Parent
              keys={cp.parent.keys}
              description={cp.parent.description}
              index={cp.parent.index}
              group={cp.parent.group} />
          </div>
          <div className="lens uk-width-6-10">
            <LensSibling
              keys={cp.lens.keys.slice(0, cp.lens.index)} />
            <Lens
              items={this.displayItems()}
              description={cp.lens.description} />
            <LensSibling
              keys={cp.lens.keys.slice(cp.lens.index + 1)} />
          </div>
          <div className="children uk-width-2-10">
            <Children
              keys={cp.children.keys}
              group={cp.children.group} />
          </div>
        </div>
      </div>
      );

  },
});


let LensSibling = React.createClass({
  render() {
    let { keys } = this.props;
    return (
      <div className="uk-block uk-block-muted">
      <ul className="uk-list uk-text-center uk-text-large">
        {keys.map(i => <li key={i}>{i}</li>)}
      </ul>
      </div>
    );
  }
});

let Children = React.createClass({
  render() {
  let { keys, description, index, group } = this.props;
  keys = _.unique(keys);
  return (
    <div className="children-group">
      <h3>{group}</h3>
      <div className="uk-block uk-block-muted">
        <ul className="uk-list uk-list-space">
          {keys.map((v, i) => {
            return <li className={"uk-text-muted"} key={i}>{getDescription(v, group)}</li>;
          })}
        </ul>
      </div>
    </div>
    );
  },
})

let Parent = React.createClass({
  render() {
  let { keys, description, index, group } = this.props;
  return (
    <div className="parent-group">
      <h3>{group}</h3>
      <div className="uk-block uk-block-muted">
        <ul className="uk-list uk-list-space">
          {keys.map((v, i) => {
            let className = "";
            if (i !== index)
              {className = "uk-text-small uk-text-muted"}
            else
              {className="uk-text-large uk-text-bold uk-text-center"};
            return <li className={className} key={i}>{v}</li>;
          })}
        </ul>
      </div>
    </div>
    );
  },
})


React.render(<App />,
  document.getElementById("app"));
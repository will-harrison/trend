let GoodStuff = {
  update(mods) {
    this.setState(React.addons.update(this.state, mods));
  },
};

let Groupings = React.createClass({
  mixins: [GoodStuff],
  getInitialState() {
    let items = window.ITEMS;
    let groupBy = _(item)
      .groupBy(i => i.flowCode)
      .mapValues(byFlowCode => _(byFlowCode)
        .groupBy(i => i.departmentName)
        .mapValues(byDepartmentName => _(byDepartmentName)
          .groupBy(i => i.Style)
          .mapValues(byStyle => _(byStyle)
            .groupBy(i => i.styleColor)
            .mapValues(byStyleColor => _(byStyleColor)
            .value())
          .value())
        .size())
      .value())
    .value();
    return {items, groupBy};
  },
  render(){
    return (
      <div className="uk-grid uk-grid-1-10 uk-container-center">
        <DisplayData data={groupBy} title={"groupBy"} />
      </div>
    );
  }
});



let blah = [
  ['U3 11', 'Blazers', "004008816", "004008816 030"],
  ['U3 11', 'Blazers', "004008816", "004008816 019"],
];



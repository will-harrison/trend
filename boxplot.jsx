function calc(values, metric){
  var avg = average(values[metric]);
  var min = _.min(values[metric]);
  var max = _.max(values[metric]);

  var squareDiffs = values[metric].map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  var results =
    { avgValue: avg,
      normalMin: avg - stdDev,
      normalMax: avg + stdDev,
      totalMin: min,
      totalMax: max, };

  return results;
};

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
};

let Boxplot = React.createClass({
  // let { items, currentValue, metric } = this.props;
  // let calc = calc(items);
  render() {
    let svgHeight = 100;
    let svgWidth = 30;

    let normalMin = calc.normalMin;
    let normalMax = calc.normalMax;
    let currentValue = currentValue;
    let avgValue = calc.avgValue;
    let totalMin = calc.totalMin;
    let totalMax = calc.totalMax;
    let midX = svgWidth * .75;
    let barWidth = ( svgWidth / 3 ) / 2;

    // remember to flip afterword to account for 0,0 starting top left

    return (
      <svg height={svgHeight} width={svgWidth} >
        <NormalVertical x={midX} normalMin={normalMin} normalMax={normalMax} />
        <HighVertical x={midX} normalMax={normalMax} totalMax={totalMax} />
        <LowVertical x={midX} normalMin={normalMin} totalMin={totalMin} />
        <NormalMax x={midX} barWidth={barWidth} normalMax={normalMax} />
        <NormalMin x={midX} normalMin={normalMin} barWidth={barWidth} />
        <CurrentLine svgWidth={svgWidth} currentValue={currentValue} />
      </svg>
    );
  }
});


let NormalMax = React.createClass({
  render() {
    let { normalMax, x, barWidth } = this.props;
    let x1 = x - barWidth;
    let x2 = x + barWidth;
    return (
      <line x1={x1} x2={x2} y1={normalMax} y2={normalMax} style={{stroke: "#000", strokeWidth: "1.5px"}} />
    );
  }
});


let NormalMin = React.createClass({
  render() {
    let { normalMin, x, barWidth } = this.props;
    let x1 = x - barWidth;
    let x2 = x + barWidth;
    return (
      <line x1={x1} x2={x2} y1={normalMin} y2={normalMin} style={{stroke: "#000", strokeWidth: "1.5px"}} />
    );
  }
});


let HighVertical = React.createClass({
  render() {
    let { x, normalMax, totalMax } = this.props;
    return (
      <line x1={x} x2={x} y1={totalMax} y2={normalMax} style={{strokeDasharray: "2,2", stroke: "#000", strokeWidth: "1px"}} />
    );
  }
});

let NormalVertical = React.createClass({
  render() {
    let { x, normalMin, normalMax } = this.props;
    return (
      <line x1={x} x2={x} y1={normalMin} y2={normalMax} style={{strokeDasharray: "3,3", stroke: "#000", strokeWidth: "1.5px"}} />
    );
  }
});

let LowVertical = React.createClass({
  render() {
    let { x, normalMin, totalMin } = this.props;
    return (
      <line x1={x} x2={x} y1={totalMin} y2={normalMin} style={{strokeDasharray: "2,2", stroke: "#000", strokeWidth: "1px"}} />
    );
  }
});

let CurrentLine = React.createClass({
  render() {
    let { svgWidth, currentValue } = this.props;
    return (
      <line x1={0} x2={svgWidth} y1={currentValue} y2={currentValue} style={{stroke: "#000", strokeWidth: ".5px"}} />
    );
  }
});

let AverageValue = React.createClass({
  render() {
    return (
      <div></div>
    );
  }
})

window.Boxplot = Boxplot;
// React.render(<Boxplot />,
//   document.getElementById("app"));

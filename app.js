const DUMMY_DATA = [
    { id: 'd1', value: 10, region: 'USA' },
    { id: 'd2', value: 11, region: 'India' },
    { id: 'd3', value: 12, region: 'China' },
    { id: 'd4', value: 6, region: 'Germany' },
  ];
  
const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map((dataPoint) => dataPoint.region))
  .rangeRound([0, 250])
  .padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);
  
const container = d3.select('svg').classed('container', true);
  
const bars = container
  .selectAll('.bar')
  .data(DUMMY_DATA)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.value))
  .attr('x', data => xScale(data.region))
  .attr('y', data => yScale(data.value));

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/grouped-bar-chart
function GroupedBarChart(data, {
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // given d in data, returns the title text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values
  xRange = [marginLeft, width - marginRight], // [xmin, xmax]
  xPadding = 0.1, // amount of x-range to reserve to separate groups
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [ymin, ymax]
  zDomain, // array of z-values
  zPadding = 0.05, // amount of x-range to reserve to separate bars
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors = d3.schemeTableau10, // array of colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  // Compute default domains, and unique the x- and z-domains.
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in both the x- and z-domain.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  const xzScale = d3.scaleBand(zDomain, [0, xScale.bandwidth()]).padding(zPadding);
  const yScale = yType(yDomain, yRange);
  const zScale = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  const bar = svg.append("g")
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("x", i => xScale(X[i]) + xzScale(Z[i]))
      .attr("y", i => yScale(Y[i]))
      .attr("width", xzScale.bandwidth())
      .attr("height", i => yScale(0) - yScale(Y[i]))
      .attr("fill", i => zScale(Z[i]));

  if (title) bar.append("title")
      .text(title);

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

  return Object.assign(svg.node(), {scales: {color: zScale}});
}

states = [
  {
      "name": "AL",
      "<10": 598478,
      "10-19": 638789,
      "20-29": 661666,
      "30-39": 603013,
      "40-49": 625599,
      "50-59": 673864,
      "60-69": 548376,
      "70-79": 316598,
      "≥80": 174781
  },
  {
      "name": "AK",
      "<10": 106741,
      "10-19": 99926,
      "20-29": 120674,
      "30-39": 102008,
      "40-49": 91539,
      "50-59": 104569,
      "60-69": 70473,
      "70-79": 28422,
      "≥80": 12503
  },
  {
      "name": "AZ",
      "<10": 892083,
      "10-19": 912735,
      "20-29": 939804,
      "30-39": 857054,
      "40-49": 833290,
      "50-59": 834858,
      "60-69": 737884,
      "70-79": 466153,
      "≥80": 254716
  },
  {
      "name": "AR",
      "<10": 392177,
      "10-19": 397185,
      "20-29": 399698,
      "30-39": 372998,
      "40-49": 370157,
      "50-59": 395070,
      "60-69": 329734,
      "70-79": 197985,
      "≥80": 113468
  },
  {
      "name": "CA",
      "<10": 5038433,
      "10-19": 5170341,
      "20-29": 5809455,
      "30-39": 5354112,
      "40-49": 5179258,
      "50-59": 5042094,
      "60-69": 3737461,
      "70-79": 2011678,
      "≥80": 1311374
  },
  {
      "name": "CO",
      "<10": 690830,
      "10-19": 697447,
      "20-29": 780508,
      "30-39": 766382,
      "40-49": 705450,
      "50-59": 725661,
      "60-69": 563376,
      "70-79": 274466,
      "≥80": 155175
  },
  {
      "name": "CT",
      "<10": 399369,
      "10-19": 481065,
      "20-29": 462323,
      "30-39": 424890,
      "40-49": 496265,
      "50-59": 546361,
      "60-69": 400995,
      "70-79": 217827,
      "≥80": 159475
  }]
ages = ["<10", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "≥80"]
stateages = ages.flatMap(age => states.map(d => ({state: d.name, age, population: d[age]}))) 

chart = GroupedBarChart(stateages, {
  x: d => d.state,
  y: d => d.population / 1e6,
  z: d => d.age,
  xDomain: d3.groupSort(stateages, D => d3.sum(D, d => -d.population), d => d.state).slice(0, 6), // top 6
  yLabel: "↑ Population (millions)",
  zDomain: ages,
  colors: d3.schemeSpectral[ages.length],
  width: 500,
  height: 500
})

const groupedContainer = document.getElementById('chartContainer');
groupedContainer.appendChild(chart);
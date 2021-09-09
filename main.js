/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project  MLB-Pitch
*/

var margin = { left:80, right:100, top:50, bottom:100 };

var width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    
var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

var g = svg   
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
        .attr("class", "mouse-over-effects");

var div = d3.select("body")
     .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


g.append("text")
    .attr("y", height + 45)
    .attr("x", width / 2)
    .attr("font-size", "18px")
    .attr("text-anchor", "middle")
    .text("Horizontal Movement");

// X Label
g.append("text")
    .attr("y", height + 90)
    .attr("x", width / 2)
    .attr("font-size", "24px")
    .attr("text-anchor", "middle")
    .text("[Baseball Pitches Types]");

g.append("text")
    .attr("class", "y axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -270)
    .attr("font-size", "18px")
    .attr("text-anchor", "middle")
    .text("Vertical Movement");

    

var continentColor = d3.scaleOrdinal(d3.schemeCategory10);

var continents = ["FF", "CU", "FC", "SI","IN","SL","FT"];



d3.json("MLB-pitch_part1.json").then(function(data){
    console.log(data);

    // Clean data
    data.forEach(function(d) {
        d.px = +d.px;
        d.pz= +d.pz;
        d.start=+d.start;
        d.ab_id=+d.ab_id;
        d.pitch_type=d.pitch_type;
    });


var legend = g.append("g")
    .attr("transform", "translate(" + (502) + 
        "," + (height - 150) + ")");

continents.forEach(function(continent, i){
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 20) + ")");

    legendRow.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", continentColor(continent));

  
      });

var legend = g.selectAll(".legend")
      .data(continentColor.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(2," + i * 20 + ")";  });

     legend.append("rect")
      .attr("x", width-20)
      .attr("y", height-150)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", continentColor);

      legend.append("text")
      .attr("x", width -40)
      .attr("y", height-145)
      .attr("dy", ".35em")
      .style("text-anchor", "pitch_type")
      .text(function(d) { return d; });

    // X Scale
    var x = d3.scaleLinear()
        .domain([-5, d3.max(data, function(d) { return d.px})])
        .range([10, width]);
     var x1 = d3.scaleLinear()
        .domain([-5, d3.max(data, function(d) { return d.px})])
        .range([10, width]);

    // Y Scale
    var y = d3.scaleLinear()
        .domain([-5, d3.max(data, function(d) { return d.pz })])
        .range([height, 0]);
    var y1= d3.scaleLinear()
        .domain([-5, d3.max(data, function(d) { return d.pz })])
        .range([height, 0]);

     
    var linesa= g.append("line")
              .attr("x1", width/2+2)
              .attr("y1", height)
              .attr("x2", width/2+2)
              .attr("y2", 0)
              .attr("stroke-width", 2)
              .attr("stroke", "black");

     var lines= g.append("line")
              .attr("x1", 0)
              .attr("y1", 292)
              .attr("x2", 530)
              .attr("y2", 292)
              .attr("stroke-width", 2)
              .attr("stroke", "black");

     
var group = g.selectAll("g.bubble")

     .data(data)
     .enter().append("g")
     .attr("class","bubble")
     .attr("transform", function(d) {
      return "translate(" + x(d.px) + "," + y(d.pz) + ")"
     });



   group
      .append("circle")
      .attr("r", 4.5)
     .style("fill", function(d) {
      return continentColor (d["pitch_type"]);
    });
group
    .append("text")
    .attr("r", 4.5)
    .attr("alignment-baseline", "middle")
    .text(function(d) {
      return d.pitch_type;  
    });

    legend.on("mouseover", function(type) {
      d3.selectAll(".legend")
        .style("opacity", 0.1);
      d3.select(this)
        .style("opacity", 1);
      d3.selectAll(".bubble")
        .style("opacity", 0.1)
        .filter(function(d) { return d["pitch_type"] == type; })
        .style("opacity", 1);
    })
    .on("mouseout", function(type) {
      d3.selectAll(".legend")
        .style("opacity", 1);
      d3.selectAll(".bubble")
        .style("opacity", 1);
    });

    // X Axis
    var xAxisCall = d3.axisBottom(x)
       .ticks(3)
        .tickFormat(function(d){ return +d; });
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall);

var x1AxisCall = d3.axisTop(x1)
       .ticks(3)
        .tickFormat(function(d){ return +d; });
    g.append("g")
        .attr("class", "x1 axis")
        .call(x1AxisCall);

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .ticks(5)
        .tickFormat(function(d){ return +d; });
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

   var y1AxisCall = d3.axisRight(y1)
        .ticks(5)
        .tickFormat(function(d){ return +d; });
    g.append("g")
        .attr("class", "y1 axis")
        .attr("transform", "translate(" + (width+10) +",0)")
        .call(y1AxisCall);
})




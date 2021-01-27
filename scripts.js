var margin = { top: 100, right: 100, bottom: 300, left: 100 },
    width = 1500 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("ivis_data.csv", function(data) {

    var myGroups = d3.map(data, function(d) { return d.group; }).keys()
    var myVars = d3.map(data, function(d) { return d.variable; }).keys()

    var x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    var y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.05);
    svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateGreens)
        .domain([1, 10])

    var scale = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("padding", "5px")
        .style("width", "50%")
        .style("margin-top", "-250px")
        .style("margin-bottom", "20px")
    scale
        .html("<img src= range.png style=width:50% class=center>")

    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("width", "50%")
        .style("font-family", "Gill Sans")
        .style("text-align", "left ")

    var mouseover = function(d) {

        d3.selectAll('rect')
            .style("stroke", "none")

        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        tooltip
            .style("opacity", 1)

        tooltip
            .html("<b>" +
                "Nickname: " + "</b>" + d.nickname + " <br/> <b>" +
                "Mayor: " + "</b>" + d.degree + "<br/><b>" + "Field: " + "</b>" + d.mayor + "<br/><b>" + "Year started: " + "</b>" +
                d.year + "<br/> <b>" + "Hobbies: " + "</b>" + d.hobby + "<br/> <b> Canvas: " + "</b>" +
                d.canvas + "<br/> <b>" + "KTH Social: " + "</b>" + d.kthsocial +
                "<br/> <b> Facebook " + "</b>" + d.facebook + "<br/> <b>Expected learnings: " + "</b>" + d.learnings + "<br/> <b> Previous courses: " + "</b>" + d.courses +
                "<br/> <b> Thesis: " + "</b>" + d.thesis + "<br/> <b>In five years time: " + "</b>" + d.fiveyears)
            .style("left", (d3.mouse(this)[0] + 70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")

        scale
            .html("<img src= range.png style=width:50% class=center>" + "<br/>" + d.group + " " +
                d.variable + "<b> Value: " + "</b>" + d.value)

        linearScale
            .html("show")
            .style("opacity", 1)
            .domain(extent)
            .range([0, 100]);
    }

    svg.selectAll()
        .data(data, function(d) { return d.group + ':' + d.variable; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.variable) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function(d) { return myColor(d.value) })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)


    .on("click", mouseover)
})

svg.append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text("IVIS Project 1: Visualize Student Group Formation");

svg.append("text")
    .attr("x", 0)
    .attr("y", -20)
    .attr("text-anchor", "left")
    .style("font-size", "14px")
    .style("fill", "grey")
    .style("max-width", 400)
    .text("Click on a rectangle to read more about a student");


function onquestion() {
    document.getElementById("questions").style.display = "block";
}

function offquestion() {
    document.getElementById("questions").style.display = "none";
}

function oninfo() {
    document.getElementById("information").style.display = "block";
}

function offinfo() {
    document.getElementById("information").style.display = "none";
}
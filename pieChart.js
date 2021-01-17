var group1 = [
    {
        title: "Strongly",
        value: 22
    },
    {
        title: "Somewhat Like",
        value: 35
    },
    {
        title: "Somewhat Dislike",
        value: 15
    },
    {
        title: "Strongly Dislike",
        value: 16
    },
    {
        title: "Other/Not Sure",
        value: 12
    },
    {
        title: "Other/Not Sure",
        value: 12
    }
];

var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;


var color = d3
    .scaleOrdinal()
    .range(d3.schemeBlues[7]);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })(group1);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var svg = d3.select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.80');
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
    })
    .attr('transform', 'translate(0, 0)');

g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
        return color(d.data.title);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);

function changeData(data) {
    var keys = []

    for (const d in data) {
        keys.push(data[d].title)
    }

    console.log(keys);

    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeDark2);

    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })(data);

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data.title);
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1);

    path = d3.select("#pie")
        .selectAll("path")
        .data(pie); // Compute the new angles
    path.transition().duration(1000).attr("d", arc); // redrawing the path with a smooth transition
}

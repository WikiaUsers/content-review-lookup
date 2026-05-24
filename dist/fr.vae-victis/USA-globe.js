/* ===== GLOBE USA ===== */
mw.hook('wikipage.content').add(function() {
  if (!document.getElementById('usa-globe-container')) return;

  var width = 240;
  var height = width;

  var projection = d3.geoOrthographic()
	.scale(width / 1.4)
    .center([0, 0])
    .rotate([95, -38, 0])
    .translate([width / 2, height / 2]);

  var pathGen = d3.geoPath().projection(projection);

  var svg = d3.select("#usa-globe-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "0 auto");

  svg.append("circle")
    .attr("cx", width / 2).attr("cy", height / 2)
    .attr("r", projection.scale())
    .attr("fill", "#060d1a")
    .attr("stroke", "rgba(200,169,110,0.2)")
    .attr("stroke-width", 1);

  var graticule = d3.geoGraticule().step([20, 20]);
  svg.append("path")
    .datum(graticule())
    .attr("d", pathGen)
    .attr("fill", "none")
    .attr("stroke", "rgba(100,140,200,0.08)")
    .attr("stroke-width", 0.5);

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world) {
    var countries = topojson.feature(world, world.objects.countries);

    svg.append("g").selectAll("path")
      .data(countries.features)
      .join("path")
      .attr("d", pathGen)
      .attr("fill", function(d) {
        return String(d.id) === "840" ? "rgba(77,166,255,0.85)" : "rgba(20,35,60,0.7)";
      })
      .attr("stroke", function(d) {
        return String(d.id) === "840" ? "rgba(100,180,255,0.6)" : "rgba(60,90,140,0.3)";
      })
      .attr("stroke-width", function(d) {
        return String(d.id) === "840" ? 1 : 0.3;
      });

    svg.append("g").selectAll("path.usa-glow")
      .data(countries.features.filter(function(d){ return String(d.id)==="840"; }))
      .join("path")
      .attr("d", pathGen)
      .attr("fill", "none")
      .attr("stroke", "rgba(77,166,255,0.25)")
      .attr("stroke-width", 6);

    svg.append("path")
      .datum(topojson.mesh(world, world.objects.countries, function(a,b){ return a !== b; }))
      .attr("d", pathGen)
      .attr("fill", "none")
      .attr("stroke", "rgba(60,90,140,0.25)")
      .attr("stroke-width", 0.4);

    var leg = document.getElementById("usa-globe-legend");
    if (leg) {
      leg.innerHTML =
        '<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:rgba(160,180,220,0.7)">' +
          '<span style="width:12px;height:12px;border-radius:2px;background:rgba(77,166,255,0.85);display:inline-block"></span>' +
          'États-Unis d\'Amérique' +
        '</span>';
    }
  });
});
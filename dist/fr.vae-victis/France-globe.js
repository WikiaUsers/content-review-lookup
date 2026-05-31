/* ===== GLOBE FRANCE ===== */
mw.hook('wikipage.content').add(function() {
  if (!document.getElementById('france-globe-container')) return;
  var width = 240;
  var height = width;
  var circleRadius = width / 2 - 6;
  var projection = d3.geoOrthographic()
    .scale(circleRadius * 3)
    .center([0, 0])
    .rotate([2, -46, 0])
    .translate([width / 2, height / 2]);
  var pathGen = d3.geoPath().projection(projection);
  var svg = d3.select("#france-globe-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "0 auto");

  /* ClipPath — tout ce qui sort du cercle est masqué */
  svg.append("defs").append("clipPath")
    .attr("id", "france-globe-clip")
    .append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", circleRadius);

  /* Fond océan */
  svg.append("circle")
    .attr("cx", width / 2).attr("cy", height / 2)
    .attr("r", circleRadius)
    .attr("fill", "#060d1a")
    .attr("stroke", "rgba(200,169,110,0.2)")
    .attr("stroke-width", 1);

  /* Groupe principal clipé */
  var g = svg.append("g").attr("clip-path", "url(#france-globe-clip)");

  var graticule = d3.geoGraticule().step([20, 20]);
  g.append("path")
    .datum(graticule())
    .attr("d", pathGen)
    .attr("fill", "none")
    .attr("stroke", "rgba(100,140,200,0.08)")
    .attr("stroke-width", 0.5);

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(function(world) {
    var countries = topojson.feature(world, world.objects.countries);

    g.selectAll("path.country")
      .data(countries.features)
      .join("path")
      .attr("class", "country")
      .attr("d", pathGen)
      .attr("fill", function(d) {
        return String(d.id) === "250" ? "rgba(77,166,255,0.85)" : "rgba(20,35,60,0.7)";
      })
      .attr("stroke", function(d) {
        return String(d.id) === "250" ? "rgba(100,180,255,0.6)" : "rgba(60,90,140,0.3)";
      })
      .attr("stroke-width", function(d) {
        return String(d.id) === "250" ? 1 : 0.3;
      });

    g.selectAll("path.france-glow")
      .data(countries.features.filter(function(d){ return String(d.id) === "250"; }))
      .join("path")
      .attr("class", "france-glow")
      .attr("d", pathGen)
      .attr("fill", "none")
      .attr("stroke", "rgba(77,166,255,0.25)")
      .attr("stroke-width", 6);

    g.append("path")
      .datum(topojson.mesh(world, world.objects.countries, function(a,b){ return a !== b; }))
      .attr("d", pathGen)
      .attr("fill", "none")
      .attr("stroke", "rgba(60,90,140,0.25)")
      .attr("stroke-width", 0.4);

    var leg = document.getElementById("france-globe-legend");
    if (leg) {
      leg.innerHTML =
        '<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:rgba(160,180,220,0.7)">' +
          '<span style="width:12px;height:12px;border-radius:2px;background:rgba(77,166,255,0.85);display:inline-block"></span>' +
          'France' +
        '</span>';
    }
  });
});
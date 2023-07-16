mw.hook('wikipage.content').add(function() {
	var main = document.getElementById('regionMapStyles');
	if (!main) return;
	
	main.outerHTML = '<style>' +
		'a:hover, a:focus { text-decoration: none; }' +
		'.svgRegion { fill:transparent; }' +
		'.svgRegion:hover g, .svgRegionHighlight g { fill: #f00; }' +
		'.svgRegion text {' +
		' opacity: 0;' +
		' font-family: arial;' +
		' font-size: 50px;' +
		' font-weight: bold;' +
		' stroke: white;' +
		' stroke-width: 2px;' +
		' fill: black;' +
		' pointer-events: none;' +
		' text-anchor: middle;' +
		'}' +
		'.svgRegion:hover text { opacity: 1; }' +
	'</style>';

	var wgArticlePath = mw.config.get('wgArticlePath');
	var regionNames = $('#regionNames').data("regionnames");
	if (regionNames) {
		console.log('highlighting regions: ' + regionNames);
		var regions = regionNames.split(",").map(function(item) {
			return item.replace('_',' ').trim();
		});
		regions.forEach(function (region) {
			var encodedRegion = encodeURIComponent(region);
			$('a.svgRegion[href="' + encodedRegion + '"], a.svgRegion[href="' + wgArticlePath.replace('$1', encodedRegion.replace(/%20/g, '_') ) + '"]')
			.attr('class', 'svgRegion svgRegionHighlight');
			if (region.substring(0, 4) == 'The ') {
				encodedRegion = encodeURIComponent(region.substring(4));
				$('a.svgRegion[href="' + encodedRegion + '"], a.svgRegion[href="/wiki/' + wgArticlePath.replace('$1', encodedRegion.replace(/%20/g, '_') ) + '"]')
				.attr('class', 'svgRegion svgRegionHighlight');
			}
		});
	}
});
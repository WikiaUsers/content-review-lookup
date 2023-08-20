/* [[Template:Interactive Regionmap]] */
(function(mw) {
	'use strict';

	var wgArticlePath = mw.config.get('wgArticlePath');
	var html = '<style>' +
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
	var regionNames;

	mw.hook('wikipage.content').add(function($content) {
		var main = $content.find('#regionMapStyles:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		main.innerHTML = html;
		regionNames = $content.find('#regionNames')[0].dataset.regionnames;
		if (!regionNames) return;
		console.log('highlighting regions: ' + regionNames);
		var regions = regionNames.split(",").map(function(item) {
			return item.replace('_',' ').trim();
		});
		regions.forEach(function (region) {
			var encodedRegion = encodeURIComponent(region);
			$content.find('a.svgRegion[href="' + encodedRegion + '"], a.svgRegion[href="' + wgArticlePath.replace('$1', encodedRegion.replace(/%20/g, '_') ) + '"]')
			.attr('class', 'svgRegion svgRegionHighlight');
			if (region.substring(0, 4) === 'The ') {
				encodedRegion = encodeURIComponent(region.substring(4));
				$content.find('a.svgRegion[href="' + encodedRegion + '"], a.svgRegion[href="/wiki/' + wgArticlePath.replace('$1', encodedRegion.replace(/%20/g, '_') ) + '"]')
				.attr('class', 'svgRegion svgRegionHighlight');
			}
		});
	});
})(window.mediaWiki);
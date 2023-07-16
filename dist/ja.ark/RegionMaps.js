mw.loader.using([(mw.config.get('wgIsTestModeEnabled') ? 'test:' : '') + 'MediaWiki:DataFetch.js'], function() { $(function () {
	var CACHE_EXPIRY_TIME = 72 * 60 * 60;
    var THE_ISLAND = 'The Island';
    var MOD_NAMESPACE = 'Mod:';

    function $createSvgNode(tagName) {
        return $(document.createElementNS("http://www.w3.org/2000/svg", tagName));
    }

	$('.interactive-regionmap').each(function () {
		// Do not double-initialise the map
		if (this.__regionMapInitialised) {
			return;
		}
		this.__regionMapInitialised = true;

		var $this = $(this);
        var mapName = $(this).data('map');
        var pageName = $(this).data('page-name');
        var cacheIndex = $(this).data('cache-id') || 1;
        var highlightRegion = ($(this).data('highlight') || '').trim();

        if (!mapName || !pageName) {
            console.warn('Interactive region map will not be loaded: unspecified map or data page name.');
            return;
        }
        
        return fetchDataPagesARK([ pageName ], cacheIndex, CACHE_EXPIRY_TIME).then(function (results) {
            var data = results[pageName];
            var $svg = $createSvgNode('svg').attr({
                    // 10 times the coordinate space as blur accuracy and performance suffers otherwise
                    width: 1000, height: 1000, viewBox: '0 0 1000 1000',
                    style: 'position: absolute; width:100%; height:100%;',
                }).html('<defs>'
                        + '<filter id="blur" x="-30%" y="-30%" width="160%" height="160%">'
                          + '<feColorMatrix type="matrix" values="1 0 0 1 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.7 0"/>'
                          + '<feGaussianBlur stdDeviation="10" />'
                        + '</filter>'
                        + '</defs>');

            for (var region in data) {
                // Generate article title.
                // - For The Island, the result is the region name.
                // - For other maps, the result is the region name followed by the DLC name in parenthesis.
                // - For mods, the result is the region name prefixed with the mod wiki prefix.
                var isMod = mapName.startsWith(MOD_NAMESPACE);
                var articleName = mapName == THE_ISLAND
                                ? region
                                : (isMod ? mapName + '/' : '') + region + (!isMod ? ' (' + mapName + ')' : '');

                // Construct the blurred layer inside a link to the region's article
                var $layer = $createSvgNode('g').attr('filter', 'url(#blur)');
                var $link = $createSvgNode('a').append($layer).attr({
                    href: mw.util.getUrl(articleName),
                    class: 'svgRegion',
                }).append($createSvgNode('text').attr({ x: 500, y: 60 }).text(region));
                $svg.append($link);

                // Highlight the region layer if name matches
                if (highlightRegion == region) {
                    $link.attr('class', 'svgRegion svgRegionHighlight');
                }

                // Construct rectangles for every region zone.
                // Scaling the coordinates by a multiplier of 10: data is within the 0..100 space, SVG's view box is 0..1000.
                data[region].forEach(function (rect) {
                    $layer.append($createSvgNode('rect').attr({
                        x: rect[0]*10, y: rect[1]*10, width: rect[2]*10, height: rect[3]*10,
                    }));
                });
            }
            
            $this.append($svg);
        });
    });
	
}) });
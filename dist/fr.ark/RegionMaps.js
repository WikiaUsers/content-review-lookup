mw.loader.using([(mw.config.get('wgIsTestModeEnabled') ? 'test:' : '') + 'MediaWiki:DataFetch.js'], function() { $(function () {
	var CACHE_EXPIRY_TIME = 72 * 60 * 60;

    function $createSvgNode(tagName) {
        return $(document.createElementNS("http://www.w3.org/2000/svg", tagName));
    }

	$('.interactive-regionmap').each(function () {
		// Do not double-initialise the map.
		if (this.__regionMapInitialised) {
			return;
		}
		this.__regionMapInitialised = true;

		var $this = $(this);
        var pageName = $(this).data('page-name');
        var cacheIndex = $(this).data('cache-id') || 1;
        var highlightRegion = $(this).data('highlight');
        
        return fetchDataPagesARK([ pageName ], cacheIndex, CACHE_EXPIRY_TIME).then(function (results) {
            var data = results[pageName];
            var $defs = $createSvgNode('defs').append(
                $createSvgNode('filter').attr({
                    id: 'blur', x: '-30%', y: '-30%', width: '160%', height: '160%',
                }).append(
                    $createSvgNode('feColorMatrix').attr({
                        type: 'matrix', values: '1 0 0 1 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.7 0'
                    })
                ).append(
                    $createSvgNode('feGaussianBlur').attr('stdDeviation', 10)
                )
            );
            var $svg = $createSvgNode('svg').attr({
                    width: 100, height: 100, viewBox: '0 0 100 100',
                    style: 'position: absolute; width:100%; height:100%;',
                }).append($defs);

            for (var region in data) {
                var $layer = $createSvgNode('g').attr({
                    filter: 'url(#blur)', class: 'svgRegion',
                });
                $svg.append($layer);

                data[region].forEach(function (rect) {
                    $layer.append($createSvgNode('rect').attr({
                        x: rect[0], y: rect[1], width: rect[2], height: rect[3],
                    }));
                });
            }
            
            $this.append($svg);
        });
    });
	
}) });
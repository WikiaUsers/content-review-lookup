/* Makes image maps responsive by making the areas resize along with the backing image */
$(document).ready(function(){
	$('.responsive-imagemap').each(function() {
		var container = this;
		var map = container.querySelector("map");
		var scaleImageMap = imageMapScaler(map);
		var observer = new ResizeObserver(debounce(250, scaleImageMap));
		observer.observe(container);
		scaleImageMap();
	});
});

function debounce(wait, fn) {
	var timer = null;
    return function() {
        clearTimeout(timer); 
        timer = setTimeout(fn, wait); 
    };
}

/* Based on from https://github.com/davidjbradshaw/image-map-resizer */
/* The jQuery plugin used to work directly but it longer does since we transitioned to Fandom's file CDN */
function imageMapScaler(map) {
	var areas = map.getElementsByTagName('area');
	var originalCoords = Array.prototype.map.call(areas, function(area) { return area.coords });
	
	return function scaleImageMap() {
		var img = map.nextElementSibling;
		var scalingFactor = {
			width: img.width / Number(img.attributes['width'].value),
			height: img.height / Number(img.attributes['height'].value)
		};
		if (scalingFactor.width === 1 && scalingFactor.height === 1) {
			return map;
		}
		for (i = 0; i < areas.length; i++) {
			areas[i].coords = originalCoords[i]
				.split(',')
				.map(scaleCoord)
				.join(',');
		}
		function scaleCoord(coord, idx) {
			var dimension = idx % 2 === 0 ? 'width' : 'height'; // Even-index coords are always width coords, odd ones are always height
			return Math.floor(Number(coord) * scalingFactor[dimension]);
		}
	};
}
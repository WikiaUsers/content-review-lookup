if(wgNamespaceNumber == 118) {
function GMaps(src) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	document.getElementsByTagName("head")[0].appendChild(script);
}

GMaps('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initialize');

function initialize() {
//	log('maps-API has been loaded, ready to use');
    var mapTypeIds = [];
	var mapTypes = [];
    mapTypes['Vvardenfell'] = {
		getTileUrl: function(coord, zoom) {
			var normalizedCoord = getNormalizedCoord(coord, zoom);
			if (!normalizedCoord) {return null;}
			var bound = Math.pow(2, zoom);
			return 'http://pl.elderscrolls.wikia.com/wiki/Specjalna:Filepath?file=Vvardenfell_(' 
			+ (coord.x - 28) + ',' + (bound - coord.y + 26) + ',' + zoom + ').jpg';
		},
		tileSize: new google.maps.Size(256, 256),
		maxZoom: 1,
		minZoom: 1,
        radius: 3396200,
		name: 'Vvardenfell'
	};/*
    mapTypes['Cyrodiil'] = {
		getTileUrl: function(coord, zoom) {
			var normalizedCoord = getNormalizedCoord(coord, zoom);
			if (!normalizedCoord) {return null;}
			return "http://mw1.google.com/mw-planetary/sky/skytiles_v1/" +
                    coord.x + "_" + coord.y + '_' + zoom + '.jpg';
		},
		tileSize: new google.maps.Size(256, 256),
		maxZoom: 1,
		minZoom: 1,
		name: 'Cyrodiil'
    };
    mapTypes['Skyrim'] = {
		getTileUrl: function(coord, zoom) {
			var normalizedCoord = getNormalizedCoord(coord, zoom);
			if (!normalizedCoord) {return null;}
			return "http://mw1.google.com/mw-planetary/sky/skytiles_v1/" +
                    coord.x + "_" + coord.y + '_' + zoom + '.jpg';
		},
		tileSize: new google.maps.Size(256, 256),
		maxZoom: 1,
		minZoom: 1,
		name: 'Skyrim'
    };*/
	
	
    for (var key in mapTypes) {mapTypeIds.push(key);}

	var mapOptions = {
		zoom: 1,
		center: new google.maps.LatLng(2,2),
		streetViewControl: false,
		scaleControl:  false,
		overviewMapControl:  true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		},
		mapTypeControlOptions: {
			mapTypeIds: mapTypeIds,
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	};
	var map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
	for (key in mapTypes) {map.mapTypes.set(key, new google.maps.ImageMapType(mapTypes[key]));}
	map.setMapTypeId('Vvardenfell');
}

function getNormalizedCoord(coord,zoom) {
	var y = coord.y;
	var x = coord.x;
	var tileRange = 3 << zoom;
	if (y<0 || y>=tileRange) {return null;}
	if (x<0 || x>=tileRange) {x = (x % tileRange + tileRange) % tileRange;}
	return {x:x,y:y};
}
/*
function log(str){
	document.getElementsByTagName('pre')[0].appendChild(document.createTextNode('['+new Date().getTime()+']\n'+str+'\n\n'));
}*/
}
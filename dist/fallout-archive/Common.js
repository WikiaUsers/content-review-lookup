/* <nowiki> */

/* ######################################################################## */
/* ### JavaScript here is loaded for all users and all skins.           ### */
/* ######################################################################## */

/* ######################################################################## */
/* ### SCRIPT LOADER                                                    ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Loads all the other scripts                         ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

// Set up global variables
var vaultConfig = {
   chevronDown: '<span class="va-chevron-down"></span>',
   chevronLeft: '<span class="va-chevron-left"></span>',
   chevronRight: '<span class="va-chevron-right"></span>',
   chevronUp: '<span class="va-chevron-up"></span>',
   loadIndicator: '<img src="' + mw.config.get('stylepath') + '/common/images/ajax-loader.gif' + '" style="vertical-align: middle;" width="16" height="16" border="0" title="In progress..." alt="In progress..." />'
};

// Load scripts
function vaultScriptLoader () {
   // Always loaded
   addTitleIcons();

}

jQuery(function($) {
   vaultScriptLoader();
});
/* ######################################################################## */
/* ### TITLE ICONS (Template:Games)                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Add icons to article title                          ### */
/* ### Credit:      User:Porter21                                       ### */
/* ######################################################################## */

function addTitleIcons () {
   var iconBar = $('#va-titleicons');
   var previewBar = $('#va-titleicons-preview');

   if (iconBar.length > 0 && $('a', previewBar).length > 0) {
      var firstHeading = $('#firstHeading').css({'overflow': 'visible', 'position': 'relative'});

      if (firstHeading.length > 0) {
            iconBar.css('display', 'block').appendTo(firstHeading.css('padding-right', previewBar.width() + 25));
      }

      $('#va-titleicons-more').append(vaultConfig.chevronDown);

      iconBar.hover(
         function () {
            $(this).addClass('va-titleicons-hover');
         }, function () {
            $(this).removeClass('va-titleicons-hover');
         });
   }
}


jQuery(function($) { /* Fallout 4 map generation */
	var mapImageSize = 2048;
	var topLeft = [-143810, 110476];
	var bottomRight = [123810, -157143];
	var fullWidth = bottomRight[0] - topLeft[0];
	var fullHeight = topLeft[1] - bottomRight[1];
	var upp = fullWidth / mapImageSize;
	var generateMap = function() {
		var $e = $(this);
		if ($e == null) return;
		var width = $e.width();
		var height = $e.height();
		if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) return;
		var data = $e.data();
		var mapTopLeft = topLeft;
		var mapBottomRight = bottomRight;
		var mapUpp = upp;
		if (data.zoom && data.zoom === true) {
			var minX = bottomRight[0];
			var maxX = topLeft[0];
			var minY = topLeft[1];
			var maxY = bottomRight[1];
			$('div[data-coords]', this).each(function() {
				var $m = $(this);
				var marker = $m.data();
				if (marker.coords) {
					var coords = marker.coords.split(',');
					if (coords.length < 2) return;
					var x = +coords[0];
					var y = +coords[1];
					if (isNaN(x) || isNaN(y)) return;
					if (minX > x) minX = x;
					if (maxX < x) maxX = x;
					if (minY > y) minY = y;
					if (maxY < y) maxY = y;
				}
			});
			var center = [(minX + maxX) / 2, (minY + maxY) / 2];
			minX = center[0] + ((minX - center[0]) * 1.2);
			maxX = center[0] + ((maxX - center[0]) * 1.2);
			minY = center[1] + ((minY - center[1]) * 1.2);
			maxY = center[1] + ((maxY - center[1]) * 1.2);
			var dX = maxX - minX;
			var dY = maxY - minY;
			// The following assumes a square map div:
			var maxDist = dX > dY ? dX : dY;
			if (maxDist / width < upp) {
				maxDist = upp * width;
			}
			mapUpp = maxDist / width;
			var delta = maxDist / 2;
			mapTopLeft = [center[0] - delta, center[1] + delta];
			mapBottomRight = [center[0] + delta, center[1] - delta];
		}
		var sizeX = mapBottomRight[0] - mapTopLeft[0];
		var sizeY = mapTopLeft[1] - mapBottomRight[1];
		var lX = 1 / sizeX;
		var lY = 1 / sizeY;
		var xScale = fullWidth * lX;
		$e.css('background-size', (xScale * 100) + '%');
		if (xScale > 1) {
			// the position of our centroid within the original map area,
			// clipped by the margin of our extent:
			var originDX = mapTopLeft[0] - topLeft[0];
			var originDY = topLeft[1] - mapTopLeft[1];
			var bgpX = originDX / (fullWidth - sizeX);
			var bgpY = originDY / (fullHeight - sizeY);
			$e.css('background-position',
				(bgpX * 100) + '% ' + (bgpY * 100) + '%');
		}
		$('div[data-coords]', this).each(function() {
			var $m = $(this);
			var marker = $m.data();
			if (marker.coords) {
				var coords = marker.coords.split(',');
				var x = (coords[0] - mapTopLeft[0]) * lX;
				var y = (mapTopLeft[1] - coords[1]) * lY;
				$m.css('left', (x * 100) + '%');
				$m.css('top', (y * 100) + '%');
			}
			if (marker.rotation) {
				$m.css('transform', 'rotate(' + marker.rotation + 'deg)');
			}
		});
	};
	$('.fallout4-map').each(generateMap);
}); /* End Fallout 4 map generation */
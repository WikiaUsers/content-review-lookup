/* [[Template:Atlas_of_Worlds]] */

(function($, mw) {
	'use strict';

	var atlasCanvas, ctx, data;
	var factor = 2;
	var atlasIcon = 78 / factor;
	var connectionOffset = atlasIcon / 2;
	// These are needed if the atlas is cut down in size. Offsets from top left corner
	var offsetX = 0;
	var offsetY = 0;

	var regions = {
		'InsideBottomLeft': {
			'x': 1620-offsetX,
			'y': 1840-offsetY,
		},
		'InsideBottomRight': {
			'x': 1975-offsetX,
			'y': 1770-offsetY,
		},
		'InsideTopLeft': {
			'x': 1685-offsetX,
			'y': 370-offsetY,
		},
		'InsideTopRight': {
			'x': 2250-offsetX,
			'y': 340-offsetY,
		},
		'OutsideBottomLeft': {
			'x': 870-offsetX,
			'y': 1980-offsetY,
		},
		'OutsideBottomRight': {
			'x': 3000-offsetX,
			'y': 1970-offsetY,
		},
		'OutsideTopLeft': {
			'x': 640-offsetX,
			'y': 260-offsetY,
		},
		'OutsideTopRight': {
			'x': 2900-offsetX,
			'y': 260-offsetY,
		}
	};

	function atlasUpdate() {
		ctx.clearRect(0, 0, 5000, 5000);

		// Draw connections first so they don't overlap the icons or text 
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';

		var obj = Object.entries(data);
		for (var i=0; i<obj.length; i++) {
			//var page = obj[i][0];
			var current = obj[i][1];
			var regionLevel = regions[current.regionId].level;
			var tier = current['tier' + regionLevel];

			if (tier > 0) {
				var x = current['x' + regionLevel];
				var y = current['y' + regionLevel];
				
				current.html.style.left = x + 'px';
				current.html.style.top = y + 'px';
				current.html.style.display = 'block';

				current.html.classList.remove('low_tier');
				current.html.classList.remove('mid_tier');
				current.html.classList.remove('high_tier');
				if (tier <= 5) {
					current.html.classList.add('low_tier');
				} else if (tier <= 10) {
					current.html.classList.add('mid_tier');
					//ctx.fillStyle = 'rgb(255,210,100)';
				} else {
					current.html.classList.add('high_tier');
					//ctx.fillStyle = 'rgb(240,30,10)';
				}

				current.html.children[2].textContent = tier;
			
				var obj2 = current['connections' + regionLevel];
				for (var c=0; c<obj2.length; c++) {
					var targetName = obj2[c];
					var target = data[targetName];
					var targetLevel = regions[target.regionId].level;

					ctx.beginPath();
					ctx.moveTo(x+connectionOffset, y);
					ctx.lineTo(target['x' + targetLevel]+connectionOffset, target['y' + targetLevel]);
					ctx.stroke();
				}

				var obj3 = Object.entries(regions[current.regionId].items);
				for (var g=0; g<obj3.length; g++) {
					//var item_page = obj3[g][0];
					var itemData = obj3[g][1];

					var itemHtml = current.html.children[3].children[g].children[0];

					if (tier >= itemData.min && tier <= itemData.max) {
						itemHtml.style.display = 'block';
					} else {
						itemHtml.style.display = 'none';
					}
				}
			} else {
				current.html.style.display = 'none';
			}
		}
	}

	function regionButton(ele) {
		var btn = ele.srcElement;
		var id = btn.id;
		var regionLevel = Number(btn.dataset.level);
	
		if (regionLevel === 4) {
			regionLevel = 0;
		} else {
			regionLevel++;
		}

		btn.dataset.level = regionLevel;
		regions[id].level = regionLevel;

		var name = regions[id].name;
		btn.textContent = name + ' (' + regionLevel + ')';

		atlasUpdate();
	}

	function regionsTable(index, ele) {
		var id = ele.children[0].textContent;
		var name = ele.children[1].textContent;

		// initalize region fields
		regions[id].level = 0;
		regions[id].name = name;
		regions[id].maps = [];
		regions[id].items = {};

		var x = regions[id].x;
		var y = regions[id].y;

		var btn = document.createElement('button');
		btn.id = id;
		btn.classList.add('region_button');
		btn.addEventListener('click', regionButton);
		btn.dataset.level = 0;
		btn.style.top = y + 'px';
		btn.style.left = x + 'px';
		btn.textContent = name + ' (0)';
		atlasCanvas.after(btn);
	}

	function dropsTable(index, ele) {
		var regionId = ele.children[0].textContent;
		var pg = ele.children[4].textContent;
		var min = Number(ele.children[1].textContent);
		var max = Number(ele.children[2].textContent);

		if (typeof regions[regionId].items[pg] === 'undefined') {
			var name = ele.children[3].textContent;
			var img = ele.children[5].getElementsByTagName('img')[0].outerHTML;
			regions[regionId].items[pg] = {
				'min': min,
				'max': max,
				'html': '<div class="map_drop"><a href="/' + pg + '">' + name + '<br>' + img + '</a></div>'
			};
		} else {
			regions[regionId].items[pg].min = Math.min(min, regions[regionId].items[pg].min);
			regions[regionId].items[pg].max = Math.max(max, regions[regionId].items[pg].max);
		}
	}

	function itemsTable(index, ele) {
		var pg = ele.children[0].textContent;


		var mapName = ele.children[19].textContent;
		var html = document.createElement('div');
		html.classList.add('map_container');
		html.innerHTML = '<div class="map_name">' + mapName + '</div><div class="map_icon"><a href="/' + pg + '"></a></div><div class="map_tier"></div><div class="map_drop_container"></div>';

		['low_tier', 'mid_tier', 'high_tier'].forEach(function (value, index) {
			var ico = ele.children[20 + index].getElementsByTagName('img')[0];
			if (ico) {
				ico.classList.add(value);
				html.children[1].children[0].append(ico);
			}
		});

		var current = {
			regionId: ele.children[3].textContent,
		};

		for (var i=0; i<=4; i++) {
			current['tier' + i] = Number(ele.children[14 + i].textContent);
			current['x' + i] = Number(ele.children[4 + i].textContent) * 4;
			current['y' + i] = Number(ele.children[9 + i].textContent) * 4;
			current['connections' + i] = [];
		}

		var obj = Object.entries(regions[current.regionId].items);
		for (var j=0; j<obj.length; j++) {
			html.children[3].innerHTML += obj[j][1].html;
		}

		atlasCanvas.after(html);
		current.html = html;

		data[pg] = current;

		regions[current.regionId].maps.push(pg);
	}

	function connectionsTable(index, ele) {
		var source = ele.children[0].textContent;
		var target = ele.children[1].textContent;
		if (typeof data[source] !== 'undefined' && typeof data[target] !== 'undefined') {
			for (var i = 0; i<=4; i++) {
				if (ele.children[2 + i].textContent === 'Yes') {
					data[source]['connections' + i].push(target);
					data[target]['connections' + i].push(source);
				}
			}
		}
	}

	function init($content) {
		var main = $content.find('#AtlasOfWorlds:not(.loaded)')[0];
		if (!main) return;
		main.classList.add('loaded');
		main.outerHTML = '<canvas id="atlas_of_worlds" width="4096" height="2304"></canvas>';
		atlasCanvas = $content.find('#atlas_of_worlds')[0];

		data = {};
		$('.map_container').remove();
		ctx = atlasCanvas.getContext('2d');
		ctx.font = 'bold 16px Arial';
		ctx.textAlign = 'center';

		$content.find('.atlas_of_worlds > .regions tbody > tr').each(regionsTable);
		$content.find('.atlas_of_worlds > .drops tbody > tr').each(dropsTable);
		$content.find('.atlas_of_worlds > .items tbody > tr').each(itemsTable);
		$content.find('.atlas_of_worlds > .connections tbody > tr').each(connectionsTable);

		atlasUpdate();
	}
	mw.hook('wikipage.content').add(init);
})(window.jQuery, window.mediaWiki);
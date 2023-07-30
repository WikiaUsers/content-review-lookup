mw.hook('wikipage.content').add(function() {
	'use strict';
	var main = document.getElementById('AtlasOfWorlds');
	if (!main) return;
	
	main.outerHTML = '<canvas id="atlas_of_worlds" width="4096" height="2304"></canvas>';

	var atlasCanvas = document.getElementById('atlas_of_worlds');
	var factor = 2;
	var atlas_icon = 78/factor;
	var connection_offset = atlas_icon/2;
	// These are needed if the atlas is cut down in size. Offsets from top left corner
	var offset_x = 0;
	var offset_y = 0;

	var ctx;

	var data = {};
	var regions = {
		'InsideBottomLeft': {
			'x': 1620-offset_x,
			'y': 1840-offset_y,
		},
		'InsideBottomRight': {
			'x': 1975-offset_x,
			'y': 1770-offset_y,
		},
		'InsideTopLeft': {
			'x': 1685-offset_x,
			'y': 370-offset_y,
		},
		'InsideTopRight': {
			'x': 2250-offset_x,
			'y': 340-offset_y,
		},
		'OutsideBottomLeft': {
			'x': 870-offset_x,
			'y': 1980-offset_y,
		},
		'OutsideBottomRight': {
			'x': 3000-offset_x,
			'y': 1970-offset_y,
		},
		'OutsideTopLeft': {
			'x': 640-offset_x,
			'y': 260-offset_y,
		},
		'OutsideTopRight': {
			'x': 2900-offset_x,
			'y': 260-offset_y,
		}
	};

	function atlas_init() {
		$('.map_container').remove();
		ctx = atlasCanvas.getContext('2d');
		ctx.font = 'bold 16px Arial';
		ctx.textAlign = 'center';

		//var i = 1;
		document.querySelectorAll('.atlas_of_worlds > .regions tbody > tr').forEach(function(ele) {
			// .field_id = 0
			// .field_name = 1

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
			btn.addEventListener('click', region_button);
			btn.dataset.level = 0;
			btn.style.top = y + 'px';
			btn.style.left = x + 'px';
			btn.textContent = name + ' (0)';
			atlasCanvas.after(btn);
		});

		document.querySelectorAll('.atlas_of_worlds > .drops tbody > tr').forEach(function(ele) {
			// .field_region_id = 0
			// .field_tier_min = 1
			// .field_tier_max = 2
			// .field_name = 3
			// .field__pageName = 4
			// .field_icon = 5

			var region_id = ele.children[0].textContent;
			var pg = ele.children[4].textContent;
			var min = Number(ele.children[1].textContent);
			var max = Number(ele.children[2].textContent);

			if (typeof regions[region_id].items[pg] === 'undefined') {
				var name = ele.children[3].textContent;
				var img = ele.children[5].getElementsByTagName('img')[0].outerHTML;
				regions[region_id].items[pg] = {
					'min': min,
					'max': max,
					'html': '<div class="map_drop"><a href="/' + pg + '">' + name + '<br>' + img + '</a></div>'
				};
			} else {
				regions[region_id].items[pg].min = Math.min(min, regions[region_id].items[pg].min);
				regions[region_id].items[pg].max = Math.max(max, regions[region_id].items[pg].max);
			}
		});

		document.querySelectorAll('.atlas_of_worlds > .items tbody > tr').forEach(function(ele) {
			// .field__pageName = 0
			// .field_x = 1
			// .field_y = 2
			// .field_region_id = 3
			// .field_x0 = 4
			// .field_x1 = 5
			// .field_x2 = 6
			// .field_x3 = 7
			// .field_x4 = 8
			// .field_y0 = 9
			// .field_y1 = 10
			// .field_y2 = 11
			// .field_y3 = 12
			// .field_y4 = 13
			// .field_map_tier0 = 14
			// .field_map_tier1 = 15
			// .field_map_tier2 = 16
			// .field_map_tier3 = 17
			// .field_map_tier4 = 18
			// .field_name = 19
			// .field_icon_low_tier = 20
			// .field_icon_mid_tier = 21
			// .field_icon_high_tier = 22

			var pg = ele.children[0].textContent;


			var map_name = ele.children[19].textContent;
			var html = document.createElement('div');
			html.classList.add('map_container');
			html.innerHTML = '<div class="map_name">' + map_name + '</div><div class="map_icon"><a href="/' + pg + '"></a></div><div class="map_tier"></div><div class="map_drop_container"></div>';
			// .map_name = 0
			// .map_icon = 1
			// .map_tier = 2
			// .map_drop_container = 3

			['low_tier', 'mid_tier', 'high_tier'].forEach(function (value, index) {
				var ico = ele.children[20 + index].getElementsByTagName('img')[0];
				if (ico) {
					ico.classList.add(value);
					html.children[1].children[0].append(ico);
				}
			});

			var current = {
				'region_id': ele.children[3].textContent,
			};

			for (var i=0; i<=4; i++) {
				current['tier' + i] = Number(ele.children[14 + i].textContent);
				current['x' + i] = Number(ele.children[4 + i].textContent) * 4;
				current['y' + i] = Number(ele.children[9 + i].textContent) * 4;
				current['connections' + i] = [];
			}

			var obj = Object.entries(regions[current.region_id].items);
			for (var j=0; j<obj.length; j++) {
				//var page = obj[j][0];
				var item_data = obj[j][1];
				html.children[3].innerHTML += item_data.html;
			}

			atlasCanvas.after(html);
			current.html = html;

			data[pg] = current;

			regions[current.region_id].maps.push(pg);
		});

		document.querySelectorAll('.atlas_of_worlds > .connections tbody > tr').forEach(function(ele) {
			// .field_map1 = 0
			// .field_map2 = 1
			// .field_region0 = 2
			// .field_region1 = 3
			// .field_region2 = 4
			// .field_region3 = 5
			// .field_region4 = 6

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
		});

		atlas_update();
	}

	function region_button(ele) {
		var btn = ele.srcElement;
		var id = btn.id;
		var region_level = Number(btn.dataset.level);
	
		if (region_level == 4) {
			region_level = 0;
		} else {
			region_level++;
		}

		btn.dataset.level = region_level;
		regions[id].level = region_level;

		var name = regions[id].name;
		btn.textContent = name + ' (' + region_level + ')';

		atlas_update();
	}

	function atlas_update() {
		ctx.clearRect(0, 0, 5000, 5000);

		// Draw connections first so they don't overlap the icons or text 
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';

		var obj = Object.entries(data);
		for (var i=0; i<obj.length; i++) {
			//var page = obj[i][0];
			var current = obj[i][1];
			var region_level = regions[current.region_id].level;
			var tier = current['tier' + region_level];

			if (tier > 0) {
				var x = current['x' + region_level];
				var y = current['y' + region_level];
				
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
			
				var obj2 = current['connections' + region_level];
				for (var c=0; c<obj2.length; c++) {
					var target_name = obj2[c];
					var target = data[target_name];
					var target_level = regions[target.region_id].level;

					ctx.beginPath();
					ctx.moveTo(x+connection_offset, y);
					ctx.lineTo(target['x' + target_level]+connection_offset, target['y' + target_level]);
					ctx.stroke();
				}

				var obj3 = Object.entries(regions[current.region_id].items);
				for (var g=0; g<obj3.length; g++) {
					//var item_page = obj3[g][0];
					var item_data = obj3[g][1];

					var item_html = current.html.children[3].children[g].children[0];

					if (tier >= item_data.min && tier <= item_data.max) {
						item_html.style.display = 'block';
					} else {
						item_html.style.display = 'none';
					}
				}
			} else {
				current.html.style.display = 'none';
			}
		}
	}
	atlas_init();
});
$(function() {
	// Double load protection
	if (window.dev && window.dev.MapGenerator) {return;}
	(window.dev = window.dev || {}).MapGenerator = true;
	
    // Load dependencies and cache
	var config = mw.config.get(['wgAction', 'wgPageName']);
	var markers = {count:0};
	var REGION = 'Mondstadt';
	var api = new mw.Api();
	var loadedImages = { _BADIMAGE:{} };
	var loadedTemplates = {};
	var mapRefs;
	var mapGenerator = {
		init: function() {
			// Clean page
			document.querySelectorAll('#mw-content-text.mw-body-content > p').forEach(function(p){ p.remove(); });
			document.querySelector('h1.page-header__title').innerHTML = 'Map Generator';
			document.title = 'Map Generator';
			var container = $(
				'<div id="quickMapSection">'+
					'<div id="mapContainer">'+
						'<img id="mapImage" src="'+mapRefs[REGION].map+'" />'+
					'</div>'+
					'<span class="wds-button" id="quickMapGenerator">Generate Maps</span>'+
				'</div>');
			var regionSelector = $(
				'<div id="regionSelect" class="custom-tabs-default custom-tabs">'+
					'<span class="active-tab"	id="Mondstadt"	> Mondstadt </span>'+
					'<span class="inactive-tab"	id="Liyue"		> Liyue </span>'+
					'<span class="inactive-tab"	id="Inazuma"	> Inazuma </span>'+
					'<span class="inactive-tab"	id="Sumeru"		> Sumeru </span>'+
					'<span class="inactive-tab"	id="Fontaine"	> Fontaine </span>'+
				'</div>'
			);
			var body = $('#mw-content-text.mw-body-content');
			body.append($('<h2><span class="mw-headline" id="Quick_Generator">Quick Generator</span></h2>'));
			body.append(regionSelector);
			body.append(container);
			body.append($(''));
			body.append($(
				'<h2>'+
					'<span class="mw-headline" id="Templates">Templates</span>'+
				'</h2>'+
				'<div id="TemplatesLoading">'+
					'<img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" width="25px" style="vertical-align: baseline;" border="0" /> '+
					'Loading...'+
				'</div>'+
				'<div id="TemplatesList"></div>'+
				'<hr />'+
				'<center>'+
					'<div id="TemplateManager" rel="">'+
						'<img id="templateImage" width="100%" src="" rel="" />'+
					'</div>'+
					'<span class="wds-button" id="MapGenerator">Generate Map</span>'+
				'</center>'));
			mapGenerator.loadTemplates(mapRefs[REGION].templates);
			document.querySelector('#mapContainer').style.left = mapRefs[REGION].offset.left;	// Default map offset
			document.querySelector('#mapContainer').style.top = mapRefs[REGION].offset.top;		// Default map offset
			$('#mapContainer').draggable();
			$('#mapContainer').css('height', (screen.height-250)+'px'); // Limit container so no scrolling is required
			mw.util.addCSS(
				'.markerSettings > ul {\n'+
					'display: flex;\n'+
					'list-style-type: none;\n'+
					'white-space: nowrap;\n'+
					'margin: 0;\n'+
					'padding: 5px 8px;\n'+
					'background: rgb(26, 29, 35);\n'+
					'border-radius: 3px;\n'+
				'}\n'+
				'.markerSettings > ul > li:not(:first-child):before {\n'+
					'content: " | ";\n'+
					'white-space: pre;\n'+
				'}\n'+
				'.markerSettings > ul > li, #regionSelect > :is(.active-tab, .inactive-tab) {\n'+
					'cursor: pointer;\n'+
				'}\n'+
				'.custom-tabs > .active-tab {\n'+
					'color: var(--active-tab-color);\n'+
				'}\n'+
				'.custom-tabs > .inactive-tab:hover {\n'+
					'color: var(--inactive-tab-hover-color)\n'+
				'}\n'+
				'#TemplatesList {\n'+
					'display: flex;\n'+
					'gap: 20px;\n'+
					'flex-wrap: wrap;\n'+
					'justify-content: center;\n'+
				'}\n'+
				'#TemplatesList > .mapTemplate {\n'+
					'display: flex;\n'+
					'flex-direction: column;\n'+
					'gap: 2px;\n'+
					'text-align: center;\n'+
					'width: 200px;\n'+
				'}\n'+
				'#TemplateManager {\n'+
					'width: 600px;\n'+
					'overflow: hidden;\n'+
					'position: relative;\n'+
				'}\n'+
				'#quickMapGenerator {\n'+
					'bottom: 5px;\n'+
					'left: 5px;\n'+
					'position: absolute;\n'+
					'z-index: 999;\n'+
				'}\n'+
				'#quickMapSection {\n'+
					'overflow: hidden;\n'+
					'position: relative;\n'+
					'border: 1px solid rgba(var(--theme-accent-color--rgba),0.5);\n'+
					'border-radius: 5px;'+
				'}\n'
			);
			var closeMarkerSettings = function() {if (document.querySelector('.markerSettings')) {document.querySelector('.markerSettings').remove();}};
			document.addEventListener('dblclick', function(event) {
				closeMarkerSettings();
				if (event.target && (event.target.id == 'mapImage' || event.target.id == 'templateImage')) {
					event.preventDefault();
					markers.count++;
					var newMarker = {
						src: 'File:Map-guide-marker-53.png',
						x: event.layerX,
						y: event.layerY,
						type: (event.target.id == 'templateImage' ? 'Precise' : 'Quick'),
						elem: $('<img '+
							'src="'+loadedImages['File:Map-guide-marker-53.png'].src+'" '+
							'id="marker'+markers.count+'" '+
							'class="mapMarker" '+
							'style="'+
								'left:'+(event.layerX-(loadedImages['File:Map-guide-marker-53.png'].size/2))+'px; '+
								'top:'+(event.layerY-(loadedImages['File:Map-guide-marker-53.png'].size/2))+'px; '+
								'z-index:'+markers.count+'; '+
								'position:absolute'+'; '+
							'" '+
						'/>')
					};
					markers['marker'+markers.count] = newMarker;
					$('#'+(event.target.id == 'templateImage'? 'TemplateManager' : 'mapContainer')).append(newMarker.elem);
					console.log(markers);
				} else if (event.target && /^marker\d+/.test(event.target.id)) {
					markers.count--;
					delete markers[event.target.id];
					event.target.remove();
				}
			});
			document.addEventListener('contextmenu', function(event) {
				closeMarkerSettings();
				if (event.target && /^marker\d+/.test(event.target.id)) {
					event.preventDefault();
					var menu = $(
						'<div class="markerSettings" style="z-index:99999; position:absolute;">'+
							'<ul>'+
								'<li rel="'+event.target.id+'" class="markerSettings-32">32px</li>'+
								'<li rel="'+event.target.id+'" class="markerSettings-53">53px</li>'+
								'<li rel="'+event.target.id+'" class="markerSettings-75">75px</li>'+
								'<li rel="'+event.target.id+'" class="markerSettings-96">96px</li>'+
								'<li class="markerSettings-Close">&#x274C;</li>'+
							'</ul>'+
						'</div>'
					);
					$('#'+(event.target.closest('#TemplateManager') ? 'TemplateManager' : 'mapContainer')).append(menu);
					document.querySelector('.markerSettings').style.top = markers[event.target.id].y+(document.querySelector('.markerSettings').clientHeight/2)+'px';
					document.querySelector('.markerSettings').style.left = markers[event.target.id].x-(document.querySelector('.markerSettings').clientWidth/2)+'px';
				}
			});
			document.addEventListener('click', function(event) {
				if (event.target && event.target.classList.contains('markerSettings-Close')) {
					closeMarkerSettings();
				} else if (event.target && event.target.classList.item(0) && /^markerSettings-\d\d/.test(event.target.classList.item(0))) {
					var markerID = event.target.getAttribute('rel');
					var type = 'File:Map-guide-marker-'+/^markerSettings-(\d\d)/.exec(event.target.classList.item(0))[1]+'.png';
					var marker = document.querySelector('#'+markerID);
					marker.setAttribute('src', loadedImages[type].src);
					marker.style.top = (markers[markerID].y - (loadedImages[type].size/2))+ 'px';
					marker.style.left = (markers[markerID].x - (loadedImages[type].size/2))+ 'px';
					markers[markerID].src = type;
				} else if (event.target && event.target.closest('#regionSelect') && REGION !== event.target.id) {
					closeMarkerSettings();
					REGION = event.target.id;
					mapGenerator.loadImages(mapRefs[REGION].templates);
					mapGenerator.loadTemplates(mapRefs[REGION].templates);
					document.querySelector('img#mapImage').setAttribute('src', mapRefs[REGION].map);
					var container = document.querySelector('#mapContainer');
					container.style.top = mapRefs[REGION].offset.top;
					container.style.left = mapRefs[REGION].offset.left;
					var curr = document.querySelector('#regionSelect > .active-tab');
					curr.classList.remove('active-tab');
					curr.classList.add('inactive-tab');
					event.target.classList.add('active-tab');
					event.target.classList.remove('inactive-tab');
					markers = {count:0};
					document.querySelectorAll('.mapMarker').forEach(function(marker){marker.remove();});
					document.querySelector('#templateImage').setAttribute('src', '');
					document.querySelector('#templateImage').setAttribute('rel', '');
				} else if (event.target && event.target.id == 'quickMapGenerator') {
					closeMarkerSettings();
					mapGenerator.processQuickMarkers();
				} else if (event.target && event.target.id == 'MapGenerator') {
					closeMarkerSettings();
					mapGenerator.processPreciseMarkers();
				} else if (event.target && event.target.closest('.mapTemplate')) {
					closeMarkerSettings();
					var template = event.target.closest('.mapTemplate').getAttribute('rel');
					var manager = document.querySelector('#templateImage');
					if (manager.getAttribute('rel') !== template) {
						document.querySelectorAll('#TemplateManager > .mapMarker').forEach(function(marker){
							markers.count--;
							delete markers[marker.id];
							marker.remove();
						});
						manager.setAttribute('rel', template);
						manager.setAttribute('src', loadedImages[template].src);
					}
				} else {
					closeMarkerSettings();
				}
			});
		},
		processPreciseMarkers: function() {
			var valid = false;
			var template = document.querySelector('#templateImage').getAttribute('rel');
			if (!template || template.length==0) {alert('Select a map template.'); return;}
			var canvas = document.createElement('canvas');
			canvas.height = '600';
			canvas.width = '600';
			var context = canvas.getContext('2d');
			context.drawImage(loadedImages[template].canvas, 0, 0);
			Object.keys(markers).forEach(function(id) {
				if (id!='count' && markers[id].type == 'Precise' && template.length>0) {
					valid = true;
					context.drawImage(
						loadedImages[markers[id].src].canvas,
						(markers[id].x-(loadedImages[markers[id].src].size/2)),	// Position
						(markers[id].y-(loadedImages[markers[id].src].size/2))	// Position
					);
				}
			});
			if (!valid) {alert('No valid marker to generate map off.');}
			else {window.open(canvas.toDataURL()); canvas.remove();}
		},
		processQuickMarkers: function() {
			var valid = false;
			Object.keys(markers).forEach(function(id) {
				if (id!='count' && markers[id].type == 'Quick') {
					valid = true;
					var canvas = document.createElement('canvas');
					canvas.height = '600';
					canvas.width = '600';
					var context = canvas.getContext('2d');
					var mapInfo = mapGenerator.selectMap(markers[id]);
					var attemptLoad = true;
					if (!mapInfo || loadedImages._BADIMAGE[markers[id].src] || loadedImages._BADIMAGE[mapInfo.src]) {return;}
					var waitForImages = function() {
						if (loadedImages[markers[id].src] && loadedImages[markers[id].src].LOADED && loadedImages[mapInfo.src] && loadedImages[mapInfo.src].LOADED) {
							context.drawImage(loadedImages[mapInfo.src].canvas, 0, 0);
							context.drawImage(
								loadedImages[markers[id].src].canvas,
								((mapInfo.x*mapInfo.scale)-(loadedImages[markers[id].src].size/2)),	// Position
								((mapInfo.y*mapInfo.scale)-(loadedImages[markers[id].src].size/2))	// Position
							);
							window.open(canvas.toDataURL()); canvas.remove();
						} else if (attemptLoad) {
							mapGenerator.loadImages([mapInfo.src, markers[id].src]);
							attemptLoad = false;
							window.setTimeout(waitForImages, 100);
						} else if (loadedImages._BADIMAGE[markers[id].src] || loadedImages._BADIMAGE[mapInfo.src]) {
							// end loop
						} else {
							window.setTimeout(waitForImages, 100);
						}
					};
					waitForImages();
				}
			});
			if (!valid) {alert('No valid marker to generate map off.');}
		},
		selectMap: function(marker) {
			var refx = marker.x - mapRefs[REGION].origin.x;
			var refy = marker.y - mapRefs[REGION].origin.y;
			var valid;
			mapRefs[REGION].quickGen.forEach(function(template) {
				if (refx>template.x && refy>template.y && refx<(template.x+template.reach) && refy<(template.y+template.reach)) {
					if (valid) {
						if (
							Math.abs((valid.x+(valid.reach/2))-refx) > Math.abs((template.x+(template.reach/2))-refx) &&
							Math.abs((valid.y+(valid.reach/2))-refy) > Math.abs((template.y+(template.reach/2))-refy)
						) { valid = template; }
					}
					else { valid = template; }
				}
			});
			if (valid) {
				return {
					src: valid.src,
					x: (refx-valid.x),
					y: (refy-valid.y),
					scale: 1/valid.reach*600
				};
			} else { alert ('No map available for the marker'); }
		},
		loadTemplates: function(templates) {
			var container = document.querySelector('#TemplatesList');
			var loading = document.querySelector('#TemplatesLoading');
			if (loadedTemplates[REGION]) {
				loading.style.display = 'none';
				container.innerHTML = loadedTemplates[REGION];
			} else {
				loading.style.display = '';
				container.innerHTML = '';
				mapGenerator.loadImages(templates);
				var waitForTemplates = function() {
					var finished = true;
					templates.forEach(function(template){
						if (loadedImages._BADIMAGE[template]) {
							templates.splice(templates.indexOf(template), 1);
							console.log('Bad filename: "'+template+'"');
						}
						else if (!loadedImages[template] || !loadedImages[template].LOADED) {
							finished = false;
						}
					});
					if (finished) {
						var gallery = '';
						templates.forEach(function(template){
							gallery += 
								'<div class="mapTemplate" rel="'+template+'">'+
									'<img class="mapTemplate-image" width="200px" src="'+loadedImages[template].src+'"/>'+
									'<span class="mapTemplate-caption">'+template.replace(/^File:/, '').replace(/ Map Template\.png$/, '')+'</span>'+
								'</div>';
						});
						loadedTemplates[REGION] = gallery;
						loading.style.display = 'none';
						container.innerHTML = gallery;
					} else {
						window.setTimeout(waitForTemplates, 500);
					}
				};
				waitForTemplates();
			}
		},
		loadImages: function(images) {
			if (images.length>0) {
				var toLoad = [];
				images.forEach(function(image){
					if (loadedImages._BADIMAGE[image]) {console.log('Bad filename: "'+image+'"');}
					else if (!loadedImages[image]) {toLoad.push(image);}
				});
				if (toLoad.length>0) {
					for (var i = 0; i<toLoad.length; i = i+49) {
						var _toLoad = toLoad.slice(i, i+49);
						api.get({
							action:'query',
							prop:'imageinfo',
							iiprop: 'url|size',
							titles: _toLoad
						}).then(function(data){
							if (data && data.query && data.query.pages) {
								Object.keys(data.query.pages).forEach(function(ID){
									var file = data.query.pages[ID].title;
									if (ID<0) {
										console.log('Bad filename: "'+file+'"');
										loadedImages._BADIMAGE[file] = true;
									} else if (data.query.pages[ID] && data.query.pages[ID].imageinfo) {
										var src = data.query.pages[ID].imageinfo[0].url;
										var size = data.query.pages[ID].imageinfo[0].width;
										loadedImages[file] = {};
										loadedImages[file].canvas = document.createElement('canvas');
										loadedImages[file].canvas.height = size;
										loadedImages[file].canvas.width = size;
										loadedImages[file].context = loadedImages[file].canvas.getContext('2d');
										loadedImages[file].src = src;
										loadedImages[file].size = size;
										var imageObj2 = new Image();
										imageObj2.crossOrigin = "anonymous";
										imageObj2.src = src;
										imageObj2.onload = function() {
											loadedImages[file].context.drawImage(imageObj2, 0, 0);
											loadedImages[file].LOADED = true;
										};
									}
								});
							}
						});
					}
				}
			}
		}
	};
	
	if (config.wgPageName == 'Special:Map' && config.wgAction == 'view') {
		// Uses user page to store JSON for now as mediawiki namespace is unusable unless Wiki Rep
		api.get({action: 'query', prop: 'revisions', titles: 'User:Mikevoir/Sandbox.json', rvprop: 'content', rvslots: '*'}).then(function(data){
			mapRefs = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0].slots.main['*']);
			mapGenerator.loadImages([
				'File:Map-guide-marker-32.png',
				'File:Map-guide-marker-53.png',
				'File:Map-guide-marker-75.png',
				'File:Map-guide-marker-96.png'
			]);
			mapGenerator.init();
		});
	}
});
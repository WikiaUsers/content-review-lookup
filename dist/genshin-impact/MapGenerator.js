$(function() {
	// Double load protection
	if (window.dev && window.dev.MapGenerator) {return;}
	(window.dev = window.dev || {}).MapGenerator = true;
	
    // Load dependencies and cache
	var config = mw.config.get(['wgAction', 'wgPageName']);
	var markers = { count:0 };
	var REGION = 'Mondstadt';
	var api = new mw.Api();
	var loadedImages = { _BADIMAGE:{} };
	var loadedTemplates = {};
	var mapRefs;
	var zoom = 1;
	var mapGenerator = {
		init: function() {
			// Initialize localStorage if any
			['MapGenerator-DT', 'MapGenerator-QGD'].forEach(function(sett){if(localStorage.getItem(sett)==null){localStorage.setItem(sett, 'checked');}});
			
			// Clean page
			document.querySelectorAll('#mw-content-text.mw-body-content > p').forEach(function(p){ p.remove(); });
			document.querySelector('h1.page-header__title').innerHTML = 'Map Generator';
			document.title = 'Map Generator';
			var tabs = '';
			Object.keys(mapRefs).forEach(function(region){
				if (region == REGION) {
					tabs += '<span class="active-tab"	id="'+region+'"	> '+region+' </span>';
				} else if (region !== 'QuickGen') {
					tabs += '<span class="inactive-tab"	id="'+region+'"	> '+region+' </span>';
				}
			});
			var body = $('#mw-content-text.mw-body-content');
			body.append($(
				// Download toggle
				'<div class="sett-item">'+
					'<input class="giw-checkbox" type="checkbox" id="mapDownload" rel="MapGenerator-DT" '+localStorage.getItem('MapGenerator-DT')+'>'+
					'<label class="giw-checkbox-label" type="checkbox" for="mapDownload">Download generated maps directly</label>'+
				'</div>'+
				
				// Quick Gen display
				'<div class="sett-item">'+
					'<input class="giw-checkbox" type="checkbox" id="quickGenDisplay" rel="MapGenerator-QGD" '+localStorage.getItem('MapGenerator-QGD')+'>'+
					'<label class="giw-checkbox-label" type="checkbox" for="quickGenDisplay">Display quick map generation section</label>'+
				'</div>'+
				
				'<section id="quickGenSection" style="display:'+(localStorage.getItem('MapGenerator-QGD')=='checked' ? '' : 'none')+'">'+
					'<h2>'+
						'<span class="mw-headline" id="Quick_Generator">Quick Generator</span>'+
					'</h2>'+
					'<div id="quickMapSection">'+
						'<div id="mapContainer">'+
							'<img id="mapImage" src="'+mapRefs.QuickGen.map+'" />'+
						'</div>'+
						'<span class="wds-button" id="quickMapGenerator">Generate Maps</span>'+
						'<span class="wds-button" id="ZoomIn">'+
							'<svg height="16" fill="currentColor" viewBox="0 0 16 16" width="16">'+
								'<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />'+
								'<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />'+
								'<path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />'+
							'</svg>'+
						'</span>'+
						'<span class="wds-button" id="ZoomOut">'+
							'<svg height="16" fill="currentColor" viewBox="0 0 16 16" width="16">'+
								'<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>'+
								'<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>'+
								'<path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>'+
							'</svg>'+
						'</span>'+
					'</div>'+
				'</section>'+
				'<h2>'+
					'<span class="mw-headline" id="Templates">Templates</span>'+
				'</h2>'+
				'<div id="regionSelect" class="custom-tabs-default custom-tabs">'+
					tabs+
				'</div>'+
				'<div id="TemplatesLoading">'+
					'<img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" width="25px" style="vertical-align: baseline;" border="0" /> '+
					'Loading...'+
				'</div>'+
				'<div id="TemplatesList"></div>'+
				'<hr />'+
				'<center>'+
					'<span id="TemplateManagerNote">No template selected.</span>'+
					'<div id="TemplateManager" rel="">'+
						'<img id="templateImage" width="100%" src="" rel="" />'+
					'</div>'+
					'<div>'+
						'<span class="wds-button" id="MapGenerator">Generate Map</span> '+
						'<span class="wds-button" id="WikitextGenerator">Copy Wikitext</span>'+
					'</div>'+
				'</center>'));
			mapGenerator.loadTemplates(mapRefs[REGION]);
			document.querySelector('#mapImage').onload = function() { mapGenerator.updateZoom(); };
			document.querySelector('#mapContainer').style.setProperty('left', mapRefs.QuickGen.offset.left);	// Default map offset
			document.querySelector('#mapContainer').style.setProperty('top', mapRefs.QuickGen.offset.top);	// Default map offset
			$('#mapContainer').draggable();
			$('#mapContainer').css('height', (screen.height-250)+'px'); // Limit container so no scrolling is required
			mw.util.addCSS(
				'.custom-tabs > span {flex: 1 0 20%;}'+
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
				'#TemplateManagerNote {\n'+
					'font-weight: bold;\n'+
				'}\n'+
				'#TemplateManager {\n'+
					'width: 600px;\n'+
					'position: relative;\n'+
					'padding-bottom: 5px;\n'+
				'}\n'+
				'#quickMapGenerator {\n'+
					'bottom: 5px;\n'+
					'left: 5px;\n'+
					'position: absolute;\n'+
					'z-index: 999;\n'+
				'}\n'+
				'#ZoomIn {\n'+
					'bottom: 37px;\n'+
					'right: 5px;\n'+
					'position: absolute;\n'+
					'z-index: 999;\n'+
					'border-radius: 3px 3px 0 0;\n'+
				'}\n'+
				'#ZoomOut {\n'+
					'bottom: 5px;\n'+
					'right: 5px;\n'+
					'position: absolute;\n'+
					'z-index: 999;\n'+
					'border-radius: 0 0 3px 3px;\n'+
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
					var localZoom = (event.target.id == 'templateImage' ? 1 : zoom); // ignore zoom setting if not quickGen
					var img = new Image();
					img.onload = function () {
						img.setAttribute('width', (loadedImages['File:Map-guide-marker-53.png'].size*localZoom)+'px');
						img.setAttribute('style', 
							'left:'+(event.layerX-(loadedImages['File:Map-guide-marker-53.png'].size*localZoom/2))+'px; '+
							'top:'+(event.layerY-(loadedImages['File:Map-guide-marker-53.png'].size*localZoom/2))+'px; '+
							'z-index:'+markers.count+'; '+
							'position:absolute'+'; '
						);
						delete img.onload;
					};
					img.classList.add('mapMarker');
					img.setAttribute('id', 'marker'+markers.count);
					img.setAttribute('src', loadedImages['File:Map-guide-marker-53.png'].src);
					var newMarker = {
						src: 'File:Map-guide-marker-53.png',
						x: event.layerX/localZoom,
						y: event.layerY/localZoom,
						type: (event.target.id == 'templateImage' ? 'Precise' : 'Quick'),
						elem: img
					};
					markers['marker'+markers.count] = newMarker;
					if (event.target.id == 'templateImage')  {
						$('#TemplateManager').append(img);
					} else {
						$('#mapContainer').append(img);
					}
				} else if (event.target && /^marker\d+/.test(event.target.id)) {
					markers.count--;
					delete markers[event.target.id];
					event.target.remove();
				}
			});
			document.addEventListener('change', function(event) {
				closeMarkerSettings();
				if (event.target && event.target.classList.contains('giw-checkbox')) {
					var rel = event.target.getAttribute('rel');
					localStorage.setItem(rel, event.target.checked ? 'checked' : '');
					if (rel == 'MapGenerator-QGD') {document.querySelector('section#quickGenSection').style.setProperty('display', event.target.checked ? '' : 'none');}
				}
			});
			document.addEventListener('contextmenu', function(event) {
				closeMarkerSettings();
				if (event.target && /^marker\d+/.test(event.target.id)) {
					event.preventDefault();
					var localZoom = (event.target.closest('#TemplateManager') ? 1 : zoom); // ignore zoom setting if not quickGen
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
					document.querySelector('.markerSettings').style.setProperty('top', markers[event.target.id].y*localZoom+(document.querySelector('.markerSettings').clientHeight/2)+'px');
					document.querySelector('.markerSettings').style.setProperty('left', markers[event.target.id].x*localZoom-(document.querySelector('.markerSettings').clientWidth/2)+'px');
				}
			});
			document.addEventListener('click', function(event) {
				if (event.target && event.target.classList.contains('markerSettings-Close')) {
					closeMarkerSettings();
				} else if (event.target && event.target.classList.item(0) && /^markerSettings-\d\d/.test(event.target.classList.item(0))) {
					var markerID = event.target.getAttribute('rel');
					var type = 'File:Map-guide-marker-'+/^markerSettings-(\d\d)/.exec(event.target.classList.item(0))[1]+'.png';
					var marker = document.querySelector('#'+markerID);
					var localZoom = (event.target.closest('#TemplateManager') ? 1 : zoom); // ignore zoom setting if not quickGen
					marker.onload = function() {
						marker.setAttribute('width', (marker.naturalWidth*localZoom)+'px');
						marker.style.setProperty('top', (markers[markerID].y - (marker.naturalHeight/2))*localZoom+ 'px');
						marker.style.setProperty('left', (markers[markerID].x - (marker.naturalWidth/2))*localZoom+ 'px');
						delete marker.onload;
					};
					marker.setAttribute('src', loadedImages[type].src);
					markers[markerID].src = type;
				} else if (event.target && event.target.closest('#regionSelect') && REGION !== event.target.id) {
					closeMarkerSettings();
					
					// Looad new region
					REGION = event.target.id;
					mapGenerator.loadImages(mapRefs[REGION]);
					mapGenerator.loadTemplates(mapRefs[REGION]);
					
					// Update tabs
					var curr = document.querySelector('#regionSelect > .active-tab');
					curr.classList.remove('active-tab');
					curr.classList.add('inactive-tab');
					event.target.classList.add('active-tab');
					event.target.classList.remove('inactive-tab');
					
					// Reset template selection
					document.querySelector('#TemplateManagerNote').innerHTML = 'No template selected.';
					document.querySelector('#TemplateManagerNote').removeAttribute('rel');
					document.querySelector('#templateImage').setAttribute('src', '');
					document.querySelector('#templateImage').setAttribute('rel', '');
					
				} else if (event.target && event.target.id == 'quickMapGenerator') {
					closeMarkerSettings();
					mapGenerator.processQuickMarkers();
				} else if (event.target && event.target.id == 'ZoomIn') {
					zoom = zoom * 2;
					mapGenerator.updateZoom();
				} else if (event.target && event.target.id == 'ZoomOut') {
					zoom = zoom / 2;
					mapGenerator.updateZoom();
				} else if (event.target && event.target.id == 'MapGenerator') {
					closeMarkerSettings();
					mapGenerator.processPreciseMarkers();
				} else if (event.target && event.target.id == 'WikitextGenerator') {
					closeMarkerSettings();
					navigator.clipboard.writeText(mapGenerator.genFilePage(REGION, document.querySelector('#TemplateManagerNote').getAttribute('rel')));
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
						var name = template.replace(/^File:/, '').replace(/ Map Template\.png$/, '');
						document.querySelector('#TemplateManagerNote').innerHTML = name;
						document.querySelector('#TemplateManagerNote').setAttribute('rel', name);
					}
					window.scrollTo(0, document.getElementById('TemplateManagerNote').offsetTop);
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
			else {mapGenerator.openImage(canvas.toDataURL(), template); canvas.remove();}
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
							mapGenerator.openImage(canvas.toDataURL(), mapInfo.src); canvas.remove();
						} else if (attemptLoad) {
							mapGenerator.loadImages([mapInfo.src, markers[id].src]);
							attemptLoad = false;
							window.setTimeout(waitForImages, 100);
						} else if (loadedImages._BADIMAGE[markers[id].src] || loadedImages._BADIMAGE[mapInfo.src]) {
							// end loop with bad result
						} else {
							window.setTimeout(waitForImages, 100);
						}
					};
					// start loop
					waitForImages();
				}
			});
			if (!valid) {alert('No valid marker to generate map off.');}
		},
		selectMap: function(marker) {
			var refx = marker.x - mapRefs.QuickGen.origin.x;
			var refy = marker.y - mapRefs.QuickGen.origin.y;
			var valid;
			mapRefs.QuickGen.templates.forEach(function(template) {
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
			var container = $('#TemplatesList');
			var loading = document.querySelector('#TemplatesLoading');
			if (loadedTemplates[REGION]) {
				loading.style.setProperty('display', 'none');
				container.html(loadedTemplates[REGION]);
			} else {
				loading.style.setProperty('display', '');
				container.html('');
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
						loading.style.setProperty('display', 'none');
						container.html(gallery);
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
										loadedImages[file].img = new Image();
										loadedImages[file].img.crossOrigin = "anonymous";
										loadedImages[file].img.onload = function() {
											loadedImages[file].context.drawImage(loadedImages[file].img, 0, 0);
											loadedImages[file].LOADED = true;
										};
										loadedImages[file].img.src = src;
									}
								});
							}
						});
					}
				}
			}
		},
		openImage: function(src, name) {
			if (src && src.length>0 && name && name.length>0) {
				if (document.querySelector('#mapDownload').checked) {
					var link = document.createElement('a');
					link.download = name.replace(/^File:/, '').replace(/ Map Template\.png$/, '');
					link.href = src;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				} else {
					var newTab = window.open();
					newTab.document.write(
						'<!DOCTYPE html>'+
						'<body><center>'+
							'<img src="'+src+'" />'+
							'<pre>'+mapGenerator.genFilePage(null, name.replace(/^File:/, '').replace(/ Map Template\.png$/, ''))+'</pre>'+
						'</center></body>'+
						'<style>'+
							'body { background: #1a1d23;}'+
							'pre {'+
								'width: 600px;'+
								'text-align: left;'+
								'background-color: #20242C;'+
								'border: 1px solid #4C5067;'+
								'color: #FFFFFF;'+
								'line-height: 1;'+
								'overflow: auto;'+
								'padding: 12px;'+
								'word-wrap: normal;'+
								'white-space: pre-wrap;'+
							'}'+
						'</style>'
					);
					newTab.document.close();
				}
			}
		},
		updateZoom: function() {
			var map = document.querySelector('img#mapImage');
			var container = document.querySelector('#mapContainer');
			var section = document.querySelector('#quickMapSection');
			map.setAttribute('width', map.naturalWidth*zoom+'px');
			container.style.setProperty('left', section.clientWidth/2-map.clientWidth/2+'px');
			container.style.setProperty('top', section.clientHeight/2-map.clientHeight/2+'px');
			container.setAttribute('zoom', zoom);
			document.querySelectorAll('#mapContainer > .mapMarker').forEach(function(marker){
				marker.setAttribute('width', (marker.naturalWidth*zoom)+'px');
				marker.style.setProperty('left', ((markers[marker.id].x-(marker.naturalWidth/2)))*zoom+'px');
				marker.style.setProperty('top', ((markers[marker.id].y-(marker.naturalHeight/2)))*zoom+'px');
			});
		},
		genFilePage: function(region, location) {
			if (region == null && location && location.length>0) {
				Object.keys(mapRefs).forEach(function(re){
					if (!region && re !== 'QuickGen' && mapRefs[re].indexOf('File:'+location+' Map Template.png') !== -1) {
						region = re;
					}
				});
			}
			if (region && location && region.length>0 && location.length>0) {
				var redirects = {
					'The Chasm: Underground Mines': 'The Chasm',
					'Golden Apple Archipelago 1.6': 'Golden Apple Archipelago'
				};
				return'==Summary==\n{{Map Image\n|region   = '+(redirects[region]||region)+'\n|location = '+location+'\n|type     = \n}}\n\n==Licensing==\n{{Fairuse}}';
			} else { return ''; }
		}
	};
	if (config.wgPageName == 'Special:Map' && config.wgAction == 'view') {
		// Uses user page to store JSON for now as mediawiki namespace is unusable unless Wiki Rep
		api.get({action: 'query', prop: 'revisions', titles: 'MediaWiki:Custom-MapGenerator.json', rvprop: 'content', rvslots: '*'}).then(function(data){
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
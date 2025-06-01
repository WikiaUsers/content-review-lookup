/* jshint undef: true, devel: true, typed: true, jquery: true, strict: true, eqeqeq: true, freeze: true, latedef: true, shadow: outer, varstmt: true, quotmark: single, esversion: 6, futurehostile: true */
/* global importArticles */
mw.loader.using('mediawiki.api', () => {
	// Double load protection
	if (window.dev && window.dev.MapGenerator) {return;}
	(window.dev = window.dev || {}).MapGenerator = true;
	
	// Load dependencies and cache
	let config = mw.config.get(['wgAction', 'wgPageName', 'wgServer']),
		markers = { count:0 },
		api = new mw.Api(),
		loadedImages = { _BADIMAGE:{} },
		loadedTemplates = {},
		zoom = 1,
		mode, mapRefs, sett,
	// Helper functions
		encHTML = (str) => { return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); },
		decHTML = (str) => { return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'); };
	
	let mapGenerator = {
		init: () => {
			let tabs = '';
			if (mode === 'full') {
				// Clean page
				$('#mw-content-text.mw-body-content').empty();
				document.querySelector('h1.page-header__title').innerHTML = 'Map Generator';
				document.title = 'Map Generator';
				Object.keys(mapRefs).forEach((region) => {
					if (region === sett.r) {
						tabs += '<span class="active-tab"	id="'+region+'"	> '+region+' </span>';
					} else if (region !== 'QuickGen') {
						tabs += '<span class="inactive-tab"	id="'+region+'"	> '+region+' </span>';
					}
				});
			}
			let build = $(
				// Download toggle, fullMode only
				(mode === 'full' ? ('<div class="sett-item">'+
					'<label class="giw-checkbox-label" type="checkbox" for="mapDownload">'+
						'<input class="giw-checkbox mapDownload" type="checkbox" rel="MapGenerator-DT" '+localStorage.getItem('MapGenerator-DT')+'>'+
						'Download generated maps directly'+
					'</label>'+
				'</div>') : '')+
				
				// Quick Gen display, fullMode only
				(mode === 'full' ? ('<div class="sett-item">'+
					'<label class="giw-checkbox-label" type="checkbox" for="quickGenDisplay">'+
						'<input class="giw-checkbox quickGenDisplay" type="checkbox" rel="MapGenerator-QGD" '+localStorage.getItem('MapGenerator-QGD')+'>'+
						'Display quick map generation section'+
					'</label>'+
				'</div>'+
				
				'<section class="quickGenSection" style="display:'+(localStorage.getItem('MapGenerator-QGD') === 'checked' ? '' : 'none')+'">'+
					'<h2>'+
						'<span class="mw-headline Quick_Generator">Quick Generator</span>'+
					'</h2>'+
					'<div class="quickMapSection">'+
						'<div class="mapContainer">'+
							'<img class="mapImage" src="'+mapRefs.QuickGen.map+'" />'+
						'</div>'+
						'<span class="wds-button quickMapGenerator">Generate Maps</span>'+
						'<span class="wds-button ZoomIn">'+
							'<svg height="16" fill="currentColor" viewBox="0 0 16 16" width="16">'+
								'<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />'+
								'<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />'+
								'<path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />'+
							'</svg>'+
						'</span>'+
						'<span class="wds-button ZoomOut">'+
							'<svg height="16" fill="currentColor" viewBox="0 0 16 16" width="16">'+
								'<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>'+
								'<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>'+
								'<path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>'+
							'</svg>'+
						'</span>'+
					'</div>'+
				'</section>') : '')+
				
				// Template list, fullMode only
				(mode === 'full' ? ('<h2>'+
					'<span class="mw-headline Templates">Templates</span>'+
				'</h2>'+
				'<div class="regionSelect custom-tabs-default custom-tabs" class="custom-tabs-default custom-tabs">'+
					tabs+
				'</div>'+
				'<div class="Templates-loading">'+
					'<img src="https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest" width="25px" style="vertical-align: baseline;" border="0" /> '+
					'Loading...'+
				'</div>'+
				'<div class="Templates-list"></div>'+
				'<hr />') : '')+
				
				// Template generator, fullMode and quickMode
				'<div class="Templates-generator-popup">'+
					'<span class="Templates-generator-note">No template selected.</span>'+
					'<div class="Templates-generator" rel="">'+
						'<img class="templateImage" width="100%" src="" rel="" />'+
					'</div>'+
					'<div>'+
						'<span class="wds-button MapGenerator">Generate Map</span> '+
						'<span class="wds-button WikitextGenerator">Copy Wikitext</span>'+
					'</div>'+
					'<div style="display: inline-flex;gap: 5px;margin-top: 5px;">'+
						'<span class="wds-button Templates-uploader">Upload Map</span> '+
						'<div class="Templates-uploader-settings">'+
							'<label for="Templates-uploader-name">Filename: <input type="text" class="Templates-uploader-name" /></label>'+
							'<label for="Templates-uploader-type">Map type: <input type="text" class="Templates-uploader-type" placeholder="'+localStorage.getItem('MapGenerator-UT')+'" /></label>'+
						'</div>'+
					'</div>'+
					'<div class="Templates-uploader-render">'+
						'<span class="Templates-uploader-render-note"></span>'+
						'<img class="Templates-uploader-render-image" width="100%" src="" />'+
					'</div>'+
					'<span class="Templates-generator-close"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-close-small"></use></svg></span>'+
				'</div>');
			$('#mw-content-text.mw-body-content').append(build);
			if (mode === 'full') {
				mapGenerator.loadTemplates(mapRefs[sett.r]);
				document.querySelector('.mapImage').onload = () => { mapGenerator.updateZoom(); };
				document.querySelector('.mapContainer').style.setProperty('left', mapRefs.QuickGen.offset.left);	// Default map offset
				document.querySelector('.mapContainer').style.setProperty('top', mapRefs.QuickGen.offset.top);	// Default map offset
				$('.mapContainer').draggable();
				$('.mapContainer').css('height', (screen.height-250)+'px'); // Limit container so no scrolling is required
			}
			let closeMarkerSettings = () => {if (document.querySelector('.markerSettings')) {document.querySelector('.markerSettings').remove();}};
			document.addEventListener('dblclick', (event) => {
				closeMarkerSettings();
				if (event.target && (event.target.classList.contains('mapImage') || event.target.classList.contains('templateImage'))) {
					event.preventDefault();
					markers.count++;
					let localZoom = (event.target.classList.contains('templateImage') ? 1 : zoom); // ignore zoom setting if not quickGen
					let img = new Image();
					img.setAttribute('style', 'display: none;'); // hide until position to avoid weird nyooms
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
					let newMarker = {
						src: 'File:Map-guide-marker-53.png',
						x: event.layerX/localZoom,
						y: event.layerY/localZoom,
						type: (event.target.classList.contains('templateImage') ? 'Precise' : 'Quick'),
						elem: img
					};
					markers['marker'+markers.count] = newMarker;
					if (event.target.classList.contains('templateImage'))  {
						$('.Templates-generator').append(img);
					} else {
						$('.mapContainer').append(img);
					}
				} else if (event.target && /^marker\d+/.test(event.target.id)) {
					markers.count--;
					delete markers[event.target.id];
					event.target.remove();
				}
			});
			document.addEventListener('change', (event) => {
				closeMarkerSettings();
				if (mode === 'full' && event.target && event.target.classList.contains('giw-checkbox')) {
					let rel = event.target.getAttribute('rel');
					localStorage.setItem(rel, event.target.checked ? 'checked' : '');
					if (rel === 'MapGenerator-QGD') {document.querySelector('section.quickGenSection').style.setProperty('display', event.target.checked ? '' : 'none');}
				} else if (event.target && event.target.classList.contains('Templates-uploader-type')) {
					localStorage.setItem('MapGenerator-UT', event.target.value);
				} else if (event.target && event.target.classList.contains('Templates-uploader-name')) {
					mapGenerator.renderImagePreview();
				}
			});
			document.addEventListener('contextmenu', (event) => {
				closeMarkerSettings();
				if (event.target && /^marker\d+/.test(event.target.id)) {
					event.preventDefault();
					let localZoom = (event.target.closest('.Templates-generator') ? 1 : zoom); // ignore zoom setting if not quickGen
					let menu = $(
						'<div class="markerSettings" style="z-index:99999; position:absolute;">'+
							'<ul>'+
								'<li rel="'+encHTML(event.target.id)+'" class="markerSettings-32">32px</li>'+
								'<li rel="'+encHTML(event.target.id)+'" class="markerSettings-53">53px</li>'+
								'<li rel="'+encHTML(event.target.id)+'" class="markerSettings-75">75px</li>'+
								'<li rel="'+encHTML(event.target.id)+'" class="markerSettings-96">96px</li>'+
								'<li class="markerSettings-Close">&#x274C;</li>'+
							'</ul>'+
						'</div>'
					);
					$('.'+(event.target.closest('.Templates-generator') ? 'Templates-generator' : 'mapContainer')).append(menu);
					document.querySelector('.markerSettings').style.setProperty('top', markers[event.target.id].y*localZoom+(document.querySelector('.markerSettings').clientHeight/2)+'px');
					document.querySelector('.markerSettings').style.setProperty('left', markers[event.target.id].x*localZoom-(document.querySelector('.markerSettings').clientWidth/2)+'px');
				}
			});
			document.addEventListener('click', (event) => {
				if (event.target && event.target.classList.item(0) && /^markerSettings-\d\d/.test(event.target.classList.item(0))) {
					let markerID = decHTML(event.target.getAttribute('rel'));
					let type = 'File:Map-guide-marker-'+/^markerSettings-(\d\d)/.exec(event.target.classList.item(0))[1]+'.png';
					let marker = document.querySelector('#'+markerID);
					let localZoom = (event.target.closest('.Templates-generator') ? 1 : zoom); // ignore zoom setting if not quickGen
					marker.onload = () => {
						marker.setAttribute('width', (marker.naturalWidth*localZoom)+'px');
						marker.style.setProperty('top', (markers[markerID].y - (marker.naturalHeight/2))*localZoom+ 'px');
						marker.style.setProperty('left', (markers[markerID].x - (marker.naturalWidth/2))*localZoom+ 'px');
						delete marker.onload;
					};
					marker.setAttribute('src', loadedImages[type].src);
					markers[markerID].src = type;
				} else if (mode === 'full' && event.target && event.target.closest('.regionSelect')) {
					mapGenerator.urlQuery(event.target.id);
					
					// Looad new region
					mapGenerator.loadImages(mapRefs[sett.r]);
					mapGenerator.loadTemplates(mapRefs[sett.r]);
					
					// Update tabs
					let curr = document.querySelector('.regionSelect > .active-tab');
					curr.classList.remove('active-tab');
					curr.classList.add('inactive-tab');
					event.target.classList.add('active-tab');
					event.target.classList.remove('inactive-tab');
					
					// Reset template selection
					document.querySelector('.Templates-generator-note').innerHTML = 'No template selected.';
					document.querySelector('.Templates-generator-note').removeAttribute('rel');
					document.querySelector('.templateImage').setAttribute('src', '');
					document.querySelector('.templateImage').setAttribute('rel', '');
					document.querySelectorAll('.Templates-generator > .mapMarker').forEach((marker) => {
						markers.count--;
						delete markers[marker.id];
						marker.remove();
					});
					
				} else if (mode === 'full' && event.target && event.target.classList.contains('quickMapGenerator')) {
					mapGenerator.processQuickMarkers();
				} else if (mode === 'full' && event.target && event.target.classList.contains('ZoomIn')) {
					zoom = zoom * 2;
					mapGenerator.updateZoom();
				} else if (mode === 'full' && event.target && event.target.classList.contains('ZoomOut')) {
					zoom = zoom / 2;
					mapGenerator.updateZoom();
				} else if (event.target && event.target.classList.contains('MapGenerator')) {
					mapGenerator.processPreciseMarkers();
				} else if (event.target && event.target.classList.contains('WikitextGenerator')) {
					navigator.clipboard.writeText(mapGenerator.genFilePage(sett.r, decHTML(document.querySelector('.Templates-generator-note').getAttribute('rel'))));
				} else if (event.target && event.target.classList.contains('Templates-uploader')) {
					mapGenerator.getFileObject(
						mapGenerator.processPreciseMarkers(true),
						mapGenerator.genFilePage(sett.r, decHTML(document.querySelector('.Templates-generator-note').getAttribute('rel')))
					);
				} else if (event.target && event.target.closest('.mapTemplate')) {
					event.preventDefault();
					if (mode === 'quick'){
						document.querySelector('.Templates-generator-popup input.Templates-uploader-name').value = config.wgPageName.replace(/^File:/, '').replace(/_/g, ' ');
						mapGenerator.renderImagePreview();
						document.querySelector('.Templates-generator-popup').classList.add('Templates-generator-popup-active');
					}
					mapGenerator.selectTemplate(decHTML(event.target.closest('.mapTemplate').getAttribute('rel')));
				} else if (mode === 'quick' && event.target && event.target.closest('.Templates-generator-close')) {
					document.querySelector('.Templates-generator-popup').classList.remove('Templates-generator-popup-active');
				}
				
				// generic close settings if any
				if (event.target && (!event.target.closest('.markerSettings')||event.target.classList.contains('markerSettings-Close')) && $('.markerSettings').length>0) {
					closeMarkerSettings();
				}
			});
		},
		processPreciseMarkers: (urlOnly) => {
			let valid = false;
			let template = decHTML(document.querySelector('.templateImage').getAttribute('rel'));
			if (!template || template.length === 0) {alert('Select a map template.'); return;}
			let canvas = document.createElement('canvas');
			canvas.height = '600';
			canvas.width = '600';
			let context = canvas.getContext('2d');
			context.drawImage(loadedImages[template].canvas, 0, 0);
			Object.keys(markers).forEach((id) => {
				if (id !== 'count' && markers[id].type === 'Precise' && template.length>0) {
					valid = true;
					context.drawImage(
						loadedImages[markers[id].src].canvas,
						(markers[id].x-(loadedImages[markers[id].src].size/2)),	// Position
						(markers[id].y-(loadedImages[markers[id].src].size/2))	// Position
					);
				}
			});
			if (!valid) {alert('No valid marker to generate map off.');}
			else if (urlOnly) {return canvas.toDataURL();}
			else {mapGenerator.openImage(canvas.toDataURL(), template); canvas.remove();}
		},
		processQuickMarkers: () => {
			let valid = false;
			Object.keys(markers).forEach((id) => {
				if (id !== 'count' && markers[id].type === 'Quick') {
					valid = true;
					let canvas = document.createElement('canvas');
					canvas.height = '600';
					canvas.width = '600';
					let context = canvas.getContext('2d');
					let mapInfo = mapGenerator.selectMap(markers[id]);
					let attemptLoad = true;
					if (!mapInfo || loadedImages._BADIMAGE[markers[id].src] || loadedImages._BADIMAGE[mapInfo.src]) {return;}
					let waitForImages = () => {
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
		selectMap: (marker) => {
			let refx = marker.x - mapRefs.QuickGen.origin.x;
			let refy = marker.y - mapRefs.QuickGen.origin.y;
			let valid;
			mapRefs.QuickGen.templates.forEach((template) => {
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
		loadTemplates: (templates) => {
			let container = $('.Templates-list');
			let loading = document.querySelector('.Templates-loading');
			if (loadedTemplates[sett.r]) {
				loading.style.setProperty('display', 'none');
				container.html(loadedTemplates[sett.r]);
			} else {
				loading.style.setProperty('display', '');
				container.html('');
				mapGenerator.loadImages(templates);
				let waitForTemplates = () => {
					let finished = true;
					templates.forEach((template) => {
						if (loadedImages._BADIMAGE[template]) {
							templates.splice(templates.indexOf(template), 1);
							console.log('Bad filename: "'+template+'"');
						}
						else if (!loadedImages[template] || !loadedImages[template].LOADED) {
							finished = false;
						}
					});
					if (finished) {
						let gallery = '';
						templates.forEach((template) => {
							let cleanT = template.replace(/^File:/, '').replace(/ Map Template\.png$/, '');
							gallery += 
								'<div class="mapTemplate" rel="'+encHTML(template)+'">'+
									'<img class="mapTemplate-image" width="200px" src="'+loadedImages[template].src+'"/>'+
									'<span class="mapTemplate-caption">'+cleanT+'</span>'+
								'</div>';
							if (sett.m && sett.m === cleanT) {
								mapGenerator.selectTemplate(template);
							}
						});
						loadedTemplates[sett.r] = gallery;
						loading.style.setProperty('display', 'none');
						container.html(gallery);
					} else {
						window.setTimeout(waitForTemplates, 500);
					}
				};
				waitForTemplates();
			}
		},
		loadImages: (images) => {
			if (images.length>0) {
				let toLoad = [];
				images.forEach((image) => {
					if (loadedImages._BADIMAGE[image]) {console.log('Bad filename: "'+image+'"');}
					else if (!loadedImages[image]) {toLoad.push(image);}
				});
				if (toLoad.length>0) {
					for (let i = 0; i<toLoad.length; i = i+49) {
						let _toLoad = toLoad.slice(i, i+49);
						api.get({
							action:'query',
							prop:'imageinfo',
							iiprop: 'url|size',
							titles: _toLoad
						}).then((data) => { // jshint ignore: line
							if (data && data.query && data.query.pages) {
								Object.keys(data.query.pages).forEach((ID) => {
									let file = data.query.pages[ID].title;
									if (ID<0) {
										console.log('Bad filename: "'+file+'"');
										loadedImages._BADIMAGE[file] = true;
									} else if (data.query.pages[ID] && data.query.pages[ID].imageinfo) {
										let src = data.query.pages[ID].imageinfo[0].url;
										let size = data.query.pages[ID].imageinfo[0].width;
										loadedImages[file] = {};
										loadedImages[file].canvas = document.createElement('canvas');
										loadedImages[file].canvas.height = size;
										loadedImages[file].canvas.width = size;
										loadedImages[file].context = loadedImages[file].canvas.getContext('2d');
										loadedImages[file].src = src;
										loadedImages[file].size = size;
										loadedImages[file].img = new Image();
										loadedImages[file].img.crossOrigin = 'anonymous';
										loadedImages[file].img.onload = () => {
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
		openImage: (src, name) => {
			if (src && src.length>0 && name && name.length>0) {
				if (document.querySelector('.mapDownload').checked) {
					let link = document.createElement('a');
					link.download = name.replace(/^File:/, '').replace(/ Map Template\.png$/, '');
					link.href = src;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				} else {
					let newTab = window.open();
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
		updateZoom: () => {
			let map = document.querySelector('img.mapImage');
			let container = document.querySelector('.mapContainer');
			let section = document.querySelector('.quickMapSection');
			map.setAttribute('width', map.naturalWidth*zoom+'px');
			container.style.setProperty('left', section.clientWidth/2-map.clientWidth/2+'px');
			container.style.setProperty('top', section.clientHeight/2-map.clientHeight/2+'px');
			container.setAttribute('zoom', zoom);
			document.querySelectorAll('.mapContainer > .mapMarker').forEach((marker) => {
				marker.setAttribute('width', (marker.naturalWidth*zoom)+'px');
				marker.style.setProperty('left', ((markers[marker.id].x-(marker.naturalWidth/2)))*zoom+'px');
				marker.style.setProperty('top', ((markers[marker.id].y-(marker.naturalHeight/2)))*zoom+'px');
			});
		},
		genFilePage: (region, location) => {
			if (region === null && location && location.length>0) {
				Object.keys(mapRefs).forEach((re) => {
					if (!region && re !== 'QuickGen' && mapRefs[re].indexOf('File:'+location+' Map Template.png') !== -1) {
						region = re;
					}
				});
			}
			if (region && location && region.length>0 && location.length>0) {
				let redirects = {
					'The Chasm: Underground Mines': 'The Chasm',
					'Golden Apple Archipelago 1.6': 'Golden Apple Archipelago'
				};
				return'==Summary==\n{{Map Image\n|region   = '+(redirects[region]||region)+'\n|location = '+location+'\n|type     = '+localStorage.getItem('MapGenerator-UT')+'\n}}\n\n==Licensing==\n{{Fairuse}}';
			} else { return ''; }
		},
		getFileObject: (url, text) => {
			if (url && url.length>0 && text && text.length>0) {
				let arr = url.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[arr.length - 1]), 
					n = bstr.length, 
					u8arr = new Uint8Array(n);
				while(n--){
					u8arr[n] = bstr.charCodeAt(n);
				}
				let file = new File([u8arr], 'dummy', {type:mime || 'image'});
				return Promise.resolve(file).then((_file) => {
					mapGenerator.uploadFile(_file, text);
				});
			} else {alert('No map to upload, contact [[User:Mikevoir]] if you believe this to be an error!');}
		},
		uploadFile: (file, text) => {
			let filename = document.querySelector('.Templates-uploader-name').value.trim().replace(/^File:|\.png$/g, '');
			if (file && filename && filename.length>0 && text && text.length>0) {
				filename += '.png';
				api.post({
					action: 'edit',
					title: 'File:'+filename,
					ignorewarnings: '1',
					format: 'json',
					text: text,
					recreate: 1,
					token: mw.user.tokens.get('csrfToken')
				});
				api.upload(file, {
					token: mw.user.tokens.get('csrfToken'),
					filename: filename,
					ignorewarnings: '1',
					format: 'json'
				});
				mw.notify('Please leave this page open for at least a few seconds for API to finish. Thank you!', {title: 'Wait right there!'});
			}
		},
		renderImagePreview: () => {
			let filename = document.querySelector('.Templates-uploader-name').value.trim().replace(/^File:/, '').replace(/\.png$/, '');
			let image = document.querySelector('.Templates-uploader-render-image');
			let note = document.querySelector('.Templates-uploader-render-note');
			image.setAttribute('src', 'https://static.wikia.nocookie.net/dev/images/c/c5/Circle_throbber.gif/revision/latest');
			if (filename.length>0) {
				filename = 'File:'+filename+'.png';
				api.get({
					action: 'query',
					titles: filename,
					prop: 'imageinfo',
					iiprop: 'url'
				}).then((data) => {
					let filedata = Object.entries(data.query.pages)[0][1];
					if (filedata && filedata.imageinfo && filedata.imageinfo[0].url) {
						image.removeAttribute('src');
						image.setAttribute('src', filedata.imageinfo[0].url.replace(/\?cb=.+$/, ''));
						note.innerHTML = 'Pre-upload version of <a href="'+config.wgServer+mw.util.getUrl(filename)+'">'+filename+'</a>' ;
					} else {
						note.innerHTML = 'No image by that name.';
						image.removeAttribute('src');
					}
				});
			} else {
				note.innerHTML = '';
				image.removeAttribute('src');
			}
		},
		selectTemplate: (template) => {
			let manager = document.querySelector('.templateImage');
			if (decHTML(manager.getAttribute('rel')) !== template) {
				document.querySelectorAll('.Templates-generator > .mapMarker').forEach((marker) => {
					markers.count--;
					delete markers[marker.id];
					marker.remove();
				});
				manager.setAttribute('rel', template);
				manager.setAttribute('src', loadedImages[template].src);
				let name = template.replace(/^File:/, '').replace(/ Map Template\.png$/, '');
				document.querySelector('.Templates-generator-note').innerHTML = name;
				document.querySelector('.Templates-generator-note').setAttribute('rel', name);
				mapGenerator.urlQuery(null, name);
			}
			if (mode === 'full') {
				window.scrollTo(0, document.querySelector('.Templates-generator-note').offsetTop);
			}
		},
		urlQuery: (r, m) => {
			let query = {
				r: r,
				m: m
			};
			if (!r && !m) {
				(new URL(window.location.href)).searchParams.forEach((v, k) => {
					if (['r', 'm'].includes(k) && !query[k]) {query[k] = v;}
				});
			}
			if (query.m && !query.r) {
				let map = 'File:'+decodeURIComponent(query.m.replace(/_/g, ' '))+' Map Template.png';
				Object.keys(mapRefs).forEach((reg) => {
					if (reg !== 'QuickGen' && mapRefs[reg].includes(map)) {
						query.r = reg;
					}
				});
				if (!query.r) {query.m = null;}
			}
			if (mode === 'full') {
				let newurl = new URL(location);
				newurl.searchParams.set('r', mw.util.escapeIdForLink(query.r || 'Mondstadt'));
				if (query.m) {
					newurl.searchParams.set('m', mw.util.escapeIdForLink(query.m));
				}
				window.history.pushState({}, '', newurl);
			}
			if (query.m) {
				mapGenerator.loadImages(['File:'+decodeURIComponent(query.m.replace(/_/g, ' '))+' Map Template.png']);
			}
			sett = {
				r: decodeURIComponent((query.r || 'Mondstadt').replace(/_/g, ' ')),
				m: (query.m ? decodeURIComponent(query.m.replace(/_/g, ' ')) : null)
			};
		},
	};
	let pages = ['Genshin_Impact_Wiki:Map_Generator', 'Special:Map'];
	let links = $('a:has(.quickMap)');
	if (
		(
			pages.includes(config.wgPageName)
			|| links.length>0
		)
		&& config.wgAction === 'view'
	) {
		// Import styles and define load mode
		importArticles({
				type: 'style',
				article: 'MediaWiki:MapGenerator.css'
		});
		mode = pages.includes(config.wgPageName) ? 'full' : 'quick';
		
		// Initialize localStorage if any
		['MapGenerator-DT', 'MapGenerator-QGD'].forEach((_sett) => {if(localStorage.getItem(_sett) === null) {localStorage.setItem(_sett, 'checked');}});
		if(localStorage.getItem('MapGenerator-UT') === null){localStorage.setItem('MapGenerator-UT', 'Item');} // default type for [[T:Map Image]] direct upload
		
		// Uses user page to store JSON for now as mediawiki namespace is unusable unless Wiki Rep
		api.get({action: 'query', prop: 'revisions', titles: 'MediaWiki:Custom-MapGenerator.json', rvprop: 'content', rvslots: '*'}).then((data) => {
			mapRefs = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0].slots.main['*']);
			mapGenerator.loadImages([
				'File:Map-guide-marker-32.png',
				'File:Map-guide-marker-53.png',
				'File:Map-guide-marker-75.png',
				'File:Map-guide-marker-96.png'
			]);
			if (mode === 'full') {
				document.body.classList.add('MapGenerator-fullMode');
				mapGenerator.urlQuery();
			} else if (mode === 'quick') {
				document.body.classList.add('MapGenerator-quickMode');
				let maps = [];
				links.each((_, link) => {
					let map = 'File:'+((new URL(link.getAttribute('href'))).searchParams.get('m') || '')+' Map Template.png';
					if (map && Object.keys(mapRefs).some((reg) => {return (reg !== 'QuickGen' && mapRefs[reg].includes(map));})) {
						maps.push(map);
						link.setAttribute('rel', map);
						link.removeAttribute('href');
						link.style.cursor = 'pointer';
						link.classList.add('mapTemplate');
					}
				});
				mapGenerator.loadImages(maps);
			}
			mapGenerator.init();
		});
	}
});
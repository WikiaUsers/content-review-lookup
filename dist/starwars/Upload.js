/* jshint
undef: true,
devel: true,
typed: true,
jquery: true,
strict: true,
eqeqeq: true,
freeze: true,
latedef: true,
shadow: outer,
varstmt: true,
quotmark: single,
esversion: 6,
futurehostile: true
*/
/**  Adapted from Mikevoir's BetterUpload.js on Genshin wiki **/
mw.loader.using([ 'ext.CodeMirror.v6', 'ext.CodeMirror.v6.mode.mediawiki', 'mediawiki.api']).then((require) => {
	'use strict';
	(window.dev = window.dev || {}).BetterUpload = window.dev.BetterUpload || {
		'default': '==Summary==\r\n{' +'{Information' + '\r\n|attention=\r\n|description=\r\n|source=\r\n|artist=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|cat artist=\r\n|cat licensee=\r\n|cat subject=\r\n|cat type=\r\n}}'
	};
	
	// Double load protection and check we're in Special:Upload
	if (window.dev.BetterUpload._LOADED || mw.config.values.wgCanonicalSpecialPageName !== 'Upload') { return; }
	else { window.dev.BetterUpload._LOADED = true; }
	
	// Load dependencies and cache
	let api = new mw.Api(),
		config = mw.config.values,
		urlParams = new URLSearchParams(window.location.search),
		cm,
	// Main class
	BU = {
		init: (curr) => {
			// move licensing dropdown up
			let row = $('.mw-htmlform-field-Licenses');
			row.prev().before(row);
			
			// Override form submit
			document.querySelector('form#mw-upload-form').addEventListener('submit', (event)=>{
				event.preventDefault();
				if (BU.verifyName()) {
					if (new URL(location.href).searchParams.has('wpForReUpload')) {
						BU.saveEdit();
					} else {
						BU.attemptUpload();
					}
				}
			});
			if (document.querySelector('input#wpUploadDescription') && document.querySelector('label[for="wpUploadDescription"]')) {
				// Change reupload format
				document.querySelector('label[for="wpUploadDescription"]').innerHTML = 'Upload summary:';
				document.querySelector('label[for="wpUploadDescription"]').setAttribute('for', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('name', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('id', 'wpUploadSummary');
			}
			let def_Val = (curr !== null && curr !== undefined) ? curr : (BU.detectFromDest() || window.dev.BetterUpload.default || '');
			if (!document.querySelector('.mw-htmlform-field-HTMLTextAreaField')) {
				// Add page content field for reuploads
				let p_cont = $('<tr>', {
					'class': 'mw-htmlform-field-HTMLTextAreaField',
					html: [
						$('<td>', {
							'class': 'mw-label',
							html: $('<label>', { 'for': 'wpUploadDescription', text: 'Page content:' })
						}),
						$('<td>', {
							'class': 'mw-input',
							html: $('<textarea>', {
								'id': 'wpUploadDescription',
								name: 'wpUploadDescription',
								cols: '80',
								rows: '8',
								style: 'font-family: Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace;',
								val: def_Val
							})
						})
					]
				});
				$('.mw-htmlform-field-HTMLTextField:has(#wpUploadSummary)').after(p_cont);
			} else {
				// Change from summary to page content in new uploads
				document.querySelector('.mw-htmlform-field-HTMLTextAreaField label[for="wpUploadDescription"]').innerHTML = 'Page content:';
				document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea#wpUploadDescription').addEventListener('change', BU.renderPreview);
				document.querySelector('textarea#wpUploadDescription').style['font-family'] = 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace';
				document.querySelector('textarea#wpUploadDescription').value = def_Val;
			}
			
			// Add preview container
			let pvField = $('<fieldset>', {
				html: [
					$('<legend>', { text: 'Page Preview' }),
					$('<div>', { 'id': 'wpPagePreview' })
				]
			});
			$('span.mw-htmlform-submit-buttons').after(pvField);
			
			// overwrite licensing line when licensing dropdown is used
			let newLicense = $('<select>').attr('id', 'licenseTemplate').change( function() {
				let opt = $( this ).find(':selected');
				let lines = document.getElementsByClassName('cm-line');
				if (opt && opt.val()  !== '' && lines !== null && lines.length > 0) {
					for (let i = 0; i < lines.length - 1; i++) {
						if (lines[i].textContent !== null && lines[i].textContent.indexOf('licensing=') > 0) {
							lines[i].innerHTML = '<span class="cm-mw-template-ground cm-mw-template-delimiter">|</span><span class="cm-mw-template-ground cm-mw-template-argument-name">licensing=</span><span class="cm-mw-template2-ground cm-mw-pagename cm-mw-template-name">' + opt.attr('title') + '</span>';
							break;
						}
					}
				}
			});
			Array.from($('#wpLicense').get(0).options).forEach((o) => {
				newLicense.append($( '<option>', {title: o.title, value: o.text, text: o.text}));
			});
			$('#wpLicense').after(newLicense);
			$('.mw-htmlform-submit-buttons').before($('#wpLicense'));
			$('#wpLicense').attr('type', 'hidden');
			
			// Remove useless things
			$(`
				fieldset:has(>#mw-htmlform-options),
				.mw-upload-editlicenses
			`).remove();
			
			BU.initCM();
			$('#mw-htmlform-description .cm-content').attr('spellcheck', false);
			
			BU.renderPreview();
			BU.genPreloads();
		},
		
		initCM: () => {
			let CodeMirror = require( 'ext.CodeMirror.v6' );
			let mediawikiLang = require( 'ext.CodeMirror.v6.mode.mediawiki' );
			mw.util.addCSS(`
				.ext-codemirror-wrapper {position: relative;}
				.skin-fandomdesktop .cm-gutters {background-color:var(--theme-page-background-color--secondary);border-right-color:var(--theme-border-color);color:var(--theme-page-text-color); margin-right:1px;}
				.cm-editor {border: 1px solid var(--theme-border-color); color: var(--theme-page-text-color); height: unset !important;}
				.cm-content {text-wrap: wrap !important; width: 90%;}
				.cm-cursor {border-left: 1.2px solid var(--theme-page-text-color) !important;}
				.cm-scroller {max-height: 70vh; width: 100%; min-height: 300px; resize: vertical;}
				#mw-htmlform-description {width: 100%;}
				.cm-layer {animation: none !important;}
				.cm-tooltip-fold { display: none !important; }
				.cm-focused .cm-cursor {animation: steps(1) cm-blink 1.2s infinite;}
				.cm-linksuggest {font-size: 14px; padding: 0; z-index: 500; margin-top: 21px; position: absolute;}
				.cm-linksuggest:not(:has(> .oo-ui-popupWidget-popup > div)) {display: none; pointer-events: none;}
				.cm-linksuggest > .oo-ui-popupWidget-popup {padding: 0; width: 320px; height: auto;}
				.cm-linksuggest-suggest { box-sizing: border-box; display: flex; margin: 0 9px; padding: 8px 6px; cursor: pointer; }
				.cm-linksuggest-suggest:hover, .cm-linksuggest-selected { background-color: rgba(var(--theme-link-color--rgb), .15); color: var(--theme-link-color); }
			`);
			cm = new CodeMirror( $('textarea#wpUploadDescription') );
			cm.initialize( [ cm.defaultExtensions, mediawikiLang() ] );
			window.dev.BetterUpload.CodeMirror = cm;
			
			// try to preview every couple seconds
			let last;
			setInterval(() => {
				let curr = BU.getCM();
				if (curr !== last) {BU.renderPreview();}
				last = curr;
			}, 1000);
			
			// Link suggest custom implementation
			let suggList = $('<div>', {
				'class':'cm-layer cm-linksuggest oo-ui-popupWidget-anchored oo-ui-popupWidget-anchored-top',
				html: [
					$('<div>', {'class': 'oo-ui-popupWidget-popup' }),
					$('<div>', {'class': 'oo-ui-popupWidget-anchor', style: 'left: 12px;'})
				]
			});
			$('.ext-codemirror-wrapper').append(suggList);
			let matchCaret = mw.util.throttle(()=>{
				const	carTop = $('.cm-cursor').css('top').replace(/px/, ''),
						carLeft = $('.cm-cursor').css('left').replace(/px/, ''),
						scroll = $('.cm-scroller').scrollTop();
				suggList.css('display', carTop<scroll ? 'none' : '');
				suggList.css('top', Number($('.cm-cursor').css('top').replace(/px/, ''))-$('.cm-scroller').scrollTop()+10+'px');
				suggList.css('left', (Number($('.cm-cursor').css('left').replace(/px/, ''))-10)+'px');
			}, 150);
			BU.waitFor('.cm-cursor', ()=>{
				let caretObserver = new MutationObserver(matchCaret);
				caretObserver.observe($('.cm-cursor').get(0), {attributes: true});
				$('.cm-scroller').on('scroll', matchCaret);
			});
			let genSugg = mw.util.throttle(()=>{
				suggList.children('.oo-ui-popupWidget-popup').empty();
				let range = cm.view.state.selection.ranges[0];
				if (range.from!==range.to) {return;}
				let uptoCaret = BU.getCM().substring(0, range.from),
					rgxCheck = /(\[\[:?|\{\{:?)([^\n\{\|\}\[\]]+)$/;
				if (uptoCaret && rgxCheck.test(uptoCaret)) {
					let matches = rgxCheck.exec(uptoCaret),
						selWidget = new OO.ui.SelectWidget();
					let isTemplate = matches[1].startsWith('{{');
					api.get({
						action: 'linksuggest',
						'get': 'suggestions',
						query: (isTemplate ? 'Template:' : '') + matches[2]
					}).then((d)=>{
						let data = d.linksuggest.result.suggestions,
							list = suggList.children('.oo-ui-popupWidget-popup'),
							opts = [];
							list.empty();
						data.forEach((sugg)=>{
							let opt = $('<div>', { tabindex: '0', text: sugg, 'class': 'cm-linksuggest-suggest' });
							opt.on('click', (e)=>{
								suggList.children('.oo-ui-popupWidget-popup').empty();
								let repl = matches[1]+sugg+(isTemplate ? '}}' : ']]'),
									from = Math.max(0, uptoCaret.length - matches[0].length);
								repl = repl.replace(/^([\{:]+)Template:/i, '$1');
								// Apply link suggestion
								cm.view.dispatch({
									changes: { from: from, to: uptoCaret.length, insert: repl },
									selection: { anchor: from+repl.length }
								});
								cm.view.focus();
							});
							opts.push(opt);
						});
						list.append(opts);
					});
				}
			}, 150);
			
			/// Suggestion generation
			suggList.on('mouseenter', ()=>{$('.cm-linksuggest-selected').toggleClass('cm-linksuggest-selected', false);});
			let handleInput = (event) => {
				if (event.type === 'keydown' && ['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key) && document.querySelector('div.cm-linksuggest-suggest')) {
					if (event.key === 'Enter') {
						let sel = $('.cm-linksuggest-selected');
						if (sel.length>0) {
							event.preventDefault();event.stopPropagation();
							sel.click();
						}
					} else {
						event.preventDefault();
						event.stopPropagation();
						matchCaret();
						let opts = $('.cm-linksuggest-suggest'),
							target = opts.index($('.cm-linksuggest-selected'))+{ArrowUp: -1, ArrowDown: +1}[event.key];
						if (target <= -1) {target = opts.length-1;}
						else if (target >= opts.length) {target = 0;}
						opts
							.filter('.cm-linksuggest-selected')
							.add(opts.get(target))
							.toggleClass('cm-linksuggest-selected');
					}
				} else {
					matchCaret();
					genSugg();
				}
			};
			document.querySelector('.cm-content').addEventListener('keydown', handleInput, { capture: true });
			document.querySelector('.cm-content').addEventListener('click', handleInput, { capture: true });
		},
		
		pushCM: (txt, pos)=>{
			cm.view.dispatch({
				changes: {
					from: pos===null ? 0 : cm.view.state.selection.ranges[0].from,
					to: pos===null ? cm.view.state.doc.length : cm.view.state.selection.ranges[0].to,
					insert: txt
				},
				selection: {anchor: cm.view.state.selection.ranges[0].from + (pos||0)}
			});
			cm.view.focus();

		},
		
		getCM: () => { return cm.view.state.doc.toString(); },
		
		// if this file is being uploaded to a specific destination specified in the URL,
		// iterate through preloads with a specified "pattern" field to attempt to detect one
		detectFromDest: () => {
			if (!Array.isArray(window.dev.BetterUpload.preloads) || !urlParams.has('wpDestFile')) return;
			let matched = window.dev.BetterUpload.preloads.find((preload) => {
				if (preload.pattern !== null && new RegExp(preload.pattern).test(urlParams.get('wpDestFile').replace(/_/g, ' '))) {
					return true;
				}
			});
			if (matched !== null) {
				return matched.preload;
			}
		},
		
		verifyName: () => {
			let wpDestFile = document.getElementById('wpDestFile');
			
			// Check for duplicated or capitalized file extensions
			if ( wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg.jpg|png.png|gif.gif|svg.svg)$/)) {
				alert('Please do not use capitalized or duplicated file extensions in the filename.');
				return false;
			}

			// Check for annoying characters
			if ( wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
				alert('Please do not use parantheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
				return false;
			}
			return true;
		},
		
		genPreloads: () => {
			if (Array.isArray(window.dev.BetterUpload.preloads) && window.dev.BetterUpload.preloads.length>0) {
				$('.mw-htmlform-field-Preloads').remove(); // remove any to avoid double-loading
				let pl_row = $('<tr>', {
					'class': 'mw-htmlform-field-Preloads',
					html: [
						$('<td>', {
							'class': 'mw-label',
							html: $('<label>', { 'for': 'wpPreload', text: 'Preloads:' })
						}),
						$('<td>', {
							'class': 'mw-input',
							html: $('<select>', {
								'id': 'wpPreload',
								name: 'wpPreload',
								html: $('<option>', { value: 'None', title: 'None', selected: '', text: 'None selected' })
							})
						})
					]
				});
				$('.mw-htmlform-field-HTMLTextAreaField').after(pl_row);
				let pl_list = pl_row.find('select').get(0);
				let pl_opts = pl_list;
				window.dev.BetterUpload.preloads.forEach((setting, num) => {
					if (setting._group==='0') {
						pl_opts = pl_list;
					} else if (setting._group) {
						pl_opts = document.createElement('optgroup');
						pl_opts.setAttribute('label', setting._group);
						pl_list.append(pl_opts);
					} else if (setting.name && (setting.preload || setting.header)) {
						let option = document.createElement('option');
						if (setting.header) {
							option.setAttribute('disabled', 'disabled');
							option.style.color = 'GrayText';
						} else if (setting.preload) {
							option.setAttribute('value', setting.name);
							option.setAttribute('title', setting.name);
						}
						option.innerHTML = setting.description || setting.name;
						option.setAttribute('numref', num);
						pl_opts.append(option);
					}
				});
				pl_list.addEventListener('change', (event) => {
					let num = pl_list.selectedOptions[0].getAttribute('numref');
					let settings = window.dev.BetterUpload.preloads[num];
					if (settings && settings.preload) {
						$('.mw-htmlform-field-PreloadValues').remove();
						if (settings.fillin && /\$\(1\)\$/.test(settings.preload)) {
							let plv_row = $('<tr>', {
								'class': 'mw-htmlform-field-PreloadValues',
								html: [
									$('<td>', {
										'class': 'mw-label',
										html: $('<label>', { 'for': 'wpPreloadValues', text: 'Values:', style: 'vertical-align: top;' })
									}),
									$('<td>', {
										'class': 'mw-input',
										html: $('<select>', {
											'id': 'wpPreloadValues',
											name: 'wpPreloadValues',
											html: $('<option>', { value: 'None', title: 'None', selected: '', text: 'None selected' })
										})
									})
								]
							});
							pl_row.after(plv_row);
							let plv_list = plv_row.find('select').get(0);
							let plv_opts = plv_list;
							settings.fillin.forEach((value, index) => {
								if (value._group==='0') {
									plv_opts = plv_list;
								} else if (value._group) {
									plv_opts = document.createElement('optgroup');
									plv_opts.setAttribute('label', value._group);
									plv_list.append(plv_opts);
								} else {
									let option = document.createElement('option');
									let name = value.name || value.values.join(', ');
									if (value.header) {
											option.setAttribute('disabled', 'disabled');
											option.style.color = 'GrayText';
									} else if (value.preload) {
										option.setAttribute('value', name);
										option.setAttribute('title', name);
									}
									option.innerHTML = name;
									option.setAttribute('numref', index);
									plv_opts.append(option);
								}
							});
							plv_list.addEventListener('change', (event2) => {
								let preloadNum = pl_list.selectedOptions[0].getAttribute('numref');
								let preloadSettings = window.dev.BetterUpload.preloads[preloadNum];
								let valnum = plv_list.selectedOptions[0].getAttribute('numref');
								let valsettings = preloadSettings.fillin[valnum];
								let newpreload = preloadSettings.preload;
								valsettings.values.forEach((rep, ind) => {
									let regex = new RegExp(/\$\(/.source+(ind+1)+/\)\$/.source, 'g');
									if (regex.test(newpreload)) {
										newpreload = newpreload.replace(regex, rep);
									}
								});
								$('#wpPreloadValuePreview').remove();
								if (valsettings.reference) {
									let refPreview = $('<div>', { 'id': 'wpPreloadValueRef', name: 'wpPreloadValueRef' });
									api.get({
										action: 'parse',
										text: valsettings.reference,
										prop: 'text',
										disablelimitreport: true,
										contentmodel: 'wikitext',
										pst: true
									}).then((data) => {
										if (data && data.parse && data.parse.text && data.parse.text['*']) {
											refPreview.html(data.parse.text['*']);
											$(plv_list).after(refPreview);
										}
									});
								}
								BU.pushCM(newpreload, null);
								BU.renderPreview();
							});
						}
						BU.pushCM(settings.preload, null);
						BU.renderPreview();
					} else { alert('Invalid option.'); }
				});
			}
		},
		
		renderPreview: () => {
			let filename = document.querySelector('#wpDestFile').value;
			let text = BU.getCM();
			let params = {
				action: 'parse',
				text: text,
				prop: 'text',
				disablelimitreport: true,
				contentmodel: 'wikitext',
				pst: true
			};
			if (filename.length>0) {
				params.title = 'File:' + filename;
			}
			api.get(params).then((data) => {
				if (data && data.parse && data.parse.text && data.parse.text['*']) {
					$('#wpPagePreview').html(data.parse.text['*']);
				}
			}).fail(console.log);
		},
		
		saveEdit: () => {
			if (document.querySelector('input#wpUploadSummary')) {
				let filename = document.querySelector('#wpDestFile').value;
				let summary = document.querySelector('input#wpUploadSummary');
				let text = BU.getCM();
				let oldTextArea = document.querySelector('#wpUploadDescription');
				if (oldTextArea) {
					oldTextArea.value = text;
				}
				let params = {
					action: 'edit',
					title: 'File:'+filename,
					ignorewarnings: '1',
					format: 'json',
					text: text,
					recreate: 1,
					token: mw.user.tokens.get('csrfToken')
				};
				if (summary && summary.value.length>0) {
					params.summary = summary.value;
				}
				if (filename && filename.length>0) {
					api.post(params);
				} else { alert('Missing file or file name. Could not save page content.'); }
			} else {return;}
		},
		
		attemptUpload: () => {
			let filename = document.querySelector('#wpDestFile').value;
			let file = document.querySelector('#wpUploadFile').files[0];
			let comment = document.querySelector('input#wpUploadSummary');
			let text = BU.getCM();
			let oldTextArea = document.querySelector('#wpUploadDescription');
			if (oldTextArea) {
				oldTextArea.value = text;
			}
			let params = {
				token: mw.user.tokens.get('csrfToken'),
				filename: filename,
				ignorewarnings: '1',
				format: 'json',
				text: text,
				comment: text
			};
			if (file && filename && filename.length>0) {
				let handleResponse = (a, b) => {
				let data = (typeof b === 'object' && !Array.isArray(b) && b !== null && (b.error || b.upload || b.textStatus)) ? b : a;
					console.log('a', a);
					console.log('b', b);
					if (data.error || (data.textStatus !== null && data.textStatus === 'error')) {
						console.log('data', data);
						console.log('text', text);
						let cont = document.querySelector('.mw-message-box-error');
						if (!cont) {
							let _temp = $('<h2 class="mw-message-box-error-header">Upload Warning</h2><div class="mw-message-box-error mw-message-box"></div>');
							$('#uploadtext').after(_temp);
							cont = _temp[1];
						}
						if (data.error) {
							cont.innerHTML = (data.error.info && data.error.info.length>0) ? data.error.info : 'Unknown error during upload.';
						} else {
							cont.innerHTML = (data.exception && data.exception.length>0) ? data.exception : 'Unknown error during upload.';
						}
					} else if (data.upload && data.upload.result === 'Success') {
						window.open(
							config.wgServer+mw.util.getUrl('File:'+filename), // URI encoding required
							'_self' // load in current tab
						);
					} else {
						console.log('data', data);
						alert('Unknown error on upload!');
					}
				};
				api.upload(file, params).then(handleResponse, handleResponse);
			} else { alert('Missing file or file name. Could not upload file.'); }
		},
		
		// Delay until element exists to run function
		waitFor: function(query, callback, extraDelay) {
			if ('function' === typeof callback && 'string' === typeof query) {
				extraDelay = extraDelay || 0;
				if (document.querySelector(query)) {
					setTimeout(callback, extraDelay);
				} else {
					// set up the mutation observer
					let observer = new MutationObserver(function (mutations, me) {
						if (document.querySelector(query)) {
							setTimeout(callback, extraDelay);
							me.disconnect(); // stop observing
							return;
						}
					});
					
					// start observing
					observer.observe(document, {
						childList: true,
						subtree: true
					});
				}
			}
		},

	};
	
	// 
	let titles = [
		'MediaWiki:Gadget-BetterUpload.json',			// Site-wide settings on MediaWiki json page
		'User:'+config.wgUserName+'/BetterUpload.json'	// User settings if any in "User:NAME/BetterUpload.json"
	];
	if (document.querySelector('#wpDestFile') && document.querySelector('#wpDestFile').value.length>0) {
		titles.push('File:'+document.querySelector('#wpDestFile').value);
	}
	
	
	if (!new URL(location.href).searchParams.has('wpForReUpload')) { // Special:Upload?wpForReUpload=1
		api.get({
			action: 'query',
			prop: 'revisions',
			titles: titles,
			rvprop: 'content',
			rvslots: '*'
		}).then((data) => {
			let page = {user: -1, site: -1, curr: null};
			Object.keys(data.query.pages).forEach((id) => {
				if (data.query.pages[id].ns === 8 && data.query.pages[id].missing!=='') {
					page.site = id;
				} else if (data.query.pages[id].ns === 2 && data.query.pages[id].missing!=='') {
					page.user = id;
				} else if (data.query.pages[id].ns === 6 && data.query.pages[id].missing!=='') {
					page.curr = data.query.pages[id].revisions[0].slots.main['*'];
				}
			});
			if (page.user !== -1) {
				window.dev.BetterUpload = JSON.parse(data.query.pages[page.user].revisions[0].slots.main['*']);
			} else if (page.site !== -1) {
				window.dev.BetterUpload = JSON.parse(data.query.pages[page.site].revisions[0].slots.main['*']);
			}
			
			let setInit = () => {
				BU.init();
			};
			if (document.querySelector('#wpUploadDescription')) {
				setInit();
			} else {
				// set up the mutation observer
				let observer = new MutationObserver((_, me) => {
					if (document.querySelector('#wpUploadDescription')) {
						me.disconnect(); // stop observing
						BU.init();
					}
				});
				// start observing
				observer.observe(document, {
					childList: true,
					subtree: true
				});
			}
		});
	}
});
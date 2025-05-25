/* from EN Genshin Impact wiki: https://genshin-impact.fandom.com/wiki/MediaWiki:Gadget-BetterUpload.js */
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
*//* global
importArticles
*/
mw.hook('dev.CCM.load').add((cmLoader) => {
	'use strict';
	(window.dev = window.dev || {}).BetterUpload = window.dev.BetterUpload || {
		'default': '==Лицензирование==\n{{Fairuse}}'
	};
	
	// Double load protection and check we're in Special:Upload
	if (window.dev.BetterUpload._LOADED) { return; }
	else { window.dev.BetterUpload._LOADED = true; }
	
	// Load dependencies and cache
	let api = new mw.Api(),
		config = mw.config.values,
		urlParams = new URLSearchParams(window.location.search),
		cm,
	// Main class
	BU = {
		init: (curr) => {
			let form = $('#mw-upload-form');
			// Override form submit
			form.on('submit', (event)=>{
				event.preventDefault();
				let rd = $('#wpRedirectFile'),
					fn = $('#wpDestFile');
				if ( rd.length>0 && rd.val().length>0 && fn.val().length>0 ) {
					let openRD = ()=>{window.open( mw.config.get('wgServer')+mw.util.getUrl('Файл:'+fn.val())+'?redirect=no', '_self');},
						rdContent = (window.dev.BetterUpload.redirectFormat||'#перенаправление [[Файл:%TARGET%]]\n[[Категория:Файлы-перенаправления]]').replace(/%TARGET%/, rd.val());
					api.create('Файл:'+fn.val(), {recreate: true}, rdContent).then(openRD);
					api.edit('Файл:'+fn.val(), ()=>({ text: rdContent, comment: 'Создать перенаправление' })).then(openRD);
				} else {
					BU.saveEdit();
					BU.attemptUpload();
				}
			});
			if (document.querySelector('input#wpUploadDescription') && document.querySelector('label[for="wpUploadDescription"]')) {
				// Change reupload format
				document.querySelector('label[for="wpUploadDescription"]').innerHTML = 'Описание загрузки:';
				document.querySelector('label[for="wpUploadDescription"]').setAttribute('for', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('name', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('id', 'wpUploadSummary');
			} else {
				// Add upload comment field for new uploads
				let u_comm = $('<tr>', {
					'class': 'mw-htmlform-field-HTMLTextField',
					html: [
						$('<td>', {
							'class': 'mw-label',
							html: $('<label>', { 'for': 'wpUploadSummary', text: 'Описание загрузки:' })
						}),
						$('<td>', {
							'class': 'mw-input',
							html: $('<input>', { 'id': 'wpUploadSummary', name: 'wpUploadSummary', size: '60' })
						})
					]
				});
				$('.mw-htmlform-field-HTMLTextField:has(#wpDestFile)').after(u_comm);
			}
			let def_Val = (curr!==null && curr!==undefined) ? curr : (BU.detectFromDest() || window.dev.BetterUpload.default || '');
			if (!document.querySelector('.mw-htmlform-field-HTMLTextAreaField')) {
				// Add page content field for reuploads
				let p_cont = $('<tr>', {
					'class': 'mw-htmlform-field-HTMLTextAreaField',
					html: [
						$('<td>', {
							'class': 'mw-label',
							html: $('<label>', { 'for': 'wpUploadDescription', text: 'Содержимое страницы:' })
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
				document.querySelector('.mw-htmlform-field-HTMLTextAreaField label[for="wpUploadDescription"]').innerHTML = 'Содержимое страницы:';
				document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea#wpUploadDescription').addEventListener('change', BU.renderPreview);
				document.querySelector('textarea#wpUploadDescription').style['font-family'] = 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace';
				document.querySelector('textarea#wpUploadDescription').value = def_Val;
			}
			
			// Add quick redirecting option
			let rdField = $('<tr>', {
				'class': 'mw-htmlform-field-RedirectSourceField',
				html: [
					$('<td>', {
						'class': 'mw-label',
						html: $('<label>', { 'for': 'wpRedirectFile', text: 'Перенаправление на:' })
					}),
					$('<td>', {
						'class': 'mw-input',
						html: $('<input>', { 'id': 'wpRedirectFile', name: 'wpRedirectFile', size: '60' })
					})
				]
			});
			$('#mw-htmlform-source').append(rdField);
			
			// Add preview container
			let pvField = $('<fieldset>', {
				html: [
					$('<legend>', { text: 'Превью страницы' }),
					$('<div>', { 'id': 'wpPagePreview' })
				]
			});
			$('fieldset:has(>#mw-htmlform-description)').after(pvField);
			
			// Remove useless things #wpLicense
			$(`
				fieldset:has(>#mw-htmlform-options),
				tr.mw-htmlform-field-Licenses,
				.mw-upload-editlicenses
			`).remove();
			
			cmLoader($('#wpUploadDescription'));
			mw.hook('dev.CCM.ready').add((ccm)=>{
				cm = ccm;
				BU.renderPreview();
				BU.genPreloads();
				
				// try to preview every couple seconds
				let last;
				setInterval(() => {
					let newtext = cm.view.state.sliceDoc();
					if (newtext !== last) {BU.renderPreview();}
					last = newtext;
				}, 1000);
			});
			
			// Update "default values" so that the base upload check for leaving the page doesnt have a stroke when nothing actually changed
			form.data('origtext', form.serialize());
		},
		
		pushCM: (txt, pos)=>{
			cm.view.dispatch({
				changes: {
					from: pos===null ? 0 : cm.view.state.selection.main.from,
					to: pos===null ? cm.view.state.doc.length : cm.view.state.selection.main.to,
					insert: txt
				},
				selection: {anchor: cm.view.state.selection.main.from + (pos||0)}
			});
			cm.view.focus();

		},
		
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
		
		genPreloads: () => {
			if (Array.isArray(window.dev.BetterUpload.preloads) && window.dev.BetterUpload.preloads.length>0) {
				$('.mw-htmlform-field-Preloads').remove(); // remove any to avoid double-loading
				let pl_row = $('<tr>', {
					'class': 'mw-htmlform-field-Preloads',
					html: [
						$('<td>', {
							'class': 'mw-label',
							html: $('<label>', { 'for': 'wpPreload', text: 'Шаблоны описаний:' })
						}),
						$('<td>', {
							'class': 'mw-input',
							html: $('<select>', {
								'id': 'wpPreload',
								name: 'wpPreload',
								html: $('<option>', { value: 'None', title: 'None', selected: '', text: 'Ничего не выбрано' })
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
										html: $('<label>', { 'for': 'wpPreloadValues', text: 'Значения:', style: 'vertical-align: top;' })
									}),
									$('<td>', {
										'class': 'mw-input',
										html: $('<select>', {
											'id': 'wpPreloadValues',
											name: 'wpPreloadValues',
											html: $('<option>', { value: 'None', title: 'None', selected: '', text: 'Ничего не выбрано' })
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
					} else { alert('Недопустимый вариант.'); }
				});
			}
		},
		
		renderPreview: () => {
			let filename = document.querySelector('#wpDestFile').value;
			let text = cm.view.state.sliceDoc();
			let params = {
				action: 'parse',
				text: text+'__noeditsection__',
				prop: 'text',
				disablelimitreport: true,
				contentmodel: 'wikitext',
				pst: true
			};
			if (filename.length>0) {
				params.title = 'Файл:' + filename;
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
				let params = {
					action: 'edit',
					title: 'Файл:'+filename,
					ignorewarnings: '1',
					format: 'json',
					text: cm.view.state.sliceDoc(),
					recreate: 1,
					token: mw.user.tokens.get('csrfToken')
				};
				if (summary && summary.value.length>0) {
					params.summary = summary.value;
				}
				if (filename && filename.length>0) {
					api.post(params);
				} else { alert('Отсутствует файл или имя файла. Не удалось сохранить содержимое страницы.'); }
			} else {return;}
		},
		
		attemptUpload: () => {
			let filename = document.querySelector('#wpDestFile').value;
			let file = document.querySelector('#wpUploadFile').files[0];
			let comment = document.querySelector('input#wpUploadSummary');
			let params = {
				token: mw.user.tokens.get('csrfToken'),
				filename: filename,
				ignorewarnings: '1',
				format: 'json',
				text: cm.view.state.sliceDoc()
			};
			if (comment && comment.value.length>0) {
				params.comment = comment.value;
			}
			if (file && filename && filename.length>0) {
				let handleResponse = (a, b) => {
					let data = (typeof b === 'object' && !Array.isArray(b) && b !== null && (b.error || b.upload)) ? b : a;
					if (!data) {
						console.log('a', a);
						console.log('b', b);
					}
					if (data.error) {
						console.log('data', data);
						let cont = document.querySelector('.mw-message-box-error');
						if (!cont) {
							let _temp = $('<h2 class="mw-message-box-error-header">Upload Warning</h2><div class="mw-message-box-error mw-message-box"></div>');
							$('#uploadtext').after(_temp);
							cont = _temp[1];
						}
						cont.innerHTML = (data.error.info && data.error.info.length>0) ? data.error.info : 'Неизвестная ошибка при загрузке.';
					} else if (data.upload && data.upload.result === 'Success') {
						let form = $('#mw-upload-form');
						form.data('origtext', form.serialize()); // So the form isnt annoying when leaving
						window.open(
							config.wgServer+mw.util.getUrl('Файл:'+filename), // URI encoding required
							'_self' // load in current tab
						);
					} else {
						console.log('data', data);
						alert('Неизвестная ошибка при загрузке!');
					}
				};
				api.upload(file, params).then(handleResponse, handleResponse);
			} else { alert('Отсутствует файл или имя файла. Невозможно загрузить файл.'); }
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
	
	let titles = [
		'MediaWiki:Gadget-BetterUpload.json',			// Site-wide settings on MediaWiki json page
		'Участник:'+config.wgUserName+'/BetterUpload.json',	// User settings if any in "User:NAME/BetterUpload.json"
	];
	if (document.querySelector('#wpDestFile') && document.querySelector('#wpDestFile').value.length>0) {
		titles.push('Файл:'+document.querySelector('#wpDestFile').value); // File to check if doing a reupload
	}
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
			if (new URL(location.href).searchParams.has('wpForReUpload')) { // Special:Upload?wpForReUpload=1
				BU.init(page.curr);
			} else { // Special:Upload
				BU.init();
			}
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
});

// Start the process if in the right page
if (mw.config.values.wgCanonicalSpecialPageName === 'Upload') {
	mw.loader.using('mediawiki.api').then(()=>{
		importArticles({
			type: 'script',
			articles: [ 'u:dev:MediaWiki:CustomCodeMirror.js' ]
		});
	});
}
$(function() {
	(window.dev = window.dev || {}).BetterUpload = window.dev.BetterUpload || {
		'default': '==Giấy Phép==\n{{Fairuse}}'
	};
	
	// Double load protection
	if (window.dev.BetterUpload._LOADED) { return; }
	else { window.dev.BetterUpload._LOADED = true; }
	
    // Load dependencies and cache
	var api = new mw.Api();
	var PRELOAD_BY_NAME = { None: '' };
	var config = mw.config.get(['wgAction', 'wgCanonicalSpecialPageName']);
	
	// Main class
	var betterUpload = {
		init: function(curr) {
			// Add custom form submitapi
			document.querySelector('.mw-htmlform-submit').value = 'Upload file with preload';
			document.querySelector('form#mw-upload-form').addEventListener("submit", function (event) {
			  event.preventDefault();
			  betterUpload.saveEdit();
			  betterUpload.attemptUpload();
			});
			if (!document.querySelector('.mw-htmlform-field-HTMLTextAreaField')) { // Special render for reupload
				document.querySelector('label[for="wpUploadDescription"]').innerHTML = 'Upload summary:';
				document.querySelector('label[for="wpUploadDescription"]').setAttribute('for', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('name', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('id', 'wpUploadSummary');
				var tar = document.querySelector('.mw-htmlform-field-HTMLTextField + .mw-htmlform-field-HTMLTextField');
				var ren = document.createElement('tr');
				ren.classList.add('mw-htmlform-field-HTMLTextAreaField');
				ren.innerHTML =
				'<td class="mw-label">'+
					'<label for="wpUploadDescription">Page content:</label>'+
				'</td>'+
				'<td class="mw-input">'+
					'<textarea id="wpUploadDescription" cols="80" rows="8" name="wpUploadDescription" style="font-family: Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace;"></textarea>'+
				'</td>';
				tar.parentNode.insertBefore(
					ren,
					tar.nextSibling
				);
			}
			
			// Page default changes
			document.querySelector('#wpWatchthis').closest('fieldset').remove();
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField label[for="wpUploadDescription"]').innerHTML = 'Page content:';
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea#wpUploadDescription').addEventListener('change', betterUpload.renderPreview);
			document.querySelector('textarea#wpUploadDescription').style['font-family'] = 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace';
			document.querySelector('textarea#wpUploadDescription').value = (curr!==null && curr!==undefined) ? curr : (window.dev.BetterUpload.default || '');
			if (document.querySelector('tr.mw-htmlform-field-Licenses')) { document.querySelector('tr.mw-htmlform-field-Licenses').remove(); }
			if (document.querySelector('p.mw-upload-editlicenses')) { document.querySelector('p.mw-upload-editlicenses').remove(); }
			
			betterUpload.renderPreview();
			betterUpload.genPreloads();
		},
		genPreloads: function() {
			console.log(window.dev.BetterUpload);
			if (Array.isArray(window.dev.BetterUpload.preloads) && window.dev.BetterUpload.preloads.length>0) {
				if (document.querySelector('#mw-htmlform-description tbody tr.mw-htmlform-field-HTMLTextAreaField + .wpPreloadRow')) {
					document.querySelector('#mw-htmlform-description tbody tr.mw-htmlform-field-HTMLTextAreaField + .wpPreloadRow').remove();
				}
				var preloads_row = document.createElement('tr');
				preloads_row.classList.add('wpPreloadRow');
				preloads_row.innerHTML = 
					'<td class="mw-label">'+
						'<label for="wpPreload">Preloads:</label>'+
					'</td>'+
					'<td class="mw-input">'+
						'<select name="wpPreload" id="wpPreload">'+
							'<option value="None" title="None">None selected</option>'+
						'</select>'+
					'</td>';
				document.querySelector('#mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField').after(preloads_row);
				var preloads_list = document.querySelector('#mw-htmlform-description tbody select#wpPreload');
				var preloadOpts = preloads_list;
				window.dev.BetterUpload.preloads.forEach(function(setting, num){
					if (setting._group==='0') {
						preloadOpts = preloads_list;
					} else if (setting._group) {
						preloadOpts = document.createElement('optgroup');
						preloadOpts.setAttribute('label', setting._group);
						preloads_list.append(preloadOpts);
					} else if (setting.name && (setting.preload || setting.header)) {
						var option = document.createElement('option');
						if (setting.header) {
							option.setAttribute('disabled', 'disabled');
							option.style.color = 'GrayText';
						} else if (setting.preload) {
							option.setAttribute('value', setting.name);
							option.setAttribute('title', setting.name);
						}
						option.innerHTML = setting.description || setting.name;
						option.setAttribute('numref', num);
						preloadOpts.append(option);
					}
				});
				document.querySelector('#mw-htmlform-description tbody select#wpPreload').addEventListener('change', function(event){
					var num = document.querySelector('#mw-htmlform-description tbody select#wpPreload').selectedOptions[0].getAttribute('numref');
					var settings = window.dev.BetterUpload.preloads[num];
					if (settings && settings.preload) {
						var preload =  settings.preload;
						document.querySelector('textarea#wpUploadDescription').value=preload;
						if (document.querySelector('#mw-htmlform-description tbody .wpFillinRow')) {
							document.querySelector('#mw-htmlform-description tbody .wpFillinRow').remove();
						}
						if (settings.fillin && /\$\(1\)\$/.test(preload)) {
							var fillin_row = document.createElement('tr');
							fillin_row.classList.add('wpFillinRow');
							fillin_row.innerHTML = 
								'<td class="mw-label" style="vertical-align:top">'+
									'<label for="wpFillin">Values:</label>'+
								'</td>'+
								'<td class="mw-input">'+
									'<select name="wpFillin" id="wpFillin">'+
										'<option value="None" title="None">None selected</option>'+
									'</select>'+
								'</td>';
							document.querySelector('#mw-htmlform-description tbody .wpPreloadRow').after(fillin_row);
							var fillin_list = document.querySelector('#mw-htmlform-description tbody select#wpFillin');
							var options = fillin_list;
							settings.fillin.forEach(function(fillin, index){
								if (fillin._group==='0') {
									options = fillin_list;
								} else if (fillin._group) {
									options = document.createElement('optgroup');
									options.setAttribute('label', fillin._group);
									fillin_list.append(options);
								} else {
									var option = document.createElement('option');
									var name = fillin.name || fillin.values.join(', ');
									if (fillin.header) {
											option.setAttribute('disabled', 'disabled');
											option.style.color = 'GrayText';
									} else if (fillin.preload) {
										option.setAttribute('value', name);
										option.setAttribute('title', name);
									}
									option.innerHTML = name;
									option.setAttribute('numref', index);
									options.append(option);
								}
							});
							document.querySelector('#mw-htmlform-description tbody select#wpFillin').addEventListener('change', function(event2){
								var preloadNum = document.querySelector('#mw-htmlform-description tbody select#wpPreload').selectedOptions[0].getAttribute('numref');
								var preloadSettings = window.dev.BetterUpload.preloads[preloadNum];
								var valnum = document.querySelector('#mw-htmlform-description tbody select#wpFillin').selectedOptions[0].getAttribute('numref');
								var valsettings = preloadSettings.fillin[valnum];
								var newpreload = preloadSettings.preload;
								valsettings.values.forEach(function(rep, ind){
									var regex = new RegExp(/\$\(/.source+(ind+1)+/\)\$/.source, 'g');
									if (regex.test(newpreload)) {
										newpreload = newpreload.replace(regex, rep);
									}
								});
								if (document.querySelector('#mw-htmlform-description tbody .wpFillinRow .mw-input .refPreview')) {
									document.querySelector('#mw-htmlform-description tbody .wpFillinRow .mw-input .refPreview').remove();
								}
								if (valsettings.reference) {
									var refPreview =  document.createElement('div');
									refPreview.classList.add('refPreview');
									api.get({
										action: 'parse',
										text: valsettings.reference,
										prop: 'text',
										disablelimitreport: true,
										contentmodel: 'wikitext'
									}).then(function(data){
										if (data && data.parse && data.parse.text && data.parse.text['*']) {
											refPreview.innerHTML = data.parse.text['*'];
											document.querySelector('tr.wpFillinRow .mw-input').append(refPreview);
										}
									});
								}
								document.querySelector('textarea#wpUploadDescription').value = newpreload;
								betterUpload.renderPreview();
							});
						}
						document.querySelector('textarea#wpUploadDescription').value = preload;
						betterUpload.renderPreview();
					} else { alert('Invalid option.'); }
				});
			}
		},
		renderPreview: function() {
			var filename = document.querySelector('#wpDestFile').value;
			var text = document.querySelector('textarea#wpUploadDescription').value;
			var params = {
				action: 'parse',
				text: text,
				prop: 'text',
				disablelimitreport: true,
				contentmodel: 'wikitext'
			};
			if (filename.length>0) {
				params.title = 'File:' + filename;
			}
			if (text.length>0) {
				api.get(params).then(function(data){
					if (data && data.parse && data.parse.text && data.parse.text['*']) {
						if (document.querySelector('#pagePreview')) {document.querySelector('#pagePreview').remove();}
						var preview = document.createElement('tr');
						document.querySelector('#mw-htmlform-description tbody').append(preview);
						preview.id = 'pagePreview';
						preview.innerHTML = '<td colspan="2"><h1>Page Preview</h1><hr /><div>'+data.parse.text['*']+'</div></td>';
					}
				}).fail(console.log);
			}
		},
		saveEdit: function() {
			if (document.querySelector('input#wpUploadSummary')) {
				var filename = document.querySelector('#wpDestFile').value;
				var summary = document.querySelector('input#wpUploadSummary');
				var params = {
					action: 'edit',
					title: 'File:'+filename,
					ignorewarnings: '1',
					format: 'json',
					text: document.querySelector('#wpUploadDescription').value,
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
		attemptUpload: function() {
			var filename = document.querySelector('#wpDestFile').value;
			var file = document.querySelector('#wpUploadFile').files[0];
			var comment = document.querySelector('input#wpUploadSummary');
			var params = {
                token: mw.user.tokens.get('csrfToken'),
                filename: filename,
                ignorewarnings: '1',
                format: 'json',
                text: document.querySelector('#wpUploadDescription').value
            };
            if (comment && comment.value.length>0) {
            	params.comment = comment.value;
            }
			if (file && filename && filename.length>0) {
				var handleResponse = function(a, b) {
					var data = (typeof b === 'object' && !Array.isArray(b) && b !== null && (b.error || b.upload)) ? b : a;
					if (!data) {
						console.log('a', a);
						console.log('b', b);
					}
					if (data.error) {
						console.log('data', data);
						var cont = document.querySelector('.mw-message-box-error');
						if (!cont) {
							var _temp = $('<h2 class="mw-message-box-error-header">Upload Warning</h2><div class="mw-message-box-error mw-message-box"></div>');
							$('#uploadtext').after(_temp);
							cont = _temp[1];
						}
						cont.innerHTML = (data.error.info && data.error.info.length>0) ? data.error.info : 'Unknown error during upload.';
					} else if (data.upload && data.upload.result == 'Success') {
						window.open(
							mw.config.get('wgServer')+'/wiki/File:'+encodeURIComponent(filename), // URI encoding required
							'_self' // load in current tab
						);
					} else {
						console.log('data', data);
						alert('Unknown error on upload!');
					}
				};
				api.upload(file, params).then(handleResponse, handleResponse);
			} else { alert('Missing file or file name. Could not upload file.'); }
		}
	};
	
	// Start when API and LIB are loaded
	mw.loader.using('mediawiki.api').then(function(){
		// Check we're in Special:Upload
		if (config.wgCanonicalSpecialPageName == 'Upload') {
			var titles = [
				'MediaWiki:Gadget-BetterUpload.json',			// Site-wide settings on MediaWiki json page
				'User:'+mw.user.getName()+'/BetterUpload.json'	// User settings if any in "User:NAME/BetterUpload.json"
			];
			if (document.querySelector('#wpDestFile') && document.querySelector('#wpDestFile').value.length>0) {
				titles.push('File:'+document.querySelector('#wpDestFile').value);
			}
			api.get({
				action: 'query',
				prop: 'revisions',
				titles: titles,
				rvprop: 'content',
				rvslots: '*'
			}).then(function(data){
				var page = {user: -1, site: -1, curr: null};
				Object.keys(data.query.pages).forEach(function(id){
					if (data.query.pages[id].ns == 8) {
						page.site = id;
					} else if (data.query.pages[id].ns == 2 && data.query.pages[id].missing!=="") {
						page.user = id;
					} else if (data.query.pages[id].ns == 6 && data.query.pages[id].missing!=="") {
						page.curr = data.query.pages[id].revisions[0].slots.main['*'];
					}
				});
				if (page.user == -1) {
					window.dev.BetterUpload = JSON.parse(data.query.pages[page.site].revisions[0].slots.main['*']);
				} else {
					window.dev.BetterUpload = JSON.parse(data.query.pages[page.user].revisions[0].slots.main['*']);
				}
				var setInit = function() {
					if (/wpForReUpload/.test(window.location.href)) { // Special:Upload?wpForReUpload=1
						betterUpload.init(page.curr);
					} else { // Special:Upload
						betterUpload.init();
					}
				};
				if (document.querySelector('#wpUploadDescription')) {
					setInit();
				} else {
					// set up the mutation observer
					var observer = new MutationObserver(function (mutations, me) {
						// mutations is an array of mutations that occurred
						// me is the MutationObserver instance
						var targetNode = document.querySelector('#wpUploadDescription');
						if (targetNode) {
							me.disconnect(); // stop observing
							betterUpload.init();
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
});
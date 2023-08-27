$(function() {
	(window.dev = window.dev || {}).BetterUpload = window.dev.BetterUpload || {
		'default': '==Licensing==\n{{Fairuse}}',
		_PRIORITY: 0
	};
	
	// Double load protection
	if (window.dev.BetterUpload._LOADED) { return; }
	else { window.dev.BetterUpload._LOADED = true; }
	
    // Load dependencies and cache
	var api = new mw.Api();
	var PRELOAD_BY_NAME = { None: '' };
	var config = mw.config.get(['wgAction', 'wgCanonicalSpecialPageName']);
	importScriptPage('MediaWiki:BetterUpload.js/settings.js', 'genshin-impact'); // load settings
	
	// Main class
	var betterUpload = {
		init: function() {
			// Disable default form submit
			document.querySelector('.mw-htmlform-submit').remove();
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-label > label').innerHTML = 'Page content:';
			
			// Add custom form submit
			var submit = document.createElement('input');
			submit.classList.add('mw-htmlform-submit');
			submit.setAttribute('name', 'wpBetterUpload');
			submit.setAttribute('type', 'button');
			submit.setAttribute('value', 'Upload file with preload');
			document.querySelector('.mw-htmlform-submit-buttons').append(submit);
			submit.addEventListener('click', betterUpload.attemptUpload);
			
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-input > textarea').addEventListener('change', betterUpload.renderPreview);
			document.querySelector('form#mw-upload-form').removeAttribute('action');
			document.querySelector('form#mw-upload-form').removeAttribute('method');
			document.querySelector('textarea#wpUploadDescription').style['font-family'] = 'Consolas, Eupheima UCAS, Ayuthaya, Menlo, monospace';
			document.querySelector('textarea#wpUploadDescription').value = window.dev.BetterUpload.default || '';
			document.querySelector('tr.mw-htmlform-field-Licenses').remove();
			document.querySelector('p.mw-upload-editlicenses').remove();
			// betterUpload.genPreloads();
			betterUpload.renderPreview();
			mw.hook('dev.BetterUpload').add(function(sett){
			console.log(sett);
				if (!window.dev.BetterUpload._PRIORITY || !sett._PRIORITY || window.dev.BetterUpload._PRIORITY < sett._PRIORITY) {
					window.dev.BetterUpload = sett;
					betterUpload.genPreloads();
				}
			});
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
				window.dev.BetterUpload.preloads.forEach(function(setting, num){
					if (setting.name && (setting.preload || setting.header)) {
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
						preloads_list.append(option);
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
							settings.fillin.forEach(function(fillin, index){
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
								fillin_list.append(option);
							});
						}
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
		attemptUpload: function() {
			var filename = document.querySelector('#wpDestFile').value;
			var file = document.querySelector('#wpUploadFile').files[0];
			var params = {
                token: mw.user.tokens.get('csrfToken'),
                filename: filename,
                ignorewarnings: '1',
                format: 'json',
                text: document.querySelector('#wpUploadDescription').value
            };
			if (file && filename && filename.length>0) {
				api.upload(file, params).done(function(){
					setTimeout(function(){window.location.replace(window.location.href.replace(/^(.+\/wiki\/).+$/, '$1')+'File:'+filename);},500);
				});
			} else { alert('Missing file or file name.'); }
		},
	};
	
	// Start when API and LIB are loaded
	mw.loader.using('mediawiki.api').then(function(){
		// Check we're in Special:Upload
		if (config.wgCanonicalSpecialPageName == 'Upload') {
			if (document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-label > label')) {
				setTimeout(betterUpload.init);
			} else {
				// set up the mutation observer
				var observer = new MutationObserver(function (mutations, me) {
					// mutations is an array of mutations that occurred
					// me is the MutationObserver instance
					var targetNode = document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-label > label');
					if (targetNode) {
						setTimeout(betterUpload.init);
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
	});
});
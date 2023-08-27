$(function() {
	(window.dev = window.dev || {}).BetterUpload = window.dev.BetterUpload || {
		'default': '==Licensing==\n{{Fairuse}}',
		preloads: [
			{ name: 'Screenshots', preload: '==Licensing==\n{{Fairuse}}', description: 'Any miscellaneous screenshot' },
			{ name: 'Promotional Artwork', preload: '==Summary==\n{{File\n|category      = Official Media;Promotional Artwork\n|characters    = \n|caption       = \n|sourcelink1   = \n|sourcelabel1  = \n|date          = \n}}\n\n==Licensing==\n{{Fairuse}}', description: 'Official character promotional artworks' },
			{ name: 'Social Media Artwork', preload: '==Summary==\n{{File\n|category      = Official Media;Social Media Artwork\n|characters    = \n|caption       = \n|sourcelink1   = \n|sourcelabel1  = \n|date          = \n}}\n\n==Licensing==\n{{Fairuse}}', description: 'Official character social media artworks' }
			/*/Examples:
			/ /	{ name: 'Screenshots', preload: '==Licensing==\n{{Fairuse}}', description: 'Any miscelaneous screenshot' } // Preload option
			/ /	{ name: 'Quests', header: true } // Header for sectioning preload types
			/*/
		]
	};
	console.log('attempt load');
	// Double load protection
	if (window.dev.BetterUpload._LOADED) { return; }
	else { window.dev.BetterUpload._LOADED = true; }
    // Load dependencies and cache
	var api = new mw.Api();
	var PRELOAD_BY_NAME = { None: '' };
	var config = mw.config.get(['wgCanonicalSpecialPageName']);
	
	// Main class
	var betterUpload = {
		init: function() {
			// Default content changes
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-label > label').innerHTML = 'Page content:';
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea').value = window.dev.BetterUpload.default || '';
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea').style['font-family'] = 'Consolas'; // Use monospaced font as rubik is bad for code
			document.querySelector('tr.mw-htmlform-field-Licenses').remove();
			document.querySelector('p.mw-upload-editlicenses').remove();
			document.querySelector('.mw-htmlform-submit').remove();
			
			// Add custom form submit
			var submit = document.createElement('input');
			submit.classList.add('mw-htmlform-submit');
			submit.setAttribute('name', 'wpBetterUpload');
			submit.setAttribute('type', 'button');
			submit.setAttribute('value', 'Upload file with preload');
			document.querySelector('.mw-htmlform-submit-buttons').append(submit);
			submit.addEventListener('click', betterUpload.attemptUpload);
			
			document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-input > textarea').addEventListener('change', betterUpload.renderPreview);
			
			if (Array.isArray(window.dev.BetterUpload.preloads) && window.dev.BetterUpload.preloads.length>0) {
				var preloads_row = document.createElement('tr');
				preloads_row.innerHTML = 
					'<td class="mw-label">'+
						'<label for="wpPreload">Preloads:</label>'+
					'</td>'+
					'<td class="mw-input"><select name="wpPreload" id="wpPreload"><option value="None" title="None">None selected</option></select></td>';
				document.querySelector('#mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField').after(preloads_row);
				var preloads_list = document.querySelector('#mw-htmlform-description tbody select#wpPreload');
				window.dev.BetterUpload.preloads.forEach(function(setting){
					if (setting.name && (setting.preload || setting.header)) {
						var option = document.createElement('option');
						if (setting.header) {
							option.setAttribute('disabled', 'disabled');
							option.style.color = 'GrayText';
						} else if (setting.preload) {
							option.setAttribute('value', setting.name);
							option.setAttribute('title', setting.name);
							PRELOAD_BY_NAME[setting.name] = setting.preload;
						}
						option.innerHTML = setting.description || setting.name;
						preloads_list.append(option);
					}
				});
				document.querySelector('#mw-htmlform-description tbody select#wpPreload').addEventListener('change', function(event){
					var selected = event.target.value;
					if (![null, undefined].includes(PRELOAD_BY_NAME[selected])) {
						document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea').value = PRELOAD_BY_NAME[selected];
						betterUpload.renderPreview();
					} else { alert('Invalid option.'); }
				});
			}
			betterUpload.renderPreview();
		},
		renderPreview: function() {
			var filename = document.querySelector('#wpDestFile').value;
			var text = document.querySelector('.mw-htmlform-field-HTMLTextAreaField textarea').value;
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
					setTimeout(function(){window.location.replace(window.location.href.replace(/^(.+\/wiki\/).+$/, '$1')+'File:'+filename);},200);
				});
			} else { alert('Missing file or file name.'); }
		},
	};
	
	// Start when API is loaded
	mw.loader.using('mediawiki.api').then(function(){
		// Check we're in Special:Upload
		if (config.wgCanonicalSpecialPageName == 'Upload') {
			
			// Run if aloready loaded
			if (document.querySelector('.mw-htmlform-field-HTMLTextAreaField > .mw-label > label')) {
				setTimeout(betterUpload.init);
			} else {
				// Run when loads
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
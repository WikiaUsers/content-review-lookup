/*
 * ActuallyBetterUpload
 * Fandom port from zzz.wiki.gg <3
 *
 * Features:
 *    Allows uploading both single and multiple files
 *    Editing descriptions either for all files at once or for each file individually
 *    Selecting a template preset
 *    Previewing the page text
 *
 * Based on:
 *    ActuallyBetterUpload from zzz.wiki.gg
 *    https://zenlesszonezero.wiki.gg/ru/wiki/MediaWiki:Gadgets/ActuallyBetterUpload
 *
 *    BetterUpload (by Mikevoir)
 *    https://genshin-impact.fandom.com/wiki/MediaWiki:Gadget-BetterUpload.js
 *
 *    MultiUpload (by Gguigui1, KhangND, Fujimaru-kun and Pcj)
 *    https://dev.fandom.com/wiki/MediaWiki:MultiUpload.js
 *
 *    uploadMultipleFiles (by westgrass and Pcj)
 *    https://support.wiki.gg/wiki/UploadMultipleFiles
 * 
 * Fandom install (Extension:Gadgets, old-style definition). Add to MediaWiki:Gadgets-definition:
 *    * ActuallyBetterUpload[ResourceLoader|package]|ActuallyBetterUpload.js|ActuallyBetterUpload.css|ActuallyBetterUpload/i18n.json
 * Package files (must be exactly these names in the MediaWiki namespace):
 *    MediaWiki:Gadget-ActuallyBetterUpload.js (this file, first in the list = entry point)
 *    MediaWiki:Gadget-ActuallyBetterUpload.css
 *    MediaWiki:Gadget-ActuallyBetterUpload/i18n.json (the UI strings)
 * Optionally add a description at MediaWiki:Gadget-BetterUpload.
 *
 * The preloads pages,
 *    MediaWiki:Gadget-BetterUpload.json for the wiki and User:<name>/BetterUpload.json for the user,
 * are loaded via the API and are NOT package files.
*/

(window.dev = window.dev || {}).BetterUpload = window.dev.BetterUpload || {
	'default': '==Licensing==\n{{Fairuse}}'
};
 
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload' && !window.dev.BetterUpload._LOADED) {
window.dev.BetterUpload._LOADED = true; // double load protection
let ccmWarned = false;
 
	// CustomCodeMirror (https://dev.fandom.com/wiki/CustomCodeMirror) is imported once and its
	// loader function is reused for every textarea. The load starts here, in the same tick as the
	// core modules below, so ResourceLoader batches them into one request and the editor loads
	// in parallel with the config request. Resolves with the loader; rejects when the script is
	// unavailable or stays silent for 10 seconds.
	let ccmPromise = (() => {
		let d = $.Deferred();
		if (typeof importArticle !== 'function') { d.reject('importArticle is not defined'); return d.promise(); }
		let timer = setTimeout(() => { d.reject('dev.CCM.load did not fire within 10 s (script blocked, failed to load, or its modules are missing)'); }, 10000);
		// dev.CCM.load keeps its last payload (mw.hook memory), so a late add still fires
		mw.hook('dev.CCM.load').add((load) => { clearTimeout(timer); d.resolve(load); });
		// cross-origin host: open the connection early
		$('head').append($('<link>', { rel: 'preconnect', href: 'https://dev.fandom.com' }));
		// ext.CodeMirror.v6.WikiEditor does not declare ext.CodeMirror.v6 as a dependency and throws
		// 'Module "ext.CodeMirror.v6" is not loaded' unless it is already loaded. So: first the
		// modules CCM needs (one parallel batch), then the WikiEditor module, the CCM script and
		// its stylesheet, all in parallel.
		mw.loader.using([
			'ext.CodeMirror.v6',
			'ext.CodeMirror.v6.lib',
			'ext.wikiEditor',
			'ext.CodeMirror.v6.mode.mediawiki'
		]).then(() => {
			mw.loader.using('ext.CodeMirror.v6.WikiEditor').then(null, () => {
				d.reject('ext.CodeMirror.v6.WikiEditor failed to load');
			});
			importArticle({ type: 'style', article: 'u:dev:MediaWiki:CustomCodeMirror.css' });
			importArticle({ type: 'script', article: 'u:dev:MediaWiki:CustomCodeMirror.js' });
		}, () => { d.reject('CodeMirror modules failed to load'); });
		return d.promise();
	})();
 
mw.loader.using([
	'mediawiki.api',
	'mediawiki.util',
	'mediawiki.user',
	'jquery.textSelection'
]).then(() => {
	'use strict';
	
	// UI strings, picked by the wiki's content language (fallback: English)
	let i18n = require('./ActuallyBetterUpload/i18n.json');
	mw.messages.set(i18n[mw.config.get('wgContentLanguage')] || i18n.en);
 
	// Load dependencies and cache
	let api = new mw.Api(),
		config = mw.config.values,
		urlParams = new URLSearchParams(window.location.search),
		wpDestFileEl = null,	// cached #wpDestFile element (set in init)
		$editorTextarea = null,	// single-mode page content <textarea> once built
		editor = null,			// single-mode editor adapter
		singleSeen = null,		// single-mode: text seen on the previous poll tick (debounce)
		singleLast = null,		// single-mode: text last rendered into the preview (debounce)
		// multi-file mode state
		multiActive = false,
		batch = [],				// [{ file, idPrefix, $wrap, $preview, $filename, editor, objectUrl, cm, lastPreview, seen }]
		idSeq = 0,
		multiReady = null,		// promise: modules + messages that multi mode needs (prefetched)
		progressBar = null,
		curIdx = 0,
		resultCount = { warnings: 0, errors: 0 },
		sharedIgnore = null,
		sharedWatch = null,
		sharedSummaryVal = '',	// shared upload summary, read once per upload run
		sharedEditor = null,	// multi-mode shared editor adapter (broadcasts to all files)
		sharedCm = null,		// multi-mode shared editor CodeMirror instance (for teardown)
		lastShared = '',		// last broadcast text, to detect changes in the poll
		// core messages needed to localise upload warnings (loaded lazily)
		stdmsgs = [
			'badfilename', 'file-deleted-duplicate', 'file-exists-duplicate', 'fileexists',
			'fileexists-no-change', 'filename-bad-prefix', 'filepageexists', 'filewasdeleted',
			'filename-thumb-name',
			// used to build the standard thumbnail caption per file
			'widthheight', 'size-bytes', 'size-kilobytes', 'size-megabytes'
		],
		// Editor adapter over a textarea: reads/writes through jquery.textSelection, which
		// ext.CodeMirror transparently proxies to the live editor (and works on the bare
		// textarea otherwise)
		makeEditor = ($ta) => ({
			getText: () => $ta.textSelection('getContents'),
			setText: (txt) => { $ta.textSelection('setContents', txt); },
			insert: (pre, post) => { $ta.textSelection('encapsulateSelection', { pre: pre, post: post }); }
		}),
	// Main class
	BU = {
		init: (curr) => {
			let form = $('#mw-upload-form');
			wpDestFileEl = document.querySelector('#wpDestFile');
			// Edittools/CharInsert integration for the cloned per-file panels. CharInsert can't
			// target CodeMirror (focus is on its contenteditable), so intercept clicks in the
			// capture phase (before CharInsert's own bubble handler) and insert into the editor
			// of the file block the clicked button belongs to
			document.addEventListener('click', (e) => {
				let btn = e.target.closest && e.target.closest('.mw-charinsert-item');
				if (!btn) { return; }
				let scope = btn.closest('.bu-editor-scope');
				let ed = scope && $(scope).data('buEditor');
				if (!ed) { return; } // not one of our cloned panels
				ed.insert(btn.getAttribute('data-mw-charinsert-start') || '', btn.getAttribute('data-mw-charinsert-end') || '');
				e.preventDefault();
				e.stopImmediatePropagation();
			}, true);
			// Override form submit
			form.on('submit', (event)=>{
				event.preventDefault();
				if (multiActive) { BU.uploadFiles(); return; }
				let rd = $('#wpRedirectFile'),
					fn = $('#wpDestFile');
				if ( rd.length>0 && rd.val().length>0 && fn.val().length>0 ) {
					let openRD = ()=>{window.open( mw.util.getUrl('File:'+fn.val(), {redirect: 'no'}), '_self');},
						rdContent = (window.dev.BetterUpload.redirectFormat||'#redirect [[File:%TARGET%]]').replace(/%TARGET%/, rd.val());
					api.create('File:'+fn.val(), {recreate: true, summary: mw.msg('betterupload-redirect-summary')}, rdContent)
						.then(openRD)
						.catch((code, data)=>{
							alert((data && data.error && data.error.info) || mw.msg('betterupload-error-unknown-upload'));
						});
				} else {
					// Upload first, then write the page content (see attemptUpload):
					// running both at once races on File:X and the post-upload navigation
					// cancels the in-flight edit, losing the description/licensing.
					BU.attemptUpload();
				}
			});
			if (document.querySelector('input#wpUploadDescription') && document.querySelector('label[for="wpUploadDescription"]')) {
				// Change reupload format
				document.querySelector('label[for="wpUploadDescription"]').textContent = mw.msg('betterupload-summary-label');
				document.querySelector('label[for="wpUploadDescription"]').setAttribute('for', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('name', 'wpUploadSummary');
				document.querySelector('input#wpUploadDescription').setAttribute('id', 'wpUploadSummary');
			} else {
				// Add upload comment field for new uploads
				let u_comm = $('<tr>', {
					'class': 'mw-htmlform-field-HTMLTextField bu-single-only',
					html: [
						$('<td>', {
							'class': 'mw-label',
							html: $('<label>', { 'for': 'wpUploadSummary', text: mw.msg('betterupload-summary-label') })
						}),
						$('<td>', {
							'class': 'mw-input',
							html: $('<input>', { 'id': 'wpUploadSummary', name: 'wpUploadSummary', size: '60' })
						})
					]
				});
				$('.mw-htmlform-field-HTMLTextField:has(#wpDestFile)').after(u_comm);
			}
			// Destination filename row belongs to single mode only
			$('.mw-htmlform-field-HTMLTextField:has(#wpDestFile)').addClass('bu-single-only');
 
			let def_Val = (curr!==null && curr!==undefined) ? curr : (BU.detectFromDest() || window.dev.BetterUpload.default || '');
			// Own page content field. We do NOT reuse the native #wpUploadDescription textarea:
			// the CodeMirror extension auto-attaches to it, so reusing it would leave two editors
			// on one textarea. A unique id keeps the extension away, so attachEditor is the only
			// editor. The native description field is hidden (its content is unused).
			$('#wpUploadDescription').closest('tr').hide();
			let p_cont = $('<tr>', {
				'class': 'mw-htmlform-field-BUPageContent bu-single-only',
				html: [
					$('<td>', {
						'class': 'mw-label',
						html: $('<label>', { 'for': 'wpBUPageContent', text: mw.msg('betterupload-content-label') })
					}),
					$('<td>', {
						'class': 'mw-input',
						html: $('<textarea>', {
							'id': 'wpBUPageContent',
							name: 'wpBUPageContent',
							cols: '80',
							rows: '8',
							val: def_Val
						})
					})
				]
			});
			$('.mw-htmlform-field-HTMLTextField:has(#wpUploadSummary)').after(p_cont);
 
			// Add quick redirecting option
			let rdField = $('<tr>', {
				'class': 'mw-htmlform-field-RedirectSourceField bu-single-only',
				html: [
					$('<td>', {
						'class': 'mw-label',
						html: $('<label>', { 'for': 'wpRedirectFile', text: mw.msg('betterupload-redirect-label') })
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
				'id': 'wpBUPreviewField',
				'class': 'bu-single-only',
				html: [
					$('<legend>', { text: mw.msg('betterupload-preview-legend') }),
					$('<div>', { 'id': 'wpPagePreview' })
				]
			});
			$('fieldset:has(>#mw-htmlform-description)').after(pvField);
			// Visual separator between the preview and the submit controls below.
			pvField.after($('<hr>', { 'class': 'bu-single-only' }));
 
			// Remove useless things #wpLicense
			$(`
				fieldset:has(>#mw-htmlform-options),
				tr.mw-htmlform-field-Licenses,
				.mw-upload-editlicenses
			`).remove();
 
			// Allow selecting several files, and switch mode based on how many are picked.
			let fileInput = document.querySelector('#wpUploadFile');
			if (fileInput) {
				fileInput.setAttribute('multiple', 'multiple');
				fileInput.addEventListener('click', () => { BU.prepareMulti(); }, { once: true }); // warm up while the dialog is open
				$(fileInput).on('change', function () {
					let files = this.files;
					if (files && files.length > 1) { BU.enterMultiMode(files); }
					else { BU.restoreSingleMode(); }
				});
			}
 
			// The editor adapter works on the bare textarea, so the preview and preloads do not wait for
			// CodeMirror: it swaps itself in as soon as it is loaded
			$editorTextarea = $('#wpBUPageContent');
			editor = makeEditor($editorTextarea);
			BU.attachEditor($editorTextarea[0]);
			BU.renderSingle();
			BU.mountSinglePreloads();
 
			// Debounced preview: each tick only compares text (cheap, no network) and
			// re-parses a target once its text has been stable for one tick and differs
			// from what's shown. Bursts of typing produce no parses until the user pauses.
			setInterval(() => {
				if (document.hidden) { return; } // nothing to update while backgrounded
				if (multiActive) {
					BU.broadcastShared();
					batch.forEach((e) => {
						if (!e.editor || !e.$preview.prop('open')) { return; }
						let cur = e.editor.getText();
						if (cur === e.lastPreview) { e.seen = cur; return; } // already showing latest
						if (cur === e.seen) { BU.renderFilePreview(e); }       // stable one tick -> parse
						else { e.seen = cur; }                                 // still changing -> wait
					});
					return;
				}
				let cur = editor.getText();
				if (cur === singleLast) { singleSeen = cur; return; }
				if (cur === singleSeen) { BU.renderSingle(); }
				else { singleSeen = cur; }
			}, 300);
 
			// Update "default values" so that the base upload check for leaving the page doesnt have a stroke when nothing actually changed
			form.data('origtext', form.serialize());
		},
		
		onFirstFocus: (el, fn) => {
			if (window.dev.BetterUpload.lazyEditors !== true) { fn(false); }
			else { $(el).one('focusin', () => { fn(true); }); }
		},
 
		// Attach CustomCodeMirror to the textarea.
		attachEditor: (textarea, onAttached, lazy, hideUntilReady) => {
			let show = () => { textarea.style.visibility = ''; };
			let deferred = lazy && window.dev.BetterUpload.lazyEditors === true;
			if (hideUntilReady && !deferred) { textarea.style.visibility = 'hidden'; }
			let attach = (focusAfter) => {
				ccmPromise.then((load) => {
					if (!document.body.contains(textarea)) { return; } // removed in the meantime
					// CCM swaps the textarea id to wpTextbox1 while it initialises: make sure there is
					// an id to restore and that it is restored even on failure
					if (!textarea.id) { textarea.id = 'bu-ta-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7); }
					let origId = textarea.id;
					let cm = null;
					let capturing = false;
					// The loader returns nothing; the instance comes through the ready hook, which fires
					// synchronously inside load(). mw.hook replays its previous payload on add, hence the
					// flag: only the call made during our own load() counts.
					let grab = (cmWE) => { if (capturing) { cm = cmWE; } };
					mw.hook('dev.CCM.ready').add(grab);
					capturing = true;
					try {
						load(textarea);
					} catch (e) {
						console.warn('BetterUpload: CustomCodeMirror failed, using a plain textarea', e);
						cm = null;
					}
					capturing = false;
					mw.hook('dev.CCM.ready').remove(grab);
					textarea.id = origId;
					show();
					if (cm) {
						if (focusAfter && cm.view) { cm.view.focus(); } // the focused textarea was replaced
						if (onAttached) { onAttached(cm); }
					}
				}, (why) => {
					show();
					if (!ccmWarned) { ccmWarned = true; console.warn('BetterUpload: CustomCodeMirror unavailable, using a plain textarea:', why); }
				});
			};
			if (lazy) { BU.onFirstFocus(textarea, attach); }
			else { attach(false); }
		},
 
		// Match a filename against preloads with a "pattern" field; return the preload text.
		detectPreload: (filename) => {
			let preloads = window.dev.BetterUpload.preloads;
			if (!Array.isArray(preloads) || !filename) return;
			let name = filename.replace(/_/g, ' ');
			let matched = preloads.find((preload) => {
				if (!preload.pattern || 'string' !== typeof preload.pattern) { return false; }
				// compiled once; an invalid pattern in the config must not break the whole form
				if (preload._rx === undefined) {
					try { preload._rx = new RegExp(preload.pattern); }
					catch (e) { console.warn('BetterUpload: invalid preload pattern', preload.pattern, e); preload._rx = null; }
				}
				return !!preload._rx && preload._rx.test(name);
			});
			if (matched && matched.preload) { return matched.preload; }
		},
 
		// Single-mode helper: detect a preload from the ?wpDestFile= destination in the URL.
		detectFromDest: () => {
			if (!urlParams.has('wpDestFile')) return;
			return BU.detectPreload(urlParams.get('wpDestFile'));
		},
 
		// Build a Preloads control (label + <select>, plus a fillin values <select> and a
		// reference preview appended on demand). Container-agnostic: returns a <div> the caller
		// mounts wherever it likes. opts: { apply(text), render() }.
		buildPreloads: (opts) => {
			let preloads = window.dev.BetterUpload.preloads;
			if (!Array.isArray(preloads) || preloads.length===0) { return null; }
			let $wrap = $('<div>', { 'class': 'bu-preloads' });
			let $select = $('<select>', { 'class': 'bu-preload-select' });
			$select.append($('<option>', { value: 'None', title: 'None', selected: '', text: mw.msg('betterupload-none-selected') }));
			let pl_list = $select.get(0);
			let pl_opts = pl_list;
			preloads.forEach((setting, num) => {
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
			$wrap.append($('<label>', { text: mw.msg('betterupload-preloads-label') }), ' ', $select);
			$select.on('change', () => {
				let num = pl_list.selectedOptions[0].getAttribute('numref');
				let settings = preloads[num];
				$wrap.find('.bu-preload-values, .bu-preload-ref').remove();
				if (num === null) { return; } // "None selected"
				if (settings && settings.preload) {
					if (settings.fillin && /\$\(1\)\$/.test(settings.preload)) {
						let $vsel = $('<select>', { 'class': 'bu-preload-values' });
						$vsel.append($('<option>', { value: 'None', title: 'None', selected: '', text: mw.msg('betterupload-none-selected') }));
						let plv_list = $vsel.get(0);
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
						$wrap.append(' ', $('<label>', { text: mw.msg('betterupload-values-label') }), ' ', $vsel);
						$vsel.on('change', () => {
							let valnum = plv_list.selectedOptions[0].getAttribute('numref');
							let valsettings = settings.fillin[valnum];
							if (!valsettings) { $wrap.find('.bu-preload-ref').remove(); opts.apply(settings.preload); opts.render(); return; } // "None selected"
							let newpreload = settings.preload;
							valsettings.values.forEach((rep, ind) => {
								let regex = new RegExp(/\$\(/.source+(ind+1)+/\)\$/.source, 'g');
								if (regex.test(newpreload)) {
									newpreload = newpreload.replace(regex, () => rep);
								}
							});
							$wrap.find('.bu-preload-ref').remove();
							if (valsettings.reference) {
								let $ref = $('<div>', { 'class': 'bu-preload-ref' });
								api.get({
									action: 'parse',
									text: valsettings.reference,
									prop: 'text',
									disablelimitreport: true,
									contentmodel: 'wikitext',
									pst: true
								}).then((data) => {
									if (data && data.parse && data.parse.text && data.parse.text['*']) {
										$ref.html(data.parse.text['*']);
										$vsel.after($ref);
									}
								});
							}
							opts.apply(newpreload);
							opts.render();
						});
					}
					opts.apply(settings.preload);
					opts.render();
				} else { alert(mw.msg('betterupload-invalid-option')); }
			});
			return $wrap;
		},
 
		// Mount the single-mode Preloads control as a form row under the page content.
		mountSinglePreloads: () => {
			$('.mw-htmlform-field-Preloads').remove(); // avoid double-loading
			let $ctrl = BU.buildPreloads({
				apply: (t) => editor.setText(t),
				render: BU.renderSingle
			});
			if (!$ctrl) { return; }
			let $row = $('<tr>', {
				'class': 'mw-htmlform-field-Preloads bu-single-only',
				html: [ $('<td>', { 'class': 'mw-label' }), $('<td>', { 'class': 'mw-input' }) ]
			});
			$row.find('.mw-input').append($ctrl);
			$('.mw-htmlform-field-BUPageContent').after($row);
		},
 
		// Parse wikitext and drop the HTML into $target. Shared by single and multi mode.
		renderPreview: (getText, filename, $target) => {
			let params = {
				action: 'parse',
				text: getText()+'__noeditsection__',
				prop: 'text',
				disablelimitreport: true,
				contentmodel: 'wikitext',
				pst: true
			};
			if (filename && filename.length>0) {
				params.title = 'File:' + filename;
			}
			// POST: long page text does not fit into a GET query string. A response that arrives after a
			// newer request was sent is dropped, so a slow parse can never overwrite a fresh one.
			let seq = ($target.data('buSeq') || 0) + 1;
			$target.data('buSeq', seq);
			api.post(params).then((data) => {
				if ($target.data('buSeq') !== seq) { return; }
				if (data && data.parse && data.parse.text && data.parse.text['*']) {
					$target.html(data.parse.text['*']);
				}
			}, (code) => { console.warn('BetterUpload: preview failed', code); });
		},
 
		// Single-mode preview wrapper. Records the rendered text so the debounce poll
		// skips re-parsing after any discrete (preload/initial) render.
		renderSingle: () => {
			singleLast = editor.getText();
			BU.renderPreview(editor.getText, wpDestFileEl ? wpDestFileEl.value : '', $('#wpPagePreview'));
		},
 
		saveEdit: () => {
			if (document.querySelector('input#wpUploadSummary')) {
				let filename = wpDestFileEl.value;
				let summary = document.querySelector('input#wpUploadSummary');
				let params = {
					action: 'edit',
					title: 'File:'+filename,
					ignorewarnings: '1',
					format: 'json',
					text: editor.getText(),
					recreate: 1,
					token: mw.user.tokens.get('csrfToken')
				};
				if (summary && summary.value.length>0) {
					params.summary = summary.value;
				}
				if (filename && filename.length>0) {
					return api.post(params);
				} else { alert(mw.msg('betterupload-no-save')); }
			}
		},
 
		attemptUpload: () => {
			let filename = wpDestFileEl.value;
			let file = document.querySelector('#wpUploadFile').files[0];
			let comment = document.querySelector('input#wpUploadSummary');
			let params = {
				token: mw.user.tokens.get('csrfToken'),
				filename: filename,
				ignorewarnings: '1',
				format: 'json',
				text: editor.getText()
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
						alert(mw.msg('betterupload-error-unknown-upload'));
						return;
					}
					if (data.error) {
						console.log('data', data);
						let cont = document.querySelector('.mw-message-box-error');
						if (!cont) {
							let $header = $('<h2>', { 'class': 'mw-message-box-error-header', text: mw.msg('betterupload-upload-warning-header') });
							let $box = $('<div>', { 'class': 'mw-message-box-error mw-message-box' });
							if ($('#uploadtext').length) { $('#uploadtext').after($header, $box); }
							else { $('#mw-upload-form').before($header, $box); }
							cont = $box[0];
						}
						cont.textContent = (data.error.info && data.error.info.length>0) ? data.error.info : mw.msg('betterupload-error-unknown');
					} else if (data.upload && data.upload.result === 'Success') {
						let form = $('#mw-upload-form');
						form.data('origtext', form.serialize()); // So the form isnt annoying when leaving
						let goToFile = () => {
							window.open(
								mw.util.getUrl('File:'+filename), // relative URL, works with Fandom's /ru/wiki/ paths
								'_self' // load in current tab
							);
						};
						// Write the full page content (description + licensing) now that the
						// file exists, then navigate once the edit has actually committed.
						let edit = BU.saveEdit();
						if (edit && edit.then) {
							edit.then(goToFile, goToFile);
						} else {
							goToFile();
						}
					} else {
						console.log('data', data);
						alert(mw.msg('betterupload-error-unknown-upload'));
					}
				};
				api.upload(file, params).then(handleResponse, handleResponse);
			} else { alert(mw.msg('betterupload-no-upload')); }
		},
 
		// ---- Multi-file mode -------------------------------------------------------------
 
		// Modules and core messages multi mode needs; loaded once. Started when the file dialog opens,
		// so the UI appears at once after the files are picked.
		prepareMulti: () => {
			if (!multiReady) {
				multiReady = mw.loader.using(['oojs-ui-core', 'mediawiki.jqueryMsg'])
					.then(() => api.loadMessagesIfMissing(stdmsgs));
			}
			return multiReady;
		},
 
		// Switch to multi-file mode: hide single-mode fields and build a per-file UI.
		enterMultiMode: (files) => {
			multiActive = true;
			$('.bu-single-only').hide();
			let $nativeUpload = $('input[name="wpUpload"]');
			if ($nativeUpload.length) {
				if ($nativeUpload.data('buOrigValue') === undefined) { $nativeUpload.data('buOrigValue', $nativeUpload.val()); }
				$nativeUpload.val(mw.msg('betterupload-upload-button'));
			}
			// Hide the whole native description fieldset: its rows are unused in multi mode
			// and it also carries the single Edittools panel (cloned per file below).
			$('#mw-htmlform-description').closest('fieldset').hide();
			// Hide MediaWiki's own single-file preview thumbnail (it only shows the first file).
			$(document.body).addClass('bu-multi-active');
			$('#mw-htmlform-source').closest('fieldset').addClass('bu-source-fieldset');
			BU.prepareMulti().then(() => { BU.buildMultiUI(files); }, () => { BU.buildMultiUI(files); });
		},
 
		// Drop every batch entry, releasing the resources it holds: the object URL behind
		// its thumbnail and (best effort) its CodeMirror instance. Used by both teardown
		// (restoreSingleMode) and re-entry (buildMultiUI) so blobs never leak.
		clearBatch: () => {
			batch.forEach((e) => {
				if (e.objectUrl) { URL.revokeObjectURL(e.objectUrl); }
				if (e.cm && e.cm.view && typeof e.cm.view.destroy === 'function') { e.cm.view.destroy(); }
			});
			batch = [];
		},
 
		// Tear down multi-file mode and show the single-file UI again.
		restoreSingleMode: () => {
			multiActive = false;
			BU.clearBatch();
			$('#bu-multi').empty().hide();
			$('.bu-single-only').show();
			let $nativeUpload = $('input[name="wpUpload"]');
			if ($nativeUpload.data('buOrigValue') !== undefined) { $nativeUpload.val($nativeUpload.data('buOrigValue')); }
			$('#mw-htmlform-description').closest('fieldset').show();
			$(document.body).removeClass('bu-multi-active');
			if (sharedCm && sharedCm.view && typeof sharedCm.view.destroy === 'function') { sharedCm.view.destroy(); }
			sharedCm = null;
			sharedEditor = null;
		},
 
		// Live-broadcast the shared editor's text to every per-file editor (replace).
		// Empty shared editor never overwrites per-file content. Only the text is pushed
		// here; the debounce poll re-renders any open previews once the text settles.
		broadcastShared: () => {
			if (!sharedEditor) { return; }
			let txt = sharedEditor.getText();
			if (txt === lastShared) { return; }
			lastShared = txt;
			if (txt === '') { return; }
			batch.forEach((e) => { if (e.editor) { e.editor.setText(txt); } });
		},
 
		// Reset button: drop the whole batch and return the form to a pristine "no file" state.
		resetAll: () => {
			BU.restoreSingleMode();
			let fileInput = document.querySelector('#wpUploadFile');
			if (fileInput) { fileInput.value = ''; }
			// Clearing the input's value programmatically doesn't make MediaWiki drop the
			// derived UI it filled from the previous selection, so clear those leftovers too:
			// the auto-filled destination name and the native preview thumbnail.
			if (wpDestFileEl) { wpDestFileEl.value = ''; }
			$('#mw-upload-thumbnail').empty();
			$('#mw-htmlform-source').closest('fieldset').find('.thumb').empty();
		},
 
		buildMultiUI: (files) => {
			// Re-entry (picking a new multi-selection) lands here without a teardown, so
			// release the previous batch's blobs/editors before rebuilding.
			BU.clearBatch();
			let $container = $('#bu-multi');
			if (!$container.length) {
				$container = $('<div>', { 'id': 'bu-multi' });
				$('#mw-htmlform-source').closest('fieldset').after($container);
			}
			$container.empty().show();
 
			// Shared control
			let $header = $('<fieldset>', { 'class': 'bu-multi-header' });
			$header.append($('<legend>').text(mw.msg('betterupload-apply-all')));
 
			// Shared upload summary
			$header.append($('<div>', { 'class': 'bu-field' }).append(
				$('<label>', { 'for': 'bu-shared-summary', text: mw.msg('betterupload-summary-label') }), ' ',
				$('<input>', { type: 'text', 'id': 'bu-shared-summary', 'class': 'mw-ui-input bu-shared-summary', size: '60' })
			));
 
			// Shared editor (typing here replaces every per-file editor live)
			lastShared = '';
			sharedEditor = null;
			let $sharedTa = $('<textarea>', {
				'id': 'bu-shared-content',
				'class': 'bu-shared-content',
				rows: '6'
			});
			let $sharedScope = $('<div>', { 'class': 'bu-shared-editor bu-editor-scope' })
				.append($('<div>', { 'class': 'bu-field bu-editor-field' }).append($sharedTa));
			$header.append($sharedScope);
			sharedEditor = makeEditor($sharedTa);
			$sharedScope.data('buEditor', sharedEditor);
			let $et = $('.mw-editTools').first();
			if ($et.length) {
				let $clone = $et.clone().show().addClass('bu-file-edittools');
				$clone.removeAttr('id').find('[id]').removeAttr('id');
				$sharedScope.append($clone);
			}
			BU.attachEditor($sharedTa[0], (cm) => { sharedCm = cm; }, false, true);
 
			// The preloads dropdown fills the shared editor, which broadcasts to all files
			let $applyAll = BU.buildPreloads({
				apply: (t) => { if (sharedEditor) { sharedEditor.setText(t); } BU.broadcastShared(); },
				render: () => { batch.forEach((e) => { if (e.$preview.prop('open')) { BU.renderFilePreview(e); } }); }
			});
			if ($applyAll) {
				$header.append($('<div>', { 'class': 'bu-apply-all' }).append($applyAll));
			}
 
			let $ign = $('<input>', { type: 'checkbox', id: 'bu-ignore' });
			let $wat = $('<input>', { type: 'checkbox', id: 'bu-watch' });
			if (mw.user.options.get('watchuploads') === '1') { $wat.prop('checked', true); }
			sharedIgnore = $ign.get(0);
			sharedWatch = $wat.get(0);
			$header.append($('<div>').append($ign, ' ', $('<label>', { 'for': 'bu-ignore', text: mw.msg('betterupload-ignorewarnings') })));
			$header.append($('<div>').append($wat, ' ', $('<label>', { 'for': 'bu-watch', text: mw.msg('betterupload-watchthis') })));
 
			// Upload is a submit input so MediaWiki's own beforeunload handler is cleared on
			// submit (same trick as SmartMultiUpload); the form submit handler routes to us.
			let $upload = $('<input>', { type: 'submit', 'class': 'mw-htmlform-submit', value: mw.msg('betterupload-upload-button') });
			$upload.attr('title', $('input[name="wpUpload"]').attr('title') || mw.msg('betterupload-upload-button'));
			let $reset = $('<input>', { type: 'button', value: mw.msg('betterupload-reset-button') });
			$reset.on('click', () => { BU.resetAll(); });
			$header.append($('<div>', { 'class': 'bu-multi-buttons' }).append($upload, ' ', $reset));
			$container.append($header);
 
			Array.prototype.forEach.call(files, (f) => { BU.addFileBlock(f); });
 
			let form = $('#mw-upload-form');
			form.data('origtext', form.serialize());
		},
 
		// Build one per-file block: filename + editor + per-file preloads + remove button,
		// with a collapsed page preview directly below.
		addFileBlock: (file) => {
			let idPrefix = 'bu-f' + (idSeq++);
			let def = BU.detectPreload(file.name) || window.dev.BetterUpload.default || '';
 
			let $fs = $('<fieldset>', { 'class': 'bu-file-block', 'id': idPrefix });
			$fs.append($('<legend>').text(file.name));
 
			// Left column: filename + editor + remove button (preloads appended once ready).
			let $main = $('<div>', { 'class': 'bu-file-main' });
			let $name = $('<input>', { type: 'text', 'class': 'mw-ui-input bu-file-name', 'id': idPrefix+'-name', value: file.name });
			$main.append($('<div>', { 'class': 'bu-field' })
				.append($('<label>', { 'for': idPrefix+'-name', text: mw.msg('betterupload-filename-label') }), ' ', $name));
 
			let $ta = $('<textarea>', {
				'id': idPrefix+'-content',
				'class': 'bu-file-content',
				rows: '8'
			}).val(def);
			$main.append($('<div>', { 'class': 'bu-field bu-editor-field' }).append($ta));
 
			let $rm = $('<input>', { type: 'button', 'class': 'bu-remove', value: mw.msg('betterupload-remove-file') });
 
			// Right column: the file's own thumbnail, using MediaWiki's standard .thumb wrapper.
			let thumb = BU.buildThumb(file);
			let $thumbCol = $('<div>', { 'class': 'bu-file-thumb-col' }).append(thumb.$thumb);
 
			$fs.append($('<div>', { 'class': 'bu-file-row' }).append($main, $thumbCol));
 
			// Collapsed page preview directly under the fieldset, using a native <details> element
			let $preview = $('<details>', { 'class': 'bu-preview-details' });
			let $body = $('<div>', { 'class': 'bu-preview-body' });
			$preview.append($('<summary>').text(mw.msg('betterupload-preview-legend')), $body);
 
			// One wrapper per file (fieldset + preview + separator) so removal is a single call
			let $wrap = $('<div>', { 'class': 'bu-file-wrap' }).append($fs, $preview, $('<hr>'));
 
			let entry = { file: file, idPrefix: idPrefix, $wrap: $wrap, $preview: $preview, $filename: $name, editor: null, cm: null, objectUrl: thumb.objectUrl, lastPreview: null, seen: null };
			batch.push(entry);
 
			$('#bu-multi').append($wrap);
			// Render lazily the first time it's opened (and on later opens)
			$preview.on('toggle', function () { if (this.open) { BU.renderFilePreview(entry); } });
 
			$rm.on('click', () => { BU.removeFile(entry); });
 
			entry.editor = makeEditor($ta);
			// Tag this block's editor scope so the CharInsert handler routes clicks here.
			$main.addClass('bu-editor-scope').data('buEditor', entry.editor);
			let $pl = BU.buildPreloads({
				apply: (t) => entry.editor.setText(t),
				render: () => { if (entry.$preview.prop('open')) { BU.renderFilePreview(entry); } }
			});
			if ($pl) {
				$fs.find('.bu-editor-field').after($('<div>', { 'class': 'bu-field' }).append($pl));
			}
			$main.append($rm);
			// Optional ("lazyEditors": true): with many files an editor and an Edittools panel per file
			// is heavy, so both are created on the first focus. Off by default: no textarea-to-editor jump.
			BU.onFirstFocus($ta[0], () => {
				let $et = $('.mw-editTools').first();
				if ($et.length) {
					let $clone = $et.clone().show().addClass('bu-file-edittools');
					$clone.removeAttr('id').find('[id]').removeAttr('id');
					$rm.before($clone);
				}
			});
			BU.attachEditor($ta[0], (cm) => { entry.cm = cm; }, true, true);
		},
 
		renderFilePreview: (entry) => {
			if (!entry.editor) { return; }
			// Record what we're about to render so the poll won't re-parse unchanged text.
			entry.lastPreview = entry.editor.getText();
			BU.renderPreview(entry.editor.getText, entry.$filename.val(), entry.$preview.find('.bu-preview-body'));
		},
 
		// Remove a single file from the batch, keeping the others
		removeFile: (entry) => {
			let i = batch.indexOf(entry);
			if (i >= 0) { batch.splice(i, 1); }
			if (entry.objectUrl) { URL.revokeObjectURL(entry.objectUrl); }
			entry.$wrap.remove();
			if (batch.length === 0) { BU.resetAll(); }
		},
 
		// Build a per-file thumbnail using MediaWiki's standard .thumb / .thumbcaption markup
		// Returns { $thumb, objectUrl } so the caller can revoke the object URL later
		buildThumb: (file) => {
			let $thumb = $('<div>', { 'class': 'thumb tright bu-file-thumb' });
			let $inner = $('<div>', { 'class': 'thumbinner' });
			let $cap = $('<div>', { 'class': 'thumbcaption' });
			let url = null;
			if (file.type && file.type.indexOf('image/') === 0) {
				url = URL.createObjectURL(file);
				let $img = $('<img>', { 'class': 'thumbimage', src: url, alt: file.name });
				$img.on('load', function () {
					$cap.text(mw.message('widthheight', this.naturalWidth, this.naturalHeight).text() + ', ' + BU.formatFileSize(file.size));
				});
				$inner.append($img, $cap);
			} else {
				$cap.text(BU.formatFileSize(file.size));
				$inner.append($cap);
			}
			$thumb.append($inner);
			return { $thumb: $thumb, objectUrl: url };
		},
 
		formatFileSize: (bytes) => {
			if (bytes >= 1048576) { return mw.message('size-megabytes', (bytes/1048576).toFixed(2)).text(); }
			if (bytes >= 1024) { return mw.message('size-kilobytes', Math.round(bytes/1024)).text(); }
			return mw.message('size-bytes', bytes).text();
		},
 
		// Sequentially upload every file in the batch (adapted from SmartMultiUpload).
		uploadFiles: () => {
			if (!batch.length) { alert(mw.msg('betterupload-nofile')); return; }
			resultCount = { warnings: 0, errors: 0 };
			curIdx = 0;
			// Read the shared summary once; it applies to every file in this run.
			sharedSummaryVal = $('#bu-shared-summary').val();
			// Drop any leftovers from a previous run so we don't stack results/progress bars.
			$('#bu-results').remove();
			if (progressBar) { progressBar.$element.remove(); }
			$('#mw-content-text').hide();
			let $res = $('<div>', { 'id': 'bu-results' });
			$res.append('<h3>' + mw.message('betterupload-successful').escaped() + '</h3><ul id="multiUploadDone"></ul>');
			$res.append('<div style="display:none;" id="multiUploadWarnings"><h3>' + mw.message('betterupload-warnings').escaped() + '</h3><ul></ul></div>');
			$res.append('<div style="display:none;" id="multiUploadFailed"><h3>' + mw.message('betterupload-failed').escaped() + '</h3><ul></ul></div>');
			$res.insertAfter(BU.$heading());
			progressBar = new OO.ui.ProgressBarWidget();
			progressBar.$element.insertAfter(BU.$heading());
			document.body.scrollIntoView(true);
			BU.apiUploadStep();
		},
 
		apiUploadStep: () => {
			if (curIdx >= batch.length) {
				if (resultCount.warnings === 0 && resultCount.errors === 0) {
					BU.showUploadNotification('success');
				} else {
					if (resultCount.warnings !== 0) { BU.showUploadNotification('warning', resultCount.warnings); }
					if (resultCount.errors !== 0) { BU.showUploadNotification('error', resultCount.errors); }
				}
				progressBar.setProgress(100);
				progressBar.$element.hide();
				return;
			}
			let entry = batch[curIdx];
			progressBar.setProgress(100 * curIdx / batch.length);
			let filename = entry.$filename.val() || entry.file.name;
			let text = entry.editor ? entry.editor.getText() : '';
			let params = {
				action: 'upload',
				filename: filename,
				file: entry.file,
				filesize: entry.file.size,
				text: text,
				token: mw.user.tokens.get('csrfToken'),
				watchlist: (sharedWatch && sharedWatch.checked) ? 'watch' : 'nochange',
				format: 'json',
				formatversion: 2,
				errorformat: 'html',
				errorlang: config.wgUserLanguage
			};
			if (sharedIgnore && sharedIgnore.checked) { params.ignorewarnings = 1; }
			if (sharedSummaryVal && sharedSummaryVal.length) { params.comment = sharedSummaryVal; }
			// api.post (not api.upload) reliably passes `text` and returns readable warnings.
			api.post(params, { contentType: 'multipart/form-data', timeout: 0 }).done((data) => {
				if (data.upload && data.upload.result === 'Warning') {
					resultCount.warnings++;
					BU.getUploadWarningTexts(data.upload.warnings, filename).done((warnings) => {
						$('#multiUploadWarnings > ul').append(BU.makeFailureItem(filename, warnings));
						$('#multiUploadWarnings').show();
					});
				} else if (data.upload && data.upload.result === 'Success') {
					$('#multiUploadDone').append($('<li>').append($('<a>', { href: data.upload.imageinfo.descriptionurl, target: '_blank', rel: 'noopener', text: data.upload.filename })));
				} else {
					console.warn('Unexpected success result', data);
				}
				curIdx++;
				BU.apiUploadStep();
			}).fail((code, data) => {
				resultCount.errors++;
				let failureItem;
				if (data && data.errors) {
					failureItem = BU.makeFailureItem(filename, data.errors.map((error) => error.html));
				} else if (code === 'http') {
					failureItem = BU.makeFailureItem(filename, mw.message('betterupload-network-error').escaped());
				} else {
					failureItem = BU.makeFailureItem(filename, mw.message('betterupload-error-unknown').escaped());
				}
				$('#multiUploadFailed > ul').append(failureItem);
				$('#multiUploadFailed').show();
				curIdx++;
				BU.apiUploadStep();
			});
		},
 
		// Page title element (Fandom Desktop wraps it in .page-header__title); falls back to
		// the content container so the results are never inserted into nothing
		$heading: () => {
			let $h = $('#firstHeading');
			if (!$h.length) { $h = $('.page-header__title').first(); }
			return $h.length ? $h : $('#mw-content-text');
		},
 
		makeFailureItem: (filename, reasons) => {
			if (reasons && !Array.isArray(reasons)) { reasons = [reasons]; }
			let item = $('<li>');
			if (!reasons || reasons.length === 0) {
				item.text(filename);
			} else if (reasons.length === 1) {
				item.text(filename + ': ').append(reasons[0]);
			} else {
				let reasonList = $('<ul>');
				reasons.forEach((reason) => { reasonList.append($('<li>').html(reason)); });
				item.text(filename + ':').append(reasonList);
			}
			return item;
		},
 
		getUploadWarningTexts: (warnings, filename) => {
			let deferred = $.Deferred();
			let parseDataWrapper = $('<div>');
			let correctedFilename = warnings.badfilename || filename;
			Object.keys(warnings).forEach((warningKey) => {
				let message = BU.getLocalizedWarningMessage(warningKey, warnings[warningKey], correctedFilename);
				$('<div>').html(message).appendTo(parseDataWrapper);
			});
			api.parse(parseDataWrapper.html()).done((parsedData) => {
				let parsedWarnings = $(parsedData).children().map(function () { return this.innerHTML; }).get();
				deferred.resolve(parsedWarnings);
			}).fail(() => { deferred.reject(); });
			return deferred.promise();
		},
 
		getLocalizedWarningMessage: (key, args, filenameWithoutNamespace) => {
			switch (key) {
				case 'badfilename':
					return mw.message('badfilename', args).plain();
				case 'bad-prefix':
					return mw.message('filename-bad-prefix', args).plain();
				case 'duplicate': {
					let message = mw.message('file-exists-duplicate', args.length).plain();
					let gallery = '<gallery>\n';
					args.forEach((name) => { gallery += name + '\n'; });
					gallery += '</gallery>';
					return message + '\n' + gallery;
				}
				case 'duplicate-archive':
					return mw.message('file-deleted-duplicate', BU.prependNamespace('file', args)).plain();
				case 'exists-normalized':
				case 'exists': {
					let filename = BU.prependNamespace('file', args);
					return mw.message('fileexists', filename).plain().replace('[['+filename+'|thumb]]', '');
				}
				case 'nochange':
					return mw.message('fileexists-no-change', BU.prependNamespace('file', filenameWithoutNamespace)).plain();
				case 'page-exists':
					return mw.message('filepageexists', BU.prependNamespace('file', filenameWithoutNamespace)).plain();
				case 'thumb-name':
					return mw.message('filename-thumb-name').plain();
				case 'was-deleted':
					return mw.message('filewasdeleted', BU.prependNamespace('file', filenameWithoutNamespace)).plain();
				default:
					return mw.message('betterupload-unknown-warning', '<code>' + mw.html.escape(key) + '</code>', '<code>' + mw.html.escape(JSON.stringify(args)) + '</code>').plain();
			}
		},
 
		prependNamespace: (canonicalNamespace, pageName) => {
			let namespaceId = config.wgNamespaceIds[canonicalNamespace];
			return config.wgFormattedNamespaces[namespaceId] + ':' + pageName;
		},
 
		showUploadNotification: (type, count) => {
			BU.showNotification(type, mw.message('betterupload-' + type + '-notification', count).parse());
		},
 
		showNotification: (type, msg, autohide) => {
			let messageWidget = new OO.ui.MessageWidget({ type: type, inline: true, label: msg });
			mw.notify(messageWidget.$element, { autoHide: autohide !== false });
		}
	};
 
	// Config pages are read through the API (they are NOT package files).
	// Site-wide: MediaWiki:Gadget-BetterUpload.json, personal: User:<name>/BetterUpload.json
	let titles = ['MediaWiki:Gadget-BetterUpload.json'];
	if (config.wgUserName) {
		titles.push('User:' + config.wgUserName + '/BetterUpload.json');
	}
	let destFile = (document.querySelector('#wpDestFile') || {}).value || urlParams.get('wpDestFile');
	if (urlParams.has('wpForReUpload') && destFile) {
		titles.push('File:' + destFile); // current page text, used to prefill a reupload
	}
	let parseConfig = (text) => {
		if (typeof text !== 'string') { return null; }
		try { return JSON.parse(text); }
		catch (e) { console.warn('BetterUpload: invalid JSON config', e); return null; }
	};
	let start = (page) => {
		let setInit = () => {
			if (urlParams.has('wpForReUpload')) { // Special:Upload?wpForReUpload=1
				BU.init(page.curr);
			} else { // Special:Upload
				BU.init();
			}
		};
		if (document.querySelector('#wpUploadDescription')) {
			setInit();
		} else {
			// the form may be rendered after the gadget runs: wait for it
			let observer = new MutationObserver((_, me) => {
				if (document.querySelector('#wpUploadDescription')) {
					me.disconnect();
					setInit();
				}
			});
			observer.observe(document, { childList: true, subtree: true });
		}
	};
	api.get({
		action: 'query',
		prop: 'revisions',
		titles: titles,
		rvprop: 'content',
		rvslots: '*'
	}).then((data) => {
		let page = { user: null, site: null, curr: null };
		Object.keys(data.query.pages).forEach((id) => {
			let p = data.query.pages[id];
			if (p.missing === '' || !p.revisions) { return; }
			let content = p.revisions[0].slots.main['*'];
			if (p.ns === 8) { page.site = content; }
			else if (p.ns === 2) { page.user = content; }
			else if (p.ns === 6) { page.curr = content; }
		});
		// A valid user config wins over the site one
		let cfg = parseConfig(page.user) || parseConfig(page.site);
		if (cfg) { window.dev.BetterUpload = $.extend({ _LOADED: true }, cfg); }
		return page;
	}, () => ({ curr: null })).then(start);
});
}
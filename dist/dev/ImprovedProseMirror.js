// <nowiki> (this tag disables pre-save transforms) ~~~~~
/* jshint
	bitwise: true,
	curly: true,
	eqeqeq: true,
	esversion: 7,
	expr: false,
	latedef: true,
	loopfunc: true,
	shadow: outer,
	undef: true,
	unused: true,
	varstmt: true,
	ignore: line,
	trailingcomma: multi,
*/
/* globals importArticle, DataTransfer, getSelection */
(() => {
	'use strict';
	
	// Double load protection
	if (((window.dev || (window.dev = {})).IPM || (window.dev.IPM = {}))._loaded) {return;}
	window.dev.IPM._loaded = true;
	
	const config = mw.config.get([
		'wgArticlePath',
		'wgNamespaceNumber',
		'wgPageName',
		'wgServer',
		'wgUserLanguage',
		'articleHasCommentingEnabled',
		'profileIsMessageWallPage',
	]);
	
	let localApi;
	
	const IPM = {
		init() {
			if (config.articleHasCommentingEnabled || config.profileIsMessageWallPage) {
				localApi = new mw.Api({
					parameters: {
						uselang: config.wgUserLanguage,
						errorformat: 'plaintext',
						formatversion: '2',
					},
				});
				
				// Add necessary styles that dont load outside editor screen and custom ones
				importArticle({
					type: 'style',
					article: 'u:dev:MediaWiki:ImprovedProseMirror.css',
				});
				
				IPM.linkSuggest();
				IPM.customInsert();
			}
		},
		
		// Adds link suggest functionality to message walls and article comment section text editors
		linkSuggest() {
			const URL_REGEX = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i; // taken from Fandom's DeleteCommentModal.js module - links will be stripped after posting message if the url doesn't match this!
			const WIKILINK_REGEX = /\[\[([^\[\]]*)\]?\]?$/;
			const EXT_LINK_REGEX = /\[([^\[\]]+)\]$/;
			
			let search = {};
			let lastRequest = {};
			let resultCount = 0;
			
			const body = $(document.body);
			const wrapper = $(
				'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-popupWidget oo-ui-popupWidget-anchored oo-ui-popupWidget-anchored-top IPM-ui-linkSuggest" id="IPM-wrapper" style="display:none;">'+
					'<div class="oo-ui-popupWidget-anchor" style="left:12px;"></div>'+
					'<div class="oo-ui-popupWidget-popup" style="padding:0;">'+
						'<div class="oo-ui-popupWidget-body" style="width:320px;">'+
							'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget" id="IPM-list" role="listbox" aria-multiselectable="false"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			const suggestBox = wrapper.find('#IPM-list');
			body.append(wrapper);
			
			const methods = {
				initListeners() {
					const checkMessageDebounced = mw.util.debounce(methods.checkMessage, 250);
					const observer = new MutationObserver(checkMessageDebounced);
					const onSelectOption = () => {
						if (search.type === 'link') {
							methods.dispatchLink();
						} else if (search.type === 'image') {
							methods.insertImage();
						}
					};
					
					body.on('focus.IPM', '.ProseMirror', (event) => {
						observer.disconnect();
						observer.observe(event.target, {
							subtree: true,
							characterData: true,
							childList: true,
						});
					});
					
					body.on('click.IPM', (event) => {
						if (event.target.closest('.IPM-ui-linkSuggest-suggestion')) {methods.handleOOUI(event); onSelectOption();}
						else if (event.target.matches('.rich-text-editor__content')) {checkMessageDebounced();}
					});
					
					body.on('mousedown.IPM', (event) => {
						if (event.target.closest('.IPM-ui-linkSuggest')) {event.preventDefault();}
						else if (event.target.closest('.ProseMirror')) {checkMessageDebounced();}
						else {methods.closeSuggestions();}
					});
					
					body.on('contextmenu.IPM', (event) => {
						if (event.target.closest('.IPM-ui-linkSuggest')) {event.preventDefault();}
					});
					
					document.addEventListener('keydown', (event) => {
						switch (event.key) {
							case 'Enter':
								if (suggestBox.attr('aria-activedescendant')) {
									event.preventDefault();
									onSelectOption();
								} else {
									methods.closeSuggestions();
								}
								break;
							case 'Escape':
								methods.closeSuggestions();
								break;
							case 'ArrowUp':
							case 'ArrowDown':
								if (wrapper.css('display') !== 'none') {
									event.preventDefault();
									methods.handleOOUI(event);
								} else {
									checkMessageDebounced();
								}
								break;
							case 'Home':
							case 'PageUp':
							case 'End':
							case 'PageDown':
								if (wrapper.css('display') !== 'none') {
									event.preventDefault();
									methods.handleOOUI(event);
								}
								break;
							case 'ArrowLeft':
							case 'ArrowRight':
								checkMessageDebounced();
						}
					});
					
					suggestBox.on('mousemove.IPM mouseleave.IPM', '.IPM-ui-linkSuggest-selectable', methods.handleOOUI);
					
					$(window).on('resize.IPM transitionend.IPM', () => {
						if (wrapper.css('display') !== 'none') {
							const caret = IPM.getCaret();
							if (caret) {
								wrapper.css({
									left: caret.x,
									top: caret.y,
								});
							}
						}
					});
				},
				
				matchReplace(str, patterns, rep) {
					for (const pattern of patterns) {
						if (pattern.test(str)) {return str.replace(pattern, rep);}
					}
					return str;
				},
				
				checkMessage() {
					methods.closeSuggestions();
					const caret = IPM.getCaret();
					if (caret && caret.node.parentNode.closest('.ProseMirror') && !caret.node.parentNode.closest('pre')) {
						const rawStr = caret.node.data.slice(0, caret.offset);
						let match;
						if ((match = WIKILINK_REGEX.exec(rawStr))) {
							wrapper.css({
								left: caret.x,
								top: caret.y,
							});
							match[1] = match[1].replace(/^\||\|.*/, ''); // remove pipe character and everything after it, or just the pipe character if it's at the beginning
							let image = false;
							if (match[1].startsWith(':')) {
								image = true;
								match[1] = match[1].replace(':', '');
							}
							search = {
								node: caret.node,
								offsets: [match.index, match[0].length],
								source: 'wiki',
								type: image ? 'image' : 'link',
							};
							return methods.getPages(match[1], true);
						} else if ((match = EXT_LINK_REGEX.exec(rawStr))) {
							search = {
								node: caret.node,
								offsets: [match.index, match[0].length],
								source: 'external',
								type: 'link',
							};
							let url = prompt('Enter URL to create a link to');
							if (URL_REGEX.test(url)) {methods.dispatchLink(url, match[1]);}
							else if (url) {alert('Invalid URL!');}
						}
					}
				},
				
				getPages(prefix, interwikiMode, apiEndpoint, articlePath, offset = 0, retries = 0) {
					while (prefix.startsWith(':')) {
						prefix = prefix.replace(':', '');
					}
					
					if (!prefix) {
						methods.appendMessage(`Search for ${(search.type === 'image' ? 'an image' : 'a page')+(articlePath ? ` at ${articlePath.replace('$1', '...')}` : '...')}`);
						return Promise.resolve();
					}
					
					const api = apiEndpoint ? new mw.ForeignApi(apiEndpoint, {
						parameters: {
							uselang: config.wgUserLanguage,
							errorformat: 'plaintext',
							formatversion: '2',
						},
						anonymous: true,
					}) : localApi;
					
					const onRejected = (code, data) => {
						if (code === 'http') {
							if (data && (data.error || data.errors)) {
								return methods.appendMessage('Bad API response: server sent fake error data.');
							} else if (data && data.textStatus !== 'abort' && !(interwikiMode && apiEndpoint && data.textStatus === 'error')) {
								return api.getErrorMessage(data).each((_, element) => {
									return methods.appendMessage(element.innerText);
								});
							}
						} else if (code === 'internal_api_error_GuzzleHttp\\Exception\\ConnectException' && retries < 3) {
							// Fandom prefixsearch occasionally fails with this error code; we can just retry the request
							return methods.getPages(prefix, false, apiEndpoint, articlePath, offset, retries + 1);
						} else if (data && data.errors instanceof Array) {
							return data.errors.forEach((error) => {
								return methods.appendMessage(`API returned error: ${error && typeof error.text === 'string' ? error.text : 'unknown'}`);
							});
						} else {
							return methods.appendMessage('Bad API response: invalid or missing error data.');
						}
					};
					
					let match = prefix.match(/^(.+?):/);
					if (match && interwikiMode) {
						let newPrefix = prefix.replace(/^.+?:/, '');
						(lastRequest = api.get({
							meta: 'siteinfo',
							siprop: 'interwikimap',
							maxage: '3600',
						})).then((data) => {
							if (!data.query || !data.query.interwikimap) {
								return methods.appendMessage('Bad API response: invalid interwiki map.');
							}
							let interwiki = data.query.interwikimap.find((iw) => iw && typeof iw.prefix === 'string' && iw.prefix.toLowerCase() === match[1].toLowerCase() && typeof iw.url === 'string');
							if (!interwiki) {
								return methods.getPages(prefix, false, apiEndpoint, articlePath);
							}
							
							let wikiUrl;
							try {
								wikiUrl = new URL(interwiki.url);
							} catch (_) {
								return methods.appendMessage(`Invalid interwiki URL "${interwiki.url}".`);
							}
							if (wikiUrl.protocol !== 'http:' && wikiUrl.protocol !== 'https:') {
								return methods.appendMessage(`Unsupported interwiki URL protocol "${wikiUrl.protocol.replace(':', '')}". Only "https" is allowed.`);
							}
							wikiUrl.protocol = 'https:'; // csp upgrades insecure requests so we can't access resources with http anyway
							if (wikiUrl.host.endsWith('.wikia.com')) {
								// update Wikia urls to Fandom ones
								wikiUrl.host = wikiUrl.host.replace(/wikia\.com$/, 'fandom.com');
							} else if (wikiUrl.host === 'mediawiki.org') {
								// mediawiki.org redirects to www.mediawiki.org without cors headers so we have to replace it
								wikiUrl.host = 'www.mediawiki.org';
							} else if (wikiUrl.host === 'semantic-mediawiki.org') {
								// same as above
								wikiUrl.host = 'www.semantic-mediawiki.org';
							}
							
							let apiUrl;
							let altApiUrls = [];
							if (typeof interwiki.api === 'string') {
								// ideally the api url will be provided by the interwiki map
								try {
									apiUrl = new URL(interwiki.api);
								} catch (_) {
									return methods.appendMessage(`Invalid interwiki API URL "${interwiki.api}".`);
								}
								if (wikiUrl.protocol !== 'http:' && wikiUrl.protocol !== 'https:') {
									return methods.appendMessage(`Unsupported interwiki API URL protocol "${wikiUrl.protocol.replace(':', '')}". Only "https" is allowed.`);
								}
								apiUrl.protocol = 'https:';
								if (apiUrl.host.endsWith('.wikia.com')) {
									apiUrl.host = apiUrl.host.replace(/wikia\.com$/, 'fandom.com');
								} else if (apiUrl.host === 'mediawiki.org') {
									apiUrl.host = 'www.mediawiki.org';
								} else if (apiUrl.host === 'semantic-mediawiki.org') {
									apiUrl.host = 'www.semantic-mediawiki.org';
								}
							} else if ((wikiUrl.host === 'community.fandom.com' || wikiUrl.host === 'c.fandom.com') && /^\/+(?:w(?:iki)?\/)?(?:[Ww]::?)?[Cc]::?\$1$/.test(wikiUrl.pathname)) {
								// w:c: syntax
								match = newPrefix.match(/^(.+?):/);
								if (!match) {
									return methods.appendMessage('Find a Fandom community...');
								}
								if (!/^[-0-9a-z]+$/.test(match[1])) {
									return methods.appendMessage(`Invalid community name "${match[1]}". Only letters, numbers, and hyphens are allowed.`);
								}
								newPrefix = newPrefix.replace(/^.+?:/, '');
								wikiUrl = new URL(`https://${match[1]}.fandom.com/wiki/$1`);
								apiUrl = new URL(`https://${match[1]}.fandom.com/api.php`);
							} else if (wikiUrl.host.endsWith('.fandom.com')) {
								// Fandom wikis
								apiUrl = new URL(wikiUrl);
								apiUrl.pathname = methods.matchReplace(apiUrl.pathname, [/\/wiki\/.*/, /.*/], '/api.php');
							} else {
								// we don't know the api url so we'll just try some common ones
								apiUrl = new URL(wikiUrl.origin+methods.matchReplace(wikiUrl.pathname, [/\/wiki\/.*/, /.*/], '/w/api.php'));
								altApiUrls = [
									new URL(wikiUrl.origin+methods.matchReplace(wikiUrl.pathname, [/\/wiki\/.*/, /.*/], '/api.php')),
								];
							}
							
							let attempt = methods.getPages(newPrefix, true, apiUrl.href, wikiUrl.href);
							altApiUrls.forEach((altApiUrl) => {
								attempt = attempt.catch((errCode, errData) => {
									if (errCode === 'http' && !errData.error && !errData.errors && errData.textStatus === 'error') {
										return methods.getPages(newPrefix, true, altApiUrl.href, wikiUrl.href);
									} else {
										return Promise.resolve();
									}
								});
							});
							attempt.catch((errCode, errData) => {
								if (errCode === 'http' && !errData.error && !errData.errors && errData.textStatus === 'error') {
									return methods.appendMessage(`Failed to locate the remote API. Does the interwiki prefix "${match[1]}" correspond to a wiki running MediaWiki software?`);
								}
							});
						}, onRejected);
						return lastRequest;
					} else if (match && search.type === 'image') {
						return methods.getPages(prefix.replace(/^.+?:/, ''), false, apiEndpoint, articlePath);
					} else if (search.type === 'link') {
						(lastRequest = api.get({
							list: 'prefixsearch',
							pssearch: prefix.toWellFormed ? prefix.toWellFormed() : prefix.replace(/\p{Cs}/gu, '\ufffd'), // jshint ignore: line
							pslimit: '6',
							maxage: '60',
						})).then((data) => {
							if (data.query && data.query.prefixsearch instanceof Array && data.query.prefixsearch.length) {
								if (articlePath) {
									methods.appendMessage(articlePath.replace('$1', '...'));
								}
								return methods.buildSuggestions(data.query.prefixsearch, articlePath);
							} else {
								return methods.appendMessage(`No results found for "${prefix}".`);
							}
						}, onRejected);
						return lastRequest;
					} else if (search.type === 'image') {
						(lastRequest = api.get({
							generator: 'prefixsearch',
							gpssearch: prefix.toWellFormed ? prefix.toWellFormed() : prefix.replace(/\p{Cs}/gu, '\ufffd'), // jshint ignore: line
							gpsnamespace: '6',
							gpslimit: '6',
							gpsoffset: offset || undefined,
							prop: 'imageinfo',
							iiprop: 'url|mime',
							maxage: '60',
						})).then((data) => {
							if (data.query && data.query.pages instanceof Array && data.query.pages.length) {
								if (articlePath && !offset) {
									methods.appendMessage(articlePath.replace('$1', '...'));
								}
								methods.buildSuggestions(data.query.pages, articlePath);
								if (resultCount < 6 && data.continue && typeof data.continue.gpsoffset === 'number' && data.continue.gpsoffset < 36) {
									if (data.continue.gpsoffset === offset + data.query.pages.length) {
										return methods.getPages(prefix, false, apiEndpoint, articlePath, data.continue.gpsoffset);
									} else {
										return methods.appendMessage('Bad API response: incorrect continue offset.');
									}
								} else if (!resultCount) {
									return methods.appendMessage(`No image results found for "${prefix}".`);
								}
							} else {
								return methods.appendMessage(`No results found for "${prefix}".`);
							}
						}, onRejected);
						return lastRequest;
					}
				},
				
				appendMessage(msg) {
					const message = $(
						`<div class="oo-ui-widget oo-ui-optionWidget oo-ui-labelElement IPM-ui-linkSuggest-message" tabindex="-1">`+
							`<span class="oo-ui-labelElement-label">${msg}</span>`+
						`</div>`
					);
					suggestBox.append(message);
					wrapper.show();
				},
				
				buildSuggestions(pages, path) {
					for (const page of pages) {
						if (resultCount >= 6) {break;}
						if (page && typeof page.title === 'string' && (search.type !== 'image' || page.imageinfo && page.imageinfo[0] && typeof page.imageinfo[0].mime === 'string' && page.imageinfo[0].mime.startsWith('image/') && typeof page.imageinfo[0].url === 'string')) {
							const suggestion = $(
								`<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-optionWidget oo-ui-labelElement IPM-ui-linkSuggest-selectable IPM-ui-linkSuggest-suggestion" id="IPM-linkSuggest-${++resultCount}" role="option" aria-selected="false" tabindex="-1" data-url="${search.type === 'image' ? page.imageinfo[0].url : path ? path.replace('$1', mw.util.wikiUrlencode(page.title)) : config.wgServer+mw.util.getUrl(page.title)}">`+
									`<span class="oo-ui-labelElement-label">${page.title}</span>`+
								`</div>`
							);
							suggestBox.append(suggestion);
						}
					}
					if (resultCount) {wrapper.show();}
				},
				
				handleOOUI(event) {
					const currentNode = suggestBox.attr('aria-activedescendant') && suggestBox.children('#'+suggestBox.attr('aria-activedescendant')).get(0) || null;
					let newNode;
					switch (event.type) {
						case 'mousemove':
						case 'click':
							newNode = event.target.closest('.IPM-ui-linkSuggest-selectable');
							if (currentNode) {
								currentNode.classList.remove('oo-ui-optionWidget-highlighted');
								currentNode.setAttribute('aria-selected', 'false');
							}
							newNode.classList.add('oo-ui-optionWidget-highlighted');
							newNode.setAttribute('aria-selected', 'true');
							suggestBox.attr('aria-activedescendant', newNode.id);
							break;
						case 'mouseleave':
							if (currentNode) {
								currentNode.classList.remove('oo-ui-optionWidget-highlighted');
								currentNode.setAttribute('aria-selected', 'false');
							}
							suggestBox.removeAttr('aria-activedescendant');
							break;
						case 'keydown':
							switch (event.key) {
								case 'ArrowUp':
									newNode = currentNode && $(currentNode).prevAll('.IPM-ui-linkSuggest-selectable').get(0) || suggestBox.children('.IPM-ui-linkSuggest-selectable').get(-1);
									break;
								case 'ArrowDown':
									newNode = currentNode && $(currentNode).nextAll('.IPM-ui-linkSuggest-selectable').get(0) || suggestBox.children('.IPM-ui-linkSuggest-selectable').get(0);
									break;
								case 'Home':
								case 'PageUp':
									newNode = suggestBox.children('.IPM-ui-linkSuggest-selectable').get(0);
									break;
								case 'End':
								case 'PageDown':
									newNode = suggestBox.children('.IPM-ui-linkSuggest-selectable').get(-1);
							}
							if (newNode) {
								if (currentNode) {
									currentNode.classList.remove('oo-ui-optionWidget-highlighted');
									currentNode.setAttribute('aria-selected', 'false');
								}
								newNode.classList.add('oo-ui-optionWidget-highlighted');
								newNode.setAttribute('aria-selected', 'true');
								suggestBox.attr('aria-activedescendant', newNode.id);
							}
					}
				},
				
				dispatchLink(url, label) {
					let parentNode = search.node.parentNode;
					let searchNode = search.node.splitText(search.offsets[0]);
					searchNode.splitText(search.offsets[1]);
					
					if (search.source === 'wiki') {
						let optionNode = suggestBox.children('#'+suggestBox.attr('aria-activedescendant')).get(0);
						if (!url) {
							url = optionNode.dataset.url;
						}
						if (!label) {
							let match = searchNode.data.match(/\[\[[^\[\]]*?\|([^\[\]]*)\]?\]?$/);
							if (!match) {
								label = optionNode.innerText;
							} else if (!match[1]) {
								// pipe trick
								// https://phabricator.wikimedia.org/source/mediawiki/browse/REL1_43/includes/parser/Parser.php$4671
								
								// [[ns:page (context)|]]
								const p1 = /^(?::?.+:|:|)(.+?)(?: ?[\(\uff08].+[\)\uff09])$/;
								// [[ns:page (context), context|]]
								const p2 = /^(?::?.+:|:|)(.+?)(?: ?\(.+\)|)(?:(?:, |\uff0c|\u060c ).+|)$/;
								
								// try p1 first, to turn "[[A, B (C)|]]" into "[[A, B (C)|A, B]]"
								label = methods.matchReplace(optionNode.innerText, [p1, p2], '$1');
							} else {
								label = match[1];
							}
						}
					}
					
					let linkNode = document.createElement('a');
					linkNode.href = url;
					linkNode.append(label);
					searchNode.replaceWith(linkNode);
					parentNode.normalize();
					
					// normalize element hierarchy to ol/ul > li > p > a > em > strong > span
					while (parentNode.matches('a, em, strong, span')) {
						if (!parentNode.matches('span')) {
							parentNode.childNodes.forEach((node) => {
								if (node === linkNode) {
									if (parentNode.matches('em, strong')) {node = node.firstChild;}
									else if (parentNode.matches('a')) {return;}
								}
								node.parentNode.insertBefore(parentNode.cloneNode(), node).appendChild(node);
							});
						}
						parentNode.before(...parentNode.childNodes);
						let oldParent = parentNode;
						parentNode = parentNode.parentNode;
						oldParent.remove();
					}
					
					getSelection().setPosition(linkNode, linkNode.childNodes.length); // move the caret to the end of the new link node
					parentNode.append('\ufeff'); // add an invisible character so prosemirror doesn't strip the link
					methods.closeSuggestions();
					
					setTimeout(() => {
						// let prosemirror do stuff first
						parentNode.removeChild(parentNode.lastChild.splitText(parentNode.lastChild.length - 1)); // remove the invisible character
					});
				},
				
				insertImage(url) {
					let parentNode = search.node.parentNode;
					let searchNode = search.node.splitText(search.offsets[0]);
					searchNode.splitText(search.offsets[1]);
					let inputNode = parentNode.closest('.rich-text-editor__wrapper').querySelector('#rich-text-editor__image-input');
					
					if (search.source === 'wiki' && !url) {
						url = suggestBox.children('#'+suggestBox.attr('aria-activedescendant')).get(0).dataset.url;
					}
					
					searchNode.remove();
					methods.closeSuggestions();
					
					fetch(url).then((response) => response.blob()).then((blob) => {
						let transfer = new DataTransfer();
						transfer.items.add(new File([blob], url));
						inputNode.files = transfer.files; // put the image in the input element's file list
						inputNode.dispatchEvent(new Event('change', {bubbles: true})); // fire a change event to make Fandom upload and insert the image
					});
				},
				
				closeSuggestions() {
					suggestBox.empty();
					suggestBox.removeAttr('aria-activedescendant');
					wrapper.css({
						left: '',
						top: '',
					});
					wrapper.hide();
					search = {};
					if (lastRequest.abort) {lastRequest.abort();}
					resultCount = 0;
				},
			};
			
			methods.initListeners();
		},
		
		customInsert() {
			// Initialize wrapper
			let wrapper = $(
				'<div class="custom-insert rich-text-editor__toolbar__icon-controls">'+
					'<div class="tool tool-select">'+
						'<a class="label" role="button" tabindex="0" aria-haspopup="menu">Insert</a>'+
						'<div class="menu">'+
							'<div class="options"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			
			// Generate inserts
			let count = 0;
			let sel;
			$('body').on('click', function(e){
				$('.IPM-open').removeClass('IPM-open');
				$(e.target).next('.menu').addClass('IPM-open');
			});
			mw.hook('dev.IPM').add(function(_i) {
				if (!_i || !(Array.isArray(_i) || typeof _i === 'object')) {return;}
				let inserts = Array.isArray(_i) ? _i : [_i];
				let appendList = function(insert, list) {
					if (!(list instanceof jQuery)) {list = $(list);}
					if (
						insert.insert && insert.button &&
						insert.insert.length>0 && insert.button.length>0 &&
						(insert.namespace ? ((Array.isArray(insert.namespace)?insert.namespace:[insert.namespace]).includes(config.wgNamespaceNumber)) : true)
					) {
						count++;
						let button = $('<a class="option" rel="custom-insert-'+count+'" tabindex="0" role="menuitem">'+(insert.button)+'</a>');
						button.on('mousedown', function(event){
							event.preventDefault();
							let temp = {};
							let preparsedInsert = insert.insert
								.replace(/%([\w\s]+)%/g, function(str, type){
									let ret = '';
									ret = (insert[type] && insert[type].length>0) ?
										insert[type] :
										(
											(temp[type] && temp[type].length>0) ?
											temp[type] :
											prompt('What value to replace "'+type+'" with?')
										);
									temp[type] = ret; // avoid asking again in the same insert
									return ret;
								});
								
							IPM.parseInsert(preparsedInsert, insert.replaceAll);
						});
						list.append(button);
					}
					else if (
						insert.nested && insert.button &&
						insert.nested.length>0 && insert.button.length>0
					) {
						count++;
						let toggle = $('<a class="option options-nested" tabindex="0"><span class="label">'+(insert.button)+'</span><div class="menu options-nested-list" tabindex="0"></div></a>');
						list.append(toggle);
						insert.nested.forEach(function(nested_insert){
							appendList(nested_insert, toggle.children('.options-nested-list'));
						});
					}
				};
				// Delay until element exists to run function
				let waitFor = function(query, callback, repeat) {
					if (typeof callback === 'function' && typeof query === 'string') {
						if (document.querySelector(query)) {
							setTimeout(callback, 0);
						}
						if (!document.querySelector(query) || repeat === true) {
							// set up the mutation observer
							let observer = new MutationObserver(function (mutations, me) {
								// mutations is an array of mutations that occurred
								// me is the MutationObserver instance
								let targetNode = document.querySelector(query);
								if (targetNode) {
									setTimeout(callback, 0);
									if (repeat !== true) {
										me.disconnect(); // stop observing
									}
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
				};
				inserts.forEach(function(insert){
					appendList(insert, wrapper.find('.options'));
				});
				if (count>0) {
					$('.IPM-loaded .custom-insert').replaceWith(wrapper.clone(true, true));
					waitFor('.rich-text-editor__wrapper:not(.IPM-loaded)', function() {
						sel = {
							node: $('.rich-text-editor__wrapper:not(.IPM-loaded) .ProseMirror')[0],
							data: '',
							offset: 0
						};
						$('.rich-text-editor__wrapper:not(.IPM-loaded) .rich-text-editor__toolbar__icons-container').prepend(
							wrapper.clone(true, true),
							$('<div class="custom-separator" />')
						);
						$('.rich-text-editor__wrapper:not(.IPM-loaded)').addClass('IPM-loaded');
					}, true);
				}
			});
		},
		
		getCaret() {
			const sel = getSelection();
			if (!sel.rangeCount) {return;}
			const range = sel.getRangeAt(0);
			if (!range.collapsed) {return;}
			if (range.endContainer.nodeType !== Node.TEXT_NODE) {
				// ensure range container is a text node
				if (!range.endOffset) {return;}
				let newContainer = range.endContainer.childNodes[range.endOffset - 1];
				while (newContainer && newContainer.nodeType !== Node.TEXT_NODE) {
					newContainer = newContainer.lastChild;
				}
				if (!newContainer) {return;}
				range.setEnd(newContainer, newContainer.length);
				range.collapse();
			}
			const rect = range.getBoundingClientRect();
			return {
				node: sel.focusNode,
				offset: sel.focusOffset,
				x: rect.x + window.scrollX,
				y: rect.y + window.scrollY,
			};
		},
		
		parseInsert(str, replaceAll) {
			str = str
				.replace(/[\n]+\n\n/g, '\n\n') // max 2 line breaks
				.replace(/(?<!\n[\*\#][^\n]*)\n(?![\*\# ])/g, '<br />'); // transform \n to <br/> for ease of parse
				
			// template expand only works with plain text returns, but thats up to user to use properly
			localApi.parse(str, {
				title: config.wgPageName, // make page name variables work as expected
				contentmodel: 'wikitext', // but don't inherit content model from page
				disablelimitreport: true,
				pst: true,
			}).then(function(txt){
				let e = $(txt);
				if (!e.is('.mw-parser-output')) {e=e.find('.mw-parser-output');}
				// make relative urls absolute so they don't get removed after posting message
				// use wgArticlePath for compatibility with non-english wikis
				e.find('a[href^="'+config.wgArticlePath.replace('$1', '')+'"]').each(function(_, a){
					a.setAttribute('href', config.wgServer + a.getAttribute('href'));
				});
				txt = e.html()
					// handle line breaks into ProseMirror format
					.replace(/<br ?\/?><br ?\/?>/g, '</p><p><br /></p><p>')
					.replace(/<br ?\/?>(?!\s*<\/p>)/g, '</p><p>');
				
				let caret = IPM.getCaret();
				if (!caret || !caret.node.parentNode.closest('.ProseMirror')) {return;}
				
				if (replaceAll) {
					$(caret.node).closest('.ProseMirror').html(txt);
				} else {
					$(caret.node.parentNode).replaceWith($(
						'<p>'+
						caret.node.data.slice(0, caret.offset)+
						txt.replace(/^<p>/, '').replace(/<\/p>$/, '')+
						caret.node.data.slice(caret.offset)+
						'</p>'
					));
				}
			});
		},
	};
	
	return mw.loader.using(['mediawiki.api', 'mediawiki.ForeignApi', 'mediawiki.util', 'oojs-ui-core.styles'], IPM.init);
})();
// </nowiki>
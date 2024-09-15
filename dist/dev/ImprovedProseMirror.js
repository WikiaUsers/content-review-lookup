(function() {
	'use strict';
	// Double load protection
	(window.dev = window.dev || {}).IPM = window.dev.IPM || {};
	if (window.dev.IPM._loaded == true) { return; }
	window.dev.IPM._loaded = true;
	
	var config = mw.config.get(['wgServer', 'wgArticlePath', 'wgNamespaceNumber', 'wgPageName', 'wgAction']);
	var api;
	var IPM = {
		init: function() {
			// Check we're in MessageWall, UserBlog or Main namespace; Check we're in normal view
			if ([1200, 500, 0].includes(config.wgNamespaceNumber) && config.wgAction === 'view') {
				api = new mw.Api();
				
				// Add necessary styles that dont load outside editor screen and custom ones
				importArticle({
					type: 'style',
					article: 'u:dev:MediaWiki:ImprovedProseMirror.css'
				});
				IPM.waitFor('#MessageWall, #articleComments', function() {
					$('#MessageWall, #articleComments').on('mouseout click keyup', '.ProseMirror', IPM.updateSel);
					IPM.linkSuggest();
					IPM.customInsert();
				});
			}
		},
		
		// Adds link suggest functionality to message walls and comment section text editors
		linkSuggest: function() {
			var SEARCH = {};
			var selectCount = 0;
			var resultCount = 0;
			
			// Hidden by default
			var wrapper = $(
				'<div class="IPM-wrapper oo-ui-widget oo-ui-widget-enabled oo-ui-floatableElement-floatable oo-ui-popupWidget-anchored oo-ui-popupWidget IPM-ui-linkSuggest oo-ui-popupWidget-anchored-top" style="display:none;">'+
					'<div class="oo-ui-popupWidget-anchor" style="left:8px;"></div>'+
					'<div class="oo-ui-popupWidget-popup IPM-ui-linkSuggest-popup" style="padding:0;">'+
						'<div class="oo-ui-clippableElement-clippable oo-ui-popupWidget-body IPM-body">'+
							'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget IPM-list" role="listbox" aria-multiselectable="false"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			var suggestBox = wrapper.find('.IPM-list');
			
			// Append wrapper to area
			$('body').append(wrapper);
			
			var methods = {
				initEvents: function() {
					var checkMessageDebounced = mw.util.debounce(methods.checkMessage, 200);
					var observer = new MutationObserver(checkMessageDebounced);
					
					if (document.activeElement.matches('.ProseMirror')) {
						observer.observe(document.activeElement, {
							subtree: true,
							childList: true,
							characterData: true
						});
					}
					
					$('body').on('focus.IPM', '.ProseMirror', function(event) {
						observer.disconnect();
						observer.observe(event.target, {
							subtree: true,
							childList: true,
							characterData: true
						});
					});
					
					$('body').on('click.IPM', function(event) {
						if (event.target.closest('.IPM-ui-linkSuggest-suggestion')) {methods.handleOOUI(event); methods.dispatchLink();}
						else if (event.target.matches('.rich-text-editor__content')) {checkMessageDebounced();}
					});
					
					$('body').on('mousedown.IPM', function(event) {
						if (event.target.closest('.IPM-ui-linkSuggest')) {event.preventDefault();}
						else if (event.target.closest('.ProseMirror')) {checkMessageDebounced();}
						else {methods.closeSuggestions();}
					});
					
					$('body').on('contextmenu.IPM', function(event) {
						if (event.target.closest('.IPM-ui-linkSuggest')) {event.preventDefault();}
					});
					
					document.addEventListener('keydown', function(event) {
						switch (event.key) {
							case 'Enter':
								if (suggestBox.attr('aria-activedescendant')) {
									event.preventDefault();
									methods.dispatchLink();
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
					}, true);
					
					suggestBox.on('mousemove.IPM mouseout.IPM', function(event) {
						if (event.target.closest('.IPM-ui-linkSuggest-suggestion')) {methods.handleOOUI(event);}
					});
					
					$(window).on('resize.IPM transitionend.IPM', function(event) {
						if (wrapper.css('display') !== 'none') {
							var caret = IPM.getCaret();
							wrapper.css({
								top: caret.y,
								left: caret.x
							});
						}
					});
				},
				
				checkMessage: function() {
					var caret;
					var match;
					var raw_str = '';
					var link_str = '';
					var wikilink_regex = /\[\[([^\[\]]*)\]{0,2}$/;
					var ext_link_regex = /\[([^\[\]]+)\]$/;
					methods.closeSuggestions();
					caret = IPM.getCaret();
					if (caret && caret.data && caret.data.focusNode && caret.data.focusNode.nodeValue && caret.data.focusNode.parentNode.closest('.ProseMirror') && !caret.data.focusNode.parentNode.closest('pre')) {
						raw_str = caret.data.focusNode.nodeValue.slice(0, caret.position);
						if (wikilink_regex.test(raw_str)) {
							match = wikilink_regex.exec(raw_str);
							link_str = match[1].replace(/^\||\|[^\[\]]*/, '');
							SEARCH.string = match[0];
							SEARCH.offset = match.index;
							SEARCH.node = caret.data.focusNode;
							methods.getPages(link_str);
							wrapper.css({
								top: caret.y,
								left: caret.x
							});
						} else if (ext_link_regex.test(raw_str)) {
							match = ext_link_regex.exec(raw_str);
							link_str = match[1];
							SEARCH.string = match[0];
							SEARCH.offset = match.index;
							SEARCH.node = caret.data.focusNode;
							var url = prompt('Enter URL to create a link to');
							var url_regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i; // from fandom's DeleteCommentModal.js module
							if (url_regex.test(url)) {
								methods.dispatchLink(link_str, url);
							} else if (url) {
								alert('Invalid URL!');
							}
						}
					}
				},
				
				getPages: function(prefix) {
					var localCount = selectCount;
					if (!prefix) {
						methods.appendInformation('Search for a page...');
						return;
					}
					api.get({
						list: 'prefixsearch',
						pssearch: prefix.toWellFormed(), // avoid URIError
						pslimit: '6',
						maxage: '12',
						errorformat: 'html',
						formatversion: '2'
					}).then(function(data) {
						if (localCount !== selectCount) {return;} // abort if another request was made since making this one
						if (data.query.prefixsearch.length > 0) {
							methods.buildSuggestions(data.query.prefixsearch);
						} else if (data.query.prefixsearch) {
							methods.appendInformation('No results found for "'+prefix+'".');
						}
					}, function(code, data) {
						if (localCount !== selectCount) {return;}
						methods.appendInformation(api.getErrorMessage(data)[0].innerText);
					});
				},
				
				buildSuggestions: function(pages) {
					pages.forEach(function(page) {
						var suggestion = $(
							'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget IPM-ui-linkSuggest-suggestion" aria-selected="false" tabindex="-1" role="option" id="IPM-linkSuggest-'+(++resultCount)+'" data-url="'+config.wgServer+mw.util.getUrl(page.title)+'">'+
								'<span class="oo-ui-labelElement-label">'+page.title+'</span>'+
							'</div>'
						);
						suggestBox.append(suggestion);
					});
					wrapper.show();
				},
				
				appendInformation: function(info) {
					var information = $(
						'<div class="oo-ui-widget oo-ui-labelElement oo-ui-optionWidget IPM-ui-linkSuggest-information" tabindex="-1">'+
							'<span class="oo-ui-labelElement-label">'+info+'</span>'+
						'</div>'
					);
					suggestBox.append(information);
					wrapper.show();
				},
				
				handleOOUI: function(event) {
					var currentNode = suggestBox.attr('aria-activedescendant') && suggestBox.children('#' + suggestBox.attr('aria-activedescendant'))[0] || null;
					var newNode;
					switch (event.type) {
						case 'mousemove':
						case 'click':
							newNode = event.target.closest('.IPM-ui-linkSuggest-suggestion');
							if (currentNode) {
								currentNode.classList.remove('oo-ui-optionWidget-highlighted');
								currentNode.setAttribute('aria-selected', 'false');
							}
							newNode.classList.add('oo-ui-optionWidget-highlighted');
							newNode.setAttribute('aria-selected', 'true');
							suggestBox.attr('aria-activedescendant', newNode.id);
							break;
						case 'mouseout':
							if (currentNode) {
								currentNode.classList.remove('oo-ui-optionWidget-highlighted');
								currentNode.setAttribute('aria-selected', 'false');
							}
							suggestBox.removeAttr('aria-activedescendant');
							break;
						case 'keydown':
							switch (event.key) {
								case 'ArrowUp':
									newNode = currentNode && $(currentNode).prevAll('.IPM-ui-linkSuggest-suggestion').get(0) || suggestBox.children('.IPM-ui-linkSuggest-suggestion').get(-1);
									break;
								case 'ArrowDown':
									newNode = currentNode && $(currentNode).nextAll('.IPM-ui-linkSuggest-suggestion').get(0) || suggestBox.children('.IPM-ui-linkSuggest-suggestion').get(0);
									break;
								case 'Home':
								case 'PageUp':
									newNode = suggestBox.children('.IPM-ui-linkSuggest-suggestion').get(0);
									break;
								case 'End':
								case 'PageDown':
									newNode = suggestBox.children('.IPM-ui-linkSuggest-suggestion').get(-1);
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
				
				dispatchLink: function(label, url) {
					var optionNode = suggestBox.attr('aria-activedescendant') && suggestBox.children('#' + suggestBox.attr('aria-activedescendant'))[0] || null;
					var parentNode = SEARCH.node.parentNode;
					var searchNode = SEARCH.node.splitText(SEARCH.offset);
					searchNode.splitText(SEARCH.string.length);
					var linkNode = document.createElement('a');
					if (!label) {
						var match = /\[\[[^\[\]]*?\|([^\[\]]*)\]{0,2}$/.exec(SEARCH.string);
						if (!match) {
							label = optionNode.innerText;
						} else if (match && !match[1]) {
							// pipe trick
							// https://phabricator.wikimedia.org/source/mediawiki/browse/REL1_39/includes/parser/Parser.php$4655
							
							// <nowiki>[[ns:page (context)|]]</nowiki>
							var p1 = /^(?::?.+:|:|)(.+?)(?: ?[\(\uff08].+[\)\uff09])$/;
							// <nowiki>[[ns:page (context), context|]]</nowiki>
							var p2 = /^(?::?.+:|:|)(.+?)(?: ?\(.+\)|)(?:(?:, |\uff0c|\u060c ).+|)$/;
							
							// <nowiki>try p1 first, to turn "[[A, B (C)|]]" into "[[A, B (C)|A, B]]"</nowiki>
							label = optionNode.innerText.replace(p1, '$1');
							if (label === optionNode.innerText) {
								label = optionNode.innerText.replace(p2, '$1');
							}
						} else {
							label = match[1];
						}
					}
					if (!url) {
						url = optionNode.dataset.url;
					}
					linkNode.href = url;
					linkNode.append(label);
					searchNode.replaceWith(linkNode);
					parentNode.normalize();
					var surroundWithParent = function(node) {
						if (node === linkNode && parentNode.matches('a') || parentNode.matches('span')) {return;}
						if (node === linkNode && parentNode.matches('em, strong')) {node = node.firstChild;}
						node.parentNode.insertBefore(parentNode.cloneNode(), node).appendChild(node);
					};
					var oldNode;
					// split parent elements among children
					while (parentNode.matches('a, em, strong, span')) {
						parentNode.childNodes.forEach(surroundWithParent);
						parentNode.before.apply(parentNode, parentNode.childNodes);
						oldNode = parentNode;
						parentNode = parentNode.parentNode;
						oldNode.remove();
					}
					parentNode.append('\ufeff'); // add invisible character so prosemirror doesn't strip the link
					parentNode.normalize();
					window.getSelection().setPosition(linkNode, linkNode.childNodes.length); // move caret to the end of the new link node
					methods.closeSuggestions();
					
					setTimeout(function() {
						// async to let prosemirror do stuff first
						parentNode.removeChild(parentNode.lastChild.splitText(parentNode.lastChild.length - 1)); // remove invisible character
					});
				},
				
				closeSuggestions: function() {
					// Close suggestion list
					suggestBox.empty();
					suggestBox.removeAttr('aria-activedescendant');
					wrapper.css({
						top: '',
						left: ''
					});
					wrapper.hide();
					SEARCH = {};
					++selectCount;
				}
			};
			
			methods.initEvents();
		},
		
		// TODO:
		/// usage in lists?
		/// avoid unwanted line break upon insert?
		/// allow images?
		/* currently too unstable
		wikiTemplate: function() {
			var SEARCH = {};
			var methods = {
				initEvents: function() {
					// Start looking
					$('#MessageWall, #articleComments').on('mouseout click keyup', '.ProseMirror', function(event) {
						if (event.target.closest('.ProseMirror')) {methods.checkTemplate(event);}
					});
				},
				
				expandTemplate: function() {
					var newNode = SEARCH.node.splitText(SEARCH.offset);
					var parentNode = SEARCH.node.parentNode;
					var keepText = newNode.splitText(SEARCH.str.length) || '';
					parentNode.append(' '); // need to add some text so that the link doesnt get stripped bc prosemirror is cancer to modify
					IPM.parseInsert(SEARCH.str);
					newNode.replaceWith(keepText);
				},
				
				checkTemplate: function(event) {
					var caret;
					var template_regex = /^.*(\{\{[^\{\}]+\}\})/;
					var url_regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i; // from https://dev.fandom.com/load.php?modules=DeleteCommentModal-voLa7ynP.js
					var raw_str = '';
					while (true) {
						caret = IPM.getCaret(event.target);
						if (caret && caret.data && caret.data.focusNode) {
							break;
						}
					}
					
					if (
						caret && caret.data && caret.data.focusNode &&
						caret.data.focusNode.nodeValue && template_regex.test(caret.data.focusNode.nodeValue)
					) {
						raw_str = caret.data.focusNode.nodeValue;
						SEARCH.str = template_regex.exec(raw_str.slice(0, caret.position))[1];
						SEARCH.offset = raw_str.indexOf(SEARCH.str);
						SEARCH.node = caret.data.focusNode;
						if (
							(caret.data.type == 'Caret' && caret.position > 0 && raw_str.length > 0) ||
							(caret.data.type == 'Range')
						) {
							methods.expandTemplate();
						}
					}
				},
			};
			
			methods.initEvents();
		},
		*/
		
		customInsert: function() {
			// Initialize wrapper
			var wrapper = $(
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
			var count = 0;
			var sel;
			$('body').on('click', function(e){
				$('.IPM-open').removeClass('IPM-open');
				$(e.target).next('.menu').addClass('IPM-open');
			});
			mw.hook('dev.IPM').add(function(_i) {
				if (!_i || !(Array.isArray(_i) || typeof _i == 'object')) {return;}
				var inserts = Array.isArray(_i) ? _i : [_i];
				var appendList = function(insert, list) {
					if (!(list instanceof jQuery)) {list = $(list);}
					if (
						insert.insert && insert.button &&
						insert.insert.length>0 && insert.button.length>0 &&
						(insert.namespace ? ((Array.isArray(insert.namespace)?insert.namespace:[insert.namespace]).includes(config.wgNamespaceNumber)) : true)
					) {
						count++;
						var button = $('<a class="option" rel="custom-insert-'+count+'" tabindex="0" role="menuitem">'+(insert.button)+'</a>');
						button.on('mousedown', function(event){
							event.preventDefault();
							var temp = {};
							var preparsedInsert = insert.insert
								.replace(/%([\w\s]+)%/g, function(str, type){
									var ret = '';
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
						var toggle = $('<a class="option options-nested" tabindex="0"><span class="label">'+(insert.button)+'</span><div class="menu options-nested-list" tabindex="0"></div></a>');
						list.append(toggle);
						insert.nested.forEach(function(nested_insert){
							appendList(nested_insert, toggle.children('.options-nested-list'));
						});
					}
				};
				inserts.forEach(function(insert){
					appendList(insert, wrapper.find('.options'));
				});
				if (count>0) {
					$('.IPM-loaded .custom-insert').replaceWith(wrapper.clone(true, true));
					IPM.waitFor('.rich-text-editor__wrapper:not(.IPM-loaded)', function() {
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
		
		getCaret: function() {
			var cSel = window.getSelection();
			var caretRect;
			var caretOffset = 0;
			if (cSel && cSel.rangeCount > 0) {
				var range = cSel.getRangeAt(0);
				if (range.collapsed && range.endContainer.nodeType !== 3 && range.endOffset > 0) {
					// ensure range container is a text node
					var newContainer = range.endContainer.childNodes[range.endOffset - 1];
					while (newContainer && newContainer.nodeType !== 3) {
						newContainer = newContainer.lastChild;
					}
					range.setEnd(newContainer, newContainer.length);
					range.collapse();
				}
				caretRect = range.getBoundingClientRect();
				var preCaretRange = range.cloneRange();
				preCaretRange.setStart(range.startContainer, 0);
				caretOffset = preCaretRange.toString().length;
				return {
					data: cSel,
					x: parseInt(caretRect.x + window.scrollX - 8),
					y: parseInt(caretRect.y + window.scrollY + 8),
					position: caretOffset
				};
			}
		},
		
		parseInsert: function(str, replaceAll) {
			str = str
				.replace(/[\n]+\n\n/g, '\n\n') // max 2 line breaks
				.replace(/(?<!\n[\*\#][^\n]*)\n(?![\*\# ])/g, '<br />'); // transform \n to <br/> for ease of parse
				
			// template expand only works with plain text returns, but thats up to user to use properly
			api.parse(str, {
				title:config.wgPageName, // make page name variables work as expected
				contentmodel:'wikitext', // but don't inherit content model from page
				disablelimitreport:true,
				pst:true
			}).then(function(txt){
				var e = $(txt);
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
					
				if (replaceAll) {
					$(IPM.sel.node).closest('.ProseMirror').html(txt);
				} else {
					$(
						IPM.sel.node.nodeType === 3 ?
						IPM.sel.node.parentNode :
						IPM.sel.node
					).replaceWith($(
						'<p>'+
						IPM.sel.data.slice(0, IPM.sel.offset)+
						txt.replace(/^<p>|<\/p>$/, '')+
						IPM.sel.data.slice(IPM.sel.offset)+
						'</p>'
					));
				}
			});
		},
		
		updateSel: function(e) {
			var a = window.getSelection();
			if (a.focusNode && $(a.focusNode.parentNode).closest('.ProseMirror').length>0) {
				IPM.sel = {
					node: a.focusNode,
					data: a.focusNode.data || '',
					offset: a.focusOffset || 0
				};
			}
		},
		
		// Delay until element exists to run function
		waitFor: function(query, callback, repeat) {
			if (('function' == typeof callback) && ('string' == typeof query)) {
				if (document.querySelector(query)) {
					setTimeout(callback, 0);
				}
				if (!document.querySelector(query)||repeat===true){
					// set up the mutation observer
					var observer = new MutationObserver(function (mutations, me) {
						// mutations is an array of mutations that occurred
						// me is the MutationObserver instance
						var targetNode = document.querySelector(query);
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
		}
	};
	
	mw.loader.using(['mediawiki.api', 'mediawiki.util', 'oojs-ui-core.styles']).then(IPM.init);
})();
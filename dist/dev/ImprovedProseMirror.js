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
			if ([1200, 500, 0].includes(config.wgNamespaceNumber) && config.wgAction == 'view') {
				api = new mw.Api();
				// Add necessary styles that dont load outside editor screen and custom ones
				importArticle({
					type: 'style',
					article: 'u:dev:MediaWiki:ImprovedProseMirror.css'
				});
				IPM.waitFor('#MessageWall, #articleComments', function() {
					$('#MessageWall, #articleComments').on('mouseout click keyup', '.ProseMirror', IPM.updateSel);
					IPM.wikiLinks();
					IPM.wikiTemplate();
					IPM.customInsert();
				});
			}
		},
		
		// Adds link suggest functionality to message walls and comment section text editors
		wikiLinks: function() {
			var ooui = 0;
			var SEARCH = {};
			var linkSuggestOpen = false;
			
			// Hidden by default
			var wrapper = $(
				'<div class="IPM-wrapper oo-ui-widget oo-ui-widget-enabled oo-ui-floatableElement-floatable oo-ui-popupWidget-anchored oo-ui-popupWidget IPM-ui-linkSuggest oo-ui-popupWidget-anchored-top" style="display:none;">'+
					'<div class="oo-ui-popupWidget-anchor" style="left:8px;"></div>'+
					'<div class="oo-ui-popupWidget-popup IPM-ui-linkSuggest-popup" style="padding:0;">'+
						'<div class="oo-ui-clippableElement-clippable oo-ui-popupWidget-body IPM-body">'+
							'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget oo-ui-selectWidget-unpressed IPM-list" role="listbox" aria-multiselectable="false"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			var suggestBox = wrapper.find('.IPM-list');
			var scrollBox = wrapper.find('.IPM-body');
			
			// Append wrapper to area
			$('body').append(wrapper);
			
			var methods = {
				initEvents: function() {
					var limitSuggest = mw.util.debounce(methods.suggestLink, 200);
					
					// Hide and empty out when unfocusing list
					document.addEventListener('click', function(event) {
						if (!event.target.closest('.IPM-ui-linkSuggest')) {
							suggestBox.empty();
							suggestBox.removeAttr('aria-activedescendant');
							scrollBox.scrollTop(0);
							wrapper.hide();
							linkSuggestOpen = false;
						}
					});
					
					// Suggestion list hovering logic
					suggestBox.on('mouseover.IPM', function(event) {
						if (event.target.closest('.IPM-ui-linkSuggest-suggestion')) {methods.handleOOUI(event);}
					});
					
					// Start looking
					document.addEventListener('mouseup', function(event) {
						if (event.target.closest('.IPM-ui-linkSuggest-suggestion')) {methods.dispatchLink();}
						else if (event.target.closest('.ProseMirror')) {limitSuggest();}
					});
					
					document.addEventListener('keydown', function(event) {
						if (linkSuggestOpen) {
							switch (event.key) {
								case 'Enter':
									if (suggestBox.attr('aria-activedescendant')) {
										event.preventDefault();
										methods.dispatchLink();
									} else {
										suggestBox.empty();
										suggestBox.removeAttr('aria-activedescendant');
										scrollBox.scrollTop(0);
										wrapper.hide();
										linkSuggestOpen = false;
									}
									break;
								case 'Escape':
									suggestBox.empty();
									suggestBox.removeAttr('aria-activedescendant');
									scrollBox.scrollTop(0);
									wrapper.hide();
									linkSuggestOpen = false;
									break;
								case 'ArrowDown':
								case 'ArrowUp':
								case 'Home':
								case 'End':
									event.preventDefault();
									methods.handleOOUI(event);
									break;
								case 'ArrowLeft':
								case 'ArrowRight':
									limitSuggest();
								}
						} else {
							switch (event.key) {
								case 'ArrowLeft':
								case 'ArrowRight':
									limitSuggest();
							}
						}
					}, true);
					
					$('#MessageWall, #articleComments').on('input.IPM', '.ProseMirror', function(event) {
						limitSuggest();
					});
					
					window.addEventListener('resize', function(event) {
						if (linkSuggestOpen) {
							var caret = IPM.getCaret();
							// TODO: account for @media styles messing with page layout after caret coordinates are recalculated
							wrapper.css({
								top: caret.y,
								left: caret.x
							});
						}
					});
				},
				
				dispatchLink: function(label, url) {
					var clickedNode = suggestBox.find('#'+(suggestBox.attr('aria-activedescendant')||'NOTHINGNESS'))[0];
					var linkNode = document.createElement('a');
					var newNode = SEARCH.node.splitText(SEARCH.offset);
					var parentNode = SEARCH.node.parentNode;
					newNode.splitText(SEARCH.str.length);
					if (label && url) {
						linkNode.href = url;
						linkNode.append(label);
					} else if (clickedNode) {
						linkNode.href = clickedNode.getAttribute('link-to');
						label = /^[^\|]*\|([\s\S]+?)(\]\]|$)/.exec(SEARCH.str);
						linkNode.append((label && label[1]) || document.createTextNode(clickedNode.children[0].innerHTML));
					}
					parentNode.append(' '); // need to add some text so that the link doesnt get stripped bc prosemirror is cancer to modify
					parentNode.insertBefore(linkNode, SEARCH.node.nextSibling);
					newNode.remove(); // Remove original link text used for search
					
					// Close suggestion list
					suggestBox.empty();
					suggestBox.removeAttr('aria-activedescendant');
					scrollBox.scrollTop(0);
					wrapper.hide();
					linkSuggestOpen = false;
				},
				
				handleOOUI: function(event) {
					var currentNode = suggestBox.find('#' + suggestBox.attr('aria-activedescendant'))[0];
					var newNode;
					if (event.type == 'mouseover') {
						newNode = event.target.closest('.IPM-ui-linkSuggest-suggestion');
						if (currentNode) {
							currentNode.classList.remove('oo-ui-optionWidget-highlighted');
							currentNode.setAttribute('aria-selected', false);
						}
						newNode.classList.add('oo-ui-optionWidget-highlighted');
						newNode.setAttribute('aria-selected', true);
						suggestBox.attr('aria-activedescendant', newNode.id);
					} else if (event.type == 'keydown') {
						switch (event.key) {
							case 'ArrowDown':
								newNode = currentNode && currentNode.nextSibling || suggestBox[0].firstChild;
								break;
							case 'ArrowUp':
								newNode = currentNode && currentNode.previousSibling || suggestBox[0].lastChild;
								break;
							case 'Home':
								newNode = suggestBox[0].firstChild;
								break;
							case 'End':
								newNode = suggestBox[0].lastChild;
								break;
							default:
								return;
						}
						if (currentNode) {
							currentNode.classList.remove('oo-ui-optionWidget-highlighted');
							currentNode.setAttribute('aria-selected', false);
						}
						newNode.classList.add('oo-ui-optionWidget-highlighted');
						newNode.setAttribute('aria-selected', true);
						suggestBox.attr('aria-activedescendant', newNode.id);
						
						// Scroll selected option into view
						var box = scrollBox[0];
						// Don't scroll if new node is already fully visible
						if (newNode.offsetTop < box.scrollTop || newNode.offsetTop + newNode.clientHeight > box.scrollTop + box.clientHeight) {
							box.scrollTop = newNode.offsetTop < (currentNode ? currentNode.offsetTop : 0) ? newNode.offsetTop : newNode.offsetTop + newNode.clientHeight - box.clientHeight;
						}
					}
				},
				
				suggestLink: function() {
					var caret;
					var matches;
					var raw_str = '';
					var link_str = '';
					var link_regex = /^.*(\[\[)([^\[\]]*)(\]{0,2})$/;
					var ext_link_regex = /^.*(\[)([^\[\]]+)(\])$/;
					var url_regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i; // from /load.php?modules=DeleteCommentModal-xxxxxxxx.js
					caret = IPM.getCaret();
					if (caret && caret.data && caret.data.focusNode && caret.data.focusNode.nodeValue) {
						raw_str = caret.data.focusNode.nodeValue.slice(0, caret.position);
						if (link_regex.test(raw_str)) {
							matches = link_regex.exec(raw_str);
							matches.shift();
							link_str = matches[1].replace(/\|.*/, '');
							SEARCH.str = matches.join('');
							SEARCH.offset = raw_str.indexOf(SEARCH.str);
							SEARCH.node = caret.data.focusNode;
							methods.getPages(link_str);
							wrapper.css({
								top: caret.y,
								left: caret.x
							});
						} else if (ext_link_regex.test(raw_str)) {
							matches = ext_link_regex.exec(raw_str);
							matches.shift();
							link_str = matches[1];
							SEARCH.str = matches.join('');
							SEARCH.offset = raw_str.indexOf(SEARCH.str);
							SEARCH.node = caret.data.focusNode;
							var url = prompt('Enter URL to create a link to');
							if (url_regex.test(url)) {
								methods.dispatchLink(link_str, url);
							} else if (url) {
								alert('Invalid URL!');
							}
						} else if (linkSuggestOpen) {
							suggestBox.empty();
							suggestBox.removeAttr('aria-activedescendant');
							scrollBox.scrollTop(0);
							wrapper.hide();
							linkSuggestOpen = false;
						}
					} else if (linkSuggestOpen) {
						suggestBox.empty();
						suggestBox.removeAttr('aria-activedescendant');
						scrollBox.scrollTop(0);
						wrapper.hide();
						linkSuggestOpen = false;
					}
				},
				
				getPages: function(prefix) {
					if (!prefix) {
						methods.appendMessage('Search for a page...');
						return;
					}
					api.get({
						action: 'query',
						list: 'prefixsearch',
						pssearch: prefix
					}).then(function(data) {
						if (data && data.query && data.query.prefixsearch && data.query.prefixsearch.length > 0) {
							methods.buildSuggestions(data.query.prefixsearch);
						} else if (data && data.query && data.query.prefixsearch) {
							methods.appendMessage('No results found for "'+prefix+'".');
						}
					}, function(data) {
						methods.appendMessage('An error occurred: '+data);
					});
				},
				
				buildSuggestions: function(pages) {
					if (linkSuggestOpen) {
						suggestBox.empty();
						suggestBox.removeAttr('aria-activedescendant');
						scrollBox.scrollTop(0);
						wrapper.hide();
					}
					
					// Build list
					pages.forEach(
						function(page){
							ooui++;
							var option = $(
								'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget IPM-ui-linkSuggest-suggestion" aria-selected="false" tabindex="-1" role="option" id="ooui-'+ooui+'" link-to="'+config.wgServer+mw.util.getUrl(page.title)+'">'+
									'<span class="oo-ui-labelElement-label">'+page.title+'</span>'+
								'</div>'
							);
							suggestBox.append(option);
						}
					);
					document.querySelector('.ProseMirror-focused').focus();
					wrapper.show();
					linkSuggestOpen = true;
				},
				
				appendMessage: function(message) {
					if (linkSuggestOpen) {
						suggestBox.empty();
						suggestBox.removeAttr('aria-activedescendant');
						scrollBox.scrollTop(0);
						wrapper.hide();
					}
					
					// Add message
					var msg = $(
						'<div class="oo-ui-widget oo-ui-labelElement oo-ui-optionWidget" tabindex="-1">'+
							'<span class="oo-ui-labelElement-label" style="white-space:pre-wrap;font-style:italic;">'+message+'</span>'+
						'</div>'
					);
					suggestBox.append(msg);
					document.querySelector('.ProseMirror-focused').focus();
					wrapper.show();
					linkSuggestOpen = true;
				}
			};
			
			methods.initEvents();
		},
		
		// TODO:
		/// usage in lists?
		/// avoid unwanted line break upon insert?
		/// allow images?
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
					IPM.parsedInsert(SEARCH.str);
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
								
							IPM.parsedInsert(preparsedInsert, insert.replaceAll);
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
		
		getCaret: function(element) {
			var cSel = window.getSelection();
					var caretRect;
					var caretOffset = 0;
					if (cSel && cSel.rangeCount > 0) {
						var range = cSel.getRangeAt(0);
						caretRect = range.getBoundingClientRect();
						var preCaretRange = range.cloneRange();
						preCaretRange.setStart(range.startContainer, 0);
						caretOffset = preCaretRange.toString().length;
					}
					return {
						data: cSel,
						x: parseInt(caretRect.x + window.scrollX - 8),
						y: parseInt(caretRect.y + window.scrollY + 8),
						position: caretOffset
					};
		},
		
		parsedInsert: function(str, replaceAll) {
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
(function() {
	
	// Double load protection
	(window.dev = window.dev || {}).IPM = window.dev.IPM || {};
	if (window.dev.IPM._loaded == true) { return; }
	window.dev.IPM._loaded = true;
	
	var config = mw.config.get(['wgServer', 'wgArticlePath', 'wgNamespaceNumber', 'wgPageName', 'wgAction']);
	var api;
	var betterLinkSuggest = {
		
		init: function() {
			// Check we're in MessageWall or Main namespace
			if (config.wgNamespaceNumber == 1200 || (config.wgNamespaceNumber == 0 && config.wgAction == 'view')) {
				api = new mw.Api();
				// Add necessary styles that dont load outside editor screen and custom ones
				importArticle({
					type: 'style',
					article: 'u:dev:MediaWiki:ImprovedProseMirror.css'
				});
				betterLinkSuggest.waitFor('#MessageWall, #articleComments', function() {
					betterLinkSuggest.wikiLinks();
					betterLinkSuggest.customInsert();
				});
			}
		},
		
		// Adds link suggest functionality to message walls and comment section text editors
		wikiLinks: function() {
			var ooui = 0;
			var SEARCH = {};
			
			// Hidden by default
			var wrapper = $(
				'<div class="IPM-wrapper oo-ui-widget oo-ui-widget-enabled oo-ui-floatableElement-floatable oo-ui-popupWidget-anchored oo-ui-popupWidget wikiEditor-ui-linkSuggest oo-ui-popupWidget-anchored-top" style="display:none;">'+
					'<div class="oo-ui-popupWidget-anchor" style="left: 7px;"></div>'+
					'<div class="oo-ui-popupWidget-popup wikiEditor-ui-linkSuggest-popup" style="padding:0;">'+
						'<div class="oo-ui-clippableElement-clippable oo-ui-popupWidget-body IPM-body">'+
							'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget oo-ui-selectWidget-unpressed IPM-list" role="listbox" aria-multiselectable="false"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			var suggestBox = wrapper.find('.IPM-list');
			
			// Append wrapper to area
			$('body').prepend(wrapper);
			
			var methods = {
				SEARCH: {},
				initEvents: function() {
					// Hide and empty out when unfocusing list
					document.addEventListener('click', function(event) {
						if (!event.target.closest('.wikiEditor-ui-linkSuggest')) {
							wrapper.hide();
							suggestBox.empty();
							suggestBox.removeAttr('aria-activedescendant');
						}
					});
					
					// Suggestion list hovering logic
					suggestBox.on('mouseover.IPM', function(event) {
						if (event.target.closest('.wikiEditor-ui-linkSuggest-suggestion')) {methods.handleOOUI(event);}
					});
					suggestBox.on('mouseout.IPM', function(event) {
						if (event.target.closest('.wikiEditor-ui-linkSuggest-suggestion')) {
							event.target.closest('.wikiEditor-ui-linkSuggest-suggestion').classList.remove('oo-ui-optionWidget-highlighted');
							event.target.closest('.wikiEditor-ui-linkSuggest-suggestion').setAttribute('aria-selected', false);
						}
					});
					
					// Start looking
					document.addEventListener('mouseup', function(event) {
						if (event.target.closest('.wikiEditor-ui-linkSuggest-suggestion')) {methods.dispatchLink();}
						else if (event.target.closest('.ProseMirror')) {methods.suggestLink(event);}
					});
					document.addEventListener('keydown', function(event) {
						if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) && document.querySelector('.IPM-list > div')) {
							if (wrapper.css('display') == 'none') {
								methods.suggestLink(event);
							} else if (wrapper.css('display') !== 'none' && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
								wrapper.hide();
								suggestBox.empty();
								suggestBox.removeAttr('aria-activedescendant');
								methods.suggestLink(event);
							} else if (wrapper.css('display') !== 'none' && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
								event.preventDefault();
								methods.handleOOUI(event);
							}
						} else if (event.key == 'Enter' && document.querySelector('.IPM-list > div') && suggestBox.attr('aria-activedescendant')) {
							event.preventDefault();
							methods.dispatchLink();
						} else if (event.key == 'Escape' && document.querySelector('.IPM-list > div')) {
							wrapper.hide();
							suggestBox.empty();
							suggestBox.removeAttr('aria-activedescendant');
						}
					});
				},
				
				dispatchLink: function(label, url) {
					var clickedNode = suggestBox.find('#'+(suggestBox.attr('aria-activedescendant')||'NOTHINGNESS'))[0];
					var linkNode = document.createElement('a');
					var newNode = methods.SEARCH.node.splitText(methods.SEARCH.offset);
					var parentNode = methods.SEARCH.node.parentNode;
					newNode.splitText(methods.SEARCH.str.length);
					if (label && url) {
						linkNode.href = url;
						linkNode.append(label);
					} else if (clickedNode) {
						linkNode.href = clickedNode.getAttribute('link-to');
						label = /^[^\|]*\|([\s\S]+?)(\]\]|$)/.exec(methods.SEARCH.str);
						linkNode.append((label && label[1]) || document.createTextNode(clickedNode.children[0].innerHTML));
					}
					parentNode.append(' '); // need to add some text so that the link doesnt get stripped bc prosemirror is cancer to modify
					parentNode.insertBefore(linkNode, methods.SEARCH.node.nextSibling);
					newNode.remove(); // Remove original link text used for search
					
					// Close suggestion list
					wrapper.hide();
					suggestBox.empty();
					suggestBox.removeAttr('aria-activedescendant');
				},
			
				handleOOUI: function(event) {
					var currentNode = suggestBox.find('#' + suggestBox.attr('aria-activedescendant'))[0];
					var newNode;
					if (event.type == 'mouseover') {
						newNode = event.target.closest('.wikiEditor-ui-linkSuggest-suggestion');
						if (currentNode) {
							currentNode.classList.remove('oo-ui-optionWidget-highlighted');
							currentNode.setAttribute('aria-selected', false);
						}
						newNode.classList.add('oo-ui-optionWidget-highlighted');
						newNode.setAttribute('aria-selected', true);
						suggestBox.attr('aria-activedescendant', newNode.id);
					} else if (event.type == 'keydown') {
						if (event.key == 'ArrowDown') {
							newNode = currentNode ? currentNode.nextSibling ? currentNode.nextSibling : suggestBox[0].firstChild : suggestBox[0].firstChild;
						} else if (event.key == 'ArrowUp') {
							newNode = currentNode ? currentNode.previousSibling ? currentNode.previousSibling : suggestBox[0].lastChild : suggestBox[0].lastChild;
						} else if (event.key == 'Home') {
							newNode = suggestBox[0].firstChild;
						} else if (event.key == 'End') {
							newNode = suggestBox[0].lastChild;
						}
						if (currentNode) {
							currentNode.classList.remove('oo-ui-optionWidget-highlighted');
							currentNode.setAttribute('aria-selected', false);
						}
						newNode.classList.add('oo-ui-optionWidget-highlighted');
						newNode.setAttribute('aria-selected', true);
						suggestBox.attr('aria-activedescendant', newNode.id);
						var box = wrapper.find('.IPM-body')[0];
						var scrollChange = 0;
						if (box.clientHeight < (newNode.offsetTop + newNode.clientHeight)) {scrollChange = newNode.clientHeight;}
						else if (box.scrollTop > newNode.offsetTop) {scrollChange = -currentNode.clientHeight;}
						box.scrollTop += scrollChange;
					}
				},
				
				suggestLink: function(event) {
					var caret;
					var link_regex = /^.*(\[\[)([^\[\]]+)(\]\]|$)/;
					var ext_link_regex = /^.*(\[)([^\[\]]+)(\])$/;
					var url_regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i; // from https://dev.fandom.com/load.php?modules=DeleteCommentModal-voLa7ynP.js
					var raw_str = '';
					var link_str = '';
					var matches;
					while (true) {
						caret = methods.getCaret(event.target);
						if ( caret && caret.data && caret.data.focusNode ) {
							break;
						}
					}
					
					if ( caret && caret.data && caret.data.focusNode && caret.data.focusNode.nodeValue ) {
						if (link_regex.test(caret.data.focusNode.nodeValue)) {
							raw_str = caret.data.focusNode.nodeValue;
							matches = link_regex.exec(raw_str.slice(0, caret.position));
							matches.shift();
							link_str = matches[1].replace(/^(.*)\|.*$/, '$1');
							methods.SEARCH.str = matches.join('');
							methods.SEARCH.offset = raw_str.indexOf(methods.SEARCH.str);
							methods.SEARCH.node = caret.data.focusNode;
							if (caret.data.type == 'Caret' && caret.position > 0 && link_str.length > 0 && raw_str.length > link_str.length) {
								methods.getPages(link_str);
								document.querySelector('.wikiEditor-ui-linkSuggest').style.top = (event.pageY) + 'px';
								document.querySelector('.wikiEditor-ui-linkSuggest').style.left = (event.pageX-12) + 'px';
							} else if (caret.data.type == 'Range') {
								methods.getPages(link_str);
								document.querySelector('.wikiEditor-ui-linkSuggest').style.top = (event.pageY) + 'px';
								document.querySelector('.wikiEditor-ui-linkSuggest').style.left = (event.pageX-12) + 'px';
							}
						} else if (ext_link_regex.test(caret.data.focusNode.nodeValue.slice(0, caret.position))) {
							raw_str = caret.data.focusNode.nodeValue.slice(0, caret.position);
							matches = ext_link_regex.exec(raw_str.slice(0, caret.position));
							methods.SEARCH.str = matches[1]+matches[2]+matches[3];
							methods.SEARCH.offset = raw_str.indexOf(methods.SEARCH.str);
							methods.SEARCH.node = caret.data.focusNode;
							var url = prompt('Insert external URL to link to');
							if (url_regex.test(url)) {
								methods.dispatchLink(matches[2], url);
							} else if (url && url.length>0) {
								alert('Invalid URL!');
							}
						}
					}
				},
				
				getCaret: function(element) {
					var caretOffset = 0;
					var doc = element.ownerDocument || element.document;
					var win = doc.defaultView || doc.parentWindow;
					var sel;
					if (typeof win.getSelection != "undefined") {
						sel = win.getSelection();
						if (sel.rangeCount > 0) {
							var range = win.getSelection().getRangeAt(0);
							var preCaretRange = range.cloneRange();
							preCaretRange.selectNodeContents(element);
							preCaretRange.setEnd(range.endContainer, range.endOffset);
							caretOffset = preCaretRange.toString().length;
						}
					} else if ( (sel = doc.selection) && sel.type != "Control") {
						var textRange = sel.createRange();
						var preCaretTextRange = doc.body.createTextRange();
						preCaretTextRange.moveToElementText(element);
						preCaretTextRange.setEndPoint("EndToEnd", textRange);
						caretOffset = preCaretTextRange.text.length;
					}
					
					return {
						data: sel,
						position: caretOffset
					};
				},
				
				getPages: function(prefix) {
					api.get({
						action: 'query',
						list: 'prefixsearch',
						pssearch: prefix
					}).then(function(data) {
						if (data && data.query && data.query.prefixsearch.length > 0) {
							console.log(data.query.prefixsearch);
							methods.buildSuggestions(data.query.prefixsearch);
						}
					});
				},
				
				buildSuggestions: function(pages) {
					// Build list
					pages.forEach(
						function(page){
							ooui++;
							var link = $(
								'<div class="oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget wikiEditor-ui-linkSuggest-suggestion" aria-selected="false" tabindex="-1" role="option" id="ooui-'+ooui+'" link-to="'+config.wgServer+mw.util.getUrl(page.title)+'">'+
									'<span class="oo-ui-labelElement-label">'+page.title+'</span>'+
								'</div>'
							);
							suggestBox.append(link);
						}
					);
					wrapper.find('.wikiEditor-ui-linkSuggest-suggestion')[0].focus();
					wrapper.show();
				}
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
			var updateSel = function() {
				var a = window.getSelection();
				if (a.focusNode && (a.focusNode.closest('.ProseMirror')||a.focusNode.classList.contains('ProseMirror'))) {
					sel = {
						node: a.focusNode,
						data: a.focusNode.data || '',
						offset: a.focusOffset || 0
					};
				}
			};
			$('body').on('click', function(e){
				$('.IPM-open').removeClass('IPM-open');
				$(e.target).next('.menu').addClass('IPM-open');
			});
			$('body').on('mouseover', '.rich-text-editor__toolbar', updateSel);
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
							var preparsedInsert =
								insert.insert
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
									})
									.replace(/[\n]+\n\n/g, '\n\n') // max 2 line breaks
									.replace(/(?<!\n[\*\#][^\n]*)\n(?![\*\# ])/g, '<br />'); // transform \n to <br/> for ease of parse
									
							// template expand only works with plain text returns, but thats up to user to use properly
							api.parse(preparsedInsert, {
								title:config.wgPageName, // allow page name variables to work as expected
								contentmodel:'wikitext',
								disablelimitreport:true,
								pst:true
							}).then(function(txt){
								console.log(txt, 'init');
								var e = $(txt);
								txt = e.is('.mw-parser-output') ? e.html() : e.find('.mw-parser-output').html();
								var anchor_regex = new RegExp('(?<=<a [^<>]*href=")' + config.wgArticlePath.replace('$1', '(.+?)') + '(?="[^<>]*>)', 'g');
								txt = txt
									// make relative urls absolute so they don't get removed after posting message
									.replace(anchor_regex, config.wgServer + config.wgArticlePath)
									.replace(/<br ?\/?><br ?\/?>/g, '</p><p><br /></p><p>')
									.replace(/<br ?\/?>(?!\s*<\/p>)/g, '</p><p>');
								console.log(txt, 'final');
								if (insert.replaceAll) {
									$(sel.node).closest('.ProseMirror').html(txt);
								} else {
									$(
										sel.node.nodeType === 3 ?
										sel.node.parentNode :
										sel.node
									).replaceWith($(
										'<p>'+
										sel.data.slice(0, sel.offset)+
										txt.replace(/^<p>|<\/p>$/, '')+
										sel.data.slice(sel.offset)+
										'</p>'
									));
								}
							});
									
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
					betterLinkSuggest.waitFor('.rich-text-editor__wrapper:not(.IPM-loaded)', function() {
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
	
	mw.loader.using('mediawiki.api').then(betterLinkSuggest.init);
})();
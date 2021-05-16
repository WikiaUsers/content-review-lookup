/* jshint
	esversion: 5, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082, -W084
*/
/* global mw, ace */

$.when(
	$.Deferred(function(def) { 
		$(function() { 
			def.resolve();
		});
	}), 
	mw.loader.using('mediawiki.util'),
	$.Deferred(function(def) {
		if (mw.libs.QDmodal) {
			def.resolve(mw.libs.QDmodal);
		} else {
			$.ajax({
				cache: true,
				dataType: "script",
				url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
			}).done(function() { 
				def.resolve(mw.libs.QDmodal);
			});
		}
	})
).then(function() {
	if (mw.config.get('wgPageName') !== 'Module:Inventory_slot/Tooltips' || window.TooltipsEditorLoaded) return;
	
	var modal = new mw.libs.QDmodal("TooltipsEditor");
	var api = new mw.Api();
	var closing;
	window.TooltipsEditorLoaded = true;
	
	console.log('Loading TooltipsEditor...');
	
	function replaceLines(s) {
		return s.replaceAll(/(?<!\\)\//g, '\\/').replaceAll(/\n/g, '/');
	}
	
	function convertSlashes(s) {
		return s.replaceAll(/(?<!\\)\//g, '\n');
	}
	
	function reset(confirm) {
		if (confirm) {
			$("#TooltipsEditor-search").css({ display: "" });
			$('#TooltipsEditor-searchResults').empty();
			$('#searchResultsMessage, #TooltipsEditor-editor').css({ display: "none" });
			$('#TooltipsEditor > section').removeClass('mw-ajax-loader');
			
			ace.tooltipsTextEditor.setValue("");
			ace.tooltipsTitleEditor.setValue("");
			$("#TooltipsEditor-key, #TooltipsEditor-link").val("");
			$('.qdmodal-button').css({ display: "" });
		}
	}
	
	function searchArray(arr, search) {
		var splitSearch = function(str) {
			var pattern = str.split("").map(function(v) {
				return "(?=.*" + mw.RegExp.escape(v) + ")";
			}).join("");
			var regex = new RegExp(pattern, "i");
			var match = str.match(regex);
	
			return match && match[0];
		};
	
	   return arr.filter(function(v) {
			return v.toLowerCase().includes(search.toLowerCase()) || splitSearch(v.toLowerCase(), search.toLowerCase());
		});
	}
	
	mw.util.addCSS("\
#minetip-tooltip {\
	z-index: 99999999 !important; \
}\
\
.ace_format_bold {\
	font-weight: bold !important;\
}\
\
.ace_format_italic {\
	font-style: italic !important;\
}\
\
.ace_format_underline {\
	font-style: italic !important;\
	text-decoration: strikethrough, underline;\
	text-decoration-color: currentcolor;\
}\
\
.ace_format_strikethrough {\
	text-decoration: line-through;\
	text-decoration-color: currentcolor;\
}\
\
.ace_escape {\
	color: #a1bff5 !important;\
	font-weight: bold !important;\
}\
\
.ace_backescape {\
	color: #B58900 !important;\
	font-weight: bold !important;\
}\
\
#TooltipsEditor {\
	width: 700px !important;\
}\
	".trim());
	mw.loader.load(['ext.codeEditor.ace']);
	
	function onClick(tooltips) {
		var isInMain = true;
		var data;
		closing = false;
	
		modal.show({
			title: "Tooltips Editor",
			onHide: function() {
				if (!closing && confirm("Are you sure you want to exit the editor and discard your changes?")) return true;	
				else if (closing) return true;
				else return false;
			},
			buttons: [{
				text: "Save and Close",
				handler: function() {
					closing = true;
					
					if (confirm('Are you sure you want to save and close the editor?')) modal.hide(); else return;
					
					var ret = [];
					
					Object.keys(data).sort().forEach(function(k) {
						var v = data[k];
						
						ret.push([
							"\t['" + k.replace(/(['"])/g, '\\$1') + "'] = {",
							v.name ? "name = '" + v.name.replace(/(['"])/g, '\\$1') + "', " : "",
							v.title ? "title = '" + v.title.replace(/(['"])/g, '\\$1') + "', " : "",
							v.text ? "text = '" + v.text.replace(/(['"])/g, '\\$1') + "', " : "",
							"},",
						].join(""));
					});
					
					ret = "return {\n" + ret.join('\n') + "\n}\n".replaceAll('&amp;', '&').replaceAll(/\\/g, '\\\\');
					
					api.postWithEditToken({
						action: "edit",
						text: ret.replaceAll(/&amp;/g, '&'),
						title: mw.config.get('wgPageName'),
						summary: "Updating tooltips (TooltipsEditor)",
						minor: true,
					}).always(console.log);
				},
			}],
		});
		$('#TooltipsEditor > section').attr('class', 'mw-ajax-loader');	
		
		api.post({
			action: 'scribunto-console',
			title: mw.config.get('wgPageName'),
			question: "=mw.text.jsonEncode(p)",
			content: tooltips,
		}).then(function(d) {
			var json = JSON.parse(d['return'].replaceAll('\\\\', '\\'.repeat(4)));
			var editor = $('#TooltipsEditor > section');
			data = json;
			
			ace.define('ace/mode/minecraft-tooltips', [], function(require, exports) {
				var oop = require("../lib/oop");
				var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
	
				var colorRules = {};
				
				function onMatch(str) {
					var match = this.splitRegex.exec(str);
					var values = match.slice(1);
					values.push(match[0]);
					
					var types = this.token.apply(this, values);
					
					if (typeof types === "string")
						return [{
							type: types,
							value: str
						}];
					var tokens = [];
					for (var i = 0, l = types.length; i < l; i++) {
						if (values[i])
							tokens[tokens.length] = {
								type: types[i],
								value: values[i]
							};
					}
					return tokens;
				}
				
				var conversions = {
					'l': 'bold',
					'm': 'strikethrough',
					'n': 'underline',
					'o': 'italic',
				};
				var escapes = {
					regex: /\\(ench?a?n?t?m?e?n?t?|ra?r?i?t?y?|poti?o?n|sta?t?)\{(?:.+?)\}|\\(?:[rntvb]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{1,4}|u\{[0-9a-fA-F]{1,6}\}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7].)/,
					token: 'backescape.code',
				};
				
				'123456789abcdef'.split("").forEach(function(code) {
					this['color-' + code] = {
						formats: [],
						rules: [{
							token: function(code) {
								this.nextCode = code;
								return 'escape.format.code.color';
							},
							regex: /&([0-9a-f])/,
							next: function() {
								return "color-" + this.nextCode;
							},
							onMatch: onMatch,
						}, {
							regex: /&([l-o])/,
							token: function(code) {
								this.formats.push(conversions[code]);
								return 'escape.format.code.text';
							},
						}, {
							token: "language.escape.format.code",
							regex: /&r/,
							next: "start",
						}, escapes, {
							regex: /[^\0]/,
							token: function() {
								var ret = "format.color.format-" + code + '.code';
								
								this.formats.forEach(function(code) {
									ret += '.format_' + code;
								});
								return ret;
							},
						}],
					};
					
					var data = this['color-' + code];
					data.rules[0].token = data.rules[0].token.bind(data);
					data.rules[0].next = data.rules[0].next.bind(data);
					data.rules[1].token = data.rules[1].token.bind(data);
					data.rules[4].token = data.rules[4].token.bind(data);
				}, colorRules);
				
				var MinecraftHighlightRules = function() {
					var formats = [];
					
					this.$rules = {
						start: [{
							regex: /&([0-9a-f])/,
							token: function(code) {
								this.nextCode = code;
								colorRules['color-' + code].formats = [];
								return 'escape.format.code.color';
							},
							next: function() {
								return "color-" + this.nextCode;
							},
							onMatch: onMatch,
						}, {
							regex: "&r",
							token: function() {
								formats = [];
								return 'escape.format.code.color';	
							},
						}, escapes, {
							regex: /&([l-o])/,
							token: function(code) {
								formats.push(conversions[code]);
								return 'escape.format.code.color';
							},
						}, {
							regex: /[^\0]/,
							token: function() {
								var ret = "text.formatted";
								
								formats.forEach(function(code) {
									ret += '.format_' + code;
								});
								return ret;
							},
						}],
					};
					
					for (var prefix in colorRules) {
						if (colorRules.hasOwnProperty(prefix)) {
							var data = colorRules[prefix];
							
							this.$rules[prefix] = data.rules;
						}
					}
					
					this.normalizeRules();
				};
	
				oop.inherits(MinecraftHighlightRules, TextHighlightRules);
	
				exports.MinecraftHighlightRules = MinecraftHighlightRules;
			});
			
			var colorConversions = {
				0: "black",
				1: "dark_blue",
				2: "dark_green",
				3: "dark_aqua",
				4: "dark_red",
				5: "dark_purple",
				6: "gold",
				7: "gray",
				8: "dark_gray",
				9: "blue",
				a: "green",
				b: "aqua",
				c: "red",
				d: "light_purple",
				e: "yellow",
				f: "white",
				g: "minecoin_gold",
				l: "bold",
				n: "underline",
				m: "strikethrough",
				o: "italic",
			};
	
			var chars = ('❤ ❈ ❁ ✦ ☣ ☠ ✎ ∞ ✯ ♣ ❂ ⚔ ⫽ ✹ ⸕ ☘ 🗲 ❣ ⚚')
				.replaceAll(" ", " &nbsp; ")
				.split(" ")
				.map(function(v) {
					if (!v.match('&nbsp;')) {
						return $('<a>', {
							'class': "TooltipsEditor-insertChar",
							text: v,
							title: 'Insert "' + v + '"',
						});
					} else {
						return v;
					}
				});
	
			editor.append(
				$('<div>', {
					id: "TooltipsEditor-search",
					html: [
						'Enter Tooltip Name: ',
						$('<input>', {
							id: "TooltipsEditor-searchInput",
							keyup: function() {
								$('#searchResultsMessage').css({ display: "" });
								
								var $this = $(this);
								var $results = $("#TooltipsEditor-searchResults");
								var val = $this.val();
								var names = Object.keys(json).sort();
								var results = searchArray(names, val);
								
								if (results.length > 100) results.length = 100;
								
								$results.empty();
								if (!results.length) return $results.html('No tooltips matched your search.');
								
								results.forEach(function(v) {
									$results[0].appendChild($('<li>', {
										html: [
											$('<a>', {
												href: mw.util.getUrl(v),
												title: v,
												text: v,
											}),
											' (',
											 $('<a>', {
												'class': "TooltipsEditor-editTooltip",
												text: "edit",
												'data-tooltipTitle': json[v] && json[v].title && json[v].title.replaceAll('&amp;', '&'),
												'data-tooltipText': json[v] && json[v].text && json[v].text.replaceAll('&amp;', '&'),
												'data-tooltipLink': json[v] && json[v].name && json[v].name.replaceAll('&amp;', '&'),
												'data-tooltipKey': v.replaceAll('&amp;', '&'),
											}),
											"<b> &bull; </b>",
											$('<a>', {
												'class': "TooltipsEditor-previewTooltip minetip", 
												text: "preview",
												'data-minetip-text': json[v] && json[v].text && json[v].text.replaceAll('&amp;', '&'),
												'data-minetip-title': json[v] && json[v].title && json[v].title.replaceAll('&amp;', '&'), 
											}),
											"<b> &bull; </b>",
											$('<a>', {
												'class': "TooltipsEditor-removeTooltip", 
												text: "remove",
												'data-key': v.replaceAll('&amp;', '&'), 
											}),
											')',
										],
									})[0]);
								});
							},
						}),
						'<br>',
						$("<button>", {
							id: "TooltipsEditor-addNew",
							text: "Add New Tooltip",
							click: function() {
								openEditor();
							},
						}),
						'<br>',
						$('<b>', { text: 'Search Results:', id: "searchResultsMessage", style: "display: none;" }),
						$('<ul>', {
							id: "TooltipsEditor-searchResults",
							css: {
								'list-style-type': 'square',
								'margin-left': "10px",
							},
						}),
					]
				}),
				$('<div>', {
					id: "TooltipsEditor-editor",
					style: "display: none;",
					html: [
						'This editor uses minecraft formatting codes (',
						$('<a>', {
							href: "https://minecraft.gamepedia.com/Formatting codes",
							text: "more info",
							title: "https://minecraft.gamepedia.com/Formatting codes",
						}),
						') and the template ',
						$('<code>', {
							html: [
								'{{',
								$('<a>', {
									href: mw.util.getUrl("Template:UIText"),
									text: "UIText",
									title: "emplate:UIText",
								}),
								'}}', 
							],
						}), 
						'for extra formatting. See the template\'s documentation for more info.',
						'<br>',
						$('<fieldset>', {
							html: [
								$('<legend>', { text: "Insert" }),
								$('<div>', {
									html: [
										"<b>Formatting:</b>",
										$('<div>', {
											id: "TooltipsEditor-insertFormat",
											html: "0123456789abcdeflmno"
												.replaceAll("", "_")
												.replaceAll("_", "_<b> &bull; </b>_")
												.split("_")
												.map(function(v, i, a) {
													if (!v || i+2 >= a.length || i <= 1) return;
													if (v.match('&bull;')) return $(v);
													
													return $('<a>', {
														'class': "TooltipsEditor-insertFormat",
														text: colorConversions[v].replaceAll('_', ' ').replaceAll(/(\w)(\w*)/g, function(_, $1, $2) { 
															return $1.toUpperCase() + $2;
														}),
														'data-insert': '&' + v,
													});
												}),
										}),
										'<hr>',
										"<b>Special Characters:</b>",
										$('<div>', { html: chars }),
									],
								}),
							],
						}),
						$('<b>', { text: 'Tooltip ID: ' }),
						$('<input>', { css: { width: "400px" }, id: "TooltipsEditor-key" }),
						'<br>',
						$('<b>', { text: 'Tooltip Link: ' }),
						$('<input>', { css: { width: "400px" }, id: "TooltipsEditor-link" }),
						'<br>',
						$('<b>', { text: 'Tooltip Title: ' }),
						$('<div>', {
							id: "TooltipsEditor-title-AceEditor",
							css: {
								width: "600px",
								height: "20px",
								'font-size': '14px',
								'line-height': '18px',
								'border': '1px solid #474747',
							}
						}),
						$('<b>', { text: 'Tooltip Text: ' }),
						$('<div>', {
							id: "TooltipsEditor-text-AceEditor",
							css: {
								'font-size': '14px',
								'line-height': '18px',
								'min-height': '200px',
								'max-height': '400px',
								'min-width': '600px',
								'max-width': '1000px',
								'border': '1px solid #474747',
							}
						}),
					]
				})
			);
			
			editor.removeClass('mw-ajax-loader');
	
			var lastFocusedEditor, lastFocusedElement;
	
			function updatePreview() {
				$('#TooltipsEditor-preview').attr({
					'data-minetip-text': replaceLines(ace.tooltipsTextEditor.getValue()),
					'data-minetip-title': ace.tooltipsTitleEditor.getValue(),
				});
			}
			
			function insertText(text) {
				var editor = lastFocusedEditor;
				if (!editor && lastFocusedElement) {
					return lastFocusedElement.textSelection('encapsulateSelection', {
						pre: text,
                        peri: '',
                    }), true;
				}
				
				editor.insert(text, 1);
				
				return true;
			}
	
			function setupEditor(id) {
				var aceEditor = ace.edit(id);
				var mode = new (ace.require("ace/mode/javascript").Mode)();
				mode.HighlightRules = ace.require('ace/mode/minecraft-tooltips').MinecraftHighlightRules;
				aceEditor.session.setMode(mode);
		
				if (id === "TooltipsEditor-text-AceEditor") {
					aceEditor.setOptions({
						wrapBehavioursEnabled: true,
						wrap: true,
					});
					
					aceEditor.session.on('change', function() {
						var height = aceEditor.session.getScreenLength()
							* aceEditor.renderer.lineHeight
							+ aceEditor.renderer.scrollBar.getWidth() + 'px';
						
						$(id).css({ height: height });
						aceEditor.resize();
						
						if (aceEditor.session.getScreenWidth() > 1000) {
							$(id).css({ width: '1000px' });
						}
					});
				}
				
				aceEditor.session.on('change', updatePreview);
				aceEditor.on('focus', function() {
					lastFocusedEditor = aceEditor;
				});
				
				return aceEditor;
			}
			
			$("#TooltipsEditor-key, #TooltipsEditor-link").focus(function() {
				lastFocusedElement = $(this);
				lastFocusedEditor = null;
			});
			
			$('.TooltipsEditor-insertFormat').click(function() {
				var $this = $(this);
				var insert = $this.attr('data-insert');
				
				if (lastFocusedEditor) {
					var editor = lastFocusedEditor;
					
					var selection = editor.selection;
					if (!selection.ranges.length) {
						editor.insert(insert);
					} else {
						selection.ranges.forEach(function(range) {
							editor.session.insert({ 
								row: range.start.row, 
								column: range.start.column 
							}, insert);
						});
					}
				}	
			});
			
			window.ace.tooltipsTextEditor = setupEditor("TooltipsEditor-text-AceEditor");
			window.ace.tooltipsTitleEditor = setupEditor("TooltipsEditor-title-AceEditor");
			
			function openEditor(text, title, link, key) { // jshint ignore:line
				isInMain = false;
				var oldKey = key;
				
				$("#TooltipsEditor-search").css({ display: "none" });
				$('#TooltipsEditor-editor').css({ display: "" });
				
				ace.tooltipsTextEditor.resize();
				ace.tooltipsTitleEditor.resize();
				
				ace.tooltipsTextEditor.setValue(convertSlashes(text || ""));
				ace.tooltipsTitleEditor.setValue(title || "");
				$("#TooltipsEditor-link").val(link) || "";
				$("#TooltipsEditor-key").val(key || "");
				
				$('.qdmodal-button').css({ display: "none" });				
				$('#TooltipsEditor-save, #TooltipsEditor-preview, #TooltipsEditor-cancel').remove();
				$('#TooltipsEditor-editor').append(
					$('<button>', {
						id: "TooltipsEditor-save",
						text: "Save",
						click: function() {
							var text = ace.tooltipsTextEditor.getValue(),
								title = ace.tooltipsTitleEditor.getValue(),
								key = $("#TooltipsEditor-key").val(),
								link = $("#TooltipsEditor-link").val();
								
							if (!key) return alert("You need to enter a tooltip ID!");
							if (!link) return alert("You need to enter the tooltip's link!");
								
							if (oldKey) delete json[oldKey];
							editor.addClass('mw-ajax-loader');
							$('.qdmodal-button').css({ display: "" });		
							$('#TooltipsEditor-editor, #searchResultsMessage').css({ display: "none" });
							
							api.post({ 
								action: "parse", 
								contentmodel: "wikitext",
								text: "{{UIText|" + text + "|}}",
							}).then(function(data) {
								json[key] = {
									text: text ? $(data.parse.text["*"])
										.find('p')
										.html()
										.trim()
										.replace(/&amp;/g, '&') : undefined,
									title: title.trim(),
									name: link.trim(),
								};
								isInMain = true;
								data = json;
								
								reset(true);
							});
						},
					}),
					$('<button>', {
						id: "TooltipsEditor-cancel",
						text: "Cancel",
						click: function() {
							reset(confirm('Are you sure you want to exit the editor?'));
						},
					}),
					$('<button>', {
						id: "TooltipsEditor-preview",
						'class': "minetip",
						text: "Preview",
					})
				);
				updatePreview();
			}
			
			$(document.body).on('click', '.TooltipsEditor-insertChar', function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();
				
				insertText($(this).attr('data-insert') || $(this).text());	
			});
			
			$(document.body).on('click', '.TooltipsEditor-removeTooltip', function() {
				var $this = $(this);
				var key = $this.attr('data-key');
				
				if (!confirm('Are you sure you want to remove the tooltip "' + key + '"?')) return;
				delete json[key];
				$this.parent().remove();
			});
			
			$(document.body).on('click', '.TooltipsEditor-editTooltip', function() {
				var $this = $(this);

				openEditor(
					$this.attr('data-tooltipText'), 
					$this.attr('data-tooltipTitle'), 
					$this.attr('data-tooltipLink'),
					$this.attr('data-tooltipKey')
				);
			});
		}, function(code, e) {
			return alert('Failed to parse Tooltips:', e), console.warn('Failed to parse Tooltips:', e);
		}).catch(console.warn);
	}
	
	$('.editTooltips').click(function() {
		api.get({
			action: "query",
			format: "json",
			prop: "revisions",
			titles: mw.config.get('wgPageName'),
			formatversion: 2,
			rvprop: "content",
			rvslots: "*"
		}).then(function(d) {
			var content = d.query.pages[0].revisions[0].slots.main.content;
			
			onClick(content);
		});
	});
}).catch(console.warn);
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

// Load Styles 
$.when(
	$.Deferred(function(def) { 
		$(function() { 
			def.resolve();
		});
	}), 
	mw.loader.using(['mediawiki.util', 'mediawiki.api', 'ext.codeEditor.ace']),
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
	// Pages
	var allowedPages = [
		'Module:Inventory_slot/Tooltips',
		'Module:Inventory_slot/Test', // used only when testing with user script
	];
	if (!allowedPages.includes(mw.config.get('wgPageName')) || (window.TooltipsEditor && window.TooltipsEditor.loaded)) return;
	
	var modal = new mw.libs.QDmodal("TooltipsEditor");
	var api = new mw.Api();
	var closing, that;
	var actions = [];
	
	console.log('Loading TooltipsEditor...');
	
	var TooltipsEditor = that = window.TooltipsEditor = Object.assign(this, {
		loaded: true,
		replaceLines: function(s) {
			return s.replaceAll(/(?<!\\)\//g, '\\/').replaceAll(/\n/g, '/');
		},
		convertSlashes: function(s) {
			return s.replaceAll(/(?<!\\)\//g, '\n');
		},
		reset: function(confirm) {
			if (confirm) {
				$("#TooltipsEditor-search").css({ display: "" });
				$('#TooltipsEditor-searchResults').empty();
				$('#searchResultsMessage, #TooltipsEditor-editor').css({ display: "none" });
				$('#TooltipsEditor > section').removeClass('mw-ajax-loader');
				ace.tooltipsTextEditor.setValue("");
				ace.tooltipsTitleEditor.setValue("");
				$("#TooltipsEditor-key, #TooltipsEditor-link").val("");
				$('.qdmodal-button').css({ display: "" });
				if ($('#TooltipsEditor-searchInput').val().trim() !== "") $('#TooltipsEditor-searchInput').keyup();
			}
		},
		searchArray: function(arr, search) {
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
		},
		onClick: function(tooltips) {
			var isInMain = true;
			var data;
			closing = false;
			
			$(window).on('beforeunload', function() {
				if (!closing)
	    			return 'Are you sure you want to exit the page and discard your changes?';
			});
			
			modal.show({
				title: "Tooltips Editor",
				onHide: function() {
					if (!closing && confirm("Are you sure you want to exit the editor and discard your changes?")) {
						closing = true;
						return true;
					}
					else if (closing) return true;
					else return false;
				},
				buttons: [{
					text: "Save and Close",
					handler: function() {
						closing = true;
						
						if (confirm('Are you sure you want to save and close the editor?')) modal.hide(); else return closing = false, undefined;
						
						var ret = [];
						
						Object.keys(data).sort().forEach(function(k) {
							var v = data[k];
							
							ret.push([
								"\t['" + k.replace(/(['"])/g, '\\$1') + "'] = {",
								v.name ? "name = '" + v.name.replaceAll(/\\/g, '\\\\').replace(/(['"])/g, '\\$1') + "', " : "",
								v.title ? "title = '" + v.title.replaceAll(/\\/g, '\\\\').replace(/(['"])/g, '\\$1') + "', " : "",
								v.text ? "text = '" + v.text.replaceAll(/\\/g, '\\\\').replace(/(['"])/g, '\\$1') + "', " : "",
								"},",
							].join(""));
						});
						
						ret = "return {\n" + ret.join('\n') + "\n}\n".replaceAll(/&amp;/g, '&');
						console.log(ret);
						
						api.postWithEditToken({
							action: "edit",
							text: ret,
							title: mw.config.get('wgPageName'),
							summary: "Updating tooltips (TooltipsEditor)",
							minor: true,
						}).always(console.log);
						
						mw.notify('', {title: 'Tooltips Saved!', type:'success'});
					},
				}],
			});
			$('#TooltipsEditor > section').attr('class', 'mw-ajax-loader');	
			
			function luaTableToJson(s) {
				return api.post({
					action: 'scribunto-console',
					title: mw.config.get('wgPageName'),
					question: "=mw.text.jsonEncode(p)",
					content: s,
				});
			}
			
			function processResult(d) {
				return JSON.parse(d.replaceAll(/\\(?![\'\"\/])/g, '\\\\'));
			}
			
			var promises = [];
			var split = tooltips.split('\n');
			
			// Split lua table into multiple tables due to size limitation of 500k bytes
			if (split.length > 1350) {
				var lines = split;
				lines.pop();
				lines.shift();
				
				for (var i = 0; i < lines.length; i += 900) {
					var ret = 'return {\n' + lines.slice(i, i + 900).join('\n') + '\n}';
					promises.push(luaTableToJson(ret));
				}
			} else {
				promises = [luaTableToJson(tooltips)];
			}
			
			$.when.apply($, promises).then(function() {
				var json;
				if (arguments.length > 1) {
					var jsonStr = [];
					
					// Merge result into a single string to limit JSON.parse() calls
					if (Array.isArray(arguments[0])) {
						Array.from(arguments).forEach(function(v) {
							jsonStr.push(v[0]['return'].replace(/^\{|\}$/g, ''));
						});
					}
					else jsonStr.push(arguments[0]['return'].replace(/^\{|\}$/g, ''));
					// Parse String
					json = processResult("{" + jsonStr.join(',') + "}");
				} else {
					json = processResult(arguments[0]);
				}
				var oldjson = {};
				var editor = $('#TooltipsEditor > section');
				data = json;
	    		var oldjsonkeys = Object.keys(json);
				
		    	function inOldjson(k) {
		        	return oldjsonkeys.indexOf(k) !== -1;
	    		}
		    	function throwOldjson(k) {
		        	if (inOldjson(k) && !(k in oldjson)) {
			        	oldjson[k] = {};
			        	Object.assign(oldjson[k], json[k]);
		        	}
	    		}
				
				function updateActions(keys) {
					// calling updateActions() without keys will refresh the table without additional change
					// keys can be an array of strings or one string
					function updateOne(k) {
						console.log(oldjson);
						if (k) {
							if (inOldjson(k) && !(k in json))
								actions[k] = 'remove';
							else if (!inOldjson(k) && (k in json))
								actions[k] = 'add';
							else if (!inOldjson(k) && !(k in json)) {
								if (k in actions) delete actions[k];
							}
							else if (oldjson[k] 
								&& oldjson[k].name === json[k].name 
								&& oldjson[k].title === json[k].title 
								&& oldjson[k].text === json[k].text
							) {
									if (k in actions) delete actions[k];
									if (k in oldjson) delete oldjson[k];
							}
							else actions[k] = 'modify';
						}
					}
					
					function revertAction() {
						var key = $(this).attr("data-value");
						if (key in oldjson) {
							json[key] = {};
							Object.assign(json[key], oldjson[key]);
	            			delete oldjson[key];
						}
						else if (key in json)
							delete json[key];
						if (key in actions) delete actions[key];
						mw.notify('for '+key, {title: 'Undo Successful', type:'success'});
						updateActions();
						if ($('#TooltipsEditor-searchInput').val().trim() !== "") $('#TooltipsEditor-searchInput').keyup();
					}
					
					if (keys) {
						if (typeof(keys) === "string") {
							updateOne(keys);
						}
						else {
							for (var i = 0; i < keys.length; i++) {
								var k = keys[i];
								updateOne(k);
							}
						}
					}
					
					var $log = $("#TooltipsEditor-actionLog");
					var len = Object.keys(actions).length;
					var ls = [[],[],[],[]];
					
					$log.empty().append($('<li>', {text: len ? "Unsaved changes: " : "No changes were made", "class": "actions-none"}));
					
					if (len) {
						Object.keys(actions).sort().forEach(function(k) {
							switch(actions[k]) {
								case('add'): {
									ls[0].push($('<li>', {
										html: [
											"Added "+k,
											$('<a>', { text: "undo", "class": "actions-undo-button", "data-value": k }).on("click", revertAction),
											$('<a>', {
												'class': "actions-edit-button",
												text: "edit",
												'data-tooltipTitle': json[k] && json[k].title && json[k].title.replaceAll('&amp;', '&'),
												'data-tooltipText': json[k] && json[k].text && json[k].text.replaceAll('&amp;', '&'),
												'data-tooltipLink': json[k] && json[k].name && json[k].name.replaceAll('&amp;', '&'),
												'data-tooltipKey': k.replaceAll('&amp;', '&')
											}),
											$('<span>', {
												'class': "actions-preview-button minetip", 
												text: "preview (current)",
												'data-minetip-text': json[k] && json[k].text && json[k].text.replaceAll('&amp;', '&'),
												'data-minetip-title': json[k] && json[k].title && json[k].title.replaceAll('&amp;', '&'), 
											})
										],
										"class": "actions-add"
									}));
									break;
								}
								case("modify"): {
									ls[1].push($('<li>', {
										html: [
											"Modified "+k,
											$('<a>', { text: "undo", "class": "actions-undo-button", "data-value": k }).on("click", revertAction),
											$('<a>', {
												'class': "actions-edit-button",
												text: "edit",
												'data-tooltipTitle': json[k] && json[k].title && json[k].title.replaceAll('&amp;', '&'),
												'data-tooltipText': json[k] && json[k].text && json[k].text.replaceAll('&amp;', '&'),
												'data-tooltipLink': json[k] && json[k].name && json[k].name.replaceAll('&amp;', '&'),
												'data-tooltipKey': k.replaceAll('&amp;', '&')
											}),
											$('<span>', {
												'class': "actions-preview-button minetip", 
												text: "preview (undo)",
												'data-minetip-text': oldjson[k] && oldjson[k].text && oldjson[k].text.replaceAll('&amp;', '&'),
												'data-minetip-title': oldjson[k] && oldjson[k].title && oldjson[k].title.replaceAll('&amp;', '&'), 
											}),
											$('<span>', {
												'class': "actions-preview-button minetip", 
												text: "preview (current)",
												'data-minetip-text': json[k] && json[k].text && json[k].text.replaceAll('&amp;', '&'),
												'data-minetip-title': json[k] && json[k].title && json[k].title.replaceAll('&amp;', '&'), 
											})
										],
										"class": "actions-modify"
									}));
									break;
								}
								case("remove"): {
									ls[2].push($('<li>', {
										html: [
											"Removed&nbsp;"+k,
											$('<a>', { text: "undo", "class": "actions-undo-button", "data-value": k }).on("click", revertAction),
											$('<span>', {
												'class': "actions-preview-button minetip", 
												text: "preview (undo)",
												'data-minetip-text': oldjson[k] && oldjson[k].text && oldjson[k].text.replaceAll('&amp;', '&'),
												'data-minetip-title': oldjson[k] && oldjson[k].title && oldjson[k].title.replaceAll('&amp;', '&'), 
											})
										],
										"class": "actions-remove"
									}));
									break;
								}
							}
						});
					}
					
					ls.forEach(function(v) { $log.append(v) });
					$log.append($('<li>', {text: "Saving changes will also sort all Tooltips in alphabetical order.", "class": "actions-none"}));
					$("#TooltipsEditor-undoLog").append(ls[3]); //.prepend(ls[3])
					
					$("#TooltipsEditor-totalTooltips").html($('<p>', {
						html: [
							"Tooltips Count: "+Object.keys(json).length,
							$('<span>', (function() {
								var diff = Object.keys(json).length - oldjsonkeys.length;
								if (diff < 0) {
									return { text: "("+diff+")", css: {color: "red"} };
								} else if (diff > 0) {
									return { text: "(+"+diff+")", css: {color: "lime"} };
								} else {
									return { text: "(0)", css: {color: "gray"} };
								}
							}())),
						],
						css: {float: "right"},
					}));
				}
				
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
						regex: /\\(ench?a?n?t?m?e?n?t?|ra?r?i?t?y?|poti?o?n|sta?t?)\{(?: .+?)\}|\\(?:[rntvb]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{1,4}|u\{[0-9a-fA-F]{1,6}\}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7].)/,
						token: 'backescape.code',
					};
					
					'0123456789abcdef'.split("").forEach(function(code) {
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
								regex: /&r/,
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
					l: "bold",
					n: "underline",
					m: "strikethrough",
					o: "italic",
					r: "reset",
				};
				
				var rarityConversions = {
					"Common": "f",
					"Uncommon": "a",
					"Rare": "9",
					"Epic": "5",
					"Legendary": "6",
					"Mythic": "d",
					"Supreme": "4",
					"Special": "c",
					"Very Special": "c",
				};
				
				var shortForm = {
					"Common": "C",
					"Uncommon": "U",
					"Rare": "R",
					"Epic": "E",
					"Legendary": "L",
					"Mythic": "M",
					"Supreme": "SE",
					"Special": "SL",
					"Very Special": "VSL",
				};
		
				var chars = ('❤ ❈ ❁ ✦ ☣ ☠ ✎ ∞ ✯ ♣ ❂ ⚔ ⫽ α ✹ ⸕ ☘ 🗲 ❣ ⚚ ⸎ ʬ')
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
					
				function generateSearch() {
					$('#searchResultsMessage').css({ display: "" });
					
					var $this = $("#TooltipsEditor-searchInput");
					var $results = $("#TooltipsEditor-searchResults");
					var val = $this.val();
					var abort = false;
					
					if (val.trim() === "") return $results.html('<p>Enter a search term to start searching.</p>');
					
					var names = Object.keys(json).sort();
					var results = that.searchArray(names, val);
					
					if (results.length > 100) {
						results.length = 100;
						abort = true;
					}
					
					$results.empty();
					
					results.forEach(function(v) {
						$results[0].appendChild($('<li>', {
							html: [
								$('<a>', {
									href: mw.util.getUrl(v),
									title: v,
									text: v,
									target: "_blank"
								}),
								' (',
								 $('<a>', {
									'class': "TooltipsEditor-editTooltip",
									text: "edit",
									'data-tooltipTitle': json[v] && json[v].title && json[v].title.replaceAll('&amp;', '&'),
									'data-tooltipText': json[v] && json[v].text && json[v].text.replaceAll('&amp;', '&'),
									'data-tooltipLink': json[v] && json[v].name && json[v].name.replaceAll('&amp;', '&'),
									'data-tooltipKey': v.replaceAll('&amp;', '&')
								}),
								"<span class='noselect'> &bull; </span>",
								$('<span>', {
									'class': "TooltipsEditor-previewTooltip minetip", 
									text: "preview",
									'data-minetip-text': json[v] && json[v].text && json[v].text.replaceAll('&amp;', '&'),
									'data-minetip-title': json[v] && json[v].title && json[v].title.replaceAll('&amp;', '&'), 
								}),
								"<span class='noselect'> &bull; </span>",
								$('<a>', {
									'class': "TooltipsEditor-removeTooltip", 
									text: "remove",
									'data-key': v.replaceAll('&amp;', '&'), 
								}),
								')',
							],
						})[0]);
					});
					
					if (!results.length) return $results.html('<p>No tooltip matched your search.</p>');
					else if (abort) $results.append('<p>Showing the first 100 results.</p>');
					else $results.append('<p>Total: '+results.length+(results.length > 1 && " results" || " result" )+'.</p>');
				}
				
				function processColors() {
					return Object.keys(colorConversions)
						.map(function(v, i, a) {
							return $('<a>', {
								'class': "TooltipsEditor-insertFormat" + ((i === a.length-1) && " TooltipsEditor-last" || ""),
								text: colorConversions[v].replaceAll('_', ' ').replaceAll(/(\w)(\w*)/g, function(_, $1, $2) { 
									return $1.toUpperCase() + $2;
								}),
								'data-insert': '&' + v,
							});
						});
				}
				
				function processRarityTexts() {
					return Object.keys(rarityConversions)
						.map(function(v, i, a) {
							return $('<span>', {
								html: [
									$('<a>', {
										'class': "TooltipsEditor-insertFormat",
										text: v,
										'data-insert': '&l&' + rarityConversions[v] + v.toUpperCase(),
										style: "font-style: italic;",
									}),
									$('<a>', {
										'class': "TooltipsEditor-insertFormat" + ((i === a.length-1) && " TooltipsEditor-last" || ""),
										text: shortForm[v],
										'data-insert': '&' + rarityConversions[v],
										style: "font-style: italic;",
									}),
								]
							});
						});
				}
				
				editor.append(
					$('<div>', {
						id: "TooltipsEditor-search",
						html: [
							$('<span>', { id: "TooltipsEditor-totalTooltips" }),
							'<h3>Tooltips Editor Main Page</h3>',
							'Search Existing Tooltip: ',
							$('<input>', {
								id: "TooltipsEditor-searchInput",
								keyup: generateSearch,
							}),
							'<span style="margin: 0 1em; font-weight: bold; text-transform: uppercase;">or</span>',
							$('<span>', {
								"class": "oo-ui-buttonElement",
								html: [
									$("<button>", {
										id: "TooltipsEditor-addNew",
										"class": "oo-ui-buttonElement-button",
										text: "Add New Tooltip",
										click: function() {
											openEditor();
										},
									})
								]
							}),
							'<br>',
							$('<ul>', {
								id: "TooltipsEditor-actionLog",
								css: {
									'list-style-type': 'none',
									'margin-left': "0.8em",
								},
							}),
							$('<div>', {
								id: "TooltipsEditor-undoLog"
							}),
							'<br>',
							$('<b>', { text: 'Search Results: ', id: "searchResultsMessage", style: "display: none;" }),
							$('<ul>', {
								id: "TooltipsEditor-searchResults",
								css: {
									'list-style-type': 'square',
									'margin-left': "0.8em",
								},
							}),
							$("<div>", {
								css: {"font-style": "italic", float: "right", "margin-bottom": "1em"},
								html: [
									$("<span>", {
										css: {"margin-left": "0.5em"},
										html: ["(", $('<a>', {
												href: mw.util.getUrl("MediaWiki:Gadget-TooltipsEditor.js"),
												text: "View JavaScript",
												target: "_blank"
											}), ")" ]
									}),
									$("<span>", {
										css: {"margin-left": "0.5em"},
										html: ["(", $('<a>', { text: "Debug" }).on("click", function() {
											var it = prompt("Please enter an item to see its JSON");
											if (it !== null && it !== "") {
												if (it in json) {
													console.log({
														"JSON": json[it].text,
														"OUTPUT-WOULD-BE": json[it].text.replace(/(['"])/g, '\\$1').replaceAll(/&amp;/g, '&'),
													});
													mw.notify('See results in console', {title: 'Debug', type:'warning'});
												}
												else mw.notify('Debug failed: Item not found.', {title: 'Debug', type:'warning'});
											}
										}), ")" ]
									}),
								]
							})
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
										title: "Template:UIText",
									}),
									'}}', 
								],
							}), 
							'for extra formatting. See the template\'s documentation for more info.',
							'<br>',
							$('<fieldset>', {
								html: [
									$('<legend>', { text: "Toolbox (Click to Insert)", css: {"font-weight": "bold", "font-size": "16px"}}),
									$('<div>', {
										html: [
											"<b>Formatting</b>",
											$('<div>', { id: "TooltipsEditor-insertFormat", html: processColors(), "class": "noselect" }),
											'<hr>',
											"<b>Special Character</b>",
											$('<div>', { id: "TooltipsEditor-insertChar", html: chars, "class": "noselect" }),
											'<hr>',
											"<b>Rarity Text/Color</b>",
											$('<div>', { id: "TooltipsEditor-insertFormat", html: processRarityTexts(), "class": "noselect" }),
										],
									}),
								],
							}),'<br>',
							$('<span>', { text: 'Tooltip ID: ', css: { "font-weight": "bold", "width": "8.7em", display: "inline-block" } }),
							$('<input>', { css: { width: "400px", position: "relative" }, id: "TooltipsEditor-key" }),
							'<br>',
							$('<span>', { text: 'Tooltip Link: ', css: { "font-weight": "bold", "width": "8.7em", display: "inline-block" } }),
							$('<input>', { css: { width: "400px", position: "relative" }, id: "TooltipsEditor-link" }),
							'<br>','<br>',
							$('<span>', { text: 'Tooltip Title: ', css: { "font-weight": "bold" } }),
							$('<div>', {
								id: "TooltipsEditor-title-AceEditor",
								css: {
									height: "20px",
									'min-width': '600px',
									'max-width': '1000px',
									'font-size': '14px',
									'line-height': '18px',
									'border': '1px solid #474747',
								}
							}),
							$('<span>', { text: 'Tooltip Text: ', css: { "font-weight": "bold" } }),
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
				
				$(".TooltipsEditor-insertFormat:not('.TooltipsEditor-last')").after($("<span>", {
					text: " • ",
				}));
				editor.removeClass('mw-ajax-loader');
				updateActions();
		
				var lastFocusedEditor, lastFocusedElement;
		
				function updatePreview() {
					$('#TooltipsEditor-preview').attr({
						'data-minetip-text': that.replaceLines(ace.tooltipsTextEditor.getValue()),
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
						lastFocusedEditor.focus();
					}
					else lastFocusedElement.focus();
				});
				
				window.ace.tooltipsTextEditor = setupEditor("TooltipsEditor-text-AceEditor");
				window.ace.tooltipsTitleEditor = setupEditor("TooltipsEditor-title-AceEditor");
				
				function openEditor(text, title, link, key) { // jshint ignore: line
					isInMain = false;
					var oldKey = key;
					
					$("#TooltipsEditor-search").css({ display: "none" });
					$('#TooltipsEditor-editor').css({ display: "" });
					
					ace.tooltipsTextEditor.resize();
					ace.tooltipsTitleEditor.resize();
					
					ace.tooltipsTextEditor.setValue(that.convertSlashes(text || ""));
					ace.tooltipsTitleEditor.setValue(title || "");
					$("#TooltipsEditor-link").val(link || "");
					$("#TooltipsEditor-key").val(key || "");
					
					$('.qdmodal-button').css({ display: "none" });				
					$('#TooltipsEditor-save, #TooltipsEditor-preview, #TooltipsEditor-cancel').remove();
					var $button1 = $('<span>', {
							"class": "oo-ui-buttonElement",
						}).append(
							$('<button>', {
								id: "TooltipsEditor-save",
								text: "Save",
								"class": "oo-ui-buttonElement-button",
								click: function() {
									var text = ace.tooltipsTextEditor.getValue(),
										title = ace.tooltipsTitleEditor.getValue(),
										key = $("#TooltipsEditor-key").val(),
										link = $("#TooltipsEditor-link").val();
									
					                throwOldjson(oldKey);
					                throwOldjson(key);
	                				
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
												.replace(/&amp;/g, '&')
												.replace(/(?<!\\)\\/g, '\\\\')
												.replace(/&nbsp;/g, ' '): undefined,
											title: title.trim(),
											name: link.trim(),
										};
										isInMain = true;
										data = json;
										
										updateActions([oldKey, key]);
										that.reset(true);
									});
								},
							})
						);
					var $button2 = $('<span>', {
							"class": "oo-ui-buttonElement",
						}).append(
							$('<button>', {
								id: "TooltipsEditor-cancel",
								text: "Cancel",
								"class": "oo-ui-buttonElement-button",
								click: function() {
									that.reset(confirm('Go back to main page without saving?'));
								},
							})
						);
					var $button3 = $('<span>', {
							"class": "oo-ui-buttonElement",
							css: {'float': 'right'},
						}).append(
							$('<button>', {
								id: "TooltipsEditor-preview",
								'class': "minetip oo-ui-buttonElement-button",
								text: "Preview",
							})
						);
					$('#TooltipsEditor-editor').append(
						$button1,
						$button2,
						$button3
					);
					updatePreview();
				}
				
				$(document.body).on('click', '.TooltipsEditor-insertChar', function(e) {
					e.preventDefault();
					e.stopImmediatePropagation();
					
					if (lastFocusedEditor) {
						insertText($(this).attr('data-insert') || $(this).text());
						lastFocusedEditor.focus();
					}
					else lastFocusedElement.focus();
				});
				
				$(document.body).on('click', '.TooltipsEditor-removeTooltip', function() {
					var $this = $(this);
					var key = $this.attr('data-key');
					
	        		throwOldjson(key);
					delete json[key];
					updateActions(key);
					$('#TooltipsEditor-searchInput').keyup();
				});
				
				$(document.body).on('click', '.TooltipsEditor-editTooltip, .actions-edit-button', function() {
					var $this = $(this);
	
					openEditor(
						$this.attr('data-tooltipText'), 
						$this.attr('data-tooltipTitle'), 
						$this.attr('data-tooltipLink'),
						$this.attr('data-tooltipKey')
					);
				});
			}, function(code, e) {
				return alert('Failed to parse Tooltips: ', e), console.warn('Failed to parse Tooltips: ', e);
			}).catch(console.warn);
		},
		init: function() {
			$('<link>', { 
				rel: "stylesheet", 
				href: "https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Gadget-TooltipsEditor.css?action=raw&ctype=text/css" 
			}).appendTo('head');

			$('.editTooltips').click(function() {
				api.get({
					action: "query",
					format: "json",
					prop: "revisions",
					titles: mw.config.get("wgPageName"),
					formatversion: 2,
					rvprop: "content",
					rvslots: "*"
				}).then(function(d) {
					var content = d.query.pages[0].revisions[0].slots.main.content;

					actions = [];
					this.onClick(content);
				}.bind(this));
			}.bind(this));
		},
	});
	
	this.init();
}.bind((window.TooltipsEditor = window.TooltipsEditor || Object.create(null)))).catch(console.warn);
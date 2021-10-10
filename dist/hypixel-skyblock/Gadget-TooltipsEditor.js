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
	mw.loader.using(["mediawiki.util", "mediawiki.api", "ext.codeEditor.ace"]),
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
		"Inventory_slot/Tooltips",
		"Inventory_slot/Test",
	].map( function (p) {
		return mw.config.get("wgFormattedNamespaces")[828] + ":" + p;
	});
	if (!allowedPages.includes(mw.config.get("wgPageName")) || (window.TooltipsEditor && window.TooltipsEditor.loaded)) return;

	var api = new mw.Api();

	console.log("Loading TooltipsEditor...");

	var that;
	var TooltipsEditor = window.TooltipsEditor = Object.assign(this, {

		// variables; undefined variables are just for easier variable tracking
		modal: new mw.libs.QDmodal("TooltipsEditor"),
		loaded: true,
		colorRules: undefined,
		deloadAll: function() {
			this.actions = this.closing = this.isInMain = this.data = this.json = this.oldjson = this.oldjsonkeys = this.editor = this.lastFocusedEditor = this.lastFocusedElement = undefined;
		},

		otherInputBoxes: {
			// <param internal name>: {display: <param display name>, optional?: true/false }
			"name": { display: "Name", replace: true },
			"image": { display: "Image", optional: true },
			"link": { display: "Link", optional: true },
		},
		forEachInputBox: function(callback) {
			var i = 0;
			for (var intername in this.otherInputBoxes) {
				if (true) { // stops the editor from complaining
					i++;
					callback(intername, i, this.otherInputBoxes);
				}
			}
		},
		colorConversions: {
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
		},
		colorConvList: "0123456789abcdef",
		conversions: {
			"l": "bold",
			"m": "strikethrough",
			"n": "underline",
			"o": "italic",
		},
		rarityConversions: {
			"Common": "f",
			"Uncommon": "a",
			"Rare": "9",
			"Epic": "5",
			"Legendary": "6",
			"Mythic": "d",
			"Divine": "b",
			"(Supreme)": "4",
			"Special": "c",
			"Very Special": "c",
		},
		shortForm: {
			"Common": "C",
			"Uncommon": "U",
			"Rare": "R",
			"Epic": "E",
			"Legendary": "L",
			"Mythic": "M",
			"Divine": "D",
			"(Supreme)": "(SE)",
			"Special": "SL",
			"Very Special": "VSL",
		},
		specialchars: ("❤ ❈ ❁ ✦ ☣ ☠ ✎ ∞ ✯ ♣ ❂ ⚔ ⫽ α ✹ ⸕ ☘ 🗲 ❣ ⚚ ⸎ ʬ")
			.replaceAll(" ", " &nbsp; ")
			.split(" ")
			.map(function(v) {
				if (!v.match("&nbsp;")) {
					return $("<a>", {
						"class": "TooltipsEditor-insertChar",
						text: v,
						title: "Insert \"" + v + "\"",
					});
				} else {
					return v;
				}
			}),
		escapes: {
			regex: /\\(ench?a?n?t?m?e?n?t?|ra?r?i?t?y?|poti?o?n|sta?t?)\{(?:.+?)\}|\\(?:[rntvb&]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{1,4}|u\{[0-9a-fA-F]{1,6}\}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7].)/,
			token: "backescape.code",
		},

		// helper functions for this.updateActions
		optionalParam: function(v) {
			if (typeof v !== "string")
				return "";
			else
				return v.trim();
		},
		inOldjson: function (k) {
			return this.oldjsonkeys.indexOf(k) !== -1;
		},
		throwOldjson: function(k) {
			if (this.inOldjson(k) && !(k in this.oldjson)) {
				this.oldjson[k] = {};
				Object.assign(this.oldjson[k], this.json[k]);
			}
		},
		allInputEquals: function(a, b) {
			var alltrue = true;
			this.forEachInputBox(function(inter, i, otherinputboxes) {
				var val = otherinputboxes[inter];
				if (val.optional ?
					(this.optionalParam(a[inter]) !== this.optionalParam(b[inter])) :
					(a[inter] !== b[inter])) {
					alltrue = false;
				}
			}.bind(this));
			return alltrue;
		},
		updateOne: function(k) {
			if (k) {
				// if no old version, two cases:
				if (!this.inOldjson(k) && (k in this.json)) // first case: has a new version => entry added
					this.actions[k] = "add";
				else if (!this.inOldjson(k) && !(k in this.json)) { // second case: does not have a new version => entry does not exist
					if (k in this.actions) delete this.actions[k];
				}
				// at this point, it is guaranteed that an old version exists:
				else if (!(k in this.json)) // no new version =?> entry removed
					this.actions[k] = "remove";
				else if (!this.oldjson[k] // value of old version is not recorded => new version must be equal to old version
					|| (this.oldjson[k].title === this.json[k].title
						&& this.oldjson[k].text === this.json[k].text
						&& this.allInputEquals(this.oldjson[k], this.json[k])
						) // compare each entries of the old version to new version; proceed if all equal
				) {
					if (k in this.actions) delete this.actions[k];
					if (k in this.oldjson) delete this.oldjson[k];
				}
				else { // new version must be different from old version
					this.actions[k] = "modify";
				}
			}
		},
		revertAction: function() {
			var key = $(this).attr("data-value");
			if (key in that.oldjson) {
				that.json[key] = {};
				Object.assign(that.json[key], that.oldjson[key]);
				delete that.oldjson[key];
			}
			else if (key in that.json)
				delete that.json[key];
			if (key in that.actions) delete that.actions[key];
			mw.notify("for "+key, {title: "Undo Successful", type:"info"});
			that.updateActions();
			if ($("#TooltipsEditor-searchInput").val().trim() !== "") that.generateSearch();
		},
		getOtherParamAttr: function(obj, k) {
			var ret = {};
			this.forEachInputBox(function(inter) {
				ret["data-tooltip-"+inter] =
					obj[k] && obj[k][inter] && obj[k][inter].replaceAll("&amp;", "&");
			}.bind(this));
			return ret;
		},
		getEditParamPackage: function(text, cls, obj, k) {
			return Object.assign({
				"text": text,
				"class": cls,
				"data-tooltip-title": obj[k] && obj[k].title && obj[k].title.replaceAll("&amp;", "&"),
				"data-tooltip-text": obj[k] && obj[k].text && obj[k].text.replaceAll("&amp;", "&"),
				"data-tooltip-key": k.replaceAll("&amp;", "&")
			}, this.getOtherParamAttr(obj, k));
		},
		getMinetipParamPackage: function(text, cls, obj, k) {
			return {
				"class": cls, 
				text: text,
				"data-minetip-text": obj[k] && obj[k].text && obj[k].text.replaceAll("&amp;", "&"),
				"data-minetip-title": obj[k] && obj[k].title && obj[k].title.replaceAll("&amp;", "&"), 
			};
		},

		// main function this.updateActions
		updateActions: function(keys) {
			// calling updateActions() without keys will refresh the table without additional change
			// keys can be an array of strings or one string
			if (keys) {
				if (typeof(keys) === "string") {
					this.updateOne(keys);
				}
				else {
					for (var i = 0; i < keys.length; i++) {
						var k = keys[i];
						this.updateOne(k);
					}
				}
			}

			var $log = $("#TooltipsEditor-actionLog");
			var len = Object.keys(this.actions).length;
			var ls = [[],[],[],[]];
			var getEditParams = this.getEditParamPackage.bind(this, "edit", "actions-edit-button");
			var getUndoPreview = this.getMinetipParamPackage.bind(this, "preview (undo)", "minetip actions-preview-button", this.oldjson);
			var getCurrentPreview = this.getMinetipParamPackage.bind(this, "preview (current)", "minetip actions-preview-button", this.json);
			var getUndoButtonParams = function(k) {return { text: "undo", "class": "actions-undo-button", "data-value": k }};

			$log.empty().append($("<li>", {text: len ? "Unsaved changes: " : "No changes were made", "class": "actions-none"}));

			if (len) {
				Object.keys(this.actions).sort().forEach(function(k) {
					switch(this.actions[k]) {
						case("add"): {
							ls[0].push($("<li>", {
								html: [
									"Added "+k,
									$("<a>", getUndoButtonParams(k)).on("click", this.revertAction/* don't bind */),
									$("<a>", getEditParams(this.json, k)),
									$("<span>", getCurrentPreview(k))
								],
								"class": "actions-add"
							}));
							break;
						}
						case("modify"): {
							ls[1].push($("<li>", {
								html: [
									"Modified "+k,
									$("<a>", getUndoButtonParams(k)).on("click", this.revertAction/* don't bind */),
									$("<a>", getEditParams(this.json, k)),
									$("<span>", getUndoPreview(k)),
									$("<span>", getCurrentPreview(k))
								],
								"class": "actions-modify"
							}));
							break;
						}
						case("remove"): {
							ls[2].push($("<li>", {
								html: [
									"Removed&nbsp;"+k,
									$("<a>", getUndoButtonParams(k)).on("click", this.revertAction/* don't bind */),
									$("<a>", getEditParams(this.oldjson, k)),
									$("<span>", getUndoPreview(k))
								],
								"class": "actions-remove"
							}));
							break;
						}
					}
				}.bind(this));
			}

			ls.forEach(function(v) { $log.append(v) });
			$log.append($("<li>", {text: "Saving changes will also sort all Tooltips in alphabetical order.", "class": "actions-none"}));
			$("#TooltipsEditor-undoLog").append(ls[3]); //.prepend(ls[3])
			
			$("#TooltipsEditor-totalTooltips").html($("<p>", {
				html: [
					"Tooltips Count: "+Object.keys(this.json).length,
					$("<span>", (function() {
						var diff = Object.keys(this.json).length - this.oldjsonkeys.length;
						if (diff < 0) {
							return { text: "("+diff+")", "class": "diff-negative" };
						} else if (diff > 0) {
							return { text: "(+"+diff+")", "class": "diff-positive" };
						} else {
							return { text: "(0)", "class": "diff-zero" };
						}
					}.bind(this)())),
				],
			}));
		},

		// helper functions for this.generateSearch
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

		// main function this.generateSearch
		generateSearch: function() {
			$("#searchResultsMessage").show();

			var $this = $("#TooltipsEditor-searchInput");
			var $results = $("#TooltipsEditor-searchResults");
			var val = $this.val();
			var abort = false;

			if (val.trim() === "") return $results.html("<p>Enter a search term to start searching.</p>");

			var names = Object.keys(this.json).sort();
			var results = this.searchArray(names, val);

			if (results.length > 100) {
				results.length = 100;
				abort = true;
			}

			$results.empty();

			results.forEach(function(v) {
				$results[0].appendChild($("<li>", {
					html: [
						$("<a>", {
							href: mw.util.getUrl(v),
							title: v,
							text: v,
							target: "_blank",
						}),
						" (",
						 $("<a>", this.getEditParamPackage("edit", "TooltipsEditor-editTooltip", this.json, v)),
						"<span class='noselect'> &bull; </span>",
						$("<span>", this.getMinetipParamPackage("preview", "minetip TooltipsEditor-previewTooltip", this.json, v)),
						"<span class='noselect'> &bull; </span>",
						$("<a>", {
							"class": "TooltipsEditor-removeTooltip", 
							text: "remove",
							"data-key": v.replaceAll("&amp;", "&"), 
						}),
						")",
					],
				})[0]);
			}.bind(this));

			if (!results.length) return $results.html("<p>No tooltip matched your search.</p>");
			else if (abort) $results.append("<p>Showing the first 100 results.</p>");
			else $results.append("<p>Total: "+results.length+(results.length > 1 && " results" || " result" )+".</p>");
		},

		// helper functions for this.openEditor
		convertSlashes: function(s) {
			// [2.entry] json/preview format => editor view
			// inverse of this.replaceLines
			// with reference to MediaWiki:Common.js/minetip.js
			s = s.replaceAll(/\\\\/g, "&#92;").replaceAll(/\\\//g, "&#47;");
			return s.replaceAll(/\//g, "\n").replaceAll("&#92;", "\\").replaceAll("&#47;", "/");
		},

		// main function this.openEditor
		openEditor: function(values) {
			this.isInMain = false;
			values.oldKey = values.key;

			$("#TooltipsEditor-search").hide();
			$("#TooltipsEditor-editor").show();
			$("#TooltipsEditor header h3").text("Edit Panel");

			ace.tooltipsTextEditor.resize();
			ace.tooltipsTitleEditor.resize();

			ace.tooltipsTextEditor.setValue(this.convertSlashes(values.text || ""));
			ace.tooltipsTitleEditor.setValue(values.title || "");
			$("#TooltipsEditor-key").val(values.key || "");

			this.forEachInputBox(function(inter) {
				$("#TooltipsEditor-"+inter).val(values[inter] || "");
			});

			$(".qdmodal-button").hide();				
			$("#TooltipsEditor-save, #TooltipsEditor-preview, #TooltipsEditor-cancel").remove();
			var $button1 = $("<span>", {
				"class": "oo-ui-buttonElement",
				html: $("<button>", {
					id: "TooltipsEditor-save",
					text: "Save",
					"class": "oo-ui-buttonElement-button",
					click: this.onSave.bind(this, values.oldKey),
				}),
			});
			var $button2 = $("<span>", {
				"class": "oo-ui-buttonElement",
				html: $("<button>", {
					id: "TooltipsEditor-cancel",
					text: "Cancel",
					"class": "oo-ui-buttonElement-button",
					click: function() {
						this.reset(confirm("Go back to main page without saving?"));
					}.bind(this),
				}),
			});
			var $button3 = $("<span>", {
				id: "TooltipsEditor-preview-wrapper",
				"class": "oo-ui-buttonElement",
				html: $("<button>", {
					id: "TooltipsEditor-preview",
					"class": "minetip oo-ui-buttonElement-button",
					text: "Preview",
				}),
			});
			$("#TooltipsEditor-editor").append(
				$button1,
				$button2,
				$button3
			);
			this.updatePreview();
		},

		onSave: function(oldKey) {
			var otherparams = {};
			var values = {
				oldKey: oldKey,
				text: ace.tooltipsTextEditor.getValue(),
				title: ace.tooltipsTitleEditor.getValue(),
				key: $("#TooltipsEditor-key").val(),
			};
			this.forEachInputBox(function(inter) {
				values[inter] = $("#TooltipsEditor-"+inter).val();
				otherparams[inter] = values[inter].trim();
			}.bind(this));

			if (!values.key) return alert("You need to enter a tooltip ID!");

			var pass = true;
			this.forEachInputBox(function(inter, i, otherinputboxes) {
				var val = otherinputboxes[inter];
				if (! val.optional) {
					if (!values[inter]) {
						pass = false;
						return alert("You need to enter the tooltip's "+val.display+"!");
					}
				}
			}.bind(this));
			if (!pass) return;

			this.throwOldjson(values.oldKey);
			this.throwOldjson(values.key);

			if (values.oldKey) delete this.json[values.oldKey];
			this.editor.addClass("mw-ajax-loader");
			$(".qdmodal-button").show();		
			$("#TooltipsEditor-editor, #searchResultsMessage").hide();

			this.parsewithUIText().then(function(data) {
				this.json[values.key] = Object.assign({
					text: values.text ? this.getParsedText(data) : undefined,
					title: values.title.trim(),
				}, otherparams);
				this.isInMain = true;
				this.data = this.json;
	
				this.updateActions([values.oldKey, values.key]);
				this.reset(true);
			}.bind(this));
		},

		// helper functions for this.MainProcess
		processResult: function(d) {
			// [1.entry] lua data => json/preview format
			// inverse of this.applyReplacements
				// note: double-backslash and escaped quotes are treated as one character
				// in both lua and json. No replacement needed
			return JSON.parse(d);
		},
		reset: function(confirm) {
			if (confirm) {
				$("#TooltipsEditor-search").show();
				$("#TooltipsEditor-searchResults").empty();
				$("#searchResultsMessage, #TooltipsEditor-editor").hide();
				$("#TooltipsEditor > section").removeClass("mw-ajax-loader");
				ace.tooltipsTextEditor.setValue("");
				ace.tooltipsTitleEditor.setValue("");
				$("#TooltipsEditor-key, #TooltipsEditor-name").val("");
				$(".qdmodal-button").show();
				if ($("#TooltipsEditor-searchInput").val().trim() !== "") this.generateSearch();
				$("#TooltipsEditor header h3").text("Tooltips Editor");
			}
		},
		processColors: function() {
			return Object.keys(this.colorConversions).map(function(v, i, a) {
				return $("<a>", {
					"class": "TooltipsEditor-insertFormat" + ((i === a.length-1) && " TooltipsEditor-last" || ""),
					text: this.colorConversions[v].replaceAll("_", " ").replaceAll(/(\w)(\w*)/g, function(_, $1, $2) { 
						return $1.toUpperCase() + $2;
					}),
					"data-insert": "&" + v,
				});
			}.bind(this));
		},
		processRarityTexts: function() {
			return Object.keys(this.rarityConversions).map(function(v, i, a) {
				return $("<span>", {
					html: [
						$("<a>", {
							"class": "TooltipsEditor-insertFormat",
							text: v,
							"data-insert": "&l&" + this.rarityConversions[v] + v.toUpperCase().replaceAll(/[()]/g, ""),
							style: "font-style: italic;",
						}),
						$("<a>", {
							"class": "TooltipsEditor-insertFormat" + ((i === a.length-1) && " TooltipsEditor-last" || ""),
							text: this.shortForm[v],
							"data-insert": "&" + this.rarityConversions[v],
							style: "font-style: italic;",
						}),
					]
				});
			}.bind(this));
		},
		replaceLines: function(s) {
			// [2.exit] editor view => json/preview format
			// inverse of this.convertSlashes
			s = s.replaceAll(/\\/g, "&#92;").replaceAll(/\//g, "&#47;");
			return s.replaceAll("&#92;", "\\\\").replaceAll("&#47;", "\\/").replaceAll(/\n/g, "/");
		},
		parsewithUIText: function() {
			return api.post({
				action: "parse", 
				contentmodel: "wikitext",
				text: "{{UIText|" + ace.tooltipsTextEditor.getValue() + "|}}",
			});
		},
		getParsedText: function(data) {
			return $(data.parse.text["*"]).find("p").html().trim().replaceAll(/&amp;/g, "&").replaceAll(/&nbsp;/g, " ");
		},
		updatePreview: function() {
			// no parser solution (quick)
			$("#TooltipsEditor-preview").attr({
				"data-minetip-text": this.replaceLines(ace.tooltipsTextEditor.getValue()), 
				"data-minetip-title": ace.tooltipsTitleEditor.getValue(),
			});
			// experimental solution (slow)
			/*
			this.parsewithUIText().then(function(data) {
				$("#TooltipsEditor-preview").attr({
					// "data-minetip-text": this.replaceLines(ace.tooltipsTextEditor.getValue()), // no parser solution
					"data-minetip-text": this.getParsedText(data),
					"data-minetip-title": ace.tooltipsTitleEditor.getValue(),
				});
			}.bind(this));
			*/
		},
		insertText: function(text) {
			var editor = this.lastFocusedEditor;
			if (!editor && this.lastFocusedElement) {
				return this.lastFocusedElement.textSelection("encapsulateSelection", {
					pre: text,
					peri: "",
				}), true;
			}

			editor.insert(text, 1);

			return true;
		},
		setupEditor: function(id) {
			var aceEditor = ace.edit(id);
			var mode = new (ace.require("ace/mode/javascript").Mode)();
			mode.HighlightRules = ace.require("ace/mode/minecraft-tooltips").MinecraftHighlightRules;
			aceEditor.session.setMode(mode);

			if (id === "TooltipsEditor-text-AceEditor") {
				aceEditor.setOptions({
					wrapBehavioursEnabled: true,
					wrap: true,
				});

				aceEditor.session.on("change", function() {
					var height = aceEditor.session.getScreenLength()
						* aceEditor.renderer.lineHeight
						+ aceEditor.renderer.scrollBar.getWidth() + "px";

					$(id).css({ height: height });
					aceEditor.resize();

					if (aceEditor.session.getScreenWidth() > 1000) {
						$(id).css({ width: "1000px" });
					}
				});
			}

			aceEditor.session.on("change", this.updatePreview.bind(this));
			aceEditor.on("focus", function() {
				this.lastFocusedEditor = aceEditor;
			}.bind(this));

			return aceEditor;
		},

		onMatch: function(str) {
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
		},
		MinecraftHighlightRules: function() {
			var formats = [];

			this.$rules = {
				start: [{
					regex: /&([0-9a-f])/,
					token: function(code) {
						this.nextCode = code;
						that.colorRules["color-" + code].formats = [];
						return "escape.format.code.color";
					},
					next: function() {
						return "color-" + this.nextCode;
					},
					onMatch: that.onMatch,
				}, {
					regex: /&r/,
					token: function() {
						formats = [];
						return "escape.format.code.color";	
					},
				}, that.escapes, {
					regex: /&([l-o])/,
					token: function(code) {
						formats.push(that.conversions[code]);
						return "escape.format.code.color";
					},
				}, {
					regex: /[^\0]/,
					token: function() {
						var ret = "text.formatted";
						
						formats.forEach(function(code) {
							ret += ".format_" + code;
						});
						return ret;
					},
				}],
			};

			for (var prefix in that.colorRules) {
				if (that.colorRules.hasOwnProperty(prefix)) {
					var data = that.colorRules[prefix];
					
					this.$rules[prefix] = data.rules;
				}
			}

		   this.normalizeRules();
		},

		// main function this.MainProcess
		MainProcess: function() {
			this.oldjson = {};
			this.json = {};
			this.actions = [];

			if (arguments.length > 1) {
				var jsonStr = [];

				// Merge result into a single string to limit JSON.parse() calls
				if (Array.isArray(arguments[0])) {
					Array.from(arguments).forEach(function(v) {
						jsonStr.push(v[0]["return"].replaceAll(/^\{|\}$/g, ""));
					});
				}
				else jsonStr.push(arguments[0]["return"].replaceAll(/^\{|\}$/g, ""));
				// Parse String
				this.json = this.processResult("{" + jsonStr.join(",") + "}");
			} else {
				this.json = this.processResult(arguments[0]);
			}

			this.editor = $("#TooltipsEditor > section");
			this.data = this.json;
			this.oldjsonkeys = Object.keys(this.json);

			ace.define("ace/mode/minecraft-tooltips", [], function(require, exports) {
				var oop = require("../lib/oop");
				var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

				this.colorRules = {};
				this.colorConvList.split("").forEach(function(code) {
					this["color-" + code] = {
						formats: [],
						rules: [{
							token: function(code) {
								this.nextCode = code;
								return "escape.format.code.color";
							},
							regex: /&([0-9a-f])/,
							next: function() {
								return "color-" + this.nextCode;
							},
							onMatch: that.onMatch,
						}, {
							regex: /&([l-o])/,
							token: function(code) {
								this.formats.push(that.conversions[code]);
								return "escape.format.code.text";
							},
						}, {
							token: "language.escape.format.code",
							regex: /&r/,
							next: "start",
						}, that.escapes, {
							regex: /[^\0]/,
							token: function() {
								var ret = "format.color.format-" + code + ".code";

								this.formats.forEach(function(code) {
									ret += ".format_" + code;
								});
								return ret;
							},
						}],
					};

					var data = this["color-" + code];
					data.rules[0].token = data.rules[0].token.bind(data);
					data.rules[0].next = data.rules[0].next.bind(data);
					data.rules[1].token = data.rules[1].token.bind(data);
					data.rules[4].token = data.rules[4].token.bind(data);
				}, this.colorRules);

				var MinecraftHighlightRules = this.MinecraftHighlightRules;

				oop.inherits(MinecraftHighlightRules, TextHighlightRules);

				exports.MinecraftHighlightRules = MinecraftHighlightRules;
			}.bind(this));
			
			var otherparams = [];
			this.forEachInputBox(function(inter, i, otherinputboxes) {
				var val = otherinputboxes[inter];
				otherparams.push(
					$("<span>", { text: "Tooltip "+val.display+": ", "class": "TooltipsEditor-inputbox-label TooltipsEditor-label" }),
					$("<input>", { id: "TooltipsEditor-"+inter, "class": "TooltipsEditor-inputbox" })
				);

				if (val.optional)
					otherparams.push($("<span>", { text: "(*Optional)", "class": "TooltipsEditor-inputbox-note" }));

				otherparams.push("<br>");
			}.bind(this));

			this.editor.empty();
			this.editor.append(
				$("<div>", {
					id: "TooltipsEditor-search",
					html: [
						$("<div>", { text: "Tooltips Editor Main Page", id: "TooltipsEditor-pageTitle" }),
						$("<div>", { id: "TooltipsEditor-totalTooltips" }),
						$("<div>", { id: "TooltipsEditor-searchRow", html: [
							$("<div>", { text: "Search Existing Tooltip: ", id: "TooltipsEditor-searchLabel" }),
							$("<div>", { html: [
								$("<input>", {
									id: "TooltipsEditor-searchInput",
									keyup: this.generateSearch.bind(this),
								}),
								"<span style='margin: 0 1em; font-weight: bold; text-transform: uppercase;'>or</span>",
								$("<span>", {
									"class": "oo-ui-buttonElement",
									html: [
										$("<button>", {
											id: "TooltipsEditor-addNew",
											"class": "oo-ui-buttonElement-button",
											text: "Add New Tooltip",
											click: function() {
												this.openEditor({});
											}.bind(this),
										}),
									],
								}),
							]}),
						]}),
						$("<ul>", {
							id: "TooltipsEditor-actionLog",
						}),
						$("<div>", {
							id: "TooltipsEditor-undoLog",
						}),
						"<br>",
						$("<span>", { text: "Search Results: ", id: "searchResultsMessage" }),
						$("<ul>", {
							id: "TooltipsEditor-searchResults",
						}),
						$("<div>", {
							"class": "footer-link",
							html: [
								$("<span>", {
									html: [
										"(",
										$("<a>", {
											href: mw.util.getUrl("MediaWiki:Gadget-TooltipsEditor.js"),
											text: "View JavaScript",
											target: "_blank"
										}),
										")",
									],
								}),
							],
						}),
					],
				}),
				$("<div>", {
					id: "TooltipsEditor-editor",
					style: "display: none;",
					html: Array.prototype.concat(
					[
						"This editor uses Minecraft\'s ",
						$("<a>", {
							href: "https://minecraft.gamepedia.com/Formatting codes",
							text: "formatting codes",
							title: "https://minecraft.gamepedia.com/Formatting codes",
							target: "_blank",
						}),
						" and the template ",
						$("<code>", {
							html: [
								"{{",
								$("<a>", {
									href: mw.util.getUrl("Template:UIText"),
									text: "UIText",
									title: "Template:UIText",
									target: "_blank",
								}),
								"}}", 
							],
						}), 
						"for extra formatting. Click the links for more info.",
						"<br>",
						$("<fieldset>", {
							id: "TooltipsEditor-insertionTool",
							html: [
								$("<legend>", { text: "Toolbox (Click to Insert)"}),
								$("<div>", {
									html: [
										$("<span>", { text: "Formatting" }),
										$("<div>", { id: "TooltipsEditor-insertFormat", html: this.processColors(), "class": "noselect" }),
										"<hr>",
										$("<span>", { text: "Special Character" }),
										$("<div>", { id: "TooltipsEditor-insertChar", html: this.specialchars, "class": "noselect" }),
										"<hr>",
										$("<span>", { text: "Rarity Text/Color" }),
										$("<div>", { id: "TooltipsEditor-insertFormat", html: this.processRarityTexts(), "class": "noselect" }),
									],
								}),
							],
						}),"<br>",
						$("<span>", { text: "Tooltip ID: ", "class": "TooltipsEditor-inputbox-label TooltipsEditor-label" }),
						$("<input>", { id: "TooltipsEditor-key", "class": "TooltipsEditor-inputbox" }),
						"<br>",
					],
					otherparams,
					[
						$("<span>", { text: "Tooltip Title: ", "class": "TooltipsEditor-label" }),
						$("<div>", {
							id: "TooltipsEditor-title-AceEditor"
						}),
						$("<span>", { text: "Tooltip Text: ", "class": "TooltipsEditor-label" }),
						$("<div>", {
							id: "TooltipsEditor-text-AceEditor"
						}),
					]),
				})
			);

			$(".TooltipsEditor-insertFormat:not('.TooltipsEditor-last')").after($("<span>", {
				text: " • ",
			}));
			this.editor.removeClass("mw-ajax-loader");
			this.updateActions();

			$("#TooltipsEditor-key, #TooltipsEditor-name").focus(function() {
				that.lastFocusedElement = $(this);
				that.lastFocusedEditor = null;
			});

			$(".TooltipsEditor-insertFormat").click(function() {
				var $this = $(this);
				var insert = $this.attr("data-insert");

				if (that.lastFocusedEditor) {
					var editor = that.lastFocusedEditor;

					var selection = editor.selection;
					if (!selection.ranges.length) {
						editor.insert(insert);
					} else {
						selection.ranges.forEach(function(range) {
							editor.session.insert({ 
								row: range.start.row, 
								column: range.start.column,
							}, insert);
						});
					}
					that.lastFocusedEditor.focus();
				}
				else if (that.lastFocusedElement) that.lastFocusedElement.focus();
			});

			window.ace.tooltipsTextEditor = this.setupEditor("TooltipsEditor-text-AceEditor");
			window.ace.tooltipsTitleEditor = this.setupEditor("TooltipsEditor-title-AceEditor");

			$(document.body).on("click", ".TooltipsEditor-insertChar", function(e) {
				e.preventDefault();
				e.stopImmediatePropagation();

				if (that.lastFocusedEditor) {
					that.insertText($(this).attr("data-insert") || $(this).text());
					that.lastFocusedEditor.focus();
				}
				else if (that.lastFocusedElement) that.lastFocusedElement.focus();
			});

			$(document.body).on("click", ".TooltipsEditor-removeTooltip", function() {
				var $this = $(this);
				var key = $this.attr("data-key");

				that.throwOldjson(key);
				delete that.json[key];
				that.updateActions(key);
				that.generateSearch();
			});

			$(document.body).on("click", ".TooltipsEditor-editTooltip, .actions-edit-button", function() {
				var $this = $(this);

				var otherparams = {};
				that.forEachInputBox(function(inter) {
					otherparams[inter] = $this.attr("data-tooltip-"+inter);
				});

				that.openEditor(Object.assign({
					text: $this.attr("data-tooltip-text"), 
					title: $this.attr("data-tooltip-title"), 
					key: $this.attr("data-tooltip-key"),
				}, otherparams));
			});
		},

		// helper functions for this.onClick
		luaTableToJson: function(s) {
			return api.post({
				action: "scribunto-console",
				title: mw.config.get("wgPageName"),
				question: "=mw.text.jsonEncode(p)",
				content: s,
			});
		},
		applyReplacements: function(s) {
			// [1.exit] json/preview format => lua data
			// inverse of this.processResult
				// note: double-backslash and escaped quotes are treated as one character
				// in json, they should be escaped again for lua to understand
			return s.replaceAll(/\\/g, '\\\\').replaceAll(/(['"])/g, "\\$1");
		},
		editorCloseHandler: function() {
			this.closing = true;

			if (confirm("Are you sure you want to save and close the editor?")) {
				this.modal.hide();
				mw.notify("Another popup should indicate a successful edit.", {
					title: "Processing Your Edit",
					type: "info",
				});
			} else return;

			var ret = [];

			Object.keys(this.data).sort().forEach(function(k) {
				var v = this.data[k];
				var otherparams = [];

				this.forEachInputBox(function(inter, i, otherinputboxes) {
					var val = otherinputboxes[inter];
					if (val.optional && (this.optionalParam(v[inter]) !== "")) {
						otherparams.push(
							inter + " = '" + (val.replace ? this.applyReplacements(v[inter]) : v[inter]) + "', "
						);
					}
					else if (!val.optional) {
						otherparams.push(
							v[inter] ? inter + " = '" + this.applyReplacements(v[inter]) + "', " : ""
						);
					}
				}.bind(this));

				ret.push(Array.prototype.concat(
					"\t['" + k.replaceAll(/(['"])/g, "\\$1") + "'] = {",
					otherparams,
					v.title ? "title = '" + this.applyReplacements(v.title) + "', " : "",
					v.text ? "text = '" + this.applyReplacements(v.text) + "', " : "",
					"},"
				).join(""));
			}.bind(this));

			ret = "return {\n" + ret.join("\n") + "\n}\n".replaceAll(/&amp;/g, "&");

			api.postWithEditToken({
				action: "edit",
				text: ret,
				title: mw.config.get("wgPageName"),
				summary: "Updating tooltips (TooltipsEditor)",
				minor: true,
			}).then(function(d) {
				console.log(d);
				var saved = "newrevid" in d.edit;
				if (saved) {
					mw.notify("Review your changes now!", {title: "Tooltips Saved!", type:"info"});
					location.href = new mw.Title(mw.config.get("wgPageName"), -1).getUrl({
						type: "revision",
						diff: d.edit.newrevid,
						oldid: d.edit.oldrevid,
					});
				}
				else {
					mw.notify("No changes were made.", {title: "Tooltips Saved!", type:"info"});
				}
			});

		},

		// main function this.onClick
		onClick: function(tooltips) {
			this.closing = false;

			$(window).on("beforeunload", function() {
				if (!this.closing)
					return "Are you sure you want to exit the page and discard your changes?";
			}.bind(this));

			this.modal.show({
				title: "Tooltips Editor",
				onHide: function() {
					if (!this.closing && confirm("Are you sure you want to exit the editor and discard your changes?")) {
						this.closing = true;
						return true;
					}
					else if (this.closing) return true;
					else return false;
				}.bind(this),
				buttons: [{
					text: "Save and Close",
					handler: this.editorCloseHandler.bind(this),
				}],
			});
			$("#TooltipsEditor > section").attr("class", "mw-ajax-loader");

			var promises = [];
			var split = tooltips.split("\n");

			// Split lua table into multiple tables due to size limitation of 500k bytes
			if (split.length > 1350) {
				var lines = split;
				lines.pop();
				lines.shift();

				for (var i = 0; i < lines.length; i += 900) {
					var ret = "return {\n" + lines.slice(i, i + 900).join("\n") + "\n}";
					promises.push(this.luaTableToJson(ret));
				}
			} else {
				promises = [this.luaTableToJson(tooltips)];
			}

			$.when.apply($, promises).then(this.MainProcess.bind(this), function(code, e) {
				return alert("Failed to parse Tooltips: ", e), console.warn("Failed to parse Tooltips: ", e);
			}).catch(console.warn);
		},

		// entry point
		init: function() {
			$("<link>", {
				rel: "stylesheet", 
				href: new mw.Title("Gadget-TooltipsEditor.css", 8).getUrl({ action: "raw", ctype: "text/css" })
			}).appendTo("head");

			$(".editTooltips").click(function() {
				api.get({
					action: "query",
					format: "json",
					prop: "revisions",
					titles: mw.config.get("wgPageName"),
					formatversion: 2,
					rvprop: "content",
					rvslots: "*",
				}).then(function(d) {
					var content = d.query.pages[0].revisions[0].slots.main.content;

					this.deloadAll();
					this.onClick(content);
				}.bind(this));
			}.bind(this));
		},
		secretDebugTool: function() {
			var it = prompt("Please enter an item to see its JSON");
			if (it !== null && it !== "") {
				if (it in this.json) {
					mw.notify("See results in console.", {title: "Debug: Found", type:"warn"});
					console.log(this.json[it]);
				}
				else mw.notify("Item not found.", {title: "Debug: Failed", type:"warn"});
			}
		},
	});

	that = TooltipsEditor; // using "TooltipsEditor" and defining "that" here so the editor won't complain about it
	this.init();
}.bind((window.TooltipsEditor = window.TooltipsEditor || Object.create(null)))).catch(console.warn);
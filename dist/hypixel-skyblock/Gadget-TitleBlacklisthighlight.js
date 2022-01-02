/* jshint
	esversion: 6, forin: true, 
	immed: true, indent: 4, 
	latedef: true, newcap: true,
	noarg: true, undef: true,
	undef: true, unused: true,
	browser: true, jquery: true,
	onevar: true, eqeqeq: true,
	multistr: true, maxerr: 999999,
	-W082
*/
/* global mw, ace */
"use strict";
mw.loader.using(["mediawiki.util", "mediawiki.Uri", "ext.codeEditor.ace", "ext.codeEditor.ace.modes", "ext.codeEditor"], function () {
	if (mw.config.get("wgPageName") !== mw.config.get("wgFormattedNamespaces")[8] + ":Titleblacklist" || mw.config.get("wgAction") !== "edit")
		return;

	console.log("[TitleBlacklistHighlight] Loading...");

	/* Styles */
	$("<link>", {
		rel: "stylehseet",
		href: new mw.Title("Gadget-TooltipsEditor.css", 8).getUrl({
			action: "raw",
			ctype: "text/css"
		}),
	}).appendTo("head");

	/*** Custom titleblacklist syntax highlighting rules  ***/
	ace.define("ace/mode/tb_highlight_rules", [], function (require, exports, module) { // jshint ignore:line
		var oop = require("../lib/oop");
		var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

		var TBHighlightRules = function () {

			this.$rules = {
				"start": [{
					token: "tb.comment",
					regex: "#[^\n]*",
				}, {
					// escapes
					token: "regexp.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)",
				}, {
					// escapes
					token: "regexp.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)",
				}, {
					// invalid operators
					token: "invalid",
					regex: /\{\d+\b,?\d*\}[*]|[+*$^?][*]|[$^][\+\*]|[$^][?]|\?{3,}|\+{3,}/,
				}, {
					// operators
					token: "constant.language.escape",
					regex: /\(\?[:=!]|<\w+?>|<[!=]|\)|\{\d+\b,?\d*\}[\?\+]?|[+*]\?|[\*\?\+]\+|[()$^+*?.]/,
				}, {
					token: "constant.language.delimiter",
					regex: /\|/
				}, {
					token: "constant.language.escape",
					regex: /\[\^?/,
					next: "regex_character_class",
				}, {
					token: "tb.flags.tag-open.xml",
					regex: "<",
					next: "tb_flags",
				}, {
					defaultToken: "string.regexp",
				}],

				"regex_character_class": [{
					token: "regexp.charclass.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
				}, {
					token: "constant.language.escape",
					regex: "]",
					next: "start",
				}, {
					token: "constant.language.escape",
					regex: "-",
				}, {
					token: "empty",
					regex: "$",
					next: "start",
				}, {
					defaultToken: "string.regexp.characterclass",
				}],

				"tb_flags": [{ // Single options
					token: "tb.flags.option",
					regex: "autoconfirmed|casesensitive|noedit|moveonly|newaccountonly|reupload",
				}, { // Options with values
					token: ["tb.flags.option.key", "tb.flags.option.keyword.operator", "tb.flags.option.string"],
					regex: "(errmsg)[ \t]*(=)[ \t]*([^\\|>]+)",
				}, {
					token: "tb.flags.seperator",
					regex: "\\|",
				}, {
					token: "empty",
					regex: "[ \t]+",
				}, {
					token: "empty",
					regex: "\n",
					next: "start",
				}, {
					token: "tb.flags.close",
					regex: ">",
					next: "start",
				}, {
					token: "empty",
					regex: "$",
					next: "start",
				}],
			};

			this.normalizeRules();
		};

		oop.inherits(TBHighlightRules, TextHighlightRules);

		exports.TBHighlightRules = TBHighlightRules;
	});

	ace.define("ace/mode/titleblacklist", [], function (require, exports, module) { // jshint ignore:line
		var oop = require("../lib/oop");
		var TextMode = require("./text").Mode;
		var TBHighlightRules = require("./tb_highlight_rules").TBHighlightRules;
		var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
		var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
		var CStyleFoldMode = require("./folding/cstyle").FoldMode;

		var Mode = function () {
			this.HighlightRules = TBHighlightRules;
			this.$outdent = new MatchingBraceOutdent();
			this.$behaviour = new CstyleBehaviour();
			this.foldingRules = new CStyleFoldMode();
		};

		oop.inherits(Mode, TextMode);

		(function () {
			this.lineCommentStart = "#";
			this.$quotes = {
				"{": "}",
				"[": "]",
				'"': '"',
				"'": "'",
				"`": "`",
			};
			this.checkOutdent = function (state, line, input) {
				return this.$outdent.checkOutdent(line, input);
			};
			this.autoOutdent = function (state, doc, row) {
				this.$outdent.autoOutdent(doc, row);
			};
			this.$id = "ace/mode/titleblacklist";
		}).call(Mode.prototype);

		exports.Mode = Mode;
	});

	var interval = setInterval(function () {
		if (!$(".ace_editor").length) return;

		var mode = new(ace.require("ace/mode/titleblacklist").Mode)();
		ace.edit($(".ace_editor")[0]).session.setMode(mode);
		clearInterval(interval);
		console.log("[TitleBlacklistHighlight] Found ACE editor, adding custom mode!");
	}, 1);
});
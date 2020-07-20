/*  @author Grunny 
    From https://harrypotter.wikia.com/wiki/MediaWiki:Wikia.js
    edited by leviathan_89
    modified by Vuh
*/
!function() {
	"use strict";
	var e = mw.config.get(["skin", "wgAction", "wgFormattedNamespaces", "wgNamespaceNumber", "wgScript"]),
		t = $("oasis" === e.skin ? "div.module_content:first" : "div.editButtons");
	if ("edit" === e.wgAction && t.exists() && 8 !== e.wgNamespaceNumber) {
		var i, n, o, l = {
			list: window.preloadTemplates_list || "MediaWiki:Custom-PreloadTemplates",
			subpage: window.preloadTemplates_subpage || "wzorzec"
		};
		window.dev && window.dev.i18n || importArticle({
			type: "script",
			article: "u:dev:MediaWiki:I18n-js/code.js"
		}), mw.hook("dev.i18n").add(function(s) {
			s.loadMessages("PreloadTemplates").then(function(s) {
				(i = s).useUserLang(), n = $("<div>", {
					id: "preload-templates"
				}), "oasis" === e.skin ? n.append($("<h3>", {
					text: a("preload")
				})) : n.text(a("preload")), o = $("<div>", {
					id: "pt-help"
				}).append($("<a>", {
					class: "tooltip-icon",
					target: "_blank",
					href: "//pl.elderscrolls.wikia.com/wiki/Pomoc:Infoboksy",
					text: "?"
				})), t.append(n), $.get(e.wgScript, {
					title: l.list,
					action: "raw",
					ctype: "text/plain"
				}).done(p).fail(c)
			})
		})
	} else console.log("[PreloadTemplates]: nie znaleziono kontenera lub strona nie jest wspierana.");

	function a(e) {
		return i.msg(e).plain()
	}

	function s(e) {
		return e.replace(/\s*<(includeonly|noinclude|nowiki)>(\n)?|(\n)?<\/(includeonly|noinclude|nowiki)>|--.*/g, "")
	}

	function r(e) {
		alert(i.msg("error", '"' + e + '"').plain())
	}

	function d(e, t) {
		if (document.selection) e.focus(), window.sel = document.selection.createRange(), window.sel.text = t;
		else if (e.selectionStart || 0 === e.selectionStart) {
			var i = e.selectionStart,
				n = e.selectionEnd;
			e.value = e.value.substring(0, i) + t + e.value.substring(n, e.value.length)
		} else e.value += t
	}

	function c() {
		n.append(i.msg("error", mw.html.element("a", {
			href: mw.util.getUrl(l.list)
		}, l.list)).plain(), o)
	}

	function p(t) {
		var i, p = s(t);
		"" !== p ? n.append($("<select>", {
			id: "pt-list",
			title: a("help"),
			html: (i = p, mw.html.element("option", {
				selected: !0,
				disabled: !0
			}, a("choose")) + i.split("\n").map(function(e) {
				if ("" === e.trim()) return "";
				if (0 === e.indexOf("*")) {
					var t = e.substring(1).trim();
					if (-1 !== t.indexOf("|")) {
						var i = t.split("|");
						return mw.html.element("option", {
							value: i[0].trim()
						}, i[1].trim())
					}
					return mw.html.element("option", {
						value: t
					}, t)
				}
				return mw.html.element("option", {
					disabled: !0
				}, e.trim())
			}).join())
		}).change(function() {
			var t, i, n = $(this),
				o = n.val();
			n.find("option:first-child").prop("selected", !0), t = o, i = e.wgFormattedNamespaces[8] + ":" + t + "/" + l.subpage, $.get(e.wgScript, {
				title: i,
				action: "raw",
				ctype: "text/plain"
			}).done(function(e) {
				var t = s(e);
				if ("" !== t) {
					var n = document.getElementsByClassName("cke_source"),
						o = document.getElementById("wpTextbox1");
					n.length ? d(n[0], t) : o ? d(o, t) : console.warn("[PreloadTemplates] Nie można znaleźć pola tekstowego do powiązania")
				} else r(i)
			}).fail(function() {
				r(i)
			})
		}), o) : c()
	}
}();
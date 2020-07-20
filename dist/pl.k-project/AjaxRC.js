/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 *
 * Original by pcj of Wowpedia
 * Maintenance, cleanup, style and bug fixes by:
 * Grunny (http://c.wikia.com/wiki/User:Grunny)
 * Kangaroopower (http://c.wikia.com/wiki/User:Kangaroopower)
 * Cqm (http://c.wikia.com/wiki/User:Cqm)
 * Vuh (http://c.wikia.com/wiki/User:Vuh)
 */
/*jshint browser:true, camelcase:true, curly:true, eqeqeq:true, immed:true, jquery:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, quotmark:single, trailing:true, undef:true, unused:true, onevar:true */
/*global mediaWiki:true, Wikia:true */
if(wgNamespaceNumber === -1) {
	(function(e, t, n, r) {
		"use strict";

		function p(e) {
			if(localStorage.getItem("AjaxRC-refresh") === null) {
				localStorage.setItem("AjaxRC-refresh", true)
			}
			if(e === false) {
				localStorage.setItem("AjaxRC-refresh", false)
			} else if(e === true) {
				localStorage.setItem("AjaxRC-refresh", true)
			}
			return JSON.parse(localStorage.getItem("AjaxRC-refresh"))
		}

		function d() {
			var r = t(".firstHeading").length ? t(".firstHeading") : t("#WikiaPageHeader .activity-nav").length ? t("#WikiaPageHeader .activity-nav ul") : t("#WikiaPageHeader").length ? t("#WikiaPageHeader h2") : t("#AdminDashboardHeader").length ? t("#AdminDashboardHeader > h1") : false,
				o = t('<span id="ajaxRefresh"></span>').css({
					"font-size": "xx-small",
					"line-height": "100%",
					"margin-left": "5px"
				}).append(t('<label id="ajaxToggleText" for="ajaxToggle"></label>').css({
					"border-bottom": "1px dotted",
					cursor: "help"
				}).attr("title", a).text(u + ":"), t('<input type="checkbox" id="ajaxToggle">').css({
					"margin-bottom": 0
				}), t('<span id="ajaxLoadProgress"></span>').css("display", "none").append(t("<img>").css({
					"vertical-align": "baseline",
					"float": "none",
					border: 0
				}).attr("src", s).attr("alt", "Odświeżanie strony"))),
				f;
			if(r === false) {
				t("#WikiaArticle").prepend(o)
			} else if(i.wgCanonicalSpecialPageName === "WikiActivity") {r.append($('<li>').css({"float": "right"}).append(o))} else {
				r.append(o)
			}
			f = r.find("#ajaxLoadProgress");
			t(document).ajaxSend(function(e, t, n) {
				if(location.href === n.url) {
					f.show()
				}
			}).ajaxComplete(function(r, s, o) {
				var u = t("#mw-content-text").find(".mw-collapsible"),
					a = e.ajaxCallAgain || [],
					l;
				if(location.href === o.url) {
					f.hide();
					if(u.length) {
						u.makeCollapsible()
					}
					if(i.wgCanonicalSpecialPageName === "Recentchanges") {
						n.special.recentchanges.init();
						if(t(".mw-recentchanges-table").find(".WikiaDropdown").length) {
							c.init()
						}
					}
					if(i.wgCanonicalSpecialPageName === "WikiActivity") {
						e.WikiActivity.init()
					}
					for(l = 0; l < a.length; l++) {
						a[l]()
					}
				}
			});
			t("#ajaxToggle").click(v);
			t("#ajaxToggle").attr("checked", p());
			if(p()) {
				m()
			}
		}

		function v() {
			if(t("#ajaxToggle").prop("checked") === true) {
				p(true);
				m()
			} else {
				p(false);
				clearTimeout(o)
			}
		}

		function m() {
			var e = t("<div>");
			e.load(location.href + " #mw-content-text", function() {
				var n = e.children("#mw-content-text");
				if(n.length) {
					t("#mw-content-text").replaceWith(n)
				}
				o = setTimeout(m, f)
			});
			e.remove()
		}
		var i = n.config.get(["stylepath", "wgAction", "wgCanonicalSpecialPageName", "wgPageName"]),
			s = "https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427020309&path-prefix=pl",
			o, u = "Auto-odświeżanie",
			a = "Automatycznie aktualizuje tę stronę",
			f = 6e4,
			l = ["Specjalna:Aktywność_na_wiki", "Specjalna:Ostatnie_zmiany", "Specjalna:Rejestr", "Specjalna:Nowe_pliki", "Specjalna:Nowe_strony", "Specjalna:Aktywność_na_wiki/activity", "Specjalna:Aktywność_na_wiki/watchlist"],
			c, h = ["delete", "edit", "protect", "revisiondelete"];
		t(function() {
			if(t.inArray(i.wgPageName, l) !== -1 && t("#ajaxToggle").length === 0 && t.inArray(i.wgAction, h) === -1) {
				d()
			}
		});
		c = {
			init: function() {
				this.$table = t(".mw-recentchanges-table");
				this.$dropdown = this.$table.find(".WikiaDropdown");
				this.$submit = this.$table.find('input[type="submit"]');
				this.$submit.on("click.RecentChangesDropdown", t.proxy(this.saveFilters, this));
				this.$submit.removeAttr("disabled");
				this.dropdown = new r.MultiSelectDropdown(this.$dropdown);
				this.dropdown.on("change", t.proxy(this.onChange, this))
			},
			saveFilters: function(n) {
				var r = this;
				n.preventDefault();
				r.dropdown.disable();
				r.$submit.attr("disabled", "disabled");
				if(r.dropdown.getSelectedValues().length === 0) {
					r.dropdown.doSelectAll(true)
				}
				t.nirvana.sendRequest({
					controller: "RecentChangesController",
					method: "saveFilters",
					data: {
						filters: r.dropdown.getSelectedValues()
					},
					type: "POST",
					format: "json",
					callback: function(t) {
						e.location.reload()
					}
				})
			}
		}
	})(this, jQuery, mediaWiki, Wikia)
}
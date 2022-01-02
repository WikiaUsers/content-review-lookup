/**
 * PartialLoadTool
 * 
 * Implements click-and-load for page content that uses the "partialLoad-settings" class.
 * @author MonkeysHK <https://dev.fandom.com/wiki/User:MonkeysHK>
 * @license BSD-3 clause <https://opensource.org/licenses/BSD-3-Clause>
 */
$.when(
	mw.loader.using(["mediawiki.util", "mediawiki.api"]),
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
	var that;
	var private_cache = {}; // data security: do not add this to window.partialLoadTool
	var partialLoadTool = window.partialLoadTool = Object.assign(this, {
		api: new mw.Api(),
		getSpinner: function() {
			return $("<div>", {
				style: "justify-content: center; display: flex; margin: 3em 0;",
				html: mw.libs.QDmodal.getSpinner(),
			});
		},
		parsePage: function(pagename) {
			return that.api.post({
				action: "parse",
				contentmodel: "wikitext",
				page: pagename,
				formatversion: 2,
			});
		},
		buttonclick: function(event) {
			event.preventDefault();
			var $this = $(this);
			var button = $this.parent();
			$this.text("Loading...");
			that.parsePage($this.attr("data-page"))
			.done(function(d) {
				var out = $("<div>", {
					class: "partialLoaded",
					html: d.parse.text,
				});
				button.after(out);
				button.remove();
			})
			.catch(console.warn);
		},
		tabclick: function(event) {
			event.preventDefault();
			var $this = $(this),
				$parent = $this.parents(".partialLoad-tabber"),
				$parenttab = $this.parents(".partialLoad-tabs__tab"),
				$frame = $parent.find(".partialLoad-frame"),
				requested_page = $this.attr("data-page"),
				cache_enabled = ($this.attr("data-cache") === "true");
			$parent.find(".selected").removeClass("selected");
			$parenttab.addClass("selected");
			if (cache_enabled && (requested_page in private_cache)) {
				$frame.html(private_cache[requested_page]);
			}
			else {
				$frame.empty().append(that.getSpinner());
				that.parsePage(requested_page)
				.done(function(d) {
					var requested_content = d.parse.text;
					private_cache[requested_page] = requested_content;
					$frame.html(requested_content);
					that.main();
				})
				.catch(console.warn);
			}
		},
		makeButton: function(pagename) {
			var button = $("<div>", {
				class: "page-header__actions",
				style: "text-align: center; width: 100%; clear: both; display: block;",
				html: $("<a>", {
					href: "#",
					html: "Load This Part Of Content",
					"data-page": pagename,
					click: that.buttonclick,
					class: "wds-button wds-is-text page-header__action-button has-label",
				}),
			});
			return button;
		},
		main: function() {
			$(".partialLoad-settings").each(function() {
				var el = $(this);
				var data = JSON.parse(el.attr("data-tabs"));
				if (!data.tabs.length) return;
				if (data.tabs.length == 1) {
					el.after(that.makeButton(data.tabs[0].pagename));
					el.remove();
				}
				else {
					var tabLabels = $("<div>", {
						class: "partialLoad-tabs__wrapper",
						html: $("<ul>", {
							class: "partialLoad-tabs",
							html: data.tabs.map(function(tab) {
								return $("<li>", {
									class: "partialLoad-tabs__tab",
									html: $("<div>", {
										html: $("<a>", {
											href: "#",
											text: tab.caption,
											"data-page": tab.pagename,
											"data-cache": tab.cache,
											click: that.tabclick,
										}),
										class: "partialLoad-tabs__label",
									}),
								});
							}),
						}),
					});
					var tabFrame = $("<div>", {
						class: "partialLoad-frame",
					});
					el.after($("<div>", {
						class: "partialLoad-tabber",
						html: [
							tabLabels,
							tabFrame,
						],
					}));
					el.remove();
					var activeTabIndex = parseInt(data.activeTabIndex);
					if (isNaN(activeTabIndex) || activeTabIndex > data.tabs.length || activeTabIndex < 1) {
						console.warn("[PartialLoad/Tabview] One or more tabbers have invalid active tab index. It will be changed to first tab.");
						activeTabIndex = 0;
					}
					else
						activeTabIndex--;
					tabLabels.find(".partialLoad-tabs__tab").eq(activeTabIndex).find("a").eq(0).trigger("click");
				}
			});
		},
		init: function() {
			$("<link>", {
				rel: "stylesheet", 
				href: new mw.Title("Gadget-PartialLoadTool.css", 8).getUrl({ action: "raw", ctype: "text/css" })
			}).appendTo("head");
			that.main();
		},
	});

	that = partialLoadTool;
	this.init();
});
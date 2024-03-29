/**
 * PartialLoadTool
 * 
 * Implements click-and-load for page content that uses the "partialLoad-settings" class.
 * @author MonkeysHK <https://dev.fandom.com/wiki/User:MonkeysHK>
 * @license BSD-3 clause <https://opensource.org/licenses/BSD-3-Clause>
 */

(function () {
    if (window.partialLoadTool && window.partialLoadTool.Loaded)
        return;
    window.partialLoadTool = window.partialLoadTool || {};
    window.partialLoadTool.Loaded = true;

    $.when(
        mw.loader.using(["mediawiki.util", "mediawiki.api"]),
        $.Deferred(function (def) {
            if (mw.libs.QDmodal) {
                def.resolve(mw.libs.QDmodal);
            } else {
                $.ajax({
                    cache: true,
                    dataType: "script",
                    url: "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:QDmodal.js"
                }).done(function () {
                    def.resolve(mw.libs.QDmodal);
                });
            }
        })
    ).then(function () {
        var that;
        var private_cache = {};
        var partialLoadTool = window.partialLoadTool = Object.assign(this, {
            api: new mw.Api(),
            getSpinner: function () {
                return $("<div>", {
                    class: "partialLoad-spinner",
                    html: mw.libs.QDmodal.getSpinner(),
                });
            },
            getFullPageName: function (page) {
                var pref = /^\//.test(page) && mw.config.get("wgPageName") || "";
                return pref + page;
            },
            doesNotExist: function (page) {
                return $("<div>", {
                    class: "partialLoaded",
                    html: "<span class=\"error italic\">Страница не существует, но вы можете <a href=\"/wiki/" + page + "?action=edit\">создайте её</a>.</span>",
                });
            },
            checkExists: function (pagename) {
                return new mw.Api().get({
                    action: "query",
                    format: "json",
                    prop: "revisions",
                    titles: pagename,
                    formatversion: 2,
                    rvprop: "content",
                    rvslots: "*",
                }).then(function (d) {
                    return d.query.pages[0].missing !== true;
                });
            },
            parsePage: function (pagename) {
                return that.api.post({
                    action: "parse",
                    contentmodel: "wikitext",
                    page: pagename,
                    formatversion: 2,
                });
            },
            buttonclick: function (event) {
                event.preventDefault();
                var $this = $(this),
                    button = $this.parent(),
                    requested_page = that.getFullPageName($this.attr("data-page"));
                $this.text("Загрузка...");
                that.checkExists(requested_page).then(function (exist) {
                    if (!exist) {
                        button.after(that.doesNotExist(requested_page));
                        button.remove();
                        return;
                    }
                    that.parsePage(requested_page)
                        .done(function (d) {
                            var out = $("<div>", {
                                class: "partialLoaded",
                                html: d.parse.text,
                            });
                            button.after(out);
                            mw.hook("wikipage.content").fire(out);
                            button.remove();
                        })
                        .catch(function (d, err) {
                            console.warn("[PartialLoad/Tabview] Не удалось проанализировать страницу " + requested_page + ". Смотрите ниже журнал ошибок.");
                            console.warn(d, err);
                        });
                });
            },
            reloadclick: function (event) {
                event.preventDefault();
                var $this = $(this),
                    $parent = $this.parents(".partialLoad-tabber").eq(0),
                    $frame = $parent.find(".partialLoad-frame"),
                    $tab = $parent.find(".partialLoad-tabs__tab.selected"),
                    requested_page = that.getFullPageName($tab.find(".partialLoad-tabs__label a").attr("data-page"));
                that.loadPage($frame, requested_page, $parent, $tab);
            },
            tabclick: function (event) {
                event.preventDefault();
                var $this = $(this),
                    $parent = $this.parents(".partialLoad-tabber").eq(0),
                    $tab = $this.parents(".partialLoad-tabs__tab").eq(0),
                    $frame = $parent.find(".partialLoad-frame"),
                    $actionLinks = $parent.find(".partialLoad-actionLinks"),
                    requested_page = that.getFullPageName($this.attr("data-page")),
                    cache_enabled = ($this.attr("data-cache") === "true"),
                    pageActions = [
                        "edit",
                        "view",
                        "history",
                        "purge",
                    ].map(function (act) {
                        return $("<a>", {
                            href: new mw.Title(requested_page).getUrl({
                                action: act,
                            }),
                            title: requested_page + "?action=" + act,
                            text: act,
                        });
                    }).concat([
                        $("<a>", {
                            href: "#",
                            // title: "Reload This Content",
                            text: "reload tab",
                            click: that.reloadclick,
                        }),
                    ]),
                    pageActions_ = [];

                pageActions.forEach(function (elm, i) {
                    pageActions_ = pageActions_.concat([
                        "[", elm, i < pageActions.length - 1 ? "] • " : "]"
                    ]);
                });
                $actionLinks.html(pageActions_);
                if (cache_enabled && (requested_page in private_cache)) {
                    var requested_content = private_cache[requested_page].clone();
                    $frame.empty().append(requested_content);
                    mw.hook("wikipage.content").fire(requested_content);
                    $parent.find(".selected").removeClass("selected");
                    $tab.addClass("selected");
                } else {
                    that.loadPage($frame, requested_page, $parent, $tab);
                }
            },
            loadPage: function ($frame, requested_page, $parent, $tab) {
                $frame.empty().append(that.getSpinner());
                that.checkExists(requested_page).then(function (exist) {
                    if (!exist) {
                        private_cache[requested_page] = that.doesNotExist(requested_page);
                        $frame.empty().append(private_cache[requested_page].clone());
                        $parent.find(".selected").removeClass("selected");
                        $tab.addClass("selected");
                        return;
                    }
                    that.parsePage(requested_page)
                        .done(function (d) {
                            private_cache[requested_page] = $(d.parse.text);
                            var requested_content = private_cache[requested_page].clone();
                            $frame.empty().append(requested_content);
                            mw.hook("wikipage.content").fire(requested_content);
                            $parent.find(".selected").removeClass("selected");
                            $tab.addClass("selected");
                        })
                        .catch(function (d, err) {
                            console.warn("[PartialLoad/Tabview] Не удалось проанализировать страницу " + requested_page + ". Смотрите ниже журнал ошибок.");
                            console.warn(d, err);
                        });
                });
            },
            makeButton: function (pagename, customButtonName) {
                var button = $("<div>", {
                    class: "partialLoad-loadContent",
                    html: $("<a>", {
                        href: "#",
                        html: customButtonName || "Загрузите Эту Часть Содержимого",
                        "data-page": pagename,
                        click: that.buttonclick,
                        class: "wds-button",
                    }),
                });
                return button;
            },
            main: function (section) {
                section = section && $(section).find(".partialLoad-settings") || $(".partialLoad-settings");
                section.each(function () {
                    var el = $(this);
                    var data = JSON.parse(el.attr("data-tabs"));
                    if (!data.tabs.length) return;
                    if (data.tabs.length === 1 && !data.forceTabber) {
                        el.after(that.makeButton(data.tabs[0].pagename, data.customButtonName));
                        el.remove();
                    } else {
                        var tabLabels = $("<div>", {
                            class: "partialLoad-tabs__wrapper article-scrollable",
                            html: $("<ul>", {
                                class: "partialLoad-tabs",
                                style: data.noTabs && "display:none",
                                html: data.tabs.map(function (tab) {
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
                        var tabLinks = $("<div>", {
                            class: "partialLoad-actionLinks__wrapper noselect",
                            html: $("<div>", {
                                class: "partialLoad-actionLinks",
                            })
                        });
                        var tabFrame = $("<div>", {
                            class: "partialLoad-frame article-scrollable",
                        });
                        el.after($("<div>", {
                            class: "partialLoad-tabber",
                            html: [
                                tabLabels,
                                tabLinks,
                                tabFrame,
                            ],
                        }));
                        el.remove();
                        var activeTabIndex = parseInt(data.activeTabIndex);
                        if (isNaN(activeTabIndex) || activeTabIndex > data.tabs.length || activeTabIndex < 1) {
                            console.warn("[PartialLoad/Tabview] Одна или несколько вкладок имеют недопустимый индекс активной вкладки. Он будет изменен на первую вкладку.");
                            activeTabIndex = 0;
                        } else
                            activeTabIndex--;
                        tabLabels.find(".partialLoad-tabs__tab").eq(activeTabIndex).find("a").eq(0).trigger("click");
                    }
                });
            },
            init: function () {
                // This hook forces it to apply script even in TabViews
                mw.hook("wikipage.content").add(function (pSection) {
                    that.main(pSection[0]);
                    // prevents adding more TOC icons
                    $("#toc .toctitle .wds-icon:not(\":first-child\")").remove();
                });
                $("<link>", {
                    rel: "stylesheet",
                    href: new mw.Title("Gadget-PartialLoadTool.css", 8).getUrl({
                        action: "raw",
                        ctype: "text/css"
                    })
                }).appendTo("head");
                that.main();
            },
        });

        that = partialLoadTool;
        this.init();
    });
}());
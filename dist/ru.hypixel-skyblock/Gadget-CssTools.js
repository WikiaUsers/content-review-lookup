/**
 * This is part of the CSS Integration Tool. This script can be used on any language environment.
 * Author: Hypixel SkyBlock Wiki
 * (Y01) Less
 * (Y02) Less Source Updater
 */
// Загружает Less, а программа обновления цветов персонала для администраторов
mw.loader.using(['mediawiki.api', 'mediawiki.Uri', 'mediawiki.Title', 'ext.fandom.ContentReview.legacyLoaders.js'], function () {
    var api = new mw.Api();
    var conf = mw.config.get([
    		"wgUserGroups",
        	"wgPageName",
        	"wgFormattedNamespaces",
        	"wgAction",
        	"wgContentLanguage",
        ]),
        enLessConfig = "https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Custom-Less.json",
        localLessConfig = mw.util.getUrl("MediaWiki:Custom-Less.json");
    if (!/bureaucrat|sysop|codeeditor|util|staff|helper|global-discussions-moderator|wiki-manager|content-team-member|soap/.test(conf.wgUserGroups.join("\n")))
        return;

    //###########################################
    /* ===Less=== (Y01) */
    function getJsonOrEmpty(url, dontLoadForEnglishWiki) {
        return $.Deferred(function (def) {
            if (dontLoadForEnglishWiki && conf.wgContentLanguage === "en")
                def.resolve([]);
            $.getJSON(url + "?action=raw&ctype=text/json")
                .done(function (dt) {
                    def.resolve(dt);
                })
                .fail(function () {
                    def.resolve([]);
                });
        });
    }
    $.when(
        // получить список страниц из английской Вики
        getJsonOrEmpty(enLessConfig, false),
        // также включите для страниц из локальной вики [[MediaWiki:Custom-Less.json]]
        getJsonOrEmpty(localLessConfig, true)
    ).then(function (lessJson, lessJsonLocal) {
        var lessPages = lessJson.concat(lessJsonLocal);
        var mwns = conf.wgFormattedNamespaces[8] + ":"; // локализованное пространство имен mw
        lessPages = ["Common.css", "Custom-common.less"].concat(lessPages).map(function (s) {
            return mwns + s;
        });
        // Prepare Less Script Options
        window.lessOpts = window.lessOpts || [];
        window.lessOpts.push({
            // это страница, на которой есть скомпилированный CSS
            target: mwns + "Common.css",
            // это страница, на которой перечислены меньшие файлы для компиляции
            source: mwns + "Custom-common.less",
            // это страницы, с которых вы хотите иметь возможность обновлять целевую страницу
            // обратите внимание, что у вас не должно быть более одной кнопки обновления на странице
            load: lessPages,
            // заголовок целевой страницы
            header: mwns + "Custom-css-header/common",
        });
        window.lessConfig = window.lessConfig || [];
        window.lessConfig = {
            // перезагружает страницу после успешного обновления целевой страницы
            reload: true,
            // оборачивает проанализированный CSS в предварительные теги, чтобы предотвратить любые нежелательные ссылки на шаблоны, страницы или файлы
            wrap: true,
            // разрешенные группы
            allowed: ["codeeditor"],
        };
        // Import Less Script
        importArticles({
            type: "script",
            articles: [
                "u:dev:MediaWiki:Less/code.2.js",
            ]
        });
    	// Display Page Links
        if (lessPages.includes(conf.wgPageName) && conf.wgAction === "view") {
            api.get({
                action: "query",
                titles: lessPages.join("|"),
                prop: "info"
            }).then(function (data) {
                if (data.error)
                    return console.warn(data.error);
                var allPages = Object.keys(data.query.pages).filter(function (k) {
                    return Number(k) > 0;
                }).map(function (k) {
                    return data.query.pages[k].title;
                }).sort().map(function (page) {
                    var pagelink = (new mw.Title(page, 0)).getUrl();
                    var li = $("<li style=\"display: inline;margin-right:1em;white-space:nowrap;\">");
                    li.append($("<a href=\"" + pagelink + "\">" + page.replaceAll(mwns, "").replaceAll("Custom-common.less/", "") + "</a>"));
                    return li;
                });
                var ul = $("<ul style=\"line-break:anywhere;\">");
                ul.append(allPages);
                var configlinks = "[<a href=\"" + enLessConfig + "\">en config</a>] " +
                    (conf.wgContentLanguage !== "en" ? "[<a href=\"" + localLessConfig + "\">local config</a>] " : "");
                var div = $("<div class=\"page-header__custom-pagelist\">");
                div.append([
                    $("<b>Список CSS-страниц: </b>"),
                    $("<small>", {
                        html: $("<span>", {
                            html: configlinks
                        })
                    }),
                    ul
                ]);
                $("#mw-clearyourcache").before(div);
            }).catch(console.warn);
        }
    }).catch(console.warn);

    //###########################################
    /* ===Less Source Обновление=== (Y02) */
    function updateLessSource() {
        return $.get("https://hypixel-skyblock.fandom.com/api.php", {
            action: "query",
            format: "json",
            prop: "revisions",
            titles: "MediaWiki:Custom-common.less",
            formatversion: 2,
            rvprop: "content",
            rvslots: "*",
        }).then(function (d) {
            if (d.query)
                if (d.query.pages[0].missing !== true)
                    // также заменяет @lang кодом локальной переменной
                    return d.query.pages[0].revisions[0].slots.main.content
                        .replace(/@lang: ".*?"/g, "@lang: \"/" + conf.wgContentLanguage + "\"");
                else {
                    new BannerNotification($("<div>", {
                        html: "<div>Сбой обновления. Не удалось получить источник.</div>",
                    }).prop("outerHTML"), "warn", null, 5000).show();
                    return false;
                }
            else {
                new BannerNotification($("<div>", {
                    html: "<div>Сбой обновления. Смотрите консоль для получения информации об ошибке.</div>",
                }).prop("outerHTML"), "warn", null, 5000).show();
                console.warn(d);
            }
        }).then(function (content) {
            if (content) {
                api.postWithEditToken({
                        action: "edit",
                        format: "json",
                        watchlist: "nochange",
                        title: "MediaWiki:Custom-common.less",
                        text: content,
                        summary: "Обновление Less source (source: [[:en:MediaWiki:Custom-common.less]])",
                    }).done(function () {
                        new BannerNotification($("<div>", {
                            html: "<div>Обновление прошло успешно!</div>",
                        }).prop("outerHTML"), "confirm", null, 5000).show();
                    })
                    .fail(function (err) {
                        new BannerNotification($("<div>", {
                            html: "<div>Сбой обновления. Смотрите консоль для получения информации об ошибке.</div>",
                        }).prop("outerHTML"), "warn", null, 5000).show();
                        console.warn(err);
                    });
            }
        });
    }
    var allowedPages = [conf.wgFormattedNamespaces[8] + ":" + "Custom-common.less", conf.wgFormattedNamespaces[8] + ":" + "Common.css"];
    if (allowedPages.includes(conf.wgPageName) &&
        conf.wgAction === "view" &&
        conf.wgContentLanguage !== "en") {
        $("#mw-content-text").prepend($("<a>", {
            class: "wds-button",
            html: $("<div>", {
                click: function () {
                    var $this = $(this);
                    if (confirm("Обновление без источника из английской Вики?")) {
                        $this.text("Обновление...");
                        $this.attr({
                            disabled: true
                        });
                        updateLessSource().then(function () {
                            $this.text("Обновление Less source");
                            $this.removeAttr("disabled");
                        });
                    }
                },
                text: "Обновление Less source",
                title: "Обновление без источника из английской Вики",
            }),
            title: "Обновление без источника из английской Вики",
            css: {
                cursor: "pointer",
                margin: "0 0 5px 5px",
            }
        }));
    }
});
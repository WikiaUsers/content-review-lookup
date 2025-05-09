/**
 * AjaxContentModel
 * 
 * Allows users to quickly change the content model of a page without reloading.
 * @author Thundercraft5 <https://dev.fandom.com/wiki/User:Thundercraft5>
 * @license BSD-3 clause <https://opensource.org/licenses/BSD-3-Clause>
 * @doc https://dev.fandom.com/wiki/AjaxContentModel
 * @version 1.0
 */

/* global $, mw, importArticles, BannerNotification */

$.when.apply($, [
    $.Deferred(function (def) {
        if (window.AjaxContentModelLOADED)
            def.reject("Script double loaded");
        else {
            window.AjaxContentModelLOADED = true;
            def.resolve();
        }
    }),
    mw.loader.using([
        "mediawiki.api",
        "mediawiki.user",
        "ext.fandom.bannerNotifications.js"
    ]).then(function () {
        var api = new mw.Api();

        return $.when(
            api.get({
                action: "query",
                format: "json",
                meta: "siteinfo",
                siprop: "specialpagealiases",
            }).then(function (d) {
                return d.query.specialpagealiases;
            }),
            api.loadMessagesIfMissing([
                "content-model-css",
                "content-model-javascript",
                "content-model-json",
                "content-model-text",
                "content-model-wikitext",
                "changecontentmodel-model-label",
                "changecontentmodel-legend",
                "changecontentmodel-reason-label",
                "changecontentmodel-submit",
            ])
        );
    }),
    $.Deferred(function (def) {
        mw.hook("dev.i18n").add(function (i18n) {
            i18n.loadMessages("AjaxContentModel").then(function (i18n) {
                def.resolve(i18n);
            });
        });
    }),
    mw.loader.using('mediawiki.user').then(function () {
        return mw.user.getRights();
    }),
].concat([
    "ui",
    "modal",
].map(function (lib) {
    return $.Deferred(function (def) {
        mw.hook("dev." + lib).add(function () {
            def.resolve();
        });
    });
}))).then(function (_, aliases, i18n, rights) {
    "use strict";

    aliases = aliases[0];
    var that;
    var AjaxContentModel = that = this; // jshint ignore:line
    var api = new mw.Api();

    if (!rights.includes("editcontentmodel")) return this.log("User cannot change content models, exiting...");
    this.log("Loaded!");

    Object.assign(this, {
        changeModel: function (page, model, reason) {
            return api.post({
                title: decodeURIComponent(page),
                model: model,
                summary: reason,
                token: mw.user.tokens.get("csrfToken"),
                action: "changecontentmodel",
                format: "json",
            }).then(this.onResolve);
        },

        onResolve: function (html) {
            var $html = $(html).find("#mw-content-text");
            var $permErrors = $html.is(".permission-errors") && ($html.find("p").first().text() + $html.find("p").first().next().text().trim());
            var $wrongValue = $html.find("label").eq(4).text();
            var $success = $html.find("p").html();
            var $invalidData = $html.find("li[role=\"alert\"].oo-ui-fieldLayout-messages-error").text();
            var isError = !!($permErrors || $invalidData || $wrongValue);

            new BannerNotification($("<div>", {
                html: [
                    "<div><b>" + (isError ? "Failed to change content model." : "Successfully changed the content model!") + "</b></div>",
                    $permErrors || $invalidData || $wrongValue || $success,
                ]
            }).prop("outerHTML"), isError ? "warn" : "confirm").show();

        },

        onSubmit: function () {
            var mainReason = $("#AjaxContentModel-reason").val();
            var secondaryReason = $("#AjaxContentModel-secondary-reason").val();
            var model = $("#AjaxContentModel-model").val();

            this.changeModel($("#AjaxContentModel-form").attr("data-page"), model, mainReason && secondaryReason ? mainReason + ": " + secondaryReason : secondaryReason || mainReason);
            this.modal.close();
        },

        showModal: function (page, model, reason) {
            this.modal.setContent({
                children: [{
                    type: "form",
                    attr: {
                        id: "AjaxContentModel-form",
                        "data-page": page,
                    },
                    children: [{
                        type: "span",
                        html: i18n.msg("model-change-warning", page).parse(),
                    }, {
                        type: "div",
                        html: i18n.msg("current-model", this.MODELS[this.wg.wgPageContentModel]).parse(),
                    }, {
                        type: "div",
                        id: "AjaxContentModel-input",
                        children: [{
                            type: "div",
                            attr: {
                                id: "AjaxContentModel-model-wrapper"
                            },
                            children: [{
                                type: "label",
                                attr: {
                                    id: "AjaxContentModel-model-label"
                                },
                                text: mw.msg("changecontentmodel-model-label") + ": ",
                            }, {
                                type: "select",
                                attr: {
                                    id: "AjaxContentModel-model"
                                },
                                children: this.createModelSelection(model),
                            }],
                        }, {
                            type: this.reasons === null ? "span" : "div",
                            attr: {
                                id: "AjaxContentModel-reason-wrapper"
                            },
                            children: [{
                                type: "label",
                                id: "AjaxContentModel-reason-label",
                                text: mw.msg("changecontentmodel-reason-label") + " ",
                            }, {
                                type: "select",
                                attr: {
                                    id: "AjaxContentModel-reason"
                                },
                                children: this.reasons !== null && this.createReasonsSelection(),
                                condition: this.reasons !== null,
                            }],
                        }, {
                            type: this.reasons === null ? "span" : "div",
                            attr: {
                                id: "AjaxContentModel-secondary-reason-wrapper"
                            },
                            children: [{
                                type: "input",
                                attr: {
                                    id: "AjaxContentModel-secondary-reason",
                                    type: "text",
                                    value: reason || ""
                                },
                            }],
                        }],
                    }],
                }]
            });
            this.modal.show();
            setTimeout(function () {
                that.modal._modal.updateSize();
            }, 0);
        },

        createModelSelection: function (model) {
            return Object.keys(this.MODELS).filter(function (key) {
                return (key !== this.wg.wgPageContentModel && key !== "Scribunto") ||
                    this.wg.wgNamespaceNumber === 828 &&
                    (key === "Scribunto" && this.wg.wgPageContentModel !== "Scribunto");
            }, this).map(function (key) {
                return {
                    type: "option",
                    attr: {
                        value: key,
                        selected: (model && key === model) || undefined,
                    },
                    html: this[key],
                };
            }, this.MODELS);
        },

        createReasonsSelection: function () {
            var reasons = this.reasons;

            return Object.keys(reasons).map(function (key) {
                if (typeof (reasons[key]) === "object") return {
                    type: "optgroup",
                    attr: {
                        label: key
                    },
                    children: Object.keys(reasons[key]).map(function (key) {
                        return {
                            type: "option",
                            attr: {
                                value: key,
                            },
                            text: this[key],
                        };
                    }, reasons[key]),
                };
                else return {
                    type: "option",
                    attr: {
                        value: key,
                    },
                    text: this[key],
                };
            }, reasons);
        },

        getTitle: function (href) {
            var uri = new URL(href),
            	params = uri.searchParams,
            	target = params.get('pagetitle');

            var pageName = uri.pathname.replace(this.wg.wgArticlePath, "");
            var indexedSpecialPage = params.get('title') && new mw.Title(params.get('title')).title;
            pageName = pageName.slice(0, !~pageName.indexOf("?") ? pageName.length : pageName.indexOf("?") + 1);

            var split = new mw.Title(indexedSpecialPage || pageName).title.split("/");
            target = split.length > 1 ? split.slice(1).join("/") : target;

            var title = decodeURIComponent(split[0]);
            var isContentModelUrl = aliases.includes(title) || title === "ChangeContentModel";

            return {
                title: title,
                target: target,
                query: Object.fromEntries(params),
            };
        },

        onLinkClick: function (e) {
            var url = this.getTitle(e.target.href);
            var isContentModelUrl = this.aliases.includes(url.title) || url.title === "ChangeContentModel";

            if (!isContentModelUrl || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            this.showModal(url.target, url.query.model, url.query.reason);
        },
    });

    Object.assign(this, {
        aliases: aliases.find(function (d) {
            return d.realname === "ChangeContentModel";
        }).aliases,
        ui: window.dev.ui,
        i18n: i18n,
        modal: new window.dev.modal.Modal({
            id: "AjaxContentModel-modal",
            title: mw.msg("changecontentmodel-legend"),
            content: "",
            buttons: [{
                event: "onSubmit",
                id: "AjaxContentModel-submit",
                primary: true,
                text: mw.msg("changecontentmodel-submit"),
            }],
            events: {
                onSubmit: this.onSubmit.bind(this),
            },
            size: "large",
        }),
        MODELS: {
            wikitext: mw.msg("content-model-wikitext"),
            GeoJSON: i18n.msg("content-model-geojson").parse(),
            Scribunto: i18n.msg("content-model-scribunto").parse(),
            text: i18n.msg("content-model-text").parse(),
            css: mw.msg("content-model-css"),
            javascript: mw.msg("content-model-javascript"),
            json: mw.msg("content-model-json"),
        },
    });

    this.modal.create();
    this.wg.wgArticlePath = this.wg.wgArticlePath.slice(0, -2);

    $(document.body).on("click", "a[href]", this.onLinkClick.bind(this));
    if (this.toolbarPlacement && this.wg.wgNamespaceNumber !== -1) $(this.toolbarPlacement === "mytools" ? "ul.mytools" : "ul.tools").prepend($("<li>", {
        class: "overflow",
        html: $("<a>", {
            text: mw.msg("changecontentmodel-legend"),
            "data-name": "changecontentmodel",
            href: mw.util.getUrl(this.aliases[0], {
                pagetitle: this.wg.wgPageName
            }),
        }),
    }));

    if (this.appendToContentMenu && this.wg.wgNamespaceNumber !== -1 && $(".page-header__actions .wds-dropdown a:contains(Change content model)").length === 0) $("#ca-unprotect, #ca-protect").first().parent().after($("<li>", {
        html: $("<a>", {
            text: mw.msg("changecontentmodel-legend"),
            id: "ca-changecontentmodel",
            href: mw.util.getUrl(this.aliases[0], {
                pagetitle: this.wg.wgPageName
            }),
        }),
    }));

    if (this.doKeyBind && this.wg.wgNamespaceNumber !== -1) {
        window.Mousetrap.bind(this.shortcutKey, function () {
            this.showModal(this.wg.wgPageName, null, "");
        }.bind(this));
    }
}.bind(function () {
    // Pre-import actions
    Object.assign(this, {
        SCRIPT_NAME: "AjaxContentModel",
        SCRIPT_VERSION: 1.0,
        LOGGER_METHODS: [
            "debug",
            "log",
            "warn",
            "error",
        ],
        IMPORTS: {
            "u:dev:MediaWiki:Modal.js": "modal",
            "u:dev:MediaWiki:UI-js/code.js": "ui",
            "u:dev:MediaWiki:I18n-js/code.js": "i18n",
        },
        DEFAULTS: {
            reasons: null,
            doKeyBind: true,
            shortcutKey: "c",
            toolbarPlacement: "toolbar",
            appendToContentMenu: true,
        },
        wg: mw.config.get([
            "wgPageName",
            "wgArticlePath",
            "wgFormattedNamespaces",
            "wgNamespaceNumber",
            "wgPageContentModel",
        ]),
    });

    // Default config values
    Object.keys(this.DEFAULTS).forEach(function (key) {
        if (!(key in this)) this[key] = this.DEFAULTS[key];
    }, this);

    Object.values(this.LOGGER_METHODS).forEach(function (method) {
        this[method] = function () {
            var consoleArgs = ["[" + method.toUpperCase() + "] [" + this.SCRIPT_NAME + " v" + this.SCRIPT_VERSION.toPrecision(2) + "]"].concat(Array.from(arguments));
            console[method].apply(null, consoleArgs);

            return consoleArgs.slice(1).join(" ");
        }.bind(this);
    }, this);

    this.IMPORTS = Object.keys(this.IMPORTS).filter(function (script) {
        return !window.dev || !(this[script] in window.dev);
    }, this.IMPORTS);

    if (!(this.SCRIPT_NAME in window && window[this.SCRIPT_NAME].LOADED) && this.IMPORTS.length > 0) {
        importArticles({
            type: "script",
            articles: this.IMPORTS,
        });
    }
    window[this.SCRIPT_NAME + "LOADED"] = true;

    return this;
}.call((window.AjaxContentModel = window.AjaxContentModel || Object.create(null))))).catch(function (e) {
    this.warn("Script failed to load: " + (e.stack || e));
}.bind(window.AjaxContentModel));
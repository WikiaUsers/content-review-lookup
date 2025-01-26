$(function () {
    window.nkch = window.nkch || {};
    nkch.theme = nkch.theme || {};

    var WDS, API;

    const VueLoader = mw.loader.using(["vue"])
        .then(function (require) {
            return require("vue");
        });

    function init() {
        VueLoader
            .then(construct);
    }

    function construct(Vue) {
        var startingTheme = mw.user.options.get("theme");

        const el = document.createElement("div");
        el.classList.add("nkch-theme-toggler__app");

        const target = mw.config.get("skin") === "fandomdesktop"
            ? document.querySelector(".page-counter")
            : document.querySelector(".mobile-community-bar__navigation .mobile-community-bar__level-1");

        target.after(el);

        const cssRules = [
            /* ~ basic ~ */
            ".nkch-theme-toggler__app { margin-inline-end: 6px; }",
            ".nkch-theme-toggler__wrapper { background-color: var(--theme-body-background-color); border: 1px solid var(--theme-community-header-color); border-radius: 15px; display: flex; height: 30px; justify-content: center; position: relative; width: 86px; }",
            ".nkch-theme-toggler { border-radius: 15px; display: flex; overflow: hidden; position: relative; z-index: 2; }",
            ".nkch-theme-toggler__button { align-items: center; background: none; border: none; cursor: pointer; display: flex; height: 28px; justify-content: center; width: 28px; z-index: 2; }",
            ".nkch-theme-toggler__button .wds-icon-small { fill: var(--theme-community-header-color); transition: .3s; }",
            ".nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--theme-body-background-color); transition: .7s; }",
            ".nkch-theme-toggler__handle { background-color: var(--theme-community-header-color); border-radius: 15px; height: 26px; margin: 1px; position: absolute; transition: .3s; width: 26px; z-index: 1; will-change: margin-left; }",
            ".nkch-theme-toggler:has(.nkch-theme-toggler__button--dark.is-active) .nkch-theme-toggler__handle { margin-left: -56px; }",
            ".nkch-theme-toggler:has(.nkch-theme-toggler__button--wiki.is-active) .nkch-theme-toggler__handle { margin-left: 0; }",
            ".nkch-theme-toggler:has(.nkch-theme-toggler__button--light.is-active) .nkch-theme-toggler__handle { margin-left: 56px; }",
            /* ~ sticky header ~ */
            "#community-navigation .nkch-theme-toggler__sticky-placement { margin-inline-start: auto; margin-inline-end: 6px; }",
            "#community-navigation .nkch-theme-toggler__sticky-placement + .wiki-tools { margin-inline-start: 0; }",
            "#community-navigation .nkch-theme-toggler__wrapper { background-color: var(--theme-sticky-nav-background-color); border-color: var(--theme-sticky-nav-text-color); }",
            "#community-navigation .wds-icon-small { fill: var(--theme-sticky-nav-text-color); }",
            "#community-navigation .nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--theme-sticky-nav-background-color); }",
            "#community-navigation .nkch-theme-toggler__handle { background-color: var(--theme-sticky-nav-text-color); }",
            /* ~ FandomMobile ~ */
            ".skin-fandommobile .nkch-theme-toggler__app { margin: 9px auto 0 auto; }",
            ".skin-fandommobile .nkch-theme-toggler__wrapper { background-color: var(--fandom-global-nav-background-color); border: 1px solid var(--fandom-global-nav-text-color); }",
            ".skin-fandommobile .nkch-theme-toggler__button-icon .wds-icon-small { fill: var(--fandom-global-nav-text-color); }",
            ".skin-fandommobile .nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--fandom-global-nav-background-color); }",
            ".skin-fandommobile .nkch-theme-toggler__handle { background-color: var(--fandom-global-nav-text-color); }"
        ];

        mw.util.addCSS(cssRules.join(" "));

        const style_light = document.createElement("style");
        style_light.setAttribute("rel", "stylesheet");
        style_light.disabled = true;

        document.head.append(style_light);

        const style_dark = document.createElement("style");
        style_dark.setAttribute("rel", "stylesheet");
        style_dark.disabled = true;

        document.head.append(style_dark);

        const c_Root = {
            name: "nkch-theme-root",
            template:
                "<Teleport :disabled='!this.inStickyNav' to='.nkch-theme-toggler__sticky-placement'>" +
                    "<div class='nkch-theme-toggler__wrapper'>" +
                        "<div class='nkch-theme-toggler'>" +
                            "<button class='nkch-theme-toggler__button nkch-theme-toggler__button--dark' ref='dark' />" +
                            "<button class='nkch-theme-toggler__button nkch-theme-toggler__button--wiki' ref='wiki' />" +
                            "<button class='nkch-theme-toggler__button nkch-theme-toggler__button--light' ref='light' />" +
                        "</div>" +
                        "<div class='nkch-theme-toggler__handle' :style='{ marginLeft: this.position }' />" +
                    "</div>" +
                "</Teleport>",
            data: function () {
                return {
                    theme: startingTheme,
                    inStickyNav: document.querySelector("#community-navigation").classList.contains("is-visible")
                };
            },
            computed: {
                position: function () {
                    return { light: "56px", dark: "-56px", wiki: "0px" }[this.theme];
                }
            },
            methods: {
                changeTheme: function (theme) {
                    this.theme = theme;
                    this.changeButton(theme);

                    var modules = [];
                    skin = mw.config.get("skin");

                    if (skin === "fandomdesktop") {
                        if (theme === "light") {
                            if (document.body.classList.contains("theme-fandomdesktop-dark")) {
                                document.body.classList.remove("theme-fandomdesktop-dark");
                                document.body.classList.add("theme-fandomdesktop-light");
                            }

                            if (document.body.dataset["theme"] === "dark")
                                document.body.dataset["theme"] = "light";

                            mw.config.set("isDarkTheme", false);
                        }

                        if (theme === "dark") {
                            if (document.body.classList.contains("theme-fandomdesktop-light")) {
                                document.body.classList.remove("theme-fandomdesktop-light");
                                document.body.classList.add("theme-fandomdesktop-dark");
                            }

                            if (document.body.dataset["theme"] === "light")
                                document.body.dataset["theme"] = "dark";

                            mw.config.set("isDarkTheme", true);
                        }

                        modules.push(
                            "ext.fandom.GlobalComponents.GlobalNavigationTheme." + theme + ".css",
                            "ext.fandom.GlobalComponents.GlobalComponentsTheme." + theme + ".css"
                        );
                    } else if (skin === "fandommobile") {
                        if (theme === "light") {
                            if (document.body.classList.contains("theme-fandomdesktop-dark")) {
                                document.body.classList.remove("theme-fandomdesktop-dark");
                                document.body.classList.add("theme-fandomdesktop-light");
                            }

                            mw.config.set("isDarkTheme", false);
                        }

                        if (theme === "dark") {
                            if (document.body.classList.contains("theme-fandomdesktop-light")) {
                                document.body.classList.remove("theme-fandomdesktop-light");
                                document.body.classList.add("theme-fandomdesktop-dark");
                            }

                            mw.config.set("isDarkTheme", true);
                        }

                        modules.push(
                            "ext.fandom.GlobalComponents.GlobalNavigationTheme." + theme + ".css",
                            "ext.fandom.GlobalComponents.GlobalComponentsTheme.nav-" + theme + ".css",
                            "ext.fandom.GlobalComponents.GlobalComponentsTheme." + theme + ".css",
                            "skin.fandommobile.fandom." + theme + ".css"
                        );
                    }

                    function loadTheme() {
                        Promise.all([
                            $.get({
                                url: mw.util.wikiScript("wikia"),
                                data: {
                                    controller: "ThemeApi",
                                    method: "themeVariables",
                                    variant: theme
                                }
                            }),
                            $.get({
                                url: mw.util.wikiScript("load"),
                                data: {
                                    modules: modules.join("|"),
                                    only: "styles",
                                    skin: mw.config.get("skin")
                                }
                            })
                        ]).then(applyData);

                        function applyData(data) {
                            switch (theme) {
                                case "light":
                                    style_light.disabled = false;
                                    style_dark.disabled = true;

                                    style_light.innerHTML = data[0] + "\n" + data[1];
                                    break;
                                case "dark":
                                    style_light.disabled = true;
                                    style_dark.disabled = false;

                                    style_dark.innerHTML = data[0] + "\n" + data[1];
                                    break;
                            }

                            modules = [];
                        }
                    }

                    switch (theme) {
                        case "light":
                            if (style_light.innerHTML !== "") {
                                style_light.disabled = false;
                                style_dark.disabled = true;
                            } else loadTheme();
                            break;
                        case "dark":
                            if (style_dark.innerHTML !== "") {
                                style_dark.disabled = false;
                                style_light.disabled = true;
                            } else loadTheme();
                            break;
                    }

                    API.postWithToken("csrf", {
                        action: "options",
                        optionname: "theme",
                        optionvalue: theme
                    });
                },
                changeButton: function (theme) {
                    document.querySelectorAll(".nkch-theme-toggler > .nkch-theme-toggler__button")
                        .forEach(function (e) {
                            return e.classList.remove("is-active");
                        });

                    this.$refs[theme].classList.add("is-active");
                }
            },
            beforeMount: function () {
                const stickyPlacement = document.createElement("div");
                stickyPlacement.classList.add("nkch-theme-toggler__sticky-placement");

                document.querySelector("#community-navigation .wiki-tools")
                    .before(stickyPlacement);
            },
            mounted: function () {
                var buttonDark = this.$refs.dark,
                    buttonWiki = this.$refs.wiki,
                    buttonLight = this.$refs.light;

                buttonDark.append(WDS.icon("moon-small"));

                var that = this;

                buttonDark.addEventListener("click", function () {
                    that.changeTheme("dark");
                });

                buttonWiki.append(WDS.icon("radio-empty-small"));

                buttonWiki.addEventListener("click", function () {
                    that.changeTheme("wiki");
                });

                buttonLight.append(WDS.icon("sun-small"));

                buttonLight.addEventListener("click", function () {
                    that.changeTheme("light");
                });

                var observer = new MutationObserver(function (mutations) {
                    that.$data.inStickyNav = mutations[0].target.classList.contains("is-visible");
                });

                observer.observe(document.querySelector("#community-navigation"), {
                    attributes: true,
                    attributeFilter: ["class"]
                });

                this.changeButton(startingTheme);
            }
        };

        Vue.createMwApp(c_Root).mount(".nkch-theme-toggler__app");
    }

    if (!nkch.theme.isActive) {
        nkch.theme.isActive = true;

        mw.loader.using(["mediawiki.api", "mediawiki.util"], function () {
            mw.hook("dev.wds").add(function (wds) {
                WDS = wds;
                API = new mw.Api();

                init();
            });

            importArticle({
                type: "script",
                article: "u:dev:MediaWiki:WDSIcons/code.js"
            });
        });
    }
});
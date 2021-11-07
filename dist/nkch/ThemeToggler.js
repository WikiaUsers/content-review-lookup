var nkch = typeof window.nkch != "undefined" ? window.nkch : new Object();
window.nkch = nkch;

nkch.tt = typeof nkch.tt != "undefined" ? nkch.tt : new Object();

if (!nkch.tt.isActive) {
    nkch.tt.isActive = true;
    nkch.tt.inStickyNav = false;

    mw.loader.using(["mediawiki.api", "mediawiki.util"], function () {
        const api = new mw.Api();

        mw.hook("dev.wds").add(
            function (wds) {
                var currentTheme = mw.user.options.get("theme");

                function addClasses(element) {
                    element.$classes.forEach(
                        function (c) {
                            element.$e.classList.add(c);
                        }
                    );
                }

                mw.util.addCSS(
                    ".nkch-theme-toggler__wrapper { background: var(--theme-body-background-color); border: 1px solid var(--theme-community-header-color); border-radius: 15px; display: flex; height: 30px; justify-content: center; margin-inline-end: 6px; position: relative; }" +
                    ".nkch-theme-toggler { border-radius: 15px; display: flex; overflow: hidden; position: relative; z-index: 2; }" +

                    ".nkch-theme-toggler__button { align-items: center; background: none; border: none; cursor: pointer; display: flex; height: 28px; justify-content: center; width: 28px; z-index: 2; }" +
                    ".nkch-theme-toggler__button-icon { color: currentColor; height: 18px; width: 18px; }" +
                    ".nkch-theme-toggler__button-icon .wds-icon-small { fill: var(--theme-community-header-color); transition: .5s; }" +
                    ".nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--theme-body-background-color); transition: .7s; }" +

                    ".nkch-theme-toggler__pointer-wrapper { align-items: center; display: flex; height: 28px; justify-content: center; position: absolute; top: 0; transition: .3s; width: 28px; z-index: 1; will-change: transform, z-index ;}" +
                    ".nkch-theme-toggler__pointer { background: var(--theme-community-header-color); border-radius: 15px; height: 26px; margin: 1px; width: 26px; }" +

                    ".fandom-sticky-header .nkch-theme-toggler__wrapper { margin-inline-start: auto; }" +
                    ".fandom-sticky-header .nkch-theme-toggler__wrapper +  .wiki-tools { margin-inline-start: 0; }"
                );

                nkch.tt.el = {
                    theme: {
                        common: {
                            $e: document.createElement("style")
                        },
                        nav: {
                            $e: document.createElement("style")
                        }
                    },
                    wrapper: {
                        $e: document.createElement("div"),
                        $classes: ["nkch-theme-toggler__wrapper"]
                    },
                    toggler: {
                        $e: document.createElement("div"),
                        $classes: ["nkch-theme-toggler"],
                        buttons: {
                            dark: {
                                $e: document.createElement("button"),
                                $classes: ["nkch-theme-toggler__button", "nkch-theme-toggler__button-dark"],
                                icon: {
                                    $e: document.createElement("div"),
                                    $classes: ["nkch-theme-toggler__button-icon", "nkch-theme-toggler__button-icon-dark"]
                                }
                            },
                            default: {
                                $e: document.createElement("button"),
                                $classes: ["nkch-theme-toggler__button", "nkch-theme-toggler__button-default"],
                                icon: {
                                    $e: document.createElement("div"),
                                    $classes: ["nkch-theme-toggler__button-icon", "nkch-theme-toggler__button-icon-default"]
                                }
                            },
                            light: {
                                $e: document.createElement("button"),
                                $classes: ["nkch-theme-toggler__button", "nkch-theme-toggler__button-light"],
                                icon: {
                                    $e: document.createElement("div"),
                                    $classes: ["nkch-theme-toggler__button-icon", "nkch-theme-toggler__button-icon-light"]
                                }
                            }
                        }
                    },
                    pointerWrapper: {
                        $e: document.createElement("div"),
                        $classes: ["nkch-theme-toggler__pointer-wrapper"],
                        pointer: {
                            $e: document.createElement("div"),
                            $classes: ["nkch-theme-toggler__pointer"],
                        }
                    }
                }

                addClasses(nkch.tt.el.wrapper);

                addClasses(nkch.tt.el.toggler);
                nkch.tt.el.wrapper.$e.append(nkch.tt.el.toggler.$e);

                addClasses(nkch.tt.el.toggler.buttons.dark);
                nkch.tt.el.toggler.$e.append(nkch.tt.el.toggler.buttons.dark.$e);

                nkch.tt.el.toggler.buttons.dark.$e.animate([{
                    opacity: 0,
                    transform: "translateY(20px)"
                }, {
                    transform: "translateY(-5px)",
                    offset: 0.6
                }, {
                    opacity: 1,
                    transform: "translateY(0)"
                }], {
                    duration: 500,
                    easing: "ease"
                });

                addClasses(nkch.tt.el.toggler.buttons.dark.icon);
                nkch.tt.el.toggler.buttons.dark.$e.append(nkch.tt.el.toggler.buttons.dark.icon.$e);
                nkch.tt.el.toggler.buttons.dark.icon.$e.append(wds.icon("moon-small"));

                addClasses(nkch.tt.el.toggler.buttons.default);
                nkch.tt.el.toggler.$e.append(nkch.tt.el.toggler.buttons.default.$e);

                nkch.tt.el.toggler.buttons.default.$e.animate([{
                    opacity: 0,
                    transform: "translateY(20px)"
                }, {
                    transform: "translateY(-5px)",
                    offset: 0.65
                }, {
                    opacity: 1,
                    transform: "translateY(0)"
                }], {
                    duration: 500,
                    easing: "ease"
                });

                addClasses(nkch.tt.el.toggler.buttons.default.icon);
                nkch.tt.el.toggler.buttons.default.$e.append(nkch.tt.el.toggler.buttons.default.icon.$e);
                nkch.tt.el.toggler.buttons.default.icon.$e.append(wds.icon("radio-empty-small"));

                addClasses(nkch.tt.el.toggler.buttons.light);
                nkch.tt.el.toggler.$e.append(nkch.tt.el.toggler.buttons.light.$e);

                nkch.tt.el.toggler.buttons.light.$e.animate([{
                    opacity: 0,
                    transform: "translateY(20px)"
                }, {
                    transform: "translateY(-5px)",
                    offset: 0.7
                }, {
                    opacity: 1,
                    transform: "translateY(0)"
                }], {
                    duration: 500,
                    easing: "ease"
                });

                addClasses(nkch.tt.el.toggler.buttons.light.icon);
                nkch.tt.el.toggler.buttons.light.$e.append(nkch.tt.el.toggler.buttons.light.icon.$e);
                nkch.tt.el.toggler.buttons.light.icon.$e.append(wds.icon("sun-small"));

                addClasses(nkch.tt.el.pointerWrapper);

                if (nkch.tt.el.toggler.buttons.dark.$e.classList.contains("is-active")) {
                    nkch.tt.el.pointerWrapper.$e.style.marginLeft = "-56px";
                }

                if (nkch.tt.el.toggler.buttons.light.$e.classList.contains("is-active")) {
                    nkch.tt.el.pointerWrapper.$e.style.marginRight = "-56px";
                }

                nkch.tt.el.wrapper.$e.append(nkch.tt.el.pointerWrapper.$e);

                nkch.tt.el.pointerWrapper.$e.animate([{
                    transform: "translateY(0)",
                    zIndex: -1,
                }, {
                    transform: "translateY(-30px)",
                    zIndex: -1,
                    offset: 0.4
                }, {
                    transform: "translateY(-30px)",
                    zIndex: 1,
                    offset: 0.5
                }, {
                    transform: "translateY(2px)",
                    zIndex: 1,
                    offset: 0.9
                }, {
                    transform: "translateY(0)",
                    zIndex: 1,
                }], {
                    duration: 500,
                    easing: "ease"
                });

                addClasses(nkch.tt.el.pointerWrapper.pointer);
                nkch.tt.el.pointerWrapper.$e.append(nkch.tt.el.pointerWrapper.pointer.$e);

                switch (currentTheme) {
                    case "light":
                        nkch.tt.el.toggler.buttons.light.$e.classList.add("is-active");
                        break;
                    case "dark":
                        nkch.tt.el.toggler.buttons.dark.$e.classList.add("is-active");
                        break;
                    case "wiki":
                        nkch.tt.el.toggler.buttons.default.$e.classList.add("is-active");
                        break;
                }

                function switchButton(button) {
                    document.querySelectorAll(".nkch-theme-toggler > .nkch-theme-toggler__button").forEach(
                        function (e) {
                            e.classList.remove("is-active");
                        }
                    );

                    button.classList.add("is-active");
                }

                nkch.tt.el.theme.common.$e.setAttribute("type", "text/css");
                document.head.append(nkch.tt.el.theme.common.$e);

                nkch.tt.el.theme.nav.$e.setAttribute("type", "text/css");
                document.head.append(nkch.tt.el.theme.nav.$e);

                function changeTheme(theme) {
                    if (theme === "light" && document.body.classList.contains("theme-fandomdesktop-dark")) {
                        document.body.classList.remove("theme-fandomdesktop-dark");
                        document.body.classList.add("theme-fandomdesktop-light");
                        mw.config.set("isDarkTheme", false);
                    } else if (theme === "dark" && document.body.classList.contains("theme-fandomdesktop-light")) {
                        document.body.classList.remove("theme-fandomdesktop-light");
                        document.body.classList.add("theme-fandomdesktop-dark");
                        mw.config.set("isDarkTheme", true);
                    }

                    if (theme !== "wiki" && (theme === "light" || theme === "dark")) {
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
                                    modules: "ext.fandom.DesignSystem.GlobalNavigation.brand." + theme + ".css" + "|" + "ext.fandom.DesignSystem.brand." + theme + ".css",
                                    only: "styles"
                                }
                            })
                        ]).then(
                            function (data) {
                                nkch.tt.el.theme.common.$e.innerHTML = data[0];
                                nkch.tt.el.theme.nav.$e.innerHTML = data[1];

                                api.postWithToken("csrf", {
                                    action: "options",
                                    optionname: "theme",
                                    optionvalue: theme
                                });
                            }
                        );
                    } else {
                        api.postWithToken("csrf", {
                            action: "options",
                            optionname: "theme",
                            optionvalue: theme
                        });
                    }
                }

                nkch.tt.el.toggler.buttons.dark.$e.addEventListener("click", function () {
                    switchButton(nkch.tt.el.toggler.buttons.dark.$e);
                    changeTheme("dark");
                });

                nkch.tt.el.toggler.buttons.default.$e.addEventListener("click", function () {
                    switchButton(nkch.tt.el.toggler.buttons.default.$e);
                    changeTheme("wiki");
                });

                nkch.tt.el.toggler.buttons.light.$e.addEventListener("click", function () {
                    switchButton(nkch.tt.el.toggler.buttons.light.$e);
                    changeTheme("light");
                });

                function checkIfActive() {
                    if (nkch.tt.el.toggler.buttons.default.$e.classList.contains("is-active")) {
                        nkch.tt.el.pointerWrapper.$e.style.marginLeft = null;
                        nkch.tt.el.pointerWrapper.$e.style.marginRight = null;
                    } else if (nkch.tt.el.toggler.buttons.dark.$e.classList.contains("is-active")) {
                        nkch.tt.el.pointerWrapper.$e.style.marginLeft = "-56px";
                        nkch.tt.el.pointerWrapper.$e.style.marginRight = null;
                    } else if (nkch.tt.el.toggler.buttons.light.$e.classList.contains("is-active")) {
                        nkch.tt.el.pointerWrapper.$e.style.marginLeft = null;
                        nkch.tt.el.pointerWrapper.$e.style.marginRight = "-56px";
                    }
                }

                setInterval(checkIfActive, 100);

                const $togglerElement = $(nkch.tt.el.wrapper.$e);

                function checkIfStickyNavIsVisible() {
                    switch (document.querySelector(".fandom-sticky-header.is-visible") !== null) {
                        case true:
                            if (nkch.tt.inStickyNav === false) {
                                $togglerElement.detach();
                                $(".fandom-sticky-header > .wiki-tools").before($togglerElement);
                                nkch.tt.inStickyNav = true;
                            }
                            break;
                        case false:
                            if (nkch.tt.inStickyNav === true) {
                                $togglerElement.detach();
                                $(".page-counter").after($togglerElement)
                                nkch.tt.inStickyNav = false;
                            }
                            break;
                    }
                }

                setInterval(checkIfStickyNavIsVisible, 100);

                $(".page-counter").after($togglerElement);
            }
        );

        importArticle({
            type: "script",
            article: "u:dev:MediaWiki:WDSIcons/code.js"
        });
    });
}
var nkch = window.nkch ? window.nkch : new Object();
window.nkch = nkch;

nkch.tt = nkch.tt ? nkch.tt : new Object();

if (!nkch.tt.isActive) {
    nkch.tt.isActive = true;
    nkch.tt.isInStickyNav = false;

    mw.loader.using(["mediawiki.api", "mediawiki.util"], function () {
        const api = new mw.Api();

        mw.hook("dev.wds").add(function (wds) {
            var currentTheme = mw.user.options.get("theme");

            function addClasses(element) {
                element.$classes.forEach(function (c) {
                    return element.$e.classList.add(c);
                });
            }

            mw.util.addCSS(
                /* ~ basic ~ */
                ".nkch-theme-toggler__wrapper { background-color: var(--theme-body-background-color); border: 1px solid var(--theme-community-header-color); border-radius: 15px; display: flex; height: 30px; justify-content: center; margin-inline-end: 6px; position: relative; width: 86px; }" +
                ".nkch-theme-toggler { border-radius: 15px; display: flex; overflow: hidden; position: relative; z-index: 2; }" +

                ".nkch-theme-toggler__button { align-items: center; background: none; border: none; cursor: pointer; display: flex; height: 28px; justify-content: center; width: 28px; z-index: 2; }" +
                ".nkch-theme-toggler__button-icon { color: currentColor; height: 18px; width: 18px; }" +
                ".nkch-theme-toggler__button-icon .wds-icon-small { fill: var(--theme-community-header-color); transition: .5s; }" +
                ".nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--theme-body-background-color); transition: .7s; }" +

                ".nkch-theme-toggler__pointer-wrapper { align-items: center; display: flex; height: 28px; justify-content: center; position: absolute; top: 0; transition: .3s; width: 28px; z-index: 1; will-change: transform, z-index ;}" +
                ".nkch-theme-toggler__pointer { background-color: var(--theme-community-header-color); border-radius: 15px; height: 26px; margin: 1px; width: 26px; }" +

                /* ~ sticky header ~ */
                ".fandom-sticky-header .nkch-theme-toggler__wrapper { background-color: var(--theme-sticky-nav-background-color); border-color: var(--theme-sticky-nav-text-color); margin-inline-start: auto; }" +
                ".fandom-sticky-header .nkch-theme-toggler__wrapper + .wiki-tools { margin-inline-start: 0; }" +

                ".fandom-sticky-header .nkch-theme-toggler__button-icon .wds-icon-small { fill: var(--theme-sticky-nav-text-color); }" +
                ".fandom-sticky-header .nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--theme-sticky-nav-background-color); }" +

                ".fandom-sticky-header .nkch-theme-toggler__pointer { background-color: var(--theme-sticky-nav-text-color); }" + 

                /* ~ FandomMobile ~ */
                ".skin-fandommobile .nkch-theme-toggler__wrapper { background-color: var(--fandom-global-nav-background-color); border: 1px solid var(--fandom-global-nav-text-color); margin: 9px auto 0 auto; }" +
                ".skin-fandommobile .nkch-theme-toggler__button-icon .wds-icon-small { fill: var(--fandom-global-nav-text-color); }" +
                ".skin-fandommobile .nkch-theme-toggler__button.is-active .wds-icon-small { fill: var(--fandom-global-nav-background-color); }" +
                ".skin-fandommobile .nkch-theme-toggler__pointer { background-color: var(--fandom-global-nav-text-color); }"
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

            addClasses(nkch.tt.el.toggler.buttons.dark.icon);
            nkch.tt.el.toggler.buttons.dark.$e.append(nkch.tt.el.toggler.buttons.dark.icon.$e);
            nkch.tt.el.toggler.buttons.dark.icon.$e.append(wds.icon("moon-small"));

            addClasses(nkch.tt.el.toggler.buttons.default);
            nkch.tt.el.toggler.$e.append(nkch.tt.el.toggler.buttons.default.$e);

            addClasses(nkch.tt.el.toggler.buttons.default.icon);
            nkch.tt.el.toggler.buttons.default.$e.append(nkch.tt.el.toggler.buttons.default.icon.$e);
            nkch.tt.el.toggler.buttons.default.icon.$e.append(wds.icon("radio-empty-small"));

            addClasses(nkch.tt.el.toggler.buttons.light);
            nkch.tt.el.toggler.$e.append(nkch.tt.el.toggler.buttons.light.$e);

            addClasses(nkch.tt.el.toggler.buttons.light.icon);
            nkch.tt.el.toggler.buttons.light.$e.append(nkch.tt.el.toggler.buttons.light.icon.$e);
            nkch.tt.el.toggler.buttons.light.icon.$e.append(wds.icon("sun-small"));

            addClasses(nkch.tt.el.pointerWrapper);

            if (nkch.tt.el.toggler.buttons.dark.$e.classList.contains("is-active")) nkch.tt.el.pointerWrapper.$e.style.marginLeft = "-56px";
            if (nkch.tt.el.toggler.buttons.light.$e.classList.contains("is-active")) nkch.tt.el.pointerWrapper.$e.style.marginRight = "-56px";

            nkch.tt.el.wrapper.$e.append(nkch.tt.el.pointerWrapper.$e);

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
                    document.querySelectorAll(".nkch-theme-toggler > .nkch-theme-toggler__button").forEach(function (e) {
                        return e.classList.remove("is-active");
                    });
                    
                    button.classList.add("is-active");
                }

                nkch.tt.el.theme.common.$e.setAttribute("type", "text/css");
                document.head.append(nkch.tt.el.theme.common.$e);

                nkch.tt.el.theme.nav.$e.setAttribute("type", "text/css");
                document.head.append(nkch.tt.el.theme.nav.$e);

                function changeTheme(theme) {
                    var modules = [];

                    switch (mw.config.get("skin")) {
                        case "fandomdesktop":
                            if (theme === "light" && document.body.classList.contains("theme-fandomdesktop-dark")) {
                                document.body.classList.remove("theme-fandomdesktop-dark");
                                document.body.classList.add("theme-fandomdesktop-light");

                                mw.config.set("isDarkTheme", false);
                            } else if (theme === "dark" && document.body.classList.contains("theme-fandomdesktop-light")) {
                                document.body.classList.remove("theme-fandomdesktop-light");
                                document.body.classList.add("theme-fandomdesktop-dark");

                                mw.config.set("isDarkTheme", true);
                            }

                            modules.push("ext.fandom.GlobalComponents.GlobalNavigationTheme." + theme + ".css", "ext.fandom.GlobalComponents.GlobalComponentsTheme." + theme + ".css");
                            break;
                        case "fandommobile":
                            if (theme === "light" && document.body.classList.contains("theme-fandommobile-dark")) {
                                document.body.classList.remove("theme-fandommobile-dark");
                                document.body.classList.add("theme-fandommobile-light");
                                
                                mw.config.set("isDarkTheme", false);
                            } else if (theme === "dark" && document.body.classList.contains("theme-fandommobile-light")) {
                                document.body.classList.remove("theme-fandommobile-light");
                                document.body.classList.add("theme-fandommobile-dark");

                                mw.config.set("isDarkTheme", true);
                            }

                            applyVariablesButton.removeAttribute("disabled");
                            
                            modules.push("ext.fandom.GlobalComponents.GlobalNavigationTheme." + theme + ".css", "ext.fandom.GlobalComponents.GlobalComponentsTheme.nav-" + theme + ".css", "ext.fandom.GlobalComponents.GlobalComponentsTheme." + theme + ".css", "skin.fandommobile.fandom." + theme + ".css");
                            break;
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
                                    modules: modules.join("|"),
                                    only: "styles",
                                    skin: mw.config.get("skin")
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
                            if (nkch.tt.isInStickyNav === false) {
                                $togglerElement.detach();
                                $(".fandom-sticky-header > .wiki-tools").before($togglerElement);
                                nkch.tt.isInStickyNav = true;
                            }
                            break;
                        case false:
                            if (nkch.tt.isInStickyNav === true) {
                                $togglerElement.detach();
                                $(".page-counter").after($togglerElement)
                                nkch.tt.isInStickyNav = false;
                            }
                            break;
                    }
                }

                const applyVariablesButton = document.createElement("button");
                applyVariablesButton.classList.add("wds-button", "wds-is-secondary");
                applyVariablesButton.innerText = "🖌️";

                applyVariablesButton.setAttribute("type", "button");

                Object.assign(applyVariablesButton.style, {
                    display: "block",
                    margin: "9px auto"
                });

                applyVariablesButton.addEventListener("click", function() {
                    if (!applyVariablesButton.hasAttribute("disabled"))
                    {
                        document.body.classList.remove("fandommobile-fandom-theme");
                    
                        var hrefValue = mw.config.get("wgScriptPath") + "/wikia.php?controller=ThemeApi&method=themeVariables&variant=" + (document.body.classList.contains("theme-fandommobile-dark") ? "dark" : "light"),
                            themeVariables = document.querySelector(".nkch-theme-variables");
                    
                        if (themeVariables != null) themeVariables.href = hrefValue;
                        else {
                            var theme = document.createElement("link");
                            theme.classList.add("nkch-theme-variables");
                    
                            theme.href = hrefValue;
                            theme.setAttribute("rel", "stylesheet");
                    
                            document.head.append(theme);
                        }
                    }

                    applyVariablesButton.setAttribute("disabled", true);
                }, false);

                
                switch (mw.config.get("skin")) {
                    case "fandomdesktop":
                        setInterval(checkIfStickyNavIsVisible, 100);
        
                        $(".page-counter").after($togglerElement);
                        break;
                    case "fandommobile":
                        $(".mobile-community-bar__navigation .mobile-community-bar__level-1").after($togglerElement);
                        $togglerElement.after($(applyVariablesButton));
                        break;
                }
        });

        importArticle({
            type: "script",
            article: "u:dev:MediaWiki:WDSIcons/code.js"
        });
    });
}
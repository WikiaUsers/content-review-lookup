(function () {
    window.isThemeDesignerSidebarHidden = false;

    if (mw.config.get("wgCanonicalSpecialPageName") === "ThemeDesigner") {
        function tdCheck() {
            if (document.querySelectorAll("aside.Settings-module_sidebar__2an-R").length > 0 && document.querySelectorAll("main.Preview-module_preview__2Vfo6").length > 0) {
                mw.hook("dev.wds").add(
                    function (wds) {
                        var tc_sidebar = document.querySelector("aside.Settings-module_sidebar__2an-R");
                        var tc_preview = document.querySelector("main.Preview-module_preview__2Vfo6");

                        Object.assign(tc_preview.style, {
                            height: "100vh"
                        });

                        var gn_bottom = document.querySelector(".global-navigation__bottom");

                        var gn_stateButton = document.createElement("button");

                        gn_stateButton.classList.add("theme-designer-hide-scrollbar-button");

                        Object.assign(gn_stateButton.style, {
                            alignItems: "center",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            margin: "10px 0",
                            padding: "0 6px",
                            width: "100%"
                        });

                        mw.util.addCSS(".theme-designer-hide-scrollbar-button:hover .theme-designer-hide-scrollbar-button-icon { background: hsla(0,0%,100%,.3) !important; }");

                        gn_stateButton_icon = document.createElement("div");
                        gn_stateButton_icon.classList.add("theme-designer-hide-scrollbar-button-icon");

                        Object.assign(gn_stateButton_icon.style, {
                            alignItems: "center",
                            background: "hsla(0,0%,100%,.1)",
                            borderRadius: "50%",
                            color: "white",
                            display: "inline-grid",
                            height: "36px",
                            justifyItems: "center",
                            margin: 0,
                            transition: "background-color .3s",
                            width: "36px"
                        });

                        var gn_stateButton_icon_src = wds.icon("indent-left-small");
                        Object.assign(gn_stateButton_icon_src.style, {
                            transform: "rotate(0deg)",
                            transition: ".3s"
                        });

                        gn_stateButton_icon.appendChild(gn_stateButton_icon_src);

                        gn_stateButton.appendChild(gn_stateButton_icon);

                        gn_bottom.children[0].before(gn_stateButton);

                        function hideOrShow() {
                            switch (window.isThemeDesignerSidebarHidden) {
                                case true:
                                    Object.assign(tc_sidebar.style, {
                                        display: "flex"
                                    });

                                    gn_stateButton_icon_src.style.transform = "rotate(-0deg)";

                                    window.isThemeDesignerSidebarHidden = false;
                                    break;
                                case false:
                                    Object.assign(tc_sidebar.style, {
                                        display: "none"
                                    });

                                    gn_stateButton_icon_src.style.transform = "rotate(180deg)";

                                    window.isThemeDesignerSidebarHidden = true;
                                    break;
                            }

                            if (window.isThemeDesignerSidebarHidden === false) {} else {
                                Object.assign(tc_sidebar.style, {
                                    display: "none"
                                });

                                window.isThemeDesignerSidebarHidden = true;
                            }
                        }

                        gn_stateButton.addEventListener("click", hideOrShow);
                    }
                );

                importArticle({
                    type: "script",
                    articles: [
                        "u:dev:MediaWiki:WDSIcons/code.js"
                    ]
                });
            } else {
                setTimeout(tdCheck, 500);
            }
        }

        tdCheck();
    }
})();
mw.loader.using(["mediawiki.user"]).then(
    function () {
        if (typeof window.nkch === "undefined") {
            const nkch = {};
            window.nkch = nkch;
            nkch.gst = {};
        }

        if (!nkch.gst.isActive && !mw.user.isAnon()) {
            nkch.gst.isActive = true;

            mw.hook("dev.i18n").add(
                function (i18n) {
                    i18n.loadMessages("GadgetsStateToggler").done(
                        function (i18n) {
                            /* - elements - */

                            nkch.gst.el = {
                                button: {
                                    $e: document.createElement("button"),
                                    dropdown: {
                                        toggle: {
                                            $e: document.createElement("div"),
                                            icon: {
                                                $e: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                                                src: {
                                                    $e: document.createElementNS("http://www.w3.org/2000/svg", "use")
                                                }
                                            },
                                        },
                                        content: {
                                            $e: document.createElement("div"),
                                            list: {
                                                $e: document.createElement("ul"),
                                                items: []
                                            },
                                            noList: {
                                                $e: document.createElement("div"),
                                                text: {
                                                    $e: document.createElement("div")
                                                }
                                            }
                                        }
                                    }
                                }
                            };

                            /* - button - */

                            nkch.gst.el.button.$e.classList.add("page-side-tool", "wds-dropdown", "wds-open-to-right");
                            document.querySelector(".page-side-tools").appendChild(nkch.gst.el.button.$e);

                            /* - button : dropdown : toggle - */

                            nkch.gst.el.button.dropdown.toggle.$e.classList.add("wds-dropdown__toggle");

                            Object.assign(nkch.gst.el.button.dropdown.toggle.$e.style, {
                                cursor: "pointer",
                                height: "18px"
                            });

                            nkch.gst.el.button.$e.appendChild(nkch.gst.el.button.dropdown.toggle.$e);

                            /* - button : dropdown : toggle : icon - */

                            nkch.gst.el.button.dropdown.toggle.icon.$e.classList.add("wds-icon", "wds-icon-small");
                            nkch.gst.el.button.dropdown.toggle.icon.$e.setAttributeNS(null, "viewBox", "0 0 18 18");
                            nkch.gst.el.button.dropdown.toggle.$e.appendChild(nkch.gst.el.button.dropdown.toggle.icon.$e);

                            /* - button : dropdown : toggle : icon : src - */

                            nkch.gst.el.button.dropdown.toggle.icon.src.$e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-gear-small");
                            nkch.gst.el.button.dropdown.toggle.icon.$e.appendChild(nkch.gst.el.button.dropdown.toggle.icon.src.$e);

                            /* - button : dropdown : content - */

                            nkch.gst.el.button.dropdown.content.$e.classList.add("wds-dropdown__content");
                            nkch.gst.el.button.$e.appendChild(nkch.gst.el.button.dropdown.content.$e);

                            /* ~ to list or not to list ~ */

                            if (typeof nkch_gst_gadgets !== "undefined" && Array.isArray(nkch_gst_gadgets) && nkch_gst_gadgets.length !== 0) {
                                nkch.gst.gadgets = nkch_gst_gadgets;

                                /* - button : dropdown : content : list - */

                                nkch.gst.el.button.dropdown.content.list.$e.classList.add("wds-list", "wds-has-lines-between");
                                nkch.gst.el.button.dropdown.content.$e.appendChild(nkch.gst.el.button.dropdown.content.list.$e);

                                for (var i = 0; i < nkch.gst.gadgets.length; i++) {
                                    (function (i) {
                                        var gadgetState = mw.loader.getState("ext.gadget." + nkch.gst.gadgets[i].name);

                                        if (gadgetState === null) {
                                            console.error("Гаджет " + nkch.gst.gadgets[i].name + " не найден.");
                                        } else if (gadgetState === "registered" || gadgetState === "ready") {
                                            console.log(nkch.gst.gadgets[i].name + ": " + gadgetState);

                                            /* - elements - */

                                            nkch.gst.el.button.dropdown.content.list.items[i] = {
                                                $e: document.createElement("li"),
                                                input: {
                                                    $e: document.createElement("input")
                                                },
                                                label: {
                                                    $e: document.createElement("label")
                                                }
                                            };

                                            /* - item - */

                                            Object.assign(nkch.gst.el.button.dropdown.content.list.items[i].$e.style, {
                                                textAlign: "left"
                                            });

                                            nkch.gst.el.button.dropdown.content.list.$e.appendChild(nkch.gst.el.button.dropdown.content.list.items[i].$e);

                                            /* - item : input - */

                                            nkch.gst.el.button.dropdown.content.list.items[i].input.$e.classList.add("wds-toggle__input");
                                            nkch.gst.el.button.dropdown.content.list.items[i].input.$e.id = "gst-toggle-" + i;
                                            nkch.gst.el.button.dropdown.content.list.items[i].input.$e.setAttribute("type", "checkbox");

                                            var opName = "gadget-" + nkch.gst.gadgets[i].name;

                                            if (gadgetState === "registered") {
                                                nkch.gst.el.button.dropdown.content.list.items[i].input.$e.checked = false;
                                            } else if (gadgetState === "ready") {
                                                nkch.gst.el.button.dropdown.content.list.items[i].input.$e.checked = true;
                                            };

                                            nkch.gst.el.button.dropdown.content.list.items[i].input.$e.addEventListener("change", function () {
                                                if (mw.user.options.get(opName) === 0) {
                                                    opValue = 1;
                                                } else if (mw.user.options.get(opName) === 1) {
                                                    opValue = 0;
                                                };

                                                new mw.Api().post({
                                                    action: "options",
                                                    token: mw.user.tokens.get("csrfToken"),
                                                    optionname: opName,
                                                    optionvalue: opValue
                                                }).done(
                                                    function () {
                                                        mw.user.options.set(opName, opValue);
                                                        mw.notify(i18n.msg("reload-page").plain());
                                                        return false;
                                                    }
                                                );
                                            }, false);
                                        }

                                        nkch.gst.el.button.dropdown.content.list.items[i].$e.appendChild(nkch.gst.el.button.dropdown.content.list.items[i].input.$e);

                                        /* - item : label - */

                                        nkch.gst.el.button.dropdown.content.list.items[i].label.$e.classList.add("wds-toggle__label");
                                        nkch.gst.el.button.dropdown.content.list.items[i].label.$e.setAttribute("for", "gst-toggle-" + i);

                                        if (typeof nkch.gst.gadgets[i].title !== "undefined") {
                                            nkch.gst.el.button.dropdown.content.list.items[i].label.$e.innerHTML = nkch.gst.gadgets[i].title;
                                        } else {
                                            nkch.gst.el.button.dropdown.content.list.items[i].label.$e.innerHTML = nkch.gst.gadgets[i].name;
                                        };

                                        if (typeof nkch.gst.gadgets[i].description !== "undefined") {
                                            nkch.gst.el.button.dropdown.content.list.items[i].label.$e.setAttribute("title", nkch.gst.gadgets[i].description);
                                        };

                                        nkch.gst.el.button.dropdown.content.list.items[i].$e.appendChild(nkch.gst.el.button.dropdown.content.list.items[i].label.$e);
                                    }(i));
                                }
                            } else {
                                /* - button : dropdown : content : noList - */

                                Object.assign(nkch.gst.el.button.dropdown.content.noList.$e.style, {
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    minWidth: "250px",
                                    minHeight: "60px"
                                });

                                nkch.gst.el.button.dropdown.content.$e.appendChild(nkch.gst.el.button.dropdown.content.noList.$e);

                                /* - button : dropdown : content : noList : text- */

                                nkch.gst.el.button.dropdown.content.noList.text.$e.innerHTML = i18n.msg("no-gadgets").plain();
                                nkch.gst.el.button.dropdown.content.noList.$e.appendChild(nkch.gst.el.button.dropdown.content.noList.text.$e);
                            }
                        }
                    );
                }
            );

            importArticle({
                type: "script",
                article: "u:dev:MediaWiki:I18n-js/code.js"
            });
        };
    }
);
window.gadgetButtons = [{
    name: "RWA", // название гаджета с MediaWiki:Gadget-Название; обязательно
    title: "RWA", // Название в меню
    description: "Недавняя вики-деятельность" // Описание гаджета в меню при наведении
}, {
    name: "ModernProfile",
    title: "ModernProfile",
    description: "Современный профиль"
}, {
    name: "UWStyle",
    title: "UWStyle",
    description: "Общее оформление вики-проектов"
}, {
    name: "AddCatInPreview",
    title: "AddCatInPreview",
    description: "Категории в предпросмотре"
}];

if (typeof window.gadgetButtons !== "undefined" && Array.isArray(window.gadgetButtons) && !mw.user.isAnon()) {
    mw.loader.using(["mediawiki.user", "mediawiki.util"]).then(
        function () {
            const pageTools = document.querySelector(".page-side-tools");

            var PagetoolsButton = document.createElement("button");
            PagetoolsButton.classList.add("page-side-tool", "wds-dropdown", "wds-open-to-right");

            pageTools.appendChild(PagetoolsButton);

            var PagetoolsButton__dropdownToggle = document.createElement("div");
            PagetoolsButton__dropdownToggle.classList.add("wds-dropdown__toggle");

            Object.assign(PagetoolsButton__dropdownToggle.style, {
                cursor: "pointer",
                height: "18px"
            });

            PagetoolsButton.appendChild(PagetoolsButton__dropdownToggle);

            var PagetoolsButton__dropdownIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            PagetoolsButton__dropdownIcon.classList.add("wds-icon", "wds-icon-small");
            PagetoolsButton__dropdownIcon.setAttributeNS(null, "viewBox", "0 0 18 18");

            var PagetoolsButton__dropdownIconSrc = document.createElementNS("http://www.w3.org/2000/svg", "use");
            PagetoolsButton__dropdownIconSrc.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#wds-icons-gear-small");
            PagetoolsButton__dropdownIcon.appendChild(PagetoolsButton__dropdownIconSrc);

            PagetoolsButton__dropdownToggle.appendChild(PagetoolsButton__dropdownIcon);

            var PagetoolsButton__dropdownContent = document.createElement("div");
            PagetoolsButton__dropdownContent.classList.add("wds-dropdown__content");

            PagetoolsButton.appendChild(PagetoolsButton__dropdownContent);

            var PagetoolsButton__dropdownList = document.createElement("ul");
            PagetoolsButton__dropdownList.classList.add("wds-list", "wds-has-lines-between");

            PagetoolsButton__dropdownContent.appendChild(PagetoolsButton__dropdownList);

            for (var i = 0; i < window.gadgetButtons.length; i++) {
                (function (i) {
                    var gadgetState = mw.loader.getState("ext.gadget." + window.gadgetButtons[i].name);

                    if (gadgetState === null) {
                        console.error("Гаджет " + window.gadgetButtons[i].name + " не найден.");
                    } else if (gadgetState === "registered" || gadgetState === "ready") {
                        console.log(window.gadgetButtons[i].name + ": " + mw.loader.getState("ext.gadget." + window.gadgetButtons[i].name));

                        var dropdownToggle__item = document.createElement("li");

                        dropdownToggle__item.style.textAlign = "left";

                        dropdownToggle__input = document.createElement("input");
                        dropdownToggle__input.classList.add("wds-toggle__input");
                        dropdownToggle__input.id = "gadget-toggle-" + i;

                        dropdownToggle__input.setAttribute("type", "checkbox");

                        var opName = "gadget-" + window.gadgetButtons[i].name;

                        var opValue;
                        if (gadgetState === "registered") {
                            dropdownToggle__input.checked = false;
                            opValue = 1;
                        } else if (gadgetState === "ready") {
                            dropdownToggle__input.checked = true;
                            opValue = 0;
                        }

                        dropdownToggle__input.addEventListener("change", function () {
                            new mw.Api().post({
                                action: "options",
                                token: mw.user.tokens.get("csrfToken"),
                                optionname: opName,
                                optionvalue: opValue
                            }).done(
                                function () {
                                    mw.user.options.set(opName, opValue);
                                    mw.notify("Настройки изменены, перезагрузите страницы, чтобы увидеть результат.");
                                    return false;
                                }
                            );
                        }, false);

                        dropdownToggle__item.appendChild(dropdownToggle__input);

                        var dropdownToggle__label = document.createElement("label");
                        dropdownToggle__label.classList.add("wds-toggle__label");

                        dropdownToggle__label.setAttribute("for", "gadget-toggle-" + i);

                        if (window.gadgetButtons[i].description != undefined) {
                            dropdownToggle__label.setAttribute("title", window.gadgetButtons[i].description);
                        }

                        if (window.gadgetButtons[i].title != undefined) {
                            dropdownToggle__label.innerHTML = window.gadgetButtons[i].title;
                        } else {
                            dropdownToggle__label.innerHTML = window.gadgetButtons[i].name;
                        }

                        dropdownToggle__item.appendChild(dropdownToggle__label);

                        PagetoolsButton__dropdownList.appendChild(dropdownToggle__item);
                    }
                }(i));
            }
        }
    );
};

mw.loader.using(["mediawiki.user"]).then(
    function () {
        if (typeof window.nkch === "undefined") {
            const nkch = {};
            window.nkch = nkch;
        }

        if (typeof nkch.gst === "undefined") nkch.gst = {};

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
                                            if (mw.user.options.get(opName) === null || typeof mw.user.options.get(opName) === "undefined") {
                                                opValue = 1;
                                            } else {
                                                if (mw.user.options.get(opName).toString() === "0") {
                                                    opValue = 1;
                                                } else if (mw.user.options.get(opName).toString() === "1") {
                                                    opValue = 0;
                                                }
                                            }

                                            new mw.Api().post({
                                                action: "options",
                                                token: mw.user.tokens.get("csrfToken"),
                                                optionname: opName,
                                                optionvalue: opValue.toString()
                                            }).done(
                                                function () {
                                                    mw.user.options.set(opName, opValue.toString());
                                                    mw.notify(i18n.msg("reload-page").plain());
                                                    return false;
                                                }
                                            );
                                        }, false);

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

                                nkch.gst.el.button.dropdown.content.noList.text.$e.innerHTML = i18n.msg("no-gadgets").escape();
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
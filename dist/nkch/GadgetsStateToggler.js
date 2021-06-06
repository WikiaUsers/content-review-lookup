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
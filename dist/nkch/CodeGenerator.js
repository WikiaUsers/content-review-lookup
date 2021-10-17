if (mw.config.get("wgCanonicalNamespace") === "Project" && mw.config.get("wgTitle").toLowerCase() === "генератор кода") {
    mw.loader.using(["oojs-ui"]).then(
        function () {
            mw.loader.getScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js").then(
                function () {
                    mw.loader.load("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css", "text/css");
                    var content = document.querySelector("#mw-content-text");

                    content.innerHTML = "";

                    const generator_tab_css_panel__colored_nicknames_colors = document.createElement("div");

                    Object.assign(generator_tab_css_panel__colored_nicknames_colors.style, {
                        display: "flex",
                        marginTop: "10px",
                        width: "100%"
                    });

                    const generator_tab_css_panel__colored_nicknames_input__color_light = document.createElement("div");

                    Object.assign(generator_tab_css_panel__colored_nicknames_input__color_light.style, {
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "column-reverse",
                        width: "100%"
                    });

                    const generator_tab_css_panel__colored_nicknames_input__color_light_input = document.createElement("input");
                    generator_tab_css_panel__colored_nicknames_input__color_light_input.type = "color";
                    generator_tab_css_panel__colored_nicknames_input__color_light_input.value = "#f9edd8";

                    generator_tab_css_panel__colored_nicknames_input__color_light_input.addEventListener("input", generator_tab_css_panel__colored_nicknames_updateThemeLight, false);

                    function generator_tab_css_panel__colored_nicknames_updateThemeLight(event) {
                        generator_tab_css_panel__colored_nicknames_preview__light.style.background = event.target.value;
                    }

                    const generator_tab_css_panel__colored_nicknames_input__color_light_label = document.createElement("label");
                    generator_tab_css_panel__colored_nicknames_input__color_light_label.innerHTML = "Цвет фона в светлой теме";

                    generator_tab_css_panel__colored_nicknames_input__color_light.appendChild(generator_tab_css_panel__colored_nicknames_input__color_light_input);
                    generator_tab_css_panel__colored_nicknames_input__color_light.appendChild(generator_tab_css_panel__colored_nicknames_input__color_light_label);

                    const generator_tab_css_panel__colored_nicknames_input__color_dark = document.createElement("div");

                    Object.assign(generator_tab_css_panel__colored_nicknames_input__color_dark.style, {
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "column-reverse",
                        width: "100%"
                    });

                    const generator_tab_css_panel__colored_nicknames_input__color_dark_input = document.createElement("input");
                    generator_tab_css_panel__colored_nicknames_input__color_dark_input.type = "color";
                    generator_tab_css_panel__colored_nicknames_input__color_dark_input.value = "#1e0c1b";

                    const generator_tab_css_panel__colored_nicknames_input__color_dark_label = document.createElement("label");
                    generator_tab_css_panel__colored_nicknames_input__color_dark_label.innerHTML = "Цвет фона в тёмной теме";

                    generator_tab_css_panel__colored_nicknames_input__color_dark_input.addEventListener("input", generator_tab_css_panel__colored_nicknames_updateThemeDark, false);

                    function generator_tab_css_panel__colored_nicknames_updateThemeDark(event) {
                        generator_tab_css_panel__colored_nicknames_preview__dark.style.background = event.target.value;
                    }

                    generator_tab_css_panel__colored_nicknames_input__color_dark.appendChild(generator_tab_css_panel__colored_nicknames_input__color_dark_input);
                    generator_tab_css_panel__colored_nicknames_input__color_dark.appendChild(generator_tab_css_panel__colored_nicknames_input__color_dark_label);

                    const generator_tab_css_panel__colored_nicknames_input__usernames = new OO.ui.TagMultiselectWidget({
                        placeholder: "Введите здесь необходимые имена участников",
                        allowArbitrary: true
                    });

                    const generator_tab_css_panel__colored_nicknames_input__color = new OO.ui.TextInputWidget({
                        indicator: "required",
                        validate: "non-empty"
                    });

                    generator_tab_css_panel__colored_nicknames_input__color.on("change", function (event) {
                        console.log(event);
                        generator_tab_css_panel__colored_nicknames_preview.querySelectorAll("a").forEach(function (el) {
                            el.style.color = event;
                        })
                        generator_tab_css_panel__colored_nicknames_generateCode();
                    }, false)

                    generator_tab_css_panel__colored_nicknames_input__usernames.on("change", function (event) {
                        console.log(event);
                        generator_tab_css_panel__colored_nicknames_preview__light.innerHTML = "";
                        generator_tab_css_panel__colored_nicknames_preview__dark.innerHTML = "";

                        event.forEach(
                            function (el) {
                                var nickname_light = document.createElement("div");
                                var nickname_link_light = document.createElement("a");
                                nickname_link_light.innerHTML = el.data.replace(/_/g, " ");
                                nickname_light.appendChild(nickname_link_light);
                                nickname_link_light.style.color = generator_tab_css_panel__colored_nicknames_input__color.getValue();

                                var nickname_dark = document.createElement("div");
                                var nickname_link_dark = document.createElement("a");
                                nickname_link_dark.innerHTML = el.data.replace(/_/g, " ");
                                nickname_dark.appendChild(nickname_link_dark);
                                nickname_link_dark.style.color = generator_tab_css_panel__colored_nicknames_input__color.getValue();

                                generator_tab_css_panel__colored_nicknames_preview__light.appendChild(nickname_light);
                                generator_tab_css_panel__colored_nicknames_preview__dark.appendChild(nickname_dark);
                            }
                        )

                        generator_tab_css_panel__colored_nicknames_generateCode();
                    })

                    const generator_tab_css_panel__colored_nicknames_fieldset = new OO.ui.FieldsetLayout({
                        label: "Цветные имена пользователей"
                    });

                    generator_tab_css_panel__colored_nicknames_fieldset.addItems([
                        new OO.ui.FieldLayout(generator_tab_css_panel__colored_nicknames_input__usernames, {
                            align: "top",
                            label: "Имена пользователей"
                        }),
                        new OO.ui.FieldLayout(generator_tab_css_panel__colored_nicknames_input__color, {
                            align: "left",
                            label: "Цвет"
                        })
                    ]);

                    generator_tab_css_panel__colored_nicknames_fieldset.$element.append(generator_tab_css_panel__colored_nicknames_colors);
                    generator_tab_css_panel__colored_nicknames_colors.append(generator_tab_css_panel__colored_nicknames_input__color_light);
                    generator_tab_css_panel__colored_nicknames_colors.append(generator_tab_css_panel__colored_nicknames_input__color_dark);

                    const generator_tab_css_panel__colored_nicknames_preview = document.createElement("div");

                    Object.assign(generator_tab_css_panel__colored_nicknames_preview.style, {
                        minHeight: "100px",
                        width: "100%",
                        backgroundColor: "black",
                        border: "1px solid var(--theme-border-color)",
                        borderRadius: "3px",
                        marginTop: "20px",
                        display: "flex"
                    });

                    const generator_tab_css_panel__colored_nicknames_preview__light = document.createElement("div");

                    Object.assign(generator_tab_css_panel__colored_nicknames_preview__light.style, {
                        background: "#f9edd8",
                        width: "100%",
                        padding: "10px 15px"
                    });

                    generator_tab_css_panel__colored_nicknames_preview.appendChild(generator_tab_css_panel__colored_nicknames_preview__light);

                    const generator_tab_css_panel__colored_nicknames_preview__dark = document.createElement("div");

                    Object.assign(generator_tab_css_panel__colored_nicknames_preview__dark.style, {
                        background: "#1e0c1b",
                        width: "100%",
                        padding: "10px 15px"
                    });

                    generator_tab_css_panel__colored_nicknames_preview.appendChild(generator_tab_css_panel__colored_nicknames_preview__dark);

                    generator_tab_css_panel__colored_nicknames_fieldset.$element[0].appendChild(generator_tab_css_panel__colored_nicknames_preview);

                    const generator_tab_css_panel__colored_nicknames_pre = document.createElement("pre");
                    generator_tab_css_panel__colored_nicknames_pre.classList.add("language-css");

                    Object.assign(generator_tab_css_panel__colored_nicknames_pre.style, {
                        marginTop: "20px"
                    });

                    const generator_tab_css_panel__colored_nicknames_code = document.createElement("code");
                    // generator_tab_css_panel__colored_nicknames_code.innerHTML = ".class {}";
                    generator_tab_css_panel__colored_nicknames_pre.appendChild(generator_tab_css_panel__colored_nicknames_code);

                    hljs.highlightElement(generator_tab_css_panel__colored_nicknames_code);

                    function generator_tab_css_panel__colored_nicknames_generateCode() {
                        var usernames = generator_tab_css_panel__colored_nicknames_input__usernames.getValue();
                        var color = generator_tab_css_panel__colored_nicknames_input__color.getValue();
                        console.log(usernames);
                        console.log(color);
                        switch (color !== "") {
                            case true:
                                switch (usernames.length > 0) {
                                    case true:

                                        var selectors = [];
                                        usernames.forEach(
                                            function (el) {
                                                el = el.replace(/_/g, " ");

                                                console.log(encodeURI(el));

                                                switch (el.indexOf(" ") >= 0) {
                                                    case true:
                                                        selectors.push("a[href$='/" + encodeURI(el).replace(/%20/g, "_") + "']");
                                                        selectors.push("a[href$=':" + encodeURI(el).replace(/%20/g, "_") + "']");

                                                        selectors.push("a[href$='/" + encodeURI(el).replace(/ /g, "%20") + "']");
                                                        selectors.push("a[href$=':" + encodeURI(el).replace(/ /g, "%20") + "']");
                                                        break;
                                                    case false:
                                                        selectors.push("a[href$='/" + encodeURI(el) + "']");
                                                        selectors.push("a[href$=':" + encodeURI(el) + "']");
                                                        break;
                                                }
                                            }
                                        )

                                        generator_tab_css_panel__colored_nicknames_code.innerHTML = selectors.join(",\n") + " {\n\tcolor: " + color + ";\n}";
                                        hljs.highlightElement(generator_tab_css_panel__colored_nicknames_code);
                                        break;
                                    case false:
                                        generator_tab_css_panel__colored_nicknames_code.innerHTML = "Введите хотя бы одно имя участника.";
                                        return;
                                }
                                break;
                            case false:
                                generator_tab_css_panel__colored_nicknames_code.innerHTML = "Введите необходимый цвет.";
                                return;
                        }
                    };

                    generator_tab_css_panel__colored_nicknames_fieldset.$element.append(generator_tab_css_panel__colored_nicknames_pre);

                    const generator_tab_css_panel__colored_nicknames = new OO.ui.PanelLayout({
                        expanded: false,
                        framed: true,
                        padded: true,
                        content: [generator_tab_css_panel__colored_nicknames_fieldset]
                    });

                    const generator_tab_css = new OO.ui.TabPanelLayout("css", {
                        expanded: false,
                        label: "CSS",
                        padded: false,
                        content: [generator_tab_css_panel__colored_nicknames]
                    });
                    generator_tab_css.$element[0].style.padding = 0;

                    const generator_tab_js = new OO.ui.TabPanelLayout("js", {
                        expanded: false,
                        padded: false,
                        label: "JavaScript"
                    });
                    generator_tab_js.$element.append("<p>Здесь ничего нет. Пока что..?</p>");

                    const generator_index = new OO.ui.IndexLayout({
                        expanded: false,
                        padded: false,
                    });

                    generator_index.addTabPanels([generator_tab_css, generator_tab_js]);

                    const generator_panel = new OO.ui.PanelLayout({
                        expanded: false,
                        framed: true,
                        padded: true,
                        content: [generator_index]
                    });

                    content.appendChild(generator_panel.$element[0]);
                }
            );
        }
    );
};
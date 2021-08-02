// Original code: https://meta.wikimedia.org/wiki/User:Krinkle/Tools/WhatLeavesHere
mw.loader.using(["mediawiki.api", "oojs-ui"])
    .then(
        function () {
            return new mw.Api().loadMessagesIfMissing(["fandom-pagetitle"]);
        }
    )
    .then(
        function () {
            if (mw.config.get("wgCanonicalNamespace") === "Special" && (mw.config.get("wgTitle") === "WhatLeavesHere" || mw.config.get("wgTitle") === "Ссылки отсюда")) {
                document.querySelector(".page-content").innerHTML = "";

                mw.util.addCSS(".oo-ui-panelLayout-padded { padding: 0.85714286em 1.14285714em 1.14285714em; }");

                function wrapListItem(nodes) {
                    var li = document.createElement('li');
                    $(li).append(nodes);
                    return li;
                }

                var namespacesArray = [{
                    data: "",
                    label: "Все"
                }];

                $.each(mw.config.get("wgFormattedNamespaces"), function (id, name) {
                    if (name === "") {
                        name = "(Основное)";
                    }

                    if (Number(id) >= 0) {
                        namespacesArray.push({
                            data: id,
                            label: name
                        })
                    }
                });

                var inputTitle = new OO.ui.TextInputWidget({
                        autocomplete: false,
                        spellcheck: false,
                        required: true,
                        validate: "non-empty"
                    }),
                    inputNamespace = new OO.ui.DropdownInputWidget({
                        options: namespacesArray
                    }),
                    inputButton = new OO.ui.ButtonInputWidget({
                        label: "Выполнить",
                        flags: ["progressive", "primary"],
                        type: "submit",
                        disabled: true
                    });

                function validateTitle() {
                    inputTitle.getValidity().done(
                        function () {
                            inputButton.setDisabled(false);
                        }
                    ).fail(
                        function () {
                            inputButton.setDisabled(true);
                        }
                    )
                }

                setInterval(validateTitle, 500);

                inputButton.$element.click(function (e) {
                    if (!inputButton.isDisabled()) {
                        e.preventDefault();
                        location.href = mw.util.getUrl("Служебная:Ссылки_отсюда", {
                            target: inputTitle.getValue(),
                            namespace: inputNamespace.getValue()
                        });
                    }
                });

                var fieldset = new OO.ui.FieldsetLayout({
                    label: "Ссылки отсюда",
                });

                fieldset.addItems([
                    new OO.ui.FieldLayout(inputTitle, {
                        label: "Страница:",
                        align: "top"
                    }),
                    new OO.ui.FieldLayout(inputNamespace, {
                        label: "Пространство имён:",
                        align: "top"
                    }),
                    new OO.ui.FieldLayout(inputButton)
                ]);

                var panel = new OO.ui.PanelLayout({
                    expanded: false,
                    framed: true,
                    padded: true,
                    content: [fieldset]
                });

                var target, namespace;

                switch (mw.util.getParamValue("target") === null || mw.util.getParamValue("target") === "") {
                    case true:
                        namespace = mw.util.getParamValue("namespace") || null;

                        document.title = mw.message("fandom-pagetitle", "Ссылки отсюда").text();
                        document.querySelector("#firstHeading").innerHTML = "Ссылки отсюда";

                        inputNamespace.setValue(namespace);
                        break;
                    case false:
                        target = $.trim(mw.util.getParamValue("target").replace(/_/g, " ").replace(/\+/g, " "));
                        namespace = mw.util.getParamValue("namespace") || null;

                        document.title = mw.message("fandom-pagetitle", "Страницы, на которые ссылается «" + decodeURI(target) + "»").text();
                        document.querySelector("#firstHeading").innerHTML = "Страницы, на которые ссылается «" + decodeURI(target) + "»";

                        inputTitle.setValue(target);
                        inputNamespace.setValue(namespace);

                        $.ajax({
                            type: "GET",
                            url: mw.util.wikiScript("api"),
                            data: {
                                format: "json",
                                action: "query",
                                titles: target,
                                prop: "templates|images|links|iwlinks|extlinks|categories",
                                tlnamespace: namespace,
                                plnamespace: namespace,
                                iwprop: "url",
                                tllimit: 500,
                                imlimit: 500,
                                pllimit: 500,
                                iwlimit: 500,
                                ellimit: 500,
                                cllimit: 500
                            },
                            dataType: "json"
                        }).done(
                            function (data) {
                                var key, page, isNew, redLinkAttr,
                                    links = [],
                                    iwlinks = [],
                                    extlinks = [],
                                    categories = [],
                                    hasResults = false;

                                if (!data || data.error || !data.query.pages) {
                                    return;
                                }

                                for (key in data.query.pages) {
                                    page = data.query.pages[key];
                                    break;
                                }

                                if (!page) {
                                    return;
                                }

                                // Back-compat
                                page.pagelinks = page.links;

                                isNew = page.missing !== undefined;
                                if (isNew) {
                                    $("#contentSub > a").eq(0).addClass("new");
                                    redLinkAttr = " class='new'";
                                } else {
                                    redLinkAttr = "";
                                }

                                function handleLinks(type, i, link) {
                                    var typeText;
                                    if (type === "template") {
                                        typeText = "(включение)";
                                    } else if (type === "file") {
                                        typeText = "(файл)";
                                    } else {
                                        typeText = "";
                                    }

                                    links.push([
                                        $("<a>")
                                        .attr("href", mw.util.getUrl(link.title))
                                        .text(link.title)
                                        .get(0),
                                        ' ' + typeText + " ",
                                        $("<a>")
                                        .attr("href", mw.util.getUrl("Служебная:Ссылки_отсюда", {
                                            target: link.title
                                        }))
                                        .text("← ссылки")
                                        .get(0)
                                    ]);
                                }

                                if (page.templates) {
                                    hasResults = true;
                                    $.each(page.templates, $.proxy(handleLinks, null, "template"));
                                }

                                if (page.images) {
                                    hasResults = true;
                                    $.each(page.images, $.proxy(handleLinks, null, "file"));
                                }

                                if (page.pagelinks) {
                                    hasResults = true;
                                    $.each(page.pagelinks, $.proxy(handleLinks, null, "pagelink"));
                                }

                                if (page.iwlinks) {
                                    hasResults = true;
                                    $.each(page.iwlinks, function (i, link) {
                                        iwlinks.push([
                                            $("<a>")
                                            .attr("href", link.url)
                                            .text(link.prefix + ":" + link["*"])
                                            .get(0)
                                        ]);
                                    });
                                }

                                if (page.extlinks) {
                                    hasResults = true;
                                    $.each(page.extlinks, function (i, link) {
                                        extlinks.push([
                                            $("<a>")
                                            .addClass("external")
                                            .attr('href', link["*"])
                                            .text(link["*"])
                                            .get(0),
                                            " ",
                                            $("<a>")
                                            .attr("href", mw.util.getUrl("Special:LinkSearch", {
                                                target: link['*']
                                            }))
                                            .text("← " + "ссылки")
                                            .get(0)
                                        ]);
                                    });
                                }

                                if (page.categories) {
                                    hasResults = true;
                                    $.each(page.categories, function (i, link) {
                                        categories.push([
                                            $("<a>")
                                            .attr("href", mw.util.getUrl(link.title))
                                            .text(link.title)
                                            .get(0),
                                            " ",
                                            $("<a>")
                                            .attr("href", mw.util.getUrl("Служебная:Ссылки_отсюда", {
                                                target: link.title
                                            }))
                                            .text("← ссылки")
                                            .get(0)
                                        ]);
                                    });
                                }

                                if (!hasResults) {
                                    $(".page-content").append("<p>" +
                                        "На $1 отсутствуют ссылки на другие страницы."
                                        .replace("$1",
                                            "<b><a href='" + mw.html.escape(mw.util.getUrl(target)) + "'" + redLinkAttr + ">" + mw.html.escape(target) + "</a></b>"
                                        ) +
                                        '</p>'
                                    );
                                } else {
                                    $(".page-content").append("<p>" +
                                        "На следующие страницы ссылается $1:"
                                        .replace("$1",
                                            "<b><a href='" + mw.html.escape(mw.util.getUrl(target)) + "'" + redLinkAttr + ">" + mw.html.escape(target) + "</a></b>"
                                        ) +
                                        "</p><hr>" +
                                        "<ul id='mw-whatleaveshere-links-list'></ul>" +
                                        "<div id='mw-whatleaveshere-iwlinks'></div>" +
                                        "<div id='mw-whatleaveshere-extlinks'></div>" +
                                        "<div id='mw-whatleaveshere-categories'></div>"
                                    );
                                    $("#mw-whatleaveshere-links-list").append($.map(links, wrapListItem));
                                    if (iwlinks.length) {
                                        $("#mw-whatleaveshere-iwlinks").append(
                                            mw.html.element('h3', {}, "Интервики-ссылки"),
                                            $("<ul>").append($.map(iwlinks, wrapListItem))
                                        );
                                    }
                                    if (extlinks.length) {
                                        $("#mw-whatleaveshere-extlinks").append(
                                            mw.html.element('h3', {}, "Внешние ссылки"),
                                            $("<ul>").append($.map(extlinks, wrapListItem))
                                        );
                                    }
                                    if (categories.length) {
                                        $("#mw-whatleaveshere-categories").append(
                                            mw.html.element("h3", {}, "Категории"),
                                            $("<ul>").append($.map(categories, wrapListItem))
                                        );
                                    }
                                }
                            }
                        );
                        break;
                }

                $(".page-content").append(panel.$element);
            }
        })
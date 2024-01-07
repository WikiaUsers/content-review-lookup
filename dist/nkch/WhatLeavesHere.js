// Original code: https://meta.wikimedia.org/wiki/User:Krinkle/Tools/WhatLeavesHere
mw.loader.using(["mediawiki.api", "oojs-ui"]).then(function () {
    return new mw.Api().loadMessagesIfMissing(["fandom-pagetitle"])
}).then(init)

function init() {
    var wgCanonicalNamespace = mw.config.get("wgCanonicalNamespace")
    var wgTitle = mw.config.get("wgTitle")

    if (wgCanonicalNamespace === "Special" && ["WhatLeavesHere", "Ссылки отсюда"].includes(wgTitle)) {
        document.querySelector(".page-content").innerHTML = ""

        var namespacesArray = [{ data: "", label: "все" }]

        $.each(mw.config.get("wgFormattedNamespaces"), function (id, name) {
            if (name === "") name = "(Основное)"
            if (Number(id) >= 0) namespacesArray.push({ data: id, label: name })
        })

        var inputTitle = new OO.ui.TextInputWidget({
            autocomplete: false,
            spellcheck: false,
            required: true,
            validate: "non-empty"
        })

        var inputNamespace = new OO.ui.DropdownInputWidget({
            options: namespacesArray
        })

        var inputButton = new OO.ui.ButtonInputWidget({
            label: "Выполнить",
            flags: ["progressive", "primary"],
            type: "submit",
            disabled: true
        })

        function validateTitle() {
            inputTitle.getValidity()
                .done(function () { inputButton.setDisabled(false) })
                .fail(function () { inputButton.setDisabled(true) })
        }

        setInterval(validateTitle, 500)

        inputButton.$element.click(function (e) {
            if (!inputButton.isDisabled()) {
                e.preventDefault()
                location.href = mw.util.getUrl(new mw.Title('WhatLeavesHere', -1).getPrefixedText(), {
                    target: inputTitle.getValue(),
                    namespace: inputNamespace.getValue()
                })
            }
        })

        var fieldset = new OO.ui.FieldsetLayout({
            label: "Ссылки отсюда",
        })

        fieldset.addItems([
            new OO.ui.FieldLayout(inputTitle, { label: "Страница:", align: "top" }),
            new OO.ui.FieldLayout(inputNamespace, { label: "Пространство имён:", align: "top" }),
            new OO.ui.FieldLayout(inputButton)
        ])

        var panel = new OO.ui.PanelLayout({
            expanded: false,
            framed: true,
            padded: true,
            content: [fieldset]
        })

        var target = mw.util.getParamValue("target") || ""
        var namespace = mw.util.getParamValue("namespace") || null

        if (!target) {
            document.title = mw.message("fandom-pagetitle", "Ссылки отсюда").text()
            document.querySelector("#firstHeading").innerHTML = "Ссылки отсюда"
            inputNamespace.setValue(namespace)
        } else {
            target = $.trim(target.replaceAll("_", " ").replaceAll("+", " "))
            document.title = mw.message("fandom-pagetitle", "Страницы, на которые ссылается «" + decodeURI(target) + "»").text()
            document.querySelector("#firstHeading").innerHTML = "Страницы, на которые ссылается «" + decodeURI(target) + "»"

            inputTitle.setValue(target)
            inputNamespace.setValue(namespace)

            var prop = "images|links|iwlinks|extlinks|categories|templates"

            $.ajax({
                type: "GET",
                url: mw.util.wikiScript("api"),
                data: {
                    format: "json",
                    action: "query",
                    titles: target,
                    prop: prop,
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
            }).done(function (data) {
                handleApiResponse(data, target, namespace)
            })
        }

        $(".page-content").append(panel.$element)
    }
}

function handleApiResponse(data, target, namespace) {
    if (!data || data.error || !data.query.pages) return

    var page = Object.values(data.query.pages)[0]
    if (!page) return

    page.pagelinks = page.links

    var isNew = page.missing !== undefined
    var redLinkAttr = isNew ? " class='new'" : ""

    var links = {
        common: [],
        files: [],
        templates: [],
        interwiki: [],
        external: [],
        categories: [],
    }

    var hasResults = false

    function handleLinks(type, i, link) {
        var title = new mw.Title("WhatLeavesHere", -1)

        var typeText
        switch (type) {
            case "template":
                typeText = "(включение)"
                break
            case "file":
                typeText = "(файл)"
                break
            case "category":
                typeText = "(категория)"
                break
            default:
                typeText = ""
                break
        }

        links.common.push([
            $("<a>")
                .attr("href", mw.util.getUrl(link.title))
                .text(link.title)
                .get(0),
            " " + typeText + " ",
            "(",
            $("<a>")
                .attr("href", title.getUrl({ target: link.title }))
                .text("← ссылки")
                .get(0),
            " | ",
            $("<a>")
                .attr("href", mw.util.getUrl(link.title, { action: "edit" }))
                .text("править")
                .get(0),
            ")"
        ])
    }

    if (page.pagelinks) {
        hasResults = true
        $.each(page.pagelinks, $.proxy(handleLinks, null, "pagelink"))
    }

    if (page.templates) {
        hasResults = true
        $.each(page.templates, $.proxy(handleLinks, null, "template"))
    }

    if (page.categories) {
        hasResults = true
        $.each(page.categories, function (i, link) {
            var title = new mw.Title("WhatLeavesHere", -1)

            links.categories.push([
                $("<a>")
                    .attr("href", mw.util.getUrl(link.title))
                    .text(link.title)
                    .get(0),
                " ",
                "(",
                $("<a>")
                    .attr("href", title.getUrl({ target: link.title }))
                    .text("← ссылки")
                    .get(0),
                ")"
            ])
        })
    }

    if (page.images) {
        hasResults = true
        $.each(page.images, function (i, link) {
            var title = new mw.Title("WhatLeavesHere", -1)

            links.files.push([
                $("<a>")
                    .attr("href", mw.util.getUrl(link.title))
                    .text(link.title)
                    .get(0),
                " ",
                "(",
                $("<a>")
                    .attr("href", title.getUrl({ target: link.title }))
                    .text("← ссылки")
                    .get(0),
                ")"
            ])
        })
    }

    if (page.iwlinks) {
        hasResults = true
        $.each(page.iwlinks, function (i, link) {
            links.interwiki.push([
                $("<a>")
                    .attr("href", link.url)
                    .text(link.prefix + ":" + link["*"])
                    .get(0)
            ])
        })
    }

    if (page.extlinks) {
        hasResults = true
        $.each(page.extlinks, function (i, link) {
            var title = new mw.Title("LinkSearch", -1)

            links.external.push([
                $("<a>")
                    .addClass("external")
                    .attr('href', link["*"])
                    .text(link["*"])
                    .get(0),
                " ",
                "(",
                $("<a>")
                    .attr("href", title.getUrl({ target: link['*'] }))
                    .text("← ссылки")
                    .get(0),
                ")"
            ])
        })
    }

    if (!hasResults) {
        $(".page-content").append("<p>" +
            "На $1 отсутствуют ссылки на другие страницы."
                .replace("$1", "<b><a href='" + mw.html.escape(mw.util.getUrl(target)) + "'" + redLinkAttr + ">" + mw.html.escape(target) + "</a></b>") +
            '</p>'
        )
    } else {
        $(".page-content").append(
            "<p>" +
            "На следующие страницы ссылается $1:"
                .replace("$1", "<b><a href='" + mw.html.escape(mw.util.getUrl(target)) + "'" + redLinkAttr + ">" + mw.html.escape(target) + "</a></b>") +
            "</p>" +
            mw.html.element("ul", { id: "mw-whatleaveshere-links-common" }, "") +
            "<hr />" +
            mw.html.element("div", { id: "mw-whatleaveshere-links-files" }, "") +
            mw.html.element("div", { id: "mw-whatleaveshere-links-categories" }, "") +
            mw.html.element("div", { id: "mw-whatleaveshere-links-interwiki" }, "") +
            mw.html.element("div", { id: "mw-whatleaveshere-links-external" }, "")
        )

        $("#mw-whatleaveshere-links-common").append($.map(links.common, wrapListItem))

        if (links.files.length) {
            $("#mw-whatleaveshere-links-files").append(
                mw.html.element("h3", {}, "Включённые файлы"),
                new OO.ui.MessageWidget({
                    type: "notice",
                    label: new OO.ui.HtmlSnippet("Файлы, для которых используются ссылки вида <strong><code>[[Файл:File.png]]</code></strong>, <strong><code>[[Медиа:File.png]]</code></strong> или <strong><code>[[:Медиа:File.png]]</code></strong>.<br>" +
                        "Ссылки на файлы вида <strong><code>[[:Файл:File.png]]</code></strong> отображаются в общем списке.")
                }).$element,
                $("<ul>").append($.map(links.files, wrapListItem))
            )
        }

        if (links.categories.length) {
            $("#mw-whatleaveshere-links-categories").append(
                mw.html.element('h3', {}, "Включённые категории"),
                new OO.ui.MessageWidget({
                    type: "notice",
                    label: new OO.ui.HtmlSnippet("Категории, для которых используются ссылки вида <strong><code>[[Категория:Название категории]]</code></strong>.<br>" +
                        "Ссылки на категории вида <strong><code>[[:Категория:Название категории]]</code></strong> отображаются в общем списке.")
                }).$element,
                $("<ul>").append($.map(links.categories, wrapListItem))
            )
        }

        if (links.interwiki.length) {
            $("#mw-whatleaveshere-links-interwiki").append(
                mw.html.element('h3', {}, "Интервики-ссылки"),
                $("<ul>").append($.map(links.interwiki, wrapListItem))
            )
        }

        if (links.external.length) {
            $("#mw-whatleaveshere-links-external").append(
                mw.html.element('h3', {}, "Внешние ссылки"),
                $("<ul>").append($.map(links.external, wrapListItem))
            )
        }
    }
}

function wrapListItem(nodes) {
    var li = document.createElement("li")
    $(li).append(nodes)
    return li
}
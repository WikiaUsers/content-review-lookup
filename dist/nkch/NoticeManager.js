var nkch = typeof window.nkch != "undefined" ? window.nkch : new Object();
window.nkch = nkch;

nkch.nm = typeof nkch.nm != "undefined" ? nkch.nm : new Object();

if (!nkch.nm.isActive && mw.config.get("wgCanonicalNamespace") === "Special" && mw.config.get("wgTitle") === "NoticeManager") {
    nkch.nm.isActive = true;
    mw.loader.using(["mediawiki.api", "mediawiki.util", "oojs-ui", "ext.fandom.sitenotice.desktop.css"])
        .then(
            function () {
                return new mw.Api().loadMessagesIfMissing(["fandom-pagetitle", "sitenotice-read-more", "sitenotice-modal-close", "permissionserrors", "permissionserrorstext", "badaccess-groups", "group-sysop", "visual-editor-fandom-summary-panel-label-preview", "visualeditor-savedialog-label-save-short"]);
            }
        )
        .then(
            function () {
                const api = new mw.Api();
                document.querySelector(".page-content").innerHTML = "";

                if (mw.config.get("wgUserGroups").indexOf("sysop") > -1) {
                    document.title = mw.message("fandom-pagetitle", "Управление оповещениями").text();
                    document.querySelector("#firstHeading").innerHTML = "Управление оповещениями";

                    mw.util.addCSS(
                        ".sitenotice:not(.nkch-sitenotice):not(.nkch-anonnotice) { display: none; }" +

                        ".oo-ui-fieldLayout-field { width: 100%; }" +
                        ".oo-ui-textInputWidget { max-width: 100%; }" +

                        ".nkch-notice-manager__buttons { display: flex; justify-content: space-between; margin-top: 12px; }"
                    );

                    const input_AN = new OO.ui.MultilineTextInputWidget({
                            autosize: true
                        }),
                        input_SN = new OO.ui.MultilineTextInputWidget({
                            autosize: true
                        });

                    const button_SN_save = new OO.ui.ButtonInputWidget({
                            classes: ["nkch-notice-manager__button", "nkch-notice-manager__button-primary"],
                            label: mw.message("visualeditor-savedialog-label-save-short").text(),
                            flags: ["progressive", "primary"]
                        }),
                        button_AN_save = new OO.ui.ButtonInputWidget({
                            classes: ["nkch-notice-manager__button", "nkch-notice-manager__button-primary"],
                            label: mw.message("visualeditor-savedialog-label-save-short").text(),
                            flags: ["progressive", "primary"]
                        });

                    const button_SN_preview = new OO.ui.ButtonInputWidget({
                            classes: ["nkch-notice-manager__button", "nkch-notice-manager__button-preview"],
                            label: mw.message("visual-editor-fandom-summary-panel-label-preview").text(),
                            framed: false
                        }),
                        button_AN_preview = new OO.ui.ButtonInputWidget({
                            classes: ["nkch-notice-manager__button", "nkch-notice-manager__button-preview"],
                            label: mw.message("visual-editor-fandom-summary-panel-label-preview").text(),
                            framed: false
                        });

                    const checkbox_SN = new OO.ui.CheckboxInputWidget({
                        data: "notify-sn"
                    });

                    /* ~ Sitenotice Preview ~ */
                    const sitenoticePreview = $("<div>", {
                        class: "nkch-sitenotice sitenotice"
                    }).appendTo(".notifications-placeholder");

                    const sitenoticePreview_header = $("<div>", {
                        class: "nkch-sitenotice__header sitenotice__header"
                    }).appendTo(sitenoticePreview);

                    const sitenoticePreview_title = $("<h1>", {
                        class: "nkch-sitenotice__title sitenotice__title",
                        text: "Предпросмотр: Sitenotice"
                    }).appendTo(sitenoticePreview_header);

                    const sitenoticePreview_content = $("<div>", {
                        class: "nkch-sitenotice__content sitenotice__content"
                    }).appendTo(sitenoticePreview);

                    const sitenoticePreview_readMore = $("<div>", {
                        class: "nkch-sitenotice__read-more sitenotice__read-more",
                        html: "<p>" + mw.message("sitenotice-read-more").text() + "</p>"
                    }).appendTo(sitenoticePreview);

                    sitenoticePreview_header.append("<svg class='wds-icon wds-icon-tiny sitenotice__close'><use xlink:href='#wds-icons-close-tiny'></use></svg>");


                    const sitenoticeModal = $("<div>", {
                        class: "nkch-sitenotice__modal sitenotice__modal wds-is-hidden"
                    }).appendTo("body");

                    const sitenoticeModal_curtain = $("<div>", {
                        class: "wds-dialog__curtain"
                    }).appendTo(sitenoticeModal);

                    const sitenoticeModal_wrapper = $("<div>", {
                        class: "wds-dialog__wrapper"
                    }).appendTo(sitenoticeModal_curtain);

                    const sitenoticeModal_title = $("<div>", {
                        class: "wds-dialog__title",
                        text: mw.config.get("wgSiteName")
                    }).appendTo(sitenoticeModal_wrapper);

                    const sitenoticeModal_content = $("<div>", {
                        class: "wds-dialog__content sitenotice__modal-content"
                    }).appendTo(sitenoticeModal_wrapper);

                    const sitenoticeModal_actions = $("<div>", {
                        class: "wds-dialog__actions"
                    }).appendTo(sitenoticeModal_wrapper);

                    const sitenoticeModal_button = $("<button>", {
                        class: "wds-button wds-dialog__actions-button sitenotice__modal-close",
                        text: mw.message("sitenotice-modal-close").text()
                    }).appendTo(sitenoticeModal_actions);

                    const sitenoticeModal_overlay = $("<div>", {
                        class: "sitenotice__modal-overlay"
                    }).appendTo(sitenoticeModal_curtain);


                    /* ~ Anonnotice Preview ~ */
                    const anonnoticePreview = $("<div>", {
                        class: "nkch-anonnotice sitenotice"
                    }).appendTo(".notifications-placeholder");

                    const anonnoticePreview_header = $("<div>", {
                        class: "nkch-anonnotice__header sitenotice__header"
                    }).appendTo(anonnoticePreview);

                    const anonnoticePreview_title = $("<h1>", {
                        class: "nkch-anonnotice__title sitenotice__title",
                        text: "Предпросмотр: Anonnotice"
                    }).appendTo(anonnoticePreview_header);

                    const anonnoticePreview_content = $("<div>", {
                        class: "nkch-anonnotice__content sitenotice__content"
                    }).appendTo(anonnoticePreview);

                    const anonnoticePreview_readMore = $("<div>", {
                        class: "nkch-anonnotice__read-more sitenotice__read-more",
                        html: "<p>ПОДРОБНЕЕ</p>"
                    }).appendTo(anonnoticePreview);

                    anonnoticePreview_header.append("<svg class='wds-icon wds-icon-tiny sitenotice__close'><use xlink:href='#wds-icons-close-tiny'></use></svg>");


                    const anonnoticeModal = $("<div>", {
                        class: "nkch-anonnotice__modal sitenotice__modal wds-is-hidden"
                    }).appendTo("body");

                    const anonnoticeModal_curtain = $("<div>", {
                        class: "wds-dialog__curtain"
                    }).appendTo(anonnoticeModal);

                    const anonnoticeModal_wrapper = $("<div>", {
                        class: "wds-dialog__wrapper"
                    }).appendTo(anonnoticeModal_curtain);

                    const anonnoticeModal_title = $("<div>", {
                        class: "wds-dialog__title",
                        text: mw.config.get("wgSiteName")
                    }).appendTo(anonnoticeModal_wrapper);

                    const anonnoticeModal_content = $("<div>", {
                        class: "wds-dialog__content sitenotice__modal-content"
                    }).appendTo(anonnoticeModal_wrapper);

                    const anonnoticeModal_actions = $("<div>", {
                        class: "wds-dialog__actions"
                    }).appendTo(anonnoticeModal_wrapper);

                    const anonnoticeModal_button = $("<button>", {
                        class: "wds-button wds-dialog__actions-button sitenotice__modal-close",
                        text: "ЗАКРЫТЬ"
                    }).appendTo(anonnoticeModal_actions);

                    const anonnoticeModal_overlay = $("<div>", {
                        class: "sitenotice__modal-overlay"
                    }).appendTo(anonnoticeModal_curtain);

                    /* ~ actions ~ */
                    button_SN_save.on("click", function (e) {
                        if (!button_SN_save.isDisabled()) {
                            // e.preventDefault();

                            switch (checkbox_SN.isSelected()) {
                                case true:
                                    api.postWithToken("csrf", {
                                        action: "edit",
                                        title: "MediaWiki:Sitenotice",
                                        text: input_SN.getValue(),
                                        format: "json"
                                    }).done(
                                        function (data) {
                                            api.get({
                                                action: "parse",
                                                page: "MediaWiki:Sitenotice_id",
                                                prop: "wikitext|text",
                                                format: "json"
                                            }).done(
                                                function (data) {
                                                    var wikitext = data.parse.wikitext["*"];

                                                    if (!isNaN(wikitext)) {
                                                        api.postWithToken("csrf", {
                                                            action: "edit",
                                                            title: "MediaWiki:Sitenotice_id",
                                                            text: (Number(wikitext) + 1).toString(),
                                                            format: "json"
                                                        }).done(
                                                            function () {
                                                                window.location.reload(true);
                                                            }
                                                        );
                                                    }
                                                }
                                            ).fail(
                                                function () {
                                                    api.postWithToken("csrf", {
                                                        action: "edit",
                                                        title: "MediaWiki:Sitenotice_id",
                                                        text: "1",
                                                        format: "json"
                                                    }).done(
                                                        function () {
                                                            window.location.reload(true);
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                    break;
                                case false:
                                    api.postWithToken("csrf", {
                                        action: "edit",
                                        title: "MediaWiki:Sitenotice",
                                        text: input_SN.getValue(),
                                        format: "json"
                                    }).done(
                                        function (data) {
                                            window.location.reload(true);
                                        }
                                    );
                                    break;
                            }
                        }
                    });

                    button_SN_preview.on("click", function (e) {
                        if (!button_SN_preview.isDisabled()) {
                            api.get({
                                action: "parse",
                                text: input_SN.getValue(),
                                wrapoutputclass: "localNotice",
                                format: "json",
                            }).done(
                                function (data) {
                                    sitenoticePreview_content[0].innerHTML = data.parse.text['*'];
                                    sitenoticePreview[0].classList.add("sitenotice--visible");

                                    var isBigEnough = sitenoticePreview_content[0].clientHeight > 178;
                                    sitenoticePreview_readMore[0].classList.toggle("sitenotice__read-more--visible", isBigEnough);

                                    sitenoticeModal_content[0].innerHTML = data.parse.text['*'];
                                }
                            );
                        }
                    })

                    button_AN_save.on("click", function (e) {
                        if (!button_AN_save.isDisabled()) {
                            api.postWithToken("csrf", {
                                action: "edit",
                                title: "MediaWiki:Sitenotice",
                                text: input_SN.getValue(),
                                format: "json"
                            }).done(
                                function (data) {
                                    window.location.reload(true);
                                }
                            );
                        }
                    });

                    button_AN_preview.on("click", function (e) {
                        if (!button_AN_preview.isDisabled()) {
                            api.get({
                                action: "parse",
                                text: input_AN.getValue(),
                                wrapoutputclass: "localNotice",
                                format: "json",
                            }).done(
                                function (data) {
                                    anonnoticePreview_content[0].innerHTML = data.parse.text['*'];
                                    anonnoticePreview[0].classList.add("sitenotice--visible");

                                    var isBigEnough = anonnoticePreview_content[0].clientHeight > 178;
                                    anonnoticePreview_readMore[0].classList.toggle("sitenotice__read-more--visible", isBigEnough);

                                    anonnoticeModal_content[0].innerHTML = data.parse.text['*'];
                                }
                            );
                        }
                    });

                    sitenoticePreview_readMore.on("click", function (e) {
                        sitenoticeModal[0].classList.remove("wds-is-hidden");
                    });

                    anonnoticePreview_readMore.on("click", function (e) {
                        anonnoticeModal[0].classList.remove("wds-is-hidden");
                    });

                    $(sitenoticeModal_button).on("click", function (e) {
                        sitenoticeModal[0].classList.add("wds-is-hidden");
                    });

                    $(anonnoticeModal_button).on("click", function (e) {
                        anonnoticeModal[0].classList.add("wds-is-hidden");
                    });

                    $(sitenoticePreview_header[0].querySelector("svg")).on("click", function (e) {
                        sitenoticePreview[0].classList.remove("sitenotice--visible");
                    });

                    $(anonnoticePreview_header[0].querySelector("svg")).on("click", function (e) {
                        anonnoticePreview[0].classList.remove("sitenotice--visible");
                    });


                    const fieldset_SN = new OO.ui.FieldsetLayout({
                        label: "Sitenotice",
                    });

                    fieldset_SN.addItems([
                        new OO.ui.FieldLayout(input_SN),
                        new OO.ui.FieldLayout(checkbox_SN, {
                            align: "inline",
                            label: "Отправить оповещение",
                            help: new OO.ui.HtmlSnippet("<b>Вкл.:</b> Содержимое оповещения изменится, и оно будет отправлено всем пользователям.<br>&emsp;(изменённое содержимое увидят все участники).<br>" +
                                "<b>Выкл.:</b> Содержимое оповещения изменится, но оно не будет отправлено снова.<br>&emsp;(изменённое содержимое увидят только участники, не скрывавшие оповещение)."),
                            helpInline: true
                        }),
                        new OO.ui.HorizontalLayout({
                            classes: ["nkch-notice-manager__buttons"],
                            items: [
                                new OO.ui.FieldLayout(button_SN_save),
                                new OO.ui.FieldLayout(button_SN_preview)
                            ]
                        })
                    ]);

                    const fieldset_AN = new OO.ui.FieldsetLayout({
                        label: "Anonnotice"
                    });

                    fieldset_AN.addItems([
                        new OO.ui.FieldLayout(input_AN),
                        new OO.ui.HorizontalLayout({
                            classes: ["nkch-notice-manager__buttons"],
                            items: [
                                new OO.ui.FieldLayout(button_AN_save),
                                new OO.ui.FieldLayout(button_AN_preview)
                            ]
                        })
                    ]);

                    const panel_SN = new OO.ui.PanelLayout({
                        expanded: false,
                        framed: true,
                        padded: true,
                        content: [fieldset_SN]
                    });

                    const panel_AN = new OO.ui.PanelLayout({
                        expanded: false,
                        framed: true,
                        padded: true,
                        content: [fieldset_AN]
                    });

                    $(".page-content").append(panel_SN.$element);
                    $(".page-content").append(panel_AN.$element);

                    api.get({
                        action: "parse",
                        page: "MediaWiki:Sitenotice",
                        prop: "wikitext|text",
                        format: "json"
                    }).done(
                        function (data) {
                            var wikitext = data.parse.wikitext["*"];
                            input_SN.setValue(wikitext);
                        }
                    ).fail(
                        function () {
                            return false;
                        }
                    );

                    api.get({
                        action: "parse",
                        page: "MediaWiki:Anonnotice",
                        prop: "wikitext|text",
                        format: "json"
                    }).done(
                        function (data) {
                            var wikitext = data.parse.wikitext["*"];
                            input_SN.setValue(wikitext);
                        }
                    ).fail(
                        function () {
                            return false;
                        }
                    );
                } else {
                    document.title = mw.message("fandom-pagetitle", mw.message("permissionserrors").text()).text();
                    document.querySelector("#firstHeading").innerHTML = mw.message("permissionserrors").text();

                    var permissonErrorText = $("<p>", {
                        html: mw.message("permissionserrorstext", 1).text()
                    }).appendTo(".page-content");

                    var permissonErrorTextGroup = $("<div>", {
                        class: "permissions-errors",
                        html: "<p>" + mw.message("badaccess-groups", mw.message("group-sysop").text()).text() + "</p>"
                    }).appendTo(".page-content");
                }
            }
        )
}
mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function() {
	importArticles({
	    type: 'script',
	    article: 'u:dev:MediaWiki:MultiUpload.js'
	});
});

(function () {
	if (mw.config.get("wgNamespaceNumber") === -1 && mw.config.get("wgTitle") === "MultiUpload") {
		var title = 'Мультизагрузка файлов';
		$('#firstHeading').html(title);
		$('title').text(title);
	    
        window.nkch_multiupload = {};
        window.nkch_multiupload.files = [];
        window.nkch_multiupload.fileNameFields = [];
        window.nkch_multiupload.fileDescriptionFields = [];

        mw.loader.using(["mediawiki.api", "mediawiki.util", "oojs-ui"]).then(
            function () {
                mw.util.addCSS(
                    "@media (min-width: 1340px) { .nkch-multiupload__file-thumb { position: absolute; top: 0; right: 0; } }" +
                    "@media (max-width: 1339px) { .nkch-multiupload__file-thumb { margin-top: 20px; } }" +

                    ".nkch-multiupload__checks { margin-top: 10px; }"
                );

                const api = new mw.Api();

                const mu_selectFiles = new OO.ui.SelectFileWidget({
                    classes: ["nkch-multiupload__select-files"],
                    showDropTarget: true,
                    multiple: true,
                    placeholder: "Не выбрано ни одного файла",
                    icon: "upload",
                    button: {
                        flags: ["primary", "progressive"],
                        label: "Выберите файлы"
                    }
                });

                const mu_commonDescription = new OO.ui.MultilineTextInputWidget({
                    classes: ["nkch-multiupload__common-description"],
                    rows: 4,
                    autosize: true,
                    disabled: true
                });

                mu_commonDescription.on("change", function (event) {
                    console.log(event);
                    console.log(window.nkch_multiupload.fileDescriptionFields);

                    window.nkch_multiupload.fileDescriptionFields.forEach(
                        function (el) {
                            el.setValue(event);
                        }
                    )
                });

                const mu_commonLicense = new OO.ui.DropdownWidget({
                    menu: {
                        items: [
                            new OO.ui.MenuOptionWidget({
                                data: "nothing",
                                label: "Ничего не выбрано"
                            })
                        ]
                    },
                    disabled: true
                });

                mu_commonLicense.getMenu().selectItemByData("nothing");

                const mu_uploadedFiles = new OO.ui.StackLayout({
                    expanded: false,
                    continuous: true
                });

                mu_selectFiles.on("change", function (event) {
                    console.log(event);
                    window.nkch_multiupload.files = event;

                    switch (event.length > 0) {
                        case true:
                            mu_commonDescription.setDisabled(false);
                            mu_commonLicense.setDisabled(false);
                            mu_submit.setDisabled(false);

                            var items = [];

                            event.forEach(function (el) {
                                var file_name = new OO.ui.TextInputWidget({
                                    classes: ["nkch-multiupload__file-name"],
                                    value: el.name
                                });

                                window.nkch_multiupload.fileNameFields.push(file_name);

                                var file_desc = new OO.ui.MultilineTextInputWidget({
                                    classes: ["nkch-multiupload__file-description"],
                                    rows: 4,
                                    autosize: true
                                });

                                if (mu_commonDescription.getValue() !== "") {
                                    file_desc.setValue(mu_commonDescription.value);
                                }

                                window.nkch_multiupload.fileDescriptionFields.push(file_desc);

                                var file_fieldset = new OO.ui.FieldsetLayout({
                                    label: el.name
                                });

                                file_fieldset.addItems([
                                    new OO.ui.FieldLayout(file_name, {
                                        align: "top",
                                        label: "Новое имя файла"
                                    }),
                                    new OO.ui.FieldLayout(file_desc, {
                                        align: "top",
                                        label: "Краткое описание:"
                                    })
                                ]);

                                var file_panel = new OO.ui.PanelLayout({
                                    expanded: false,
                                    framed: true,
                                    padded: true,
                                    content: [file_fieldset]
                                });

                                var file_thumb = document.createElement("div");
                                file_thumb.classList.add("nkch-multiupload__file-thumb");

                                Object.assign(file_thumb.style, {
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "180px"
                                });

                                var file_thumb_imageWrapper = document.createElement("div");
                                file_thumb.append(file_thumb_imageWrapper);

                                Object.assign(file_thumb_imageWrapper.style, {
                                    alignItems: "center",
                                    display: "flex",
                                    height: "180px",
                                    justifyContent: "center",
                                    width: "180px"
                                });

                                var file_thumb_image = document.createElement("img");

                                Object.assign(file_thumb_image.style, {
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                });

                                file_thumb_image.src = URL.createObjectURL(el);
                                file_thumb_imageWrapper.append(file_thumb_image);

                                var file_thumb_caption = document.createElement("div");

                                Object.assign(file_thumb_caption.style, {
                                    alignItems: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                });

                                if (el["type"].split("/")[0] === "image") {
                                    var img = new Image();
                                    img.src = URL.createObjectURL(el);
                                    img.onload = function () {
                                        var file_thumb_captionScale = document.createElement("span");
                                        file_thumb_captionScale.innerHTML = this.width + "px × " + this.height + "px";
                                        file_thumb_caption.append(file_thumb_captionScale);
                                    };
                                }

                                var file_thumb_captionSize = document.createElement("span");
                                file_thumb_captionSize.innerHTML = Number((el.size / 1024).toFixed(2)).toLocaleString() + " кб";

                                file_thumb_caption.append(file_thumb_captionSize);
                                file_thumb.append(file_thumb_caption);

                                file_fieldset.$element[0].append(file_thumb);

                                items.push(file_panel);
                            });

							$('.nkch-multiupload__common-description .oo-ui-inputWidget-input').val(' == Лицензирование == {{CopyrightedEA|\n}}');

                            mu_uploadedFiles.clearItems();
                            mu_uploadedFiles.addItems(items);
                            break;
                        case false:
                            window.nkch_multiupload.files = [];
                            window.nkch_multiupload.fileNameFields = [];
                            window.nkch_multiupload.fileDescriptionFields = [];

                            mu_commonDescription.setDisabled(true);
                            mu_commonLicense.setDisabled(true);
                            mu_submit.setDisabled(true);
                            mu_uploadedFiles.clearItems();
                            break;
                    }
                });

                const mu_checkbox_ignore = new OO.ui.CheckboxInputWidget({
                    data: "ignorewarnings"
                });

                const mu_checkbox_watch = new OO.ui.CheckboxInputWidget({
                    data: "watch",
                    disabled: true
                });

                const mu_submit = new OO.ui.ButtonWidget({
                    label: "Загрузить все",
                    flags: ["primary", "progressive"],
                    disabled: true
                });

                mu_submit.on("click", function (event) {
                    var queue = [];

                    window.nkch_multiupload.files.forEach(
                        function (el, i) {
                            var promise = new Promise(
                                function (resolve, reject) {
                                    api.upload(el, {
                                            filename: window.nkch_multiupload.fileNameFields[i].getValue(),
                                            comment: window.nkch_multiupload.fileDescriptionFields[i].getValue(),
                                            ignorewarnings: mu_checkbox_ignore.isSelected(),
                                            format: "json",
                                        })
                                        .done(
                                            function (data) {
                                                console.log(data.upload.filename + ' has sucessfully uploaded.');
                                                resolve();
                                            }
                                        )
                                        .fail(
                                            function (data) {
                                                console.log(data.upload.filename) + ' error download.';
                                                reject();
                                            }
                                        );
                                }
                            );

                            queue.push(promise);
                        }
                    );

                    Promise.all(queue).then(
                        function(data) {
                            console.log(data);
                        }
                    );
                });

                const mu_fieldset = new OO.ui.FieldsetLayout({
                    label: "Загрузить файлы",
                    content: [
                        new OO.ui.FieldLayout(mu_selectFiles, {
                            align: "top"
                        }),
                        new OO.ui.FieldLayout(mu_commonDescription, {
                            align: "top",
                            label: "Общее описание"
                        }),
                        mu_uploadedFiles,
                        new OO.ui.HorizontalLayout({
                            classes: ["nkch-multiupload__checks"],
                            items: [
                                new OO.ui.FieldLayout(mu_checkbox_ignore, {
                                    align: "inline",
                                    label: "Игнорировать предупреждения"
                                }),
                                new OO.ui.FieldLayout(mu_checkbox_watch, {
                                    align: "inline",
                                    label: "Добавить файлы в список отслеживания"
                                })
                            ]
                        }),
                        new OO.ui.FieldLayout(mu_submit)
                    ]
                });

                const mu_panel = new OO.ui.PanelLayout({
                    expanded: false,
                    framed: true,
                    padded: true,
                    content: [mu_fieldset]
                });

                const content = document.querySelector("#content")
                content.innerHTML = "";
                content.append(mu_panel.$element[0]);
            }
        );
    } else {
        return;
    }
})();
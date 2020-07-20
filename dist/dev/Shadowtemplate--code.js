// Shadow template v1
// Creates on the fly preview of different templates
// <nowiki>
(function (window, mw, $) {
    "use strict";
    var templateNamespace = {};
    var i18n = window.TemplateSandboxPreview || {
        "en": {
            "btn_exit": "Exit",
            "input_templateplaceholder": "Enter template name",
            "input_newtemplateplaceholder": "stub",
            "label_previewTemplate": "Preview",
            "label_templateName": "Enter template to replace",
            "label_newtemplateName": "New template name",
            "label_templateInvocation": "Template markup",
            "label_replaceTemplate_links": "Replace whole transclusion",
            "scriptName": "Shadow template"
        },
        "es": {
            "btn_exit": "Salir",
            "input_templateplaceholder": "Introduzca el nombre de la plantilla",
            "input_newtemplateplaceholder": "esbozo",
            "label_previewTemplate": "Previsualizar",
            "label_templateName": "Introduzca la plantilla para reemplazar",
            "label_newtemplateName": "Nuevo nombre de plantilla",
            "label_templateInvocation": "Markup de plantilla",
            "label_replaceTemplate_links": "Reemplazar transclusión entera",
            "scriptName": "Shadow template"
        },
        "tr": {
            "btn_exit": "Çıkış",
            "input_templateplaceholder": "Şablon adını girin",
            "input_newtemplateplaceholder": "taslak",
            "label_previewTemplate": "Önizleme",
            "label_templateName": "Değiştirilecek şablonu girin",
            "label_newtemplateName": "Yeni şablon adı",
            "label_templateInvocation": "Şablon işaretlemesi",
            "label_replaceTemplate_links": "Tüm aktarımı değiştir",
            "scriptName": "Gölge şablonu"
        },
    };
    var userLang = mw.config.get("wgUserLanguage") || "en";
    var action = mw.config.get("wgAction");
    // Gets and escapes messages
    function msg(msgString) {
        return mw.html.escape(i18n[userLang][msgString] || i18n.en[msgString] || "");
    }

    function createCmbBox(options) {
        var Html = mw.html;
        var cmbTextOptions = "";
        options.forEach(function (item) {
            cmbTextOptions += Html.element("option", {
                "value": item
            }, item);
        });
        return new Html.Raw(cmbTextOptions);
    }
    //Capitalizes string
    function ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Compares two titles
    function compareTitle(title1, title2) {
        try {
            title1 = decodeURIComponent(title1);
            title2 = decodeURIComponent(title2);
            var tmpTitle1 = new mw.Title(title1);
            var tmpTitle2 = new mw.Title(title2);
            var isEqualNs = tmpTitle1.getNamespaceId() === tmpTitle2.getNamespaceId();
            return ucFirst(tmpTitle1.getName()) === ucFirst(tmpTitle2.getName()) && isEqualNs;
        } catch (e) {
            console.log(title1, title2, e);
            return false;
        }
    }

    function createTemplateCombobox() {
        var currentPage = mw.config.get("wgPageName");
        var pageId;
        var templateNames = [];
        $.get("/api.php?action=query&titles=" + currentPage + "&prop=templates&format=json&indexpageids=true").then(function (templateData) {
            pageId = templateData.query.pageids[0];
            var templateDetails = templateData.query.pages[pageId];
            if (templateDetails && templateDetails.templates) {
                Object.keys(templateDetails.templates).forEach(function (id) {
                    if (id && templateDetails.templates[id].ns === 10) {
                        templateNames.push(templateDetails.templates[id].title);
                    }
                });
            }
            $("#templateDropdown").html(createCmbBox(templateNames).value);
        });
    }
    //https://github.com/spencermountain/wtf_wikipedia
    //Finds template transclusions in text
    function recursive_matches(opener, closer, text) {
        var out = [];
        var last = [];
        var chars = text.split("");
        var open = 0;
        var characterIndex = 0;
        var charGroup;
        var extraChars = opener.length - 1;
        var openerLocations = [];
        var lastOpener = 0;
        if (closer.length > 2) {
            return;
        }
        while (characterIndex < chars.length) {
            charGroup = chars[characterIndex];
            if (extraChars > 0) {
                charGroup = chars[characterIndex] + (chars[characterIndex + extraChars] || "");
            }
            //increment open tag
            if (charGroup === opener) {
                open += 1;
                openerLocations.push(characterIndex);
                if (extraChars > 0) {
                    last.push("{");
                    characterIndex += 1;
                    continue;
                }
            }
            //decrement close tag
            if (charGroup === closer) {
                if (open > 0) {
                    //Internal search
                    lastOpener = openerLocations.pop();
                    out.push(text.substring(lastOpener, characterIndex + extraChars + 1));
                }
                open -= 1;
                if (open < 0) {
                    open = 0;
                }
            }
            if (open >= 0) {
                last.push(chars[characterIndex]);
            }
            characterIndex += 1;
        }
        return out;
    }
    //Creates a form and adds current page name
    function createForm() {
        var Html = mw.html;
        var output = "";
        var formOutput = "";
        var formContent = [{
            tag: "label",
            attribs: {},
            content: msg("label_templateName")
        }, {
            tag: "select",
            attribs: {
                id: "templateDropdown",
                style: "float:left;width: 150px;"
            },
            newline: true
        }, {
            tag: "input",
            attribs: {
                id: "templateName",
                style: "float:right; width:150px",
                type: "text",
                placeholder: msg("input_templateplaceholder")
            }
        }, {
            tag: "label",
            attribs: {
                "for": "newtemplateName"
            },
            content: msg("label_newtemplateName"),
            newline: true
        }, {
            tag: "input",
            attribs: {
                id: "newTemplateName",
                style: "float:right;width:150px",
                type: "text",
                placeholder: msg("input_newtemplateplaceholder")
            }
        }, {
            tag: "label",
            attribs: {
                "for": "chkReplaceTemplateId"
            },
            content: msg("label_replaceTemplate_links"),
            newline: true
        }, {
            tag: "input",
            attribs: {
                "id": "chkReplaceTemplateId",
                type: "checkbox"
            },
            content: ""
        }, {
            tag: "label",
            attribs: {
                "for": "templateInvocationId",
                style: "display:none",
                id: "label_templateInvocation"
            },
            content: msg("label_templateInvocation"),
            newline: true
        }, {
            tag: "textarea",
            attribs: {
                "id": "templateInvocationId",
                style: "height: 5em; width: 100%;display:none",
                placeholder: "{{template2|abc}}"
            },
            content: ""
        }];
        var formAttribs = {
            "class": "WikiaForm"
        };
        var i;
        for (i = 0; i < formContent.length; i += 1) {
            if (formContent[i].newline) {
                formOutput += "<br>";
            }
            formOutput += Html.element(formContent[i].tag, formContent[i].attribs, formContent[i].content);
        }
        output = Html.element("form", formAttribs, new Html.Raw(formOutput));
        return output;
    }

    function replaceTemplate(template, newTemplateName, content, newContent) {
        var invalidTitleChars = ["#", "<", ">", "[", "]", "|", "{", "}"];
        var templateLinks = recursive_matches("{{", "}}", content);
        if (templateLinks) {
            var templateName = "";
            var templateParts;
            var tmpID;
            var ns = "";
            var templateContent;
            var removableLinkList = [template];
            var targetlinkId;
            var targetLink;
            for (tmpID = 0; tmpID < templateLinks.length; tmpID += 1) {
                for (targetlinkId = 0; targetlinkId < removableLinkList.length; targetlinkId += 1) {
                    targetLink = removableLinkList[targetlinkId];
                    if (targetLink) {
                        templateParts = templateLinks[tmpID].split(":");
                        templateName = templateParts[0];
                        ns = templateParts[0].toLowerCase().substring(2);
                        if (templateNamespace[ns]) {
                            templateName = "{{" + templateParts[1];
                        }
                        templateName = templateName.substring(2, templateName.length - 2);
                        templateName = templateName.split("|")[0];
                        if (invalidTitleChars.indexOf(templateName.substring(0, 1)) < 0 &&
                            compareTitle("template:" + templateName, targetLink)) {
                            templateContent = templateLinks[tmpID];
                            if (!$("#chkReplaceTemplateId").prop("checked") && newTemplateName) {
                                content = content.replace("{{" + templateName, "{{" + newTemplateName);
                                console.log(content);
                            } else if ($("#chkReplaceTemplateId").prop("checked")) {
                                content = content.replace(templateContent, newContent);
                            }
                        }
                    }
                }
            }
        }
        return content;
    }

    function showTemplatePreview() {
        var form = createForm();
        createTemplateCombobox();
        $.showCustomModal("Shadow template", form, {
            id: "templateSandboxPreviewer",
            width: 320,
            buttons: [{
                message: msg("btn_exit"),
                id: "cancelButton",
                handler: function () {
                    $("#templateSandboxPreviewer").closeModal();
                }
            }, {
                message: msg("label_previewTemplate"),
                id: "btnPreview",
                defaultButton: true,
                handler: function () {
                    var inputTemplateName = $("#templateName").val();
                    var inputTemplateData1 = $("#templateInvocationId").val();
                    var newTemplateName = $("#newTemplateName").val();
                    $.get(location.pathname + "?action=raw").then(function (content) {
                        var tmpNs = inputTemplateName.split(":")[0];
                        if (tmpNs.toLowerCase() !== "template") {
                            inputTemplateName += "template:";
                        }

                        var newContent = replaceTemplate(inputTemplateName, newTemplateName, content, inputTemplateData1);
                        if (newContent) {
                            (new mw.Api()).post({
                                action: "parse",
                                text: newContent,
                                title: mw.config.get("wgPageName")
                            }).done(function (data) {
                                if (data.error) {
                                    return;
                                }
                                $("#mw-content-text").html(data.parse.text["*"]);
                            });
                        }
                    });
                }
            }]
        });
        $("#templateSandboxPreviewer").css({
            top: "400px",
            left: "85%",
            position: "fixed"
        });
        $("#templateDropdown").on("click", function () {
            $("#templateName").val($("#templateDropdown").val());
        });
        $("#chkReplaceTemplateId").on("click", function () {
            $("#templateInvocationId").toggle();
            $("#label_templateInvocation").toggle();
        });
    }
    //Gets possible file namespaces
    function setNamespaces() {
        var namespaceIds = mw.config.get("wgNamespaceIds");
        Object.keys(namespaceIds).forEach(function (name) {
            if (namespaceIds[name] === 10) {
                templateNamespace[name] = true;
            }
        });
    }

    function main() {
        setNamespaces();
        if ($("#my-tools-menu").length && mw.config.get("wgNamespaceNumber") > -1 && action !== "edit") {
            $("#my-tools-menu").prepend("<li class=\"custom\"><a style=\"cursor:pointer\" id=\"shadowTemplate\">" + msg("scriptName") + "</a></li>");
        } else {
            mw.util.addPortletLink("p-tb", "#", msg("scriptName"), "shadowTemplate");
        }
        $("#shadowTemplate").on("click", function () {
            showTemplatePreview();
        });
    }
    main();
}(window, mw, $));
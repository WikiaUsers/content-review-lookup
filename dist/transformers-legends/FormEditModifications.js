/********************* this comment is 80 characters long *********************/

(function () {

"use strict";
if (window.andrewds1021 && window.andrewds1021.form_edit_modifications) return;
if (!window.andrewds1021) window.andrewds1021 = {};
window.andrewds1021.form_edit_modifications = true;

/*
detect situation and call corresponding function
element.classList is not supported in older browsers
*/

console.log("FormEditModifications.js: Detecting target HTML elements and"
    +" situation.");
var fe_link = document.getElementById("ca-formedit");
var ce_link = document.getElementById("ca-edit");
var ve_link = document.getElementById("ca-ve-edit");
// main edit button
var edit_link = $(".page-header__contribution-buttons .wds-button-group > a")[0];
var link_list = $(".page-header__contribution-buttons ul")[0]; // edit dropdown list
if (fe_link && edit_link && (fe_link !== edit_link)) {
    console.log("FormEditModifications.js: Form edit was detected but not as the"
        +" default option. Attempting to retrieve system messages and move form"
        +" edit option.");
    getSystemMessages("visualeditor-ca-classiceditor|visualeditor-ca-ve-edit").done(moveFormEdit);
} else if (((ce_link && ce_link.getAttribute("href")
    && ce_link.getAttribute("href").match(/flow=create-page-create-button$/))
    || (ve_link && ve_link.getAttribute("href")
    && ve_link.getAttribute("href").match(/flow=create-page-create-button$/)))
    && !document.getElementById("ca-formcreate")) {
    console.log("FormEditModifications.js: A create edit option was detected."
        +" Attempting to add create with form option.");
    addCreateWithForm();
} else if ((mw.config.get("wgTitle") === "FormStart")
    && (mw.config.get("wgNamespaceNumber") === -1)) {
    console.log("FormEditModifications.js: This page is \"Special:FormStart\"."
        +" Attempting to check for and use query parameter \"tfl_formstart_pagename\".");
    fillPageName();
}

/*
retrieve specified system messages
returns a JQuery promise
*/

function getSystemMessages(messages) {
    console.log("FormEditModifications.js: Waiting for \"mediawiki.api\".");
    return mw.loader.using("mediawiki.api").then(function () {
        console.log("FormEditModifications.js: Sending API request.");
        return new mw.Api().get({
            action: "query",
            meta: "allmessages",
            ammessages: messages,
            amlang: mw.config.get("wgUserLanguage")
        });
    }).then(function (data) {
        console.log("FormEditModifications.js: Extracting system messages from"
            +" API reply.");
        var results = [];
        for (var i = 0; i < data.query.allmessages.length; i++) {
            results.push(data.query.allmessages[i]["*"]);
        }
        return results;
    });
}

/*
check main button for either view source, classic editor, or VisualEditor
if found:
    move main button action to top of dropdown
    move form edit to main button
requires:
    button_texts:
        an array containing the button texts for the classic editor and VisualEditor
*/

function moveFormEdit(button_texts) {
    var ll_temp = "";
    console.log("FormEditModifications.js: Attempting to identify default edit"
        +" option and take unique actions.");
    switch (edit_link.id) {
        case "ca-viewsource":
            ll_temp = fe_link.innerHTML;
            fe_link.innerHTML = edit_link.lastElementChild.innerHTML;
            edit_link.lastElementChild.innerHTML = ll_temp;
            break;
        case "ca-edit":
            fe_link.accessKey = edit_link.accessKey;
            edit_link.removeAttribute("accesskey");
            fe_link.innerHTML = button_texts[0];
            break;
        case "ca-ve-edit":
            fe_link.accessKey = edit_link.accessKey;
            edit_link.removeAttribute("accesskey");
            fe_link.innerHTML = button_texts[1];
            break;
        default:
            return;
    }
    console.log("FormEditModifications.js: Taking common actions.");
    ll_temp = fe_link.id;
    fe_link.id = edit_link.id;
    edit_link.id = ll_temp;
    ll_temp = fe_link.getAttribute("data-tracking");
    fe_link.setAttribute("data-tracking", edit_link.getAttribute("data-tracking")+"-dropdown");
    edit_link.setAttribute("data-tracking", ll_temp.replace("-dropdown", ""));
    ll_temp = fe_link.getAttribute("href");
    fe_link.setAttribute("href", edit_link.getAttribute("href"));
    edit_link.setAttribute("href", ll_temp);
    link_list.insertBefore(fe_link.parentElement, link_list.firstElementChild);
}

/*
check for both classic editor and VisualEditor
if both found:
    add "Create with form" as 2nd in dropdown
else:
    add "Create with form" to top of dropdown
*/

function addCreateWithForm() {
    console.log("FormEditModifications.js: Attempting to create create with form"
        +" option.");
    var list_item = document.createElement("li");
    var list_link = document.createElement("a");
    var link_text = document.createTextNode("Create with form");
    list_link.setAttribute("href", "/wiki/Special:FormStart?tfl_formstart_pagename="
        +encodeURIComponent(mw.config.get("wgPageName")));
    list_link.id = "ca-formcreate";
    list_link.setAttribute("data-tracking", "ca-formcreate-dropdown");
    list_link.appendChild(link_text);
    list_item.appendChild(list_link);
    console.log("FormEditModifications.js: Create with form option has been created."
        +" Attempting to insert into edit dropdown menu");
    if (ce_link && ve_link) {
        link_list.insertBefore(list_item, link_list.children[1]);
    } else {
        link_list.insertBefore(list_item, link_list.children[0]);
    }
}

/*
check for URL query parameter "tfl_formstart_pagename"
if found:
    place value in field for "page_name"
*/

function fillPageName() {
    console.log("FormEditModifications.js: Checking for expected field and"
        +" query string parameter.");
    var params = location.search.substr(1).split(/[&=]/);
    var param_idx = params.indexOf("tfl_formstart_pagename");
    var field = $("form input[name='page_name']")[0];
    if (field && (param_idx != -1) && (param_idx < (params.length-1))) {
        console.log("FormEditModifications.js: Expected field and query string"
            +" parameter have been found. Attempting to set field value.");
        field.value = decodeURIComponent(params[param_idx+1]);
    }
}

})();
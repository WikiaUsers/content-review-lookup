/* Pagină folosită pentru codul ce permite vizualizarea diacriticelor cu sedilă de către cei cu browsere vechi
 * și salvarea paginilor folosind diacriticele cu virgulă
 * Va fi introdusă o referință către ea în MediaWiki:Common.js
 * Autor [[:ro:Utilizator:Strainu]]
 * Pe lângă licențele obligatorii pe Wikipedia, puteți considera codul ca fiind licențiat [[Licență BSD|BSD]], [[GPL (licență, versiunea 2)|GPLv2]] și MIT
 */

/** Partea 1: Folosirea diacriticelor corecte la salvarea paginii, precum și la crearea  de pagini noi*/
function allCommas(text) {
    text = text.replace(/ț/g, "ţ");
    text = text.replace(/Ț/g, "Ţ");
    text = text.replace(/ș/g, "ş");
    text = text.replace(/Ș/g, "Ş");
    return text;
}

function sanitizeWikitext(wikitext) {
    var skippable_regexp = /(<(span) lang=[^<>]*>(.|\r|\n)*?<\/\2>)|(<(gallery)(.*?)>(.|\r|\n)*?<\/\5>)|(\| (?=Commons).*\n)|(\|\s*(?=[Ii]magine).*\n)|(\|\s*(?=[hH]art[ăa]).*\n)|(\|\s*(?=[Ff]oto).*\n)/gi;
    var skippable_phrases = wikitext.match(skippable_regexp);
    var interwiki_regexp = /\[\[:?([a-z]{2,3}|fișier|imagine|media|simple|roa-rup|be-x-old|zh-(yue|classical|min-nan)|bat-smg|cbk-zam|nds-nl|map-bms|fişier|file|image):(.*?)\]\]/gi;
    var interwiki_phrases = wikitext.match(interwiki_regexp);
    var template_regexp = /\{\{(proiecte surori|sisterlinks|commons|commonscat|commonscat-inline|wikimanuale|wikisursă|wikisource|wikitravel|wikiştiri|wikţionar|WikimediaPentruPortale|titlu corect)\|(.|\r|\n)*?\}\}/gi;
    //var template_regexp  = /\{\{((.|\r|\n)*)\}\}/gi;
    var template_phrases = wikitext.match(template_regexp);

    wikitext = allCommas(wikitext);

    var mixed_phrases = wikitext.match(skippable_regexp);
    if (mixed_phrases !== null && skippable_phrases !== null) {
        for (i = 0; i < skippable_phrases.length; i++) {
            wikitext = wikitext.replace(mixed_phrases[i], skippable_phrases[i]);
        }
    }
    mixed_phrases = wikitext.match(interwiki_regexp);
    if (mixed_phrases !== null && interwiki_phrases !== null) {
        for (i = 0; i < interwiki_phrases.length; i++) {
            wikitext = wikitext.replace(mixed_phrases[i], interwiki_phrases[i]);
        }
    }
    mixed_phrases = wikitext.match(template_regexp);
    if (mixed_phrases !== null && template_phrases !== null) {
        for (i = 0; i < template_phrases.length; i++) {
            wikitext = wikitext.replace(mixed_phrases[i], template_phrases[i]);
        }
    }

    return wikitext;
}

function sanitizeForm(form) {
    var ta = form.wpTextbox1;
    var newvalue = ta.value;
    var modified = 0;
    var i = 0;

    // skip redirect pages
    if (mw.config.get('wgIsRedirect') === true ||
        newvalue.toLowerCase().indexOf("#redirect") === 0 ||
        newvalue.toLowerCase().indexOf("# redirect") === 0) {
        return true;
    }

    newvalue = sanitizeWikitext(newvalue);

    if (ta.value != newvalue) {
        modified = 1;
        //restore the value to the editbox
        ta.value = newvalue;
    }

    // mind the scope!
    var editForm = document.getElementById('editform');
    var es = document.getElementById('wpSummary');
    if (editForm.wpSection.value == 'new') {
        es.value = allCommas(es.value);
    } else if (es && modified && (es.value.search("WP:DVN") == -1)) {
        es.value += '';
    }
    return true;
}

function sanitizeSearch() {
    var allLinkTags = document.getElementsByTagName("a");
    for (i = 0; i < allLinkTags.length; i++) {
        if (allLinkTags[i].className === "new") {
            allLinkTags[i].href = allLinkTags[i].href.replace(/ț/g, "ţ");
            allLinkTags[i].href = allLinkTags[i].href.replace(/Ț/g, "Ţ");
            allLinkTags[i].href = allLinkTags[i].href.replace(/ș/g, "ş");
            allLinkTags[i].href = allLinkTags[i].href.replace(/Ș/g, "Ş");
            //these are needed if the user somehow searched for encoded text
            allLinkTags[i].href = allLinkTags[i].href.replace(/%C5%A3/gi, "ţ");
            allLinkTags[i].href = allLinkTags[i].href.replace(/%C5%A2/gi, "Ţ");
            allLinkTags[i].href = allLinkTags[i].href.replace(/%C5%9F/gi, "ş");
            allLinkTags[i].href = allLinkTags[i].href.replace(/%C5%9E/gi, "Ş");
        }
    }
}

function sanitizeMove() {
    var newTitle = document.getElementById('wpNewTitleMain').firstChild;
    var desc = document.getElementById('wpReason').firstChild;

    if (!newTitle || !desc) {
        return true;
    }

    if (desc.value.search("{{titlu corect") > -1) { //we found the template, do not replace
        return true;
    }

    newTitle.value = allCommas(newTitle.value);

    return true;
}

function sanitizeUpload() {
    var description = document.getElementById('wpUploadDescription');
    var title = document.getElementById('wpDestFile');
    if (!description || !title) {
        return true;
    }

    var newvalue = description.value;
    var newtitle = title.value;

    var skippable_regexp = /(<(span) lang=[^<>]*>(.|\r|\n)*?<\/\2>)|(<(gallery)(.*?)>(.|\r|\n)*?<\/\5>)/gi;
    var skippable_phrases = newvalue.match(skippable_regexp);

    newvalue = allCommas(newvalue);

    var mixed_phrases = newvalue.match(skippable_regexp);
    if (mixed_phrases !== null && skippable_phrases !== null) {
        for (var i = 0; i < skippable_phrases.length; i++) {
            newvalue = newvalue.replace(mixed_phrases[i], skippable_phrases[i]);
        }
    }

    //restore the value to the editbox
    description.value = newvalue;

    if (description.value.search("{{titlu corect") > -1) { //we found the template, do not replace the title
        return true;
    }
    title.value = allCommas(newtitle);
    return true;
}

function saveNewDiacritics() {
    var fd_form = document.getElementById('editform');
    var rename_form = document.getElementById('movepage');
    var upload_form = document.getElementById('mw-upload-form');

    /*excluding JS files for practical purposes*/
    if (mw.config.get('wgTitle').indexOf(".js") > -1) {
        return;
    }

    if (mw.config.get('wgPageName') == "Special:Căutare") {
        sanitizeSearch();
    }

    if (mw.config.get('wgPageName').search("Special:Mută_pagina") > -1 && rename_form) {
        rename_form.onsubmit = sanitizeMove();
    }

    if (mw.config.get('wgPageName') == "Special:Încărcare" && upload_form) {
        upload_form.onsubmit = sanitizeUpload();
    }

    if (($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1) && fd_form) {
        fd_form.onsubmit = function () {
            if (!fd_form) {
                return false; //how come it does not exist if it fired an event?
            }
            return sanitizeForm(fd_form);
        };
    }

    //HotCat form
    $('body').delegate('#hotcatCommitForm', 'submit', function (evt) {
        var hc_form = document.getElementById('hotcatCommitForm');
        if (!hc_form) {
            return false; //how come it does not exist if it fired an event?
        }
        return sanitizeForm(hc_form);
    });
}

/** Partea 2: Înlocuirea virgulelor cu sedile pentru utilizatorii care nu le văd ok */
function allCedillas(str) {
    str = str.replace(/ț/g, "ţ");
    str = str.replace(/Ț/g, "Ţ");
    str = str.replace(/ș/g, "ş");
    str = str.replace(/Ș/g, "Ş");
    return str;
}

function goodToBad(node) {
    var i;
    if (goodToBad.formInputs === undefined) {
        goodToBad.formInputs = document.getElementsByTagName('form');
    }

    /* skip the form elements */
    for (i = 0; i < goodToBad.formInputs.length; i++) {
        if (node == goodToBad.formInputs[i])
            return;
    }

    if (node.nodeName == '#text') {
        node.nodeValue = allCedillas(node.nodeValue);
        return;
    }

    // skip Romanian stuff
    // MediaWiki now marks content with the wiki language, so this basically skips the whole article
    //if (node.getAttribute !== undefined && node.getAttribute('lang') == 'ro') {
    //    return;
    //}

    for (i = 0; i < node.childNodes.length; i++)
        goodToBad(node.childNodes[i]);
}

function loadOldDiacritics() {
    if (mw.config.get('wgPageName').toLowerCase().search("diacritic") > -1) {
        return; //do not modify the text for pages referring to diacritics
    }

    var ta = document.getElementById('wpTextbox1');
    if (!ta) {
        return true;
    }

    var orig = ta.value;
    ta.value = allCedillas(ta.value);
    // mind the scope!
    var form = document.getElementById('editform');
    var es = document.getElementById('wpSummary');
    if (form.wpSection.value == 'new') {
        es.value = allCedillas(es.value);
    }

    return true;
}

function showOldDiacritics() {

    /*excluding JS files for practical purposes*/
    if (mw.config.get('wgTitle').indexOf(".js") > -1)
        return;

    //edit box
    if ($.inArray(mw.config.get('wgAction'), ['edit', 'submit']) !== -1) {
        //loadOldDiacritics();
    }

    //body
    goodToBad(document.body);

    //title
    document.title = allCedillas(document.title);
}

// Copyright (c) 2010 Cristian Adam <cristian.adam@gmail.com>
// Adapted for Wikipedia by [[User:Strainu]]
// License: MIT
function diacriticsConfigureTextElement(element, text) {
    element.innerHTML = text;
    element.style.width = "auto";
    element.style.visibility = "hidden";
    element.style.position = "absolute";
    element.style.fontSize = "96px";
}

// http://stackoverflow.com/questions/1955048
function diacriticsGetStyle(element, property) {
    var camelize = function (str) {
        return str.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
        });
    };

    if (element.currentStyle) {
        return element.currentStyle[camelize(property)];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(element, null)
        .getPropertyValue(property);
    } else {
        return element.style[camelize(property)];
    }
}

function diacriticsOnOlderOperatingSystems() {
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("bot") != -1 ||
        userAgent.indexOf("crawl") != -1 ||
        userAgent.indexOf("slurp") != -1 ||
        userAgent.indexOf("archive") != -1) {
        return false;
    }

    var normalText = document.createElement("div");
    diacriticsConfigureTextElement(normalText, "sStT");

    var diacriticsText = document.createElement("div");
    diacriticsConfigureTextElement(diacriticsText, "șȘțȚ");

    document.body.insertBefore(normalText, document.body.firstChild);
    document.body.insertBefore(diacriticsText, document.body.firstChild);

    // Sometimes at various zoom settings there is a +1 difference
    var doChange = (Math.abs(normalText.offsetWidth - diacriticsText.offsetWidth) > 1);

    // Pocket Internet Explorer on Windows Mobile 6.5 returns 0
    if (normalText.offsetWidth == 0 &&
        diacriticsText.offsetWidth == 0) {
        doChange = true;
    }

    document.body.removeChild(normalText);
    document.body.removeChild(diacriticsText);

    if (doChange) {
        showOldDiacritics();
    }
}

/**Partea 3: Modificări pentru toți utilizatorii */

function showModifiedTitle() {
    var titleOverride = document.getElementById("full_title");
    if (titleOverride != undefined) {
        var DOMtitle = document.getElementById("firstHeading");
        if (DOMtitle != undefined) {
            DOMtitle.innerHTML = titleOverride.innerHTML;
        }
    }
}

/**Partea 4: Folosirea funcțiilor de mai sus */
jQuery(document).ready(function ($) {
    saveNewDiacritics();
    showModifiedTitle();
    if (window.dont_change_diacritics == undefined || dont_change_diacritics == 0) {
        //utilizatorul vrea neapărat diacriticele vechi
        if (window.show_old_diacritics != undefined && window.show_old_diacritics == 1) {
            showOldDiacritics();
        }
        //arată diacriticele vechi doar dacă e necesar
        else {
            diacriticsOnOlderOperatingSystems();
        }
    }
});
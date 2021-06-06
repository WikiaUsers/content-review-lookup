/*Временной фон*/
$(function() {
    var d = new Date();
    if (d.getHours() < 4) {
        document.body.className += ' BG1';
    } else if (d.getHours() < 6) {
        document.body.className += ' BG2';
    } else if (d.getHours() < 10) {
        document.body.className += ' BG3';
    } else if (d.getHours() < 16) {
        document.body.className += ' BG4';
    } else if (d.getHours() < 20) {
        document.body.className += ' BG5';
    } else if (d.getHours() < 22) {
        document.body.className += ' BG6';
    } else if (d.getHours() < 24) {
        document.body.className += ' BG1';
    }
});

/*** Functions **************************************************************
 * Small functions for Oasis that are used within other functions
 ****************************************************************************/
function newSidebarSection(idName, title, content) { //creates sidebar and returns element control
    var topSS = getFirstSidebarElement();
    if (!topSS) return;
    var sSec = document.createElement("section");
    sSec.id = idName;
    sSec.className = idName + " module";
    sSec.innerHTML = '<h1 class="activity-heading">' + title + '</h1>\n' + (content.tagName ? "" : content);
    if (content.tagName) sSec.appendChild(content);
    topSS.parentNode.insertBefore(sSec, topSS);
    return document.getElementById("idName");
}

function getFirstSidebarElement() {
    var afterBox = document.getElementById("ArticleInformationBox");
    if (!afterBox) {
        afterBox = document.getElementById("LatestPhotosModule");
        for (var i = 0; i < wgUserGroups.length; i++) {
            if (wgUserGroups[i] == "user") {
                afterBox = document.getElementById("WikiaRecentActivity");
                break;
            }
        }
    }
    if (!afterBox) {
        afterBox = document.getElementById("ircBox");
    }
    if (!afterBox) {
        if (rail) {
            rail.innerHTML = rail.innerHTML + '\n<div id="lastSidebarModule"></div>';
            afterBox = document.getElementById("lastSidebarModule");
        }
    }
    return afterBox;
}

/*** Allow JS-less publishing ***********************************************
 * Enable Publish button
 * Remove loading screen
 * Makes work savable without Wikia's JS fully loading
 * Written by JBed of FFWiki
 ****************************************************************************/
$(function fixEditor() {
    if (wgAction != "edit") return;
    var loader = document.getElementsByTagAndClass("div", "loading-indicator")[0];
    if (loader) killElement(loader);
});

/*** Article info box *******************************************************
 * Creates and displays article info box for sidebar
 * Functions stored here, icon inputs handled in Common
 ****************************************************************************/
function createArticleInfoBox() {
    var id = "ArticleInformationBox";
    var box = document.getElementById(id);
    if (box) return box;
    newSidebarSection(id, "Article information", "");
    box = document.getElementById(id);
    moveLangBox(box);
    return box;
}

function newArticleInfoIcon(id, page, hover, bgImg, className, text) {
    var elem = document.getElementById(id);
    if (!elem) {
        return "";
    }
    createArticleInfoBox();
    var output = "<a";
    if (page !== "") {
        output += ' href="' + wikilinkUrl(page) + '"';
    }
    if (hover !== "") {
        output += ' title="' + hover + '"';
    }
    output += ' class="page-info-icon';
    if (className !== "") {
        output += ' ' + className + 'a';
    }
    output += '"';
    if (bgImg !== "") {
        output += ' style="background-image:url(' + bgImg + ');"';
    }
    output += '><span class="text-container">';
    if (text !== "") output += text;
    output += '</span></a>';
    return output;
}
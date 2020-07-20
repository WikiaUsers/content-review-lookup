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

/*** Change logo ************************************************************
 * Restores logo removed in CSS
 * Checks time and gives opportunity to display other logos
 * Written by JBed of FFWiki
 ****************************************************************************/
/*
if (clientPC.contains("msie 9")) {
    var importWikiaCss = importCssPage("MediaWiki:Wikia.css");
    importWikiaCss.addEventListener("load", function() {
        handleLogo();
    });
} else handleLogo();

function handleLogo() {
    var wikiHeader = document.getElementById("WikiHeader");
    var editHeader = document.getElementById("EditPageHeader");
    if (wikiHeader) {
        var logoNew = wikiHeader.getElementsByTagName("h1")[0].getElementsByTagName("a")[0];
        var logoOld = logoNew.getElementsByTagName("img")[0];
        normalMainLogo(logoOld, logoNew);
    }
    if (editHeader) {
        var logoNew = editHeader.getElementsByTagName("span")[0].getElementsByTagName("a")[0];
        var logoOld = logoNew.getElementsByTagName("img")[0];
        normalEditLogo(logoOld, logoNew);
    }
}

function normalMainLogo(logoOld, logoNew) {
    logoNew.style.backgroundImage = 'url("https://images.wikia.nocookie.net/finalfantasy/images/a/a8/Wiki-wide.png")';
    logoNew.id = "WikiMainLogo";
    if (wgServerTime) logoNew.className = wgServerTime.toString('"d"d "m"m "y"Y');
    logoNew.style.height = "85px";
    logoNew.style.width = "245px";
    logoNew.style.display = "block";
    logoNew.style.marginTop = "-5px";
    logoNew.style.marginBottom = "-3px";
    //logoOld.style.opacity=1;
}

function normalEditLogo(logoOld, logoNew) {
    renderEditLogo(logoOld, logoNew, "https://images.wikia.nocookie.net/finalfantasy/images/8/89/Wiki-wordmark.png");
}

function renderEditLogo(logoOld, logoNew, image) {
    logoNew.style.backgroundImage = 'url("' + image + '")';
    logoNew.style.backgroundSize = "cover";
    if (wgServerTime) logoNew.className = wgServerTime.toString('"d"d "m"m "y"Y');
    logoNew.id = "WikiEditLogo";
    logoNew.style.height = "45px";
    logoNew.style.width = "170px";
    logoNew.style.display = "block";
} * /

/*** Oasis sitenotice *******************************************************
 * Displays sitenotice on every page
 * Displays like regular Wikia notices
 * The notice has to be updated manually
    after editing MediaWiki:Sitenotice and MediaWiki:Sitenotice id
 * Written by JBed of FFWiki
 ****************************************************************************/
//how to update the Oasis sitenotice:
//Go into a page in Monobook,
//Right click, view page source,
//Ctrl+F, "siteNoticeID",
//here you will find two lines,
//one starting "var siteNoticeID", the other "var siteNotice",
//copy both these lines and paste them over the respective lines below

/*** Move languages box *****************************************************
 * Moves languages to top of WikiaRail
 * Written by JBed of FFWiki
 ****************************************************************************/
/*
addOnloadHook(prepLangBox);
function prepLangBox() {
  var langBox = document.getElementsByTagAndClass("nav", "WikiaArticleInterlang")[0];
  if(langBox) {
    langBox.style.margin="0px";
    langBox.style.padding="10px 0 0 10px";
    var divClear = document.createElement("div");
    divClear.style.clear="both";
    langBox.id="languageBox";
    langBox.appendChild(divClear);
  }
  moveLangBox(getFirstSidebarElement());
}

function moveLangBox(afterBox) {
  var langBox = document.getElementById("languageBox");
  if(!langBox) langBox = document.getElementsByTagAndClass("nav","WikiaArticleInterlang")[0];
  if(langBox && afterBox) {
    afterBox.parentNode.insertBefore(langBox,afterBox);
  }
}
*/

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
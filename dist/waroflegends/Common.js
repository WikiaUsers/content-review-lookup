/* <pre> */
/* Any JavaScript here will be loaded for all users on every page load. */

importScript('MediaWiki:Functions.js');

// onload stuff
var firstRun = true;

function loadFunc() {
    if (firstRun) firstRun = false;
    else return;

    // initFunctionsJS();

    // DEPRECATED
    if (document.getElementById('infoboxinternal') !== null && document.getElementById('infoboxend') !== null) {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
    }

    // addHideButtons();

    if (document.getElementById('mp3-navlink') !== null) {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }

    if (window.storagePresent) initVisibility();

    // rewriteSearchFormLink();
    fillEditSummaries();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if (!bodyClass || (bodyClass.indexOf('page-') == -1)) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if (typeof (onPageLoad) != "undefined") {
        onPageLoad();
    }
}

function fillEditSummaries() {
    var label = document.getElementById("wpSummaryLabel");

    if (label === null) return;

    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;

    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}

function onStdSummaryChange() {
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;

    if (value !== "") {
        if (skin == 'monaco') {
            document.getElementById("wpSummaryEnhanced").value = value;
        } else {
            document.getElementById("wpSummary").value = value;
        }
    }
}

function onStdReasonChange() {
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;

    if (value !== "") document.getElementById("wpReason").value = value;
}
/*
function initVisibility() {
    var storage = globalStorage[window.location.hostname];

    var page = window.pageName.replace(/\W/g, '_');
    var show = storage.getItem('infoboxshow-' + page);

    if (show == 'false') {
        infoboxToggle();
    }

    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        show = storage.getItem('hidableshow-' + i + '_' + page);

        if (show == 'false') {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if (content !== null && content.length > 0 && button !== null && button.length > 0 && content[0].style.display != 'none') {
                button[0].onclick('bypass');
            }
        } else if (show == 'true') {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if (content !== null && content.length > 0 && button !== null && button.length > 0 && content[0].style.display == 'none') {
                button[0].onclick('bypass');
            }
        }
    }
}

function addHideButtons() {
    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if (button !== null && button.length > 0) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Hide]'));

            if (new ClassTester('start-hidden').isMatch(box)) button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage) {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if (content !== null && content.length > 0) {
        content = content[0];

        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
            nowShown = false;
        }

        if (window.storagePresent && (typeof (bypassStorage) == 'undefined' || bypassStorage != 'bypass')) {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;

            for (var i = 0; i < items.length; i++) {
                if (items[i] == parent) {
                    item = i;
                    break;
                }
            }

            if (item == -1) {
                return;
            }

            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}
*/

//addOnloadHook(loadFunc);
$(document).ready(loadFunc);

// ==================================================================
// ADVANCED AJAX AUTO-REFRESHING ARTICLES
// Copied from the Development Wiki
// 
// http://dev.wikia.com/index.php?title=AjaxRC/code.js
// Last revision: June 2010
// ==================================================================

importScriptPage('MediaWiki:Common.js/ajaxRC.js');

// ==================================================================
// Custom edit buttons
// ==================================================================

if (wgAction == "edit" || wgAction == "submit") {

    /***** Custom edit buttons *****/
    if (mwCustomEditButtons) {

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
                "speedTip": "Redirect",
                "tagOpen": "#REDIRECT [[",
                "tagClose": "]] {{R}}",
                "sampleText": "Insert text"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
                "speedTip": "Insert a table",
                "tagOpen": '{| class="wikitable"\n|-\n',
                "tagClose": "\n|}",
                "sampleText": "! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/1/1b/Button_miss_signature.png",
                "speedTip": "Unsigned",
                "tagOpen": "{{unsigned|",
                "tagClose": "|~\~\~\~\~\}}",
                "sampleText": "user name or IP"
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
                "speedTip": "Line break",
                "tagOpen": "<br />",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img27.imageshack.us/img27/7084/buttonsmile.png",
                "speedTip": ":)",
                "tagOpen": "{{=)}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img208.imageshack.us/img208/4918/buttonfrown.png",
                "speedTip": ":(",
                "tagOpen": "{{=(}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img26.imageshack.us/img26/8751/buttonbigsmile.png",
                "speedTip": ":D",
                "tagOpen": "{{=D}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img6.imageshack.us/img6/4154/buttonomg.png",
                "speedTip": ":O",
                "tagOpen": "{{=O}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img205.imageshack.us/img205/5514/buttonlol.png",
                "speedTip": ":P",
                "tagOpen": "{{=P}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img30.imageshack.us/img30/3633/buttonwink.png",
                "speedTip": ";)",
                "tagOpen": "{{Wink}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img20.imageshack.us/img20/2463/buttonangry.png",
                "speedTip": "Angry",
                "tagOpen": "{{Angry}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img29.imageshack.us/img29/9220/sbf451.png",
                "speedTip": ":S",
                "tagOpen": "{{=S}}",
                "tagClose": "",
                "sampleText": ""
        };

        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img69.imageshack.us/img69/6169/91910415.png",
                "speedTip": "Cry",
                "tagOpen": "{{Cry}}",
                "tagClose": "",
                "sampleText": ""
        };
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img121.imageshack.us/img121/8656/bigeyes.gif",
                "speedTip": "O_o",
                "tagOpen": "{{O o}}",
                "tagClose": "",
                "sampleText": ""
        };
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img26.imageshack.us/img26/6958/44013612.gif",
                "speedTip": "^_^",
                "tagOpen": "{{^ ^}}",
                "tagClose": "",
                "sampleText": ""
        };
        mwCustomEditButtons[mwCustomEditButtons.length] = {
            "imageFile": "http://img26.imageshack.us/img26/5410/buttoncool.png",
                "speedTip": "Cool",
                "tagOpen": "{{(h)}}",
                "tagClose": "",
                "sampleText": ""
        };
    }
}

// ============================================================
// EDIT-INTRO FIX for Alliance articles
//
// This script is modified from English Wikipedia 
// Source: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Function: Adds EditIntro to all Alliance pages 
//           when "edit this page" link is clicked
// ============================================================

function allianceEditIntro() {
    if (wgCanonicalNamespace == "Alliance" && document.getElementById("ca-edit")) {
        var editLinks = document.getElementById('ca-edit').getElementsByTagName('a');
        if (editLinks.length > 0) {
            editLinks[0].href += "&editintro=Template:AllianceTop";
        }
    }
}
addOnloadHook(allianceEditIntro);

// ============================================================
// UserNameReplace
// ============================================================

function UserNameReplace() {
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
}
addOnloadHook(UserNameReplace);

// ============================================================
// Test if an element has a certain class
//
// Description: Uses regular expressions and caching for 
//              better performance.
// Maintainers: User:Mike Dillon, User:R. Koot, User:SG
// ============================================================

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

// =====================================================================
// Collapsible Tables
//
// Description: Allows tables to be collapsed, showing only the header.
// Reference:   [[Wikipedia:Wikipedia:NavFrame]]
//              [[Wikipedia:Help:Collapsing]]
// Maintainers: [[Wikipedia:User:R. Koot]]
//
// =====================================================================

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
    if (!Table || !Button) return false;

    var Rows = Table.getElementsByTagName("tr");

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var navBoxes = new {};
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            /* Only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;

            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            navBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontSize = "90%";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    var j = 0;
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible") && hasClass(navBoxes[i], "autocollapse")) j++;

        var h = 0;
        if (hasClass(navBoxes[i], "navbox") && hasClass(navBoxes[i], "collapsible")) h = navBoxes[i].clientHeight;
        if (h == null || h === undefined) h = 0;

        // Does not collapse if:
        //   Contains "uncollapsed"

        // Collapses if:
        //   1. Contains "collapsed"
        //   2. If j>autoCollapse, and contains "navbox collapsible autocollapse"
        //   3. If table height > maxHeight, and contains "navbox collapsible"
        //   4. If there are "innercollapse" tables in "outercollapse" tables

        if (!hasClass(navBoxes[i], "uncollapsed")) {
            if (hasClass(navBoxes[i], "collapsed") || (j > autoCollapse) || (h > maxHeight)) {
                collapseTable(i);
            } else if (hasClass(navBoxes[i], "innercollapse")) {
                var element = navBoxes[i];
                while (element = element.parentNode) {
                    if (hasClass(element, "outercollapse")) {
                        collapseTable(i);
                        break;
                    }
                }
            }
        }
    }
}

addOnloadHook(createCollapseButtons);

// =====================================================================
// AutoCVU
// autocvu.js
//
// Adds a "report" link to page histories and diffs for quickly 
// reporting a vandal to the CVU.
// =====================================================================

$(document).ready(function () {
    function makeLink(user) {
        var a = document.createElement('a');
        a.href = wgScript + '?title=War_of_Legends:Counter_Vandalism_Unit&action=edit&section=2&cvuEditor=' + encodeURIComponent(user) + '&cvuPage=' + encodeURIComponent(wgPageName);
        a.title = 'Report this edit to the CVU.';
        a.appendChild(document.createTextNode('report'));
        return a;
    }

    // http://www.netlobo.com/url_query_string_javascript.html
    function getParam(name) {
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.href);
        if (results === null) {
            return '';
        } else {
            return decodeURIComponent(results[1]);
        }
    }

    var cvuEditor = getParam('cvuEditor');
    var cvuPage = getParam('cvuPage');

    if (wgAction == 'rollback') {
        var page = document.getElementById('bodyContent');
        var p = document.createElement('p');
        p.style.fontWeight = 'bold';
        p.appendChild(document.createTextNode('You can '));
        p.appendChild(makeLink(getParam('from')));
        p.appendChild(document.createTextNode(' this user to the CVU.'));
        page.insertBefore(p, page.firstChild);
    } else if (wgAction == 'history') {
        var list = document.getElementById('pagehistory');
        var items = list.getElementsByTagName('li');
        for (i = 0; i < items.length; i++) {
            var user = getElementsByClassName(items[i], 'a', 'mw-userlink')[0].innerHTML;
            var undo = getElementsByClassName(items[i], 'span', 'mw-history-undo')[0];
            undo.appendChild(document.createTextNode(' | '));
            undo.appendChild(makeLink(user));
        }
    } else if (wgAction == 'view' && getParam('diff')) {
        var user = getElementsByClassName(document.getElementById('mw-diff-ntitle2'), 'a', 'mw-userlink')[0].innerHTML;

        var undo = document.getElementById('mw-diff-ntitle1').firstChild;
        undo.appendChild(document.createTextNode(' ('));
        undo.appendChild(makeLink(user));
        undo.appendChild(document.createTextNode(')'));
    } else if (wgAction == 'edit' && cvuEditor && cvuPage) {
        var lineSep = (navigator.appVersion.indexOf('MSIE') != -1) ? '\r\n' : '\n';
        var obj = document.getElementById('wpTextbox1');
        obj.value = obj.value.replace('{{cvuid|insert vandal}}' + lineSep, '').replace('-->' + lineSep, '-->\n\n{' + '{cvuid|' + cvuEditor + '|' + cvuPage.replace(/_/g, ' ') + '}' + '}');
        document.getElementById('wpSummary').value += ' Reported to CVU';
    }
});

// =====================================================================
// QuickPreview
//
// Original script: User:Sander_Säde/quickpreview.js
// Ported to use jQuery and Monaco for Wikia
// =====================================================================

if (skin == 'monaco' && (wgAction == 'edit' || wgAction == 'submit')) {
    $(document).ready(function () {
        var attrs = {
            tabindex: 6,
            accesskey: 'g',
            id: 'dlQuickPreview',
            title: 'Preview your changes'
        };
        var $button = $('<input type="button" />').val('Quick preview').attr(attrs).click(function () {
            $(this).val('Getting preview').attr('disabled', 'disabled');

            var f = document.editform;

            $.ajax({
                data: {
                    'wpMinoredit': f.wpMinoredit.checked,
                        'wpWatchthis': f.wpWatchthis.checked,
                        'wpStarttime': f.wpStarttime.value,
                        'wpEdittime': f.wpEdittime.value,
                        'wpAutoSummary': f.wpAutoSummary.value,
                        'wpEditToken': f.wpEditToken.value,
                        'wpSummary': 'Quick preview',
                        'wpTextbox1': f.wpTextbox1.value
                },
                dataType: 'text',
                type: 'POST',
                url: document.location.href.replace('&action=edit', '&action=submit') + '&wpPreview=true&live=true',
                success: function (response) {
                    $('#wikiPreview').css('display', 'block').html(unescape(response.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&').replace(/&quot;/g, '"')));
                    $('#dlQuickPreview').val('Quick preview').attr('disabled', null);
                }
            });

        });
        var $li = $('<li />').append($button);
        $('#edit_enhancements_toolbar li').eq(2).after($li);
    });
}

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = 'T minus';
    } else {
        var tpm = 'T plus';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = []; // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// ==================================================================
// Added SiteNotice Functionality
// 
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
//
// Source: RuneScape Wiki
// ==================================================================

var dCookieName = "dismissSiteNotice=";
var msgClose = "dismiss";

var hCookieName = "hideSiteNotice=";
var hCookiePos = document.cookie.indexOf(hCookieName);
var hCookieValue = "";

function editSiteNotice() {
    var snbox = document.getElementById('mw-dismissable-notice');

    if (snbox !== null) {
        if (hCookiePos > -1) {
            hCookiePos = hCookiePos + hCookieName.length;
            var hideEndPos = document.cookie.indexOf(";", hCookiePos);
            if (hideEndPos > -1) {
                hCookieValue = document.cookie.substring(hCookiePos, hideEndPos);
            } else {
                hCookieValue = document.cookie.substring(hCookiePos);
            }
        }

        var newLink = document.createElement('a');
        newLink.setAttribute('href', "javascript:dismissNotice();");
        newLink.setAttribute('title', 'Dismiss this notice.');
        newLink.innerHTML = msgClose;

        var hideLink = document.getElementById("collapseButton" + "0");
        hideLink.href = "javascript:hideSiteNotice();";
        hideLink.parentNode.style.width = "12em";
        hideLink.parentNode.appendChild(document.createTextNode(' ['));
        hideLink.parentNode.appendChild(newLink);
        hideLink.parentNode.appendChild(document.createTextNode(']'));

        snbox.tBodies[0].rows[0].deleteCell(1);

        if (hCookieValue != siteNoticeID && hideLink.innerHTML == "show") {
            collapseTable(0);
        }
        if (hCookieValue == siteNoticeID && hideLink.innerHTML == "hide") {
            collapseTable(0);
        }
    }
}

function hideSiteNotice() {
    var hideLink = document.getElementById("collapseButton" + "0");
    var date = new Date();

    if (hideLink.innerHTML == 'hide') {
        date.setTime(date.getTime() + 30 * 86400 * 1000);
    } else {
        date.setTime(date.getTime() - 30 * 86400 * 1000);
    }
    document.cookie = hCookieName + siteNoticeID + "; expires=" + date.toGMTString() + "; path=/";
    collapseTable(0);
}

addOnloadHook(editSiteNotice);

// ==================================================================
// Changes 'article' to 'main page' on the monobook skin
// ==================================================================

function monobookMainPageFix() {
    var nstab = document.getElementById("ca-nstab-main");
    if (nstab && wgUserLanguage == "en") {
        while (nstab.firstChild) nstab = nstab.firstChild;
        nstab.nodeValue = "Main page";
    }
}

if (wgPageName == "War_of_Legends_Wiki" || wgPageName == "Talk:War_of_Legends_Wiki") {
    addOnloadHook(monobookMainPageFix);
}

// ==================================================================
// Display Clock
// Displays the server date/time in BST
//
// Source: http://www.timeanddate.com/clocks/free.html
// ==================================================================

importArticles({
    type: 'script',
    articles: [ 'u:dev:DisplayClock/code.js' ]
});

/* </pre> */
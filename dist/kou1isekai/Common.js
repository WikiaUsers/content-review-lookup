// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================
$(function foldingTabsMulti() {
    var len = 0;
    ftsets = getElementsByClassName(document, 'div', 'foldtabSet'); //global object array thingy
    if (ftsets.length == 0) return

    for (var i = 0; i < ftsets.length; i++) {
        ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
        ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
        ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

        if (ftsets[i].links.length < ftsets[i].boxen.length) {
            len = ftsets[i].boxen.length;
        } else {
            len = ftsets[i].links.length;
        }

        for (var j = 0; j < len; j++) {
            ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
            ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
        }
        showmultitab(i, '0');
        ftsets[i].head.style.display = 'block';
    }
});

function showmultitab(set, num) {
    for (var j = 0; j < ftsets[set].boxen.length; j++) {
        if (j == num) {
            ftsets[set].boxen[j].style.display = 'block';
        } else {
            ftsets[set].boxen[j].style.display = 'none';
        }
    }
    for (var j = 0; j < ftsets[set].links.length; j++) {
        if (j == num) {
            ftsets[set].links[j].className = 'selected';
            ftsets[set].links[j].blur();
        } else {
            ftsets[set].links[j].className = '';
        }
    }
}
// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
$(function disableOldForumEdit() {
    if (wgNamespaceNumber == 110) {
        if (typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
            return;
        }
        if (!document.getElementById('old-forum-warning')) {
            return;
        }

        if (skin == 'oasis') {
            $("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href');
            $('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
            return;
        }

        if (!document.getElementById('ca-edit')) {
            return;
        }

        var editLink = null;
        if (skin == 'monaco') {
            editLink = document.getElementById('ca-edit');
        } else if (skin == 'monobook') {
            editLink = document.getElementById('ca-edit').firstChild;
        } else { return; }

        editLink.removeAttribute('href', 0);
        editLink.removeAttribute('title', 0);
        editLink.style.color = 'gray';
        editLink.innerHTML = 'Archived';

        $('span.editsection-upper').remove();
    }
});

//=============================================================================
// IRC support
// from http://dev.wikia.com/wiki/Freenode_IRC#Embedding_Wikia.27s_IRC_gateway
//=============================================================================
function onloadhookcustomirc() {
    var replace = document.getElementById("JRChatReplace");
    if (null != replace) {
        replace.innerHTML = '<iframe src="http://webchat.freenode.net/?channels=wikia-onepiece" width="450" height="400"></iframe>';
        if (window.attachEvent) window.attachEvent("onbeforeunload", confirmexitjrchat);
        else window.onbeforeunload = confirmexitjrchat;

    }
    //alert(document.getElementById("JRChatReplace").innerHTML);
}

if (window.addEventListener) window.addEventListener("load", onloadhookcustomirc, false);
else if (window.attachEvent) window.attachEvent("onload", onloadhookcustomirc);

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
$(function FairUseRationale() {
    if ((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value == '') {
        document.getElementById('wpUploadDescription').value = '== Source ==\n\n== Licensing ==\n\n[[Category:';
    }
});
// ****** END: JavaScript for [[Special:Upload]] ******

if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Add the ō character",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Add the ū character",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
}

/* Auto Refresh */
window.AjaxRCRefreshText = 'Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
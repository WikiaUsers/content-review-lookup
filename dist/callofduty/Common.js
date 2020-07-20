/* Any JavaScript here will be loaded for all users on every page load. */
/* If you don't know what you are doing, do not edit this page */
/* <pre> */

// ************
// Easy-add CVU
// ************
// Courtesy of Megan
// importScriptPage('User:Cakemix/QCVUAdder.js', 'callofduty');


// *********
// IRC Login Fixed by Megan (Now stops f***ing loading on every page)
// *********
$(document).ready(function () {
    if ($('#IRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-cod&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
    if ($('#CVNIRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-cod&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
    if ($('#CoDferenceIRClogin')) {
        var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
        $('#CoDferenceIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=codference&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
    }
});


// *************************
// Template:Game positioning
// *************************
// credit to Fallout wiki

$(function addTitleIcons() {
    if (skin == 'monaco' || skin == 'monobook' || skin == 'oasis') {
        var insertTarget;

        switch (skin) {
        case 'monobook':
            insertTarget = $('#firstHeading');
            break;
        case 'monaco':
            insertTarget = $('#article > h1.firstHeading');
            break;
        case 'oasis':
            if (wgAction != 'submit' && wgNamespaceNumber != 112) {
                insertTarget = $('#WikiaArticle');
            }
                break;
        }

        if (insertTarget) {
		$('#gametemplate').css('display', 'block').prependTo(insertTarget);
        }
    }
});

// *************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// *************************************************
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
        var tpm = 'T plus ';
    } else {
        var tpm = 'T minus ';
    }

    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
        timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

function checktimers() {
    try {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none'
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline'

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
    } catch (err) {
        console.log(err.name + " caught in MediaWiki:Common.js!");
        console.log(err.stack);
    }
}
addOnloadHook(checktimers);

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************

if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}

//********************************************************************
// Added SiteNotice Functionality, credit to RuneScape wiki for the code
//
// Functions:
//   * Moves the dismiss link into the SiteNotice table.
//   * Saves the show/hide status of the SiteNotice in a cookie.
//   * Automatically expands the SiteNotice when the ID is updated.
//********************************************************************

var dCookieName = "dismissSiteNotice=";
var msgClose = "dismiss";
var hCookieName = "hideSiteNotice=";
var hCookiePos = document.cookie.indexOf(hCookieName);
var hCookieValue = "";

function editSiteNotice() {
    var snbox = document.getElementById('mw-dismissable-notice');

    if (snbox != null) {
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

        var newSpan = document.createElement('span');
        newSpan.id = 'siteNoticeDismiss';
        newSpan.appendChild(document.createTextNode(' ['));
        newSpan.appendChild(newLink);
        newSpan.appendChild(document.createTextNode(']'));

        var hideLink = document.getElementById("collapseButton" + "0");
        hideLink.href = "javascript:hideSiteNotice();"
        hideLink.parentNode.style.width = "12em";
        hideLink.parentNode.appendChild(newSpan);

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

if (skin == 'oasis') {
    addOnloadHook(editSiteNotice);
}

// *****************************************************************************************
// Description: Redirects from /User:UserName/skin.js or .css to the user's actual skin page
// Maintainer: Cacycle
// *****************************************************************************************
 if (wgArticleId == 0 && wgUserName) {
    var slash = wgPageName.indexOf('/');
    var norm = wgPageName.substr(0, slash) + wgPageName.substr(slash).toLowerCase();
    var test = 'User:' + wgUserName.replace(/ /g, '_') + '/skin.';
    var ext = null;
    if (norm == test + 'js') ext = 'js';
    else if (norm == test + 'css') ext = 'css';
    if (ext != null) window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin.replace('oasis', 'wikia') + '.' + ext);
}
    

// ***************************************
// Ajax-refresh (code from pcj of WoWWiki)
// ***************************************
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Log",
    "Special:Contributions",
    "Special:AbuseLog"
];
window.AjaxRCRefreshText = 'Auto-Refresh';

// *********************************************
// Page background changer (courtesy of Megan)
// *********************************************

$(function BgImage() {
    if ($('#BgImage').text().length > 3 && ($('#BgImage').text().match("(((http://www)|(http://)|(www))[-a-zA-Z0-9@:%_\+.~#?&//=]+)\.(jpg|jpeg|gif|png|bmp|tiff|tga|svg)"))) {
        $('#BgImage').hide();
         $('body').css("background-image", "url(" + $('#BgImage').text() + ") !important").css("backgroundPosition", "top center").css("backgroundRepeat", "no-repeat").css("background", "none");
    }
});

// **********************************
// FIND DUPLICATE IMAGES
// Code courtesy of "pcj" of WoWWiki.
// **********************************

dil = new Array();

function findDupImages(gf) {
    output = "";
    url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
    if (gf) url += "&gaifrom=" + gf;
    $.getJSON(url, function (data) {
        if (data.query) {
            pages = data.query.pages;
            for (pageID in pages) {
                dils = "," + dil.join();
                if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
                    output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
                    for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
                        output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
                        dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
                    }
                    output += "</ul>\n\n"
                }
            }
            $("#mw-dupimages").append(output);
            if (data["query-continue"]) setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
        }
    });
}
    
$(function () {
    if ($("#mw-dupimages").length) findDupImages();
});



/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/

$(function () {
    if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
        var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
        then = new String(then.match(/\d{8}/));
        var monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var year = then.match(/^\d{4}/);
        var month = then.substring(4, 6);
        var now = new Date();
        month--;
        month = monthnames[month];
        var day = then.match(/\d{2}$/);
        then = new Date(month + '' + day + ', ' + year);
        var old = parseInt(now - then);
        old = Math.floor(old / (1000 * 60 * 60 * 24));
        if (old > 30) {
            $('#article-comm-form').attr('disabled', 'disabled');
            $('#article-comm').attr('disabled', 'disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
            $('#article-comm-submit').attr('disabled', 'disabled');
            $('.article-comm-reply .wikia-button .secondary').remove();
        }
    }
});

$('a:contains(An Anonymous user)').append(function(){return ' (' + this.href.match(/(\d{1,3}\.){3}\d{1,3}/)[0] + ')'})

// {{USERNAME}}
$(function() {
    if ( mw.config.get( 'wgUserName' ) !== null )
        $( '.insertusername' ).text( mw.config.get( 'wgUserName' ) );
});
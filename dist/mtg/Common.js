/* Any JavaScript here will be loaded for all users on every page load. <pre>*/

// ==================================================
//  Folding Multi Wiki Tabs 
// ==================================================

$(function foldingTabsMulti() {
    var len = 0;
    ftsets = getElementsByClassName(document, 'div', 'foldtabSet'); //global object array thingy
    if (ftsets.length === 0) return

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
            ftsets[i].links[j].title += ' (click to display)';
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

/* Function based on externalLinks as described at http://www.mediawiki.org/wiki/Manual:Opening_external_links_in_a_new_window
 */

newWindowLinks = function() {
    if (!document.getElementsByTagName) {
        return;
    }
    var wrappers = getElementsByClassName(document, "*", "OpenNewWindow");
    for (var j = 0; j < wrappers.length; j++) {
        var anchors = wrappers[j].getElementsByTagName("a");
        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            anchor.target = "_blank";
        }
    }
};
if (window.addEventListener) {
    window.addEventListener("load", newWindowLinks, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", newWindowLinks);
}

/**
 * Split-card subpage hiding by [[User:Skizzerz]]
 */

$(function hideSubpages() {
    var splitcard = document.getElementById('splitcard');
    if (!splitcard) return;
    var subpages = getElementsByClassName(document, 'span', 'subpages')[0];
    if (!subpages) return;
    subpages.setAttribute('style', 'display:none');
});

/**
 * Switch template for Flip/Split Cards by [[User:Skizzerz]]
 */

$(function makeSwitchLinks() {
    var switchlink = document.getElementById('flipicon');
    if (!switchlink) return;
    var links = switchlink.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].href = 'javascript:flipDescriptions();';
        links[i].title = 'flip card';
    }
    var text1 = getElementsByClassName(document, 'span', 'side1');
    var text2 = getElementsByClassName(document, 'span', 'nojavascript');
    for (var i = 0; i < text1.length; i++) {
        text1[i].style.display = 'inline';
    }
    for (var i = 0; i < text2.length; i++) {
        text2[i].style.display = 'none';
    }
});


function flipDescriptions() {
    var text1 = getElementsByClassName(document, 'span', 'side1');
    var text2 = getElementsByClassName(document, 'span', 'side2');
    if (text2[0].style.display == 'none') {
        for (var i = 0; i < text1.length; i++) {
            text1[i].style.display = 'none';
            text2[i].style.display = 'inline';
        }
    } else {
        for (var i = 0; i < text1.length; i++) {
            text1[i].style.display = 'inline';
            text2[i].style.display = 'none';
        }
    }
}

/**
 * Javascriptonly / Nojavascript toggles
 * Something class="javascriptonly" and style="display: none" will only display if javascript is enabled
 * Something with class="nojavascript" will only display if javascript is not enabled.
 * MUST BE <span> ELEMENTS! ANYTHING ELSE WILL NOT WORK
 * by [[User:Skizzerz]]
 */
$(function doJavascriptDisplay() {
    var jsonly = getElementsByClassName(document, 'span', 'javascriptonly');
    var nojs = getElementsByClassName(document, 'span', 'nojavascript');
    for (var i = 0; i < jsonly.length; i++) {
        jsonly[i].style.display = 'inline';
    }
    for (var i = 0; i < nojs.length; i++) {
        nojs[i].style.display = 'none';
    }
});

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.2
// **************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // catch negative dates
    if (diff < 0) {
        diff = -diff;
        var left = 'ago since';
    } else {
        var left = 'until';
    }

    // calcuate the diff
    left = (diff % 60) + ' seconds ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    tim[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

$(function checktimers() {
    var untimers = getElementsByClassName(document, 'span', 'notimer');
    for (var i = 0; i < untimers.length; i++) {
        untimers[i].style.display = 'none';
    }
    timers = getElementsByClassName(document, 'span', 'countdowntimer'); //global
    tim = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i = 0; i < timers.length; i++) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
        timers[i].style.display = 'inline';
        updatetimer(i); //start it up
    }
});

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************


// **************************************************
//  Tooltip Javascript from joeplayground
//  joeplayground.wikia.com/wiki/Setting_up_tooltips
// **************************************************
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');
// **************************************************
//  - end Tooltip Javascript from joeplayground
// **************************************************
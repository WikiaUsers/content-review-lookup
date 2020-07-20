/* Code here will load for all users, regardless of what skin they are using */

/* EDPS calculator script */
$(document).ready(function() {
    $(".EDPSBox input").keyup(function() {
        var MinDmg = $("#MinDmg").val();
        var MaxDmg = $("#MaxDmg").val();
        var Agi = $("#Agi").val();
        var Acc = $("#Acc").val();
        var Rel = $("#Rel").val();
        var Cap = $("#Cap").val();
        var ADMG = (parseFloat(MinDmg) + parseFloat(MaxDmg)) / 2;
        var DPM = ADMG * Cap;
        var DPMA = (DPM * Acc) / 100;
        var TTE = (1 / Agi) * Cap;
        var TTER = parseFloat(TTE) + parseFloat(Rel)
        var EDPS = DPMA / TTER;
        $("#ADMG").val(ADMG);
        $("#DPM").val(DPM);
        $("#DPMA").val(Math.round(DPMA*100)/100);
        $("#TTE").val(Math.round(TTE*100)/100);
        $("#TTER").val(Math.round(TTER*100)/100);
        $("#EDPS").val(Math.round(EDPS*100)/100);
    });
});
/* End of EDPS calculator script */

// AUTO-REFRESH RECENT CHANGES AND WIKI-ACTIVITY
 AjaxRCRefreshText = 'Auto-refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
 importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
// END AUTO-REFRESH

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
    $('.insertusername').html(wgUserName);
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
        var tpm = 'T plus ';
    } else {
        var tpm = '';
    }
 
    // calcuate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left
    var diffing = count = Math.floor((then.getTime() - now.getTime()) / 1000);
    if (diffing < 0) {
        timers[i].firstChild.nodeValue = 'Timer has expired';
    } else {
        timers[i].firstChild.nodeValue = tpm + left;
    }
 
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}
 
function checktimers() {
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
}
addOnloadHook(checktimers);
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************



// Freenode IRC element
function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="https://webchat.freenode.net/?channels=wikia-tlaststand" width="450" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
// END Freenode IRC element


// *** ReferencePopups script *** //
// *** [[w:c:dev:ReferencePopups]] *** //
// *** Simply move your cursor over any footnote and the contents of the footnote will be displayed in a popup *** //
// *** You no longer have to jump away from the article text to read a footnote! *** //
// *** Currently "unlocked" -- users can disable the script for themselves in the script's preferences if they choose so *** //
// *** NOTE: "Configure Reference Popups" button will not appear in Oasis skin if Wikia's category module is enabled. Add ?useskin=monobook to the end of the page URL and look for the link just below the categories *** //
// *** The developers may be looking for a fix. *** //
importArticle({type:'script', article:'w:c:dev:ReferencePopups/code.js'});
// *** END ReferencePopups script *** //

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Taken from Wikipedia's Common.js. and [[w:c:sims:Common.js]]
 */
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
 
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
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "3.5em";
 
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
 
    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
 
addOnloadHook(createCollapseButtons);

// END Collapsible tables
//<pre>
/*
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                             *
 *                                                             *
 * Site-wide, all skin JavaScript.                             *
 *                                                             *
 * Code updates by Starfleet Academy.                          *
 *                                                             *
 *                                                             *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 */

// To make hover over tag appear for admins
function AdminTag() {
 $('[href="/wiki/User:Grunty89"], [href="/wiki/User:C.Syde65"], [href="/wiki/User:AltoonaRailfan"]').attr('title', 'This user is an Administrator');
}

// To make hover over tag appear for bots
function BotTag() {
 $('[href="/wiki/User:Starfleet_Bot"]').attr('title', 'This is a bot');
}

/* === AjaxRC (and compatibility code by Mathmagician & Pecoes) === */
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:Watchlist','Special:WikiActivity'];
var AjaxRCRefreshText = 'Auto-refresh';
 
/* This calls AdminTag() and BotTag()
 * after every time the ajax reloads */
ajaxCallAgain = [AdminTag,BotTag];
 
importScriptPage('AjaxRC/code.js', 'dev');
// END of ajax auto-refresh
 
/* These next two lines will call AdminTag() and BotTag()
 * only once, after the page
 * finishes loading */
$(AdminTag);
$(BotTag);

/* === Importing Show/Hide code from Wikia Devolopers' Wiki === */
// importing show/hide
var ShowHideConfig = { 
                       en: {
                             show: "more",
                             hide: "less",
                           }
};
importScriptPage('ShowHide/code.js', 'dev');
// END importing show/hide

//Adds a notice to the main page when not in Oasis -- by Starfleet Academy
$(function() {
 if (mw.config.get('wgUserGroups') != null && skin != "oasis") {
  $('.mp-introduction').append('<p id="OasisIsBest" style="text-align: center; font-size:85%; margin-bottom: 10px;"><em>This wiki looks best viewed in</em> <a href="http://locomotive.wikia.com/index.php?title=Locomotive_Wiki&useskin=wikia">the Wikia skin</a> <em>(Oasis)</em>.<a id="HideButton" style="margin-left: 20px; cursor: pointer;">[Dismiss]</a></p>');
  $('#HideButton').click(function() {
  $('#OasisIsBest').hide('slow');
  });
 };
});
//END adding notice

/**** Glossary -- by Starfleet Academy ****/
//Builds ToCs in glossary
function buildTocs(where) {
var items = document.getElementById(where+"_subs").getElementsByClassName("mw-headline");
var listItems = new Array();
var count = 1;
var x = 0;
    for (var i=0; i<items.length; i++) {
        listItems.push("<li><a href='#"+items[i].getAttribute("id")+"'>"+ count + " " + items[i].innerHTML + "</a></li>");
        count++;
    }
 
    do {
        if (items.length === 0) {
            $("#"+where+"_toc ul").append("<li style='font-style:italic;font-size:85%'>Sorry, found no definitions.</li>");
        } else {
            $("#"+where+"_toc ul").append( listItems[x] ); 
        }
    x++;
    } while (x<listItems.length);
}
 
window.onload = function () {
var alpha = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
    if ( mw.config.get("wgPageName") === "Glossary_of_Terms" && mw.config.get("wgAction") === "view" ) {
        for (var i=0; i<alpha.length; i++) {
            buildTocs(alpha[i]);
        }
        countApples();
    }
};
//END building ToCs

//Counts up all H3 elements, i.e. definitions
function countApples() {
var dd = document.getElementById("mw-content-text").getElementsByTagName("H3");
var length = dd.length;
var nod = document.getElementById("numberOfDefinitions");

    nod.innerHTML= "<big>" + length + "</big>" + " defintions";
}
//END counting definitions
/**** END Glossary ****/

//</pre>
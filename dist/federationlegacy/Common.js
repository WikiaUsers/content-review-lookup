/*******************************************************************************
** BASIC JS STUFF
*******************************************************************************/

/* Spoiler notification (import) */
// This script must always be the very first executed
importScriptPage('MediaWiki:Spoilers.js');
//importScriptPage('MediaWiki:Spoiler.js');

/* User tags (from Attack on Titan Wiki) */
// Core configuration
window.UserTagsJS = {
    modules: {},
    tags: {
        bureaucrat: {
                u: 'Bureaucrat',
                link: 'Project:Administrators',
                order: -7
        },
        sysop: {
                link: 'Project:Administrators',
                order: -6
        },
        threadmoderator: {
                link: 'Project:Discussions Moderators',
                order: -5
        },
        'content-moderator': {
                u: 'Content Moderator',
                link: 'Project:Content Moderators',
                order: -4
        },
        chatmoderator: {
                link:'Project:Chat Moderators',
                order: -3
        },
        rollback: {
                u: 'Rollbacker',
                link: 'Project:Rollbackers',
                order: -2
        },
        bot: {
                u: 'Bot',
                link: 'Project:Bots'
        }
 
    }
};
 
// Adds users' MediaWiki groups to the internal group list
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'threadmoderator',
    'content-moderator',
    'chatmoderator',
    'rollback',
    'bot'
    ];
 
// Removes certain groups
UserTagsJS.modules.metafilter = {
    'sysop': ['bot'] // Removes admin tag from all bots
};
 
// Marks users as inactive if they haven't edited in a month or more
UserTagsJS.modules.inactive = 30;

/*******************************************************************************
** "Hidden appearances section/interactive tree" script; by [[User:Bp]]
** Required functions outside of ".ready" portion
*******************************************************************************/
 
function toggleAppearancesPane(eid) {
	e = document.getElementById(eid);
	if (e) { e.className = (e.className == "hiddenlist") ? "visiblelist" : "hiddenlist"; }
}
 
function showAppearancesPane(eid) {
	e = document.getElementById(eid);
	if (e) { e.className = "visiblelist"; }
}
 
function hideAppearancesPane(eid) {
	e = document.getElementById(eid);
	if (e) { e.className = "hiddenlist"; }
}

/*******************************************************************************
** Smallish changes
*******************************************************************************/
 
//Replace REDIRECT arrow" with a custom one ([[User:Bp]])
$('img[src$="redirectltr.png"]')
  .attr('src', 'https://images.wikia.nocookie.net/memoryalpha/en/images/c/cb/MA_redirect_arrow.png');
 
/*******************************************************************************
** "Hidden appearances section/interactive tree" script; by [[User:Bp]]
** Main portion
*******************************************************************************/

var tree = 0;
var pane = 0;
var paneListForThisTree = new Array();
var descriptionString = new String("This list contains %d items"); //%d is where the number of items is inserted

var smallTreeCount = 4; // less leaves than this, the tree will be open at first
var interactiveTrees = 1; // set this to 0 in user.js to turn this off

function button(text,onclick,cls) {
	var b = document.createElement('a');
	b.innerHTML = text;
	b.href="javascript:"+onclick;
	b.className = cls;
	return b;
}

function recursiveCountAndMark(e, depth, nocount) {
	var si = e.firstChild;
	var total = 0;
	while(si) {
		var tn = (si.tagName) ? si.tagName.toLowerCase() : '';
		if (tn == "li") { total++; }
		var subtotal = recursiveCountAndMark(si, depth+1, nocount);
		if (tn == "ul" || tn == "ol") {
			if (depth > 1) {
				si.id = "Pane" + pane++;
				paneListForThisTree.push(si.id);
				si.className = "hiddenlist";

				si.parentNode.insertBefore(document.createTextNode('('), si);
				si.parentNode.insertBefore(button( (nocount) ? "+/-" : subtotal, "toggleAppearancesPane(\""+si.id+"\")", "listexpand"), si);
				si.parentNode.insertBefore(document.createTextNode(')'), si);
				total--; // don't count the li that this ul/ol is in
			} else {
				// we are finished and this is the top ul/ol
				if (subtotal < smallTreeCount) { // this small enough they can be visible right away
					for (var i=0;i<paneListForThisTree.length;i++) {
						toggleAppearancesPane(paneListForThisTree[i]);
					}
				}
				var allonexec = '{';
				var alloffexec = '{';
				for (var i=0;i<paneListForThisTree.length;i++) {
					allonexec += "showAppearancesPane(\""+paneListForThisTree[i]+"\"); ";
					alloffexec += "hideAppearancesPane(\""+paneListForThisTree[i]+"\"); ";
				}
				allonexec += '}'; alloffexec += '}';

			        var ds = (nocount) ? "" : descriptionString.replace(/\%d/g, subtotal);
				si.parentNode.insertBefore(document.createTextNode(ds + ' ('), si);
				si.parentNode.insertBefore(button("show all", allonexec, "listexpand"), si);
				si.parentNode.insertBefore(document.createTextNode(' • '), si);
				si.parentNode.insertBefore(button("hide all", alloffexec, "listexpand"), si);
				si.parentNode.insertBefore(document.createTextNode(')'), si);
			}
		}
		total += subtotal;
		si = si.nextSibling;
	}
	return total;
}

function doAppearancesTrees() {
	if (!interactiveTrees) { return; }

	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className.match(/\bappear\b/)) {
			recursiveCountAndMark(divs[i], 0, (divs[i].className.match(/\bnocount\b/)) ? 1 : 0);
			paneListForThisTree = new Array();
			tree++;
		}
	}

	// fix a bug noticed by renegade54
	// jump to the named anchor again
	if (window.location.hash && tree > 0) {
		// still won't work 100% in safari and khtml
		if (navigator.userAgent.indexOf("MSIE") != -1) {
			window.location = window.location.hash; // -- causes Firefox to fire onload events
		} else {
			window.location.hash = window.location.hash;
		}
	}

}

hookEvent("load", doAppearancesTrees);

/*******************************************************************************
** "Interactive quotes" script; by [[User:Bp]]
*******************************************************************************/

function speakerLabel(text) {
	var spkr = document.createElement('span');
	spkr.innerHTML = text + ": ";
	spkr.className = "speaker-label";
	return spkr;
}

function explicitQuoteOn(event, e) {
	var si = (e) ? e.firstChild : this.firstChild;
	while(si) {
		explicitQuoteOn(event, si);
		if (si.className == "dialogue-inside") {
			si.className = "dialogue-inside-highlight";
		} else if (si.className == "quoteline") {
			if (si.childNodes[0].className != "speaker-label") {
				if (si.title !== '') {
					si.insertBefore(speakerLabel(si.title), si.childNodes[0]);
					si.title = '';
				}
			}
			if (si.childNodes[0].className == "speaker-label") {
				si.childNodes[0].style.display = "inline";
			}
		}
		si = si = si.nextSibling;
	}
}

function explicitQuoteOff(event, e) {
	var si = (e) ? e.firstChild : this.firstChild;
	while(si) {
		explicitQuoteOff(event, si);
		if (si.className == "dialogue-inside-highlight") {
			si.className = "dialogue-inside";
		} else if (si.className == "quoteline") {
			if (si.childNodes[0].className == "speaker-label") {
				si.childNodes[0].style.display = "none";
			}
		}
		si = si = si.nextSibling;
	}
}

var explicitQuotes = 0;

function doQuotes() {
	if (!explicitQuotes) { return; }

	var dumbevent;
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className == 'dialogue') {
			if (explicitQuotes == 1) {
				divs[i].onmouseover = explicitQuoteOn;
				divs[i].onmouseout = explicitQuoteOff;
			} else {
				explicitQuoteOn(dumbevent, divs[i]);
			}
		}
	}
}

hookEvent("load", doQuotes);

/*******************************************************************************
** "Article-type positioning" script; based off [[User:Bp]] of Memory Alpha
*******************************************************************************/
 
function moveArticleDiv() {
  var fooel = document.getElementById('article-type');
  if (fooel!==null) {
    var artel = document.getElementById('article');
    var wphel = document.getElementById('WikiaPageHeader');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!==null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else if (wphel!==null) {
      wphel.parentNode.insertBefore(fooel,wphel);
    } else {
      //fall back to a position before H1 - useful for monobook skin
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}
 
hookEvent("load", moveArticleDiv);

/*******************************************************************************
** "Collapsible table" script; by [[???]]
*******************************************************************************/
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createCollapseButtons()
{
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( "table" );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], "collapsible" ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName( "th" )[0];
            if (!Header) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
            var Button     = document.createElement( "span" );
            var ButtonLink = document.createElement( "a" );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = "collapseButton";  //Styles are declared in Common.css
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
            ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( "[" ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( "]" ) );
 
            Header.insertBefore( Button, Header.childNodes[0] );
            tableIndex++;
        }
    }
 
    for ( var i = 0;  i < tableIndex; i++ ) {
        if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
            collapseTable( i );
        } 
    }
}
 
addOnloadHook( createCollapseButtons );

/* Snow import */

// 'w:MediaWiki:Snow.js', // Adds snow (nice winter aesthetic)
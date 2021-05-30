/**
 * Primary JavaScript file (all skins)
 */

/*------------------------------------*\
    SCRIPT IMPORTS
\*------------------------------------*/

/* Spoiler notification (import) */

// This script must always be the very first executed
importScriptPage('MediaWiki:Spoilers.js');

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

/*------------------------------------*\
    MISCELLANEOUS
\*------------------------------------*/

/* Insert page header icons */

if($('#canon').length) {
	// Remove the icon from the page content and insert it into the page header
	$('#PageHeader').prepend('<div id="header-icons"></div>');
	$('#header-icons').append($('#canon'));
	
	// Remove an empty paragraph tag that sometimes appears at the top of the page content when the icon is removed
	if($.trim($('.mw-parser-output > p').first().html()) === '') {
		$('.mw-parser-output > p').first().remove();
	}
}

/* Fix parser issues with tabbers */

if($('.no-select').length) {
	var tabs = []; // An array to hold the tabs' HTML
	var lines = ''; // The lines in each tab
	
	// Fetch all of the tabs
	$('.no-select .tabbertab').each(function(i) {
		tabs[i] = $(this).html();
	});
	
	// Create an empty array to hold the updated HTML
	var new_html = new Array(tabs.length).fill('');
	
	// Loop through the tabs
	$(tabs).each(function(i) {
		// Split the tab into lines
		lines = tabs[i].split('\n\n');
		
		// Loop through the lines
		$(lines).each(function(k) {
			// Check whether the line contains a div tag
			if(lines[k].indexOf('div') === -1) {
				// Remove the paragraph tags
				lines[k] = lines[k].replace(/\<\/?p\>/g, '');
				
				// Add paragraph tags to the current line and concatenate it to the updated HTML
				new_html[i] += '<p>' + lines[k] + '</p>';
			} else {
				// Concatenate the line to the updated HTML without making changes
				new_html[i] += lines[k];
			}
		});
	});
	
	// Update the HTML in the tabbers
	$('.no-select .tabbertab').each(function(i) {
		$(this).html(new_html[i]);
	});
}

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

/* Snow import */

// 'w:MediaWiki:Snow.js', // Adds snow (nice winter aesthetic)
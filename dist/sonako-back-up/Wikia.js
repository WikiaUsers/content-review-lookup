// Outside variables
var railgunDefaultMode = 0; // default mode to enter upon pageload
 
// Inside variables
var railgunMode;
 
if (wgNamespaceNumber != undefined) {
	addOnloadHook(launchRailgun);
}
 
/* function launchRailgun -------------------------------------------------- */
/* Starts up Railgun upon page load, placed inside addOnloadHook() --------- */
/* ------------------------------------------------------------------------- */
function launchRailgun() {
	railgunMode = railgunDefaultMode;
	//var contentWidth = $('#WikiaMainContent').width();
	//var catlinksWidth = $('#catlinks').width();
	var railgunModeButton = "";
 
	if (railgunMode == 0) {
		railgunModeButton = '<li><ul id="railgunModeButton" class="wikia-menu-button"><a onclick="setRailgunMode1();" data-id="railgunModeButton" style="color:#fff; width: 15px; text-align:center" title="go to -">+</a></ul></li>';
		$(railgunModeButton).appendTo('.tools');
 
		// Initialization for mode 0
		if (!window.hasRailgunModule) {
			addRailgunModule();
		}
	} else if (railgunMode == 1) {
		railgunModeButton = '<li><ul id="railgunModeButton" class="wikia-menu-button"><a onclick="setRailgunMode2();" data-id="railgunModeButton" style="color:#fff; width: 15px; text-align:center" title="go to W">-</a></ul></li>';
		$(railgunModeButton).appendTo('.tools');
 
		// Initialization for mode 1
		document.getElementById('WikiaRail').style.display = 'none';
		document.getElementById('WikiaMainContent').style.width = '1000px';
		document.getElementById('catlinks').style.width = '1000px';
	} else {
		railgunButton = '<li><ul id="railgunModeButton" class="wikia-menu-button"><a onclick="setRailgunMode0();" data-id="railgunModeButton" style="color:#fff; width: 15px; text-align:center" title="go to +">W</a></ul></li>';
		$(railgunModeButton).appendTo('.tools');
 
		// Initialization for mode 2
		document.getElementById('WikiaRail').style.display = 'block';
		document.getElementById('WikiaMainContent').style.width = '680px';
		document.getElementById('catlinks').style.width = '638px';
	}
}
 
/* function setRailgunMode0 ------------------------------------------------ */
/* Expand the WikiaRail to include the Railgun module ---------------------- */
/* ------------------------------------------------------------------------- */
function setRailgunMode0() {
	if (wgNamespaceNumber != undefined && !window.hasRailgunModule) {
		addRailgunModule();
	}
	$('#railgunModeButton a').replaceWith('<a onclick="setRailgunMode1();" style="color:#fff; width: 15px; text-align:center" title="go to -">+</a>');
	railgunMode = 0;
}
 
/* function setRailgunMode1 ------------------------------------------------ */
/* Completely collapse the WikiaRail --------------------------------------- */
/* ------------------------------------------------------------------------- */
function setRailgunMode1() {
	$('.RailgunModule').replaceWith('');
	hasRailgunModule = false;
	$('#railgunModeButton a').replaceWith('<a onclick="setRailgunMode2();" style="color:#fff; width: 15px; text-align:center" title="go to W">-</a>');
	document.getElementById('WikiaRail').style.display = 'none';
	document.getElementById('WikiaMainContent').style.width = '1000px';
	document.getElementById('catlinks').style.width = '1000px';
	railgunMode = 1;
}
 
/* function setRailgunMode2 ------------------------------------------------ */
/* Restore the WikiaRail to its default setting ---------------------------- */
/* ------------------------------------------------------------------------- */
function setRailgunMode2() {
	$('#railgunModeButton a').replaceWith('<a onclick="setRailgunMode0();" style="color:#fff; width: 15px; text-align:center" title="go to +">W</a>');
	document.getElementById('WikiaRail').style.display = 'block';
	document.getElementById('WikiaMainContent').style.width = '680px';
	document.getElementById('catlinks').style.width = '638px';
	railgunMode = 2;
}
 
/* function addRailgunModule ----------------------------------------------- */
/* Creates the Railgun Module on the WikiaRail ----------------------------- */
/* ------------------------------------------------------------------------- */
function addRailgunModule() {
	var header = '<h1 style="margin-bottom: 16px;">Railgun<form onsubmit="railgunSearch(); return false;" name="RailgunSearchForm" class="RailgunSearchForm" id="RailgunSearchForm" style="margin-top: 10px;"><input type="text" placeholder="Search wikipedia.org" name="RailgunSearchInput" class="RailgunSearchInput" id="RailgunSearchInput" style="width: 195px; margin-right: 8px;" /><input class="secondary" type="button" onclick="railgunSearch();" value="Search" style="width: 75px;" /></form></h1>';
 
	var thisPage = '<p style="margin-top: 0px; margin-bottom: 0.6em; font-size: 1.2em;"><a href="/wiki/' + wgPageName + '">' + wgPageName.replace(/_/g, " ") + '</a></p>' +
'<table width="100%"><tr><td width="50%" style="padding-left: 20px;">' +
'<ul style="list-style-type: disc;">' +
'<li><a href="?action=edit">Edit</a></li>' +
'<li><a href="/wiki/Special:MovePage/' + wgPageName + '">Move</a></li>' +
'<li><a href="?action=protect">Protect</a></li>' +
'<li><a href="?action=delete">Delete</a></li>' +
'<li><a href="?action=history">History</a></li>' +
'<li><a href="?diff=' + wgCurRevisionId + '">Last Diff</a></li>' +
'<li><a href="?action=purge">Purge</a></li>' +
'</ul>' +
'</td><td>' +
'<ul style="list-style-type: disc;">' +
'<li><a href="?action=watch">Follow</a></li>' +
'<li><a href="/wiki/' + wgPageName + '?oldid=' + wgCurRevisionId + '">Permalink</a></li>' +
'<li><a href="/wiki/Special:PrefixIndex/' + wgPageName + '">Subpages</a></li>' +
'<li><a href="/wiki/Special:WhatLinksHere/' + wgPageName + '">What Links Here</a></li>' +
'<li><a href="?useskin=monobook">View Monobook</a></li>' +
'<li><a href="?useskin=wikiamobile">View Mobile</a></li>' +
'<li><a href="?printable=yes">Print</a></li>' +
'</ul>' +
'</td></tr></table>';
 
	var thisWiki = '<p style="margin-top:0.6em; margin-bottom:0.6em; font-size: 1.2em;"><a href="/wiki/">' + wgSiteName + '</a></p>' +
'<table width="100%"><tr><td width="50%" style="padding-left: 20px;">' +
'<ul style="list-style-type: disc;">' +
'<li><a href="/wiki/Special:Random">Random Page</a></li>' +
'<li><a href="/wiki/Blog:Recent_posts?action=purge">Recent Blogs</a></li>' +
'<li><a href="/wiki/Special:RecentChanges">Recent Changes</a></li>' +
'<li><a href="/wiki/Special:WikiActivity">Wiki Activity</a></li>' +
'</ul>' +
'</td><td>' +
'<ul style="list-style-type: disc;">' +
'<li><a href="/wiki/Special:SpecialPages">Special Pages</a></li>' +
'<li><a href="/wiki/Special:ListUsers/sysop">Administrators</a></li>' +
'<li><a href="/wiki/Special:Statistics">Statistics</a></li>' +
'<li><a href="/wiki/Special:Log">Logs</a></li>' +
'</ul>' +
'</td></tr></table>';
 
	var userImage = '<img src="https://images.wikia.nocookie.net/mathmagician/images/7/79/Star_30px.png" title="+1 Happiness" style="width: 24px; height: 24px; vertical-align: middle;">';
 
	var userList = '<p style="margin-top:0.6em; margin-bottom:0.6em; font-size: 1.2em;">User List</p>' +
'<table width="100%"><tr><td width="24px">' + userImage + '</td><td>' +
'<a href="/wiki/User:' + wgUserName + '">' + wgUserName + '</a>&nbsp; — &nbsp;[<a href="/wiki/User_talk:' + wgUserName + '">talk</a>] [<a href="/wiki/User_blog:' + wgUserName + '">blog</a>] [<a href="/wiki/Special:Contributions/' + wgUserName + '">contrib</a>] [<a href="/wiki/Special:Editcount/' + wgUserName + '">count</a>] [<a href="/wiki/Special:Log/' + wgUserName + '">log</a>] [<a href="/wiki/Special:Following">following</a>] [<a href="/wiki/User:' + wgUserName + '/wikia.js">JS</a>] [<a href="/wiki/User:' + wgUserName + '/wikia.css">CSS</a>]</td></tr>' +
'<tr class="RailgunStalkFormContainer"><td colspan="2"><form onsubmit="stalkSomeone(); return false;" name="RailgunStalkForm" class="RailgunStalkForm" id="RailgunStalkForm" style="width: 100%; margin-top: 10px;"><input type="text" placeholder="Enter a user name" name="RailgunStalkInput" class="RailgunStalkInput" id="RailgunStalkInput"><input class="secondary" type="button" onclick="stalkSomeone();" value="Stalk"></form>' +
'</td></tr></table>';
 
	var global = '<p style="margin-top:0.6em; margin-bottom:0.6em; font-size: 1.2em;"><a href="http://www.wikia.com/Wikia">Wikia</a> :: <a href="/wiki/Special:Contact">Contact</a></p>' +
'<table width="100%"><tr><td style="padding-left: 20px;">' +
'<ul style="list-style-type: disc;">' +
'<li><a href="http://community.wikia.com">Community Central</a> [<a href="http://community.wikia.com/wiki/Special:MyPage/global.js">JS</a>] [<a href="http://community.wikia.com/wiki/Special:MyPage/global.css">CSS</a>]</li>' +
'<li><a href="http://terraria.wikia.com">Terraria</a></li>' +
'<li><a href="http://fortesting.wikia.com">For Testing</a></li>' +
'<li><a href="http://mathmagician.wikia.com">Mathmagician</a></li>' +
'<li><a href="http://community.wikia.com/wiki/Special:RandomWiki">Random Wiki</a></li>' +
'</ul>' +
'</td></tr></table>';
 
	var html = '<section class="RailgunModule module">' + header + thisPage + thisWiki + userList + global + '</section>';
 
	var WikiaRail = document.getElementById("WikiaRail");
	var WikiaSearch = document.getElementById("WikiaSearch");
	if (WikiaSearch.parentNode == WikiaRail) {
		$(html).insertAfter('#WikiaSearch');
	} else {
		$(html).insertAfter(WikiaRail.firstChild);
	}
	hasRailgunModule = true;
}
 
/* function railgunSearch() ------------------------------------------------ */
/* Searches google, bing, wikipedia or youtube for the given text ---------- */
/* ------------------------------------------------------------------------- */
function railgunSearch() {
	var query = document.RailgunSearchForm.RailgunSearchInput.value;
	if (query == "") { return; }
	document.RailgunSearchForm.RailgunSearchInput.value = "";
	window.open('http://en.wikipedia.org?search=' + query);
}
 
/* ------------------------------------------------------------------------- */
function stalkSomeone() {
	var username = document.RailgunStalkForm.RailgunStalkInput.value;
	if (username == "") { return; }
	document.RailgunStalkForm.RailgunStalkInput.value = "";
 
	var image = '<img onclick="unstalkSomeone(this.parentNode.parentNode);" src="https://images.wikia.nocookie.net/mathmagician/images/0/00/Bomb_Omb_30px.png" title="Explodify!" style="width: 24px; height: 24px; vertical-align: middle;">';
 
	var html = '<tr><td width="24px">' + image + '</td><td><a href="/wiki/User:' + username + '">' + username + '</a><br />[<a href="/wiki/User_talk:' + username + '">talk</a>] [<a href="/wiki/User_blog:' + username + '">blog</a>] [<a href="/wiki/Special:Contributions/' + username + '">contrib</a>] [<a href="/wiki/Special:Editcount/' + username + '">count</a>] [<a href="/wiki/Special:Log/' + username + '">log</a>] [<a href="/wiki/Special:EmailUser/' + username + '">email</a>]</td></tr>';
 
	$(html).insertBefore('.RailgunStalkFormContainer');
}
 
function unstalkSomeone(userRow) {
	$(userRow).replaceWith('');
}

if (wgCanonicalSpecialPageName == "WikiActivity") {

$(document).ready(function() {
    var newSection = '<section id="activities1" class="module"><p class="MarckScript">' + '</p>' + '</section>';
    $('#WikiaArticle').prepend(newSection);
    $.getJSON('/api.php?action=parse&text={{Testabc}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities1').append(code);
    });
});

}
/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//	<span class="countdown" style="display:none;">
//	Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//	</span>
//	<span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
	var now = new Date();
	var then = timers[i].eventdate;
	var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);
	if(isNaN(diff)) { 
		timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
		return;
	}
	if(diff < 0) {
		diff = -diff;
		var tpm = '  ';
	} else
		var tpm = '  ';
	var left = (diff % 60) + ' seconds';
	diff=Math.floor(diff / 60);
	if(diff > 0) left = (diff % 60) + ' minutes ' + left;
		diff=Math.floor(diff / 60);
	if(diff > 0) left = (diff % 24) + ' hours ' + left;
		diff=Math.floor(diff / 24);
	if(diff > 0) left = diff + ' days ' + left
		timers[i].firstChild.nodeValue = tpm + left;
	timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
	var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
	for(var i in nocountdowns)
		nocountdowns[i].style.display = 'none'
	var countdowns = getElementsByClassName(document, 'span', 'countdown');
	for(var i in countdowns)
		countdowns[i].style.display = 'inline'
	timers = getElementsByClassName(document, 'span', 'countdowndate');
	timeouts = new Array();
	if(timers.length == 0)
		return;
	for(var i in timers) {
		timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
		updatetimer(i);
	}
}
addOnloadHook(checktimers);
 
// **************************************************
//	- end -	Experimental javascript countdown timer
// **************************************************
 
/*
* Test if an element has a certain class
* Description: Uses regular expressions and caching for better performance.
* Taken from Wikipedia's Common.js.
*/

var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

/*
* Collapsible tables
* Description: Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
* Taken from Wikipedia's Common.js.
*/

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
	var Button = document.getElementById("collapseButton" + tableIndex);
	var Table = document.getElementById("collapsibleTable" + tableIndex);
	if(!Table || !Button)
		return false;
	var Rows = Table.rows;
	if(Button.firstChild.data == collapseCaption) {
		for (var i = 1; i < Rows.length; i++)
			Rows[i].style.display = "none";
		Button.firstChild.data = expandCaption;
	} else {
		for(var i = 1; i < Rows.length; i++)
			Rows[i].style.display = Rows[0].style.display;
		Button.firstChild.data = collapseCaption;
	}
}

function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( "table" );
	for(var i = 0; i < Tables.length; i++)
		if(hasClass( Tables[i], "collapsible")) {
			var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
			if(!HeaderRow)
				continue;
			var Header = HeaderRow.getElementsByTagName("th")[0];
			if(!Header)
				continue;
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
			var Button = document.createElement("span");
			var ButtonLink = document.createElement("a");
			var ButtonText = document.createTextNode(collapseCaption);
			Button.style.styleFloat = "right";
			Button.style.cssFloat = "right";
			Button.style.fontWeight = "normal";
			Button.style.textAlign = "right";
			Button.style.width = "6em";
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
			ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
			ButtonLink.appendChild(ButtonText );
			Button.appendChild(document.createTextNode("["));
			Button.appendChild(ButtonLink);
			Button.appendChild(document.createTextNode("]"));
			Header.insertBefore(Button, Header.childNodes[0]);
			tableIndex++;
		}
	for(var i = 0; i < tableIndex; i++)
		if(hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse")))
			collapseTable(i);
}
addOnloadHook(createCollapseButtons);
 
/*
* Dynamic Navigation Bars (experimental)
* Description: See [[Wikipedia:NavFrame]].
* Taken from Wikipedia's Common.js.
*/
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
function toggleNavigationBar(indexNavigationBar) {
	var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
	var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
	if (!NavFrame || !NavToggle)
		 return false;
	if(NavToggle.firstChild.data == NavigationBarHide) {
		for(var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling)
			if(hasClass(NavChild, 'NavPic'))
				NavChild.style.display = 'none';
			if(hasClass(NavChild, 'NavContent'))
				NavChild.style.display = 'none';
		NavToggle.firstChild.data = NavigationBarShow;
	} else if(NavToggle.firstChild.data == NavigationBarShow) {
		for(var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling)
			if(hasClass(NavChild, 'NavPic'))
				NavChild.style.display = 'block';
			if(hasClass(NavChild, 'NavContent'))
				NavChild.style.display = 'block';
		NavToggle.firstChild.data = NavigationBarHide;
	}
}
function createNavigationBarToggleButton() {
	var indexNavigationBar = 0;
	var divs = document.getElementsByTagName("div");
	for(var i = 0; NavFrame = divs[i]; i++)
		if (hasClass(NavFrame, "NavFrame")) {
			indexNavigationBar++;
			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
			var NavToggleText = document.createTextNode(NavigationBarHide);
			for(var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling)
				if(hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent'))
					if(NavChild.style.display == 'none') {
						NavToggleText = document.createTextNode(NavigationBarShow);
						break;
					}
			NavToggle.appendChild(NavToggleText);
			for(var j = 0; j < NavFrame.childNodes.length; j++)
				if(hasClass(NavFrame.childNodes[j], "NavHead"))
					NavFrame.childNodes[j].appendChild(NavToggle);
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
}
addOnloadHook( createNavigationBarToggleButton );
 
/*
* LazyLoadVideo - Displays a button over youtube videos that use {{youtube}} to activate them, when the vide itself is hidden by CSS.
* That improves load times, while still allowing users to view the vide inside the same page
* Copyright (C) 2012 Jesús Martínez Novo ([[User:Ciencia Al Poder]])
* 
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version
*/
(function() {
	var _title = (window.lazyloadvideotitle || 'Click to activate video'),
	_thumbUrl = 'http://i1.ytimg.com/vi/{0}/hqdefault.jpg';
	_init = function() {
		var ytContents = $(document.body).find('div.video').children('div.thumbinner').children('div.youtube');
		if(ytContents.length > 0)
			ytContents.children('object').each(_muestraThumb);
	},
	_muestraThumb = function() {
		var oVideo = $(this), dataUrl = oVideo.attr('data'), vid = null, idx = dataUrl.indexOf('&'), w, h;
		if(idx != -1) {
			dataUrl = dataUrl.substr(0, idx);
			idx = dataUrl.lastIndexOf('/');
			if(idx != -1)
				vid = dataUrl.substr(idx + 1);
		}
		if(vid !== null && oVideo.css('display') == 'none') {
			w = oVideo.attr('width'), h = oVideo.attr('height');
			oVideo.parent().append($(document.createElement('img')).attr('src', _thumbUrl.replace('{0}', vid)).attr({width: w, height: h}).addClass('videothumb')).append($('<div class="videodiscoveryoverlay"></div>').css({width: w.concat('px'), height: h.concat('px')}).attr('title', _title).bind('click', _discoverVideo));
		}
	},
	_discoverVideo = function(e) {
		var p = $(this).parent();
		p.children('object').css('display', 'inline');
		p.children('img.videothumb').add(this).unbind().remove();
	};
	$(function() {
		window.setTimeout(_init, 2000);
	});
})();
/* END LazyLoadVideo */

// IRC code originally from Sactage
if(wgPageName == 'Pokémon_Wiki:IRC')
	$(function() {
		var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
		$('#IRClogin').append('<iframe src="http://webchat.freenode.net/?nick=' + encodeURIComponent(nick) + '&channels=wikia-pokemon&prompt=true&uio=OT10cnVlJjExPTE3NCYxMj10cnVld1" width="950" height="400" style="border:0;"></iframe>');
	});

/* ############################################# */
/* ##          CUSTOM EDIT BUTTONS            ## */
/* ############################################# */
 
if((wgAction == "edit" || wgAction == "submit") && mwCustomEditButtons)
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/pokemon/images/4/42/Accent_Button.png",
		"speedTip": "Insert Pokémon",
		"tagOpen": "Pokémon",
		"tagClose": "",
		"sampleText": ""
	};
 
if(mwCustomEditButtons)
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		 "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		 "speedTip": "Redirect",
		 "tagOpen": "#REDIRECT [[",
		 "tagClose": "]]",
		 "sampleText": "Insert text"
	};
 
/* Fill the block expiry time with a default value */
var wgDefaultExpiryBlock = '3 days';

if(wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'Blockip' )
	$(function() {
		if(($('#wpBlockExpiry').val() == '' || $('#wpBlockExpiry').val() == 'other') && $('#mw-bi-other').val() == '')
			$('#wpBlockExpiry').val('3 days').trigger('change');
	});

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=202448143133369&amp;connections=8" align="top" frameborder="0" width="275" height="250" scrolling="no" />');
}
$(fBox);
 
/* track incontent share fb button */
$(function(){
	$("#incontent_share").click(function(){
		WET.byStr("articleAction/incontent_share/" + wgPageName);
	});
});


window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data },
                CM: { u:'Chat Moderator' },
		RB: { u:'Roll Back' },
		CN: { u:'Bureaucrat Emeritus' },
                ADMIN: { u:'Administrator' },
                CRAT: { u:'Bureaucrat' }
	}
};
/*
 --Tijdelijk uitgeschakeld--
 
UserTagsJS.modules.custom = {
// activities and development department
'DarkOverlord-Giratina': ['ADMIN'],
'Mike110': ['ADMIN'],
'Jantje312': ['CRAT']
};
*/

var quizName = "Do you have what it takes to be a Pokémon Master?";
var quizLang = "en";
var resultsTextArray = [ 
	"Aw. You failed at the quiz. However, a good trainer knows to train hard and come back for the challenge. We recommend that you stay here and read articles to expand your knowledge about the Pokémon world.",
	"You know few things, but not quite enough. Still, it does not hurt to learn more things about Pokémon.",
	"An average score. Not bad, but can be better.",
	"You know a lot. The Pokémon Wiki is looking for editors like you. You can join, and might learn some things as well.",
	"Your knowledge might even rival that of the Pokémon Professors! Amazing. Have you considered sharing that knowledge? If not, you can do so here and now!"
	];
var questions = [
 
	["Which is the first episode of the Pokémon anime?",
	"Pokémon - I Choose You!",
	"Pikachu - I Choose You!",
	"Pikachu, I See You!",
	"Pokémon: Indigo League"], 
 
	["Who was the person, in Pokémon Adventures manga, that tasked Yellow to search for Red?",
	"Green",
	"Blaine",
	"Giovanni",
	"Lance",
	"Prof. Oak"],
 
	["What do Kyogre, Groudon and Rayquaza represent?",
	"Land, water, sky",
	"Diamonds, pearls, platinum",
	"Wisdom, courage, empathy",
	"None of the above"],

	["Who are May's rivals, in the anime?",
	"Harley, Drew, Solidad",
	"Harley, Solidad, Brendan",
	"Drew, Norman, Solidad",
	"Drew, Harley, Wally"],

	["What was Gold's nickname, in the manga?",
	"The Hatcher",
	"The Fighter",
	"The Trader",
	"The Calmer"],

	["How many Eeveelutions exist?",
	"Eight",
	"Seven",
	"Nine",
	"Ten"],

	["Who was the first challenger Ash has faced in a battle?",
	"Against Team Rocket trio",
	"Against Brock",
	"Against A.J.",
	"Against Samurai",
	"Against Misty",
	"Against Gary"],

	["Ruby and Sapphire made a bet in the manga. After how many weeks did the bet end?",
	"Less than 11 weeks",
	"10 weeks",
	"Nearly 12 weeks",
	"More than 13 weeks"],

	["Which is the signature move of the creator of Pokémon world?",
	"Judgement",
	"Sacred Sword",
	"Glaciate",
	"Crush Grip",
	"Shadow Force",
	"Psystrike"],

	["In which episode did Porygon debut in the English dub?",
	"A Chansey Operation",
	"Electric Soldier Porygon",
	"A Tale of Ninetales",
	"Holy Matrimony!"],

	["In the Electric Tale of Pikachu manga, Ash caught some Pokémon, unlike in the anime. Among them was Fearow. Which ones were also caught and kept?",
	"Oddish & Beedrill",
	"Slowpoke & Mankey",
	"Rapidash & Kingler",
	"Lapras & Butterfree"],

	["In how many main games did Steven Stone appear?",
	"Four",
	"Three",
	"Five",
	"Six"],

	["Which character in the anime temporarily owned a Legendary Pokémon?",
	"May",
	"Ash Ketchum",
	"Iris",
	"Brock"],

	["Which is the only official Shōjo (intended for female readers) Pokémon manga?",
	"Magical Pokémon Journey",
	"Pokémon Gold & Silver: The Golden Boys",
	"Pokémon Diamond and Pearl Adventure!"],

	["How many main games have been released internationally up to date?",
	"22",
	"24",
	"13",
	"14"]
	];

// sortList
function sortList (a, b) {
    return ($(a).text()) > ($(b).text()) ? 1 : -1;
}
// Check for the pagename
if (mw.config.get('wgPageName') == 'Special:WantedPages' || 'Special:WantedCategories') {
  $('.mw-spcontent .special li').sort(sortList).appendTo('.mw-spcontent .special');
}

var WikiaNotificationMessage = "<b><a href='/wiki/Actieve_Events'>Klik hier</a> om alle actieve events van Pokémon in Nederland en België te zien!</b><br/>.";
var WikiaNotificationexpiry = 15;
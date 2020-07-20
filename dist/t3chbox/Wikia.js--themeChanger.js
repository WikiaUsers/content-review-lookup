// ==UserScript==
// @name           Wikia Theme Changer
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Allows registered users to set their theme to selection of pre-set themes.
// @include        http://*.wikia.com/*
// ==/UserScript==

/*COOKIE AND LOAD FUNCTIONS*/

//Sets function to create cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

//Sets function to read cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//Sets functions to erase cookies
function eraseCookie(name) {
	createCookie(name,"",-1);
}

//Checks theme choice and sets selected theme
var theme_choice = readCookie('ThemeDesign');

function checkTheme() {
	if (theme_choice == "Titan")
	{
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css'}));
	}
	else if (theme_choice == "Warlock")
	{
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css'}));
	}
	else if (theme_choice == "Hunter")
	{
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css'}));
	}
	else
	{
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site'}));
	createCookie('ThemeDesign','default',365)
	}
}

//Adds My Themes option to account navigation
if (wgUserName != null) {
	$('.AccountNavigation .subnav>li:first-child').remove();
	$('.AccountNavigation .subnav>li').remove();
	$('.AccountNavigation .subnav').prepend('<li><a data-id="mytalk" href="/wiki/Message_Wall:T3CHNOCIDE" class="message-wall" accesskey="n">Message Wall</a></li><li><a data-id="preferences" href="/wiki/Special:Preferences">My preferences</a></li><li><a id="OpenMyThemes" style="cursor:pointer;">My Themes</a></li><li><a href="/wiki/Help:Contents" title="" data-id="help">Help</a></li><li><a data-id="logout" href="/wiki/Special:UserLogout?returnto=User%3AT3CHNOCIDE%2FSandbox">Log out</a></li>');
}
else 
{
	$('.GlobalNavigation').append('<li class="topNav Lifestyle lifestyle-vertical-color" data-index="51"><a id="OpenMyThemes" style="cursor:pointer;">My Themes</a></li>');		
}

/*MENU FUNCTIONS*/

//Opens My Theme menu on selection
$('#OpenMyThemes').click(function() {
	window.location.href = wgServer + "/index.php?title=Special:BlankPage&blankspecial=mythemes";
});

//Creates function to make My Themes menu
function createMyThemesMenu() {
	$('.AdminDashboardHeader h1').html('My Themes');
	$('.AdminDashboardGeneralHeader h1').html( 'Change your Wikia theme!' );
	$('#mw-content-text').html('<table cellspacing="0" cellpadding="0" width="1010"><tr height="20px"></tr><tr><td width="495"><table style="background:rgba(0,0,0,0.5);"><tr><td width="150px" style="text-align:left;"><div style="margin-top:-3px; margin-bottom:-3px; margin-left:-7px;"><img width="150px" src="https://images.wikia.nocookie.net/__cb20130818171033/operation-neogenesis/images/9/91/Test_Image.png"></div><td width="365px"><table width="100%"><tr><td width="100%"><span style="font-size:25px; font-weight:bold; text-transform:uppercase;">Hunter Theme</span></td></tr><tr><td width="100%" align="justify">A dusty and worn theme; complementary to the well worked cloaks of the Hunters. This theme is suited only to the daring and the brave, willing to disregard the dangers of the wilderness in search of untold treasures.</td></tr><tr><td width="100%" style="padding-top:10px;"><table cellspacing="0" cellpadding="0"><tr><td width="100%"></td><td width="110px"><div class="TryButton" id="HunterThemeTry">Try</div></td><td width="10px">&nbsp;&nbsp;&nbsp;</td><td width="110px"><div class="InstallButton" id="HunterThemeInstall">Install</div></td></tr></table></td></tr></table></td></tr></table></td><td width="20px"></td><td width="495px"><table style="background:rgba(0,0,0,0.5);"><tr><td width="150px" style="text-align:left;"><div style="margin-top:-3px; margin-bottom:-3px; margin-left:-7px;"><img width="150px" src="https://images.wikia.nocookie.net/__cb20130818171033/operation-neogenesis/images/9/91/Test_Image.png"></div><td width="365px"><table width="100%"><tr><td width="100%"><span style="font-size:25px; font-weight:bold; text-transform:uppercase;">Titan Theme</span></td></tr><tr><td width="100%" align="justify">A theme which matches the cold hard steel and golden trim of a Titan\'s armour, fit only for the most noble and valiant Guardians. Wear your Titan colours with pride as you patrol the depths of this domain.</td></tr><tr><td width="100%" style="padding-top:10px;"><table cellspacing="0" cellpadding="0"><tr><td width="100%"></td><td width="110px"><div class="TryButton" id="TitanThemeTry">Try</div></td><td width="10px">&nbsp;&nbsp;&nbsp;</td><td width="110px"><div class="InstallButton" id="TitanThemeInstall">Install</div></td></tr></table></td></tr></table></td></tr></table></td></tr><tr height="20px"></tr><tr><td width="495"><table style="background:rgba(0,0,0,0.5);"><tr><td width="150px" style="text-align:left;"><div style="margin-top:-3px; margin-bottom:-3px; margin-left:-7px;"><img width="150px" src="https://images.wikia.nocookie.net/__cb20130818171033/operation-neogenesis/images/9/91/Test_Image.png"></div><td width="365px"><table width="100%"><tr><td width="100%"><span style="font-size:25px; font-weight:bold; text-transform:uppercase;">Warlock Theme</span></td></tr><tr><td width="100%" align="justify">This theme is befitting for the astute and enigmatic, with a vibrant colour scheme cloaked in an ambience of arcane energy. Wield this design in reverence, as you ponder the deeper mysteries of the Traveler.</td></tr><tr><td width="100%" style="padding-top:10px;"><table cellspacing="0" cellpadding="0"><tr><td width="100%"></td><td width="110px"><div class="TryButton" id="WarlockThemeTry">Try</div></td><td width="10px">&nbsp;&nbsp;&nbsp;</td><td width="110px"><div class="InstallButton" id="WarlockThemeInstall">Install</div></td></tr></table></td></tr></table></td></tr></table></td><td width="20px"></td><td width="495"><div style="width:330px; margin:0 auto;"><table height="100%" cellspacing="0" cellpadding="0" style="vertical-align:middle; text-align:center;"><tr><td width="115px"><div class="CancelButton" id="ResetTheme">Reset Theme</div></td><td width="20px"></td><td width="115px"><div class="CancelButton" id="CancelTheme">Cancel Changes</div></td></tr></table></div></td></tr></table>');
}

//Creates My Themes menu on page load
if( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Blankpage' && $.getUrlVar( 'blankspecial' ) === 'mythemes' ) {
	document.title = 'My Themes';
	createMyThemesMenu();
}

/*TRY FUNCTIONS*/

//Temporarily sets Titan theme on click
$('#TitanThemeTry').click(function() {
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css'}));
});

//Temporarily sets Warlock theme on click
$('#WarlockThemeTry').click(function() {
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css'}));
});

//Temporarily sets Hunter theme on click
$('#HunterThemeTry').click(function() {
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css'}));
});

/*INSTALL FUNCTIONS*/
 
//Installs Titan theme on click
$('#TitanThemeInstall').click(function() {
	createCookie('ThemeDesign','Titan',365)
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css'}));
	location.reload()
});

//Installs Warlock theme on click
$('#WarlockThemeInstall').click(function() {
	createCookie('ThemeDesign','Warlock',365)
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css'}));
	location.reload()
});

//Installs Hunter theme on click
$('#HunterThemeInstall').click(function() {
	createCookie('ThemeDesign','Hunter',365)
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css"]').remove();
	$('head').append($('<link>').attr({'rel': 'stylesheet', 'href': 'http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css'}));
	location.reload()
});

//Clears themes and refreshes page.
$('#ResetTheme').click(function() {
	eraseCookie('ThemeDesign')
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:TitanTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:WarlockTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/wiki/MediaWiki:HunterTheme.css?action=raw&ctype=text/css"]').remove();
	$('link[href="http://t3chbox.wikia.com/__load/-/cb%3D62259%26debug%3Dfalse%26lang%3Den%26only%3Dstyles%26skin%3Doasis/site"]').remove();
	location.reload()
});

//Cancels changes and returns to set theme
$('#CancelTheme').click(function() {
	checkTheme()
});

//Initialises theme on page load
addOnloadHook(checkTheme);
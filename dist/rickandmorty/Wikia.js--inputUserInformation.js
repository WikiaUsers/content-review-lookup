// ==UserScript==
// @name           User Information Input
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Pulls viewer information from server and places them into specified elements.
// @include        http://*.wikia.com/*
// ==/UserScript==

//Username
var username = wgUserName;
if (username != null) {
	$('#InputUsername').html(username);
}

//Usergroups
var groups = wgUserGroups.toString();
$('#InputUserGroups').html(groups.replace(/,/g,", "));

//User language
if (wgUserLanguage == 'ang') {
	$('#InputUserLanguage').html('Anglo-Saxon');
} else if (wgUserLanguage == 'ar') {
	$('#InputUserLanguage').html('Arabic (العربية)');
} else if (wgUserLanguage == 'hy') {
	$('#InputUserLanguage').html('Armenian (Հայերեն)');
} else if (wgUserLanguage == 'pt-br') {
	$('#InputUserLanguage').html('Brazilian Portuguese (Português do Brasil)');
} else if (wgUserLanguage == 'bg') {
	$('#InputUserLanguage').html('Bulgarian (Български)');
} else if (wgUserLanguage == 'ca') {
	$('#InputUserLanguage').html('Catalan (Català)');
} else if (wgUserLanguage == 'zh') {
	$('#InputUserLanguage').html('Chinese (中文)');
} else if (wgUserLanguage == 'nl') {
	$('#InputUserLanguage').html('Dutch (Nederlands)');
} else if (wgUserLanguage == 'en') {
	$('#InputUserLanguage').html('English');
} else if (wgUserLanguage == 'et') {
	$('#InputUserLanguage').html('Estonian (Eesti)');
} else if (wgUserLanguage == 'fi') {
	$('#InputUserLanguage').html('Finnish (Suomi)');
} else if (wgUserLanguage == 'fr') {
	$('#InputUserLanguage').html('French (Français)');
} else if (wgUserLanguage == 'de') {
	$('#InputUserLanguage').html('German (Deutsch)');
} else if (wgUserLanguage == 'hu') {
	$('#InputUserLanguage').html('Hungarian (Magyar)');
} else if (wgUserLanguage == 'it') {
	$('#InputUserLanguage').html('Italian (Italiano)');
} else if (wgUserLanguage == 'ja') {
	$('#InputUserLanguage').html('Japanese (日本語)');
} else if (wgUserLanguage == 'ko') {
	$('#InputUserLanguage').html('Korean (한국어)');
} else if (wgUserLanguage == 'li') {
	$('#InputUserLanguage').html('Limburgish (Limburgs)');
} else if (wgUserLanguage == 'lt') {
	$('#InputUserLanguage').html('Lithuanian (Lietuviška)');
} else if (wgUserLanguage == 'no') {
	$('#InputUserLanguage').html('Norwegian (Norsk bokmål)');
} else if (wgUserLanguage == 'ps') {
	$('#InputUserLanguage').html('Pashto (پښتو)');
} else if (wgUserLanguage == 'fa') {
	$('#InputUserLanguage').html('Persian (فارسی)');
} else if (wgUserLanguage == 'pl') {
	$('#InputUserLanguage').html('Polish (Polski)');
} else if (wgUserLanguage == 'pt') {
	$('#InputUserLanguage').html('Portuguese (Português)');
} else if (wgUserLanguage == 'ro') {
	$('#InputUserLanguage').html('Romanian (Română)');
} else if (wgUserLanguage == 'ru') {
	$('#InputUserLanguage').html('Russian (Русский)');
} else if (wgUserLanguage == 'es') {
	$('#InputUserLanguage').html('Spanish (Español)');
} else if (wgUserLanguage == 'vi') {
	$('#InputUserLanguage').html('Vietnamese (Tiếng Việt)');
} else if (wgUserLanguage == 'cy') {
	$('#InputUserLanguage').html('Welsh (Cymraeg)');
}
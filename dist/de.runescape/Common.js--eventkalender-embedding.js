// Einbindung des offiziellen deutschen Eventskalenders nach Vorbild des 
// http://pt.runescape.wikia.com -> Common.js/eventos.js
// Link zum offiziellen Forum: http://services.runescape.com/m=forum_de/l=1/forums.ws?94,95,182,118433

var url_base = "https://teamup.com/ksc532c8ff17a9563f?showLogo=0&showTitle=0";

$('div.eventkalender-embedding').each(function() {
	var url = url_base;
	if($(this).hasClass("mini")) url += "&view=l&sidepanel=c";

    $(this).html('<iframe src="' + url + '" frameborder="0"></iframe>');
});
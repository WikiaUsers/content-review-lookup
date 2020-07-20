/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};



/* Eventkalender 
// Einbindung des offiziellen deutschen Eventskalenders nach Vorbild des 
// http://pt.runescape.wikia.com -> Common.js/eventos.js
// Link zum offiziellen Forum: http://services.runescape.com/m=forum_de/l=1/forums.ws?94,95,182,118433
//
//Benutzung: <div class="eventkalender-embed" style="height:780px; width:100%;"></div>
*/

var eventkalender_url_base = "https://teamup.com/ksc532c8ff17a9563f?showLogo=0&showTitle=0";

$('div.eventkalender-embed').each(function() {
    var divStyle = $(this).attr('style');
    var url = eventkalender_url_base;
    if($(this).hasClass("mini")) url += "&view=l&sidepanel=c";
    
	if (divStyle) {
        $(this).html('<iframe src="' + url + '" frameborder="0" style="'+divStyle+'"></iframe>');
	}else{
        $(this).html('<iframe src="' + url + '" frameborder="0"></iframe>');
	}
});

/* Eventkalender ENDE */
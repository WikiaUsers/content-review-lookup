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

url = mw.Uri();
if(!!$('.redirectText').length && url.query.hasOwnProperty('redirect') === false && !!$('.redirectText a').text().match(/^(w:c:|http(s)?)/)) {
    new_url = $('.redirectText a').attr('href');
    $('.redirectText').detach();
    $('.redirectMsg').empty();
    $('.redirectMsg').append(
        $('<span />').text('Sie werden in fünf Sekunden weitergeleitet an folgende URL: ' + new_url).prepend(
            $('<strong>').text('Achtung: ')    
        )
    );
    setTimeout(function() {
        window.location.href = new_url;
    },5000);
}
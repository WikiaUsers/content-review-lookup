$(function() {
//    $('.ns-0 .WikiaPageHeader a.wikia-button.secondary').after('<a class="wikia-button comments secondary" href="/wiki/Tema:' + mw.config.get( 'wgPageName' ) + '">Discusión</a>');
    $('.WikiaPageHeader h1').append($('.destacado'));
    $('.ns-2 .tabs').append($('.destacado'));
    
    if ($('.enlaces-externos').length > 0) {
        var iw = ($('.enlaces-externos .wiki').data('interwiki').length > 0) ? '<div style="text-align: center;"><a href="http://' + $('.enlaces-externos .wiki').data('interwiki') + '.wikia.com"> <img src="http://' + $('.enlaces-externos .wiki').data('interwiki') + '.wikia.com/wiki/Special:FilePath/Wiki-wordmark.png" width="200px" /></a></div>' : '';
        $('.WikiaRail').append('<section class="module ExternalLinksModule"><h1> Enlaces externos </h1> ' + iw + ' <br /> ' + $('.enlaces-externos').html() + '</section>');
        $('.ee-module').hide();
    }
});

var WikiaNotificationMessage = "Hemos abierto la <a href='/wiki/Project:Batallas'>séptima ronda de batallas de Wikivisión</a>, ¡vota por tu favorito!";
var expiry = 30;

importArticles({
	type: 'script',
	articles: [
		'u:dev:WikiaNotification/code.js'
	]
});
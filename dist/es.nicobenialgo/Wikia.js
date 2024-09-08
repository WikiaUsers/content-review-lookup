importArticles({
    type: "script",
    articles: [
	"MediaWiki:Wikia.js/editCount.js" // Add EditCount tab to user namespace
    ]
});

/* Anuncio de arriba de la página */
$(function(){
     if ($('#WikiaPageHeader').length ) {
            $('#WikiaPageHeader').append('<div id="siteSub"><img alt="Aviso.png" width="15" height="15" src="https://images.wikia.nocookie.net/__cb20100222212432/es.gta/images/e/e3/Aviso.png"> <span style="font-weight:bold;">Aviso:</span> ¿Problemas con las nuevas plantillas? ¡Visite el <a href="http://es.regularshow.wikia.com/wiki/Un_Show_Más_Wiki:Manual_de_Estilo" target="_blank"><span style="font-color:#A300CC;">Manual de Estilo</span></a> para aclarar todas sus dudas!</div>');
     }
});

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Parallax.js'
    ]
});
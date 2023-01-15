/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

if (document.querySelector("body").classList.contains('theme-fandomdesktop-dark')){
    mw.loader.load( '/ru/wiki/Mediawiki:' + mw.config.get( 'wgPageName' ).replace(/:/g,'_') + '.css?action=raw&ctype=text/css', 'text/css' );
}
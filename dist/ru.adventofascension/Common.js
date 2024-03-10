/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* Добавляет кнопку Викификатора */
if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
	mw.loader.load('/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
}
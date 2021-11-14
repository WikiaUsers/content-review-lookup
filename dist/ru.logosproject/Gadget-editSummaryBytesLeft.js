// Вызов только при изправлении
if (mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit') {
mw.loader.load( '//ru.wikipedia.org/w/index.php?title=User:Jack who built the house/summaryBytesLeft.js&action=raw&ctype=text/javascript' );
}
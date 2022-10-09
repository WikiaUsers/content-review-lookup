/* Добавляет иконки на нижнюю границу хедера страницы
 * автор: [[User:The 888th Avatar]]; адаптация к новому хедеру: [[User:Thailog]] и [[User:Sophiedp]]
 * оригинальный код: https://avatar.fandom.com/wiki/MediaWiki:Common.js/icons.js
*/

$( function () {
    if ( $( '#icons' ).length ) {
        if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
            $( '.page-header__actions' ).prepend( $( '#icons' ).show() );
        } else {
            $( '.page-header__contribution > div' ).first().append( $( '#icons' ).show() );
        }
    }
} );
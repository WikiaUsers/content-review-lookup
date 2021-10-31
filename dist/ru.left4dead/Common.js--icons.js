/* Добавляет иконки на нижнюю границу хедера страницы
 * автор: [[User:The 888th Avatar]]
 * оригинальный код: https://avatar.fandom.com/wiki/MediaWiki:Common.js/icons.js
*/

$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-eraicons' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-eraicons' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 71px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '0.5em', 'bottom' : '-2em', 'top' : '0em' } ).show();
}
});
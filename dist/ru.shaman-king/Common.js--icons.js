/* Добавляет иконки на верх страницы
 * автор: [[User:The 888th Avatar]], адаптировал к новому хедеру: [[User:Thailog]]
 */
/* Оригинальный код: https://avatar.fandom.com/wiki/MediaWiki:Common.js/icons.js */
 
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 65px; bottom: 55px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});
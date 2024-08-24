/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

/* Adds icons to page header bottom border
 * by: [[User:The 888th Avatar]], adapted to new header by [[User:Thailog]]
 */
 
$(function() {
	if( $( '.wds-community-header' ).length ) {
		$( '#PageHeader' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 65px;' )
	);
	} else {
		$( '.WikiaPageHeader' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'right' : '5.1em', 'bottom' : '-2em' } ).show();
}
});


importArticles({
    type: "script",
    articles: [
        "w:c:comunidad:MediaWiki:Parallax.js"
    ]
});
 
jQuery(document).ready(function($) {
	$(".contbtn").mouseleave(function(){
		$(this).find('#imove').animate({ top: '100px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
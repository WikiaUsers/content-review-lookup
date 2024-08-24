/* Das folgende JavaScript wird für alle Benutzer geladen. */
mw.hook('wikipage.content').add(function($content) {
	var articles = [];
	if ($content.find('#damageCalc')[0]) articles.push('MediaWiki:DamageCalc.js');
	if ($content.find('#StatCalc')[0]) articles.push('MediaWiki:StatCalc.js');

	if (articles.length) importArticles({type: "script", articles: articles});
});

$( document ).ready( function( ) {
    $( '.tree li' ).each( function() {
        if( $( this ).children( 'ul' ).length > 0 ) {
            $( this ).addClass( 'parent' );     
        }
    });
 
    $( '.tree li.parent > a' ).click( function( ) {
        $( this ).parent().toggleClass( 'active' );
        $( this ).parent().children( 'ul' ).slideToggle( 'fast' );
    });
 
    $( '#all' ).click( function() {
 
        $( '.tree li' ).each( function() {
            $( this ).toggleClass( 'active' );
            $( this ).children( 'ul' ).slideToggle( 'fast' );
        });
    });
 
});
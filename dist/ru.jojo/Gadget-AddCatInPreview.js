// by Kopcap94 and ARC delta 08
// Выводит блоки с категориями и языками

!function( $, mw ) {
	if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) === -1 ) return;
	if ( $( '#wikiPreview' ).length === 0 ) return;

	$( '#wikiPreview' ).append(
		'<div class="iw-list" style="">' +
			'<span class="iw-query"></span>' +
		'</div>'
	);

	$.post( mw.config.get( 'wgScriptPath' ) + '/api.php', {
		action: 'query',
		titles: mw.config.get( 'wgPageName' ),
		prop: 'langlinks',
		llprop: 'autonym|url',
        cllimit: "max",
		format: 'json'
	}, function( d ) {
		var id = Object.keys( d.query.pages )[ 0 ],
			iw = [];

		$.each( d.query.pages[ id ].langlinks, function( i, v ) {
			iw.push( '<a href="' + v.url + '">' + v.autonym + '</a>' );
		});

		$( '.iw-query' ).append( ( iw.length === 0 ) ? 'Отсутствуют' : iw.join( ' ' ) );
	});

}( this.jQuery, this.mediaWiki );

// Добавляет блок с категориями в конец страницы предпросмотра. Поддерживает отображение новых добавленных категорий (в том числе и автокатегорий)
// Взято с Вукипедии
$('#wpPreview').click(function() {
	$('#catlinks').detach();
	
	txt= String( $('#wpTextbox1').val().match(/\[\[\s?[кК]атегория:.*?\s?\]\]/g) );

	$.post( mw.config.get( 'wgScriptPath' ) + '/api.php', {
	    action: "parse",
	    format: "json",
	    formatversion: "2",
	    prop: "categorieshtml",
	    text: txt,
	    pst: "true",
	    preview: "true",
	    sectionpreview: "true",
	    disableeditsection: "true",
	    useskin: "oasis",
	    uselang: "ru"
	}).done(function(data) {
		txt = data.parse.categorieshtml;
		$('#wikiPreview').after(txt);
	});
});
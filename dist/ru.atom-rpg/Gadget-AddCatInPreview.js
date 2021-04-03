// by Kopcap94, большая благодарность ему!
// Выводит блоки с категориями и языковыми ссылками
// Не отображает категории, добавленные в процессе редактирования, отобразит только после обновления страницы и после обновления кеша, если категория новая.
!function( $, mw ) {
	if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) === -1 ) return;
	if ( $( '#wikiPreview' ).length === 0 ) return;

	$( '#wikiPreview' ).append(
		'<div class="cats-list" style="">' +
			'<b>Категории:</b> ' +
			'<span class="cats-query" />' +
		'</div>' + 
		'<div class="iw-list" style="">' +
			'<b>Языковые ссылки:</b> ' +
			'<span class="iw-query" />' +
		'</div>'
	);

	$.post( mw.config.get( 'wgScriptPath' ) + '/api.php', {
		action: 'query',
		titles: mw.config.get( 'wgPageName' ),
		prop: 'categories|langlinks',
		llprop: 'autonym|url',
		format: 'json'
	}, function( d ) {
		var id = Object.keys( d.query.pages )[ 0 ],
			cats = [],
			iw = [];
		
		$.each( d.query.pages[ id ].categories, function( i, v ) {
			cats.push( '<a href="/ru/' + v.title + '">' + v.title.replace( /Категория:/, '' ) + '</a>' );
		});

		$.each( d.query.pages[ id ].langlinks, function( i, v ) {
			iw.push( '<a href="' + v.url + '">' + v.autonym + '</a>' );
		});

		$( '.cats-query' ).append( ( cats.length === 0 ) ? 'Отсутствуют' : cats.join( ' ' ) );
		$( '.iw-query' ).append( ( iw.length === 0 ) ? 'Отсутствуют' : iw.join( ' ' ) );
	});

}( this.jQuery, this.mediaWiki );

// Добавляет блок с категориями в конец страницы предпросмотра. Поддерживает отображение новых добавленных категорий (в том числе и автокатегорий)
// Взято с Вукипедии
$('#wpPreview').click(function() 
{
	$('#catlinks').detach();
	
	txt= String( $('#wpTextbox1').val().match(/\[\[\s?[кК]атегория:.*?\s?\]\]/g) );

	$.post("https://atom-rpg.fandom.com/ru/api.php", {
    action: "parse", format: "json", formatversion: "2", prop: "categorieshtml", text: txt, pst: "true", preview: "true", sectionpreview: "true", disableeditsection: "true", useskin: "oasis", uselang: "ru"}).done(function(data) 
	{
		txt = data.parse.categorieshtml;
		$('#wikiPreview').after(txt);
	});
});
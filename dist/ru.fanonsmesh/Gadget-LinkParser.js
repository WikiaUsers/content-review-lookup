// Преобразует %-последовательности в текст и сокращает некоторые простые ссылки
// http://ru.siegenax.wikia.com/wiki/Участник:Kopcap94/linkParser.js
// Автор второго парсера: [[Участник:Rendann]] 
 
!function( mw, $ ) {
    if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' )) === -1 ) return;
 
    $( '<button />', {
        id: 'linkParser',
        style: 'float: right; margin-bottom: 5px;',
        text: 'Парсер',
        type: 'button'
    })
    .insertAfter( '.wpSummary_canMinorEdit' )
    .on( 'click', function() {
        var text = $( '#wpTextbox1' ).val(),
            new_text = text;
 
        $.each( text.match( /(%[A-Za-z0-9]{2}){1,}/g ), function( i, v ) {
            try {
                new_text = new_text.replace( v, decodeURIComponent( v ) );
            } catch( e ) {
                console.log( 'There was error ( ' + e + ' ) during attempt to parse this: ' + v );
            }
        });
 
        var refs = /<ref(\sname=".+">|>)\[http(?:s)?:\/\/(\S+)\.wikia\.com\/wiki\/тема:(\d+)\s([^<\/]*)\]<\/ref>/gi;
        new_text = new_text.replace( refs, '<ref$1[[w:c:$2:Тема:$3|$4]]</ref>' );
 
        var contribs = /<ref(\sname=".+">|>)\[http(?:s)?:\/\/(\S+)\.wikia\.com\/wiki\/(?:служебная|special):contributions\/([^\s?]+)\s([^<\/]*)\]<\/ref>/gi;
        new_text = new_text.replace( contribs, '<ref$1[[w:c:$2:Special:Contributions/$3|$4]]</ref>' );
 
        $( '#wpTextbox1' ).val( new_text );
    });
}( mediaWiki, jQuery );
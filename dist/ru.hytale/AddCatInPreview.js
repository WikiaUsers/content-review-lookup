// by Kopcap94 and ARC delta 08
// edit by Dr.Bryan
// Выводит блоки с категориями и языками

// IW
!function( $, mw ) {
if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) === -1 ) return;
if ( $( '#wikiPreview' ).length === 0 ) return;

$( '#wikiPreview' ).after('<div class="iw-list"></div>');

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

        $( '.iw-list' ).append(iw);
});

// Cat
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

}( this.jQuery, this.mediaWiki );


// Не знаю, как эту чушь присобачить

// Перемещает ссылки, удаляя ненужный контент
(function($) {
$(".mw-normal-catlinks ul").replaceWith(
$(".mw-normal-catlinks").contents()
);
$(".mw-normal-catlinks").replaceWith(
$(".mw-normal-catlinks").contents()
);
$("#mw-hidden-catlinks ul").replaceWith(
    $("#mw-hidden-catlinks").contents()
);
})(jQuery);
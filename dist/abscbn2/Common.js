importScriptPage('Countdown/code.js', 'dev');
importScriptPage('YoutubePlayer/code.js', 'dev');
/* Spoiler Alert */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
  },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

/* Protection icons */
importScriptPage('EraIcons/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ProtectionIcons.js',
    ]
});

/* Adding EditIntros */
function addEditIntro( name ) {
	$( '.mw-editsection, #ca-edit, #ca-ve-edit' ).find( 'a' ).each( function ( i, el ) {
		el.href = $( this ).attr( 'href' ) + '&editintro=' + name;
	} );
}

if ( mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
	$( function () {
		var cats = mw.config.get( 'wgCategories' );
		if ( !cats ) {
			return;
		}
		if ( $.inArray( 'Acquired programming', cats ) !== -1 ) {
			addEditIntro( 'Template:International_program_editintro' );
		}
	} );
}
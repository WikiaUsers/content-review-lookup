// Кнопки для описания правки
// translate to Polish:
// Ivan-r http://minecraft-ru.gamepedia.com/User:Ivan-r
// piotrex43 http://minecraft-pl.gamepedia.com/User:Piotrex43
// NTBG http://minecraft-pl.gamepedia.com/User:NTBG

function insertSummary ( txt ) {
	if ( typeof txt !== 'string' ) {
		txt = this.title;
	}
	var vv = $( 'input[name="wpSummary"]' ).val();
	if ( vv.indexOf( txt ) !== -1 ) {
		return;
	}
	if ( /[^,; \/]$/.test( vv ) ) {
		vv += ',';
	}
	if ( /[^ ]$/.test( vv ) ) {
		vv += ' ';
	}
	$( 'input[name="wpSummary"]' ).val( vv + txt );
}
 
function addSumButton ( btn, txt ) {
	$( '<a title="' + txt + '">' + btn + '</a>' )
		.appendTo( '#userSummaryButtonsA' )
		.click( insertSummary );
}
 
$( function() {
	var frm = document.getElementById( 'editform' );
	if ( !mw.config.get( 'wgArticleId' ) || !frm || $( frm.wpSection ).val() === 'new' ) {
		return;
	}
	mw.util.addCSS( '\
		#wpSummary { margin-bottom: 0 }\
		#userSummaryButtonsA a { background:#cef; border:1px solid #adf; padding:0 2px;\
			margin:0 2px;cursor:pointer; font-size:86%; color:#666 }\
		#userSummaryButtonsA a:hover { background:#bdf; color:black; text-decoration:none }' );
	$( '<div id=userSummaryButtonsA />' ).insertAfter( '#wpSummary' );
	$.each(
		[
		'popr|awka', 'ort|ografia', 'lit|erówka', 'int|erpunkcja', 'akt|ualizacja', 'styl|istyczne poprawki', 'design',
	    'uzup|ełnienie informacji', 'dr|obne', 'odp|owiedź', 'kom|entarz', 'kat|egorie', 'szablon|izacja', 'do usunięcia',
		'plik', 'interwiki', 'wandalizm', 'wikizacja'
		],
		function ( i, s ) {
			addSumButton( s.replace( /\|.*/, '' ), s.replace( /\|/, '' ) );
		}
	);
} );
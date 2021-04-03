// Buttons for editing summaries
if (typeof pointSummaryButtonsA == 'undefined') {
	window.pointSummaryButtonsA = ',';
}
function insertSummary ( txt ) {
	if ( typeof txt !== 'string' ) {
		txt = this.title;
	}
	var vv = $( 'input[name="wpSummary"]' ).val();
	if ( vv.indexOf( txt ) !== -1 ) {
		return;
	}
	if ( /[^,; \(\/]$/.test( vv ) && !/talk\.?\]\]\)$/.test(vv) && !/discussion\]\]\)$/.test(vv) ) {
		vv += pointSummaryButtonsA;
	}
	if ( /[^ \(]$/.test( vv ) ) {
		vv += ' ';
	}
	$( 'input[name="wpSummary"]' ).val( vv + txt );
}
 
function SumButton ( btn, txt ) {
	$( '<a title="' + txt + '">' + btn + '</a>' )
		.appendTo( '#userSummaryButtonsA' )
		.click( insertSummary );
}
 
function sumButtons() {
	var frm = document.getElementById( 'editform' );
	if ( !mw.config.get( 'wgArticleId' ) || !frm || $( frm.wpSection ).val() === 'new' ) {
		return;
	}
	mw.util.addCSS( '\
		#wpSummary { margin-bottom: 0 }\
		#userSummaryButtonsA a { background:#cef; border:1px solid #adf; padding:0 2px;\
			margin:0 2px;cursor:pointer; font-size:86%; color:#666 }\
		#userSummaryButtonsA a:hover { background:#bdf; color:black; text-decoration:none }' );
	$( '<div id="userSummaryButtonsA">' ).insertAfter( '#wpSummary' );
	$.each(
		[
		'Wikification', 'Style guide', 'Punctuation', 'Organizing', 'Updating',
		'Correcting issue', 'Adding category', 'Adding template', 'Documentation', 'Candidate for deletion',
 		'Illustration', 'Addition', 'New page', 'Official name changed', 'Unifying categories',
 		'Adding references', 'Adding interwiki', 'Adding interlang', 'Vandalism removal'
		],
		function ( i, s ) {
			SumButton( s.replace( /\|.*/, '' ), s.replace( /\|/, '' ) );
		}
	);
}

$.when(
	mw.loader.using( 'ext.wikiEditor' ),
	$.ready
).then( sumButtons );
// Buttons for editing summaries
if (typeof pointSummaryButtonsA == 'undefined') {
	window.pointSummaryButtonsA = ',';
}
function insertSummary ( txt ) {
	if ( typeof txt !== 'string' ) {
		txt = this.title;
	}
	var vv = $( 'input[name="wpSummary"]' ).val();
	if ( vv.indexOf( txt ) !== -1 ) {
		return;
	}
	if ( /[^,; \(\/]$/.test( vv ) && !/talk\.?\]\]\)$/.test(vv) && !/discussion\]\]\)$/.test(vv) ) {
		vv += pointSummaryButtonsA;
	}
	if ( /[^ \(]$/.test( vv ) ) {
		vv += ' ';
	}
	$( 'input[name="wpSummary"]' ).val( vv + txt );
}
 
function SumButton ( btn, txt ) {
	$( '<a title="' + txt + '">' + btn + '</a>' )
		.appendTo( '#userSummaryButtonsA' )
		.click( insertSummary );
}

$.when(
	mw.loader.using( 'ext.wikiEditor' ),
	$.ready
).then( sumButtons );
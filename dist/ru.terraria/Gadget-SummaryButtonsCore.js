// Кнопки для описания правки
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
	if ( /[^,; \(\/]$/.test( vv ) && !/обс\.?\]\]\)$/.test(vv) && !/обсуждение\]\]\)$/.test(vv) ) {
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
		'викиф|икация', 'оформл|ение', 'стил|евые правки', 'орфогр|афия', 'пункт|уация', 'ответ',
		'комм|ентарий', 'вопрос', 'кат|егория', 'шабл|онизация', 'док|ументация', 'к удал|ению',
 		'илл|юстрирование', 'доп|олнение', 'уточ|нение', 'обнов|ление данных', 'интер|вики', 'вандализм'
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
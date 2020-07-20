importScript('MediaWiki:Common.js/Wikificator.js');

importScriptPage('Standard_Edit_Summary/code.js', 'dev');

/**
 * jQuery version of fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {
 
	if( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	var	summaryOptionsHtml = '',
		$summaryOptionsList;
 
	$.get( wgScript, { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' }, function( data ) {
		var lines = data.split( '\n' );
		for( var i = 0; i < lines.length; i++ ) {
			var value = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : "";
			summaryOptionsHtml += '<option value="' + value + '">' + lines[i] + '</option>';
		}
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).html( summaryOptionsHtml ).change( function() {
			var value = $( this ).val();
			if ( value !== '' ) {
				if( skin === 'oasis' ) {
					$( '#wpSummary' ).text( value );
				} else {
					$( '#wpSummary' ).val( value );
				}
			}
		} );
 
		$( '#wpSummaryLabel' ).prepend( 'Standard summaries: ', $summaryOptionsList, '<br />' );
	} );
 
}
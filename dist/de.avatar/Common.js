/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Automatically fills the summary field in upload form with imagebox
 * by: [[User:KettleMeetPot]] (taken from  [[w:c:Avatar|Avatar Wiki]]).
 */

$(function() {
    if ( mw.config.get('wgCanonicalSpecialPageName') == "Upload" || mw.config.get('wgCanonicalSpecialPageName') == "MultipleUpload") {
	    var value = "{"+"{Dateiinfo\n"
		+ "| Beschreibung = \n"
		+ "| Quelle       = \n"
		+ "| Künstler     = \n"
		+ "| Kategorien   = \n"
		+ "}"+"}";
		$('#wpUploadDescription').val(value);
    }
});

/* Standard edit summaries
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny - taken from Wookieepedia */
function fillEditSummaries() {
	if ( !$( '#wpSummaryLabel' ).length ) {
		return;
	}
	$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
		var	$summaryOptionsList,
			$summaryLabel = $( '#wpSummaryLabel' ),
			lines = data.split( '\n' ),
			$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );
		$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
			var editSummary = $( this ).val();
			if ( editSummary !== '' ) {
				$( '#wpSummary' ).val( editSummary );
			}
		} );
		for ( var i = 0; i < lines.length; i++ ) {
			var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
			$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
		}
		$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
	} );
}
$(fillEditSummaries);
 
/* Use EraIcon's default CSS */
window.useIncludedStylesheet = true;

//Wird für die Vorlage:USERNAME benötigt
if (mw.config.get('wgUserName') != 'null') {
	$('.insertusername').text(mw.config.get('wgUserName'));
}

/* Auto-refreshing recent changes */
ajaxPages = ["Spezial:WikiActivity","Spezial:Letzte_Änderungen","Spezial:Beobachtungsliste","Spezial:Logbuch","Spezial:Beiträge"];
AjaxRCRefreshText = 'Aktualisierung';
AjaxRCRefreshHoverText = 'Aktualisiert die Seite automatisch';
/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		Preda: 'Indomitable',
                Inactive: 'Inactive' 
	}
};
//Custom
UserTagsJS.modules.custom = {
	'Project Predacon': ['Preda'],
        'Baconskittles': ['Inactive'],
        'Saizou1708': ['Inactive'],
        'Telepathesis': ['Inactive']
};
/**
 * fillEditSummaries for VisualEditor, borrowed from https://starwars.fandom.com/wiki/MediaWiki:Common.js
 * "based on Grunny's jQuery version of Sikon's original version"
 * "@author 01miki10"
 */

function fillEditSummariesVisualEditor() {
	mw.hook( 've.activationComplete' ).add(function () {

		$.get( mw.config.get( 'wgScript' ), { title: 'Template:Stdsummaries', action: 'raw', ctype: 'text/plain' } ).done( function( data ) {
			var	$summaryOptionsList,
				$summaryLabel = $( '.ve-ui-summaryPanel' ),
				$summaryInput = $( '.ve-ui-summaryPanel-summaryInputField > input' ),
				lines = data.split( '\n' ),
				$wrapper = $( '<div>').addClass( 'edit-widemode-hide' ).text( 'Standard summaries: ' );

			$summaryOptionsList = $( '<select />' ).attr( 'id', 'stdEditSummaries' ).change( function() {
				var editSummary = $( this ).val();
				if ( editSummary !== '' ) {
					$summaryInput.val( editSummary );
				}
			} );

			for ( var i = 0; i < lines.length; i++ ) {
				var editSummaryText = ( lines[i].indexOf( '-- ' ) === 0 ) ? lines[i].substring(3) : '';
				$summaryOptionsList.append( $( '<option>' ).val( editSummaryText ).text( lines[i] ) );
			}

			$summaryLabel.prepend( $wrapper.append( $summaryOptionsList ) );
		} );
	} );
}

$( fillEditSummariesVisualEditor );
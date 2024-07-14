/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GLOBAL GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[WT:Gadget]] before editing. |
 * |_____________________________________________________________________________|
 *
 * Imported as of 09/06/2011 from [[User:ErrantX/defaultsummaries.js]]
 * Edited version from [[User:MC10/defaultsummaries.js]]
 * Implements default edit summary dropdown boxes
 */

/* global mediaWiki, ve */

( function ( $, mw ) { // Wrap with anonymous function
	var $summaryBox = $( '#wpSummary' ),
		minorSummaries = [
			'Spelling/grammar correction',
			'Fixing style/layout errors',
			'[[Help:Reverting|Reverting]] [[Wikipedia:Vandalism|vandalism]] or test edit',
			'[[Help:Reverting|Reverting]] unexplained content removal',
			'Copyedit (minor)'
		],
		articleSummaries = [
			'Expanding article',
			'Adding/improving reference(s)',
			'Adding/removing category/ies',
			'Adding/removing external link(s)',
			'Adding/removing wikilink(s)',
			'Removing unsourced content',
			'Removing [[WP:SPAM|linkspam]] per [[WP:EL]]',
			'Clean up',
			'Copyedit (major)'
		],
		nonArticleSummaries = [
			'Reply',
			'Comment',
			'Suggestion'
		],
		talkPageSummaries = [
			'[[Wikipedia:WikiProject|WikiProject]] tagging',
			'[[Wikipedia:WikiProject|WikiProject]] assessment'
		];

	function addOptionsToDropdown( dropdown, optionTexts ) {
		dropdown.menu.addItems( optionTexts.map( function ( optionText ) {
			return new OO.ui.MenuOptionWidget( { label: optionText } );
		} ) );
	}

	function onSummarySelect( option ) {
		// Save the original value of the edit summary field
		var editsummOriginalSummary = $summaryBox.val(),
			canned = option.getLabel(),
			newSummary = editsummOriginalSummary;

		// Append old edit summary with space, if exists,
		// and last character != space
		if ( newSummary.length !== 0 && newSummary.charAt( newSummary.length - 1 ) !== ' ' ) {
			newSummary += ' ';
		}
		newSummary += canned;
		$summaryBox.val( newSummary ).trigger( 'change' );
	}

	function insertSummaryOptions( $insertBeforeThis, dropdownWidth ) {
		// For convenience, add a dropdown box with some canned edit
		// summaries to the form.
		var namespace = mw.config.get( 'wgNamespaceNumber' ),
			dropdown = new OO.ui.DropdownWidget( {
				label: 'Common edit summaries – click to use'
			} ),
			minorDropdown = new OO.ui.DropdownWidget( {
				label: 'Common minor edit summaries – click to use'
			} );

		dropdown.$element.css( 'width', dropdownWidth );
		dropdown.menu.on( 'select', onSummarySelect );

		minorDropdown.$element.css( 'width', dropdownWidth );
		minorDropdown.menu.on( 'select', onSummarySelect );

		addOptionsToDropdown( minorDropdown, minorSummaries );

		if ( namespace === 0 ) {
			addOptionsToDropdown( dropdown, articleSummaries );
		} else {
			addOptionsToDropdown( dropdown, nonArticleSummaries );
			if ( namespace % 2 !== 0 && namespace !== 3 ) {
				addOptionsToDropdown( dropdown, talkPageSummaries );
			}
		}

		$insertBeforeThis.before( dropdown.$element );
		$insertBeforeThis.before( minorDropdown.$element );
	}
	// VisualEditor
	mw.hook( 've.saveDialog.stateChanged' ).add( function () {
		var target, $saveOptions;
		// .ve-init-mw-viewPageTarget-saveDialog-checkboxes
		if ( $( 'body' ).data( 'wppresent' ) ) { return; }
		$( 'body' ).data( 'wppresent', 'true' );

		target = ve.init.target;
		$saveOptions = target.saveDialog.$saveOptions;
		$summaryBox = target.saveDialog.editSummaryInput.$input;
		if ( !$saveOptions.length ) {
			return;
		}
		insertSummaryOptions( $saveOptions );
	} );
	// WikiEditor
	$.when( mw.loader.using( 'oojs-ui-core' ), $.ready ).then( function () {
		var $editCheckboxes = $( '.editCheckboxes' );

		// If we failed to find the editCheckboxes class
		if ( !$editCheckboxes.length ) {
			return;
		}
		insertSummaryOptions( $editCheckboxes, '48%' );
	} );
}( jQuery, mediaWiki ) ); // End wrap with anonymous function
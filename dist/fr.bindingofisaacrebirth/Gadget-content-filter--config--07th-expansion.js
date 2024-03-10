/**
 * 07th Expansion wiki configuration of the content filter.
 */
window.contentFilterConfig = {

	/**
	 * The title displayed on top of the buttons.
	 */
	title: 'Spoilers',

	/**
	 * The number of filtering layers (bits) used on pages.
	 */
	filterCount: 1,

	/**
	 * The list of available filters, each one being its numeric filter, its
	 * displayed title (it can be a simple string or an URL to an image) and
	 * a description of the corresponding filter.
	 * Use false instead of an object to deactivate a filter and keep URL
	 * compatibility.
	 * Use false as filter description to not show any description.
	 */
	filters: [
		{
			filter: 0,
			title: 'Hide',
			description: 'Hide spoilers'
		},
		{
			filter: 1,
			title: 'Show',
			description: 'Show spoilers'
		}
	],

	/**
	 * The namespaces where the filtering should be available.
	 */
	filteredNamespaces: [ 0 ],

	/**
	 * The pages where the filtering should be available, if they are not from a
	 * namespace where the filtering is available.
	 */
	filteredSpecialTitles: [
		'Special:Random'
	],

	/**
	 * If an element on a page has this class (directly on the page or
	 * transcluded), the filtering becomes available, even if the page is not
	 * from a namespace in filteredNamespaces or in filteredSpecialTitles.
	 * Use false to disable this functionality.
	 */
	filterEnableClass: false,

	/**
	 * The language codes used on the wiki.
	 */
	languageCodes: [],

	/**
	 * Some translatable messages are used with the content filter. These can be
	 * customized by creating/editing their corresponding page:
	 * 
	 *     <messagesLocation><messageName>
	 * 
	 * (<messagesLocation> being the value of this parameter and <messageName>
	 *  the name of the message)
	 * 
	 * If language codes have been specified, the messages can be translated by
	 * creating/editing the corresponding page:
	 * 
	 *     <messagesLocation><messageName>/<languageCode>
	 * 
	 * (<languageCode> being the corresponcing language code: one of the values
	 *  in the previously defined languageCodes array)
	 */
	messagesLocation: 'mediawiki:content-filter/',

	/**
	 * The name of the URL parameter used to store the selected filter.
	 */
	urlParam: 'contentfilter',

	/**
	 * If an element with this ID is on a page (directly on the page or
	 * transcluded), it will be filled with the "info" message (see the
	 * messagesLocation parameter) followed by the filter buttons. These will
	 * then not appear on the page header.
	 * Use false to disable this functionality.
	 */
	filtersInfoId: false,

	/**
	 * To indicate with which filters some content should be visible or hidden,
	 * the corresponding elements have to use a specific filtering class:
	 * 
	 *     <filterClassIntro><mask>
	 * 
	 * (<filterClassIntro> being the value of this parameter and <mask>
	 *  the bitmask of the filters the associated content should be available
	 *  with)
	 * 
	 * Each element also has to use a filtering type class (either
	 * blockFilterClass, wrapperFilterClass, or inlineFilterClass).
	 * 
	 * For instance, if the available filters were previously defined as:
	 * 
	 *     filters: [
	 *         'filter1',  // 01
	 *         'filter2'   // 10
	 *     ],
	 * 
	 * using "0" (00) as <mask> will hide the content while any of the filters
	 * are enabled, using "1" (01) as <mask> will hide the content while the
	 * second filter is enabled, using "2" (10) as <mask> will hide the content
	 * while the first filter is enabled, using "3" (11) as <mask> will have no
	 * effect (the content will be shown with any filter enabled). If the value
	 * of this parameter is 'filter-', then the following tags are valid uses:
	 * 
	 *     <span class="filter-2 …"> … </span>
	 *     <img class="filter-1 …" />
	 * 
	 */
	filterClassIntro: '',

	/**
	 * The list of filter types. Each filter type can be used on an element by
	 * adding its corresponding class to it, and is handled depending on its
	 * mode:
	 *  - an element with a "block" type is removed entirely if the selected
	 *    filter does not match the one of the element, and left in place
	 *    otherwise.
	 *  - an element with a "wrapper" type is unwrapped if the selected filter
	 *    does not match the one of the element (the element itself is removed,
	 *    its content is left in place), and left in place otherwise.
	 *  - an element with an "inline" type is removed if any filter is enabled.
	 *    Their associated content is then removed if the selected filter does
	 *    not match the one of the element, and left in place otherwise.
	 * The default removal rules for an element can be overriden with a custom
	 * handling function.
	 * It is also possible to "fix" a numeric filter to a type. For example, if
	 * the value filterClassIntro is 'filter-' and the following type is
	 * defined:
	 * 
	 *     {
	 *         class: 'simple-filter',
	 *         fixed: 2,
	 *         …
	 *     }
	 * 
	 * the use of the "filter-2" class would be optional, the two following
	 * cases would give the same result:
	 * 
	 *     <img class="simple-filter filter-2" />
	 *     <img class="simple-filter" />
	 * 
	 * Use false as fixed filter to use a numeric filter class instead of a
	 * fixed numeric filter.
	 */
	filterTypes: [
		{
			class: 'spoiler',
			fixed: 1,
			mode: 'wrapper',
			customHandler: function ( element, skip ) {
				return handleText.call( this, element, skip );
			}
		}
	],

	/**
	 * If an element with a filter bitmask class is inside an element with this
	 * class, the corresponding bitmask is applied to the surrounding section.
	 * If the element is not in a section, then the bitmask is applied to the
	 * entire page: the filter buttons not matching the bitmask are disabled.
	 * Use false to disable this functionality.
	 */
	contextFilterClass: false,

	/**
	 * This class can be used on elements to make them invisible to filtering:
	 * the script will go through them when trying to remove elements. For
	 * instance, the button used to collapse tables (.mw-collapsible-toggle) is
	 * skipped by default.
	 * Use false to disable this functionality.
	 */
	skipClass: false,

	/**
	 * If a page has navigation bars or elements considered out of the page
	 * content at the bottom of the page, using this class on at least the first
	 * one will prevent these elements from being removed with a previous
	 * section (see contextFilterClass).
	 * Use false to disable this functionality.
	 */
	contentEndClass: false,

	/**
	 * By default, a row is removed from a table if its first cell is removed.
	 * If the title cell of a table is not the first one, then a class with the
	 * following format can be used to indicate which cell should be considered
	 * the main one:
	 * 
	 *     <mainColumnClassIntro><index>
	 * 
	 * (<mainColumnClassIntro> being the value of this parameter and <index>
	 *  the index of the main cell, the first one being 1)
	 * 
	 * For instance, if the value of this parameter is 'main-column-', then the
	 * following classes can be used to respectively make the second and third
	 * columns the main ones:
	 * 
	 *     {| class="main-column-2"
	 *      ! Column 1
	 *      ! Main column 2
	 *      ! Column 3
	 *      …
	 *      |}
	 *     {| class="main-column-3"
	 *      ! Column 1
	 *      ! Column 2
	 *      ! Main column 3
	 *      …
	 *      |}
	 * 
	 * Use false to disable this functionality.
	 */
	mainColumnClassIntro: false,

	/**
	 * If a table has this class, its cells can be removed (instead of being
	 * only cleared), the following cells on the column will then be shifted.
	 * Use false to disable this functionality.
	 */
	listTableClass: false,

	/**
	 * This class works the same way as skipClass, except that it will try to
	 * put back the element on the page somewhere else if it has to be removed.
	 * Use false to disable this functionality.
	 */
	inContentAddClass: false,

	/**
	 * Does things before removing elements with a filter from a container.
	 * @param container The container to remove elements from.
	 */
	preprocess: false,

	/**
	 * Does things after removing elements with a filter from a container.
	 * @param container The container to remove elements from.
	 */
	postprocess: function ( container ) {
		postprocessNavBoxes.call( this, container );
	}
};

var punctuationCharacters = [ ',', '.', ';' ],
	specialCharacters     = [ '-', '•', '(', ')' ];

/**
 * 
 * @this {contentFilter}
 * @param {Element} element The element to remove.
 * @param {(element:Element)=>boolean} skip A function to use as return value to
 *                                          tell the script to leave the element
 *                                          in place.
 * @returns True if the removal has been handled by this function, false if
 *          it should be handled the default way.
 */
function handleText( element, skip ) {
	var previousTextState = getPreviousTextState.call( this, element ),
		nextTextState     = getNextTextState.call( this, element ),
		breakLoop         = false;

	while ( true ) {
		switch ( nextTextState ) {
		case '(':
			this.removeNextNodeUntilText( element, ')', true );
			break;
	
		default:
			breakLoop = true;
		}
		if ( breakLoop ) {
			break;
		}
		nextTextState = getNextTextState.call( this, element );
	}

	switch ( nextTextState ) {
	case '':
		switch ( previousTextState ) {
		case '':
		case '__DEFAULT__':
			this.removePreviousNodeUntilText( element, '.' );
			return false;

		case '-':
			if ( this.findParentWithClass( element, 'navbox-list' ) ) {
				while ( element.previousSibling ) {
					element.previousSibling.remove();
				}
				return false;
			}
			this.removePreviousNodeUntilText( element, '•', true );
			return false;

		case '•':
			this.removePreviousNodeUntilText( element, '•', true );
			return false;

		default:
			return false;
		}

	case '__DEFAULT__':
		return skip( element );

	case '-':
	case '•':
		this.removeNextNodeUntilText( element, nextTextState, true );
		return false;

	case ')':
		switch ( previousTextState ) {
		case '__DEFAULT__':
			var char = this.getPreviousText( element );
			char = char.charAt( char.length - 1 );
			if ( punctuationCharacters.includes( char ) ) {
				this.removePreviousNodeUntilText( element, char, true );
				return false;
			}
			return skip( element );

		case '(':
			this.removePreviousNodeUntilText( element, '(', true );
			this.removeNextNodeUntilText( element, ')', true );
			return false;

		default:
			return false;
		}

	default:
		return false;
	}
}

/**
 * 
 * @this {contentFilter}
 * @param {Element} element 
 */
function getPreviousTextState( element ) {
	var text = this.getPreviousText( element );
	if ( !text ) {
		return '';
	}
	var char = text.charAt( text.length - 1 );
	if ( specialCharacters.includes( char ) ) {
		return char;
	}
	return '__DEFAULT__';
}

/**
 * 
 * @this {contentFilter}
 * @param {Element} element 
 */
function getNextTextState( element ) {
	var text = this.getNextText( element );
	if ( !text ) {
		return '';
	}
	var char = text.charAt( 0 );
	if ( specialCharacters.includes( char ) ) {
		return char;
	}
	return '__DEFAULT__';
}

/**
 * 
 * @this {contentFilter}
 * @param {Element} container 
 */
function postprocessNavBoxes( container ) {
	var navBoxes = document.getElementsByClassName( 'navbox-list' );
	for ( var i = navBoxes.length - 1; i >= 0; --i ) {
		var navBox = navBoxes[ i ];
		if ( !navBox.textContent.trim() ) {
			navBox.parentElement.remove();
		}
	}
}
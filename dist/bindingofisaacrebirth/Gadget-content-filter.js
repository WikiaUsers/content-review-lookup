/**
 * Name:        Content Filter script
 * Description: Removes information from pages according to a filter, which can
 *              be enabled/disabled from the toolbar. See the gitlab page for
 *              more information.
 */

// <nowiki>

( function ( $, mw, console, array ) {

/** @this {(...msg: string[] ) => void} */
function logger() {
	const args = array.slice.call( arguments );
	args.unshift( 'Content Filter:' );
	this.apply( null, args );
}
const log   = logger.bind( console.log );
const warn  = logger.bind( mw.log.warn );
const error = logger.bind( mw.log.error );

log( 'Loading.' );

/**
 * MediaWiki configuration values.
 * @typedef MWConfig
 * 
 * @property {string} skin
 * The wiki skin.
 * 
 * @property {string} wgAction
 * The action being realised on the page (view, edit, history, etc.).
 * 
 * @property {string} wgArticlePath
 * The URL path to any article, by replacing $1 with the target page name.
 * 
 * @property {string} wgPageName
 * The current page name.
 */

/**
 * MediaWiki configuration values.
 * @type {MWConfig}
 */
const config = mw.config.get( [ 'skin', 'wgAction', 'wgArticlePath', 'wgPageName' ] );

if ( config.skin !== 'fandomdesktop' ) {
	error(
		'This script only works with the FandomDesktop skin. ' +
		'To prevent compatibility issues with other skins, it will be disabled.'
	);
	return;
}

if ( ![ 'view', 'edit' ].includes( config.wgAction ) ) {
	return;
}

/**
 * The number of filtering layers (bits) used on pages.
 * @type {number}
 */
const filterCount = 4; // max filter = 15 (1111)

/**
 * An available filter.
 * @typedef Filter
 * 
 * @property {number} filter
 * The corresponding numeric filter.
 * 
 * @property {string} title
 * The title of the filter. It can be a simple string or an URL to an image.
 * 
 * @property {string} [description]
 * A description of the filter.
 * Use false to not show any.
 */

/**
 * The list of available filters.
 * Use false instead of an object to deactivate a filter and keep URL
 * compatibility.
 * @type {( Filter | false )[]}
 */
const filters = [
	{
		filter: 1, // 0001
		title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/2/25/Dlc_na_indicator.png/revision/latest',
		description: 'Hide content unavailable with Rebirth'
	},
	{
		filter: 2, // 0010
		title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/9/95/Dlc_a_indicator.png/revision/latest',
		description: 'Hide content unavailable with Afterbirth'
	},
	{
		filter: 4, // 0100
		title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/4/4c/Dlc_a†_indicator.png/revision/latest',
		description: 'Hide content unavailable with Afterbirth+'
	},
	{
		filter: 8, // 1000
		title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/f/f2/Dlc_r_indicator.png/revision/latest',
		description: 'Hide content unavailable with Repentance'
	}
];

/**
 * The class used on the page content.
 * @type {string}
 */
const bodyContentClass = 'mw-body-content';

/**
 * If an element on a page has this class (directly on the page or
 * transcluded), the filtering becomes available, even if the page is not
 * from a namespace in filteredNamespaces or in filteredSpecialTitles.
 * Use false to disable this functionality.
 * @type {string}
 */
const filterEnableClass = 'cf-enable';

/**
 * The name of the URL parameter used to store the selected filter.
 * @type {string}
 */
const urlParam = 'dlcfilter';
// const urlParam = 'cfval';

/**
 * If an element with this ID is on a page (directly on the page or
 * transcluded), the filter buttons will be inserted in it. These will
 * then not appear on the page header.
 * Use false to disable this functionality.
 * @type {string|false}
 */
const filtersInfoId = 'cf-info';

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
 *         { filter: 1, ... }, // 01
 *         { filter: 2, ... }, // 10
 *     ],
 * 
 * using "0" (00) as <mask> will hide the content while any of the filters
 * are enabled, using "1" (01) as <mask> will hide the content while the
 * second filter is enabled, using "2" (10) as <mask> will hide the content
 * while the first filter is enabled, using "3" (11) as <mask> will have no
 * effect (the content will be shown with any filter enabled). If the value
 * of this parameter is 'cf-value-', then the following tags are valid uses:
 * 
 *     <span class="cf-val-2 ..."> ... </span>
 *     <img class="cf-val-1 ..." />
 * 
 * @type {string}
 */
const filterClassIntro = 'dlc-';

/**
 * A filter type.
 * @typedef FilterType
 * 
 * @property {string} class
 * The class name used to reference this filter type.
 * 
 * @property {number | false} fixed
 * Use this value to "fix" a numeric filter to the filter type. For
 * example, if the value filterClassIntro is 'filter-' and the following
 * type is defined:
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
 * Use false to use a numeric filter class instead of a fixed numeric
 * filter.
 * 
 * @property {'block' | 'wrapper' | 'inline'} mode
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
 */

/**
 * The list of filter types.
 * @type {FilterType[]}
 */
const filterTypes = [
	{ class: 'dlc', fixed: false, mode: 'inline' }
];

/**
 * If an element with a filter bitmask class is inside an element with this
 * class, the corresponding bitmask is applied to the surrounding section.
 * @type {string | false}
 */
const contextFilterClass = 'context-box';
// const contextFilterClass = 'cf-scope-section';

/**
 * If an element with a filter bitmask class is inside an element with the
 * `contextFilterClass` class and this id, the corresponding bitmask is applied
 * to the entire page: the filter buttons not matching the bitmask are disabled.
 * Use false to disable this functionality.
 * @type {string | false}
 */
const pageContextFilterId = 'context-page';
// const pageContextFilterId = 'cf-scope-page';

/**
 * This class can be used on elements to make them invisible to filtering:
 * the script will go through them when trying to remove elements. For
 * instance, the button used to collapse tables (.mw-collapsible-toggle) is
 * skipped by default.
 * Use false to disable this functionality.
 * @type {string | false}
 */
const skipClass = 'content-filter-skip';
// const skipClass = 'cf-skip';

/**
 * If a page has navigation bars or elements considered out of the page
 * content at the bottom of the page, using this class on at least the first
 * one will prevent these elements from being removed with a previous
 * section (see contextFilterClass).
 * Use false to disable this functionality.
 * @type {string | false}
 */
const contentEndClass = 'content-filter-end';
// const contentEndClass = 'cf-end';

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
 *      ...
 *      |}
 *     {| class="main-column-3"
 *      ! Column 1
 *      ! Column 2
 *      ! Main column 3
 *      ...
 *      |}
 * 
 * Use false to disable this functionality.
 * @type {string | false}
 */
const mainColumnClassIntro = 'content-filter-main-column-';
// const mainColumnClassIntro = 'cf-table-col-';

/**
 * If a table has this class, its cells can be removed (instead of being
 * only cleared), the following cells on the column will then be shifted.
 * Use false to disable this functionality.
 * @type {string | false}
 */
const listTableClass = 'content-filter-list';
// const listTableClass = 'cf-list';

/**
 * This class works the same way as skipClass, except that the element will
 * be put back on the page somewhere else if it has to be removed.
 * Use false to disable this functionality.
 * @type {string | false}
 */
const inContentAdClass = 'gpt-ad';

/**
 * The maximum number of consecutive times the script should allow an
 * element removal handler to not remove the corresponding element, or
 * add other ones. This value is used to prevent infinite loops with custom
 * handlers.
 * @type {number}
 */
const applyFilterLimit = 10;

/**
 * The page content.
 * @type {HTMLElement}
 */
var bodyContent = null;

/**
 * The table of contents from the parser output.
 * @type {HTMLElement}
 */
var toc = null;

/**
 * The current page title.
 */
const currentTitle = new mw.Title( config.wgPageName );

/**
 * The current URI.
 * Used to set links to the current page with a filter on or off.
 */
const currentUri = new mw.Uri( document.location.href );

/**
 * The default URI used with invalid URIs.
 */
const defaultUri = new mw.Uri();

/**
 * The page global filter.
 * @type {number}
 */
var pageFilter = 0;

/**
 * The index of the currently selected filter form item.
 * @type {number | false}
 */
var selectedIndex = false;

/**
 * The currently selected filter.
 * @type {number}
 */
var selectedFilter = 0;

/**
 * Whether the filters can be used on the current page.
 * @type {boolean}
 */
var filteringAvailable = false;

/**
 * Called when some text should be processed by the content filter.
 * @param {JQuery} $content The content element to process.
 */
function onContentLoaded( $content ) {
	const content = $content[ 0 ];

	if ( isMainContent( content ) ) {
		contentInit( content );
	}

	applyFilter( content );
}

/**
 * TODO
 * @param {HTMLElement} content
 * @returns {boolean}
 */
function isMainContent( content ) {
	return content.classList.contains( bodyContentClass );
}

/**
 * Configures the content filter with a page content.
 * @param {HTMLElement} content The page content.
 */
function contentInit( content ) {
	if ( !filteringAvailable && !isFilteringForced( document ) ) {
		return;
	}

	log( 'Initializing state.' );

	bodyContent = content;
	toc         = document.getElementById( 'toc' );
	pageFilter  = getPageFilter();

	insertMenu();

	updateSelectedIndex();
	if ( selectedIndex === false ) {
		return;
	}

	updateSelectedFilterItem();
}

/**
 * Indicates whether the filters can be used on a page.
 * @param {mw.Title} pageTitle The page title.
 * @returns {boolean} True if the filters can be used, false otherwise.
 */
function isFilteringAvailable( pageTitle ) {
	const namespace = pageTitle.getNamespaceId();
	if ( [ 0, 2 ].includes( namespace ) ) {
		return true;
	}

	const pageName = pageTitle.getPrefixedText();
	if ( pageName === 'Special:Random' ) {
		return true;
	}

	return false;
}

/**
 * Indicates whether the filters should be used on a page because of the use of
 * in-content specific markers.
 * @param {Document} content The page content.
 * @returns {boolean} True if the filters should be used, false otherwise.
 */
function isFilteringForced( content ) {
	if (
		content && filterEnableClass &&
		content.getElementsByClassName( filterEnableClass ).length
	) {
		return true;
	}

	return false;
}

/**
 * Checks if the entire page is limited to some versions then sets the page
 * global filter accordingly.
 * @returns {number}
 */
function getPageFilter() {
	if ( !pageContextFilterId || !bodyContent ) {
		return getFilterMax();
	}

	const pageContextBox = document.getElementById( pageContextFilterId );
	if ( !pageContextBox ) {
		return getFilterMax();
	}

	for ( var j = 0; j < filterTypes.length; ++j ) {
		const filterType = filterTypes[ j ];
		const children   = pageContextBox.getElementsByClassName( filterType.class );
		var   filter     = getFilter( pageContextBox );

		if ( pageContextBox.classList.contains( filterType.class ) ) {
			if ( filterType.fixed !== false ) {
				return filterType.fixed;
			}
			if ( filter !== false ) {
				return filter;
			}
		}

		if ( filterType.fixed !== false ) {
			if ( children.length ) {
				return filterType.fixed;
			}
			continue;
		}

		for ( var k = 0; k < children.length; ++k ) {
			filter = getFilter( children[ k ] );
			if ( filter !== false ) {
				return filter;
			}
		}
	}

	return getFilterMax();
}

/**
 * Gets the numeric filter preventing content from being removed with any
 * filter.
 * @returns {number} The maximum allowed numeric filter.
 */
function getFilterMax() {
	return Math.pow( 2, filterCount ) - 1;
}

/**
 * Gets the numeric filter of an element.
 * @param {HTMLElement} element The element.
 * @returns {number | false} The numeric filter of the given element,
 *                           false if it does not have any.
 */
function getFilter( element ) {
	if ( 'cfVal' in element.dataset ) {
		return +element.dataset.cfVal;
	}

	const filterClass = findClassStartingWith( element, filterClassIntro );
	if ( filterClass === null ) {
		return false;
	}

	const filter = +filterClass;
	if ( filter < 0 ) {
		return false;
	}

	element.dataset.cfVal = filterClass;
	return filter;
}

/**
 * Gets the first class of an element beginning with a specific string.
 * @param {HTMLElement} element The element.
 * @param {string}      intro   The beginning of the class name.
 * @returns {string} The first corresponding class name, null otherwise.
 */
function findClassStartingWith( element, intro ) {
	const classList = element.classList;
	for ( var i = 0; i < classList.length; ++i ) {
		if ( classList[ i ].startsWith( intro ) ) {
			return classList[ i ].substr( intro.length );
		}
	}
	return null;
}

/**
 * Generates the filter menu and puts it on the page.
 */
function insertMenu() {
	if ( config.wgAction === 'edit' ) {
		// No filtering in edit mode: it would require reloading the page.
		return;
	}

	const ul = document.createElement( 'ul' );
	ul.classList.add( 'cf-menu' );

	filters.forEach( insertMenuButton, ul );

	if ( filtersInfoId ) {
		const info = document.getElementById( filtersInfoId );
		if ( info ) {
			info.append( ul );
			info.style.display = null;
			return;
		}
	}

	const wrapper = document.getElementsByClassName( 'page-header__actions' )[ 0 ];
	wrapper.prepend( ul );
}

/**
 * An extension of URI parameters.
 * @typedef {{ [ k: string ]: number }} UriExtension
 */

/**
 * Generates a filter menu button.
 * @this {HTMLUListElement}
 * @param {Filter | false} filter The configurated filter.
 * @param {number}         index  The index of the filter.
 */
function insertMenuButton( filter, index ) {
	if ( !filter ) {
		return;
	}

	const button = document.createElement( 'li' );
	const a      = document.createElement( 'a' );

	button.id = 'cf-button-' + index;
	button.classList.add( 'cf-button' );

	if ( filter.filter & pageFilter ) {
		if ( filter.description ) {
			button.title = filter.description;
		}
		/** @type {UriExtension} */
		const uriParams = {};
		uriParams[ urlParam ] = index;
		a.href = currentUri.extend( uriParams ).toString();
	} else {
		button.classList.add( 'cf-button-deactivated' );
	}

	if ( isUrl( filter.title ) ) {
		const img = document.createElement( 'img' );
		img.src = filter.title;
		img.loading = 'eager';
		a.appendChild( img );
	} else {
		a.textContent = filter.title;
	}

	button.appendChild( a );
	this.appendChild( button );
}

/**
 * Indicates whether a string is a valid URL.
 * @param {string} str The string to test.
 * @returns {boolean} True if the given string is a valid URL, false otherwise.
 */
function isUrl( str ) {
	try {
		const uri = new mw.Uri( str );
		return uri.toString() !== defaultUri.toString() &&
			   ( uri.protocol === 'http' || uri.protocol === 'https' );
	} catch ( _ ) {
		return false;
	}
}

/**
 * Updates the index of the currently selected filter form item from the URL
 * parameters.
 */
function updateSelectedIndex() {
	if ( config.wgAction === 'edit' ) {
		// No filtering in edit mode: it would require reloading the page.
		selectedIndex = false;
		return;
	}

	const filterParamValue = getFilterParamValue();
	if ( filterParamValue === false ) {
		selectedIndex = false;
		return;
	}

	selectedIndex = filterParamValue;
	if ( !isIndex( selectedIndex, filters ) ) {
		selectedIndex = false;
		error(
			'The selected numeric filter (' + filterParamValue + ') is unavailable, ' +
			'please use an integer x so 0 ≤ x ≤ ' + ( filters.length - 1 ) + '. ' +
			'No filtering will be performed.'
		);
		return;
	}

	const filter = filters[ selectedIndex ];
	if ( !filter ) {
		selectedIndex = false;
		error(
			'The selected numeric filter (' + urlParam + ') has been disabled. ' +
			'No filtering will be performed.'
		);
		return;
	}

	selectedFilter = filter.filter;
	log( 'Using ' + selectedFilter + ' as active filter.' );
}

/**
 * Gets the value of the URL parameter used to store the selected filter.
 * @returns {number | false} The selected filter index, false if none has been specified.
 */
function getFilterParamValue() {
	const value = mw.util.getParamValue( urlParam );
	if ( value ) {
		return parseInt( value, 10 );
	}

	return false;
}

/**
 * Indicates if a number is a valid index of an array.
 * @param {number} number The number.
 * @param {any[]}  array  The array.
 * @returns {boolean} True if "array[ number ]" exists, false otherwise.
 */
function isIndex( number, array ) {
	return !isNaN( number ) && number >= 0 && number < array.length;
}

/**
 * Removes elements with a filter from a container.
 * @param {HTMLElement} container The container to remove elements from.
 */
function applyFilter( container ) {
	if ( !bodyContent ) {
		error( 'No main content detected.' );
		return;
	}

	if ( selectedIndex === false ) {
		return;
	}

	log( 'Processing filter tags in content text.' );

	preprocess( container );
	for ( var i = 0; i < filterTypes.length; ++i ) {
		const filterType = filterTypes[ i ];
		const elements   = container.getElementsByClassName( filterType.class );
		var   oldLength  = elements.length;
		var   loopLimit  = 0;
		var   minElement = 0;
		while ( elements[ minElement ] ) {
			const element = elements[ minElement ];
			if ( applyFilterType( filterType, element ) ) {
				element.classList.replace(
					filterType.class,
					'cf-element-skipped'
				);
			}
			if ( elements.length < oldLength ) {
				oldLength = elements.length;
				loopLimit = 0;
			} else if ( ++loopLimit >= applyFilterLimit ) {
				error(
					'Too many element removals have been realized ' +
					'without reducing the number of elements.'
				);
				++minElement;
			}
		}
		const skippedElements = container.getElementsByClassName( 'cf-element-skipped' );
		while ( skippedElements[ 0 ] ) {
			skippedElements[ 0 ].classList.replace( 'cf-element-skipped', filterType.class );
		}
	}
	postprocess( container );

	array.forEach.call(
		container.getElementsByTagName( 'a' ),
		updateAnchorFilter
	);
}

/**
 * Removes an element with a filter if its numeric filter does not match the
 * selected one.
 * @param {FilterType}  filterType The filter type of the element.
 * @param {HTMLElement} element    The element.
 * @returns {boolean} True if the element should be left in place, false otherwise.
 */
function applyFilterType( filterType, element ) {
	var filter = filterType.fixed;
	if ( filter === false ) {
		filter = getFilter( element );
		if ( filter === false ) {
			element.classList.remove( filterType.class );
			warn(
				'The element does not have any valid numeric filter class, ' +
				'but its filter type is not fixed.'
			);
			return false;
		}
	}

	if ( ( filter & selectedFilter ) > 0 ) {
		switch ( filterType.mode ) {
		case 'block':
			element.classList.remove( filterType.class );
			return false;
		case 'wrapper':
			unwrap( element );
			return false;
		case 'inline':
			removeElementWithoutContext( element );
			return false;
		}
	}

	if ( handleFilter( filterType, element ) ) {
		return false;
	}

	warn( 'Unmatched ' + filterType.mode + ' filter "' + filterType.class + '".' );
	return true;
}

/**
 * Removes an element and its empty parents.
 * @param {HTMLElement} element The element to remove.
 */
function removeElementWithoutContext( element ) {
	var parent = element.parentElement;
	while ( parent !== bodyContent && !hasSibling( element ) && parent.tagName !== 'TD' ) {
		element = parent;
		parent  = parent.parentElement;
	}
	parent.removeChild( element );
}

/**
 * Removes an element with a filter, assuming its numeric filter does not match
 * the selected one.
 * @param {FilterType}  filterType The filter type of the element.
 * @param {HTMLElement} element    The element to remove.
 * @returns {boolean} True if the removal has been handled properly, false otherwise.
 */
function handleFilter( filterType, element ) {
	if (
		handleItemDictionary( element ) ||
		handleInnerList( element ) ||
		handleNavListVertical( element )
	) {
		return true;
	}

	switch ( filterType.mode ) {
	case 'block':
	case 'wrapper':
		removeElement( element );
		return true;
	}

	var parent = element;
	if ( contextFilterClass ) {
		parent = findParentWithClass( element, contextFilterClass );
		if ( parent ) {
			const heading = getPreviousHeading( parent );
			removeElement( heading || parent );
			return true;
		}
	}

	parent = element.parentElement;
	if ( parent.tagName === 'LI' && !hasPreviousSibling( element ) ) {
		removeElement( parent );
		return true;
	}

	removeGhostSiblings( element );
	if ( !getNextText( element ) ) {
		const nextElement = element.nextElementSibling;
		if ( !nextElement ) {
			removeElement( element.parentElement );
			return true;
		}
		if ( nextElement.tagName === 'BR' ) {
			removePreviousNodesUntilName( nextElement, 'BR' );
			nextElement.remove();
			return true;
		}
	}

	const previousElement = element.previousElementSibling;
	const previousText    = getPreviousText( element );
	if (
		previousText ?
			!previousText.endsWith( '.' ) :
			previousElement && previousElement.tagName !== 'BR'
	) {
		return false;
	}

	/** @type {ChildNode} */
	var node        = element;
	var nextNode    = node;
	var textContent = '';
	do {
		textContent = node.textContent.trimEnd();
		nextNode    = node.nextSibling;
		node.remove();
		node = nextNode;
		if ( !node ) {
			if ( !previousElement && !previousText ) {
				removeElement( parent );
			}
			return true;
		}
		if ( node.nodeName === 'BR' ) {
			node.remove();
			return true;
		}
		if ( textContent.endsWith( '.' ) && node instanceof HTMLElement && hasFilter( node ) ) {
			return true;
		}
	} while ( true );
}

/**
 * Does things before removing elements from a container.
 * @param {HTMLElement} container The container to remove elements from.
 */
function preprocess( container ) {
	preprocessItemDictionaries( container );
}

/**
 * Does things after removing elements from a container.
 * @param {HTMLElement} container The container to remove elements from.
 */
function postprocess( container ) {
	postprocessItemDictionaries( container );
	postprocessCategoryNavs( container );
	postprocessListNavs( container );
}

/**
 * Removes an element with an inline filter and its related content in a list
 * using items as a key.
 * @param {HTMLElement} element The element to remove.
 * @returns {boolean} True if the removal has been handled by this function,
 *                    false if it should be handled the default way.
 */
function handleItemDictionary( element ) {
	const parent = element.parentElement;
	if (
		parent.tagName !== 'SPAN' ||
		!parent.classList.contains( 'dlc-filter-dict-key' )
	) {
		return false;
	}
	const keyType = getKeyType( element );
	switch ( keyType ) {
	case DictKeyType.UNIQUE:
	case DictKeyType.COMBINED:
		removeElement( parent.parentElement );
		return true;
	case DictKeyType.FIRST_ALTERNATIVE:
		while ( element.previousSibling ) {
			element.previousSibling.remove();
		}
		removeNextNodeUntilText( element, '/', true );
		element.remove();
		return true;
	case DictKeyType.ALTERNATIVE:
		removePreviousNodeUntilText( element, '/', true );
		removeNextNodeUntilText( element, '/' );
		element.remove();
		return true;
	case DictKeyType.LAST_ALTERNATIVE:
		removePreviousNodeUntilText( element, '/', true );
		while ( element.nextSibling ) {
			element.nextSibling.remove();
		}
		element.remove();
		return true;
	}
	return false;
}

/**
 * TODO
 */
const DictKeyType = {
	UNIQUE: 0,
	COMBINED: 1,
	FIRST_ALTERNATIVE: 2,
	ALTERNATIVE: 3,
	LAST_ALTERNATIVE: 4
};

/**
 * Gets the type of key an element is part of.
 * @param {HTMLElement} element The element.
 * @returns {number} A key type from the DictKeyType enumeration.
 * @see DictKeyType
 */
function getKeyType( element ) {
	var sibling = element.previousSibling;
	while (
		sibling && (
			sibling.nodeType !== Node.TEXT_NODE ||
			sibling.textContent.lastIndexOf( '/' ) === -1 &&
			sibling.textContent.lastIndexOf( '+' ) === -1
		)
	) {
		sibling = sibling.previousSibling;
	}
	var slashIndex = -1;
	var plusIndex  = -1;
	var keyType    = DictKeyType.UNIQUE;
	if ( sibling ) {
		slashIndex = sibling.textContent.lastIndexOf( '/' );
		plusIndex  = sibling.textContent.lastIndexOf( '+' );
		keyType    = slashIndex === -1 ||
			plusIndex > slashIndex ?
				DictKeyType.COMBINED :
				DictKeyType.LAST_ALTERNATIVE;
	}
	sibling = element.nextSibling;
	while (
		sibling && (
			sibling.nodeType !== Node.TEXT_NODE ||
			sibling.textContent.indexOf( '/' ) === -1 &&
			sibling.textContent.indexOf( '+' ) === -1
		)
	) {
		sibling = sibling.nextSibling;
	}
	if ( sibling ) {
		slashIndex = sibling.textContent.indexOf( '/' );
		plusIndex  = sibling.textContent.indexOf( '+' );
		keyType    = slashIndex === -1 ||
			plusIndex !== -1 && plusIndex < slashIndex ?
				DictKeyType.COMBINED :
				DictKeyType.LAST_ALTERNATIVE;
	}
	return keyType;
}

/**
 * TODO
 * @param {HTMLElement} element The element to remove.
 * @returns {boolean} True if the removal has been handled by this function,
 *                    false if it should be handled the default way.
 */
function handleInnerList( element ) {
	if ( hasPreviousSibling( element ) ) {
		return false;
	}
	const parent = element.parentElement;
	if ( parent.tagName !== 'LI' || parent.childNodes.length === 1 ) {
		return false;
	}
	const innerList = parent.lastElementChild;
	if ( !innerList || innerList.tagName !== 'UL' ) {
		return false;
	}
	const filter = getFilter( element );
	if ( filter === false ) {
		return false;
	}
	var sibling = innerList.previousSibling;
	while ( sibling ) {
		sibling.remove();
		sibling = innerList.previousSibling;
	}
	const lis        = innerList.children;
	const upperBound = getFilterMax() + 1;
	for ( var i = 0; i < lis.length; ) {
		const li    = lis[ i ];
		var   child = li.firstChild;
		while ( isGhostNode( child ) ) {
			child = child.nextSibling;
		}
		if ( child instanceof HTMLElement ) {
			const childFilter = getFilter( child );
			if (
				childFilter &&
				!haveSimilarBits( upperBound, filter, childFilter )
			) {
				++i;
				continue;
			}
		}
		li.remove();
	}
	if ( lis.length ) {
		unwrap( lis[ 0 ], innerList );
	} else {
		removeElement( parent );
	}
	return true;
}

/**
 * Indicates whether two filters have at least one same bit as 1.
 * @param {number} upperBound The higher bit a filter can use.
 * @param {number} fst        The first filter.
 * @param {number} snd        The second filter.
 * @returns {boolean} True if the two filters are not complementary, false otherwise.
 */
function haveSimilarBits( upperBound, fst, snd ) {
	for ( var i = upperBound; i > 0; i /= 2 ) {
		if ( fst >= i ) {
			if ( snd >= i ) {
				return true;
			}
			fst -= i;
		} else if ( snd >= i ) {
			snd -= i;
		}
	}
	return false;
}

/**
 * Removes a DLC icon and its related content in a vertical list navigation.
 * @param {HTMLElement} dlcIcon The DLC icon.
 * @returns {boolean} True if the DLC icon has been handled properly, false otherwise.
 */
function handleNavListVertical( dlcIcon ) {
	const cell = dlcIcon.parentElement;
	if ( cell.tagName !== 'TD' ) {
		return false;
	}
	const row   = cell.parentElement;
	const table = row.parentElement.parentElement;
	if ( !table.classList.contains( 'nav-list-vertical' ) ) {
		return false;
	}
	var index = 0;
	for (
		var sibling = cell.previousElementSibling;
		sibling;
		sibling = sibling.previousElementSibling
	) {
		++index;
	}
	
	cell.remove();
	const nextRow = row.nextElementSibling;
	nextRow.children[ index ].remove();
	return true;
}

/**
 * TODO
 * @param {HTMLElement} container
 */
function preprocessItemDictionaries( container ) {
	const headings = container.querySelectorAll( 'h2, h3, h4, h5, h6' );
	for ( var i = 0; i < headings.length; ++i ) {
		const headlines = headings[ i ].getElementsByClassName( 'mw-headline' );
		if (
			headlines.length &&
			headlines[ 0 ].textContent.match( 'Synergies|Interactions' )
		) {
			const headingLevel = getHeadingLevel( headings[ i ] );
			for (
				var nextElement = headings[ i ].nextElementSibling;
				!isOutOfSection( nextElement, headingLevel );
				nextElement = nextElement.nextElementSibling
			) {
				if ( nextElement.tagName === 'UL' ) {
					preprocessItemDictionary( nextElement );
				}
			}
		}
	}
}

/**
 * TODO
 * @param {HTMLElement} ul
 */
function preprocessItemDictionary( ul ) {
	const lis           = ul.children;
	const keySpanBase   = document.createElement( 'span' );
	const valueSpanBase = document.createElement( 'span' );
	ul.classList.add( 'dlc-filter-dict' );
	keySpanBase.classList.add( 'dlc-filter-dict-key' );
	valueSpanBase.classList.add( 'dlc-filter-dict-value' );
	for ( var i = 0; i < lis.length; ++i ) {
		const li = lis[ i ];
		if ( li.tagName !== 'LI' ) {
			continue;
		}
		const keySpan   = keySpanBase.cloneNode( true );
		const valueSpan = valueSpanBase.cloneNode( true );
		var   node      = li.firstChild;
		while (
			node && (
				node.nodeType !== Node.TEXT_NODE ||
				node.textContent.indexOf( ':' ) === -1
			)
		) {
			keySpan.append( node );
			node = li.firstChild;
		}
		if ( !node ) {
			error( 'Key error?' );
			continue;
		}
		const colonIndex = node.textContent.indexOf( ':' );
		keySpan.append(
			document.createTextNode( node.textContent.substr( 0, colonIndex ) )
		);
		node.textContent = node.textContent.substr( colonIndex + 1 );
		var   lastNode    = li.lastChild;
		const lastElement = li.lastElementChild;
		if ( lastElement && lastElement.tagName === 'UL' ) {
			lastElement.classList.add( 'dlc-filter-dict-inner' );
			lastNode = lastElement.previousSibling;
		}
		while ( node ) {
			valueSpan.append( node );
			if ( node === lastNode ) {
				break;
			}
			node = li.firstChild;
		}
		li.prepend( keySpan, document.createTextNode( ':' ), valueSpan );
	}
}

/**
 * TODO
 * @param {HTMLElement} container
 */
function postprocessItemDictionaries( container ) {
	const uls = container.getElementsByClassName( 'dlc-filter-dict' );
	while ( uls.length ) {
		for (
			var li = uls[ 0 ].firstElementChild;
			li;
			li = li.nextElementSibling
		) {
			const keys   = li.getElementsByClassName( 'dlc-filter-dict-key' );
			const values = li.getElementsByClassName( 'dlc-filter-dict-value' );
			unwrap( keys[ 0 ] );
			if ( values.length ) {
				unwrap( values[ 0 ] );
				continue;
			}
			const subdicts = li.getElementsByClassName( 'dlc-filter-dict-inner' );
			if ( !subdicts.length ) {
				continue;
			}
			const subdict = subdicts[ 0 ];
			const firstLi = subdict.getElementsByTagName( 'li' )[ 0 ];
			unwrap( firstLi, subdict );
			if ( !subdict.firstElementChild ) {
				subdict.remove();
			} else {
				subdict.classList.remove( 'dlc-filter-inner' );
			}
		}
		uls[ 0 ].classList.remove( 'dlc-filter-dict' );
	}
}

/**
 * Remove empty "category" navs.
 * @param {HTMLElement} container
 */
function postprocessCategoryNavs( container ) {
	const navs = container.getElementsByClassName( 'nav-category' );
	for ( var i = 0; i < navs.length; ++i ) {
		if ( navs[ i ].classList.contains( 'nav-list-vertical' ) ) {
			continue;
		}
		var row = navs[ i ].children[ 1 ];
		if ( !row ) {
			removeElement( navs[ i ] );
		}
		var nextRow = row.nextElementSibling;
		while ( nextRow ) {
			if ( nextRow.tagName === 'P' ) {
				row.remove();
			} else {
				nextRow = nextRow.nextElementSibling;
				if ( !nextRow ) {
					break;
				}
			}
			row     = nextRow;
			nextRow = nextRow.nextElementSibling;
		}
		row.remove();
	}
}

/**
 * Merge cells of list navs, the DLC icons being removed.
 * @param {Element} container
 */
function postprocessListNavs( container ) {
	const navs = container.getElementsByClassName( 'nav-list-vertical' );
	for ( var i = 0; i < navs.length; ++i ) {
		const row       = navs[ i ].lastElementChild.lastElementChild;
		const cells     = row.children;
		const firstCell = cells[ 0 ];
		var   lastChild = firstCell.lastChild;
		while ( !( lastChild instanceof HTMLElement ) ) {
			lastChild.remove();
			lastChild = firstCell.lastChild;
		}
		while ( cells.length > 1 ) {
			const nodes = cells[ 1 ].children;
			for ( var j = 0; j < nodes.length; ++j ) {
				firstCell.append( nodes[ j ] );
			}
			cells[ 1 ].remove();
		}
		if ( !firstCell.children.length ) {
			navs[ i ].remove();
			break;
		}
		row.previousElementSibling.remove();
	}
}

/**
 * Removes an element. Also removes its containers and previous headings if
 * they are empty after the element being removed.
 * @param {Element} element The element to remove.
 */
function removeElement( element ) {
	if ( element.classList.contains( 'gallerytext' ) ) {
		while ( element.classList.contains( 'gallerybox' ) ) {
			element = element.parentElement;
		}
	}
	removeGhostSiblings( element );
	switch ( element.tagName ) {
	case 'H2':
	case 'H3':
	case 'H4':
	case 'H5':
	case 'H6':
		removeHeadingElement( element );
		return;
	case 'LI':
		removeListItem( element );
		return;
	case 'TBODY':
		removeElement( element.parentElement );
		return;
	case 'TR':
		if ( !hasSibling( element ) ) {
			removeElement( element.parentElement );
		} else {
			element.remove();
		}
		return;
	case 'TH':
	case 'TD':
		removeTableCell( element );
		return;
	}
	removeDefaultElement( element );
}

/**
 * Handles the removal of a heading element.
 * @param {Element} element The <h2/h3/h4/h5/h6> element.
 */
function removeHeadingElement( element ) {
	const headingLevel = getHeadingLevel( element );
	var   sibling      = element.nextElementSibling;
	while ( !isOutOfSection( sibling, headingLevel ) ) {
		const toRemove = sibling;
		sibling = sibling.nextElementSibling;
		toRemove.remove();
	}
	removeTocElement( element.getElementsByClassName( 'mw-headline' )[ 0 ].id );
}

/**
 * Handles the removal of a list item.
 * @param {Element} item The <li> element.
 */
function removeListItem( item ) {
	if ( item.previousSibling || item.nextSibling ) {
		item.remove();
		return;
	}
	removeElement( item.parentElement );
}

/**
 * Handles the removal of a table cell, from clearing it to removing the
 * entire table depending to the situation.
 * @param {Element} cell The <th/td> element.
 */
function removeTableCell( cell ) {
	const row    = cell.parentElement;
	const tbody  = row.parentElement;
	const table  = tbody.parentElement;
	var   column = 0;
	for (
		var sibling = cell.previousElementSibling;
		sibling;
		sibling = sibling.previousElementSibling
	) {
		++column;
	}

	if ( tbody.tagName === 'THEAD' && cell.tagName === 'TH' ) {
		// TODO: Fix with mw-collapsible & sortable.
		const isLastColumn = !cell.nextElementSibling;
		row.removeChild( cell );
		if ( !tbody.nextElementSibling ) {
			return;
		}
		var nextRow = tbody.nextElementSibling.firstElementChild;
		while ( nextRow ) {
			nextRow.removeChild( nextRow.children[ column ] );
			nextRow = nextRow.nextElementSibling;
		}
		if ( isLastColumn ) {
			table.classList.remove(
				'mw-collapsible',
				'mw-made-collapsible'
			);
			$( table ).makeCollapsible();
		}
	}

	const mainColumn = mainColumnClassIntro &&
		findClassStartingWith( table, mainColumnClassIntro ) || 1;
	if ( +mainColumn === column + 1 ) {
		removeElement( row );
		return;
	}

	if (
		listTableClass &&
		table.classList.contains( listTableClass )
	) {
		row.removeChild( cell );
		return;
	}
	while ( cell.firstChild ) {
		cell.removeChild( cell.firstChild );
	}
}

/**
 * Handles the removal of any element.
 * @param {Element} element The element.
 */
function removeDefaultElement( element ) {
	if ( element.classList.contains( 'mw-headline' ) ) {
		removeElement( element.parentElement );
		return;
	}
	const parent  = element.parentElement;
	const sibling = element.previousElementSibling;
	element.remove();
	ensureNonEmptySection( sibling );
	if ( !parent.hasChildNodes() ) {
		removeElement( parent );
	}
}

/**
 * Recursively removes an element if it is a heading and its associated section
 * is empty. Also updates the table of contents.
 * @param {Element} element The element.
 */
function ensureNonEmptySection( element ) {
	if ( !element ) {
		return;
	}
	while ( !( element instanceof HTMLHeadingElement ) ) {
		if ( !inContentAdClass || !element.classList.contains( inContentAdClass ) ) {
			return;
		}
		element = element.previousElementSibling;
	}
	if ( !isOutOfSection( element.nextElementSibling, getHeadingLevel( element ) ) ) {
		return;
	}
	const previousElement = element.previousElementSibling;
	removeTocElement( element.getElementsByClassName( 'mw-headline' )[ 0 ].id );
	element.parentNode.removeChild( element );
	ensureNonEmptySection( previousElement );
}

/**
 * Removes a row (associated to a removed heading element) from the table of
 * contents, then updates the numbering of the following rows.
 * @param {string} id The ID of the removed heading element.
 * @returns {boolean} True if a row has been removed from the table of contents,
 *                    false if the table of contents has not been defined or if
 *                    there is no associated row.
 */
function removeTocElement( id ) {
	if ( !toc ) {
		return false;
	}
	const element = toc.querySelector( '[href="#' + id + '"]' );
	if ( !element ) {
		return false;
	}
	const parent     = element.parentElement;
	const number     = element.getElementsByClassName( 'tocnumber' )[ 0 ].textContent;
	const lastDotPos = number.lastIndexOf( '.', 1 ) + 1;
	var   lastNumber = +number.substring( lastDotPos );
	var   nextParent = parent.nextElementSibling;
	while ( nextParent ) {
		const nextNumbers = nextParent.getElementsByClassName( 'tocnumber' );
		for ( var i = 0; i < nextNumbers.length; ++i ) {
			const textContent = nextNumbers[ i ].textContent;
			nextNumbers[ i ].textContent =
				textContent.substring( 0, lastDotPos ) + lastNumber +
				textContent.substring( number.length );
		}
		++lastNumber;
		nextParent = nextParent.nextElementSibling;
	}
	parent.parentNode.removeChild( parent );
	return true;
}

/**
 * Gets the last heading element used before an element.
 * @param {Element} element The element.
 * @returns {Element} The previous heading element if there is one, null otherwise.
 */
function getPreviousHeading( element ) {
	element = element.previousElementSibling;
	while ( element && !( element instanceof HTMLHeadingElement ) ) {
		element = element.previousElementSibling;
	}
	return element;
}

/**
 * Gets the level of a heading element.
 * @param {Element} heading The heading element.
 * @returns {number} The level of the heading element.
 */
function getHeadingLevel( heading ) {
	return +heading.tagName.substr( 1 );
}

/**
 * Indicates whether an element would be the first below a section defined with
 * a previous heading element.
 * @param {Element} element      The element.
 * @param {number}  headingLevel The level of the last heading element.
 * @returns {boolean} True if the element is missing, defines a new section with
 * 	                  a higher or same level, or is the end of the page content.
 */
function isOutOfSection( element, headingLevel ) {
	return !element ||
	       element instanceof HTMLHeadingElement && headingLevel >= getHeadingLevel( element ) ||
	       contentEndClass && element.classList.contains( contentEndClass );
}

/**
 * Indicates whether an element or one of its parents has a class.
 * @param {HTMLElement} element   The element.
 * @param {string}      className The class name.
 * @returns {HTMLElement} The element or one of its parents which has the given
 *                        class, null if there aren't any.
 */
function findParentWithClass( element, className ) {
	if ( !element ) {
		return null;
	}
	while ( element && element !== bodyContent ) {
		if ( element.classList.contains( className ) ) {
			return element;
		}
		element = element.parentElement;
	}
	return null;
}

/**
 * Indicates whether an element has a sibling.
 * Ignores comments and "invisible" strings.
 * @param {Node} element The element.
 * @returns {boolean} True if the element has no sibling other than a comment or
 *                    an "invisible" string, false otherwise.
 */
function hasSibling( element ) {
	return hasPreviousSibling( element ) || hasNextSibling( element );
}

/**
 * Indicates whether an element has a previous sibling.
 * Ignores comments and "invisible" strings.
 * @param {Node} element The element.
 * @returns {boolean} True if the element has a previous sibling other than
 *                    a comment or an "invisible" string, false otherwise.
 */
function hasPreviousSibling( element ) {
	var sibling = element.previousSibling;
	if ( !sibling ) {
		return false;
	}
	while ( isGhostNode( sibling ) ) {
		sibling = sibling.previousSibling;
		if ( !sibling ) {
			return false;
		}
	}
	return true;
}

/**
 * Indicates whether an element has a next sibling.
 * Ignores comments and "invisible" strings.
 * @param {Node} element The element.
 * @returns {boolean} True if the element has a next sibling other than
 *                    a comment or an "invisible" string, false otherwise.
 */
function hasNextSibling( element ) {
	var sibling = element.nextSibling;
	if ( !sibling ) {
		return false;
	}
	while ( isGhostNode( sibling ) ) {
		sibling = sibling.nextSibling;
		if ( !sibling ) {
			return false;
		}
	}
	return true;
}

/**
 * Indicates whether an element has a filter applied to it (not alrealy handled).
 * @param {HTMLElement} element The element.
 * @returns {boolean} True if the element has a filter type class, false otherwise.
 */
function hasFilter( element ) {
	for ( var i = 0; i < filterTypes.length; ++i ) {
		if (
			element.classList.contains( filterTypes[ i ].class ) &&
			(
				filterTypes[ i ].fixed !== false ||
				findClassStartingWith( element, filterClassIntro )
			)
		) {
			return true;
		}
	}
	return false;
}

/**
 * Indicates whether a node should be considered as an additional non-essential node.
 * @param {Node} node The node.
 * @returns {boolean} True if the node is non-essential, false otherwise.
 */
function isGhostNode( node ) {
	if ( !node ) {
		return false;
	}

	switch ( node.nodeType ) {
	case Node.COMMENT_NODE:
		return true;
	case Node.TEXT_NODE:
		return !node.textContent || !node.textContent.trim();
	case Node.ELEMENT_NODE:
		/** @type {Element} */ // @ts-ignore
		const element = node;
		return element.classList.contains( 'mw-collapsible-toggle' ) ||
		       skipClass && element.classList.contains( skipClass );
	}

	return false;
}

/**
 * Removes the non-essential nodes around a node.
 * @param {Node} node The node.
 */
function removeGhostSiblings( node ) {
	var sibling = node.previousSibling;
	while ( isGhostNode( sibling ) ) {
		sibling.remove();
		sibling = node.previousSibling;
	}
	sibling = node.nextSibling;
	while ( isGhostNode( sibling ) ) {
		sibling.remove();
		sibling = node.nextSibling;
	}
}

/**
 * Removes nodes before a node while they do not have the given node name.
 * @param {Node}     node        The node.
 * @param {string}   nodeName    The node name.
 * @param {boolean} [removeLast] If the last node (with the given name) should
 *                               also be removed.
 */
function removePreviousNodesUntilName( node, nodeName, removeLast ) {
	var sibling = node.previousSibling;
	while ( sibling && ( sibling.nodeName !== nodeName ) ) {
		sibling.remove();
		sibling = node.previousSibling;
	}
	if ( removeLast ) {
		sibling.remove();
	}
}

/**
 * Removes nodes after a node while they do not have the given node name.
 * @param {Node}     node        The node.
 * @param {string}   nodeName    The node name.
 * @param {boolean} [removeLast] If the last node (with the given name) should
 *                               also be removed.
 */
function removeNextNodesUntilName( node, nodeName, removeLast ) {
	var sibling = node.nextSibling;
	while ( sibling && ( sibling.nodeName !== nodeName ) ) {
		sibling.remove();
		sibling = node.nextSibling;
	}
	if ( removeLast ) {
		sibling.remove();
	}
}

/**
 * Removes nodes before a node while they do not contain the given text.
 * @param {Node}     node        The node.
 * @param {string}   text        The searched text.
 * @param {boolean} [removeText] If the searched text should also be removed
 *                               from the last node.
 */
function removePreviousNodeUntilText( node, text, removeText ) {
	var sibling = node.previousSibling;
	while (
		!sibling ||
		sibling.nodeType !== Node.TEXT_NODE ||
		sibling.textContent.indexOf( text ) === -1
	) {
		if ( !sibling || sibling instanceof HTMLBRElement ) {
			return;
		}
		sibling.remove();
		sibling = node.previousSibling;
	}
	if ( !removeText ) {
		sibling.textContent = sibling.textContent.substr(
			0,
			sibling.textContent.lastIndexOf( text ) + text.length
		);
		return;
	}
	sibling.textContent = sibling.textContent
		.substr( 0, sibling.textContent.lastIndexOf( text ) )
		.trimEnd();
	if ( !sibling.textContent ) {
		sibling.remove();
	}
}

/**
 * Removes nodes after a node while they do not contain the given text.
 * @param {Node}     node        The node.
 * @param {string}   text        The searched text.
 * @param {boolean} [removeText] If the searched text should also be removed
 *                               from the last node.
 */
function removeNextNodeUntilText( node, text, removeText ) {
	var sibling = node.nextSibling;
	while (
		!sibling ||
		sibling.nodeType !== Node.TEXT_NODE ||
		sibling.textContent.indexOf( text ) === -1
	) {
		if ( !sibling || sibling instanceof HTMLBRElement ) {
			return;
		}
		sibling.remove();
		sibling = node.nextSibling;
	}
	if ( !removeText ) {
		sibling.textContent = sibling.textContent
			.substr( sibling.textContent.indexOf( text ) );
		return;
	}
	sibling.textContent = sibling.textContent
		.substr( sibling.textContent.indexOf( text ) + text.length )
		.trimStart();
	if ( !sibling.textContent ) {
		sibling.remove();
	}
}

/**
 * Gets the text from the text node before a DOM element.
 * @param {Node} element The element.
 * @returns {string} The text content of the previous text node,
 *                   an empty string if there aren't any.
 */
function getPreviousText( element ) {
	const previousNode = element.previousSibling;
	return previousNode instanceof Text && previousNode.textContent ?
		previousNode.textContent.trim() :
		'';
}

/**
 * Gets the text from the text node after a DOM element.
 * @param {Node} element The element.
 * @returns {string} The text content of the next text node,
 *                   an empty string if there aren't any.
 */
function getNextText( element ) {
	const nextNode = element.nextSibling;
	return nextNode instanceof Text && nextNode.textContent ?
		nextNode.textContent.trim() :
		'';
}

/**
 * Removes an element, leaving its content in place.
 * @param {HTMLElement}  element The element to remove.
 * @param {HTMLElement} [target] The node which should be directly after the initial
 *                               element contents, defaults to the initial element.
 */
function unwrap( element, target ) {
	if ( !target ) {
		target = element;
	}
	const parent = target.parentElement;
	if ( !parent ) {
		return;
	}
	var childNode = element.firstChild;
	if ( !childNode ) {
		element.remove();
		return;
	}
	var sibling = target.previousSibling;
	if ( sibling && childNode.nodeType === Node.TEXT_NODE && sibling.nodeType === Node.TEXT_NODE ) {
		sibling.textContent += childNode.textContent;
		childNode.remove();
	}
	childNode = element.lastChild;
	if ( !childNode ) {
		element.remove();
		return;
	}
	sibling = target.nextSibling;
	if ( sibling && childNode.nodeType === Node.TEXT_NODE && sibling.nodeType === Node.TEXT_NODE ) {
		sibling.textContent = childNode.textContent + sibling.textContent;
		childNode.remove();
	}
	childNode = element.firstChild;
	while ( childNode ) {
		parent.insertBefore( childNode, target );
		childNode = element.firstChild;
	}
	element.remove();
}

/**
 * Updates the selected filter form item.
 */
function updateSelectedFilterItem() {
	if ( selectedIndex === false ) {
		return;
	}

	delete currentUri.query[ urlParam ];
	const item = document.getElementById( 'cf-button-' + selectedIndex );
	if ( !item ) {
		return;
	}
	item.classList.add( 'cf-button-active' );
	item.firstElementChild.setAttribute( 'href', currentUri.toString() );
}

/**
 * Adds a corresponding filter URL parameter to an anchor if none is used.
 * @param {HTMLAnchorElement} a The anchor.
 */
function updateAnchorFilter( a ) {
	if ( !a.href || a.parentElement.classList.contains( 'cf-button' ) ) {
		return;
	}

	var uri;
	try {
		uri = new mw.Uri( a.href );
	} catch ( _ ) {
		// If it is not an URL, then it probably is some javascript code,
		// so we just ignore it.
		return;
	}
	if ( uri.query[ urlParam ] ) {
		return;
	}

	const match = uri.path.match(
		mw.util
			.escapeRegExp( config.wgArticlePath )
			.replace( '\\$1', '(.*)' )
	);
	if ( !match ) {
		return;
	}

	if ( match[ 1 ] ) {
		const pageTitle = new mw.Title( mw.Uri.decode( match[ 1 ] ) );
		if ( !isFilteringAvailable( pageTitle ) ) {
			return;
		}
	}

	/** @type {UriExtension} */
	const obj = {};
	// @ts-ignore
	obj[ urlParam ] = selectedIndex;
	a.href = uri.extend( obj ).toString();
}

filteringAvailable = isFilteringAvailable( currentTitle );

safeAddContentHook( onContentLoaded );

module.exports = {
	applyFilter: applyFilter
};

} )( jQuery, mediaWiki, console, Array.prototype );
// </nowiki>
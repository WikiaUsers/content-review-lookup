/**
 * Name:        TODO
 * Description: TODO
 */

// <nowiki>

( function ( mw, document, console, array ) {

if ( window.cf ) {
	// already loaded
	return;
}

/** @this {( ...msg: string[] ) => void} */
function logger() {
	const args = array.slice.call( arguments );
	args.unshift( '[content-filter-core]' );
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
 * @property {string} wgPageName
 * The current page name.
 */

/**
 * MediaWiki configuration values.
 * @type {MWConfig}
 */
const config = mw.config.get( [ 'skin', 'wgAction', 'wgPageName' ] );

if ( config.skin !== 'fandomdesktop' ) {
	error(
		'This script only works with the FandomDesktop skin. ' +
		'To prevent compatibility issues with other skins, it will be disabled.'
	);
	return;
}

if ( config.wgAction !== 'view' && config.wgAction !== 'edit' ) {
	return;
}

/**
 * The number of filtering layers (bits) used on pages.
 * @type {number}
 */
const filterCount = 4; // filterM = 15 (0b1111)

/**
 * The class used on the page content.
 * @type {string}
 */
const bodyContentClass = 'mw-body-content';

/**
 * If an element on a page has this class (directly on the page or
 * transcluded), the filtering becomes available, even if the page is not
 * from a namespace in filteredNamespaces or in filteredSpecialTitles.
 * @type {string}
 */
const filterEnableClass = 'cf-enable';

/**
 * TODO
 * @type {string}
 */
const filterClass = 'dlc';
// const filterClass = 'cf-val';

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
// const filterClassIntro = 'cf-val-';

/**
 * If an element with a filter bitmask class is inside an element with this
 * class, the corresponding bitmask is applied to the surrounding section.
 * @type {string}
 */
const contextFilterClass = 'context-box';
// const contextFilterClass = 'cf-scope-section';

/**
 * If an element with a filter bitmask class is inside an element with the
 * `contextFilterClass` class and this id, the corresponding bitmask is applied
 * to the entire page: the filter buttons not matching the bitmask are disabled.
 * @type {string}
 */
const pageContextFilterId = 'context-page';
// const pageContextFilterId = 'cf-scope-page';

/**
 * This class can be used on elements to make them invisible to filtering:
 * the script will go through them when trying to remove elements. For
 * instance, the button used to collapse tables (.mw-collapsible-toggle) is
 * skipped by default.
 * @type {string}
 */
const skipClass = 'content-filter-skip';
// const skipClass = 'cf-skip';

/**
 * If a page has navigation bars or elements considered out of the page
 * content at the bottom of the page, using this class on at least the first
 * one will prevent these elements from being removed with a previous
 * section (see contextFilterClass).
 * @type {string}
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
 * @type {string}
 */
const mainColumnClassIntro = 'content-filter-main-column-';
// const mainColumnClassIntro = 'cf-table-col-';

/**
 * If a table has this class, its cells can be removed (instead of being
 * only cleared), the following cells on the column will then be shifted.
 * @type {string}
 */
const listTableClass = 'content-filter-list';
// const listTableClass = 'cf-list';

/**
 * This class works the same way as skipClass, except that the element will
 * be put back on the page somewhere else if it has to be removed.
 * @type {string}
 */
const inContentAdClass = 'gpt-ad';

/**
 * The current page title.
 * @type {mw.Title}
 */
const currentTitle = new mw.Title( config.wgPageName );

/**
 * The maximum allowed numeric filter, preventing content from being removed
 * with any filter.
 * @type {number}
 */
const filterMax = Math.pow( 2, filterCount ) - 1;

/**
 * TODO
 * @type {boolean}
 */
var filteringForced = false;

/**
 * TODO
 * @type {HTMLElement[]}
 */
const containers = [];

/**
 * TODO
 * @type {number}
 */
var pageFilter = filterMax;

/**
 * TODO
 * @type {number}
 */
var nextTagIndex = 0;

/**
 * Handles an "impossible" case, supposedly caused by other scripts breaking the
 * expected DOM elements.
 * @param {string} [note] Some information about the missing or invalid elements.
 * @returns {never}
 */
function domPanic( note ) {
	var message = (
		"Something went wrong, either DOM elements have been modified in an" +
		"unexpected way, or they have been disconnected from the document."
	);

	if ( note ) {
		message += "\nAdditional note: " + note;
	}

	throw message;
}

/**
 * Called when some text should be processed by the content filter.
 * @param {JQuery} $content The content element to process.
 */
function onContentLoaded( $content ) {
	const content = $content[ 0 ];
	if ( !content ) {
		return;
	}

	if ( isMainContent( content ) ) {
		filteringForced = isFilteringForced( document );
		containers.length = 0;
	}

	if ( !filteringAvailable && !filteringForced ) {
		return;
	}

	containers.push( content );
	parseFilter( content );

	mw.hook( 'contentFilter.content' ).fire( containers, pageFilter );
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
 * Indicates whether the filters should be used on a page because of the use of
 * in-content specific markers.
 * @param {Document} content The page content.
 * @returns {boolean} True if the filters should be used, false otherwise.
 */
function isFilteringForced( content ) {
	if ( content.getElementsByClassName( filterEnableClass ).length ) {
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
	const pageContextBox = document.getElementById( pageContextFilterId );
	if ( !pageContextBox ) {
		return filterMax;
	}

	if ( isTag( pageContextBox ) ) {
		return getFilter( pageContextBox );
	}

	const tagChild = pageContextBox.getElementsByClassName( filterClass )[ 0 ];
	if ( !tagChild ) {
		error(
			"Neither the page context and any of its children have a " +
			"filter value property."
		);
		return filterMax;
	}

	return getFilter( tagChild );
}

/**
 * TODO
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isTag( element ) {
	return element.classList.contains( filterClass );
}

/**
 * TODO
 * @param {HTMLElement} container
 */
function parseFilter( container ) {
	if ( hasContainerBeenParsed( container ) ) {
		return;
	}

	if ( container.getElementsByClassName( 'cf-container' )[ 0 ] ) {
		error(
			'The newly added content contains elements which are already ' +
			'managed by this script. The filtering has been disabled ' +
			'on the newly added content.'
		);
		// TODO: handle this case properly, by only registering new tags and
		//       regenerating the associated view fragments, or domPanic().
		return;
	}

	container.classList.add( 'cf-container' );

	if ( isMainContent( container ) ) {
		log( 'Initializing state.' );
		pageFilter = getPageFilter();
	}

	array.forEach.call(
		container.getElementsByClassName( filterClass ),
		parseTag
	);
}

/**
 * TODO
 * @param {HTMLElement?} container
 * @returns {boolean}
 */
function hasContainerBeenParsed( container ) {
	while ( container ) {
		if ( container.classList.contains( 'cf-container' ) ) {
			return true;
		}

		container = container.parentElement;
	}

	return false;
}

/**
 * TODO
 * @param {HTMLElement} tag
 */
function parseTag( tag ) {
	if ( tag.dataset.cfContext ) {
		return;
	}

	const context = getTagContext( tag );
	if ( !context ) {
		// TODO: warn();
		return;
	}

	tag.dataset.cfContext = '' + nextTagIndex;
	context.classList.add( 'cf-context' );
	context.classList.add( 'cf-context-' + nextTagIndex );
	nextTagIndex++;
}

/**
 * TODO
 * @param {number} index
 */
function parseView( index ) {
	array.forEach.call(
		document.getElementsByClassName( 'cf-container' ),
		parseViewStackContainer,
		index
	);
}

/**
 * TODO
 * @this {number}
 * @param {HTMLElement} container
 */
function parseViewStackContainer( container ) {
	if ( container.classList.contains( 'cf-container-view-' + this ) ) {
		return;
	}

	/** @type {HTMLElement[]} */
	const stack = [];

	array.forEach.call(
		container.getElementsByClassName( filterClass ),
		parseViewStackTag,
		{ stack: stack, filter: Math.pow( 2, this ) }
	);

	stack.forEach( addElementToView, this );

	container.classList.add( 'cf-container-view-' + this );
}

/**
 * TODO
 * @this {{ stack: HTMLElement[], filter: number }}
 * @param {HTMLElement} tag
 */
function parseViewStackTag( tag ) {
	const tagFilter = getFilter( tag );

	if ( tagFilter & this.filter ) {
		this.stack.push( tag );
		return;
	}

	array.forEach.call(
		document.getElementsByClassName( 'cf-context-' + tag.dataset.cfContext ),
		parseViewStackContext,
		this.stack
	);
}

/**
 * TODO
 * @this {HTMLElement[]}
 * @param {HTMLElement} context
 */
function parseViewStackContext( context ) {
	/** @type {HTMLElement?} */
	var element = context;
	do {
		element = applyViewRule( element, this );
	} while ( element );
}

/**
 * Indicates whether the filters can be used on a page.
 * @param {mw.Title} pageTitle The page title.
 * @returns {boolean} True if the filters can be used, false otherwise.
 */
function isFilteringAvailable( pageTitle ) {
	const namespace = pageTitle.getNamespaceId();
	if ( namespace == 0 || namespace == 2 ) {
		return true;
	}

	const pageName = pageTitle.getPrefixedText();
	if ( pageName === 'Special:Random' ) {
		return true;
	}

	return false;
}

/**
 * Gets the numeric filter of an element.
 * @param {HTMLElement} element The element.
 * @returns {number} The numeric filter of the given element.
 */
function getFilter( element ) {
	if ( element.dataset.cfVal ) {
		return +element.dataset.cfVal;
	}

	if ( !element.classList.contains( filterClass ) ) {
		return filterMax;
	}

	const classList = element.classList;
	for ( var i = 0; i < classList.length; ++i ) {
		const className = classList[ i ];
		if ( !className || !className.startsWith( filterClassIntro ) ) {
			continue;
		}

		const filterClass = className.substring( filterClassIntro.length );
		const filter      = +filterClass;
		if ( filter < 0 ) {
			continue;
		}

		element.dataset.cfVal = filterClass;
		return filter;
	}

	return filterMax;
}

/**
 * TODO
 * @param {HTMLElement} tag
 * @returns {HTMLElement?}
 */
function getTagContext( tag ) {
	const result = (
		getTagContext_firstChild( tag ) ||
		null
	);

	// TODO: other rules

	return result;
}

/**
 * TODO
 * <A> (tag) ... </A>
 *     ==>   [ <A> (tag) ... </A> ]
 * @param {HTMLElement} tag
 * @returns {HTMLElement?}
 */
function getTagContext_firstChild( tag ) {
	if ( getPreviousSibling( tag ) ) {
		return null;
	}

	return tag.parentElement;
}

/**
 * TODO
 * @this {number}
 * @param {HTMLElement} element
 */
function addElementToView( element ) {
	element.classList.add( 'cf-view' );
	element.classList.add( 'cf-view-' + this );
}

/**
 * TODO
 * @param {HTMLElement} element
 * @param {HTMLElement[]} stack
 * @returns {HTMLElement?}
 */
function applyViewRule( element, stack ) {
	const result = (
		applyViewRule_parentInView( element, stack ) ||
		applyViewRule_allChildren( element, stack ) ||
		null
	);

	// TODO: other rules

	if ( !result ) {
		stack.push( element );
	}

	return result;
}

/**
 * TODO
 * Remove child fragment.
 * [ <A> ... [ <X/> ] ... </A> ]
 *     ==>   [ <A> ... <X/> ... </A> ]
 * @param {HTMLElement} element
 * @param {HTMLElement[]} stack
 * @returns {HTMLElement?}
 */
function applyViewRule_parentInView( element, stack ) {
	const previousElement = stack.pop();
	if ( !previousElement ) {
		return null;
	}

	if ( !isChildOf( element, previousElement ) ) {
		stack.push( previousElement );
		return null;
	}

	return previousElement;
}

/**
 * TODO
 * Merge adjacent fragments.
 * <A> [ <B1/> ] ... [ <Bn/> ] [ <X/> ] </A>
 *     ==>   [ <A> <B1/> ... <Bn/> <X/> </A> ]
 * @param {HTMLElement} element
 * @param {HTMLElement[]} stack
 * @returns {HTMLElement?}
 */
function applyViewRule_allChildren( element, stack ) {
	if ( getNextSibling( element ) ) {
		return null;
	}

	/** @type {HTMLElement[]} */
	const previousElements = [];
	var previousSibling = getPreviousSibling( element );
	while ( previousSibling ) {
		const previousElement = stack.pop();
		if ( !previousElement ) {
			// no previous element in view.
			restoreStack( stack, previousElements );
			return null;
		}

		previousElements.push( previousElement );

		if (
			!previousSibling.isSameNode( previousElement ) &&
			!isChildOf( previousSibling, previousElement )
		) {
			// previous element not in view.
			restoreStack( stack, previousElements );
			return null;
		}

		element         = previousElement;
		previousSibling = getPreviousSibling( element );
	}

	return element.parentElement;
}

/**
 * TODO
 * @param {HTMLElement[]} stack
 * @param {HTMLElement[]} toRestore
 */
function restoreStack( stack, toRestore ) {
	stack.push.apply( stack, toRestore.reverse() );
}








/**
 * TODO
 * @param {Node} child
 * @param {Node} parent
 * @returns {boolean}
 */
function isChildOf( child, parent ) {
	const cmp = child.compareDocumentPosition( parent );
	return ( cmp & Node.DOCUMENT_POSITION_CONTAINS ) > 0;
}





/**
 * TODO
 * Indicates whether a node has a previous sibling.
 * Ignores comments and "invisible" strings.
 * @param {Node} node The node.
 * @returns {ChildNode?} True if the element has a previous sibling other than
 *                       a comment or an "invisible" string, null otherwise.
 */
function getPreviousSibling( node ) {
	var sibling = node.previousSibling;
	if ( !sibling ) {
		return null;
	}

	while ( isGhostNode( sibling ) ) {
		sibling = sibling.previousSibling;
		if ( !sibling ) {
			return null;
		}
	}

	return sibling;
}

/**
 * TODO
 * @param {Node} node The node.
 * @returns {ChildNode?}
 */
function getNextSibling( node ) {
	var sibling = node.nextSibling;
	if ( !sibling ) {
		return null;
	}

	while ( isGhostNode( sibling ) ) {
		sibling = sibling.nextSibling;
		if ( !sibling ) {
			return null;
		}
	}

	return sibling;
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
		/** @type {HTMLElement} */ // @ts-ignore
		const element = node;
		return element.classList.contains( 'mw-collapsible-toggle' ) ||
			element.classList.contains( skipClass );
	}

	return false;
}

/**
 * Whether the filters can be used on the current page.
 * @type {boolean}
 */
const filteringAvailable = isFilteringAvailable( currentTitle );

window.cf =
window.contentFilter = {
	filterMax: filterMax,
	isFilteringAvailable: isFilteringAvailable,
	parseView: parseView
};

safeAddContentHook( onContentLoaded );

} )( mediaWiki, document, console, Array.prototype );
// </nowiki>
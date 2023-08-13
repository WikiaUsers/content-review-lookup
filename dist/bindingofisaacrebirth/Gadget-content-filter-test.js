/**
 * Name:        TODO
 * Description: TODO
 */

// <nowiki>

( function ( mw, document, console, array ) {

if ( window.cf && window.cf.buttons ) {
	// already loaded
	return;
}

/** @this {( ...msg: string[] ) => void} */
function logger() {
	const args = array.slice.call( arguments );
	args.unshift( '[content-filter]' );
	this.apply( null, args );
}
const log   = logger.bind( console.log );
const warn  = logger.bind( mw.log.warn );
const error = logger.bind( mw.log.error );

log( 'Loading.' );

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
 * @type {string}
 */
const filtersInfoId = 'cf-info';

/**
 * MediaWiki configuration values.
 * @typedef MWConfig
 * 
 * @property {string} wgAction
 * The action being realised on the page (view, edit, history, etc.).
 * 
 * @property {string} wgArticlePath
 * The URL path to any article, by replacing $1 with the target page name.
 */

/**
 * MediaWiki configuration values.
 * @type {MWConfig}
 */
const config = mw.config.get( [ 'wgAction', 'wgArticlePath' ] );

// Note [EditModeFilter]:
//   No filtering in edit mode, it would require reloading the page.
if ( config.wgAction !== 'view' ) {
	return;
}

/**
 * The index of the currently selected filter form item.
 * @type {number?}
 */
var selectedIndex = null;

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
 * Gets the value of the URL parameter used to store the selected filter from an URL.
 * @param {string} [url] The URL, the current page one otherwise.
 * @returns {number?} The selected filter index, null if none has been specified.
 */
function getFilterParamValue( url ) {
	const value = mw.util.getParamValue( urlParam, url );
	return value ? parseInt( value, 10 ) : null;
}

/**
 * Either sets the value of, or removes, the URL parameter used to store the
 * selected filter from an URL.
 * @param {number?} value The selected filter index, null if none has been specified.
 * @param {string}  [url] The URL, the current page one otherwise.
 * @returns {string} The updated URL.
 */
function setFilterParamValue( value, url ) {
	const uri = new mw.Uri( url || document.location.href );

	if ( value === null ) {
		delete uri.query[ urlParam ];
	} else {
		uri.query[ urlParam ] = value;
	}

	return uri.toString();
}

/**
 * Updates the index of the currently selected filter.
 * @param {number?} index TODO
 */
function setSelectedIndex( index ) {
	selectedIndex = index;
	if ( selectedIndex === null ) {
		log( 'No filter used.' );
	} else {
		log( 'Using ' + Math.pow( 2, selectedIndex ) + ' as active filter.' );
	}
}

/**
 * Generates the filter menu and puts it on the page.
 * @param {HTMLElement[]} _
 * @param {number}        pageFilter
 */
function insertMenu( _, pageFilter ) {
	buttons.forEach( checkPageContext, pageFilter );

	const parent = menu.parentElement;
	if ( parent && parent.classList.contains( 'page-header__cf' ) ) {
		parent.remove();
	}

	const info = document.getElementById( filtersInfoId );
	if ( info ) {
		info.appendChild( menu );
		info.style.removeProperty( 'display' );
	} else {
		const headerMeta = document.getElementsByClassName( 'page-header__meta' )[ 0 ];
		if ( !headerMeta ) {
			// Note [MenuHeaderPanic]:
			//   Panicking here simply means that we couldn't place the buttons on
			//   the page. If this happens, we should either add a fallback location,
			//   or place the buttons somewhere other than in the page header.
			domPanic( 'Page header not found.' );
		}

		const headerWrapper = document.createElement( 'div' );
		headerWrapper.classList.add( 'page-header__cf' );
		headerWrapper.appendChild( menu );

		headerMeta.insertAdjacentElement( 'afterend', headerWrapper );
	}
}

/**
 * TODO
 * @this {number}
 * @param {HTMLLIElement} button
 */
function checkPageContext( button ) {
	const filterIndex = button.dataset.cfFilter;
	if ( !filterIndex ) {
		return;
	}

	if ( this & Math.pow( 2, +filterIndex ) ) {
		button.classList.remove( 'cf-button-deactivated' );
	} else {
		button.classList.add( 'cf-button-deactivated' );
	}
}

/**
 * TODO
 */
function createMenu() {
	const ul = document.createElement( 'ul' );
	ul.classList.add( 'wds-list', 'wds-is-linked' );
	buttons.forEach( ul.appendChild, ul );

	const content = document.createElement( 'div' );
	content.classList.add( 'wds-dropdown__content' );
	content.appendChild( ul );

	const dropdown = document.createElement( 'div' );
	dropdown.classList.add( 'wds-dropdown', 'cf-menu' );
	dropdown.append( toggle, content );
	return dropdown;
}

/**
 * TODO
 */
function createToggle() {
	const toggle = document.createElement( 'div' );
	toggle.classList.add( 'wds-dropdown__toggle' );
	return toggle;
}

/**
 * Generates a filter menu button.
 * @returns {HTMLLIElement}
 */
function createBaseButton() {
	const a = document.createElement( 'a' );
	a.href = setFilterParamValue( null );
	a.textContent = 'All versions';
	a.addEventListener( 'click', onButtonClick );

	const li = document.createElement( 'li' );
	li.id = 'cf-button-all';
	li.classList.add( 'cf-button' );
	li.appendChild( a );

	return li;
}

/**
 * TODO
 * @param {number} index
 * @param {string} title
 * @returns {HTMLLIElement}
 */
function createFilterButton( index, title ) {
	const titleSpan = document.createElement( 'span' );
	titleSpan.classList.add( 'cf-button-title' );
	titleSpan.textContent = title;

	const a = document.createElement( 'a' );
	a.href = setFilterParamValue( index );
	a.append( titleSpan, ' only' );
	a.addEventListener( 'click', onButtonClick );

	const li = document.createElement( 'li' );
	li.id = 'cf-button-' + index;
	li.classList.add( 'cf-button' );
	li.dataset.cfFilter = '' + index;
	li.appendChild( a );

	return li;
}

/**
 * TODO
 * @this {HTMLElement}
 * @param {MouseEvent} event
 */
function onButtonClick( event ) {
	const li          = this.parentElement || domPanic();
	const filterIndex = li.dataset.cfFilter || null;

	const filterValue = filterIndex ? +filterIndex : null;
	mw.hook( 'contentFilter.filter' ).fire( filterValue );

	window.history.replaceState( {}, '', setFilterParamValue( filterValue ) );
	event.preventDefault();
}

/**
 * Updates the selected filter button.
 * @param {number?} index The filter index.
 */
function updateActiveButton( index ) {
	const buttonIndex  = index === null ? 0 : index + 1;
	const activeButton = buttons[ buttonIndex ];
	if ( !activeButton ) {
		domPanic( 'Unregistrered button ' + buttonIndex + '.' );
	}

	buttons.forEach( unsetActiveButton );
	setActiveButton( activeButton );
}

/**
 * TODO
 * @param {HTMLLIElement} button
 */
function unsetActiveButton( button ) {
	button.classList.remove( 'cf-button-active' );
}

/**
 * TODO
 * @param {HTMLLIElement} button
 */
function setActiveButton( button ) {
	button.classList.add( 'cf-button-active' );
	const a = button.firstElementChild || domPanic();
	toggle.innerHTML = a.innerHTML +
		'<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron">' +
			'<use xlink:href="#wds-icons-dropdown-tiny"></use>' +
		'</svg>';
}

/**
 * TODO
 * @param {number?} index
 */
function updateView( index ) {
	const activeViewFragments = document.getElementsByClassName( 'cf-view-active' );
	while ( activeViewFragments[ 0 ] ) {
		removeViewFragmentVisibility( activeViewFragments[ 0 ] );
	}

	array.forEach.call(
		document.getElementsByTagName( 'a' ),
		updateAnchorFilter
	);

	if ( index === null ) {
		return;
	}

	cf.parseView( index );

	array.forEach.call(
		document.getElementsByClassName( 'cf-view-' + index ),
		addViewFragmentVisibility
	);
}

/**
 * TODO
 * @param {HTMLElement} viewFragment
 */
function addViewFragmentVisibility( viewFragment ) {
	viewFragment.classList.add( 'cf-view-active' );
}

/**
 * TODO
 * @param {HTMLElement} viewFragment
 */
function removeViewFragmentVisibility( viewFragment ) {
	viewFragment.classList.remove( 'cf-view-active' );
}

/**
 * Adds a corresponding filter URL parameter to an anchor if none is used.
 * @param {HTMLAnchorElement} a The anchor.
 */
function updateAnchorFilter( a ) {
	if ( !a.parentElement ) {
		domPanic();
	}

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

	const match = uri.path.match(
		mw.util
			.escapeRegExp( config.wgArticlePath )
			.replace( '\\$1', '(.*)' )
	);

	if ( !match || !match[ 1 ] ) {
		return;
	}

	const pageTitle = new mw.Title( mw.Uri.decode( match[ 1 ] ) );
	if ( !cf.isFilteringAvailable( pageTitle ) ) {
		return;
	}

	a.href = setFilterParamValue( selectedIndex, a.href );
}

/**
 * TODO
 * @type {HTMLLIElement[]}
 */
const buttons = [
	createBaseButton(),
	createFilterButton( 0, 'Rebirth' ),
	createFilterButton( 1, 'Afterbirth' ),
	createFilterButton( 2, 'Afterbirth+' ),
	createFilterButton( 3, 'Repentance' )
];

/**
 * TODO
 * @type {HTMLDivElement}
 */
const toggle = createToggle();

/**
 * TODO
 * @type {HTMLDivElement}
 */
const menu = createMenu();

/**
 * TODO
 * @type {number | null}
 */
const paramValue = getFilterParamValue();

mw.hook( 'contentFilter.filter' )
	.fire( paramValue )
	.add( setSelectedIndex );

mw.hook( 'contentFilter.content' )
	.add( insertMenu )
	.add( function onFirstContentParsed() {
		mw.hook( 'contentFilter.content' )
			.remove( onFirstContentParsed );
		mw.hook( 'contentFilter.filter' )
			.add( updateView )
			.add( updateActiveButton );
	} );


// Note [UsingCore]:
//   All code parts requiring the use of the core module are moved behinds
//   hooks. These hooks should be fired from the core module itself,
//   so there is no point in waiting for it to load.
mw.loader.using( 'ext.gadget.content-filter-core', function () {
	$.extend( cf, {
		paramValue: paramValue,
		buttons: buttons
	} );
} );

} )( mediaWiki, document, console, Array.prototype );
// </nowiki>
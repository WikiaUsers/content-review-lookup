/**
 * Name:        Tooltips script
 * Description: Add custom tooltips to the page content.
 */

// <nowiki>
( function ( $, mw, array ) {

/**
 * Called when some text should be processed.
 * @param {JQuery} $content The content element to process.
 */
function onContentLoaded( $content ) {
	init( $content[ 0 ] );
}

/**
 * The MediaWiki API.
 */
const api = new mw.Api();
/**
 * The tooltip wrapper.
 * @type {HTMLElement}
 */
var wrapper = null;
/**
 * The tooltip elements within the wrapper.
 * @type {Map<String, Element>}
 */
const targets = new Map();

/**
 * Initializes all tooltips in a container.
 * @param {Element} container The container.
 */
function init( container ) {
	array.forEach.call(
		container.getElementsByClassName( 'tooltip' ),
		initTooltip
	);
}

/**
 * Initializes a tooltip.
 * @param {HTMLElement} source The tooltip source element.
 */
function initTooltip( source ) {
	const template = source.dataset.tooltip;
	if ( !template ) {
		if ( !source.title ) {
			source.classList.remove( 'tooltip' );
			source.classList.add( 'tooltip-invalid' );
			return;
		}

		source.title = '';
		source.addEventListener( 'mouseenter', showTooltip );
		source.addEventListener( 'mouseleave', hideTooltip );

		const target = document.createElement( 'div' );
		target.textContent = source.title;
		target.classList.add( 'tooltip-content' );
		targets.set( template, target );

		appendTooltip( target );
		showTooltip.call( source );
		return;
	}

	source.addEventListener( 'mouseenter', createTooltip, { once: true } );

	const as = source.getElementsByTagName( 'a' );
	for ( var i = as.length - 1; i >= 0; --i ) {
		as[ i ].title = '';
	}
}

/**
 * Generates the tooltip used on an element from its corresponding data.
 * @this HTMLElement
 */
function createTooltip() {
	const source   = this;
	const template = source.dataset.tooltip;

	if ( targets.has( template ) ) {
		source.addEventListener( 'mouseenter', showTooltip );
		source.addEventListener( 'mouseleave', hideTooltip );
		showTooltip.call( source );
		return;
	}

	api.parse( '{{' + template + '}}' ).done( function ( output ) {
		const target = stringToElements( output );
		target.classList.add( 'tooltip-content' );
		source.addEventListener( 'mouseenter', showTooltip );
		source.addEventListener( 'mouseleave', hideTooltip );
		targets.set( template, target );

		appendTooltip( target );
		if ( source.matches( ':hover' ) ) {
			showTooltip.call( source );
		}
	} );
}

/**
 * Appends a tooltip to the tooltip wrapper.
 * @param {Element} tooltip The tooltip.
 */
function appendTooltip( tooltip ) {
	array.forEach.call(
		tooltip.getElementsByClassName( 'infobox2-slideshow' ),
		function ( e ) { e.classList.add( 'infobox2-slideshow-auto' ); }
	);

	if ( !wrapper ) {
		wrapper = document.createElement( 'div' );
		wrapper.id = 'tooltip-wrapper';
		document.addEventListener( 'mousemove', updateWrapper );
		document
			.getElementById( 'mw-content-text' )
			.appendChild( wrapper );
	}

	wrapper.appendChild( tooltip );
	mw.hook( 'wikipage.content' ).fire( $( tooltip ) );
}

/**
 * Shows a tooltip.
 * @this HTMLElement
 */
function showTooltip() {
	wrapper.classList.add( 'tooltip-wrapper-active' );
	targets
		.get( this.dataset.tooltip )
		.classList.add( 'tooltip-content-active' );
}

/**
 * Hides a tooltip.
 * @this HTMLElement
 */
function hideTooltip() {
	wrapper.classList.remove( 'tooltip-wrapper-active' );
	targets
		.get( this.dataset.tooltip )
		.classList.remove( 'tooltip-content-active' );
}

/**
 * Updates the position of the tooltip wrapper.
 * @param {MouseEvent} event The mouse moving event.
 */
function updateWrapper( event ) {
	wrapper.style.left = event.clientX + 'px';
	wrapper.style.top  = event.clientY + 'px';
}

/**
 * Generates DOM elements from a string.
 * @param {string} str The DOM string.
 * @returns The generated DOM elements.
 */
function stringToElements( str ) {
	const template = document.createElement( 'template' );
	template.innerHTML = str;
	return template.content.firstElementChild;
}

mw.hook( 'wikipage.content' ).add( onContentLoaded );

} )( jQuery, mediaWiki, Array.prototype );
// </nowiki>
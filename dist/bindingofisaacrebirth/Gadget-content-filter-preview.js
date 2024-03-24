/**
 * Name:        TODO
 * Description: TODO
 */

// <nowiki>

( function ( mw, document, array ) {

/**
 * TODO
 * @param {HTMLLIElement} button
 */
function setButtonEvents( button ) {
	button.addEventListener( 'mouseenter', onButtonEnter );
	button.addEventListener( 'mouseleave', onButtonLeave );
}

/**
 * TODO
 * @this {HTMLElement}
 */
function onButtonEnter() {
	const filterIndex = this.dataset.cfFilter;
	if ( !filterIndex ) {
		return;
	}

	// we do not know whether the view is computed when the page is loaded
	// or lazily when the associated filter is activated.
	cf.parseView( +filterIndex );

	const viewFragments = document.getElementsByClassName( 'cf-view-' + filterIndex );
	array.forEach.call( viewFragments, addViewFragmentHighlighting );
}

/**
 * TODO
 * @this {HTMLElement}
 */
function onButtonLeave() {
	const filterIndex = this.dataset.cfFilter;
	if ( filterIndex ) {
		const viewFragments = document.getElementsByClassName( 'cf-view-' + filterIndex );
		array.forEach.call( viewFragments, removeViewFragmentHighlighting );
	}
}

/**
 * TODO
 * @param {HTMLElement} viewFragment
 */
function addViewFragmentHighlighting( viewFragment ) {
	viewFragment.classList.add( 'cf-view-hover' );
}

/**
 * TODO
 * @param {HTMLElement} viewFragment
 */
function removeViewFragmentHighlighting( viewFragment ) {
	viewFragment.classList.remove( 'cf-view-hover' );
}

mw.hook( 'contentFilter.content' ).add( function onContentSet() {
	mw.hook( 'contentFilter.content' ).remove( onContentSet );
	mw.loader.using( 'ext.gadget.content-filter-test', function () {
		cf.buttons.forEach( setButtonEvents );
	} );
} );

} )( mediaWiki, document, Array.prototype );
// </nowiki>
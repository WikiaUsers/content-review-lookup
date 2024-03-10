/**
 * Name:        Tooltips script
 * Author:      Derugon
 * Description: Add custom tooltips to the page content.
 */

// <nowiki>
( function () {

var tooltips = {
	/**
	 * The MediaWiki API.
	 */
	api: new mw.Api(),
	/**
	 * The tooltip wrapper.
	 * @type {HTMLElement}
	 */
	wrapper: null,
	/**
	 * The tooltip elements within the wrapper.
	 * @type {Map<String, Element>}
	 */
	targets: new Map(),

	/**
	 * Initializes all tooltips in a container.
	 */
	init: function () {
		Array.prototype.forEach.call(
			document.getElementsByClassName( 'tooltip' ),
			tooltips.initTooltip
		);
	},

	/**
	 * Initializes a tooltip.
	 * @param {HTMLElement} source The tooltip source element.
	 */
	initTooltip: function ( source ) {
		var template = source.dataset.tooltip;
		if ( !template ) {
			if ( !source.title ) {
				source.classList.remove( 'tooltip' );
				source.classList.add( 'tooltip-invalid' );
				return;
			}
			var target = document.createElement( 'div' );
			target.textContent = source.title;
			source.title = '';
			target.classList.add( 'tooltip-content' );
			source.addEventListener( 'mouseenter', tooltips.showTooltip );
			source.addEventListener( 'mouseleave', tooltips.hideTooltip );
			tooltips.targets.set( template, target );
			tooltips.appendTooltip( target );
			tooltips.showTooltip.call( source );
			return;
		}
		source.addEventListener(
			'mouseenter', tooltips.createTooltip, { once: true }
		);
		var as = source.getElementsByTagName( 'a' );
		for ( var i = as.length - 1; i >= 0; --i ) {
			as[ i ].title = '';
		}
	},

	/**
	 * Generates the tooltip used on an element from its corresponding data.
	 * @this HTMLElement
	 */
	createTooltip: function () {
		var source   = this,
			template = source.dataset.tooltip;
		if ( tooltips.targets.has( template ) ) {
			source.addEventListener( 'mouseenter', tooltips.showTooltip );
			source.addEventListener( 'mouseleave', tooltips.hideTooltip );
			tooltips.showTooltip.call( source );
			return;
		}
		tooltips.api
			.parse( '{{' + template + '}}' )
			.done( function ( output ) {
				var target            = tooltips.stringToElements( output ),
					enabledSlideshows = window.slideshows.init( target );
				target.classList.add( 'tooltip-content' );
				for ( var i in enabledSlideshows ) {
					window.slideshows.makeAuto( enabledSlideshows[ i ] );
				}
				if ( window.contentFilterUtil ) {
					window.contentFilterUtil.applyFilter( target );
				}
				source.addEventListener( 'mouseenter', tooltips.showTooltip );
				source.addEventListener( 'mouseleave', tooltips.hideTooltip );
				tooltips.targets.set( template, target );
				tooltips.appendTooltip( target );
				if ( source.matches( ':hover' ) ) {
					tooltips.showTooltip.call( source );
				}
			} );
	},

	/**
	 * Appends a tooltip to the tooltip wrapper.
	 * @param {Element} tooltip The tooltip.
	 */
	appendTooltip: function ( tooltip ) {
		if ( tooltips.wrapper ) {
			tooltips.wrapper.appendChild( tooltip );
			return;
		}
		tooltips.wrapper = document.createElement( 'div' );
		tooltips.wrapper.id = 'tooltip-wrapper';
		tooltips.wrapper.appendChild( tooltip );
		document.addEventListener( 'mousemove', tooltips.updateWrapper );
		document
			.getElementById( 'mw-content-text' )
			.appendChild( tooltips.wrapper );
	},

	/**
	 * Shows a tooltip.
	 * @this HTMLElement
	 */
	showTooltip: function () {
		tooltips.wrapper.classList.add( 'tooltip-wrapper-active' );
		tooltips.targets
			.get( this.dataset.tooltip )
			.classList.add( 'tooltip-content-active' );
	},

	/**
	 * Hides a tooltip.
	 * @this HTMLElement
	 */
	hideTooltip: function () {
		tooltips.wrapper.classList.remove( 'tooltip-wrapper-active' );
		tooltips.targets
			.get( this.dataset.tooltip )
			.classList.remove( 'tooltip-content-active' );
	},

	/**
	 * Updates the position of the tooltip wrapper.
	 * @param {MouseEvent} event The mouse moving event.
	 */
	updateWrapper: function ( event ) {
		tooltips.wrapper.style.left = event.clientX + 'px';
		tooltips.wrapper.style.top  = event.clientY + 'px';
	},

	/**
	 * Generates DOM elements from a string.
	 * @param {string} str The DOM string.
	 * @returns The generated DOM elements.
	 */
	stringToElements: function ( str ) {
		var template = document.createElement( 'template' );
		template.innerHTML = str;
		return template.content.firstElementChild;
	}
};

tooltips.init();
} )();
// </nowiki>
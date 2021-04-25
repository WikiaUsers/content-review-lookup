var tooltips = {
	/**
	 * The MediaWiki API.
	 */
	api: new mw.Api(),
	/**
	 * The tooltip wrapper.
	 * @type {JQuery}
	 */
	$wrapper: null,
	/**
	 * The elements tooltips should be displayed on.
	 * @type {JQuery}
	 */
	$sources: null,
	/**
	 * The tooltip elements within the wrapper.
	 * @type {Map<String, JQuery>}
	 */
	targets: new Map(),

	/**
	 * Initializes the gadget.
	 */
	init: function () {
		tooltips.$wrapper = $( '<div id="tooltip-wrapper">\
			<div class="tooltip-background tooltip-background-top-left"></div>\
			<div class="tooltip-background tooltip-background-top"></div>\
			<div class="tooltip-background tooltip-background-top-right"></div>\
			<div class="tooltip-background tooltip-background-left"></div>\
			<div class="tooltip-background tooltip-background-right"></div>\
			<div class="tooltip-background tooltip-background-bottom-left"></div>\
			<div class="tooltip-background tooltip-background-bottom"></div>\
			<div class="tooltip-background tooltip-background-bottom-right"></div>\
			</div>' ).appendTo( '.mw-parser-output' );
		tooltips.$sources = $( '.tooltip' )
			.each( tooltips.initTooltip )
			.one( 'mouseenter', tooltips.createTooltip );
		$( document ).on( 'mousemove', tooltips.updateWrapperPosition );
	},

	/**
	 * Initializes a tooltip.
	 * @this HTMLElement
	 */
	initTooltip: function () {
		var $source = $( this );
		var template = $source.data( 'tooltip' );
		if ( !template ) {
			$source
				.removeClass( 'tooltip' )
				.addClass( 'tooltip-invalid' );
			return;
		}
		$source.find( 'a' ).attr( 'title', '' );
	},

	/**
	 * Generates the tooltip used on an element from its corresponding data.
	 * @this HTMLElement
	 */
	createTooltip: function () {
		var $source = $( this );
		var template = $source.data( 'tooltip' );
		tooltips.api
			.parse( '\n<div>{{' + template + '}}</div>' )
			.done( function ( output ) {
				var $target = $( output )
					.children( ':first' )
					.addClass( 'tooltip-content' )
					.appendTo( tooltips.$wrapper );
				tooltips.targets.set( template, $target );
				loadSlideshows( $target, 1500 ); // TODO: remove
				$target
					.find( '.infobox2-slideshow:not( .infobox2-slideshow-auto )' )
					.addClass( 'infobox2-slideshow-auto' );
				dlcUtil.update( $target.get( 0 ) );
				slideshows.init( $target );
				$source.on( {
					mouseenter: tooltips.showTooltip,
					mouseleave: tooltips.hideTooltip
				} );
				if ( $source.is( ':hover' ) ) {
					$source.each( tooltips.showTooltip );
				}
			} );
	},

	/**
	 * Shows a tooltip.
	 * @this HTMLElement
	 */
	showTooltip: function () {
		tooltips.$wrapper.addClass( 'tooltip-wrapper-active' );
		var template = $( this ).data( 'tooltip' );
		tooltips.targets.get( template ).addClass( 'tooltip-content-active' );
	},

	/**
	 * Hides a tooltip.
	 * @this HTMLElement
	 */
	hideTooltip: function () {
		tooltips.$wrapper.removeClass( 'tooltip-wrapper-active' );
		var template = $( this ).data( 'tooltip' );
		tooltips.targets.get( template ).removeClass( 'tooltip-content-active' );
	},

	/**
	 * Updates the position of the tooltip wrapper.
	 * @param {JQuery.MouseMoveEvent} event The mouse moving event.
	 */
	updateWrapperPosition: function ( event ) {
		tooltips.$wrapper.css( {
			left: event.clientX + 'px',
			top : event.clientY + 'px'
		} );
	}
};

$( tooltips.init );
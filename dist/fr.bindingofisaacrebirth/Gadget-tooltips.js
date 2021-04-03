$( function() {
	var $tooltipWrapper = $( '<div id="tooltip-wrapper">\
		<div class="tooltip-background tooltip-background-top-left"></div>\
		<div class="tooltip-background tooltip-background-top"></div>\
		<div class="tooltip-background tooltip-background-top-right"></div>\
		<div class="tooltip-background tooltip-background-left"></div>\
		<div class="tooltip-background tooltip-background-right"></div>\
		<div class="tooltip-background tooltip-background-bottom-left"></div>\
		<div class="tooltip-background tooltip-background-bottom"></div>\
		<div class="tooltip-background tooltip-background-bottom-right"></div>\
		</div>' ).hide().appendTo( '.mw-parser-output' );
	$( document ).on( 'mousemove', function( event ) { $tooltipWrapper.css( {
		left: event.clientX + 'px',
		top : event.clientY + 'px'
	} ) } );
	
	var $tooltipTexts = $( '.tooltip' ),
		wikitexts = [],
		wikitext = '';
	$tooltipTexts.each( function() {
		var $this = $( this );
		var template = $this.data( 'tooltip' );
		if ( !template ) {
			$this.removeClass( 'tooltip' );
			return;
		}
		if ( wikitext.length > 5000 ) {
			wikitexts.push( wikitext );
			wikitext = '';
		}
		wikitext += '\n<div>{{' + template + '}}</div>';
		$this.find( 'a' ).attr( 'title', '' );
	} );
	wikitexts.push( wikitext );
	
	var api = new mw.Api();
	$.when.apply( null, wikitexts.map( function( wikitext ) {
		return api.parse( wikitext );
	} ) ).done( function () {
		var $tooltips = $( Array.prototype.join.call( arguments , '' ) )
			.children( '.mw-parser-output > *' )
			.hide();
		$tooltipTexts.each( function( index ) {
			var $tooltip = $( $tooltips.get( index ) );
			$( this ).hover( function() {
				$tooltipWrapper.show();
				$tooltip.show();
			}, function () {
				$tooltipWrapper.hide();
				$tooltip.hide();
			} );
		} );
		$tooltipWrapper.append( $tooltips );
		loadSlideshows( $tooltips, 1500 );
	} );
} );
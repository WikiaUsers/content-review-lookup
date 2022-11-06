$(function () {
	if ( !$( '.jump' ).length ) return;

	var $target;
	var $button = $( '<button>' )
		.addClass( 'page-side-tool backtojump' )
		.attr( 'data-wds-tooltip', 'Вернуться' )
		.attr( 'data-wds-tooltip-position', 'right' )
		.prop( 'disabled', true )
		.append( '<svg class="wds-icon is-reply wds-icon-small" style="transform: scale(-1, 1)"><use xlink:href="#wds-icons-reply-small"></use></svg>' )
		.appendTo( '.page-side-tools' );
	setupTooltip( $button );

	function addEvent( where ) {
		$button.off();
		$button.prop( 'disabled', false );
		$button.on( 'click', function () {
			$button.prop( 'disabled', true );
			$target = $( where );
			$target.scrollView();
			$target.css( 'background-color', 'rgba(var(--theme-link-color--rgb),.2)' );
		} );
	}

	$( '.jump a' ).on('click', function () {
		addEvent( this );
		$target.css( 'background-color', '' );
	} );
	
});
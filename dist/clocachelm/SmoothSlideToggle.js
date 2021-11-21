/**
 * @title        smooth slide toggle
 * @description  animate the collapsible-panel with a sliding motion
 * @author       clodaghelm
 * @source       clocachelm.fandom.com
 * @version      1.0.2
 * @license      CC-BY-SA-4.0
 */

$( function() {
	$( '.wds-collapsible-panel__content' ).hide();
		$( '.wds-collapsible-panel__header' ).stop().click( function() {
			$( this ).closest( '.wds-collapsible-panel' ).find( '.wds-collapsible-panel__content' ).slideToggle( 250 );
			$( this ).toggleClass( '.wds-collapsible-panel__header' );
			$( '.wds-collapsible-panel__header .wds-icon' ).css({
				'transform': 'rotate( '+ ( r += 180 ) + 'deg)',
				'transition-delay': '2s'
			});
		return false;
		});
	$( '.wds-collapsible-panel__header .wds-icon' ).remove();
	$( '.wds-collapsible-panel__header' ).append( '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-menu-control-small"></use></svg>' );
});
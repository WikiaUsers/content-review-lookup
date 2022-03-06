/* Any JavaScript here will be loaded for all users on every page load. */
// sets position for tooltip
window.tooltips_config = {
    offsetX: -10,
    offsetY:  -10,
    noCSS: true,
}
//creates custom classes for tooltips
window.tooltips_list = [
    {
        classname: 'mapguitooltip',
        parse: "<div class='fadein'><#parameter#></div>",
    }
];
window.ftbw.animation = function() {
    //Based on http://www.minecraftwiki.net/wiki/MediaWiki:Common.js
	//Based from https://ftbwiki.org/MediaWiki:Common.js
	if ( window.ftbw.animate === undefined && $( '.animated' ).length ) {
		window.ftbw.animate = setInterval( function() {
			$( '.animated' ).each( function() {
				var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
				if ( !current.next().length ) {
					next = $( this ).children().eq( 0 );
				}
				next.addClass( 'active' );
			} );
		}, 2000 );
	}
};
window.ftbw.animation();
/* Any JavaScript here will be loaded for all users on every page load. */
// sets position for tooltip

window.tooltips_config = {
	offsetX: -5,
    offsetY: 20,
    noCSS: true,
    waitForImages: true,
};
window.dev = window.dev || [];
window.dev.userBadge = {

};
window.MessageWallUserTags = {
    tagColor: 'red',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'TripleLuxen': 'Administrator',
    }
    
};
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { order: 1 },
		sysop: { order: 2 },
		treadmoderator: { u: 'Wiki Moderator', order: 3},
		supereditor: { u: 'Wiki Editor', order: 4},
	},
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups =  ['bureaucrat', 'threadmoderator', 'content-moderator', 'sysop', 'supereditor' ];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	threadmoderator: ['sysop', 'bureaucrat'],
	'content-moderator': ['sysop', 'threadmoderator' ,'bureaucrat'],
	supereditor: ['threadmoderator', 'content-moderator' , 'sysop', 'bureaucrat'],
};



$(document).ready(function() {
    $('.loadwait').show();
});
mw.hook( 'wikipage.content' ).add( function( $wikipageContent ) {
$( function() {
/**
 * Element animator
 *
 * Cycles through a set of elements (or "frames") on a 2 second timer per frame
 * Add the "animated" class to the frame containing the elements to animate.
 * Optionally, add the "animated-active" class to the frame to display first.
 * Optionally, add the "animated-subframe" class to a frame, and the
 * "animated-active" class to a subframe within, in order to designate a set of
 * subframes which will only be cycled every time the parent frame is displayed.
 *
 * Requires some styling from [[MediaWiki:Common.css]].
 */
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );
});
});
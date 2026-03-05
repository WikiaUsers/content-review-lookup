/* Any JavaScript here will be loaded for all users on every page load. */

// **********************************************
// User Tags - http://dev.wikia.com/wiki/UserTags
// **********************************************

window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'GMA Network Wiki:Staff#Bureaucrat', order:1 },
                sysop: { link:'GMA Network Wiki:Staff#Administrator', order:2 },
                moderator: { u:'Moderator', link:'GMA Network Wiki:Staff#Moderator', order:3 },
                formermoderator: { u:'Former Moderator', link:'GMA Network Wiki:Staff#Former staff members', order:3 },
                assistantmoderator: { u:'Assistant Moderator', link:'Project:Staff#Assistant Moderator', order:4 }
	}
};
UserTagsJS.modules.custom = {
        'ThisIsSeanJ': ['moderator'],
        'Emmatthew': ['assistantmoderator'],
        'SuperMario23110': ['assistantmoderator'],
        'Tvelasco577': ['formermoderator']
};

// *********************************
// Positioning for Template:PageTags
// *********************************

$('.page-header__actions').prepend( $( '#pagetags' ) );
$( '#pagetags' ).css( { 'float' : 'left', 'margin-right' : '15px', 'margin-top' : '5px' } ).show();

/* MultiClock Philippines Configuration */
window.MultiClockConfig = {
    interval: 500, 
    clocks: [
        {
            label: "Philippines",
            offset: 8,
            format: "%H:%M:%S %b %d %Y"
        },
        {
            label: "UTC",
            offset: 0,
            format: "%H:%M:%S %b %d %Y"
        }
    ]
};
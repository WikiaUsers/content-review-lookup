// Comments using the asterisk/slash format (/**/) are section headers (for multiple different scripts with similar functions). 
// The slash (//) comments are for stand-alone scripts/config.

/*
*****
********** ImportJS Config
*****
*/
// LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.piboxkeepprev = true;
window.pPreview.RegExp.iclasses = ['nolp'];
window.pPreview.defimage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAQAAACwAAAAAAQABAAACAkQBADs=';
window.pPreview.delay = 10;

// AbuseLogRC 
window.abuseLogRC_entries = 5;
window.abuseLogRC_showTo = [ 'content-moderator' ];
// window.abuseLogRC_users = [ 'USER' , 'USER' ];
window.abuseLogRC_userInfo = true;

// UTCClock
window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)',
    interval: 600, /* How often the timer updates in milliseconds (1000=1 second) */
    location: 'header',
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
};

/*
***
***** UserTagsJS Config
***
*/
// Init
window.UserTagsJS = {
    modules: {},
    tags: {},
    oasisPlaceBefore: ''
};

// Setting the inactive threshold 
UserTagsJS.modules.inactive = {
    days: 30, zeroIsInactive: true
};

// Ordering
window.UserTagsJS = {
    modules: {},
    tags: {
        inactive: { order: -2 },
        bot: { link:'Help:Bots', order: -1 },
        bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
        sysop: { order: 1 },
        'content-moderator': { order: 2 },
        threadmoderator: { order: 3 }
    }
};

// Creating Tags
window.UserTagsJS = {
    modules: {},
    tags: {
        // groupname: { u:'Text when users sex is not listed', m:'When user is male', f:'When user is female', link:'Link the tag should lead to', title:'Text to display on hover', order:-1/0 }
        'inactive-bureaucrat': { u:'Inactive Bureaucrat', title:'This Bureaucrat is inactive.'},
        'inactive-sysop': { u:'Inactive Administrator', title:'This Administrator is inactive.'},
        'half-admin': { u:'Half-Admin', title:'This user has both the Content and Discussions moderator groups.'}
    }
};
// The order parameter is a number from negative infinity to positive infinity, lower numbers are closer to the start. In this case -1/0 is negative infinity so the tag will be placed at start.

// Assigning Tags
UserTagsJS.modules.custom = {
    //'Username': ['tag', 'tag', 'tag']
};

// Remove tag from a user
UserTagsJS.modules.userfilter = {
    //'UserName': ['tag'], // User never has the tag
};

// Remove tags from groups
UserTagsJS.modules.metafilter = {
    'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
    'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
};

// Combine group tags into a custom one
UserTagsJS.modules.implode = {
    'inactive-bureaucrat': ['bureaucrat', 'inactive'], // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive
    'inactive-sysop': ['sysop', 'inactive'],
    'half-sysop': ['threadmoderator', 'patroller', 'rollback']
};

// Add a tag to a user who has groups
// This module is the same as implode above, except without the combination part. That is, the groups you use will not be removed.
UserTagsJS.modules.explode = {
    //'vandal-patrol': ['rollback', 'patroller'] // Adds 'vandal-patrol' group BUT does NOT remove rollback or patroller
};

// Controlling where the tags are put
// The oasisPlaceBefore option allows you to control where the tags are positioned in the Oasis header. By default, 
// they are always placed at the end like the Fandom ones but you are free to change this by specifying a CSS 
// (jQuery) selector for this option. For example, if you would like to place the tags after the H1 (user name), 
// but before the H2 (real name) then you would do this:
// window.UserTagsJS = {
//     modules: {},
//     tags: {},
//     oasisPlaceBefore: '> h2' // Place tags before the H2
// };

// Tag new accounts as such
UserTagsJS.modules.autoconfirmed = true; // Switch on

// Tags users new to our Wiki
UserTagsJS.modules.newuser = {
    days: 10, // Must have been on the Wiki for 10 days
    edits: 10, // And have at least 10 edits to remove the tag
};

/*
***
***** End
***
*/

// FileUsageAuto-update
window.LIRoptions = {
    bottomMessage: '',
    delay: 1000
};

// InputUsername
// Adds a class to all usernames
window.UsernameReplaceSelector = '.inputUsername';

// Nuke 
window.nukeDeleteReason = "Cleanup of pages created by $1";
window.nukeDelay = 100;
window.nukeTitle = "Mass delete all pages created by this user";

// AjaxBatchDelete
window.batchDeleteDelay = 100;

// Done to dev:DupImageList/code.js

/*
*****
********** End
*****
*/
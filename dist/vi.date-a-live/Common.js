/* Any JavaScript here will be loaded for all users on every page load. */

/*******************/
    /* Spoiler overlay */
    /*******************/

     // This script must always be the very first executed

    var lastVisit = window.localStorage.getItem('spoilerCache'); // Gets the timestamp of the last visit stored in the cache
    var thisVisit = Date.now(); // Returns the current time in milliseconds
    var howLong = thisVisit - lastVisit; // Checks how much time has passed since the last visit
    if (howLong < 2592000000) { // If it's been less than one month since the last visit
        $('#spoiler-overlay').remove(); // Removes the alert
    }
    $('#show-spoilers').click(function () { // When clicking the button to remove spoilers
    $('#spoiler-overlay').remove(); // Removes the alert
        localStorage.setItem("spoilerCache", thisVisit); // Saves the timestamp of this visit
    });

    // Adds button to rehide spoilers to the row of buttons
    if ($.inArray("Spoilers", mw.config.get('wgCategories')) > -1) {
        $('#WikiaPageHeader').append('<a id="reset-spoilers" class="wikia-button secondary" style="margin-right: 10px;">Rehide spoilers</a>');
        $('#reset-spoilers').click(function () {
            localStorage.removeItem('spoilerCache');
            location.reload();
        });
    }

//Import Scripts
importArticles({
    type: 'script',
    articles: [
        'u:dev:BackToTopButton/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:DisplayClock/code.js',
        'u:onepiece:MediaWiki:Common.js/togglers.js',
    ]
});
//End Script Import

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'phantom' }, // Change "Bureaucrat" to "Phantom"
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat', 'founder'], // Remove administrator group from bureaucrats
    bureaucrat: ['founder'] //Remove bureaucrat group from founder
};

UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 20, // And have at least 20 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
/* Any JavaScript here will be loaded for all users on every page load. */

/*** BORDER COLOR INFOBOX ***/
(function() {
	// Function to check for Portable Infoboxes, and change their color
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			var color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) {
				$PI.css('border', '1px solid #' + color);
			}
		});
	};
	// Run it right now
	changeColors();
})();

/*** CUSTOM USER TAGS ***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bureaucrat: {
            u: 'AROHA',
            link: 'http://aroha.fandom.com/wiki/Special:ListUsers/bureaucrat',
            order:-1/0
        },
        sysop: { 
            u: 'FANCLUB LEADER',
            link: 'http://aroha.fandom.com/wiki/Special:ListUsers/sysop',
            order: -1/0
        },
		inactive: { u: 'LEFT THE FANDOM' },
	}
    };
 
// Add custom groups to several users
UserTagsJS.modules.custom = {
 
};
 
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 40, // And have at least 40 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
 
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat', 
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];
 
UserTagsJS.modules.metafilter = {
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
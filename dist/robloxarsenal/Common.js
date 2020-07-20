/* Any JavaScript here will be loaded for all users on every page load. */

/* Additional staff user tags. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { u:'associated tag data' }
		cssmanager: { u:'CSS' }, // CSS manager. Up to two should be given at a time.
		jsmanager: { u:'JS' }, // JavaScript manager. Up to two should be given at a time.
		cssandjsmanager: { u:'CSS and JS' }, // Combination tag. Requires both the CSS and JS manager tags to have been given.
		rolve: { u:'ROLVe', order:-1/0 }, // ROLVe staff member. Given upon request and subsequent verification.
		notableuser: { u:'Arsenal Contributor', order: -1/0 }, // A verified Arsenal contributor. Given upon verification of user. Replace with ROLVe if user is ROLVe team member.
		gfxartist: { u:'GFX Artist'}, // The Wikia's main graphics artist. Held by Dekanaia.
		templates: { u:'Templates' }, // Template manager. Manages infoboxes and various templates on the wikia.
		subsysop: { u:'Community Manager' }, // Sub administrator. Combo tag: see implode module.
	}
};

/* Special user tags are added to users here. */
UserTagsJS.modules.custom = {
    'LazyByte': ['cssmanager', 'jsmanager', 'templates'], // Current CSS, JS Manager (and templates)
    'Tadofsalt': ['rolve'], // ROLVe Staff 1
    'Tctully': ['rolve'], // ROLVe Staff 2
    'Mightyplate': ['rolve'], // ROLVe Staff 3
    'SNKerdoodles': ['rolve'], // ROLVe Staff 4
    'LeBombastique': ['rolve'], // ROLVe Staff 5
    'Celtion': ['notableuser'], // Arsenal Contributor 1. Verified in Discord.
    'Dekanaia': ['notableuser', 'gfxartist'], // Arsenal and Wiki Contributor 2. Verified in Discord.
    'Bearjedi': ['notableuser'], // Arsenal Contributor 3. Verified in Discord.
};

/* UserTags metafilter configuration. Removes tags from certain groups. */
UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat', 'founder', 'rolve'],
    'bureaucrat': ['founder'],
    'chatmoderator': ['sysop', 'bureaucrat']
};

/* Combines tags if the user has filled the prerequisite groups. */
UserTagsJS.modules.implode = {
    'cssandjsmanager': ['cssmanager', 'jsmanager'], // Adds the cssandjsmanager tag to a user if they have both css and js group tags.
    'subsysop': ['content-moderator', 'threadmoderator'] // Adds the subsysop tag to users who are both content moderators and discussion moderators.
};

/* Set-up for RailWAM enhancement. */
window.railWAM = {
    logPage:"Project:WAM Log"
};
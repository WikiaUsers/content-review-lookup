/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
                fmi: 'Hellhound User',
                fm2: 'Mantazz User',
                fm3: 'WinBee User',
                fm4: 'Capsule J User',
                fm5: 'Hitmontop User',
                hel: 'The Co-Leader',
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
        'FistMan Is Back': ['fm3'],

};
UserTagsJS.modules.metafilter = {
	'sysop': ['founder'], // Remove "Admin" tag from bureaucrats
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
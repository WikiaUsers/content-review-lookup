/* Any JavaScript here will be loaded for all users on every page load. */

// temporary bug fix for homepage portal template
$(".page-Herpetoculture_Wiki p > br").remove();

// UserTags
// see http://dev.wikia.com/wiki/UserTags

window.UserTagsJS = {
	modules: {},
	tags: {
		admin: { u: 'Admin', order: 1 },
		bureaucrat: { u: 'Bureaucrat', order: 2 }
	}
};

UserTagsJS.modules.custom = {
	'Jak Himself': ['admin', 'bureaucrat']
};

UserTagsJS.modules.userfilter = {
	'Jak Himself': ['founder']
};


// Reference popups
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).defaults = { animate: false };

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:UserTags/code.js',
        'w:c:dev:ReferencePopups/code.js'
    ]
});
/* Any JavaScript here will be loaded for all users on every page load. */
//LockOldBlogs Config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because there hasn\'t been any comments in over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};

//UserTags Config
window.UserTagsJS = {
	modules: {},
	tags: {
        bot: 'Bot',
        help: 'Coding Support',
        wikicouncil: 'Council',
        topedit: 'Top Editor'
	}
};

UserTagsJS.modules.custom = {
    'Blazingfire319': ['topedit'],
};
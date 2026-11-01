mw.hook('wikipage.content').add(function() {
	
	// Automatically preview CSS pages; uses T:CSS class to also be affected by ThemeToggler
	if (mw.config.get('wgPageName').includes('.css')) { 
		fetch(`/wiki/${mw.config.get('wgPageName')}?action=raw`)
			.then(data => data.text())
			.then(css => $(mw.util.addCSS(css).ownerNode).addClass('t-css'));
	}
	
// UserTags config
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order: -2 },
		bot: { link: 'Help:Bots', order: -1 },
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		'content-moderator': { order: 2 },
		threadmoderator: { order: 3 }
	}
};

UserTagsJS.modules.inactive = { days: 90, zeroIsInactive: true };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = false;
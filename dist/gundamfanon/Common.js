/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		templates: { u: 'Template Specialist', order:-2 },
		templatesh: { u: 'Template Helper', order:-1 },
		css: { u: 'CSS Specialist', order:-2 },
		cssh: { u: 'CSS Helper', order:-1 },
		java: { u: 'Java Specialist', order:-2 },
		javah: { u: 'Java Helper', order:-1 },
		inactive: { u: 'Inactive', },
		newuser: { u: 'Rookie' },
		sysop: { u: 'Admin', link:'Gundam Fanon Wiki:Administrators', order:-1/0 },
		superadmin: { u: 'Super Admin', link:'Gundam Fanon Wiki:Administrators', order:-1/0 },
		superuser: { u: 'Super User', order:-1/0 },
		meister: { u: 'Gundam Meister', order:1 },
		rmj: { u: 'Robot Monkey Jesus', order:1 },
		lor: { u: 'Lord of Rage', order:1 },
		gvgp: { u: 'Gundam Versus Series Fanatic', order:1 },
		drawer: { u: '"Drawer"', order:1 },
		trise: { u: 'Team Rise', order:1 },
	}
};
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = { //Tags users with custom templates tag
	'Wingstrike': ['templates', 'cssh', 'javah'],
	'Another Poetic Spartan': ['templates', 'trise'],
	'DarkGhostMikel': ['templates', 'gvgp'],
	'Knightwalker591': ['meister'],
	'CarlosIXA': ['drawer'],
};
UserTagsJS.modules.implode = {
	'superadmin': ['bureaucrat', 'sysop'], // Combines bureaucrat and sysop tags together into superadmin tag
	'superuser': ['rollback', 'chatmoderator'], // Combines rollback and chat moderator tags together into superuser tag
};
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'], // Remove rollback from all admins
};

nullEditDelay = 1000;

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 1000;
  massRenameSummary = 'automatic';
}

/* Auto Refresh */
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Blog:Recent_posts"];
 
var AjaxRCRefreshText = 'Auto-refresh';

/* WikiActivity */
window.rwaOptions = {
    headerLink : true,
};
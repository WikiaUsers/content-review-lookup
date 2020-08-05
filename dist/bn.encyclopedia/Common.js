// Core configuration. We add 2 custom tags and change what the built-in sysop tag says.
window.UserTagsJS = {
	modules: {},
	tags: {
		hello: { m: 'Male', f:'Female', u: 'No Gender Set', order: -1/0, link:'http://en.wikipedia.org/wiki/Gender' },
		muckraker: 'Muckraker',
		sysop: { u:'Admin', link:'Project:Administrators' }, // Change "Administrator" to "Admin"
		'mini-sysop': { u: 'Half Administrator', link:'Project:HalfAdmins' },
		'vandal-patrol': { u: 'Vandal-Patroller', link:'Project:Janitors' }
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
	'John Doe': ['muckraker', 'hello'],
	'Someone': ['hello'],
	'You': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Other User': ['hello', 'muckraker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	hello: ['muckraker'], // Remove hello group from people with muckraker group
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};
UserTagsJS.modules.userfilter = {
	'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'] // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
</source>
This demonstrates all the modules, it's not particularly practical but you hopefully get a basic feel for how to use it. You create your custom tags inside the <code>tags</code> section then add separate configuration blocks for each module you want to use after it. You only need to use the modules you want, you probably don't want all the ones here and you definitely don't want to use this as is.

For a more practical example, here is the default configuration that the script uses internally when you don't set one yourself:
<source lang="javascript">
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
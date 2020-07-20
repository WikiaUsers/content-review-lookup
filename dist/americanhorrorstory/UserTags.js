/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'AHS:Administrators', title:'Administrator' },
		voter: { u:'Alderperson', m:'Alderman', f:'Alderwoman', link:'AHS:Alderman', title:'Steering Committee' },
		featured: { u:'Hero', title:'Featured Wikian' },
		rollback: { u:'Fluffer', title:'Beautifier' },
		inactive: { u:'Dormant' },
		templates: { u:'Templates Guru' }},
	oasisPlaceBefore: ''
};
UserTagsJS.modules.mwGroups = ['sysop', 'rollback'];
UserTagsJS.modules.inactive = 50;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.prefLanguages = true;
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.custom = {
	'FishTank': ['voter', 'templates'],
	'OGRastamon': ['voter'],
	'BadlyBruisedMuse': ['voter'],
	'Urbasicmeow': ['featured'],
};
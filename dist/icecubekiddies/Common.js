/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		gamedev: { u:'Game Developer', title: 'The main or supporting developers.' },
		betatest: { u:'Beta Testers', title: 'People who report bugs in the games.' },
		merchcreate: { u:'Merch Creator', title: 'People who make things for the community to use outside of the computer.' },
		'bot-local': {u:'FNaICP-Only Bot' }
	}
};
UserTagsJS.modules.custom = {
	'MatiasBot': ['bot-local', 'bot-global'],
	'ThatFNaTISuit': ['gamedev', 'merchcreate'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
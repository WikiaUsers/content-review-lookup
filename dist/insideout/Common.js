/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {		
		inactive: { u: 'Lost in the mind' },
		sysop: { u: 'Emotion', link:'Inside Out Wiki:Administrators' },
		rollback: { u: 'Mind Worker' },
		bureaucrat: { u: 'Leader of Headquarters' }
	}
};
	UserTagsJS.modules.inactive = 30; // 30 days
	UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'chatmoderator', 'threadmoderator'];
'end';
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
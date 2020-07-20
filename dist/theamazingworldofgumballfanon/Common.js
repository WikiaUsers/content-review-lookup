/* Any JavaScript here will be loaded for all users on every page load. */
//User tags
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Project:Bureaucrats' },
		sysop: { u: 'Administrator', link:'Project:Administrators' },
                rollback: { u: 'Rollbacks', link:'Project:Rollbacks' },
                chatmoderator: { u: 'Chat moderator', link:'Project:ChatModerators' },
	}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
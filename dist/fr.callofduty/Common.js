window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];

importArticle({type:'script', articles: [ 'w:c:dev:UserTags/code.js', 'w:c:dev:Countdown/code.js' ] });
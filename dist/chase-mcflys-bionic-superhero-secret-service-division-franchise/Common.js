/* Credits to Lab Rats: Elite Force Wiki */
 
// UserBadges settings
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { link:'Staff#Bureaucrats and Administrators' },
		sysop: { link:'Staff#Bureaucrats and Administrators' },
		rollback: { link:'Staff#Rollbacks and Chat Moderators' },
                chatmoderator: { link:'Staff#Rollbacks and Chat Moderators' }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bot', 'content-moderator', 'founder',];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['newuser'] };
UserTagsJS.modules.newuser = { days: 5, edits: 0 };
 
// LastEdited settings
window.lastEdited = {
    position: 'bottom',
    size: false,
    comment: false,
    time: true
};
 
importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
		"w:dev:ChatOptions/code.js",
                "w:dev:DupImageList/code.js",
                "w:dev:DynamicImages/code.js",
		"w:dev:FloatingToc/code.js",
		"w:dev:ReferencePopups/code.js",
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
		"w:dev:ShowHide/code.js",
                "w:dev:Standard_Edit_Summary/code.js",
		"w:dev:UserBadges/code.js", 
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/activityrefresh.js",
		"MediaWiki:Common.js/displayclock.js",
	        "MediaWiki:Common.js/disableuploadpopup.js",
		"MediaWiki:Common.js/filluploadform.js",
		"MediaWiki:Common.js/insertusername.js",
                "MediaWiki:Common.js/star-ratings.js",
	]
});
/* "Username" template - from Avatar Wiki */
 
$(function() {
  if (typeof wgUserName != 'undefined') {
     $('.insertusername').html(wgUserName);
  }
}); 
/* End */
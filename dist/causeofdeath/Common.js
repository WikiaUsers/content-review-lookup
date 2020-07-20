/* Any JavaScript here will be loaded for all users on every page load. */

/* by @nodethirtythree | license: public domain */

$.getRelativeTime = function(diff) {
  var v = Math.floor(diff / 86400); diff -= v * 86400;
  if (v > 0) return (v == 1 ? 'Yesterday' : v + ' days ago');
  v = Math.floor(diff / 3600); diff -= v * 3600;
  if (v > 0) return v + ' hour' + (v > 1 ? 's' : '') + ' ago';
  v = Math.floor(diff / 60); diff -= v * 60;
  if (v > 0) return v + ' minute' + (v > 1 ? 's' : '') + ' ago';
  return 'Just now';
};

$.fn.toRelativeTime = function() {
  var t = $(this), x = Math.round(Date.parse(t.text()) / 1000);
  if (x) t.text($.getRelativeTime(Math.round(
  new Date().getTime() / 1000) - x));
};

$.toRelativeTime = function(s) { $(s).each(function() { 
  $(this).toRelativeTime(); 
}); };

/* Make dates on mainpage relative */
$(function() {
$.toRelativeTime('.cod-mainpage-timestamp');
});

// Dev Wiki imports
importArticles({
    type: "script",
    articles: [
        "w:dev:BackToTopButton/code.js",
        "w:dev:DisplayClock/code.js",
        "w:dev:VisualSpellCheck/code.js",
        "w:dev:SignatureCheck/code.js",
        "w:dev:AntiUnicruft/code.js",
        "w:dev:EditIntroButton/code.js",
        "w:dev:PurgeButton/code.js",
        "w:dev:AjaxBatchDelete/code.js"
        "w:dev:AjaxRC/code.js"
    ]
});
 
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 60,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { link:'http://causeofdeath.wikia.com/wiki/Cause_of_Death_Wiki:Administrators' },
		sysop: { link:'http://causeofdeath.wikia.com/wiki/Cause_of_Death_Wiki:Administrators' },
		chatmoderator: { link:'http://causeofdeath.wikia.com/wiki/Cause_of_Death_Wiki:Rollbacks_%26_Chat_Moderators' },
		rollback: { u:'Rollback', link:'http://causeofdeath.wikia.com/wiki/Cause_of_Death_Wiki:Rollbacks_%26_Chat_Moderators' },
		bot: { u:'Bot', link:'Help:Bots' }
			}
};
UserTagsJS.modules.custom = {
	'At.thehotcorner': ['bureaucrat'],
	'Iamhisrighteousness': ['bureaucrat'],

};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
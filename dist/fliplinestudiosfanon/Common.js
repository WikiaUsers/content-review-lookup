//User Tags
 
window.UserTagsJS = {
	modules: {},
	tags: {
        bot          : {u:'Bot'},
        leaderbot    : {u:'Leader Bot'},
        founder      : {u:'Founder', order:-1/0},
        juniorsysop  : {u:'Junior Administrator'},
	},
};
 
UserTagsJS.modules.custom = {
    'BotWurst'          : ['leaderbot'],
    'The Waffle Bot'    : ['bot'],
    'Azura Bot'         : ['bot'],
    'LuisAngel01'       : ['juniorsysop'],
    };

UserTagsJS.modules.userfilter = {
	'JK55556': ['chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'rollback'],
	'Cure Kohaku': ['chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'rollback'],
	'Laundry Machine': ['chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'rollback'],
	'Fanofkinopio': ['chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'rollback'],
	'Meandcrazy': ['chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'rollback'],
	'Jyappeul': ['chatmoderator', 'threadmoderator', 'content-moderator', 'sysop', 'rollback'],
	'LuisAngel01': ['threadmoderator', 'chatmoderator','content-moderator'],
};

UserTagsJS.modules.mwGroups = ['founder', 'bureaucrat', 'sysop', 'content-moderator', 'threadmoderator', 'chatmoderator', 'rollback','global-discussions-moderator'];
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */
 
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];


if (mw.config.get("wgUserGroups").indexOf('bot') > -1) {
    window.massCategorizationDelay = 10;
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:MassCategorization/code.js'
    });
}
/* <pre><nowiki> */

var SocialMediaButtons = { 
 position: "top",
 colorScheme: "color",
 buttonSize: "30px"
};
importScriptPage('SocialIcons/code.js','dev');

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:MiniComplete/code.js',
    ]
});


window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};


//Sitenotice: the notion of prepending to $WikiaArticle came from [[User:Cåm]]
//$('#WikiaArticle').prepend('<div style="color:#012c57;font-family:Raleway;padding:10px;background-image: -ms-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -moz-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -o-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #8BADCE), color-stop(1, #8BBBDF)); background-image: -webkit-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: linear-gradient(to right, #8BADCE 0%, #8BBBDF 100%);text-align:center;margin-left:auto;margin-right:auto;margin-bottom:20px;">The <a href="http://tardis.wikia.com/wiki/T:VE"><font color=whitesmoke>new VisualEditor</font></a> is here! <a href="http://tardis.wikia.com/wiki/Thread:143084" style=color:whitesmoke;background-color:none>Tell us what you think.</a></div>');

$('#WikiaArticle').prepend('<div style="color:#01366c;font-family:Raleway;padding:10px;background-image: -ms-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -moz-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -o-linear-gradient(left, #8BADCE 0%, #dd8888 100%); background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #8BADCE), color-stop(1, #8BBBDF)); background-image: -webkit-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: linear-gradient(to right, #8BADCE 0%, #8BBBDF 100%);text-align:center;margin-left:auto;margin-right:auto;margin-bottom:20px;"><style=color:whitesmoke;font-family:Microsoft Yahei;background:none;font-weight:600>感谢大家对本维基的贡献与支持，有兴趣请前往美服进行游戏，谢谢 :）</span></div>');

//Getting rid of comment button
$('a[data-id="comment"]').removeClass('comments');

/*</nowiki></pre>*/
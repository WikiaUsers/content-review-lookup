/* <pre><nowiki> */
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

//$('#WikiaArticle').prepend('<div style="color:#012c57;font-family:Raleway;padding:10px;background-image: -ms-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -moz-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -o-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #8BADCE), color-stop(1, #8BBBDF)); background-image: -webkit-linear-gradient(left, #8BADCE 0%, #8BBBDF 100%); background-image: linear-gradient(to right, #8BADCE 0%, #8BBBDF 100%);text-align:center;margin-left:auto;margin-right:auto;margin-bottom:20px;"><a href="http://tardis.wikia.com/wiki/Thread:155756" style=color:whitesmoke;background:none;font-weight:600>Vote in our Community Choice Awards.</a> <span style=font-weight:600>If you think you\'ve got what it takes.</span></div>');


//Getting rid of comment button
$('a[data-id="comment"]').removeClass('comments');

/*</nowiki></pre>*/
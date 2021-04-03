/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get("wgUserName")) {
	$(".irc").html("<iframe src='http://webchat.freenode.net?nick=" + wgUserName.split(' ').join('_').split('.').join('-') + "&channels=##Jackninja5' width='647' height='400'></iframe>");
}


window.UserTagsJS = {
	modules: {},
	tags: { 
                idiot: 'Idiot',
                emperor: 'Emperor',
}
};
UserTagsJS.modules.custom = {
        'Jackninja5DipperGravityFalls': ['emperor'],
        'DonaldDouglasandToby6 ['idiot'],
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
/* Any JavaScript here will be loaded for all users on every page load. */

window.AjaxRCRefreshText = 'Auto-refresh';
window.ajaxPages = ["WikiActivity"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 20000;
window.AjaxRCRefreshHoverText = 'Auto Refresh';
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://kart-kingdom-pbs-kids.wikia.com/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

var MessageBlock = {
  title : 'YOU HAVE BEEN BANNED.',
  message : 'Hi, there. I am an admin for the Kart Kingdom PBS Kids Wiki. I am here to inform you that you have been banned for a duration of $2 for the following reason: "$1". <br /><b>Do not attempt to evade a ban.</b> Evading a ban, regardless of your intentions, is a punishable offence and will likely extend your block if you have not been permanently banned. If you feel like you have been blocked for an incorrect reason, you may contact an administrator for guidance.'
};
 
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		Ambassadors: { u:'Ambassador' },
	}
};
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
 
window.railWAM = {
    logPage:"Project:WAM Log"
};
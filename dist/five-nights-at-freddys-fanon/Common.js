/*Javascript applied here will apply to all skins*/
//Import Articles
importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/summaries.js",
		"u:dev:MediaWiki:BackToTopButton/code.js",
		"MediaWiki:Common.js/displayTimer.js",
		"u:dev:MediaWiki:WallGreetingButton/code.js",
		"u:monchbox:MediaWiki:Torus.js",
		"u:dev:MediaWiki:Countdown/code.js",
		"u:dev:MediaWiki:TimedSlider/code.js",
		"u:dev:MediaWiki:SearchSuggest/code.js",
		"MediaWiki:Common.js/MainPageUpload.js",
		"MediaWiki:Common.js/Username.js",
		"MediaWiki:Common.js/Emote.js",
		"MediaWiki:Common.js/plok.js",
		"MediaWiki:Common.js/B3.js"
 
	]
});

//Has to be reworked as most of the admins/moderators listed here aren't active anymore
window.MessageWallUserTags = {
    tagColor: 'white',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'South Ferry': 'Bureaucrat • Administrator',
        'Demonic BB': 'Bureaucrat • Administrator',
        'VentureSonic': 'Bureaucrat • Administrator',
        'FazbearFreak': 'Bureaucrat • Administrator',
        'BoltBlizzard': 'Bureaucrat • Administrator',
        'Tina.g.sherwin': 'Administrator',
        'Shadowboy192': 'Administrator',
        'SpringThing14': 'Assistant',
        'Aidanthehedgehogisawesome': 'Assistant',
        'Android Oreo': 'Administrator • Bot',
        'ADgee': 'Content Moderator',
        'ZonicTheHedge11': 'Administrator',
    }
};
 
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 365; //Number of days before comment gets locked - Default: 100 days
window.lockOldComments.addNoteAbove = true; //Adds note that comment was locked
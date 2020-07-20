/*Javascript applied here will apply to all skins*/
//Import Articles
importArticles({
	type: "script",
	articles: [
		"u:dev:DynamicImages/code.js",
		"MediaWiki:Common.js/summaries.js",
		"w:c:dev:BackToTopButton/code.js",
		"MediaWiki:Common.js/displayTimer.js",
		"w:dev:WallGreetingButton/code.js",
		"w:c:monchbox:MediaWiki:Torus.js",
		"w:c:dev:Countdown/code.js",
		"w:c:dev:TimedSlider/code.js",
		"u:dev:SearchSuggest/code.js",
		"MediaWiki:Common.js/MainPageUpload.js",
		"MediaWiki:Common.js/Username.js",
		"MediaWiki:Common.js/Emote.js",
		"MediaWiki:Common.js/plok.js",
		"MediaWiki:Common.js/B3.js"
 
	]
});

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

window.railWAM = {
    logPage:"Project:WAM Log"
};
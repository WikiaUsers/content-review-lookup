/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {// group: { associated tag data }
		honoreditor: { u:'Honorable Editor' },
		leaderplayer: { u:'Leaderboard Player' },
		dev: { u:'Developer' }
		},
	oasisPlaceBefore: ''
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});
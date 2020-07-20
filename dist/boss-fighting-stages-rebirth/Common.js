window.UserTagsJS = {
	modules: {},
	tags: {
		projectpagecreator: {u:'Project Page Creator',order:-2001},
		inactive: {u:'Not Active',order:100},
		newuser: {u:'New User',order:100},
		championS: {u:'Slicer Champion',order:0,link:"Champions"},
		championC: {u:'Crusher Champion',order:0,link:"Champions"},
		championP: {u:'Piercer Champion',order:0,link:"Champions"},
		championB: {u:'Baller Champion',order:0,link:"Champions"},
		echampionS: {u:'Slicer Ex-Champion',order:0,link:"Champions"},
		echampionC: {u:'Crusher Ex-Champion',order:0,link:"Champions"},
		echampionP: {u:'Piercer Ex-Champion',order:0,link:"Champions"},
		echampionB: {u:'Baller Ex-Champion',order:0,link:"Champions"},
		SuperCloud: {u:"SuperCloud9",order:0},
		notificationmanager: {u:"Notification Manager",order:0,link:"Project:Notifications"},
		NSFWFFMaker: {u:"NSFW FanFiction Maker",order:-1},
		OCContestWinner: {u:"",order:0,link:"BFS OC Contest"},
		/*  Editor of the month tags start below.  I expect this list to get very long.*/
		monthshowoff: {u:'Editor of the Month (No Date)',link:"Project:Editor of the month"},
		monthjuly2016: {u:'Editor of the Month (July 2016)',link:"Project:Editor of the month"},
		monthaugust2016: {u:'Editor of the Month (August 2016)',link:"Project:Editor of the month"},
	}
};
UserTagsJS.modules.inactive = {
	days: 50,
	namespaces: [0, 'Talk', 'User talk', 'Forum','Project']
};
UserTagsJS.modules.newuser = {
	days: 5,
	edits: 10,
	namespace: [0,'Talk','User talk','Forum','Project','User']
};
UserTagsJS.modules.userfilter = {
	'EditorOfTheMonthShowoff': ['inactive'],
};
UserTagsJS.modules.custom = {
	'Fyzu': ['projectpagecreator',"monthjuly2016","championC","NSFWFFMaker"],
	'Thundermaker300': ['projectpagecreator','notificationmanager'],
	'Dryswordmaster': ['projectpagecreator'],
	'EditorOfTheMonthShowoff': ['monthshowoff'],
	'Ironhide2962': ["championS"],
	'Lolzarena': ["echampionP"],
	'EvilJacobthehero2013': ["championP"],
};
// Namespace for notiplus
window.notiplus = window.notiplus || {};
// Settings for notiplus
notiplus.url = '/wiki/MediaWiki:Custom-Notifications?action=render';
notiplus.cookiePrefix = 'notiplus';
notiplus.consentRequired = false;
notiplus.reverseOrder = false;
notiplus.lang = 'en';
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","Project:Statistics",];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Refresh Automatically';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page after 30 seconds';
var MessageBlock = {
  title : 'About Your Block',
  message : 'You have been blocked for $2.  Reason given: $1',
  autocheck : true
};
importArticles({
	type:'script',
	articles: [
		'w:c:dev:UserTags/code.js',
		'u:dev:MessageBlock/code.js',
		'u:dev:AjaxRC/code.js',
		'w:c:dev:InputUsername/code.js',
		"w:c:dev:MediaWiki:Countdown/code.js",
	]
});
if (mwCustomEditButtons.length) { 

	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/central/images/f/f7/Button_comment1.png",
		"speedTip": "Add a Comment",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Put your comment here.  Comments can only be seen in edit mode."
	};
}
 
/* Usertags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		discordadmin: { u:'Discord Admin', order: 102 },
		discordmod: { u:'Discord Moderator' },
		bureaucrat: { order: 1 },
		newuser: { u: 'Newbie' },
		sysop: { order: 101 },
		hacker: { u:'L33t H4xx0r'}
	}
};
UserTagsJS.modules.custom = {
    'ANightDazingZoroark': ['discordadmin', 'discordmod', 'hacker'],
    'GigaBoss102': ['discordadmin', 'discordmod'],
    'TheRealBionicleSaurus': ['founder'],
    'Blazing Buffalo': ['discordmod']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'discordadmin', 'founder'];
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};
UserTagsJS.modules.inactive = 10; // 10 days

/* More Insights */
ItemsToAdd = [
  {
    'Name': 'Creatures',
    'Page': 'creatures',
    'Description': 'We need pages on the creatures featured in the series!'
  },
  {
    'Name': 'Locations',
    'Page': 'locations',
    'Description': 'We better try to map out the islands and their locations!'
  },
  {
    'Name': 'Characters',
    'Page': 'characters',
    'Description': 'We need info on the characters of the series!'
  },
  {
      'Name': 'Episodes',
      'Page': 'episodes',
      'Description': 'Info about the episodes of each series!'
  }
];
AffectsSidebar = true;

/* Auto refresh the wiki activity */
window.ajaxPages = ["Some Frequently Updated Page"];
window.ajaxSpecialPages = [
    "Recentchanges",
    "WikiActivity",
    "Watchlist",
    "Log",
    "Contributions"
];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
/*Discussions Stuff*/
$.getScript("//dev.wikia.com/index.php?title=MediaWiki:DiscussionsBlock.js&action=raw&ctype=text/javascript");
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/displayTimer.js',
        'u:dev:DisplayClock/code.js',
        'u:dev:ListAdmins/code.js',
        'u:dev:UserTags/code.js',
    ]
});

$(function() {
    var newSection = '<div><a href="' + 
      'http://camplakebottom.wikia.com/wiki/Camp_Lakebottom_Wiki:Votes_for_Featured_Articles' + '"><img src="' + 
      'https://images.wikia.nocookie.net/bratzillaz/images/b/bc/Oie_Xz3smgbDZAgB.png' + '" width="' + 
      '320' + '" height="' + 
      '260' + '" /></a></div>';
    $('#WikiaRail').append(newSection);
});

window.UserBadgesJS = {
	names: {
		patroller: 'Patroller', // patroller group member badge text
		rollback: 'Scout', // rollback group member badge text
		newuser: 'Camper', // Text shown on the newuser badge
		inactive: 'Inactive Camper', // Text shown on the inactive user badge
		nonuser: 'New Camper' // Text shown on the nonuser badge
	}
};
window.UserBadgesJS = {
	inactive: 60, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: { 'Jestem-Vegetom': ['NABIJACZ ODZNAK'], 'Rafik513': ['GOSPODARZ'] },
	names: {
		patroller: 'STRÓŻ', // patroller group member badge text
		rollback: 'ROLLBACK', // rollback group member badge text
		newuser: 'NOWICJUSZ', // Text shown on the newuser badge
		inactive: 'NIEAKTYWNY', // Text shown on the inactive user badge
		nonuser: 'SPAMKONTO' // Text shown on the nonuser badge
	}
};
importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

/* Przenoszenie komunikatów na górę artykułu */
mw.hook('wikipage.content').add(function(e) {
  if($(e).attr('id') != 'mw-content-text') {
    e = $(e).find('#mw-content-text');
  }
  e.find('.top-notice').prependTo(e);
});
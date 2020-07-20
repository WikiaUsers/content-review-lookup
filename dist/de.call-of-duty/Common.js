/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

window.UserBadgesJS = {
	inactive: 30, // Inactive if no edits in this many days, 0=disabled
	gone: {}, // List of users who have formally left but it hasn't been 'inactive' days yet
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true, // Don't display any non-custom badges for blocked users
	newusers: true, // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true, // Tag global Wikia accounts that have never edited anything
	custom: {}, // Map of user names to arrays of strings
	names: {} // Badge display names
}

importArticle({type:'script', article:'w:c:dev:UserBadges/code.js'});

window.UserBadgesJS = {
	// ...
	names: {
		patroller: 'Patroller', // patroller group member badge text
		rollback: 'Rollback', // rollback group member badge text
		newuser: 'Neuer Benutzer', // Text shown on the newuser badge
		inactive: 'Inaktiv', // Text shown on the inactive user badge
		nonuser: 'Leser' // Text shown on the nonuser badge
	}
	// ...
};

importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});

SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

SpoilerAlert = {
    isSpoiler: function () {
        var h2s = document.getElementsByTagName('h2');
        for (var i = 0, c = h2s.length; i < c; i++) {
            if (/spoiler/i.test($(h2s[i]).text())) return true;
        }
        return false;
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

SpoilerAlert = {
    question: 'Diese Seite enthält Spoiler. Möchten Sie sie trotzdem ansehen?',
    yes: 'Aber ja doch',
    no: 'Nein, noch nicht',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/* Snow */	
/* importScriptPage('MediaWiki:Snow.js'); */

/* importScriptPage('ShowHide/code.js', 'dev'); */

*/  var ShowHideConfig = {  */
*/  autoCollapse: 3,  */
*/  userLang: false,  */
*/  en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
 */   }  */ 
 */ };  */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
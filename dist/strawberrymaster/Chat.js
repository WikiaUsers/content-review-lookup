/** <pre>
 * This file loads for every user the wiki chat.
 * For skin specific variants see [[MediaWiki:Chat.css]]
 * for oasis respectively
 *
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 * Alternatively, Wikia's code editor has jshint embedded to make life extra simple.
 *
 */

window.chatags = { images: true, videos: true };

window.chatAnnouncementsAll = true;

importArticles({
	type: 'script',
	articles: [
        // ...
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:ChatTags/code.js',
        // ...
    ]
});
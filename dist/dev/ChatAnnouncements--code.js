/* 
* ChatAnnouncements
* Create announcements for all the users in chat
* Must be site-wide (installed in the wiki's MediaWiki:Chat.js)
* @author Ozank
*/
(function(window, $, mw) {

    // Scoping, double-run protection
    if (
        !/Chat/.test(mw.config.get('wgCanonicalSpecialPageName')) ||
        window.chatAnnouncementsLoaded
    ) {
        return;
    }
    window.chatAnnouncementsLoaded = true;
    
    /**
     * Main ChatAnnouncements class
     * @class chatAnnouncements
     */
    var chatAnnouncements = {
        /**
         * Event delegator for script.
         * @method main
         */
        main: function(mainRoom) {
            mainRoom.model.chats.bind('afteradd', $.proxy(this.msgCheck, this));
        },
        /**
         * Conditional message data extractor.
         * @method msgCheck
         */
        msgCheck: function (m) {
            var user = mainRoom.model.users.findByName(m.attributes.name);
            if (!m.attributes.isInlineAlert && user) {
                var username = m.attributes.name,
                message = m.attributes.text;
                var announce = /^\/announce /i.test(message),
                    announce2 = /^\/sendannouncement /i.test(message);
                this.msgAnnounce(user, username, message, announce, announce2);
            }
        },
        /**
         * Chat announcement handler.
         * @method msgAnnounce
         */
        msgAnnounce: function(u, un, m, a, a2) {
            if (
                // If announcements are restricted and the user isn't a moderator...
                (!window.chatAnnouncementsAll && !u.attributes.isModerator) ||
                // ...or if there was no announcement at all...
                !(a || a2)
            ) {
                // ...don't run the announcement code at all
                return;
            }
            mainRoom.viewDiscussion.chatUL.children().last().remove();
            var text = mw.html.escape(m.slice(a ? 10 : 18));
            if(!window.chatAnnouncementsAnonymous || a) {
                text = '[[User:' + un + '|' + un + ']]: ' + text;
            }
            mainRoom.model.chats.add(new models.InlineAlert({ text: text }));
        }
    };

    // Script bootloader
    mw.hook('dev.chat.socket').add($.proxy(
        chatAnnouncements.main,
        chatAnnouncements
    ));

    // Import chat library
    importArticle({
        type: 'script',
        article: 'u:dev:Chat-js.js'
    });

}(window, jQuery, mediaWiki));
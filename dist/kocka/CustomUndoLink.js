/**
 * Name:        CustomUndoLink
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Fixes the undo link on wikis whose
 *              custom ban messages contain "[".
 *              That character apparently triggers mw.message parsing
 *              to fallback mediawiki.jqueryMsg parsing which does not
 *              properly support rawParams and therefore removes the
 *              ban link after replacing $3 variable with it.
 * NOTE:        THIS SCRIPT ASSUMES THE FIRST LINK IN YOUR BAN MESSAGE
 *              HAS THE TEXT WITH THE USERNAME OF THE USER THAT WAS BANNED
 */
(function() {
    'use strict';
    if (
        window.CustomUndoLinkLoaded ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        !(/staff|vstf|helper|chatmoderator|threadmoderator|sysop/
            .test(mw.config.get('wgUserGroups').join()))
    ) {
        return;
    }
    var bound;
    function ban(data) {
        if (JSON.parse(data.data).attrs.time === 0) {
            return;
        }
        var $last = $('.Chat .inline-alert').last();
        $last.append(
            ' (',
            $('<a>', {
                href: '#',
                'data-type': 'ban-undo',
                'data-user': $last.find('a').first().text(),
                text: mw.message('chat-ban-undolink').escaped()
            }),
            ')'
        );
    }
    function init(mainRoom) {
        if (!bound) {
            mainRoom.socket.bind('ban', ban);
        }
        bound = true;
    }
    mw.hook('dev.chat.socket').add(init);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Chat-js.js'
    });
})();
// Discussions Delete All
// Button from Special:Contribs that deletes all Discussions posts of user
// @author: Jr Mime
;(function ($, mw) {
    'use strict';

    var config = mw.config.get([
        'wgUserGroups',
        'wgVersion',
        'wgCanonicalSpecialPageName'
    ]);

    if (
        window.dda ||
        !['Contributions', 'UserProfileActivity'].includes(config.wgCanonicalSpecialPageName) ||
        !new RegExp([
            'threadmoderator',
            'sysop',
            'staff',
            'soap',
            'global-discussions-moderator',
            'wiki-specialist'
        ].join('|')).test(config.wgUserGroups.join()) ||
        // DO NOT run for anonymous users. This will delete ALL posts and replies
        // of ALL anonymous users that ever posted in the wiki's Discussions,
        // which is probably not what the user wants to do.
        Number(mw.config.get('profileUserId')) === 0
    ) {
        return;
    }

    var dda = {
        preload: function (i18n) {
            mw.loader.using('mediawiki.util', function () {
                i18n.loadMessages('Discussions Delete All').then(dda.init);
            });
        },
        click: function (e) {
            if (e.preventDefault) {
        	    e.preventDefault();
            }
            if (window.ddaDoNotConfirm || confirm(dda.i18n.msg('confirm').plain())) {
                dda.deleteAll();
            }
        },
        init: function (i18n) {    
            dda.i18n = i18n;

            var element = $('<a>', {
                click: dda.click,
                css: {
                	cursor: 'pointer'
                },
                id: 'DeleteAllDiscussionsPostsByUser',
                text:  dda.i18n.msg('delete').plain(),
                title: dda.i18n.msg('title').plain()
            });
            var selector = $('.mw-contributions-user-tools > .mw-changeslist-links > span:last-child, .UserProfileActivityModeration__links > span:last-child');
            selector.after(element);
            element.wrap('<span></span>');
            mw.hook('QuickLogs.loaded').add(function() {
                element.remove();
                QuickLogs.addLink('discussions-delete-all', {
                    click: dda.click,
                    message: dda.i18n.msg('delete').plain()
                });
            });
        },
        deleteAll: function () {
            fetch(mw.util.wikiScript('wikia') + '?controller=DiscussionContribution&method=deleteAll&userId=' + mw.config.get('profileUserId'), {
                method: 'POST',
                credentials: 'include'
            }).then(function () {
                alert(dda.i18n.msg('done').plain());
            });
        }
    };

    window.dda = dda;
    mw.hook('dev.i18n').add(dda.preload);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(window.jQuery, window.mediaWiki);
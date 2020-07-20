// ==========================================================================
// Adds a 'Deck Builder' option to the edit button dropdown on deck pages
// which edits the current deck with the deck builder.
// (see MediaWiki:Builder.js)
//
// Version 1.0.0
// Author: Aspallar
//
// ** Please do not edit this code directly in the wikia.
// ** Instead use the git repository https://github.com/Aspallar/WikiLua
//
(function($) {
    'use strict';
    /*global mw */

    var pageName = mw.config.get('wgTitle');
    if (pageName.substring(0, 6) !== 'Decks/')
        return;

    $('.UserProfileActionButton > .wikia-menu-button > ul, .page-header__contribution-buttons .wds-list').append(
        $('<li>').append(
            $('<a>', {
                href: mw.util.getUrl('Deck Builder', { deck: pageName.substring(6) }),
                text: 'Deck Builder',
                title: 'Edit with the deck builder'
            })
        )
    );

}(jQuery));
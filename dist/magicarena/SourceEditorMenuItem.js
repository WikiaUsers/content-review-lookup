// ==========================================================================
// Adds a 'Source Editor' option to the edit button dropdown which opens
// the page for editing in the source editor.
//
// Although there is a script available on the dev wiki that does something
// similar it no longer behaves as needed. We want the option to always be there
// no matter what the users editing preferences in order to keep the instructions
// in "Editing Decks" as simple as possible (besides at the time of posting this
// it is broken).
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

    if (mw.config.get('wgNamespaceNumber') !== 0)
        return;
 
    $('.UserProfileActionButton > .wikia-menu-button > ul, .page-header__contribution-buttons .wds-list').append(
        $('<li>').append(
            $('<a>', {
                href: mw.util.getUrl(mw.config.get('wgPageName'), { action: 'edit', useeditor: 'source'}),
                text: 'Source Editor',
                title: 'Edit with the source editor (recommended)'
            })
        )
    );
 
}(jQuery));
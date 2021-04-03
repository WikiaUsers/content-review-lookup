/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================================
// displayTimer
// ============================================================
/*jshint jquery:true, browser:true, curly:false */
/*global mw */
 
mw.loader.using('mediawiki.util', function () {
    'use strict';
    jQuery(function ($) {
        // Double run protection.
        if ($('#displayTimer, #showdate, #DisplayClockJS').length) return;
 
        var $parent = $('<li id="displayTimer" />'),
            $node = $('<a title="Purge the server cache for this page" href="' + mw.util.getUrl() + '?action=purge" />').appendTo($parent);
 
        function updateDate() {
            $node.text(new Date().toUTCString().replace('GMT', '(UTC)').substr(5));
        }
 
        if (mw.config.get('skin') === 'oasis') {
            $parent.css({'float': 'right', 'border': 'none', 'margin-right': '10px'}).appendTo('.toolbar > .tools');
        } else {
            $parent.css('text-transform', 'none').prependTo('#p-personal ul');
        }
        updateDate();
        window.setInterval(updateDate, 1000);
        $parent = null;
    });
});
//

importScriptPage('BackToTopArrow/code.js', 'dev');

window.MessageWallUserTags = {
    tagColor: '#B40431',
    glow: false,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'Rifatmfarid': 'Founder',
        'User2': 'Bureaucrat',
        'Wolfard': 'Admin',
        'User4': 'Rollback',
        'User5': 'Custom Tag'
    }
};
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

highlight = {
    selectAll: false,
    sysop: '#B40431',
    bot: '#00FF00',
    users: {
        ...
    }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:HighlightUsers/code.js'
    ]
});

window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(highlightUsers);

importScriptPage('AjaxRC/code.js', 'dev');
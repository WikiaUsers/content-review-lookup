// Simplified version of the “UserBadge” script from the Fandom Developers Wiki.

(function ($, mw) {
    'use strict';

    var $userLinks = $('.mw-userlink:not(.mw-anonuserlink)');
    if ($userLinks.length === 0) return;

    // List of usernames (strings) that should NEVER show a badge >:(
    var DISABLED_USERS = [
        'BloXmetry',
    ];

    var BADGES = {
        'sysop':            'https://vignette.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg',
        'content-moderator': 'https://vignette.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg',
        'threadmoderator':   'https://vignette.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg',
        'staff':             'https://vignette.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg'
        'bot':               'https://static.wikia.nocookie.net/my-prison/images/1/17/Bot.png'
    };

    var userNames = Array.from(new Set($userLinks.map(function() { 
        return $(this).text().trim(); 
    }).get()));

    mw.loader.using(['mediawiki.api', 'mediawiki.Title'], function () {
        var api = new mw.Api();

        api.get({
            action: 'query',
            list: 'users',
            ususers: userNames,
            usprop: 'groups',
            formatversion: 2
        }).then(function (data) {
            var users = data.query.users || [];

            users.forEach(function (user) {
                // Skip if user is invalid, missing, or explicitly disabled in the list
                if (user.missing || user.invalid || !user.groups || DISABLED_USERS.includes(user.name)) {
                    return;
                }

                var userTitle = new mw.Title(user.name, 2).getPrefixedText();
                var $links = $('.mw-userlink[title="' + userTitle + '"]');

                user.groups.forEach(function (group) {
                    var iconSrc = BADGES[group];

                    if (iconSrc && $links.find('.user-badge.group-' + group).length === 0) {
                        $('<img>', {
                            'class': 'user-badge group-' + group,
                            'src': iconSrc,
                            'title': group 
                        })
                        .css({ 
                            width: '1em', 
                            height: '1em', 
                            'margin-left': '3px', 
                            'vertical-align': 'middle' 
                        })
                        .appendTo($links);
                    }
                });
            });
        });
    });
})(window.jQuery, window.mediaWiki);
// Simplified version of the “UserBadge” script from the Fandom Developers Wiki.

(function(mw, $) {
    'use strict';

    // List of users who should NEVER receive a badge
    var DISABLED_USERS = ['BloXmetry'];

    var BADGES = {
        'sysop': 'https://static.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg',
        'content-moderator': 'https://static.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg',
        'threadmoderator': 'https://static.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg',
        'staff': 'https://static.wikia.nocookie.net/central/images/0/06/Badge-Staff.svg',
        'bot': 'https://static.wikia.nocookie.net/my-prison/images/1/17/Bot.png'
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.Title'], function() {
        var userLinks = $('.mw-userlink:not(.mw-anonuserlink)');
        if (userLinks.length === 0) return;

        var userNames = Array.from(new Set(userLinks.map(function() {
            return $(this).text().trim();
        }).get()));

        var api = new mw.Api();
        api.get({
            action: 'query',
            list: 'users',
            ususers: userNames.join('|'),
            usprop: 'groups',
            formatversion: 2
        }).done(function(data) {
            var users = data.query.users;
            
            users.forEach(function(user) {
                if (!user.groups || DISABLED_USERS.indexOf(user.name) !== -1) return;

                user.groups.forEach(function(group) {
                    var iconSrc = BADGES[group];
                    if (iconSrc) {
                        // Find all links for this user and append the badge
                        $('.mw-userlink').filter(function() {
                            return $(this).text().trim() === user.name;
                        }).each(function() {
                            if ($(this).find('.user-badge-' + group).length === 0) {
                                $('<img>', {
                                    'class': 'user-badge-' + group,
                                    'src': iconSrc,
                                    'title': group,
                                    'css': {
                                        'width': '1em',
                                        'height': '1em',
                                        'margin-left': '3px',
                                        'vertical-align': 'middle'
                                    }
                                }).appendTo(this);
                            }
                        });
                    }
                });
            });
            console.log("Badges loaded for: " + userNames.length + " users.");
        });
    });
})(mediaWiki, jQuery);
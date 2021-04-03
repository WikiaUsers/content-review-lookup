/**
 *
 * @module                  MastheadRightsBadge
 * @description             Adds WDS avatar badges to user profiles.
 * @author                  Americhino
 * @version                 1.0.1
 * @license                 CC-BY-SA 3.0
 *
 * Forked to add support for Rollbacks, Bureaucrats, and Wiki Managers
 * Also removes round avatars
 */
var mw = window.mw;
var $ = window.jQuery;
// User config variables
var config = window.MastheadRightsBadgeSettings || {};
var iconSize = config.iconSize || '50px';
// Variables
var $user = mw.config.get('wgTitle').split('/');
// Fetch MediaWiki API for user group badge messages, API fetch by Luqgreg
var api = new mw.Api();
function getMessages(msg) {
    return new Promise(function(resolve, reject) {
        api.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: msg.join("|"),
        }).done(function (d) {
            if(d.fail) reject(d);
            var r = {};
            d.query.allmessages.forEach(function(e) {
                r[e.name] = e["*"];
            });
            resolve(r);
        }).fail(reject);
    });
}
 
getMessages([
    "user-identity-box-group-bureaucrat",
    "user-identity-box-group-sysop",
    "user-identity-box-group-content-moderator",
    "user-identity-box-group-threadmoderator",
    "user-identity-box-group-rollback",
    "user-identity-box-group-chatmoderator",
    "user-identity-box-group-wiki-manager",
    "user-identity-box-group-staff",
    "user-identity-box-group-helper",
    "user-identity-box-group-soap",
    "user-identity-box-group-global-discussions-moderator",
]).then(function(m) {
    //
    var title = {
        'bureaucrat': m["user-identity-box-group-bureaucrat"],
        'sysop': m["user-identity-box-group-sysop"],
        'content-moderator': m["user-identity-box-group-content-moderator"],
        'threadmoderator': m["user-identity-box-group-threadmoderator"],
        'rollback': m["user-identity-box-group-rollback"],
        'chatmoderator': m["user-identity-box-group-chatmoderator"],
        'wiki-manager': m["user-identity-box-group-wiki-manager"],
        'staff': m["user-identity-box-group-staff"],
        'helper': m["user-identity-box-group-helper"],
        'soap': m["user-identity-box-group-soap"],
        'global-discussions-moderator': m["user-identity-box-group-global-discussions-moderator"]
    };
    // Z-Index variable: user group hierachy
    var groupPriority = {
        'bureaucrat': '399.5',
        'sysop': '399.4',
        'content-moderator': '399.3',
        'threadmoderator': '399.2',
        'rollback': '399.1',
        'chatmoderator': '399',
        'staff': '398.4',
        'wiki-manager': '398.3',
        'helper': '398.2',
        'soap': '398.1',
        'global-discussions-moderator': '398',
    };
    // Fetch MediaWiki API for user group badges
    api.get({
        action: 'query',
        list: 'users',
        usprop: 'groups',
        ususers: $user = $user[1] ? $user[1] : $user[0]
    }).then(function (data) {
    // Variables
    var groups = (data.query.users[0] || {}).groups || [];
    // User groups
    var g = {
        'bureaucrat': 'admin',
        'sysop': 'admin',
        'content-moderator': 'content-moderator',
        'rollback': 'content-moderator',
        'threadmoderator': 'discussion-moderator',
        'chatmoderator': 'discussion-moderator',
        'staff': 'staff',
        'wiki-manager': 'staff',
        'helper': 'helper',
        'soap': 'vstf',
        'global-discussions-moderator': 'global-discussions-moderator',
    };
    // Create badge
    groups.forEach(function (group) {
        mw.hook('dev.wds').add(function(wds) {
            if (!g[group]) return;
            if ($('.user-identity-box').length) {
                if ($('.mastrightsbadge').length) return;
            $('.user-identity-box .user-identity-avatar').prepend(
                $('<div>', {
                    'class': 'mastrightsbadge ' + 'mastrightsbadge-' + group,
                    'title': title[group],
                    css: {
                        height: iconSize,
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: iconSize,
                        zIndex: groupPriority[group],
                    }
                }).append(
                    $(window.dev.wds.badge(g[group]))
                )
                );
            } else {
                if ($('.mastrightsbadge').length) return;
            $('.UserProfileMasthead .masthead-avatar').prepend(
                $('<div>', {
                    'class': 'mastrightsbadge ' + 'mastrightsbadge-' + group,
                    'title': title[group],
                    css: {
                        height: iconSize,
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: iconSize,
                        zIndex: groupPriority[group],
                    }
                }).append(
                    $(window.dev.wds.badge(g[group]))
                )
                );
            }
            });
        });
    });
});
// Import dependencies
window.importArticles(
    {
        type: 'script',
        articles: ['u:dev:MediaWiki:WDSIcons/code.js']
    },
    {
        type: 'style',
        articles: ['MediaWiki:MastheadRightsBadge.css']
    }
);
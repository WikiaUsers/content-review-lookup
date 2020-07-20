/**
 *
 * @module                  MastheadRightsBadge
 * @description             Adds WDS avatar badges to user profiles.
 * @author                  Americhino
 * @version                 0.9.4
 * @license                 CC-BY-SA 3.0
 *
 */
// User config variables
var config = window.MastheadRightsBadgeSettings || {};
var iconSize =  config.iconSize || '50px';
// Variables
var $user = mw.config.get('wgTitle').split('/');
// Fetch MediaWiki API for user group badge messages, API fetch by Luqgreg
function GetMessages(msg) {
    return new Promise(function(resolve, reject) {
        new mw.Api().get({
            action: 'query',
            meta: 'allmessages',
            ammessages: msg.join("|"),
        }).done(function (d) {
            if(d.error) reject(d);
            var r = {};
            d.query.allmessages.forEach(function(e) {
                r[e.name] = e["*"];
            });
            resolve(r);
        }).error(reject);
    })
}
 
GetMessages([
    "user-identity-box-group-sysop",
    "user-identity-box-group-content-moderator",
    "user-identity-box-group-threadmoderator",
    "user-identity-box-group-chatmoderator",
    "user-identity-box-group-staff",
    "user-identity-box-group-helper",
    "user-identity-box-group-vstf",
    "user-identity-box-group-global-discussions-moderator",
]).then(function(m) {
    //
    var title = {
        'sysop': m["user-identity-box-group-sysop"],
        'content-moderator': m["user-identity-box-group-content-moderator"],
        'threadmoderator': m["user-identity-box-group-threadmoderator"],
        'chatmoderator': m["user-identity-box-group-chatmoderator"],
        'staff': m["user-identity-box-group-staff"],
        'helper': m["user-identity-box-group-helper"],
        'vstf': m["user-identity-box-group-vstf"],
        'global-discussions-moderator': m["user-identity-box-group-global-discussions-moderator"]
    };
    // Z-Index variable: user group hierachy
    groupPriority = {
        'sysop': '10070',
        'content-moderator': '10060',
        'threadmoderator': '10050',
        'chatmoderator': '10040',
        'staff': '10030',
        'helper': '10020',
        'vstf': '10010',
        'global-discussions-moderator': '10000',
    };
    // Fetch MediaWiki API for user group badges
    new mw.Api().get({
        action: 'query',
        list: 'users',
        usprop: 'groups',
        ususers: $user = $user[1] ? $user[1] : $user[0]
    }).then(function (data) {
    // Variables
    var groups = (data.query.users[0] || {}).groups || [];
    // User groups
    g = {
        'sysop': 'admin',
        'content-moderator': 'content-moderator',
        'threadmoderator': 'discussion-moderator',
        'chatmoderator': 'discussion-moderator',
        'staff': 'staff',
        'helper': 'helper',
        'vstf': 'vstf',
        'global-discussions-moderator': 'global-discussions-moderator',
    };
    // Create badge
    groups.forEach(function (group) {
        mw.hook('dev.wds').add(function(wds) {
            if (!g[group]) return;
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
                    $(dev.wds.badge(g[group]))
                )
                );
            });
        });
    });
});
// Import dependencies
importArticle(
    {
        type: 'script',
        article: 'u:dev:WDSIcons/code.js'
    },
    {
        type: 'style',
        article: 'u:dev:MediaWiki:MastheadRightsBadge.css'
    }
);
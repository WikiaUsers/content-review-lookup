/**
 *
 * @module                  MastheadRightsBadge
 * @description             Adds WDS avatar badges to user profiles.
 * @author                  Americhino
 * @version                 0.9.5
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
mw.hook('dev.wds').add(function(wds) {
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
        var groupPriority = {
            'sysop': '10070',
            'content-moderator': '10060',
            'threadmoderator': '10050',
            'chatmoderator': '10040',
            'staff': '10030',
            'helper': '10020',
            'vstf': '10010',
            'global-discussions-moderator': '10000',
        };
        var hierarchy = { // do something with this like "remove all badges below no 4"
            'sysop': 0,
            'content-moderator': 1,
            'threadmoderator': 2,
            'chatmoderator': 3,
            'staff': 4,
            'helper': 5,
            'vstf': 6,
            'global-discussions-moderator': 7,
        };
		var Api = new mw.Api();
        // Fetch MediaWiki API for user group badges
        Api.get({
            action: 'query',
            list: 'users',
            usprop: 'groups',
            ususers: $user = $user[1] ? $user[1] : $user[0]
        }).then(function (data) {
        	// Variables
            var groups = (data.query.users[0] || {}).groups || [];
            // User groups
            var g = {
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
                if (
                    $('.mastrightsbadge').length > 1 ||
                    window.MastRightsBadgeExists
                ) {
                    return;
                }
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
                            // zIndex: groupPriority[group],
                        }
                    }).append(
                        $(dev.wds.badge(g[group]))
                    )
                );
                window.MastRightsBadgeExists = true;
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
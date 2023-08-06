/**
 *
 * @module                  MastheadRightsBadge
 * @description             Adds WDS avatar badges to user profiles.
 * @author                  Americhino
 * @version                 1.0.2
 * @license                 CC-BY-SA 3.0
 *
 */
// User config variables
mw.loader.using('mediawiki.api').then(function() {
	var username = mw.config.get('wgRelevantUserName') || mw.config.get('profileUserName');
	if (!username) return console.log('[MastheadRightsBadge]', 'No profile');
	var isGamepedia = mw.config.get('isGamepedia');
    var config = window.MastheadRightsBadgeSettings || {};
    var iconSize = config.iconSize || (isGamepedia ? '40px' : '50px');
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
        "user-identity-box-group-sysop",
        "user-identity-box-group-content-moderator",
        "user-identity-box-group-threadmoderator",
        "user-identity-box-group-chatmoderator",
        "user-identity-box-group-staff",
        "user-identity-box-group-wiki-representative",
        "user-identity-box-group-wiki-specialist",
        "user-identity-box-group-helper",
        "user-identity-box-group-soap",
        "user-identity-box-group-global-discussions-moderator",
    ]).then(function(m) {
        //
        var title = {
            'sysop': m["user-identity-box-group-sysop"],
            'content-moderator': m["user-identity-box-group-content-moderator"],
            'threadmoderator': m["user-identity-box-group-threadmoderator"],
            'chatmoderator': m["user-identity-box-group-chatmoderator"],
            'staff': m["user-identity-box-group-staff"],
            'wiki-representative': m["user-identity-box-group-wiki-representative"],
            'wiki-specialist': m["user-identity-box-group-wiki-specialist"],
            'helper': m["user-identity-box-group-helper"],
            'soap': m["user-identity-box-group-soap"],
            'global-discussions-moderator': m["user-identity-box-group-global-discussions-moderator"]
        };
        // Z-Index variable: user group hierachy
        var groupPriority = [
            'sysop',
            'content-moderator',
            'threadmoderator',
            'chatmoderator',
            'staff',
            'wiki-representative',
            'wiki-specialist',
            'helper',
            'soap',
            'global-discussions-moderator'
        ];
        // Fetch MediaWiki API for user group badges
        api.get({
            action: 'query',
            list: 'users',
            usprop: 'groups',
            ususers: username
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
                'wiki-representative': 'staff',
                'wiki-specialist': 'staff',
                'helper': 'helper',
                'soap': 'soap',
                'global-discussions-moderator': 'global-discussions-moderator',
            };
            // Create badge
            if (isGamepedia) $('.mainavatar').css('position', 'relative');
            groupPriority.some(function(group) {
				if (groups.includes(group)) {
					console.log('[MastheadRightsBadge]', 'Found group: ' + group);
					mw.hook('dev.wds').add(function(wds) {
						$(isGamepedia ? '.mainavatar' : '.user-identity-box .user-identity-avatar').prepend(
							$('<div>', {
								'class': 'mastrightsbadge ' + 'mastrightsbadge-' + group,
								'title': title[group],
								css: {
									height: iconSize,
									position: 'absolute',
									left: '0',
									top: '0',
									width: iconSize
								}
							}).append(
								$(wds.badge(g[group]))
							)
						);
					});
					return true;
				}
			});
        });
    });
    // Import dependencies
    window.importArticles(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:WDSIcons/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:MastheadRightsBadge.css'
        }
    );
});
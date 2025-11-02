/**
 * ==============================================================================
 * TEST SPACE /START - ALWAYS PRESERVE THIS SECTION
 * ==============================================================================
*/
// importArticles({
//     type: 'script',
//     articles: [
//         'u:dev:MediaWiki:TopEditors/code.js',
//     ]
// });
// importArticles({
//     type: 'script',
//     articles: [
//         'u:dev:MediaWiki:User_Avatar_Finder/code.js',
//     ]
// });
// if (mw.config.get("wgPageName") === "MediaWiki:HallOfBeyonder.js") {
//   // Create a container for the chart
//   var testBox = document.createElement("div");
//   testBox.className = "hob-leaderboard"; // matches your script's selector
//   testBox.style.width = "100%";
//   testBox.style.height = "600px";
  
//   testBox.textContent = "Loading ...";
  
//   testBox.setAttribute("data-hob-avatar-size", "36");
//   testBox.setAttribute("data-hob-avatar-round", "50%");
  
//   // Inject into the wiki content area
//   document.getElementById("mw-content-text").appendChild(testBox);
//   console.log("Test block added");
// }
/**
 * ==============================================================================
 * TEST SPACE /END
 * ==============================================================================
*/

/**
 * Hall of Beyonder - Top Editors Leaderboard with Avatars
 * 
 * This script:
 * 1. Fetches top editors directly from MediaWiki API (recent changes)
 * 2. Generates avatar elements using User Avatar Finder integration
 * 3. Creates a formatted leaderboard with avatar + username pairs
 * 
 * Usage in wikitext:
 * <div class="hob-leaderboard" 
 *      data-hob-limit="10"
 *      data-hob-sequence="true" 
 *      data-hob-avatar="true"
 *      data-hob-avatar-size="50"
 *      data-hob-avatar-round="50%"
 *      data-hob-offset="7"
 *      data-hob-namespace=""
 *      data-hob-type="edit|new"
 *      data-hob-exclude='["BotName1","BotName2"]'></div>
 * 
 * Attributes:
 * - data-hob-limit: Number of top editors to show (default: 10)
 * - data-hob-sequence: Show sequence numbers true/false (default: true)
 * - data-hob-avatar: Show avatars true/false (default: true)
 * - data-hob-avatar-size: Avatar size in pixels (default: 50)
 * - data-hob-avatar-round: Avatar border-radius, e.g. "50%" for circle (default: 0)
 * - data-hob-offset: Days to look back (default: 7)
 * - data-hob-namespace: Namespace filter (default: '')
 * - data-hob-type: Edit types to count (default: 'edit|new')
 * - data-hob-exclude: JSON array of usernames to exclude (default: [])
 */

(function() {
    'use strict';
    
    // Configuration defaults
    var config = {
        defaultLimit: 10,
        defaultShowSequence: true,
        defaultShowAvatar: true,
        defaultAvatarSize: 50,
        defaultAvatarRound: '0',
        defaultDateOffset: 7,
        defaultNamespace: '',
        defaultType: 'edit|new',
        defaultExclude: []
    };
    
    /**
     * Fetch top editors from MediaWiki API
     */
    function fetchTopEditors(settings, callback) {
        var myDate = new Date();
        var end = myDate.toJSON();
        myDate.setDate(myDate.getDate() - settings.dateOffset);
        var start = myDate.toJSON();
        
        var userlist = {};
        
        function requestLoop(strt, cont) {
            $.getJSON(mw.util.wikiScript('api'), {
                action: 'query',
                list: 'recentchanges',
                rccontinue: cont,
                rcstart: strt,
                rcend: end,
                rcnamespace: settings.namespace,
                rctype: settings.type,
                rcdir: 'newer',
                rcprop: 'user',
                rclimit: 'max',
                format: 'json'
            }, function(data) {
                var username;
                for (var i = 0; i < data.query.recentchanges.length; i++) {
                    username = data.query.recentchanges[i].user;
                    
                    // Skip excluded users
                    if (settings.exclude.indexOf(username) !== -1) {
                        continue;
                    }
                    
                    if (userlist[username] !== undefined) {
                        userlist[username] += 1;
                    } else {
                        userlist[username] = 1;
                    }
                }
                
                // Handle pagination
                if (data['query-continue']) {
                    requestLoop(data['query-continue'].recentchanges.rcstart, undefined);
                } else if (data['continue']) {
                    requestLoop(undefined, data['continue'].rccontinue);
                } else {
                    // Done fetching, sort and return
                    var userslist = [];
                    for (var user in userlist) {
                        userslist.push({'user': user, 'count': userlist[user]});
                    }
                    
                    // Sort by count (descending), then by username (ascending)
                    userslist.sort(function(a, b) {
                        if (a.count > b.count) {
                            return -1;
                        } else if (a.count < b.count) {
                            return 1;
                        } else {
                            if (a.user < b.user) {
                                return -1;
                            } else if (a.user > b.user) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    });
                    
                    callback(userslist);
                }
            });
        }
        
        requestLoop(start, undefined);
    }
    
    /**
     * Create avatar element (compatible with User Avatar Finder)
     */
    function createAvatarElement(username, size, borderRadius) {
        var avatarDiv = document.createElement('div');
        avatarDiv.className = 'UserAvatarFetch hob-avatar';
        avatarDiv.style.cssText = 'display: inline-block; width: ' + size + 'px; height: ' + size + 'px; ' +
                                   'line-height: ' + (size - 1) + 'px; vertical-align: middle; ' +
                                   'border-radius: ' + borderRadius + '; overflow: hidden;';
        
        // Hidden username span for User Avatar Finder to read
        var usernameSpan = document.createElement('span');
        usernameSpan.className = 'avi-thisUsername';
        usernameSpan.style.display = 'none';
        usernameSpan.textContent = username;
        
        // Hidden size span
        var sizeSpan = document.createElement('span');
        sizeSpan.className = 'avi-thisSize';
        sizeSpan.style.display = 'none';
        sizeSpan.textContent = size;
        
        avatarDiv.appendChild(usernameSpan);
        avatarDiv.appendChild(sizeSpan);
        
        return avatarDiv;
    }
    
    /**
     * Create username link element
     */
    function createUsernameElement(username, editCount) {
        var usernameDiv = document.createElement('div');
        usernameDiv.className = 'hob-username';
        
        var userLink = document.createElement('a');
        userLink.href = mw.util.getUrl('User:' + username);
        userLink.textContent = username;
        userLink.className = 'hob-user-link';
        
        var countSpan = document.createElement('span');
        countSpan.className = 'hob-edit-count';
        countSpan.textContent = ' : ' + editCount;
        
        usernameDiv.appendChild(userLink);
        usernameDiv.appendChild(countSpan);
        
        return usernameDiv;
    }
    
    /**
     * Build the leaderboard
     */
    function buildLeaderboard(container, users, settings) {
        // Clear existing content
        container.innerHTML = '';
        container.classList.add('hob-leaderboard-container');
        
        // Create list (ordered or unordered based on sequence setting)
        var list = document.createElement(settings.showSequence ? 'ol' : 'ul');
        list.className = 'hob-leaderboard-list';
        if (!settings.showSequence) {
            list.style.listStyleType = 'none';
        }
        
        users.forEach(function(userObj, index) {
            var listItem = document.createElement('li');
            listItem.className = 'hob-leaderboard-item';
            listItem.setAttribute('data-rank', index + 1);
            
            // Add explicit sequence number if enabled
            if (settings.showSequence) {
                var sequenceSpan = document.createElement('span');
                sequenceSpan.className = 'hob-sequence';
                sequenceSpan.textContent = (index + 1) + '. ';
                listItem.appendChild(sequenceSpan);
            }
            
            // Add avatar if enabled
            if (settings.showAvatar) {
                var avatar = createAvatarElement(userObj.user, settings.avatarSize, settings.avatarRound);
                listItem.appendChild(avatar);
            }
            
            // Add username with edit count
            var usernameEl = createUsernameElement(userObj.user, userObj.count);
            listItem.appendChild(usernameEl);
            
            list.appendChild(listItem);
        });
        
        container.appendChild(list);
        
        // Trigger User Avatar Finder via MediaWiki hook (only if avatars are enabled)
        if (settings.showAvatar) {
            mw.hook('wikipage.content').fire($(container));
        }
    }
    
    /**
     * Parse container settings
     */
    function parseSettings(container) {
        var limit = parseInt(container.getAttribute('data-hob-limit')) || config.defaultLimit;
        var showSequenceAttr = container.getAttribute('data-hob-sequence');
        var showSequence = showSequenceAttr !== null ? (showSequenceAttr === 'true') : config.defaultShowSequence;
        var showAvatarAttr = container.getAttribute('data-hob-avatar');
        var showAvatar = showAvatarAttr !== null ? (showAvatarAttr === 'true') : config.defaultShowAvatar;
        var avatarSize = parseInt(container.getAttribute('data-hob-avatar-size')) || config.defaultAvatarSize;
        var avatarRound = container.getAttribute('data-hob-avatar-round') || config.defaultAvatarRound;
        var dateOffset = parseInt(container.getAttribute('data-hob-offset')) || config.defaultDateOffset;
        var namespace = container.getAttribute('data-hob-namespace') || config.defaultNamespace;
        var type = container.getAttribute('data-hob-type') || config.defaultType;
        var exclude = config.defaultExclude;
        
        try {
            var excludeAttr = container.getAttribute('data-hob-exclude');
            if (excludeAttr) {
                exclude = JSON.parse(excludeAttr);
            }
        } catch (e) {
            console.error('[HallOfBeyonder] Invalid exclude JSON:', e);
        }
        
        return {
            limit: limit,
            showSequence: showSequence,
            showAvatar: showAvatar,
            avatarSize: avatarSize,
            avatarRound: avatarRound,
            dateOffset: dateOffset,
            namespace: namespace,
            type: type,
            exclude: exclude
        };
    }
    
    /**
     * Initialize Hall of Beyonder
     */
    function init() {
        var containers = document.querySelectorAll('.hob-leaderboard');
        
        if (containers.length === 0) {
            return; // No leaderboard containers on this page
        }
        
        console.log('[HallOfBeyonder] Found', containers.length, 'container(s), initializing...');
        
        // Process each container
        containers.forEach(function(container) {
            container.textContent = 'Loading top contributors...';
            
            var settings = parseSettings(container);
            
            fetchTopEditors(settings, function(userslist) {
                // Limit to requested number
                var users = userslist.slice(0, settings.limit);
                
                // Build leaderboard
                buildLeaderboard(container, users, settings);
                
                console.log('[HallOfBeyonder] Leaderboard initialized with', users.length, 'users');
            });
        });
    }
    
    // Wait for MediaWiki loader and jQuery
    mw.loader.using(['mediawiki.util']).then(function() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    });
    
})();
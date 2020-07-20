/*jshint curly:false smarttabs:true */
/*global UserTagsJS */

//
// MODULE: MediaWiki Groups
// Creates tags based on selected MediaWiki user groups.
// This module fetches its tag data from the server as well.
// NOTE: This module is complicated by Wikia's weird server setup that doesn't respond to queries
//    coherently.
// NOTE: We try to speed this up slightly by caching the tag data in localStorage
// NOTE: As far as examples of modules go, this and newuser are the most complicated, try reading
//    the others first.
// TODO: Cache needs to consider possibility that lang changes.
//
UserTagsJS.extensions.mwGroups = (function($, document) {
    "use strict";
    return {
        _storageKey: 'UserTags-mwGroups-TagDataCache',
        _groupRegex: /^group-(.+)-member$/,
        start: function(config, username, logger/*, lang*/) {
            // NOTE: bannedfromchat displays in Oasis but is not a user-identity group
            var groups = ['bannedfromchat', 'blocked', 'bot', 'bureaucrat', 'chatmoderator', 'checkuser', 'content-moderator', 'council', 'helper', 'rollback', 'staff', 'sysop', 'threadmoderator', 'vanguard', 'vstf', 'global-discussions-moderator', 'content-volunteer'];
            if (!$.isArray(config)) {
                config = groups;
            } else if (window.UserTagsMergeMWGroups === true) {
                config = _.union(config, groups);
            }
            // Convert array into a hash
            var set = {}, sanity = /^[A-Za-z0-9\-]+$/, messages = [];
            for (var i = 0 , len = config.length ; i < len ; ++i) {
                if (set[config[i]] === 1) { // Duplicates
                    logger.wrn('Duplicate group:', config[i]);
                    continue;
                } else if (sanity.test(config[i])) {
                    messages[messages.length] = 'group-' + config[i] + '-member';
                } else { // "group-all"/* is ignored since it's pointless
                    logger.wrn('Bad MediaWiki group:', config[i]);
                    continue;
                }
                set[config[i]] = 1;
            }
            this._groups = set;
            this._user = username;

            var data = {
                ajax: [
                {
                    type: 'user',
                    prop: ['groups']
                }, {
                    list: 'users',
                    ususers: username,
                    usprop: 'groups'
                }
                ]
            };

            // Rather than repeatedly query the same data over and over, we cache the tag data
            // in localStorage with a timeout. (Timeout is in case someone alters the server
            // message which is unlikely but possible)
            var cache = {};
            try {
                cache = window.localStorage && JSON.parse(window.localStorage.getItem(this._storageKey));
            } catch (ex) {
                logger.wrn('ls error', ex);
                cache = null;
            }
            if (cache && cache.expiry > Date.now() && this._isSameConfig(cache, set)) {
                // Cache exists so we'll just use that
                data.tags = this._processMessages(cache.data, true);
            } else {
                // Cache is either missing or expired so query for it
                data.ajax[2] = {
                    type: 'usermessage',
                    messages: messages
                };
            }

            return data;
        },
        // Check if the config has had new groups added to the list array which aren't in the
        // cache (which makes the cache worthless).
        _isSameConfig: function(cache, groups) {
            if (!$.isArray(cache = cache.data)) return false;
            var regex = this._groupRegex, data, i = 0, len = cache.length;
            groups = $.extend({}, groups);
            for ( ; i < len ; ++i) {
                if ((data = regex.exec(cache[i].name))) {
                    delete groups[data[1]];
                }
            }
            return $.isEmptyObject(groups);
        },
        _processMessages: function(json, fromCache) {
            var i = json.length, tags = {}, regex = this._groupRegex,
                $node = $(document.createElement('div')), group;
            while (i--) {
                if (json[i].missing !== void 0) continue;
                group = regex.exec(json[i].name);
                if (!group) continue;
                // Weight is boosted since we went to all the trouble of fetching it
                // from the server, only user should override this.
                // May contain HTML, discard that stuff
                tags[group[1]] = { u: $node.html(json[i]['*']).text(), weight: 1e100, order: 0 };
            }
            try {
                if (!fromCache && window.localStorage) {
                    window.localStorage.setItem(this._storageKey, JSON.stringify({
                        expiry: Date.now() + 432e5, // +12hr from now
                        data: json
                    }));
                }
            } catch (ex) {
                logger.wrn('ls error', ex);
            }
            return tags;
        },
        _processGroups: function(groups, data) {
            // Even if we ask for it, it may be missing anyway (e.g. global account with no edits)
            // Name may not match in list=users (shouldn't happen but it is an imprecise query)
            if (data.name === this._user && $.isArray(data = data.groups)) {
                for (var i = 0, len = data.length ; i < len ; ++i) {
                    if (this._groups[data[i]] === 1) {
                        groups[groups.length] = data[i];
                    }
                }
            }
            return groups;
        },
        generate: function(json, json2, json3) {
            // prepare to patch global blacklist for any requested group
            // export users groups here
            this._userGroups = false;// do not try to trick this very smart script!
            try {
                this._userGroups = json.query.users[0].groups;
            } catch (exc) {}
            // end of previous block
            return {
                groups: this._processGroups(
                    this._processGroups([], json.query.users[0]),
                    json2.query.users[0]
                ),
                // If we used the cache then json3 will be undefined (since we didn't ask for it)
                tags: !!json3 && this._processMessages(json3.query.allmessages)
            };
        }
    };
})(jQuery, document);
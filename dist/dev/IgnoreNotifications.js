/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.ignore_notifications
        && window.andrewds1021.ignore_notifications.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            ignore_notifications: {}
        };
    } else if (!window.andrewds1021.ignore_notifications) {
        window.andrewds1021.ignore_notifications = {};
    }
    window.andrewds1021.ignore_notifications.has_run = true;
    
/* import dependencies */
    
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:GetOnSiteNotifications.js"
        ]
    });
    
/*
 * list of unblockable user groups
 * jQuery Deferred for retrieving unblockable users
 * list of legacy notification types
 * list of UCP notification types
 * map from notification card type to notification type
 * MediaWiki configuration values
 * domain for requests
 * whether or not to operate as a whitelist
 * whether or not to proceed even if there was an error with notification retrieval
 * whether or not to try to retrieve complete lists of users for notifications
 * maximum number of notifications to retrieve per request to the service
 * whether or not to auto-convert settings from AnnouncementsIgnore
 * AnnouncementsIgnore settings
 * timestamp to generate unique IDs for notification requests
 * list of unblockable users, list of filters, running status, dismissal delay,
   MediaWiki API object
*/
    
    var unblock_groups = [
        "helper",
        "soap",
        "staff",
        "vstf",
        "wiki-manager"
    ];
    var unblock_def = jQuery.Deferred();
    var notif_types = [
        "announcement-target",
        "discussion-post",
        "discussion-upvote",
        "post-at-mention",
        "thread-at-mention",
        "article-comment-at-mention",
        "article-comment-reply",
        "article-comment-reply-at-mention",
        "message-wall-post",
        "message-wall-thread",
        "talk-page-message"
    ];
    var data_types = {
        "announcement": "announcement",
        "article-comment-at-mention": "article-comment-at-mention",
        "article-comment-reply": "article-comment-reply",
        "article-comment-reply-at-mention": "article-comment-reply-at-mention",
        "discussion-reply": "replies",
        "discussion-upvote-post": "upvote",
        "discussion-upvote-reply": "upvote",
        "message-wall-reply": "message-wall-reply",
        "message-wall-post": "message-wall-post",
        "post-at-mention": "post-at-mention",
        "talk-page-message": "talk-page",
        "thread-at-mention": "thread-at-mention"
    };
    var config = mw.config.get([
        "wgServer",
        "skin"
    ]);
    var domain = config.wgServer.split(".").slice(-2).join(".");
    var whitelist = !!window.andrewds1021.ignore_notifications.whitelist;
    var ignore_errors = !!window.andrewds1021.ignore_notifications.ignore_errors;
    var all_users = !!window.andrewds1021.ignore_notifications.all_users;
    var limit = window.andrewds1021.ignore_notifications.limit;
    var convert = !window.andrewds1021.ignore_notifications.no_conversion;
    var ai_settings = window.announcementsIgnore;
    var timestamp = Date.now();
    var unblock, filters, running, delay, api;
    
/* recursive functions to retrieve unblockable users */
    
/*
 * this version is for UCP and requires the following request object
{
    action: "query",
    list: "allusers",
    augroup: unblock_groups.join("|"),
    aulimit: 500
}
*/
    
    function getUnblocks(obj) {
        api.get(obj.request).then(function (data) {
            if (data && data.query && data.query.allusers)
                data.query.allusers.forEach(function (val) {
                obj.ids.push(String(val.userid));
            });
            if (data && data["continue"] && data["continue"].aufrom) {
                obj.request.aufrom = data["continue"].aufrom;
                getUnblocks(obj);
            } else {
                unblock = obj.ids;
                unblock_def.resolve(obj.ids);
            }
        });
    }
    
/*
 * this is an alternate version for UCP and requires the following request object
{
    action: "listuserssearchuser",
    groups: unblock_groups.join(","),
    contributed: 0,
    order: "edits",
    sort: "asc",
    limit: 10,
    offset: 0
}
*/
    
    function getUnblocksb(obj) {
        unblock = [];
        unblock_def.resolve(unblock);
/*
        api.get(obj.request).then(function (data) {
            if (!data || !data.listuserssearchuser) {
                unblock = obj.ids;
                unblock_def.resolve(obj.ids);
                return;
            }
            var i;
            for (i = 0; (i < obj.request.limit) && data.listuserssearchuser[i]; i++) {
                obj.ids.push(data.listuserssearchuser[i].user_id);
            }
            if (i == obj.request.limit) {
                obj.request.offset = obj.request.offset + obj.request.limit;
                getUnblocksb(obj);
            } else {
                unblock = obj.ids;
                unblock_def.resolve(obj.ids);
            }
        });
*/
    }
    
/* after API module is loaded, retrieve unblockable users */
    
    mw.loader.using("mediawiki.api").then(function () {
        api = new mw.Api();
        getUnblocksb({
            ids: [],
            request: {
                action: "listuserssearchuser",
                groups: unblock_groups.join(","),
                contributed: 0,
                order: "edits",
                sort: "asc",
                limit: 10,
                offset: 0
            }
        });
    });
    
/*
 * remove duplicates from an array, convert a single value to an array, or
   return an empty array
 * remove values other than non-empty strings and finite numbers
*/
    
    function cleanFilterProperty(prop) {
        if (Array.isArray(prop)) {
            prop = prop.filter(function (val, idx, arr) {
                return (idx == arr.indexOf(val))
                    && (((typeof val == "string") && val)
                    || ((typeof val == "number") && isFinite(val)));
            });
        } else if (((typeof prop == "string") && prop)
            || ((typeof prop == "number") && isFinite(prop))) {
            prop = [prop];
        } else {
            prop = [];
        }
        return prop;
    }
    
/* function to parse an age criteria into milliseconds */
    
    function parseAge(age) {
        var ms;
        if ((typeof age == "number") && isFinite(age)) {
            ms = Math.max(Math.floor(age), 0);
        } else if (age && (typeof age == "object")) {
            ms = 0;
            if ((typeof age.days == "number") && isFinite(age.days))
                ms = ms + Math.max(age.days, 0);
            ms = 24 * ms;
            if ((typeof age.hours == "number") && isFinite(age.hours))
                ms = ms + Math.max(age.hours, 0);
            ms = 60 * ms;
            if ((typeof age.minutes == "number") && isFinite(age.minutes))
                ms = ms + Math.max(age.minutes, 0);
            ms = 60 * ms;
            if ((typeof age.seconds == "number") && isFinite(age.seconds))
                ms = ms + Math.max(age.seconds, 0);
            ms = Math.floor(1000 * ms);
        }
        return ms;
    }
    
/*
 * recursive function to "clean" an array of filters, convert a single filter to
   an array, or return an empty array
 * remove values other than non-null objects
 * remove duplicate filter references
 * prevent filter loops
 * "clean" relevant filter properties
*/
    
    function cleanFiltersAndGetNames(filters, ancestors) {
        if (!ancestors || !Array.isArray(ancestors)) ancestors = [];
        if (Array.isArray(filters)) {
            filters = filters.filter(function (val, idx, arr) {
                return (typeof val == "object") && val
                    && (idx == arr.indexOf(val))
                    && (ancestors.indexOf(val) == -1);
            });
        } else if ((typeof filters == "object") && filters
            && (ancestors.indexOf(filters) == -1)) {
            filters = [filters];
        } else {
            filters = [];
        }
        filters.forEach(function (val, idx, arr) {
            arr[idx] = {
                wiki_ids: cleanFilterProperty(val.wiki_ids),
                wiki_names: cleanFilterProperty(val.wiki_names),
                user_ids: cleanFilterProperty(val.user_ids),
                user_names: cleanFilterProperty(val.user_names),
                types: cleanFilterProperty(val.types),
                age: parseAge(val.age),
                not: cleanFiltersAndGetNames(val.not, ancestors.concat(val))
            };
        });
        return filters;
    }
    
/* retrieve filters */
    
    filters = cleanFiltersAndGetNames(window.andrewds1021.ignore_notifications
        .filters);
    
/* if auto-conversion is enabled, convert and append resulting filter */
    
    if (convert && ai_settings && ((ai_settings.option === "opt-in-all")
        || (ai_settings.option === "opt-out-all"))) {
        if ((!whitelist && (ai_settings.option == "opt-in-all"))
            || (whitelist && (ai_settings.option != "opt-in-all"))) {
            filters.push({
                wiki_ids: cleanFilterProperty(ai_settings.exceptWikiIds),
                wiki_names: [],
                user_ids: [],
                user_names: [],
                types: ["announcement-target"],
                not: []
            });
        } else {
            filters.push({
                wiki_ids: [],
                wiki_names: [],
                user_ids: [],
                user_names: [],
                types: ["announcement-target"],
                not: [{
                    wiki_ids: cleanFilterProperty(ai_settings.exceptWikiIds),
                    wiki_names: [],
                    user_ids: [],
                    user_names: [],
                    types: [],
                    not: []
                }]
            });
        }
    }
    
/*
 * recursive function to determine if a notification matches any filters
 * wiki matches if no names and no IDs were specified or if name or ID matches
   a specified name or ID respectively
 * user matches if no names and no IDs were specified or, for a...
   * whitelist, any user's
   * blacklist, each user's
   ...name or ID matches a specified name or ID respectively
 * type matches if no types were specified or if the type was specified
 * age matches if no valid age was specified or, for a...
   * whitelist, the notification is at most as old as
   * blacklist, the notification is older than
   ...the specified age
 * exception list is considered as the opposite type (whitelist or blacklist)
   of its parent
 * filter matches if wiki, user, type, and age match but exception list does not
 * filter list matches if any filter matches
*/
    
    function matchesFilters(notif, filters, white, time) {
        return filters.some(function (filt) {
            var wiki = (filt.wiki_ids.length == 0) && (filt.wiki_names.length == 0);
            if (!wiki) wiki = filt.wiki_ids.some(function (val) {
                return val == notif.community.id;
            });
            if (!wiki) wiki = filt.wiki_names.some(function (val) {
                return val == notif.community.name;
            });
            var user = (filt.user_ids.length == 0) && (filt.user_names.length == 0);
            if (!user) {
                if (white) {
                    user = notif.events.latestActors.some(function (val1) {
                        return filt.user_ids.some(function (val2) {
                            return val2 == val1.id;
                        }) || filt.user_names.some(function (val2) {
                            return val2 == val1.name;
                        });
                    });
                } else {
                    user = notif.events.latestActors.every(function (val1) {
                        return filt.user_ids.some(function (val2) {
                            return val2 == val1.id;
                        }) || filt.user_names.some(function (val2) {
                            return val2 == val1.name;
                        });
                    });
                }
            }
            var type = filt.types.length == 0;
            if (!type) type = filt.types.some(function (val) {
                return val == notif.events.latestEvent.type;
            });
            var age = typeof filt.age == "undefined";
            if (!age) age = (notif.events.latestEvent.when <
                (new Date(time - filt.age)).toISOString()) != white;
            return wiki && user && type && age
                && !matchesFilters(notif, filt.not, !white, time);
        });
    }
    
/* retrieve dismissal delay and set to 0 if invalid (or 0) */
    
    delay = parseAge(window.andrewds1021.ignore_notifications.delay);
    if (!delay) delay = 0;
    
/*
 * function to sort through notifications, identify notifications to dismiss,
   attempt notification dismissal, and update display
 * restrict sorting to unread notifications
 * mark a notification for dismissal if it meets all of the following
   * older than the specified delay for dismissing notifications
   * lists all users
   * does not list any unblockable users
   * should be blocked according to filters and filter mode
 * unmark a notification for dismissal if it shares a URL with a notification
   that is not to be dismissed
 * if there are no notifications to dismiss, return
 * submit request to mark notifications as read
   * if request fails, return
   * if request succeeds
     * submit request for unread notification count
       * if request succeeds, update unread count indicator
     * for each notification card marked as unread
       * search for matching dismissed notification
       * if match found, update notification card
*/
    
    function processNotifications(notifs, info) {
        var keep = [];
        var dismiss = [];
        var req_time = new Date(info.time);
        var time = (new Date(req_time - delay)).toISOString();
        notifs.filter(function (val) {
            return !val.read;
        }).forEach(function (val1) {
            if (val1.events.latestEvent.when < time
                && (val1.events.totalUniqueActors == val1.events.latestActors.length)
                && val1.events.latestActors.every(function (val2) {
                    return unblock.indexOf(val2.id) == -1;
                })
                && (matchesFilters(val1, filters, whitelist, req_time) != whitelist)) {
                dismiss.push(val1);
            } else {
                keep.push(val1.refersTo.uri);
            }
        });
        dismiss = dismiss.filter(function (val1) {
            return !keep.some(function (val2) {
                return val2 === val1.refersTo.uri;
            });
        });
        if (!dismiss.length) {
            running = false;
            return;
        }
        jQuery.ajax({
            url: "https://services." + domain + "/on-site-notifications"
                + "/notifications/mark-as-read/by-uri",
            type: "POST",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(dismiss.map(function (val) {
                return val.refersTo.uri;
            })),
            contentType: "application/json; charset=UTF-8"
        }).then(function () {
            var count_def = jQuery.ajax({
                url: "https://services." + domain + "/on-site-notifications"
                    + "/notifications/unread-count",
                type: "GET",
                crossDomain: true,
                traditional: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                data: {
                    startingTimestamp: info.time,
                    contentType: notif_types
                }
            });
            if (config.skin === "fandomdesktop") {
                var notif_section = document.querySelector(".global-navigation__bottom"
                    + " .notifications");
                if (!notif_section) {
                    running = false;
                    return;
                }
                jQuery.when(count_def, api.get({
                    action: "notifications",
                    do: "getNotificationsForUser",
                    itemsPerPage: 1,
                    unread: 1
                })).then(function (fandom_reply, gamepedia_reply) {
                    fandom_reply = fandom_reply[0];
                    gamepedia_reply = gamepedia_reply[0];
                    if ((typeof fandom_reply.unreadCount != "number")
                        || !isFinite(fandom_reply.unreadCount)) return;
                    var global_counter =
                        notif_section.querySelector(".notifications__counter");
                    var fandom_counter = notif_section.querySelector(
                        "[data-tracking-label=\"notifications-tab-fandom\"]"
                        + " .NotificationsDropdown-module_tabTotal__p7gqN");
                    if (global_counter && (typeof gamepedia_reply.meta.unread == "number")
                        && isFinite(gamepedia_reply.meta.unread)) {
                        var global_unread = fandom_reply.unreadCount
                            + gamepedia_reply.meta.unread;
                        global_counter.textContent = global_unread;
                        if (global_unread == 0)
                            global_counter.classList.add("wds-is-hidden");
                    }
                    if (fandom_counter) {
                        fandom_counter.textContent = fandom_reply.unreadCount;
                        if (fandom_reply.unreadCount == 0)
                            fandom_counter.classList.add("wds-is-hidden");
                    }
                });
                var fandom_list = notif_section.querySelectorAll(".wds-tab__content")[0];
                if (!fandom_list) {
                    running = false;
                    return;
                }
                Array.prototype.slice.call(fandom_list.querySelectorAll(
                    ".NotificationCard-module_isUnread__25iz-")).forEach(function (val) {
                    var num = dismiss.length;
                    var type = val.getAttribute("data-tracking-label").slice(19);
                    var link = val.children[0].getAttribute("href");
                    var search = true;
                    var notif, i;
                    for (i = 0; search && (i < num); i++) {
                        notif = dismiss[i];
                        if ((link == notif.events.latestEvent.uri)
                            && (data_types[type] + "-notification" == notif.type)) {
                            val.classList.remove(
                                "NotificationCard-module_isUnread__25iz-");
                            search = false;
                        }
                    }
                });
            } else {
                count_def.then(function (count_reply) {
                    var counter = document.getElementById("onSiteNotificationsCount");
                    if (!counter || (typeof count_reply.unreadCount != "number")
                        || !isFinite(count_reply.unreadCount)) return;
                    counter.textContent = count_reply.unreadCount;
                    if (count_reply.unreadCount == 0)
                        counter.classList.add("wds-is-hidden");
                });
                Array.prototype.slice.call(document.querySelectorAll(
                    "#notificationContainer li.wds-is-unread")).forEach(
                    function (val) {
                    var num = dismiss.length;
                    var type = val.getAttribute("data-type");
                    var ref = val.getAttribute("data-uri");
                    var link = val.getElementsByClassName("wds-notification-card"
                        + "__outer-body")[0].getAttribute("href");
                    var search = true;
                    var notif, i;
                    for (i = 0; search && (i < num); i++) {
                        notif = dismiss[i];
                        if ((link == notif.events.latestEvent.uri)
                            && (data_types[type] + "-notification" == notif.type)
                            && (ref == notif.refersTo.uri)) {
                            val.classList.remove("wds-is-unread");
                            search = false;
                        }
                    }
                });
            }
            running = false;
        }, function () {
            running = false;
        });
    }
    
/* functions to request and recieve notifications */
    
    function getNotifications() {
        if (running) return;
        running = true;
        timestamp = Date.now();
        var info = {
            id: "andrewds1021.ignore_notifications." + timestamp,
            limit: limit
        };
        if (all_users) info.mode = "user";
        mw.hook("andrewds1021.get_on_site_notifications.run").fire(Object.freeze(info));
    }
    
    function recieveNotifications(notifs, info) {
        if (info.id !== "andrewds1021.ignore_notifications." + timestamp) return;
        timestamp = Date.now();
        if (!info.error || ignore_errors) {
            processNotifications(notifs, info);
        } else {
            running = false;
        }
    }
    
/* function for initial run */
    
    function firstRun(notifs, info) {
        if (((info.counter === 0) && (!all_users || (info.mode !== "notification")))
            || (info.id === "andrewds1021.ignore_notifications." + timestamp)) {
            running = true;
            timestamp = Date.now();
            mw.hook("andrewds1021.get_on_site_notifications.done").remove(firstRun);
            if (!info.error || ignore_errors) {
                processNotifications(notifs, info);
            } else {
                running = false;
            }
            mw.hook("andrewds1021.get_on_site_notifications.done")
                .add(recieveNotifications);
            mw.hook("andrewds1021.ignore_notifications.run").add(getNotifications);
            mw.hook("andrewds1021.ignore_notifications.ready").fire();
        } else {
            getNotifications();
        }
    }
    
/* after unblock list is loaded, add firstRun to hook */
    
    unblock_def.then(function () {
        mw.hook("andrewds1021.get_on_site_notifications.done").add(firstRun);
    });
    
})();
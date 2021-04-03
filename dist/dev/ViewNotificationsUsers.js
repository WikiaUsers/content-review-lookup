/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.view_notifications_users
        && window.andrewds1021.view_notifications_users.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            view_notifications_users: {}
        };
    } else if (!window.andrewds1021.view_notifications_users) {
        window.andrewds1021.view_notifications_users = {};
    }
    window.andrewds1021.view_notifications_users.has_run = true;
    
/* import dependencies */
    
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:GetOnSiteNotifications.js"
        ]
    });
    
/*
 * list of data-type values and associated notification types
 * list of notification types to add users list to
 * whether or not to get all users for a notification
 * count of notifications to get per request
 * whether or not to avoid notifications that cannot be uniquely identified
 * processing queue
 * list element containing the notification cards
 * update flag
 * timestamp for request id
 * running status, notification list
*/
    
    var notif_types = Object.freeze({
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
    });
    var types = window.andrewds1021.view_notifications_users.types;
    if (Array.isArray(types)) {
        types = types.filter(function (val) {
            return typeof val == "string";
        });
    } else if (typeof types == "string") {
        types = [types];
    } else {
        types = [];
    }
    if (types.length) {
        Object.freeze(types);
    } else {
        types = undefined;
    }
    var all_users = !!window.andrewds1021.view_notifications_users.all_users;
    var limit = window.andrewds1021.view_notifications_users.limit;
    var unique = !window.andrewds1021.view_notifications_users.all_types;
    var queue = [];
    var cards = document.getElementById("notificationContainer");
    var update = true;
    var timestamp = Date.now();
    var running, notifications;
    
/* select string generation function based on desired content */
    
    var content = window.andrewds1021.view_notifications_users.content;
    var createString;
    if (content === "id") {
        createString = function (list) {
            var max_idx = list.length - 1;
            var str = "";
            for (var i = 0; i < max_idx; i++) {
                str = str + list[i].id + "\n";
            }
            str = str + list[max_idx].id;
            return str;
        };
    } else if (content === "name") {
        createString = function (list) {
            var max_idx = list.length - 1;
            var str = "";
            for (var i = 0; i < max_idx; i++) {
                str = str + list[i].name + "\n";
            }
            str = str + list[max_idx].name;
            return str;
        };
    } else {
        createString = function (list) {
            var max_idx = list.length - 1;
            var str = "";
            for (var i = 0; i < max_idx; i++) {
                str = str + list[i].name + " (" + list[i].id + ")\n";
            }
            str = str + list[max_idx].name + " (" + list[max_idx].id + ")";
            return str;
        };
    }
    
/* observer for when more notifications are loaded */
    
    var observer = new MutationObserver(function (records) {
        var nodes = [];
        records.forEach(function (val) {
            Array.prototype.push.apply(nodes, val.addedNodes);
        });
        queue.push(nodes);
        if (!running) {
            running = true;
            addUsers();
        }
    });
    
/* function to request a new list of notifications */
    
    function requestNotifications() {
        if (running) {
            update = true;
            return;
        }
        running = true;
        timestamp = Date.now();
        var info = {
            id: "andrewds1021.view_notifications_users." + timestamp,
            types: types,
            limit: limit
        };
        if (all_users) info.mode = "user";
        mw.hook("andrewds1021.get_on_site_notifications.run")
            .fire(Object.freeze(info));
    }
    
    function receiveNotifications(notifs, info) {
        if (info.id !== "andrewds1021.view_notifications_users." + timestamp) return;
        timestamp = Date.now();
        notifications = notifs;
        update = false;
        addUsers();
    }
    
/* recursive function to add list of users to notification cards
 * if there are no more lists of notification cards or a notifications update
   has been requested, terminate function execution
 * retrieve list of notification cards from the queue
 * for each notification card
   * retrieve information required to determine a match
   * iterate through notifications until a match is found or all have been checked
   * when a match is found
     * set flag to short-circuit checking more notifications
     * generate list of users
     * add vertical ellipsis if there are unlisted users
     * set list of users as title of match
 * run again
*/
    
    function addUsers() {
        if (update || !queue.length) {
            running = false;
            if (update) requestNotifications();
            return;
        }
        queue.shift().filter(function (val) {
            return val.classList && val.classList.contains("wds-notification-card");
        }).forEach(function (val) {
            var data_type = val.getAttribute("data-type");
            if (unique && ((data_type == "discussion-upvote-post")
                || (data_type == "talk-page-message"))) return;
            var ref_uri = val.getAttribute("data-uri");
            var link_uri = val.getElementsByClassName("wds-notification-card"
                + "__outer-body")[0].getAttribute("href");
            var not_found = true;
            var num = notifications.length;
            var notif, users, i;
            for (i = 0; not_found && (i < num); i++) {
                notif = notifications[i];
                if ((link_uri == notif.events.latestEvent.uri)
                    && (notif_types[data_type] + "-notification" == notif.type)
                    && (ref_uri == notif.refersTo.uri)) {
                    not_found = false;
                    users = createString(notif.events.latestActors);
                    if (notif.events.totalUniqueActors > notif.events
                        .latestActors.length) users = users + "\n\u22ee";
                    val.title = users;
                }
            }
        });
        addUsers();
    }
    
/*
 * get initial list of notifications
 * finish setting up for continuous operation
 * fire ready hook
*/
    
    function firstRun(notifs, info) {
        if (((info.counter === 0) && (!all_users || (info.mode !== "notification")))
            || (info.id === "andrewds1021.view_notifications_users." + timestamp)) {
            update = false;
            timestamp = Date.now();
            mw.hook("andrewds1021.get_on_site_notifications.done").remove(firstRun);
            notifications = notifs;
            running = true;
            observer.observe(cards, {childList: true});
            queue.push(Array.prototype.slice.call(cards.children));
            addUsers();
            mw.hook("andrewds1021.get_on_site_notifications.done")
                .add(receiveNotifications);
            mw.hook("andrewds1021.view_notifications_users.run")
                .add(requestNotifications);
            mw.hook("andrewds1021.view_notifications_users.ready").fire();
        } else if (update) {
            update = false;
            requestNotifications();
        }
    }
    
/* add firstRun to hook */
    
    mw.hook("andrewds1021.get_on_site_notifications.done").add(firstRun);
    
})();
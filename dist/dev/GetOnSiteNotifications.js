/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.get_on_site_notifications
        && window.andrewds1021.get_on_site_notifications.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            get_on_site_notifications: {}
        };
    } else if (!window.andrewds1021.get_on_site_notifications) {
        window.andrewds1021.get_on_site_notifications = {};
    }
    window.andrewds1021.get_on_site_notifications.has_run = true;
    
/*
 * service domain
 * counter to track number of requests
 * queue of requests
 * request processing status
 * list of notification types to retrieve
 * list of available retrieval modes
 * retrieval mode limit
 * default retrieval mode
 * reply count limit limit
 * default reply count limit
 * page count limit
 * default page count
*/
    
    var domain = mw.config.get("wgServer").split(".").slice(-2).join(".");
    var counter = 0;
    var queue = [];
    var running = false;
    var notif_types = window.andrewds1021.get_on_site_notifications.types;
    if (Array.isArray(notif_types)) {
        notif_types = notif_types.filter(function (val) {
            return typeof val == "string";
        });
    } else if (typeof notif_types == "string") {
        notif_types = [notif_types];
    } else {
        notif_types = [];
    }
    if (!notif_types.length) notif_types = [
        "announcement-target",
        "article-comment-at-mention",
        "article-comment-reply",
        "article-comment-reply-at-mention",
        "discussion-post",
        "discussion-upvote",
        "message-wall-post",
        "message-wall-thread",
        "post-at-mention",
        "talk-page-message",
        "thread-at-mention"
    ];
    Object.freeze(notif_types);
    var run_modes = Object.freeze([
        "notification",
        "user",
        "event"
    ]);
    var mode_limit = run_modes.indexOf(window.andrewds1021
        .get_on_site_notifications.mode_limit);
    if (mode_limit == -1) mode_limit = run_modes.length - 1;
    var default_mode = run_modes.indexOf(window.andrewds1021
        .get_on_site_notifications.default_mode);
    if (default_mode == -1) {
        default_mode = 0;
    } else if (default_mode > mode_limit) {
        default_mode = mode_limit;
    }
    var limit_limit = window.andrewds1021.get_on_site_notifications.limit_limit;
    if ((typeof limit_limit != "number") || !isFinite(limit_limit)
        || (limit_limit > 50)) {
        limit_limit = 50;
    } else if (limit_limit < 1) {
        limit_limit = 1;
    } else {
        limit_limit = Math.floor(limit_limit);
    }
    var default_limit = window.andrewds1021.get_on_site_notifications.default_limit;
    if ((typeof default_limit != "number") || !isFinite(default_limit)) {
        default_limit = undefined;
    } else if (default_limit > limit_limit) {
        default_limit = limit_limit;
    } else if (default_limit < 1) {
        default_limit = 1;
    } else {
        default_limit = Math.floor(default_limit);
    }
    var count_limit = window.andrewds1021.get_on_site_notifications.count_limit;
    if ((typeof count_limit != "number") || isNaN(count_limit)) {
        count_limit = Infinity;
    } else if (count_limit < 0) {
        count_limit = 0;
    } else {
        count_limit = Math.floor(count_limit);
    }
    var default_count = window.andrewds1021.get_on_site_notifications.default_count;
    if ((typeof default_count != "number") || isNaN(default_count)
        || (default_count > count_limit)) {
        default_count = count_limit;
    } else if (default_count < 0) {
        default_count = 0;
    } else {
        default_count = Math.floor(default_count);
    }
    
/* recursive function to deep freeze an object */
    
    function deepFreeze(obj) {
        var keys = Object.keys(obj);
        var num = keys.length;
        var val, i;
        for (i = 0; i < num; i++) {
            val = obj[keys[i]];
            if (val && ((typeof val == "object") || (typeof val == "function")))
                deepFreeze(val);
        }
        return Object.freeze(obj);
    }
    
/* constructor for an AJAX notification request */
    
    function notifRequest(types, time, limit, page) {
        this.url = "https://services." + domain
            + "/on-site-notifications/notifications";
        this.type = "GET";
        this.crossDomain = true;
        this.traditional = true;
        this.xhrFields = {
                withCredentials: true
        };
        this.dataType = "json";
        this.data = {};
        if (types) {
            this.data.contentType = types;
        } else {
            this.data.contentType = notif_types;
        }
        if (time) this.data.startingTimestamp = time;
        if (limit) this.data.limit = limit;
        if (page) this.data.page = page;
    }
    
/* constructor for a notification retrieval batch */
    
    function notifBatch(config) {
        if (!config || (typeof config != "object")) config = {};
        this.counter = counter++;
        this.identifier = config.id;
        this.notifs = [];
        var page_count = config.page_count;
        if ((typeof page_count != "number") || isNaN(page_count)) {
            page_count = default_count;
        } else if (page_count > count_limit) {
            page_count = count_limit;
        } else if (page_count < 0) {
            page_count = 0;
        } else {
            page_count = Math.floor(page_count);
        }
        this.page_count = page_count;
        this.page_index = page_count;
        var mode = run_modes.indexOf(config.mode);
        if (mode == -1) {
            mode = default_mode;
        } else if (mode > mode_limit) {
            mode = mode_limit;
        }
        this.mode = mode;
        var types = config.types;
        if (Array.isArray(types)) {
            types = types.filter(function (val) {
                return typeof val == "string";
            });
        } else if (typeof types == "string") {
            types = [types];
        } else {
            types = [];
        }
        if (!types.length) types = notif_types;
        this.types = types;
        var time = new Date(config.time);
        if (isNaN(time)) {
            time = (new Date()).toISOString();
        } else {
            time = time.toISOString();
        }
        this.time = time;
        var limit = config.limit;
        if ((typeof limit != "number") || !isFinite(limit)) {
            limit = default_limit;
        } else if (limit > limit_limit) {
            limit = limit_limit;
        } else if (limit < 1) {
            limit = 1;
        } else {
            limit = Math.floor(limit);
        }
        this.limit = limit;
        var page = config.page;
        if ((typeof page != "number") || !isFinite(page) || (page < 1)) {
            page = 1;
        } else {
            page = Math.floor(page);
        }
        this.page = page;
        this.request = new notifRequest(types, time, limit, page);
    }
    
/* recursive function to retrieve additional details
 * if request object does not exist
   * if there are more notifications to get details for (i.e. available targets),
     select one of them (i.e. the target) and create a request object for it
   * else
     * freeze and return notifications and batch information
     * if there are queued batches, process next batch
     * else set running status to false
     * terminate processing of batch
 * after results are returned from the request
   * if notifications were retrieved, attempt to find a match for the target
   * if a match was found
     * append additional details to target
     * if target has more details to retrieve, update request object and submit
       another request for the same target
   * else if parameters can be extracted to retrieve the next page of results,
     update request object and submit another request for the same target
   * if a match was found but no additional details are needed or a match could
     not be found and additional results could not be retrieved
     * remove the target from the list of available targets
     * delete the request object for the target
     * submit another request
*/
    
    function getDetails(obj, notifs) {
        var target = notifs[0];
        if (!obj.request) {
            if (target) {
                obj.request = new notifRequest([target.events.latestEvent.type],
                    target.events.latestEvent.when);
            } else {
                var info = {
                    counter: obj.counter,
                    id: obj.identifier,
                    page_count: obj.page_count,
                    mode: run_modes[obj.mode],
                    types: Object.freeze(obj.types),
                    time: obj.time,
                    limit: obj.limit,
                    page: obj.page
                };
                if (obj.error) info.error = deepFreeze(obj.error);
                mw.hook("andrewds1021.get_on_site_notifications.done")
                    .fire(deepFreeze(obj.notifs), Object.freeze(info));
                if (queue.length) {
                    getNotifications(new notifBatch(queue.shift()));
                } else {
                    running = false;
                }
                return;
            }
        }
        jQuery.ajax(obj.request).then(function (data) {
            var match, i;
            if (data && data.notifications) {
                var num = data.notifications.length;
                for (i = 0; !match && (i < num); i++) {
                    if (data.notifications[i].refersTo.uri == target.refersTo.uri)
                        match = data.notifications[i];
                }
            }
            if (match) {
                target.events.otherEvents.push(match.events.latestEvent);
                Array.prototype.push.apply(target.events.latestActors,
                    match.events.latestActors.filter(function (val1) {
                    return !target.events.latestActors.some(function (val2) {
                        return val1.id == val2.id;
                    });
                }));
                if (((obj.mode == 1) && (match.events.totalUniqueActors > 5))
                    || ((obj.mode == 2) && (match.events.total > 1))) {
                    obj.request.data.startingTimestamp = match.events.latestEvent.when;
                    delete obj.request.data.page;
                    getDetails(obj, notifs);
                    return;
                }
            } else if (data && data._links && data._links.next) {
                var limit = mw.util.getParamValue("limit", data._links.next);
                var page = mw.util.getParamValue("page", data._links.next);
                if (limit && page) {
                    obj.request.data.limit = limit;
                    obj.request.data.page = page;
                    getDetails(obj, notifs)
                    return;
                }
            }
            notifs.shift();
            delete obj.request;
            getDetails(obj, notifs);
        }, function () {
            if (!obj.error) {
                obj.error = {
                    notifications: []
                };
            } else if (!obj.error.notifications) {
                obj.error.notifications = [];
            }
            obj.error.notifications.push(target);
            notifs.shift();
            delete obj.request;
            getDetails(obj, notifs);
        });
    }
    
/* function to initiate retrieval of additional details */
    
    function getMore(obj) {
        var notifs = [];
        if (obj.mode == 1) {
            notifs = obj.notifs.filter(function (val) {
                return val.events.totalUniqueActors > 5;
            });
        } else if (obj.mode == 2) {
            notifs = obj.notifs.filter(function (val) {
                return val.events.total > 1;
            });
        }
        notifs.forEach(function (val) {
            val.events.otherEvents = [];
        });
        delete obj.request;
        getDetails(obj, notifs);
    }
    
/* recursive function to retrieve notifications */
    
    function getNotifications(obj) {
        if (obj.page_index-- <= 0) {
            getMore(obj);
            return;
        }
        jQuery.ajax(obj.request).then(function (data) {
            if (data && data.notifications) Array.prototype.push.apply(obj.notifs,
                data.notifications);
            if (data && data._links && data._links.next) {
                var time = mw.util.getParamValue("startingTimestamp",
                    data._links.next);
                var limit = mw.util.getParamValue("limit", data._links.next);
                var page = mw.util.getParamValue("page", data._links.next);
                if (time && limit && page) {
                    obj.request.data.startingTimestamp = time;
                    obj.request.data.limit = limit;
                    obj.request.data.page = page;
                    getNotifications(obj);
                    return;
                }
            }
            getMore(obj);
        }, function () {
            obj.error = {
                page: parseInt(obj.request.data.page)
            };
            getMore(obj);
        });
    }
    
/*
 * after module is loaded
   * initiate first notification retrieval
   * add function to hook so additional notification retrievals can be queued
     (or initiated if there is no running request)
   * fire ready hook
*/
    
    mw.loader.using("mediawiki.util").then(function () {
        running = true;
        getNotifications(new notifBatch());
        mw.hook("andrewds1021.get_on_site_notifications.run").add(function (config) {
            if (running) {
                queue.push(config);
            } else {
                running = true;
                getNotifications(new notifBatch(config));
            }
        });
        mw.hook("andrewds1021.get_on_site_notifications.ready").fire();
    });
    
})();
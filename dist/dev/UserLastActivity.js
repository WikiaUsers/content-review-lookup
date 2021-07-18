/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.user_last_activity
        && window.andrewds1021.user_last_activity.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            user_last_activity: {}
        };
    } else if (!window.andrewds1021.user_last_activity) {
        window.andrewds1021.user_last_activity = {};
    }
    window.andrewds1021.user_last_activity.has_run = true;
    
/* retrieve and set type of activities to search */
    var cons = window.andrewds1021.user_last_activity.edits;
    if (cons === undefined) {
        cons = true;
    }
    var logs = window.andrewds1021.user_last_activity.logs;
    if (logs === undefined) {
        logs = true;
    }
    
/* if no logs to search, exit */
    if (!cons && !logs) return;
    
/* get elements, names, and ids to process */
    var names = {};
    Array.prototype.slice.call(document.querySelectorAll(".UserLastActivity"
        + "[data-userlastactivity-username]:not([data-userlastactivity-userid])"
        )).forEach(function (value) {
        var key = value.getAttribute("data-userlastactivity-username").trim()
            .replace(/_/g, " ");
        if (!key) return;
        key = key.charAt(0).toUpperCase() + key.substring(1);
        if (!names[key]) names[key] = [];
        names[key].push(value);
    });
    var ids = {};
    Array.prototype.slice.call(document.querySelectorAll(".UserLastActivity"
        + "[data-userlastactivity-userid]")).forEach(function (value) {
        var key = value.getAttribute("data-userlastactivity-userid").trim();
        if (/^[1-9]\d*$/.test(key)) {
            if (!ids[key]) ids[key] = [];
            ids[key].push(value);
        } else if (value.hasAttribute("data-userlastactivity-username")) {
            key = value.getAttribute("data-userlastactivity-username").trim()
                .replace(/_/g, " ");
            if (!key) return;
            key = key.charAt(0).toUpperCase() + key.substring(1);
            if (!names[key]) names[key] = [];
            names[key].push(value);
        }
    });
    
/* if no elements to replace, exit */
    if (!Object.keys(names).length && !Object.keys(ids).length) return;
    
/* retrieve custom messages */
    var no_activity, retrieval_error;
    var custom_no_activity = window.andrewds1021.user_last_activity.no_activity;
    var custom_retrieval_error = window.andrewds1021.user_last_activity
        .retrieval_error;
    if (typeof custom_no_activity == "object") {
        no_activity = custom_no_activity[mw.config.get("wgUserLanguage")];
    } else if (typeof custom_no_activity == "string") {
        no_activity = custom_no_activity;
    }
    if (typeof custom_retrieval_error == "object") {
        retrieval_error = custom_retrieval_error[mw.config.get("wgUserLanguage")];
    } else if (typeof custom_retrieval_error == "string") {
        retrieval_error = custom_retrieval_error;
    }
    
/* retrieve [[I18n-js]] messages */
    var i18n_def = jQuery.Deferred();
    mw.hook("dev.i18n").add(function (i18n) {
        i18n.loadMessages("UserLastActivity").done(function (i18n) {
            if (!no_activity) no_activity = i18n.msg("no_activity").plain();
            if (!retrieval_error) retrieval_error = i18n.msg("retrieval_error")
                .plain();
            i18n_def.resolve();
        });
    });
    
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:I18n-js/code.js"
        ]
    });
    
/* declare additional variables */
    var api;
    
    function getDates(obj) {
/* if all names have been processed, return resolved deferred */
        if (obj.index >= obj.names.length) return jQuery.Deferred()
            .resolve(obj.dates);
/* change name */
        var name = obj.names[obj.index];
        obj.request.ususers = name;
        if (cons) obj.request.ucuser = name;
        if (logs) obj.request.leuser = name;
/* send request for logged activity */
        return api.get(obj.request).then(
            function (data) {
                if (!data || !data.query || !(data.query.usercontribs
                    || data.query.logevents) || !(!data.query.users
                    || !data.query.users.length || !data.query.users[0]
                    .hasOwnProperty("missing"))) {
                    obj.dates[name] = retrieval_error;
                } else {
/* determine what to use for element content */
                    var con_time, log_time;
                    var contrib = data.query.usercontribs;
                    var logevnt = data.query.logevents;
                    if (contrib && contrib.length) {
                        con_time = contrib[0].timestamp;
                    }
                    if (logevnt && logevnt.length) {
                        log_time = logevnt[0].timestamp;
                    }
                    if (con_time && log_time) {
                        if (con_time >= log_time) {
                            obj.dates[name] = new Date(con_time).toLocaleString();
                        } else {
                            obj.dates[name] = new Date(log_time).toLocaleString();
                        }
                    } else if (con_time) {
                        obj.dates[name] = new Date(con_time).toLocaleString();
                    } else if (log_time) {
                        obj.dates[name] = new Date(log_time).toLocaleString();
                    } else {
                        obj.dates[name] = no_activity;
                    }
                }
                obj.index = obj.index + 1;
                return getDates(obj);
            },
            function () {
                obj.dates[name] = retrieval_error;
                obj.index = obj.index + 1;
                return getDates(obj);
            }
        );
    }
    
    function getNames(obj) {
/*
   if all ids have been processed, attempt to use names instead for remaining
   elements then return resolved deferred
*/
        if (obj.index >= obj.ids.length) {
            Object.keys(ids).forEach(function (id_key) {
                ids[id_key].forEach(function (elem) {
                    var name_key;
                    if (elem.hasAttribute("data-userlastactivity-username"))
                        name_key = elem.getAttribute("data-userlastactivity"
                        + "-username").trim().replace(/_/g, " ");
                    if (name_key) {
                        name_key = name_key.charAt(0).toUpperCase()
                            + name_key.substring(1);
                        if (!names[name_key]) names[name_key] = [];
                        names[name_key].push(elem);
                    } else {
                        elem.textContent = retrieval_error;
                    }
                });
            });
            return jQuery.Deferred().resolve();
        }
/* change ids */
        obj.request[obj.parameter] = obj.ids.slice(obj.index, obj.index
            + obj.limit).join("|");
/* send request for names */
        return api.get(obj.request).then(
            function (data) {
                if (data && data.query && data.query.users) data.query.users
                    .forEach(function (value) {
/* append elements array to that for the corresponding name */
                    if (!value.name || !value.userid) return;
                    if (names[value.name]) {
                        names[value.name] = names[value.name]
                            .concat(ids[value.userid]);
                    } else {
                        names[value.name] = ids[value.userid];
                    }
                    delete ids[value.userid];
                });
                obj.index = obj.index + obj.limit;
                return getNames(obj);
            },
            function () {
                obj.index = obj.index + obj.limit;
                return getNames(obj);
            }
        );
    }
    
    jQuery.when(i18n_def, mw.loader.using("mediawiki.api").then(function () {
        api = new mw.Api();
    })).then(function () {
/*
   get names associated with ids and set error message as content for elements
   where no name was found for the id and there is no fallback name specified
*/
        var obj = {
            ids: Object.keys(ids),
            index: 0,
            limit: 50,
            request: {
                action: "query",
                list: "users"
            }
        };
        if (mw.config.get("wgVersion") === "1.19.24") {
            obj.parameter = "usids";
        } else {
            obj.parameter = "ususerids";
        }
        return getNames(obj);
    }).then(function () {
/* get activity timestamps and determin element content */
        var obj = {
            names: Object.keys(names),
            index: 0,
            dates: {},
            request: {
                action: "query",
                list: "users"
            }
        };
        if (cons) {
            obj.request.list = obj.request.list + "|usercontribs";
            obj.request.uclimit = 1;
            obj.request.ucprop = "timestamp";                
        }
        if (logs) {
            obj.request.list = obj.request.list + "|logevents";
            obj.request.lelimit = 1;
            obj.request.leprop = "timestamp";                
        }
        return getDates(obj);
    }).then(function (dates) {
/* set element content as previously determined */
        Object.keys(names).forEach(function (key) {
            names[key].forEach(function (elem) {
                elem.textContent = dates[key];
            });
        });
    });
    
})();
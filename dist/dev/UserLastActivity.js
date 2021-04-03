/********************* this comment is 80 characters long *********************/

(function () {
    
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
    
/* retrieve and set type of logs to search */
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
    
/* get elements to process */
    var id_elems = Array.prototype.slice.call(document.querySelectorAll(
        ".UserLastActivity[data-userlastactivity-userid]"));
    var name_elems = Array.prototype.slice.call(document.querySelectorAll(
        ".UserLastActivity[data-userlastactivity-username]"
        +":not([data-userlastactivity-userid])"));
    
/* if no elements to replace, exit */
    if (!id_elems.length && !name_elems.length) return;
    
/* extract user ids and names */
    var ids = id_elems.map(function (value) {
        return value.getAttribute("data-userlastactivity-userid").trim();
    });
    var names = name_elems.map(function (value) {
        return value.getAttribute("data-userlastactivity-username").trim();
    });
    
/* convert names into expected format */
    names.forEach(function (value, index, array) {
        var con_val = value.replace(/_/g, " ");
        con_val = con_val.charAt(0).toUpperCase() + con_val.substring(1);
        array[index] = con_val;
    });
    
/*
retrieve messages and language

To-Do:
decide whether or not to use I18n-js
implement decision
*/
    var no_activity = {
        "en": "No Activity",
        "qqx": "UserLastActivity \"no_activity\" Object"
    };
    var custom_no_activity = window.andrewds1021.user_last_activity.no_activity;
    if (custom_no_activity) {
        Object.keys(custom_no_activity).forEach(function (value) {
            if (custom_no_activity[value]) {
                no_activity[value] = custom_no_activity[value];
            }
        });
    }
    var config = mw.config.get([
        "wgUserLanguage",
        "wgPageContentLanguage",
        "wgContentLanguage",
        "wgVersion"
    ]);
    
/*
retrieve and set datetime format

To-Do:
implement
*/
    var format = window.andrewds1021.user_last_activity.format;
    if (format) {
    
    }
    
/* declare additional variables */
    var dates = jQuery.Deferred();
    var user_elems, users;
    
    mw.loader.using("mediawiki.api").then(function () {
        return new mw.Api();
    }).then(function (api) {
/* if no ids, skip id-to-name conversion */
        if (!ids.length) {
            user_elems = name_elems;
            users = names;
            return api;
        }
/* construct request for names */
        var names_req = {
            action: "query",
            list: "users",
        };
        if (config.wgVersion === "1.19.24") {
            names_req.usids = ids.join("|");
        } else {
            names_req.ususerids = ids.join("|");
        }
/* request names for ids */
        return api.get(names_req).then(function (data) {
            if (data.query && data.query.users) {
/* create list of names with ids as keys */
                var id_names = data.query.users.reduce(function (accum, value) {
                    accum[value.userid] = value.name;
                    return accum;
                }, {});
/* remove anonymous user from list */
                delete id_names["0"];
/* replace ids with names */
                ids.forEach(function (value, index, array) {
                    array[index] = id_names[value];
                });
            } else {
                ids.forEach(function (value, index, array) {
                    array[index] = undefined;
                });
            }
/* for ids without a returned name, use specified name if provided */
            ids.forEach(function (value, index, array) {
                if (!value && id_elems[index].hasAttribute("data-userlastactivity"
                    +"-username")) {
                    var con_val = id_elems[index].getAttribute("data"
                        +"-userlastactivity-username").trim().replace(/_/g, " ");
                    con_val = con_val.charAt(0).toUpperCase() + con_val.substring(1);
                    array[index] = con_val;
                }
            });
/* for ids without a name, remove entries from arrays */
            id_elems = id_elems.filter(function (value, index) {
                return ids[index];
            });
            ids = ids.filter(function (value) {
                return value;
            });
/* combine arrays */
            user_elems = id_elems.concat(name_elems);
            users = ids.concat(names);
            return api;
        });
    }).then(function (api) {
/* if no users, skip name validation */
        if (!users.length) {
            return {
                api: api,
                names: [],
                index: 0,
                dates: {}
            };
        }
/* construct array of unique names */
        var unique = users.filter(function (value, index, array) {
            return index == array.indexOf(value);
        });
/* dummy request to validate names */
        return api.get({
            action: "query",
            list: "users",
            ususers: unique.join("|")
        }).then(function (data) {
/*
construct array of returned names
re-using variable "unique" because we can and description is applicable
avoid adding anonymous user (gets returned if name is provided)

Note: If an account is currently or has previously been a member of a global
user group, previous names associated with the account may have their ids set
to "0". While these names used to be returned in results, they currently are
not and, therefore, will not get mistaken for the anonymous user.
*/
            if (data.query && data.query.users) {
                unique = data.query.users.reduce(function (accum, value) {
                    if (value.userid) {
                        accum.push(value.name);
                    }
                    return accum;
                }, []);
            } else {
                unique = [];
            }
/* for non-validated names, remove entries from combined arrays */
            user_elems = user_elems.filter(function (user_elems_value,
                user_elems_index) {
                return unique.some(function (unique_value) {
                    return users[user_elems_index] === unique_value;
                });
            });
            users = users.filter(function (users_value) {
                return unique.some(function (unique_value) {
                    return users_value === unique_value;
                });
            });
            return {
                api: api,
                names: unique,
                index: 0,
                dates: {}
            };
        });
    }).then(getDates);
    
/* replace contents of elements if user was found */
    dates.done(function (data) {
        users.forEach(function (value, index) {
            if (data[value]) {
                user_elems[index].textContent = data[value];
            }
        });
    });
    
    function getDates(obj) {
/* if all names have been processed, resolve deferred object and return */
        if (obj.index >= obj.names.length) {
            dates.resolve(obj.dates);
            return;
        }
        var name = obj.names[obj.index];
/* construct request for logged activity */
        var request = {action: "query"};
        if (cons) {
            request.list = "usercontribs";
            request.ucuser = name;
            request.uclimit = 1;
            request.ucprop = "timestamp";
        }
        if (logs) {
            if (request.list) {
                request.list = request.list + "|logevents";
            } else {
                request.list = "logevents";
            }
            request.leuser = name;
            request.lelimit = 1;
            request.leprop = "timestamp";
        }
/* send request for logged activity */
        obj.api.get(request).then(function (data) {
            var contrib, logevnt, con_time, log_time;
            if (data && data.query) {
                contrib = data.query.usercontribs;
                logevnt = data.query.logevents;
            }
            if (contrib && (contrib.length > 0)) {
                con_time = contrib[0].timestamp;
            }
            if (logevnt && (logevnt.length > 0)) {
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
            } else if (contrib || logevnt) {
                if (no_activity[config.wgUserLanguage]) {
                    obj.dates[name] = no_activity[config.wgUserLanguage];
                } else if (no_activity[config.wgPageContentLanguage]) {
                    obj.dates[name] = no_activity[config.wgPageContentLanguage];
                } else if (no_activity[config.wgContentLanguage]) {
                    obj.dates[name] = no_activity[config.wgContentLanguage];
                } else {
                    obj.dates[name] = no_activity["en"];
                }
            }
        }).always(function () {
            obj.index = obj.index + 1;
            getDates(obj);
        });
    }
    
})();
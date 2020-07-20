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
 
var cons = window.andrewds1021.user_last_activity.edits;
if (cons === undefined) {
    cons = true;
}
var logs = window.andrewds1021.user_last_activity.logs;
if (logs === undefined) {
    logs = true;
}
 
if (!cons && !logs) return;
 
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
var langs = mw.config.get([
    "wgUserLanguage",
    "wgPageContentLanguage",
    "wgContentLanguage"]
);
var converter = $("<div class=\"UserLastActivity-converter\" style=\"display:"
    +" none;\"></div>");
/*
// not implemented yet
var format = window.andrewds1021.user_last_activity.format;
if (format) {
 
}
*/
 
// get elements to process
var id_elems = $(".UserLastActivity[data-userlastactivity-userid]");
var name_elems = $(".UserLastActivity[data-userlastactivity-username]"
    +":not([data-userlastactivity-userid])");
 
// extract user names/ids
var ids = id_elems.map(function () {
    return this.getAttribute("data-userlastactivity-userid");
}).get();
var names = name_elems.map(function () {
    return this.getAttribute("data-userlastactivity-username");
}).get();
 
names.forEach(function (value, index, array) {
    var con_val = converter.html(value).text().replace(/_/g, " ");
    con_val = con_val.charAt(0).toUpperCase() + con_val.substring(1);
    array[index] = con_val;
});
 
mw.loader.using("mediawiki.api").then(function () {
    return new mw.Api();
}).then(function (api) {
// convert from ids to names
    return api.get({
        action: "query",
        list: "users",
        usids: ids.join("|")
    }).then(function (data) {
        if (data.query && data.query.users) {
            var id_names = data.query.users.reduce(function (accum, value) {
                accum[value.userid] = value.name;
                return accum;
            }, {});
            delete id_names["0"]; // remove anonymous user from list
            ids.forEach(function (value, index, array) {
                array[index] = id_names[value];
            });
        } else {
            ids.forEach(function (value, index, array) {
                array[index] = undefined;
            });
        }
        ids.forEach(function (value, index, array) {
            if (!value && id_elems[index].hasAttribute("data-userlastactivity"
                +"-username")) {
                var con_val = converter.html(id_elems[index].getAttribute("data"
                    +"-userlastactivity-username")).text().replace(/_/g, " ");
                con_val = con_val.charAt(0).toUpperCase() + con_val.substring(1);
                array[index] = con_val;
            }
        });
        id_elems = id_elems.filter(function (index) {
            return ids[index];
        });
        ids = ids.filter(function (value) {
            return value;
        });
        return api;
    });
}).then(function (api) {
// construct list of unique users
// filter for valid usernames
    var unique = ids.concat(names).filter(function (value, index, array) {
        return index == array.indexOf(value);
    });
    return api.get({
        action: "query",
        list: "users",
        ususers: unique.join("|")
    }).then(function (data) {
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
        id_elems = id_elems.filter(function (index) {
            return unique.some(function (value) {
                return ids[index] === value;
            });
        });
        ids = ids.filter(function (id_value) {
            return unique.some(function (value) {
                return id_value === value;
            });
        });
        name_elems = name_elems.filter(function (index) {
            return unique.some(function (value) {
                return names[index] === value;
            });
        });
        names = names.filter(function (name_value) {
            return unique.some(function (value) {
                return name_value === value;
            });
        });
        return {
            api: api,
            unique: unique
        };
    });
}).then(function (obj) {
// get last activity for each user
    var replies = [];
    var dates = {};
    obj.unique.forEach(function (value) {
        var request = {action: "query"};
        if (cons) {
            request.list = "usercontribs";
            request.ucuser = value;
            request.uclimit = 1;
            request.ucprop = "timestamp";
        }
        if (logs) {
            if (request.list) {
                request.list = request.list + "|logevents";
            } else {
                request.list = "logevents";
            }
            request.leuser = value;
            request.lelimit = 1;
            request.leprop = "timestamp";
        }
        replies.push(obj.api.get(request).then(function (data) {
            var contrib = false;
            var logevnt = false;
            if (data && data.query) {
                if (data.query.usercontribs) {
                    contrib = data.query.usercontribs;
                }
                if (data.query.logevents) {
                    logevnt = data.query.logevents;
                }
            }
            var con_time = false;
            var log_time = false;
            if (contrib && (contrib.length > 0)) {
                con_time = contrib[0].timestamp;
            }
            if (logevnt && (logevnt.length > 0)) {
                log_time = logevnt[0].timestamp;
            }
            if (con_time && log_time) {
                if (con_time >= log_time) {
                    dates[value] = new Date(con_time).toLocaleString();
                } else {
                    dates[value] = new Date(log_time).toLocaleString();
                }
            } else if (con_time) {
                dates[value] = new Date(con_time).toLocaleString();
            } else if (log_time) {
                dates[value] = new Date(log_time).toLocaleString();
            } else if (contrib || logevnt) {
                if (no_activity[langs.wgUserLanguage]) {
                    dates[value] = no_activity[langs.wgUserLanguage];
                } else if (no_activity[langs.wgPageContentLanguage]) {
                    dates[value] = no_activity[langs.wgPageContentLanguage];
                } else if (no_activity[langs.wgContentLanguage]) {
                    dates[value] = no_activity[langs.wgContentLanguage];
                } else {
                    dates[value] = no_activity["en"];
                }
            }
            return true;
        }, function () {
            return false;
        }));
    });
    return {
        replies: replies,
        dates: dates
    };
}).then(function (obj) {
// replace contents of elements if user was found
    $.when.apply($, obj.replies).done(function () {
        ids.forEach(function (value, index) {
            if (obj.dates[value]) {
                id_elems[index].innerHTML = obj.dates[value];
            }
        });
        names.forEach(function (value, index) {
            if (obj.dates[value]) {
                name_elems[index].innerHTML = obj.dates[value];
            }
        });
    });
});
 
})();
//
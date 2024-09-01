/*
Config File for script stored at config.configPage set below
The CSS Page for staff colors stored at config.cssPage set below

Methods/Properties loaded to the mw.util object
- (#M1) mw.util.StaffUtil.fetchStaffList() : Adds/Updates data of the following properties:
    - (#P1) mw.util.StaffUtil.jsonData : Stores data from the Config File
    - (#P2) mw.util.StaffUtil.groupsList : Stores unprocessed data of users in each usergroup
    - (#P3) mw.util.StaffUtil.membersList : Stores information about users of each staff rank
- (#M2) mw.util.StaffUtil.printStaffList() : Same as fetchStaffList but prints results to console
- (#M3) mw.util.StaffUtil.updateStaffColors(cb, thisArg) : Same as fetchStaffList but also updates the CSS Page; Only loaded for CE+
*/


/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mw, console, alert */

$.when(
    mw.loader.using([
        "mediawiki.api"
    ]),
    $.Deferred(function (def) {
        mw.hook("dev.banners").add(function (BannerNotification) {
            def.resolve(BannerNotification);
        });
    })
).then(function (_, BannerNotification) {
    "use strict";

    /** International Customization Standard Notice (ICC-NOTICE-V2)
     * REVISION: 1
     * FLAGS: <code-modified: false> <code-appended: false> <msg-verified: true>
     * Please update flags accordingly. Please refer to en:Project:INT#ICS for details.
     * 
     * Below are the localization settings that you can modify.
     */
    var msg = {
        /* Alert Messages */
        successfulUpdate: "Staff Color Updater: Successful updated LESS for staff colors.",
        skipTemporary: "Skipped Temporary Ranks",
        fileUpdated: "File Updated: $1", // placement: [config.cssPage]
        scriptUsed: "Script: $1", // placement: [config.scriptPage]
        configUsed: "Config: $1", // placement: [config.configPage]
        pleaseUpdateCSS: "Remark: To see the changes, you still have to update CSS.",

        /* Button/Modal Text */
        updating: "Updating...",
        title: "Update Staff Colors",

        /* Console Text */
        noUser: "NO USER?",
        listUpdated: "Staff Lists Updated.",
        lessUpdating: "Updating Staff Colors (StaffColorsUpdater)",
        lessUpdated: "Staff Colors (Less) Updated.",
        showingValues: "[StaffUtil] Showing values...",
        showingSomething: "Showing $1", // placement: [what's being shown]

        /* Parsed CSS Heading */
        heading: "Staff Colors",
        headingIntro: "This stylesheet contains the css to color staff member\'s names.",
        headingWarning: "It is automatically updated, any changes you make will be \noverwritten next time this stylesheet gets updated.",

        /* Parsed CSS Text */
        selectorIsOverride: "This selector is an override",
        selectorIsOverridden: "This selector is overridden",
        higherRankRemoved: "$1\'s with higher ranks are removed", // placement: [role name]
    };
    /* Configs for international wikis */
    var config = {
        cssPage: "Custom-common.less/staff-colors.less", // assumed to be on MediaWiki namespace
        scriptPage: "Gadget-StaffColorsUpdater.js", // assumed to be on MediaWiki namespace
        configPage: "Gadget-StaffColorsUpdater.json", // assumed to be on MediaWiki namespace
        buttonDisplayedOnPages: ["Custom-common.less", "Common.css", "Custom-common.less/staff-colors.less"] // list of pages on the MediaWiki namespace to display the update button
    };

    function getMsg() {
        var m = msg[arguments[0]];
        if (!m)
            return "<msg." + arguments[0] + ">";
        for (var i = 1; i < arguments.length; i++)
            m = m.replaceAll("$" + i, arguments[i]);
        return m;
    }

    function replaceCss(cssText, replaceMap, rolekey) {
        if (!Array.isArray(replaceMap))
            replaceMap = [replaceMap];
        for (var i = 0; i < replaceMap.length; i++)
            cssText = cssText.replace(new RegExp("\\$" + (Number(i) + 1), "g"), replaceMap[i]);
        cssText = cssText.replace(/\$r/g, rolekey);
        return cssText;
    }

    function forKeys(o, cb, thisArg) {
        var count = 0;
        Object.keys(o).forEach(function (key) {
            var value = o[key];
            cb.call(thisArg, key, value, o, count);
            count++;
        });
    }

    function objectToRule(o) {
        var ret = [];
        forKeys(o, function (k, v) {
            ret.push("\t" + k + ": " + v + ";");
        });
        return "{\n" + ret.join("\n") + "\n}";
    }

    function finalAlert($this) {
        $this.text(getMsg("title"));
        $this.removeAttr("disabled");
        alert(getMsg("successfulUpdate") + "\n\n" +
            Object.keys(mw.util.StaffUtil.membersList).map(function (i) {
                return mw.util.StaffUtil.membersList[i].rank + ": " + mw.util.StaffUtil.membersList[i].users.length;
            }).join("\n") + "\n\n" +
            getMsg("fileUpdated", config.cssPage) + "\n" +
            getMsg("scriptUsed", config.scriptPage) + "\n" +
            getMsg("configUsed", config.configPage) + "\n\n" +
            getMsg("pleaseUpdateCSS")
        );
        new BannerNotification($("<div>", {
            html: "<div><b>Finished updating staff colors.</b></div>",
        }).prop("outerHTML"), "confirm", undefined, 5000).show();
    }

    function parse() {
        var def = new $.Deferred();

        mw.util.StaffUtil.fetchStaffList().then(function () {
            var data = mw.util.StaffUtil.jsonData;
            new mw.Api().get({
                action: "query",
                list: "allusers",
                augroup: Object.keys(data.ids).join("|"),
                auprop: "groups",
                aulimit: 500,
            }).then(function (d) {
                var states = ["LINKS", "ICONS", "TAGS"];
                d = d.query.allusers
                    .map(function (v) {
                        return {
                            name: v.name,
                            groups: v.groups
                                .filter(function (v) {
                                    return !data.implicitGroups.includes(v);
                                })
                                .map(function (v) {
                                    return data.ids[v];
                                }),
                        };
                    });

                var overrides = data.overrides;
                var overridesList = {
                    ICONS: {},
                    LINKS: {},
                    TAGS: {},
                };

                forKeys(overrides, function (state, v) {
                    forKeys(v, function (rank_, list) {
                        list.forEach(function (user) {
                            overridesList[state][user] = rank_;
                        });
                    });
                });

                function findId(rank) {
                    for (var r in data.ids)
                        if (data.ids[r] === rank)
                            return r;
                }

                function eachState(state, i) {
                    var temp = [];
                    var done = {};

                    for (var j in mw.util.StaffUtil.membersList) { // for each rank
                        if (mw.util.StaffUtil.membersList[j].parse) {
                            var rank = mw.util.StaffUtil.membersList[j].rank,
                                validusers = mw.util.StaffUtil.membersList[j].users;

                            var userList = [];
                            var hidden = [];
                            var ruleType = [];
                            temp.push("\n/* " + rank + "*/");

                            function each(isOverride, user) {
                                if (!user)
                                    console.error(getMsg("noUser"), isOverride, user);
                                if (data.ignore.includes(user)) return;
                                if (user.includes(" ")) each(isOverride, user.replace(/ /g, "_"));
                                var sel = data.selectors[state].replace(/\$1/g, user);

                                if (isOverride) { // no need to check "done"
                                    if (overridesList[state][user] === rank) {
                                        ruleType.push("override");
                                        userList.push(sel);
                                        // note: "done" is not applied here; only applied when "crossing" the highest actual rank
                                    }
                                    // else: do not do anything
                                } else if (!done[user] && !overridesList[state][user]) {
                                    ruleType.push("normal");
                                    userList.push(sel);
                                    done[user] = true;
                                } else if (!done[user] && overridesList[state][user]) {
                                    ruleType.push("overridden");
                                    userList.push("/* " + sel + " */");
                                    done[user] = true;
                                } else {
                                    // equivalent to done[user] && !isOverride
                                    hidden.push("  " + sel); // showed as "with higher ranks removed"
                                }
                            }

                            validusers.forEach(each.bind(null, false));
                            Object.keys(overridesList[state]).forEach(each.bind(null, true));

                            var lastElem = -1;
                            for (var index = ruleType.length - 1; index >= 0; index--) {
                                if (ruleType[index] === "normal" || ruleType[index] === "override") {
                                    lastElem = index;
                                    break;
                                }
                            }
                            for (index = 0; index < ruleType.length; index++) {
                                if (index === lastElem) userList[index] = userList[index].replace(/,(\s*)$/, "$1");
                                if (ruleType[index] === "override") userList[index] += " /* " + getMsg("selectorIsOverride") + " */";
                                if (ruleType[index] === "overridden") userList[index] += " /* " + getMsg("selectorIsOverridden") + " */";
                            }

                            temp.push("/* " + getMsg("higherRankRemoved", data.abbr[rank]) + "\n" + hidden.join("\n") + "\n*/");
                            temp.push(userList.join("\n"));

                            var rule = objectToRule(data.styles[state]);
                            if (i === 0) rule = replaceCss(rule, data.colors && data.colors[rank] || [], findId(rank));
                            else if (i === 1) rule = replaceCss(rule, data.imageUrls && data.imageUrls[rank] || [], findId(rank));
                            else if (i === 2) rule = replaceCss(rule, data.wallText && data.wallText[rank] || [], findId(rank));

                            if (lastElem === -1) rule = "/*\n" + rule + "\n*/";
                            temp.push(rule);
                        }
                    }
                    return "\n/*** " + state + " ***/\n" + temp.join("\n");
                }

                var allstates = states.map(function (state, i) {
                    return eachState(state, i);
                });

                var ret = ["/* " + getMsg("heading") + "\n\n" + getMsg("headingIntro") + "\n" + getMsg("headingWarning") + "\n*/"];
                for (var i in allstates)
                    ret.push(allstates[i]);

                def.resolve(ret.join("\n"));
            }).catch(console.warn);
        }).catch(console.warn);

        return def;
    }

    (function init() {
        mw.util.StaffUtil = mw.util.StaffUtil || {};

        mw.hook("hsw.gadget.staffColorsUpdater").fire(mw.util.StaffUtil.updateStaffColors);

        if (window.StaffColorsUpdaterLoaded) return;
        window.StaffColorsUpdaterLoaded = true;

        mw.util.StaffUtil.fetchStaffList = function () {
            var def = new $.Deferred();

            $.getJSON(new mw.Title(config.configPage, 8).getUrl({
                action: "raw",
                ctype: "text/json"
            })).then(function (data) {
                mw.util.StaffUtil.jsonData = data;

                var bypassn = [];
                var staffn = {};

                function waitTill(rank, users) {
                    return new mw.Api().get({
                        action: "query",
                        list: "users",
                        ususers: users.join("|"),
                        usprop: "groupmemberships",
                        aulimit: 500,
                    }).then(function (dt) {
                        function searchid(rank) {
                            var rankid;

                            function cb(k, v) {
                                if (v === rank) rankid = k;
                            }
                            forKeys(data.ids, cb);
                            return rankid;
                        }

                        dt = dt.query.users;
                        var valid = {};
                        for (var k in dt) {
                            valid[dt[k].name] = true;
                            if (dt.hasOwnProperty(k) && dt[k].hasOwnProperty("groupmemberships")) {
                                var arr = dt[k].groupmemberships;
                                for (var i in arr) {
                                    if (arr[i].group === searchid(rank)) {
                                        var name = dt[k].name;
                                        valid[name] = arr[i].expiry === "infinity";
                                        if (!valid[name] && !bypassn.includes(name))
                                            bypassn.push(name);
                                    }
                                }
                            }
                        }
                        staffn[rank] = users.filter(function (user) {
                            return valid[user];
                        });
                        return {
                            "rank": rank,
                            "users": staffn[rank],
                        };
                    });
                }

                new mw.Api().get({
                    action: "query",
                    list: "allusers",
                    augroup: Object.keys(data.ids).join("|"),
                    auprop: "groups",
                    aulimit: 500,
                }).done(function (d) {
                    d = d.query.allusers
                        .map(function (v) {
                            return {
                                name: v.name,
                                groups: v.groups
                                    .filter(function (v) {
                                        return !data.implicitGroups.includes(v);
                                    })
                                    .map(function (v) {
                                        return data.ids[v];
                                    }),
                            };
                        });

                    var groupsList = {};
                    data.ranks.forEach(function (rank) {
                        groupsList[rank] = [];
                        d.forEach(function (v) {
                            if (v.groups.includes(rank)) {
                                groupsList[rank].push(v.name);
                            }
                        });
                    });
                    mw.util.StaffUtil.groupsList = groupsList;

                    var allwaits = [];

                    forKeys(groupsList, function (rank, users) {
                        allwaits.push(waitTill(rank, users));
                    });

                    return $.when.apply($, allwaits).then(function () {
                        var obj = [];
                        if (Object.keys(staffn).length) {
                            Object.keys(data.order).sort(function (a, b) {
                                return data.order[a] < data.order[b];
                            }).forEach(function (k) {
                                obj.push({
                                    rank: k,
                                    users: staffn[k],
                                    parse: true,
                                });
                            });
                            obj.push({
                                rank: getMsg("skipTemporary"),
                                users: bypassn,
                                parse: false,
                            });
                        }

                        console.log(getMsg("listUpdated"));
                        mw.util.StaffUtil.membersList = obj;
                        def.resolve();
                    }).catch(console.warn);
                }).catch(console.warn);
            }).catch(console.warn);

            return def;
        };

        mw.util.StaffUtil.printStaffList = function () {
            mw.util.StaffUtil.fetchStaffList().then(function () {
                console.log(getMsg("showingValues"));
                console.log(getMsg("showingSomething", "mw.util.StaffUtil.jsonData"));
                console.log(mw.util.StaffUtil.jsonData);
                console.log(getMsg("showingSomething", "mw.util.StaffUtil.groupsList"));
                console.log(mw.util.StaffUtil.groupsList);
                console.log(getMsg("showingSomething", "mw.util.StaffUtil.membersList"));
                console.log(mw.util.StaffUtil.membersList);
            });
        };

        if (/sysop|codeeditor|staff|util|soap|wiki-manager|content-team-member|content-reviewer|content-volunteer/
            .test(mw.config.get("wgUserGroups").join("\n").toLowerCase())) { // In one of these usergroups
            mw.util.StaffUtil.updateStaffColors = function (cb, thisArg) {
                parse().then(function (css) {
                    new mw.Api().postWithEditToken({
                        action: "edit",
                        text: css,
                        title: "MediaWiki:" + config.cssPage,
                        summary: getMsg("lessUpdating"),
                        minor: 1,
                    }).then(function (r) {
                        if (cb) cb.call(thisArg, css, r);
                    }, console.warn);
                    console.log(getMsg("lessUpdated"));
                });
            };
        }

        var allowedPages = config.buttonDisplayedOnPages.map(function (p) {
            return mw.config.get("wgFormattedNamespaces")[8] + ":" + p;
        });

        if (allowedPages.includes(mw.config.get("wgPageName")) && mw.config.get("wgAction") === "view") {
            $("#mw-content-text").prepend($("<a>", {
                class: "wds-button",
                html: $("<div>", {
                    click: function () {
                        var $this = $(this);
                        if (!$this.is("[disabled]")) {
                            $this.text(getMsg("updating"));
                            $this.attr({
                                disabled: true
                            });
                            new BannerNotification($("<div>", {
                                html: "<div><b>Processing, Please Wait.</b><br />Another pop-up should indicate completion.</div>",
                            }).prop("outerHTML"), "confirm", undefined, 5000).show();
                            mw.util.StaffUtil.updateStaffColors(finalAlert.bind(null, $this));
                        }
                    },
                    text: getMsg("title"),
                    title: getMsg("title"),
                }),
                title: getMsg("title"),
                href: "#",
                css: {
                    cursor: "pointer",
                    "margin": "0 0 5px 5px",
                }
            }));
        }

    }());
});
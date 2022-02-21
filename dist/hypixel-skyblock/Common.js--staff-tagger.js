//<pre>
/** Staff Tagger
 * 
 * Code to automate some part of administrator's actions for staff promotion/demotion
 * 
 * Staff "tag" option appears on the template {{User rights request}}
 * This template is commonly used on [[HSW:STFREQS]]
 */

/* jshint
    esversion: 5, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    sub: true, forin: false,
    -W082, -W084
*/

/* global mw, BannerNotification */
"use strict";
(function () {
    if (window.StaffTagger && window.StaffTagger.Loaded)
        return;

    window.StaffTagger = window.StaffTagger || {};
    window.StaffTaggerOpts = window.StaffTaggerOpts || {};
    window.StaffTagger.Loaded = true;

    $.when(
        mw.loader.using([
            "mediawiki.util",
            "mediawiki.api",
            mw.loader.getModuleNames().find(function (module) {
                return module.startsWith("BannerNotification");
            }),
        ]),
        $.Deferred(function (def) {
            mw.hook("dev.modal").add(function () {
                def.resolve();
            });
        }),
        $.Deferred(function (def) {
            if (mw.util.StaffUtil) {
                def.resolve(mw.util.StaffUtil);
            } else {
                $.ajax({
                    cache: true,
                    dataType: "script",
                    url: "https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Gadget-StaffColorsUpdater.js"
                }).done(function () {
                    def.resolve(mw.util.StaffUtil);
                });
            }
        })
    ).then(function () {
        if (!/codeeditor|sysop|bureaucrat|soap|staff|helper|wiki-manager|content-team-member|util/.test(mw.config.get("wgUserGroups").join("\n")))
            return;

        window.StaffTagger = window.StaffTagger || {};

        var StaffTagger, that, cachedStaffData;
        StaffTagger = that = window.StaffTagger = Object.assign(this, {
            Loaded: true,
            api: new mw.Api(),
            staffDataPage: "Module:Staff/Members",
            ranksAvailable: [
                "bureaucrat",
                "sysop",
                "codeeditor",
                "content-moderator",
                "threadmoderator",
                "rollback",
            ],
            rankShorts: {
                bureaucrat: "BU",
                sysop: "AD",
                codeeditor: "CE",
                "content-moderator": "CM",
                threadmoderator: "DM",
                rollback: "RB",
            },
            rankLongs: {
                BU: "bureaucrat",
                AD: "sysop",
                CE: "codeeditor",
                CM: "content-moderator",
                DM: "threadmoderator",
                RB: "rollback",
            },

            // Begin (Taken from HypixelItemDataFetcher (by Fewfre) and modified)
            luaTableDataModuleToJson: function (moduleName) {
                return that.api.post({
                        action: "scribunto-console",
                        title: mw.config.get("wgPageName"),
                        question: "=mw.text.jsonEncode(require('" + moduleName + "'))"
                    })
                    .then(function (response) {
                        return response.return;
                    })
                    .then(function (data) {
                        return JSON.parse(data);
                    });
            },
            toSafeStr: function (s) {
                return s.replaceAll("\'", "\\\'").replaceAll("\"", "\\\"");
            },
            toLuaKey: function (k) {
                k = that.toSafeStr(k);
                return (/^\w+$/.test(k) && /^[^\d]/.test(k)) ? k : ("[\"" + k + "\"]");
            },
            jsonToLuaTable: function (json, depth) {
                depth = typeof depth === "undefined" ? -1 : depth;
                depth++;
                if (Array.isArray(json)) {
                    return "{ " + json.map(function (o) {
                        return that.jsonToLuaTable(o, depth);
                    }).join(", ") + " }";
                } else if (typeof json === "object") {
                    var space = depth ? "" : "\t",
                        br = depth ? "" : "\n",
                        ex = depth ? " " : "";
                    return "{ " + br +
                        Object.entries(json).sort(function (a, b) {
                            return a[0] < b[0] && -1 || 1;
                        }).map(function (data) {
                            return space + that.toLuaKey(data[0]) + " = " + that.jsonToLuaTable(data[1], depth);
                        }).join(", " + br) +
                        br + ex + "}";
                }
                // Otherwise seems to be normal value; done on this branch!
                else {
                    return typeof json === "string" ? "\"" + that.toSafeStr(json) + "\"" : json;
                }
            },
            saveToWiki: function (json, summary, page) {
                var lua = "-- <pre>\nreturn " + that.jsonToLuaTable(json);

                return that.api.postWithEditToken({
                    action: "edit",
                    text: lua,
                    title: page,
                    summary: summary,
                    minor: true,
                }).catch(console.warn);
            },
            // End (Taken from HypixelItemDataFetcher (by Fewfre) and modified)

            fetchStaffData: function () {
                return that.luaTableDataModuleToJson(that.staffDataPage).then(function (data) {
                    cachedStaffData = data;
                });
            },
            fetchUserRights: function (user) {
                return that.api.get({
                    action: "query",
                    list: "users",
                    ususers: user,
                    usprop: "groupmemberships",
                    aulimit: 500,
                }).then(function (dt) {
                    var result = dt.query.users[0].groupmemberships.map(function (v) {
                        return v.expiry === "infinity" ? v.group : "";
                    });
                    that.existingGroups = [];
                    for (var i in that.ranksAvailable)
                        if (result.includes(that.ranksAvailable[i]))
                            that.existingGroups.push(that.ranksAvailable[i]);
                }).catch(console.warn);
            },

            putToday: function (e) {
                e.preventDefault();
                var date = new Date();
                $(this).siblings("input").val(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate());
            },
            getField: function (user, field) {
                return (!cachedStaffData[user] || !cachedStaffData[user][field]) ? "" : cachedStaffData[user][field];
            },
            parsePipeList: function (s) {
                s = s || "";
                return s.split("|").map(function (part) {
                    return part.trim();
                }).filter(function (part) {
                    return part !== "";
                });
            },
            cloneDeep: function (obj) {
                // deepCopy specific for the stafflist syntax
                var o = {};
                Object.keys(obj).forEach(function (k) {
                    o[k] = {};
                    Object.assign(o[k], obj[k]);
                });
                return o;
            },

            // #1: Granting rights (if applicable)
            grantUserRights: function (user, toAdd, addbots, prevbots, reason) {
                var allranks = that.ranksAvailable.join("|"),
                    ranks_to_remove = [],
                    ranks_to_add = toAdd || [];

                for (var i in that.ranksAvailable) {
                    if (!ranks_to_add.includes(that.ranksAvailable[i]))
                        ranks_to_remove.push(that.ranksAvailable[i]);
                }

                return [user].concat(addbots).map(function (account, i) {
                    var isBot = i;
                    return that.api.get({
                        action: "query",
                        list: "users",
                        ususers: account,
                        ustoken: "userrights",
                    }).always(function (data) {
                        var usToken = data.query.users[0].userrightstoken;
                        if (data.query) {
                            that.api.post({
                                "action": "userrights",
                                "format": "json",
                                "user": account,
                                "add": ranks_to_add,
                                "remove": ranks_to_remove,
                                "expiry": "infinite",
                                "reason": isBot && ("Changed rank(s) for associated bot accounts (" + reason + ")") || reason,
                                "token": usToken,
                            }).always(function (data) {
                                if (data.userrights) {
                                    console.log("[StaffTagger #1]: > Ranks added for " + account + " (" + Object.keys(data.userrights.added).length + "): ", data.userrights.added);
                                    console.log("[StaffTagger #1]: > Ranks removed for " + account + " (" + Object.keys(data.userrights.removed).length + "): ", data.userrights.removed);
                                } else
                                    console.warn("[StaffTagger #1]: Failed to modify ranks:" + data);
                            });
                        } else
                            console.warn("[StaffTagger #1]: API error in getting user rights token:" + data, "(API Error code \"" + data + "\")");
                    });
                }).concat(prevbots.map(function (account) {
                    return that.api.get({
                        action: "query",
                        list: "users",
                        ususers: account,
                        ustoken: "userrights",
                    }).always(function (data) {
                        var usToken = data.query.users[0].userrightstoken;
                        if (data.query) {
                            that.api.post({
                                "action": "userrights",
                                "format": "json",
                                "user": account,
                                "remove": allranks,
                                "expiry": "infinite",
                                "reason": "Removing rank(s) for disassociated bot accounts",
                                "token": usToken,
                            }).always(function (data) {
                                if (data.userrights) {
                                    console.log("[StaffTagger #1]: > Ranks removed for " + account + " (" + Object.keys(data.userrights.removed).length + "): ", data.userrights.removed);
                                } else
                                    console.warn("[StaffTagger #1]: Failed to modify ranks:" + data);
                            });
                        } else
                            console.warn("[StaffTagger #1]: API error in getting user rights token:" + data, "(API Error code \"" + data + "\")");
                    });
                }));
            },

            // #2: Change Staff Data on Staff Page
            // Now should update Module:Staff/Members instead
            changeStaffData: function (user, ranklist, formerlist, joindate, resigndate, bots, activity, reason) {
                var rankshorts = [],
                    formershorts = [],
                    newStaffData = that.cloneDeep(cachedStaffData);
                for (var i in that.ranksAvailable) {
                    if (ranklist.includes(that.ranksAvailable[i]))
                        rankshorts.push(that.rankShorts[that.ranksAvailable[i]]);
                    if (formerlist.includes(that.ranksAvailable[i]))
                        formershorts.push(that.rankShorts[that.ranksAvailable[i]]);
                }

                newStaffData[user] = newStaffData[user] || {};
                Object.assign(newStaffData[user], {
                    rank: rankshorts.join("|"),
                    former: formershorts.join("|"),
                    join: joindate,
                    resignation: resigndate,
                    bot: bots.join("|"),
                    activity: activity,
                });
                if (resigndate)
                    delete newStaffData[user].rank;
                else
                    delete newStaffData[user].resignation;
                if (!rankshorts.length)
                    delete newStaffData[user].rank;
                if (!formershorts.length)
                    delete newStaffData[user].former;
                if (!bots)
                    delete newStaffData[user].bot;
                if (!activity)
                    delete newStaffData[user].activity;

                // runs check on the whole data set and removes any blank data
                for (var u in newStaffData)
                    for (var entry in newStaffData[u])
                        if (newStaffData[u][entry] === "")
                            delete newStaffData[u][entry];

                return that.saveToWiki(newStaffData, reason, that.staffDataPage).always(function (data) {
                    if (data.edit)
                        console.log("[StaffTagger #2]: Successfully modified", user, "on staff member list");
                    else
                        console.warn("[StaffTagger #2]: API Error in editing staff member list", user + ":", data);
                });
            },

            // #3: Add staff message box to userpage
            addMsgBox: function (user, reason, hasMsgBox) {
                var userpage = "User:" + user,
                    newtext = "{{Staff|user=" + user + "}}\n";
                return that.api.get({
                    action: "query",
                    format: "json",
                    prop: "revisions",
                    titles: userpage,
                    formatversion: 2,
                    rvprop: "content",
                    rvslots: "*",
                }).then(function (d) {
                    var content = d.query.pages[0].revisions[0].slots.main.content;
                    var regex = new RegExp("\\{\\{StaffM?s?g?b?o?x?\\|.*?\\}\\}\\s*", "ig");
                    var options = {
                        action: "edit",
                        watchlist: "nochange",
                        summary: reason,
                        title: userpage,
                        minor: true,
                        prependtext: newtext,
                        token: mw.user.tokens.values.editToken,
                    };
                    if (!hasMsgBox) {
                        delete options.prependtext;
                        options.text = content.replace(regex, "");
                    } else if (content.match(regex)) {
                        delete options.prependtext;
                        options.text = newtext + content.replace(regex, "");
                    }
                    return that.api.post(options);
                }).always(function (data) {
                    if (data.edit)
                        console.log("[StaffTagger #3]: Successfully added StaffMsgbox to", user + " (when applicable)");
                    else
                        console.warn("[StaffTagger #3]: API Error in adding StaffMsgbox for", user + ":", data);
                });
            },

            // #4: Protect staff userpage
            protectStaffPage: function (user, bots, prevbots, highLevel) {
                var promises = [];
                [user].concat(bots).forEach(function (account) {
                    var userpage = "User:" + account;
                    promises.push(that.api.post({
                        action: "protect",
                        bot: true,
                        watchlist: "nochange",
                        title: userpage,
                        protections: highLevel ? "edit=sysop|move=sysop" : "edit=autoconfirmed|move=autoconfirmed",
                        expiry: "infinite",
                        reason: "Protecting wiki staff userpage",
                        token: mw.user.tokens.values.editToken,
                    }).always(function (data) {
                        if (data.protect)
                            console.log("[StaffTagger #4]: Successfully protected", account + "\'s userpage");
                        else
                            console.warn("[StaffTagger #4]: API error in protecting", account + "\'s userpage:", data);
                    }));
                });
                prevbots.forEach(function (account) {
                    var userpage = "User:" + account;
                    promises.push(that.api.post({
                        action: "protect",
                        bot: true,
                        watchlist: "nochange",
                        title: userpage,
                        protections: "edit=autoconfirmed|move=autoconfirmed",
                        expiry: "infinite",
                        reason: "Unprotecting userpage for disassociated bot account",
                        token: mw.user.tokens.values.editToken,
                    }).always(function (data) {
                        if (data.protect)
                            console.log("[StaffTagger #4]: Successfully protected", account + "\'s userpage");
                        else
                            console.warn("[StaffTagger #4]: API error in protecting", account + "\'s userpage:", data);
                    }));
                });
                return promises;
            },

            // #5: Update staff-colors.less
            // Disabled to reduce wait time for handling multiple staff; maybe added as an option later when update CSS is included
            // updateStaffColors: function () {
            //     return $.Deferred(function (def) {
            //         mw.util.StaffUtil.updateStaffColors(function () {
            //             console.log("[StaffTagger #5]: Successfully updated staff-colors.less");
            //             def.resolve();
            //         });
            //     });
            // },

            // #6: Null Edit Pages
            nullEditPages: function (user, bots) {
                var promises = [];
                [user].concat(bots).forEach(function (account) {
                    promises.push(that.api.post({
                        action: 'edit',
                        title: "Message_Wall:" + account,
                        token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
                        prependtext: '',
                    }).always(function (data) {
                        if (data.edit)
                            console.log("[StaffTagger #6]: Successfully null edited Message_Wall:" + account);
                        else
                            console.warn("[StaffTagger #6]: API error in null editing Message_Wall:" + account, data);
                    }));
                    promises.push(
                        that.api.post({
                            action: 'edit',
                            title: "User_talk:" + account,
                            token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
                            prependtext: '',
                        }).always(function (data) {
                            if (data.edit)
                                console.log("[StaffTagger #6]: Successfully null edited User_talk:" + account);
                            else
                                console.warn("[StaffTagger #6]: API error in null editing User_talk:" + account, data);
                        }));
                });
                return promises;
            },

            isValidDate: function (s) {
                return /\d{4}\-\d{1,2}\-\d{1,2}/.test(s) && (!isNaN((new Date(s)).getDate()));
            },
            securityCheck: function (user, bots, ranks) {
                var myname = mw.config.get("wgUserName"),
                    mygroups = mw.config.get("wgUserGroups");
                if (!window.StaffTaggerOpts.canRemoveSelfTopRank && [user].concat(bots).indexOf(myname) !== -1) {
                    for (var i = 0; i <= 4; i++) { // Removing CM+ from self disallowed
                        var r = that.ranksAvailable[i];
                        if (mygroups.indexOf(r) !== -1 // rank exists in operating user
                            &&
                            ranks.indexOf(r) === -1) // rank does not exist in given ranks (i.e. will be removed)
                            return false;
                    }
                }
                return true;
            },
            errorHdlr: function (el, text) {
                el.html(text);
                window.location.hash = "#StaffTagger-mode-label";
                return;
            },

            processInformation: function () {
                var mode = that.usingMode,
                    errorEl = $("#StaffTagger-error"),
                    hasMsgBox = $("#StaffTagger-staffmsgbox-pref").prop("checked"),
                    hasBot = $("#StaffTagger-bot-pref").prop("checked"),
                    handleAssoBot = $("#StaffTagger-bot-options-pref-a").prop("checked"),
                    handleDssoBot = $("#StaffTagger-bot-options-pref-d").prop("checked"),
                    hasActivity = $("#StaffTagger-activity-pref").prop("checked"),
                    opts;

                errorEl.empty();
                if (mode === "staff") {
                    opts = {
                        user: $("#StaffTagger-user-input").val().trim(),
                        ranklist: $("#StaffTagger-ranks-wrapper *:checked").get().map(function (el) {
                            return $(el).attr("data-rank");
                        }),
                        formerlist: $("#StaffTagger-ranks-wrapper-former *:checked").get().map(function (el) {
                            return $(el).attr("data-rank");
                        }),
                        date: $("#StaffTagger-date-input").val().trim(),
                        bots: that.parsePipeList(hasBot && $("#StaffTagger-bot-input").val() || ""),
                        activity: hasActivity && $("#StaffTagger-activity-input").val().trim() || "",
                        reason: $("#StaffTagger-reason-input").val().trim(),
                    };
                    opts.highLevel = /content-moderator|codeeditor|sysop|bureaucrat/.test(opts.ranklist.join("|"));
                    if (!opts.ranklist.length && !window.confirm("No ranks are selected for this user. Are you sure to proceed?\nNote: For staff resignation, click \"CANCEL\" and \"Switch to Resign Mode\"."))
                        return;
                } else if (mode === "resign") {
                    opts = {
                        user: $("#StaffTagger-user-input").val().trim(),
                        ranklist: [],
                        formerlist: $("#StaffTagger-ranks-wrapper-former *:checked").get().map(function (el) {
                            return $(el).attr("data-rank");
                        }),
                        date: $("#StaffTagger-date-input").val().trim(),
                        resignDate: $("#StaffTagger-date-input-resign").val().trim(),
                        bots: that.parsePipeList(hasBot && $("#StaffTagger-bot-input").val() || ""),
                        activity: hasActivity && $("#StaffTagger-activity-input").val() || "",
                        reason: $("#StaffTagger-reason-input-resign").val().trim(),
                        highLevel: false,
                    };
                    if (!opts.formerlist.length && !window.confirm("No former ranks are selected. Are you sure to proceed?"))
                        return;
                }
                if (opts.user === "")
                    return that.errorHdlr(errorEl, "Please input a user.");
                if (!that.isValidDate(opts.date))
                    return that.errorHdlr(errorEl, "Join date is invalid.");
                if ("resignDate" in opts && !that.isValidDate(opts.resignDate))
                    return that.errorHdlr(errorEl, "Resign date is invalid.");
                if (!that.securityCheck(opts.user, opts.bots, opts.ranklist))
                    return that.errorHdlr(errorEl, [
                        "Removing CM+ from yourself is disallowed. This might be because your account is the User, or an Associated or Disassociated Bot. This is a security feature. Add this to your personal script to bypass it:",
                        "<small>window.StaffTaggerOpts = window.StaffTaggerOpts || {};</small>",
                        "<small>window.StaffTaggerOpts.canRemoveSelfTopRank = true;</small>",
                    ].join("<br>"));

                opts.removebots = handleDssoBot && that.parsePipeList(that.getField(opts.user, "bot")).filter(function (v) {
                    return opts.bots.indexOf(v) === -1;
                }) || [];

                opts.addbots = handleAssoBot && opts.bots || [];

                if (!window.confirm([
                        "Check carefully before you proceed:\n",
                        "Adding Ranks: " + (opts.ranklist.length && opts.ranklist.join(", ") || "none"),
                        "REMOVING ALL OTHER RANKS EXCEPT THE ABOVE",
                        "Applicable to these users: " + [opts.user].concat(opts.addbots).join(", ") + "\n",
                        "REMOVING EVERY SINGLE RANK FROM DISASSOCIATED BOTS",
                        "Applicable to these users: " + (opts.removebots.length && opts.removebots.join(", ") || "none") + "\n",
                        "Confirm to Proceed?",
                    ].join("\n")))
                    return;

                Promise.all([
                    that.changeStaffData(opts.user, opts.ranklist, opts.formerlist, opts.date, opts.resignDate, opts.bots, opts.activity, opts.reason), // #2
                    that.addMsgBox(opts.user, opts.reason, hasMsgBox), // #3
                    // that.updateStaffColors(), // #5
                    // ^ Disabled to reduce wait time for handling multiple staff; maybe added as an option later when update CSS is included
                ].concat(
                    that.protectStaffPage(opts.user, opts.addbots, opts.removebots, opts.highLevel) // #4
                ).concat(
                    that.nullEditPages(opts.user, opts.addbots) // #6
                )).then(function () {
                    // placed here because one may demote themselves after the admin actions above
                    Promise.all(
                        that.grantUserRights(opts.user, opts.ranklist, opts.addbots, opts.removebots, opts.reason) // #1
                    ).then(that.onResolve);
                });

                that.modal.hide();
                new BannerNotification($("<div>", {
                    html: "<div><b>Processing, Please Wait.</b><br />Another pop-up should indicate completion.</div>",
                }).prop("outerHTML"), "confirm", undefined, 5000).show();
            },

            onResolve: function () {
                new BannerNotification($("<div>", {
                    html: "<div><b>All subprocesses completed. Horray!</b><br>Please check the Console for all the results/errors.<br>You may now <a href=\"/wiki/CSS\">Update Staff Colors and Update CSS</a>.</div>",
                }).prop("outerHTML"), "confirm").show();
            },

            editorCloseHandler: function () {
                that.modal.hide();
            },

            createIntroSection: function () {
                return "Select the ranks for this user. Then, the Staff Tagger will perform the following:\
                    <ol>\
                    <li>Grant/Remove selected rights to the user on wiki (if applicable) <i>†</i></li>\
                    <li>Change staff data on <a href=\"/wiki/Module:Staff/Members\">Module:Staff/Members</a></li>\
                    <li>Add StaffMsgBox to the user page (if applicable) <i>†</i></li>\
                    <li>Increase/Decrease protection of the user page <i>†</i></li><!--\
                    <li>Update <a href=\"/wiki/MediaWiki:Custom-common.less/staff-colors.less\">staff-color.less</a> and <a href=\"/wiki/CSS\">site CSS</a></li>-->\
                    <li>Null Edit <code>Message_Wall</code> and <code>User_talk</code> for the user <i>†</i></li>\
                    </ol>\
                    <small><i>†: Also applies for associated/disassociated bot accounts</i></small>\
                    ";
            },

            createRanksSelection: function (suffix) {
                return that.ranksAvailable.map(function (rank) {
                    var idname = "StaffTagger-rank-" + rank + suffix;
                    return {
                        type: "div",
                        attr: {
                            id: "StaffTagger-ranks-wrapper" + suffix
                        },
                        children: [{
                            type: "input",
                            attr: {
                                type: "checkbox",
                                id: idname,
                                "data-rank": rank
                            },
                        }, {
                            type: "label",
                            attr: {
                                for: idname
                            },
                            text: " " + rank,
                        }],
                    };
                });
            },

            showModal: function () {
                var user = that.user || "";
                Promise.all([
                    that.fetchStaffData(),
                    that.fetchUserRights(user),
                ]).then(function () {
                    var defaultDate = that.getField(user, "join"),
                        defaultResignDate = that.getField(user, "resignation"),
                        defaultBots = that.getField(user, "bot"),
                        defaultActivity = that.getField(user, "activity"),
                        defaultReason = "Per request to be staff: [[HSW:STFREQS#New request for user rights by " + user + "]]",
                        defaultResignReason = "Staff resignation of [[User:" + user + "]]";
                    that.modal.setContent({
                        children: [{
                            type: "form",
                            attr: {
                                id: "StaffTagger-form",
                                style: "margin: 0 1em;",
                            },
                            children: [{
                                type: "div",
                                attr: {
                                    class: "page-content article-margin-off",
                                    style: "margin-bottom: 18px;",
                                },
                                html: that.createIntroSection(),
                            }, {
                                type: "div",
                                id: "StaffTagger-input",
                                children: [{
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-mode-label",
                                        class: "staff-components",
                                        style: "color: rgb(214, 151, 232);",
                                    },
                                    html: "<b>Staff Mode: For staff promotion/demotion</b>",
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-mode-label-resign",
                                        class: "resign-components",
                                        style: "color: rgb(122, 216, 219);",
                                    },
                                    html: "<b>Resign Mode: All ranks will be removed from this user (if applicable)</b>",
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-error",
                                        style: "color: red;",
                                    },
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-user-wrapper",
                                        class: "staff-components resign-components",
                                    },
                                    children: [{
                                        type: "label",
                                        id: "StaffTagger-user-label",
                                        text: "User: ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-user-input",
                                            type: "text",
                                            value: user,
                                        },
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-staffmsgbox-pref",
                                            type: "checkbox",
                                            checked: "checked",
                                        },
                                    }, {
                                        type: "label",
                                        attr: {
                                            for: "StaffTagger-staffmsgbox-pref",
                                        },
                                        html: "<small><abbr title=\"Unchecking this will remove StaffMsgBox from page\">Enable</abbr> StaffMsgBox on user page</small>",
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-ranks-label",
                                        class: "staff-components",
                                    },
                                    html: "Select the ranks to add (Deselect the ranks to remove):",
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-ranks-wrapper",
                                        class: "staff-components",
                                    },
                                    children: that.createRanksSelection(""),
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-ranks-label-former",
                                        class: "staff-components",
                                    },
                                    text: "Select previous higher rank(s) of this user (if any):",
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-ranks-label-former-resign",
                                        class: "resign-components",
                                    },
                                    text: "Select previous highest rank(s) of this user:",
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-ranks-wrapper-former",
                                        class: "staff-components resign-components",
                                    },
                                    children: that.createRanksSelection("-former"),
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-date-wrapper",
                                        class: "staff-components resign-components",
                                    },
                                    children: [{
                                        type: "label",
                                        id: "StaffTagger-date-label",
                                        text: "Join Date: ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-date-input",
                                            type: "text",
                                            value: defaultDate,
                                        },
                                    }, {
                                        type: "a",
                                        attr: {
                                            id: "StaffTagger-date-today",
                                            type: "text",
                                            href: "#",
                                        },
                                        html: "<sup>[Today]</sup>",
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-date-wrapper-resign",
                                        class: "resign-components",
                                    },
                                    children: [{
                                        type: "label",
                                        id: "StaffTagger-date-label-resign",
                                        text: "Resign Date: ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-date-input-resign",
                                            type: "text",
                                            value: defaultResignDate,
                                        },
                                    }, {
                                        type: "a",
                                        attr: {
                                            id: "StaffTagger-date-today-resign",
                                            type: "text",
                                            href: "#",
                                        },
                                        html: "<sup>[Today]</sup>",
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-bot-wrapper",
                                        class: "staff-components resign-components",
                                    },
                                    children: [{
                                        type: "abbr",
                                        id: "StaffTagger-bot-label",
                                        attr: {
                                            title: "Use the pipe character to separate multiple items, eg. Bot1|Bot2"
                                        },
                                        text: "Bot Account(s): ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-bot-input",
                                            type: "text",
                                            value: defaultBots,
                                        },
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-bot-pref",
                                            type: "checkbox",
                                        },
                                    }, {
                                        type: "label",
                                        attr: {
                                            for: "StaffTagger-bot-pref",
                                        },
                                        html: "<abbr title=\"Unchecking this will remove all bot accounts from the user\">Enable</abbr> Field",
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-bot-options-wrapper",
                                        class: "staff-components resign-components",
                                    },
                                    children: [{
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-bot-options-pref-a",
                                            type: "checkbox",
                                            checked: "checked",
                                        },
                                    }, {
                                        type: "label",
                                        attr: {
                                            for: "StaffTagger-bot-options-pref-a",
                                        },
                                        html: "<small>Handle <abbr title=\"New bot accounts added for this user in this edit. &#10;If checked, these accounts will be handled in sync with this user.\">Associated Bots</abbr></small>",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-bot-options-pref-d",
                                            type: "checkbox",
                                            checked: "checked",
                                        },
                                    }, {
                                        type: "label",
                                        attr: {
                                            for: "StaffTagger-bot-options-pref-d",
                                        },
                                        html: "<small>Handle <abbr title=\"Bot accounts found present in Module:Staff/Members but are removed in this edit. &#10;If checked, these accounts will have all user rights removed.\">Disassociated Bots</abbr></small>",
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-activity-wrapper",
                                        class: "staff-components resign-components",
                                    },
                                    children: [{
                                        type: "label",
                                        id: "StaffTagger-activity-label",
                                        text: "Activity Status: ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-activity-input",
                                            type: "text",
                                            value: defaultActivity,
                                        }
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-activity-pref",
                                            type: "checkbox",
                                        },
                                    }, {
                                        type: "label",
                                        attr: {
                                            for: "StaffTagger-activity-pref",
                                        },
                                        html: "<abbr title=\"Unchecking this will remove activity status from the user\">Enable</abbr> Field",
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-reason-wrapper",
                                        class: "staff-components",
                                    },
                                    children: [{
                                        type: "label",
                                        id: "StaffTagger-reason-label",
                                        text: "Reason: ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-reason-input",
                                            type: "text",
                                            style: "width: 80%;",
                                            value: defaultReason,
                                        },
                                    }],
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-reason-wrapper-resign",
                                        class: "resign-components",
                                    },
                                    children: [{
                                        type: "label",
                                        id: "StaffTagger-reason-label-resign",
                                        text: "Reason: ",
                                    }, {
                                        type: "input",
                                        attr: {
                                            id: "StaffTagger-reason-input-resign",
                                            type: "text",
                                            style: "width: 80%;",
                                            value: defaultResignReason,
                                        },
                                    }],
                                }],
                            }],
                        }]
                    });
                    that.modal.show();
                    that.toStaffMode();
                    for (var i in that.existingGroups)
                        $("#StaffTagger-rank-" + that.existingGroups[i]).prop("checked", true);
                    var former = cachedStaffData[user] && cachedStaffData[user]["former"] &&
                        that.parsePipeList(cachedStaffData[user]["former"]) || [];
                    if (!(former.length === 1 && former[0] === ""))
                        for (var j in former)
                            if (that.rankLongs[former[j]])
                                $("#StaffTagger-rank-" + that.rankLongs[former[j]] + "-former").prop("checked", true);
                    // attach events
                    $("#StaffTagger-date-today").click(that.putToday);
                    $("#StaffTagger-date-today-resign").click(that.putToday);
                    if (defaultBots !== "")
                        $("#StaffTagger-bot-pref").prop("checked", true);
                    if (defaultActivity !== "")
                        $("#StaffTagger-activity-pref").prop("checked", true);
                    $("#StaffTagger-bot-pref").change(function () {
                        $("#StaffTagger-bot-input")[0].disabled = !this.checked;
                    }).change();
                    $("#StaffTagger-activity-pref").change(function () {
                        $("#StaffTagger-activity-input")[0].disabled = !this.checked;
                    }).change();
                });
            },
            onclick: function (e) {
                e.preventDefault();
                that.user = (mw.config.get("wgNamespaceNumber") !== 2) ? $(this).parent().attr("data-user").replaceAll("_", " ") :
                    mw.config.get("wgPageName").match(mw.config.get("wgFormattedNamespaces")[2] + ":([^/]*)")[1].replaceAll("_", " ");
                that.showModal();
            },
            init: function () {
                $("span#tag-user > a[href*=\"prepend=\"].text").click(that.onclick);
                if (mw.config.get("wgNamespaceNumber") === 2) {
                    $(".page-header__contribution-buttons .wds-list, .page-header__actions .wds-list").first().append(
                        $("<li>").append(
                            $("<a>", {
                                text: "Staff Tagger",
                                href: "#",
                                click: that.onclick,
                            })
                        )
                    );
                }
            },

            toStaffMode: function () {
                that.usingMode = "staff";
                $(".resign-components").hide();
                $(".staff-components").show();
            },

            toResignMode: function () {
                that.usingMode = "resign";
                $(".staff-components").hide();
                $(".resign-components").show();
            },
        });

        Object.assign(this, {
            modal: new window.dev.modal.Modal({
                id: "StaffTagger-modal",
                title: "Staff Tagger v2.1",
                content: "",
                buttons: [{
                    event: "onSubmit",
                    id: "StaffTagger-submit",
                    primary: true,
                    text: "Submit",
                }, {
                    event: "onStaffMode",
                    id: "StaffTagger-staffmode",
                    text: "Switch to Staff Mode",
                }, {
                    event: "onResignMode",
                    id: "StaffTagger-resignmode",
                    text: "Switch to Resign Mode",
                }],
                events: {
                    onSubmit: this.processInformation,
                    onStaffMode: this.toStaffMode,
                    onResignMode: this.toResignMode,
                },
                size: "large",
            }),
        });
        that.modal.create();

        that.init();
    });
})();
//</pre>
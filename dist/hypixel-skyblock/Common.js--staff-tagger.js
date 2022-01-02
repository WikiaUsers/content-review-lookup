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
                            return a[0] > b[0];
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
            getDefaultDate: function (user) {
                return (!cachedStaffData[user] || !cachedStaffData[user]["join"]) ? "" : cachedStaffData[user]["join"];
            },
            getDefaultResignDate: function (user) {
                return (!cachedStaffData[user] || !cachedStaffData[user]["resignation"]) ? "" : cachedStaffData[user]["resignation"];
            },

            // #1: Granting rights (if applicable)
            grantUserRights: function (user, ranks_to_add, ranks_to_remove, reason) {
                return that.api.get({
                    action: "query",
                    list: "users",
                    ususers: user,
                    ustoken: "userrights",
                }).always(function (data) {
                    var usToken = data.query.users[0].userrightstoken;
                    if (data.query) {
                        that.api.post({
                            "action": "userrights",
                            "format": "json",
                            "user": user,
                            "add": ranks_to_add,
                            "remove": ranks_to_remove,
                            "expiry": "infinite",
                            "reason": reason,
                            "token": usToken,
                        }).always(function (data) {
                            if (data.userrights) {
                                console.log("[StaffTagger #1]: Finished modified ranks (when applicable)!");
                                console.log("[StaffTagger #1]: > Ranks added (" + Object.keys(data.userrights.added).length + "): ", data.userrights.added);
                                console.log("[StaffTagger #1]: > Ranks removed (" + Object.keys(data.userrights.removed).length + "): ", data.userrights.removed);
                            } else
                                console.warn("[StaffTagger #1]: Failed to modify ranks:" + data);
                        });
                    } else
                        console.warn("[StaffTagger #1]: API error in getting user rights token:" + data, "(API Error code \"" + data + "\")");
                });
            },

            // #2: Change Staff Data on Staff Page
            // Now should update Module:Staff/Members instead
            changeStaffData: function (user, ranklist, formerlist, joindate, resigndate, reason) {
                ranklist = ranklist || [];
                formerlist = formerlist || [];
                var rankshorts = [],
                    formershorts = [];
                for (var i in that.ranksAvailable) {
                    if (ranklist.includes(that.ranksAvailable[i]))
                        rankshorts.push(that.rankShorts[that.ranksAvailable[i]]);
                    if (formerlist.includes(that.ranksAvailable[i]))
                        formershorts.push(that.rankShorts[that.ranksAvailable[i]]);
                }

                cachedStaffData[user] = cachedStaffData[user] || {};
                if (resigndate) {
                    Object.assign(cachedStaffData[user], {
                        former: formershorts.join("|"),
                        join: joindate,
                        resignation: resigndate,
                    });
                    delete cachedStaffData[user].rank;
                } else {
                    Object.assign(cachedStaffData[user], {
                        rank: rankshorts.join("|"),
                        former: formershorts.join("|"),
                        join: joindate,
                    });
                    delete cachedStaffData[user].resignation;
                }
                if (!rankshorts.length)
                    delete cachedStaffData[user].rank;
                if (!formershorts.length)
                    delete cachedStaffData[user].former;

                return that.saveToWiki(cachedStaffData, reason, that.staffDataPage).always(function (data) {
                    if (data.edit)
                        console.log("[StaffTagger #2]: Successfully modified", user, "on staff member list");
                    else
                        console.warn("[StaffTagger #2]: API Error in editing staff member list", user + ":", data);
                });
            },

            // #3: Add staff message box to userpage
            addMsgBox: function (user, reason, toRemove) {
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
                    if (toRemove) {
                        delete options.prependtext;
                        options.text = content.replace(regex, "");
                    } else if (content.match(regex)) {
                        delete options.prependtext;
                        options.text = newtext + content.replace(regex, "");
                    }
                    return that.api.post(options);
                }).always(function (data) {
                    if (data.edit)
                        console.log("[StaffTagger #3]: Successfully added StaffMsgbox to", user);
                    else
                        console.warn("[StaffTagger #3]: API Error in adding StaffMsgbox for", user + ":", data);
                });
            },

            // #4: Protect staff userpage
            protectStaffPage: function (user, highLevel) {
                var userpage = "User:" + user;
                return that.api.post({
                    action: "protect",
                    bot: true,
                    watchlist: "nochange",
                    title: userpage,
                    protections: (highLevel) ?
                        "edit=sysop|move=sysop" : "edit=autoconfirmed|move=autoconfirmed",
                    expiry: "infinite",
                    reason: "Protecting wiki staff userpage",
                    token: mw.user.tokens.values.editToken,
                }).always(function (data) {
                    if (data.protect)
                        console.log("[StaffTagger #4]: Successfully protected", user + "\'s userpage");
                    else
                        console.warn("[StaffTagger #4]: API error in protecting", user + "\'s userpage:", data);
                });
            },

            // #5: Update staff-colors.less
            updateStaffColors: function () {
                return $.Deferred(function (def) {
                    mw.util.StaffUtil.updateStaffColors(function () {
                        console.log("[StaffTagger #5]: Successfully updated staff-colors.less");
                        def.resolve();
                    });
                });
            },

            // #6: Null Edit Pages
            nullEditPages: function (user) {
                return [
                    that.api.post({
                        action: 'edit',
                        title: "Message_Wall:" + user,
                        token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
                        prependtext: '',
                    }).always(function (data) {
                        if (data.edit)
                            console.log("[StaffTagger #6]: Successfully null edited Message_Wall:" + user);
                        else
                            console.warn("[StaffTagger #6]: API error in null editing Message_Wall:" + user, data);
                    }),
                    that.api.post({
                        action: 'edit',
                        title: "User_talk:" + user,
                        token: mw.user.tokens.get('csrfToken') || mw.user.tokens.get('editToken'),
                        prependtext: '',
                    }).always(function (data) {
                        if (data.edit)
                            console.log("[StaffTagger #6]: Successfully null edited User_talk:" + user);
                        else
                            console.warn("[StaffTagger #6]: API error in null editing User_talk:" + user, data);
                    }),
                ];
            },

            isValidDate: function (s) {
                return /\d{4}\-\d{1,2}\-\d{1,2}/.test(s) && (!isNaN((new Date(s)).getDate()));
            },

            processInformation: function () {
                var mode = that.usingMode,
                    errorEl = $("#StaffTagger-error"),
                    rmMsgBox = $("#StaffTagger-staffmsgbox-pref").prop("checked"),
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
                        reason: $("#StaffTagger-reason-input").val().trim(),
                    };
                    opts.addedRanks = opts.ranklist.join("|");
                    opts.highlevel = /content-moderator|codeeditor|sysop|bureaucrat/.test(opts.addedRanks);
                    opts.removedRanks = [];
                    for (var i in that.existingGroups) {
                        if (!opts.ranklist.includes(that.existingGroups[i]))
                            opts.removedRanks.push(that.existingGroups[i]);
                    }
                    if (!opts.ranklist.length && !window.confirm("No ranks are selected for this user. Are you sure to proceed?\nNote: For staff resignation, click \"CANCEL\" and \"Switch to Resign Mode\"."))
                        return;
                } else if (mode === "resign") {
                    opts = {
                        user: $("#StaffTagger-user-input").val().trim(),
                        formerlist: $("#StaffTagger-ranks-wrapper-former *:checked").get().map(function (el) {
                            return $(el).attr("data-rank");
                        }),
                        date: $("#StaffTagger-date-input").val().trim(),
                        resignDate: $("#StaffTagger-date-input-resign").val().trim(),
                        reason: $("#StaffTagger-reason-input-resign").val().trim(),
                        highLevel: false,
                    };
                    opts.removedRanks = that.ranksAvailable.join("|");
                    if (!opts.formerlist.length && !window.confirm("No former ranks are selected. Are you sure to proceed?"))
                        return;
                }
                if (!that.isValidDate(opts.date))
                    return errorEl.text("Join date is invalid.");
                if ("resignDate" in opts && !that.isValidDate(opts.resignDate))
                    return errorEl.text("Resign date is invalid.");
                if (opts.user === "")
                    return errorEl.text("Please input a user.");

                Promise.all([
                    that.grantUserRights(opts.user, opts.addedRanks, opts.removedRanks, opts.reason), // #1
                    that.changeStaffData(opts.user, opts.ranklist, opts.formerlist, opts.date, opts.resignDate, opts.reason), // #2
                    that.addMsgBox(opts.user, opts.reason, rmMsgBox), // #3
                    that.protectStaffPage(opts.user, opts.highLevel), // #4
                    that.updateStaffColors(), // #5
                ].concat(
                    that.nullEditPages(opts.user) // #6
                )).then(that.onResolve);

                that.modal.hide();
                new BannerNotification($("<div>", {
                    html: "<div><b>Processing, Please Wait.</b><br />Another pop-up should indicate completion.</div>",
                }).prop("outerHTML"), "confirm", undefined, 5000).show();
            },

            onResolve: function () {
                new BannerNotification($("<div>", {
                    html: "<div><b>All subprocesses completed. Horray!</b><br>Please check the Console for all the results/errors.<br>You may now <a href=\"/wiki/CSS\">Update CSS</a>.</div>",
                }).prop("outerHTML"), "confirm").show();
            },

            editorCloseHandler: function () {
                that.modal.hide();
            },

            createIntroSection: function () {
                return "Select the ranks for this user. Then, the Staff Tagger will perform the following:\
                    <ol>\
                    <li>Grant/Remove selected rights to the user on wiki (if applicable)</li>\
                    <li>Change staff data on <a href=\"/wiki/Module:Staff/Members\">Module:Staff/Members</a></li>\
                    <li>Add StaffMsgBox to the user page (if applicable)</li>\
                    <li>Increase/Decrease protection of the user page</li>\
                    <li>Update <a href=\"/wiki/MediaWiki:Custom-common.less/staff-colors.less\">staff-color.less</a></li>\
                    <li>Null Edit <code>Message_Wall</code> and <code>User_talk</code> for the user</li>\
                    </ol>\
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
                    var defaultDate = that.getDefaultDate(user),
                        defaultResignDate = that.getDefaultResignDate(user),
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
                                type: "span",
                                attr: {
                                    class: "page-content",
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
                                        style: "color: #c15926;",
                                    },
                                    html: "<b>Staff Mode</b>",
                                }, {
                                    type: "div",
                                    attr: {
                                        id: "StaffTagger-mode-label-resign",
                                        class: "resign-components",
                                        style: "color: #5f9ea0;",
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
                                        attr: "staff-components resign-components",
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
                                            value: user,
                                        },
                                    }, {
                                        type: "label",
                                        attr: {
                                            for: "StaffTagger-staffmsgbox-pref",
                                        },
                                        html: "<small>Remove StaffMsgBox from user page</small>",
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
                                        attr: "staff-components resign-components",
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
                    var former = cachedStaffData[user] && cachedStaffData[user]["former"] && cachedStaffData[user]["former"].split("|") || [];
                    if (!(former.length === 1 && former[0] === ""))
                        for (var j in former)
                            if (that.rankLongs[former[j]])
                                $("#StaffTagger-rank-" + that.rankLongs[former[j]] + "-former").prop("checked", true);
                    $("#StaffTagger-date-today").click(that.putToday);
                    $("#StaffTagger-date-today-resign").click(that.putToday);
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
                title: "Staff Tagger",
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
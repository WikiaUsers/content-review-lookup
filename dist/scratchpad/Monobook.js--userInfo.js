// 11:59, June 21, 2015 (UTC)
// <source lang="JavaScript">

// Modified from http://en.wikipedia.org/wiki/User:Pleasestand/userinfo.js
// at http://runescape.wikia.com/wiki/User:Hairr/userInfo.js

function UserinfoJsParseDate(utcDate) {
    var s = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)Z$/.exec(utcDate);
    if (s === null) {
        return null
    }
    var d = new Date();
    d.setUTCFullYear(s[1], s[2] - 1, s[3]);
    d.setUTCHours(s[4], s[5], s[6]);
    return d
}
function UserinfoJsFormatQty(qty, singular, plural) {
    return String(qty).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,") + "\u00a0" + (qty == 1 ? singular : plural)
}
function UserinfoJsFormatDateRel(old) {
    var age = new Date().getTime() - old.getTime();
    var ageNumber, ageRemainder, ageWords;
    if (age < 60000) {
        ageNumber = Math.floor(age / 1000);
        ageWords = UserinfoJsFormatQty(ageNumber, "second", "seconds")
    } else if (age < 3600000) {
        ageNumber = Math.floor(age / 60000);
        ageWords = UserinfoJsFormatQty(ageNumber, "minute", "minutes")
    } else if (age < 86400000) {
        ageNumber = Math.floor(age / 3600000);
        ageWords = UserinfoJsFormatQty(ageNumber, "hour", "hours");
        ageRemainder = Math.floor((age - ageNumber * 3600000) / 60000)
    } else if (age < 604800000) {
        ageNumber = Math.floor(age / 86400000);
        ageWords = UserinfoJsFormatQty(ageNumber, "day", "days")
    } else if (age < 2592000000) {
        ageNumber = Math.floor(age / 604800000);
        ageWords = UserinfoJsFormatQty(ageNumber, "week", "weeks")
    } else if (age < 31536000000) {
        ageNumber = Math.floor(age / 2592000000);
        ageWords = UserinfoJsFormatQty(ageNumber, "month", "months")
    } else {
        ageNumber = Math.floor(age / 31536000000);
        ageWords = UserinfoJsFormatQty(ageNumber, "year", "years");
        ageRemainder = Math.floor((age - ageNumber * 31536000000) / 2592000000);
        if (ageRemainder) {
            ageWords += " " + UserinfoJsFormatQty(ageRemainder, "month", "months")
        }
    }
    return ageWords
}
if ((wgNamespaceNumber == 2 || wgNamespaceNumber == 3) && !(/\//.test(wgTitle))) {
    mw.loader.using('mediawiki.util', function () {
        addOnloadHook(function () {
            var et = encodeURIComponent(wgTitle);
            var x = sajax_init_object();
            x.open("GET", wgScriptPath + "/api.php?format=json&maxage=300&action=query&list=users|usercontribs&usprop=blockinfo|editcount|gender|registration|groups&uclimit=1&ucprop=timestamp&ususers=" + et + "&ucuser=" + et, true);
            x.onreadystatechange = function () {
                if (x.readyState != 4 || x.status != 200) {
                    return
                }
                var query = eval("(" + x.responseText + ")");
                if (!query.query) {
                    return
                }
                query = query.query;
                var user, invalid, missing, groups, editcount, registration, blocked, gender, lastEdited;
                try {
                    user = query.users[0];
                    invalid = typeof user.invalid != "undefined";
                    missing = typeof user.missing != "undefined";
                    groups = (typeof user.groups == "object") ? user.groups : [];
                    editcount = (typeof user.editcount == "number") ? user.editcount : null;
                    registration = (typeof user.registration == "string") ? UserinfoJsParseDate(user.registration) : null;
                    blocked = typeof user.blockedby != "undefined";
                    gender = (typeof user.gender == "string") ? user.gender : null;
                    lastEdited = (typeof query.usercontribs[0] == "object") && (typeof query.usercontribs[0].timestamp == "string") ? UserinfoJsParseDate(query.usercontribs[0].timestamp) : null
                } catch (e) {
                    return;
                }
                var statusText = "";
                var ipUser = false;
                var ipv4User = false;
                var ipv6User = false;
                if (blocked) {
                    statusText += "<a href=\"" + wgScriptPath + "/index.php?title=Special:Log&amp;page=" + encodeURIComponent(wgFormattedNamespaces[2] + ":" + user.name) + "&amp;type=block\">blocked</a> "
                }
                if (missing) {
                    statusText += "username not registered"
                } else if (invalid) {
                    ipv4User = mw.util.isIPv4Address(user.name);
                    ipv6User = mw.util.isIPv6Address(user.name);
                    ipUser = ipv4User || ipv6User;
                    if (ipv4User) {
                        statusText += "anonymous IPv4 user"
                    } else if (ipv6User) {
                        statusText += "anonymous IPv6 user"
                    } else {
                        statusText += "invalid username"
                    }
                } else {
                    var friendlyGroupNames = {
                        '*': false,
                        'user': false,
                        'autoconfirmed': false,
                        'emailconfirmed': false,
                        "rollback": "rollbacker",
                        "chatmoderator":"chat moderator",
                        "checkuser":"check user",
                        "deleterevision":"revision deleter",
                        "bot-global":"global bot",
                        "vstf":"VSTF",
                        "staff":"wikia staff",
                        "helper":"wikia helper",
                        sysop: "administrator"
                    };
                    var friendlyGroups = [];
                    for (var i = 0; i < groups.length; ++i) {
                        var s = groups[i];
                        if (friendlyGroupNames.hasOwnProperty(s)) {
                            if (friendlyGroupNames[s]) {
                                friendlyGroups.push(friendlyGroupNames[s])
                            }
                        } else {
                            friendlyGroups.push(s)
                        }
                    }
                    switch (friendlyGroups.length) {
                        case 0:
                            if (blocked) {
                                statusText += "user"
                            } else {
                                statusText += "registered user"
                            }
                            break;
                        case 1:
                            statusText += friendlyGroups[0];
                            break;
                        case 2:
                            statusText += friendlyGroups[0] + " and " + friendlyGroups[1];
                            break;
                        default:
                            statusText += friendlyGroups.slice(0, -1).join(", ") + ", and " + friendlyGroups[friendlyGroups.length - 1];
                            break
                    }
                }
                if (registration) {
                    statusText += ", " + UserinfoJsFormatDateRel(registration) + " old"
                }
                if (editcount !== null) {
                    statusText += ", with " + "<a href=\"/wiki/Special:Editcount/" + encodeURIComponent(user.name) + "\">" + UserinfoJsFormatQty(editcount, "edit", "edits") + "</a>"
                }
                if ("AEIOaeio".indexOf(statusText.charAt(0)) >= 0) {
                    statusText = "An " + statusText
                } else {
                    statusText = "A " + statusText
                }
                statusText += ".";
                if (lastEdited) {
                    statusText += " Last edited <a href=\"" + wgArticlePath.replace("$1", "Special:Contributions/" + encodeURIComponent(user.name)) + "\">" + UserinfoJsFormatDateRel(lastEdited) + " ago</a>."
                }
                var fh = window.document.getElementById("firstHeading") || window.document.getElementById("section-0");
                var newClasses = [];
                if (blocked) {
                    newClasses.push("ps-blocked")
                }
                if (ipUser) {
                    newClasses.push("ps-anonymous")
                } else if (invalid) {
                    newClasses.push("ps-invalid")
                } else {
                    newClasses.push("ps-registered")
                }
                fh.className += (fh.className.length ? " " : "") + $.map(groups, function (s) {
                    return "ps-group-" + s
                }).concat(newClasses).join(" ");
                var genderSpan = window.document.createElement("span");
                genderSpan.id = "ps-gender-" + (gender || "unknown");
                genderSpan.style.paddingLeft = "0.25em";
                genderSpan.style.fontFamily = '"Lucida Grande", "Lucida Sans Unicode", "sans-serif"';
                genderSpan.style.fontSize = "75%";
                var genderSymbol;
                switch (gender) {
                    case "male":
                        genderSymbol = "\u2642";
                        break;
                    case "female":
                        genderSymbol = "\u2640";
                        break;
                    default:
                        genderSymbol = "";
                        break
                }
                genderSpan.appendChild(window.document.createTextNode(genderSymbol));
                fh.appendChild(genderSpan);
                var ss = window.document.getElementById("siteSub");
                if (!ss) {
                    ss = window.document.createElement("div");
                    ss.id = "siteSub";
                    ss.innerHTML = "From Scratchpad, the home of mini-wikis!!";
                    var bc = window.document.getElementById("bodyContent");
                    bc.insertBefore(ss, bc.firstChild)
                }
                ss.innerHTML = '<span id="ps-userinfo">' + statusText + '</span> ' + ss.innerHTML + '.'
            };
            x.send(null)
        })
    })
}

// </source>
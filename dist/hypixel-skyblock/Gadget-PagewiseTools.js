/* Small tools that only affects certain pages

Table of Contents
-----------------------
 * (Tool 1) Hypixel Item Data Fetcher
 * (Tool 2) Mayor Election Data Fetcher
 * (Tool 3) Bingo Table Generator
*/

/* jshint
    esversion: 5, esnext: false, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    forin: false,
    -W082, -W084
*/

/* global mw, BannerNotification */

mw.loader.using(["mediawiki.api"]).then(function () {

    //##############################################################
    /** Common helper functions **/

    // code snippet from https://stackoverflow.com/questions/46041831/copy-to-clipboard-with-break-line
    function copyToClipboard(text, notice) {
        notice = notice ? (notice + "\n\n") : "";
        if (confirm(notice + "The following will be copied to your clipboard:\n\n" + text + "\n\nClick OK to confirm")) {
            var $temp = $("<textarea>");
            var brRegex = /<br\s*[\/]?>/gi;
            $("body").append($temp);
            $temp.val(text.replace(brRegex, "\r\n")).select();
            document.execCommand("copy");
            $temp.remove();
            if (BannerNotification)
                new BannerNotification($("<div>", {
                    html: "<div>Copied to clipboard</div>",
                }).prop("outerHTML"), "confirm", null, 2000).show();
        }
    }

    //##############################################################
    /** (Tool 1) Hypixel Item Data Fetcher **/
    (function () {
        var mdns = mw.config.get("wgFormattedNamespaces")[828],
            LUA_DATA_PAGE = mdns + ":Item/ApiData",
            LUA_ALIASES_PAGE = mdns + ":Item/ApiAliases",
            HYPIXEL_ITEMS_API_URL = "https://api.hypixel.net/resources/skyblock/items",
            BUTTON = "#hswUpdateItemData",
            ALLOWED_PAGES = [LUA_DATA_PAGE, LUA_ALIASES_PAGE];

        if (!ALLOWED_PAGES.includes(mw.config.get("wgPageName")) || $(BUTTON).length < 1) return;

        /////////////////////
        // Helper Functions
        /////////////////////

        var _api;

        function api() {
            return _api ? _api : (_api = new mw.Api());
        }

        function reEnableButton() {
            $("#hswUpdateItemData").attr("disabled", false).text("Try Again");
        }

        function errorHandler(err) {
            mw.notify("See the web console for details", {
                title: "Uncaught Error",
                type: "error"
            });
            console.error(err);
            reEnableButton();
        }

        // Recursive json to lua conversion function (mimified)
        function jsonToLuaTableMin(json) {
            function getkey(key) {
                return /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : ("['" + key.replaceAll("\'", "\\\'") + "']");
            }
            if (Array.isArray(json)) {
                return "{" + json.map(function (o) {
                    return jsonToLuaTableMin(o);
                }).join(",") + "}";
            } else if (typeof json === "object") {
                return "{" +
                    Object.entries(json).map(function (data) {
                        return getkey(data[0]) + "=" + jsonToLuaTableMin(data[1]);
                    }).join(",") + "}";
            }
            // Otherwise seems to be normal value; done on this branch!
            else {
                return typeof json === "string" ? "\"" + json.replaceAll("\"", "\\\"") + "\"" : json;
            }
        }

        // Recursive json to lua conversion function (pretty print)
        function jsonToLuaTable(json, space, depth) {
            space = typeof space === "undefined" ? "\t" : space;
            depth = typeof depth === "undefined" ? -1 : depth;
            depth++;
            if (Array.isArray(json)) {
                return "{ " + json.map(function (o) {
                    return jsonToLuaTable(o, space, depth);
                }).join(", ") + " }";
            } else if (typeof json === "object") {
                var indent = "\t".repeat(depth);
                return "{\n" +
                    Object.entries(json).map(function (data) {
                        return indent + space + "['" + data[0].replaceAll("\'", "\\\'") + "']=" + jsonToLuaTable(data[1], space, depth);
                    }).join(",\n") +
                    "\n" + indent + "}";
            }
            // Otherwise seems to be normal value; done on this branch!
            else {
                return typeof json === "string" ? "\"" + json.replaceAll("\"", "\\\"") + "\"" : json;
            }
        }

        // function luaTableToJson(lua) {
        // 	return api().post({
        // 		action: "scribunto-console",
        // 		title: mw.config.get("wgPageName"),
        // 		question: "=mw.text.jsonEncode(p)",
        // 		content: lua,
        // 	})
        // 	.then(function(response){ return response.return })
        // 	.then(function(data){
        // 		return JSON.parse(data);
        // 	});
        // }

        function luaTableDataModuleToJson(moduleName) {
            return api().post({
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
        }

        /////////////////////
        // Core Functions
        /////////////////////

        function fetchHypixelItems() {
            return fetch(HYPIXEL_ITEMS_API_URL).then(function (response) {
                return response.json();
            });
        }

        function fetchLuaDataAsJson(page) {
            return luaTableDataModuleToJson(page);
            // return api().parse("{{" + LUA_DATA_PAGE + "}}").then(function(response){
            // 	 var luastr = response.match(new RegExp("<pre>(.*)<\/pre>", "ms"))[1];
            // 	 return luaTableToJson(luastr);
            // });
        }

        function saveToWikiMulti(arr) {
            var promises = arr.map(function (obj) {
                var lua = "-- <pre>\nreturn " + (obj.mimified ? jsonToLuaTableMin(obj.json) : jsonToLuaTable(obj.json));
                console.log(lua);

                return api().postWithEditToken({
                    action: "edit",
                    text: lua,
                    title: obj.page,
                    summary: "Updating data" + (obj.newCount > 0 ? " - adding " + obj.newCount + " new items" : ""),
                    minor: true,
                });
            });

            Promise.all(promises).then(function () {
                mw.notify("Refreshing page..", {
                    title: "Saved Successful!",
                    type: "info"
                });
                window.location.reload();
            })
            // Fandom doesn't like catch as a method name
            ["catch"](errorHandler);
        }

        // function saveToWiki(json, newCount, page) {
        // 	var lua = "-- <pre>\nreturn " + jsonToLuaTableMin(json);
        // 	console.log(lua);

        // 	api().postWithEditToken({
        // 		action: "edit",
        // 		text: lua,
        // 		title: page,
        // 		summary: "Updating data" + (newCount > 0 ? " - adding " + newCount + " new items" : ""),
        // 		minor: true,
        // 	})
        // 	.then(function() {
        // 		mw.notify("Refreshing page..", { title: "Save Successful!", type: "info" });
        // 		window.location.reload();
        // 	})
        // 	// Fandom doesn't like catch as a method name
        // 	["catch"](errorHandler);
        // }

        function start() {
            Promise.all([
                    fetchHypixelItems(),
                    fetchLuaDataAsJson(LUA_DATA_PAGE),
                    fetchLuaDataAsJson(LUA_ALIASES_PAGE)
                ])
                .then(function (responses) {
                    var hypixelData = responses[0],
                        oldLuaData = responses[1],
                        luaAliases = responses[2];
                    if (hypixelData.lastUpdated <= oldLuaData.lastUpdated) {
                        mw.notify("Skipping update", {
                            title: "No new updates",
                            type: "info"
                        });
                        reEnableButton();
                        return;
                    }

                    var newItemsMap = hypixelData.items.reduce(function (obj, item) {
                        obj[item.id] = item;
                        return obj;
                    }, {});
                    var oldItemsMap = "items" in oldLuaData && oldLuaData.items || {};

                    // Detect new items and set dates
                    var newItemDate = hypixelData.lastUpdated,
                        newCount = 0,
                        newAliases = 0;
                    Object.keys(newItemsMap).forEach(function (key) {
                        if (!oldItemsMap[key]) {
                            newCount++;
                            newItemsMap[key].date = newItemDate;
                        } else {
                            newItemsMap[key].date = oldItemsMap[key].date;
                        }
                        var name = newItemsMap[key].name.toUpperCase().replaceAll(/ /g, "_").replaceAll(/§\w/g, "");
                        if (!luaAliases[name]) {
                            newAliases++;
                            luaAliases[name] = key;
                        }
                    });

                    mw.notify("Saving " + newCount + " new items and " + newAliases + " new aliases", {
                        title: "Fetch Successful",
                        type: "info"
                    });

                    // Save fetched data and aliases
                    var sortedLuaAliases = Object.keys(luaAliases).sort().reduce(function (obj, key) {
                        obj[key] = luaAliases[key];
                        return obj;
                    }, {});

                    saveToWikiMulti([{
                        json: {
                            lastUpdated: hypixelData.lastUpdated,
                            items: newItemsMap
                        },
                        newCount: newCount,
                        page: LUA_DATA_PAGE,
                        mimified: true,
                    }, {
                        json: sortedLuaAliases,
                        newCount: newAliases,
                        page: LUA_ALIASES_PAGE,
                        mimified: false,
                    }]);
                })
            // Fandom doesn't like catch as a method name
            ["catch"](errorHandler);
        }

        $(BUTTON).show().on("click", function () {
            $(this).attr("disabled", true).text("Fetching Data...");
            start();
        });

    })();

    //##############################################################
    /** (Tool 2) Mayor Elections Data Fetcher **/
    (function () {
        var mdns = mw.config.get("wgFormattedNamespaces")[828],
            ALLOWED_PAGE = mdns + ":Mayor/Elections",
            MAYOR_DATA_PAGE = mdns + ":Mayor/Data",
            MAYOR_ELECTIONS_PAGE = mdns + ":Mayor/Elections",
            ELECTED_BUTTON = "#mayordata-last",
            CURRENT_BUTTON = "#mayordata-current";

        if (
            mw.config.get("wgPageName") !== ALLOWED_PAGE ||
            ($(ELECTED_BUTTON).length + $(CURRENT_BUTTON).length < 1)
        ) return;

        function errorHandler(err) {
            mw.notify("See the web console for details", {
                title: "Uncaught Error",
                type: "error"
            });
            console.error(err);
        }

        function getElectionData() {
            return fetch("https://api.hypixel.net/resources/skyblock/election")
                .then(function (response) {
                    return response.json();
                })
                .catch(errorHandler);
        }

        function getModuleData(page) {
            return (new mw.Api()).post({
                    action: "scribunto-console",
                    title: mw.config.get("wgPageName"),
                    question: "=mw.text.jsonEncode(require('" + page + "'))"
                })
                .then(function (response) {
                    return response.return;
                })
                .then(function (data) {
                    return JSON.parse(data);
                })
                .catch(errorHandler);
        }

        function getLocalData() {
            return getModuleData(MAYOR_DATA_PAGE);
        }

        function getLocalElections() {
            return getModuleData(MAYOR_ELECTIONS_PAGE);
        }

        function getPerks(candidateData, localData) {
            var a = [],
                mayorData = localData[candidateData.name],
                indexedMayorPerks = mayorData.perks_listed || mayorData.perks;
            candidateData.perks.forEach(function (perk) {
                var n = 0;
                for (var j in indexedMayorPerks) {
                    if (indexedMayorPerks[j][0] === perk.name) {
                        n = Number(j) + 1;
                        break;
                    }
                }
                a.push(n === 0 ? '?' : n);
            });
            return a.join("");
        }

        function candidatesToArray(candidates, localData, existingData) {
            var res = [];
            candidates.forEach(function (cand, i) {
                res.push({
                    name: cand.name,
                    order: i + 1,
                    perks: existingData && existingData[cand.name] && existingData[cand.name].perks || getPerks(cand, localData),
                    votes: cand.votes,
                    last: existingData && existingData[cand.name] && existingData[cand.name].last || undefined,
                });
            });
            return res;
        }

        if ($(ELECTED_BUTTON).length > 0)
            $(ELECTED_BUTTON).show().click(function () {
                Promise.all([getElectionData(), getLocalData(), getLocalElections()]).then(function (data) {
                    var pastElectionData = data[0].mayor.election,
                        localData = data[1].mayors,
                        localElections = data[2].elections,
                        year = Number(pastElectionData.year),
                        existingData = localElections[year - 1] && localElections[year - 1].data || undefined;
                    var candidates = candidatesToArray(pastElectionData.candidates, localData, existingData).map(function (v) {
                        return "\t\t" + v.name + " = { " + " votes = " + v.votes + ", perks = '" + v.perks + "', order = " + v.order + ", last = " + (v.last || "nil") + " },";
                    });
                    copyToClipboard("\t[" + year + "] = { " + "date = nil, ui = true, data = {\n" + candidates.join("\n") + "\n\t}},");
                });
            });

        if ($(CURRENT_BUTTON).length > 0)
            $(CURRENT_BUTTON).show().click(function () {
                Promise.all([getElectionData(), getLocalData()]).then(function (data) {
                    var currentElectionData = data[0].current,
                        localData = data[1].mayors,
                        year = Number(currentElectionData.year);
                    var candidates = candidatesToArray(currentElectionData.candidates, localData).map(function (v) {
                        return "\t\t" + v.name + " = { " + " votes = nil, perks = '" + v.perks + "', order = " + v.order + ", last = nil },";
                    });
                    copyToClipboard("\t[" + year + "] = { control = 'in-progress', data = {\n" + candidates.join("\n") + "\n\t}},");
                });
            });
    })();

    //##############################################################
    /** (Tool 3) Bingo Table Generator **/
    (function () {
        var ALLOWED_PAGE = "Bingo/Events",
            BUTTON = "#bingodata",
            MONTHS = [
                "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ],
            COLORS_TO_TEMPLATE = [
                "Black", "Dark Blue", "Dark Green", "Dark Aqua", "Dark Red", "Dark Purple", "Gold", "Gray", "Dark Gray", "Blue", "Green", "Aqua", "Red", "Light Purple", "Yellow", "White"
            ],
            DIAGONALS = [0, 6, 12, 18, 24];

        // to find diagonals:
        // [0, 1, 2, 3, 4].map(function (n) {
        // 	return n * 5 + n
        // });

        if (ALLOWED_PAGE !== mw.config.get("wgPageName") || $(BUTTON).length < 1) return;

        function errorHandler(err) {
            mw.notify("See the web console for details", {
                title: "Uncaught Error",
                type: "error"
            });
            console.error(err);
        }

        function getBingoData() {
            return fetch("https://api.hypixel.net/resources/skyblock/bingo")
                .then(function (response) {
                    return response.json();
                })
                .catch(errorHandler);
        }

        function constructTable(goals) {
            function replfunc(match, pattern1, pattern2, pattern3) {
                return "{{" + COLORS_TO_TEMPLATE[parseInt(pattern1, 16)] + "|" + pattern2 + "}}" + pattern3;
            }

            function processStr(v) {
                var s = v[1] || "";
                while (s.search(/§[0-9a-f]/) > -1) {
                    s = s.replace(/§([0-9a-f])(.*?)(\s*§|\s*{{|$)/g, replfunc);
                }
                return [v[0] || "", s.replace(/{{Gray\|(.*?)}}/g, "$1")];
            }

            function tablize(v) {
                return "|-\n| " + v[0] + " || " + v[1];
            }
            var personal = [],
                community = [];
            goals.forEach(function (v, i) {
                (DIAGONALS.includes(i) ? community : personal).push([v.name, v.lore]);
            });

            personal = personal.map(processStr).map(tablize);
            community = community.map(processStr).map(tablize);

            return "{| class=\"wikitable\"\n! Name !! Requirement\n|-\n! colspan=\"2\" | Personal Goals\n" + personal.join("\n") + "\n|-\n! colspan=\"2\" | Community Goals\n" + community.join("\n") + "\n|}";
        }

        function th(n) {
            var num = n % 100;
            if (num >= 11 && num <= 13)
                return num + "th";
            else if (num % 10 === 1)
                return num + "st";
            else if (num % 10 === 2)
                return num + "nd";
            else if (num % 10 === 3)
                return num + "rd";
            else
                return num + "th";
        }

        function getYear(n) {
            // note: 0 = DEC 2021
            return 2021 + (Math.floor((n - 1) / 12) + 1);
        }

        function getMonth(n) {
            // note: 0 = DEC 2021
            return n % 12 === 0 ? 12 : n % 12;
        }

        function mo(n) {
            // note: 0 = DEC 2021
            return MONTHS[getMonth(n) - 1] + " " + getYear(n);
        }

        $(BUTTON).show().click(function () {
            getBingoData().then(function (data) {
                var notice = "Note: This data is for:\n\n" + th(data.id + 1) + " bingo event (held in " + mo(data.id) + ")",
                    id = "goals-" + getYear(data.id) + "-" + getMonth(data.id);
                copyToClipboard("<div class=\"mw-customtoggle-" + id + " wikia-menu-button hidden\" tabindex=\"0\">Show/Hide</div>\n<div class=\"mw-collapsible mw-collapsed\" id=\"mw-customcollapsible-" + id + "\">\n" + constructTable(data.goals) + "\n</div>", notice);
            });
        });
    })();

});
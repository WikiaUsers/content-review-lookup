/* Small tools that only affects certain pages

Table of Contents
-----------------------
 * (Tool 1) Mayor Election Data Fetcher
 * (Tool 2) Bingo Table Generator
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
    /** (Tool 1) Mayor Elections Data Fetcher **/
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
                    params: existingData && existingData[cand.name] && existingData[cand.name].params || undefined,
                    votes: cand.votes,
                    last: existingData && existingData[cand.name] && existingData[cand.name].last || undefined,
                });
            });
            return res;
        }

        function paramsToStr(params) {
            // "params" expected to be an array (of unknown continuity) of numbers/strings
            return Object.keys(params).map(function (k) {
                if (typeof params[k] === 'number')
                    return "[" + k + "] = " + params[k];
                else
                    return "[" + k + "] = '" + params[k].replaceAll("'", "\\'") + "'";
            }).join(", ");
        }

        if ($(ELECTED_BUTTON).length > 0)
            $(ELECTED_BUTTON).show().click(function () {
                Promise.all([getElectionData(), getLocalData(), getLocalElections()]).then(function (data) {
                    var pastElectionData = data[0].mayor.election;
                    if (!pastElectionData) {
                        alert("The API does not provide past election data at the moment.");
                        return;
                    }
                    var localData = data[1].mayors,
                        localElections = data[2].elections,
                        year = Number(pastElectionData.year),
                        existingData = localElections[year - 1] && localElections[year - 1].data || undefined;
                    var candidates = candidatesToArray(pastElectionData.candidates, localData, existingData).map(function (v) {
                        return "\t\t" + v.name + " = { votes = " + v.votes + ", perks = '" + v.perks + "'" + ", order = " + v.order + ", last = " + (v.last || "nil") + (v.params && (", params = { " + paramsToStr(v.params) + " }") || "") + " },";
                    });
                    copyToClipboard("\t[" + year + "] = { " + "date = nil, data = {\n" + candidates.join("\n") + "\n\t}},");
                });
            });

        if ($(CURRENT_BUTTON).length > 0)
            $(CURRENT_BUTTON).show().click(function () {
                Promise.all([getElectionData(), getLocalData()]).then(function (data) {
                    var currentElectionData = data[0].current;
                    if (!currentElectionData) {
                        alert("The API does not provide current election data at the moment.");
                        return;
                    }
                    var localData = data[1].mayors,
                        year = Number(currentElectionData.year);
                    var candidates = candidatesToArray(currentElectionData.candidates, localData).map(function (v) {
                        return "\t\t" + v.name + " = { votes = nil, perks = '" + v.perks + "', order = " + v.order + ", last = nil },";
                    });
                    copyToClipboard("\t[" + year + "] = { control = 'in-progress', data = {\n" + candidates.join("\n") + "\n\t}},");
                });
            });
    })();

    //##############################################################
    /** (Tool 2) Bingo Table Generator **/
    (function () {
        var ALLOWED_PAGE = "Bingo/Events",
            BUTTON = "#bingodata",
            MONTHS = [
                "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ],
            COLORS_TO_TEMPLATE = [
                "Black", "DarkBlue", "DarkGreen", "DarkAqua", "DarkRed", "DarkPurple", "Gold", "Gray", "DarkGray", "Blue", "Green", "Aqua", "Red", "LightPurple", "Yellow", "White"
            ],
            DIAGONALS = [0, 6, 12, 18, 24];

        // to find diagonals:
        // [0, 1, 2, 3, 4].map(function (n) {
        //     return n * 5 + n
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
                if (!data.goals)
                    mw.notify("The API supplies no bingo goals at the moment", { title: "No Data Yet", type: "error" });
                else {
                    var notice = "Note: This data is for:\n\n" + th(data.id + 1) + " bingo event (held in " + mo(data.id) + ")",
                    id = "goals-" + getYear(data.id) + "-" + getMonth(data.id);
                    copyToClipboard("<div class=\"mw-customtoggle-" + id + " wikia-menu-button hidden\" tabindex=\"0\">Show/Hide</div>\n<div class=\"mw-collapsible mw-collapsed\" id=\"mw-customcollapsible-" + id + "\">\n" + constructTable(data.goals) + "\n</div>", notice);
                }
            });
        });
    })();

});
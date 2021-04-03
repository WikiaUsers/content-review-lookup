// Automating display of active Nightwave acts using an API
// For use in Warframe FANDOM wiki, particularly in the following page:
// https://warframe.fandom.com/wiki/Nightwave/Acts_Currently_Available
// Created by User:Cephalon Scientia
// Made in JavaScript + jQuery 3.3.1

// Note: As of UCP migration, FANDOM's JS parser still DOES NOT support string
// interpolation, let keyword, and arrow functions. In addition, keep in mind
// about JS rendering for anonymous users vs. logged in users.

/* Cephalon Scientia Nightwave Current Acts */

const WIKI_IMG_URL = "https://vignette.wikia.nocookie.net/warframe/images/";
// All platforms have the same Nightwave acts
const API_URL = "https://api.warframestat.us/pc/nightwave?language=en";
// Scaled down image
const REP_IMG_URL = WIKI_IMG_URL + "9/92/ReputationLargeBlack.png/" +
    "revision/latest/scale-to-width-down/20?cb=20141029201703";
// Contains JSON map to be fetched
const IMG_MAP_URL = "https://warframe.fandom.com/" +
    "api.php?action=parse&page=Module:NightwaveActs&format=json";

const ActTypeEnum = {
    "DAILY": 1,
    "WEEKLY": 2,
    "ELITE": 3
};
Object.freeze(ActTypeEnum); // For immutability

const NW_PAGE_NAME = mw.config.get("wgPageName");

// Only run this code on these pages
if (NW_PAGE_NAME === "Template:NightwaveActs" || NW_PAGE_NAME === "Nightwave" ||
    NW_PAGE_NAME === "Nightwave/Acts_Currently_Available") {
    nwActTableInit();
}

// Initializes fetching and building process for Nightwave act table.
function nwActTableInit() {
    Promise.all([ getActData(API_URL), getImageMap(IMG_MAP_URL) ])
    .then(function(values) {
        // DOM preparation and table building done here
        prepAndBuild(values[0], values[1]).then(function(value) {
        	console.log(value);
        	 // Calling countdownInit() from MediaWiki:Countdown.js start countdown timers
        	countdownInit();
        });
    })
    .catch(function(error) {
        console.error(error);
    });
}

// Fetching act image maps from a page outside of MediaWiki namespace
// so won't have to update this code every time new Nightwave acts are added
// or if they need to be modified.
// Returns a Promise that contains the image map data if fetch was successful
function getImageMap(url) {
    return fetch(url, { mode: "same-origin" })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log("JSON data of Nightwave act icons:");
            console.log(data);
            // Type string, getting what's in code block in page
            var jsonImgMap = data.parse.text["*"];
            // Actual data is encapsulated between these delimiters
            jsonImgMap = jsonImgMap.substring(
                jsonImgMap.indexOf("JSON START") + 10, jsonImgMap.indexOf("JSON END")
            );
            // Removing any trace HTML tags so string can be converted to JSON
            jsonImgMap = jsonImgMap.replace(/<[^>]*>/g, "");
            // Replacing HTML &quot; with double quotation marks
            jsonImgMap = jsonImgMap.replace(/(&quot;)/g, "\"");
            console.log(jsonImgMap);
            return JSON.parse(jsonImgMap);
        })
        .catch(function (error) {
            console.log(error);
            console.error("ERROR: GET request to " + url + " failed.");
        });
}

// Generic fetching of Nightwave act JSON data.
// Returns a Promise that contains the Nightwave act data if fetch was successful
function getActData(url) {
    return fetch(API_URL).then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (actDataJSON) {
                console.log("JSON data of current Nightwave acts:");
                console.log(actDataJSON);
                return actDataJSON;
            })
            .catch(function (error) {
                console.log(error);
                console.error("ERROR: GET request to " + API_URL + " failed.");
            });
}

// Prepares DOM for table creation and building resultant act tables.
function prepAndBuild(actDataJSON, jsonImgMap) {
    $(document).ready(function () {
        console.log("Ready to build Nightwave act table.");
        // These ids will be on Template:NightwaveActs page
        var $resultDaily = $(document.getElementById("nightwave_daily"));
        var $resultWeekly = $(document.getElementById("nightwave_weekly"));
        var $resultElite = $(document.getElementById("nightwave_elite"));

        // Adding starting div tags for each span element within tabber element
        $resultDaily.append($([
            "<div class=\"daily\">"
        ].join("\n")).prop("outerHTML"));
        $resultWeekly.append($([
            "<div class=\"weekly\">"
        ].join("\n")).prop("outerHTML"));
        $resultElite.append($([
            "<div class=\"elite\">"
        ].join("\n")).prop("outerHTML"));

        // Work with JSON data here
        actDataJSON.activeChallenges.forEach(function (actJSON) {
            var actType;
            var actImgURL;
            var tabIDAttr;
            var rowIDAttr;
            var classAttr;

            if (actJSON.isDaily) {
                actType = ActTypeEnum.DAILY;
            } else if (!actJSON.isElite) {
                actType = ActTypeEnum.WEEKLY;
            } else {
                actType = ActTypeEnum.ELITE;
            }

            // Initializing tabIDAttr, rowIDAttr, classAttr, and actImgURL
            switch (actType) {
                case ActTypeEnum.DAILY:
                    tabIDAttr = "nightwave_daily";
                    rowIDAttr = "daily_acts";
                    classAttr = "daily";
                    actImgURL = WIKI_IMG_URL + jsonImgMap.daily[actJSON.title];
                    break;

                case ActTypeEnum.WEEKLY:
                    tabIDAttr = "nightwave_weekly";
                    rowIDAttr = "weekly_acts";
                    classAttr = "weekly";
                    actImgURL = WIKI_IMG_URL + jsonImgMap.weekly[actJSON.title];
                    break;

                case ActTypeEnum.ELITE:
                    tabIDAttr = "nightwave_elite";
                    rowIDAttr = "elite_acts";
                    classAttr = "elite";
                    actImgURL = WIKI_IMG_URL + jsonImgMap.elite[actJSON.title];
                    break;
            }

            buildTable(actType, tabIDAttr, rowIDAttr, classAttr);
            buildTableRow(actType, actImgURL, tabIDAttr, rowIDAttr, actJSON);
        });
    });
    return Promise.resolve("Table successfully built.");
}

// Adds table elements.
function buildTable(actType, tabIDAttr, rowIDAttr, classAttr) {
    // Add table if a div element with id associated with act type is not found
    // One table per act type
    if ($(document.getElementById(tabIDAttr))
        .find("#" + rowIDAttr).length === 0) {
        $(document.getElementById(tabIDAttr))
            .find("." + classAttr).append($("<div>", {
                id: rowIDAttr,
                append: [
                    $("<p>"),
                    $("<table>", {
                        class: "emodtable",
                        style: "width:100%;",
                        append: [
                            $("<tbody>", {
                                append: [
                                    $("<tr>", {
                                        append: [
                                            $("<th>").text("Icon"),
                                            $("<th>").text("Name & Description"),
                                            $("<th>").text("Reward"),
                                            (actType === ActTypeEnum.DAILY) ? $("<th>")
                                                .text("Time Remaining") : null,
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }));
    }
}

// Adds table row elements.
function buildTableRow(actType, actImgURL, tabIDAttr, rowIDAttr, actJSON) {
    $(document.getElementById(tabIDAttr)).find("#" + rowIDAttr)
        .find(".emodtable").append($("<tr>", {
            append: [
                $("<td>", {
                    append: [
                        $("<div>", {
                            class: "center floatnone",
                            append: [
                                $("<a>", {
                                    href: actImgURL,
                                    class: "image image-thumbnail",
                                    append: [
                                        $("<img>", {
                                            src: actImgURL,
                                            width: "75",
                                            height: "75",
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                $("<td>", {
                    append: [
                        $("<b>").text(actJSON.title),
                        $("<br>"),
                        $("<i>").text(actJSON.desc)
                    ]
                }),
                $("<td>", {
                    append: [
                        $("<span>", {
                            style: "display:none",
                            class: "sortkey",
                        }).text(actJSON.reputation),
                        $("<a>", {
                            href: "/wiki/Syndicates",
                            class: "image image-thumbnail link-internal",
                            title: "Syndicates",
                            append: [
                                $("<img>", {
                                    src: REP_IMG_URL,
                                    width: "20",
                                    height: "20",
                                })
                            ]
                        }),
                        $("<b>").text(actJSON.reputation.toLocaleString())
                    ]
                }),
                // Additional classes are for countdown timer (MediaWiki:Countdown.js,
                // see Template:Countdown for example usage)
                (actType !== ActTypeEnum.DAILY) ? null : buildTimerElements(actJSON.expiry)
            ]
        }));
}

// Assume s is in ISO Date format
// Returns a string in the default locale format and locale time zone
function parseISOString(s) {
    var arr = s.split(/\D+/);
    var date = new Date(Date.UTC(arr[0], --arr[1], arr[2], arr[3], arr[4],
        arr[5], arr[6]));
    return date.toLocaleString();
}

// Adds countdown elements to page
function buildTimerElements(expiry) {
	return $("<td>").append($("<div>", {
        align: "center",
        append: [
            $("<strong>", {
                append: [
                    $("<span>", {
                        class: "customcountdown",
                        style: "font-size:14px; display:visible;",
                        append: [
                            $("<span>", { style: "display:none;", class: "seedDate" })
                                .text(parseISOString(expiry)),

                            $("<span>", { style: "display:none;", class: "bText" }).text(""),
                            $("<span>", { style: "display:none;", class: "bDelayText" }).text(""),

                            $("<span>", { class: "timer" }).text(""),

                            $("<span>", { style: "display:none;", class: "aText" }).text(""),
                            $("<span>", { style: "display:none;", class: "aDelayText" }).text(""),

                            $("<span>", { style: "display:none;", class: "loopTime" }).text("3D"),
                            $("<span>", { style: "display:none;", class: "loopLimit" }).text("1"),
                            $("<span>", { style: "display:none;", class: "endText" }).text("Expired"),
                            $("<span>", { style: "display:none;", class: "delayTime" }).text(""),
                            $("<span>", { style: "display:none;", class: "delayDisplay" }).text(""),
                            $("<span>", { style: "display:none;", class: "dst" }).text(""),
                            $("<span>", { style: "display:none;", class: "dateFormat" })
                                .text("D hh mm ss"),
                            $("<span>", { style: "display:none;", class: "dateLabels" })
                                .text("single"),
                        ]
                    })
                ]
            })
        ]
    }));
}
/* END Cephalon Scientia Nightwave Current Acts */
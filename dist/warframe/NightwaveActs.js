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
    "api.php?action=parse&page=Module:NightwaveActs&format=json&prop=wikitext";

// Page that user is currently on
const NW_PAGE_NAME = mw.config.get("wgPageName");

// Only run this code on these pages
const WHITELIST_PAGES = [
	"Template:NightwaveActs",
	"Nightwave",
	"Nightwave/Acts_Currently_Available",
];

const ActTypeEnum = {
    "DAILY": 1,
    "WEEKLY": 2,
    "ELITE": 3
};
Object.freeze(ActTypeEnum); // For immutability

// Actual entry point
if (WHITELIST_PAGES.includes(NW_PAGE_NAME)) {
    nwActTableInit();
}

// Initializes fetching and building process for Nightwave act table.
function nwActTableInit() {
    Promise.all([ getActData(API_URL), getImageMap(IMG_MAP_URL) ])
    .then(function (values) {
        // DOM preparation and table building done here
        prepAndBuild(values[0], values[1]);
    })
    .catch(function (error) {
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
            console.log("GET JSON image map in Module:NightwaveActs:", response);
            return response.json();
        })
        .then(function (data) {
            // Type string, getting what is in code block on page
            var jsonImgMap = data.parse.wikitext["*"];
            jsonImgMap = jsonImgMap.substring(
                jsonImgMap.indexOf("--[[") + 4, jsonImgMap.indexOf("]]--")
            );
            jsonImgMap = JSON.parse(jsonImgMap);
            console.log("JSON image map in Module:NightwaveActs:", jsonImgMap);
            return jsonImgMap;
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
                console.log("GET Nightwave act data from " + API_URL + ":", response);
                return response.json();
            })
            .then(function (actDataJSON) {
                console.log("JSON data of current Nightwave acts:", actDataJSON);
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
        console.info("Ready to build Nightwave act table.");
        // These ids will be on Template:NightwaveActs page
        var $resultDaily = $(document.getElementById("nightwave_daily"));
        var $resultWeekly = $(document.getElementById("nightwave_weekly"));
        var $resultElite = $(document.getElementById("nightwave_elite"));

        // Work with JSON data here
        actDataJSON.activeChallenges.forEach(function (actJSON) {
            var actType;
            var actImgURL;
            var tabIDAttr;
            var rowIDAttr;

            if (actJSON.isDaily) {
                actType = ActTypeEnum.DAILY;
            } else if (!actJSON.isElite) {
                actType = ActTypeEnum.WEEKLY;
            } else {
                actType = ActTypeEnum.ELITE;
            }

            // Initializing tabIDAttr, rowIDAttr, and actImgURL
            switch (actType) {
                case ActTypeEnum.DAILY:
                    tabIDAttr = "nightwave_daily";
                    rowIDAttr = "daily_acts";
                    actImgURL = WIKI_IMG_URL + jsonImgMap.daily[actJSON.title];
                    break;

                case ActTypeEnum.WEEKLY:
                    tabIDAttr = "nightwave_weekly";
                    rowIDAttr = "weekly_acts";
                    actImgURL = WIKI_IMG_URL + jsonImgMap.weekly[actJSON.title];
                    break;

                case ActTypeEnum.ELITE:
                    tabIDAttr = "nightwave_elite";
                    rowIDAttr = "elite_acts";
                    actImgURL = WIKI_IMG_URL + jsonImgMap.elite[actJSON.title];
                    break;
            }

            buildTable(actType, tabIDAttr, rowIDAttr);
            buildTableRow(actType, actImgURL, tabIDAttr, rowIDAttr, actJSON);
        });
        console.info("Nightwave act table successfully built.");
    });
}

// Adds table elements.
function buildTable(actType, tabIDAttr, rowIDAttr) {
    // Add table if a div element with id associated with act type is not found
    // One table per act type
    if ($(document.getElementById(tabIDAttr)).find("#" + rowIDAttr).length === 0) {
        $(document.getElementById(tabIDAttr)).append($("<div>", {
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
											$("<th>").text("End Date")
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
                $("<td>", {
                    append: [
                    	$("<b>").text(parseISOString(actJSON.expiry))
                    ]
                })
            ]
        }));
}

// Assume s is in ISO Date format
// Returns a string in the default locale format and locale time zone
function parseISOString(s) {
    var arr = s.split(/\D+/);
    var date = new Date(Date.UTC(arr[0], --arr[1], arr[2], arr[3], arr[4],
        arr[5], arr[6]));
    return date.toLocaleString() + " (" + (new window.Intl.DateTimeFormat().resolvedOptions().timeZone) + ")";
}
/* END Cephalon Scientia Nightwave Current Acts */
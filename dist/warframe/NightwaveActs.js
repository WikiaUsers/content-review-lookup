/**
 * Automating display of active Nightwave acts using an API
 * For use in Warframe FANDOM wiki, particularly in the following page:
 * https://warframe.fandom.com/wiki/Nightwave/Acts_Currently_Available
 * 
 * Note: As of UCP migration, FANDOM's JS parser still DOES NOT support string
 * interpolation, let keyword, and arrow functions. In addition, keep in mind
 * about JS rendering for anonymous users vs. logged in users.
 * Made in JavaScript + jQuery 3.3.1
 * 
 * @author	User:Cephalon Scientia
 * @requires	mediawiki
 */

/* Cephalon Scientia Nightwave Current Acts */

/**
 * DO NOT USE ENDPOINT KEY ON https://warframe.fandom.com/wiki/NightwaveActs.json
 * SINCE THE PAGE IS PUBLICLY EDITABLE; THAT IS THERE FOR REFERENCE, HARD CODE
 * THE ENDPOINT IN HERE INSTEAD FOR SECURITY REASONS
 */
const WIKI_IMG_URL = "https://vignette.wikia.nocookie.net/warframe/images/";
// All platforms have the same Nightwave acts
const API_URL = "https://api.warframestat.us/pc/nightwave?language=en";
// Scaled down reputation icon
const REP_IMG_URL = WIKI_IMG_URL + "9/92/ReputationLargeBlack.png/" +
    "revision/latest/scale-to-width-down/20?cb=20141029201703";
// Contains JSON map to be fetched
const IMG_MAP_URL = "https://warframe.fandom.com/NightwaveActs.json?action=raw";

// Page that user is currently on
const NW_PAGE_NAME = mw.config.get("wgPageName");

// Only run this code on these pages
const WHITELIST_PAGES = [
	"Template:NightwaveActs",
	"Nightwave",
	"Nightwave/Acts_Currently_Available",
];

/**
 * Enum for Nightwave act types.
 * 
 * @readonly
 * @enum {number}
 */
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

/**
 * Initializes fetching and building process for Nightwave act table.
 * @function	nwActTableInit
 */
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

/**
 * Fetches act image maps from a page outside of MediaWiki namespace.
 * Will not have to update this code every time new Nightwave acts are added
 * or if they need to be modified.
 * 
 * @function	getImageMap
 * @param {string} url URL endpoint; assumes that url returns text in a JSON format
 * @returns A Promise that contains the image map data if fetch was successful
 */
function getImageMap(url) {
    return fetch(url)
        .then(function (response) {
            console.log("GET JSON image map in NightwaveActs.json:", response);
            return response.json();
        })
        .then(function (jsonImgMap) {
            console.log("JSON image map in NightwaveActs.json:", jsonImgMap);
            return jsonImgMap;
        })
        .catch(function (error) {
            console.log(error);
            console.error("ERROR: GET request to " + url + " failed.");
        });
}

/**
 * Generic fetching of Nightwave act JSON data.
 * 
 * @function	getActData
 * @param {string} url URL endpoint; assumes that url returns text in a JSON format
 * @returns A Promise that contains the Nightwave act data if fetch was successful
 */
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

/**
 * Prepares DOM for table creation and building resultant act tables.
 * 
 * @function	prepAndBuild
 * @param {object} actDataJSON JSON of Nightwave act data
 * @param {object} jsonImgMap JSON of Nightwave image map
 */
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

            buildTable(tabIDAttr, rowIDAttr);
            buildTableRow(actImgURL, tabIDAttr, rowIDAttr, actJSON);
        });
        console.info("Nightwave act table successfully built.");
    });
}

/**
 * Adds table elements of Nightwave acts table.
 * 
 * @function	buildTable
 * @param {string} tabIDAttr ID name of div element with tabber
 * @param {string} rowIDAttr ID name of table row element
 */
function buildTable(tabIDAttr, rowIDAttr) {
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

/**
 * Adds table row elements of Nightwave acts table.
 * 
 * @param {string} actImgURL URL of image
 * @param {string} tabIDAttr ID name of div element with tabber
 * @param {string} rowIDAttr ID name of table row element
 * @param {object} actJSON JSON data of an active Nightwave act
 */
function buildTableRow(actImgURL, tabIDAttr, rowIDAttr, actJSON) {
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

/**
 * Parses an ISO string.
 * 
 * @param {string} s String in ISO Date format
 * @returns A string in the default locale format and locale time zone
 */
function parseISOString(s) {
    var arr = s.split(/\D+/);
    var date = new Date(Date.UTC(arr[0], --arr[1], arr[2], arr[3], arr[4],
        arr[5], arr[6]));
    return date.toLocaleString() + " (" + (new window.Intl.DateTimeFormat().resolvedOptions().timeZone) + ")";
}
/* END Cephalon Scientia Nightwave Current Acts */
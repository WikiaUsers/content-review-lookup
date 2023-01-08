
/**
 * Automating display of active Nightwave acts using an API
 * For use in Warframe FANDOM wiki, particularly in the following page:
 * https://warframe.fandom.com/wiki/Nightwave/Acts_Currently_Available
 * 
 * See https://warframe.fandom.com/wiki/MediaWiki:Custom-NightwaveActs/i18n.json
 * for script i18n messages.
 * 
 * When adding new acts, please update https://warframe.fandom.com/wiki/NightwaveActs.json
 * so the script knows the image urls of act icons.
 * 
 * Note: As of UCP migration, FANDOM's JS parser still DOES NOT support string
 * interpolation, let keyword, and arrow functions. In addition, keep in mind
 * about JS rendering for anonymous users vs. logged in users.
 * 
 * Made in JavaScript + jQuery 3.3.1
 * 
 * @author	User:Cephalon Scientia
 * @requires	jQuery
 * @requires	mediawiki
 * @requires	dev.i18n
 */

/* Cephalon Scientia Nightwave Current Acts */

(function(window, $, mw) {
	// TODO: Mimic OOP techniques by creating NW challenge table objects
	// TODO: Use debug flag to turn toggle some console messages
	var config = mw.config.get([ "debug", "wgContentLanguage", "wgUserLanguage" ]);
	
	/**
	 * DO NOT USE ENDPOINT KEY ON https://warframe.fandom.com/wiki/NightwaveActs.json
	 * SINCE THE PAGE IS PUBLICLY EDITABLE; THAT IS THERE FOR REFERENCE, HARD CODE
	 * THE ENDPOINT IN HERE INSTEAD FOR SECURITY REASONS
	 */
	const WIKI_IMG_URL = "https://vignette.wikia.nocookie.net/warframe/images/";
	// All platforms have the same Nightwave acts
	// Documentation of API https://docs.warframestat.us/#tag/Worldstate/paths/~1{platform}~1nightwave/get
	// Will fallback to en for unsupported language codes
	// TODO: Update https://warframe.fandom.com/wiki/NightwaveActs.json to replace keys with internal names of acts
	// so that we can determine act type using API's activeChallenges id instead for i18n (decoupling localized act names from data)
	// Would just need to parse out the text from the act ids (e.g. str.match(/[a-z]+/g))
	const API_URL = "https://api.warframestat.us/pc/nightwave?language=" + "uk"; // + config.wgUserLanguage;
	// Scaled down reputation icon
	const REP_IMG_URL = WIKI_IMG_URL + "b/b1/Репутація_іконка_uk.png/revision/latest/scale-to-width-down/22?cb=20161025065615&path-prefix=uk";
	// Contains JSON map to be fetched
	const IMG_MAP_URL = "https://warframe.fandom.com/uk/wiki/NightwaveActs.json?action=raw";
	// Full page name where this script's i18n messages are located
	const I18N_MESSAGES = "u:uk.warframe:MediaWiki:Custom-NightwaveActs/i18n.json";
	
	// Page that user is currently on
	const NW_PAGE_NAME = mw.config.get("wgPageName");
	
	// Only run this code on these pages
	const WHITELIST_PAGES = [
		"Нічна_хвиля",
		"Шаблон:Нічна хвиля/Доступні_випробування",
	];
	Object.freeze(WHITELIST_PAGES);	// For immutability and security
	
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
	Object.freeze(ActTypeEnum);
	
	// Actual entry point
	if (WHITELIST_PAGES.includes(NW_PAGE_NAME)) {
		// Register the hook before the import to avoid race conditions
		mw.hook("dev.i18n").add(function (i18n) {
			// Note that this i18n is a shortcut to window.dev.i18n
			// Loading messages
			i18n.loadMessages(I18N_MESSAGES).done(function (i18n) {
				// i18n object (not the same as window.dev.i18n)
				// Use wgUserLanguage or override with uselang= parameter in URL
				i18n.useUserLang();
				nwActTableInit(i18n);
			});
		});
		importArticle({
			type: "script",
			article: "u:dev:MediaWiki:I18n-js/code.js"
		});
		
		// Alternative import statement if not using mediawiki library
		// $.getScript("https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:I18n-js/code.js&only=scripts")
		// 	.done(function() {
		// 		var i18n = window.dev.i18n;
		// 		// Loading messages
		// 		i18n.loadMessages("u:warframe:MediaWiki:Custom-NightwaveActs/i18n.json").done(function (i18n) {
		// 			i18n.useUserLang();
		// 			nwActTableInit(i18n);
		// 		});
		// 	});
	}
	
	/**
	 * Initializes fetching and building process for Nightwave act table.
	 * 
	 * @function	nwActTableInit
	 * @param {object} i18n i18n message handler
	 */
	function nwActTableInit(i18n) {
		Promise.all([ getActData(API_URL, i18n), getImageMap(IMG_MAP_URL, i18n) ])
			.then(function (values) {
				// DOM preparation and table building done here
				prepAndBuild(values[0], values[1], i18n);
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
	 * @param {object} i18n i18n message handler
	 * @returns A Promise that contains the image map data if fetch was successful
	 */
	function getImageMap(url, i18n) {
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
				console.error(i18n.msg("get-fail", url).plain(), error);
			});
	}
	
	/**
	 * Generic fetching of Nightwave act JSON data.
	 * 
	 * @function	getActData
	 * @param {string} url URL endpoint; assumes that url returns text in a JSON format
	 * @param {object} i18n i18n message handler
	 * @returns A Promise that contains the Nightwave act data if fetch was successful
	 */
	function getActData(url, i18n) {
		return fetch(API_URL).then(function (response) {
					console.log("GET Nightwave act data from " + API_URL + ":", response);
					return response.json();
				})
				.then(function (actDataJSON) {
					console.log("JSON data of current Nightwave acts:", actDataJSON);
					return actDataJSON;
				})
				.catch(function (error) {
					console.error(i18n.msg("get-fail", API_URL).plain(), error);
				});
	}
	
	/**
	 * Prepares DOM for table creation and building resultant act tables.
	 * 
	 * @function	prepAndBuild
	 * @param {object} actDataJSON JSON of Nightwave act data
	 * @param {object} jsonImgMap JSON of Nightwave image map
	 * @param {object} i18n i18n message handler
	 */
	function prepAndBuild(actDataJSON, jsonImgMap, i18n) {
		$(document).ready(function () {
			console.log(i18n.msg("build-ready").plain());
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
						actImgURL = WIKI_IMG_URL + jsonImgMap.daily[actJSON.title] + '/revision/latest?path-prefix=uk';
						break;
	
					case ActTypeEnum.WEEKLY:
						tabIDAttr = "nightwave_weekly";
						rowIDAttr = "weekly_acts";
						actImgURL = WIKI_IMG_URL + jsonImgMap.weekly[actJSON.title] + '/revision/latest?path-prefix=uk';
						break;
	
					case ActTypeEnum.ELITE:
						tabIDAttr = "nightwave_elite";
						rowIDAttr = "elite_acts";
						actImgURL = WIKI_IMG_URL + jsonImgMap.elite[actJSON.title] + '/revision/latest?path-prefix=uk';
						break;
				}

				buildTable(tabIDAttr, rowIDAttr, i18n);
				buildTableRow(actImgURL, tabIDAttr, rowIDAttr, actJSON, i18n);
			});
			console.log(i18n.msg("build-done").plain());
		});
	}
	
	/**
	 * Adds table elements of Nightwave acts table.
	 * 
	 * @function	buildTable
	 * @param {string} tabIDAttr ID name of div element with tabber
	 * @param {string} rowIDAttr ID name of table row element
	 * @param {object} i18n i18n message handler
	 */
	function buildTable(tabIDAttr, rowIDAttr, i18n) {
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
												$("<th>", {width: "20%"}).text(i18n.msg("table-header-icon").plain()),
												$("<th>").text(i18n.msg("table-header-description").plain()),
												$("<th>", {width: "15%"}).text(i18n.msg("table-header-reward").plain()),
												$("<th>").text(i18n.msg("table-header-date").plain())
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
	 * @param {object} i18n i18n message handler
	 */
	function buildTableRow(actImgURL, tabIDAttr, rowIDAttr, actJSON, i18n) {
		$(document.getElementById(tabIDAttr)).find("#" + rowIDAttr)
			.find(".emodtable").append($("<tr>", {
				append: [
					$("<td>", {
						append: [
							$("<div>", {
								class: "center floatnone",
								append: [
									$("<img>", {
										class: "light-invert image image-thumbnail",
										src: actImgURL,
										title: actJSON.title,
										link: "",
										href: "",
										width: "75",
										height: "75",
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
								// Want to link to this wiki's "Syndicates" page
								href: "/wiki/" + i18n.inContentLang().msg("syndicates").plain(),
								class: "icon dark-invert image image-thumbnail link-internal",
								title: "Репутація Нічної хвилі",
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
		return date.toLocaleString() + " (" + (new window.Intl.DateTimeFormat().resolvedOptions().timeZone.replace('Kiev', 'Kyiv')) + ")";
	}
})(this, jQuery, mediaWiki);
/* END Cephalon Scientia Nightwave Current Acts */
/* Any JavaScript here will be loaded for all users on every page load. */

AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];

importScriptPage('AjaxRC/code.js', 'dev');
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

/* Countdown Timer. 

$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});*/

/* Position hover */
var tooltips_config = {
    offsetX: 5,
    offsetY: 5,
    waitForImages: true,
};

/* Configuration for the Customized Clock module: MediaWiki: ClocksModule.js */
clocksModuleLabels = ["UTC", "PST", "JST"];
clocksModuleTimezones = ["Europe/London", "Pacific/Pitcairn", "Asia/Tokyo"];
clocksModuleFormat = [
        {local : "en", format : "%H:%M:%S %a \n%m/%d/%Y"},
        {local : "en", format : "%H:%M:%S %a \n%m/%d/%Y"},
        {local : "en", format : "%H:%M:%S %a \n%m/%d/%Y"}
    ];

window.YoutubePlayerDisableAutoplay = true;
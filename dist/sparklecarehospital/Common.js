/* NOTE: Any JavaScript here will be loaded for all users on every page load. */

/*
 * ===============================================
 * Script Configuration
 * ===============================================
 */

/* Ajax Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions"
];

/* Dynamic favicon */
(function () {
	var bodyClassList = document.querySelector("body").classList; // Generate NodeList from <body> classes
	bodyClassList = Array.from(bodyClassList); // Convert NodeList to Array
	var fulesPage = "page-Volume_1_Update_Fules";
	var askPage = "page-Ask_Sparklecare";
	
	if (bodyClassList.includes(fulesPage) === true) { // Sets 
			document.querySelector('[rel="shortcut icon"]').setAttribute("href", "https://images.wikia.com/sparklecarehospital/images/archive/6/64/20181112204018%21Favicon.ico");
	} else if (bodyClassList.includes(askPage) === true) {
			document.querySelector('[rel="shortcut icon"]').setAttribute("href", "https://images.wikia.com/sparklecarehospital/images/archive/6/64/20210908023121%21Favicon.ico");
	} else { return; }
})();
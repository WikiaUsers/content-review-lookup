/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: 'script',
	articles: [
		'w:c:dev:UserTags/code.js',
		'w:c:dev:DisplayClock/code.js',
		'w:c:dev:Countdown/code.js',
	]
});

/* Tooltip which transcludes the cardbox from the card's article */
var tooltips_list = [
 {
        classname: 'tooltip-cardbox',
        parse: '{'+'{User:Tinoke97/Sandbox/<#firstname#>_(<#cardid#>)}}',
    }
];

/* General settings for the tooltip extension*/
var tooltips_config = {
    noCSS: true,
    waitForImages:true,
};
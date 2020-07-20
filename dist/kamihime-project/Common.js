/* Any JavaScript here will be loaded for all users on every page load. */

var tooltips_list = [
    {
        classname: 'tooltip-character',
        parse: '{' + '{Tooltip/Character|char=<#char#>}}'
    }
];
 
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true
};

$(function(){
	importArticles({
		type: 'script',
		articles: [
		    'u:dev:MediaWiki:Tooltips.js',
		    'u:pad.wikia.com:MediaWiki:FilterTable.js'
	    ]
	});
});
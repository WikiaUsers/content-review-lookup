/* Any JavaScript here will be loaded for all users on every page load. */

//Global Show/Hide
//Author: Princess Platinum
 window.tooltips_list = [
    {
        classname: 'Monster-Tooltip',
      parse: '{' + '{<#name#>|<#form#>}}',
}];
$(function() {
    $('#collapse-global').html('<a class="wikia-button" onclick="for (var i=0; i < 50; i++) { collapseTable([i]); }">Show/Hide All</a>');
    
    // Filtering for tables
    // Source: https://community.wikia.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables
    importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js","u:dev:MediaWiki:MassCategorization/code.js",]
	});
});

window.MassCategorizationGroups = ['sysop', 'content-moderator'];
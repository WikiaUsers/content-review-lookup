/* Any JavaScript here will be loaded for all users on every page load. */
 
/* ================
   Other imports
   ================ */
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/forumnote.js",
    ]
});
 
/* places percentages on polls, instead of number of votes 
$("#ajax-poll-area span[title]").html($("#ajax-poll-area span[title]").attr("title")) 
Percentages not correct.
*/
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});
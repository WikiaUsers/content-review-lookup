/* Any JavaScript here will be loaded for all users on every page load. */

/* ================
   Other imports
   ================ */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BannerNotification.js',
        'u:pad:MediaWiki:FilterTable.js',
	'u:dev:SignatureCheck/code.js',
	]
});
// FilterTable.js is from http://community.wikia.com/wiki/User_blog:Sammylau/Wikitable_Filterable:_The_Filter_for_Long_Tables

/* places percentages on polls, instead of number of votes 
$("#ajax-poll-area span[title]").html($("#ajax-poll-area span[title]").attr("title")) 
Percentages not correct.
*/

/* =============== 
 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
   Gives spoiler alert page if added to category of "Spoiler"
   ================== 
 
SpoilerAlert = {
            question: 'This page may contain spoilers about unreleased features. Are you sure you want to read it?',
            yes: 'Yes, please!',
            no: 'No, I want to keep it a surprise',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    },
    back:true
};*/
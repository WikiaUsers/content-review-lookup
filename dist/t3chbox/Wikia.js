importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxBatchDelete/code.js",
        "u:dev:DupImageList/code.js",
        "MediaWiki:Wikia.js/inputUserInformation.js",
        "MediaWiki:Wikia.js/uploadForm.js",
        "MediaWiki:Wikia.js/vendorTimers.js",
        "MediaWiki:Wikia.js/takenKingCountdown.js",
        "MediaWiki:Wikia.js/pollArchive.js"
    ]
});

importScriptURI('/wiki/MediaWiki:Wikia.js/uploadForm.js?action=raw&ctype=text/javascript&templates=expand');
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
/* importScriptPage('MediaWiki:Snow.js', 'community'); */

jQuery(document).ready(function($) {
	$(".NavButton").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});

jQuery(document).ready(function($) {
	$(".AppButton").mouseleave(function(){
		$(this).find('#amove').animate({ top: '115px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#amove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});

////////////////////////////////////////////
/////// Dab1001 - Social Button Test ///////
////////////////////////////////////////////

jQuery(document).ready(function($) {
    $('<a href="https://www.facebook.com/HaloNation2/" class="wds-is-square wds-is-facebook-color wds-button"><svg class="wds-icon"><use xlink:href="#wds-icons-facebook"></use></svg></a>').insertBefore("#MainPage-Social-Facebook");
    $('<a class="wds-is-square wds-is-twitter-color wds-button" href="http://www.twitter.com/HaloWiki"><svg class="wds-icon"><use xlink:href="#wds-icons-twitter"></use></svg></a>').insertBefore("#MainPage-Social-Twitter");
    $('<a class="wds-is-square wds-is-youtube-color wds-button" href="https://www.youtube.com/channel/UCwtSrdAkwGfl2cCplKv5fpQ"><svg class="wds-icon"><use xlink:href="#wds-icons-youtube"></use></svg></a>').insertBefore("#MainPage-Social-YouTube");
    $('<a class="wds-is-square wds-is-googleplus-color wds-button" href="https://plus.google.com/u/0/b/118158518477615997502/118158518477615997502"><svg class="wds-icon"><use xlink:href="#wds-icons-googleplus"></use></svg></a>').insertBefore("#MainPage-Social-GooglePlus");
});

jQuery(document).ready(function($) {
    //Create Page
    $('<a class="wds-is-square wds-is-secondary wds-button" href="/wiki/Special:CreatePage" title="Create a new article"><svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-add-new-page-small"></use></svg></a>').insertBefore("#Toolbox-CreatePage");
    //Upload file
    $('<a class="wds-is-square wds-is-secondary wds-button" href="/wiki/Special:Upload" title="Upload an image"><svg class="wds-icon"><use xlink:href="#wds-icons-image-add"></use></svg></a>').insertBefore("#Toolbox-UploadFile");
    //Videos
    $('<a href="/wiki/Special:Videos" title="View and add videos" class="wds-is-square wds-is-secondary wds-button"><svg class="wds-icon"><use xlink:href="#wds-icons-video-camera"></use></svg></a>').insertBefore("#Toolbox-Videos");
});
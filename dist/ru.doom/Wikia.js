importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxBatchDelete/code.js",
        "u:dev:DupImageList/code.js",
        "MediaWiki:Wikia.js/inputUserInformation.js",
        "MediaWiki:Wikia.js/MainPage.js",
        "MediaWiki:Wikia.js/Slider.js"
    ]
});

// Auto-refresh Special:RecentActivity

AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
/* importScriptPage('MediaWiki:Snow.js', 'community'); */

//Nav button hover animation
jQuery(document).ready(function($) {
	$(".NavButton").mouseleave(function(){
		$(this).find('#imove').animate({ top: '127px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#imove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
 
//App button hover animation
jQuery(document).ready(function($) {
	$(".AppButton").mouseleave(function(){
		$(this).find('#amove').animate({ top: '115px' }, {queue:false, duration:300});
	}).mouseenter(function(){
		$(this).find('#amove').animate({ top: '0px' }, {queue:false, duration:300});
	});
});
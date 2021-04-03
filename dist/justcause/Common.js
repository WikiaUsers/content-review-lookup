/* Any JavaScript here will be loaded for all users on every page load. */

/* Main page */
/** NavButton hover animations **/
jQuery(document).ready(function($) {	
	$(".NavButton").mouseleave(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		item.animate({ top: topAttr }, {queue:false, duration:300});
	}).mouseenter(function(){
		var item = $(this).find('#imove');
		var topAttr = item.attr('data-top');
		var curTop = item.css('top');
		typeof topAttr === "undefined" ? item.attr('data-top', curTop) : "";
		item.animate({ top: '0px' }, {queue:false, duration:300});
	});
	$(window).resize(function() {
		$(".NavButton #imove").removeAttr('style');
		$(".NavButton #imove").removeAttr('data-top');
	});
});

/** Poll text **/
$(document).ready(function() {
	$(".ajax-poll .total").parent().addClass("pollText");
});

/** Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
  */
 
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}
 

// Countdown
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/** Autoplay videos **/
$(window).load(function() {
	$('.mw-content-text .autoplay .play-circle').each(function() {
		$(this).click();
	});
});
function autoRefresh(){
    window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
    window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
    window.ajaxRefresh = 30000;
    $.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
        'ajaxrc-refresh-text': 'AJAX',
        'ajaxrc-refresh-hover': 'Enable page auto-refresh',
    }}}}});
}
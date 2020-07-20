/* Any JavaScript here will be loaded for all users on every page load. */


// LockOldBlogs config - http://dev.wikia.com/wiki/LockOldBlogs
window.LockOldBlogs = {
    expiryDays: 5,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};




//Loaded scripts
importArticles({
    type: "script",
    articles: [
        'w:c:dev:LockOldBlogs/code.js',
        'w:c:dev:InactiveUsers/code.js',
        'w:c:dev:ListAdmins/code.js',
        'w:dev:WallGreetingButton/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'w:c:dev:Countdown/code.js',
        'w:c:dev:DisplayClock/code.js',
        'u:dev:HighlightUsers/code.js',
        'u:dev:SearchSuggest/code.js',
        'u:dev:RelatedDiscussionsModule/code.js',
        'w:dev:FixMultipleUpload/code.js',
        'w:dev:RevealAnonIP/code.js',
        'w:dev:AjaxRC/code.js',
        'w:c:dev:BackToTopButton/code.js'    
    ]
})


/* HoverImage */
 
$(function() {
	$('div.fadein img').css('opacity','0.7');
	$('div.fadein img').mouseover(function() {
		$(this).animate({opacity:1},800);
	}).mouseout(function() {
		$(this).animate({opacity:0.7},800);
	});
});
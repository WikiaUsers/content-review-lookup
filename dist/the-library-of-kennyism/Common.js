/* Any JavaScript here will be loaded for all users on every page load. */

//**Disable blog comments for blogs and Forums that haven't been commented on for more than 30 days.**//
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog hasn\'t been commented on in over 30 days. It is considered archived and commenting has been disabled.",
    nonexpiryCategory: "Non-expiring Blogs"
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});

$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});
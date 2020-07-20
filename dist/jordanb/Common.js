/* Any JavaScript here will be loaded for all users on every page load. */

/* block notice */
window.MessageBlock = {
    title : 'Block Notice',
    message : 'You have been blocked, and the reason(s) are: "$1"',
    autocheck : true
};
 
//************************************************
// AJAX Auto-Refresh
//************************************************
 
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Log',
    'Special:NewFiles'
];
window.AjaxRCRefreshText = 'Automatically refresh this page',
window.AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads',
 
//************************************************
// Misc
//************************************************
$('.accountname').text(mw.config.get('wgUserName'));

//Replaces Magic word {{USERNAME}} with the name of the user currently browsing the page
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);
//END OF {{USERNAME}} REPLACEMENT
 
//Template:Title functioning
$(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
//END OF TEMPLATE:TITLE FUNCTIONING
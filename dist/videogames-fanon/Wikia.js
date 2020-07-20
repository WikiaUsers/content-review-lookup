importScriptPage('AdvancedOasisUI/code.js', 'dev');
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('AjaxRC/code.js', 'dev');  

// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page every minute';  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];

// *************************************************
    // Pagetitle rewrite
    //
    // Rewrites the page's title, used by Template:Title
    // *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
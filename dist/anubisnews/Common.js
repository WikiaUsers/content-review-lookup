// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries

importScriptPage('Countdown/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Rules","Administrators","Chat_Moderators","Updates","Jobs","Help_Desk","Userboxes","Community","The_Newspaper","Daily_News","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Old_Articles","Love_Advice","School_Advice","Friendship_Advice","Bullying_Advice","Other_Advice","Fun","Anubis_News_Easter_Carnival","July_Awards_Date","Anhur","Past_Friendship_Advice","Ma'at","Horse_Galore","Wrong_Amulet","Past_Advice","Games","Z's_Campaign","Anubis News Wikia Awards April 2012"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
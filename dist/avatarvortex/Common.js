/* Updating of recent activity page
 * Code from dev wiki used; option added by: [[User:MateyY|MateyY]]
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refreshes page with new updates';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importArticles({
    type: "script",
    articles: [
        "w:dev:AjaxRC/code.js",
        "MediaWiki:Functions.js" //Added by Suzon
    ]
});

/* Creates a separate module for IRC blog listing on the recent activity page
 * By [[User:MateyY|MateyY]]
 */

$(function() {
     if ($("section.CommunityCornerModule")) { //Check if the community messages module is on the page
          $("#WikiaRail").append($("#meetingsmodule"));
          $("#meetingsmodule h3").html('<div id="ircmeetingstitle" style="color:#8A2BE2; font-variant: Comic Sans MS"><b>IRC Meetings</b></div>');
     }
});

/* Extra options for tables of contents
 * By [[User:MateyY|MateyY]]
 * Add On by [[User:Suzon|Suzon]]
 */

$(function() {
     var title = $("#toctitle");
     title.append('<span id="removeContents">[<span style="color:red;">Remove</span>]</span>');
     $("#removeContents").click(function() {
          $("#toc").fadeOut(1000);
     });
});



/* From Avatar Wiki
 * Added by [[User:Suzon|Suzon]]
 * Fixes by [[User:MateyY|MateyY]]
 */

$(function() {
     if (wgUserName) {
          $(".insertusername").html(wgUserName);
     }
});

$(function() {
	if (skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
		$('.WikiHeaderRestyle nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/Authors">Authors</a></li>');
	}
});
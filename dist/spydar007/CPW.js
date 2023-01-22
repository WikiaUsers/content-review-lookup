/* From [[w:c:clubpenguin:MediaWiki:Wikia.js/spydar007.js]]
 * Mostly written by Penguin-Pal
 * Changes stuff to make my anon seem like a real user
 * Mostly against Wikia's ToU and the Customization policy :(
 */

/* Adding number of anon contributions for 81.101.202.233 to number found at profile masthead and changing join date */
if ( mw.config.get("wgPageName") == "Special:Contributions/Spydar007" || mw.config.get("wgPageName") == "User:Spydar007" || mw.config.get("wgPageName") == "User_talk:Spydar007" || mw.config.get("wgPageName") == "User_blog:Spydar007" ) {
	$("#UserProfileMasthead .tally em").text(Number($("#UserProfileMasthead .tally em").text().replace(/,/g,"")) + 3994);
	$("#UserProfileMasthead .tally > span").html("Edits since joining this wiki<br />October 1, 2012");
}
if ( mw.config.get("wgPageName") == "Special:Following" && mw.config.get("wgUserName") == "Spydar007" ) {
	$("#UserProfileMasthead .tally em").text( 3994 + Number($("#UserProfileMasthead .tally em").text().replace(/,/g,"")) + 3994 );
}
/* END adding anon contributions and changing join date */

/* Anon avatar on blog comments and profile masthead */
$(document).ready(function() {
        // in history revision comparison
                $('table.diff tbody #mw-diff-ntitle2 a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233">81.101.202.233 (Spydar007)</a>');
                $('table.diff tbody #mw-diff-otitle2 a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233">81.101.202.233 (Spydar007)</a>');
        // in Special:RecentChanges
                $('mw-special-Recentchanges .rc-conntent .changedby a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233" title="User:81.101.202.233" class="mw-userlink">81.101.202.233 (Spydar007)</a>');
                $('.mw-special-Recentchanges .rc-conntent table.mw-collapsible a[href="/wiki/Special:Contributions/81.101.202.233"].mw-userlink').replaceWith('<a href="/wiki/User:81.101.202.233" title="User:81.101.202.233" class="mw-userlink">81.101.202.233 (Spydar007)</a>');
                $('.rc-conntent .mw-enhanced-rc a[title="Special:Contributions/81.101.202.233"].mw-userlink').replaceWith('<a href="/wiki/User:81.101.202.233" class="mw-userlink" title="User:81.101.202.233">81.101.202.233 (Spydar0078)</a>');
                $('.rc-conntent .mw-enhanced-rc .mw-usertoollinks a[title="User talk:81.101.202.233"]').replaceWith('<a href="/wiki/User_talk:81.101.202.233" title="User talk:81.101.202.233">Talk</a> | <a href="/wiki/Special:Contributions/81.101.202.233" title="Special:Contributions/81.101.202.233">contribs</a>');
        // page history
                $('#pagehistory .history-user a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233" title="User:81.101.202.233" class="mw-userlink">81.101.202.233 (Spydar007)</a>');
        // in Special:WikiActivity
                $('body.mw-special-WikiActivity ul.activityfeed li cite a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233" rel="nofollow">81.101.202.233 (Spydar007)</a>');
        // wiki activity module
                $('section.WikiaActivityModule .edited-by a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233">81.101.202.233 (Spydar007)</a>');
        // "aka" - user hgroup
                $("body.page-User_81_101_202_233 hgroup h2, body.page-Special_Contributions_81_101_202_233 hgroup h2, body.page-User_talk_81_101_202_233 hgroup h2").html("<span>aka</span> Spydar007");
        // user blog comments
                $('section#WikiaArticleComments .SpeechBubble[data-user="81.101.202.233"] .speech-bubble-avatar a').replaceWith('<a href="/wiki/User:81.101.202.233"><img src="https://images.wikia.nocookie.net/common/avatars/thumb/9/9d/11291792.png/50px-11291792.png" width="50" height="50" class="avatar" alt="81.101.202.233"></a>');
                $('section#WikiaArticleComments .SpeechBubble[data-user="81.101.202.233"] .speech-bubble-message .edited-by a[href="/wiki/Special:Contributions/81.101.202.233"]').replaceWith('<a href="/wiki/User:81.101.202.233">81.101.202.233 (Spydar007)</a>');
});
/* END anon avatar */
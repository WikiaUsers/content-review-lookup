// SocialActivityButton
//
// When Walls and Comments are both off, access to SocialActivity is removed from RecentChanges
// This happens even if Blogs are still enabled. 
// This script remedies this issue by placing a button in the toolbar.
//
// Code forked from ShowWikiManagerOnToolbar
// Maintainer: Jackboog21
// Version: 0.1
//
;(function($, d) {
    $('#WikiaBarWrapper .tools').append('<li class="custom overflow"><a href="/wiki/Special:SocialActivity"' + 'rel="nofollow">SocialActivity' + '</a></li>');
})(jQuery, mediaWiki);
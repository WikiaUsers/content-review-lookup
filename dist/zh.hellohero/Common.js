/* 此处的JavaScript将加载于所有用户每一个页面。 */
$(function() {
 $('#WikiaPageHeader *').hide(); 
 $('#WikiaSearch').appendTo('.main-page-tag-rcs');
 $('#WikiaSearchHeader').removeClass('#WikiaSearchHeader');
 $('.home-top-right-ads').appendTo('.main-page-tag-rcs');
 $('#WikiaTopAds').prependTo('#WikiaMainContentContainer');
 $('#HOME_TOP_LEADERBOARD').height(90);
});
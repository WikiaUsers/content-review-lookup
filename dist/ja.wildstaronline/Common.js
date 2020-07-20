/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');

/* Main page */
$(function () { // tooltip stopped working, maybe crash. isolate until after page load. dun be mad
  if (wgPageName === "WildStar_Online_Wikia") {
    /** Make sure the News Feed and Community Posts boxes are the same height **/
    var communityPostsHeight = $('.mainpage-box-newsandblogs .communityposts .WikiaBlogListing').height();
    $('.mainpage-box-newsandblogs .news .container').css('height', communityPostsHeight);

    $(window).on('resize', function () {
      var communityPostsHeight = $('.mainpage-box-newsandblogs .communityposts .WikiaBlogListing').height();
      $('.mainpage-box-newsandblogs .news .container').css('height', communityPostsHeight);
    });
  }
});

/* Countdown timer */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
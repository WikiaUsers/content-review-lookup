/**
 * @module          ModernLeaderboard
 * @description     Modern leaderboard theme.
 * @authors         Americhino
 * @usingcodeby     Robyn Grayson (RevertOldGlobalNav)
 * @version         0.9.3
 * @license         CC-BY-SA 3.0
 * @notes           Configurable JS version of ModernLeaderboard.
 *
 */
(function () {
    // Double-run protection
    if (window.ModernLeaderboardLoaded) { 
        return;
    }
    window.ModernLeaderboardLoaded = true;

    // Configuration
    var config = $.extend({hideAbout: 0}, window.ModernLeaderboardSettings),
        hideAbout = config.hideAbout;

    // Import Stylesheet
    importArticle({
        type: 'style', 
        article: 'u:dev:MediaWiki:ModernLeaderboard.css'
    });

    if (hideAbout) {
        $('#about-achievements').remove();
        $('.page-Special_Leaderboard .WikiaArticle').css("margin-top", "-35px");
    }
}());
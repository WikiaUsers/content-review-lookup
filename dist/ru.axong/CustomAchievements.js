// Скопировал с Geometry Dash вики
$(document).ready(function addCustomAchievementsModule() {
    var data = mw.config.get(['skin','wgNamespaceNumber','wgTitle','wgUserName']);
    if ( data.skin !== 'oasis' || window.disableCustomAchievementsModule || data.wgNamespaceNumber !== 2 ) {
        return;
    }
    if ( $("#WikiaRail.loaded").length === 0 ) {
        setTimeout(addCustomAchievementsModule, 1000);
    } else {
        var header = (data.wgUserName == data.wgTitle)?'Ваши достижения:':('Достижения участника ' + data.wgTitle + ':');
 
        $.get(
            '/ru/index.php?action=render&title=MediaWiki:Custom-UserAchievement-' + data.wgTitle, 
            function(c) {
                if (!c) return false;
                $("#WikiaRail").prepend(
                    "<div class='module CustomAchievementsModule UserProfileCustomAchievementsModule'><h2>" + header +"</h2><div id='UserCustomAchievementsList' class='AchievementsList'></div></div>"
                    );
                $('#UserCustomAchievementsList').html(c);
            }
        );
    }
});
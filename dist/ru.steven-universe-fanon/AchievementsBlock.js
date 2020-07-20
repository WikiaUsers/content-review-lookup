!function()
{
    console.log("[AchievementsBlock] Начинается работа скрипта...");
    
    var data = mw.config.get(['skin','wgNamespaceNumber','wgTitle','wgUserName']),
        header = (data.wgUserName == data.wgTitle)?'Ваши достижения:':('Достижения участника ' + data.wgTitle + ':');
        
        if ( data.skin !== 'oasis' || window.disableCustomAchievementsModule || data.wgNamespaceNumber !== 2 ) {
            console.log("[AchievementsBlock] Скрипт не может продолжать работу на данной странице");
            return;
        }
        
        $.get(
            '/ru/index.php?action=render&title=MediaWiki:Custom-UserAchievement-' + data.wgTitle, function(c) {
                if (!c) {
                    console.log("[AchievementsBlock] Данные не получены: достижения пользователя не найдены");
                    return;
                }
                $("<div class='module CustomAchievementsModule UserProfileCustomAchievementsModule'><h2>" + header +"</h2><div id='UserCustomAchievementsList' class='AchievementsList'></div></div>").prependTo("#WikiaRail");
                $('#UserCustomAchievementsList').html(c);
                console.log("[AchievementsBlock] Достижения успешно добавлены");
            }
        );
}();
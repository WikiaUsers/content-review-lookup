/* Взял с GD-вики */
!function()
{
    console.log("[AchievementsBlock] Начинается работа скрипта...");
    
    var data = mw.config.get(['skin','wgNamespaceNumber','wgTitle','wgUserName']),
        header = (data.wgUserName == data.wgTitle)?'Ваше звание:':('Ранг участника ' + data.wgTitle + ':');
        
        if ( data.skin !== 'oasis' || window.disableCustomAchievementsModule || data.wgNamespaceNumber !== 2 ) {
            console.log("[AchievementsBlock] Скрипт не может продолжать работу на данной странице");
            return;
        }
        
        $.get(
            '/ru/index.php?action=render&title=MediaWiki:Custom-UserAchievement-' + data.wgTitle, 
            function(c) {
                if (!c) {
                    console.log("[AchievementsBlock] Данные не получены: ранг пользователя не найден");
                    return;
                }
                $("<div class='module CustomAchievementsModule UserProfileCustomAchievementsModule'><h2>" + header +"</h2><div id='UserCustomAchievementsList' class='AchievementsList'></div></div>").prependTo("#WikiaRail");
                $('#UserCustomAchievementsList').html(c);
                console.log("[AchievementsBlock] Звание успешно добавлено");
            }
        );
}();

//==============================================================
/* Для добавления самой информации нужно создать страницу MediaWiki "MediaWiki:Custom-UserAchievement-" + "имя пользователя". 
Например, для страницы Участник:ParaNorman Bates нужно создать страницу Mediawiki MediaWiki:Custom-UserAchievement-ParaNorman Bates. И уже на этой странице добавить информацию для отображения на странице пользователя в правом блоке (Rail).*/
//==============================================================
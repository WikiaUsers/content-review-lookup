// Скопировал с Geometry Dash вики
// и чуть переписал, потому что не работало
$(function() {
    if (window.CustomAchievementsModule) return;
    window.CustomAchievementsModule = true;
    const c = mw.config.get(['wgNamespaceNumber', 'wgTitle', 'wgUserName']);
    if (window.disableCustomAchievementsModule || c.wgNamespaceNumber != 2) return;
    var header = (c.wgUserName == c.wgTitle) ? 'Ваши достижения:' : ('Достижения участника ' + c.wgTitle + ':');

    $.get('/ru/index.php?action=render&title=MediaWiki:Custom-UserAchievement-' + c.wgTitle)
    .done(function(r) {
        if (!r) return false;
        $('.AchievementsModule').before('<div class="module CustomAchievementsModule UserProfileCustomAchievementsModule"><h2>' + header + '</h2><div id="UserCustomAchievementsList" class="AchievementsList"></div></div>');
        $('#UserCustomAchievementsList').html(r);
    })
    .fail(function(e) { console.error('CustomAchievements caught an error:', e) })
});
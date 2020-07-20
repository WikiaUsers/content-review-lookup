/**
 * SoundNotification v2.
 * @author: Wildream
 * This is a simple script that adds a sound notification
 * to standard notifications about new replys on Wikia Message Wall/Forum
 * Feel free to use it by adding the next string to your global.js:
 * importScriptPage('User:Wildream/SoundNotifications.js', 'ru.community');
 *
 */
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
 
function Notification() {
    if (mw.config.get('wgUserName')) {
        $.get(mw.config.get('wgServer') + '/wikia.php?controller=WallNotificationsExternal&method=getUpdateCounts&format=json', function (data) {
            if (data.count) {
                if (data.count === 0) {
                    $('.bubbles').removeClass('show').children().html('');
                } else {
                    $('.bubbles').addClass('show').children().html(data.count);
                    notif_count = typeof (getCookie('soundnotifications_notif_count')) !== "undefined" ? parseInt(getCookie('soundnotifications_notif_count'), 10) : 0;
                    if (data.count > notif_count) {
                        document.getElementById('Notifsound').innerHTML = '<audio src="https://vignette.wikia.nocookie.net/blazblue/ru/images/b/b1/00.ogg" autoplay=""></audio>';
                    }
                }
            }
            document.cookie = "soundnotifications_notif_count=" + data.count + "; path=/; domain=wikia.com";
        });
    }
}
$(function () {
    $('body').append('<span id="Notifsound" style="display:none;"></span>');
    setInterval('Notification()', 15000);
});
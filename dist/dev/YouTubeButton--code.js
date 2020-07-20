/**
 * This script imports the platform.js script from Google, which enables the use of YouTube subscribe buttons.
 * To embed a subscribe button, use the following HTML:
 * <div class="g-ytsubscribe" data-channel="ChannelName" data-layout="default" data-count="default"></div>
 * See https://developers.google.com/youtube/youtube_subscribe_button for more information.
**/
(function () {
    var state = 0;
    mw.hook('wikipage.content').add(function ($content) {
        if ($content.find('.g-ytsubscribe').length > 0) {
            if (state === 0) {
                state = 1;
                $.getScript('https://apis.google.com/js/platform.js', function () {
                    state = 2;
                });
            } else if (state === 2) {
                $content.each(function (i, elem) {
                    gapi.ytsubscribe.go(elem);
                });
            }
        }
    });
}());
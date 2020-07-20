/* http://community.wikia.com/wiki/Thread:823194 */
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'WikiActivity') {
        $('#WikiaRail').on('DOMNodeInserted', function() {
            $('.HotSpotsModule').before($('.CommunityCornerModule'));
        });
    }
});
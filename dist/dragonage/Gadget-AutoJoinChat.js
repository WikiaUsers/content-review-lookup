/** <nowiki>
 *
 * @Title       AutoJoinChat
 * @Description Automatically joins Special:Chat
 * @Author      Tierrie <https://dragonage.fandom.com/wiki/User:Tierrie>
 * @Inspiration Porter21 <https://fallout.fandom.com/wiki/User:Porter21>
 *
 */
(function() {
    if ($.cookie('joined_chat') !== null ) {
        return;
    }
    window.open(
        mw.util.getUrl('Special:Chat'),
        'wikiachat',
        'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes'
    );
    $.cookie(
        'joined_chat',
        true,
        {
            path: '/'
        }
    );
})();
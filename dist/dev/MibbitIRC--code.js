/**
 * Name:        MibbitIRC
 * Version:     v1.2
 * Author(s):   Master Ceadeus 27
 *              Sactage
 *              KockaAdmiralac
 * Description: Allows embedding [https://mibbit.com Mibbit] widgets
 */
(function() {
    var $el = $('#JRChatReplace'),
        data = $el.data() || {};
    $el.html(
        $('<iframe>', {
            width: data.width || window.Width,
            height: data.height || window.Height,
            scrolling: 'no',
            src: new mw.Uri('https://widget.mibbit.com/').extend({
                channel: data.channel || window.ChannelIdentify,
                server: data.server || window.ServerIdentify
            }).toString()
        })
    );
})();
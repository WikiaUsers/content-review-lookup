(function ($) {
    //insert lnk 2 last msg. id=forumnavigatorlast, forumnavigatorpages
    //forum namespace only. 1201
    if (mw.config.get('wgNamespaceNumber') !== 1201) return;
    $(function(){
        if (!$('#forumnavigatorpages').length) return;
        var $nlastmsg = $('li.SpeechBubble.message:last');
        if (!$nlastmsg.length) return;
        var nlastmsgid = $nlastmsg.attr('id') || 'WikiaFooter';
        $('#forumnavigatorlast a').attr('href', '#' + nlastmsgid);
        var $a, i, $s1;
        $s1 = $('<span>', {id: 'forumnavigatorpagesscripted'});
        //create links
        for (i = 10; i <= nlastmsgid; i = i + 10) {
            $a = $('<a>', {
                href: '#' + i,
                text: i
            });
            $s1.append(' ').append($a);
        }
        //add last msgid, if not added before (lastmsgid % 10 !== 0)
        if ((nlastmsgid !== 'WikiaFooter') && (nlastmsgid % 10 !== 0)) {
            $s1.append(' ')
            .append($('<a>', {
                href: '#' + nlastmsgid,
                text: nlastmsgid
            }));
        }
        //replace old links (created by template)
        $('#forumnavigatorpages').replaceWith($s1);
    });
}(jQuery));
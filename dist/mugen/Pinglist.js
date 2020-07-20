// <syntaxhighlight lang="javascript">

$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        if ((groups.indexOf('bureaucrat') + groups.indexOf('sysop') + groups.indexOf('chatmoderator') + groups.indexOf('helper') + groups.indexOf('vstf') + groups.indexOf('staff')) > -6) {
            $('.Chat').on('DOMNodeInserted', function(e) {
                var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
                if (msg.substr(0, 5) == '!mods') {
                    $('<audio>', {
                        id: 'mod-ping',
                        src: 'https://images.wikia.nocookie.net/mugen/images/4/44/PTPAIRACTV.ogg',
                        autoplay: true
                    }).appendTo('body');
                }
            });
        }
    }
});
// </syntaxhighlight>
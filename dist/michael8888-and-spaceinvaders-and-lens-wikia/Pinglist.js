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
                        src: 'http://images.wikia.com/mugen/images/4/44/PTPAIRACTV.ogg',
                        autoplay: true
                    }).appendTo('body');
                }
            });
        }
    }
});
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        $('.Chat').on('DOMNodeInserted', function(e) {
            var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
            if (msg.substr(0, 7) == '!falcon') {
                $('<audio>', {
                    id: 'falcon-ping',
                    src: 'http://images.wikia.com/mugen/images/7/73/PTFalconHYESZ.ogg',
                    autoplay: true
                }).appendTo('body');
            }
        });
    }
});
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        $('.Chat').on('DOMNodeInserted', function(e) {
            var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
            if (msg.substr(0, 5) == '!whip') {
                $('<audio>', {
                    id: 'whip-ping',
                    src: 'http://images.wikia.com/mugen/images/8/88/MostAnnoyingSound.ogg',
                    autoplay: true
                }).appendTo('body');
            }
        });
    }
});
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        $('.Chat').on('DOMNodeInserted', function(e) {
            var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
            if (msg.substr(0, 5) == '!adom') {
                $('<audio>', {
                    id: 'adom-ping',
                    src: 'http://images.wikia.com/mugen/images/8/8e/PTADOMSHOUT2.ogg',
                    autoplay: true
                }).appendTo('body');
            }
        });
    }
});
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        $('.Chat').on('DOMNodeInserted', function(e) {
            var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
            if (msg.substr(0, 5) == '!ping') {
                $('<audio>', {
                    id: 'ping-ping',
                    src: 'http://images.wikia.com/mugen/images/6/65/PTPing.ogg',
                    autoplay: true
                }).appendTo('body');
            }
        });
    }
});

$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        $('.Chat').on('DOMNodeInserted', function(e) {
            var msg = $.parseHTML(e.target.innerHTML)[7].innerHTML;
            if (msg.substr(0, 5) == '!cans') {
                $('<audio>', {
                    id: 'ping-ping',
                    src: 'http://images.wikia.com/mugen/images/a/ac/CansClean.ogg',
                    autoplay: true
                }).appendTo('body');
            }
        });
    }
});
// </syntaxhighlight>
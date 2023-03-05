// Tags
window.UserTagsJS = {
    tags: {
        burocrata: { link: 'Special:ListUsers/bureaucrat' },
        bot: { link: 'Special:Listusers/bot' },
        chatmoderator: { link: 'Special:ListUsers/chatmoderator' },
        patroller: { link: 'Special:ListUsers/patroller' },
        rollback: { link: 'Special:ListUsers/rollback' },
        sysop: { link: 'Special:ListUsers/sysop' },
        imagecontroller: { link: 'Special:ListUsers/imagecontroller' }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'burocrata',
            'chatmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot',
            'imagecontroller'
        ],
        newuser: true
    }
};
 
// Tabber
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
    }
};
Tabs.init();
 
// Show username
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").text(mw.config.get('wgUserName'));
});
 
// Add custom edit buttons
if (mw.config.get('mwCustomEditButtons')) {
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png',
        'speedTip': 'Pedir eliminar',
        'tagOpen': '{{delete|reason=',
        'tagClose': '}}',
        'sampleText': 'motivo'
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png',
        'speedTip': 'Add the ō character',
        'tagOpen': 'ō',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png',
        'speedTip': 'Add the ū character',
        'tagOpen': 'ū',
        'tagClose': '',
        'sampleText': ''
    };
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png',
        'speedTip': 'Anade una referencia',
        'tagOpen': '<ref>',
        'tagClose': '</ref>',
        'sampleText': ''
    };
}
/* 
$(function () {
    "use strict";
    // Change title
    var newTitle = $('#title-meta').html(),
        edits = $('#user_masthead_since').text();
 
    if (!newTitle) {
        return;
    }
 
    $('.firstHeading, #WikiaUserPagesHeader h1, #WikiaPageHeader h1').html(newTitle);
    $('.#user_masthead_head h2').html(newTitle + '<small id="user_masthead_since">' + edits + '</small>');
});
*/ 
// Message wall icons
// Do not use underscores (_)
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/SKYNX|MegaSonicX4/g)) {
            $(this).addClass('bureaucrat');
        }
        /*
        if ($user.match(//g)) {
            $(this).addClass('chat-mod');
        }
 
        if ($user.match(/|Blue Pant.|Avatar Raava|Gameuser10/g)) {
            $(this).addClass('patroller');
        }
        if ($user.match(/Kaijusaurus-Rex|Csillagfény/g)) {
            $(this).addClass('admin');
        }
        if ($user.match(/Villicus/g)) {
            $(this).addClass('bot');
        }
        */
    });
}, 1000);
 
// MessageWallUserTags config
// Use underscores to substitute for spaces in long usernames
window.MessageWallUserTags = {
    tagColor: '#47fcf0',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '16px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: '#47fcf0', //Glow color
    users: {
        'SKYNX': 'Burocrata',
        'MegaSonicX4': 'Burocrata'
    }
};
 
window.AjaxRCRefreshText = 'Auto-Refrescar';
window.AjaxRCRefreshHoverText = 'Refrescar la pagina automaticamente';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('[data-widget-id]:not(.loaded)').each(function() {
        var $this = $(this),
            id = encodeURIComponent($this.attr('data-widget-id')),
            css = {
                width: 'inherit',
                height: 'inherit'
            };
        switch($this.attr('class')) {
            case 'Crackle':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.crackle.com/embed/' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        allowfullscreen: true
                    })
                );
                break;
            case 'Facebook':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.facebook.com/video/embed?video_id=' + id,
                        frameboder: 0,
                        css: css
                    })
                );
                break;
            case 'Vine':
                $this.html(
                    $('<iframe>', {
                        src: 'https://vine.co/v/' + id + '/embed/simple',
                        css: css
                    })
                );
                break;
            case 'afreeca':
                // TODO: Does not support HTTPS
                $this.html(
                    $('<iframe>', {
                        src: 'http://play.afreecatv.com/' + id + '/embed',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'internetArchive':
                $this.html(
                    $('<iframe>', {
                        src: 'https://archive.org/embed/' + id,
                        css: css,
                        frameboder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'web.tv':
                $this.html(
                    $('<iframe>', {
                        src: 'https://fandomcntr.web.tv/embed/' + id,
                         frameborder: 0,
                        css: css
                    })
                );
                break;
            case 'playerim':
                $this.html(
                    $('<iframe>', {
                        src: 'https://vod02.cdn.web.tv/' + id + '.mp4.urlset/playlist-f3-v1-a1.m3u8',
                         frameborder: 0,
                        css: css
                    })
                );
                break;
            case 'ok.ru':
                $this.html(
                    $('<iframe>', {
                        src: 'https://ok.ru/videoembed/' + id,
                         frameborder: 0,
                        css: css
                    }) 
                );
                break;
            case 'drive':
                $this.html(
                    $('<iframe>', {
                        src: 'https://drive.google.com/file/d/' + id + 'preview',
                         frameborder: 0,
                        css: css
                    }) 
                    
                );
                break;
            case 'docs':
                $this.html(
                    $('<iframe>', {
                        src: 'https://docs.google.com/file/d/' + id + 'preview',
                         frameborder: 0,
                        css: css
                    }) 
                );
                break;
            case 'YahooTV':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.yahoo.com/tv/v/' + id + '?format=embed',
                        css: css,
                        allowfullscreen: true,
                        allowtransparency: true
                    })
                );
              break;
            case 'CanlıTVPLUS':
                $this.html(
                    $('<iframe>', {
                        src: 'https://canlitv.plus/kanallar.php?kanal=' + id,
                        css: css,
                        frameborder: 0,
                        height: 480,
                        width: 640
                    })
                );
                break;
            case 'WikimediaCommons':
                $this.html(
                    $('<iframe>', {
                        src: 'https://commons.wikimedia.org/wiki/File%3A' + id + '?embedplayer=yes',
                        css: css,
                        frameborder: 0
                    })
                );
                break;
            case 'funnyordie':
                $this.html(
                    $('<iframe>', {
                        src: 'https://www.funnyordie.com/embed/' + id,
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'TwitchStream':
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.twitch.tv/?channel=' + id,
                        css: css,
                        frameborder: 0,
                        scrolling: 'no',
                        height: 378,
                        width: 620
                    })
                );
                break;
            case 'ellenTube':
                $this.html(
                    $('<iframe>', {
                        src: 'https://widgets.ellentube.com/videos/' + id + '/',
                        css: css,
                        frameborder: 0,
                        allowfullscreen: true
                    })
                );
                break;
            case 'fandom':
                // TODO: FANDOM has switched to JWPlayer instead of Ooyala and there's a <jwplayer> parser tag
                $this.html(
                    $('<iframe>', {
                        src: 'https://player.ooyala.com/iframe.html' + id + '&docUrl=' + encodeURIComponent(window.location.href),
                        css: css,
                        allowfullscreen: true
                    })
                );
                break;
            case 'logo':
                $this.html(
                    $('<iframe>', {
                        src: 'https://media.mtvnservices.com/embed/mgid:arc:video:logotv.com:' + id,
                        frameborder: 0,
                        allowfullscreen: true,
                        css: {
                            width: '520px',
                            height: '288px'
                        }
                    })
                );
                break;
        }
        $this.addClass('loaded');
    });
});
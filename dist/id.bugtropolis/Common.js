/* JavaScript yang ada di sini akan diterapkan untuk semua kulit. */
// Tags
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        },
        imagecontroller: {
            link: 'Special:ListUsers/imagecontroller'
        }
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
            'bureaucrat',
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
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (typeof (disableUsernameReplace) !== 'undefined' && disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
}
addOnloadHook(userNameReplace);
 
// Add custom edit buttons
if (mw.config.get('mwCustomEditButtons')) {
    mw.config.get('mwCustomEditButtons')[mw.config.get('mwCustomEditButtons').length] = {
        'imageFile': 'https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png',
        'speedTip': 'Request deletion',
        'tagOpen': '{{delete|reason=',
        'tagClose': '}}',
        'sampleText': 'your reason here'
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
        'speedTip': 'Add a reference',
        'tagOpen': '<ref>',
        'tagClose': '</ref>',
        'sampleText': ''
    };
}
 
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
 
// Message wall icons
// By [[User:AnimatedCartoons]]
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/InvaderrrZIM|Killer365|Klonoamiyumi/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/OtisElevatorGuy1|Blue_Pant.|WaterDemonBaku|Destiny_of_Awe/g)) {
            $(this).addClass('chat-mod');
        }
        if ($user.match(/MisterJim|BMONoire1998|Ailourophile/g)) {
            $(this).addClass('patroller');
        }
        if ($user.match(/PhoenixKenny|Gameuser10/g)) {
            $(this).addClass('admin');
        }
        if ($user.match(/Bot-bert|GumBot/g)) {
            $(this).addClass('bot');
        }
    });
}, 1);
 
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: 'yellow',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '15px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'red', //Glow color
    users: {
        'TransformerTime!': 'Birokrat',
    }
};
 
// SocialIcons config
var SocialMediaButtons = {
	position: "top",
	colorScheme: "color"
};
 
// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:SocialIcons/code.js',
        'u:dev:FixWantedFiles/code.js',
        'u:dev:FixMultipleUpload/code.js',
        'u:dev:ExternalImageLoader/code.js',
        'u:dev:UnsafeScripts/code.js',
        'u:dev:TabKeyInserter/code.js'
    ]
});
importScriptPage('AjaxRC/code.js', 'dev');
 
//================================================================================
//*** import Onlyifuploading-functions
// SEE ALSO [[MediaWiki:Onlyifuploading.js]]
importScriptPage('CollapsibleInfobox/code.js', 'dev');
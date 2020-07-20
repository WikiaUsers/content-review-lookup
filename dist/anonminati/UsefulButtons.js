/**
 * Name:           UsefulButtons
 * Author(s):      Anonminati <https://dev.wikia.com/User:Anonminati>
 * Description:
 *                 UsefulButtons.js is a script made for active Wikia editors.
 *                 It's planned to have all useful buttons in contributons tab.
 * Version:        v1.0
 */
(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' ||
        $('#UserProfileMasthead h1').text() !== mw.config.get('wgUserName')
    ) {
        return;
    }
    /* Userpages */
    $('#contentSub').after(
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage'),
            'text': 'My Userpage',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/Sandbox'),
            'text': 'My Sandbox',
            'css': {
                'margin-left': '2px',
                'width': '125px',
                'border-style': 'solid',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyTalk'),
            'text': 'My Talkpage',
            'css': {
                'margin-left': '2px',
                'width': '125px',
                'border-style': 'solid',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:Contributions'),
            'text': 'My Contributions',
            'css': {
                'margin-left': '2px',
                'width': '125px',
                'border-style': 'solid',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:UserActivity'),
            'text': 'My Activity',
            'css': {
                'margin-left': '2px',
                'width': '125px',
                'border-style': 'solid',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        /* Special Pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:SpecialPages'),
            'text': 'Special Pages',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:WikiActivity'),
            'text': 'Wiki Activity',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:RecentChanges'),
            'text': 'Recent Changes',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:Logs'),
            'text': 'Wiki Logs',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        /* MediaWiki Pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('MediaWiki:Common.js'),
            'text': 'Wiki Common.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('MediaWiki:Common.css'),
            'text': 'Wiki Common.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('MediaWiki:Wikia.js'),
            'text': 'Wiki.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('MediaWiki:Wikia.css'),
            'text': 'Wiki.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('MediaWiki:Chat.js'),
            'text': 'Wiki Chat.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'border-color': 'black',
                'width': '125px',
                color: 'white'
            }
        }),
        /* Copy This section for all buttons */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('MediaWiki:Chat.css'),
            'text': 'Wiki Chat.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User common pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/common.js'),
            'text': 'My Common.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'border-color': 'black',
                'width': '125px',
                color: 'white'
            }
        }),
        /* User common pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/common.css'),
            'text': 'My Common.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User common pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/global.js'),
            'text': 'My Global.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User common pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/global.css'),
            'text': 'My Global.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User common pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/Wikia.js'),
            'text': 'My Wikia.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User common pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/Wikia.css'),
            'text': 'My Wikia.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User chat pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/chat.js'),
            'text': 'My Chat.js',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* User chat pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:MyPage/chat.css'),
            'text': 'My Chat.css',
            'css': {
                'margin-left': '2px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Developer info pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('w:c:dev:User:Anonminati'),
            'text': 'Developer',
            'css': {
                'margin-left': '-249px',
                'margin-top': '40px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
        /* Developer info pages */
        $('<a>', {
            'class': 'wds-button',
            'href': mw.util.getUrl('Special:Chat'),
            'text': 'Join the Chat',
            'css': {
                'margin-left': '88px',
                'border-style': 'solid',
                'width': '125px',
                'border-color': 'black',
                color: 'white'
            }
        }),
    );
})();
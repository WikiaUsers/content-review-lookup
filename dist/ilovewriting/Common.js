/* 20:35, March 5, 2014 (UTC) */

/* Any JavaScript here will be loaded for all skins on the entire site. See also: MediaWiki:Wikia.js and MediaWiki:Monobook.js */


/*** Config script options ***/
/* Ajax auto-refresh config */
  //Pages to auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
  //Text displayed next to checkbox
window.AjaxRCRefreshText = 'Auto-refresh';
  //Text displayed on mouse-over
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
  //Refresh rate in miliseconds
window.ajaxRefresh = 30000;
  //Re-execute custom functions after refreshing
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(function () {
    mw.hook('wikipage.content').fire();
});

//// HighlightUsers config
//window.highlight = {
//    selectAll: true,
//    sysop        : '#FF6347',
//    bot          : '#A400A4',
//    'bot-global' : '#FF8800',
//    vstf         : '#FF7777',
//    helper       : '#FF77AA',
//    staff        : '#DAA520',
//    users: {
//        BoyGash : '#FF4756'
//    }
//};


/*** Import scripts ***/
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:AjaxUndo.js',
        'u:dev:AjaxRC/beta.js',
        'u:dev:ShowHide/code.js',
        'u:dev:DisplayClock/code.js'
    ]
});


/*** Non-imported scripts ***/

/* User Highlighting — Work in progress, still more to do */

function highlightUsers () {
    var sysopList = new Array(sysopList),
        staffList = new Array(staffList);

    //Get Admins list:
    $.getJSON('/api.php?action=query&list=allusers&augroup=sysop&aulimit=max&format=json',
        function (data) {
            for (var i = 0; i < data.query.allusers.length; i++) {
                sysopList[i] = data.query.allusers[i].name;
            }
        });
    //Get Staff list:
    $.getJSON('/api.php?action=query&list=allusers&augroup=staff&aulimit=max&format=json',
        function (data) {
            for (var i = 0; i < data.query.allusers.length; i++) {
                staffList[i] = data.query.allusers[i].name;
            }
        });
    $('a').on('DOMNodeInserted', function () {
        // Highlight Admins:
        $(sysopList).each(function (i) {
            $('a[href$="User:' + sysopList[i] + '"]').filter(function() {
                if ($(this).text() === sysopList[i]) {
                    $(this).css({
                        color: '#FF6347',
                        fontWeight: 'bold',
                        fontFamily: 'Lucida Handwriting',
                        marginRight: '5px'
                    });
                }
            });
        });
        // Comment Highlighting:
        $('.SpeechBubble[data-user="' + sysopList[i] + '"]')
            .children().css('background-color', '#c8ffe1');
        // Highlight Founder:
        $('a[href$="BoyGash"]').filter(function() {
            if ($(this).text() === "BoyGash") {
                $(this).css({
                    color: '#FF0F4F',
                    fontWeight: 'bold',
                    fontFamily: 'Lucida Handwriting',
                    fontSize: '15px',
                    marginRight: '5px'
                });
            }
        });
        // Highlight WikiaStaff:
        $(staffList).each(function (i) {
            $('a[href$="User:' + staffList[i] + '"]').filter(function() {
                if ($(this).text() === staffList[i]) {
                    $(this).css({
                        color: '#DAA520',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    });
                }
            });
        });
    });
}
mw.hook('wikipage.content').add(highlightUsers).fire();
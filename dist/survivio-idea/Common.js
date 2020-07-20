/***********************************************************************/
/****************************** User Tags ******************************/
/***********************************************************************/
// User Tags
$.get(
    mw.util.wikiScript('load'),
    {mode:'articles', articles:'MediaWiki:Custom-user-tags.json', only:'styles'},
    function (d) {
        window.UserTagsJS = JSON.parse(
            d.replace(/\/\*.*\*\//g, '')
        );
    }
);
// Alts
(function () {
    var $masthead = $('#UserProfileMasthead');
    if (!$masthead.exists()) {
        return;
    }
    var $info = $masthead.find('.masthead-info hgroup'),
        username = $info.find('h1').text(),
        alts = {
            'BlackFlame 05':        'GreyFlame 05',
            'Godzilla122221323232': 'TheGodzillaKing',
            'Happy snow bear':      'TLG2252',
            'HopefulHerro':         'HerroPeople',
            'Koo396396':            'Koo396',
            'Salmon Gaming':        'The American Godzilla',
            'SpodermanAlwaysCan':   'GreyFlame 05',
            'Surviver.io the 3rd':  'Surviver.io',
            'Paddddd':              'Dappppp',
            'TheSURV!VR':           'TheSURVIVR',
            'Dom!noes':             'Dominoes',
        },
        altOf = alts[username];
    function addTag () {
        if ($('.usergroup-blocked').exists()) {
            return;
        }
        $info.find('.tag-container').remove();
        $info.append(
            $('<span>', {
                'class': 'tag-container'
            }).append(
                $('<a>', {
                    'text': 'Alt',
                    'href': mw.util.getUrl('User:' + altOf),
                    'title':
                        'This user is a tolerated alt of ' + altOf + '.',
                    'class': 'tag usergroup-alt alt-user'
                })
            )
        );        
    }
    if (altOf) {
        setTimeout(addTag, 1500);
    }
})();

/* RailWAM */
window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Thread lock */
window.LockForums = {
    //disableOn: ['29793'],//Admins can unlock specific threads if necessary.
    expiryDays: 30,
    expiryMessage: 'This thread hasn’t been commented on for <actualDays> days. The discussion is over — there is no need to comment.',
    warningDays: 7,
    warningMessage: 'This thread is now <actualDays> days old. Please reply ONLY if a response is seriously needed.',
    ignoreDeletes: true,
    banners: true,
    expiryBannerMessage: 'This topic has been unedited for <actualDays> days. It is considered archived — the discussion is over. If you feel this thread needs additional information, contact an administrator so they may unlock it if necessary.',
    warningBannerMessage: 'This topic has been unedited for <actualDays> days. It is considered archived — the discussion is over. Do not add to it unless it really needs a response.',
    expiryBannerStyle: 'stylesheet',
    warningBannerStyle: 'stylesheet',
    warningPopup: true,
    warningPopupMessage: 'Posting in an old thread can cause many users still following this thread to be spammed with notifications. Are you sure you want to do this?',
    boxHeight: 55
};/**/
 
 
/***********************************************************************/
/**************************** Miscellaneous ****************************/
/***********************************************************************/
 
/* AddRailModule *
window.ARMModules = ['Template:RailModule', 'Template:RailModule2'];
//End ARM */
 
mw.hook('dev.i18n').add(function (i18n) {
    i18n.loadMessages('CopyText').done(function (i18n) {
        $('body').on('click', '.copy-to-clipboard-button', function(e){
            var text = $(this).data('text'),
            $input = $('<textarea>', { type: 'text' })
                .val($('.copy-to-clipboard-text').filter(function() {
                    return $(this).data('text') == text;
                }).first().text())
                .appendTo('body')
                .select();
            document.execCommand('Copy');
            $input.remove();
            new BannerNotification(i18n.msg('success').escape(), 'confirm').show();
        });
    });
});

importArticle({
    type: 'script',
    articles: [
        'u:dev:I18n-js/code.js'
    ]
});
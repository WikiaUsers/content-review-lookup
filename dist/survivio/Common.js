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
})();//End Tags
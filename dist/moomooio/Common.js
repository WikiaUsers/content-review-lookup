// Alts
(function () {
    var $masthead = $('#UserProfileMasthead');
    if (!$masthead.exists()) {
        return;
    }
    var $info = $masthead.find('.masthead-info hgroup'),
        username = $info.find('h1').text(),
        alts = {
            'BlackFlame 05': 'GreyFlame 05',
            'Godzilla122221323232': 'TheGodzillaKing',
            'Happy snow bear': 'TLG2252',
            'HiMoomoo': 'HiIplayMoomoo',
            'HopefulHerro': 'HerroPeople',
            'Koo396396': 'Koo396',
            'Salmon Gaming': 'The American Godzilla',
            'SpodermanAlwaysCan': 'GreyFlame 05',
            'Ighostalt': 'IGhostMoo'
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
                    'text': 'Tolerated Alt',
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
// User Tags
$.get(
    mw.util.wikiScript('load'),
    {
        mode: 'articles',
        articles: 'MediaWiki:Custom-user-tags.json',
        only: 'styles'
    },
    function (d) {
        window.UserTagsJS = JSON.parse(
            d.replace(/\/\*.*\*\//g, '')
        );
    }
);
// Add Rail Module
window.ARMModules = ['Template:RailModule', 'Template:RailModule2'];
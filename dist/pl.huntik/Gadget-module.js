function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}
 
function showAdmMessage() {
    if (hasGroup('sysop')) {
        $('.WikiaRail .WikiaSearch').after(
            $('<section />').addClass("module")
            .append(
                $('<h1>Menu administratora</h1>').css({'margin-bottom':'10px'}),
                $('<div />')
                .append(
                    $('<a />', {'href':'/wiki/User_talk:Dianek','title':'Dianek'})
                    .append(
                        $('<img />', {'src':'https://images.wikia.nocookie.net/__cb1361382653/common/avatars/thumb/4/42/5330606.png/50px-5330606.png'})
                    )
                ),
                $('<hr />'),
                $('<div />')
                    .append(
                        $('<span />').text('Brudnopisy: '),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis'}).text('[1]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_2'}).text('[2]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_3'}).text('[3]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_4'}).text('[4]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_5'}).text('[5]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_6'}).text('[6]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_7'}).text('[7]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_8'}).text('[8]'),
                        $('<span>&nbsp;•&nbsp;</span>'),
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_9'}).text('[9]')
                    ),
                $('<div />').css({'text-align': 'center'}).addClass("createbox")
                .append(
                    $('<form />', {'name': 'createbox','action': '/index.php','method': 'get'}).addClass("createboxForm")
                    .append(
                        $('<input />', {'type':'hidden','name':'action','value':'create'}),
                        $('<input />', {'type':'hidden','name':'prefix','value':''}),
                        $('<input />', {'type':'hidden','name':'preload','value':''}),
                        $('<input />', {'type':'hidden','name':'editintro','value':''}),
                        $('<input placeholder="Wpisz nazwę nowego artykułu" size="36"/>', {'type':'text','name':'title','value':''}).addClass("createboxInput"),
                        $('<input />', {'type':'submit','name':'create','value':'Utwórz nowy artykuł'}).addClass("createboxButton")
                    )
                ),
                $('<hr />'),
                $('<ul />')
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Wikia.css'}).text('MediaWiki:Wikia.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Wikia.js'}).text('MediaWiki:Wikia.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Common.css'}).text('MediaWiki:Common.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Common.js'}).text('MediaWiki:Common.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Monobook.css'}).text('MediaWiki:Monobook.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Monobook.js'}).text('MediaWiki:Monobook.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'http://community.wikia.com/wiki/Special:Mypage/global.css'}).text('Global.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'http://community.wikia.com/wiki/Special:Mypage/global.js'}).text('Global.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Geshi.css'}).text('MediaWiki:Geshi.css')
                        )
                    ),
                $('<hr />'),
                $('<ul />')
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Kategoria:Szablony'}).text('Szablony')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'http://spolecznosc.wikia.com/wiki/'}).text('Centrum Społeczności')
                        )
                    ),
                $('<table />').addClass("AButtons")
                .append(
                    $('<tr />')
                    .append(
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/wiki/Special:Mypage','title':'Zobacz swoją stronę użytkownika.'}).addClass("wikia-button secondary").css({'font-size':'11px','margin':'8px 2px'}).text('Moja strona')
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;uselang=qqx','title':'Zobacz komunikaty MediaWiki na tej stronie.','class':'wikia-button secondary'}).css({'font-size':'11px','margin':'8px 2px'}).text('qqx')
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;action=purge','title':'Odśwież wybraną stronę.','class':'wikia-button secondary'}).css({'font-size':'11px','margin':'8px 2px'}).text('Odśwież')
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;useskin=monobook','title':'Zmień skórkę na Monobook.','class':'wikia-button secondary'}).css({'font-size':'11px','margin':'8px 2px'}).text('Skórka')
                        )
                    )
                )
            )
        );
    }
}
addOnloadHook(showAdmMessage);
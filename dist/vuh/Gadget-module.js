// Moduł "Witamy na Wiki"
function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}

function showUserMessage() {
    if (hasGroup('user')) {
        $('.WikiaRail .WikiaSearch').after(
            $('<section />').css({'text-align':'center'}).addClass("module")
            .append(
                $('<h1>Witaj na Wiki</h1>').css({'margin-bottom':'10px'}),
                $('<div />')
                .append(
                    $('<a />', {'href':'/wiki/Elder_Scrolls_Wiki:Brudnopis'}).text('Brudnopis'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Specjalna:Forum'}).text('Forum'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Specjalna:Nowe pliki'}).text('Nowe grafiki'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Specjalna:Nowe_strony'}).text('Nowe strony'),
                    $('<br />'),
                    $('<a />', {'href':'/wiki/Specjalna:Ostatnie_zmiany'}).text('Ostatnie zmiany'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Pomoc:Zawartość'}).text('Pomoc'),
                    $('<span>&nbsp;•&nbsp;</span>'),
                    $('<a />', {'href':'/wiki/Elder_Scrolls_Wiki:Regulamin'}).text('Regulamin')
                ),
                $('<div />').css({'margin': '2em 0 1em 0'}).addClass("createbox")
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
                $('<table />', {'id':'WelcomeButtons'})
                .append(
                    $('<tr />')
                    .append(
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/wiki/Specjalna:Mój_Wkład','title':'Zobacz swój wkład włożony w rozwój Wiki.'}).text('Mój wkład').addClass("wikia-button secondary").css({'font-size':'11px','margin':'8px 4px'})
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/wiki/Specjalna:Obserwowane_strony','title':'Sprawdź obserwowane przez siebie artykuły.','class':'wikia-button secondary'}).text('Obserwowane').css({'font-size':'11px','margin':'8px 4px'})
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;useskin=monobook','title':'Aby zmienić skórkę na stałe zaloguj się i wejdź w swoje preferencje.'}).text('Zmień skórkę').addClass("wikia-button secondary").css({'font-size':'11px','margin':'8px 4px'})
                        )
                    )
                )
            )
        );
    };
}
 
addOnloadHook(showUserMessage);
 
// Moduł administracyjny - tylko sysop
function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}
 
function showAdmMessage() {
    if (hasGroup('sysop')) {
        $('.WikiaRail .WikiaSearch').after('<section class="module"><h1>Menu administratora</h1><div>Brudnopisy:&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis">[1]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_2">[2]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_3">[3]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_4">[4]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_5">[5]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_6">[6]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_7">[7]</a>&nbsp;•&nbsp;<a href="/wiki/Specjalna:Moja_strona/Brudnopis_8">[8]</a></div><div class="createbox" style="text-align: center;"><form name="createbox" action="/index.php" method="get" class="createboxForm"><input type="hidden" name="action" value="create"><input type="hidden" name="prefix" value=""><input type="hidden" name="preload" value=""><input type="hidden" name="editintro" value=""><input class="createboxInput" name="title" type="text" placeholder="Wpisz nazwę nowego artykułu" value="" size="36"><input type="submit" name="create" class="createboxButton" value="Utwórz nowy artykuł"></form></div><hr><ul><li><a href="/wiki/MediaWiki:Wikia.css">MediaWiki:Wikia.css</a></li><li><a href="/wiki/MediaWiki:Wikia.js">MediaWiki:Wikia.js</a></li><li><a href="/wiki/MediaWiki:Common.css">MediaWiki:Common.css</a></li><li><a href="/wiki/MediaWiki:Common.js">MediaWiki:Common.js</a></li><li><a href="/wiki/MediaWiki:Monobook.css">MediaWiki:Monobook.css</a></li><li><a href="/wiki/MediaWiki:Monobook.js">MediaWiki:Monobook.js</a></li><li><a href="/wiki/MediaWiki:Geshi.css">MediaWiki:Geshi.css</a></li><li><a href="http://community.wikia.com/wiki/Special:Mypage/global.js">Global.js</a></li><li><a href="http://community.wikia.com/wiki/Special:Mypage/global.css">Global.css</a></li><hr><li><a href="/wiki/Kategoria:Szablony">Szablony</a></li><li><a href="/wiki/Szablon:TemplateESW">Szablon:TESW</a></li><hr><li><a href="http://pl.elderscrolls.wikia.com/wiki/">Elder Scrolls Wiki</a></li><li><a href="http://pl.swordartonline.wikia.com/wiki/">Sword Art Online Wiki</a></li><li><a href="http://gier.wikia.com/wiki/">Gropedia</a></li></ul><table><tr><td><a href="/wiki/Specjalna:Moja_strona" title="Zobacz swoją stronę użytkownika." class="wikia-button secondary" style="font-size:11px;margin:8px 2px;">Moja strona</a></td><td><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;uselang=qqx" title="Zobacz komunikaty MediaWiki na tej stronie." class="wikia-button secondary" style="font-size:11px;margin:8px 2px;">qqx</a></td><td><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;action=purge"  title="Odśwież wybraną stronę." class="wikia-button secondary" style="font-size:11px;margin:8px 2px;">Odśwież</a></td><td><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&amp;useskin=monobook" class="wikia-button secondary" title="Zmień skórkę na Monobook." style="font-size:11px;margin:8px 2px;">Zmień skórkę</a></td></tr></table></section>');
    };
}
 
addOnloadHook(showAdmMessage);
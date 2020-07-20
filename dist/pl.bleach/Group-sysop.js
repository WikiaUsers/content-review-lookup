// Moduł administratora Alpha
// Autor: Vuh
// Udostępniane na tej Wiki na licencji CC-BY-NC-SA za zgodą autora
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl
 
function hasGroup(group) {
    for (var i in wgUserGroups) {
        if (wgUserGroups[i] == group) return true;
    }
    return false;
}
 
function showAdmMessage() {
    if (hasGroup('sysop')) {
        $('.WikiaRail .WikiaSearch').after(
            $('<section />').addClass("module adminmenu")
            .append(
                $('<h1>Menu administratora</h1>').css({'margin-bottom':'10px'}),
                $('<div />')
                .append(
                        $('<a />', {'href':'/wiki/User_talk:Baakamono','title':'Baakamono'})
                    .append(
                        $('<img />', {'src':'https://images.wikia.nocookie.net/__cb1371649851/common/avatars/thumb/5/57/2118454.png/50px-2118454.png.jpg'})
                    ),
                    $('<a />', {'href':'/wiki/User_talk:Yikmo','title':'Yikmo'})
                    .append(
                        $('<img />', {'src':'https://images.wikia.nocookie.net/__cb1382735062/common/avatars/thumb/8/82/15239069.png/50px-15239069.png.jpg'})
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
                        $('<a />', {'href':'/wiki/Specjalna:Moja_strona/Brudnopis_8'}).text('[8]')
                    ),
                $('<div class="createbox" style="margin-left: auto; margin-right: auto; text-align:center"><p></p><form name="createbox" action="/index.php" method="get" class="createboxForm"><input type="hidden" name="action" value="create"><input type="hidden" name="prefix" value=""><input type="hidden" name="preload" value=""><input type="hidden" name="editintro" value=""><input class="createboxInput" name="title" type="text" value="" size="0"><input type="submit" name="create" class="createboxButton" value="Utwórz nowy artykuł"><p></p></form></div>'),
                $('<hr />').css({'margin':'10px 0'}),
                $('<div />').css({'margin-bottom':'10px'})
                .append(
                    $('<span class="panel" id="Menu" style="cursor:pointer;margin:0 8px;">Menu</span>'),
                    $('<span class="panel" id="MediaWiki" style="cursor:pointer;margin:0 8px;">MediaWiki</span>'),
                    $('<span class="panel" id="Grupy" style="cursor:pointer;margin:0 8px;">Grupy</span>'),
                    $('<span class="panel" id="Inne" style="cursor:pointer;margin:0 8px;">Inne</span>'),
                    $('<span class="panel" id="Strony" style="cursor:pointer;margin:0 8px;">Strony</span>')
                ),
                $('<div class="panel" id="Menu" />')
                .append(
                    $('<ul />').css({'width':'50%','float':'left'})
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Special:Gadgets'}).text('Gadżety')
                        )
                    ),
                    $('<ul />').css({'width':'50%','float':'left','text-align':'right'})
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Gadgets-definition'}).text('Gadgets-definition')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Specjalna:Wersja'}).text('Wersja')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Specjalna:Wszystkie_komunikaty'}).text('Wszystkie komunikaty')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Specjalna:Wszystkie_strony'}).text('Wszystkie strony')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Recentchangestext'}).text('Recentchangestext')
                        )
                    )
                ),
                $('<div class="panel" id="MediaWiki" style="display:none;" />')
                .append(
                    $('<ul />').css({'width':'50%','float':'left'})
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Common.css'}).text('Common.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Wikia.css'}).text('Wikia.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Monobook.css'}).text('Monobook.css')
                        ),
                         $('<li />')
                        .append(
                            $('<a />', {'href':'http://c.wikia.com/wiki/Special:Mypage/global.css'}).text('Global.css')
                        )
                    ),
                    $('<ul />').css({'width':'50%','float':'left','text-align':'right'})
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Common.js'}).text('Common.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Wikia.js'}).text('Wikia.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Monobook.js'}).text('Monobook.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'http://c.wikia.com/wiki/Special:Mypage/global.js'}).text('Global.js')
                        )
                    )
                ),
                $('<div class="panel" id="Grupy" style="display:none;" />').append(
                $('<ul />').css({'width':'50%','float':'left'})
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-autoconfirmed.css'}).text('Autoconfirmed.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-bot.css'}).text('Bot.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-sysop.css'}).text('Sysop.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-bureaucrat.css'}).text('Bureaucrat.css')
                        )
                    ),
                $('<ul />').css({'width':'50%','float':'left','text-align':'right'})
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-autoconfirmed.js'}).text('Autoconfirmed.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-bot.js'}).text('Bot.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-sysop.js'}).text('Sysop.js')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Group-bureaucrat.js'}).text('Bureaucrat.js')
                        )
                    )
                ),
                $('<div class="panel" id="Inne" style="display:none;" />').append(
                $('<ul />')
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Geshi.css'}).text('MediaWiki:Geshi.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Print.css'}).text('MediaWiki:Print.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Handheld.css'}).text('MediaWiki:Handheld.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Noscript.css'}).text('MediaWiki:Noscript.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:Filepage.css'}).text('MediaWiki:Filepage.css')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/MediaWiki:RelatedVideosGlobalList'}).text('RelatedVideosGlobalList')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Szablon:Stdsummaries'}).text('Szablon:Stdsummaries')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'/wiki/Kategoria:Szablony'}).text('Szablony')
                        )
                    )
                ),
                $('<div class="panel" id="Strony" style="display:none;" />').append(
                $('<ul />')
                    .append(
                        $('<li />')
                        .append(
                            $('<a />', {'href':'http://bleach.wikia.com/'}).text('ENG Bleach Wiki')
                        ),
                        $('<li />')
                        .append(
                            $('<a />', {'href':'http://spolecznosc.wikia.com/wiki/'}).text('Centrum Społeczności')
                        )
                    )
                ),
                $('<table />')
                .append(
                    $('<tr />')
                    .append(
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/wiki/Special:Mypage','title':'Zobacz swoją stronę użytkownika'}).addClass("wikia-button secondary").css({'font-size':'11px','margin':'8px 2px'}).text('Moja strona')
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&uselang=qqx','title':'Zobacz komunikaty MediaWiki na tej stronie','class':'wikia-button secondary'}).css({'font-size':'11px','margin':'8px 2px'}).text('qqx')
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&action=purge','title':'Odśwież wybraną stronę','class':'wikia-button secondary'}).css({'font-size':'11px','margin':'8px 2px'}).text('Odśwież')
                        ),
                        $('<td />')
                        .append(
                            $('<a />', {'href':'/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook','title':'Zmień skórkę na Monobook','class':'wikia-button secondary'}).css({'font-size':'11px','margin':'8px 2px'}).text('Skórka')
                        )
                    )
                )
            )
        )
    }
};
addOnloadHook(showAdmMessage);
 
function SwitchPanel() {
 $("span.panel").click(function() {
  var tab = $(this).attr("id");
  $("div.panel").each(function() {
   if ($(this).attr("id") == tab) {
    $(this).show();
   }
   else {
    $(this).hide();
   }
  })
 }
)};
addOnloadHook(SwitchPanel);
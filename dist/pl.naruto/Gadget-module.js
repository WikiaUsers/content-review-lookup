// Moduł administratora
// Autor: Vuh ( http://pl.elderscrolls.wikia.com/wiki/User:Vuh )
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
                    $('<a />', {'href':'/wiki/User_talk:Zyriusz','title':'Zyriusz'})
                    .append(
                        $('<img />', {'src':'https://images.wikia.nocookie.net/__cb1385752891/common/avatars/thumb/0/08/1682088.png/50px-1682088.png.jpg'})
                    ),
                    $('<a />', {'href':'/wiki/User_talk:Yuzan332','title':'Yuzan332'})
                    .append(
                        $('<img />', {'src':'https://images.wikia.nocookie.net/common/avatars/thumb/9/97/2214553.png/50px-2214553.png'})
                    ),
                    $('<a />', {'href':'/wiki/User_talk:Havelock','title':'Havelock'})
                    .append(
                        $('<img />', {'src':'https://images.wikia.nocookie.net/__cb1335895241/common/avatars/thumb/3/38/415317.png/50px-415317.png'})
                    )
                ),
		$('<hr />'),
		$('<div />')
		.append(
			$('<span />').text('Brudnopisy: '),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis">[1]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_2">[2]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_3">[3]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_4">[4]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_5">[5]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_6">[6]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_7">[7]</a>'),
			$('<span>&nbsp;•&nbsp;</span>'),
			$('<a href="/wiki/Specjalna:Moja_strona/Brudnopis_8">[8]</a>')
		),
		$('<div class="createbox" style="margin-left: auto; margin-right: auto; text-align:center"><p><form name="createbox" action="/index.php" method="get" class="createboxForm"><input type="hidden" name="action" value="create"><input type="hidden" name="prefix" value=""><input type="hidden" name="preload"><input type="hidden" name="editintro" value=""><input class="createboxInput" name="title" type="text" size="0"><input type="submit" name="create" class="createboxButton" value="Utwórz nowy artykuł"></p></form></div>'),
		$('<hr />').css({'margin':'10px 0'}),
		$('<div />').css({'margin-bottom':'10px'})
		.append(
			$('<span class="panel" id="Menu" style="cursor:pointer;margin:0 8px;">Menu</span>'),
			$('<span class="panel" id="MediaWiki" style="cursor:pointer;margin:0 8px;">MediaWiki</span>'),
			$('<span class="panel" id="Grupy" style="cursor:pointer;margin:0 8px;">Grupy</span>'),
			$('<span class="panel" id="Inne" style="cursor:pointer;margin:0 8px;">Inne</span>'),
			$('<span class="panel" id="Strony" style="cursor:pointer;margin:0 8px;">Strony</span>')
		),
		$('<div class="panel" id="Menu" />').append(
		$('<ul />').css({'width':'50%','float':'left'})
		.append(
			$('<li><a href="/wiki/Specjalna:Gadgets">Gadżety</a></li>'),
			$('<li><a href="/wiki/Specjalna:Drzewo_kategorii">Drzewo kategorii</a></li>'),
			$('<li><a href="/wiki/Specjalna:Lista przekierowań">Lista przekierowań</a></li>'),
			$('<li><a href="/wiki/Specjalna:Użytkownicy">Lista użytkowników</a></li>'),
			$('<li><a href="/wiki/Specjalna:Preferencje">Preferencje</a></li>')
		),
		$('<ul />').css({'width':'50%','float':'left','text-align':'right'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Gadgets-definition">Gadgets-definition</a></li>'),
			$('<li><a href="/wiki/Specjalna:Wersja">Wersja</a></li>'),
			$('<li><a href="/wiki/Specjalna:Wszystkie_komunikaty">Wszystkie komunikaty</a></li>'),
			$('<li><a href="/wiki/Specjalna:Wszystkie_strony">Wszystkie strony</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Recentchangestext">Recentchangestext</a></li>')
		)
		),
		$('<div class="panel" id="MediaWiki" style="display:none;" />').append(
		$('<ul />').css({'width':'50%','float':'left'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Common.css">Common.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Wikia.css">Wikia.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Monobook.css">Monobook.css</a></li>'),
			$('<li><a href="http://c.wikia.com/wiki/Specjalna:Mypage/global.css">Global.css</a></li>')
		),
		$('<ul />').css({'width':'50%','float':'left','text-align':'right'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Common.js">Common.js</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Wikia.js">Wikia.js</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Monobook.js">Monobook.js</a></li>'),
			$('<li><a href="http://c.wikia.com/wiki/Specjalna:Mypage/global.js">Global.js</a></li>')
		)
		),
		$('<div class="panel" id="Grupy" style="display:none;" />').append(
		$('<ul />').css({'width':'50%','float':'left'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Group-autoconfirmed.css">Autoconfirmed.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Group-bot.css">Bot.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Group-sysop.css">Sysop.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Group-bureaucrat.css">Bureaucrat.css</a></li>')
		),
		$('<ul />').css({'width':'50%','float':'left','text-align':'right'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Group-autoconfirmed.js">Autoconfirmed.js</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Group-bot.js">Bot.js</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Group-sysop.js">Sysop.js</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Group-bureaucrat.js">Bureaucrat.js</a></li>')
		)
		),
		$('<div class="panel" id="Inne" style="display:none;" />').append(
		$('<ul />').css({'width':'50%','float':'left'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Geshi.css">Geshi.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Print.css">Print.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Handheld.css">Handheld.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Noscript.css">Noscript.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:Filepage.css">Filepage.css</a></li>'),
			$('<li><a href="/wiki/MediaWiki:RelatedVideosGlobalList">RelatedVideosGlobalList</a></li>')
		),
		$('<ul />').css({'width':'50%','float':'left','text-align':'right'})
		.append(
			$('<li><a href="/wiki/MediaWiki:Stdsummaries">Stdsummaries</a></li>'),
			$('<li><a href="/wiki/Kategoria:Szablony">Szablony</a></li>')
		)
		),
		$('<div class="panel" id="Strony" style="display:none;" />').append(
		$('<ul />').css({'width':'50%','float':'left'})
		.append(
			$('<li><a href="http://naruto.wikia.com">ENG Naruto Wiki</a></li>'),
			$('<li><a href="http://spolecznosc.wikia.com">Centrum Społeczności</a></li>'),
			$('<li><a href="http://community.wikia.com">Community Central</a></li>')

		),
		$('<ul />').css({'width':'50%','float':'left','text-align':'right'})
		.append(
			$('<li><a href="http://www.quantcast.com/' + wgServer +'">Quantcast</a></li>'),
			$('<li><a href="http://www.wikia.com/WAM?searchPhrase=naruto">Wikia WAM</a></li>')
		)
                ),
                $('<table />')
                .append(
                    $('<tr />')
                    .append(
                        $('<td><a href="/wiki/Specjalna:Mypage" title="Zobacz swoją stronę użytkownika" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Mój Profil</a></td>'),
                        $('<td><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&uselang=qqx" title="Zobacz komunikaty MediaWiki na tej stronie" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">qqx</a></td>'),
                        $('<td><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&action=purge" title="Odśwież wybraną stronę" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Odśwież</a></td>'),
                        $('<td><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook" title="Zmień skórkę na Monobook" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Skórka</a></td>')
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
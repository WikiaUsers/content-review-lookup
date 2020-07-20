function Modules() {
	if (hasGroup('sysop')) {
		function a(link, text) {
			return $('<a href="' + link + '">' + text + '</a>')
		};

		function avatar(name, image) {
			return $('<a href="/wiki/User_talk:' + name + '" title="' + name + '"><img src="' + image + '"/></a>')
		};

		function li(link, text) {
			return $('<li><a href="' + link + '">' + text + '</a></li>')
		};

		function panel(name) {
			return $('<span class="panel" id="' + name + '" style="cursor:pointer;margin:0 8px;">' + name + '</span>')
		};

		var $hr = $('<hr>');
		var $div = $('<div>');
		var $ull = $('<ul>').css({
			'width': '50%',
			'float': 'left'
		});
		var $ulr = $('<ul>').css({
			'width': '50%',
			'float': 'left',
			'text-align': 'right'
		});
		var $span = $('<span>&nbsp;•&nbsp;</span>');

		$('.WikiaRail > *:first-child').before(
			$('<section class="module adminmenu" />')
			.append(
				$('<h2 class="activity-heading" style="margin-bottom: 10px">Menu administratora</h2>'),
				$('<div>').addClass('module-avatars')
				.append(
					avatar("Vuh", "https://images.wikia.nocookie.net/common/avatars/thumb/a/ac/3133490.png/50px-3133490.png"),
					avatar("Matik7", "https://images.wikia.nocookie.net/common/avatars/thumb/6/6c/3465513.png/50px-3465513.png"),
					avatar("MuzzledMeat57", "https://images.wikia.nocookie.net/common/avatars/thumb/1/1e/25825845.png/50px-25825845.png")
				),
				$('<hr />'),
				$('<div />').addClass('module-sandboxes').append(
					a("/wiki/S:Moja_strona/Brudnopis", "[0]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_1", "[1]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_2", "[2]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_3", "[3]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_4", "[4]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_5", "[5]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_6", "[6]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_7", "[7]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_8", "[8]"),
					$('<span>&nbsp;•&nbsp;</span>'),
					a("/wiki/S:Moja_strona/Brudnopis_9", "[9]")
				),
				$('<div class="createbox" style="margin-left: auto; margin-right: auto; text-align:center"><p><form name="createbox" action="/index.php" method="get" class="createboxForm"><input type="hidden" name="action" value="create"><input type="hidden" name="prefix" value=""><input type="hidden" name="preload"><input type="hidden" name="editintro" value=""><input class="createboxInput" name="title" type="text" size="16"><input type="submit" name="create" class="createboxButton" value="Utwórz nowy artykuł"></p></form></div>'),
				$('<hr>').css({
					'margin': '10px 0'
				}),
				$('<div>').css({
					'margin-bottom': '10px'
				})
				.append(
					panel('Chat'),
					panel('Menu'),
					panel('MW'),
					panel('Grupy'),
					panel('Inne'),
					panel('Strony')
				),
				$('<div class="panel" id="Chat" />')
				.append(
					$('<div id="tlkio" data-channel="gropedia" data-nickname="'+ wgUserName +'" style="height:400px"></div>')
				),
				$('<div class="panel" id="Menu" style="display:none;" />')
				.append(
					$('<ul>').css({
						'width': '50%',
						'float': 'left'
					}).append(
						li("/wiki/S:Gadgets", "Gadżety"),
						li("/wiki/S:ExpandTemplates", "Rozwijanie szablonów"),
						li("/wiki/S:Własności", "Własności"),
						li("/wiki/S:Forms", "Formularze"),
						li("/wiki/S:Templates", "Szablony"),
						li("/wiki/S:Dostosuj odznaczenia", "Dost. odznacz.")
					),
					$('<ul>').css({
						'width': '50%',
						'float': 'left',
						'text-align': 'right'
					}).append(
						li("/wiki/MW:Gadgets-definition", "Gadgets-definition"),
						li("/wiki/S:Wersja", "Wersja"),
						li("/wiki/S:Wszystkie_komunikaty", "Wszystkie komunikaty"),
						li("/wiki/S:Wszystkie_strony", "Wszystkie strony"),
						li("/wiki/MW:Recentchangestext", "Recentchangestext"),
						li("/wiki/S:GameGuidesContent", "GameGuidesContent")
					)
				),
				$('<div class="panel" id="MW" style="display:none;" />')
				.append(
					$('<ul>').css({
						'width': '50%',
						'float': 'left'
					}).append(
						li("/wiki/MW:Common.css", "Common.css"),
						li("/wiki/MW:Wikia.css", "Wikia.css"),
						li("/wiki/MW:Monobook.css", "Monobook.css"),
						li("http://c.wikia.com/wiki/S:Mypage/global.css", "Global.css")
					),
					$('<ul>').css({
						'width': '50%',
						'float': 'left',
						'text-align': 'right'
					}).append(
						li("/wiki/MW:Common.js", "Common.js"),
						li("/wiki/MW:Wikia.js", "Wikia.js"),
						li("/wiki/MW:Monobook.js", "Monobook.js"),
						li("http://c.wikia.com/wiki/S:Mypage/global.js", "Global.js")
					)
				),
				$('<div class="panel" id="Grupy" style="display:none;" />')
				.append(
					$('<ul>').css({
						'width': '50%',
						'float': 'left'
					}).append(
						li("/wiki/MW:Group-autoconfirmed.css", "Autoconfirmed.css"),
						li("/wiki/MW:Group-bot.css", "Bot.css"),
						li("/wiki/MW:Group-sysop.css", "Sysop.css"),
						li("/wiki/MW:Group-bureaucrat.css", "Bureaucrat.css")
					),
					$('<ul>').css({
						'width': '50%',
						'float': 'left',
						'text-align': 'right'
					}).append(
						li("/wiki/MW:Group-autoconfirmed.js", "Autoconfirmed.js"),
						li("/wiki/MW:Group-bot.js", "Bot.js"),
						li("/wiki/MW:Group-sysop.js", "Sysop.js"),
						li("/wiki/MW:Group-bureaucrat.js", "Bureaucrat.js")
					)
				),
				$('<div class="panel" id="Inne" style="display:none;" />')
				.append(
					$('<ul>').css({
						'width': '50%',
						'float': 'left'
					}).append(
						li("/wiki/MW:Geshi.css", "Geshi.css"),
						li("/wiki/MW:Print.css", "Print.css"),
						li("/wiki/MW:Handheld.css", "Handheld.css"),
						li("/wiki/MW:Noscript.css", "Noscript.css"),
						li("/wiki/MW:Filepage.css", "Filepage.css"),
						li("/wiki/MW:RelatedVideosGlobalList", "RelatedVideosGlobalList")
					),
					$('<ul>').css({
						'width': '50%',
						'float': 'left',
						'text-align': 'right'
					}).append(
						li("/wiki/MediaWiki:Stdsummaries", "Stdsummaries"),
						li("/wiki/Kategoria:Szablony", "Szablony"),
						li("/wiki/Szablon:T", "Szablon:T"),
						li("/wiki/Szablon:ExIESW", "Szablon:ExIESW"),
						li("/wiki/Szablon:IESW", "Szablon:IESW"),
						li("/wiki/Szablon:NESW", "Szablon:NESW")
					)
				),
				$('<div class="panel" id="Strony" style="display:none;" />')
				.append(
					$('<ul>').css({
						'width': '50%',
						'float': 'left'
					}).append(
						li("http://pl.elderscrolls.wikia.com", "Elder Scrolls Wiki"),
						li("http://pl.swordartonline.wikia.com", "Sword Art Online Wiki"),
						li("http://gropedia.wikia.com", "Gropedia"),
						li("http://vuh.wikia.com", "Vuh Sandbox"),
						li("http://spolecznosc.wikia.com", "Centrum Społeczności"),
						li("http://community.wikia.com", "Community Central"),
						li("http://pl.mahoukakoukounorettousei.wikia.com", "Mahouka... Wiki")

					),
					$('<ul>').css({
						'width': '50%',
						'float': 'left',
						'text-align': 'right'
					}).append(
						li("http://pl.elderscrollstech.wikia.com", "Elder Scrolls Tech Wiki"),
						li("http://pl.tesfanon.wikia.com", "TES Fanon Wiki"),
						li("http://www.quantcast.com/" + wgServer, "Quantcast"),
						li("http://www.wikia.com/WAM?searchPhrase="+ wgSiteName, "Wikia WAM"),
						li("http://jsbeautifier.org/", "jsbeautifier.org"),
						li("http://jsfiddle.net/", "jsfiddle.net"),
						li("http://jscompress.com/", "jscompress.com")
					)
				),
				$('<div>').css({
						'width': '250px',
						'text-align': 'center'
					}).append(
					$('<a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&usesitejs=0&usesitecss=0" title="Wyłącz CSS i JS wiki" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Bez CSS i JS</a>'),
					$('<a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&useskin=venus" title="Zmień skórkę na Venus" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Venus</a>'),
					$('<a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&useskin=wikiamobile" title="Zmień skórkę na WikiaMobile" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">WM</a>'),
					$('<a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&useskin=monobook" title="Zmień skórkę na Monobook" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">MB</a>'),
					$('<a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge" title="Odśwież wybraną stronę" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Odśwież</a>'),
					$('<a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&uselang=qqx" title="Zobacz komunikaty MediaWiki na tej stronie" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">qqx</a>'),
					$('<a href="/wiki/S:Mypage" title="Zobacz swoją stronę użytkownika" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Profil</a>'),
					$('<a href="/wiki/S:OZ" title="Zobacz ostatnie zmiany na wiki" class="wikia-button secondary" style="font-size:11px;margin:8px 2px">Ost. zmiany</a>')
				)
			)
		)
	}
}
addOnloadHook(Modules);

$.getScript('//tlk.io/embed.js');

// Change
function SwitchPanel() {
	$("span.panel").click(function () {
		var tab = $(this).attr("id");
		$("div.panel").each(function () {
			if ($(this).attr("id") == tab) {
				$(this).show();
			} else {
				$(this).hide();
			}
		})
	})
}
addOnloadHook(SwitchPanel);
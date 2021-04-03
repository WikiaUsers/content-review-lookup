// Автор Equazcion: https://terraria.gamepedia.com/User:Equazcion
// Перевод Alex Great: https://terraria-ru.gamepedia.com/User:Alex_Great
// Доработка Ivan-r: https://minecraft-ru.gamepedia.com/User:Ivan-r

var plang = $('#p-lang').hide();

function sort( a, b ) {
	return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
}
var plangUL = plang.find('ul');
var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
if ( interwikis.length > 0 ) {
	var gtPre = 'http://translate.google.ru/translate?hl=ru&sl=auto&tl=ru&u=';
//	var ptPre = 'http://www.translate.ru/site/auto/au-ru/?url=https:'; // promt более не поддерживает перевод целых страниц
	var ytPre = 'https://translate.yandex.com/translate?dir=auto&from=&lang=pl&to=pl&ui=&url=https:';
	var hardLangs = {
// Список языков и их локализация
		'English':'Английский',
		'Magyar':'Венгерский',
		'Ελληνικά':'Греческий',
		'Español':'Испанский',
		'Italiano':'Итальянский',
		'中文':'Китайский',
		'한국어':'Корейский',
		'Deutsch':'Немецкий',
		'Nederlands':'Нидерландский',
		'Polski':'Польский',
		'Português':'Португальский',
		'Português do Brasil':'Португальский бразильский', //не используется
		'ไทย':'Тайский',
		'Türkçe':'Турецкий',
		'Українська':'Украинский',
		'Français':'Французский',
		'Čeština':'Чешский',
		'日本語':'Японский'
	};
				// Поддержка языков переводчиком Promt
/*	var promtSupported = ['Английский', 'Греческий', 'Испанский', 'Итальянский', 'Китайский',
		'Корейский', 'Немецкий', 'Нидерландский', 'Португальский', 'Турецкий', 'Украинский',
		'Французский', 'Японский']; */
				// Поддержка языков переводчиком Yandex
	var yandexSupported = ['Английский', 'Венгерский', 'Греческий', 'Испанский', 'Итальянский', 'Китайский',
		'Корейский', 'Немецкий', 'Нидерландский', 'Польский', 'Португальский', 'Тайский',
		'Турецкий', 'Украинский', 'Французский', 'Чешский', 'Японский'];
				// Поддержка языков переводчиком Google
	var googleSupported = ['Английский', 'Венгерский', 'Греческий', 'Испанский', 'Итальянский', 'Китайский',
		'Корейский', 'Немецкий', 'Нидерландский', 'Польский', 'Португальский', 'Тайский',
		'Турецкий', 'Украинский', 'Французский', 'Чешский', 'Японский'];
	
	interwikis.find('a').each( function() {
		var $this = $(this);
		var origLangName = $this.text();
		if ( origLangName != null ) {
			var newLangName = hardLangs[ origLangName ];
			var hrefs = $this.attr('href');
			$this.text( newLangName ).removeAttr('lang style');
//			var unsupP = ( promtSupported.indexOf(newLangName) < 0 ) ? 'pTransUnSup' : 'pTransSup';
			var unsupG = ( googleSupported.indexOf(newLangName) < 0 ) ? 'gTransUnSup' : 'gTransSup';
			var unsupY = ( yandexSupported.indexOf(newLangName) < 0 ) ? 'yTransUnSup' : 'yTransSup';
/*			$('<a/>', {
				'text': 'P',
				'class': 'external uTrans pTrans ' + unsupP,
				'target': '_blank',
				'href': ptPre + hrefs,
				'title': 'Переводчик Promt: перевести ' + newLangName + ' язык на Русский',
			}).insertAfter( $this ).before(' '); */
			$('<a/>', {
				'text': 'Y',
				'class': 'external uTrans yTrans ' + unsupY,
				'target': '_blank',
				'href': ytPre + hrefs,
				'title': 'Переводчик Яндекс: перевести ' + newLangName + ' язык на Русский',
			}).insertAfter( $this ).before(' ');
			$('<a/>', {
				'text': 'G',
				'class': 'external uTrans gTrans ' + unsupG,
				'target': '_blank',
				'href': gtPre + hrefs,
				'title': 'Переводчик Google: перевести ' + newLangName + ' язык на Русский',
			}).insertAfter( $this ).before(' ');
			if ( $this.text().length > 17 )  $this.html( $this.html().replace('-','- ').replace(' ', '<br />') );
		}
	});
	plangUL.prepend( interwikis.sort(sort) );
}
plang.show();
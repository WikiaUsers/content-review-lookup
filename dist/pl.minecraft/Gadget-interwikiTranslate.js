// Autor Equazcion: http://terraria.gamepedia.com/User:Equazcion
// Tłumaczenie Ivan-r: http://minecraft-ru.gamepedia.com/User:Ivan-r

var plang = $('#p-lang').hide();

function sort( a, b ) {
	return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
}
var plangUL = plang.find('ul');
var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
if ( interwikis.length > 0 ) {
	var gtPre = 'http://translate.google.ru/translate?hl=pl&sl=auto&tl=pl&u=';
//	var ptPre = 'http://www.translate.ru/site/auto/au-ru/?url=';
	var ytPre = 'https://translate.yandex.com/translate?dir=auto&from=&lang=pl&to=pl&ui=&url=';
	var hardLangs = {
// СLista języków i ich lokalizacja
		'English':'Angielski',
		'中文':'Chiński',
		'Čeština':'Czeski',
		'Français':'Francuski',
		'Ελληνικά':'Grecki',
		'Español':'Hiszpański',
		'日本語':'Japoński',
		'한국어':'Koreański',
		'Nederlands':'Niderlandzki',
		'Deutsch':'Niemiecki',
//		'Polski':'Польский',
		'Português':'Portugalski',
//		'Português do Brasil':'Brazylijska odmiana języka portugalskiego', // nieużywany
		'Русский':'Rosyjski',
		'ไทย':'Tajski',
		'Türkçe':'Turecki',
		'Українська':'Ukraiński',
		'Magyar':'Węgierski',
		'Italiano':'Włoski'
	};
				// Obsługa języków przez tłumacza Promt //Promt nie obsługuje języka polskiego
/*	var promtSupported = ['Английский', 'Греческий', 'Испанский', 'Итальянский', 'Китайский',
		'Корейский', 'Немецкий', 'Нидерландский', 'Португальский', 'Турецкий', 'Украинский',
		'Французский', 'Японский']; */
				// Obsługa języków przez tłumacza Yandex
	var yandexSupported = ['Angielski', 'Chiński', 'Czeski', 'Francuski', 'Grecki', 'Hiszpański',
		'Japoński', 'Koreański', 'Niderlandzki', 'Niemiecki', 'Polskie', 'Portugalski', 'Rosyjski',
		'Tajski', 'Turecki', 'Ukraiński', 'Węgierski', 'Włoski'];
				// Obsługa języków przez tłumacza Google
	var googleSupported = ['Angielski', 'Chiński', 'Czeski', 'Francuski', 'Grecki', 'Hiszpański',
		'Japoński', 'Koreański', 'Niderlandzki', 'Niemiecki', 'Polskie', 'Portugalski', 'Rosyjski',
		'Tajski', 'Turecki', 'Ukraiński', 'Węgierski', 'Włoski'];
	
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
				'title': 'Tłumacz Promt: tłumaczy ' + newLangName + ' język na polski',
			}).insertAfter( $this ).before(' '); */
			$('<a/>', {
				'text': 'Y',
				'class': 'external uTrans yTrans ' + unsupY,
				'target': '_blank',
				'href': ytPre + hrefs,
				'title': 'Tłumacz Yandex: tłumaczy ' + newLangName + ' język na polski',
			}).insertAfter( $this ).before(' ');
			$('<a/>', {
				'text': 'G',
				'class': 'external uTrans gTrans ' + unsupG,
				'target': '_blank',
				'href': gtPre + hrefs,
				'title': 'Tłumacz Google: tłumaczy ' + newLangName + ' język na polski',
			}).insertAfter( $this ).before(' ');
			if ( $this.text().length > 17 )  $this.html( $this.html().replace('-','- ').replace(' ', '<br />') );
		}
	});
	plangUL.prepend( interwikis.sort(sort) );
}
plang.show();
// Автор Equazcion: https://terraria.gamepedia.com/User:Equazcion
// Переклад Alex Great: https://terraria-ru.gamepedia.com/User:Alex_Great
// Доопрацювання Ivan-r: https://minecraft-ru.gamepedia.com/User:Ivan-r

mw.util.addCSS(
	'.uTrans:hover { text-decoration:none; }' +
	'#p-lang ul { width:115%; } ' +
	'#p-lang li.interlanguage-link { font-family: inherit; }' +
	'.uTrans { ' +
		'display: none; ' +
		'font-family: serif; ' +
		'cursor: pointer; ' +
		'color: white; ' +
		'background-color: transparent;' +
		'border-radius: 2px; ' +
		'padding: 0 2px; ' +
		'margin-left: 5px; ' +
		'transition:' +
			'margin-left 200ms ease-out, ' +
			'background-color 100ms ease-out, ' +
			'color 100ms ease-out; ' +
	'} '
);

var plang = $('#p-lang').hide();


function sort( a, b ) {
	return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
}
var plangUL = plang.find('ul');
var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
if ( interwikis.length > 0 ) {
	var gtPre = 'https://translate.google.com/translate?hl=uk&sl=auto&tl=uk&u=';
	var hardLangs = {
		'中文':'Китайська',
		'Français':'Французька',
		'한국어':'Корейська',
		'Polski':'Польська',
		'Português':'Португальська',
		'Português do Brasil':'Португальська бразильська',
		'English':'Англійська',
		'日本語':'Японська',
		'Deutsch':'Німецька',
		'Español':'Іспанська',
		'Magyar':'Угорська',
		'Italiano':'Італійська',
		'Ελληνικά':'Грецька',
		'Türkçe':'Турецька',
		'Čeština':'Чеська',
		'ไทย':'Тайська',
		'Nederlands':'Нідерландська',
		'Русский':'Російська'
	};
	var googleSupported = ['Азербайджанська', 'Албанська', 'Англійська', 'Арабська', 'Армянська', 'Африкаанс', 'Баскська',
		'Білоруська', 'Бенгальська', 'Бірманська', 'Болгарська', 'Боснійська', 'Валлійська', "В'єтнамська", 'Гаїтянська креольська',
		'Галісійська', 'Гінді', 'Грецька', 'Грузинська', 'Ґуджаратська', 'Данська', 'Есперанто', 'Естонська', 'Зулу', 'Іврит',
		'Ігбо (ібо)', 'Ідиш', 'Індонезійська', 'Ірландський', 'Ісландський', 'Іспанська', 'Італійська', 'Йоруба', 'Казахська', 'Камбоджійська',
		'Каннада', 'Каталонська', 'Китайська', 'Корейська', 'Лаоська', 'Латинська', 'Латиська', 'Литовська', 'Македонська',
		'Малагасійська', 'Малайська', 'Малайялам', 'Мальтійська', 'Маорі', 'Маратхі', 'Монгольська', 'Нідерландська', 'Німецька',
		'Непальська', 'Норвезька', 'Панджабська', 'Перська', 'Польська', 'Португальська', 'Російська', 'Румунська', 'Себуано',
		'Сербська', 'Сесото', 'Сингальська', 'Словацька', 'Словенська', 'Сомалі', 'Суахілі', 'Суданська', 'Таджицька', 'Тайська',
		'Тамільська', 'Телуґу', 'Турецька', 'Угорська', 'Узбекська', 'Українська', 'Урду', 'Філіппінська', 'Фінська', 'Французька',
		'Хауса', 'Хмонг', 'Хорватська', 'Чеська', 'Чичева', 'Шведська', 'Яванська', 'Японська'];
	
	interwikis.find('a').each( function() {
		var $this = $(this);
		var origLangName = $this.text();
		if ( origLangName != null ) {
			var newLangName = hardLangs[ origLangName ];
			newLangName = newLangName.substring(0, newLangName.length-1) + "у";
			var hrefs = $this.attr('href');
			$this.text( newLangName ).removeAttr('lang style');
			var unsupG = ( googleSupported.indexOf(newLangName) < 0 ) ? '#FA8540' : '#4085FA';
			$('<a/>', {
				'text': 'G',
				'class': 'external uTrans gTrans',
				'target': '_blank',
				'href': gtPre + hrefs,
				'title': 'Перекладач Google: перекласти ' + newLangName + ' мову українською',
				'style': 'color:' + unsupG + ';'
			}).insertAfter( $this ).before(' ');
			if ( $this.text().length > 17 )  $this.html( $this.html().replace('-','- ').replace(' ', '<br />') );
			$this.siblings('.gTrans').hover(
				function() { $(this).css( {'background-color': unsupG, 'color': 'white'} ) },
				function() { $(this).css( {'background-color': 'transparent', 'color': unsupG} ) }
			);
			$this.parent('li').hover(
				function() { $(this).find('.uTrans').fadeIn(200).css('margin-left','0') },
				function() { $(this).find('.uTrans').fadeOut(100).css('margin-left','5px') }
			);
		}
	});
	plangUL.prepend( interwikis.sort(sort) );
}
plang.show();
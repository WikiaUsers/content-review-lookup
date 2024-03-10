// By Equazcion: https://terraria.fandom.com/wiki/User:Equazcion

var lang = mw.config.get( 'wgUserLanguage' ) || 'uk';
var l10n = (function(){
	var $text = {
		'googletranslate': {
			'en': 'Google Translate: $lang$ to English',
			'de': 'Google Übersetzer: $lang$ zu Deutsch',
			'fr': 'Google traduction : $lang$ vers français',
			'pt-br': 'Google Tradutor: $lang$ para português brasileiro',
			'ru': 'Google Переводчик: $lang$ на русский',
            'uk': 'Google Перекладач: $lang$ → українська'

		},
		'undefined_language': {
			'en': 'undefined',
			'de': 'undefiniert',
			'fr': 'indéfini',
			'pt-br': 'indefinido',
			'ru': 'неопределённый',
			'uk': 'невизначена'
		},
		'bulgarian': {
			'en': 'Bulgarian',
			'de': 'Bulgarisch',
			'fr': 'bulgare',
			'pt-br': 'Búlgaro',
			'ru': 'болгарский',
			'uk': 'болгарська'
		},
		'cantonese': {
			'en': 'Cantonese',
			'de': 'Kantonesisch',
			'fr': 'cantonais',
			'pt-br': 'Cantonês',
			'ru': 'кантонский',
			'uk': 'кантонська'
		},
		'chinese': {
			'en': 'Chinese',
			'de': 'Chinesisch',
			'fr': 'chinois',
			'pt-br': 'Chinês',
			'ru': 'китайский',
			'uk': 'китайська'
		},
		'czech': {
			'en': 'Czech',
			'de': 'Tschechisch',
			'fr': 'tchèque',
			'pt-br': 'Checo',
			'ru': 'чешский',
			'uk': 'чеська'
		},
		'danish': {
			'en': 'Danish',
			'de': 'Dänisch',
			'fr': 'danois',
			'pt-br': 'Dinamarquês',
			'ru': 'датский',
			'uk': 'данська'
		},
		'dutch': {
			'en': 'Dutch',
			'de': 'Niederländisch',
			'fr': 'hollandais',
			'pt-br': 'Holandês',
			'ru': 'недерландский',
			'uk': 'нідерландська'
		},
		'english': {
			'en': 'English',
			'de': 'Englisch',
			'fr': 'anglais',
			'pt-br': 'Inglês',
			'ru': 'английский',
			'uk': 'англійська'
		},
		'finnish': {
			'en': 'Finnish',
			'de': 'Finnisch',
			'fr': 'finnois',
			'pt-br': 'Finlandês',
			'ru': 'финский',
			'uk': 'фінська'
		},
		'french': {
			'en': 'French',
			'de': 'Französisch',
			'fr': 'français',
			'pt-br': 'Francês',
			'ru': 'французский',
			'uk': 'французька'
		},
		'german': {
			'en': 'German',
			'de': 'Deutsch',
			'fr': 'allemand',
			'pt-br': 'Alemão',
			'ru': 'немецкий',
			'uk': 'німецька'
		},
		'greek': {
			'en': 'Greek',
			'de': 'Griechisch',
			'fr': 'grec',
			'pt-br': 'Grego',
			'ru': 'греческий',
			'uk': 'грецька'
		},
		'hungarian': {
			'en': 'Hungarian',
			'de': 'Ungarisch',
			'fr': 'hongrois',
			'pt-br': 'Húngaro',
			'ru': 'венгерский',
			'uk': 'угорська'
		},
		'indonesian': {
			'en': 'Indonesian',
			'de': 'Indonesisch',
			'fr': 'indonésien',
			'pt-br': 'Indonésio',
			'ru': 'индонезийский',
			'uk': 'індонезійська'
		},
		'italian': {
			'en': 'Italian',
			'de': 'Italienisch',
			'fr': 'italien',
			'pt-br': 'Italiano',
			'ru': 'итальянский',
			'uk': 'італійська'
		},
		'japanese': {
			'en': 'Japanese',
			'de': 'Japanisch',
			'fr': 'japonais',
			'pt-br': 'Japonês',
			'ru': 'японский',
			'uk': 'японська'
		},
		'korean': {
			'en': 'Korean',
			'de': 'Koreanisch',
			'fr': 'coréen',
			'pt-br': 'Coreano',
			'ru': 'корейский',
			'uk': 'корейська'
		},
		'latvian': {
			'en': 'Latvian',
			'de': 'Lettisch',
			'fr': 'letton',
			'pt-br': 'Letão',
			'ru': 'латышский',
			'uk': 'латиська'
		},
		'lithuanian': {
			'en': 'Lithuanian',
			'de': 'Litauisch',
			'fr': 'lituanien',
			'pt-br': 'Lituano',
			'ru': 'литовский',
			'uk': 'литовська'
		},
		'norwegian': {
			'en': 'Norwegian',
			'de': 'Norwegisch',
			'fr': 'norvégien',
			'pt-br': 'Norueguês',
			'ru': 'норвежский',
			'uk': 'норвезька'
		},
		'polish': {
			'en': 'Polish',
			'de': 'Polnisch',
			'fr': 'polonais',
			'pt-br': 'Polonês',
			'ru': 'польский',
			'uk': 'польська'
		},
		'portuguese': {
			'en': 'Portuguese',
			'de': 'Portugiesisch',
			'fr': 'portugais',
			'pt-br': 'Português',
			'ru': 'португальский',
			'uk': 'португальська'
		},
		'russian': {
			'en': 'Russian',
			'de': 'Russisch',
			'fr': 'russe',
			'pt-br': 'Russo',
			'ru': 'русский',
			'uk': 'російська'
		},
		'slovak': {
			'en': 'Slovak',
			'de': 'Slowakisch',
			'fr': 'slovaque',
			'pt-br': 'Eslovaco',
			'ru': 'словацкий',
			'uk': 'словацька'
		},
		'spanish': {
			'en': 'Spanish',
			'de': 'Spanisch',
			'fr': 'espagnol',
			'pt-br': 'Espanhol',
			'ru': 'испанский',
			'uk': 'іспанська'
		},
		'swedish': {
			'en': 'Swedish',
			'de': 'Schwedisch',
			'fr': 'suédois',
			'pt-br': 'Sueco',
			'ru': 'шведский',
			'uk': 'шведська'
		},
		'thai': {
			'en': 'Thai',
			'de': 'Thailändisch',
			'fr': 'thaï',
			'pt-br': 'Tailandês',
			'ru': 'тайский',
			'uk': 'тайська'
		},
		'turkish': {
			'en': 'Turkish',
			'de': 'Türkisch',
			'fr': 'turc',
			'pt-br': 'Turco',
			'ru': 'турецкий',
			'uk': 'турецька'
		},
		'ukrainian': {
			'en': 'Ukrainian',
			'de': 'Ukrainisch',
			'fr': 'ukrainien',
			'pt-br': 'Ucraniano',
			'ru': 'украинский',
			'uk': 'українська'
		},
		'vietnamese': {
			'en': 'Vietnamese',
			'de': 'Vietnamesisch',
			'fr': 'vietnamien',
			'pt-br': 'Vietnamita',
			'ru': 'вьетнамский',
			'uk': 'вєтнамська'
		}
	};
	return function(key){
		return $text[key] && ($text[key][lang] || $text[key]['uk']) || '';
	};
})();

$.when( $.ready ).then(function() {
	var sort = function( a, b ) {
		return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
	};
	var plang = $('#p-lang');	
	var plangUL = plang.find('ul');
	var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
	if ( interwikis.length > 0 ) {
		var gtPre = 'https://translate.google.com/?sl=auto&tl=' + lang + '&op=translate';
		var hardLangs = {
			'Български':'bulgarian',
			'粵語':'cantonese',
			'中文':'chinese',
			'Čeština':'czech',
			'Dansk':'danish',
			'Nederlands':'dutch',
			'English':'english',
			'Français':'french',
			'Suomi':'finnish',
			'Deutsch':'german',
			'Ελληνικά':'greek',
			'Magyar':'hungarian',
			'Bahasa Indonesia':'indonesian',
			'Italiano':'italian',
			'日本語':'japanese',
			'한국어':'korean',
			'Latviešu':'latvian',
			'Lietuvių':'lithuanian',
			'Norsk':'norwegian',
			'Polski':'polish',
			'Português':'portuguese',
			'Русский':'russian',
			'Slovenčina':'slovak',
			'Español':'spanish',
			'Svenska':'swedish',
			'ไทย':'thai',
			'Türkçe':'turkish',
			'Українська':'ukrainian',
			'Tiếng Việt':'vietnamese'
		};
		var googleSupported = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'azerbaijani', 'basque', 'belarusian', 'bengali', 'bosnian',
			'bulgarian', 'burmese', 'catalan', 'cebuan', 'chewa', 'chinese', 'corsican', 'croatian', 'czech', 'danish', 'dutch', 'english', 'esperanto',
			'estonian', 'filipino', 'finnish', 'french', 'frisian', 'galician', 'georgian', 'german', 'greek', 'gujarati', 'haitian', 'hawaiian', 'hmong',
			'igbo', 'creole', 'hausa', 'hebrew', 'hindi', 'hungarian', 'icelandic', 'indonesian', 'irish', 'italian', 'japanese', 'javanese', 'kannada',
			'kazakh', 'khmer', 'kinyarwanda', 'korean', 'kurmanji', 'kyrgyz', 'lao', 'latin', 'latvian', 'lithuanian', 'luxembourgish', 'macedonian',
			'malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi', 'mongolian', 'nepali', 'norwegian', 'odia', 'pashto', 'persian', 'polish',
			'portuguese', 'punjabi', 'romanian', 'russian', 'samoan', 'scottish gaelic', 'serbian', 'shona', 'sindhi', 'sinhala', 'slovak', 'slovenian',
			'somali', 'sotho', 'spanish', 'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'tatar', 'telugu', 'thai', 'turkish', 'turkmen', 'ukrainian',
			'urdu', 'uyghur', 'uzbek', 'vietnamese', 'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu'];
		
		interwikis.find('a').each( function() {
			var $this = $(this);
			var origLangName = $this.text();
			if ( origLangName !== null ) {
				var newLangName = hardLangs[ origLangName ] || l10n('undefined_language');
				var hrefs = $this.attr('href');
				$this.text( l10n(newLangName) ).removeAttr('lang style');
				var unsup = ( googleSupported.indexOf(newLangName) < 0 ) ? '#FA8540' : '#4085FA';
				$('<a></a>', {
					'text': 'G',
					'class': 'external gTrans',
					'target': '_blank',
					'href': gtPre + hrefs,
					'title': l10n('googletranslate').replace('$lang$', l10n(newLangName)),
					'style': 'color:' + unsup + ';display:inline-block;'
				}).fadeOut(0).insertAfter( $this ).before(' ');
				if ( $this.text().length > 17 )  $this.html( $this.html().replace('-','- ').replace(' ', '<br/>') );
				$this.siblings('.gTrans').hover(
					function() { $(this).css( {'background-color': unsup, 'color': 'white'} ) },
					function() { $(this).css( {'background-color': 'transparent', 'color': unsup} ) }
				);
				$this.parent('li').hover(
					function() { $(this).find('.gTrans').fadeIn(200).css('margin-left','0') },
					function() { $(this).find('.gTrans').fadeOut(100).css('margin-left','5px') }
				);
			}
		});
		plangUL.prepend( interwikis.sort(sort) );
	}
});
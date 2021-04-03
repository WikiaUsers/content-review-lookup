// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var lang = mw.config.get( 'wgUserLanguage' ) || 'en';
var l10n = (function(){
	var $text = {
		'googletranslate': {
			'en': 'Google Translate: $lang$ to English',
			'de': 'Google Übersetzer: $lang$ zu Deutsch',
			'fr': 'Google traduction : $lang$ vers français',
			'pt-br': 'Google Tradutor: $lang$ para português brasileiro',
			'ru': 'Google Переводчик: $lang$ → русский'

		},
		'undefined_language': {
			'en': 'undefined',
			'de': 'undefiniert',
			'fr': 'indéfini',
			'pt-br': 'indefinido',
			'ru': 'неопределённый'
		},
		'bulgarian': {
			'en': 'Bulgarian',
			'de': 'Bulgarisch',
			'fr': 'bulgare',
			'pt-br': 'Búlgaro',
			'ru': 'болгарский'
		},
		'cantonese': {
			'en': 'Cantonese',
			'de': 'Kantonesisch',
			'fr': 'cantonais',
			'pt-br': 'Cantonês',
			'ru': 'кантонский'
		},
		'chinese': {
			'en': 'Chinese',
			'de': 'Chinesisch',
			'fr': 'chinois',
			'pt-br': 'Chinês',
			'ru': 'китайский'
		},
		'czech': {
			'en': 'Czech',
			'de': 'Tschechisch',
			'fr': 'tchèque',
			'pt-br': 'Checo',
			'ru': 'чешский'
		},
		'danish': {
			'en': 'Danish',
			'de': 'Dänisch',
			'fr': 'danois',
			'pt-br': 'Dinamarquês',
			'ru': 'датский'
		},
		'dutch': {
			'en': 'Dutch',
			'de': 'Niederländisch',
			'fr': 'hollandais',
			'pt-br': 'Holandês',
			'ru': 'недерландский'
		},
		'english': {
			'en': 'English',
			'de': 'Englisch',
			'fr': 'anglais',
			'pt-br': 'Inglês',
			'ru': 'английский'
		},
		'finnish': {
			'en': 'Finnish',
			'de': 'Finnisch',
			'fr': 'finnois',
			'pt-br': 'Finlandês',
			'ru': 'финский'
		},
		'french': {
			'en': 'French',
			'de': 'Französisch',
			'fr': 'français',
			'pt-br': 'Francês',
			'ru': 'французский'
		},
		'german': {
			'en': 'German',
			'de': 'Deutsch',
			'fr': 'allemand',
			'pt-br': 'Alemão',
			'ru': 'немецкий'
		},
		'greek': {
			'en': 'Greek',
			'de': 'Griechisch',
			'fr': 'grec',
			'pt-br': 'Grego',
			'ru': 'греческий'
		},
		'hungarian': {
			'en': 'Hungarian',
			'de': 'Ungarisch',
			'fr': 'hongrois',
			'pt-br': 'Húngaro',
			'ru': 'венгерский'
		},
		'indonesian': {
			'en': 'Indonesian',
			'de': 'Indonesisch',
			'fr': 'indonésien',
			'pt-br': 'Indonésio',
			'ru': 'индонезийский'
		},
		'italian': {
			'en': 'Italian',
			'de': 'Italienisch',
			'fr': 'italien',
			'pt-br': 'Italiano',
			'ru': 'итальянский'
		},
		'japanese': {
			'en': 'Japanese',
			'de': 'Japanisch',
			'fr': 'japonais',
			'pt-br': 'Japonês',
			'ru': 'японский'
		},
		'korean': {
			'en': 'Korean',
			'de': 'Koreanisch',
			'fr': 'coréen',
			'pt-br': 'Coreano',
			'ru': 'корейский'
		},
		'latvian': {
			'en': 'Latvian',
			'de': 'Lettisch',
			'fr': 'letton',
			'pt-br': 'Letão',
			'ru': 'латышский'
		},
		'lithuanian': {
			'en': 'Lithuanian',
			'de': 'Litauisch',
			'fr': 'lituanien',
			'pt-br': 'Lituano',
			'ru': 'литовский'
		},
		'norwegian': {
			'en': 'Norwegian',
			'de': 'Norwegisch',
			'fr': 'norvégien',
			'pt-br': 'Norueguês',
			'ru': 'норвежский'
		},
		'polish': {
			'en': 'Polish',
			'de': 'Polnisch',
			'fr': 'polonais',
			'pt-br': 'Polonês',
			'ru': 'польский'
		},
		'portuguese': {
			'en': 'Portuguese',
			'de': 'Portugiesisch',
			'fr': 'portugais',
			'pt-br': 'Português',
			'ru': 'португальский'
		},
		'russian': {
			'en': 'Russian',
			'de': 'Russisch',
			'fr': 'russe',
			'pt-br': 'Russo',
			'ru': 'русский'
		},
		'slovak': {
			'en': 'Slovak',
			'de': 'Slowakisch',
			'fr': 'slovaque',
			'pt-br': 'Eslovaco',
			'ru': 'словацкий'
		},
		'spanish': {
			'en': 'Spanish',
			'de': 'Spanisch',
			'fr': 'espagnol',
			'pt-br': 'Espanhol',
			'ru': 'испанский'
		},
		'swedish': {
			'en': 'Swedish',
			'de': 'Schwedisch',
			'fr': 'suédois',
			'pt-br': 'Sueco',
			'ru': 'шведский'
		},
		'thai': {
			'en': 'Thai',
			'de': 'Thailändisch',
			'fr': 'thaï',
			'pt-br': 'Tailandês',
			'ru': 'тайский'
		},
		'turkish': {
			'en': 'Turkish',
			'de': 'Türkisch',
			'fr': 'turc',
			'pt-br': 'Turco',
			'ru': 'турецкий'
		},
		'ukrainian': {
			'en': 'Ukrainian',
			'de': 'Ukrainisch',
			'fr': 'ukrainien',
			'pt-br': 'Ucraniano',
			'ru': 'украинский'
		},
		'vietnamese': {
			'en': 'Vietnamese',
			'de': 'Vietnamesisch',
			'fr': 'vietnamien',
			'pt-br': 'Vietnamita',
			'ru': 'вьетнамский'
		}
	};
	return function(key){
		return $text[key] && ($text[key][lang] || $text[key]['en']) || '';
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
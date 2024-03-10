// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var lang = mw.config.get( 'wgUserLanguage' ) || 'en';
var l10n = (function(){
	var $text = {
		'googletranslate': {
			'en': 'Google Translate: $lang$ to English',
			'de': 'Google Übersetzer: $lang$ zu Deutsch',
			'fr': 'Google traduction : $lang$ vers français',
			'ru': 'Google Переводчик: $lang$ → русский',
		},
		'undefined_language': {
			'en': 'undefined',
			'de': 'undefiniert',
			'fr': 'indéfini',
			'ru': 'неопределённый',
		},
		'bulgarian': {
			'en': 'Bulgarian',
			'de': 'Bulgarisch',
			'fr': 'bulgare',
			'ru': 'болгарский'
		},
		'cantonese': {
			'en': 'Cantonese',
			'de': 'Kantonesisch',
			'fr': 'cantonais',
			'ru': 'кантонский'
		},
		'chinese': {
			'en': 'Chinese',
			'de': 'Chinesisch',
			'fr': 'chinois',
			'ru': 'китайский'
		},
		'czech': {
			'en': 'Czech',
			'de': 'Tschechisch',
			'fr': 'tchèque',
			'ru': 'чешский'
		},
		'danish': {
			'en': 'Danish',
			'de': 'Dänisch',
			'fr': 'danois',
			'ru': 'датский'
		},
		'dutch': {
			'en': 'Dutch',
			'de': 'Niederländisch',
			'fr': 'hollandais',
			'ru': 'недерландский'
		},
		'english': {
			'en': 'English',
			'de': 'Englisch',
			'fr': 'anglais',
			'ru': 'английский'
		},
		'finnish': {
			'en': 'Finnish',
			'de': 'Finnisch',
			'fr': 'finnois',
			'ru': 'финский'
		},
		'french': {
			'en': 'French',
			'de': 'Französisch',
			'fr': 'français',
			'ru': 'французский'
		},
		'german': {
			'en': 'German',
			'de': 'Deutsch',
			'fr': 'allemand',
			'ru': 'немецкий'
		},
		'greek': {
			'en': 'Greek',
			'de': 'Griechisch',
			'fr': 'grec',
			'ru': 'греческий'
		},
		'hungarian': {
			'en': 'Hungarian',
			'de': 'Ungarisch',
			'fr': 'hongrois',
			'ru': 'венгерский'
		},
		'indonesian': {
			'en': 'Indonesian',
			'de': 'Indonesisch',
			'fr': 'indonésien',
			'ru': 'индонезийский'
		},
		'italian': {
			'en': 'Italian',
			'de': 'Italienisch',
			'fr': 'italien',
			'ru': 'итальянский'
		},
		'japanese': {
			'en': 'Japanese',
			'de': 'Japanisch',
			'fr': 'japonais',
			'ru': 'японский'
		},
		'korean': {
			'en': 'Korean',
			'de': 'Koreanisch',
			'fr': 'coréen',
			'ru': 'корейский'
		},
		'latvian': {
			'en': 'Latvian',
			'de': 'Lettisch',
			'fr': 'letton',
			'ru': 'латышский'
		},
		'lithuanian': {
			'en': 'Lithuanian',
			'de': 'Litauisch',
			'fr': 'lituanien',
			'ru': 'литовский'
		},
		'norwegian': {
			'en': 'Norwegian',
			'de': 'Norwegisch',
			'fr': 'norvégien',
			'ru': 'норвежский'
		},
		'polish': {
			'en': 'Polish',
			'de': 'Polnisch',
			'fr': 'polonais',
			'ru': 'польский'
		},
		'portuguese': {
			'en': 'Portuguese',
			'de': 'Portugiesisch',
			'fr': 'portugais',
			'ru': 'португальский '
		},
		'russian': {
			'en': 'Russian',
			'de': 'Russisch',
			'fr': 'russe',
			'ru': 'русский'
		},
		'slovak': {
			'en': 'Slovak',
			'de': 'Slowakisch',
			'fr': 'slovaque',
			'ru': 'словацкий'
		},
		'spanish': {
			'en': 'Spanish',
			'de': 'Spanisch',
			'fr': 'espagnol',
			'ru': 'испанский'
		},
		'swedish': {
			'en': 'Swedish',
			'de': 'Schwedisch',
			'fr': 'suédois',
			'ru': 'шведский'
		},
		'thai': {
			'en': 'Thai',
			'de': 'Thailändisch',
			'fr': 'thaï',
			'ru': 'тайский'
		},
		'turkish': {
			'en': 'Turkish',
			'de': 'Türkisch',
			'fr': 'turc',
			'ru': 'турецкий'
		},
		'ukrainian': {
			'en': 'Ukrainian',
			'de': 'Ukrainisch',
			'fr': 'ukrainien',
			'ru': 'украинский'
		},
		'vietnamese': {
			'en': 'Vietnamese',
			'de': 'Vietnamesisch',
			'fr': 'vietnamien',
			'ru': 'вьетнамский'
		},
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
		var gtPre = 'http://translate.google.com/translate?hl=' + lang + '&sl=auto&tl=' + lang + '&u=';
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
		var googleSupported = ['afrikaans', 'albanian', 'arabic', 'armenian', 'azerbaijani', 'basque', 'belarusian', 'bengali', 'bulgarian',
			'catalan', 'chinese', 'chinese (simplified)', 'croatian', 'czech', 'danish', 'dutch', 'english', 'esperanto', 'estonian', 'filipino', 'finnish',
			'french', 'galician', 'georgian', 'german', 'greek', 'haitian', 'creole', 'hebrew', 'hindi', 'hungarian', 'icelandic',
			'indonesian', 'irish', 'italian', 'japanese', 'javanese', 'kannada', 'korean', 'khmer', 'latin', 'latvian', 'lithuanian',
			'macedonian', 'malay', 'maltese', 'marathi', 'norwegian', 'norwegian (bokmål)', 'norwegian nynorsk', 'persian', 'polish',
			'portuguese', 'romanian', 'russian', 'serbian', 'slovak', 'slovenian', 'spanish', 'swahili', 'swedish', 'tamil',
			'telugu', 'thai', 'turkish', 'ukrainian', 'urdu', 'vietnamese', 'welsh', 'yiddish'];
		
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
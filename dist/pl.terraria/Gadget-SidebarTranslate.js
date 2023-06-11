// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

$.when( $.ready ).then(function() {
	var sort = function( a, b ) {
		return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
	}
	var plang = $('#p-lang');	
	var plangUL = plang.find('ul');
	var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
	if ( interwikis.length > 0 ) {
		var gtPre = 'http://translate.google.com/translate?hl=en&sl=auto&tl=en&u=';
		var hardLangs = {
			'中文':'Chinese',
			'Čeština':'Czech',
	 		'Davvisámegiella':'Northern Sami',
			'Nederlands':'Dutch',
	 		'Français':'French',
	 		'Suomi':'Finnish',
			'Deutsch':'German',
			'Ελληνικά':'Greek',
			'Magyar':'Hungarian',
			'Bahasa Indonesia':'Indonesian',
			'Italiano':'Italian',
			'日本語':'Japanese',
			'한국어':'Korean',
			'Latviešu':'Latvian',
			'Lietuvių':'Lithuanian',
			'Norsk':'Norwegian',
			'Polski':'Polish',
			'Português':'Portuguese', 
			'Русский':'Russian',
			'Español':'Spanish',
			'ไทย':'Thai',
			'Türkçe':'Turkish',
			'Українська':'Ukrainian'
		};
		var googleSupported = ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bulgarian',
			'Catalan', 'Chinese', 'Chinese (Simplified)', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Filipino', 'Finnish',
			'French', 'Galician', 'Georgian', 'German', 'Greek', 'Haitian', 'Creole', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic',
			'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese', 'Kannada', 'Korean', 'Khmer', 'Latin', 'Latvian', 'Lithuanian',
			'Macedonian', 'Malay', 'Maltese', 'Marathi', 'Norwegian', 'Norwegian (bokmål)', 'Norwegian Nynorsk', 'Persian', 'Polish',
			'Portuguese', 'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Tamil',
			'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese', 'Welsh', 'Yiddish'];
		
		interwikis.find('a').each( function() {
			var $this = $(this);
			var origLangName = $this.text();
			if ( origLangName !== null ) {
				var newLangName = hardLangs[ origLangName ];
				var hrefs = $this.attr('href');
				$this.text( newLangName ).removeAttr('lang style');
				var unsup = ( googleSupported.indexOf(newLangName) < 0 ) ? '#FA8540' : '#4085FA';
				$('<a></a>', {
					'text': 'G',
					'class': 'external gTrans',
					'target': '_blank',
					'href': gtPre + hrefs,
					'title': 'Google Translate: ' + newLangName + ' to English',
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
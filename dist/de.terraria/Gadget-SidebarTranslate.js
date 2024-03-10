// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

$.when( $.ready ).then(function() {
	var sort = function( a, b ) {
		return ( $(b).text() ) < ( $(a).text() ) ? 1 : -1;
	}
	var plang = $('#p-lang');	
	var plangUL = plang.find('ul');
	var interwikis = plangUL.find('li[class^="interlanguage-link"]').detach();
	if ( interwikis.length > 0 ) {
		var gtPre = 'http://translate.google.de/translate?hl=de&sl=auto&tl=de&u=';
		var hardLangs = {
			'中文':'Chinesisch',
			'English':'Englisch',
	 		'Suomi':'Finnisch',
			'Français':'Französisch', 
			'Ελληνικά':'Griechisch',
			'Bahasa Indonesia':'Indonesisch',
			'Italiano':'Italienisch',
			'日本語':'Japanisch',
			'한국어':'Koreanisch', 
			'Latviešu':'Lettisch',
			'Lietuvių':'Litauisch',
			'Nederlands':'Niederländisch',
			'Davvisámegiella':'Nordsamisch',
			'Norsk bokmål':'Norwegisch',
			'Norsk':'Norwegisch',
			'Polski':'Polnisch',
			'Português':'Portugiesisch', 
			'Русский':'Russisch',
			'Sámegiella':'Samisch',
			'Español':'Spanisch',
			'ไทย':'Thailändisch',
			'Čeština':'Tschechisch',
			'Türkçe':'Türkisch',
			'Українська':'Ukrainisch',
			'Magyar':'Ungarisch',

		};
		var googleSupported = ['Afrikaans', 'Albanisch', 'Arabisch', 'Armenisch', 'Aserbaidschanisch', 'Baskisch', 'Bengalisch', 'Bulgarisch',
			'Chinesisch', 'Dänisch', 'Englisch', 'Esperanto', 'Estnisch', 'Filipino', 'Finnisch', 'Französisch', 'Galizisch', 'Georgisch',
			'Griechisch', 'Haitianisch', 'Hebräisch', 'Hindi', 'Indonesisch', 'Irisch', 'Isländisch', 'Italienisch', 'Japanisch', 'Javanisch', 'Jiddisch',
			'Kannada', 'Katalanisch', 'Khmer', 'Koreanisch', 'Kroatisch', 'Lateinisch', 'Lettisch', 'Litauisch', 'Malaiisch', 'Maltesisch', 'Marathi',
			'Mazedonisch', 'Niederländisch', 'Norwegisch', 'Persisch', 'Polnisch', 'Portugiesisch', 'Rumänisch', 'Russisch', 'Schwedisch', 'Serbisch',
			'Slowakisch', 'Slowenisch', 'Spanisch', 'Suaheli', 'Tamil', 'Telugu', 'Thailändisch', 'Tschechisch', 'Türkisch', 'Ukrainisch', 'Ungarisch',
			'Urdu', 'Vietnamesisch', 'Walisisch', 'Weißrussisch'];
		
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
					'title': 'Google Übersetzer: ' + newLangName + ' zu Deutsch',
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
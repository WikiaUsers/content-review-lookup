/* things used in more than one script */
console.log("Variables loaded");

/* language dropdown list */

languages_top = {
    EN: 'en - English',
    DE: 'de - Deutsch',
    ES: 'es - Español',
    JA: 'ja - 日本語',
    NL: 'nl - Nederlands'
};

languages = {
    AR: 'ar - العربية',
    BE: 'be - Беларуская',
    BG: 'bg - Български',
    BN: 'bn - বাংলা',
    BS: 'bs - Bosanski',
    CA: 'ca - Català',
    CS: 'cs - Česky',
    CY: 'cy - Cymraeg',
    DA: 'da - Dansk',
    DE: 'de - Deutsch',
    EL: 'el - Ελληνικά',
    EN: 'en - English',
    EO: 'eo - Esperanto',
    ES: 'es - Español',
    ET: 'et - Eesti',
    EU: 'eu - Euskara',
    FA: 'fa - فارسی',
    FI: 'fi - Suomi',
    FR: 'fr - Français',
    GA: 'ga - Gaeilge',
    GD: 'gd - Gàidhlig',
    GL: 'gl - Galego',
    HE: 'he - עברית',
    HI: 'hi - हिन्दी',
    HR: 'hr - Hrvatski',
    HU: 'hu - Magyar',
    HY: 'hy - Հայերեն',
    ID: 'id - Bahasa Indonesia',
    IT: 'it - Italiano',
    JA: 'ja - 日本語',
    JV: 'jv - Basa Jawa',
    KK: 'kk - Қазақша',
    KO: 'ko - 한국어',
    LA: 'la - Latina',
    LB: 'lb - Lëtzebuergesch',
    MI: 'mi - Māori',
    ML: 'ml - മലയാളം',
    MN: 'mn - Монгол',
    MO: 'mo - Молдовеняскэ',
    MS: 'ms - Malay',
    MT: 'mt - Malti',
    NL: 'nl - Nederlands',
    NN: 'nn - ‪Norsk (nynorsk)‬',
    NO: 'no - Norsk (bokmål)‬',
    NV: 'nv - Diné bizaad',
    PL: 'pl - Polski',
    PT: 'pt - Português',
    RO: 'ro - Română',
    RU: 'ru - Русский',
    SK: 'sk - Slovenčina',
    SL: 'sl - Slovenščina',
    SR: 'sr - Српски / Srpski',
    SV: 'sv - Svenska',
    TG: 'tg - Тоҷикӣ',
    TK: 'tk - Türkmençe',
    TL: 'tl - Tagalog',
    TR: 'tr - Türkçe',
    UK: 'uk - Українська',
    UZ: 'uz - O\'zbek',
    VI: 'vi - Tiếng Việt',
    YI: 'yi - ייִדיש',
    ZH: 'zh - 中文',
    ZU: 'zu - isiZulu',
    XX: 'Other'
};

language_dropdown = [];
language_top_array = ['<optgroup label="Most active languages">'];
language_array = ['<optgroup label="All available languages">'];

for (var i in languages) {
    language_array += '<option value="' + i + '">' + languages[i] + '</option>';
}

for (var i in languages_top) {
    language_top_array += '<option value="' + i + '">' + languages_top[i] + '</option>';
}

language_top_array += "</optgroup>";
language_array += "</optgroup>";

language_dropdown = language_top_array + language_array;

/* message/msg constuct */
	var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
    get: function(name) {
    	var m = '(' + name + ')';
 
		if (messages[_api.language.toUpperCase()][name]) m = messages[_api.language.toUpperCase()][name];
		else { m = messages['EN'][name] }
		return m; 	
 
},
 
	add: function(code, obj) {
        this[code.toUpperCase()] = $.extend({}, this[code.toUpperCase()], obj)
    },
 
    languages: {
	           EN: 'en - English',
        	    AR: 'ar - العربية',
    	        BE: 'be - Беларуская',
	            BG: 'bg - Български',
            	BN: 'bn - বাংলা',
        	    BS: 'bs - Bosanski',
    	        CA: 'ca - Català',
	            CS: 'cs - Česky',
            	CY: 'cy - Cymraeg',
        	    DA: 'da - Dansk',
    	        DE: 'de - Deutsch',
	            EO: 'eo - Esperanto',
            	ES: 'es - Español',
        	    ET: 'et - Eesti',
    	        EU: 'eu - Euskara',
	            FA: 'fa - فارسی',
            	FI: 'fi - Suomi',
        	    FR: 'fr - Français',
    	        GA: 'ga - Gaeilge',
	            GD: 'gd - Gàidhlig',
            	GL: 'gl - Galego',
        	    HE: 'he - עברית',
    	        HI: 'hi - हिन्दी',
	            HR: 'hr - Hrvatski',
            	HU: 'hu - Magyar',
        	    HY: 'hy - Հայերեն',
    	        ID: 'id - Bahasa Indonesia',
	            IT: 'it - Italiano',
            	JA: 'ja - 日本語', 
        	    JV: 'jv - Basa Jawa',
    	        KK: 'kk - Қазақша',
	            KO: 'ko - 한국어',
            	LA: 'la - Latina',
        	    LB: 'lb - Lëtzebuergesch',
    	        MI: 'mi - Māori',
	            ML: 'ml - മലയാളം',
            	MN: 'mn - Монгол',
        	    MO: 'mo - Молдовеняскэ',
    	        MS: 'ms - Malay',
	            MT: 'mt - Malti',
            	NL: 'nl - Nederlands',
        	    NN: 'nn - ‪Norsk (nynorsk)‬',
    	        NO: 'no - Norsk (bokmål)‬',
	            NV: 'nv - Diné bizaad',
        	    PL: 'pl - Polski',
    	        PT: 'pt - Português',
	            RO: 'ro - Română',
        	    RU: 'ru - Русский',
    	        SK: 'sk - Slovenčina',
	            SL: 'sl - Slovenščina',
        	    SR: 'sr - Српски / Srpski',
    	        SV: 'sv - Svenska',
	            TG: 'tg - Тоҷикӣ',
	            TK: 'tk - Türkmençe',
	            TL: 'tl - Tagalog',
	            TR: 'tr - Türkçe',
	            UK: 'uk - Українська',
	            UZ: 'uz - O\'zbek',
	            VI: 'vi - Tiếng Việt',
	            YI: 'yi - ייִדיש',
	            ZH: 'zh - 中文',
	            ZU: 'zu - isiZulu',
				XX: 'Other'
			},
 
    };
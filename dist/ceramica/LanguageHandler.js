// <source lang="javascript">
/*
  Some basic language support, use by the upload form rewrite.
 
  Author: [[User:Lupo]], January 2008
  License: Quadruple licensed GFDL, GPL, LGPL and Creative Commons Attribution 3.0 (CC-BY-3.0)
 
  Choose whichever license of these you like best :-)
*/

var LanguageHandler = {

  languages : new Array (
    // Sorted by language name, not language code! Except for strange scripts... 
    {text : 'Авар', lang : 'av'},
    {text : 'Afar', lang : 'aa'}, 
    {text : 'Аҧсуа', lang : 'ab'},
    {text : 'Afrikaans', lang : 'af'}, 
    {text : 'Akan', lang : 'ak'}, 
    {text : 'አማርኛ', lang : 'am'},
    {text : 'Alemannisch', lang : 'als'},
    {text : 'Anglo Saxon', lang : 'ang'}, 
    {text : 'العربية', lang : 'ar'}, 
    {text : 'Aragonés', lang : 'an'},
    {text : 'Armãneashce', lang : 'roa-rup'},
    {text : 'Arpetan', lang : 'frp'},
    {text : 'ܐܪܡܝܐ', lang : 'arc'},
    {text : 'অসমীয়া', lang : 'as'},
    {text : 'Asturianu', lang : 'ast'},
    {text : 'Avañe\'ẽ', lang : 'gn'},
    {text : 'Aymar', lang : 'ay'},
    {text : 'Azərbaycan', lang : 'az'},
  
    {text : 'Башҡорт', lang : 'ba'},
    {text : 'Беларуская', lang : 'be'},
    {text : 'Беларуская (тарашкевіца)', lang : 'be-tarask'},
    {text : 'Български', lang : 'bg'},
    {text : 'Bamanankan', lang : 'bm'},
    {text : 'Bân-lâm-gú', lang : 'zh-min-nan'}, // Or 'nan', or 'minnan'
    {text : 'Bikol Central', lang : 'bcl'},
    {text : 'Bislama', lang : 'bi'},
    {text : 'भोजपुरी', lang : 'bh'},
    {text : 'বাংলা', lang : 'bn'},
    {text : 'བོད་ཡིག', lang : 'bo'},
    {text : 'ইমার ঠার/বিষ্ণুপ্রিয়া মণিপুরী', lang : 'bpy'},
    {text : 'Bosanski', lang : 'bs'},
    {text : 'Brezhoneg', lang : 'br'},
    {text : 'ᨅᨔ ᨕᨘᨁᨗ', lang : 'bug'},
  
    {text : 'Чăвашла', lang : 'cv'},
    {text : 'Català', lang : 'ca'},
    {text : 'Cebuano', lang : 'ceb'},
    {text : 'ᏣᎳᎩ', lang : 'chr'},
    {text : 'Chi-Chewa', lang : 'ny'},
    {text : 'Cmique Itom', lang : 'sei'},
    {text : 'Corsu', lang : 'co'},
    {text : 'Česky', lang : 'cs'},
    {text : 'Словѣньскъ', lang : 'cu'},
    {text : '(Cuengh)', lang : 'za'},
    {text : 'Cymraeg', lang : 'cy'},
  
    {text : 'Dansk', lang : 'da'},
    {text : 'Deitsch', lang : 'pdc'},
    {text : 'Deutsch', lang : 'de'},
    {text : 'Diné bizaad', lang : 'nv'},
    {text : 'Dolnoserbski', lang : 'dsb'},
    {text : 'ދިވެހިބަސް', lang : 'dv'},
    {text : 'ཇོང་ཁ', lang : 'dz'},
  
    {text : 'Eʋegbe', lang : 'ee'},
    {text : 'Eesti', lang : 'et'},
    {text : 'Ekakairũ Naoero', lang : 'na'},
    {text : 'Ελληνικά', lang : 'el'},
    {text : 'Emiliàn e rumagnòl', lang : 'eml'},
    {text : 'English', lang : 'en'},
    {text : 'эрзянь кель', lang : 'myv'},
    {text : 'Esperanto', lang : 'eo'},
    {text : 'Español', lang : 'es'},
    {text : 'Estremeñu', lang : 'ext'},
    {text : 'Euskara', lang : 'eu'},
  
    {text : 'فارسی', lang : 'fa'},
    {text : 'Français', lang : 'fr'},
    {text : 'Français cadien', lang : 'frc'},
    {text : 'Frysk', lang : 'fy'},
    {text : 'Fulfulde', lang : 'ff'},
    {text : 'Furlan', lang : 'fur'},
    {text : 'Føroyskt', lang : 'fo'},
  
    {text : 'Gaeilge', lang : 'ga'},
    {text : 'Gagauz', lang : 'gag'},
    {text : '贛語', lang : 'gan'},
    {text : 'Gàidhlig', lang : 'gd'},
    {text : 'Galego', lang : 'gl'},
    {text : 'ГІалгІай Ğalğaj', lang : 'inh'},
    {text : 'Gegë', lang : 'aln'},
    {text : 'گیلکی', lang : 'glk'},
    {text : '𐌲𐌿𐍄𐌹𐍃𐌺', lang : 'got'},
    {text : 'ગુજરાતી', lang : 'gu'},
  
    {text : 'Hak-kâ-fa', lang : 'hak'},
    {text : 'Hawai`i', lang : 'haw'},
    {text : 'עברית', lang : 'he'},
    {text : 'हिन्दी', lang : 'hi'},
    {text : 'Hornjoserbsce', lang : 'hsb'},
    {text : 'Hrvatski', lang : 'hr'},
    {text : 'Հայերեն', lang : 'hy'},
  
    {text : 'Ido', lang : 'io'},
    {text : 'Igbo', lang : 'ig'},
    {text : 'Ilokano', lang : 'ilo'},
    {text : 'Bahasa Indonesia', lang : 'id'},
    {text : 'Interlingua', lang : 'ia'},
    {text : 'Interlingue', lang : 'ie'},
    {text : 'ᐃᓄᒃᑎᑐᑦ', lang : 'ike-cans'},
    {text : 'inuktitut', lang : 'ike-latn'},
    {text : 'ᐃᓄᒃᑎᑐᑦ/inuktitut', lang : 'iu'},
    {text : 'ꆇꉙ', lang : 'ii'},
    {text : 'Iñupiak', lang : 'ik'},
    {text : 'Иронау', lang : 'os'},
    {text : 'Íslenska', lang : 'is'},
    {text : 'Italiano', lang : 'it'},
  
    {text : '日本語', lang : 'ja'},
    {text : 'Basa Jawa', lang : 'jv'},
  
    {text : 'Kalaallisut', lang : 'kl'},
    {text : 'Kaszëbsczi', lang : 'csb'},
    {text : 'Қазақша', lang : 'kk'},
    {text : 'ქართული', lang : 'ka'},
    {text : 'Kernewek', lang : 'kw'},
    {text : 'Kinaray-a', lang : 'krj'},
    {text : 'Kiswahili', lang : 'sw'},
    {text : 'Коми', lang : 'kv'},
    {text : 'Kotava', lang : 'avk'},
    {text : 'Kongo', lang : 'kg'},
    {text : 'ភាសាខ្មែរ', lang : 'km'},
    {text : 'ಕನ್ನಡ', lang : 'kn'},
    {text : '한국어', lang : 'ko'},
    {text : 'कश्मीरी - (كشميري)', lang : 'ks'},
    {text : 'Kreyòl ayisyen', lang : 'ht'},
    {text : 'Kurdî / كوردی', lang : 'ku'},
    {text : 'Кыргызча', lang : 'ky'},
    {text : '‪Къырымтатарджа‬', lang : 'crh-cyrl'},

    {text : 'Ladin', lang : 'lld'},
    {text : 'Ladino', lang : 'lad'},
    {text : 'Лакку', lang : 'lbe'},
    {text : 'Latina', lang : 'la'},
    {text : 'Latviešu', lang : 'lv'},
    {text : 'Lëtzebuergesch', lang : 'lb'},
    {text : 'Lietuvių', lang : 'lt'},
    {text : 'Líguru', lang : 'lij'},
    {text : 'Limburgs', lang : 'li'},
    {text : 'Lingála', lang : 'ln'},
    {text : 'Lingua Franca Nova', lang : 'lfn'},
    {text : 'Lojban', lang : 'jbo'},
    {text : 'Luganda', lang : 'lg'},
    {text : 'Lumbaart', lang : 'lmo'},
    {text : 'ລາວ', lang : 'lo'},

    {text : 'Magyar', lang : 'hu'},
    {text : 'Македонски', lang : 'mk'},
    {text : 'Malagasy', lang : 'mg'},
    {text : 'Malti', lang : 'mt'},
    {text : 'Māori', lang : 'mi'},
    {text : 'Mapudungun', lang : 'arn'},
    {text : 'Bahasa Melayu', lang : 'ms'},
    {text : 'Middelnederlands', lang : 'dum'},
    {text : 'Mìng-dĕ̤ng-ngṳ̄', lang : 'cdo'},
    {text : 'മലയാളം', lang : 'ml'},
    {text : 'мокшень кяль', lang : 'mdf'},
    {text : 'Монгол', lang : 'mn'},
    {text : 'मराठी', lang : 'mr'},
    {text : 'Myanmasa', lang : 'my'},
    {text : 'مَزِروني', lang : 'mzn'},
  
    {text : 'Na Vosa Vakaviti', lang : 'fj'},
    {text : 'Nahuatl', lang : 'nah'},
    {text : 'Nedersaksisch', lang : 'nds-nl'},
    {text : 'Nnapulitano', lang : 'nap'},
    {text : 'नेपाली', lang : 'ne'},
    {text : 'नेपाल भाषा', lang : 'new'},
    {text : 'Nederlands', lang : 'nl'},
    {text : '‪Norsk (nynorsk)‬', lang : 'nn'},
    {text : '‪Norsk (bokmål)‬', lang : 'no'},
    {text : 'Norrǿna', lang : 'non'},
    {text : 'Novial', lang : 'nov'},
    {text : 'Нохчийн', lang : 'ce'},

    {text : 'Occitan', lang : 'oc'},
    {text : 'ଓଡ଼ିଆ', lang : 'or'},
    {text : 'O\'zbek', lang : 'uz'},
  
    {text : 'ਪੰਜਾਬੀ', lang : 'pa'},
    {text : 'Pangasinan', lang : 'pag'},
    {text : 'Papiamentu', lang : 'pap'},
    {text : 'पािऴ', lang : 'pi'},
    {text : 'Piemontèis', lang : 'pms'},
    {text : 'Plattdüütsch', lang : 'nds'},
    {text : 'Polski', lang : 'pl'},
    {text : 'Ποντιακά', lang : 'pnt'},
    {text : 'پښتو', lang : 'ps'},
    {text : 'Português', lang : 'pt'},
    {text : 'Português do Brasil', lang : 'pt-br'},

    {text : 'Qaraqalpaqsha', lang : 'kaa'},
    {text : 'Qırımtatarca', lang : 'crh'},

    {text : 'Reo Mā`ohi', lang : 'ty'},
    {text : 'Ripoarisch', lang : 'ksh'},
    {text : 'Română', lang : 'ro'},
    {text : 'Romani', lang : 'rmy'},
    {text : 'Runa Simi', lang : 'qu'},
    {text : 'Rumantsch', lang : 'rm'},
    {text : 'Русский', lang : 'ru'},
  
    {text : 'संस्कृत', lang : 'sa'},
    {text : 'Sámegiella', lang : 'se'},
    {text : 'Sranantongo', lang : 'srn'},
    {text : 'Sardu', lang : 'sc'},
    {text : 'Sassaresu', lang : 'sdc'},
    {text : 'Scots', lang : 'sco'},
    {text : 'Саха тыла', lang : 'sah'},
    {text : 'Seeltersk', lang : 'stq'},
    {text : 'Sesotho sa Leboa', lang : 'nso'},
    {text : 'Setswana', lang : 'tn'},
    {text : 'Shqip', lang : 'sq'},
    {text : 'Sicilianu', lang : 'scn'},
    {text : 'سنڌي', lang : 'sd'},
    {text : 'Silozi', lang : 'loz'},
    {text : 'සිංහල', lang: 'si'},
    {text : 'SiSwati', lang : 'ss'},
    {text : 'Slovenčina', lang : 'sk'},
    {text : 'Slovenščina', lang : 'sl'},
    {text : 'chiShona', lang : 'sn'},
    {text : 'Soomaaliga', lang : 'so'},
    {text : 'Српски / Srpski', lang : 'sr'},
    {text : 'Basa Sunda', lang : 'su'},
    {text : 'Suomi', lang : 'fi'},
    {text : 'Svenska', lang : 'sv'},
  
    {text : 'Tagalog', lang : 'tl'},
    {text : 'Taqbaylit', lang : 'kab'},
    {text : 'Tshivenda', lang : 've'},
    {text : 'Tašlḥiyt', lang : 'shi'},
    {text : 'Tatarça', lang : 'tt'},
    {text : 'தமிழ்', lang : 'ta'},
    {text : 'తెలుగు', lang : 'te'},
    {text : 'Tetun', lang : 'tet'},
    {text : 'Tok Pisin', lang : 'tpi'},
    {text : 'faka-Tonga', lang : 'to'},
    {text : 'Тоҷикӣ', lang : 'tg'},
    {text : 'ไทย', lang : 'th'},
    {text : 'ትግርኛ', lang : 'ti'},
    {text : 'Türkçe', lang : 'tr'},
    {text : 'Türkmen', lang : 'tk'},
    {text : 'Тыва дыл', lang : 'tyv'},

    {text : 'Удмурт', lang : 'udm'},
    {text : 'Українська', lang : 'uk'},
    {text : 'Uyghurche‎ / ئۇيغۇرچە', lang : 'ug'},
    {text : 'اردو', lang : 'ur'},
  
    {text : 'Vèneto', lang : 'vec'},
    {text : 'Tiếng Việt', lang : 'vi'},
    {text : 'West-Vlams', lang : 'vls'},
    {text : 'Volapük', lang : 'vo'},
    {text : 'Võro', lang : 'fiu-vro'},

    {text : 'Walon', lang : 'wa'},
    {text : 'Winaray', lang : 'war'},
    {text : 'Wolof', lang : 'wo'},
    {text : '吴语', lang : 'wuu'},
  
    {text : 'Хальмг', lang : 'xal'},
    {text : 'isiXhosa', lang : 'xh'},
  
    {text : 'מיזרח־ייִדיש', lang : 'ydd'},
    {text : 'ייִדיש', lang : 'yi'},
    {text : '粵語', lang : 'yue'},
  
    {text : 'Zazaki', lang : 'diq'},
    {text : 'Zeêuws', lang : 'zea'},
    {text : 'Žemaitėška', lang : 'bat-smg'},
    {text : '中文', lang : 'zh'},
    {text : '古文 / 文言文', lang : 'zh-classical'},
    {text : '‪中文(中国大陆)‬', lang : 'zh-cn'},
    {text : '‪中文(简体)‬', lang : 'zh-hans'},
    {text : '‪中文(繁體)‬', lang : 'zh-hant'},
    {text : '‪中文(香港)‬', lang : 'zh-hk'},

    {text : '‪中文(新加坡)‬', lang : 'zh-sg'},
    {text : '‪中文(台灣)‬', lang : 'zh-tw'},
    {text : '粵語', lang : 'zh-yue'},
  
    {text : 'Åarjelsaemien gïele', lang : 'sma'}
  ),
  
  getSelect : function (id, preSelect, unknownLabel)
  {
    var select = document.createElement ('select');
    if (id != null) {
      select.setAttribute ('id', id);
      select.setAttribute ('name', id);
    }
    // Must have a text node. IE6 doesn't know Node.TEXT_NODE...
    while (unknownLabel && unknownLabel.nodeType != 3)
      unknownLabel = unknownLabel.firstChild;
    if (unknownLabel) {
      var unknown_option = document.createElement ('option');
      unknown_option.setAttribute ('value', 'unknown');
      unknown_option.appendChild (
        document.createTextNode (unknownLabel.data.replace (/^\s+/, "").replace (/\s+$/, "")));
      if (preSelect == null) unknown_option.setAttribute ('selected', 'selected');
      select.appendChild (unknown_option);
    }
    for (var i = 0; i < LanguageHandler.languages.length; i++) {
      var option = document.createElement ('option');
      option.setAttribute ('value', LanguageHandler.languages[i].lang);
      if (LanguageHandler.languages[i].lang == preSelect)
        option.setAttribute ('selected', 'selected');
      option.appendChild (document.createTextNode (LanguageHandler.languages[i].text));
      select.appendChild (option);
    }
    return select;      
  },
  
  closestIndex : function (langCode)
  {
    if (typeof (langCode) != 'string' || langCode == null || langCode.length == 0) return -1;
    // Check if we have it.
    if (langCode == 'nan' || langCode == 'minnan') langCode = 'zh-min-nan';
    for (var i = 0; i < LanguageHandler.languages.length; i++) {
      if (LanguageHandler.languages[i].lang == langCode) return i;
    }
    // Check for prefix
    var dash = langCode.indexOf ('-');
    if (dash >= 0)
      return LanguageHandler.closestIndex (langCode.substring (0, dash));
    return -1;
  },

  closestLanguage : function (langCode)
  {
    var idx = LanguageHandler.closestIndex (langCode);
    if (idx < 0) return null;
    return LanguageHandler.languages[idx].lang;
  },

  getPrefix : function (langStr)
  {
    // Given a string, check if any prefix substring matches one of the language codes. If so, return
    // the length of the longest matching language code, otherwise, return zero.
    // Note: if languageHandler.languages were sorted by length of language code, this could be sped up
    // by stopping on the first match. But the benefits of human-readability of the list in alphabetical
    // order outweigh this performance consideration.
    var match_length = 0;
    for (var i = 0; i < LanguageHandler.languages.length; i++) {
      var l = LanguageHandler.languages[i].lang.length;
      if (   l <= langStr.length && l > match_length
          && langStr.substr (0, l) == LanguageHandler.languages[i].lang)
        match_length = l;
    }
    return match_length;
  }

} // end LanguageHandler

// </source>
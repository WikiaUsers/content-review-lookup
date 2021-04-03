// Фильтр мата и капса. Автор: Kopcap94. Модифицировали: AxteD, Lascal и GoodLuck
$(document.body).on('keydown', function(event) {
	event = event || window.event;
	var target = event.target,
		blacklist = /([^А-Яа-яA-Za-z0-9]|^)(((н|h)(а|a|и|е|e)|(п|n|д)(о|o|0)|(a|а|o|о|0))?(х|x)(у|y)((e|е|и)(c|с)(а|a|о|o|0)(c|с)|(e|е|ё)(л?(а|о|o|0|и)?|т?(b|ь)?|(в|b)ши(й|е|e|м|m|х|x|ми|mи)))?(й(ня)?|я|(c|с)?(е|e|ё|и|я|ях|яx|ям|яm|яmи|ями|ю|em|еm|ем|eм)|(л|в|b|6)?(о|o|0)?)|(c|с)?(n|п)(и|е|e)(з|3|c|с)(д|d)(и(л|шь?)|юк)?((а|a|о|o|0)?(h|н)(у|y)(л(а|a|и)?)?)?((а|a|e|е|y|у|и)((б|b|6)(о|o|0)л(и(з|с|c|3))?)?|(е|e)ц?|((t|т)(b|ь)?(с|c)я))?|((н|h)(а|a)|(п|n)(р|p)(о|o|0))?(c|с)(р|p)((а|a)(л(а|a|и)?|ть|(h|н)(h|н)?((а|a)я|ый|(о|o|0)(е|e)|ы(е|e)))|(у|y)(е|e|ё)(м|m))|(б|b)л(я|e|е|ё)((д|(т|t))(ь|b)|я{1,}|e{1,}|е{1,}|ё{1,})?|(С|C|с|с|з|3)д(о|0|o)(х|x)(н|h)и(т(е|e))?|((3|з)(a|а))?(д(a|а|о|o|0)(л(б|b|6|п|n)(a|а|о|o|0))?)?(е|e|ё)(б|b|6|п|n)((аЕ|æ|a|а|о|o|0|и(с|c)(ь|b|я)?)(л((о|o|0|и|a|а)?|(o|о|0)(k|к)|(ь|b)(н|h)и(к|k))|(т|t)(ь|b)((с|c)я)?|(н|h)(a|а)((t|т)(ы|а|a|у|y|((o|о|0|a|а)(m|м))?)?|ш(k|к)(a|а|и|у|y|((о|o|0)й))))?)?|(у|y)?(ё|е|e)(б|b|6)((a|а)(h|н)|ищ)?((о|o|0)(к|k)|(к|k)и|(а|a|е|e|ы|у|y)|(а|a)(т|t)(ь|b)|ыч(ь|b)?)|(д|d)(и|е|e)(б|b|6)(и|e|е)л(к|к)?((а|a|у|е|e|ы)|(о|o|0|a|а)(|в|м|m|x|х)и?)?|(n|п)(а|a)дл((ы|а|a|y|у|е|e|о|o|0)й?)|(a|а|о|o|0){1,}(х|x){1,}(у|y){1,}(е|e){1,}((н|h){1,}(о|o|0){1,})|(n|п)(и|е|e)д(а|a|о|o|0|и)(р|p)(((а|a)(3|з|c|с)((o|о|0|a|а)(м|m|b|в|x|х))?(а|a|у|е|e|ы|и)?|((o|о|0|a|а)(м|m|b|в|x|х)и?))?|и(т|t)(ь|b)|ли)|((н|h)(а|a|и|е|e)|п(о|o|0))?(х|x)(е|e)(р|p)((н|h)((я|ю)|(е|ё|e)й)|(ь|b))?|шлю(х|ш(к|k))((а|a|е|e|у|y)|(о|o|0)й)|(м|m)(у|y)д((а|a)(к|k)((а|a|и|у|y)|(о|o|0)(м|m))?|ил(а|a|ы))|(е|e|ё)(n|п)(т|t)(а|a)?|((м|m)(а|a)з(а|a))?ф(а|a)(к|k)(а|a)?|(б|b)(и|i)(т|t)(ч|ch)){1,}([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{1,})?(?!\S)/gi,
		symbol = /-!.\(\),":;/g;
	if ($(target).attr('name') == 'message' && event.which === 13) {
		var $message = $('.message > textarea').val();
		if ($message.length > 12) {
			var mlength = $message.length;
			var uppercase = $message.replace(/%..|[^А-ЯA-Z]/g, '').length;
			if (uppercase / mlength > 0.35) {
				$('.message > textarea').val($message.charAt(0).toUpperCase() + $message.substr(1).toLowerCase());
			}
		}
		if ($message.match(blacklist)) {
			var lastsymbol = $('.message > textarea').val().slice(0, -1);
			if (lastsymbol == symbol) {
				$('.message > textarea').val($('.message > textarea').val().replace(blacklist, ' <3 love <3 ', lastsymbol));
			} else {
				$('.message > textarea').val($('.message > textarea').val().replace(blacklist, ' <3 love <3 '));
			}
		}
	}
});
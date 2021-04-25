/**
 * Преобразует слова на шпицисском языке в их транскрипции согласно МФА.
 * Используется шаблоном {{transcription-sp}}, смотрите его описание.
 * Написал Kofirs2634 по запросу PlushBoy для Шпицесловаря.
 * @version 1.1
 */
$(function() {
    if (window.SpzToIPA) return;
    window.SpzToIPA = true;

    if (!$('.spz-ipa').length) return;

    // таблица перевода тех букв, чьи звуки в МФА обозначены
    // отличными от них самих символами
    const specTable = {
        'á': 'ja', 'c': 't͡s',
        'ê': 'e', 'e': 'ɛ',
        'l': 'ɫ', 'û': 'ʏ',
        'ā': 'a:', 'ē': 'e:',
        'ī': 'i:', 'ō': 'o:',
        'ū': 'u:', 'i': 'ɪ',
        'ş': 'ʂ'
    },
    // эти страшные регулярки (особенно последняя) содержат
    // правила простановки звуков согласно правилам в КГШЯ, гл. I
    rules = [
        /g(?=[aáêeiouû])/g,
        /(?<=[aáêeiouû])h$/g,
        /(?<=g)h(?=[aáêeiouû])/g,
        /(?<=[bdglmnrvz])i/g,
        /([cfhkpsştx])(?=[áêiû])/g,
        /(a{2,}|á{2,}|ê{2,}|e{2,}|i{2,}|o{2,}|u{2,}|û{2,})/g
    ];

    function convert(word) {
        // принудительно опускаем в нижний регистр, ибо так принято
        // и еще тут же сносим все неиспользуемые в шпицисском символы
        word = word.toLowerCase().replace(/[^a-z'áêûş]/g, '');

        // проходимся по правилам реплейсами
        word = word.replace(rules[0], '\u0292')
            .replace(rules[1], '').replace(rules[2], '')
            .replace(rules[3], '\u0268').replace(rules[4], '$1\u02B2');

        // а это для длинных гласных, если они есть
        var longs = word.match(rules[5]);
        if (longs) longs.forEach(function(e) {
            word = word.replace(e, e.slice(0, 1) + ':');
        });

        // заменяем одиночные буквы на символы транскрипции
        word.split('').forEach(function(w) {
            if (specTable[w]) word = word.replace(new RegExp(w, 'i'), specTable[w]);
        });
        
        // подчищаем йотацию у гласных á, ê, û при глухих согласных
        word = word.replace(/(?<=\u02B2)ja/, 'a').replace(/(?<=\u02B2)e/, 'ɛ')
        	.replace(/(?<=\u02B2)ʏ/, 'u');
        
        return '[' + word + ']';
    }

    $('.spz-ipa').each(function(n, e) {
        $(e).text(convert($(e).text()));
    });
});
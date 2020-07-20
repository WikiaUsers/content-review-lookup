//<syntaxhighlight lang="javascript">
const CyrillicRomanizerCore = function(text, map) {
    let intermediate = text.trim();
    for (let index = 0; index < map.length; index+=2) {
        intermediate = intermediate.split(map[index+1]).join(map[index]);
    }
    return intermediate;
};
const makeTemplate = function(){
    return [
        "a","а","A","А",
        "b","б","B","Б",
        "v","в","V","В",
        "g","г","G","Г",
        "g̀","ґ","G̀","Ґ",
        "d","д","D","Д",
        "ǵ","ѓ","Ǵ","Ѓ",
        "đ","ђ","Đ","Ђ",
        "e","е","E","Е",
        "ë","ё","Ë","Ё",
        "ê","є","Ê","Є",
        "ž","ж","Ž","Ж",
        "z","з","Z","З",
        "ẑ","ѕ","Ẑ","Ѕ",
        "i","и","I","И",
        "ì","і","Ì","I",
        "ï","ї","Ï","Ї",
        "j","й","J","Й",
        "ǰ","ј","J̌","Ј"
        ,"k","к","K","К",
        "l","л","L","Л",
        "l̂","љ","L̂","Љ",
        "m","м","M","М",
        "n","н","N","Н",
        "n̂","њ","N̂","Њ",
        "o","о","O","О",
        "p","п","P","П",
        "r","р","R","Р",
        "s","с","S","С",
        "t","т","T","Т",
        "ḱ","ќ","Ḱ","Ќ",
        "ć","ћ","Ć","Ћ",
        "u","у","U","У",
        "u","оу","U","ОУ",
        "ŭ","ў","Ŭ","Ў",
        "f","ф","F","Ф",
        "h","х","H","Х",
        "c","ц","C","Ц",
        "č","ч","Č","Ч",
        "d̂","џ","D̂","Џ",
        "š","ш","Š","Ш",
        "ŝ","щ","Ŝ","Щ",
        "ʺ","ъ","ʺ","Ъ",
        "y","ы","Y","Ы",
        "ʹ","ь","ʹ","Ь",
        "ě","ѣ","Ě","Ѣ",
        "è","э","È","Э",
        "û","ю","Û","Ю",
        "â","я","Â","Я",
        "c","һ","c","Һ",
        "’","’","’","’",
        "ô","ѡ","Ô","Ѡ",
        "ę","ѧ","Ę","Ѧ",
        "ję","ѩ","Ję","Ѩ",
        "ǎ","ѫ","Ǎ","Ѫ",
        "jǫ","ѭ","Jǫ","Ѭ",
        "ks","ѯ","Ks","Ѯ",
        "ps","ѱ","Ps","Ѱ",
        "f̀","ѳ","F̀","Ѳ",
        "ỳ","ѵ","Ỳ","Ѵ",
        "je","ѥ","Je","Ѥ",
        "ja","ꙗ","Ja","Ꙗ",
        "k","ҁ","K","Ҁ",
        'ü','Ү','Ü','ү',
        'Ź'.toLowerCase(),'З́'.toLowerCase(),'Ź','З́'];
};
const ISO9ATranscription = function(input){
    return CyrillicRomanizerCore(input, makeTemplate());
};
const ISO9BTranscription = function(input){
    const map = makeTemplate();
    const remaps = [
        "А", "а", "A", "а", "Б", "б", "B", "b", "В", "в", "V", "v", 
        "Г", "г", "G", "g", "Ѓ", "ѓ", "G`", "g`", "Ґ", "ґ", "G`", "g`", 
        "Д", "д", "D", "d", "Е", "е", "E", "e", "Ё", "ё", "Yo", "yo", 
        "Є", "є", "Ye", "ye", "Ж", "ж", "Zh", "zh", "З", "з", "Z", "z", 
        "S", "ѕ", "Z`", "z`", "И", "и", "I", "i", "Й", "й", "J", "j", 
        "J", "ј", "J", "j", "I", "і", "I", "i", "Ї", "ї", "Yi", "yi", 
        "К", "к", "K", "k", "Ќ", "ќ", "K`", "k`", "Л", "л", "L", "l", 
        "Љ", "љ", "L`", "l`", "М", "м", "M", "m", "Н", "н", "N", "n", 
        "Њ", "њ", "N`", "n`", "О", "о", "O", "о", "П", "п", "P", "p", 
        "Р", "р", "R", "r", "С", "с", "S", "s", "Т", "т", "T", "t", 
        "У", "у", "U", "u", "Ў", "ў", "U`", "u`", "Ф", "ф", "F", "f", 
        "Х", "х", "X", "x", "Ц", "ц", "Cz, C", "cz, с", "Ч", "ч", "Ch", 
        "ch", "Џ", "џ", "Dh", "dh", "Ш", "ш", "Sh", "sh", "Щ", "щ", "Shh", 
        "shh", "Ъ", "ъ", "A`", "``", "Ы", "ы", "Y`", "y`", "Ь", "ь", "`", 
        "`", "Э", "э", "E`", "e`", "Ю", "ю", "Yu", "yu", "Я", "я", "Ya", 
        "уа", "’", "’", "’", "’", "Ѣ", "ѣ", "Ye", "уе", "Ѳ", "ѳ", "Fh", 
        "fh", "Ѵ", "ѵ", "Yh", "yh", "Ѫ", "ѫ", "O`", "о`", "№", "№", "#", "#"];
    for (let index =0; index < remaps.length; index = index+4) {
        const cycap = remaps[0+index];
        const cylow = remaps[1+index];
        const lacap = remaps[2+index];
        const lalow = remaps[3+index];
        const a = map.indexOf(cycap);
        map[a-1] = lacap;
        const b = map.indexOf(cylow);
        map[b-1] = lalow;
    }
    return (CyrillicRomanizerCore(input, map)
        .split('Czi').join('Ci').split('Cze').join('Ce')
        .split('Czy').join('Cy').split('Czj').join('Cj')
        .split('czi').join('ci').split('cze').join('ce')
        .split('czy').join('cy').split('czj').join('cj'));
};
const makeRussianMap = function(){
    const map = makeTemplate();
    map[map.indexOf('Х')-1]='X';
    map[map.indexOf('х')-1]='x';
    map[map.indexOf('Щ')-1]="Šč";
    map[map.indexOf('щ')-1]='šč';
    map[map.indexOf('Ю')-1]='Ju';
    map[map.indexOf('ю')-1]='ju';
    map[map.indexOf('Я')-1]="Ja";
    map[map.indexOf('я')-1]='ja';
    map[map.indexOf('Ѳ')-1]='F';
    map[map.indexOf('ѳ')-1]='f';
    map[map.indexOf('Ѵ')-1]="I";
    map[map.indexOf('ѵ')-1]='i';
    return map;
};
const RussianTranscription = function(input) {
    return CyrillicRomanizerCore(input, makeRussianMap());
};
const UkrainianTranscription = function(input){ //This is the 2010 Ukranian government national standard. Yes, other standards exist. If you want them coded separately, they can be added separately. 
    const text = (" " + input + " ").split('-').join(' - ')
        .split(' Я').join(' Иа').split(' я').join(' иа')
        .split(' Ю').join(' Иу').split(' ю').join(' иу')
        .split(' Й').join(' И').split(' й').join(' и')
        .split(' Ї').join(' Иї').split(' ї').join(' иї')
        .split(' Є').join(' Ие').split(' є').join(' ие')
        .split('Зг').join('Зґг').split('зг').join('зґг')
        .split(' - ').join('-').trim();
    const map = makeTemplate();
    map[map.indexOf('Г')-1]="H";
    map[map.indexOf('г')-1]='h';
    map[map.indexOf('Ґ')-1]="G";
    map[map.indexOf('ґ')-1]='g';
    map[map.indexOf('Є')-1]="Ie";
    map[map.indexOf('є')-1]='ie';
    map[map.indexOf('И')-1]="Y";
    map[map.indexOf('и')-1]='y';
    map[map.indexOf('Ш')-1]="Sh";
    map[map.indexOf('ш')-1]='sh';
    map[map.indexOf('Щ')-1]="Shch";
    map[map.indexOf('щ')-1]='shch';
    const remaps = [
        "zh","ж","Zh","Ж",
        "i","і","I","I",
        "i","ї","I","Ї",
        "i","й","I","Й",
        "ts","ц","Ts","Ц",
        "kh","х","Kh","Х",
        "ch","ч","Ch","Ч",
        "-","ь","-","Ь",
        "iu","ю","Iu","Ю",
        "ia","я","Ia","Я"
    ];
    for (let i = 0; i < remaps.length; i+=2) {
        map[map.indexOf(remaps[i+1])-1]=remaps[i];
    }
    return CyrillicRomanizerCore(text, map);
} ;
const BelarusianTranscription = function(input){
    const map = makeRussianMap();
    map[map.indexOf('Г')-1]="H";
    map[map.indexOf('г')-1]='h';
    map[map.indexOf('Ґ')-1]="G";
    map[map.indexOf('ґ')-1]='g';
    map[map.indexOf('Щ')-1]="Š";
    map[map.indexOf('щ')-1]='š';
    map[map.indexOf('И')-1]="Y";
    map[map.indexOf('и')-1]='y';
    return CyrillicRomanizerCore(input, map);
} ;
const BCMSTranscription = function(input){
    const map = makeTemplate();
    map[map.indexOf('Љ')-1]="Lj";
    map[map.indexOf('љ')-1]='lj';
    map[map.indexOf('Њ')-1]="nj";
    map[map.indexOf('њ')-1]='Nj';
    map[map.indexOf('Џ')-1]="Dž";
    map[map.indexOf('џ')-1]='dž';
    map[map.indexOf('Ć')-1]="Ś";
    map[map.indexOf('ć')-1]='ś';
    return CyrillicRomanizerCore(input, map);
} ;
const BulgarianTranscription = function(input) {
    const map = makeTemplate();
    map[map.indexOf('Ж')-1]='Zh';
    map[map.indexOf('ж')-1]='zh';
    map[map.indexOf('Й')-1]='Y';
    map[map.indexOf('й')-1]='y';
    map[map.indexOf('Ц')-1]='Ts';
    map[map.indexOf('ц')-1]='ts';
    map[map.indexOf('Ч')-1]='Ch';
    map[map.indexOf('ч')-1]='ch';
    map[map.indexOf('Ш')-1]='Sh';
    map[map.indexOf('ш')-1]='ch';
    map[map.indexOf('Щ')-1]='Sht';
    map[map.indexOf('щ')-1]='cht';
    map[map.indexOf('Ъ')-1]='A';
    map[map.indexOf('ъ')-1]='a';
    map[map.indexOf('Ь')-1]='Y';
    map[map.indexOf('ь')-1]='y';
    map[map.indexOf('Ю')-1]='Yu';
    map[map.indexOf('ю')-1]='yu';
    map[map.indexOf('Я')-1]='Ya';
    map[map.indexOf('я')-1]='ya';
    return CyrillicRomanizerCore(
        (" " + input + " ").split('-').join(' - ').split(' България ').join(' Булгариа ').split('ия ').join('иа ').split('Ия ').join('Иа ').split(' - ').join('-').trim()
        , map);
};
const MacedonianTranscription = function(input) {
    const map = makeTemplate();
    map[map.indexOf('Ѫ')-1]='U';
    map[map.indexOf('ѫ')-1]='u';
    map[map.indexOf('Ў')-1]='U';
    map[map.indexOf('ў')-1]='u';
    map[map.indexOf('Ґ')-1]='G';
    map[map.indexOf('ґ')-1]='g';
    map[map.indexOf('Я')-1]='Ia';
    map[map.indexOf('я')-1]='ia';
    map[map.indexOf('Ѵ')-1]='Y';
    map[map.indexOf('ѵ')-1]='y';
    map[map.indexOf('Ё')-1]='E';
    map[map.indexOf('ё')-1]='e';
    map[map.indexOf('Э')-1]='E';
    map[map.indexOf('э')-1]='e';
    map[map.indexOf('Ж')-1]='Zh';
    map[map.indexOf('ж')-1]='zh';
    map[map.indexOf('И')-1]="I";
    map[map.indexOf('и')-1]='i';
    map[map.indexOf('Й')-1]="I";
    map[map.indexOf('й')-1]='i';
    map[map.indexOf('Ч')-1]="C";
    map[map.indexOf('ч')-1]='c';
    map[map.indexOf('Ч')-1]="C";
    map[map.indexOf('ч')-1]='c';
    map[map.indexOf('Ъ')-1]="Ie";
    map[map.indexOf('ъ')-1]='ie';
    map[map.indexOf('Ш')-1]="Sh";
    map[map.indexOf('ш')-1]='sh';
    map[map.indexOf('Щ')-1]="Shch";
    map[map.indexOf('щ')-1]='shch';
    map[map.indexOf('Ю')-1]="Iu";
    map[map.indexOf('ю')-1]='iu';
    map[map.indexOf('Ћ')-1]="D";
    map[map.indexOf('ћ')-1]='d';
    map[map.indexOf('Ћ')-1]="D";
    map[map.indexOf('ћ')-1]='d';
    map[map.indexOf('Ѕ')-1]="Dz";
    map[map.indexOf('ѕ')-1]='dz';
    map[map.indexOf('Ј')-1]="J";
    map[map.indexOf('ј')-1]='j';
    map[map.indexOf('Ј')-1]="J";
    map[map.indexOf('ј')-1]='j';
    map[map.indexOf('Ќ')-1]="Kj";
    map[map.indexOf('ќ')-1]='kj';
    map[map.indexOf('Љ')-1]="Lj";
    map[map.indexOf('љ')-1]='lj';
    map[map.indexOf('Њ')-1]="Nj";
    map[map.indexOf('њ')-1]='nj';
    map[map.indexOf('Џ')-1]="Dj";
    map[map.indexOf('џ')-1]='dj';
    map[map.indexOf('Є')-1]="Ie";
    map[map.indexOf('є')-1]='ie';
    map[map.indexOf('Ї')-1]="I";
    map[map.indexOf('ї')-1]='i';
    return CyrillicRomanizerCore(input, map);
};
const MongolianTranscription = function(input){
    const map = makeTemplate();
    map[map.indexOf('Е')-1]="Ye";
    map[map.indexOf('е')-1]='ye';
    map[map.indexOf('Ё')-1]="Yo";
    map[map.indexOf('ё')-1]='yo';
    map[map.indexOf('Ч')-1]="Ch";
    map[map.indexOf('ч')-1]='ch';
    map[map.indexOf('Щ')-1]="Sh";
    map[map.indexOf('щ')-1]='sh';
    map[map.indexOf('Ъ')-1]="I";
    map[map.indexOf('ъ')-1]='i';
    map[map.indexOf('Э')-1]='E';
    map[map.indexOf('э')-1]='e';
    map[map.indexOf('Ю')-1]='Yu';
    map[map.indexOf('ю')-1]='yu';
    map[map.indexOf('Я')-1]='Ya';
    map[map.indexOf('я')-1]='ya';
    const remaps = [
        "ž","ж","Ž","Ж",
        "i","й","I","Й",
        "kh","х","Kh","Х",
        "ts","ц","Ts","Ц",
        "i","ь","I","Ь"
    ];
    for (let i = 0; i < remaps.length; i+=2) {
        map[map.indexOf(remaps[i+1])-1]=remaps[i];
    }
    return CyrillicRomanizerCore(input, map);
} ;
//</syntaxhighlight>
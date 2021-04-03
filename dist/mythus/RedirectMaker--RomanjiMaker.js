//<syntaxhighlight lang="javascript">
const standardize = function(input){
    const hepburnCustoms = [
        "イィ","yi","イェ","ye","ウァ","wa","ウィ","wi","ウゥ","wu","ウェ","we","ウォ","wo","ウュ","wyu","ヴァ","va","ヴィ","vi","ヴ","vu","ヴェ","ve","ヴォ","vo","ヴャ","vya","ヴュ","vyu","ヴィェ","vye","ヴョ","vyo","キェ","kye","ギェ","gye","クァ","kwa","クィ","kwi","クェ","kwe","クォ","kwo","クヮ","kwa","グァ","gwa","グィ","gwi","グェ","gwe","グォ","gwo","グヮ","gwa","シェ","she","ジェ","je","スィ","si","ズィ","zi","チェ","che","ツァ","tsa","ツィ","tsi","ツェ","tse","ツォ","tso","ツュ","tsyu","ティ","ti","トゥ","tu","テュ","tyu","ディ","di","ドゥ","du","デュ","dyu","ニェ","nye","ヒェ","hye","ビェ","bye","ピェ","pye","ラ゜","la","リ゜","li","ル゜","lu","レ゜","le","ロ゜","lo","ファ","fa","フィ","fi","フェ","fe","フォ","fo","フャ","fya","フュ","fyu","フィェ","fye","フョ","fyo","ホゥ","hu","ミェ","mye","リェ","rye"];
    const hiragana = ["ぁ","あ","ぃ","い","ぅ","う","ぇ","え","ぉ","お", "か","が","き","ぎ","く","ぐ","け","げ","こ","ご","さ","ざ","し",
        "じ","す","ず","せ","ぜ","そ","ぞ","た","だ","ち","ぢ","っ","つ","づ","て","で","と","ど","な","に","ぬ","ね","の","は","ば","ぱ",
        "ひ","び","ぴ","ふ","ぶ","ぷ","へ","べ","ぺ","ほ","ぼ","ぽ","ま","み","む","め","も","ゃ","や","ゅ","ゆ","ょ","よ","ら","り","る",
        "れ","ろ","ゎ","わ","ゐ","ゑ","を","ん","ゔ","ゕ","ゖ", "わ゛","ゐ゛","ゑ゛","を゛"];
    const katakana = ["ァ","ア","ィ","イ","ゥ","ウ","ェ","エ","ォ","オ","カ","ガ","キ","ギ","ク","グ","ケ","ゲ","コ","ゴ","サ","ザ","シ",
        "ジ","ス","ズ","セ","ゼ","ソ","ゾ","タ","ダ","チ","ヂ","ッ","ツ","ヅ","テ","デ","ト","ド","ナ","ニ","ヌ","ネ","ノ","ハ","バ","パ",
        "ヒ","ビ","ピ","フ","ブ","プ","ヘ","ベ","ペ","ホ","ボ","ポ","マ","ミ","ム","メ","モ","ャ","ヤ","ュ","ユ","ョ","ヨ","ラ","リ","ル",
        "レ","ロ","ヮ","ワ","ヰ","ヱ","ヲ","ン","ヴ","ヵ","ヶ","ヷ","ヸ","ヹ","ヺ"];
    let intermediate = input.split('ゟ').join('より').split('\u309A').join('\u309C').split('\u3099').join('\u309B')
        .split('ヿ').join('コト').normalize('NFKC').split('ゝ').join('ヽ').split('ゞ').join('ヾ').split('ヾ').join('ヽ\u309B');
    for (let index = 0; index < hiragana.length; index++) {
        intermediate = intermediate.split(hiragana[index]).join(katakana[index]);
    }
    for (let index = 0; index < hepburnCustoms.length; index+=2) {
        intermediate = intermediate.split(hepburnCustoms[index]).join(hepburnCustoms[index+1]);
    }
    const diacriticFilter= [
        "カ\u309B","ガ","キ\u309B","ギ","ク\u309B","グ","ケ\u309B","ゲ","コ\u309B","ゴ","サ\u309B","ザ","シ\u309B","ジ","ス\u309B","ズ",
        "セ\u309B","ゼ","ソ\u309B","ゾ","タ\u309B","ダ","チ\u309B","ヂ","ツ\u309B","ヅ","テ\u309B","デ","ト\u309B","ド","ハ\u309B","バ",
        "ハ\u309C","パ","ヒ\u309B","ビ","ヒ\u309C","ピ","フ\u309B","ブ","フ\u309C","プ","ヘ\u309B","ベ","ヘ\u309C","ペ","ホ\u309B","ボ",
        "ホ\u309C","ポ","ワ\u309B","ヷ","ヰ\u309B","ヸ","ヱ\u309B","ヹ","ヲ\u309B","ヺ"
    ];
    for (let index = 0; index < diacriticFilter.length; index+=2) {
        intermediate = intermediate.split(diacriticFilter[index+1]).join(diacriticFilter[index]);
    }
    outerLoop:
    while (true) {
        const broken = intermediate.split('ヽ');
        if (broken.length==1) {
            break outerLoop;
        }
        const prev = broken[0];
        subLoop:
        for (let subIndex = prev.length-1; subIndex >=0; subIndex--) {
            const k = prev[subIndex];
            if (!(k=='\u309C')) {
                if (!(k=='\u309B')) {
                    const newCombined = prev + k + broken[1];
                    broken[0] = newCombined;
                    broken.splice(1,1);
                    intermediate = broken.join('ヽ');
                    continue outerLoop;
                }
            } 
        }
    }
    for (let index = 0; index < diacriticFilter.length; index+=2) {
        intermediate = intermediate.split(diacriticFilter[index]).join(diacriticFilter[index+1]);
    }
    return intermediate.normalize('NFKC');
};
 
const filterOnbiki = function(input){
    let result = input;
    loop:
    while (true) {
        const broken = result.split('ー');
        if (broken.length==1) {
            break loop;
        }
        const v = broken[0][broken[0].length-1];
        broken[0] = broken[0] + v + broken[1];
        broken.splice(1,1);
        result = broken.join('ー');
    }
    return result;
};
const filterSokoun = function(input) {
    let result = input;
    loop:
    while (true) {
        const broken = result.split('ッ');
        if (broken.length==1) {
            break loop;
        }
        const v = broken[1][0];
        broken[0] = broken[0] + v + broken[1];
        broken.splice(1,1);
        result = broken.join('ッ');
    }
    return result;
 
}
const NihonKureiVowels = function(input) {
    return input.split('aa').join('â').split('ii').join('î').split('uu').join('û').split('ee').join('ê').split('oo').join('ô');
}
const NihonKureiN = function(input) {
    return input.split("n'p").join('np').split("n'b").join('nb').split("n'd").join('nd').split("n'z").join('nz').split("n'g").join('ng')
        .split("n'w").join('nw').split("n'r").join('nr').split("n'm").join('nm').split("n'h").join('nh').split("n'n").join('nn')
        .split("n't").join('nt').split("n's").join('ns').split("n'k").join('nk');
}
const NihonShiki = function(input) {
    let result = standardize(input);
    const baseRomanjiMap = [
        ['kwa','くゎ', 'クヮ','ｸﾜ'], ['gwa','ぐゎ','グヮ','ｸ\uFF9Eﾜ'], ['n\'','ん','ン','ﾝ'], ['pya','ぴゃ','ピャ','ﾋﾟｬ'],
        ['pyu','ぴゅ','ピュ','ﾋﾟｭ'], ['pyo','ぴょ','ピョ','ﾋﾟｮ'], ['po','ぽ','ポ','ﾎﾟ'], ['pe','ぺ','ペ','ﾍﾟ'], ['pu','ぷ','プ','ﾌﾟ'],
        ['pi','ぴ','ピ','ﾋﾟ'],  ['pa', 'ぱ','パ','ﾊﾟ'], ['bya','びゃ','ビャ'], ['byu','びゅ','ビュ'], ['byo', 'びょ','ビョ'], 
        ['ba','ば','バ'], ['bi','び','ビ'], ['bu','ぶ','ブ'], ['be','べ','ベ'], ['bo','ぼ','ボ'], ['dya','ぢゃ','ヂャ'], 
        ['dyu','ぢゅ','ヂュ'], ['dyo','ぢょ','ヂョ'], ['zya','じゃ','ジャ'], ['zyu','じゅ','ジュ'], ['zyo','じょ','ジョ'], 
        ['gya','ぎゃ','ギャ'], ['gyu','ぎゅ','ギュ'], ['gyo','ぎょ','ギョ'], ['rya','りゃ','リャ'], ['ryu','りゅ','リュ'], 
        ['ryo','りょ','リョ'], ['mya','みゃ','ミャ'], ['myu','みゅ','ミュ'], ['myo','みょ','ミョ'], ['hya','ひゃ','ヒャ'], 
        ['hyu','ひゅ','ヒュ'], ['hyo','ひょ','ヒョ'], ['nya','にゃ','ニャ'], ['nyu','にゅ','ニュ'], ['nyo','にょ','ニョ'], 
        ['tya','ちゃ','チャ'], ['tyu','ちゅ','チュ'], ['tyo','ちょ','チョ'], ['sya','しゃ','シャ'], ['syu','しゅ','シュ'], 
        ['syo','しょ','ショ'], ['kya','きゃ','キャ'], ['kyu','きゅ','キュ'], ['kyo','きょ','キョ'], ['da','だ','ダ'], ['di','ぢ','ヂ'], 
        ['du','づ','ヅ'], ['de','で','デ'], ['do','ど','ド'], ['za','ざ','ザ'], ['zi','じ','ジ'], ['zu','ず','ズ'], ['ze','ぜ','ゼ'], 
        ['zo','ぞ','ゾ'], ['ga','が','ガ'], ['gi','ぎ','ギ'], ['gu','ぐ','グ'], ['ge','げ','ゲ'], ['go','ご','ゴ'], ['wa','わ','ワ','ヮ'], 
        ['wi','ゐ','ヰ'], ['we','ゑ','ヱ'], ['wo','を','ヲ'], ['ra','ら','ラ'], ['ri','り','リ'], ['ru','る','ル'], ['re','れ','レ'], 
        ['ro','ろ','ロ'], ['ma','ま','マ'], ['mi','み','ミ'], ['mu','む','ム'], ['me','め','メ'], ['mo','も','モ'], ['ha','は','ハ'], 
        ['hi','ひ','ヒ'], ['hu','ふ','フ'], ['he','へ','ヘ'], ['ho','ほ','ホ'], ['na','な','ナ'], ['ni','に','ニ'], ['nu','ぬ','ヌ'], 
        ['ne','ね','ネ'], ['no','の','ノ'], ['ta','た','タ'], ['ti','ち','チ'], ['tu','つ','ツ'], ['te','て','テ'], ['to','と','ト'], 
        ['sa','さ','サ'], ['si','し','シ'], ['su','す','ス'], ['se','せ','セ'], ['so','そ','ソ'], ['ka','か','カ','ヵ','ゕ'], 
        ['ki','き','キ'], ['ku','く','ク'], ['ke','け','ケ','ヶ','ゖ'], ['ko','こ','コ'], ['a','あ','ア'], ['i','い','イ'], 
        ['u','う','ウ'], ['e','え','エ','𛀀'], ['o','お','オ'], ['ya','や','ヤ'], ['yu','ゆ','ユ'], ['ye','𛀁','𛀁'], ['yo','よ','ヨ'], 
        [' ','・','･'], ['va','ヷ'], ['vi','ヸ'], ['vu','ゔ','ヴ'], ['ve','ヹ'], ['vo','ヺ']
    ];
    for (let index = 0; index < baseRomanjiMap.length; index++) {
        const row = baseRomanjiMap[index];
        result = result.split(row[2]).join(row[0]);
    }
    return NihonKureiVowels(NihonKureiN(filterSokoun(filterOnbiki(result))));
};
const KunreiShiki = function(input) {
    return NihonShiki(
        standardize(input)
            .split('ヲ').join('オ').split('ヱ').join('エ').split('ヰ').join('イ').split('ヅ').join('ズ').split('ヂ').join('ジ')
    );
};
const JSLRomanji = function(input) { 
    //Note: Screw the freaking pitch accents! The orignal data doesn't have it, so if you want to add it in after the fact, go right ahead. I don't care.
    let result = standardize(input);
    const baseRomanjiMap = [
        ['kwa','くゎ', 'クヮ','ｸﾜ'],
        ['gwa','ぐゎ','グヮ','ｸ\uFF9Eﾜ'],
        ['n̄','ん','ン','ﾝ'],
        ['pya','ぴゃ','ピャ','ﾋﾟｬ'],
        ['pyu','ぴゅ','ピュ','ﾋﾟｭ'],
        ['pyo','ぴょ','ピョ','ﾋﾟｮ'],
        ['po','ぽ','ポ','ﾎﾟ'],
        ['pe','ぺ','ペ','ﾍﾟ'],
        ['pu','ぷ','プ','ﾌﾟ'],
        ['pi','ぴ','ピ','ﾋﾟ'], 
        ['pa', 'ぱ','パ','ﾊﾟ'],
        ['bya','びゃ','ビャ'],
        ['byu','びゅ','ビュ'],
        ['byo', 'びょ','ビョ'],
        ['ba','ば','バ'],
        ['bi','び','ビ'],
        ['bu','ぶ','ブ'],
        ['be','べ','ベ'],
        ['bo','ぼ','ボ'],
        ['dya','ぢゃ','ヂャ'],
        ['dyu','ぢゅ','ヂュ'],
        ['dyo','ぢょ','ヂョ'],
        ['zya','じゃ','ジャ'],
        ['zyu','じゅ','ジュ'],
        ['zyo','じょ','ジョ'],
        ['gya','ぎゃ','ギャ'],
        ['gyu','ぎゅ','ギュ'],
        ['gyo','ぎょ','ギョ'],
        ['rya','りゃ','リャ'],
        ['ryu','りゅ','リュ'],
        ['ryo','りょ','リョ'],
        ['mya','みゃ','ミャ'],
        ['myu','みゅ','ミュ'],
        ['myo','みょ','ミョ'],
        ['hya','ひゃ','ヒャ'],
        ['hyu','ひゅ','ヒュ'],
        ['hyo','ひょ','ヒョ'],
        ['nya','にゃ','ニャ'],
        ['nyu','にゅ','ニュ'],
        ['nyo','にょ','ニョ'],
        ['tya','ちゃ','チャ'],
        ['tyu','ちゅ','チュ'],
        ['tyo','ちょ','チョ'],
        ['sya','しゃ','シャ'],
        ['syu','しゅ','シュ'],
        ['syo','しょ','ショ'],
        ['kya','きゃ','キャ'],
        ['kyu','きゅ','キュ'],
        ['kyo','きょ','キョ'],
        ['da','だ','ダ'],
        ['di','ぢ','ヂ'],
        ['du','づ','ヅ'],
        ['de','で','デ'],
        ['do','ど','ド'],
        ['za','ざ','ザ'],
        ['zi','じ','ジ'],
        ['zu','ず','ズ'],
        ['ze','ぜ','ゼ'],
        ['zo','ぞ','ゾ'],
        ['ga','が','ガ'],
        ['gi','ぎ','ギ'],
        ['gu','ぐ','グ'],
        ['ge','げ','ゲ'],
        ['go','ご','ゴ'],
        ['wa','わ','ワ','ヮ'],
        ['wi','ゐ','ヰ'],
        ['we','ゑ','ヱ'],
        ['wo','を','ヲ'],
        ['ra','ら','ラ'],
        ['ri','り','リ'],
        ['ru','る','ル'],
        ['re','れ','レ'],
        ['ro','ろ','ロ'],
        ['ma','ま','マ'],
        ['mi','み','ミ'],
        ['mu','む','ム'],
        ['me','め','メ'],
        ['mo','も','モ'],
        ['ha','は','ハ'],
        ['hi','ひ','ヒ'],
        ['hu','ふ','フ'],
        ['he','へ','ヘ'],
        ['ho','ほ','ホ'],
        ['na','な','ナ'],
        ['ni','に','ニ'],
        ['nu','ぬ','ヌ'],
        ['ne','ね','ネ'],
        ['no','の','ノ'],
        ['ta','た','タ'],
        ['ti','ち','チ'],
        ['tu','つ','ツ'],
        ['te','て','テ'],
        ['to','と','ト'],
        ['sa','さ','サ'],
        ['si','し','シ'],
        ['su','す','ス'],
        ['se','せ','セ'],
        ['so','そ','ソ'],
        ['ka','か','カ','ヵ','ゕ'],
        ['ki','き','キ'],
        ['ku','く','ク'],
        ['ke','け','ケ','ヶ','ゖ'],
        ['ko','こ','コ'],
        ['a','あ','ア'],
        ['i','い','イ'],
        ['u','う','ウ'],
        ['e','え','エ','𛀀'],
        ['o','お','オ'],
        ['ya','や','ヤ'],
        ['yu','ゆ','ユ'],
        ['ye','𛀁','𛀁'],
        ['yo','よ','ヨ'],
        [' ','・','･'],
        ['va','ヷ'],
        ['vi','ヸ'],
        ['vu','ゔ','ヴ'],
        ['ve','ヹ'],
        ['vo','ヺ']
    ];
    for (let index = 0; index < baseRomanjiMap.length; index++) {
        const row = baseRomanjiMap[index];
        result = result.split(row[2]).join(row[0]);
    }
    return filterSokoun(filterOnbiki(result));
};
const KunreiShikiLegacy = function(input) {
    let result = standardize(input).split('ヱ').join('エ').split('ヰ').join('イ');
    const baseRomanjiMap = [
        ['kwa','くゎ', 'クヮ','ｸﾜ'], ['gwa','ぐゎ','グヮ','ｸ\uFF9Eﾜ'], ['n\'','ん','ン','ﾝ'], ['pya','ぴゃ','ピャ','ﾋﾟｬ'],
        ['pyu','ぴゅ','ピュ','ﾋﾟｭ'], ['pyo','ぴょ','ピョ','ﾋﾟｮ'], ['po','ぽ','ポ','ﾎﾟ'], ['pe','ぺ','ペ','ﾍﾟ'], ['pu','ぷ','プ','ﾌﾟ'],
        ['pi','ぴ','ピ','ﾋﾟ'],  ['pa', 'ぱ','パ','ﾊﾟ'], ['bya','びゃ','ビャ'], ['byu','びゅ','ビュ'], ['byo', 'びょ','ビョ'], 
        ['ba','ば','バ'], ['bi','び','ビ'], ['bu','ぶ','ブ'], ['be','べ','ベ'], ['bo','ぼ','ボ'], ['dya','ぢゃ','ヂャ'], 
        ['dyu','ぢゅ','ヂュ'], ['dyo','ぢょ','ヂョ'], ['ja','じゃ','ジャ'], ['ju','じゅ','ジュ'], ['jo','じょ','ジョ'], 
        ['gya','ぎゃ','ギャ'], ['gyu','ぎゅ','ギュ'], ['gyo','ぎょ','ギョ'], ['rya','りゃ','リャ'], ['ryu','りゅ','リュ'], 
        ['ryo','りょ','リョ'], ['mya','みゃ','ミャ'], ['myu','みゅ','ミュ'], ['myo','みょ','ミョ'], ['hya','ひゃ','ヒャ'], 
        ['hyu','ひゅ','ヒュ'], ['hyo','ひょ','ヒョ'], ['nya','にゃ','ニャ'], ['nyu','にゅ','ニュ'], ['nyo','にょ','ニョ'], 
        ['cha','ちゃ','チャ'], ['chu','ちゅ','チュ'], ['cho','ちょ','チョ'], ['sha','しゃ','シャ'], ['shu','しゅ','シュ'], 
        ['sho','しょ','ショ'], ['kya','きゃ','キャ'], ['kyu','きゅ','キュ'], ['kyo','きょ','キョ'], ['da','だ','ダ'], ['di','ぢ','ヂ'], 
        ['du','づ','ヅ'], ['de','で','デ'], ['do','ど','ド'], ['za','ざ','ザ'], ['ji','じ','ジ'], ['zu','ず','ズ'], ['ze','ぜ','ゼ'], 
        ['zo','ぞ','ゾ'], ['ga','が','ガ'], ['gi','ぎ','ギ'], ['gu','ぐ','グ'], ['ge','げ','ゲ'], ['go','ご','ゴ'], ['wa','わ','ワ','ヮ'], 
        ['wi','ゐ','ヰ'], ['we','ゑ','ヱ'], ['wo','を','ヲ'], ['ra','ら','ラ'], ['ri','り','リ'], ['ru','る','ル'], ['re','れ','レ'], 
        ['ro','ろ','ロ'], ['ma','ま','マ'], ['mi','み','ミ'], ['mu','む','ム'], ['me','め','メ'], ['mo','も','モ'], ['ha','は','ハ'], 
        ['hi','ひ','ヒ'], ['fu','ふ','フ'], ['he','へ','ヘ'], ['ho','ほ','ホ'], ['na','な','ナ'], ['ni','に','ニ'], ['nu','ぬ','ヌ'], 
        ['ne','ね','ネ'], ['no','の','ノ'], ['ta','た','タ'], ['chi','ち','チ'], ['tsu','つ','ツ'], ['te','て','テ'], ['to','と','ト'], 
        ['sa','さ','サ'], ['shi','し','シ'], ['su','す','ス'], ['se','せ','セ'], ['so','そ','ソ'], ['ka','か','カ','ヵ','ゕ'], 
        ['ki','き','キ'], ['ku','く','ク'], ['ke','け','ケ','ヶ','ゖ'], ['ko','こ','コ'], ['a','あ','ア'], ['i','い','イ'], 
        ['u','う','ウ'], ['e','え','エ','𛀀'], ['o','お','オ'], ['ya','や','ヤ'], ['yu','ゆ','ユ'], ['ye','𛀁','𛀁'], ['yo','よ','ヨ'], 
        [' ','・','･'], ['va','ヷ'], ['vi','ヸ'], ['vu','ゔ','ヴ'], ['ve','ヹ'], ['vo','ヺ']
    ];
    for (let index = 0; index < baseRomanjiMap.length; index++) {
        const row = baseRomanjiMap[index];
        result = result.split(row[2]).join(row[0]);
    }
    return NihonKureiVowels(NihonKureiN(filterSokoun(filterOnbiki(result))));
};
 
const HebburnBase = function(input){
    return standardize(input).split('ヲ').join('オ').split('ヱ').join('エ').split('ヰ').join('イ');
};
const HebburnSokuon = function(input){
    let result = input;
    while (true) {
        const broken = result.split('ッ');
        if (broken.length==1) {
            break;
        }
        let c = broken[1][0];
        if (c=='c') {
            c = 't';
        }
        broken[0] = broken[0] + c + broken[1];
        broken.splice(1,1);
        result = broken.join('ッ');
    }
    return result;
};
const traditionalHepburnVowels = function(input) {
    return input.split('ou').join('oo').split('uu').join('ū').split('oo').join('ō');
};
const modifiedHepburnVowels = function(input) {
    return input.split('ou').join('oo').split('aa').join('ā').split('ee').join('ē').split('oo').join('ō').split('uu').join('ū');
};
const traditionalHepburnN = function(input) {
    return input.split('nb').join('mb').split('nm').join('mm').split('np').join('mp');
}
const traditionalHepburn = function(input, map) {
    let result = standardize(input);
    for (let index = 0; index < map.length; index++) {
        result = result.split(map[index][0]).join(map[index][1]);
    }
    return traditionalHepburnN(traditionalHepburnVowels(filterOnbiki(HebburnSokuon(result))));
};
const makeHepburnMap = function(){
    return [
        ["ピャ","pya"],["ピュ","pyu"],["ピョ","pyo"],["ギャ","gya"],["ギュ","gyu"],["ギョ","gyo"],["ジャ","ja"],["ジュ","ju"],
        ["ジョ","jo"],["ヂャ","ja"],["ヂュ","ju"],["ヂョ","jo"],["ビャ","bya"],["ビュ","byu"],["ビョ","byo"],['ン','n'],["パ","pa"],
        ["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"],["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],["ザ","za"],
        ["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],["ダ","da"],["ヂ","ji"],["ヅ","zu"],["デ","de"],["ド","do"],["バ","ba"],
        ["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],["リャ","rya"],["リュ","ryu"],["リョ","ryo"],["ミャ","mya"],["ミュ","myu"],
        ["ミョ","myo"],["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],["ヒャ","hya"],["ヒュ","hyu"],["ヒョ","hyo"],["ニャ","nya"],
        ["ニュ","nyu"],["ニョ","nyo"],["チャ","cha"],["チュ","chu"],["チョ","cho"],["シャ","sha"],["シュ","shu"],["ショ","sho"],
        ["キャ","kya"],["キュ","kyu"],["キョ","kyo"],["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],["マ","ma"],["ミ","mi"],
        ["ム","mu"],["メ","me"],["モ","mo"],["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],["ナ","na"],["ニ","ni"],
        ["ヌ","nu"],["ネ","ne"],["ノ","no"],["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],["サ","sa"],["シ","shi"],
        ["ス","su"],["セ","se"],["ソ","so"],["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],["ア","a"],["イ","i"],["ウ","u"],
        ["エ","e"],["オ","o"],["ヤ","ya"],["ユ","yu"],["ヨ","yo"],["ワ","wa"],["ヰ","i"],["ヱ","e"],["ヲ","o"]
    ];
};
const Hepburn1 = function(input) {
    const map = makeHepburnMap();
    for (let index = 0; index < map.length; index++) {
        if (map[index][1]=='クヮ') {
            map[index][0]='kuwa';
        }
        if (map[index][1]=='ヅ') {
            map[index][0]='du';
        }
        if (map[index][1]=='ズ') {
            map[index][0]='du';
        }
        if (map[index][0]=='ツ') {
            map[index][1]='tsz';
        }
        if (map[index][0]=='ス') {
            map[index][1]='sz';
        }
        if (map[index][1]=='エ') {
            map[index][0]='ye';
        }
        if (map[index][1]=='ヱ') {
            map[index][0]='ye';
        }
        if (map[index][1]=='キャ') {
            map[index][0]='kya';
        }
        if (map[index][1]=='キョ') {
            map[index][0]='kiyo';
        }
        if (map[index][1]=='キュ') {
            map[index][0]='kiu';
        }
    }
    return traditionalHepburn(input, map);
};
const Hepburn2 = function(input) {
    const map = makeHepburnMap();
    for (let index = 0; index < map.length; index++) {
        if (map[index][1]=='クヮ') {
            map[index][0]='kuwa';
        }
        if (map[index][1]=='ヅ') {
            map[index][0]='dzu';
        }
        if (map[index][1]=='ズ') {
            map[index][0]='dzu';
        }
        if (map[index][1]=='エ') {
            map[index][0]='ye';
        }
        if (map[index][1]=='ヱ') {
            map[index][0]='ye';
        }
        if (map[index][1]=='キャ') {
            map[index][0]='kya';
        }
        if (map[index][1]=='キョ') {
            map[index][0]='kiyo';
        }
        if (map[index][1]=='キュ') {
            map[index][0]='kiu';
        }
    }
    return traditionalHepburn(input, map);
};
const Hepburn3 = function(input) {
    return traditionalHepburn(input, makeHepburnMap());
};
const HepburnMod = function(input) {
    const map = makeHepburnMap();
    for (let index = 0; index < map.length; index++) {
        if (map[index][1]=='ン') {
            map[index][0]="n'";
        }
    }
    let result = HebburnBase(input);
    for (let index = 0; index < map.length; index++) {
        result = result.split(map[index][0]).join(map[index][1]);
    }
    return NihonKureiN(modifiedHepburnVowels(filterOnbiki(HebburnSokuon(result))));
};
 
const HepburnPassport = function(input) {
    return Hepburn3(input).split('ō').join('oh');
};
//</syntaxhighlight>
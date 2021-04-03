//<syntaxhighlight lang="javascript">
const massModify = function(a, func) {
    if (a===null) {
        return null;
    }
    const modified = func(a.val);
    const b = {
       val: a.val,
       next: massModify(a.next, func)
    };
    if (modified===a.val) {
        return b;
    }
    return {
        val: modified,
        next: b
    };
};
const kanaMap = (function(){
    const result = [];
	const maps = [
	    '+', 'ッ', '-', 'ー', ' ', '・', 'n', 'ン',
	    'kwa', 'クヮ', 'kwi', 'クィ', 'kwe', 'クェ', 'kwo', 'クォ',
	    'gwa', 'グヮ', 'gwi', 'グィ', 'gwe', 'グェ', 'gwo', 'グォ',
	    'a', 'ア', 'i', 'イ', 'u', 'ウ', 'e', 'エ', 'o', 'オ',
	    'ka', 'カ', 'ki', 'キ', 'ku', 'ク', 'ke', 'ケ', 'ko', 'コ',
	    'ga', 'ガ', 'gi', 'ギ', 'gu', 'グ', 'ge', 'ゲ', 'go', 'ゴ',
		'kya', 'キャ', 'kyu', 'キュ', 'kyo', 'キョ', 'kye','キェ', 'gye','ギェ', 'gya', 'ギャ', 'gyu', 'ギュ', 'gyo', 'ギョ',
		"sa", "サ", 'si', 'スィ',  "su", "ス", "so", "セ", "se", "ソ", 
		"za", "ザ", 'zi', 'ズィ', "zu", "ズ", 'ze','ゼ', "zo", "ゼ", 
		"shi", "シ", 'she', 'シェ', 'sha', 'シャ', 'shu', 'シュ', 'sho', 'ショ', 
		'ja', 'ジャ', "ji", "ジ", 'ju', 'ジュ', 'je', 'ジェ', 'jo', 'ジョ',
		'ta','タ','ti','ティ','tu','トゥ','te','テ','to','ト','tya','テャ','tyu','テュ','tyo','テョ',
		'cha','チャ','che','チェ','chi','チ','chu','チュ','cho','チョ',
		'tsa','ツァ','tsi','ツィ','tsu','ツ','tse','ツェ','tso','ツォ',
		'da','ダ','di','ディ','du','ドゥ','de','デ','do','ド','dya','デャ','dyu','デュ','dyo','デョ',
		'na','ナ','ni','ニ','nu','ヌ','ne','ネ','no','ノ','nya','ニャ','nyu','ニュ','nyo','ニョ','nye','ニェ',
		'ha','ハ','hi','ヒ','hu','ホゥ','he','ヘ','ho','ホ','hya','ヒャ','hyu','ヒュ','hyo','ヒョ','hye','ヒェ',
		'fa','ファ','fi','フィ','fu','フ','fe','フェ','fo','フォ','fya','フャ','fyu','フュ','fyo','フョ','fye','フィェ',
		'ba','バ','bi','ビ','bu','ブ','be','ベ','bo','ボ','bya','ビャ','byu','ビュ','byo','ビョ','bye','ビェ',
		'pa','パ','pi','ピ','pu','ブ','pe','ペ','po','ポ','pya','ピャ','pyu','ピュ','pyo','ピョ','pye','ピェ',
		'ma','マ','mi','ミ','mu','ム','me','メ','mo','モ','mya','ミャ','myu','ミュ','myo','ミョ','mye','ミェ',
		'ya','ヤ','yi','イィ','yu','ユ','ye','イェ','yo','ヨ',
		'ra','ラ','ri','リ','ru','ル','re','レ','ro','ロ','rya','リャ','ryu','リュ','ryo','リョ','rye','リェ',
		'la','ラ','li','リ','lu','ル','le','レ','lo','ロ','lya','リャ','lyu','リュ','lyo','リョ','lye','リェ',
		'wa','ワ','wi','ヰ','wu','ウゥ','we','ヱ','wo','ヲ','wyu','ウュ',
		'va','ヷ','vi','ヸ','vu','ヴ','ve','ヹ','vo','ヺ','vya','ヴャ','vyu','ヴュ','vyo','ヴョ','vye','ヴィェ'
	];
	for (let index = 0; index < maps.length; index+=2) {
		result[maps[index]] = maps[index+1];
	}
	return result;
})();
const kanaLookup = function(input) {
    return (kanaMap[input] || input);
};
const secondaryWidthMap = {
    '¢': '\uFFE0', '£': '\uFFE1', '¬': '\uFFE2', '¯': '\uFFE3', '¦': '\uFFE4', '¥': '\uFFE5', '₩': '\uFFE6', '|': '\uFFE8', '\u25A0': '\uFFED', '\u25CB': '\uFFEE', ' ': ' ', "ァ":"ｧ","ア":"ｱ","ィ":"ｨ","イ":"ｲ","ゥ":"ｩ","ウ":"ｳ","ェ":"ｪ","エ":"ｴ","ォ":"ｫ","オ":"ｵ","カ":"ｶ","ガ":"ｶﾞ","キ":"ｷ","ギ":"ｷﾞ","ク":"ｸ","グ":"ｸﾞ","ケ":"ｹ","ゲ":"ｹﾞ"
};
const convertWidth = function(input) {
	const setA = [""];
	const shift0 = 0xFF00 - 0x20;
	const shift1 = 0xFFE9 - 0x2190;
	const shiftKana = 0xFFE9 - 0x2190;
	const fullWidthKana = ["コ", "ゴ", "サ", "ザ", "シ", "ジ", "ス", "ズ", "セ", "ゼ", "ソ", "ゾ", "タ", "ダ", "チ", "ヂ", "ツ", "ヅ", "テ", "デ", "ト", "ド", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "バ", "パ", "ヒ", "ビ", "ピ", "フ", "ブ", "プ", "ヘ", "ベ", "ペ", "ホ", "ボ", "ポ", "マ", "ミ", "ム", "メ", "モ", "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン", "ヴ", "ヷ", "ヺ", "・", "ー", "ッ", "\u3099", "\u309A", "\u309B", "\u309C",
    'ᄀ','ᄁ','ᄂ','ᄃ','ᄄ','ᄅ','ᄆ','ᄇ','ᄈ','ᄉ','ᄊ','ᄋ','ᄌ','ᄍ','ᄎ','ᄏ','ᄐ','ᄑ','ᄒ',
    'ᅡ','ᅢ','ᅣ','ᅤ','ᅥ','ᅦ','ᅧ','ᅨ','ᅩ','ᅪ','ᅫ','ᅬ','ᅭ','ᅮ','ᅯ','ᅰ','ᅱ','ᅲ','ᅳ','ᅴ','ᅵ',
    'ᆨ','ᆩ','ᆪ','ᆫ','ᆬ','ᆭ','ᆮ','ᆯ','ᆰ','ᆱ','ᆲ','ᆳ','ᆴ','ᆵ','ᆶ','ᆷ','ᆸ','ᆹ','ᆺ','ᆻ','ᆼ','ᆽ','ᆾ','ᆿ','ᇀ','ᇁ','ᇂ'
 
	];
	const halfWidthKana = ["ｺ", "ｺﾞ", "ｻ", "ｻﾞ", "ｼ", "ｼﾞ", "ｽ", "ｽﾞ", "ｾ", "ｾﾞ", "ｿ", "ｿﾞ", "ﾀ", "ﾀﾞ", "ﾁ", "ﾁﾞ", "ﾂ", "ﾂﾞ", "ﾃ", "ﾃﾞ", "ﾄ", "ﾄﾞ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾊﾞ", "ﾊﾟ", "ﾋ", "ﾋﾞ", "ﾋﾟ", "ﾌ", "ﾌﾞ", "ﾌﾟ", "ﾍ", "ﾍﾞ", "ﾍﾟ", "ﾎ", "ﾎﾞ", "ﾎﾟ", "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ｬ", "ﾔ", "ｭ", "ﾕ", "ｮ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", "ﾜ", "ｦ", "ﾝ", "ｳﾞ", "ﾜﾞ", "ｦﾞ","･","ｰ","ｯ",  "ﾞ","ﾟ",  "ﾞ","ﾟ",
'ﾡ','ﾢ','ﾤ','ﾧ','ﾨ','ﾩ','ﾱ','ﾲ','ﾳ','ﾵ','ﾶ','ﾷ','ﾸ','ﾹ','ﾺ','ﾻ','ﾼ','ﾽ','ﾾ',
'ￂ','ￃ','ￄ','ￅ','ￆ','ￇ','ￊ','ￋ','ￌ','ￍ','ￎ','ￏ','ￒ','ￓ','ￔ','ￕ','ￖ','ￗ','ￚ','ￛ','ￜ',
'ﾡ','ﾢ','ﾣ','ﾤ','ﾥ','ﾦ','ﾧ','ﾩ','ﾪ','ﾫ','ﾬ','ﾭ','ﾮ','ﾯ','ﾰ','ﾱ','ﾲ','ﾴ','ﾵ','ﾶ','ﾷ','ﾸ','ﾺ','ﾻ','ﾼ','ﾽ','ﾾ'
	];
	let intermediate = input;
	for (let index = 0; index < fullWidthKana.length; index++) {
	    if (intermediate.indexOf(fullWidthKana[index]) > -1) {
	        intermediate = intermediate.split(fullWidthKana[index]).join(halfWidthKana[index]);
	    }
	}
	return intermediate.split('').map(function(c){
		const charCode = c.charCodeAt(0);
		if (charCode>=0x2190 &&  charCode<0x2194) {
			return String.fromCharCode(charCode + shift1);
		}
		if (charCode>0x20 &&  charCode<0x7F) {
			return String.fromCharCode(charCode + shift0);
		}
	    return secondaryWidthMap[c] || c;
	}).join("");
};
const processIndividualKanaLine = function(kana, input) {
	const baseForm = kana.slice(0, kana.length);
	const internalResults = [];//new Array(1);
	internalResults[0] = [];
	for (let index = 0; index < kana.length; index++) {
		internalResults[0][index] = kanaLookup(kana[index]);
	}
	const makeDerivative = function(modifications){
		const prevCount = internalResults.length;
		loop0:
		for (let index = 0; index < prevCount; index++) {
			let shouldCopy = false;
			const oldLine = internalResults[index];
			loop1:
			for (let indexA = 0; indexA < modifications.length; indexA++) {
				if (kana.indexOf(modifications[indexA].key) > -1) {
					shouldCopy = true;
					break loop1;
				}
			}
			if (shouldCopy) {
				let x = oldLine.slice(0, oldLine.length);
				cellLoop:
				for (let cellIndex = 0; cellIndex < kana.length; cellIndex++) {
					modLoop:
					for (let modIndex = 0; modIndex < modifications.length; modIndex++) {
						if (kana[cellIndex]==modifications[modIndex].key) {
							x[cellIndex]=modifications[modIndex].val;
						}
					}
				}
				internalResults[internalResults.length] = x;
			}
		}
	};
	makeDerivative([
		{key: 'va', val: 'ヴァ'},
		{key: 'vi', val: 'ヴィ'},
		{key: 've', val: 'ヴェ'},
		{key: 'vo', val: 'ヴォ'}
	]);
	makeDerivative([
		{key: 'wi', val: 'ウィ'},
		{key: 'wu', val: 'ウゥ'},
		{key: 'we', val: 'ウェ'},
		{key: 'wo', val: 'ウォ'}
	]);
	makeDerivative([
		{key: 'wi', val: 'ワィ'},
		{key: 'wu', val: 'ワゥ'},
		{key: 'we', val: 'ワェ'},
		{key: 'wo', val: 'ワォ'}
	]);
	makeDerivative([
		{key: 'ji', val: 'ヂ'},
		{key: 'ja', val: 'ヂャ'},
		{key: 'ju', val: 'ヂュ'},
		{key: 'jo', val: 'ヂョ'},
		{key: 'zu', val: 'ヅ'}
	]);
	makeDerivative([
		{key: 'di', val: 'ヂ'},
		{key: 'du', val: 'ヅ'}
	]);
	makeDerivative([
		{key: ' ', val: ' '}
	]);
	makeDerivative([
		{key: 'la', val: 'ラ\u309C'},
		{key: 'li', val: 'リ\u309C'},
		{key: 'lu', val: 'ル\u309C'},
		{key: 'le', val: 'レ\u309C'},
		{key: 'lo', val: 'ロ\u309C'},
		{key: 'lya', val: 'リ\u309Cャ'},
		{key: 'lyu', val: 'リ\u309Cュ'},
		{key: 'lyo', val: 'リ\u309Cョ'},
		{key: 'lye', val: 'リ\u309Cェ'}
	]);
	for (let index = 0; index < internalResults.length; index++) {
		internalResults[index] = internalResults[index].join("");
	}
	const stringMod = function(targets, replacements) {
		const prevCount = internalResults.length;
		for (let index = 0; index < prevCount; index++) {
			const x = internalResults[index];
			kLoop:
			for (let targetIndexA = 0; targetIndexA < targets.length; targetIndexA++) {
				if (x.indexOf(targets[targetIndexA]) > -1) {
					let q = internalResults[index];
					pLoop:
					for (let targetIndexB = 0; targetIndexB < targets.length; targetIndexB++) {
						q = q.split(targets[targetIndexB]).join(replacements[targetIndexB]);
					}
					internalResults[internalResults.length] = q;
					break kLoop;
				}
			}
		}
	};
	stringMod(
		["\u309B", "\u309C"],
		["\u3099", "\u309A"] 
	);
	stringMod(
		["コト"], 
		["ヿ"]
	);
	stringMod(
		["・"], 
		[" "]
	);
	stringMod(
		["･"], 
		[" "]
	);
	stringMod(
		["ァ", "ィ", "ゥ",  "ェ", "ォ", "ャ", "ュ", "ョ", 'ヮ', 'ヵ', 'ヶ'],
		["ア", "イ", "ウ", "エ", "オ", "ヤ", "ユ", "ヨ", 'ワ', 'カ', 'ケ']
	);
	for (let index = 0; index < internalResults.length; index++) {
        input.ptr = {val: internalResults[index], next:input.ptr};
	}
	return input;
};
const legacyHangulConvert = function(input) {
    const defaultHangul = ['\u1100','\u11A8','\u11AA','\u1102','\u11AB','\u1114','\u11FF','\u1115','\u11C6','\u115B',
        '\u11C7','\u11C8','\u115C','\u11AC','\u115D','\u11AD','\u1103','\u11AE','\u1104','\uD7CD','\u1105','\u11AF',
        '\uA964','\u11B0','\u11CC','\uA966','\u11CE','\uA968','\u11B1','\uA969','\u11B2','\u11D3','\uA96C','\u11B3',
        '\u11D7','\u11B4','\u11B5','\u111A','\u11B6','\u11D9','\u1106','\u11B7','\u111C','\u11DC','\uA971','\u11DD',
        '\u11DF','\u111D','\u11E2','\u1107','\u11B8','\u111E','\u1120','\uD7E3','\u1108','\uD7E6','\u1121','\u11B9',
        '\u1122','\u1123','\uD7E7','\u1127','\uD7E8','\u1129','\u112B','\u11E6','\u112C','\u1109','\u11BA','\u112D',
        '\u11E7','\u112E','\u112F','\u11E8','\u1132','\u11EA','\u110A','\u11BB','\u1136','\uD7EF','\u1140','\uD7EB',
        '\u110B','\u11BC','\u114C','\u11F0','\u11F1','\u11F2','\u110C','\u11BD','\u110D','\uD7F9','\u11BE','\u110E',
        '\u11BF','\u110F','\u11C0','\u1110','\u11C1','\u1111','\u1157','\u11F4','\u11C2','\u1112','\u1158','\u1159',
        '\u11F9','\u1161','\u1162','\u1163','\u1164','\u1165','\u1166','\u1167','\u1168','\u1169','\u116A','\u116B',
        '\u116C','\u116D','\u1184','\u1185','\u1188','\u116E','\u116F','\u1170','\u1171','\u1172','\u1191','\u1192',
        '\u1194','\u1173','\u1174','\u1175','\u119E','\u11A1'];
    const legacyHangul =  ['\u3131','\u3131','\u3133','\u3134','\u3134','\u3165','\u3165','\u3166','\u3166','\u3167',
        '\u3167','\u3168','\u3135','\u3135','\u3136','\u3136','\u3137','\u3137','\u3138','\u3138','\u3139','\u3139',
        '\u313A','\u313A','\u3169','\u316A','\u316A','\u313B','\u313B','\u313C','\u313C','\u316B','\u313D','\u313D',
        '\u316C','\u313E','\u313F','\u3140','\u3140','\u316D','\u3141','\u3141','\u316E','\u316E','\u316F','\u316F',
        '\u3170','\u3171','\u3171','\u3142','\u3142','\u3172','\u3173','\u3173','\u3143','\u3143','\u3144','\u3144',
        '\u3174','\u3175','\u3175','\u3176','\u3176','\u3177','\u3178','\u3178','\u3179','\u3145','\u3145','\u317A',
        '\u317A','\u317B','\u317C','\u317C','\u317D','\u317D','\u3146','\u3146','\u317E','\u317E','\u317F','\u317F',
        '\u3147','\u3147','\u3181','\u3181','\u3182','\u3183','\u3148','\u3148','\u3149','\u3149','\u314A','\u314A',
        '\u314B','\u314B','\u314C','\u314C','\u314D','\u314D','\u3184','\u3184','\u314E','\u314E','\u3185','\u3186',
        '\u3186','\u314F','\u3150','\u3151','\u3152','\u3153','\u3154','\u3155','\u3156','\u3157','\u3158','\u3159',
        '\u315A','\u315B','\u3187','\u3188','\u3189','\u315C','\u315D','\u315E','\u315F','\u3160','\u318A','\u318B',
        '\u318C','\u3161','\u3162','\u3163','\u318D','\u318E'];
    for (let index = 0; index < defaultHangul.length; index++) {
        if (input==defaultHangul[index]) {
            return legacyHangul[index];
        }
    }
    return input;
};
const filterHardToTypeDiacritics = function(input){
    let ptr = input.ptr;
    while (ptr!=null) {
        const old = ptr.val;
        let filtered = old.split('æ').join('ae').split("À").join('A').split("Á").join('A').split("Â").join('A').split("Ã").join('A')
            .split("Ä").join('A').split("Å").join('A').split('Æ').join('AE').split('Ç').join('C').split('È').join('E').split('É').join('E')
            .split('Ê').join('E').split('Ë').join('E').split('Ì').join('I').split('Í').join('I').split('Î').join('I').split('Ï').join('I')
            .split('Ñ').join('N').split('Ò').join('O').split('Ó').join('O').split('Ô').join('O').split('Õ').join('O').split('Ö').join('O')
            .split('Ø').join('O').split('Ù').join('U').split('Ú').join('U').split('Û').join('U').split('Ü').join('U').split('Ý').join('Y')
            .split('à').join('a').split('á').join('a').split('â').join('a').split('ã').join('a').split('ä').join('a').split('å').join('a')
            .split('ç').join('c').split('è').join('e').split('é').join('e').split('ê').join('e').split('ë').join('e').split('ñ').join('n')
            .split('ì').join('i').split('í').join('i').split('î').join('i').split('ï').join('i').split('ò').join('o').split('ó').join('o')
            .split('ô').join('o').split('õ').join('o').split('ö').join('o').split('ø').join('o').split('ÿ').join('y').split('ý').join('y')
            .split('ù').join('u').split('ú').join('u').split('û').join('u').split('ü').join('u').split('Ǝ').join('E').split('ǝ').join('e')
            .split('İ').join('I').split('ı').join('i').split('Ŋ').join('NG').split('ŋ').join('ng').split('Œ').join('OE')
            .split('œ').join('oe');
        const derivatives = [
            ["Á","À","Ȧ","Â","Ä","Ǟ","Ǎ","Ă","Ā","Ã","Å","Ǻ"], ['A'],
            ["á", "à", "ȧ", "â", "ä", "ǟ", "ǎ", "ă", "ā", "ã", "å", "ǻ"], ['a'],
            ['Ǽ','Ǣ'],['AE'],   ['ǽ','ǣ'],['ae'],   ["Ć", "Ċ", "Ĉ", "Č"], ['C'],    ["ć", "ċ", "ĉ", "č"], ['c'],
            ["Ď", "Ḍ", "Ḑ", "Ḓ"], ['D'],    ["ď", "ḍ", "ḑ", "ḓ"], ['d'],
            ["É", "È", "Ė", "Ê", "Ë", "Ě", "Ĕ", "Ē", "Ẽ", "Ẹ", "\u1EB8"], ['E'], //DO NOT UNDO THAT ESCAPE! BAD THINGS WILL HAPPEN.
            ["é", "è", "ė", "ê", "ë", "ě", "ĕ", "ē", "ẽ", "ẹ"],['e'],
            ['Ǵ','Ġ','Ĝ','Ǧ','Ğ','G̃','Ģ'], ['G'],
            ['ǵ','ġ','ĝ','ǧ','ğ','g̃','ģ'],['g'],
            ['Ĥ','Ḥ'],['H'],    ['ĥ','ḥ'],['h'],
            ["Í", "Ì", "İ", "Î", "Ï", "Ǐ", "Ĭ", "Ī", "Ĩ", "Ị"],['I'],
            ["í", "ì", "i", "î", "ï", "ǐ", "ĭ", "ī", "ĩ", "ị"],['i'],
            ['Ĵ'],['J'],['ĵ'],['j'],    ['Ķ','Ǩ'],['K'], ['ķ','ǩ'],['k'],
            ['Ĺ', 'Ļ', 'Ľ', 'Ŀ', 'Ḽ'], ['L'], ['ĺ', 'ļ', 'ľ', 'ŀ', 'ḽ'],['l'],
            ['M̂', 'M̄'],['M'],  ['m̂', 'm̄'],['m'],
            ['ʼN', 'Ń',   'N̂', 'Ṅ',  'N',   'Ň',  'N̄', 'Ñ', 'Ņ', 'Ṋ'],['N'],
            ['ŉ', 'ń', 'n̂',
            'ṅ', 
            'n̈',
            'ň',
            'n̄',
            'ñ',
            'ņ','ṋ'],['n'] ,
            ['Ó', 'Ò', 'Ȯ', 'Ȱ', 'Ô', 'Ö', 'Ȫ', 'Ǒ', 'Ŏ', 'Ō', 'Õ', 'Ȭ', 'Ő', 'Ọ', 'Ǿ', 'Ơ'], ['O'],
            ['ó', 'ò', 'ô', 'ȯ', 'ȱ', 'ö', 'ȫ', 'ǒ', 'ŏ', 'ō', 'õ', 'ȭ', 'ő', 'ọ', 'ǿ', 'ơ'], ['o'],
            ['P̄'],['P'],['p̄'],['p'],
            ['Ŕ', 'Ř', 'Ŗ'],['R'], ['ŕ', 'ř', 'ŗ'],['r'],
            ['Ś', 'Ŝ', 'Ṡ', 'Š', 'Ș', 'Ṣ'],['S'], ['ś', 'ŝ', 'ṡ', 'š', 'ş', 'ṣ'],['s'],
            ['Ť', 'Ț', 'Ṭ', 'Ṱ'],['T'], ['ť', 'ț', 'ṭ', 'ṱ'], ['t'],
            ['Ú', 'Ù', 'Û', 'Ü', 'Ǔ', 'Ŭ', 'Ū', 'Ũ', 'Ű', 'Ů', 'Ụ'],['U'],
            ['ú', 'ù', 'û', 'ü', 'ǔ', 'ŭ', 'ū', 'ũ', 'ű', 'ů', 'ụ'],['u'],
            ['Ẃ', 'Ẁ', 'Ŵ', 'Ẅ'],['W'], ['ẃ', 'ẁ', 'ŵ', 'ẅ'],['w'],
            ['Ý', 'Ỳ', 'Ŷ', 'Ÿ', 'Ȳ', 'Ỹ'],['Y'], ['ý', 'ỳ', 'ŷ', 'ÿ', 'ȳ', 'ỹ'],['y'],
            ['Ź', 'Ż', 'Ž', 'Ẓ'],['Z'],['ź', 'ż', 'ž', 'ẓ'],['z']
        ];
        for  (let di = 0; di < derivatives.length; di+=2) {
            const qw = derivatives[di];
            const re = derivatives[di+1][0];
            for (let si = 0; si < qw.length; si++) {
                filtered = filtered.split(qw[si]).join(re);
            }
        }
        const broken = filtered.split('');
        for (let index = 0; index < broken.length; index++) {
            const cc = broken[index].charCodeAt(0);
            if (cc >= 0x0300) {
                if (cc < 0x0340) {
                    broken[index]="";
                }
            }
        }
        const consolidated = broken.join('');
        if (!(old==consolidated)) {
            input.ptr = {val: consolidated, next:input.ptr};
        }
        ptr = ptr.next;
    }
};
const hangulBreaker = function(input) {
	const syllable = input.charCodeAt(0);
	const sbase = 0xAC00;
	if (syllable < sbase ) {
		return input;
	}
	const speak = 0xD7A4;
	if (syllable > speak ) {
		return input;
	}
	const lbase = 0x1100;
	const vbase = 0x1161;
	const tbase = 0x11A7;
	const lcount = 19;
	const vcount = 21;
	const tcount = 28;
	const ncount = vcount*tcount;
	const scount = lcount*ncount;
	const sindex = syllable - sbase;
	const lindex = Math.floor(sindex / ncount);
	const vindex = Math.floor((sindex % ncount) / tcount);
	const tindex = sindex % tcount;
	const char0 = lindex + lbase;
	const char1 = vindex + vbase;
	const char2 = tindex + tbase;
	const k = String.fromCharCode(char0) + String.fromCharCode(char1);
	if (tindex > 0) {
		return (k + String.fromCharCode(char2));
	}
	return k;
};
 
const hangulComposeSingle = function(input){
    let result = input;
    kLoop:
    while (true) {
        fLoop:
        for (let index = 0; index < result.length-1; index++) {
            const id = result.charCodeAt(index);
            if (id >= 0x1100) {
                if (id < 0x1113) {
                    const id2 = result.charCodeAt(index+1);
                    if (id2 >0x1160) {
                        if (id2 < 0x1176) {
                            let initial = 44032 + ((id-0x1100)*588) + ((id2-0x1161)*28);
                            if (index < result.length-2) {
                                const id3 = result.charCodeAt(index+2);
                                if (id3 >= 0x11A8) {
                                    if (id3 <= 0x11C2) {
                                        initial = initial + (id3-0x11A7);
                                        result = result.split(
                                            result[index] + result[index+1] + result[index+2]
                                        ).join(String.fromCharCode(initial));
                                        continue kLoop;
                                    }
                                }
                            }
                            result = result.split(result[index] + result[index+1]).join(String.fromCharCode(initial));
                            continue kLoop;
                        }
                    }
                }
            }
        }
        break kLoop;
    }
    if (result==input) {
        return null;
    }
    return result;
};
const composeHangul = function(input) {
    let ptr = input.ptr;
    while (ptr!=null) {
        const converted = hangulComposeSingle(ptr.val);
        if (converted!=null) {
            input.ptr = {
                val: converted,
                next: input.ptr
            };
        }
        ptr = ptr.next;
    }
};
const hangulJob = function(input){
    if (input.decomposeHangul==true) {
        let ptr = input.ptr;
        while (ptr!=null) {
            const broken = ptr.val.split("");
            for (let index = 0; index < broken.length; index++) {
                broken[index] = hangulBreaker(broken[index]);
            }
            const condensed = broken.join("");
            if (condensed!=ptr.val) {
                input.ptr = {
                    val: condensed,
                    next: input.ptr 
                };
            }
            ptr = ptr.next;
        }
    }
    if (input.legacyHangul==true) {
        let ptr = input.ptr;
        while (ptr!=null) {
            const broken = ptr.val.split("");
            for (let index = 0; index < broken.length; index++) {
                broken[index] = legacyHangulConvert(broken[index]);
            }
            const condensed = broken.join("");
            if (condensed!=ptr.val) {
                input.ptr = {
                    val: condensed,
                    next: input.ptr 
                };
            }
            ptr = ptr.next;
        }
    }
    if (input.recomposeHangul==true) {
        composeHangul(input);
    }
};
 
importScriptPage('MediaWiki:RedirectMaker/RomanjiMaker.js', 'dev');
const romanjiWork = function(input){
    const enabled = input.NihonShiki || input.KunreiShiki || input.KunreiShikiLegacy || input.JSLRomanji || input.Hepburn1 || input.Hepburn2 || input.Hepburn3 || input.HepburnMod || input.HepburnPassport;
    if (enabled!=true) {
        return input;
    }
    const templateJob = function(shouldExec, functionPTR, ptr){
        if (shouldExec) {
            const r = functionPTR(ptr.val);
            if (r.length > 0) {
                const q = r[0].toUpperCase() + r.slice(1); 
                if (!(q==ptr.val)) {
                    input.ptr = {
                        val: q,
                        next: input.ptr
                    };
                }
            }
        }
    };
    for (let ptr = input.ptr; ptr!=null; ptr = ptr.next) {
        templateJob(input.NihonShiki, NihonShiki, ptr);
        templateJob(input.KunreiShiki, KunreiShiki, ptr);
        templateJob(input.KunreiShikiLegacy, KunreiShikiLegacy, ptr);
        templateJob(input.JSLRomanji, JSLRomanji, ptr);
        templateJob(input.Hepburn1, Hepburn1, ptr);
        templateJob(input.Hepburn2, Hepburn2, ptr);
        templateJob(input.Hepburn3, Hepburn3, ptr);
        templateJob(input.HepburnMod, HepburnMod, ptr);
        templateJob(input.HepburnPassport, HepburnPassport, ptr);
    }
    return input;
};
 
importScriptPage('MediaWiki:RedirectMaker/CyrillicRomanizer.js', 'dev');
const cyrillicRomanization = function(input) {
    const enabled = input.ISO9A || input.ISO9B  || input.RussianTranscription  || input.BelarusianTranscription  || input.BCMSTranscription  || input.BulgarianTranscription  || input.MacedonianTranscription || input.MongolianTranscription || input.UkrainianTranscription ;
    if (enabled!=true) {
        return input;
    }
    const templateJob = function(shouldExec, functionPTR, ptr){
        if (shouldExec) {
            const r = functionPTR(ptr.val);
            if (r.length > 0) {
                const q = r; 
                if (!(q==ptr.val)) {
                    input.ptr = {
                        val: q,
                        next: input.ptr
                    };
                }
            }
        }
    };
    for (let ptr = input.ptr; ptr!=null; ptr = ptr.next) {
        templateJob(input.ISO9A, ISO9ATranscription, ptr);
        templateJob(input.ISO9B, ISO9BTranscription, ptr);
        templateJob(input.RussianTranscription, RussianTranscription, ptr);
        templateJob(input.BelarusianTranscription, BelarusianTranscription, ptr);
        templateJob(input.BCMSTranscription, BCMSTranscription, ptr);
        templateJob(input.BulgarianTranscription, BulgarianTranscription, ptr);
        templateJob(input.MacedonianTranscription, MacedonianTranscription, ptr);
        templateJob(input.MongolianTranscription, MongolianTranscription, ptr);
        templateJob(input.UkrainianTranscription, UkrainianTranscription, ptr);
    }
    return input;
};
const ssOperation = function(a) {
    return a.split('').map(function(b){
        switch(b) {
            case 'ẞ':
                return 'SS';
            case 'ß':
                return 'ss';
            default:
        }
        return b;
    }).join('');
};
const yieldRedirects = function(input) {
	/*
		input has String target the target page, String filler for redirect pages, String[] coreForms, String[][] phoneticKanaForms, boolean alternateWidths.
		This adds ptr: {val: String, next ptr}, a linkedList of results
	*/
	input.ptr = { val: input.target, next:null };
	input.tail = input.ptr;
	for (let index = 0; index < input.coreForms.length; index++) {
        input.ptr = {val: input.coreForms[index], next: input.ptr};
	}
	for (let index = 0; index < input.phoneticKanaForms.length; index++) {
		processIndividualKanaLine(input.phoneticKanaForms[index], input);
	}
	hangulJob(input);
	romanjiWork(input);
	cyrillicRomanization(input);
	if (input.ßFilter==true){
	    input.ptr = massModify(input.ptr, ssOperation);
	}
	if (true===input.diacriticFilter) {
        filterHardToTypeDiacritics(input);
	}
	if (input.alternateWidths==true) {
	    input.ptr = massModify(input.ptr, convertWidth);
	}
    if (input.namespace!=null) {
        if (input.namespace!="") {
            const nst = input.namespace + ":";
            let ptr = input.ptr;
            while (ptr!=null) {
                ptr.val = nst + ptr.val;
                ptr = ptr.next;
            }
        }
	}
	return input;
};
 
const templateExtraction = function(input, callback){
    if (input.autoExtract!=true) {
        callback(input);
        return;
    }
    $.get(wgServer + "/wiki/MediaWiki:Custom-RedirectMakerInfoboxConfig?action=raw", function(page){
        if (page.trim()=="") {
            callback(input);
            return;
        }
 
        try {
            const parsedConfig = page.split('\r').join('').split('\n');
            $.get(wgServer + "/api/v1/Articles/Details?ids=&titles=" + encodeURIComponent(input.target), function(data){
                const parsed = JSON.parse(data);
                const keys = Object.keys(parsed.items);
                if (keys.length==0) {
                    callback(input);
                    return;
                }
                const targetID = parsed.items[keys[0]].id;
                $.get(wgServer + "/api/v1/Infobox/Details?pageid=" + targetID, function(data2){
                    const boxes = JSON.parse(data2).items;
                    for (let boxIndex = 0; boxIndex < boxes.length; boxIndex++) {
                        const box = boxes[boxIndex];
                        for (let propIndex = 0; propIndex < boxes.length; propIndex++) {
                            const entry = box[propIndex];
                            if (entry.type=='data') {
                                if (parsedConfig.indexOf(entry.data.label) > -1) {
                                    input.coreForms[input.coreForms.length] = entry.data.value;
                                }
                            }
                        }
                    }
                    callback(input);
                }).fail(function(e){
                    console.err(e);
                    callback(input);
                });
            });
        } catch (e) {
            console.err(e);
            callback(input);
            return;
        }
    });
    return;
};
//</syntaxhighlight>
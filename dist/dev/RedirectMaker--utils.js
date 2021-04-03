
    'use strict';
    
    const genericMapMaker = function(map){
        return function(text) {
            return text.split('').map(function(c){
                return map[c] || c;
            }).join('');
        };
    };
    const makeReplacementChainer = function(map){
        return function(text){
            let result = text;
            Object.keys(map).forEach(function(key){
                result = result.split(key).join(map[key]);
            });
            return result;
        };
    };
    const toFullWidth = genericMapMaker({"0":"０","1":"１","2":"２","3":"３","4":"４","5":"５","6":"６","7":"７","8":"８","9":"９","¢":"￠","£":"￡","¬":"￢","¯":"￣","¦":"￤","¥":"￥","₩":"￦","!":"！","\"":"＂","#":"＃","$":"＄","%":"％","&":"＆","'":"＇","(":"（",")":"）","*":"＊","+":"＋",",":"，","-":"－",".":"．","/":"／",":":"：",";":"；","<":"＜","=":"＝",">":"＞","?":"？","@":"＠","A":"Ａ","B":"Ｂ","C":"Ｃ","D":"Ｄ","E":"Ｅ","F":"Ｆ","G":"Ｇ","H":"Ｈ","I":"Ｉ","J":"Ｊ","K":"Ｋ","L":"Ｌ","M":"Ｍ","N":"Ｎ","O":"Ｏ","P":"Ｐ","Q":"Ｑ","R":"Ｒ","S":"Ｓ","T":"Ｔ","U":"Ｕ","V":"Ｖ","W":"Ｗ","X":"Ｘ","Y":"Ｙ","Z":"Ｚ","[":"［","\\":"＼","]":"］","^":"＾","_":"＿","`":"｀","a":"ａ","b":"ｂ","c":"ｃ","d":"ｄ","e":"ｅ","f":"ｆ","g":"ｇ","h":"ｈ","i":"ｉ","j":"ｊ","k":"ｋ","l":"ｌ","m":"ｍ","n":"ｎ","o":"ｏ","p":"ｐ","q":"ｑ","r":"ｒ","s":"ｓ","t":"ｔ","u":"ｕ","v":"ｖ","w":"ｗ","x":"ｘ","y":"ｙ","z":"ｚ","{":"｛","}":"｝","~":"～",'⦅':'｟','⦆':'｠'});
    const germanRespell = genericMapMaker({'ß': 'ss', 'ẞ': 'SS'});
    const legacyHangulConvert = genericMapMaker({"ᄀ":"ㄱ","ᆨ":"ㄱ","ᆪ":"ㄳ","ᄂ":"ㄴ","ᆫ":"ㄴ","ᄔ":"ㅥ","ᇿ":"ㅥ","ᄕ":"ㅦ","ᇆ":"ㅦ","ᅛ":"ㅧ","ᇇ":"ㅧ","ᇈ":"ㅨ","ᅜ":"ㄵ","ᆬ":"ㄵ","ᅝ":"ㄶ","ᆭ":"ㄶ","ᄃ":"ㄷ","ᆮ":"ㄷ","ᄄ":"ㄸ","ퟍ":"ㄸ","ᄅ":"ㄹ","ᆯ":"ㄹ","ꥤ":"ㄺ","ᆰ":"ㄺ","ᇌ":"ㅩ","ꥦ":"ㅪ","ᇎ":"ㅪ","ꥨ":"ㄻ","ᆱ":"ㄻ","ꥩ":"ㄼ","ᆲ":"ㄼ","ᇓ":"ㅫ","ꥬ":"ㄽ","ᆳ":"ㄽ","ᇗ":"ㅬ","ᆴ":"ㄾ","ᆵ":"ㄿ","ᄚ":"ㅀ","ᆶ":"ㅀ","ᇙ":"ㅭ","ᄆ":"ㅁ","ᆷ":"ㅁ","ᄜ":"ㅮ","ᇜ":"ㅮ","ꥱ":"ㅯ","ᇝ":"ㅯ","ᇟ":"ㅰ","ᄝ":"ㅱ","ᇢ":"ㅱ","ᄇ":"ㅂ","ᆸ":"ㅂ","ᄞ":"ㅲ","ᄠ":"ㅳ","ퟣ":"ㅳ","ᄈ":"ㅃ","ퟦ":"ㅃ","ᄡ":"ㅄ","ᆹ":"ㅄ","ᄢ":"ㅴ","ᄣ":"ㅵ","ퟧ":"ㅵ","ᄧ":"ㅶ","ퟨ":"ㅶ","ᄩ":"ㅷ","ᄫ":"ㅸ","ᇦ":"ㅸ","ᄬ":"ㅹ","ᄉ":"ㅅ","ᆺ":"ㅅ","ᄭ":"ㅺ","ᇧ":"ㅺ","ᄮ":"ㅻ","ᄯ":"ㅼ","ᇨ":"ㅼ","ᄲ":"ㅽ","ᇪ":"ㅽ","ᄊ":"ㅆ","ᆻ":"ㅆ","ᄶ":"ㅾ","ퟯ":"ㅾ","ᅀ":"ㅿ","ퟫ":"ㅿ","ᄋ":"ㅇ","ᆼ":"ㅇ","ᅌ":"ㆁ","ᇰ":"ㆁ","ᇱ":"ㆂ","ᇲ":"ㆃ","ᄌ":"ㅈ","ᆽ":"ㅈ","ᄍ":"ㅉ","ퟹ":"ㅉ","ᆾ":"ㅊ","ᄎ":"ㅊ","ᆿ":"ㅋ","ᄏ":"ㅋ","ᇀ":"ㅌ","ᄐ":"ㅌ","ᇁ":"ㅍ","ᄑ":"ㅍ","ᅗ":"ㆄ","ᇴ":"ㆄ","ᇂ":"ㅎ","ᄒ":"ㅎ","ᅘ":"ㆅ","ᅙ":"ㆆ","ᇹ":"ㆆ","ᅡ":"ㅏ","ᅢ":"ㅐ","ᅣ":"ㅑ","ᅤ":"ㅒ","ᅥ":"ㅓ","ᅦ":"ㅔ","ᅧ":"ㅕ","ᅨ":"ㅖ","ᅩ":"ㅗ","ᅪ":"ㅘ","ᅫ":"ㅙ","ᅬ":"ㅚ","ᅭ":"ㅛ","ᆄ":"ㆇ","ᆅ":"ㆈ","ᆈ":"ㆉ","ᅮ":"ㅜ","ᅯ":"ㅝ","ᅰ":"ㅞ","ᅱ":"ㅟ","ᅲ":"ㅠ","ᆑ":"ㆊ","ᆒ":"ㆋ","ᆔ":"ㆌ","ᅳ":"ㅡ","ᅴ":"ㅢ","ᅵ":"ㅣ","ᆞ":"ㆍ","ᆡ":"ㆎ"});
    const decomposeKatakana = genericMapMaker({"ガ":"゙カ","ギ":"゙キ","ヸ":"゙ヰ","ヹ":"゙ヱ","ヺ":"゙ヲ","ヷ":"゙ワ","グ":"゙ク","ゲ":"゙ケ","ゴ":"゙コ","ザ":"゙サ","ジ":"゙シ","ズ":"゙ス","ゼ":"゙セ","ゾ":"゙ソ","ダ":"゙タ","ヂ":"゙チ","ヅ":"゙ツ","デ":"゙テ","ド":"゙ト","ヴ":"゙ウ","バ":"゙ハ","パ":"゚ハ","ビ":"゙ヒ","ピ":"゚ヒ","ブ":"゙フ","プ":"゚フ","ベ":"゙ヘ","ペ":"゚ヘ","ボ":"゙ホ","ポ":"゚ホ"});
    const fullToHalfMap = genericMapMaker({"ㄱ":"ﾡ","ㄲ":"ﾢ","ㄳ":"ﾣ","ㄴ":"ﾤ","ㄵ":"ﾥ","ㄶ":"ﾦ","ㄷ":"ﾧ","ㄸ":"ﾨ","ㄹ":"ﾩ","ㄺ":"ﾪ","ㄻ":"ﾫ","ㄼ":"ﾬ","ㄽ":"ﾭ","ㄾ":"ﾮ","ㄿ":"ﾯ","ㅀ":"ﾰ","ㅁ":"ﾱ","ㅂ":"ﾲ","ㅃ":"ﾳ","ㅄ":"ﾴ","ㅅ":"ﾵ","ㅆ":"ﾶ","ㅇ":"ﾷ","ㅈ":"ﾸ","ㅉ":"ﾹ","ㅊ":"ﾺ","ㅋ":"ﾻ","ㅌ":"ﾼ","ㅍ":"ﾽ","ㅎ":"ﾾ","ㅏ":"ￂ","ㅐ":"ￃ","ㅑ":"ￄ","ㅒ":"ￅ","ㅓ":"ￆ","ㅔ":"ￇ","ㅕ":"ￊ","ㅖ":"ￋ","ㅗ":"ￌ","ㅘ":"ￍ","ㅙ":"ￎ","ㅚ":"ￏ","ㅛ":"ￒ","ㅜ":"ￓ","ㅝ":"ￔ","ㅞ":"ￕ","ㅟ":"ￖ","ㅠ":"ￗ","ㅡ":"ￚ","ㅢ":"ￛ","ㅣ":"ￜ","￨":"❘","￩":"←","￪":"↑","￫":"→","￬":"↓","￭":"■","￮":"○","ー":"ｰ","・":"･","ヲ":"ｦ","ァ":"ｧ","ィ":"ｨ","ゥ":"ｩ","ェ":"ｪ","ォ":"ｫ","ャ":"ｬ","ュ":"ｭ","ョ":"ｮ","ッ":"ｯ","ア":"ｱ","イ":"ｲ","ウ":"ｳ","エ":"ｴ","オ":"ｵ","カ":"ｶ","キ":"ｷ","ク":"ｸ","ケ":"ｹ","コ":"ｺ","サ":"ｻ","シ":"ｼ","ス":"ｽ","セ":"ｾ","ソ":"ｿ","タ":"ﾀ","チ":"ﾁ","ツ":"ﾂ","テ":"ﾃ","ト":"ﾄ","ナ":"ﾅ","ニ":"ﾆ","ヌ":"ﾇ","ネ":"ﾈ","ノ":"ﾉ","ハ":"ﾊ","ヒ":"ﾋ","フ":"ﾌ","ヘ":"ﾍ","ホ":"ﾎ","マ":"ﾏ","ミ":"ﾐ","ム":"ﾑ","メ":"ﾒ","モ":"ﾓ","ヤ":"ﾔ","ユ":"ﾕ","ヨ":"ﾖ","ラ":"ﾗ","リ":"ﾘ","ル":"ﾙ","レ":"ﾚ","ロ":"ﾛ","ワ":"ﾜ","ン":"ﾝ","゙":"ﾞ","゚":"ﾟ","゛":"ﾞ","゜":"ﾟ"
        ,'。':'｡',
        '「':'｢',
        '」':'｣',
        '、':'､'
    });
    const toHalfWidth = function(input){
        const decomposed = decomposeKatakana(input);
        return fullToHalfMap(decomposed);
    };
    const hangulDecomposeMap = {};
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
    for (let index = 0xd7a3; index >= 0xac00; index--) {
      const character = String.fromCodePoint(index);
      hangulDecomposeMap[character] = hangulBreaker(character);
    }
    const hangulDecompose = genericMapMaker(hangulDecomposeMap);
    const RecomposeHangul = makeReplacementChainer(hangulDecomposeMap);
    
    const contentLang = mw.config.get('wgPageContentLanguage');
    const langIsOf = function(list) {
        return list.indexOf(contentLang) !== -1;
    };
    const enableHangulOptions = langIsOf([ 'cia', 'ko', 'kor', 'jje', 'ko', 'okm', 'oko']);
    const germanEnabled = langIsOf([ 'de', 'ger', 'deu', 'gmh', 'goh', 'gct', 'bar', 'cim', 'geh', 'ksh', 'nds', 'sli', 'ltz', 'vmf', 'mhn', 'pfl', 'pdc', 'pdt', 'deu', 'swg', 'gsw', 'uln', 'sxu', 'wae', 'wep', 'hrx', 'yec']);
    const shouldVaryWidths = langIsOf([ 'ain', 'ja', 'jpn', 'kzg', 'ams', 'ryn', 'tkn', 'okn', 'hhjm', 'xuj', 'ryu', 'mvi', 'rys', 'yoi', 'ko', 'kor', 'jje', 'okm', 'oko', 'zh', 'chi', 'zho', 'cmn', 'yue', 'nan', 'cdo', 'cju', 'cmn', 'cpx', 'czh', 'czo', 'gan', 'hak', 'hsn', 'mnp', 'wuu', 'och', 'ltc', 'lzh', 'yyef', 'guzh']);
    
    
    const functionMap = {'ßFilter': germanRespell, 'LegacyHangul': legacyHangulConvert, 'DecomposeHangul': hangulDecompose, 'RecomposeHangul': RecomposeHangul};
    const optionStrings = Object.keys(functionMap).concat(['AlternateWidths']);
    const notYetAvailableOptions = ['DiacriticFilter', 'NihonShikiRomanization', 'KunreiShikiRomanization', 'KunreiShikiLegacyRomanization', 'JSLRomanization', 'Hepburn1Romanization', 'Hepburn2Romanization', 'Hepburn3Romanization', 'HepburnModifiedRomanization', 'HepburnPassportRomanization', 'RussianTranscription', 'BelarusianTranscription', 'SerbianTranscription', 'BulgarianTranscription', 'MacedonianTranscription', 'MongolianTranscription', 'UkrainianTranscription', 'ISO9A', 'ISO9B'
    ];
    
    
    
    const transformAndDuplicateList = function(inputList, transformFunction){
        if (inputList===null) {
            return null;
        }
        return  {
            val: transformFunction(inputList.val),
            next: {
                val: inputList.val,
                next: transformAndDuplicateList(inputList.next, transformFunction)
            }
        };
    };
    const arrayToList = function(input){
        let result = null;
        for (let index = input.length -1; index >= 0 ; index--) {
            result = {
                val: input[index],
                next: result
            };
        }
        return result;
    };
    const listToArray = function(input){
        const internal = function(ptr, index){
            if (ptr===null) {
                return new Array(index);
            }
            const array = internal(ptr.next, index+1);
            array[index] = ptr.val;
            return array;
        };
        return internal(input, 0);
    };
    const sortList = function(input) {
        return arrayToList(
            listToArray(input).sort()
        );
    };
    const killDuplicatesInList = function(input){
        const entries = sortList(input);
        const internal = function(ptr) {
            if (ptr===null) {
                return null;
            }
            if (ptr.next===null) {
                return ptr;
            }
            if (ptr.next.val==ptr.val) {
                return internal(ptr.next);
            }
            return {
                val: ptr.val,
                next: internal(ptr.next)
            };
        };
        return internal(entries);
    };
    const isNotNull = function(input){
        switch (input) {
            case null:
            case undefined:
                return false;
            default:
        }
        return true;
    };
    const performAllTransforms = function(rawForms, transformFunctions) {
        const internalSet = transformFunctions.filter(isNotNull);
        let list = arrayToList(rawForms);
        transformFunctions.forEach(function(f){
            list = killDuplicatesInList(transformAndDuplicateList(list, f));
        });
        return list;
    };
    
    const api = new mw.Api();
    const editString = 'edit';
    const jsonString = 'json';
    const installRedirect = function(targetPage, redirectData, logEntry, callback){
        console.log("installing redirect: " + targetPage);
        const params = {
            action: editString,
            title: targetPage,
            text: redirectData,
            createonly: true,
            format: jsonString,
            summary: logEntry
        };
        api.postWithToken( 'csrf', params ).done(callback);
    };
    const installRedirects = function(targetPages, redirectData, logEntry, callback){
        const internal = function(index){
            const i = index;
            if (i===targetPages.length){
                callback();
                return;
            }
            installRedirect(targetPages[i], redirectData, logEntry, function(){
                setTimeout(function(){
                    internal(i+1);
                }, 1000);
            });
        };
        internal(0);
    };
    const nullFunction = function(input){
        return input;  
    };
    
mw.hook('redirectMakerUtils').fire({
    nullFunction: nullFunction,
    installRedirects: installRedirects,
    installRedirect: installRedirect,
    performAllTransforms: performAllTransforms,
    isNotNull: isNotNull,
    killDuplicatesInList: killDuplicatesInList,
    sortList: sortList,
    listToArray: listToArray,
    arrayToList: arrayToList,
    transformAndDuplicateList: transformAndDuplicateList,
    functionMap: functionMap,
    optionStrings: optionStrings,
    shouldVaryWidths: shouldVaryWidths,
    germanEnabled: germanEnabled,
    enableHangulOptions: enableHangulOptions,
    langIsOf: langIsOf,
    germanRespell: germanRespell,
    legacyHangulConvert: legacyHangulConvert,
    hangulDecompose: hangulDecompose,
    RecomposeHangul: RecomposeHangul,
    convertToFullWidth: toFullWidth,
    convertToHalfWidth: toHalfWidth
});
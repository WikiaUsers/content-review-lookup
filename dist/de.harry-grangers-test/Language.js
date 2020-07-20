// List of all main page translations on Commons and their respective language codes, from [[Template:Lang-mp]]
// (The script does not currently use the language code for anything, it just checks that a value is present.)
var localizedMainPageTitles = {
    "Tuisblad": 'af',
    "Houptsyte": 'als',
    "Hēafodsīde": 'ang',
    "الصفحة الرئيسية": 'ar',
    "Portalada": 'an',
    "Entamu": 'ast',
    "Hauptsaitn": 'bar',
    "Першая старонка": 'be',
    "Галоўная старонка": 'be-tarask',
    "Halaman Utama": 'id',
    "Laman Utama": 'ms',
    "Tepas": 'su',
    "প্রধান পাতা": 'bn',
    "Početna strana": 'bs',
    "Degemer": 'br',
    "Начална страница": 'bg',
    "Pàgina principal": 'ca',
    "Hlavní strana": 'cs',
    "Hafan": 'cy',
    "Forside": 'da',
    "Hauptseite": 'de',
    "Esileht": 'et',
    "Κύρια Σελίδα": 'el',
    "Main Page": 'en',
    "Portada": 'es',
    "Ĉefpaĝo": 'eo',
    "Páhina prencipal": 'ext',
    "Azala": 'eu',
    "صفحهٔ اصلی": 'fa',
    "Forsíða/fo": 'fo',
    "Accueil": 'fr',
    "Príomhleathanach": 'ga',
    "Portada galega": 'gl',
    "મુખપૃષ્ઠ": 'gu',
    "עמוד ראשי": 'he',
    "मुख्य पृष्ठ": 'hi',
    "Glavna stranica": 'hr',
    "Գլխավոր Էջ": 'hy',
    "Pagina principal": 'ia',
    "Forsíða/is": 'is',
    "Pagina principale": 'it',
    "Pamuklat": 'pam',
    "მთავარი გვერდი": 'ka',
    "Басты бет": 'kk',
    "ទំព័រដើម": 'km',
    "ಮುಖ್ಯ ಪುಟ": 'kn',
    "대문": 'ko',
    "Pagina prima": 'la',
    "Haaptsäit": 'lb',
    "Pagrindinis puslapis": 'lt',
    "Sākumlapa": 'lv',
    "Kezdőlap": 'hu',
    "Главна страница": 'mk',
    "പ്രധാന താൾ": 'ml',
    "Паджина принчипалэ": 'mo',
    "मुखपृष्ठ": 'mr',
    "Il-Paġna prinċipali": 'mt',
    "Páigina percipal": 'mwl',
    "گت ولگ]]": 'mzn',
    "Hoofdpagina": 'nl',
    "Veurpagina": 'nds-nl',
    "メインページ": 'ja',
    "Calīxatl": 'nah',
    "गृह पृष्ठ": 'ne',
    "Hovedside": 'no',
    "Hovudside": 'nn',
    "Acuèlh": 'oc',
    "Hööftsiet": 'nds',
    "Strona główna": 'pl',
    "لومړی مخ": 'ps',
    "Página principal": 'pt',
    "Qhapaq p'anqa": 'qu',
    "Pagina principală": 'ro',
    "Заглавная страница": 'ru',
    "Haudsiede Commons": 'stq',
    "Faqja Kryesore": 'sq',
    "මුල් පිටුව": 'si',
    "Simple English": 'en-simple',
    "Hlavná stránka": 'sk',
    "Glavna stran": 'sl',
    "Главна страна": 'sr',
    "Glavna stranica - Главна страница": 'sh',
    "Etusivu": 'fi',
    "Huvudsida": 'sv',
    "Unang Pahina": 'tl',
    "முதன்மைப் பக்கம்": 'ta',
    "หน้าหลัก": 'th',
    "Trang Chính": 'vi',
    "Ana Sayfa": 'tr',
    "Головна сторінка": 'uk',
    "Pajina prinsipałe": 'vec',
    "Cifapad": 'vo',
    "Syahan nga Pakli": 'war',
    "ערשטע זײַט": 'yi',
    "Ojúewé Àkọ́kọ́": 'yo',
    "頭版": 'yue',
    "卷首": 'zh-classical',
    "首页": 'zh-hans',
    "首頁": 'zh-hant'
};

// Build an inverted language look-up table
var localizedMainPageTitlesBack = {};
for (var key in localizedMainPageTitles) {
    localizedMainPageTitlesBack[localizedMainPageTitles[key]] = key;
}

// Callback function used for tab text translation
function setMainPageTabTextAPI(json) {
    var title = json.query.allmessages[0]['*'];
    if (title) addOnloadHook(function () {
        var tab = document.getElementById('ca-nstab-main');
        if (tab) tab = tab.getElementsByTagName('a')[0];
        while (tab && tab.firstChild) tab = tab.firstChild;
        if (tab) tab.nodeValue = title;
    });
}

if (wgNamespaceNumber < 2 && localizedMainPageTitles[wgTitle]) {
    // Replace the main page tab title with the [[MediaWiki:Mainpage-description]] message
    importScriptURI(wgScriptPath + "/api.php?format=json&callback=setMainPageTabTextAPI&maxage=2592000&smaxage=2592000&action=query&meta=allmessages&ammessages=mainpage-description&amlang=" + wgUserLanguage);

    // Hide title when viewing the main page (but not when editing it or viewing the talk page)
    if (wgNamespaceNumber === 0 && (wgAction == "view" || wgAction == "purge")) {
        appendCSS("#firstHeading { display: none; }");
    }
}

function suggestMainpageLang() {
    // look-up welcome box on mainpage
    var mwb = document.getElementById('mainpage-welcome-box');
    if (mwb) {
        // determine browser language
        var lang = navigator.userLanguage || navigator.language || navigator.browserLanguage;

        // now use reverse loop-up table to find the correct page (try up to first dash if full code is not found) 
        var page = localizedMainPageTitlesBack[lang] || localizedMainPageTitlesBack[lang.substr(0, lang.indexOf('-'))];

        if (page && page !== wgTitle) {
            mwb.innerHTML += '<br/><img src="http://bits.wikimedia.org/skins-1.5/common/images/redirectltr.png">' + '<span class="redirectText"><a href="/wiki/' + page + '">' + page + '</a></span>';
        }
    }
}
if (wgUserName === null) addOnloadHook(suggestMainpageLang);

$.getJSON('/api.php?action=query&prop=langlinks&titles=' + wgMainPageTitle + '&llurl=true&lllimit=20&format=json',function(data) {
    console.log(data);
    console.log(data.query.pages[Object.keys(data.query.pages)[0]].langlinks);
});
/* TranslateModal */
translateModalContent = $('<form />');
select = $('<select />').appendTo(translateModalContent).change(function() {
    currentLang = $(this).find(':selected').val();
    console.log(currentLang);
});
for(lang in localizedMainPageTitles) {
    li = $('<option />').val(localizedMainPageTitles[lang]).text(lang).appendTo(select);
}
currentLang = 'de';
targetWiki = 'harry-grangers-test';

$('#ca-edit').siblings('ul').append(
    $('<li />').append(
        $('<a />').attr('id','ca-translate').data('id','translate').text('Translate').click(function() {
            $.showCustomModal('Translate this article', translateModalContent, {
                id: 'form-complete',
                width: 300,
                buttons: [{
                    id: 'ca-close-modal',
                    message: 'Close',
                    defaultButton: true,
                    handler: function() {
                        $('#form-complete').closeModal();
                    }
                },{
                    id: 'ca-translate-start',
                    message: 'Translate!',
                    defaultButton: false,
                    handler: function() {
                        window.location.href = 'http://' + currentLang + '.' + targetWiki + '.wikia.com/wiki/' + wgPageName + '?action=edit';
                    }
                }]
            });
        })
    )
);
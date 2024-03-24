/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});
/* VScode начало */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
jQuery.when(window.mw.loader.using('mediawiki.util'), $.ready).then(function () {
    if (!(window.mw.config.get("wgIsProbablyEditable") || ($('#ca-viewsource').length > 0))) {
        return undefined;
    }
    var i18nSource = {
        english: {
            text: 'Open in VSCode',
            tooltip: 'Open this page in Visual Studio Code',
        },
        russian: {
            text: 'Открыть в VSCode',
            tooltip: 'Открыть эту страницу в Visual Studio Code',
        },
        japanese: {
            text: 'VSCode で開く',
            tooltip: 'このページを Visual Studio Code で開く',
        },
        cantonese: {
            text: '開啟於 VSCode',
            tooltip: '喺 Visual Studio Code 開呢個頁面',
        },
        simplified_chinese: {
            text: '在 VSCode 中打开',
            tooltip: '在 Visual Studio Code 中打开此页面',
        },
        traditional_chinese: {
            text: '使用 VSCode 開啟',
            tooltip: '以 Visual Studio Code 開啟此頁面',
        },
        korean: {
            text: 'VSCode 에서 열기',
            tooltip: '이 페이지를 Visual Studio Code 에서 열기',
        },
        thai: {
            text: 'เปิดใน VSCode',
            tooltip: 'เปิดหน้านี้ใน Visual Studio Code',
        },
        vietnamese: {
            text: 'Mở trong VSCode',
            tooltip: 'Mở trang này trong Visual Studio Code',
        },
        indonesian: {
            text: 'Buka di VSCode',
            tooltip: 'Buka halaman ini di Visual Studio Code',
        },
        polish: {
            text: 'Otwórz w VSCode',
            tooltip: 'Otwórz tę stronę w Visual Studio Code',
        },
        dutch: {
            text: 'Open in VSCode',
            tooltip: 'Open deze pagina in Visual Studio Code',
        },
        french: {
            text: 'Ouvrir dans VSCode',
            tooltip: 'Ouvrir cette page dans Visual Studio Code',
        },
        german: {
            text: 'Öffnen in VSCode',
            tooltip: 'Öffne diese Seite in Visual Studio Code',
        },
    };
    var i18n = {
        'en': i18nSource['english'],
        'ru': i18nSource['russian'],
        'ja': i18nSource['japanese'],
        'ko': i18nSource['korean'],
        'yue': i18nSource['cantonese'],
        'zh-yue': i18nSource['cantonese'],
        'zh': i18nSource['simplified_chinese'],
        'zh-hans': i18nSource['simplified_chinese'],
        'zh-cn': i18nSource['simplified_chinese'],
        'zh-sg': i18nSource['simplified_chinese'],
        'zh-my': i18nSource['simplified_chinese'],
        'zh-hant': i18nSource['traditional_chinese'],
        'zh-tw': i18nSource['traditional_chinese'],
        'zh-hk': i18nSource['traditional_chinese'],
        'zh-mo': i18nSource['traditional_chinese'],
        'th': i18nSource['thai'],
        'vi': i18nSource['vietnamese'],
        'id': i18nSource['indonesian'],
        'pl': i18nSource['polish'],
        'nl': i18nSource['dutch'],
        'fr': i18nSource['french'],
        'de': i18nSource['german'],
    };
    var lang = window.mw.config.get('wgUserLanguage');
    var displayInfo = __assign(__assign(__assign({}, i18nSource['english']), i18n[lang.split('-')[0]]), i18n[lang]);
    var scheme = 'vscode';
    var extensionID = 'rowewilsonfrederiskholme.wikitext';
    var actionPath = '/PullPage';
    var args = {
        RemoteBot: 'true',
        TransferProtocol: window.location.protocol,
        SiteHost: window.mw.config.get('wgServer').replace(/^[\w-]*?:(?=\/\/)/, ''),
        APIPath: window.mw.util.wikiScript('api'),
        Title: window.mw.config.get('wgPageName')
    };
    var isMinerva = window.mw.config.get('skin') === 'minerva';
    window.mw.util.addPortletLink(isMinerva ? 'p-tb' : 'p-views', scheme + "://" + extensionID + actionPath + "?" + new URLSearchParams(args).toString(), displayInfo['text'], 'wikitext-extension-gadget', displayInfo['tooltip'], undefined, isMinerva ? undefined : '#ca-history');
});
/* VScode конец */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:VK.js',
    ]
});
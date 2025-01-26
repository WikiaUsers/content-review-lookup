// ============================================================
// κλοκάκι. UTC Clock script that adds purge button. Alternative to the UTCClock. Still only for monobook-sitewide
// ============================================================

/*jslint browser, single */
/*global $, mw */

$(function () {
    'use strict';
    
        // Double run protection.
    if ($('#ASTclock').length) {
        return;
    }

    // Disable all the UTC clocks present
    importStylesheetPage('MediaWiki:Κλωκάκι/main.css', 'el.alpha-styles');

    // translations
    var lang = mw.config.get('wgUserLanguage');
    var msg = {
        /* English (English) */
        en: {
            tooltip: 'Purge the server cache for this page'
        },
        /* Belarusian (Беларуская) */
        be: {
            tooltip: 'Ачысціць кэш для гэтай старонкі'
        },
        /* Catalan (Català) */
        ca: {
            tooltip: 'Neteja la memòria cau del servidor d’aquesta pàgina'
        },
        /* German (Deutsch) */
        de: {
            tooltip: 'Aktualisiere den Serverzwischenspeicher dieser Seite'
        },
        /* Greek (Ελληνικά) */
        el: {
            tooltip: 'Ανανέωση του cache του διακομιστή για αυτήν την σελίδα'
        },
        /* Spanish (Español) */
        es: {
            tooltip: 'Purgar la caché del servidor de esta página'
        },
        /* French (Français) */
        fr: {
            tooltip: 'Nettoyer la mémoire cache du serveur de cette page'
        },
        /* Galician (Galego) */
        gl: {
            tooltip: 'Limpar o caché do servidor desta páxina'
        },
        /* Italian (Italiano) */
        it: {
            tooltip: 'Cancellare la cache del servo di questa pagina'
        },
        /* Occitan (Occitan) */
        oc: {
            tooltip: 'Netejatz la memòria Cache del servidor d’aquesta pagina'
        },
        /* Polish (Polski) */
        pl: {
            tooltip: 'Odśwież cache dla tej strony'
        },
        /* Portuguese (Português) */
        pt: {
            tooltip: 'Limpar a cache do servidor desta página'
        },
        /* Brazilian Portuguese (Português do Brasil) */
        'pt-br': {
            tooltip: 'Limpar a cache do servidor desta página'
        },
        /* Romanian (Română) */
        ro: {
            tooltip: 'Curăţaţi cache-ul serverului acestei pagini'
        },
        /* Russian (Русский) */
        ru: {
            tooltip: 'Очистить кэш для этой страницы'
        },
        /* Ukrainian (Українська) */
        uk: {
            tooltip: 'Очистити кеш для цієї сторінки'
        },
        /* Valencian (Valencià) */
        val: {
            tooltip: 'Porgar la caché del servidor d’esta pàgina'
        },
        /* Chinese (中文) */
        zh: {
            tooltip: '清除服务器缓存'
        },
        /* Chinese-Simplifile (中文-简体) */
        'zh-hans': {
            tooltip: '清除伺服器缓存'
        },
        /* Chinese-Traditional (中文-繁體) */
        'zh-hant': {
            tooltip: '清除伺服器緩存'
        },
        /* Chinese-TW (中文-台灣) */
        'zh-tw': {
            tooltip: '清除伺服器快取'
        }
    };
    // use user language, with English as fallback
    msg = msg[lang] || msg[lang.split('-')[0]] || msg.en;


    var updateDateInterval;
    var $parent = $('<li>').attr('id', 'ASTclock').css('direction', 'ltr');
    var $node = $('<a>').attr({
        title: msg.tooltip,
        href: '?action=purge'
    }).appendTo($parent);

    function updateDate() {
        $node.text(new Date().toUTCString().slice(5, -3) + '(UTC)');
    }


    if (mw.config.get('skin') === 'oasis') { // User uses FANDOM powered by Wikia skin
    if ($('#EditPageHeader').length) { // Try an edit page
        var oasisCSS = document.dir === 'rtl'
            ? {'float': 'left', 'border-left': '0', 'font-family': 'Lucida Console, monospace', 'list-style-type': 'none', 'color': 'inherit', 'margin-left': '2px', 'margin-top': '2px'}
            : {'float': 'right', 'border-right': '0' , 'font-family': 'Lucida Console, monospace', 'list-style-type': 'none',  'color': 'inherit', 'margin-left': '2px', 'margin-top': '2px'};
    } else { // Masthead and regular pages
        var oasisCSS = document.dir === 'rtl'
            ? {'float': 'left', 'border-left': '0', 'font-family': 'Lucida Console, monospace', 'list-style-type': 'none'}
            : {'float': 'right', 'border-right': '0' , 'font-family': 'Lucida Console, monospace', 'list-style-type': 'none'};

    }

        var MenuCSS = document.dir === 'rtl'
            ? {'border-left': '0', 'font-family': 'Lucida Console, monospace', 'list-style-type': 'none',  'margin': '0 0 6px'}
            : {'border-right': '0' , 'font-family': 'Lucida Console, monospace', 'list-style-type': 'none', 'margin': '0 0 6px'};
if ($('.UserProfileMasthead').length) { // Apply to ProfileMastheads
        $parent.css(oasisCSS).appendTo('.UserProfileMasthead');
}
    else if ($('#EditPageHeader').length) { // Apply to page editing
        $parent.css(oasisCSS).prependTo('#EditPageRail');
}   else if ($('.page-header__contribution').length && !window.InTheRail) { // Apply to normal pages - On a personal level
        $parent.css(oasisCSS).prependTo('.page-header__contribution>div:first-child');
} else { // Apply to normal pages - On an impersonal level
        $parent.css(MenuCSS).prependTo('.WikiaMainContent');
}
    } else { // User uses Monobook skin
        var monobookCSS = document.dir === 'rtl'
            ? {'float': 'left', 'border-left': '0', 'font-family': 'Lucida Console', 'text-transform': 'none', 'font-size': 'small', 'list-style-type': 'none', 'font-weight': 'normal', 'font-style': 'normal'}
            : {'float': 'right', 'border-right': '0' , 'font-family': 'Lucida Console', 'text-transform': 'none', 'font-size': 'small', 'list-style-type': 'none','font-weight': 'normal', 'font-style': 'normal'};
        $parent.css(monobookCSS).prependTo('div#content #firstHeading');
    }
    updateDate();
    updateDateInterval = setInterval(updateDate, 1000);
    $parent = null;
});
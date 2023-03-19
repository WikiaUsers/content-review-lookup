/***
Name: AutoDesktop
Allow to automatically use desktop version without cookies and on all devices
Author: Gautier (Soronos)
Usage: Personal
***/
$(function() {
    var langCodes = {
        'de': 'de',
        'en': 'en',
        'es': 'es',
        'fr': 'fr',
        'it': 'it',
        'ja': 'ja',
        'pl': 'pl',
        'pt-br': 'pt',
        'ru': 'ru',
        'zh': 'zh',
        // Ajouter d'autres langues si nécessaire
    };

    var lang = langCodes[mw.config.get('wgContentLanguage')] || '';

    if ($('body').hasClass('skin-fandommobile')) {
        var url = mw.config.get('wgServer') + '/' + lang + '/' + mw.config.get('wgPageName') + '?mobileaction=toggle_view_desktop';
        window.location = url;
    }
});
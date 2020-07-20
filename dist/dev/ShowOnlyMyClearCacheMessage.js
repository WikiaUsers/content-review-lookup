require([
    'jquery',
    'mw',
    'wikia.browserDetect',
    'wikia.window'
], function($, mw, browserDetect, window) {
    if (mw.config.get('wgUserLanguage') !== 'en' || !$('#mw-clearyourcache').exists()) {
        return;
    }
    new mw.Api().get({
        action: 'query',
        meta: 'allmessages',
        ammessages: 'clearyourcache',
        amcustomised: 'modified',
        format: 'json'
    }).done(function (d) {
        if (d.query.allmessages.length > 0) {
            return;
        }
        var number;
        if (browserDetect.isChrome()) {
            number = 1; //chrome
        } else if (/safari/i.test(window.navigator.userAgent)) { // missing isSafari() function
            number = 2; //safari
        } else if (browserDetect.isFirefox()) {
            number = 3; //firefox
        } else if (browserDetect.isIE()) {
            number = 4; //IE
        }
        $('#mw-clearyourcache > ul').css('list-style', 'none');
        $('#mw-clearyourcache > ul > li:not(:nth-child(' + number + '))').hide();
        $('#mw-clearyourcache > ul > li:not(:nth-child(' + number + ')) > b').hide();
        $('#mw-clearyourcache > p').html($('#mw-clearyourcache > p').html().replace(/\./, ':'));
        var el = $('#mw-clearyourcache > ul > li:nth-child(' + number + ')');
        el.html(el.html().slice(el.html().indexOf('-') + 1));
        //from https://stackoverflow.com/a/27862868
        if (number === 1 || number === 3) {
            if (window.navigator.platform.indexOf('Mac') > -1) {
                el.html(el.html().split(/\.|:/g)[3].trim() + '.');
            } else if (window.navigator.platform.indexOf('Win') > -1) {
                el.html(el.html().split(/\.|:/g)[1].trim() + '.');
            }
        }
    });
});
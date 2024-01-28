/**
 * Name:        SOAPReport
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description:
 *      Used for easier reporting vandalism to SOAP.
 *      Adds a "Report to SOAP" link to user's contributions
 *      The link automatically opens the SOAP vandalism report page
 *      and auto-fills the window with information about the user that is reported
 *      The whole process isn't automatical, as description for vandalism still needs to
 *      be filled in and the form isn't auto-submitted.
 * Version:     v1.4
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgCityId',
        'wgPageName',
        'wgServer',
        'wgScriptPath',
        'wgSiteName',
        'wgUserName'
    ]), onSOAP = Number(config.wgCityId) === 65099 &&
                 mw.util.getParamValue('report') &&
                 mw.util.getParamValue('cb') !== window.localStorage.getItem('SOAPReported') &&
                 $('.gran-bn.boton-solicitud').length,
        onContribs = config.wgCanonicalSpecialPageName === 'Contributions',
        onSelf = $('.UserProfileMasthead .masthead-info h1').text() === config.wgUserName;
    if (!onSOAP && !onContribs || onSelf || window.SOAPReportLoaded) {
        return;
    }
    window.SOAPReportLoaded = true;
    var SOAPReport = {
        baseURL: 'https://soap.fandom.com/wiki/Report:',
        pages: {
            vandalism: 'Vandalism',
            spam: 'Spam'
        },
        preload: function(i18n) {
            i18n.loadMessages('u:soap:MediaWiki:Custom-Reports/i18n.json')
                .then(this.init.bind(this));
        },
        init: function(i18n) {
            this.i18n = i18n;
            if (onSOAP) {
                this.initSOAP();
            } else if (onContribs) {
                this.initContribs();
            }
        },
        reasons: $.extend({
            vandalism: 'Vandalism',
            spam: 'Spam'
        }, window.VSTFReportReasons, window.SOAPReportReasons),
        initSOAP: function() {
            mw.hook('soap.reports').add(this.reporting.bind(this));
        },
        reporting: function($button) {
            var reason = this.reasons[$button.attr('id').substr(12)];
            mw.hook('soap.reportsform').add(this.fillInForm.bind(this, reason));
            $button.click();
        },
        fillInForm: function(reason) {
            $('.soap-reports .oo-ui-window-foot .oo-ui-buttonElement-button')
                .click(this.setCachebuster.bind(this));
            $('#wikiname').val(mw.util.getParamValue('name'));
            $('#wikiurl').val(mw.util.getParamValue('url'));
            $('#user').val(mw.util.getParamValue('user'));
            $('#comment').val(reason);
        },
        setCachebuster: function() {
            window.localStorage.setItem('SOAPReported', mw.util.getParamValue('cb'));
        },
        initContribs: function() {
            $('<div>', {
                id: 'SOAPReportButtons',
                html: $.map(this.pages, (function(v, k) {
                    return $('<a>', {
                        'class': 'wds-button wds-is-squished SOAPReportButton',
                        href: new mw.Uri(this.baseURL + v).extend({
                            cb: Date.now(),
                            name: config.wgSiteName,
                            report: '1',
                            url: config.wgServer
                                .replace(/^https?:\/\//, '') +
                                config.wgScriptPath,
                            user: mw.util.getParamValue('target') ?
                                      mw.util.getParamValue('target').replace(/\+/g, ' ') :
                                      config.wgPageName.split('/')[1]
                        }).toString(),
                        text: this.i18n.msg(
                            'button-' + k
                        ).plain()
                    });
                }).bind(this))
            }).insertAfter('#contentSub, .mw-contributions-user-tools');
        }
    };
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:SOAPReport.css'
    });
    mw.hook('dev.i18n').add(SOAPReport.preload.bind(SOAPReport));
})();
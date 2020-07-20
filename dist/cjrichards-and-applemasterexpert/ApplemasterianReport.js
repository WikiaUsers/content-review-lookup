/**
 * Name:        ApplemasterianReport
 * Author:      Applemasterexpert (credit goes to https://dev.fandom.com/wiki/MediaWiki:VSTFReport.js)
 * Description:
 *      Used for easier reporting vandalism to this wiki.
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
    ]), onVSTF = config.wgCityId === '65099' &&
                 mw.util.getParamValue('report') &&
                 mw.util.getParamValue('cb') !== $.storage.get('VSTFReported') &&
                 $('.gran-bn.boton-solicitud').exists(),
        onContribs = config.wgCanonicalSpecialPageName === 'Contributions',
        onSelf = $('.UserProfileMasthead .masthead-info h1').text() === config.wgUserName;
    if (!onVSTF && !onContribs || onSelf || window.VSTFReportLoaded) {
        return;
    }
    window.VSTFReportLoaded = true;
    var VSTFReport = {
        baseURL: '/cjrichards-and-applemasterexpert.fandom.com/wiki/Report:',
        pages: {
            vandalism: 'Vandalism',
            spam: 'Spam',
            profile: 'User profile headers'
        },
        preload: function(i18n) {
            i18n.loadMessages('u:cjrichards-and-applemasterexpert:MediaWiki:Custom-Reports/i18n.json')
                .then($.proxy(this.init, this));
        },
        init: function(i18n) {
            this.i18n = i18n;
            if (onVSTF) {
                this.initVSTF();
            } else if (onContribs) {
                this.initContribs();
            }
        },
        reasons: $.extend({
            vandalism: 'Vandalism',
            spam: 'Spam',
            profile: 'Spam'
        }, window.VSTFReportReasons),
        initVSTF: function() {
            mw.hook('vstf.reports').add($.proxy(this.reporting, this));
        },
        reporting: function($button) {
            $button.click();
            $('#requestWindow #submit').click($.proxy(this.setCachebuster, this));
            $('#wikiname').val(mw.util.getParamValue('name'));
            $('#wikiurl').val(mw.util.getParamValue('url'));
            $('#user').val(mw.util.getParamValue('user'));
            $('#comment').val(this.reasons[$button.attr('id').substr(12)]);
        },
        setCachebuster: function() {
            $.storage.set('VSTFReported', mw.util.getParamValue('cb'));
        },
        initContribs: function() {
            $('<div>', {
                id: 'VSTFReportButtons',
                html: $.map(this.pages, $.proxy(function(v, k) {
                    return $('<a>', {
                        'class': 'wds-button wds-is-squished VSTFReportButton',
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
                            'button' + k.charAt(0).toUpperCase() + k.substring(1)
                        ).plain()
                    });
                }, this))
            }).insertAfter('#contentSub');
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
        article: 'u:dev:MediaWiki:VSTFReport.css'
    });
    mw.hook('dev.i18n').add($.proxy(VSTFReport.preload, VSTFReport));
})();
/**
 * Name:        VSTFReport
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description:
 *      Used for easier reporting vandalism to VSTF.
 *      Adds a "Report to VSTF" link to user's contributions
 *      The link automatically opens the VSTF vandalism report page
 *      and auto-fills the window with information about the user that is reported
 *      The whole process isn't automatical, as description for vandalism still needs to
 *      be filled in and the form isn't auto-submitted.
 * Version:     v1.3
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
                 mw.util.getParamValue('cb') !== window.localStorage.getItem('VSTFReported') &&
                 $('.gran-bn.boton-solicitud').exists(),
        onContribs = config.wgCanonicalSpecialPageName === 'Contributions',
        onSelf = $('.UserProfileMasthead .masthead-info h1').text() === config.wgUserName;
    if (!onVSTF && !onContribs || onSelf || window.VSTFReportLoaded) {
        return;
    }
    window.VSTFReportLoaded = true;
    var VSTFReport = {
        baseURL: '//vstf.fandom.com/wiki/Report:',
        pages: {
            vandalism: 'Vandalism',
            spam: 'Spam',
            profile: 'User profile headers'
        },
        preload: function(i18n) {
            i18n.loadMessages('u:vstf:MediaWiki:Custom-Reports/i18n.json')
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
            window.localStorage.setItem('VSTFReported', mw.util.getParamValue('cb'));
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
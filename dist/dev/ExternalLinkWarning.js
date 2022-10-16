// Shows a warning dialog when an external link is clicked.
// @author Aspallar, fngplg

;(function ($, mw) {

    'use strict';
    if (window.ExternalLinkWarningLoaded) return;
    window.ExternalLinkWarningLoaded = true;

    if (window.ExternalLinkWarningNamespaces) {
        if (!Array.isArray(window.ExternalLinkWarningNamespaces)) {
            console.error('ExternalLinkWarning.js => ExternalLinkWarningNamespaces is not an array.');
        } else if (window.ExternalLinkWarningNamespaces.indexOf(mw.config.get('wgCanonicalNamespace')) === -1) {
            return;
        }
    }

    if (window.ExternalLinkWarningPageRegex) {
        if (window.ExternalLinkWarningPageRegex instanceof RegExp) {
            if (!window.ExternalLinkWarningPageRegex.test(new mw.Uri(window.location.href).path))
                return;
        } else {
            console.error('ExternalLinkWarning.js => ExternalLinkWarningPageRegex is not a RegExp');
        }
    }

    var msg = [
        'External Link', // title
        'You are following a link to $1, a site that is not part of Fandom. Are you sure you wish to do this?', // message
        'Continue', // continue
        'Cancel' // cancel
    ],
    preloads = 2;

    function externalLinkClick (event) {
        /*jshint -W040 */ // allow old school jquery this
        var linkhref = $(this).attr('href');
        event.preventDefault();
        var message = $('<p>').html(msg[1].replace('$1', mw.html.escape(linkhref)));
        var $modal = window.dev.showCustomModal(msg[0], message, {
            id: 'form-external-link-confirm',
            width: 350,
            buttons: [
                {
                    message: msg[2],
                    defaultButton: true,
                    handler: function () {
                        window.location = linkhref;
                    }
                }, {
                    message: msg[3],
                    handler: function () {
                        window.dev.showCustomModal.closeModal($modal);
                    }
                }
            ]
        });
    }

    function preload() {
        if (--preloads > 0) return;
        window.dev.i18n.loadMessages('ExternalLinkWarning').done(function (i18no) {
            msg = [
                i18no.msg('title-text').plain(),
                i18no.msg('message-text').plain(),
                i18no.msg('continue').plain(),
                i18no.msg('cancel').plain()
            ];
            mw.loader.using('mediawiki.api').then(function () {
                new mw.Api().get({
                    action: 'query',
                    meta: 'allmessages',
                    ammessages: 'Custom-ExternalLinkWarning',
                    formatversion: 2
                }).done(function(data) {
                    if (data.query.allmessages[0].missing) return;
                    var texts = data.query.allmessages[0]['*'].split('|');
                    for (var i=0; i<3; i++) {
                    	msg[i] = texts[i].length>0 ? mw.html.escape(texts[i]) : msg[i];
                    }
                });
            });
        });
        $('body').on('click', 'a.external', externalLinkClick);
    }

    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.showCustomModal').add(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:ShowCustomModal.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });

}(window.jQuery, window.mediaWiki));
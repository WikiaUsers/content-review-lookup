/**
 * Ajax Fast Delete
 *
 * @author Splarka
 * @author Uberfuzzy
 * @author Grunny
 *
 * @version 2.7
 */
;(function($, mw, window) {
    'use strict';

    window.dev = (window.dev || {});

    const conf = mw.config.get([
        'wgNamespaceNumber',
        'wgPageName',
        'wgArticleId'
    ]);

    // Loading restrictions
    if (
        window.dev.ajaxFastDelete !== undefined ||
        !window.fdButtons ||
        conf.wgNamespaceNumber === -1 ||
        conf.wgArticleId === 0 ||
        (conf.wgNamespaceNumber === 2 && $('.noarticletext').length) ||
        (conf.wgNamespaceNumber != 2 && !$('#ca-delete').length) ||
        !/sysop|staff|wiki-specialist|content-moderator|soap/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }

    // Main script function
    function init(i18n) {
        const self = {
            version: '2.7',
            init: function() {
                const $profile = $('.UserProfileActionButton');
                const $blogs = $('.page-header__subtitle-blog-post');
                const $title = $('.page-header__title');

                // Map config object to get buttons' HTML
                const deleteBtns = window.fdButtons.map(function(btn) {
                    return $('<a>', {
                        class: 'wds-button',
                        title: i18n.msg('delete-title', btn.summary).plain(),
                        text: btn.label,
                        'data-summary': btn.summary,
                        'data-id': 'fastdelete',
                    });
                });

                const buttonsWrapper = $('<span>', {
                    id: 'FastDeleteBtns',
                    html: deleteBtns
                });

                // Apply CSS
                mw.util.addCSS(
                    '#FastDeleteBtns > a { margin-left: 3px; }\
                    .page-header__blog-post-details { margin-right: 5px; }'
                );

                // Place buttons
                $title.append(buttonsWrapper);

                // Handle click events
                const btnElements = $('a[data-id="fastdelete"]');
                if (btnElements.length) {
                    btnElements.click(function() {
                        const deleteReason = $(this).attr('data-summary');

                        // Delete immediately if NoConfirm option is set
                        if (!!window.FastDeleteNoConfirm) {
                            self.deletePage(deleteReason);
                        } else {
                            // Otherwise ask for confirmation first
                            const isConfirmed = confirm(i18n.msg('areyousure', deleteReason).plain());
                            if (isConfirmed) {
                                self.deletePage(deleteReason);
                            }
                        }
                    });
                }

                // Fire the hook
                mw.hook('fastdelete.init').fire(buttonsWrapper);
            },
            deletePage: function(deleteReason) {
                new mw.Api().post({
                    action: 'delete',
                    title: conf.wgPageName,
                    reason: deleteReason,
                    bot: true,
                    token: mw.user.tokens.get('csrfToken')
                }).done(function(res) {
                    if (res.error) {
                        return alert(
                            i18n.msg('error-api', res.error.code, res.error.info).plain()
                        );
                    }
                    console.log(i18n.msg('success', conf.wgPageName).plain());
                    location.reload();
                }).fail(function() {
                    return alert(
                        i18n.msg('error-ajax').plain()
                    );
                });
            }
        };

        // Export the script
        window.dev.ajaxFastDelete = self;

        // Run init function with dependencies
        mw.loader.using([
            'mediawiki.util',
            'mediawiki.api'
        ]).then(self.init);
    }

    // Load i18n messages
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('FastDelete').then(init);
    });

    // Load i18n-js lib
    if (!window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
})(jQuery, mediaWiki, window);
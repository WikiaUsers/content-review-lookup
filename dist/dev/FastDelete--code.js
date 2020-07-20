/**
 * Ajax Fast Delete
 *
 * @author Splarka
 * @author Uberfuzzy
 * @author Grunny
 *
 * @version 2.6
 */
;(function($, mw, window) {
    window.dev = (window.dev || {});
 
    // Don't load twice...
    if (window.dev.ajaxFastDelete !== undefined) {
        return false;
    }
 
    var conf = mw.config.get([
            'wgNamespaceNumber',
            'wgPageName',
            'wgVersion'
        ]),
        isUCP = conf.wgVersion !== '1.19.24';
 
    function init(i18n) {
        var self = {
            version: '2.6',
            init: function() {
                if (
                    conf.wgNamespaceNumber === -1 ||
                    !window.fdButtons ||
                    (conf.wgNamespaceNumber === 2 && isUCP && $(".noarticletext").length) ||
                    (conf.wgNamespaceNumber != 2 && isUCP && !$('#ca-delete').length) ||
                    !isUCP && !$('#ca-delete').length
                ) return;
                var deleteButtons = '',
                    $profile;
                if (isUCP) {
                    $profile = $('.ns-2 .page-header__contribution-buttons');
                } else {
                    $profile = $('.UserProfileActionButton');
                }
                var deleteBtns = window.fdButtons.map(function(b) {
                    var sum = b.summary,
                        cssBtns;
                    if (isUCP) {
                        cssBtns = 'wds-button';
                    } else {
                        cssBtns = $profile.length ? 'wikia-button' : 'wds-button';
                    }
                    return '<a class="' + cssBtns + '" title="' + i18n.msg('delete-title', sum).escape() + '" data-summary="' + sum + '" data-id="fastdelete">' + b.label + '</a>';
                }).join('&nbsp;');
                deleteButtons = '<span id="FastDeleteBtns">' + deleteBtns + '</span>';
 
                if ($profile.length) {
                    $profile.append(deleteButtons);
                } else if (!isUCP && $('.page-header__subtitle-blog-post').length) {
                    $('.page-header__subtitle-blog-post').append(deleteButtons);
                    $('.page-header__blog-post-details').css('margin-right', '5px');
                } else {
                    $('.page-header__title').append(deleteButtons);
                    mw.util.addCSS('a[data-id="fastdelete"]:nth-child(1){margin-left:5px}');
                    mw.util.addCSS('.page-header__title #FastDeleteBtns > a:not(:first-child) {margin-left: -5px;}');
                }
 
                if ($('a[data-id="fastdelete"]').length) {
                    $('a[data-id="fastdelete"]').click(function() {
                        if (window.FastDeleteNoConfirm || confirm(i18n.msg('areyousure').plain()) === true) {
                            self.deletePage($(this).attr('data-summary'));
                        } else {
                            return;
                        }
                    });
                }
                mw.hook('fastdelete.init').fire(deleteButtons);
            },
            deletePage: function(deleteReason) {
                (new mw.Api())
                .post({
                        action: 'delete',
                        title: conf.wgPageName,
                        reason: deleteReason,
                        token: mw.user.tokens.get(isUCP ? 'csrfToken' : 'editToken')
                    })
                    .done(function(res) {
                        location.reload();
                    });
            }
        };
 
        window.dev.ajaxFastDelete = self;
 
        mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
            $(self.init);
        });
    }
 
    // i18n
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('FastDelete').then(init);
    });
 
 
    if (!window.dev || !window.dev.i18n) {
        if (isUCP) {
            mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js');
        } else {
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:I18n-js/code.js'
            });
        }
    }
})(jQuery, mediaWiki, window);
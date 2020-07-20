/**
 * Name:            AjaxCommentDelete
 * Version:         v1.3
 * Author(s):       KockaAdmiralac <1405223@gmail.com>
 *                  Ozank Cx (for API calls)
 * Description:     Allows deleting comments without leaving the page.
 */
(function() {
    'use strict';
    if (
        !$('#WikiaArticleComments').exists() ||
        window.AjaxCommentDeleteLoaded ||
        (
            !$('#ca-delete').exists() &&
            mw.config.get('wgUserGroups').indexOf('threadmoderator') === -1
        )
    ) {
        return;
    }
    window.AjaxCommentDeleteLoaded = true;
    if(!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    /**
     * Main object
     * @class AjaxCommentDelete
     */
    var AjaxCommentDelete = {
        /**
         * Script configuration
         * @property config
         * @type Object
         */
        config: window.AjaxCommentDeleteConfig || {},
        /**
         * Method for initializing plugin hooks
         * @method init
         */
        init: function(i18n) {
            this.i18n = i18n;
            this.api = new mw.Api();
            mw.hook('wikipage.content').add($.proxy(this.commentInit, this));
        },
        /**
         * Calls normal comment initialization method and then the main method
         * @method commentInit
         */
        commentInit: function($content) {
            if($content && $content.attr && $content.attr('id') === 'article-comments') {
                this.main();
            }
        },
        /**
         * Event called upon switching the comment page
         * @method switchPage
         */
        switchPage: function() {
            var interval = setInterval($.proxy(function() {
                if(!ArticleComments.$commentsList.hasClass('loading')) {
                    clearInterval(interval);
                    this.main();
                }
            }, this), 1000);
        },
        /**
         * Creates deletion links
         * @method main
         */
        main: function() {
            $('.article-comments-pagination-link').click($.proxy(this.switchPage, this));
            $('span.tools').append(
                $('<a>', {
                    'class': 'AjaxCommentDeleteLink',
                    text: this.msg('link'),
                    href: '#'
                }).click($.proxy(this.onClick, this))
            );
        },
        /**
         * Event called upon clicking a deletion link
         * @method onClick
         * @param {Event} e Triggered click event
         */
        onClick: function(e) {
            e.preventDefault();
            var id = $(e.currentTarget).closest('.comment').attr('id').substring(5);
            if(this.config.fastDelete) {
                this.deleteComment(id, this.config.fastDelete);
            } else {
                this.showModal(id);
            }
        },
        /**
         * For showing the deletion reason modal
         * @method showModal
         * @param {Number} id Comment ID to delete
         */
        showModal: function(id) {
            $.showCustomModal(this.msg('title'), this.i18n.msg('reason').escape() + mw.html.element('input', {
                type: 'text',
                id: 'AjaxCommentDeleteReason'
            }), {
                id: 'AjaxCommentDeleteModal',
                buttons: [
                    {
                        id: 'AjaxCommentDeleteRemoveButton',
                        defaultButton: true,
                        message: this.msg('delete'),
                        handler: $.proxy(function() {
                            $('#AjaxCommentDeleteModal').closeModal();
                            this.deleteComment(id, $('#AjaxCommentDeleteReason').val());
                        }, this)
                    },
                    {
                        id: 'AjaxCommentDeleteCloseButton',
                        defaultButton: true,
                        message: this.msg('close'),
                        handler: function(){
                            $('#AjaxCommentDeleteModal').closeModal();
                        }
                    }
                ]
            });
        },
        /**
         * Function for deleting a comment.
         * @param {String} id ID of the comment page to delete
         * @param {String} reason Reason for deletion
         * @author KockaAdmiralac
         * @author Ozank Cx
         */
        deleteComment: function(id, reason) {
            this.api.postWithEditToken({
                action: 'delete',
                pageid: id,
                reason: reason,
                bot: true,
                watchlist: 'unwatch'
            }).done($.proxy(function(d) {
                if (d.error) {
                    new BannerNotification(this.msg('fail') + ': ' + d.error.code, 'error').show();
                } else {
                    // Hiding the deleted comment
                    var el = $('#comm-' + id),
                        next = el.next();
                    el.slideToggle();
                    if(next.is('ul')) {
                        next.slideToggle();
                    }
                }
            }, this)).fail($.proxy(function() {
                new BannerNotification(this.msg('fail'), 'error').show();
            }, this));
        },
        /**
         * Gets a plain i18n message
         * @method msg
         * @param {String} name Name of the message
         * @return {String} I18n message
         */
        msg: function(name) {
            return this.i18n.msg(name).plain();
        }
    };
    // Welcome to my special callback hell
    mw.loader.using('mediawiki.api.edit').then(function() {
        mw.hook('dev.i18n').add(function(i18n) {
            i18n.loadMessages('AjaxCommentDelete').done($.proxy(AjaxCommentDelete.init, AjaxCommentDelete));
        });
    });
})();
/**
 * Name:            AjaxThreadDelete
 * Version:         v1.2
 * Author(s):       KockaAdmiralac <1405223@gmail.com>
 * Description:     Allows deleting threads without leaving the page.
 */
(function() {
    'use strict';
    var config = mw.config.get([
        'wgUserGroups',
        'wgNamespaceIds',
        'wgNamespaceNumber'
    ]),
        n = config.wgNamespaceNumber,
        ids = config.wgNamespaceIds;
    if (
        [ids.thread, ids.board, ids.board_thread].indexOf(n) === -1 ||
        !/sysop|content-moderator|staff|helper|content-team-member|wiki-manager|soap/.test(config.wgUserGroups.join('|'))
    ) {
        return;
    }
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    /**
     * Main object
     * @class AjaxThreadDelete
     */
    var AjaxThreadDelete = {
        /**
         * Configuration object
         * @property config
         * @type Object
         */
        config: window.AjaxThreadDeleteConfig || {},
        /**
         * List of pages to delete
         * @property pages
         * @type Array
         */
        pages: [],
        /**
         * Initializer
         * @method init
         * @param {Object} i18n I18N object
         */
        init: function(i18n) {
            i18n.useUserLang();
            this.i18n = i18n;
            this.api = new mw.Api();
            this.suffix = n === ids.board ? 'Board' : 'Thread';
            this['init' + this.suffix]();
        },
        /**
         * Generates the deletion button element
         * @method generateButton
         */
        generateButton: function() {
            return $('<li>').append(
                $('<a>', {
                    'class': 'AjaxThreadDeleteButton AjaxThreadDelete' + this.suffix + 'Button',
                    text: this.msg('delete'),
                    click: $.proxy(this['click' + this.suffix], this)
                })
            );
        },
        /**
         * Generates an error banner notification
         * @method error
         * @param {String} error API error that occurred
         */
        error: function(err) {
            var msg = this.msg('fail');
            if (err) {
                msg += ': ' + err;
            }
            new BannerNotification(msg, 'error').show();
        },
        /**
         * Initializes UI if currently on a thread page
         * @method initThread
         */
        initThread: function() {
            $('.message-main .WikiaMenuElement')
                .append(this.generateButton());
            mw.hook('AjaxThreadDelete.init.thread').fire();
        },
        /**
         * Event called upon clicking on a thread deletion button
         * @method threadClick
         * @param {ClickEvent} e Triggered click event
         */
        clickThread: function(e) {
            this.showModal($(e.currentTarget).closest('.SpeechBubble').data().id);
        },
        /**
         * Initializes UI if currently on a board page
         * @method initBoard
         */
        initBoard: function() {
            $('.Pagination li a').click($.proxy(this.switchPage, this));
            this.titles = {};
            this.api.get({
                action: 'query',
                pageids: $('.ThreadList .thread')
                    .map(function() {
                        return $(this).data('id');
                    })
                    .toArray()
                    .join('|')
            }).done($.proxy(this.boardInitCallback, this));
        },
        /**
         * Called upon switching a board page
         * @method switchPage
         */
        switchPage: function() {
            var interval = setInterval($.proxy(function() {
                if ($('.ThreadList').css('opacity') === 1) {
                    clearInterval(interval);
                    this.initBoard();
                }
            }, this), 500);
        },
        /**
         * Called after onload board query
         * @method boardInitCallback
         * @param {Object} d Data returned from the API
         */
        boardInitCallback: function(d) {
            if (d.query) {
                $.each(d.query.pages, $.proxy(function(k, v) {
                    this.titles[k] = v.title.substring(13);
                }, this));
                mw.hook('AjaxThreadDelete.init.board').fire();
                $('.ThreadList .thread .thread-right .activity')
                    .append(this.generateButton());
            }
        },
        /**
         * Event called upon clicking on a board thread deletion button
         * @method boardClick
         * @param {ClickEvent} e Triggered click event
         */
        clickBoard: function(e) {
            this.showModal($(e.target).closest('.thread').data('id'));
        },
        /**
         * Deletes a board thread
         * @method deleteThreadBoard
         * @param {Number} id Thread's ID
         */
        deleteThreadBoard: function(id) {
            this.api.get({
                action: 'query',
                list: 'allpages',
                apprefix: this.titles[id],
                apnamespace: 2001,
                aplimit: 'max'
            }).done($.proxy(this.deleteThreadBoardCallback, this))
            .fail($.proxy(this.error, this));
        },
        /**
         * API query callback after fetching child board thread titles
         * @method deleteThreadBoardCallback
         * @param {Object} d API query result
         */
        deleteThreadBoardCallback: function(d) {
            if (d.error) {
                this.error(d.error.code);
            } else {
                this.pages = d.query.allpages.map(function(el) {
                    return el.pageid;
                });
                this.startDeletion();
            }
        },
        /**
         * Sets an interval for page deletion
         * @method startDeletion
         */
        startDeletion: function() {
            this.interval = setInterval($.proxy(this.deleteProcess, this), this.config.interval || 10);
        },
        /**
         * Deletes and hides a thread
         * @method interval
         */
        deleteProcess: function() {
            var id = this.pages.pop();
            if (!id) {
                clearInterval(this.interval);
                return;
            }
            this.api.post({
                action: 'delete',
                pageid: id,
                reason: this.config.reason || this.i18n.inContentLang().msg('summary').plain(),
                bot: true,
                watchlist: 'unwatch',
                token: mw.user.tokens.get('editToken')
            }).done($.proxy(function(d) {
                if (d.error) {
                    this.error(d.error.code);
                } else {
                    $('[data-id="' + id + '"]').slideToggle(function() {
                        $(this).remove();
                    });
                }
            }, this)).fail($.proxy(this.error, this));
        },
        /**
         * Deletes a thread, if it's an original post, every child post of it, too.
         * @method deleteThreadThread
         * @param {Number} id The ID of the thread to delete
         */
        deleteThreadThread: function(id) {
            if ($('.SpeechBubble[data-id="' + id + '"]').hasClass('message-main')) {
                $('.SpeechBubble.message-main').find('.SpeechBubble').each($.proxy(function(_, el) {
                    var cid = $(el).data('id');
                    if (cid) {
                        this.pages.push(cid);
                    }
                }, this));
            }
            this.pages.push(id);
            this.startDeletion();
        },
        /**
         * Shows a confirmation modal before deleting a thread
         * @method showModal
         * @param {Number} id The ID of the thread to delete
         */
        showModal: function(id) {
            var callback = this['deleteThread' + this.suffix],
                context = this;
            if (this.config.fastDelete) {
                callback.call(this, id);
                return;
            }
            $.showCustomModal(
                this.i18n.msg('title').escape(),
                this.msg('help'),
                {
                    id: 'AjaxThreadDeleteModal',
                    buttons: [
                        {
                            id: 'AjaxThreadDeleteDeleteButton',
                            defaultButton: true,
                            message: this.i18n.msg('delete').escape(),
                            handler: function() {
                                callback.call(context, id);
                                $('#AjaxThreadDeleteModal').closeModal();
                            }
                        },
                        {
                            id: 'AjaxThreadDeleteCloseButton',
                            defaultButton: true,
                            message: this.i18n.msg('close').escape(),
                            handler: function() {
                                $('#AjaxThreadDeleteModal').closeModal();
                            }
                        }
                    ]
                }
            );
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
    mw.hook('dev.i18n').add(function(i18n) {
        $.when(
            i18n.loadMessages('AjaxThreadDelete'),
            mw.loader.using('mediawiki.api')
        ).done($.proxy(AjaxThreadDelete.init, AjaxThreadDelete));
    });
})();
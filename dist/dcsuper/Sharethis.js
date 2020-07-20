$('.article-comm-text').before('<div id="rating-comment"><button class="like">Like</button><span class="likes">0</span></div>');

/**
 * like-dislike.js jQuery plugin
 * Copyright 2016, Maxim Tkachuk, mxtkachuk@gmail.com
 * Licensed under the MIT license
 */
(function ($) {

    var likeBtn = 'like';
    var dislikeBtn = 'dislike';

    var methods = {
        init: function (options) {
            this.opts = $.extend(true, {}, $.fn.likeDislike.defaults, options);
            var opts = this.opts;

            this.btns = $(this).find('.' + opts.likeBtnClass + ', .' + opts.dislikeBtnClass);

            this.readOnly = methods.readOnly;

            opts.readOnly = !opts.readOnly;
            this.readOnly(!opts.readOnly);

            if (opts.initialValue !== 0) {
                var activeBtn = opts.initialValue === 1 ? likeBtn : dislikeBtn;
                methods._btnDown.call(this, activeBtn);
            }

            return this;
        },
        readOnly: function (state) {
            var opts = this.opts;
            if (opts.readOnly !== state) {
                var btns = this.btns;
                opts.readOnly = state;
                if (!state) {
                    if (!opts.reverseMode) {
                        var notActiveBtn = btns.not('.' + opts.activeClass);
                        if (notActiveBtn.length) {
                            btns = notActiveBtn;
                        }
                    }
                    methods._bind.call(this, btns);
                } else {
                    methods._unbind.call(this, btns);
                }
            }
        },
        _btnDown: function (btnType) {
            var btn = methods._getBtnByType.call(this, btnType);
            btn.addClass(this.opts.activeClass);

            if (!this.opts.reverseMode) {
                methods._unbind.call(this, btn);
            }
        },
        _btnUp: function (btnType) {
            var btn = methods._getBtnByType.call(this, btnType);

            if (!this.opts.reverseMode) {
                methods._bind.call(this, btn);
            }

            btn.removeClass(this.opts.activeClass);
        },
        _getBtnByType: function (btnType) {
            if (btnType === likeBtn) {
                return $(this).find('.' + this.opts.likeBtnClass);
            } else if (btnType === dislikeBtn) {
                return $(this).find('.' + this.opts.dislikeBtnClass);
            } else {
                $.error('Wrong button type: ' + btnType);
            }
        },
        _bind: function (btn) {
            var self = this;
            var opts = self.opts;

            btn.removeClass(opts.disabledClass);

            btn.bind('click', function (event) {
                var btn = $(this);

                var isClickable = !(opts.beforeClick && !opts.beforeClick.call(self, event));

                if (isClickable) {
                    var btnType = btn.hasClass(opts.likeBtnClass) ? likeBtn : dislikeBtn;
                    var hasActive = self.btns.hasClass(opts.activeClass);
                    var isActive = btn.hasClass(opts.activeClass);

                    var value = 0;

                    if (opts.reverseMode) {
                        if (btnType === likeBtn) {
                            if (isActive) {
                                methods._btnUp.call(self, likeBtn);
                            } else {
                                methods._btnUp.call(self, dislikeBtn);
                                methods._btnDown.call(self, likeBtn);
                                value = 1;
                            }
                        } else {
                            if (isActive) {
                                methods._btnUp.call(self, dislikeBtn);
                            } else {
                                methods._btnUp.call(self, likeBtn);
                                methods._btnDown.call(self, dislikeBtn);
                                value = -1;
                            }
                        }
                    } else {
                        if (btnType === likeBtn) {
                            if (hasActive) {
                                methods._btnUp.call(self, dislikeBtn);
                                methods._btnDown.call(self, likeBtn);
                                value = !isActive ? 1 : 0;
                            } else {
                                methods._btnDown.call(self, likeBtn);
                                value = 1;
                            }
                        } else {
                            if (hasActive) {
                                methods._btnUp.call(self, likeBtn);
                                methods._btnDown.call(self, dislikeBtn);
                                value = !isActive ? -1 : 0;
                            } else {
                                methods._btnDown.call(self, dislikeBtn);
                                value = -1;
                            }
                        }
                    }

                    opts.click.call(self, value, btnType, event);
                }
            });
        },
        _unbind: function (btn) {
            btn.addClass(this.opts.disabledClass);
            btn.unbind();
        }
    };

    $.fn.likeDislike = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };

    $.fn.likeDislike.defaults = {
        click: null,
        beforeClick: null,
        initialValue: 0,
        readOnly: false,
        reverseMode: false,
        likeBtnClass: 'like',
        dislikeBtnClass: 'dislike',
        activeClass: 'active',
        disabledClass: 'disabled'
    };

})(jQuery);

$('#rating-comment').likeDislike({
       reverseMode: true,
        disabledClass: 'disable',
        click: function (value, btnType, event) {
            var likes = $(this).find('.likes');
            var dislikes = $(this).find('.dislikes');
            value === 1 ? likes.text('1') : likes.text('0');
            value === -1 ? dislikes.text('1') : dislikes.text('0');
        }
    });
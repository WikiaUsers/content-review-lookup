/* ShowCustomModal
 *
 * $.showCustomModal brought to UCP without polluting the jQuery global
 * QoL updates include:
 * - Let you pass the options as the 2nd argument instead of 3rd, with `content` replacing the content
 * - closeModal functions now properly handle multiple inputs
 * - Buttons don't need an id not to have id="undefined"
 * Pain points not addressed:
 * - Body class .modalShown still unstable if more than one modal shown at once, don't rely on it
 * - Ugly code inside
 *
 * @author Dorumin, kinda
 *
 * Used files: [[File:SCM-icon-close.png]]
 */

(function() {
    if (window.dev && dev.showCustomModal) return;

    var closeModal = function($modals) {
        $modals.each(function(_, modal) {
            var $modal = $(modal);
            $(window).off('.modal' + $modal.attr('id'));
            $modal.animate({
                top: $modal.offset().top + 100,
                opacity: 0
            }, 'fast', function() {
                $modal.detach();
            });

            var $blackout = $modal.data('blackout');
            var settings = $modal.data('settings');
            $blackout.fadeOut('fast', function() {
                $modal.detach();
                $blackout.detach();

                var callback = settings && settings.onAfterClose;
                if ($.isFunction(callback)) {
                    callback();
                }
            });
            $(document.body).removeClass('modalShown');
        });
    };

    var hideModal = function($modals) {
        $modals.each(function(_, modal) {
            var $modal = $(modal);
            var $blackout = $modal.data('blackout');
            var settings = $modal.data('settings');
            $blackout.fadeOut('fast').addClass('blackoutHidden');
            $modal.animate({
                top: $modal.offset().top + 100,
                opacity: 0
            }, 'fast', function() {
                $modal.hide();
                var callback = settings && settings.onAfterClose;
                if ($.isFunction(callback)) {
                    callback();
                }
            });
            $(document.body).removeClass('modalShown');
        });
    };

    var showModal = function($modal) {
        var wrapper = $modal.closest('.modalWrapper');
        var zIndex = 5001101 + ($('body').children('.blackout').length) * 2;
        var $blackout = $modal.data('blackout');
        var blackoutOpacity = $blackout.attr('data-opacity');
        if (!blackoutOpacity) {
            blackoutOpacity = 0.65;
        }
        $blackout.css({
            display: 'block',
            opacity: blackoutOpacity,
            zIndex: zIndex
        }).removeClass('blackoutHidden').appendTo('body');
        wrapper.css({
            top: getModalTopOffset(wrapper),
            zIndex: zIndex + 1,
            opacity: 1,
            display: 'block'
        }).appendTo('body');
        $(document.body).addClass('modalShown');
    };

    var getModalTopOffset = function($wrapper) {
        var top = Math.max((($(window).height() - $wrapper.outerHeight()) / 2), 20);
        var opts = $wrapper.data('settings');
        if (opts && typeof opts.topMaximum == 'number') {
            top = Math.min(top, opts.topMaximum);
        }
        return $(window).scrollTop() + top;
    };

    var makeModal = function($dialog, options) {
        var settings = {
            showCloseButton: true,
            width: 400,
            height: 'auto',
            tabsOutsideContent: !1,
            topOffset: 50,
            escapeToClose: !0
        }, calculatedZIndex, modalWidth, mainContent;

        if (options) {
            $.extend(settings, options);
        }

        var ts = Math.round(Date.now() / 1000);
        var id = settings.id || ($dialog.attr('id') || ts) + 'Wrapper';
        var wrapper = $('<section>', {
            'class': 'SCMModal modalWrapper',
            'id': id
        }).append($('<section>', {
            'class': 'modalContent'
        }).append($dialog)).appendTo('body');

        if (settings.className) {
            wrapper.addClass(settings.className);
        }

        var zIndex = settings.zIndex ? parseInt(settings.zIndex) : (5001101 + ($('body').children('.blackout').length) * 2);
        calculatedZIndex = zIndex + 1;
        wrapper.data('settings', settings);
        if (!settings.noHeadline) {
            var headline = wrapper.find('h1:first');
            if (headline.length !== 0) {
                headline.remove();
            } else {
                headline = $('<h1>').html($dialog.attr('title') || '');
            }
            headline.prependTo(wrapper);
        }

        var modalTabs = wrapper.find('.modal-tabs');
        if (modalTabs.length !== 0) {
            modalTabs.insertBefore(wrapper.find('.modalContent'));
        }

        if (settings.width !== 'auto') {
            if (settings.width !== undefined) {
                modalWidth = settings.width + 40;
            } else {
                mainContent = $('#WikiaMainContent');
                if (mainContent.length > 0) {
                    modalWidth = mainContent.width();
                }
            }
        } else {
            modalWidth = 'auto';
        }

        wrapper.width(modalWidth).css({
            left: '50%',
            height: settings.height,
            'margin-left': -wrapper.outerWidth(false) / 2,
            top: $(window).scrollTop() + settings.topOffset,
            zIndex: calculatedZIndex
        });

        if (settings.showCloseButton) {
            wrapper.prepend('<button class="close wikia-chiclet-button"><img src="https://images.wikia.com/dev/images/3/31/SCM-icon-close.png"></button>');
        }

        $dialog.removeAttr('title');
        var persistent = (typeof settings.persistent == 'boolean') ? settings.persistent : !1;
        var closeOnBlackoutClick = (typeof settings.closeOnBlackoutClick == 'boolean') ? settings.closeOnBlackoutClick : !0;
        wrapper.find('.close').on('click', function() {
            var wrapper = $dialog.closest('.modalWrapper');
            var settings = wrapper.data('settings');
            if (typeof settings.onClose == 'function') {
                if (settings.onClose({
                    click: 1
                }) === false) {
                    return;
                }
            }

            if (persistent) {
                hideModal(wrapper);
            } else {
                closeModal(wrapper);
            }
        });

        if (settings.escapeToClose) {
            $(window).on('keydown.modal' + id, function(event) {
                if (event.keyCode == 27) {
                    if (typeof settings.onClose == 'function') {
                        if (settings.onClose({
                            keypress: 1
                        }) === false) {
                            return;
                        }
                    }

                    if (persistent) {
                        hideModal(wrapper);
                    } else {
                        closeModal(wrapper);
                    }

                    return false;
                }
            });
        }

        // $(window).on('resize.modal', function() {
        //     if (!settings.resizeModal) {
        //         return;
        //     }

        //     wrapper.css('top', getModalTopOffset(wrapper));
        //     $('.blackout:last').height($(document).height());
        // });

        var blackoutOpacity = 0.65;
        if (settings.blackoutOpacity) {
            blackoutOpacity = settings.blackoutOpacity;
        }

        var blackout = $('<div>').addClass('SCMBlackout blackout').attr('data-opacity', blackoutOpacity);
        blackout.css({
            zIndex: zIndex,
            opacity: 0
        }).fadeTo('fast', blackoutOpacity).on('click', function() {
            if (!closeOnBlackoutClick) {
                return;
            }
            if (typeof settings.onClose == 'function') {
                if (settings.onClose({
                    click: 1
                }) == false) {
                    return;
                }
            }
            if (persistent) {
                hideModal(wrapper);
            } else {
                closeModal(wrapper);
            }
        });

        blackout.appendTo('body');

        wrapper.data('blackout', blackout);
        if (typeof settings.onCreate == 'function') {
            settings.onCreate($dialog, wrapper);
        }
        $(document.body).addClass('modalShown');

        return wrapper;
    };

    var showCustomModal = function(title, content, options) {
        var buttons = '', buttonNo, button, dialog, modal;
        if (typeof options === 'undefined' && typeof content === 'object') {
            options = content;
            content = content.content || '';
            delete options.content;
        }
        if (typeof options !== 'object') {
            options = {};
        }

        if (options.buttons) {
            buttons = $('<div class="neutral modalToolbar"></div>');

            for (buttonNo = 0; buttonNo < options.buttons.length; buttonNo++) {
                var button = options.buttons[buttonNo];
                var $button = $('<a>');
                if (button.id) {
                    $button.attr('id', button.id);
                }

                $button.addClass('wikia-button');
                if (!button.defaultButton) {
                    $button.addClass('secondary');
                }

                $button.html(button.message);
                $button.on('click', button.handler);

                $button.appendTo(buttons);
            }
        }

        dialog = $('<div>').append(content).attr('title', title).append(buttons);
        $('body').append(dialog);

        if (typeof options.callbackBefore === 'function') {
            options.callbackBefore();
        }

        modal = makeModal(dialog, options);

        if (typeof options.callback === 'function') {
            options.callback(modal);
        }

        return modal;
    };

    showCustomModal.makeModal = makeModal;
    showCustomModal.hideModal = hideModal;
    showCustomModal.showModal = showModal;
    showCustomModal.closeModal = closeModal;
    showCustomModal.getModalTopOffset = getModalTopOffset;

    var imported = importArticle({
        type: 'style',
        article: 'w:c:dev:MediaWiki:ShowCustomModal.css'
    });
    var fire = function() {
        mw.hook('dev.showCustomModal').fire(showCustomModal);
    };

    imported.then(fire);

    window.dev = window.dev || {};
    dev.showCustomModal = showCustomModal;
})();
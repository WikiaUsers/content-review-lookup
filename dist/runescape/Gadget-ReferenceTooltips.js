/**
 * Reference tooltips
 *
 * Adds a tooltip to references when hovering over or clicking them
 * Based on [[mw:Reference tooltips]]
 *
 * @author Cqm
 *
 * @todo Add fade in/fade out animations for config form and tooltip
 * @todo Find some way to detect of user has keyboard/mouse
 *       as windows 8 supports touchscreens and a mouse
 *       so allow hover activation if that's the case
 *
 */

;(function ($, mw) {

    'use strict';

    function tooltips() {

        var i,
            settings,
            timer;

        /**
         * Cookie functions
         */
        function createCookie() {

            $.cookie('ref-tooltips', 'on-200-hover', {
                path: '/',
                expires: 90
            });

            return 'on-200-hover';

        }

        function getCookie() {

            var cookie = $.cookie('ref-tooltips') || createCookie(),
                storedVars = cookie.split('-'),
                touchscreen = 'ontouchstart' in document.documentElement;

            settings = {
                on: storedVars[0],
                delay: storedVars[1],
                delayNo: parseInt(storedVars[1], 10),
                action: storedVars[2]
            };

            if (settings.action === 'hover') {
                settings.hover = true;
                settings.click = false;
            }

            if (settings.action === 'click') {
                settings.hover = false;
                settings.click = true;
            }

            if (touchscreen === true) {
                settings.action = 'click';
                settings.hover = false;
                settings.click = true;
            }

            mw.log(settings);

        }

        function modifyCookie() {

            var inputs = document.getElementById('rsw-config-action').getElementsByTagName('input');

            for (i = 0; i < inputs.length; i += 1) {
                if (inputs[i].checked) {
                    settings.action = inputs[i].value;
                }
            }

            settings.delay = $('#rsw-config-delay input').first().val();

            // in case someone sets a greater value manually
            if (parseInt(settings.delay, 10) > 1000) {
                settings.delay = '1000';
            }

            $.cookie('ref-tooltips', 'on' + '-' + settings.delay + '-' + settings.action, {
                path: '/',
                expires: 90
            });

            window.location.reload(false);

        }

        function disableTooltips() {

            // just use defaults for delay and action as no one really cares
            $.cookie('ref-tooltips', 'off-200-hover', {
                path: '/',
                expires: 90
            });

            window.location.reload(false);

        }

        /**
         * Create and remove functions
         */
        function removeConfig() {

            $('#rsw-config').remove();
            $('#rsw-config-background').remove();

        }

        function createConfig() {

            var body,
                form,
                formBackground,
                formLeft,
                formTop;

            // use this for formBackground height/width        
            body = document.body;

            // for config positioning
            formTop = ($(window).height() / 4) + 'px';
            formLeft = (($(window).width() - 510) / 2) + 'px';

            // create form container
            form = $('<div/>', {
                'id': 'rsw-config'
            }).css({
                'top': formTop,
                'left': formLeft
            }).append(
                $('<div/>', {
                    'id': 'rsw-config-header'
                }).append(
                    $('<span/>', {
                        'id': 'rsw-config-title',
                        'html': 'Reference Tooltip Settings'
                    }),

                    $('<span/>', {
                        'id': 'rsw-config-close',
                        'title': 'Close settings',
                        'click': function () {
                            removeConfig();
                        }
                    })
                ),

                $('<div/>', {
                    'id': 'rsw-config-body'
                }).append(
                    $('<form/>').append(
                        $('<input>', {
                            'id': 'rsw-config-disable',
                            'type': 'button',
                            'value': 'Disable reference tooltips',
                            'click': function () {
                                disableTooltips();
                            }
                        }),

                        $('<div/>', {
                            'id': 'rsw-config-note',
                            'html': 'Once disabled, reference tooltips can be re-enabled using the link at the bottom of the page.'
                        }),

                        $('<label/>', {
                            'id': 'rsw-config-delay',
                            'html': 'Delay before the tooltip appears (in milliseconds): '
                        }).append(
                            $('<input>', {
                                'type': 'number',
                                'step': '50',
                                'min': '0',
                                'max': '1000',
                                'value': settings.delay
                            })
                        ),

                        $('<br>'),

                        $('<span/>', {
                            'id': 'rsw-config-action',
                            'html': 'Tooltip is activated by: '
                        }).append(
                            $('<label/>', {
                                'html': 'Hover'
                            }).prepend(
                                $('<input>', {
                                    'type': 'radio',
                                    'name': 'tooltip-action',
                                    'checked': settings.hover,
                                    'value': 'hover'
                                })
                            ),

                            $('<label/>', {
                                'html': 'Click'
                            }).prepend(
                                $('<input>', {
                                    'type': 'radio',
                                    'name': 'tooltip-action',
                                    'checked': settings.click,
                                    'value': 'click'
                                })
                            )
                        )
                    )
                ),

                $('<div/>', {
                    'id': 'rsw-config-footer'
                }).append(
                    $('<button/>', {
                        'id': 'rsw-config-save',
                        'type': 'button',
                        'html': 'Save settings',
                        // 'class': '', in case it needs a wikia class to blend in
                        'click': function () {
                            modifyCookie();
                        }
                    })
                )
            );

            formBackground = $('<div/>', {
                'id': 'rsw-config-background',
                'click': function () {
                    removeConfig();
                }
            }).css({
                'height': body.clientHeight + 'px',
                'width': body.clientWidth + 'px'
            });

            $('body').append(form);
            $('body').append(formBackground);

        }

        function removeTooltip() {

            $('.rsw-tooltip').remove();

        }

        function createTooltip(event) {

            var offset,
                refId,
                ref,
                openSettings,
                tooltip,
                tooltipHeight,
                tooltipWidth,
                top,
                left;

            if ($('.rsw-tooltip').length) {
                removeTooltip();
            }

            offset = $(event.target).offset();

            // use native js for most of this as it's easier to debug
            refId = event.target.href.split('#')[1];

            ref = $('#' + refId).children('.reference-text').clone();


            openSettings = $('<span/>', {
                'id': 'rsw-tooltip-settings',
                'click': function () {
                    createConfig();
                }
            });


            tooltip = $('<div/>', {
                'class': 'rsw-tooltip'
            }).append(
                openSettings,
                ref
            );

            $('body').append(tooltip);

            tooltipHeight = $('.rsw-tooltip').height();
            tooltipWidth = $('.rsw-tooltip').width();

            top = offset.top - tooltipHeight - 25;
            left = offset.left - 7;

            // if above the top of the page
            if (top < window.pageYOffset) {
                top = window.pageYOffset;
            }

            // if too far right
            // only an issue in monobook
            if ((tooltipWidth + left) > $('body').width()) {
                left = $('body').width() - tooltipWidth;
            }

            $('.rsw-tooltip').css({
                'top': top + 'px',
                'left': left + 'px'
            });

        }

        /**
         * Functions for each tooltip activation action
         */
        function tooltipHover() {

            function hide() {

                timer = window.setTimeout(function () {
                    removeTooltip();
                }, 500);

            }

            $('.reference').mouseover(function (event) {
                window.clearTimeout(timer);
                window.setTimeout(function () {
                    createTooltip(event);
                }, settings.delayNo);
            });

            $('body').mouseover(function (event) {

                var hoverTarget;

                if ($('.rsw-tooltip').length) {

                    mw.log(event.target);
                    hoverTarget = $(event.target);

                    if (hoverTarget.is('.rsw-tooltip, .rsw-tooltip *')) {
                        window.clearTimeout(timer);
                        return;
                    }

                    hide();

                }
            });

        }

        function tooltipClick() {

            $('body').on('click', function (event) {

                var clickTarget;

                clickTarget = $(event.target);

                if (clickTarget.is('.reference') || clickTarget.is('.reference a')) {
                    event.preventDefault();
                    window.setTimeout(function () {
                        createTooltip(event);
                    }, settings.delayNo);
                }

                if ($('.rsw-tooltip').length) {
                    if (clickTarget.is('.rsw-tooltip, .rsw-tooltip *')) {
                        return;
                    }

                    removeTooltip();

                }

            });

        }

        /**
         * Functions to run straight away
         */
        function accessConfig() {

            var settingsLink;

            settingsLink = $('<span/>', {
                'id': 'rsw-config-open',
                'title': 'Configure reference tooltips'
            }).append(
                $('<a/>', {
                    'html': '[Reference Tooltip Settings]',
                    'click': function () {
                        createConfig();
                    }
                })
            );

            // after categories module in oasis
            if (mw.config.get('skin') === 'oasis' && $('#WikiaArticleCategories').length) {
                $('#WikiaArticleCategories').after(settingsLink);
            } else {
                $('#mw-content-text').append(settingsLink);
            }

        }

        function tooltipAction() {

            getCookie();

            if (settings.on === 'off') {
                return;
            }

            if (settings.action === 'click') {
                tooltipClick();
            }

            if (settings.action === 'hover') {
                tooltipHover();
            }

        }

        /**
         * Function invocation
         */
        accessConfig();
        tooltipAction();

    }

    $(function () {
        if ($('.references').length === 0) {
            mw.log('no references');
            return;
        }

        if (mw.config.get('wgAction') !== 'view') {
            return;
        }

        tooltips();
    });

}(jQuery, mediaWiki));
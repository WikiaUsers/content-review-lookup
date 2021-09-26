/**
 * Demo for the [[Modal]] library.
 */
(function() {
    'use strict';
    var ModalDemo = {
        loading: 2,
        modal: function(modal) {
            this.modal = modal;
            this.load();
        },
        ui: function(ui) {
            this.ui = ui;
            this.load();
        },
        load: function() {
            if (--this.loading === 0) {
                this.modals = {};
                if (mw.util.$content) {
                    this.content(mw.util.$content);
                }
                mw.hook('wikipage.content')
                    .add($.proxy(this.content, this));
            }
        },
        content: function($content) {
            $content.find('span[data-modal-demo]:not(.loaded)')
                .each($.proxy(this.each, this));
        },
        each: function(_, el) {
            var $this = $(el),
                modal = $this.data('modal-demo'),
                func = this[modal + 'Modal'];
            $this.addClass('loaded');
            if (typeof func !== 'function') {
                console.warn('Invalid modal demo!', modal);
                return;
            }
            if (!this.modals[modal]) {
                this.modals[modal] = new this.modal.Modal(func());
                this.modals[modal].create();
            }
            $this.click($.proxy(this.click, this));
        },
        click: function(e) {
            this.modals[$(e.target).data('modal-demo')].show();
        },
        simpleModal: function() {
            return {
                content: 'Hello World!',
                id: 'SimpleModal',
                size: 'small'
            };
        },
        mediumModal: function() {
            return {
                content: 'This is a medium-sized modal.',
                id: 'MediumModal',
                size: 'medium',
                title: 'Medium-sized modal'
            };
        },
        uiModal: function() {
            return {
                content: {
                    children: [
                        'This modal uses UI-js to generate the content and it\'s the same size as the content.',
                        {
                            attr: {
                                alt: 'Fandom logo',
                                title: 'Fandom logo',
                                src: 'https://vignette.wikia.nocookie.net/central/images/8/8f/FANDOM-logo.svg/revision/latest/scale-to-width-down/300'
                            },
                            type: 'img'
                        }
                    ],
                    type: 'div'
                },
                id: 'UIModal',
                size: 'content-size'
            };
        },
        buttonsModal: function() {
            return {
                buttons: [
                    {
                        classes: ['my-custom-class'],
                        event: 'custom1',
                        id: 'my-custom-id',
                        primary: true,
                        text: 'Primary button'
                    },
                    {
                        disabled: true,
                        text: 'Disabled button'
                    },
                    {
                        event: 'custom2',
                        sprite: 'ok',
                        text: ' '
                    },
                    {
                        event: 'custom3',
                        name: 'my-name',
                        type: 'input',
                        value: 'This is actually an input element!'
                    },
                    {
                        href: mw.util.getUrl('Special:Random'),
                        target: 'hmm',
                        text: 'This is a link!',
                        title: 'This is the link\'s title!',
                        type: 'link'
                    }
                ],
                content: 'This modal has buttons!',
                events: {
                    custom1: function() {
                        new BannerNotification('Custom event 1!', 'confirm').show();
                    },
                    custom2: function() {
                        new BannerNotification('Custom event 2!', 'warn').show();
                    },
                    custom3: function() {
                        new BannerNotification('Custom event 3!', 'error').show();
                    }
                },
                id: 'ButtonsModal'
            };
        }
    };
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:Modal.js'
        ]
    });
    mw.hook('dev.modal').add($.proxy(ModalDemo.modal, ModalDemo));
    mw.hook('dev.ui').add($.proxy(ModalDemo.ui, ModalDemo));
})();
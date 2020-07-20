/** <nowiki>
 * 
 * @module                  MobileEditor.js
 * @description             Mobile editor for FANDOM.
 * @author                  Speedit
 * @version                 0.7.2
 * @license                 CC-BY-SA 3.0
 * @notes                   Experimental.
 * 
 */
require(['wikia.window', 'jquery', 'mw', 'wikia.browserDetect', 'ext.wikia.design-system.loading-spinner', require.optional('editpage.event.helper'), 'wikia.querystring'], function(window, $, mw, browserDetect, Spinner, helper, qs) {
    // Script variables and scoping.
    window.dev = window.dev || {};
    if (
        !browserDetect.isMobile() ||                        // Mobile user agent
        mw.config.get('wgAction') !== 'edit' ||             // Edit view
        !mw.util.$content.children('#editarea').exists() || // Editing available
        window.dev.mobileEditor                             // Not executed already
    ) {
        return;
    }
    window.dev.mobileEditor = {};
    // Script preloader.
    function preload() {
        if (++this.deps === 3) {
           window.dev.mobileEditor = new MobileEditor();
        }
    }
    preload.deps = 0;
    // Main script class.
    function MobileEditor() {
        // Fire hook for script modification.
        mw.hook('dev.mobileeditor').fire(this);
        // Fetch I18n.
        this.api = new mw.Api();
        this.i18n.$loaded = this.api.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: this.i18n.messages.join('|'),
            amlang: this.conf.lang,
            format: 'json'
        }).done($.proxy(this.setup, this));
    }
    // Mobile editor interface.
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:MobileEditor.css'
    });
    MobileEditor.prototype.$content = (function($w, g) {
        // Nullify existing editor.
        $w.hide();
        $('meta[name="viewport"]').attr('content', [
            'user-scalable=no',
            'width=device-width',
            'initial-scale=1',
            'maximum-scale=1',
            'minimal-ui',
            'viewport-fit=cover'
        ].join(', ')).after(function() {
            return mw.html.element('meta', {
                name: g ? 'theme-color' : 'apple-mobile-web-app-status-bar-style',
                content: g ? '#002a32' : 'black-translucent'
            });
        });
         // Initialise editor wrapper.
        return $('<div>', {
            'class': 'MobileEditorWrapper',
            'id':    'mobile-editor__wrapper',
            append:  $('<div>', {
                'class': 'mobile-editor__overlay',
                html: (new Spinner(30, 6)).html
                    .replace('wds-block', 'wds-spinner__block')
                    .replace('wds-path', 'wds-spinner__stroke')
                    .replace('stroke-width=""', 'stroke-width="6"'),
                css: {}
            })
        }).insertAfter($w);
    }($('.WikiaSiteWrapper'), browserDetect.isAndroid()));
    // Script setup.
    MobileEditor.prototype.setup = function(i18no) {
        // I18n setup.
        this.i18n.messages = (function(m) {
            var mo = {};
            $.each(m, function(i, k) {
                mo[k.replace(/(editpagelayout|wikia-editor-modules)-/, '')] = i18no.query.allmessages[i]['*'];
            });
            return mo;
        }(this.i18n.messages));
        this.i18n.messages.editing = this.i18n.messages.editing
            .replace('$1', this.conf.wgEditedTitle);
        this.i18n.messages['license-text'] = this.i18n.messages['license-text'].replace(/\$(\d+)/g, $.proxy(function(m, d) {
            return {
                '1': window.dev.ui({
                    type: 'figure',
                    classes: ['mobile-editor__licensing-icon'],
                    children: ['cc', 'by', 'sa'].map(function(l) {
                        return {
                            type: 'img',
                            attr: {
                                src: 'https://mirrors.creativecommons.org/presskit/icons/' + l + '.svg'
                            }
                        };
                    })
                }).outerHTML,
                '2': this.conf.wgEditPageLicensingUrl,
                '3': this.conf.wgRightsText
            }[d];
        }, this));
        // Fetch text.
        var cs = helper.getCategories().val();
        cs = JSON.parse(!cs ? '[]' : cs);
        this.text = (this.conf.rte
            ? window.RTE.getInstance().getData()
            : this.conf.code
                ? window.ace.edit('editarea').getSession().getValue()
                : mw.util.$content.find('#wpTextbox1').val()
        ).trim() + (!cs.length? '' : '\n') + (this.conf.wgCategorySelect
            ? cs.map(function(c) {
                var r = c.namespace + ':' + c.name;
                if (c.sortkey) {
                    r = r + '|' + c.sortkey;
                }
                r = '[[' + r + ']]';
                if (c.outertag) {
                    r = '<' + c.outertag + '>' + r + '</' + c.outertag + '>';
                }
                return r;
            }).join('\n')
            : ''
        ).trim();
        // Initialise editor UI.
        this.$content = $.proxy(function($c) {
            var $o = $c.children('.mobile-editor__overlay').detach(),
                $ui = $.proxy(this.ui, this)();
            $c.attr('class', $ui.attr('class'));
            $ui.children().add($o.addClass('me-is-hidden')).appendTo($c);
            return $c;
        }, this)(this.$content);
        if (this.conf.code) {
            this.$content.addClass('me-is-codeeditor');
        }
        // Render views.
        this.$content.on('click', '.mobile-editor__route', $.proxy(this.view, this));
    };
    // Editor user interface.
    MobileEditor.prototype.ui = function() {
        var $s = $('#wpSummary');
        return window.dev.wds.render(window.dev.ui({
            type: 'div',
            attr: {
                id: 'mobile-editor__wrapper'
            },
            classes: [
                'MobileEditorWrapper',
                'me-is-initialized'
            ],
            children: [
                {
                    type: 'div',
                    classes: [
                        'mobile-editor__header'
                    ],
                    children: [
                        {
                            type: 'div',
                            classes: [
                                'mobile-editor__button',
                                'mobile-editor__is-text',
                                'mobile-editor__route',
                                'mobile-editor__header-previous'
                            ],
                            attr: {
                                'data-route': 'previous'
                            },
                            children: [{
                                type: 'div',
                                attr: {
                                    id: 'dev-wds-icons-arrow'
                                }
                            }]
                        },
                        {
                            type: 'span',
                            classes: [
                                'mobile-editor__header-title'
                            ],
                            text: this.i18n.messages.editing
                        },
                        {
                            type: 'span',
                            classes: [
                                'mobile-editor__button',
                                'mobile-editor__is-text',
                                'mobile-editor__route',
                                'mobile-editor__header-publish'
                            ],
                            attr: {
                                'data-route': 'publish'
                            },
                            text: this.i18n.messages.savearticle
                        }
                    ]
                },
                {
                    type: 'div',
                    classes: [
                        'mobile-editor__editarea',
                        'me-is-pane'
                    ],
                    children: [
                        {
                            type: 'textarea',
                            attr: {
                                dir: this.conf.dir,
                                name: 'mobile-editor__textbox',
                                id: 'mobile-editor__textbox'
                            },
                            classes: [
                                'mobile-editor__textarea'
                            ],
                            value: this.text
                        }
                    ]
                },
                {
                    type: 'div',
                    classes: [
                        'mobile-editor__actions',
                        'me-is-pane',
                        'me-is-hidden'
                    ],
                    children: [
                        {
                            type: 'div',
                            classes: [
                                'mobile-editor__field',
                                'mobile-editor__summary-field'
                            ],
                            children: [
                                {
                                    type: 'span',
                                    classes: [
                                        'mobile-editor__label'
                                    ],
                                    text: this.i18n.messages['edit-summary-label']
                                },
                                {
                                    type: 'textarea',
                                    classes: [
                                        'mobile-editor__textarea'
                                    ],
                                    attr: {
                                        rows: '1',
                                        maxlength: '800',
                                        placeholder: this.conf.section === 'new'
                                            ? this.i18n.messages['pageControls-newSectionLabel']
                                            : this.i18n.messages['pageControls-summaryLabel'],
                                        id: 'mobile-editor__summary'
                                    },
                                    value: $s.val() === $s.attr('placeholder') ? '' : $s.val()
                                }
                            ]
                        },
                        {
                            type: 'div',
                            classes: [
                                'mobile-editor__field',
                                'mobile-editor__checkbox',
                                'mobile-editor__field-minor-edit'
                            ],
                            children: [
                                {
                                    type: 'input',
                                    attr: {
                                        id: 'mobile-editor__minor-edit',
                                        type: 'checkbox'
                                    },
                                    checked: mw.user.options.get('minordefault') === '1'
                                },
                                {
                                    type: 'label',
                                    classes: [
                                        'mobile-editor__label',
                                        'mobile-editor__label-minor-edit'
                                    ],
                                    attr: {
                                        'for': 'mobile-editor__minor-edit'
                                    },
                                    children: [
                                        {
                                            type: 'div',
                                            attr: {
                                                id: 'dev-wds-icons-checkbox'
                                            }
                                        },
                                        {
                                            type: 'span',
                                            text: this.i18n.messages['pageControls-minorEdit']
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'div',
                            classes: [
                                'mobile-editor__field',
                                'mobile-editor__utilities-field'
                            ],
                            children: [
                                {
                                    type: 'div',
                                    classes: [
                                        'mobile-editor__button',
                                        'mobile-editor__route',
                                        'mobile-editor__util-diff'
                                    ],
                                    attr: {
                                        'data-route': 'diff'
                                    },
                                    children: [
                                        {
                                            type: 'div',
                                            attr: {
                                                id: 'dev-wds-icons-pages-small'
                                            }
                                        },
                                        {
                                            type: 'span',
                                            text: this.i18n.messages.showdiff
                                        }
                                    ]
                                },
                                {
                                    type: 'div',
                                    classes: [
                                        'mobile-editor__button',
                                        'mobile-editor__route',
                                        'mobile-editor__util-preview'
                                    ],
                                    attr: {
                                        'data-route': 'preview'
                                    },
                                    children: [
                                        {
                                            type: 'div',
                                            attr: {
                                                id: 'dev-wds-icons-eye-small'
                                            }
                                        },
                                        {
                                            type: 'span',
                                            text: this.i18n.messages.preview
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'div',
                            classes: [
                                'mobile-editor__licensing'
                            ],
                            html: this.i18n.messages['license-text']
                        }
                    ]
                },
                {
                    type: 'div',
                    classes: [
                        'mobile-editor__utilities',
                        'me-is-pane',
                        'me-is-hidden'
                    ]
                }
            ]
        }));
    };
    // Editor view controller.
    MobileEditor.prototype.view = function(e) {
        if (!this.$content.children('.mobile-editor__overlay').hasClass('me-is-hidden')) {
            return;
        }
        var n = this.newRoute = e.currentTarget.getAttribute('data-route');
        $.proxy(this[n], this)(e);
    };
    MobileEditor.prototype.route = 'edit';
    // Editor previous route controller.
    MobileEditor.prototype.previous = function(e) {
        if (this.route === 'edit') {
            this.$content.children('.mobile-editor__overlay')
                .removeClass('me-is-hidden');
            this.exit();
        }
        if (this.route === 'publish') {
            this.newRoute = 'edit';
            this.$content.children('.mobile-editor__editarea')
                .removeClass('me-is-hidden');
            this.$content.children('.mobile-editor__actions')
                .addClass('me-is-hidden');
        }
        if (['diff', 'preview'].indexOf(this.route) > -1) {
            this.newRoute = 'publish';
            this.$content.find('.mobile-editor__header-title')
                .text(this.i18n.messages.editing);
            this.$content.find(
                '.mobile-editor__header-publish,' +
                '.mobile-editor__actions'
            ).removeClass('me-is-hidden');
            this.$content.children('.mobile-editor__utilities')
                .empty().addClass('me-is-hidden');
        }
        this.route = this.newRoute;
        delete this.newRoute;
    };
    // Editor publication route controller.
    MobileEditor.prototype.publish = function(e) {
        if (this.route === 'edit') {
            this.$content.children('.mobile-editor__actions')
                .removeClass('me-is-hidden');
            this.$content.children('.mobile-editor__editarea')
                .addClass('me-is-hidden');
        }
        if (this.route === 'publish') {
            this.$content.children('.mobile-editor__overlay')
                .removeClass('me-is-hidden');
            var conf = {
                action: 'edit',
                title: this.conf.wgPageName,
                section: this.conf.section || '',
                summary: ('[MobileEditor] ' + this.$content.find('#mobile-editor__summary').val()).trim(),
                text: this.$content.find('#mobile-editor__textbox').val().trim(),
                bot: this.conf.wgUserGroups.indexOf('bot') > -1,
                token: mw.user.tokens.get('editToken')
            };
            if (!conf.section.length) {
                delete conf.section;
            }
            if (conf.section === 'new') {
                conf.sectiontitle = this.$content.find('#mobile-editor__summary').val();
            }
            if (
                this.$content.find('#mobile-editor__minor-edit')
                    .prop('checked')
            ) {
                conf.minor = true;
            } else {
                conf.notminor = true;
            }
            this.api.post(conf)
                .done($.proxy(this.exit, this))
                .fail($.proxy(this.fail, this));
        }
        this.route = this.newRoute;
        delete this.newRoute;
    };
    // Editor diff route controller.
    MobileEditor.prototype.diff = function() {
        this.$content.children('.mobile-editor__overlay')
            .removeClass('me-is-hidden');
        $.post(this.conf.wgScript, {
            action: 'ajax',
            rs: 'EditPageLayoutAjax',
            title: this.conf.wgEditedTitle,
            method: 'diff',
            content: this.$content.find('#mobile-editor__textbox').val(),
            page: 'SpecialCustomEditPage',
            section: this.conf.section || '',
            categories: $('#categories').val() || ''
        }, $.proxy(this.utility, this));
    };
    // Editor preview controller.
    // https://github.com/Wikia/app/blob/dev/extensions/wikia/EditPreview/js/editpage.event.helper.js#L94-L146
    MobileEditor.prototype.preview = function() {
        this.$content.children('.mobile-editor__overlay')
            .removeClass('me-is-hidden');
        this.$content.children('.mobile-editor__utilities')
            .append(
                $('<iframe>', {
                    'id': 'mobile-editor__preview',
                    'name': 'mobile-editor__preview'
                })
            ).append(
                window.dev.ui({
                    type: 'form',
                    attr: {
                        'class': 'wds-is-hidden',
                        'id': 'mobile-editor__preview-form',
                        'name': 'mobile-editor__preview',
                        'action': qs(this.conf.wgEditPreviewMercuryUrl).addCb().toString(),
                        'target': 'mobile-editor__preview',
                        'method': 'post',
                    },
                    children: [
                        { n: 'title', v: this.conf.wgEditedTitle },
                        { n: 'wikitext', v: this.$content.find('#mobile-editor__textbox').val() }
                    ].map(function(o) {
                        return {
                            type: 'input',
                            attr: {
                                type: 'hidden',
                                name: o.n,
                                value: o.v
                            }
                        };
                    })
                })
            )
            .children('iframe')
                .load($.proxy(this.utility, this))
            .parent()
            .children('form')
                .submit().remove();
    };
    // Editor utility renderer.
    MobileEditor.prototype.utility = function(d) {
        this.route = this.newRoute;
        delete this.newRoute;
        var $h = this.$content.find('.mobile-editor__header-title'),
            $u = this.$content.children('.mobile-editor__utilities');
        if (this.route === 'preview') {
            $h.text(this.i18n.messages.preview);
        }
        if (this.route === 'diff') {
            var $d = $(d.html);
            $('<div>', {
                'id': 'mobile-editor__diff'
            }).html($d.html()).appendTo($u);
            $h.text(this.i18n.messages['pageControls-changes']);
        }
        $u.removeClass('me-is-hidden');
        this.$content.find(
            '.mobile-editor__header-publish,' +
            '.mobile-editor__actions,' +
            '.mobile-editor__overlay'
        ).addClass('me-is-hidden');
    };
    // Editor API failure handler.
    MobileEditor.prototype.fail = function(c) {
        window.alert(['http', 'ok-but-empty'].indexOf(code) > -1
            ? $.msg('oasis-generic-error')
            : '[MediaWiki API] ' + c
        );
        this.$content.children('.mobile-editor__overlay')
            .addClass('me-is-hidden');
    };
    // Editor exit view handler (post submission or exit).
    MobileEditor.prototype.exit = function(o) {
        var uri = new mw.Uri(window.location.href);
        uri.query = {};
        window.location.href = uri.toString();
    };
    // Script variable cache.
    MobileEditor.prototype.conf = (function(c) {
        // Environment variables.
        $.each({ code: 'codeeditor', rte: 'rte_wysiwyg' }, function(o, cn) {
            c[o] = $(document.body).hasClass(cn);
        });
        // User configuration variables.
        $.extend(c, $.getUrlVars());
        ['dir', 'lang'].forEach(function(a) {
            c[a] = $(document.documentElement).attr(a);
        });
        return c;
        // MediaWiki variables.
    }(mw.config.get([
        'wgPageName',
        'wgCategorySelect',
        'wgEditPageLicensingUrl',
        'wgRightsText',
        'wgScript',
        'wgUserGroups',
        'wgEditPreviewMercuryUrl',
        'wgEditedTitle'
    ])));
    // I18n system messages.
    MobileEditor.prototype.i18n = {};
    MobileEditor.prototype.i18n.messages = [
        'editing',
        'savearticle',
        'editpagelayout-edit-summary-label',
        'editpagelayout-pageControls-newSectionLabel',
        'editpagelayout-pageControls-summaryLabel',
        'editpagelayout-pageControls-minorEdit',
        'preview',
        'showdiff',
        'wikia-editor-modules-license-text',
        'editpagelayout-pageControls-changes'
    ];
    // Library dependencies from Dev Wiki.
    $.each({
        'ui':  'UI-js/code.js',
        'wds': 'WDSIcons/code.js'
    }, function(h, l) {
        mw.hook('dev.' + h).add($.proxy(preload, preload));
        importArticle({ type: 'script', article: 'u:dev:' + l });
    });
    // MediaWiki API module.
    mw.loader.using([
        'mediawiki.util',
        'mediawiki.api.edit',
        'mediawiki.action.history.diff',
        'jquery.textSelection'
    ]).then($.proxy(preload, preload));
});
/** </nowiki> **/
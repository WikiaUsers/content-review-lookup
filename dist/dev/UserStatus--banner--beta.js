/**
 *
 * @submodule               UserStatus/banner
 * @description             Notifies a user when editing someone else's status.
 * @author                  Americhino
 * @version                 0.8.2
 * @license                 CC-BY-SA 3.0
 **/
// Does not work, please use UserStatus/banner.js in the meantime
var $user = mw.config.get('wgTitle').split('/');
$(function(){ 
    if ($user[0] === wgUserName) return; 
    if ($user[1] === 'status') { 
        if (wgAction !== 'edit' || wgAction !== 'submit') return;
        mw.hook('dev.i18n').add(function (i18n) {
            i18n.loadMessages('UserStatus').then(function (i18n) {
                $('.wds-global-navigation-wrapper').append(
                    mw.hook('dev.ui').add(function(ui) {
                        ui({
                            type: "div",
                            classes: [
                                "banner-notifications-placeholder"
                            ],
                            children: [
                                {
                                    type: "div",
                                    classes: [
                                        "wds-banner-notification__container",
                                        "float"
                                    ],
                                    children: [
                                        {
                                            type: "div",
                                            classes: [
                                                "wds-banner-notification",
                                                "wds-warning",
                                                "warn"
                                            ],
                                            children: [
                                                {
                                                    type: "div",
                                                    classes: [
                                                        "wds-banner-notification__icon"
                                                    ],
                                                    children: [
                                                        {
                                                            type: "svg",
                                                            attr: {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 18 16",
                                                                height: "16",
                                                                width: "18"
                                                            },
                                                            classes: [
                                                                "wds-icon",
                                                                "wds-icon-small"
                                                            ],
                                                            children: [
                                                                {
                                                                    type: "path",
                                                                    attr: {
                                                                        "fill-rule": "evenodd",
                                                                        d: "M17.928 15.156c.1.178.096.392-.013.565a.603.603 0 0 1-.515.28H.6a.607.607 0 0 1-.515-.28.544.544 0 0 1-.013-.564L8.472.278c.21-.37.847-.37 1.056 0l8.4 14.878zM8 5.99v4.02A1 1 0 0 0 9 11c.556 0 1-.444 1-.99V5.99A1 1 0 0 0 9 5c-.556 0-1 .444-1 .99zM8 13c0 .556.448 1 1 1 .556 0 1-.448 1-1 0-.556-.448-1-1-1-.556 0-1 .448-1 1z"
                                                                    },
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    type: "span",
                                                    classes: [
                                                        "wds-banner-notification__text"
                                                    ],
                                                    text: i18n.msg('edit-warning').plain() ,
                                                    children: [
                                                        {
                                                            type: "a",
                                                            attr: {
                                                                href: mw.util.getUrl(mw.config.get('wgPageName')) 
                                                            },
                                                            text: i18n.msg('go-back').plain() ,
                                                        }
                                                    ]
                                                },
                                                {
                                                    type: "svg",
                                                    attr: {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 12 12",
                                                        height: "12",
                                                        width: "12"
                                                    },
                                                    classes: [
                                                        "wds-icon",
                                                        "wds-icon-tiny",
                                                        "wds-banner-notification__close"
                                                    ],
                                                    children: [
                                                        {
                                                            type: "path",
                                                            attr: {
                                                                "fill-rule": "evenodd",
                                                                d: "M6 4.554L2.746 1.3C2.346.9 1.7.9 1.3 1.3c-.4.4-.4 1.046 0 1.446L4.554 6 1.3 9.254c-.4.4-.4 1.047 0 1.446.4.4 1.046.4 1.446 0L6 7.446 9.254 10.7c.4.4 1.047.4 1.446 0 .4-.4.4-1.046 0-1.446L7.446 6 10.7 2.746c.4-.4.4-1.047 0-1.446-.4-.4-1.046-.4-1.446 0L6 4.554z"
                                                            },
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        })
                    })
                );
            });
        });
    }
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UI-js/code.js',
        'u:dev:MediaWiki:i18n-js/code.js',
    ]
});
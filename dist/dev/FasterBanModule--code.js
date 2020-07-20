/** <nowiki>
 * @module                  FasterBanModule
 * @description             Replaces chat ban module with a faster version
 * @author                  Ozank
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {

    // Scoping, double-run protection
    var config = mw.config.get([
        'wgUserGroups',
        'wgCanonicalSpecialPageName'
    ]);
    if (
        !/(chatmoderator|sysop|threadmoderator|staff|helper|vstf)/
            .test(config.wgUserGroups) ||
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        window.fasterBanLoaded
    ) {
        return;
    }
    (window.dev = window.dev || {}).fasterBan = {};
    
    /**
     * Main FasterBanModule script.
     * @constructor FasterBanModule
     */
    function FasterBanModule() {
        mainRoom.viewUsers.bind(
            'mainListClick',
            $.proxy(this.banClick, this)
        );
    }

    /**
     * FasterBanModule ban click event handler.
     * @method              banClick
     * @param               {Object} user User model to ban.
     */
    FasterBanModule.prototype.banClick = function(user) {
        $('.ban')
             // Replace button.
            .addClass('ban-custom').removeClass('ban')
            // Add button listener.
            .click($.proxy(this.banModal, this, user));
    };

    /**
     * FasterBanModule ban modal generator.
     * @method              banModal
     * @param               {Object} user User model to ban.
     */
    FasterBanModule.prototype.banModal = function(user) {
        var defaultReason = window.fasterBanReason || 'Misbehaving in chat';
        /* Show ban modal */
        $.showCustomModal(
            'Ban ' + user.name + ' from chat',
            window.dev.ui(this.formHTML(defaultReason)),
            {
            id: 'custom-chat-ban-modal',
            width: 400,
            buttons: [
                {
                    message: 'Cancel',
                    handler: function() {
                        $('#custom-chat-ban-modal').closeModal();
                    }                 
                },
                {
                    message: 'Ban this user',
                    defaultButton: true,
                    handler: function() {                     
                        var banObject = new models.BanCommand({
                            userToBan: user.name,
                            time: $('#select-custom-ban').val(),
                            reason: $('#custom-ban-reason').val() || $('#custom-ban-reason').attr('placeholder')
                        });
                        mainRoom.socket.socket.send(banObject.xport());
                        $('#custom-chat-ban-modal').closeModal();
                    }
                }
            ]
        });
        // Remove button.
        $('.ban-custom').remove();
    };


    /**
     * Form HTML generator (UI-js format).
     * @method              formHTML
     * @param               {string} d Default reason.
     * @returns             {Object} UI-js element object (form).
     */
    FasterBanModule.prototype.formHTML = function(d) {
        return {
            type: 'form',
            classes: [
                'WikiaForm'
            ],
            attr: {
                name: '',
                method: ''
            },
            children: [
                {
                    type: 'fieldset',
                    children: [
                        {
                            type: 'p',
                            text: 'Expires',
                            children: [
                                {
                                    type: 'br'
                                },
                                {
                                    type: 'select',
                                    attr: {
                                        id: 'select-custom-ban'
                                    },
                                    children: $.map([
                                        { v: '1200',        t: '20 minutes' },
                                        { v: '2400',        t: '40 minutes' },
                                        { v: '7200',        t: '2 hours'    },
                                        { v: '18000',       t: '5 hours'    },
                                        { v: '43200',       t: '12 hours'   },
                                        { v: '86400',       t: '1 day'      },
                                        { v: '259200',      t: '3 days'     },
                                        { v: '432000',      t: '5 days'     },
                                        { v: '604800',      t: '1 week'     },
                                        { v: '1209600',     t: '2 weeks'    },
                                        { v: '2592000',     t: '1 month'    },
                                        { v: '7776000',     t: '3 months'   },
                                        { v: '15552000',    t: '6 months'   },
                                        { v: '31536000',    t: '1 year'     },
                                        { v: '63072000',    t: '2 years'    },
                                        { v: '94608000',    t: '3 years'    },
                                        { v: '31536000000', t: 'infinite' }
                                    ], function(o) {
                                        return {
                                            type: 'option',
                                            attr: { value: o.v },
                                            text: o.t
                                        };
                                    })
                                }
                            ]
                        },
                        {
                            type: 'br'
                        },
                        {
                            type: 'p',
                            text: 'Reason',
                            children: [
                                {
                                    type: 'br'
                                },
                                {
                                    type: 'input',
                                    attr: {
                                        maxlength: '160',
                                        placeholder: d,
                                        id: 'custom-ban-reason',
                                        type: 'text'
                                    }
                                }
                            ]
                        },
                        {
                            type: 'br'
                        }
                    ]
                }
            ]
        };
    };

    // Script bootloader.
    function preload() {
        if (++_loaded == Object.keys(deps).length) {
            window.dev.fasterBan = new FasterBanModule();
        }
    }
    var _loaded = 0;

    // Import libraries.
    var deps = {
        'ui':          'u:dev:UI-js/code.js',
        'chat.socket': 'u:dev:Chat-js.js'
    };
    $.each(deps, function(l, s) {
        mw.hook('dev.' + l).add(preload);
        importArticle({ type: 'script', article: s });
    });

});
/** </nowiki> **/
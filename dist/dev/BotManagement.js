/**
 * @name            BotManagement
 * @version         v1.3
 * @author          TheGoldenPatrik1
 * @description     Adds tools for users who can flag themselves as bots.
 */
(function () {
    var config = mw.config.get([
        'wgUserGroups',
        'wgUserName'
    ]);
    if (
        !/bot|soap|bureaucrat|sysop|staff|wiki-representative|wiki-specialist/.test(config.wgUserGroups.join()) ||
        window.BotManagementLoaded
    ) {
        return;
    }
    window.BotManagementLoaded = true;
    var isBot = config.wgUserGroups.indexOf('bot') !== -1;
    var options = $.extend(
        {
            notif: true,
            remove: window.BotManagementRemove,
            add: window.BotManagementAdd,
            expire: window.BotManagementExpire
        },
        window.BotManagement
    );
    /**
     * @class Main
     * @description Central BotManagement class
     */
    var Main = {
        /**
         * @method hooks
         * @description Imports and starts hooks
         * @returns {void}
         */
        hooks: function () {
            this.preloads = 2;
            mw.hook('dev.i18n').add(
                $.proxy(this.preload, this)
            );
            mw.hook('dev.placement').add(
                $.proxy(this.preload, this)
            );
	        importArticles({
        		type: 'script',
        		articles: [
        		    'u:dev:MediaWiki:I18n-js/code.js',
        		    'u:dev:MediaWiki:Placement.js'
                ]
        	});
        },
        /**
         * @method preload
         * @description Loads the hooks
         * @returns {void}
         */
        preload: function () {
            if (--this.preloads === 0) {
                this.api = new mw.Api();
                window.dev.i18n.loadMessages('BotManagement').then(
                    $.proxy(this.init, this)
                );
            }
        },
        /**
         * @method init
         * @description Initiates the script
         * @param {String} i18n - Variable for I18n-js
         * @returns {void}
         */
        init: function (i18n) {
            this.i18n = i18n;
            this.link();
            if (isBot && options.notif) {
                this.notif();
            }
        },
        /**
         * @method link
         * @description Adds the link
         * @returns {void}
         */
        link: function () {
            window.dev.placement.loader.util({
                script: 'BotManagement',
                element: 'tools',
                type: 'prepend',
                content: $('<li>', {
                    'class': 'custom'
                }).append(
                    $('<a>', {
                        'href': '#',
                        'text': this.i18n.msg(isBot ? 'remove' : 'add').plain(),
                        'click': $.proxy(this.click, this)
                    })
                )
            });
        },
        /**
         * @method click
         * @description Confirms and gets the token
         * @returns {void}
         */
        click: function () {
            if (
                !confirm(
                    this.i18n.msg('confirm').plain()
                )
           ) {
                return;
            }
            this.api.getToken('userrights').done(
                $.proxy(this.changeRights, this)
            );
        },
        /**
         * @method changeRights
         * @description Changes the rights
         * @param {string} t - The token
         * @returns {void}
         */
        changeRights: function (t) {
            var params = {
                action: 'userrights',
                user: config.wgUserName,
                reason:
                    (
                        isBot ?
                            options.remove ||
                            this.i18n.inContentLang().msg('removeReason').plain()
                        :
                            options.add ||
                            this.i18n.inContentLang().msg('addReason').plain()
                        ),
                bot: true
            };
            params[isBot ? 'remove' : 'add'] = 'bot';
            params.expiry = (options.expire || 'infinite');
            this.api.postWithToken('userrights', params).done(
                $.proxy(this.done, this)
            ).fail($.proxy(this.fail, this));
        },
        /**
         * @method done
         * @description Handles .done
         * @param {JSON} d - Data from .done
         * @returns {void}
         */
        done: function (d) {
            if (d.error) {
                this.fail();
            } else {
                window.location.reload(true);
            }
        },
        /**
         * @method fail
         * @description Handles .fail
         * @param {JSON} d - Data from .fail
         * @returns {void}
         */
        fail: function () {
            mw.notify(this.i18n.msg('error').plain(), {
                type: 'error'
            });
        },
        /**
         * @method notif
         * @description Creates a notification
         * @returns {void}
         */
        notif: function () {
            var $notif = $('<p>', {
                'text': this.i18n.msg('notifText').plain()
            }).append(
                $('<a>', {
                    'href': '#',
                    'text': this.i18n.msg('notifLink').plain(),
                    'click': $.proxy(this.click, this)
                })
            );
            mw.notify($notif, {
                autoHide: false
            });
        }
    };
    mw.loader.using('mediawiki.api').then(
        $.proxy(Main.hooks, Main)
    );
})();
/**
 * @name            ProtectionIcons (Roblox Wiki ver.)
 * @version         v1.0-Roblox (Branch of Dev v1.1)
 * @author          TheGoldenPatrik1
 * @author          Eizen
 * @description     Adds icons based on the page's level of protection.
 * Modified for use on Roblox Wiki: mark non-public user pages as sysop-protect.
 */
(function ($, mw) {
    'use strict';
    var config = mw.config.get([
        'wgPageName',
        'wgNamespaceNumber',
        'wgUserName',
        'wgTitle'
    ]);
    if (
        [-1, 8, 500, 501, 502, 1200, 1201, 2000, 2001].indexOf(config.wgNamespaceNumber) !== -1 ||
        window.ProtectionIconsLoaded
    ) {
        return;
    }
    window.ProtectionIconsLoaded = true;
    /**
     * @class Main
     * @classdesc Main ProtectionIcons class
     */
    var Main = {
        wdsIsLoaded: $.Deferred(),
        i18nIsLoaded: $.Deferred(),
        /**
         * Gets the JSON protection data for the current page & calls handler.
         * Passes override for 'editSysop', if on a non-public userpage.
         * @method getJSON
         * @returns {void}
         */
        getJSON: function () {
            var that = this;
            var userPublicSel =
        		"a[href$='#F-PUBLIC_USER_PAGE']," +
        		"a[href$='#F-AUTHORIZEDUSER_" +
        		config.wgUserName.replaceAll(' ', '_') + "']";
            $.getJSON(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'query',
                titles: config.wgPageName,
                prop: 'info',
                inprop: 'protection',
                meta: 'siteinfo',
                siprop: 'general',
            }, function (d) {
                if (!d.error) {
                	var overrides = {};
                	if (config.wgNamespaceNumber === 2
                			&& !config.wgTitle.startsWith(config.wgUserName)
                			&& !$(userPublicSel).length)
            			overrides.editSysop = true;
                	that.handleJSON(d, overrides);
                }
            });
        },
        /**
         * @method handleJSON
         * @description Analyzes protection JSON data and adds the icons.
         * @param {String} results - The protection data
         * @parama {Object} overrides - Overrides in blank protection matrix
         * @returns {void}
         */
        handleJSON: function (results, overrides) {
            var now,
                data,
                protection,
                protections;
            var pMatrix = {
                createSysop:			false,
                createAutoconfirmed:	false,
                editSysop:				false,
                editAutoconfirmed:		false,
                moveSysop:				false,
                moveAutoconfirmed:		false,
                uploadSysop:			false,
                uploadAutoconfirmed:	false
            };
            now = new Date(results.query.general.time);
            data = results.query.pages;
            for (var p in overrides) pMatrix[p] = overrides[p];
            protections = data[Object.keys(data)[0]].protection;
            for (var i = 0; protections && i < protections.length; i++) {
                protection = protections[i];
                if (protection.expiry && new Date(protection.expiry) < now) {
                    // If `protection.expiry` is `infinite`/`indefinite`/`infinity`/`never`,
                    // then the constructed date will be invalid, and the comparison will fail.
                    continue;
                }
                switch (protection.type) {
                    case ('create'):
                        if (protection.level === 'sysop') {
                            pMatrix.createSysop = true;
                        } else if (protection.level === 'autoconfirmed') {
                            pMatrix.createAutoconfirmed = true;
                        }
                    break;
                    case ('edit'):
                        if (protection.level === 'sysop') {
                            pMatrix.editSysop = true;
                        } else if (protection.level === 'autoconfirmed') {
                            pMatrix.editAutoconfirmed = true;
                        }
                    break;
                    case ('move'):
                        if (protection.level === 'sysop') {
                            pMatrix.moveSysop = true;
                        } else if (protection.level === 'autoconfirmed') {
                            pMatrix.moveAutoconfirmed = true;
                        }
                    break;
                    case ('upload'):
                        if (protection.level === 'sysop') {
                            pMatrix.uploadSysop = true;
                        } else if (protection.level === 'autoconfirmed') {
                            pMatrix.uploadAutoconfirmed = true;
                        }
                    break;
                }
            }
            var $editElement = $('.page-header__contribution-buttons, .page-header__actions'),
                $moveElement = $('#ca-move'),
                $replaceElement = $('#ca-replace-file');
            if (pMatrix.createSysop || pMatrix.createAutoconfirmed) {
                $editElement.prepend(
                    this.assembleSpanElement('create-protection', pMatrix.createSysop)
                );
            }
            if (pMatrix.editSysop || pMatrix.editAutoconfirmed) {
                $editElement.prepend(
                    this.assembleSpanElement('edit-protection', pMatrix.editSysop)
                );
            }
            if (
                $moveElement.length &&
                (pMatrix.moveSysop || pMatrix.moveAutoconfirmed)
            ) {
                $moveElement.append(
                    this.assembleSpanElement('move-protection', pMatrix.moveSysop)
                );
            }
            if (
                $replaceElement.length &&
                (pMatrix.uploadSysop || pMatrix.uploadAutoconfirmed)
            ) {
                $replaceElement.append(
                   this.assembleSpanElement('upload-protection', pMatrix.uploadSysop)
                );
            }
        },
        /**
         * @method assembleSpanElement
         * @description Creates the icon element.
         * @param {String} spanId - The icon name
         * @param {String} canSysopAct - Determines if the page is sysop protected
         * @returns {function}
         */
        assembleSpanElement: function (spanId, canSysopAct) {
            var that, actionType;
            that = this;
            actionType = spanId.split('-')[0];
            return $('<span>', {
                'class': 'protection-level',
                'id': spanId,
                'title':
                    that.i18n.msg(
                        (canSysopAct ?
                        actionType + 'Sysop' :
                        actionType + 'Autoconfirmed')
                    ).plain()
            }).append(
                this.wds.icon(
                    (canSysopAct ?
                    'lock-small' :
                    'unlock-small')
                )
            );
        },
        /**
         * @name i18nHandler
         * @description Loads I18n-js
         * @param {String} i18no - Variable for loading I18n-js
         * @returns {void}
         */
        i18nHandler: function (i18no) {
            var that = this;
            i18no.loadMessages('ProtectionIcons').done(function (i18n) {
                that.i18n = i18n;
                that.i18nIsLoaded.resolve();
            });
        },
        /** 
         * @name wdsHandler
         * @description Loads WDSIcons
         * @param {String} wds - Variable for loading WDSIcons
         * @returns {void}
         */
        wdsHandler: function (wds) {
            this.wds = wds;
            this.wdsIsLoaded.resolve();
        },
        /**
         * @name init
         * @description Initiates script
         * @returns {void}
         */
        init: function () {
            mw.hook('dev.i18n').add($.proxy(Main.i18nHandler, Main));
            mw.hook('dev.wds').add($.proxy(Main.wdsHandler, Main));
            $.when(this.i18nIsLoaded, this.wdsIsLoaded).done(
                $.proxy(Main.getJSON, Main)
            );
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:ProtectionIcons.css'
            });
            importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:I18n-js/code.js',
                    'u:dev:MediaWiki:WDSIcons/code.js'
                ]
            });
        }
    };
    Main.init();
}(jQuery, mediaWiki));
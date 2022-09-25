/**
 * @name            FastCreate
 * @version         v1.0
 * @author          KockaAdmiralac
 * @author          TheGoldenPatrik1
 * @description     Adds fully customizable buttons to quickly create pages.
 */
(function (window, $, mw) {
    'use strict';
    var buttons = window.FCButtons || window.QCButtons,
        Api;
    if (
        !buttons ||
        Number(mw.config.get('wgCityId')) === 65099
    ) {
        return;
    }
    /**
     * @class Main
     * @classdesc Central FastCreate class
     */
    var Main = {
        /**
         * @method init
         * @description Analyzes config and creates buttons
         * @returns {void}
         */
        init: function () {
            Api = new mw.Api();
            Api.get({
                action: 'query',
                titles: buttons.map(function(b) {
                    return b.target;
                }).join('|')
            }).done(function (d) {
                var exists = {}, pages = d.query.pages;
                for (var p in pages) {
                    exists[pages[p].title] = Number(p) > 0;
                }
                buttons.forEach(function (b) {
                    if (
                        (exists[b.target] && !b.alwaysDisplay) ||
                        (b.require !== undefined && !b.require)
                    ) {
                        return;
                    }
                    $(b.placement || '#WikiaBar .toolbar .tools')[b.prepend ? 'prepend' : 'append'](
                        $('<li>').append(
                            $('<a>', {
                                'data-summary': b.summary,
                                'data-target': b.target,
                                'data-content': b.content,
                                text: b.label,
                                click: Main.click
                            })
                        )
                    );
                });
            });
        },
        /**
         * @method click
         * @description Performs the action when the button is clicked
         * @returns {void}
         */
        click: function () {
            var data = $(this).data();
            Main.createPage(data.target, data.summary, data.content);
        },
        /**
         * @method createPage
         * @description Creates the page
         * @param {String} target - The page to create
         * @param {String} summary - The summary to use
         * @param {String} content - The content to add
         * @returns {void}
         */
        createPage: function (target, summary, content) {
            Api.create(target, {summary: summary}, content).done(function(res) {
                window.location.href = mw.util.getUrl(target);
            });
        }
    };
    mw.loader.using([
        'mediawiki.util',
        'mediawiki.api',
        'mediawiki.user'
    ]).then(Main.init);
}(window, jQuery, mediaWiki));
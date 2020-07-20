/**
 * @name            LangSwitch
 * @version         v1.2
 * @author          TheGoldenPatrik1
 * @description     Adds a button to quickly switch languages.
 */
require([
    'wikia.window',
    'jquery',
    'mw'
], function (window, $, mw) {
    if (window.LangSwitchLoaded) {
        return;
    }
    window.LangSwitchLoaded = true;
    var i18n,
        placement,
        preloads = 2;
    /**
     * @method click
     * @description Switches languages when clicked
     * @returns {void}
     */
    function click () {
        var href = prompt(
                i18n.msg('prompt').plain(),
                window.LangSwitchDefault || 'qqx'
            ),
            page = mw.config.get('wgPageName');
        if (href) {
            if (href.slice(0, 1) === '/') {
                window.location.href = mw.util.getUrl(
                    page.indexOf('/') === -1 ?
                    (page + href) :
                    page.replace(/\/[^/]+$/, href)
                );
            } else {
                   window.location.href = new mw.Uri().extend({
                    uselang: href
                }).toString();
            }
        }
    }
    /**
     * @method init
     * @description Initiates the script and adds the button
     * @param {String} i18nData - Variable for I18n-js
     * @returns {void}
     */
    function init (i18nData) {
        i18n = i18nData;
        $(placement.element('tools'))[placement.type('prepend')](
            $('<li>').append(
                $('<a>', {
                    id: 'lang',
                    text: i18n.msg('text').plain(),
                    title: i18n.msg('title').plain(),
                    click: click,
                    css: {
                         cursor: 'pointer'
                    }
                })
            )
        );
    }
    /**
     * @method preload
     * @description Loads the hooks
     * @returns {void}
     */
    function preload () {
        if (--preloads === 0) {
            placement = window.dev.placement.loader;
            placement.script('LangSwitch');
            window.dev.i18n.loadMessages('LangSwitch').then(init);
        }
    }
	mw.hook('dev.i18n').add(preload);
	mw.hook('dev.placement').add(preload);
	importArticles({
		type: 'script',
		articles: [
		    'u:dev:MediaWiki:I18n-js/code.js',
		    'u:dev:MediaWiki:Placement.js'
        ]
	});
});
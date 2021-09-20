/**
 * 
 * @module                  CodeLinksDropdown
 * @description             Adds a dropdown link to personal code pages.
 * @author                  Americhino
 * @version                 0.9.1
 * @license                 CC-BY-SA 3.0
 * 
 */

$('.wds-global-navigation__user-menu .wds-dropdown__content, .global-navigation__bottom > .wds-dropdown > .wds-dropdown__content').addClass('wds-is-not-scrollable');
mw.hook('dev.i18n').add(function (lib) {
    lib.loadMessages('CodeLinksDropdown').then(function (i18n) {
        var config = mw.config.get([
                'wgFormattedNamespaces',
                'wgUserName',
                'wgVersion'
            ]),
            rootUrl = 'community',
            namespacePath = mw.util.getUrl(config.wgFormattedNamespaces[2] + ':'),
            username = config.wgUserName,
            usernamePath = namespacePath + username;
            
        $([
			'.wds-global-navigation__user-menu > .wds-dropdown__content > ul.wds-list > li:nth-child(2)',
			'.global-navigation__bottom > .wds-dropdown > .wds-dropdown__content > ul.wds-list > li:nth-child(1)'
		].join(', ')).after(
            '<li class="wds-dropdown-level-nested is-calculated">'+
                '<a href="#" class="wds-dropdown-level-nested__toggle" data-id="codelinks">' +
                    i18n.msg('codelinks').escape() + 
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                        '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                        '</path>' +
                    '</svg>' +
                '</a>' +
                    '<div class="wds-is-not-scrollable wds-dropdown-level-nested__content codelinks-menu">' +
                        '<ul class="wds-list wds-is-linked">' +
                            '<li>' +
                                '<a href="https://' + rootUrl + '.fandom.com/wiki/User:' + username + '/global.js" target="_blank">Global.js</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="https://' + rootUrl + '.fandom.com/wiki/User:' + username + '/global.css" target="_blank">Global.css</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="' + usernamePath + '/common.js" target="_blank">Common.js</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="' + usernamePath + '/fandomdesktop.js" target="_blank">FandomDesktop.js</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="' + usernamePath + '/common.css" target="_blank">Common.css</a>' +
                            '</li>' +
                            '<li>' +
                                '<a href="' + usernamePath + '/fandomdesktop.css" target="_blank">FandomDesktop.css</a>' +
                            '</li>' +
                    '</ul>' +
                '</div>' +
            '</li>'
        );
    });
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
});
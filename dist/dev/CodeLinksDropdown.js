/**
 * 
 * @module                  CodeLinksDropdown
 * @description             Adds a dropdown link to personal code pages.
 * @author                  Americhino
 * @version                 0.9.1
 * @license                 CC-BY-SA 3.0
 * 
 */

$('.wds-global-navigation__user-menu .wds-dropdown__content').addClass('wds-is-not-scrollable');
mw.hook('dev.i18n').add(function (lib) {
    lib.loadMessages('CodeLinksDropdown').then(function (i18n) {
        var config = mw.config.get([
            'wgFormattedNamespaces',
            'wgUserName',
            'wgScriptPath'
        ]);
        $('.wds-global-navigation__user-menu > .wds-dropdown__content > ul.wds-list > li:nth-child(2)').after(
            '<li class="wds-is-stickied-to-parent wds-dropdown-level-2">'+
                '<a href="#" class="wds-dropdown-level-2__toggle" data-id="codelinks">' +
                    i18n.msg('codelinks').escape() + 
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                        '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                        '</path>' +
                    '</svg>' +
                '</a>' +
                    '<div class="wds-is-not-scrollable wds-dropdown-level-2__content codelinks-menu">' +
                        '<ul class="wds-list wds-is-linked">' +
                            '<li>'+
                                '<a href="https://community.fandom.com/wiki/User:' + config.wgUserName + '/global.js" target="_blank">Global.js</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="https://community.fandom.com/wiki/User:' + config.wgUserName + '/global.css" target="_blank">Global.css</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="' + config.wgScriptPath + '/wiki/' + config.wgFormattedNamespaces[2] +':' + config.wgUserName + '/common.js" target="_blank">Common.js</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="' + config.wgScriptPath + '/wiki/' + config.wgFormattedNamespaces[2] +':' + config.wgUserName + '/wikia.js" target="_blank">Wikia.js</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="' + config.wgScriptPath + '/wiki/' + config.wgFormattedNamespaces[2] +':' + config.wgUserName + '/chat.js" target="_blank">Chat.js</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="' + config.wgScriptPath + '/wiki/' + config.wgFormattedNamespaces[2] +':' + config.wgUserName + '/common.css" target="_blank">Common.css</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="' + config.wgScriptPath + '/wiki/' + config.wgFormattedNamespaces[2] +':' + config.wgUserName + '/wikia.css" target="_blank">Wikia.css</a>' +
                            '</li>' +
                            '<li>'+
                                '<a href="' + config.wgScriptPath + '/wiki/' + config.wgFormattedNamespaces[2] +':' + config.wgUserName + '/chat.css" target="_blank">Chat.css</a>' +
                            '</li>' +
                    '</ul>' +
                '</div>' +
            '</li>'
        );
    });
});

importArticle({
    type: 'script',
    article: 'u:dev:I18n-js/code.js'
});

$('.wds-dropdown-level-2 .wds-dropdown-level-2__content .wds-list.wds-is-linked>li#quick-cup').remove();
$('.wds-dropdown-level-2 .wds-dropdown-level-2__content .wds-list.wds-is-linked>li>a[data-id="contributions"]').remove();
$('.wds-dropdown-level-2 .wds-dropdown-level-2__content .wds-list.wds-is-linked>li#MySandbox>a').remove();
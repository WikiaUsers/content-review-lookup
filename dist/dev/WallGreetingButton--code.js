// <nowiki>
/* jshint browser:true jquery:true laxbreak:true smarttabs:true */
require([
    'wikia.window',
    'jquery',
    'mw',
    'wikia.mustache'
], function(window, $, mw, Mustache) {
    'use strict';
    var config = mw.config.get([
        'wgAction',
        'wgNamespaceNumber',
        'wgTitle',
        'wgUserGroups',
        'wgUserName'
    ]), groups = config.wgUserGroups.join(' '), loading = 0;
    if (config.wgNamespaceNumber === 1202) {
        $('#ca-talk').remove();
        return;
    } else if (
        config.wgTitle.indexOf('/') !== -1 ||
        config.wgNamespaceNumber !== 1200 ||
        !(
            config.wgUserName === config.wgTitle ||
            /sysop|threadmoderator|soap|helper|content-team-member|wiki-manager|staff/.test(groups)
        ) ||
        config.wgAction !== 'edit' ||
        window.WallGreetingButtonLoaded
    ) {
        return;
    }
    window.WallGreetingButtonLoaded = true;
    function preload() {
        if (++loading === 2) {
            $.when(
                window.dev.i18n.loadMessages('WallGreetingButton'),
                mw.loader.using(['mediawiki.Title'])
            ).then(init);
        }
    }
    function init(i18n) {
        i18n.useUserLang();
        var params = {
            url: new mw.Title(config.wgTitle, 1202).getUrl(),
            wallUrl: new mw.Title(config.wgTitle, 1200).getUrl()
        };
        ['editGreeting', 'history', 'wallHistory', 'delete', 'protect', 'raw'].forEach(function(el) {
            params[el] = i18n.msg(el).plain();
        });
        $('#WikiaMainContentContainer').prepend(Mustache.render(
            '<div class="page-header" id="PageHeader" style="padding: 0;">' +
                '<div class="UserProfileActionButton" id="EditMessageWallGreeting">' +
                    '<div class="wds-button-group" id="ca-edit" style="text-align: left;">' +
                        '<a accesskey="e" href="{{url}}?action=edit" class="wds-is-squished wds-button">' +
                            window.dev.wds.icon('pencil-small').outerHTML +
                            '<span>{{editGreeting}}</span>' +
                        '</a>' +
                        '<div class="wds-dropdown">' +
                            '<div class="wds-button wds-is-squished wds-dropdown__toggle">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
                                    '<path d="M6 9l4-5H2" fill-rule="evenodd"></path>' +
                                '</svg>' +
                            '</div>' +
                            '<div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned" style="z-index: 2;">' +
                                '<ul class="wds-list wds-is-linked">' +
                                    '<li><a id="ca-history" href="{{url}}?action=history">{{history}}</a></li>' +
                                    '<li><a accesskey="h" href="{{wallUrl}}?action=history">{{wallHistory}}</a></li>' +
                                    (
                                        /sysop|content-moderator|soap|helper|content-team-member|wiki-manager|staff/.test(groups) ?
                                            '<li><a id="ca-delete" href="{{url}}?action=delete">{{delete}}</a></li>' + 
                                            (window.WallGreetingButtonProtect ?
                                                '<li><a id="ca-protect" href="{{url}}?action=protect">{{protect}}</a></li>' :
                                                '') :
                                            ''
                                    ) + 
                                    (
                                        window.WallGreetingButtonRaw ?
                                            '<li><a id="ca-raw" href="{{url}}?action=raw">{{raw}}</a></li>' :
                                        ''
                                    ) +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>',
            params
        ));
    }
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    });
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.wds').add(preload);
});
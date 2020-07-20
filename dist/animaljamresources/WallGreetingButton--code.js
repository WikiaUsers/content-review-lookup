// <nowiki>
/* jshint browser:true jquery:true laxbreak:true smarttabs:true */
/* global mediaWiki */
(function(window, $, mw) {
    'use strict';
    var config = mw.config.get([
        'wgAction',
        'wgNamespaceNumber',
        'wgTitle',
        'wgUserGroups',
        'wgUserName'
    ]), groups = config.wgUserGroups.join(' ');
    if (config.wgNamespaceNumber === 1202) {
        $('#ca-talk').remove();
        return;
    } else if (
        config.wgTitle.indexOf('/') !== -1 ||
        config.wgNamespaceNumber !== 1200 ||
        !(
            config.wgUserName === config.wgTitle ||
            /sysop|threadmoderator|vstf|helper|staff/.test(groups)
        ) ||
        config.wgAction !== 'edit' ||
        window.WallGreetingButtonLoaded
    ) {
        return;
    }
    window.WallGreetingButtonLoaded = true;
    function init(i18n) {
        i18n.useUserLang();
        var params = {
            url: new mw.Title(config.wgTitle, 1202).getUrl(),
            wallUrl: new mw.Title(config.wgTitle, 1200).getUrl()
        };
        ['editGreeting', 'history', 'wallHistory', 'delete', 'protect', 'raw'].forEach(function(el) {
            params[el] = i18n.msg(el).plain();
        });
        $('#WikiaMainContentContainer').prepend(window.Mustache.render(
            '<div class="page-header" id="PageHeader" style="padding: 0;">' +
                '<div class="UserProfileActionButton" id="EditMessageWallGreeting">' +
                    '<div class="wds-button-group" id="ca-edit" style="text-align: left;">' +
                        '<a accesskey="e" href="{{url}}?action=edit" class="wds-is-squished wds-button">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-pencil-small">' +
                                '<path d="M9.1 4.5l-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4zm7.6-.2l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z" fill-rule="evenodd"></path>' +
                            '</svg>' +
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
                                        /sysop|content-moderator|vstf|helper|staff/.test(groups) ?
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
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function(i18no) {
        $.when(
            i18no.loadMessages('WallGreetingButton'),
            mw.loader.using(['mediawiki.Title', 'wikia.mustache'])
        ).then(init);
    });
})(window, jQuery, mediaWiki);
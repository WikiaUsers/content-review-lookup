mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js').then(function () {
;(function (window, $, mw) {
    'use strict';
    var wgPageName = mw.config.values.wgPageName,
        content = window.clearSandboxContent,  // 保留自定义内容选项
        summary = window.clearSandboxSummary,
        msg;

    function init() {
        if ( wgPageName.toLowerCase().indexOf("/沙盒") >= 0 ) {
            $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list')
                .append('<li><a id="clear-sandbox">' + msg('button').escape() + '</a></li>');
        }
    
        $('#clear-sandbox').click(function(){
            $.post(mw.util.wikiScript( 'api' ), {
                format: 'json',
                action: 'edit',
                title: wgPageName,
                text: content || '',  // 关键修改：默认内容改为空字符串
                minor: false,
                bot: true,
                summary: summary || msg('summary').plain(),
                token: mw.user.tokens.get("csrfToken")
            }, function( data ) {
                if (!data.error) {
                    console.log('Sandbox cleaned successfully.');
                    location.reload(true);
                } else {
                    alert(msg('alert').plain() + '\n' + data.error.info);
                    console.log('Failed:' + data.error.info);
                }
            });
        });
    }
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('ClearSandbox').done(function (i18no) {
            msg = i18no.msg;
            init();
        });
    });
    importArticles({
        type: 'script',
        articles: 'u:dev:MediaWiki:I18n-js/code.js'
    });
}(window, window.jQuery, window.mediaWiki));
});
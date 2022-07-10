(function () {
    if (mw.config.get('wgCanonicalNamespace') !== '' || mw.config.get('wgArticleId') === 3) return

    mw.hook('dev.wds').add(function(wds) {
        var api = new mw.Api();
        api.get({
            action: 'query',
            meta: 'allmessages',
            amlang: mw.config.get('wgUserLanguage'),
            ammessages: 'page-header-action-button-talk',
            uselang: 'content', // T97096
            maxage: 300,
            smaxage: 300,
            formatversion: 2
        })
            .then(function (data) {
                const label = data.query.allmessages[0].content
                return label.replace( '({{FORMATNUM:$1}})', '' )
            })
            .then(function (label) {
                $('.page-header__action-button').eq(0)
                    .css('width', 'auto')
                    .append('<span style="margin-left: 6px;">' + label + '</span>')
                $('.page-header__action-button svg').eq(0)
                    .html(wds.icon('bubble-small'))
            })
    })
})()
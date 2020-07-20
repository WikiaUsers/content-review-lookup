function init(i18nd) {
    i18n = i18nd;
    $.ajax(wgScriptPath + '/api.php?' + $.param({
        action: 'parse',
        page: wgMainPageTitle,
        format: 'json'
    })).then(function(res) {
        $('.page-header__main').append(
            $('<div />', {
                text: i18n.msg('availableInLangs', res.parse.langlinks.length).parse()
            }).css({ color: '#666' })
        );
    });
}
 
function i18nCallback(i18no) {
    $.when(
        i18no.loadMessages('SupportedLanguages')
    ).then(init);
}

if (wgPageName.replace(/_/g, ' ') === wgMainPageTitle) {
    mw.hook('dev.i18n').add(i18nCallback);
}
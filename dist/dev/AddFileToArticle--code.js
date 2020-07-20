(function() {
    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgTitle'
    ]);
    if (
        config.wgNamespaceNumber !== 6 ||
        mw.util.$content.find('#mw-imagepage-nofile').length
    ) {
        return;
    }
    var i18n;
    function callback() {
        var $el = $('#article-search').autocomplete({
            serviceUrl: mw.util.wikiScript('api') + '?action=opensearch',
            appendTo: $('#article-search-form'),
                deferRequestBy: 250,
                maxHeight: 1000,
                queryParamName: 'search',
                selectedClass: 'selected',
                width: '270px',
                namespace: 0,
                fnPreprocessResults: function(response) {
                    response.query = response[0];
                    response.suggestions = response[1];
                    response.data = response[1];
                    return response;
                },
                onSelect: function(value, data, event) {
                    window.location.href = mw.util.getUrl(value, {
                        action: 'edit',
                        addFile: config.wgTitle
                    });
                }
            }, function(e) {
                console.error(e);
            });
            $('.add-to-new').click(function(e) {
                e.preventDefault();
                window.location.href = mw.util.getUrl('Special:CreatePage', {
                    wpTitle:  $('#article-search').val(),
                    addFile: config.wgTitle
                });
            });
    }
    function click() {
        $.showCustomModal(
            'Choose Article',
            $('<div>').append(
                $('<input>', {
                    type: 'text',
                    id: 'article-search',
                    style: 'width: 100%'
                }),
                $('<br>'),
                $('<a>', {
                    href: mw.util.getUrl('Special:CreatePage', {
                        wpTitle: '',
                        addFile: config.wgTitle
                    }),
                    'class': 'wds-button wds-is-secondary wds-is-squished add-to-new',
                    html: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="wds-icon wds-icon-small" id="wds-icons-add-new-page-small"><g fill-rule="evenodd"><path d="M4.667 11H8v1.333H4.667V11zm0-3.333h8V9h-8V7.667zm0-3.334h8v1.334h-8V4.333zM2.667 17H10v-4.667c0-.368.3-.666.667-.666h4.666v-10A.667.667 0 0 0 14.667 1h-12A.667.667 0 0 0 2 1.667v14.666c0 .368.3.667.667.667z"></path><path d="M14.943 13h-3.61v3.61z"></path></g></svg>&emsp;'
                }).append(
                    $('<span>', {
                        text: i18n.msg('insert').plain()
                    })
                )
            ).html(),
            {
                id: 'article-search-form',
                callback: callback,
                buttons: [{
                    message: i18n.msg('cancel').escape(),
                    handler: function() {
                        $('#article-search-form').closeModal();
                    },
                    id: 'article-search-cancel',
                    defaultButton: true,
                }]
            }
        );
    }
    function init(i18no) {
        i18n = i18no;
        $('.page-header__contribution-buttons .wds-dropdown .wds-list').append(
            $('<li>').append(
                $('<a>', {
                    text: i18n.msg('text').plain()
                }).click(click)
            )
        );
    }
    function i18nCallback(i18no) {
        $.when(
            i18no.loadMessages('AddFileToArticle'),
            mw.loader.using('jquery.autocomplete')
        ).then(init);
    }
    mw.hook('dev.i18n').add(i18nCallback);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();
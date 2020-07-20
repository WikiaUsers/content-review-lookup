//JSRT DO NOT APPROVE - testing on UCP, currently does not work
(function () {
    if (
        !window.DiscussionTemplates ||
        window.DiscussionTemplates.loaded ||
        !window.DiscussionTemplates.wiki ||
        !window.DiscussionTemplates.templates ||
        typeof window.DiscussionTemplates.templates !== 'object' ||
        mw.config.get('wgNamespaceNumber') !== 1200 ||
        mw.config.get('wgVersion') === '1.19.24'
    ) {
        return;
    }
    $.extend(true, window.DiscussionTemplates, {
        loaded: true
    });
    var preloads = 4;
    var wikiList = window.DiscussionTemplates.wikiList || {
        'de': 'https://community.fandom.com/de',
        'es': 'https://comunidad.fandom.com',
        'fi': 'https://yhteiso.fandom.com',
        'fr': 'https://communaute.fandom.com/fr',
        'it': 'https://community.fandom.com/it',
        'ja': 'https://community.fandom.com/ja',
        'ko': 'https://community.fandom.com/ko',
        'nl': 'https://community.fandom.com/nl',
        'pl': 'https://spolecznosc.fandom.com',
        'pt': 'https://comunidade.fandom.com',
        'ru': 'https://community.fandom.com/ru',
        'vi': 'https://community.fandom.com/vi',
        'zh': 'https://community.fandom.com/zh'
    };

    function selectTemplate () {
        var selected = $('#form-discussion-template #modal-select-template option:selected').text();
        var template = window.DiscussionTemplates.templates[selected];
        var get = $.get(window.DiscussionTemplates.wiki + '/wiki/' + template + '?action=raw').done(function (d) {
            return d.replace(/<noinclude>[\s\S]*<\/noinclude>/g, '');
        });
        if (get.includes('WIKI')) {
            var wiki = $('#form-discussion-template #modal-select-lang option:selected').text();
            get = get.replace(/WIKI/g, wikiList[wiki]);
        }
        $('.rich-text-editor__content p').text(get);
        modal.closeModal();
    }

    function formHTML () {
        window.dev.ui({
            type: 'div',
            children: [{
                type: 'span',
                text: i18n.msg('select-template-info')
            }, {
                type: 'select',
                attr: {
                    id: 'modal-select-template'
                }
            }, {
                type: 'span',
                text: i18n.msg('select-lang-info')
            }, {
                type: 'select',
                attr: {
                    id: 'modal-select-lang'
                }
            }]
        });
    }

    function click (i18nData) {
        var i18n = i18nData;
        var modal = new window.dev.modal.Modal({
            content: formHTML(),
            id: 'form-discussion-template',
            size: 'small',
            title: i18n.msg('title').plain(),
            buttons: [{
                event: 'onClick',
                text: i18n.msg('button').plain(),
                primary: true
            }],
            events: {
                onClick: selectTemplate
            }
        });
        modal.create();
        $('#form-discussion-template #modal-select-template').append('<input disabled selected>' + i18n.msg('default').plain() + '</input>');
        Object.keys(window.DiscussionTemplates.templates).forEach(function (i) {
            $('#form-discussion-template #modal-select-template').append('<input>' + i + '</input>');
        });
        $('#form-discussion-template #modal-select-lang').append('<input disabled selected>' + i18n.msg('default').plain() + '</input>');
        Object.keys(wikiList).forEach(function (i) {
            $('#form-discussion-template #modal-select-lang').append('<input>' + i + '</input>');
        });
        modal.show();
    }

    function init () {
        $('#MessageWall .WriteMessageButton').on('click', function () {
            function addButtons () {
                var $o = $('.rich-text-editor__toolbar__icon-group');
                if ($o.length === 0) {
                    setTimeout(addButtons, 250);
                } else {
                    $('.rich-text-editor__toolbar__icon-group').append(
                        $('<div>', {
                            click: click,
                            id: 'add-discussion-template',
                            class: 'rich-text-editor__toolbar__icon-wrapper'
                        }).append(window.dev.wds.icon('bubble'))
                    );
                }
            }
            addButtons();
        });
    }

    function preload () {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('DiscussionTemplates').then(init);
        }
    }

    mw.hook('dev.ui').add(preload);
    mw.hook('dev.wds').add(preload);
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.modal').add(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Modal.js',
            'u:dev:MediaWiki:UI-js/code.js',
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    });
})();
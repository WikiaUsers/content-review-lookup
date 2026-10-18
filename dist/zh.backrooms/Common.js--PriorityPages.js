(function () {
    'use strict';
    const config = mw.config,
        pageName = config.get('wgPageName'),
        namespace = config.get('wgNamespaceNumber');

    mw.hook('wikipage.content').add(() => {
        // 页头信息框
        let sourcePage,
            $target,
            api = new mw.Api();
        switch (true) {
            case pageName.startsWith('MediaWiki:Common.css'):
                sourcePage = 'User:0.Phixley/全站CSS页头信息框';
                $target = $('#mw-clearyourcache');
                break;
            case pageName === 'Template:StaffUserLinkStyle.css':
                sourcePage = 'User:0.Phixley/全站CSS页头信息框';
                $target = $('.mw-parser-output');
                $('.page__right-rail').addClass('is-rail-hidden');
                break;
            case namespace === 8 && pageName.endsWith('.js'):
                sourcePage = 'User:0.Phixley/全站JS页头警告框';
                $target = $('#mw-clearyourcache');
                $('.page__right-rail').addClass('is-rail-hidden');
                break;
        }
        if (
            sourcePage &&
            $target.length &&
            !$target.data('wikitext-imported')
        ) {
            api.get({
                action: 'parse',
                text: '{{:' + sourcePage + '}}',
                prop: 'text',
                formatversion: 2
            }).then(data => {
                const $output = $(data.parse.text)
                    .filter('.mw-parser-output')
                    .first();
                if (!$output.length) return;
                const $wrapper = $('<div>', {
                    id: 'imported-wikitext'
                });
                $output[0].childNodes.forEach(node => {
                    $wrapper.append(node);
                });
                $target
                    .after($wrapper)
                    .data('wikitext-imported', true);
                mw.loader.using('jquery.makeCollapsible')
                    .then(() => {
                        $wrapper
                            .find('.mw-collapsible')
                            .makeCollapsible();
                        mw.hook('wikipage.content')
                            .fire($wrapper);
                    });
            });
        }

        // Ratings.json
        if (pageName !== 'Backrooms_Wiki:Ratings.json') return;
        $('td table th > span').each(function () {
            const text = $(this).text().trim();
            if (!text) return;
            $(this).html($('<a>', {
                href: mw.util.getUrl(text),
                title: text,
                text
            }));
        });
        $('td table td td:not(.mw-json-empty)').each(function () {
            const text = $(this)
                .text()
                .trim()
                .replace(/^"|"$/g, '');
            if (!text) return;
            $(this).html($('<a>', {
                href: mw.util.getUrl('User:' + text),
                title: 'User:' + text,
                class: 'userlink',
                text
            }));
        });
    });
})();
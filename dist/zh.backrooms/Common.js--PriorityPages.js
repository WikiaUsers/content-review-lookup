mw.loader.using('mediawiki.api').then(function () {
    mw.hook('wikipage.content').add(function () {
        var page = mw.config.get('wgPageName'), sourcePage, $target = $('#mw-clearyourcache');
        if (page.startsWith('MediaWiki:Common.css') || page === 'Template:StaffUserLinkStyle.css') sourcePage = 'User:0.Phixley/全站CSS页头信息框';
        if (page === 'Template:StaffUserLinkStyle.css') {
            $target = $('.mw-parser-output');
            $('.page__right-rail').addClass('is-rail-hidden');
        }
        if (mw.config.get('wgNamespaceNumber') === 8 && page.endsWith('.js')) {
            sourcePage = 'User:0.Phixley/全站JS页头警告框';
            $('.page__right-rail').addClass('is-rail-hidden');
        }
        if (!sourcePage || !$target.length || $target.data('wikitext-imported')) return;
        new mw.Api().get({
            action: 'parse',
            text: '{{:' + sourcePage + '}}',
            prop: 'text',
            formatversion: 2
        }).then(function (data) {
            var $output = $(data.parse.text).filter('.mw-parser-output').first();
            if (!$output.length) return;
            var $wrapper = $('<div>', { id: 'imported-wikitext' });
            $output[0].childNodes.forEach(function (node) {
                $wrapper.append(node);
            });
            $target.after($wrapper).data('wikitext-imported', true);
            var $reload = $('#imported-wikitext');
            mw.loader.using(['jquery.makeCollapsible']).then(function () {
                $reload.find('.mw-collapsible').makeCollapsible();
                mw.hook('wikipage.content').fire($reload);
            });
        });
    });
});

mw.loader.using('mediawiki.util').then(function () {
    mw.hook('wikipage.content').add(function () {
        if (mw.config.get('wgPageName') !== 'Backrooms_Wiki:Ratings.json') return;
        $('td table th > span').each(function () {
            var text = $(this).text().trim();
            if (!text) return;
            $(this).html($('<a>', {
                href: mw.util.getUrl(text),
                title: text,
                text: text
            }));
        });
        $('td table td td:not(.mw-json-empty)').each(function () {
            var text = $(this).text().trim().replace(/^"|"$/g, '');
            if (!text) return;
            $(this).html($('<a>', {
                href: mw.util.getUrl('User:' + text),
                title: 'User:' + text,
                class: 'userlink',
                text: text
            }));
        });
    });
});
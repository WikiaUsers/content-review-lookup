// Non-refreshing Variant
// Made by [[User:0.Phixley]]

(function () {
    var $main = $('.mw-parser-output').first();
    var $variants = $('.page-header__variants').first();
    var controller;
    if (!$main.length) return;
    function loadVariant(url, push) {
        var target = new URL(url, location.href);
        var variant = target.searchParams.get('variant');
        if (!target.searchParams.has('variant')) return;
        if (controller) controller.abort();
        controller = new AbortController();
        var signal = controller.signal;
        var params = new URLSearchParams({
            action: 'parse',
            page: mw.config.get('wgPageName'),
            prop: 'text',
            variant: variant,
            usearticle: '1',
            format: 'json',
            formatversion: '2'
        });
        return Promise.all([
            fetch(mw.util.wikiScript('api') + '?' + params, {
                credentials: 'same-origin',
                signal: signal
            }).then(function (response) {
                if (!response.ok) throw new Error('API HTTP ' + response.status);
                return response.json();
            }),
            fetch(target.href, {
                credentials: 'same-origin',
                signal: signal
            }).then(function (response) {
                if (!response.ok) throw new Error('Page HTTP ' + response.status);
                return response.text();
            })
        ])
            .then(function (responses) {
                var data = responses[0];
                var pageHtml = responses[1];
                if (!data.parse || !data.parse.text) throw new Error('Invalid API response');
                var apiDoc = new DOMParser().parseFromString(
                    data.parse.text,
                    'text/html'
                );
                var pageDoc = new DOMParser().parseFromString(
                    pageHtml,
                    'text/html'
                );
                var $newMain = $(apiDoc.body)
                    .children('.mw-parser-output')
                    .first();
                var $newVariants = $(pageDoc)
                    .find('.page-header__variants')
                    .first();
                if (!$newMain.length) throw new Error('Missing .mw-parser-output');
                if (!$newVariants.length) throw new Error('Missing .page-header__variants');
                $main.replaceWith($newMain);
                $main = $newMain;
                if ($variants.length) $variants.replaceWith($newVariants);
                $variants = $newVariants;
                if (push) history.pushState({}, '', target.href);
                mw.loader.using([
                    'jquery.makeCollapsible'
                ]).then(function () {
                    $main.find('.mw-collapsible').makeCollapsible();
                    mw.hook('wikipage.content').fire($main);
                });
            })
            .catch(function (error) {
                if (error.name === 'AbortError') return;
                console.error('[Variant] 转换失败:', error);
                if (push) location.href = target.href;
            });
    }
    $(document).on('click', 'a[href]', function (e) {
        if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey ||
            e.altKey ||
            this.target === '_blank' ||
            this.hasAttribute('download')
        ) return;
        var url = new URL(this.href, location.href);
        if (
            url.origin !== location.origin ||
            url.pathname !== location.pathname ||
            !url.searchParams.has('variant')
        ) return;
        e.preventDefault();
        var $li = $(this).closest('.page-header__variants li a');
        if ($li.length) {
            $li.html($('<img>', {
                src: 'https://static.wikia.nocookie.net/dev/images/4/42/Loading.gif',
                alt: 'loading...'
            }));
        }
        loadVariant(url.href, true);
    });
    window.addEventListener('popstate', function () {
        loadVariant(location.href, false);
    });
})();
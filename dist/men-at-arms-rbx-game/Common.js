/*
What changed: var now use the modern const
*/

// Subpages: selected page replaces the whole page

mw.loader.using('mediawiki.api').then(function () {
    const api   = new mw.Api();
    const $wrap = $('.page-swap').first();
    if (!$wrap.length) return;

    const $nav     = $wrap.find('.page-swap-nav');
    const $content = $wrap.find('.page-swap-content');
    const home     = mw.config.get('wgPageName').replace(/_/g, ' ');
    const cache    = {};
    cache[home]    = $content.html();

    function render(title) {
        const embedded = title !== home;

        $content.removeClass('page-swap-loading')
                .toggleClass('page-swap-embedded', embedded)
                .html(cache[title]);

        $('body').toggleClass('page-swap-embedded-view', embedded);

        if (embedded) {
            // Strip the dropdown before the hook runs, so it can't bind to the parent's toggle
            $content.find('.arabesque-hdr-menu').remove();
            $content.find('.arabesque-hdr-title').removeClass('mw-customtoggle-arabmenu');
        }

        mw.hook('wikipage.content').fire($content);

        const top = $wrap.offset().top;
        if (embedded && $(window).scrollTop() > top) {
            $(window).scrollTop(top);
        }
    }

    function show(title) {
        $nav.find('a').each(function () {
            const $a = $(this);
            $a.toggleClass('page-swap-active', $a.attr('title') === title);
        });

        if (cache[title] !== undefined) {
            render(title);
            return;
        }

        $content.addClass('page-swap-loading');
        api.get({
            action: 'parse',
            page: title,
            prop: 'text',
            redirects: true,
            disablelimitreport: true,
            formatversion: 2
        }).then(function (data) {
            const $tmp   = $('<div>').html(data.parse.text);
            const $inner = $tmp.find('.page-swap-content').first();
            cache[title] = $inner.length ? $inner.html() : $tmp.html();
            render(title);
        }, function () {
            $content.removeClass('page-swap-loading').text('Could not load this page.');
        });
    }

    function fromHash() {
        const h = decodeURIComponent(location.hash.slice(1)).replace(/_/g, ' ');
        show(h || home);
    }

    // Click: open the page, or fall back to the parent if it's already the active one
    $nav.on('click', 'a', function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return; // allow new-tab clicks
        e.preventDefault();

        const $a    = $(this);
        const title = $a.attr('title');

        if (title === home || $a.hasClass('page-swap-active')) {
            // Parent's own link, or the open child clicked again: back to the parent
            if (location.hash) {
                history.pushState(null, '', location.pathname + location.search);
                fromHash();
            }
        } else {
            location.hash = title.replace(/ /g, '_');
        }
    });

    // Embedded header: click scrolls back to the top of the group
    $content.on('click', '.arabesque-bar', function () {
        if (!$content.hasClass('page-swap-embedded')) return;
        $('html, body').animate({ scrollTop: $wrap.offset().top }, 250);
    });

    $(window).on('hashchange', fromHash);
    fromHash();
});

/* Loaders */

// Cite
if ( document.querySelector( '.av-ref' ) ) {
    importArticles( { type: 'script', article: 'MediaWiki:Cite.js' } );
}

// Comparison
if ( document.querySelector( 'table.av-comparable' ) ) {
    importArticles( { type: 'script', article: 'MediaWiki:Compare.js' } );
}
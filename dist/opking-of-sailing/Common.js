/* ===== HERO FILTER + SEARCH (Fandom-safe) ===== */
;(function () {
    function getSearchVal() {
        var el = document.getElementById('hero-search-input');
        return el ? el.value.toLowerCase().trim() : '';
    }

    function applyHeroFilters() {
        var activeRank     = $('.filter-rank.active').text().toLowerCase().trim();
        var activeRole     = $('.filter-role.active').text().toLowerCase().trim();
        var activeFraction = ($('.hf-btn.active[data-type="fraction"]').data('val') || 'all').toString().toLowerCase().trim();
        var query          = getSearchVal();

        var shown = 0, total = 0;

        $('.hero-card').each(function () {
            var $card = $(this);
            total++;

            var cardRank = 'all';
            if ($card.hasClass('rank-ssr')) cardRank = 'ssr+';
            if ($card.hasClass('rank-ur'))  cardRank = 'ur';

            var cardRole     = ($card.data('role')     || 'all').toString().toLowerCase().trim();
            var cardFraction = ($card.data('fraction') || '').toString().toLowerCase().trim();
            var cardName     = $card.find('.hero-card-name').text().toLowerCase().trim();

            var matchRank     = (activeRank === 'all' || cardRank === activeRank);
            var matchRole     = (activeRole === 'all' || cardRole === activeRole);
            var matchFraction = (activeFraction === 'all' || cardFraction === activeFraction);
            var matchSearch   = (query === '' || cardName.indexOf(query) !== -1);

            var visible = matchRank && matchRole && matchFraction && matchSearch;
            $card.toggleClass('hf-hidden', !visible);
            if (visible) shown++;
        });

        var $count = $('#hero-count');
        if ($count.length) $count.text(shown + ' / ' + total);
    }

    function buildSearchInput() {
        var box = document.getElementById('hero-search');
        if (box && !document.getElementById('hero-search-input')) {
            var inp = document.createElement('input');
            inp.type = 'text';
            inp.id = 'hero-search-input';
            inp.className = 'hero-search-input';
            inp.placeholder = 'Search Hero...';
            box.appendChild(inp);
            $(inp).on('input', applyHeroFilters);
        }
    }

    function resetFilters() {
        $('.filter-rank').removeClass('active').first().addClass('active');
        $('.filter-role').removeClass('active').first().addClass('active');
        $('.hf-btn[data-type="fraction"]').removeClass('active');
        $('.hf-btn[data-type="fraction"][data-val="all"]').addClass('active');
        var inp = document.getElementById('hero-search-input');
        if (inp) inp.value = '';
        applyHeroFilters();
    }

    function init() {
        buildSearchInput();
        if (!window.__hfBound) {
            $('body').on('click', '.hf-btn', function () {
                var $btn = $(this);
                if ($btn.attr('id') === 'hero-reset') { resetFilters(); return; }
                $btn.parent().find('.hf-btn').removeClass('active');
                $btn.addClass('active');
                applyHeroFilters();
            });
            window.__hfBound = true;
        }
        applyHeroFilters();
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(init);
    } else {
        $(init);
    }
})();
 /* Moved from [[MediaWiki:common.js]] */

mw.hook('wikipage.content').add(function ($content) {
    var $placeholder = $('#search-placeholder');
    if (!$placeholder.length || $('#inpage-search').length || window.location.href.includes('action=')) return;

    var debounceTimer;

    // SEARCH BAR UI
    var $container = $('<div id="inpage-search"></div>');
    var $input = $('<input type="search" id="pageSearchInput" aria-label="Filter Change Log" placeholder="Filter Change Log (e.g., Winter, V74, Fixed)..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background: var(--theme-page-background-color); color: var(--theme-page-text-color); box-sizing: border-box;">');
    var $status = $('<div id="searchStatus" role="status" aria-live="polite"></div>');

    $container.append($input, $status);
    $placeholder.replaceWith($container);

    function getUpdateGroups() {
        var result = [];
        // Map only versions (H3)
        $('.mw-parser-output > h3').each(function() {
            var $header = $(this);
            var $contentBetween = $header.nextUntil('h3, h2'); // For the next H3 or next YEAR (H2)
            result.push({
                header: $header,
                content: $contentBetween,
                fullText: ($header.text() + ' ' + $contentBetween.text()).toLowerCase()
            });
        });
        return result;
    }

    // no need to re-scan the DOM on every keystroke
    var groups = getUpdateGroups();

    function clearHighlights() {
        $('.page-search-highlight').each(function() {
            var parent = this.parentNode;
            $(this).replaceWith(this.textContent);
            if (parent) parent.normalize();
        });
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function escapeRegex(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // array of RegExp (one per search term), built once per search
    // and reused across every group
    function applyHighlight($elements, regexes) {
        $elements.find('span, li, b, i, code, h3, a').addBack('h3').not('h2').contents().filter(function() {
            return this.nodeType === 3;
        }).each(function() {
            var text = this.textContent;
            var matched = regexes.some(function(regex) {
                return text.search(regex) !== -1;
            });

            if (!matched) return;

            // Escape HTML entities first
            var highlighted = escapeHtml(text);
            regexes.forEach(function(regex) {
                highlighted = highlighted.replace(regex, '<span class="page-search-highlight">$1</span>');
            });

            $(this).replaceWith(highlighted);
        });
    }

    function executeSearch() {
        var query = $input.val().trim().toLowerCase();
        var seenTerms = {};
        var terms = query.split(/\s+/).filter(function(term) {
            if (!term || seenTerms[term]) return false;
            seenTerms[term] = true;
            return true;
        });
        var matchCount = 0;

        clearHighlights();

        if (!terms.length) {
            $('.mw-parser-output > *').show();
            $status.text('');
            return;
        }

        var regexes = terms.map(function(term) {
            return new RegExp('(' + escapeRegex(term) + ')', 'ig');
        });

        $('.mw-parser-output > *').not('#inpage-search, .log-header, .noprint').hide();
        // Keeps the years (H2) visible only as divisors (without counting as a result)
        $('.mw-parser-output > h2').show();

        groups.forEach(function(group) {
            // A group matches only if EVERY term is present 
            var isMatch = terms.every(function(term) {
                return group.fullText.indexOf(term) !== -1;
            });

            if (isMatch) {
                group.header.show();
                group.content.show();
                applyHighlight(group.header.add(group.content), regexes);
                matchCount++;
            }
        });

        $status.text(matchCount > 0 ? 'Found ' + matchCount + ' corresponding versions.' : 'No results found.');
    }

    $input.on('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(executeSearch, 250);
    });
});
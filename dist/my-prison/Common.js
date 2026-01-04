/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function ($content) {
    var $placeholder = $('#search-placeholder');
    if (!$placeholder.length || $('#inpage-search').length || window.location.href.includes('action=')) return;

    var debounceTimer;

    // --- SEARCH BAR UI ---
    var $container = $('<div id="inpage-search" style="margin: 15px 0; padding: 15px; background: var(--theme-page-background-color--secondary); border: 1px solid var(--theme-border-color); border-radius: 8px;"></div>');
    var $input = $('<input type="search" id="pageSearchInput" placeholder="Filter Change Log (e.g., Winter, V74, Fixed)..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background: var(--theme-page-background-color); color: var(--theme-page-text-color); box-sizing: border-box;">');
    var $status = $('<div id="searchStatus" style="font-size: 12px; margin-top: 8px; color: var(--theme-page-text-color); opacity: 0.8; font-weight: bold;"></div>');
    
    $container.append($input, $status);
    $placeholder.replaceWith($container);

    function getUpdateGroups() {
        var groups = [];
        // Map all H3 (versions)
        $('.mw-parser-output > h3').each(function() {
            var $header = $(this);
            var $contentBetween = $header.nextUntil('h3');
            groups.push({
                header: $header,
                content: $contentBetween,
                fullText: ($header.text() + ' ' + $contentBetween.text()).toLowerCase()
            });
        });
        return groups;
    }

    function clearHighlights() {
        $('.page-search-highlight').each(function() {
            var parent = this.parentNode;
            $(this).replaceWith(this.textContent);
            if (parent) parent.normalize();
        });
    }

    function applyHighlight($elements, term) {
        var regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        $elements.find('span, li, b, i, code, h3').addBack('h3').contents().filter(function() {
            return this.nodeType === 3 && this.textContent.match(regex);
        }).each(function() {
            var span = document.createElement('span');
            span.innerHTML = this.textContent.replace(regex, '<span class="page-search-highlight">$1</span>');
            $(this).replaceWith(span.childNodes);
        });
    }

    function executeSearch() {
        var query = $input.val().trim().toLowerCase();
        var groups = getUpdateGroups();
        var matchCount = 0;

        clearHighlights();

        if (!query) {
            // If empty, show everything on the page
            $('.mw-parser-output > *').show();
            $status.text('');
            return;
        }

        // --- LOGIC OF CONCEALMENT  ---
        // 1. Hide all direct children of the content area
        var $allContent = $('.mw-parser-output > *');
        $allContent.hide();

        // 2. Ensure that the Header, Notice, and Search Bar REMAIN VISIBLE.
        $('.log-header, .noprint, #inpage-search').show();
        $('.mw-parser-output > h2').show(); 

        // 3. Only shows groups (H3 + content) that match the search
        groups.forEach(function(group) {
            if (group.fullText.indexOf(query) !== -1) {
                group.header.show();
                group.content.show();
                applyHighlight(group.header.add(group.content), query);
                matchCount++;
            }
        });

        $status.text(matchCount > 0 ? 'Found ' + matchCount + ' corresponding versions.' : 'No results found.');
    }

    $input.on('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(executeSearch, 250);
    });

    if (!$('#page-search-highlight-style').length) {
        $('<style id="page-search-highlight-style">')
            .text('.page-search-highlight { background: #fff176 !important; color: #000 !important; border-radius: 2px; padding: 0 1px; }')
            .appendTo('head');
    }
});

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{NewUser}}',
    },
    notify: true
};
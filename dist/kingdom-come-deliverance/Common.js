/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

// COLLAPSIBLE HEADERS
$(function () {
    // Skip mobile Fandom
    if (mw.config.get('skin') === 'fandommobile') return;

    var $content = $('#mw-content-text');
    if (!$content.length) return;

    var headers = $content.find('h2');
    headers.each(function (i, el) {
        var $header = $(el);

        // Skip headers inside portable infobox
        if ($header.closest('.portable-infobox').length) return;

        var id = 'myDivision-' + i;

        // Collect all elements until the next h2
        var $sectionContent = $();
        var $next = $header.next();
        while ($next.length && !$next.is('h2')) {
            // Skip elements that are inside portable infobox
            if (!$next.closest('.portable-infobox').length) {
                $sectionContent = $sectionContent.add($next);
            }
            $next = $next.next();
        }

        // Wrap content in collapsible div (expanded by default)
        if ($sectionContent.length) {
            $sectionContent.wrapAll(
                '<div class="mw-collapsible" id="mw-customcollapsible-' + id + '"></div>'
            );

            // Make header a toggle
            $header.wrapInner(
                '<span role="button" class="mw-customtoggle-' + id + '" style="cursor:pointer;"></span>'
            );
        }
    });

    // Initialize collapsibles
    mw.loader.using('jquery.makeCollapsible').then(function () {
        $('.mw-collapsible').makeCollapsible();
    });
});
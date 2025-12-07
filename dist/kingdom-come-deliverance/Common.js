/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/

$(function () {
    // Only run on main namespace (0) and skip mobile
    if (mw.config.get('wgNamespaceNumber') !== 0 || mw.config.get('skin') === 'fandommobile') return;

    var $content = $('#mw-content-text');
    if (!$content.length) return;

    // Find all h2 headers outside portable infoboxes
    $content.find('h2').each(function (i, el) {
        var $header = $(el);
        if ($header.closest('.portable-infobox').length) return;

        var id = 'myDivision-' + i;

        // Collect all elements until the next h2, skipping those in infoboxes
        var $sectionContent = $();
        var $next = $header.next();
        while ($next.length && !$next.is('h2')) {
            if (!$next.closest('.portable-infobox').length) {
                $sectionContent = $sectionContent.add($next);
            }
            $next = $next.next();
        }

        if ($sectionContent.length) {
            // Wrap section in collapsible div
            $sectionContent.wrapAll('<div class="mw-collapsible" id="mw-customcollapsible-' + id + '"></div>');

            // Make header clickable
            $header.wrapInner('<span role="button" class="mw-customtoggle-' + id + '" style="cursor:pointer;"></span>');
        }
    });

    // Initialize collapsibles
    mw.loader.using('jquery.makeCollapsible').then(function () {
        $('.mw-collapsible').makeCollapsible();
    });
});
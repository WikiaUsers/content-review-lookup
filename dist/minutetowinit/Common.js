/* =============================================================
   Mediawiki:Common.js
   Runs on every page for every user.
   ============================================================= */
/* -------------------------------------------------------------
   OPEN LINKS IN A NEW TAB
   Opens all links in a new tab except redirects and table of content links (sections)
   Includes noopener noreferrer for security and an aria-label
   so screen readers can announce the behavior.
   ------------------------------------------------------------- */
$(function() {
	"use strict"; // safe mode
	
    $('a').each(function() {
        const $link = $(this);
        const href = $link.attr('href');
        // Skip links inside infobox episode template
		if ($link.closest('.episode-infobox').length) return;
		// Skip anchor links
        if (!href) return; // no href
        if (href.startsWith('#')) return; // Skip anchors (same-page section jumps)
        if (/^(javascript:|mailto:|tel:)/i.test(href)) return; // Skip non-page links
        if ($link.closest('.fandom-navbar, .fandom-community-header').length) return; // Skip top nav links
        if ($link.hasClass('redirect')) return; // Skip redirects

        // Apply target="_blank"
        $link.attr('target', '_blank')
             .attr('rel', 'noopener noreferrer');

        // Accessibility: don't overwrite an existing aria-label if one is already set
        if (!$link.attr('aria-label')) {
            $link.attr('aria-label', ($link.text().trim() || 'Link') + ' (opens in new tab)');
        }
    });
});
/* -------------------------------------------------------------
   CUSTOM TOOLTIP — see Template:Texttip
   Replaces native title= tooltips with a styled div.
   Supports custom fonts, multiline text, and keyboard access.
   Applies to Template:Texttip elements and internal wiki links.
   ------------------------------------------------------------- */
$(function() {
    // Prevent double initialization
    if ($('#custom-tooltip').length) return;
    // Create the tooltip div
    const tooltip = $('<div id="custom-tooltip" role="tooltip" aria-hidden="true"></div>')
        .appendTo('body');
    /* -----------------------------------------------------------
       Template:Texttip elements
       Saves and removes title= so the browser tooltip
       doesn't compete with ours. Adds keyboard support.
       ----------------------------------------------------------- */
    $('.custom-texttip').each(function() {
        $(this).data('title', $(this).attr('title'))
               .removeAttr('title')
               .attr('tabindex', '0')
               .attr('aria-describedby', 'custom-tooltip');
    });
    /* -----------------------------------------------------------
       Wiki link tooltips
       Applies custom tooltip to internal links with a title=.
       File and Image links are excluded intentionally (they only show filenames and KB)
       ----------------------------------------------------------- */
    $('.mw-parser-output a[title]')
        .not('[href*="/File:"], [href*="/Image:"]')
        .each(function() {
            $(this).data('title', $(this).attr('title'))
                   .removeAttr('title')
                   .addClass('custom-texttip link-tip')
                   .attr('aria-describedby', 'custom-tooltip');
        });
    /* -----------------------------------------------------------
       Images + Galleries
       Removes title= from images AND gallery image links so
       native filename tooltips do not appear anywhere.
       ----------------------------------------------------------- */
    function stripImageTitles(scope) {
    const $scope = scope ? $(scope) : $(document);

    // Include the scope element itself + its descendants
    $scope
        .filter('.mw-parser-output img[title], .mw-parser-output a.image[title], .mw-parser-output .gallery a[title], .mw-parser-output .gallery img[title]')
        .add($scope.find('.mw-parser-output img[title], .mw-parser-output a.image[title], .mw-parser-output .gallery a[title], .mw-parser-output .gallery img[title]'))
        .removeAttr('title');
}
    // This is just calling the function above
    stripImageTitles();

    // Re-apply for dynamically loaded content (Fandom lazy/AJAX content) -
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (!m.addedNodes) return;
            m.addedNodes.forEach(function(node) {
                if (node.nodeType !== 1) return; // only element nodes
                stripImageTitles(node);
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    /* Above it just checks the page for any images that are lazy-loaded, take longer to load, etc.
    (but it's event-based), not forever, so it's not a loop. */
    /* -----------------------------------------------------------
       Show tooltip on hover or keyboard focus
       Positions above the element on focus since there's no cursor.
       Newlines are supported via the ;; syntax in Template:Texttip.
       ----------------------------------------------------------- */
    $(document).on('mouseenter focusin', '.custom-texttip', function(e) {
        const tip = $(this).data('title');
        if (!tip) return;
        if (e.type === 'focusin') {
            const offset = $(this).offset();
            tooltip.css({ top: offset.top - 40, left: offset.left });
        }
		tooltip
		.toggleClass('link-tip', $(this).hasClass('link-tip'))
		.text(String(tip))
		.attr('aria-hidden', 'false')
		.show();
		const safeTip = String(tip)
		.replace(/&/g, '<span class="tip-amp">&amp;</span>')
		.replace(/\bELIMINATION\b/g, '<span class="elimination">ELIMINATION</span>')
		.replace(/\n/g, '<br>');
		tooltip.html(safeTip);
});
    /* -----------------------------------------------------------
       Follow the cursor
       Throttled to 10ms to keep it smooth without hurting
       performance. Flips to the left if it would go off-screen.
       ----------------------------------------------------------- */
    $(document).on('mousemove', '.custom-texttip', function(e) {
        clearTimeout($(this).data('moveTimer'));
        $(this).data('moveTimer', setTimeout(() => {
            const tipWidth = tooltip.outerWidth();
            const winWidth = $(window).width();
            const left = (e.pageX + 10 + tipWidth > winWidth)
                ? e.pageX - tipWidth - 10
                : e.pageX + 10;
            tooltip.css({ top: e.pageY - 40, left: left });
        }, 10));
    });
    /* -----------------------------------------------------------
       Hide tooltip on mouse leave or blur
       ----------------------------------------------------------- */
    $(document).on('mouseleave focusout', '.custom-texttip', function() {
        tooltip.attr('aria-hidden', 'true').hide();
    });
    /* -----------------------------------------------------------
       Dismiss with Escape key
       Standard behavior for accessible tooltip components.
       ----------------------------------------------------------- */
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            tooltip.attr('aria-hidden', 'true').hide();
        }
    });
});
/* =============================================================
   Note: Images and gallery image links have title= stripped above.
   Please use alt= text on images for screen reader support.
 ============================================================= */
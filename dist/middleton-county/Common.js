/* Any JavaScript here will be loaded for all users on every page load. */

/* Left-justify Reflist multi-links */

$('ol.references > li').each(function() {
        if ($(this).children('sup').length > 0) {
                $(this).children('.reference-text').insertBefore($(this).children('sup:first'));
        }
});
/* Any JavaScript here will be loaded for all users on every page load. */

/*This function makes navbox links that go to a diff section in the page you're currently looking at no longer display as a link.
This makes its behavior match that of links that go to actual pages rather than sections.*/
$(function () {
    $('.navbox a').each(function () {
        var href = $(this).attr('href');
        if (href && href.charAt(0) === '#') {
            $(this)
                .addClass('mw-selflink selflink')
                .attr('style', 'font-weight:bold !important; color:inherit !important; text-decoration:none !important; pointer-events:none !important;');
        }
    });
});
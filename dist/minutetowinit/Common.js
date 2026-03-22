/* Any JavaScript here will be loaded for all users on every page load. */
// --- Open all links in a new tab ---
$(function() {
    $('a').not('.redirect').attr('target', '_blank');
});

// --- Custom tooltip, see Template:Texttip ---
$(function() {
    var tooltip = $('<div id="custom-tooltip"></div>').appendTo('body');

    // Store and remove all title attributes immediately on page load
    $('.custom-texttip').each(function() {
        $(this).data('title', $(this).attr('title')).removeAttr('title');
    });

    $(document).on('mouseenter', '.custom-texttip', function() {
        var tip = $(this).data('title');
        if (!tip) return;
        tooltip.html(tip.replace(/\n/g, '<br>')).show();
    }).on('mousemove', '.custom-texttip', function(e) {
        tooltip.css({ top: e.pageY - 40, left: e.pageX + 10 });
    }).on('mouseleave', '.custom-texttip', function() {
        tooltip.hide();
    });
});
// Make tooltips show on click instead of hover
$(document).ready(function() {
    // Disable existing hover events
    $('.tooltip, .tooltip-hover').off('mouseenter mouseleave');

    // Add click toggle
    $('.tooltip, .tooltip-hover').on('click', function(e) {
        e.stopPropagation();
        const tip = $(this).find('.tooltip-content, .tooltiptext, .tooltip-wrapper');
        $('.tooltip-content, .tooltiptext, .tooltip-wrapper').not(tip).hide(); // Hide other open tooltips
        tip.toggle(); // Toggle this one
    });

    // Hide tooltips when clicking elsewhere
    $(document).on('click', function() {
        $('.tooltip-content, .tooltiptext, .tooltip-wrapper').hide();
    });
});
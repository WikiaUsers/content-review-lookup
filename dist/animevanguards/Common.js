// Make tooltips show on click instead of hover
$(document).ready(function() {
    // Disable existing hover events
    $('.tooltip, .tooltip-hover').off('mouseenter mouseleave');

    // Add click toggle
    $('.tooltip, .tooltip-hover').on('click', function(e) {
        e.stopPropagation();
        const tip = $(this).find('.tooltip-content, .tooltiptext, .tooltip-wrapper');
        $('.tooltip-content, .tooltiptext, .tooltip-wrapper').not(tip).hide();
        tip.toggle();
    });

    // Hide tooltips when clicking elsewhere
    $(document).on('click', function() {
        $('.tooltip-content, .tooltiptext, .tooltip-wrapper').hide();
    });
    
    // MemoriaBox click handler
    $(document).on('click', '.memoria-box', function(e) {
        // Don't trigger if clicking on a link
        if ($(e.target).closest('a').length) {
            return true;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        const container = $(this).closest('.memoria-container');
        const tooltip = container.find('.memoria-tooltip-content');
        
        // Hide all other memoria tooltips
        $('.memoria-tooltip-content').not(tooltip).hide();
        
        // Toggle this tooltip
        tooltip.toggle();
        
        // Position tooltip
        if (tooltip.is(':visible')) {
            const rect = this.getBoundingClientRect();
            const tooltipWidth = tooltip.outerWidth();
            
            // Position to the right of the box
            let left = rect.right + 10;
            let top = rect.top;
            
            // Adjust if goes off screen
            if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - 10;
            }
            
            tooltip.css({
                left: left + 'px',
                top: top + 'px',
                position: 'fixed'
            });
        }
    });
    
    // Hide memoria tooltips when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.memoria-box, .memoria-tooltip-content').length) {
            $('.memoria-tooltip-content').hide();
        }
    });
});
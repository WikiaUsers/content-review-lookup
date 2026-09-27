mw.loader.using(['jquery.ui'], function() {
    mw.hook('wikipage.content').add(function($content) {
        
        /* tooltip lock, unlock, and drag*/
        var $draggableTooltips = $content.find('.tooltip.candrag_tooltip').filter(function() {
            return $(this).parents('.tooltip').length === 0;
        });

        $draggableTooltips.each(function() {
            var $tooltip = $(this);
            if ($tooltip.data('tooltip-drag-init')) return;
            $tooltip.data('tooltip-drag-init', true);

            var $tooltipText = $tooltip.children('.tooltiptext');

            $tooltipText.draggable({
                cancel: "a",
                scroll: false,
                drag: function(event, ui) {
                    var winWidth = $(window).width();
                    var elWidth = $(this).outerWidth();

                    if (ui.position.left < 0) ui.position.left = 0;
                    if (ui.position.left + elWidth > winWidth) {
                        ui.position.left = winWidth - elWidth;
                    }
                }
            }).draggable("disable");

            $tooltip.on('click', function(e) {
                if ($(e.target).closest('.tooltip')[0] !== this) return;
                e.preventDefault();
                
                if ($tooltipText.hasClass('is-locked')) {
                    // UNLOCK
                    $tooltipText.removeClass('is-locked');
                    $tooltipText.draggable("disable");
                    $tooltipText.css({ position: '', top: '', left: '', transform: '', margin: '' });
                } else {
                    // LOCK
                    var rect = $tooltipText[0].getBoundingClientRect();
                    $tooltipText.css({
                        position: 'fixed',
                        top: rect.top + 'px',
                        left: rect.left + 'px',
                        transform: 'none',
                        margin: '0px'
                    });
                    $tooltipText.addClass('is-locked');
                    $tooltipText.draggable("enable");
                }
            });

            $tooltipText.on('click', function(e) { e.stopPropagation(); });
        });

        // click to unlock
        if (!window.tooltipGlobalClickBound) {
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.tooltip.candrag_tooltip').length) {
                    $('.tooltip.candrag_tooltip .tooltiptext.is-locked').each(function() {
                        $(this).removeClass('is-locked')
                               .draggable("disable")
                               .css({ position: '', top: '', left: '', transform: '', margin: '' });
                    });
                }
            });
            window.tooltipGlobalClickBound = true;
        }

        /* GENERIC DRAGGABLE DIVS (.candrag)*/
        var $genericDraggables = $content.find('.candrag');
        
        $genericDraggables.each(function() {
            var $dragMe = $(this);
            if ($dragMe.data('generic-drag-init')) return;
            $dragMe.data('generic-drag-init', true);

            $dragMe.draggable({
                cancel: "a, button, input, textarea, select", 
                stack: ".candrag",
                scroll: false, // Stops endless page stretching I hope
                drag: function(event, ui) {
                    var docWidth = $(document).width();
                    var elWidth = $(this).outerWidth();

                    
                    if (ui.offset.left < 0) {
                        ui.position.left -= ui.offset.left; 
                    }
                    if (ui.offset.left + elWidth > docWidth) {
                        ui.position.left -= ((ui.offset.left + elWidth) - docWidth);
                    }
                }
            });
        });

    });
});
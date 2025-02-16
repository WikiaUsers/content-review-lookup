$(document).ready(function() {
    var previousClick = null;
    var toggleSelectors = '.mw-customtoggle-test1, .mw-customtoggle-test2, .mw-customtoggle-test3, .mw-customtoggle-test4, .mw-customtoggle-test10';
    
    $(toggleSelectors).on('click', function(e) {
        e.preventDefault();
        
        var $this = $(this);
        var targetId = $this.attr('id').replace('mw-customtoggle-', 'mw-customcollapsible-');
        var $target = $('#' + targetId);
        var $allCollapsibles = $('.mw-collapsible');
        
        if (previousClick === targetId && !$target.hasClass('mw-collapsed')) {
            $target.addClass('mw-collapsed');
            previousClick = null;
            return;
        }
        
        $allCollapsibles.addClass('mw-collapsed');
        
        (function($target, targetId) {
            setTimeout(function() {
                $target.removeClass('mw-collapsed');
                previousClick = targetId;
            }, 50); 
        })($target, targetId);
    });
});
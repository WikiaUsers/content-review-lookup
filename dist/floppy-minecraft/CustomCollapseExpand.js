// Custom collapsible handler
mw.hook('wikipage.content').add(function() {
    $('.custom-collapsible-toggle').each(function() {
        var $button = $(this);
        var targetId = $button.data('target');
        var $content = $('#' + targetId);
        var isCollapsed = true;
        
        $button.hover(
            function() {
                $(this).css('background-color', 'rgba(0, 0, 0, 0.2)');
            },
            function() {
                $(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
            }
        );
        
        $button.click(function() {
            if (isCollapsed) {
                $content.slideDown(300);
            } else {
                $content.slideUp(300);
            }
            isCollapsed = !isCollapsed;
        });
    });
});
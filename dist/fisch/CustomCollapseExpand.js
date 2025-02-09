// Custom collapsible handler
mw.hook('wikipage.content').add(function() {
    var isCollapsed = true;
    var content = $('#mw-customcollapsible-linksGuide');
    var button = $('.mw-customtoggle-linksGuide');
    
    // Handle hover effects
    button.hover(
        function() {
            $(this).css('background-color', 'rgba(0, 0, 0, 0.2)');
        },
        function() {
            $(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
        }
    );
    
    // Handle click events
    button.click(function() {
        if (isCollapsed) {
            content.slideDown(300);
        } else {
            content.slideUp(300);
        }
        isCollapsed = !isCollapsed;
    });
});
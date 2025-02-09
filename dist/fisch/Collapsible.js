/* Fishing Rods and all Fish page mutatiin galery */
mw.loader.load('jquery.makeCollapsible');
mw.loader.using('jquery.makeCollapsible', function () {
    $(function () {
        $('.mw-collapsible').makeCollapsible();
    });
});

mw.hook('wikipage.content').add(function () {
    var isCollapsed = false;
    var content = $('#mw-customcollapsible-rodsContent');
    var button = $('.mw-customtoggle-rodsContent');
    
    button.hover(
        function() {
            $(this).css('background-color', 'rgba(0, 0, 0, 0.2)');
        },
        function() {
            $(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
        }
    );
    
    button.click(function() {
        if (isCollapsed) {
            content.slideDown();
            $(this).html('Collapse ▲');
        } else {
            content.slideUp();
            $(this).html('Expand ▼');
        }
        isCollapsed = !isCollapsed;
    });
});
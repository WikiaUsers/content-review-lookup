$(document).ready(function() {
    $('.tabber').on('click', '.tabber__tab', function() {
        var $tabber = $(this).closest('.tabber');
        var tabId = $(this).data('tab-id');
        var tabIndex = $(this).index() + 1;
        
        $tabber.find('.tabber__tab, .tabber__panel').removeClass('tabber__tab--active tabber__panel--active');
        $(this).addClass('tabber__tab--active');
        $tabber.find('#' + tabId + '-panel').addClass('tabber__panel--active');
        
        // Change the body class to switch background
        $('body').removeClass('tab-background-1 tab-background-2 tab-background-3')
                 .addClass('tab-background-' + tabIndex);
    });
});
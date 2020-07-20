$(document).ready(function(){
    var $wiki_nav = $('.wds-community-header__local-navigation'),
        $tab = $wiki_nav.find('.wds-tabs__tab');
    
    /**
     * Navigation - Level 1
     * Adding the "active" class to the hovered tab
     **/
    $tab.on('mouseenter mouseleave', function(event){
        var $_tab = $(event.target);
        if (typeof $.fn.toggleClass !== 'undefined'){
            $_tab.toggleClass('active');
        } else {
            if ($_tab.hasClass('active')){
                $_tab.removeClass('active');
            } else {
                $_tab.addClass('active');
            }
        }
    });
    
    $tab.each(function(){
        var $subnav = $(this).find('.wds-list'),
            $subnav_item
    });
});
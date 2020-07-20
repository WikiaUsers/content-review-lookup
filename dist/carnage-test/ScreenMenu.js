(function($, mw, $menu){
    if (mw.config.get('skin') == 'oasis' || mw.config.get('skin') == 'wikia'){
        $menu.open = function(heading, config){
            if (!document.getElementsByClassName('screen-menu')[0].length){
                var screenHTML =
                    '<section class="screen-menu screen-menu-blackout">' +
                        '<div class="screen-menu-wrapper position-relative">' +
                            '<header class="screen-menu-header">' +
                                '<section class="heading-group">' +
                                    '<h1></h1>' +
                                    '<h2></h2>' +
                                '</section>' +
                                '<nav class="screen-menu-buttons">' +
                                    '<ul>' +
                                        '<li><a href="#" class="options-button"><var class="fa fa-gear"></var></a></li>' +
                                        '<li><a href="#" class="close-button"><var class="fa fa-times"></var></a></li>' +
                                    '</ul>' +
                                '</nav>' +
                            '</header>' +
                            '<article class="screen-menu-content"></article>' +
                            '<footer class="screen-menu-toolbar"></footer>' +
                        '</div>' +
                    '</section>';
                $('.screen-menu').find('header').filter(function(index){
                    return index = 0;
                }).find('h1').text(heading);
                $('.screen-menu').find('article').filter(function(index){
                    return index = 0;
                }).html(config.content);
                $('.WikiaSiteWrapper').append(screenHTML);
            }
        };
    }
})(jQuery, mediawiki, $screen_menu);
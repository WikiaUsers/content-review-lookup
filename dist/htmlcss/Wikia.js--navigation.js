/**
 * This script allows the creation of custom navigation.
 * It will accept images and links.
 * 
 * The script has been created by Ultimate Dark Carnage,
 * and is made specifically for this wiki. You must
 * ask permission before you use it.
 **/

const CustomNavigation = {
    version: '1.0.0 alpha',
    config: {
        msg: {
            loaded: 'CustomNavigation 1.0.0 alpha has been loaded!',
            error: 'CustomNavigation cannot be loaded! Please try again later.'
        },
        col_length: 2
    },
    actions: {
        back: function(){
            $('.custom-nav-tab-wrapper').css('display', 'block').animate({
                'left': '0',
                'opacity': 1
            }, 'fast').promise().done(function(){
                $('.custom-nav-tab-content').empty().removeClass('show');
            });
        },
        advance: function($target){
            var $header = $('<header class="custom-nav-header" />'),
                $content = [$('<a href="#" class="custom-nav-button back-button"/>'), $('<h3 class="custom-nav-heading" />')],
                $tab_content = $('<div class="custom-nav-content" />');
            $content[0].html('<i class="icon ion-arrow-left-a"></i>');
            $content[0].on('click', function(event){
                event.preventDefault();
                event.stopPropagation();
                CustomNavigation.actions.back();
            });
            
            $content[1].text($target.attr('data-title'));
            $header.html($content);
            
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: mw.util.wikiScript('api'),
                data: {
                    page: $target.attr('data-page'),
                    action: 'parse',
                    format: 'json'
                }
            }).done(function(data){
                var _html = data.parse.text['*'];
                $tab_content.html(_html);
            });
            
            $('.custom-nav-tab-content').html([$header, $tab_content]);
            
            $('.custom-nav-tab-wrapper').animate({
                'left': '-650px',
                'opacity': 0
            }, 'slow').promise().done(function(){
                var $elem = $(this);
                $elem.css('display', 'none');
                $('.custom-nav-tab-content').addClass('show');
            });
        }
    },
    init: function(){
        var $navigation = $('<nav class="navigation-wrapper navigation-container" />'),
            $nav_d = $('.navigation-data'),
            html = [$('<section class="custom-nav-tab-content" />'), $('<ul class="custom-nav-tab-wrapper" />')],
            tab_items = [];
        $nav_d.find('.navigation-tab-data').each(function(index){
            tab_items[tab_items.length] = $(this);
        });
        
        var $nav = Array.prototype.map.call(tab_items, function(tab, index){
            var $item = $('<li class="custom-nav-tab tab-item item" />'),
                target = 'string' == typeof tab.attr('data-target') ? tab.attr('data-target') : '',
                title = 'string' == typeof tab.attr('data-title') ? tab.attr('data-title') : '',
                $html = $(tab.html());
            if (tab_items.length % 2 !== 0 && index == tab_items.length - 1){
                $item.addClass('last');
            }
            $item.attr('data-page', target);
            $item.attr('data-title', title);
            $html.addClass('tab-image image').on('click', function(event){
                var $parent = $(event.target).parent('.tab-item');
                CustomNavigation.actions.advance($parent);
            });
            $item.html($html);
            return $item;
        });
        
        html[1].html($nav);
        
        $navigation.html(html);
        $nav_d.replaceWith($navigation);
    }
};

if ($('.navigation-data').length){
    $(document).ready(function(){
        CustomNavigation.init();
        $('.navigation-wrapper').css('height', $('.custom-nav-tab-wrapper').height() + 'px');
    });
}
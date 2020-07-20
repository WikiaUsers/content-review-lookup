/*******************
 * This is the JavaScript page for the custom
 * slideshow created by Ultimate Dark Carnage.
 * 
 * This script is made specifically for the HTML & CSS Wiki.
 * Therefore, you must get permission from [[User:Ultimate Dark Carnage|Ultimate Dark Carnage]] before you can use the script.
 ******************/
 
const CustomSlideshow = {
    config: {
        hasDescription: true
    },
    imageSize: {
        width: 500,
        height: 300
    },
    actions: {
        prev: function(callback){
            var $active_slide = $('.slideshow .slide.active'),
                $slide = $('.slideshow .slide');
            if ($active_slide.index() === 0){
                $active_slide.delay(100).animate({
                    'opacity': 0
                }, 'slow').promise().done(function(){
                    var $current_slide = $(this);
                    $current_slide.removeClass('active');
                    $slide.eq($slide.length - 1).addClass('active').css('opacity', 1);
                    if (typeof callback == 'function')
                        Function.prototype.apply.call(callback, window, [$slide.eq($slide.length - 1)]);
                });
            } else {
                $active_slide.delay(100).animate({
                    'opacity': 0
                }, 'slow').promise().done(function(){
                    var $current_slide = $(this);
                    $current_slide.removeClass('active').prev().addClass('active').css('opacity', 1);
                    if (typeof callback == 'function')
                        Function.prototype.apply.call(callback, window, [$current_slide.prev()]);
                });
            }
        },
        next: function(callback){
            var $active_slide = $('.slideshow .slide.active'),
                $slide = $('.slideshow .slide'),
                last = $slide.length - 1;
            if ($active_slide.index() === last){
                $active_slide.delay(100).animate({
                    'opacity': 0
                }, 'slow').promise().done(function(){
                   var $current_slide = $(this);
                   $current_slide.removeClass('active');
                   $slide.eq(0).addClass('active').css('opacity', 1);
                   if (typeof callback == 'function')
                        Function.prototype.apply.call(callback, window, [$slide.eq(0)]);
                });
            } else {
                $active_slide.delay(100).animate({
                    'opacity': 0
                }, 'slow').promise().done(function(){
                   var $current_slide = $(this);
                   $current_slide.removeClass('active').next().addClass('active').css('opacity', 1);
                   if (typeof callback == 'function')
                        Function.prototype.apply.call(callback, window, [$current_slide.next()]);
                });
            }
        },
        /*
        // This part of the code has been commented out because it has not been finished yet.
        // TODO: Add a description to the slider image
        updateDescription: function($target){
            var has_description = $('.slideshow-wrap .description').length > 0 ? true : false;
            if (has_description === false){
                var $description = $('<div class="description" />');
            }
        }
        */
    },
    init: function(){
        // Loading the required stylesheet
        var $ionicons = $('<link rel="stylesheet" type="text/css" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />');
        $ionicons.on('load', function(event){
            if (event.target.href.indexOf('ionicons') > -1){
                console.log('Ionicons have been loaded!');
            }
        });
        $(document.head).append($ionicons);
        
        // Creating the slider
        var $slider = $('<section class="slideshow-wrap slideshow-wrapper wrap" />'),
            $slider_d = $('div.slideshow-data'),
            slider_buttons = [
                '<nav class="slideshow-buttons slideshow-arrows">',
                '<a href="#" class="slideshow-button prev">',
                '<i class="icon ion-chevron-left" />',
                '</a>',
                '<a href="#" class="slideshow-button next">',
                '<i class="icon ion-chevron-right" />',
                '</a>',
                '</nav>'
            ],
            slider_description = [
                '<div class="slider-description description">',
                '<div class="slider-description-container slider-description-wrapper">',
                '<h3 class="slider-description-header header">',
                '</h3>',
                '<blockquote class="description-content">',
                '</blockquote>',
                '<p class="slider-more-button">',
                '<a class="more-button more-link">See more</a>',
                '</p>',
                '</div>',
                '</div>'
            ],
            slider_html = $('<div class="slideshow-inner" />'),
            $slideshow = $('<ul class="slideshow" />'),
            $slider_buttons = $(slider_buttons.join('')),
            $slider_description = $(slider_description.join('')),
            $slider_description_d = $('.slider-description'),
            slider_items = [];
        $slider_d.find('.slide-data').each(function(index){
            slider_items[slider_items.length] = $(this);
        });
        
        var $slider_items = Array.prototype.map.call(slider_items, function(d, i){
            var $item = $('<li class="slide" id="slide' + i + '" />'),
                title = 'string' == typeof d.attr('data-name') ? d.attr('data-name') : '',
                description = 'string' == typeof d.attr('data-description') ? d.attr('data-description') : '',
                link_name = d.attr('data-link');
                link = 'string' == typeof d.attr('data-link') ? '/index.php?title=' + encodeURIComponent(d.attr('data-link')) : '#';
            $item.attr('data-title', title);
            $item.attr('data-description', description);
            $item.attr('data-link', link);
            if (i === 0){
                $item.addClass('active');
                $slider_description.find('.slider-description-header').text(d.attr('data-name'));
                $slider_description.find('.description-content').text(d.attr('data-description'));
                $slider_description.find('.more-link').attr('href', link);
            }
            $item.html($(d.html()).addClass('image').attr('alt', d.attr('data-name')).css({ 'width': CustomSlideshow.imageSize.width, 'height': CustomSlideshow.imageSize.height}));
            return $item;
        });

        $slideshow.html($slider_items);
        slider_html.html($slideshow);
        $slider_buttons.find('> .slideshow-button').on('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            if ($(event.target).hasClass('prev')) CustomSlideshow.actions.prev(function($active_slide){
                var title = 'string' == typeof $active_slide.attr('data-title') ? $active_slide.attr('data-title') : '',
                    description = 'string' == typeof $active_slide.attr('data-description') ? $active_slide.attr('data-description') : '',
                    link = 'string' == typeof $active_slide.attr('data-link') ? '/index.php?title=' + encodeURIComponent($active_slide.attr('data-title')) : '#';
                    
                $('.slider-description').find('.slider-description-header').text(title);
                $('.slider-description').find('.description-content').text(description);
                $('.slider-description').find('.more-link').attr('href', link);
            });
            else if ($(event.target).hasClass('next')) CustomSlideshow.actions.next(function($active_slide){
                var title = 'string' == typeof $active_slide.attr('data-title') ? $active_slide.attr('data-title') : '',
                    description = 'string' == typeof $active_slide.attr('data-description') ? $active_slide.attr('data-description') : '',
                    link = 'string' == typeof $active_slide.attr('data-link') ? '/index.php?title=' + encodeURIComponent($active_slide.attr('data-title')) : '#';
                    
                $('.slider-description').find('.slider-description-header').text(title);
                $('.slider-description').find('.description-content').text(description);
                $('.slider-description').find('.more-link').attr('href', link);
            });
        });
        
        $slider_d.replaceWith($slider.html([$slider_buttons, $slider_description, slider_html]));
    }
};

if ($('div.slideshow-data').length){
    $(document).ready(function(){
        CustomSlideshow.init();
        $('.slider-description').find('h3.header').on('click', function(event){
            var $parent = $('.slider-description');
            $parent.toggleClass('full');
        });
    });
}
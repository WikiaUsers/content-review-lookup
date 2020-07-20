$(document).ready(function(){
    'use strict';
    var $mdata = $('.mw-content').find('div.mpdata');
    $mdata.each(function(index){
        var type = $(this).attr('data-type'),
            title = $(this).find('> h2:first'),
            $mpHTML = $('<section class="mp-box main-page-box box" id="mp-box-' + index + '"/>');
        switch (type){
            case 'slider':
                var $sliderItems = [],
                    $items = $(this).find('> span.mpsliderimg');
                $mpHTML.html('<ul class="mp-slider slider" />');
                $items.each(function(i){
                    var $item = $('<li><figure><img /><figcaption /></figure></li>').addClass('mp-slider-item');
                    $item.find('> figure').addClass('mp-slider-image slider-image').find('> img').addClass('mp-slider-img image');
                    $sliderItems[$sliderItems.length] = $item;
                });
                $mpHTML.find('> ul').html($sliderItems);
                break;
        }
        $mdata.replaceWith($mpHTML);
    });
});
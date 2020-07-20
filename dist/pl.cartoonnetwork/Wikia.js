// Szablon do zmiany tła
$(function() {
    if($('#dostosujTlo').length > 0) {
        var cl = $($('#dostosujTlo').get(0)).data('bg');
        if(cl) {
            cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
            $(document.body).addClass('tlo-' + cl);
        }
    }
});

// Zmiana tła zależnie od pory dnia
$(function() {
    function isDefaultBG() {
        var bg = $(document.body).css('background-image');
        return bg == 'none' || bg.indexOf('/skins/oasis/css/') > -1 || bg.indexOf('Wiki-background') > -1;
    }
    if(isDefaultBG()) {
        var cl = ([
            'BG7', // 0
            'BG5', // 1
            'BG5', // 2
            'BG5', // 3
            'BG5', // 4
            'BG5', // 5
            'BG5', // 6
            'BG8', // 7
            'BG8', // 8
            'BG8', // 9
            'BG8', // 10
            'BG3', // 11
            'BG3', // 12
            'BG1', // 13
            'BG1', // 14
            'BG1', // 15
            'BG1', // 16
            'BG6', // 17
            'BG6', // 18
            'BG6', // 19
            'BG2', // 20
            'BG2', // 21
            'BG2', // 22
            'BG4'  // 23
        ])[new Date().getHours()];
        $(document.body).addClass(cl);
    }
});

// Import skryptów
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js'
    ]
});

// Ustawienia AjaxRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Special:WikiActivity","Specjalna:Aktywność_na_wiki"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';

// Inne
$('#WikiaPageBackground').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"><div>');


// Slider
// Autor: Pecoes & Vuh
// Modyfikacje: Nanaki
// Licencja: CC-BY-NC-SA
//           http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl
 
// Oryginał: http://pl.elderscrolls.wikia.com/wiki/MediaWiki:Slider.js
// Lekko zmodyfikowana wersja skryptu pozwalająca działać z galerią
 
if (mediaWiki.config.get('wgAction') === 'view')  (function () {
    'use strict'; 
    function createSlider () {
        /*jshint validthis:true*/
        var scrollPane = $(this),
            scrollPaneWidth = scrollPane.width(),
            scrollContent = scrollPane.find('.scroll-content'),
            scrollContentWidth = 0;
 
        var elems = scrollContent.find('.wikia-gallery-item')
        if (!elems.length) elems = scrollContent.find('img');
 
        elems.each(function () {
            var $this = $(this),
                width = $this.outerWidth();
            if (width) {
                scrollContentWidth += width;
            } else {
                $this.on('load', function () {
                    scrollContentWidth += $this.outerWidth();
                });
            }
        });
 
        var scrollbar = scrollPane.find('.scroll-bar').slider({
            slide: function(event, ui) {
                if (scrollContentWidth > scrollPaneWidth) {
                    scrollContent.css('margin-left', Math.round(
                        ui.value / 100 * (scrollPaneWidth - scrollContentWidth)
                    ) + 'px');
                } else {
                    scrollContent.css('margin-left', 0);
                }
            }
        });
 
        scrollPane.css( "overflow", "hidden" );
 
        scrollbar.find('.ui-slider-handle').css({
            width: '60px',
            marginLeft: '-30px'
        });
    }
 
    $(function () {
        var imgSlider = $('.img-slider');
        if (!imgSlider.length) return;
 
        $('head')
        .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" /><style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #333; box-shadow: 0 0 4px #333; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: white; border: none; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 white; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider * { margin: 0; padding: 0; } .img-slider figure { display: inline-block; }</style>');
 
        imgSlider
        .wrap('<div class="scroll-pane"></div>')
        .addClass('scroll-content')
        .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');
 
        mediaWiki.loader.using('jquery.ui.slider', function () {
            $('.scroll-pane').each(createSlider);
        });
    });
}());

/* Falling snow effect for the Christmas skin, courtesy of Community Central */
importScriptPage('MediaWiki:Snow.js','c');
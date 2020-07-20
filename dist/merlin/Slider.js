// __NOWYSIWYG__ <source lang="javascript">

/*jshint jquery:true, browser:true, curly:false*/
/*global mediaWiki:true*/

if (mediaWiki.config.get('wgAction') === 'view')  (function () {
  
    'use strict';
    
    function createSlider () {
        /*jshint validthis:true*/
        var scrollPane = $(this),
            scrollPaneWidth = scrollPane.width(),
            scrollContent = scrollPane.find('.scroll-content'),
            scrollContentWidth = 0;
            
        scrollContent.find('img').each(function () {
            var $this = $(this),
                width = $this.width();
            if (width) {
                scrollContentWidth += width;
            } else {
                $this.on('load', function () {
                    scrollContentWidth += $this.width();
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
        .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" /><style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #333652; box-shadow: 0 0 4px #333652; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: url("https://images.wikia.nocookie.net/merlin1/images/4/44/Toolbar_snowflakes.png"); border: none; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 black; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider * { margin: 0; padding: 0; } .img-slider figure { display: inline-block; }</style>');
        
        imgSlider
        .wrap('<div class="scroll-pane"></div>')
        .addClass('scroll-content')
        .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');
        
        mediaWiki.loader.using('jquery.ui.slider', function () {
            $('.scroll-pane').each(createSlider);
        });
    });
}());
//</source>
//THIS CODE FOR THE - GameSlider - SCRIPT WILL BE STORED ON THIS PAGE SHOULD ANYTHING HAPPEN TO THE ORIGINAL PAGE ON dev.wikia/com/GameSlider - ALL RIGHTS BELONG TO THE ORIGINAL AUTHORS "Luqgreg"/"Vuh"/"Tierre"

//<nowiki>
/** GameSlider by Luqgreg **/
/* Scripts used and modifed under CC-BY-SA license: 
 - "Slider.js" by Pecoes & Vuh (https://pl.elderscrolls.wikia.com/wiki/MediaWiki:Slider.js) 
 - "sliders using jquery" by Tierre (https://dragonage.wikia.com/wiki/MediaWiki:Common.js) */
 
// Slider
if (mediaWiki.config.get('wgAction') === 'view')  (function () {
 
    'use strict';
 
    var data_template;
 
    function createSlider () {
        /*jshint validthis:true*/
        var scrollPane = $(this),
            scrollPaneWidth = scrollPane.width(),
            scrollContent = scrollPane.find('.scroll-content'),
            scrollContentWidth = 0,
            data_startPos = defaultValue(scrollContent.data("startpos"), 0);
            data_template = defaultValue(scrollContent.data("template"), "GameSlider/Content");
 
 
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
            var img_link = $this.parent();
            var param = img_link.attr("href").substr(1);
            img_link.attr("href", "javascript:void(0)");
            img_link.click(function() { 
                createContent(param); 
                $(".content-active").removeClass("content-active"); 
                $(this).addClass("content-active"); 
            });
        });
 
        var scrollbar = scrollPane.find('.scroll-bar').slider({
            value: data_startPos,
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
 
        scrollPane.css("overflow", "hidden");
        if (scrollContentWidth > scrollPaneWidth) {
            scrollContent.css('margin-left', Math.round(
                data_startPos / 100 * (scrollPaneWidth - scrollContentWidth)
            ) + 'px');
        } else {
            scrollContent.css('margin-left', 0);
        }
        scrollbar.find('.ui-slider-handle').css({
            width: '60px',
            marginLeft: '-30px'
        });
    }
 
    function createContent (game) {
        var gameSlider = $('.game-slider'),
            gameContent = $('.game-content'),
            gameContentMain = $('.game-content-main'),
            gameContentLoader = $('.loader');
 
        if (gameContent.length) {
            gameContent.animate({
                opacity: 0,
            }, 150);
        } else {
            gameSlider.after('<div class="game-content-main" style="height: 0; position: relative"><div class="loader" style="opacity: 0"/><div class="game-content"></div></div>');
 
            gameContentMain = $('.game-content-main');
            gameContent = $('.game-content');
            gameContentLoader = $('.loader');
            var targetHeight = gameContent.outerHeight();
 
            gameContentMain.animate({
                height: targetHeight
            }, 100);
        }
 
        if (gameContentLoader.length) {
            gameContentLoader.animate({
                opacity: 1,
            }, 250);
        }
 
        var api = new mw.Api();
        api.get({
            action: 'parse',
            format: 'json',
            text: '{{' + data_template + '|' + game + '}}'
        }).done(function(data) {
            if(!data.error) {
                var code = data.parse.text['*'];
 
                if (gameContentLoader.length) {
                    gameContentLoader.animate({
                        opacity: 0,
                    }, 100);
                }
 
                gameContent.html(code);
                createContentSlider();
                gameContent.animate({
                    opacity: 1,
                }, 150);
            }
        });
    }
 
    $(function () {
        var gameSlider = $('.game-slider');
        if (!gameSlider.length) return;
 
        $('head').append('<link rel="stylesheet" href="https://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />');
        importArticle({
            type: "style",
            article: "u:dev:MediaWiki:GameSlider/code.css"
        });
 
        gameSlider
        .wrap('<div class="scroll-pane"></div>')
        .addClass('scroll-content')
        .before('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');
 
        mediaWiki.loader.using('jquery.ui.slider', function () {
            $('.scroll-pane').each(createSlider);
        });
    });
}());
 
function createContentSlider() {
    mw.loader.using(['jquery.cookie']);
    mw.loader.using(['jquery.ui.tabs'], function() {
        $("[class^=portal_vtab]").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100}});
        $("[class*=portal_sliderlink-]").click(function() {
            $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
            return false;
        });
 
        $(".game-content .ui-corner-all").removeClass("ui-corner-all");
        $(".game-content .ui-corner-left").removeClass("ui-corner-left");
        $(".game-content .ui-corner-right").removeClass("ui-corner-right");
        $(".game-content .ui-corner-top").removeClass("ui-corner-top");
        $(".game-content .ui-corner-bottom").removeClass("ui-corner-bottom");
        $(".game-content .ui-widget-content").removeClass("ui-widget-content");
    });
}
 
function defaultValue(variable, defaultVal) {
    if(variable !== undefined && variable !== null) return variable;
    return defaultVal;
}
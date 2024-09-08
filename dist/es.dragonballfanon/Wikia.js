//Etiqueta para usuarios inactivos por más de 1 mes
InactiveUsers = { 
    months: 1,
    text: 'Descansando'
};

// Slider Gallery

if (mediaWiki.config.get('wgAction') === 'view')(function() {

  'use strict';

  function createSlider() {
    var scrollPane = $(this),
      scrollPaneWidth = scrollPane.width(),
      scrollContent = scrollPane.find('.scroll-content'),
      scrollContentWidth = 0;

    var elems = scrollContent.find('.wikia-gallery-item')
    if (!elems.length) elems = scrollContent.find('img');

    elems.each(function() {
      var $this = $(this),
        width = $this.outerWidth();
      if (width) {
        scrollContentWidth += width;
      } else {
        $this.on('load', function() {
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

    scrollPane.css("overflow", "hidden");

    scrollbar.find('.ui-slider-handle').css({
      width: '60px',
      marginLeft: '-30px'
    });
  }

  $(function() {
    var imgSlider = $('.img-slider');
    if (!imgSlider.length) return;

    $('head')
      .append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" /><style type="text/css"> .ui-widget-header { background: transparent; border: none; } .scroll-bar-wrap{ width: 500px; margin: 0 auto; padding: 4px; background: transparent; border: none; } .ui-slider { border: 1px solid #333; box-shadow: 0 0 4px #333; background: transparent; } .scroll-bar-wrap .ui-slider-handle {background: white; border: none; } .scroll-bar-wrap .ui-slider-handle:hover { background: none repeat scroll 0 0 white; } .img-slider { overflow: hidden; white-space: nowrap; width: auto; } .img-slider * { margin: 0; padding: 0; } .img-slider figure { display: inline-block; }</style>');

    imgSlider
      .wrap('<div class="scroll-pane"></div>')
      .addClass('scroll-content')
      .after('<div class="scroll-bar-wrap ui-widget-content"><div class="scroll-bar"></div></div>');

    mediaWiki.loader.using('jquery.ui.slider', function() {
      $('.scroll-pane').each(createSlider);
    });
  });
}());

// Slider - Portada de administración

$(document).ready(function() {
  $("#portada-administracion").each(function() {
    var This = $(this);
    var Nums = This.find(".seccion").size();
    This.find(".seccion:first").addClass("SeccionAct");
    This.append("<div class='control'></div>");
    This.find(".seccion").not(".SeccionAct")
      .css("left", "100%")
    for (i = 0; i < Nums; i++) {
      This.find(".control").append("<span></span>");
    }
    This.find(".control span:eq(0)").addClass("ContActive");

    This.find(".control span").click(Reviews);

    function Reviews() {
      var loc = $(this).index();
      var ActivLoc = This.find(".ContActive").index();

      $(this).addClass("ContActive")
        .siblings().removeAttr("class");

      if (loc > ActivLoc) {
        var Dire = '100%'
        var IDire = '-100%'
      }
      if (loc < ActivLoc) {
        var Dire = '-100%'
        var IDire = '100%'
      }

      This.find(".seccion").not(".SeccionAct")
        .css("left", Dire);
      This.find(".seccion:eq(" + loc + ")")
        .animate({
          'left': '0'
        }, speed)
        .addClass("SeccionAct")
        .siblings(".SeccionAct")
        .removeClass("SeccionAct")
        .animate({
          'left': IDire
        }, speed);
    }
  });
});

speed = 600 // Velocidad

//WikiActivity
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
    ]
});
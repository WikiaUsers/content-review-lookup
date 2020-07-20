// Import Script
importArticles({
  type: 'script',
  articles: [
    'MediaWiki:FloatingToc.js',
    'MediaWiki:Wikia.js/displayTimer.js'
  ]
});

// Ajax RC
window.AjaxRCRefreshText = 'Actividad automatizada';
window.AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
window.ajaxPages = [
  "Especial:CambiosRecientes",
  "Especial:WikiActivity",
  "Especial:PáginasNuevas",
  "Especial:Seguimiento"
];

// Discord Chat
$('.discord').append('<iframe src="https://discordapp.com/widget?id=718614626669035674&theme=dark" width="300" height="500" allowtransparency="true" frameborder="0"></iframe>');

$(function() {
  $('.WikiHeader > nav li:first-child > .subnav-2 > li:last-child').after('<li><a href="http://es.dragonballfanon.wikia.com/wiki/Dragon_Ball_Fanon_Wiki:Discord" class="subnav-2a">Discord</a></li>');
});

//Etiqueta para usuarios inactivos por más de 1 mes
InactiveUsers = { 
    months: 1,
    text: 'Descansando'
};
importScriptPage('InactiveUsers/code.js', 'dev');

// Actualizar página
PurgeButtonText = 'Actualizar';

// Iconos - Tomado de Dragon Ball Universe Wiki

$(document).ready(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#iconos'));
		$('#iconos').css({'position' : 'absolute', 'right' : '-15px', 'bottom' : '17px', 'display' : 'flex'});
	}
});

// Tooltips Icons
$("#iconos a").tooltip();

// Mostrar div del creador del artículo (Agradecimiento: Ben10 Fanon)
$(function() {
  if ($("body").hasClass("ns-0")) {
    if (mw.config.get('wgIsMainPage')) {
      return;
    }
    $.ajax({
      'dataType': 'xml',
      'url': '/api.php?action=query&prop=revisions&titles=' + wgPageName + '&rvprop=user&rvlimit=1&rvdir=newer&format=xml',
      success: function(xml) {
        $(xml).find('page').each(function() {
          var $entrada = $(this);
          var usuario = $entrada.find('rev').attr('user');

          if (usuario !== undefined) {
            $(".WikiaPageHeader").addClass("cargado");
            $(".WikiaPageHeader h1").after("<h2 class='divcreadorarticulo'>Autor: <a id='creador-userlink' class='creadordelarticulo' href='/wiki/Usuario:" + usuario + "'><span itemprop='author' itemscope itemtype='http://schema.org/Person'>" + usuario + "</span></a> (<a id='creador-murolink' href='/wiki/Muro:" + usuario + "'>muro</a> | <a id='creador-contriblink' href='/wiki/Especial:Contribuciones/" + usuario + "'>contribuciones</a> | <a id='creador-registrolink' href='/wiki/Especial:Registro?user=" + usuario + "'>registro</a></span>)</h2>");
            $('<style type="text/css">.SpeechBubble[data-user="' + usuario + '"] .edited-by:after { color: #FFF; position: absolute; top: 58px; left: -78px; content: "@Autor"; font-weight: bold; background: #333; padding: 2px 9.5px; border-radius: 3px; z-index: 20; } .SpeechBubble[data-user="' + usuario + '"] blockquote { background:#333 !important; } .SpeechBubble[data-user="' + usuario + '"] .speech-bubble-message:after { border-color:transparent #333 transparent transparent; }</style>').appendTo('head');
          }
        });
      }
    });
  }
});

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
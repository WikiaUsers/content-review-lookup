AjaxRCRefreshText = 'Actualizar automáticamente';
AjaxRCRefreshHoverText = 'Actualizar los datos de esta página automáticamente';
window.ajaxIndicator = 'https://images.wikia.nocookie.net/universosteven/es/images/d/dd/Res-ajax_loader.svg';
ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity", "Especial:Registro"];

(function(window, $, mw) {
  'use strict';
  var $rail = $('#WikiaRail');
  function mediaTags($content) {
    $content.find('.html5-audio').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        options = esc($this.attr('data-options') || ''),
        src = esc($this.attr('data-src') || ''),
        type = esc($this.attr('data-type') || '');
      $this.html('<audio ' + options + '><source src="' + src + '" type="' + type + '"></audio>');
    });
    $content.find('.html5-video').each(function() {
      var esc = mw.html.escape,
        $this = $(this),
        width = esc($this.attr('data-width') || ''),
        height = esc($this.attr('data-height') || ''),
        options = esc($this.attr('data-options') || ''),
        src = esc($this.attr('data-src') || ''),
        type = esc($this.attr('data-type') || '');
      $this.html(
        '<video width="' +
          width +
          '" height="' +
          height +
          '" ' +
          options +
          '><source src="' +
          src +
          '" type="' +
          type +
          '"></video>'
      );
    });
  }
  mw.hook('wikipage.content').add(mediaTags);
  if ($rail.hasClass('loaded')) {
    mediaTags($rail);
  } else if ($rail.exists()) {
    $rail.on('afterLoad.rail', $.proxy(mediaTags, null, $rail));
  }
})(window, jQuery, mediaWiki);

$('.norc').bind('contextmenu', function(e) {
    return false;
});

 if ( $("body").hasClass("editor") ) {
    $(document).keydown(function(event) {
        if((event.ctrlKey || event.metaKey) && event.which == 83) {
            $('#wpSave').click();
            event.preventDefault();
            return false;
        }
    });
}

/** Prevent users from creating empty blog posts by clicking enter on post title modal **/
$(function() {
    $('[name="wpTitle"], #blogPostTitle').keydown(function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            if($("#ok")) {
                $("#ok").click();
            }
        }
    });
});

$(function() {
    mw.hook('Discord.widget.rail').add(function(el) {
        if ($('.chat-module').length) {
            $(el).insertAfter('.chat-module');
        } else if ($('.activity-module').length) {
            $(el).insertAfter('.activity-module');
        }
    });
});

/** Load CssVars.js on IE **/
if (/Trident|MSIE/.test(navigator.userAgent)) {
    $.ajax({
        cache: true,
        dataType: "script",
        url: '/es/load.php?mode=articles&only=scripts&articles=MediaWiki:CssVars.js'
    }).done(function() {
        cssVars({
            include: 'style,link[href*="/load.php"]',
            onlyLegacy    : true,
            watch         : true
        });        
    });    
}

window.AddRailModule = [
    {
        page: 'MediaWiki:Custom-NewUsersPromoteModule',
        prepend: true,
        maxAge: 86400
    },
];
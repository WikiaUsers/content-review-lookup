
(function ($) {
  $(function() {

    $('.nav dt, .links > dt').bind('click', function() {
      var _this = $(this);
      _this.siblings('.next + dd, .prev + dd').slideDown();
      _this.nextUntil('dt:not(.next, .prev)', 'dd').slideDown().children('ul').children('li').each(function(index) {
        var delay = index * 50;
        $(this).delay(delay).animate({opacity:1});
      });
    }).css({cursor:'pointer'}).siblings('dd').hide().find('li').css({opacity:0});

    $('.sidebar-title').bind('click', function() {
      var sidebar = $(this).parent();
      sidebar.children('*:not(.sidebar-title):not(.sidebar-title + .thumb)').slideUp('slow', function() {
        sidebar.find('.sidebar-title + .thumb .thumbcaption').sideDown();
      });
    }).css({cursor:'pointer'});

    $('.sidebar-division').each(function() {
      var divisionHeader = $(this).children('.division-header');
      var expandabilityIndicator = '<span class="expandability-indicator">&hellip;</span>';

      var divisionLabel = divisionHeader.html();
      var cookieName = divisionLabel.toLowerCase().replace(/(<([^>]+)>)/ig,"");

      $(divisionHeader).append(expandabilityIndicator);

      if($.cookie('sidebar-division-state-' + cookieName) == 'expended') {
        $(this).find('.expandability-indicator').hide();
      } else {
        $(this).addClass('collapsed').children('.division-header').siblings().hide();
      }
    });

    $('.division-header').css({cursor:'pointer'}).click(function() {
      var wrapper = $(this).parent();

      if(wrapper.hasClass('collapsed')) {

        var divisionLabel = $(this).children('strong').html();
        var cookieName = divisionLabel.toLowerCase().replace(/(<([^>]+)>)/ig,"");

        $(this).siblings().slideDown('slow');
        $(this).find('.expandability-indicator').fadeOut();
        wrapper.removeClass('collapsed');
        $.cookie('sidebar-division-state-' + cookieName, 'expended');

      } else {


        var divisionLabel = $(this).children('strong').html();
        var cookieName = divisionLabel.toLowerCase().replace(/(<([^>]+)>)/ig,"")

        $(this).siblings().slideUp('slow', function() {
          wrapper.addClass('collapsed');
        });
        $(this).find('.expandability-indicator').fadeIn();
        $.cookie('sidebar-division-state-' + cookieName, 'collapsed');
      }
    });
    $('.details > .summary').each(function() {
      var $summary = $(this);
      var $details = $summary.parent();
      var $button = $('<a />').html('anzeigen');
      $summary.append(" [").append($button).append(']');
      $summary.bind('click', function() {
      $details.toggleClass('open');
      if($details.hasClass('open')) {
          $button.html('verbergen');
        } else {
          $button.html('anzeigen');
        }
      });
    });
  });
})(jQuery);


/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : cookie_encode(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

function cookie_encode(string){
  //full uri decode not only to encode ",; =" but to save uicode charaters
  var decoded = encodeURIComponent(string);
  //encod back common and allowed charaters {}:"#[] to save space and make the cookies more human readable
  var ns = decoded.replace(/(%7B|%7D|%3A|%22|%23|%5B|%5D)/g,function(charater){return decodeURIComponent(charater);});
  return ns;
}


(function ($) {
  $(function() {

var fullImage = $('#file > a');
var regionBrowser = $('<div />', {
  id: 'region-browser'
});

fullImage.after(regionBrowser);

fullImage.css({
  display: 'inline-block',
  position: 'relative'
}).children('img').css({
  verticalAlign: 'bottom'
});

$('.region-info').each(function() {
  var that = $(this);
  var src = $('.fullMedia > a').attr('href');
  var c = that.attr('title').split(' ');
  var thumbHeight = 100;


  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('preserveAspectRatio', 'none');

  var ratio = thumbHeight / c[3];


  svg.setAttribute('viewBox', (c[0] - (c[2] / 2)) + ' ' + (c[1] - (c[3] / 2)) + ' ' + c[2] + ' ' + c[3]);
  svg.setAttribute('height', thumbHeight);
  svg.setAttribute('width', c[2] * ratio);
  svg.setAttribute('style', 'margin: 1em 1em 0 0');

  image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttribute('width', 100);
  image.setAttribute('height', 100);
  image.setAttribute('preserveAspectRatio', 'none');
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', src);

  var marker = $('<span />').css({
    border: '1px solid white',
    position: 'absolute',
    display: 'none',
    left: c[0] + '%',
    top: c[1] + '%',
    width: c[2] + '%',
    height: c[3] + '%',
    marginLeft: ((c[2]/2)*-1) + '%',
    marginTop: ((c[3]/2)*-1) + '%'
  });

  marker.appendTo(fullImage);
  $(image).appendTo(svg);
  $(svg).appendTo(regionBrowser).hover(function() {
    marker.fadeIn();
  }, function() {
    marker.fadeOut();
  });
});


  });
})(jQuery);
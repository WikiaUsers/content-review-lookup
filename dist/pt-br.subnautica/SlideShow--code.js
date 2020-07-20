// This is archival, will more than likely get in-lined in Common.js
// See MediaWiki:SlideShow for SlideShow extension details 

/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/

function wwSlideShow(shows) {
  var wwtimer;
  var wwplaying;

  function change(show, index) {
    var slides = show.find('.ww-sshowslide');
    slides.stop(true, true);

    var effect = show.data('wweffect');
    if (effect == 'slide' && $.effects && $.effects['slide']) { // slide
      slides.eq(index).siblings().hide('slide', { direction: 'left' }, 1500);
      slides.eq(index).show('slide', { direction: 'right' }, 1500);
    } else {                 // fade
      slides.fadeOut('normal');
      slides.eq(index).fadeIn(1500);
    }

    show[0].wwlastSlide = index;
  }

  function rotates() {
    var show = $(this);
    if (show[0].wwstop) return;
    var slides = show.find('.ww-sshowslide');
    if (slides.length <= 1) return;

    var index = (show[0].wwindex || 0) + 1;
    if (index > (slides.length - 1)) index = 0;
    if (show[0].wwlastSlide == index) return;

    change(show, index);
    show[0].wwindex = index;
  }
  function rotate() {
    shows.each(rotates);
  }

  function play(show) {
    var slides = show.find('.ww-sshowslide');
    if (slides.length <= 1) return;
    if (!wwplaying) {
      wwplaying = true;
      wwtimer = window.setInterval(rotate, 5000);   // one timer for all shows for now
    }
  }

  function pause(show) {
    var slides = show.find('.ww-sshowslide');
    if (slides.length <= 1) return;
    window.clearInterval(wwtimer);
    wwplaying = false;
  }

  shows.each(function () {
    var show = $(this);
    show.hover(function () { pause($(this)); }, function () { play($(this)); });
    show.click(function () { var show = $(this); pause(show); show[0].wwstop = true; });
    play(show);
  });
}

function wwSlideShowInit() {
  var shows = $(".ww-sshow");
  if (shows.length == 0) return;
  wwSlideShow(shows);
}

$(function () {
  wwSlideShowInit();
});

// below needed only when need to load modules through loader, end-to-end is more expensive for client
//(function (mw, $, window) {
//  $(function () {
//    if ($(".ww-sshow").length > 0) {
//      mw.loader.using(['jquery.ui.core'], function () {  // loading effects separately, not rely on ui-core
//      //mw.loader.using(['jquery.ui.core','jquery.effects.core','jquery.effects.slide'], function () {
//        wwSlideShow($(".ww-sshow"));
//      });
//    }
//  });
//}(mediaWiki, jQuery, window));
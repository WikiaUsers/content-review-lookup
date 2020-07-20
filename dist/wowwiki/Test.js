/* simple test bed - separate as allows to be used with debug=true, so not minified in browser */

// auto-zebra stripe for tables
/*
function zebraStripe2() {
  if ($("table.zebra > tbody > tr").eq(1).css("background-color") == "transparent" && $("table.zebra > tbody > tr").eq(2).css("background-color") == "transparent") {
    $("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color", "#2c2c2c");
    $(".sortheader").bind("click", function () {
      $("table.zebra > tbody > tr").not(".nozebra").css("background-color", "transparent");
      $("table.zebra > tbody > tr:nth-child(2n+1)").not(".nozebra").css("background-color", "#2c2c2c");
    });
  }
}
*/

// ScribbleMap - see Template:ScribbleMap
/*
function wwScribbleMaps2() {
  $("#WikiaArticle div.wwSM").each(function () {
    var mapID = $(this).attr("class").replace("wwSM map-", ""),
      width = $(this).width(), height = $(this).height();
    if (mapID.length > 20) mapID = "";
    if (width <= 0) width = 550;
    if (height <= 0) height = Math.floor(width / 11 * 8);
    $(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id=' + mapID + '&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id=' + mapID + '&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="' + width + '" height="' + height + '" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
  });
}
*/



function wwSlideShow2() {
  var shows = $(".ww-sshow");
  if (shows.length == 0) return;

  var timer;
  var playing;

  function fade(show, index) {
    var slides = show.find('.ww-sshowslide');
    slides.stop(true, true).fadeOut('normal');
    slides.eq(index).fadeIn(1500);

    show[0].lastSlide = index;
  }

  function rotates() {
    var show = $(this);
    if (show[0].stop) return;
    var slides = show.find('.ww-sshowslide');
    if (slides.length <= 1) return;

    var index = (show[0].index || 0) + 1;
    if (index > (slides.length - 1)) index = 0;
    if (show[0].lastSlide == index) return;

    fade(show, index);
    show[0].index = index;
  }
  function rotate() {
    shows.each( rotates );
  }

  function play(show) {
    var slides = show.find('.ww-sshowslide');
    if (slides.length <= 1) return;
    if (!playing) {
      playing = true;
      timer = window.setInterval(rotate, 5000);   // one timer for all shows for now
    }
  }

  function pause(show) {
    var slides = show.find('.ww-sshowslide');
    if (slides.length <= 1) return;
    window.clearInterval(timer);
    playing = false;
  }

  shows.each( function () {
    var show = $(this);
    show.hover( function () { pause($(this)); }, function () { play($(this)); } );
    show.click( function () { var show = $(this); pause(show); show[0].stop = true; } );
    play(show);
  });
}

$(function () {
  //zebraStripe2();
  //wwScribbleMaps2();
  wwSlideShow2();
});
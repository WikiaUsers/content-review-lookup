var horn = $("audio")[0];
var buttonWrapper = $(".buttonWrapper");

buttonWrapper.mousedown(function() {
  horn.currentTime = 0;
  horn.play();
});
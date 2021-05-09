$(document).ready(function() {
  var btn = $(".buttonMusic");
  btn.click(function() {
    btn.toggleClass("paused");
    return false;
  });
});
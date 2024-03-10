/* Any JavaScript here will be loaded for all users on every page load. */
// for hover gifs
$(".hover-gif img").each(function(i, obj) {
  var $canvas = $("<canvas width='" + $(obj).attr("width") + "' height='" + $(obj).attr("height") + "'></canvas>");
  $(obj).parent().append($canvas);
  var ctx = $canvas[0].getContext("2d");
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };
  img.src = obj.src;
});
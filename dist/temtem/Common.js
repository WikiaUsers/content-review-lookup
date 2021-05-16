/* Any JavaScript here will be loaded for all users on desktop on every page load. */

/* Used by [[Template:Hover gif]] */
$(".hover-gif img").each(function(i, obj) {
  obj.onload = function() {
    var $canvas = $("<canvas width='" + $(obj).attr("width") + "' height='" + $(obj).attr("height") + "'></canvas>");
    $(obj).parent().append($canvas);
    var ctx = $canvas[0].getContext("2d");
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.src = obj.src;
  };
});
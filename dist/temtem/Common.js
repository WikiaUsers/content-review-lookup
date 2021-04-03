/* Any JavaScript here will be loaded for all users on desktop on every page load. */

( function() {
    "use strict";
    
    /* Keep variables in one namespace to prevent from creating new variable that may interfere with the global space */
    var ttw = window.ttw = {};
    
    /* Fired whenever wiki content is added. (#mw-content-text, live preview, load page, etc.) */
    mw.hook( "wikipage.content" ).add( function( $wikipageContent ) {

        /* Insert code */
            
    })
    /* End wiki content hook */    

    /* Fires when DOM is ready */
    $( function() {
        
    });
    /* End of DOM */
    
}());

/* Used by [[Template:Hover gif]] */
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
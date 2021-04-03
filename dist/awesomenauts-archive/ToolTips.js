$(document).ready(function() {
 
   /***** Tool Tips *****/
    $(".tooltip-object").hover(ttEnter, ttLeave);
 
    function ttEnter() {
        $(this).mousemove(ttMouseMove);
 
        $(this).children(".tooltip").show();
    }
 
    function ttLeave() {
        $(this).children(".tooltip").hide();
    }
 
    function ttMouseMove(e) {
       /* $(this).children(".tooltip").css("left", e.offsetX + 4);
        $(this).children(".tooltip").css("top", e.offsetY + 4);*/
    }
 
 });
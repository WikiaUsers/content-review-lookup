/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @license: CC-BY-SA 3.0
* @description: Replaces the infobox image with a 3D model viewer for every page added to [[Category:3D ротация]]. Requires an image named {{PAGENAME}}_3D.png.
*/
$(document).ready(function() {
    if(wgCategories.indexOf("3D ротация") > -1) {
        $("div.rotatebox").first().replaceWith("<div id=\"object-rotator\" onselectstart=\"return false\" onmousedown=\"return false\"><img src=\"https://elderscrolls.fandom.com/ru/wiki/Special:FilePath/3D_ротация.png?width=214px\" style=\"position: absolute; bottom: 0; left: 0; opacity: 0.1; z-index:-1\" /></div>");
        $("#object-rotator").css("background-image", "url(\"https://elderscrolls.fandom.com/ru/wiki/Special:FilePath/" + wgPageName + "_3D.png\")");
 
        //Mouse event listener (movement + mouse 1 down)
        $("#object-rotator").on("mousemove", function(e) {
            if(e.buttons == 1) {
                window.newPos = Math.floor(e.pageX / 10);
                if(window.newPos > window.oldPos) {
                    //moved right
                    var position = parseInt($("#object-rotator").css("background-position"), 10);
                    $("#object-rotator").css("background-position", (position + 250).toString() + "px");
                } else if(window.newPos < window.oldPos) {
                    //moved left
                    var position = parseInt($("#object-rotator").css("background-position"), 10);
                    $("#object-rotator").css("background-position", (position - 250).toString() + "px");
                }
                window.oldPos = window.newPos;
            }
        });
    }
});
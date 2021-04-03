/* Any JavaScript here will be loaded for all users on every page load. */
/**
* @author: Flightmare (http://elderscrolls.fandom.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Replaces the infobox image with a 3D model viewer for every page added to [[Category:3D Enabled]]. Requires an image named {{PAGENAME}}_3D.png.
*/
$(document).ready(function() {
    if(wgCategories.indexOf("3D Enabled") > -1) {
        $("img.pi-image-thumbnail").first().replaceWith("<div id=\"object-rotator\"><img src=\"http://elderscrolls.fandom.com/wiki/Special:FilePath/3Ddef.png?width=214px\" style=\"position: absolute; bottom: 0; left: 0; opacity: 0.1\" /></div>");
        $("#object-rotator").css("background-image", "url(\"http://elderscrolls.fandom.com/wiki/Special:FilePath/" + wgPageName + "_3D.png\")");

        //Mouse event listener (movement + mouse 1 down)
        $("#object-rotator").on("mousemove", function(e) {
            if(e.buttons == 1) {
                window.newPos = Math.floor(e.pageX / 10);
                if(window.newPos > window.oldPos) {
                    //moved right
                    var position = parseInt($("#object-rotator").css("background-position"), 10);
                    $("#object-rotator").css("background-position", (position + 270).toString() + "px");
                } else if(window.newPos < window.oldPos) {
                    //moved left
                    var position = parseInt($("#object-rotator").css("background-position"), 10);
                    $("#object-rotator").css("background-position", (position - 270).toString() + "px");
                }
                window.oldPos = window.newPos;
            }
        });
    }
});
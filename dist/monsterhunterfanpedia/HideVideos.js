/*                         Hide Videos module                         */
/* original and somewhat unfunctioning script by Master Ceadeus 27    */
/* The miniscript to create a button is all that remains from the     */
/* previous version, and it was written by Master Ceadeus 27 alone.   */
/* The actual functioning script was re-written by User:RansomTime.   */
/* function hideVideos() is the functioning script (and one of two    */
/* "function"s in this script.                                        */
//
/* Added to Monster Hunter Fanon Wiki 8/17/2014                       
/* Originally found here
/* By Master Ceadeus 27 | Idea, button load script, original function
/* and RansomTime | Functioning function
*/
function hideVideos() {
        // Toggles videos
        videos = document.getElementsByClassName("article-thumb");
       
        if ( videos.length === 0 ) { 
        $("a#hv").text("There are no videos to hide");
        } // no videos
        var disp = "none"; // Default case is to hide them
       
        if (videos[0].style.display == "none") {
                // if we've already hidden, we want to show again
                disp = "block";
        }
        for ( var i = 0; i < videos.length; i++ ) {
                videos[i].style.display = disp;
        }
        //changes text
        if (videos[0].style.display == "block") {
        $("a#hv").text("Hide videos");
}
        if (videos[0].style.display == "none") {
        $("a#hv").text("Show videos");
}
}
 
$(document).ready(function hvbuttonAddition() {
var hvbutton = '<li><a style="color:white;" onclick="hideVideos()" class="wikia-button" id="hv">Hide videos</a></li>';
  if (wgNamespaceNumber === 0) {
      $(".tools").append(hvbutton);
        }
});
/* end hide videos script */

/* Change Log 
// 8/19/2014 | 1 change in function hideVideos()
/ Function now toggles the text as well; when videos are hidden, "Show videos" will be shown.
/ When videos are showing, "Hide videos" will be shown. This ensures that the user can easily
/ select between options.
// 8/19/2014 | 1 change in function hvbuttonAddition()
/ Function now loads the button on the toolbar, rather than at the top of the page. However, 
/ it causes the user to scroll upwards automatically.
// 8/24/2014
/ Changed hvbutton so it doesn't force a hashtag onto the URL; this should prevent it from
/ automatically upscrolling.
//
// 
// 
// 
// 
// 
// */
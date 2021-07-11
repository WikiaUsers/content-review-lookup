/* Any JavaScript here will be loaded for all users on every page load. */
/* ##################################################################################### */
/* ### Notable content                                                               ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Description: Create a collapsible template where mw-collapsible is not        ### */
/* ###              suitable to use. (coppied)                                       ### */
/* ### URL: https://fallout.fandom.com/wiki/Fallout_Wiki:Notable_content/draft       ### */
/* ### Credit:      User:Sakaratte                                                   ### */
/* ##################################################################################### */

$(function() {
    var collapseCaption = "Less";
    var expandCaption = "More";

    document.querySelectorAll(".np-collapsible").forEach(function(collapsible) {
        removeLazyLoad(collapsible);

        var collapsed = collapsible.querySelector("#np-collapsed");
        var helip = collapsible.querySelector("#np-helip");
        helip.innerHTML = expandCaption;
        helip.addEventListener("click", function(e) {
            var navState = helip.innerHTML;
            var navClassList = collapsed.classList;

            if (navState == expandCaption) {
                navClassList.add("np-visible");
                navClassList.remove("np-hidden");
                helip.innerHTML = collapseCaption;
            } else {
                navClassList.remove("np-visible");
                navClassList.add("np-hidden");
                helip.innerHTML = expandCaption;
            }
        });
    });
});
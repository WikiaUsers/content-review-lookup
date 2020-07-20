/*
v1 - marc-philipp: not pretty/optimized, but shows data
*/
$(function() {
    if (document.location.href.indexOf('?test=video-tasks') != -1) {
        module_name = ".video-tasks";

        $(".community-page-cards-module-block > section:first-child").clone().prependTo(".community-page-cards-module-block").addClass(module_name.replace(".", ""));

        $(module_name).attr("data-tracking", "");
        $(module_name + " .community-page-card-module-header span").text("How does a wiki work?");
        $(module_name + " .community-page-card-module-list.reset").html('<div style="position:relative; padding-bottom:56.25%; overflow:hidden;"><iframe src="https://cdn.jwplayer.com/players/QEcpA5SI-VXc5h4Tf.html" width="100%" height="100%" frameborder="0" scrolling="auto" allowfullscreen style="position:absolute;"></iframe></div>');
        $(module_name + " .community-page-card-module-list.reset").css("padding", "0");

        $(module_name + " .community-page-card-module-footer").remove();
        $(module_name).append('<div class="community-page-card-module-footer"><a class="community-page-card-module-full-list-link" href="' + wgServer + wgArticlePath.replace(/wiki.+/g, "wiki") + '/Help:Editing" data-tracking="view-full-list">Learn more</a></div>');
    }
});
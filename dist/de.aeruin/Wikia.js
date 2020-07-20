$(document).ready(function() {
    if ($("#WikiaRail").length > 0) {
         document.getElementById("WikiaMainContent").className = "WikiaMainContent ContentRail";
         document.getElementById("WikiaMainContentContainer").className = "WikiaMainContentContainer ContainerRail";
    }
    else {
         document.getElementById("WikiaMainContent").className = "WikiaMainContent";
    }
});
document.getElementById("WikiaRail").className = "WikiaRail loaded";
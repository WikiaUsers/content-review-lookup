$(document).ready(function() {
    // Technical Help page
    $('.sectionSwitcher-iOS').click(function() {
        $(this).addClass("sectionSwitcher-On").removeClass("sectionSwitcher-Transition");
        $(".sectionSwitcher-Android").removeClass("sectionSwitcher-On").addClass("sectionSwitcher-Transition");
        $("div#section-iOS").slideDown();
        $("div#section-Android").slideUp();
    });
    $('.sectionSwitcher-Android').click(function() {
        $(this).addClass("sectionSwitcher-On").removeClass("sectionSwitcher-Transition");
        $(".sectionSwitcher-iOS").removeClass("sectionSwitcher-On").addClass("sectionSwitcher-Transition");
        $("div#section-iOS").slideUp();
        $("div#section-Android").slideDown();
    });
});
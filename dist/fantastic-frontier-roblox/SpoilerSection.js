$(function() {
    $(".spoiler-section").each(function() {
        var open = false;
        
        var spoiler = $(this);
        var headerText = spoiler.attr("data-header-text");
        
        spoiler.find(".spoiler-section-header").click(function() {
            open = !open; // Toggle open.
            spoiler.find(".spoiler-section-header").text(headerText + ". Click to " + (open ? "close" : "open") + "."); // Update header text. Click to open/close.
            
            spoiler.removeClass("open");
            if (open)
                spoiler.addClass("open"); // Toggle class to match 'open'.
        });
    });
});
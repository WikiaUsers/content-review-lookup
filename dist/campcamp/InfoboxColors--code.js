$(function() {
    // todo: use provided .pi theme ('themesource', etc.) to determine whether to use eye or hair color
    
    var theme   = $(".portable-infobox div.eyecolor").css("background-color"); // using eye color for .pi color theming
    var imgTabs = $(".portable-infobox .pi-image-collection-tabs > li");       // array of containing the .pi image tabs
    
    $(".portable-infobox.pi-background").css("border-color", theme ? theme : "#653f03"); // set border color to eye color or default
    
    if (theme) {
        $(".portable-infobox .pi-image-collection-tabs > li:first-child").css("background-color", theme); // set first tab color (initial)
        
        // OnClick
        imgTabs.click(function() {
            imgTabs.css("background", "none");      // restore all tabs to no bg
            $(this).css("background-color", theme); // set current (clicked) tab color
        });
    }
});
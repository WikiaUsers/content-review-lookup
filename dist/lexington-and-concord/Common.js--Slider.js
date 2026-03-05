console.log("CAN YOU SEE ME");
mw.loader.using(["jquery.ui"], function() {
    $(function() {
        console.log("Slider Script Loading...");

        var $tabs = $("#portal_slider");

        if ($tabs.length > 0) {
            // 1. Initialize Main Slider
            $tabs.tabs({
                active: 0,
                show: { effect: "fadeIn", duration: 150 },
                hide: { effect: "fadeOut", duration: 150 }
            });
            console.log("Main Slider Initialized");

            // 2. Initialize Vertical Tabs (The Oshi No Ko style)
            $(".portal_vtab").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
            
            // 3. The Click Handler
            $(document).on('click', '.portal_sliderlink', function(e) {
                var classMatch = this.className.match(/portal_sliderlink-(\d+)/);
                if (classMatch) {
                    e.preventDefault();
                    var index = parseInt(classMatch[1], 10);
                    console.log("Button clicked! Moving to slide: " + index);
                    
                    // Switch the tab
                    $tabs.tabs("option", "active", index);
                }
            });
        } else {
            console.log("Error: #portal_slider not found on this page!");
        }
    });
});
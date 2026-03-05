mw.loader.using(['jquery.ui'], function() {
    $(function() {

        var $mainSlider = $("#portal_slider").tabs({
            show: { effect: "fadeIn", duration: 150 },
            hide: { effect: "fadeOut", duration: 150 },
            panelTemplate: "> .portal_body > div" 
        });

        $(".portal_vtab").tabs({
            orientation: "vertical"
        });

        // 3. Navigation Logic for Main Slider
        $(document).on('click', '.portal_sliderlink', function(e) {
            e.preventDefault();
            var classMatch = this.className.match(/portal_sliderlink-(\d+)/);
            if (classMatch) {
                var index = parseInt(classMatch[1], 10);
                // No -1 here if your classes start at 0 (e.g., portal_sliderlink-0)
                $mainSlider.tabs("option", "active", index);
            }
        });

        // 4. Next/Prev Buttons (Main Slider Only)
        $(document).on('click', '.portal_next', function(e) {
            e.preventDefault();
            var current = $mainSlider.tabs("option", "active");
            var total = $mainSlider.find("> .portal_body > .portal_content").length;
            $mainSlider.tabs("option", "active", (current + 1) % total);
        });

        $(document).on('click', '.portal_prev', function(e) {
            e.preventDefault();
            var current = $mainSlider.tabs("option", "active");
            var total = $mainSlider.find("> .portal_body > .portal_content").length;
            $mainSlider.tabs("option", "active", (current - 1 + total) % total);
        });

        // 5. Home Button
        $(document).on('click', '.portal_homelink', function(e) {
            e.preventDefault();
            $mainSlider.tabs("option", "active", 0);
        });
    });
});
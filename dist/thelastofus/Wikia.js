importArticles({
    type: "script",
    articles: [
        "u:halo:MediaWiki:Wikia.js/Slider.js"
    ]
});

/* --- Template:Portal/Contents slider --- */

    $(".portal__content__aux a").on("click", function(e) {
        e.preventDefault();
        var id = $(this).parent().attr("id");
        $(".portal__content__slide.active").removeClass("active");
        $(".portal__content__slide#" + id).addClass("active");
        $(".portal.navigation").addClass(id);
    });
    
    $(".portal__content__navigator .previous").on("click", function() {
        if( $(".portal__content__slide.active").attr("id") == "hub" ) {
            console.log("Attempted to access previous slide when none exists in the stack (no operation).");
        } else {
            var active = $(".portal__content__slide.active");
            active.removeClass("active");
            active.prev().addClass("active");
            var newid = active.prev().attr("id");
            $(".portal.navigation").removeClass().addClass("portal navigation " + newid);
        }
    });
    
    $(".portal__content__navigator .next").on("click", function() {
        if( $(".portal__content__slide.active").attr("id") == "First_Light" ) {
            console.log("Attempted to access next slide when none exists in the stack (recycled back to slide 1).");
            var active = $(".portal__content__slide.active");
            active.removeClass("active");
            $(".portal__content__slide#hub").addClass("active");
            $(".portal.navigation").removeClass().addClass("portal navigation hub");
        } else {
            var active = $(".portal__content__slide.active");
            active.removeClass("active");
            active.next().addClass("active");
            var newid = active.next().attr("id");
            $(".portal.navigation").removeClass().addClass("portal navigation " + newid);
        }
    });
    
    $(".portal__content__navigator .index").on("click", function() {
       $(".portal__content__slide.active").removeClass("active");
       $(".portal__content__slide#hub").addClass("active");
       $(".portal.navigation").removeClass().addClass("portal navigation hub");
    });
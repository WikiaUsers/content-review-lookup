/* <nowiki> */

/* --- Global variable used for referencing current page URL --- */

    var siteURL = location.protocol + "//" + location.host + location.pathname;

/* --- Removes the need for adding a surfeit amount of <gallery> attributes --- */
/* --- by making the desirable ones the default.                            --- */

    $(".wikia-gallery").removeClass().addClass("wikia-gallery wikia-gallery-caption-below wikia-gallery-position-center wikia-gallery-spacing-small wikia-gallery-border-none wikia-gallery-captions-center wikia-gallery-caption-size-medium");

/* --- Special:Upload template preload --- */
mw.hook('wikipage.content').add(function(){
    if (
        mw.config.values.wgCanonicalSpecialPageName=='Upload' && // Special:Upload
        !window.location.href.includes('wpForReUpload') // Only first uploads
    ) {
        // Hide licenses
        mw.util.addCSS('.mw-htmlform-field-Licenses{display:none !important;}');
        var preload = '{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]';
        var loadPreload = function (){
            var els = $('.mw-htmlform-field-HTMLTextAreaField .mw-input > textarea').filter(function(_,el){return el.value.length===0;});
            if (els.length>0) {
                els.html(preload);
                els.val(preload);
            }
        };
        // Initial run
        loadPreload();

        // Set up the mutation observer
        var observer = new MutationObserver(loadPreload);
        // Start observing
        observer.observe(document.querySelector('#mw-upload-form'), {
            childList: true
        });
    }
});

/* --- Unchecks "leave redirect behind" by default. --- */
 
    if($("input[name=wpLeaveRedirect").length) {
        $("input[name=wpLeaveRedirect").prop("checked", false);
    }

/* </nowiki> */

/* --- Display appearance images on right rail (Template:Appearances) --- */
 
$(function(){
    var icons = document.getElementsByClassName('appicon');
    if (icons.length > 0) {
        $('<section class="rail-module" id="apprail"><h2>Appears in:</h2></section>').appendTo('#WikiaRail');
        var artinf = document.getElementById("apprail");
        var j = icons.length;
        for (i = 0; i < j; i++) artinf.appendChild(icons[0]);
    }
 
    $(".appicon").show();
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
        if( $(".portal__content__slide.active").attr("id") == "Other_titles" ) {
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
 
/* </nowiki> */
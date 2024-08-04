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
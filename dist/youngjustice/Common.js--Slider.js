/* Slider effect by User:Tierrie modified by User:KettleMeetPot*/

mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        //data-src to img-src to mitigate lag on certain images
        $( "#portal_slider img" ).each(function(i,e) {
            dataSRC = $(e).attr("data-src");
            $(e).attr("src", dataSRC);
        });
    });
});
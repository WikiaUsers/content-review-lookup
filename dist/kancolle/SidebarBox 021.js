(function($) {

    "use strict";

    console.log("SidebarBox v0.2.2");

    $(window).load(function() {

        if ($(".append-to-rail").length) {
            $(".append-to-rail").appendTo("#WikiaRail");
            $(".append-to-rail").show();
        }

        if ($(".prepend-to-rail").length) {
            $(".prepend-to-rail").prependTo("#WikiaRail");
            $(".prepend-to-rail").show();
        }

        if ($("div.kcTwitterSidebar").length) {
            $("<a>")
                .addClass("twitter-timeline")
                .attr("data-widget-id", "425183022497796097")
                .attr("href", "https://twitter.com/KanColle_STAFF")
                .text("Tweets by @KanColle_STAFF")
                .appendTo(".kcTwitterSidebar");
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
        }

    });

}(jQuery));
(function($) {

    "use strict";

    $(document).ready(function() {

        console.log("TwitterTimeline.js v010");

        var enable_whitelist = true;

        // when enable_whitelist = true : only allow timelines for those profiles
        var whitelist = [
            "KanColle_STAFF", // official development/management twitter
            "dmmolg_com", // official publisher twitter
            // "Kensho_KanColle", // unofficial community announcements
        ];

        var last_wrapper;

        $(".twitter-timeline-wrapper").each(function(_, wrapper) {

            var profile = $(wrapper).data("profile") || "",
                text = $(wrapper).data("text") || "",
                width = $(wrapper).data("width") || 300,
                height = $(wrapper).data("height") || 400,
                widget_link = $("<a>")
                    .addClass("twitter-timeline")
                    .attr("href", "https://twitter.com/" + profile)
                    .attr("width", width)
                    .attr("height", height)
                    .text(text);

            if (!enable_whitelist || $.inArray(profile, whitelist) !== -1) {
                $(wrapper).append(widget_link);
                last_wrapper = wrapper;
            }

        });

        if (last_wrapper) {
            var widgets_js = $("<script>")
                .attr("type", "text/javascript")
                .attr("src", "https://platform.twitter.com/widgets.js");
            $(last_wrapper).append(widgets_js);
        }

    });

}(jQuery));
(function($) {

    "use strict";

    $(document).ready(function() {

        if ($("#enable-talk-button").length && location.search === "") {

            var talk_namespace_prefix = wgCanonicalNamespace === "" ? "/wiki/Talk:" : "/wiki/" + wgCanonicalNamespace + "_talk:",
                talk_link_href = talk_namespace_prefix + wgTitle,
                talk_link = '<a accesskey="t" href="' + talk_link_href + '" class="wikia-button comments secondary talk" rel="nofollow" data-id="comment">Talk</a>';

            $("#WikiaPageHeader").append(talk_link);

        }

    });

}(jQuery));
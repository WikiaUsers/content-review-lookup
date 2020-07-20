
/* For Template:TabLink.
 */

(function(mw, $) {

    "use strict";

    $(document).ready(function() {

        function scrollTo(content, id) {
            if (!content || typeof(id) !== "string") {
                return;
            }
            id = "#" + id.replace(/\./g, "\\.");
            //console.log("InterTabLinking: scrollTo:", id);
            var element = content.find(id).get(0);
            if (element) {
                element.scrollIntoView();
            }
        }

        function parseHash() {
            var hash = window.location.hash || "";
            var parts = hash.match(/^#\/([^#]+)#(.+)$/);
            if (parts) {
                return { tab: parts[1], element: parts[2] };
            }
            parts = hash.match(/^#\/([^#]+)$/);
            if (parts) {
                return { tab: parts[1] };
            }
            parts = hash.match(/^#([^#]+)$/);
            if (parts) {
                return { element: parts[1] };
            }
            return {};
        }

        function formatHash(tab, hash) {
            return hash ? "#/" + tab.replace(/ /g, "_") + "#" + hash : "#/" + tab.replace(/ /g, "_");
        }

        var parsed = parseHash();
        //console.log("InterTabLinking: parsed:", parsed);

        var hash = parsed.element || true,
            tab = parsed.tab,
            switch_hash = null;

        function switchToTab(tab, hash) {
            var tabs = $("ul.tabs li a span").filter(function() {
                return $(this).text() === tab.replace(/_/g, " ");
            });
            if (tabs[0]) {
                $(tabs[0]).parent().trigger("click");
                switch_hash = hash;
            }
        }

        function processTabBody(content) {
            var $content = $(content);
            if ($content.attr("class") === "tabBody selected") {
                $content.ready(function() {
                    //console.log("InterTabLinking: processTabBody:", tab, hash, switch_hash);
                    if (hash) {
                        if (tab) {
                            switchToTab(tab, hash);
                            tab = null;
                        } else {
                            scrollTo($content, hash);
                            hash = null;
                        }
                    } else {
                        if (switch_hash) {
                            scrollTo($content, switch_hash);
                            switch_hash = null;
                        }
                    }
                    $content.find(".tablink a").each(function() {
                        $(this).click(function(link_element) {
                            link_element.preventDefault();
                            var href = $(this).attr("href"),
                                parts = href.split("/").pop().split("#"),
                                tab = parts[0],
                                hash = parts[1];
                            //console.log("InterTabLinking: tablink.click:", tab, hash);
                            window.location.hash = formatHash(tab, hash);
                            switchToTab(tab, hash);
                            scrollTo($(".tabBody.selected"), hash);
                        });
                    });
                });
            }
        }

        $("[id^='flytabs'] li").each(function() {
            $(this).mousedown(function() {
                window.location.hash = formatHash($(this).text());
            });
        });

        mw.hook("wikipage.content").add(processTabBody);

    });

}(mediaWiki, jQuery));
/**
 * Prevent tabber from interacting with location.hash.
 */

(function(mw, $) {

    "use strict";

    $(document).ready(function() {

        function fixTabber(content) {
            var navs = content ? content.find(".tabbernav") : $(".tabbernav");
            navs.each(function() {
                var nav = $(this);
                if (nav.data("fixed")) {
                	return;
                }
                nav.off("click", "a");
                nav.on("click", "a", function(e) {
                    e.preventDefault();
                    var tabs = nav.parent().children(".tabbertab"); // .tabbernav -> .tabber -> .tabbertab
                    var title = $(this).attr("title");
                    var content = tabs.filter("[title='" + title + "']");
                    if (content.length !== 1) return;
                    tabs.hide();
                    content.show();
                    nav.find(".tabberactive").removeClass("tabberactive");
                    nav.find("a[title='" + title + "']").parent().addClass("tabberactive");
                    $(window).trigger("scroll");
                });
                nav.data("fixed", "true");
            });
        }

        fixTabber();

        mw.hook("wikipage.content").add(function(content) {
            content = $(content);
            setTimeout(function() {
                fixTabber(content);
            }, 100);
        });

    });

}(mediaWiki, jQuery));
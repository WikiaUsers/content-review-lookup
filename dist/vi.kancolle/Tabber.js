/* Temporary fix for tabber.
 * Based on https://github.com/HydraWiki/Tabber.
 */
 
(function(mw, $) {
 
    "use strict";
 
    $(document).ready(function() {
        function fixTabber(content) {
            $(content).find(".tabber").each(function() {
                var tabber = $(this),
                    tabs = tabber.children(".tabbertab"),
                    nav = $("<ul>").addClass("tabbernav");
                tabs.each(function() {
                    var anchor = $("<a>").text(this.title).attr("href", "javascript:void(null);").attr("title", this.title);
                    $("<li>").append(anchor).appendTo(nav);
                });
                tabber.prepend(nav);
                function showContent(title) {
                    var content = tabs.filter('[title="' + title + '"]');
                    if (content.length !== 1) return;
                    tabs.addClass("tabbertabhide");
                    content.removeClass("tabbertabhide");
                    nav.find(".tabberactive").removeClass("tabberactive");
                    nav.find('a[title="' + title + '"]').parent().addClass("tabberactive");
                }
                showContent(tabs.first().attr("title"));
                nav.on("click", "a", function(e) {
                    e.preventDefault();
                    showContent($(this).attr("title"));
                });
                tabber.removeClass("tabber").addClass("tabberlive").css({ display: "block" }).show();
            });
        }
        mw.hook("wikipage.content").add(fixTabber);
    });
 
}(mediaWiki, jQuery));
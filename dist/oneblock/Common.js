/* Any JavaScript here will be loaded for all users on every page load. */


// Float any links in the button box widget
$(".button-box").each(function() {
    var $this = $(this),
        anchor = $this.find(".button-box-name a");
    if (!anchor || $this.parents(".button-box-link").length > 0)
        return;
    $this.wrap($("<a>", {
        class: "button-box-link",
        href: anchor.attr("href"),
        title: anchor.attr("title")
    }));
    $this.find("a").attr("tabindex", "-1");
});
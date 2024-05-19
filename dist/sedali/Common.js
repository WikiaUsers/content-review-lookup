! function (mw, $) {
    "use strict";
    
    function addButton() {
        var $sel,
            $button = $('<li><a/>').find("a")
            .attr({
                href: "#",
                accesskey: "89",
                id: "ca-null-edit",
                title: "Testing"
            }).text("Hello World").click(banner).end();
 
        $sel = mw.config.get("skin") === "oasis" ? $(".UserProfileActionButton .WikiaMenuElement").exists() ? $(".UserProfileActionButton .WikiaMenuElement") : $(".page-header__contribution-buttons .wds-list") : $("#ca-edit").parent();
        $sel.append($button);
    }
    
    function banner() {
        new BannerNotification("Success !", "msg").show();
    }
    
    // Init
    $(function () {
        if (!$("#ca-null-edit").length && $("#ca-edit, a[data-id='editprofile'], a[data-id='leavemessage']").length)
            addButton();
    });
}(mediaWiki, jQuery);

$('.article-categories').after('<div style="display: flex; align-items: center; justify-content: center; height:30px; width:100%; background-color: aqua">Hello</div>');
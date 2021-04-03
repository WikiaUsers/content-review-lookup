/* Any JavaScript here will be loaded for all users on every page load. */

// Template:Spoiler/Gallery
(function () {
    var _alert = ".spoiler-alert";
    $(_alert).next("div").hide();
    $(_alert + " span").click(function () {
        $(this).attr("id") === "y"
            ? $(this).parents(_alert).next("div").fadeIn()
            : $(this).parents(_alert).next("div").hide();
        $(this).parents(_alert).hide();
    });
})();

// Set infobox to the last tab by default
(function () {
    var exceptions = ["Kris", "Robin", "Corrin", "Byleth"];
    var pageName = mw.config.get("wgPageName");
    for (var i = 0; i < exceptions.length; i++) {
        if (pageName === exceptions[i]) return;
    }
    if (!$(".portable-infobox").hasClass("type-character")) return;
    var tabLink = ".pi-tab-link";
    var content = ".pi-image-collection-tab-content";
    $(tabLink).removeClass("current");
    $(content).removeClass("current");
    $(tabLink + ":last").addClass("current");
    $(content + ":last").addClass("current");
})();
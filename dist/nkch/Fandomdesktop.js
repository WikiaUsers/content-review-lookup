$(document).ready(() => {
    $(window).bind("scroll", e => {
        let scrolled = $(window).scrollTop();
        $(".fandom-community-header__background").css("top", (0 - (scrolled / 5)) + "px");
    });
});

(() => {
    mw.loader.getScript("https://unpkg.com/@rive-app/canvas")
        .done(init)

    function init() {
        if (!mw.config.get("wgIsMainPage")) return;

        const placement = document.querySelector(".home-rive-container");

        if (!placement) return;

        const canvas = document.createElement("canvas");

        canvas.width = 1000;
        canvas.height = 500;

        placement.append(canvas);

        new rive.Rive({
            src: "https://rawcdn.githack.com/Vonavy/nkch.rive/main/nkch.riv",
            canvas: canvas,
            autoplay: true,
            stateMachines: "Main"
        });
    }
})();
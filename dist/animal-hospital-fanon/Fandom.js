$(function () {
    const DURATION = 250;

    function animateOpen($el) {
        if ($el.data("animating")) return;
        $el.data("animating", true);

        $el.stop(true, true)
            .css({
                display: "block",
                overflow: "hidden",
                height: 0,
                opacity: 0
            })
            .animate({
                height: $el.get(0).scrollHeight,
                opacity: 1
            }, DURATION, function () {
                $el.css({
                    height: "",
                    overflow: "",
                    opacity: ""
                });
                $el.data("animating", false);
            });
    }

    function animateClose($el) {
        if ($el.data("animating")) return;
        $el.data("animating", true);

        $el.stop(true, true)
            .css({
                overflow: "hidden",
                height: $el.outerHeight()
            })
            .animate({
                height: 0,
                opacity: 0
            }, DURATION, function () {
                $el.css({
                    display: "none",
                    height: "",
                    overflow: "",
                    opacity: ""
                });
                $el.data("animating", false);
            });
    }

    // Watch collapsible elements
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName !== "style") return;

            const $el = $(mutation.target);

            if ($el.is(":visible")) {
                animateOpen($el);
            } else {
                animateClose($el);
            }
        });
    });

    $(".mw-collapsible-content").each(function () {
        observer.observe(this, {
            attributes: true,
            attributeFilter: ["style"]
        });
    });
});
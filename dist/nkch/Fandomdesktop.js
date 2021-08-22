$(document).ready(
    function () {
        $(window).bind("scroll",
            function (e) {
                var scrolled = $(window).scrollTop();
                $(".fandom-community-header__background").css("top", (0 - (scrolled / 5)) + "px");
            }
        );
    }
);
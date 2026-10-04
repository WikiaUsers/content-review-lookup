/* =========================================================
   PAW SQUAD WIKI - CHARACTER GALLERY
   ========================================================= */

$(document).ready(function () {

    var galleries =
        ".paw-character-gallery .gallerybox, " +
        ".snake-character-gallery .gallerybox";

    $(galleries).on("click", function (event) {

        var character = $(this);

        /* Find the character page link */
        var link = character.find("a").filter(function () {
            var href = $(this).attr("href");
            return href && href.indexOf("/wiki/") !== -1;
        }).first();

        if (!link.length) {
            return;
        }

        /* Stop Fandom opening the page immediately */
        event.preventDefault();
        event.stopPropagation();

        /* Remember where we're going */
        var destination = link.attr("href");

        /* Remove old effects */
        $(galleries)
            .removeClass("paw-character-selected")
            .removeClass("paw-character-dimmed")
            .removeClass("paw-color-bella")
            .removeClass("paw-color-emily")
            .removeClass("paw-color-blue")
            .removeClass("paw-color-taco")
            .removeClass("paw-color-pollyanna")
            .removeClass("paw-color-oreo")
            .removeClass("paw-color-luna")
            .removeClass("paw-color-daisy")
            .removeClass("paw-color-slick")
            .removeClass("paw-color-snake1")
            .removeClass("paw-color-snake2")
            .removeClass("paw-color-snake3")
            .removeClass("paw-color-snake4")
            .removeClass("paw-color-snake5");

        /* Select the clicked character */
        character.addClass("paw-character-selected");

        /* Fade everyone else */
        $(galleries)
            .not(character)
            .addClass("paw-character-dimmed");

        /* Find which character was clicked */
        var caption = character.find(".paw-character-caption");

        if (caption.hasClass("bella")) {
            character.addClass("paw-color-bella");
        }

        if (caption.hasClass("emily")) {
            character.addClass("paw-color-emily");
        }

        if (caption.hasClass("blue")) {
            character.addClass("paw-color-blue");
        }

        if (caption.hasClass("taco")) {
            character.addClass("paw-color-taco");
        }

        if (caption.hasClass("pollyanna")) {
            character.addClass("paw-color-pollyanna");
        }

        if (caption.hasClass("oreo")) {
            character.addClass("paw-color-oreo");
        }

        if (caption.hasClass("luna")) {
            character.addClass("paw-color-luna");
        }

        if (caption.hasClass("daisy")) {
            character.addClass("paw-color-daisy");
        }

        if (caption.hasClass("slick")) {
            character.addClass("paw-color-slick");
        }

        if (caption.hasClass("snake1")) {
            character.addClass("paw-color-snake1");
        }

        if (caption.hasClass("snake2")) {
            character.addClass("paw-color-snake2");
        }

        if (caption.hasClass("snake3")) {
            character.addClass("paw-color-snake3");
        }

        if (caption.hasClass("snake4")) {
            character.addClass("paw-color-snake4");
        }

        if (caption.hasClass("snake5")) {
            character.addClass("paw-color-snake5");
        }

        /* Let the animation play before opening the page */
        setTimeout(function () {
            window.location.href = destination;
        }, 350);

    });

});
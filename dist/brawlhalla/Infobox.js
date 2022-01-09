"use strict";
console.log("Infobox Script loaded")
$(function () {
    $(".infobox-swapper-button-pose").on("click", function () {
        $(".infobox-swapper-pose").css("display", "");
        $(".infobox-swapper-art").css("display", "none");
    });
    $(".infobox-swapper-button-art").on("click", function () {
        $(".infobox-swapper-pose").css("display", "none");
        $(".infobox-swapper-art").css("display", "");
    });
});
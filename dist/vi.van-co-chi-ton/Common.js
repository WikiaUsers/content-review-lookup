$(function () {

    $("#centerBtn").on("click", function () {

        const scroll = document.getElementById("timelineScroll");
        const center = scroll.querySelector(".timeline-center");

        scroll.scrollLeft =
            center.offsetLeft
            - scroll.clientWidth / 2
            + center.offsetWidth / 2;

    });

});
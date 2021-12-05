/* Any JavaScript here will be loaded for users using the mobile site */
(function () {
    $(".spoiler").click(changeClass);
    
    function changeClass(){
        if ($(this).hasClass("spoiler")) {
            $(this).removeClass("spoiler");
            $(this).addClass("spoilerClicked");
        }
        else {
            $(this).removeClass("spoilerClicked");
            $(this).addClass("spoiler");
        }
    }    
}());
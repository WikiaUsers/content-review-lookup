$(document).ready(function() {
    $(".selection").on("click", function() {
        $(".content-jp").toggleClass("show");
        $(".content-kr").toggleClass("show");
    });
});
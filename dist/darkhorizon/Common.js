$(document).ready(function() {
    var navbox = $(".navbox-custom");
    //navbox.find("table").hide();
    navbox.find("th").append(
        $("<a href='#' class='navboxExpandCollapse'>[show]</a>")
        .on("click", function(e) {
            var state = $(this).html();
            if(state === "[hide]") {
                $(this).html("[show]");
            } else {
                $(this).html("[hide]");
            }
            $(this).parent().parent().next().toggle();
            e.preventDefault();
        })
    );
});
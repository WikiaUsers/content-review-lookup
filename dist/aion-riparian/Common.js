function pageLeft() {
    if ($("#book .text:visible").prevAll("#book .text").length != 0) {
        thisPage = $("#book .text:visible").prevAll("#book .text").length;
        $("#book .text").eq(thisPage).hide();
        $("#book .text").eq(thisPage - 1).show();
        $(".buttonright").css("opacity", "1.0").css("filter", "alpha(opacity=10)");
        newThisPage = $("#book .text:visible").prevAll("#book .text").length + 1;
        $(".page").text("- " + newThisPage + "/" + $("#book .text").length + " -");
        if ($("#book .text:visible").prevAll("#book .text").length == 0) $(".buttonleft").css("opacity", "0.3").css("filter", "alpha(opacity=03)");
    }
}
 
function pageRight() {
    if ($("#book .text:visible").nextAll("#book .text").length != 0) {
        thisPage = $("#book .text:visible").prevAll("#book .text").length;
        $("#book .text").eq(thisPage).hide();
        $("#book .text").eq(thisPage + 1).show();
        $(".buttonleft").css("opacity", "1.0").css("filter", "alpha(opacity=10)");
        newThisPage = $("#book .text:visible").prevAll("#book .text").length + 1;
        $(".page").text("- " + newThisPage + "/" + $("#book .text").length + " -");
        if ($("#book .text:visible").nextAll("#book .text").length == 0) $(".buttonright").css("opacity", "0.3").css("filter", "alpha(opacity=03)");
    }
}
 
$(function() {
    if ($("#book").length) {
        $(".buttonleft").click(pageLeft);
        $(".buttonright").click(pageRight);
        if ($("#book .text:visible").nextAll("#book .text").length != 0) $(".buttonright").css("opacity", "1.0").css("filter", "alpha(opacity=10)");
    }
});
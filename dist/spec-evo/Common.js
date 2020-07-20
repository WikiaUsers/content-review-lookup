$(function() {
    //Collapsible tables
    //Creates show/hide button
    $(".tc-heading p").append("<span class='tc-toggle'>[<a class='tc-toggle-button'>hide</a>]</span>");

    //Default collapsed or not collapsed
    $(".tc-collapsed").find(".tc-heading").parent().siblings().css("display", "none");
    $(".tc-collapsed").find(".tc-toggle-button").html("show");

    //Toggle function
    $(".tc-toggle-button").click(function() {
        $(this).parents("tr").siblings().toggle(100);
        if ($(this).html() === "hide")
            $(this).html("show");
        else
            $(this).html("hide");
    });
});
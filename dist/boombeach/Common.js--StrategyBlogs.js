$(document).ready(function() {
    $("#stratBlogNav .stratBlogButtonFirst").each(function(){
        $(this).addClass("stratBlogButtonFirstHover");
    });
    // Modify text in categorytree lists
    $("#stratBlogNav a.CategoryTreeLabel").each(function() {
        var initialText = $(this).text();
        var splitStrings = initialText.split("/");
        $(this).text("\"" + splitStrings[1] + "\" by " + splitStrings[0]);
    });
    // Open the selected list
    $("#stratBlogNav .stratBlogButtonFirstHover").click(function() {
        $("#stratBlogNav .stratBlogButtonFirst").each(function(){
             $(this).removeClass("stratBlogButtonFirstHover");
             $(this).removeClass("sbbfLock");
        });
        $(this).addClass("sbbfLock");
        $("#stratBlogNav .stratBlogButtonFirst:not(.sbbfLock) img").fadeOut(800, function(){
            $("#stratBlogNav .stratBlogButtonFirst:not(.sbbfLock)").slideUp(1000, function (){
                $("#stratBlogNav .sbbfLock + .stratBlogList").slideDown(1000);
                $("#stratBlogNav #stratBlogListRefresh").fadeIn(1000);
            });
        });
    });
    // Return menu to intial state
    $("#stratBlogNav #stratBlogListRefresh").click(function() {
        $("#stratBlogNav .stratBlogList").slideUp(1000);
        $("#stratBlogNav #stratBlogListRefresh").fadeOut(1000, function(){
            $("#stratBlogNav .stratBlogButtonFirst:not(.sbbfLock)").slideDown(1000, function(){
                $("#stratBlogNav .stratBlogButtonFirst:not(.sbbfLock) img").fadeIn(800, function (){
                    $("#stratBlogNav .sbbfLock").removeClass("sbbfLock");
                    $("#stratBlogNav .stratBlogButtonFirst").each(function(){
                        $(this).addClass("stratBlogButtonFirstHover");
                    });
                });
            });
        });
    });
});
// code to create a spoiler thing like in reddit or discord
/////// (for the reviewers, look at [[User:BrandadCheeser4]] to see examples of this code in use)
/// for lectern chapter I
$(".spoiler").click(function (){
 $(".spoiler").addClass("appSpoiler");
 $(".spoiler").removeClass("preSpoiler");
});

/// for lectern chapter II
$(".spoiler2").click(function (){
 $(".spoiler2").addClass("appSpoiler2");
 $(".spoiler2").removeClass("preSpoiler2");
});
// code to create a spoiler thing like in reddit or discord
/////// (for the reviewers, look at [[User:BrandadCheeser4]] to see examples of this code in use)
/// lectern chapter I
$(".spoiler").addClass("preSpoiler");

$(".spoiler").click(function (){
 $(".spoiler").addClass("appSpoiler");
 $(".spoiler").removeClass("preSpoiler");
 $(".preSpoilerA").removeClass("preSpoilerA");
});

/// lectern chapter II
$(".spoiler2").addClass("preSpoiler2");

$(".spoiler2").click(function (){
 $(".spoiler2").addClass("appSpoiler2");
 $(".spoiler2").removeClass("preSpoiler2");
 $(".preSpoiler2A").removeClass("preSpoiler2A");
});
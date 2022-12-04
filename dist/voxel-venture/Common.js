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

/// lectern chapter III
$(".spoiler3").addClass("preSpoiler3");

$(".spoiler3").click(function (){
 $(".spoiler3").addClass("appSpoiler3");
 $(".spoiler3").removeClass("preSpoiler3");
 $(".preSpoiler3A").removeClass("preSpoiler3A");
});

/// lectern chapter IV
$(".spoiler4").addClass("preSpoiler4");

$(".spoiler4").click(function (){
 $(".spoiler4").addClass("appSpoiler4");
 $(".spoiler4").removeClass("preSpoiler4");
 $(".preSpoiler4A").removeClass("preSpoiler4A");
});
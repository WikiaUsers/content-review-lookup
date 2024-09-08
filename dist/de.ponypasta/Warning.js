var view_page = confirm("Diese PonyPasta gilt als NSFW (Not safe for work) und könnte (aber auch nur könnte!) auf einige Nutzer verstörend wirken.\nFortfahren?");
if (view_page) {
    $("#WikiaArticle").fadeIn(500);
    $("#WikiaArticleComments").fadeIn(500);
}
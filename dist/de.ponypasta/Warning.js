var view_page = confirm("Diese PonyPasta gilt als NSFW (Not safe for work) und k�nnte (aber auch nur k�nnte!) auf einige Nutzer verst�rend wirken.\nFortfahren?");
if (view_page) {
    $("#WikiaArticle").fadeIn(500);
    $("#WikiaArticleComments").fadeIn(500);
}
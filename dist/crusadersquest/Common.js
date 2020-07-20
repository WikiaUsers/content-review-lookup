/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "u:dev:Tooltips/code.js"
    ]
});

$(function(){
    $("#WikiaRail").append($(".move"));
		$(".move").show();
 })
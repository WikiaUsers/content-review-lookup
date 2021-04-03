/* Any JavaScript here will be loaded for all users on every page load. */
{{Autofix=Creation2,Fix <page 1> Completed}}

$('.ChatModule .chat-name').text('Join the Meeting of Yakuzas');


SpoilerAlert = {
  pages: ["Spoiler"],
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.js"
    ]
});

importScriptPage('UserTags/code.js', 'dev');

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
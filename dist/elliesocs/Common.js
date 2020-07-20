/* Any JavaScript here will be loaded for all users on every page load. */

importArticle({
    type: "script",
    article: [
        "w:c:dev:DisplayClock/code.js"
    ]
});


importScriptPage('BackToTopButton/code.js', 'dev');

$('.wordmark').hover(function () {
$('.wordmark.large.graphic.font-tangerine img').attr('src', ''); 
});
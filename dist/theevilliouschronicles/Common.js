importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
$(function() { 
$('.spoiler .content').hide(); 
$('.spoiler .close').click(function() { 
$('.spoiler .advise').hide(); 
$('.spoiler .content').show(); 
}); 
});
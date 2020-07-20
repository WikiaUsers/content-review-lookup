var SocialMediaButtons = { 
 position: "bottom",
 colorScheme: "dark",
 buttonSize: "55px"
};
importScriptPage('SocialIcons/code.js','dev');

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

$(function(){ if ($('#forum-display').length ) { $('#forum-display').insertBefore('#WikiaFooter'); } });
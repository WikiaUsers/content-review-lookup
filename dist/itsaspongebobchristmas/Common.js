/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
        'w:c:dev:Countdown/code.js',
        'w:c:dev:BackToTopButton/code.js'
    ]
});

importScriptPage('Voice_Dictation/voice.js', 'dev');
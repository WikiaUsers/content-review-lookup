// 1. AjaxRC configuration option
window.ajaxRefresh = 30000;

// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC.js'
    ]
});
/* Available window. on this wiki and Discussions */
window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [
    RESULTS_GO_HERE
];
window.questions = [
    QUESTIONS_AND_ANSWERS_GO_HERE
];
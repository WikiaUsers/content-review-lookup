/* Any JavaScript here will be loaded for all users on every page load. */
// 1. AjaxRC configuration option
window.ajaxRefresh = 30000;
window.BackToTopModern = true;
// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC.js',
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:Quiz/code.js'
    ]
});

window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Better Luck next time, You need to study more!",
    "Congratulations, you're score neither the highest nor the lowest, either you're luck or you really know the answer",
    "Congratulations, you've got the HIGHEST score. You're a true student of Teacher Julius!, a true scholar!" 
];
window.questions = [
    ["This is the first question",
    "The CORRECT answer to question 1",
    "An INCORRECT answer to question 1",
    "Another INCORRECT answer to question 1",
    "Yet Another INCORRECT answer to question 1"], 

    ["This is the second question, feel free to add as many questions as you like",
    "The CORRECT answer to question 2",
    "An INCORRECT answer to question 2",
    "Another INCORRECT answer to question 2"],

    ["This is the third question",
    "The CORRECT answer to question 3",
    "An INCORRECT answer to question 3"]
];
/* JS Scripts */

/* Quiz */
window.quizName = "Quiz";
window.resultsTextArray = [ 
    "Text displayed after LOWEST score",
    "Text displayed after somewhere between the lowest and highest scores.",
    "Text displayed after HIGHEST score" 
];
window.questions = [
    ["This is the first question",
    "The CORRECT answer to question 1",
    "An INCORRECT answer to question 1",
    "Another INCORRECT answer to question 1",
    "Yet another INCORRECT answer to question 1"], 

    ["This is the second question, feel free to add as many questions as you like",
    "The CORRECT answer to question 2",
    "An INCORRECT answer to question 2",
    "Another INCORRECT answer to question 2"],

    ["This is the third question",
    "The CORRECT answer to question 3",
    "An INCORRECT answer to question 3"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
var quizName = "Seasons Quiz";
var quizLang = "en";
var resultsTextArray = [ 
    "Make it best. Perhaps you need see between again!!",
    "Good :)",
    "Wow! You are really a Between Fan" 
];
var questions = [
    ["In what episode and season [[Jason Day Lott]] borned?",
    "Episode 1, Season One",
    "Episode 5, Season One",
    "Episode 6",
    "Episode 1, Between the Lines: Wiley and Adam's Lost Weekend"], 

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
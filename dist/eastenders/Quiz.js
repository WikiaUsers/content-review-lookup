var quizName = "Quiz";
var quizLang = "en";
var resultsTextArray = [ 
    "Text displayed after the user completes the quiz with the LOWEST score",
    "Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
    "Text displayed after the user completes the quiz with the HIGHEST score" 
];
var questions = [
    ["When did the first episode broadcast?",
    "19 February 1985",
    "18 February 1985",
    "20 February 1985",
    "11 February 1985"], 
 
    ["Who was the first character seen on screen",
    "Den Watts",
    "Reg ",
    "Ali Osman"],
 
    ["Who has had the most Duff Duffs?",
    "Phil Mitchell",
    "Ian Beale"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
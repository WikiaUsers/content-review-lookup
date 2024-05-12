window.quizName = "Battle For Robux Quiz!";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Hmm..Looks Like You Got It Wrong, But It's Okay!, Better Luck Next Time!!",
    "WOAH!!!! , Good Job !!!",
    "Oh My!!, Good Job Guys So Cool!" 
];
window.questions = [
    ["What Is Pie Affliated To?",
    "The Ruler Of Everything",
    "The Theory Of Everything",
    "Live The Dream With The Pie Machine",
    "100 Digits Of Pi"], 

    ["What Is Lice's Home Planet?",
    "Gallifrey",
    "KO-35",
    "Eden-227"],

    ["What Species Is The Whole Characters? ",
    "Human",
    "Gallifreyan",
    "Time Lords"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
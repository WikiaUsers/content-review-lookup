/* Any JavaScript here will be loaded for all users on every page load. */
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have been blocked due to being $1',
	autocheck : true
};

importArticles({
	type: 'script',
	articles: [
		'u:dev:MessageBlock/code.js'
	]
});
window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Text displayed after the user completes the quiz with the LOWEST score",
    "Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
    "Text displayed after the user completes the quiz with the HIGHEST score" 
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
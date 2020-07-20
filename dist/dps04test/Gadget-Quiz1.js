var quizName = "Quiz1";
var quizLang = "en";
var resultsTextArray = [ 
	"Text displayed after the user completes the quiz with the LOWEST score",
	"Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
	"Text displayed after the user completes the quiz with the HIGHEST score" 
	];
var questions = [
 
	["This is the first question",
	"The CORRECT answer to question 1",
	"An INCORRECT answer to question 1",
	"Another INCORRECT answer to question 1",
	"Yet Another INCORRECT answer to question 1"], 
 
	["This is the second question, feel free to add as many questions as you like",
	"The CORRECT answer to question 2",
	"An INCORRECT answer to question 2",
	"Another INCORRECT answer to question 2"]
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
var quizName = "Quiz";
var quizLang = "en";
var resultsTextArray = [ 
	"Text displayed after the user completes the quiz with the LOWEST score",
	"Text displayed after the user completes the quiz somewhere between the lowest and highest scores. Feel free to add more than one of these (separated by commas and inside double quotes)",
	"Text displayed after the user completes the quiz with the HIGHEST score" 
	];
var questions = [
 
	["In Dino Crisis 2, where was the gas mask was located?",
	"Outside of city/Highway",
	"3rd Energy Reactor",
	"Large Laboratory Hall",
	"elsewhere"], 
 
	["In Dino Crisis 2, how many Dino File can be found inside the game?",
	"11",
	"10",
	"12"]
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
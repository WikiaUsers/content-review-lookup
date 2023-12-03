/* Any JavaScript here will be loaded for all users on every page load. */

UserTagsJS.modules.newuser = {
	days: 0, // Must have been on the Wiki for 5 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
	
};

	UserTagsJS.modules.seminewuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.cooluser = {
	days: 50, // Must have been on the Wiki for 50 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.epikuser = {
	days: 100, // Must have been on the Wiki for 100 days
	edits: 0, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.prouser = {
	days: 365, // Must have been on the Wiki for 365 days
	edits: 0, // N/A
	namespace: 0 // Edits must be made to articles to count
};

/*Quiz scripts*/

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
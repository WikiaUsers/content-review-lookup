var quizName = "Test your Wikia skills";
var quizLang = "en";
var resultsTextArray = [
	"You can do better than that!",
	"You're not a full-fledged Wikian yet, but you're getting there",
	"You're quite an experienced Wikian, I bet you're an admin and have your own wiki, right?",
	"You're the wiki expert. You've mastered everything there is to learn about wikis"
	];
var questions = [
		
	["How do you edit an article?",
	"All of the methods described in the other answers will work",
	"By using the edit button which is above the article area",
	"By selecting the edit option from the contribute menu in the navigation area ",
	"By appending ?action=edit to the URL"], 
	
	["How do you start creating a table in wiki markup?",
	"{|",
	"&lt;table&gt;",
	"{+",
	"&lt;thead&gt;",
	"{{"],
	
	["MediaWiki:Wikia.css allows admins to",
	"Customize the appearance of the \"Wikia\" skin",
	"Edit all the wiki's style sheets",
	"Enable and disable particular features on a wiki",
	"Add custom JavaScript functionalities"],
	
	["Wikia is using an unmodified, 'clean' version of the MediaWiki platform",
	"False",
	"True"],
	
	["By default, bureaucrats can",
	"Block other users, give rights to other users, remove themselves from the bureaucrats group",
	"Block other users, check and compare IP addresses, give rights to other users",
	"Access Special:Promote, access Special:WikiFeatures, assign bot flags",
	"Bureaucrats have all the rights listed in the other answers"],
	
	["Wikia is best described as a",
	"Free wiki farm",
	"Wikimedia project focused mainly on entertainment and gaming",
	"Paid wiki hosting service",
	"Entertainment website focused on video games",
	"Paid web hosting service"],
	
	["To add bold text use",
	"'''text'''",
	"&lt;i&gt;text&lt;/i&gt;",
	"===text===",
	"None of the other answers"],
	
	["If you want to create a template, you need to create a template page and",
	"Nothing else; templates are like other pages and don't need to be tagged in any special way",
	"Add &lt;template&gt;&lt;/template&gt; tags around the content you want to be included in the template",
	"Ask an admin to set the status of your page to 'template'",
	"Add the new page to the \"Templates\" category"],
	
	["Wikia hosts wikis in over 200 languages",
	"True",
	"False"],
	
	["Which word do you need to add to an article to disable the table of contents?",
	"__NOTOC__",
	"__TOC__",
	"&lt;hidetoc /&gt;",
	"__NOEDITSECTION__",
	"__NOINDEX__"]
	
	];

importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
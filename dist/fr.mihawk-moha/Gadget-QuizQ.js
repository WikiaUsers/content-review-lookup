var quizName = "Quelles sont vos compétences sur One Piece Encyclopédie";
var quizLang = "en";
var resultsTextArray = [
	"Tu peux mieux faire !",
	"Tu n'es pas encore un membre expérimenté sur One Piece Encyclopédie, mais tu y arrivera",
	"Bravo, tu es un membre expert sur One Piece Encyclopédie"
	];
var questions = [
 
	["Que faire en cas de troll sur le forum ?",
	"Prévenir un modérateur ou un administrateur",
	"Lui demander d'arrêter",
	"L'insulter",
	"Ignorer la situation"], 
 
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
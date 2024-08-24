var quizName = "Testez vos connaissances sur Shingeki no kyojin !";
var quizLang = "en";
var resultsTextArray = [
	"Tu peux faire mieux que cela !!",
	"Tu n'est pas un wikien adepte mais cela viendra  !",
	"Tu est vraiment doué ! Je paris que tu est un administrateur et que tu as ton propre wiki ! ",
	"Tu est un expert ! Tu connais pratiquement tout de ce qui est wikia !"
	];
var questions = [
		
	["Comment est-ce que tu modifie un article??",
	"En utilisant le boutton modifier qui est au dessus de la page.",
	"En utilisant le bouton qui est en haut à droite de ton écrant ",]
	
	
	["Comment commencer la création d'une table dans la syntaxe wiki?",
	"{|",
	"&lt;table&gt;",
	"{+",
	"&lt;thead&gt;",
	"{{"],
	
	["MediaWiki:Wikia.css permets aux  admins de",
	"modifier la'apparence de \"Wikia\" skin",
	"Modifier toutes les style de pages du wiki",
	"Ajouter ou enlever certaine fonctionnalitée du wiki",
	"Add custom JavaScript functionalities"],
	
	["Les bureaucrates ne peuvent pas être bloqués",
	"Faux",
	"Vrai"],
	
	["Normallement, les bureaucrates peuvent",
	"Bloquer d'autres utilisateurs, donner des droits à d'autres utilisateurs, se retirer du groupe de bureaucrates",
	"Bloquer d'autres utilisateurs, vérifier et comparer les adresses IP, donner des droits à d'autres utilisateurs",
	"Accès spécial: promouvoir l'accès spéciales: Wiki Features, attribuer un ''flag'' aux  bot",
	"Tout les droits nommés dans les autres choix"],
	
	["Wikia is best described as a",
	"Free wiki farm",
	"Wikimedia project focused mainly on entertainment and gaming",
	"Paid wiki hosting service",
	"Entertainment website focused on video games",
	"Paid web hosting service"],
	
	["Pour ajouter ton écriture en '''gras''' tu fais",
	"'''texte'''",
	"&lt;i&gt;texte&lt;/i&gt;",
	"===text===",
	"Aucune de ses réponses"],
	
	["Si tu veux créer un modèle, tu dois crééer une page modèle et puis",
	"Rien d'autre, les modèles sont comme les autres pages et n'ont pas besoin d'être étiqueté d'une manière particulière",
	"Ajouter&lt;template&gt;&lt;/template&gt; tags around the content you want to be included in the template",
	"Demander à un administrateur de définir l'état de votre page «modèle'",
	"Ajouter la nouvelle page a la catégorie \"Templates\" category"],
	
	["Wikia héberge wikis dans plus de 200 langues",
	"Vrai",
	"Faux"],
	
	["Quel mot avez-vous besoin d'ajouter un article à désactiver la table des matières?",
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
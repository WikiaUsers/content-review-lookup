var quizName = "Testez vos connaissances sur Shingeki no kyojin !";
var quizLang = "en";
var resultsTextArray = [
	"Tu peux faire mieux que cela !!",
	"Tu n'est pas un wikien adepte mais cela viendra  !",
	"Tu est vraiment dou� ! Je paris que tu est un administrateur et que tu as ton propre wiki ! ",
	"Tu est un expert ! Tu connais pratiquement tout de ce qui est wikia !"
	];
var questions = [
		
	["Comment est-ce que tu modifie un article??",
	"En utilisant le boutton modifier qui est au dessus de la page.",
	"En utilisant le bouton qui est en haut � droite de ton �crant ",]
	
	
	["Comment commencer la cr�ation d'une table dans la syntaxe wiki?",
	"{|",
	"&lt;table&gt;",
	"{+",
	"&lt;thead&gt;",
	"{{"],
	
	["MediaWiki:Wikia.css permets aux  admins de",
	"modifier la'apparence de \"Wikia\" skin",
	"Modifier toutes les style de pages du wiki",
	"Ajouter ou enlever certaine fonctionnalit�e du wiki",
	"Add custom JavaScript functionalities"],
	
	["Les bureaucrates ne peuvent pas �tre bloqu�s",
	"Faux",
	"Vrai"],
	
	["Normallement, les bureaucrates peuvent",
	"Bloquer d'autres utilisateurs, donner des droits � d'autres utilisateurs, se retirer du groupe de bureaucrates",
	"Bloquer d'autres utilisateurs, v�rifier et comparer les adresses IP, donner des droits � d'autres utilisateurs",
	"Acc�s sp�cial: promouvoir l'acc�s sp�ciales: Wiki Features, attribuer un ''flag'' aux  bot",
	"Tout les droits nomm�s dans les autres choix"],
	
	["Wikia is best described as a",
	"Free wiki farm",
	"Wikimedia project focused mainly on entertainment and gaming",
	"Paid wiki hosting service",
	"Entertainment website focused on video games",
	"Paid web hosting service"],
	
	["Pour ajouter ton �criture en '''gras''' tu fais",
	"'''texte'''",
	"&lt;i&gt;texte&lt;/i&gt;",
	"===text===",
	"Aucune de ses r�ponses"],
	
	["Si tu veux cr�er un mod�le, tu dois cr��er une page mod�le et puis",
	"Rien d'autre, les mod�les sont comme les autres pages et n'ont pas besoin d'�tre �tiquet� d'une mani�re particuli�re",
	"Ajouter&lt;template&gt;&lt;/template&gt; tags around the content you want to be included in the template",
	"Demander � un administrateur de d�finir l'�tat de votre page �mod�le'",
	"Ajouter la nouvelle page a la cat�gorie \"Templates\" category"],
	
	["Wikia h�berge wikis dans plus de 200 langues",
	"Vrai",
	"Faux"],
	
	["Quel mot avez-vous besoin d'ajouter un article � d�sactiver la table des mati�res?",
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
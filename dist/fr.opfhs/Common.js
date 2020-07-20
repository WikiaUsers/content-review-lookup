PurgeButtonText = 'purge';
importScriptPage('PurgeButton/code.js', 'dev');

var quizName = "QCM sur OPFHS";
var quizLang = "fr";
var resultsTextArray = [ 
	"On ne fait pas un test quand on n'a pas lu la série ^^",
	"Et bien, tu n'as apparemment pas compris grand chose à la série... Tu devrais la relire, dans ces conditions tu ne comprendras pas la seconde partie...",
	"Moyen tout ça, tu n'as visiblement pas totalement compris la série, je te conseilles de reprendre à la fin de la partie 1." ,
        "Pas mal du tout, tu as bien compris la série. Quelques points sont encore flous dans ta tête, mais tu les éclairciras en continuant de lire.",
        "Très bien, tu connais parfaitement bien l'univers. Quelques petites fautes mais rien de grave. Félicitation.",
        "Incroyable !! Tu es vraiment un grand fan de la série pour avoir autant de bonne réponses, à croire que tu en es l'auteur."
	];
var questions = [
 
	["Quel est le nom du Capitaine des Avengers ?",
	"Moss",
	"Matt",
	"Parshath",
	"Freed"], 
 
	["Quel est le nom du groupe dont Matt est le leader ?",
	"Gardiens de la Paix",
	"Avengers",
	"Armée du Monde Elfique",
        "Résistance"],
 
["Qui est le capitaine des Scorpions Noirs ?",
	"Don Zaloog",
	"Vallonloyal",
	"Freed",
	"Zanki"], 
 
["Quel est l'ancien surnom donné à Gilford ?",
	"Le Trancheur de Barbares",
	"L'Éclair",
	"Gilford à l'Armure de Fer",
	"Gold Roger"], 
 
["Quel était la profession de Masaki ?",
	"Général en Chef de l'Armée du Shogun",
	"Shogun",
	"Chasseur de primes",
	"Pirate"], 
 
["Quel est le nom du 10ème Général de l'Armée Elfique ?",
	"Knirage",
	"Giltia",
	"Freed",
	"Rahz"], 
 
["Qui a vaincu Zanki ?",
	"Goku",
	"Freed",
	"Rahz",
	"Ichigo"], 
 
["Qui a vaincu Rahz ?",
	"Knirage",
	"Zanki",
	"Wost",
	"Gearfried"], 
 
["En réalité, qui est Knirage ?",
	"L'incarnation d'un des pouvoirs de Flare",
	"Un pantin de Flare",
	"Le frère de Freed",
	"Le mari de Kanan"], 
 
["Quel est la nature de Peine ?",
	"Démon",
	"Elfe",
	"Humain",
	"Djinn"], 
 
["Quelle séquelle aura Gilford de son combat contre Ruine ?",
	"Amnésie",
	"Graves blessures",
	"Mort",
	"Aucune"], 
 
["Quand s'est déroulée la Seconde Guerre Universelle ?",
	"Il y a 1200 ans",
	"Il y a 600 ans",
	"Il y a 2000 ans",
	"Il y a 10 ans"], 
 
["Qui a tué Reshef ?",
	"Masaki",
	"Endymion",
	"Freed",
	"Personne"], 
 
["Quel est le pouvoir d'Invicil ?",
	"Le temps",
	"L'espace",
	"Le néant",
	"Rien"], 
 
["Quel est le nom de l'homme qui sauva Matt quand il était petit ?",
	"Kirikomi",
	"Invicil",
	"Masaki",
	"Freed"], 
 
["Quel est la nature d'Enrise ?",
	"Djinn",
	"Elfe",
	"Dieu",
	"Humain"], 
 
["À quel clan appartenait Enrise ?",
	"Ijigen",
	"Erufu",
	"Azures",
	"Aucun"], 
 
["Comment se fait appeler l'âme qui prend le contrôle du corps de Moss et veut tout détruire ?",
	"Ssōm",
	"Moss",
	"Enrise",
	"Matt"], 
 
["Qui était Norleras ?",
	"L'assistant d'Ha Dès",
	"L'ami d'Enrise",
	"Ton père",
	"Un dieu"], 
 
["Qui était Jack Arcana ?",
	"Le frère d'Alakan",
	"Le père d'Alakan",
	"L'homme qui détruit le clan Arcana",
	"Gorz"], 
 
["Que propose Gorz à Alakan et Fuhma ?",
	"De s'allier à eux pour tuer Freed",
	"De les tuer",
	"De devenir leur ami",
	"De se battre jusqu'à la mort"], 

["Qui était emprisonné dans le Labyrinthe Éradicateur ?",
	"Matt, Masaki et Raider",
	"Matt, Masaki et Fuhma",
	"Gilford, Masaki et Raider",
	"Matt, Gearfried et Raider"], 

["Qui va tuer la fusion des 3 djinns élémentaires ?",
	"Masaki",
	"Matt",
	"Raider",
	"Shinato"], 

["Qui a tué Gearfried ?",
	"Freed",
	"Masaki",
	"Dai Grepher",
	"Norleras"], 

["Qui a tué Garma ?",
	"Personne",
	"Alakan",
	"Gorz",
	"Fuhma"], 

["Pourquoi Alakan va-t-il mourir ?",
	"Parce qu'il a utilisé trop d'énergie",
	"Parce qu'il a utilisé 1 technique interdite",
	"Des suites de ses blessures",
	"Parce que Garma l'a tué"], 

["Qui va affronter Freed après la victoire de ce dernier sur Gearfried ?",
	"Enrise",
	"Gorz",
	"Ha Dès",
	"Kanan"], 

["Qu'à réussi à faire Enrise durant son combat contre Freed ?",
	"Le priver des pouvoirs des Monarques Élémentaires",
	"Le tuer",
	"Le faire pleurer",
	"Rien"], 

["Que va décider Enrise au bout de ce combat ?",
	"De sacrifier son voeux le plus cher pour vaincre Freed",
	"De perdre et voir Le Créateur",
	"De mourir",
	"De renoncer à son idéologie"], 

["Comment Freed va échapper à Enrise ?",
	"En activant le démonmorphose",
	"En l'insultant",
	"En priant",
	"En utilisant sa plus forte attaque"], 

["Comment va mourir Masaki ?",
	"En se suicidant",
	"D'une crise cardiaque",
	"De vieillesse",
	"Tué par Dai Grepher"], 

["Que va faire Masaki en mourant ?",
	"Transférer Salamandra à Natsu et Gearfried",
	"Transférer Salamandra à Moss",
	"Sourire",
	"Maudire Freed"], 

["Selon Flare, quelle est la réponse au <<Pourquoi ?>> d'Enrise ?",
	"La liberté",
	"L'injustice",
	"L'avarice",
	"Il n'y a pas de réponse"], 

["Qui va sauver Kanan de la Coalition de Résurrection du Dieu Déchu ?",
	"Giltia",
	"Matt",
	"Flare",
	"Ha Dès"], 

["Qui Matt doit-il affronter seul ?",
	"Gilford et Ssōm",
	"Gearfried et Natsu",
	"Salamandra",
	"Freed et Shinato"], 

["Qui va éveiller les souvenirs de Gilford ?",
	"Matt et Roger",
	"Ssōm",
	"Roger",
	"Natsu"], 

["Qui Natsu et Gearfried doivent-ils affronter dans un combat spirituel ?",
	"Salamandra",
	"Masaki",
	"Matt",
	"Ssōm"], 

["Qui Flare peut-il invoquer ?",
	"Exodd",
	"Exodia",
	"Le Créateur",
	"Enrise"], 

["Qui va éradiquer Shiryō ?",
	"Flare",
	"Freed",
	"Le Créateur",
	"Exodd"], 

["Comment Ssōm est-il vaincu ?",
	"Moss reprend conscience",
	"Matt le tue",
	"Flare le tue",
	"Ssōm n'est pas vaincu"] 
 
	];
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
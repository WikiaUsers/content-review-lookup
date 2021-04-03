/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

//======= User Tags ===========
//window.UserTagsJS = {
//	modules: {},
//	tags: {
//		FORMAT= groupe: { tag associé }
//		parrain: { u:'Parrain' },
//		filleul: { u:'Filleul' }
//	}
//};

//UserTagsJS.modules.custom = {
//	'Yukitwane': ['parrain'],
//    'Bichoune0612': ['parrain'],
//	'La Pieuvre': ['parrain']
//};
//UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
//UserTagsJS.modules.inactive = {
//	days: 365,
//	zeroIsInactive: true  // 0 modifications est considéré comme inactif
//};
// END User Tags
// ============================================================




//======= Quiz ===========
// Variables Quiz
var quizName = "Quiz";
var quizLang = "fr";
// Resultats finaux, du moins bon au meilleur
var resultsTextArray = [ 
	"Bouh. Tu as tout faux. As-tu vraiment tout oublié ?",
	"Mouais, tu peux mieux faire.",
	"Ça va, tu t'en es pas trop mal tiré.",
	"Bravo, t'as tout bon ! T'es vraiment incollable !" 
	];
var questions = [
//Question, puis bonne réponse, et mauvaises réponses 
	["Qui est secrétaire du maire dans Animal Crossing: New Leaf ?",
	"Marie",
	"Max",
	"Risette",
	"Tom Nook"],
 
	["Qu'est-ce qui n'est pas une personnalité ?",
	"Intello",
	"Sportif",
	"Arrogant",
	"Versatile"],
 
	["Laquelle de ces espèces n'est pas présente dans Animal Crossing: New Leaf ?",
	"Lézard à collerette",
	"Lapin",
	"Panthère noire",
	"Fourmilier"],

	["Comment s'appelle le vendeur de chaussures ?",
	"Blaise",
	"Blair",
	"Blazel",
	"Blanche"],

	["Lequel de ces chiens n'est pas un personnage spécial ?",
	"Mirza",
	"Maret",
	"Joe",
	"Shivava"],

	["Quelles sont les personnalités des deux villageois de départ dans Animal Crossing: New Horizons ?",
	"Grande sœur et sportif",
	"Chic et arrogante",
	"Versatile et normale",
	"Paresseux et vive"],

	["Opélie et Elisabec sont...",
	"Sœurs",
	"Amies",
	"Cousines",
	"Mère et fille"],

	["Quel est le travail de Carla ?",
	"Styliste",
	"Agent immobilier",
	"Vendeuse de tapis",
	"Chanteuse"],

	["Quel boutique n'a jamais existé ?",
	"L'hôtel Nook",
	"La boutique des Sœurs doigts de fée",
	"Le magasin de Méli et Mélo",
	"Le magasin de jardinage"],

	["Qu'est-ce qui n'est jamais à vendre dans le catalogue ?",
	"Les fossiles",
	"Les masques",
	"Les sets de meubles",
	"Les plantes d'intérieur"],

	["Qu'est-ce qui n'est pas une collection ?",
	"Les détritus",
	"Les œuvres d'art",
	"Les chansons de Kéké",
	"Les poissons"],

	["Quel est le dernier jeu de la série ?",
	"Animal Crossing: New Horizons",
	"Animal Crossing: Happy Home Designer",
	"Animal Crossing: Amiibo Festival",
	"Animal Crossing: Pocket Camp"],

	["Quel événement n'existe pas ?",
	"La fête de la musique",
	"Halloween",
	"Le carnaval",
	"Le jour des cadeaux"],

	["Le moyen de transport pour se rendre au centre-ville dans Animal Crossing: Let's Go to the City est ?",
	"Le bus",
	"Le taxi",
	"Le train",
	"Le bateau"],

	["Sur quelle plateforme le premier Animal Crossing est-il sorti ?",
	"Sur Nintendo 64",
	"Sur Nintendo DS",
	"Sur Nintendo Wii",
	"Sur Nintendo GameCube"],

	["Sur quelle plateforme le dernier Animal Crossing est-il sorti ?",
	"Sur Nintendo Switch",
	"Sur Nintendo Wii U",
	"Sur Nintendo 3DS",
	"Sur PlayStation 4"],

	["Qu'est-ce qui n'est pas consommable ?",
	"Un gâteau de mariage",
	"Une noix de coco",
	"Une pièce en chocolat",
	"Une sucette"],

	["Qu'est-ce qui n'est pas un projet public dans Animal Crossing: New Leaf ?",
	"Le distributeur",
	"Le lampadaire",
	"La chaise de jardin",
	"Le banc jaune"],

	["Dans Animal Crossing: Wild World, les nuits phares consistent à ?",
	"Illuminer sa maison",
	"Mettre des fleurs autour de sa maison",
	"Ne pas dormir de la nuit",
	"Chasser des insectes la nuit"],

	["Que ne peut-on pas faire via le DAC du bureau de poste ?",
	"Faire un don",
	"Rembourser son prêt",
	"Convertir des Bons de Commerce",
	"Retirer des Clochettes"],

	["Qu'y a-t-il devant la maison du joueur dans Animal Crossing ?",
	"Un gyroïde",
	"Le panneau d'affichage",
	"Une poubelle",
	"Un panneau d'interdiction"],

	["Quelle nouveauté a testé Animal Crossing: Happy Home Designer ?",
	"Les cartes amiibo",
	"Les amiibo",
	"Les cartes e-reader",
	"Aucune"],

	["Le premier singe est apparu dans...",
	"Animal Crossing (GameCube)",
	"Animal Crossing: Let's Go to the City",
	"Animal Crossing: Wild World",
	"Animal Crossing: New Leaf"],

	["Qui n'est pas un chat ?",
	"Chulin",
	"Rougepif",
	"Tigri",
	"Cathie"],

	["Qu'est-ce qui n'est pas une série de meubles ?",
	"Pin",
	"Chalet",
	"Patchwork",
	"Bonbon"],

	["Quelle est la particularité d'Animal Crossing Plaza ?",
	"C'est un jeu exclusivement en ligne",
	"Il a coûté très cher en développement",
	"C'est le seul jeu sorti sur 3DS",
	"Il s'est très mal vendu"],

	["Quelle espèce compte le plus de représentants ?",
	"Les chiens",
	"Les chats",
	"Les lapins",
	"Les oursons"],

	["Combien y a-t-il eu de jeux exclusivement japonais ?",
	"Trois",
	"Quatre",
	"Deux",
	"Un"],

	["Quel est le plus gros scarabée ?",
	"Scarabée Hercule",
        "Scarabée Goliath",
	"Lucane cerf-volant",
	"Scarabée kabuto"],

	["De quelle licence de Nintendo n'y a-t-il pas de référence dans au moins un Animal Crossing ?",
	"Kirby",
	"Metroid",
	"The Legend of Zelda",
	"Wii Fit"],
 
	];

// Code Quiz - ne pas toucher
(function($) {
	'use strict';
	var translations = {
		// English
		en: {
			nxtBtn: "Next",
			rplBtn: "Replay",
			resultsHeader: "Results",
			noQuestionsHeader: "No questions provided"
		},
		// Deutsch
		de: {
			nxtBtn: "Weiter",
			rplBtn: "Wiederholen",
			resultsHeader: "Ergebnisse",
			noQuestionsHeader: "Keine Fragen bereitgestellt"
		},
		// Français
		fr: {
			nxtBtn: "Suivant",
			rplBtn: "Rejouer",
			resultsHeader: "Résultats",
			noQuestionsHeader: "Aucune question posée"
		},
                // Spanish
		es: {
			nxtBtn: "Siguiente",
			rplBtn: "Repetir",
			resultsHeader: "Resultados",
			noQuestionsHeader: "No hay preguntas proporcionadas"
		},
		// Polski
		pl: {
			nxtBtn: "Dalej",
			rplBtn: "Ponów",
			resultsHeader: "Wyniki",
			noQuestionsHeader: "Nie wpowadzono pytań"
		},
		// Mandarin
		zh: {
			nxtBtn: "下一题",
			rplBtn: "再来一次",
			resultsHeader: "结果",
			noQuestionsHeader: "题库中还没有题"
		}
	};
 
	function msg(name) {
        if (quizLang in translations && name in translations[quizLang]) {
            return translations[quizLang][name];
        }
        return translations.en[name];
    }
 
	var score = 0;
	var currentQuestion = 0;
	var secondsSince = 0;
	var minutesSince = 0;
	var questionsAmount = questions.length;
	var startCounterVar;
	$.fn.randomize = function(selector) {
		(selector ? this.find(selector) : this).parent().each(function() {
			$(this).children(selector).sort(function() {
				return Math.random() - 0.5;
			}).detach().appendTo(this);
		});
		return this;
	};
 
	$(document).ready(function() {
		if ($('#quizQ').length > 0) {
		console.log($('#quizQ').length);
			//var quizQStylesheetURL = "/load.php?mode=articles&articles=MediaWiki:Common.css&only=styles";
			//var quizQStylesheetURL = "/load.php?mode=articles&articles=u:dev:Quiz/code.css&only=styles";
			//$(document.head).append('<link rel="stylesheet" type="text/css" href="' + quizQStylesheetURL + '" />');
			$('div#quizQ').append('<div id="quizBlockWrapper"></div><div id="quizBlock"><h3 id="quizName"></h3><div id="questionBlock"><h4 id="question"></h4><form id="questionForm" name="questionForm"></form></div><div id="nxtBtnWrapper"><h3 id="nxtBtn"></h3></div><div id="questionCounter"></div></div><div id="quizCountdown"></div><div id="quizBackground"></div>');
			$('#quizQ #quizName').text(quizName);
			if (questionsAmount > 0) {
				$('#quizQ #nxtBtn').on('click', function() {
					$('#quizQ #nxtBtn').removeClass('nxtBtnActive');
					if ($('#quizQ #questionForm input:checked').length > 0 || currentQuestion === -1) {
						updateScore();
						$('#quizQ #questionBlock').fadeOut(200, updateForm);
						$('#quizQ #questionBlock').fadeIn(200);
					}
				});
				$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
				$('#quizQ #nxtBtn').text(msg("nxtBtn"));
				createform();
				$('#quizQ #questionBlock').on('click', function() {
					if ($('#quizQ #questionForm input:checked').length > 0) {
						$('#quizQ #nxtBtn').addClass('#quizQ nxtBtnActive');
					}
				});
			} else {
				$('#quizQ #question').html('<div id="resultsHeader" style="text-align:center">' + msg("noQuestionsHeader") + '</div>');
			}
		}
	});
 
	function createform() {
		var currentQuestionArray = questions[currentQuestion];
		$('#quizQ #question').text(currentQuestionArray[0]);
		$.each(currentQuestionArray, function(i, v) {
			if (i < 1) {
				return true;
			}
			$('#quizQ #questionForm').append('<div id="answerWrapper"><input id="answer' + i + '" name="answer" type="radio" value="' + i + '" /><label for="answer' + i + '">' + v + '</label></div>');
		});
		$('#answerWrapper').randomize();
	}
 
	function updateScore() {
		if (currentQuestion !== -1) {
			var submittedAnswer = $('#quizQ #questionForm input:checked + label').text();
			var currentQuestionArray = questions[currentQuestion];
			var correctAnswer = currentQuestionArray[1];
			if (correctAnswer === submittedAnswer) {
				score++;
			}
		} else {
			score = 0;
		}
	}
 
	function updateForm() {
		currentQuestion++;
		if (currentQuestion < questionsAmount) {
			$('#quizQ #questionForm').empty();
			createform();
			$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
		}
		if (currentQuestion === questionsAmount) {
			currentQuestion = -1;
			$('#quizQ #questionForm').empty();
			$('#quizQ #questionCounter').text("");
			$('#quizQ #question').html('<div id="resultsHeader">' + msg("resultsHeader") + ':' + '<br />' + Math.round(score / questionsAmount * 100) + '% (' + score + '/' + questionsAmount + ')</div>');
			var finalScore = score / questionsAmount;
			var resultsFraction = 1 / resultsTextArray.length;
			var resultsText;
			$.each(resultsTextArray, function(i, v) {
				if (finalScore >= resultsFraction * i) {
					resultsText = v;
				}
			});
			$('#quizQ #questionBlock').append('<div id="resultsText">' + resultsText + '</div>');
			$('#quizQ #nxtBtn').text(msg("rplBtn")).addClass('nxtBtnActive');
		}
		if (currentQuestion === 0) {
			$('#quizQ #resultsText').remove();
			$('#quizQ #nxtBtn').text(msg("nxtBtn")).removeClass('nxtBtnActive');
			$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
		}
	}
})(jQuery);

// END Quiz
// ============================================================
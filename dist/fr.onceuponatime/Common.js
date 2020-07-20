/*
 * Ajout d'un sous-titre
 *
 * Fonction utilisée par [[Modèle:Sous-titre]]
 *
 * La fonction cherche un élément de la forme
 * <span id="sous_titre_h1">Sous-titre</span>
 

function sousTitreH1( $content ) {
	$( '#firstHeading > #sous_titre_h1' ).remove();
	var $span = $content.find( '#sous_titre_h1' );
	if ( $span.length ) {
		$span.prepend( ' ' );
		$( '#firstHeading' ).append( $span );
	}
}
mw.hook( 'wikipage.content' ).add( sousTitreH1 );
*/
/* Tags message Forums/Commentaires */
window.MessageWallUserTags = {
    tagColor: '#000',
    glow: false,
    users: {
        'Fan_de_Lost': 'Fondateur',
        'Rwo': 'Bureaucrate',
        'EvilWitch': 'Admin'

    }
};

/* Actualisation auto. */
window.ajaxPages = ["Spécial:RecentChanges","Spécial:WikiActivity"];
window.AjaxRCRefreshText = 'Actualisation auto.'; 
window.AjaxRCRefreshHoverText = 'Actualise automatiquement la page'; 
window.ajaxRefresh = 15000;

window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers Saison 4');
    }
};

//======= Quiz ===========
// Variables Quiz
var quizName = "Quiz",
    quizLang = "fr",
// Resultats finaux, du moins bon au meilleur
    resultsTextArray = [ 
	"Tes souvenirs semblent avoir été effacés.<br/>Besoin d'une potion de mémoire ?",
	"Un bon petit début, dirons-nous.",
	"Tu y es presque !<br/>Mais il te manque quelque chose…",
	"Bravo, très chèr(e) !<br/>Tes connaissances égaleraient presque celles de Merlin l'Enchanteur !" 
	],
    questions = [
//Question, puis bonne réponse, et mauvaises réponses 
	["Quel est le titre de la franchise traitée sur ce wiki ?",
	"<i>Once Upon a Time</i>",
	"<i>Twice Upon a Time</i>",
	"<i>One More Time</i>",
	"<i>Ever After High</i>"],
 
	["Quel est le nom de la Malédiction lancée par la Méchante Reine ?",
	"Le Sort noir",
	"Le Sortilège des Mille Éclats",
	"Le Charme du Sommeil",
	"La Grande Réécriture"],
 
	["Lequel de ces personnages de contes n'a pas été touché par la Malédiction ?",
	"Pinocchio",
	"Le Prince Charmant",
	"Rumplestiltskin",
	"Le <i>Chapelier Fou</i>"],
 
	["Quel est le vrai nom du Prince Charmant ?",
	"David",
	"James",
	"Florian",
	"Charmant… ?"],
 
	["Complétez la phrase : « La magie…",
	"… a toujours un prix. »",
	"… n'a pas de prix. »",
	"… n'a pas d'odeur. »",
	"… et les couleurs, ça ne se discute pas. »"],
 
	["Quelle heure l'horloge de la ville affiche-t-elle continuellement tout au long de la série ?",
	"8H15",
	"9H45",
	"4H16",
	"11H42"],
 
	["La Méchante Reine et la Méchante Sorcière de l'Ouest sont…",
	"Demi-sœurs",
	"Mariées",
	"Cousines",
	"Mère et fille"],
 
	["Quel est le personnage de contes incarné par Cora dans sa jeunesse ?",
	"La fille du meunier d'après <i>Rumplestiltskin</i> ou <i>Le Nain Tracassin</i>",
	"La <i>Reine de Cœur</i> d'après <i>Alice au Pays des Merveilles</i>",
	"La <i>Reine Rouge</i> d'après <i>De l'Autre Côté du Miroir</i>",
	"La <i>Méchante Reine</i> d'après <i>Blanche-Neige</i>"],
 
	["Quel film Disney n'a jamais été adapté ?",
	"<i>Le Roi Lion</i>",
	"<i>Peter Pan</i>",
	"<i>Aladdin</i>",
	"<i>La Petite Sirène</i>"],
 
	["De quel couleur sont les souliers magiques de Dorothy ?",
	"Argent",
	"Or",
	"Rubis",
	"Saphir"],
 
	["Quel est le lien entre Ingrid et les sœurs Elsa et Anna ?",
	"Elle est leur tante",
	"Elle est leur vraie mère",
	"Elle est leur nourrice",
	"Elle est leur grand-mère"],
 
	["Qu'arrive-t-il à une mauvaise fée ?",
	"Elle est privée de ses ailes et de sa baguette",
	"Elle est exilée au Pays Imaginaire",
	"Elle est exécutée",
	"Il n'existe pas de « mauvaise fée »"],
 
	["De qui Mulan est-elle amoureuse ?",
	"Aurore",
	"Phillip",
	"Shan Yu",
	"Li Shang"],
 
	["Dans quel État américain se situe Storybrooke ?",
	"Dans le Maine",
	"Dans le Massachusetts",
	"Dans l'État de New York",
	"En Californie"],
 
	["Quelle heure était-il lorsque August Booth se réveilla soudainement à Phuket après l'arrivée d'Emma à Storybrooke ?",
	"8H15",
	"20H15",
	"10H15",
	"16H15"],
 
	["Quel est le numéro de la page du livre de contes représentant Regina et Robin en train de s'embrasser ?",
	"23",
	"42",
	"108",
	"Une telle page n'existe pas"],
 
	["Qu'arrive-t-il à la marraine-fée de Cendrillon ?",
	"Elle explose",
	"Elle renie Cendrillon",
	"Elle va elle-même au bal",
	"Elle n'existe pas"],
 
	["Quel est le nom du chef des Trolls de pierre ?",
	"Grand Pabbie",
	"Grand Papy",
	"Grandpa Caillou",
	"George Everest"],
 
	["Où Alice cache-t-elle ses souhaits ?",
	"Dans son talon de chaussure",
	"Dans une bouteille",
	"Dans un gâteau",
	"Dans son corset"],
 
	["Quel est le nom de la Méchante Sorcière de l'Ouest ?",
	"Zelena",
	"Theodora",
	"Elphaba",
	"Elle est anonyme"],
 
	["Qu'est-il arrivé à l'appartement d'Emma à Boston selon ses faux souvenirs ?",
	"Il a brûlé dans un incendie",
	"Il a été démoli",
	"Il n'a jamais existé",
	"Il a été réquisitionné"],
 
	["De quelle saga cinémathographique sont fans Kurt et Owen Flynn ?",
	"<i>Star Wars</i>",
	"<i>Le Seigneur des Anneaux</i>",
	"<i>Jurassic Park</i>",
	"<i>Harry Potter</i>"],
 
	["De quel film s'inspire l'intrigue du final de la saison 3 ?",
	"<i>Retour Vers le Futur</i>",
	"<i>Tron</i>",
	"<i>La Reine des Neiges</i>",
	"<i>Retour à Oz</i>"],
 
	["Quel est le prénom de M. Gold ?",
	"Il n'a pas de prénom",
	"Rumplestiltskin",
	"Adam",
	"Robert"],
 
	["Qui apparaît régulièrement en caméo dans la boutique de M. Gold ?",
	"Mickey Mouse",
	"Woody",
	"Winnie l'Ourson",
	"Buzz l'Éclair"],
 
	["Quel est le secret des lasagnes de chez Granny ?",
	"Elles sont surgelées",
	"Elles contiennent de la chair humaine",
	"Elles sont préparées avec amour",
	"Elles sont magiques"],
 
	["Quelle est la fin heureuse convoitée par Cruella d'Enfer ?",
	"Pouvoir tuer",
	"Un manteau de fourrure en peaux de 101 bébés dalmatiens",
	"Un océan de gin",
	"Trouver le Véritable Amour"],
 
	["Qui est l'arrière-grand-père paternel de Henry Mills ?",
	"Peter Pan",
	"Rumplestiltskin",
	"Le Roi Arthur",
	"Le Capitaine Crochet"],
 
	["Qui fut Auteur du livre de contes ?",
	"Walt Disney",
	"August Booth",
	"Emma Swan",
	"Adam Horowitz"],
 
	["Qui est LE Sorcier ?",
	"Merlin l'<i>Enchanteur</i>",
	"Yen Sid",
	"Le <i>Grand Magicien</i> d'Oz",
	"Rumplestiltskin"],
 
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
 
	var score = 0,
        currentQuestion = 0,
        secondsSince = 0,
        minutesSince = 0,
        questionsAmount = questions.length,
        startCounterVar;
	$.fn.randomize = function(selector) {
		(selector ? this.find(selector) : this).parent().each(function() {
			$(this).children(selector).sort(function() {
				return Math.random() - 0.5;
			}).detach().appendTo(this);
		});
		return this;
	};
 
	$(function() {
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
//fin du code quiz
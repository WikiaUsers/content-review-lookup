/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

importScriptPage('BackToTopButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:Message/code.js'
    ]
});

//======= Quiz ===========
// Variables Quiz
var quizName = "Quiz";
var quizLang = "fr";
// Resultats finaux, du moins bon au meilleur
var resultsTextArray = [ 
	"Oula...?!",
	"Mouais....",
	"Pas mal!",
	"BRAVO!!!" 
	];
var questions = [
//Question, puis bonne réponse, et mauvaises réponses 
	[" Quel volume est nécessaire pour acceuillir des poissons rouges? ",
	"250l",
	"5l",
	"20l",
	"800l"],
 
	[" Quel poisson n'est pas un characidé?",
	"Le Gourami bleu ",
	"Le tétra néon",
	"Le nez rouge",
	"La veuve noire"],
 
	["Quelle poisson couteau n'est pas un Notoptéridé?",
	"Le poisson couteau américain",
	"La poisson couteau africain",
	"Le poisson couteau ocellé",
	"La murène étoilée"],
 
	["Quel poisson clown n'est pas un Amphiprion ?",
	"Le poisson clown épineux",
	"Le poisson clown à trois bandes",
	"Le poisson clown à collier",
	"Le poisson clown noir"],
 
	["Quel M'Bunas est le moins agressif ?",
	"Le labido jaune",
	"Le Cichlidé cobalt",
	"Pseudotropheus elongatus",
	"Maylandia estherae"],

 
	];
// Code Quiz - ne pas toucher
(function($) {
	'use strict';
	var translations = {
		// English
		en: {
			nxtBtn: "Continue",
			rplBtn: "Refresh",
			resultsHeader: "Finished",
			noQuestionsHeader: "No questions provided"
		},
		// Deutsch
		de: {
			nxtBtn: "Fortsetzen",
			rplBtn: "Erfrischen",
			resultsHeader: "Abgeschlossen",
			noQuestionsHeader: "Keine Fragen bereitgestellt"
		},
		// Français
		fr: {
			nxtBtn: "Continuer",
			rplBtn: "Rafraîchir",
			resultsHeader: "Terminé",
			noQuestionsHeader: "Aucune question posée"
		},
                // Spanish
		es: {
			nxtBtn: "Continuar",
			rplBtn: "Refrescar",
			resultsHeader: "Terminado",
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

//fin du code quiz

importArticle(
	{type:'script', 
	article:[
		'w:c:dev:UserTags/code.js',
	]
});
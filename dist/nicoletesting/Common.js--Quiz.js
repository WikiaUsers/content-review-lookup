/* <source lang="javascript"> */
/**
 * This script will add a single-choice quiz to your wiki
 * Written by Sovq // Customized by Queennicolee
 * Released to the public domain, no attribution required - feel free to copy and use as desired
 * Installation instructions on http://dev.wikia.com/wiki/Quiz
 */

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
			var quizQStylesheetURL = "/load.php?mode=articles&articles=u:dev:Quiz/code.css&only=styles";
			$(document.head).append('<link rel="stylesheet" type="text/css" href="' + quizQStylesheetURL + '" />');
			$('div#quizQ').append('<div id="quizBlockWrapper"></div><div id="quizBlock"><h3 id="quizName"></h3><div id="questionBlock"><h4 id="question"></h4><form id="questionForm" name="questionForm"></form></div><div id="nxtBtnWrapper"><h3 id="nxtBtn"></h3></div><div id="questionCounter"></div></div><div id="quizCountdown"><div id="quizhourglass"></div><div id="quiztimer"></div></div><div id="quizBackground"></div>');
			startCounter();
			floatHourglass();
			summonBigClouds();
			summonSmallClouds();
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
			clearTimeout(startCounterVar);
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
			secondsSince = 0;
			minutesSince = 0;
			startCounter();
			$('#quizQ #resultsText').remove();
			$('#quizQ #nxtBtn').text(msg("nxtBtn")).removeClass('nxtBtnActive');
			$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
		}
	}

	function startCounter() {
		if (secondsSince > 59) {
			secondsSince = 0;
			minutesSince += 1;
		}

		function checkTime(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}
		var mAdjusted = checkTime(minutesSince);
		var sAdjusted = checkTime(secondsSince);
		$('#quizQ #quiztimer').text(mAdjusted + ':' + sAdjusted);
		secondsSince += 1;
		startCounterVar = setTimeout(function() {
			startCounter();
		}, 1000);
	}

	function floatHourglass() {
		$('#quizQ #quizhourglass').animate({
			top: "-=20px"
		}, 1000).animate({
			top: "+=20px"
		}, 1000);
		setTimeout(function() {
			floatHourglass();
		}, 2000);
	}

	function summonBigClouds() {
		var randomHeight = Math.random() * 500 - 70;
		$('<div style="background:url(https://images.wikia.nocookie.net/nicolee/images/8/8c/Love_me_badge.png); width:150px; height:79px; z-index:2; position:absolute; right:-150px;"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
			"right": "+=850px"
		}, 20000, function() {
			$(this).remove();
		});
		setTimeout(function() {
			summonBigClouds();
		}, 4000);
	}

	function summonSmallClouds() {
		var randomHeight = Math.random() * 500 - 35;
		$('<div style="background:url(https://images.wikia.nocookie.net/nicolee/images/4/46/Kyoko_mogami.gif); width:75px; height:40px; z-index:1; position:absolute; right:-75px;"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
			"right": "+=800px"
		}, 30000, function() {
			$(this).remove();
		});
		setTimeout(function() {
			summonSmallClouds();
		}, 5000);
	}
})(jQuery);
/* </source> */
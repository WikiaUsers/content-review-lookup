var SocialMediaButtons = { 
 position: "bottom",
 colorScheme: "color",
 buttonSize: "55px"
};
importScriptPage('SocialIcons/code.js','dev');

/* <source lang="javascript"> */
/**
 * This script will add a single-choice quiz to your wiki
 * Written by Sovq
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
		$('<div style="background:url(https://images.wikia.nocookie.net/__cb20150123101504/pad/zh/images/8/85/150123news05.jpg); width:150px; height:79px; z-index:2; position:absolute; right:-150px;"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
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
		$('<div style="background:url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/7gAOQWRvYmUAZAAAAAAB/+EAFkV4aWYAAE1NACoAAAAIAAAAAAAA/+wAEUR1Y2t5AAEABAAAADwAAP/hA4NodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAyMSA3OS4xNTQ5MTEsIDIwMTMvMTAvMjktMTE6NDc6MTYgICAgICAgICI+DQoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4NCgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGRDA0OTAyN0YyMEYxMUUzOUYzQ0EyNUY4RTBCNTJCNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNjAxNUMxNDlDNzQxMUU0QjZCRDkwMkE4Q0U3NTg5MCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNjAxNUMxMzlDNzQxMUU0QjZCRDkwMkE4Q0U3NTg5MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4NCgkJCTx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRjMjA5MjBlLTdlMjEtYTE0Yi1hMjQ4LTk0MTAzYTFmYmExMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRDA0OTAyN0YyMEYxMUUzOUYzQ0EyNUY4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); width:75px; height:40px; z-index:1; position:absolute; right:-75px;"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
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
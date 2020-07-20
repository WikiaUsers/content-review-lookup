/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, 
 bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, 
 unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
 
(function (module) {
 
    'use strict';
 
    /*!
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     *
     */
 
    // @win window reference
    // @fn function reference
    function contentLoaded(win, fn) {
 
        var done = false, top = true,
 
        doc = win.document, root = doc.documentElement,
 
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',
 
        init = function(e) {
            if (e.type === 'readystatechange' && doc.readyState !== 'complete') return;
            (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },
 
        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };
 
        if (doc.readyState === 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    }
 
    var callbacks = [], ready = false;
    contentLoaded(window, function () {
        ready = true;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](window.mediaWiki || {}, window.jQuery || window.$);
        }
    });
 
    module.ready = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('expected function as parameter');
        }
        if (ready) {
            callback(window.mediaWiki || {}, window.jQuery || window.$);
        } else {
            callbacks.push(callback);
        }
    };
 
}((window.dev = window.dev || {}).verbatim = window.dev.verbatim || {}));
window.dev.verbatim.ready(function (mw, $) {
(function($) {
	'use strict';
	var translations = {
		// English
		en: {
			nxtBtn: "Next",
			rplBtn: "Replay",
			resultsHeader: "Result",
			noQuestionsHeader: "No Question Provided"
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
			rplBtn: "再试一次",
			resultsHeader: "结果",
			noQuestionsHeader: "题库中没有问题"
		}
	};
	function addNewSection( summary, content, editToken ) {
	    $.ajax({
	        url: mw.util.wikiScript( 'api' ),
	        data: {
	            format: 'json',
	            action: 'edit',
	            title: 'Portal:'+mw.config.get( 'wgPageName' )+'/score',
	            section: 'new',
	            summary: summary,
	            text: content,
	            token: mw.user.tokens.get('editToken')
	        },
	        dataType: 'json',
	        type: 'POST',
	        success: function( data ) {
	            if ( data && data.edit && data.edit.result == 'Success' ) {
	                //window.location.reload(); // reload page if edit was successful
	            } else if ( data && data.error ) {
	                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
	            } else {
	                alert( 'Error: Unknown result from API.' );
	            }
	        },
	        error: function( xhr ) {
	            alert( 'Error: Request failed.' );
	        }
	    });
	}
	function msg(name) {
		return translations.zh[name];
	}

	var score = 0;
	var currentQuestion = 0;
	var secondsSince = 0;
	var minutesSince = 0;
	var questionsAmount = questions.length;
	var startCounterVar;
	var content = '选项：';
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
		content = content+submittedAnswer+'，';
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
		content = (mw.config.get('wgUserName')?mw.config.get('wgUserName') +'得分：$('+finalScore*100+')$<br>'+content:'匿名用户得分：'+finalScore*100+'<br>'+content);
		content = content + "<br>用时："+minutesSince+"分"+secondsSince+"秒";
		if(finalScore==1){
			addNewSection("冰与火之歌毕业", content );
		}else if (finalScore>=0.95){
			addNewSection("维基大神", content );
		}else if (finalScore>=0.75){
			addNewSection("饱读冰火", content );
		}else if (finalScore>=0.5){
			addNewSection("干的漂亮", content );
		}else{
			addNewSection("新的答卷", content );
		}
		content = '选项：'
		

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
	$('<div style="background:url(data:image/png;base64,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); width:150px; height:79px; z-index:2; position:absolute; right:-150px;"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
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
	$('<div style="background:url(data:image/png;base64,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); width:75px; height:40px; z-index:1; position:absolute; right:-75px;"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
		"right": "+=800px"
	}, 30000, function() {
		$(this).remove();
	});
	setTimeout(function() {
		summonSmallClouds();
	}, 5000);
}
})($);
   
});
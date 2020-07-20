(function($) {
    'use strict';
    // @todo Replace with i18n-js
    var translations = {
        // language list - start
        en: { // English
            nxtBtn: 'Next',
            rplBtn: 'Replay',
            resultsHeader: 'Results',
            noQuestionsHeader: 'No questions provided. Please add some in MediaWiki:Common.js.'
        },
        de: { // Deutsch
            nxtBtn: 'Weiter',
            rplBtn: 'Wiederholen',
            resultsHeader: 'Ergebnisse',
            noQuestionsHeader: 'Keine Fragen bereitgestellt'
        },
        es: { // Spanish
            nxtBtn: 'Siguiente',
            rplBtn: 'Repetir',
            resultsHeader: 'Resultados',
            noQuestionsHeader: 'No hay preguntas proporcionadas'
        },
        fr: { // Français
            nxtBtn: 'Suivant',
            rplBtn: 'Rejouer',
            resultsHeader: 'Résultats',
            noQuestionsHeader: 'Aucune question posée'
        },
        pl: { // Polski
            nxtBtn: 'Dalej',
            rplBtn: 'Ponów',
            resultsHeader: 'Wyniki',
            noQuestionsHeader: 'Nie wprowadzono pytań'
        },
        tr: { // Türkçe
            nxtBtn: 'Sonraki',
            rplBtn: 'Tekrar',
            resultsHeader: 'Sonuçlar',
            noQuestionsHeader: 'Sorusu yok. Lütfen MediaWiki:Common.js içine biraz ekleyin.'
        },
        zh: { // Chinese
            nxtBtn: '下一题',
            rplBtn: '再来一次',
            resultsHeader: '结果',
            noQuestionsHeader: '题库中还没有题，请在MediaWiki:Common.js中添加内容。'
        },
        'zh-hans': { // Simplified Chinese
            nxtBtn: '下一题',
            rplBtn: '再来一次',
            resultsHeader: '结果',
            noQuestionsHeader: '题库中还没有题，请在MediaWiki:Common.js中添加内容。'
        },
        'zh-hant': { // Traditional Chinese
            nxtBtn: '下一題',
            rplBtn: '再來一次',
            resultsHeader: '結果',
            noQuestionsHeader: '題庫中還沒有題，請在MediaWiki:Common.js中新增內容。'
        },
        'zh-hk': { // Chinese (Hong Kong)
            nxtBtn: '下一題',
            rplBtn: '再來一次',
            resultsHeader: '結果',
            noQuestionsHeader: '題庫中還沒有題，請在MediaWiki:Common.js中新增內容。'
        },
        'zh-tw': { // Chinese (Taiwan)
            nxtBtn: '下一題',
            rplBtn: '再來一次',
            resultsHeader: '結果',
            noQuestionsHeader: '題庫中還沒有題，請在MediaWiki:Common.js中新增內容。'
        }
        // language list - stop
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
        questionsAmount = 0,
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
            importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:Quiz/code.css'
            });
            $('div#quizQ').append('<div id="quizBlockWrapper"></div><div id="quizBlock"><h3 id="quizName"></h3><div id="questionBlock"><h4 id="question"></h4><form id="questionForm" name="questionForm"></form></div><div id="nxtBtnWrapper"><h3 id="nxtBtn"></h3></div><div id="questionCounter"></div></div><div id="quizCountdown"><div id="quizhourglass"></div><div id="quiztimer"></div></div><div id="quizBackground"></div>');
            startCounter();
            floatHourglass();
            summonBigClouds();
            summonSmallClouds();
            $('#quizQ #quizName').text(quizName);
            questionsAmount = questions.length;
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
                $('#quizQ #nxtBtn').text(msg('nxtBtn'));
                createform();
                $('#quizQ #questionBlock').on('click', function() {
                    if ($('#quizQ #questionForm input:checked').length > 0) {
                        $('#quizQ #nxtBtn').addClass('#quizQ nxtBtnActive');
                    }
                });
            } else {
                $('#quizQ #question').html('<div id="resultsHeader" style="text-align: center;">' + mw.html.escape(msg('noQuestionsHeader')) + '</div>');
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
            $('#quizQ #questionForm').append('<div id="answerWrapper"><input id="answer' + mw.html.escape(String(i)) + '" name="answer" type="radio" value="' + mw.html.escape(String(i)) + '" /><label for="answer' + mw.html.escape(String(i)) + '">' + mw.html.escape(String(v)) + '</label></div>');
        });
        $('#answerWrapper').randomize();
    }
 
    function updateScore() {
        if (currentQuestion !== -1) {
            var submittedAnswer = $('#quizQ #questionForm input:checked + label').text(),
                currentQuestionArray = questions[currentQuestion],
                correctAnswer = currentQuestionArray[1];
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
            $('#quizQ #questionCounter').text('');
            $('#quizQ #question').html('<div id="resultsHeader">' + mw.html.escape(msg('resultsHeader')) + ':<br />' + Math.round(score / questionsAmount * 100) + '% (' + score + '/' + questionsAmount + ')</div>');
            var finalScore = score / questionsAmount,
                resultsFraction = 1 / resultsTextArray.length,
                resultsText;
            $.each(resultsTextArray, function(i, v) {
                if (finalScore >= resultsFraction * i) {
                    resultsText = v;
                }
            });
            $('#quizQ #questionBlock').append('<div id="resultsText">' + mw.html.escape(resultsText) + '</div>');
            $('#quizQ #nxtBtn').text(msg('rplBtn')).addClass('nxtBtnActive');
        }
        if (currentQuestion === 0) {
            secondsSince = 0;
            minutesSince = 0;
            startCounter();
            $('#quizQ #resultsText').remove();
            $('#quizQ #nxtBtn').text(msg('nxtBtn')).removeClass('nxtBtnActive');
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
                i = '0' + i;
            }
            return i;
        }
        var mAdjusted = checkTime(minutesSince),
            sAdjusted = checkTime(secondsSince);
        $('#quizQ #quiztimer').text(mAdjusted + ':' + sAdjusted);
        secondsSince += 1;
        startCounterVar = setTimeout(function() {
            startCounter();
        }, 1000);
    }
 
    function floatHourglass() {
        $('#quizQ #quizhourglass').animate({
            top: '-=20px'
        }, 1000).animate({
            top: '+=20px'
        }, 1000);
        setTimeout(function() {
            floatHourglass();
        }, 2000);
    }
 
    function summonBigClouds() {
        var randomHeight = Math.random() * 500 - 70;
        $('<div class="bigCloud"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
            right: '+=850px'
        }, 20000, function() {
            $(this).remove();
        });
        setTimeout(function() {
            summonBigClouds();
        }, 4000);
    }
 
    function summonSmallClouds() {
        var randomHeight = Math.random() * 500 - 35;
        $('<div class="smallCloud"></div>').css('top', randomHeight).appendTo('#quizQ').animate({
            right: '+=800px'
        }, 30000, function() {
            $(this).remove();
        });
        setTimeout(function() {
            summonSmallClouds();
        }, 5000);
    }
})(jQuery);
/*Courtesy of dev.fandom.com*/
var quizName = "Dumb test";
var quizLang = "en";
var resultsTextArray = [ 
    "wow you are dumb",
    "not bad. for a noob",
    "wow you are smart" 
];
var questions = [
    ["what is the first level of RS?",
    "Massif",
    "Cloud",
    "Sky",
    "Sunny"], 
 
    ["Who is pro",
    "SHAVibe",
    "SHAVibe",
    "Tuan Nguyen lol"],
 
    ["choose one",
    "1",
    "100000000"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
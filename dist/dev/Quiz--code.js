/**
 * This script will add a single-choice quiz to your wiki
 * Code Written by "Sovq"
 * Released to the public domain, no attribution required - feel free to copy and use as desired
 * Installation instructions on "dev.fandom.com/wiki/Quiz"
 */

(function($) {
    'use strict';

    function main( i18n ) {

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
                    article: 'u:dev:MediaWiki:Quiz.css'
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
                    $('#quizQ #nxtBtn').text(i18n.msg( 'nxtBtn' ).plain());
                    createform();
                    $('#quizQ #questionBlock').on('click', function() {
                        if ($('#quizQ #questionForm input:checked').length > 0) {
                            $('#quizQ #nxtBtn').addClass('#quizQ nxtBtnActive');
                        }
                    });
                } else {
                    $('#quizQ #question').html('<div id="resultsHeader" style="text-align: center;">' + mw.html.escape(i18n.msg('noQuestionsHeader').plain()) + '</div>');
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
                $('#quizQ #question').html('<div id="resultsHeader">' + mw.html.escape(i18n.msg('resultsHeader').plain()) + ':<br />' + Math.round(score / questionsAmount * 100) + '% (' + score + '/' + questionsAmount + ')</div>');
                var finalScore = score / questionsAmount,
                    resultsFraction = 1 / resultsTextArray.length,
                    resultsText;
                $.each(resultsTextArray, function(i, v) {
                    if (finalScore >= resultsFraction * i) {
                        resultsText = v;
                    }
                });
                $('#quizQ #questionBlock').append('<div id="resultsText">' + mw.html.escape(resultsText) + '</div>');
                $('#quizQ #nxtBtn').text(i18n.msg('rplBtn').plain()).addClass('nxtBtnActive');
            }
            if (currentQuestion === 0) {
                secondsSince = 0;
                minutesSince = 0;
                startCounter();
                $('#quizQ #resultsText').remove();
                $('#quizQ #nxtBtn').text(i18n.msg('nxtBtn')).removeClass('nxtBtnActive');
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
    }

    importArticle( {
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    } );

    mw.hook( 'dev.i18n' ).add( function( i18nlib ) {
        i18nlib.loadMessages( 'Quiz' ).then( main );
    } );
})(jQuery);
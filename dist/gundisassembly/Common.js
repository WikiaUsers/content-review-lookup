/* Any JavaScript here will be loaded for all users on every page load. */
/* dropdown stuff */
$(function() {
    $('#revolvers').click(function() {
        $('#ChiappaRhino200DS').toggle();
        $('#ColtPython').toggle();
        $('#ColtSingleActionArmy').toggle();
        $('#RugerNewVaquero').toggle();
        $('#RugerOldArmy').toggle();
        $('#RugerSuperRedhawk').toggle();
        $('#SWModel53').toggle();
        $('#SWSchofield').toggle();
    });
});


/* Practice Quiz stuff */
var quiztitle = "Practice Quiz";


 var quiz = [
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020152/gundisassembly/images/a/a3/Sksm5966_q.jpg",
            "choices" : [
                                    "SMLE Mk III",
                                    "DP 27",
                                    "SKS M59/66",
                                    "Stg.44"
                                ],
            "correct" : "SKS M59/66",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020201/gundisassembly/images/a/ae/Steyrscout_q.jpg",
            "choices" : [
                                    "Steyr Scout",
                                    "SIG SG550S",
                                    "HK SL9SD",
                                    "M200"
                                ],
            "correct" : "Steyr Scout",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020131/gundisassembly/images/e/e3/Rugersr9_q.jpg",
            "choices" : [
                                    "S&W Sigma",
                                    "Ruger SR9",
                                    "Jericho",
                                    "XDm"
                                ],
            "correct" : "Ruger SR9",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020010/gundisassembly/images/2/2e/Browningbuckmark_q.jpg",
            "choices" : [
                                    "Browning HP",
                                    "Buck Mark",
                                    "Marlin 336",
                                    "Calico M100"
                                ],
            "correct" : "Buck Mark",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020055/gundisassembly/images/9/9e/Mac10_q.jpg",
            "choices" : [
                                    "MAC-10",
                                    "TEC-9",
                                    "Uzi",
                                    "FN P90"
                                ],
            "correct" : "MAC-10",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020236/gundisassembly/images/4/4c/Winchester1873_q.jpg",
            "choices" : [
                                    "Borchardt",
                                    "Winchester 1873",
                                    "Lewis Gun",
                                    "Mauser 1914"
                                ],
            "correct" : "Winchester 1873",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020227/gundisassembly/images/c/c8/Vz61_q.jpg",
            "choices" : [
                                    "MP5",
                                    "PLR 16",
                                    "HK UMP",
                                    "VZ 61"
                                ],
            "correct" : "VZ 61",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020119/gundisassembly/images/2/2f/Mauserc96_q.jpg",
            "choices" : [
                                    "Borchardt",
                                    "Mauser C96",
                                    "Winchester 1873",
                                    "Mauser 1914"
                                ],
            "correct" : "Mauser C96",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020106/gundisassembly/images/6/61/Marlin336_q.jpg",
            "choices" : [
                                    "Ruger MK II",
                                    "Ruger 22",
                                    "Marlin 336",
                                    "Buck Mark"
                                ],
            "correct" : "Marlin 336",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020209/gundisassembly/images/4/4d/Swmp40_q.jpg",
            "choices" : [
                                    "S&W Sigma",
                                    "Ruger SR9",
                                    "S&W M&P",
                                    "Jericho"
                                ],
            "correct" : "S&W M&P",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612015950/gundisassembly/images/9/96/Atboys_q.jpg",
            "choices" : [
                                    "AT Boys",
                                    "TT",
                                    "Mosin-Nagant",
                                    "Stg.44"
                                ],
            "correct" : "AT Boys",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020000/gundisassembly/images/7/75/Berettacx4storm_q.jpg",
            "choices" : [
                                    "Ruger 22",
                                    "Calico M100",
                                    "Buck Mark",
                                    "CX4 Storm"
                                ],
            "correct" : "CX4 Storm",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020023/gundisassembly/images/0/06/Colt1911_q.jpg",
            "choices" : [
                                    "Colt Hammer",
                                    "Walther PP",
                                    "PM",
                                    "Colt 1911"
                                ],
            "correct" : "Colt 1911",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020142/gundisassembly/images/8/88/Rugersuperredhawk_q.jpg",
            "choices" : [
                                    "Colt Python",
                                    "Ruger Old Army",
                                    "Super Redhawk",
                                    "New Vaquero"
                                ],
            "correct" : "Super Redhawk",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020048/gundisassembly/images/a/ab/Lr300ml_q.jpg",
            "choices" : [
                                    "TAR-21",
                                    "M4",
                                    "HK G36E",
                                    "LR 300 ML"
                                ],
            "correct" : "LR 300 ML",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020218/gundisassembly/images/8/89/Tar21_q.jpg",
            "choices" : [
                                    "SIG SG552",
                                    "TAR-21",
                                    "FAMAS F1",
                                    "Steyr Aug"
                                ],
            "correct" : "TAR-21",
},
{
"image" : "https://images.wikia.nocookie.net/__cb20140612020036/gundisassembly/images/6/6a/Deserteagle_q.jpg",
            "choices" : [
                                    "GSh-18",
                                    "Welrod",
                                    "Jericho",
                                    "Desert Eagle"
                                ],
            "correct" : "Desert Eagle",
},

/* {
"image" : "",
            "choices" : [
                                    "Colt Python",
                                    "S&W M53",
                                    "Chiappa Rhino",
                                    "Ruger Old Army"
                                ],
            "correct" : "Chiappa Rhino",
},
{
"image" : "",
            "choices" : [
                                    "S&W Schofield",
                                    "Webley",
                                    "Colt SA Army",
                                    "Colt Python"
                                ],
            "correct" : "Colt Python",
}, */
     

    ];


 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;

 jQuery(document).ready(function ($) {


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         }
     }

     function nextQuestion() {
         submt = true;
         
         if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
             if ($('#question-image').length == 0) {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
             } else {
                 $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
             }
         } else {
             $('#question-image').remove();
         }
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();


     }


     function processQuestion(choice) {
         if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
             $('.choice').eq(choice).css({
                 'background-color': '#50D943'
             });
             $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
             score++;
         } else {
             $('.choice').eq(choice).css({
                 'background-color': '#D92623'
             });
             $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
         }
         currentquestion++;
         $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
             if (currentquestion == quiz.length) {
                 endQuiz();
             } else {
                 $(this).text('Check Answer').css({
                     'color': '#000'
                 }).off('click');
                 nextQuestion();
             }
         })
     }


     function setupButtons() {
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         })
         $('.choice').on('click', function () {
             picked = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#c1c1c1'
             });
             if (submt) {
                 submt = false;
                 $('#submitbutton').css({
                     'color': '#000'
                 }).on('click', function () {
                     $('.choice').off('click');
                     $(this).off('click');
                     processQuestion(picked);
                 });
             }
         })
     }


     function init() {
         //add title
         if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
             $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
         } else {
             $(document.createElement('h1')).text("Quiz").appendTo('#frame');
         }

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {

             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
             //add image if present
             if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
             }
             $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

             //add choices
             addChoices(quiz[0]['choices']);

             //add submit button
             $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                 'font-weight': 700,
                 'color': '#222',
                 'padding': '20px 0'
             }).appendTo('#frame');

             setupButtons();
         }
     }

     init();
 });
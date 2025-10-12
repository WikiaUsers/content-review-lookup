/* Any JavaScript here will be loaded for all users on every page load. */

//parallax
$(window).scroll(function(){    
    var wScroll=$(this).scrollTop();
    $('.para-content-profile').css({'transform':'translate(0px, '+wScroll/16+'%)'});
    $('.para-content-profile2').css({'transform':'translate(0px, -'+wScroll/16+'%)'});
    $('.bees').css({'transform':'translate(0px, -'+wScroll/14+'%)'});
    $('.checkmark').css({'transform':'translate(0px, -'+wScroll/24+'%)'});
    $('.hstorm').css({'transform':'translate('+wScroll/120+'%, '+wScroll/34+'%)'});
    $('.bokeh').css({'transform':'translate(0px, -'+wScroll+'px)'});
    $('.scrollthing1').css({'transform':'translate(0px, -'+wScroll/5+'%)'});
    $('#scroll-counter').text(wScroll*2);
});
var velocity = 0.15;

function update(){ 
    var pos = $(window).scrollTop(); 
    $('.move-bg').each(function() { 
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px'); 
    }); 
    $('.move-bg-inverted').each(function() { 
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + -Math.round((height - pos) * velocity + 300) + 'px'); 
    }); 
}


$(window).bind('scroll', update);

//Template:Username
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

//BlockLog config
TBL_GROUP = "roblox-en";

///Testing this script
var quizName = "Bee Swarm Simulator's Quiz";
var quizLang = "en";
var resultsTextArray = [ 
    "You better learn more about bees!",
    "You know a little about bees, you rare bee!",
    "All your questions were right. You're a legendary bee!" 
];
var questions = [
    ["Which was the first event bee introduced?",
    "The Bear Bee",
    "The Tabby Bee",
    "The Photon Bee",
    "The Diamond Bee"], 
 
    ["Which of these is a rare bee?",
    "The Hasty Bee",
    "The Baby Bee",
    "The Buble Bee",
    "The Gummy Bee"],
 
    ["Who is the Bee Swarm Simulator's creator?",
    "Onett",
    "Onnet",
    "Onet",
    "Onnett"]
];


importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;
window.lockOldComments.addNoteAbove = true;
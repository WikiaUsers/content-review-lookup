/* Any JavaScript here will be loaded for all users on every page load. */

/* TEMPLATE:USERNAME */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* FIRSTEDITDATE */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:FirstEditDate.js',
    ]
});
/* AUTO CREATE USERPAGE */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoCreateUserPages.js',
    ]
});

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{Userpage}}',
        3: false
    },
    summary: 'Creating my pages',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

/* MSG BLOCK */

window.MessageBlock = {
	title : 'You have been blocked!',
	message : 'You have been blocked for the reason of \'$1\', your ban duration is $2.',
	autocheck : true
};

/* SPOILERS */

window.SpoilerAlertJS = {
    question: 'This section contains spoilers. Would you like to see them?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

/* DISPLAYTITLE */

var DisplayTitle = document.getElementsByClassName("DisplayTitle");
var title =document.getElementsByClassName("page-header__title")[0];
for (var i=0; i<DisplayTitle.length; i++) {
    DisplayTitle[i].innerText = title.innerText;
}

/* QUIZ */

window.quizName = "Quiz";
window.quizLang = "en";
window.resultsTextArray = [ 
    "you kinda suck",
    "not bad kid)",
    "woah good job man" 
];
window.questions = [
    ["how many tickets were there at the time of this quiz",
    "26 tickets",
    "25 tickets",
    "40 tickets",
    "42 tickets"], 

    ["when was ticketmaster added?",
    "march 10th",
    "march 11th",
    "march 9th",
    "march 12th"],

    ["who made this quiz",
    "aslapbattler",
    "i did",
    "peevee",
    "sanszillanime"],
    
    ["whats 2+2",
    "four",
    "three",
    "one",
    "seventeen"],
    
    ["do you like bread",
    "yes",
    "no",
    "maybe",
    "so"],
    
    ["who was the first ticket hero",
    "covert",
    "firestorm",
    "atrophy",
    "surge"],
    
    ["what's the ultimate test",
    "transcendental",
    "this",
    "gateway",
    "the impossible quiz"],
    
    ["how old is the ticketmaster",
    "vintage",
    "old",
    "ancient",
    "living fossil"]
];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
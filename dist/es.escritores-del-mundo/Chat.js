/*===========================*/
/*   Script Configurations   */
/*===========================*/
/* ChatAnnouncements */
// chatAnnouncementsAll = true; //remove comment delimiters to make Chat Announcements script usable for everyone

/* AjaxEmoticons */
ajaxEmoticonsInterval = 60000; //refresh interval

/* ChatDelay */
/*
window.dev = window.dev || {};
window.dev.chatdelay = {
	max: 8, //max delay time
	mainOnly: false //flag for whether implemented for main chat only
};
*/

/*====================*/
/*   Script Imports   */
/*====================*/
importArticles( {
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:ChatModHover/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:AjaxEmoticons/code.js'
        //'u:dev:ChatDelay/code.js'
    ]
} );

/*====================*/
/*   Day/Night Chat   */
/*====================*/

//Switch to night button
var night_button = 'Night Chat';
 
//Switch to day button
var day_button = 'Day Chat';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#FF6600';
 
  //All text Color
    var textColor = '#F2F2F2';
 
  //Self text background color
    var selfTextColor = '#000066';
 
  //Chat background color
    var backgroundColor = '#000066';
 
  //Chat foreground color
    var foregroundColor = '#000066';
 
  //User stats foreground color
    var userStatsColor = '#000066';
//END NIGHT Chat color scheme

//Day and night color schemes
//Written by Foodbandlt
 
function addNightStyle(){
    var styleElement = document.createElement('style');
    styleElement.setAttribute("id", "night");
    styleElement.innerHTML='body{background-color: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColor+';}#WikiaPage, .Write, .Write .message{background-color: '+backgroundColor+';}.rail, .Chat{background-color: '+backgroundColor+'; border-left: 2px solid #ccebff; border-right: 2px solid #ccebff; border-top: 2px solid #ccebff;}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.ChatWindow .UserStatsMenu{border: 3px solid #ccebff;}.Write .message{background-color: #ccebff;}.UserStatsMenu .info{color: #ccebff; background-color:'+userStatsColor+';}';
    $('head').append(styleElement);
}
 
function addDayNightButton() {
    $('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
    if ($('style#night').size() < 1 && $('style#nightUser').size() < 1) {
        addDayStyle();
    }
}
 
function day_night(which) {
    if (which == "night") {
        $('style#day').remove();
        $('.Rail .day-night-div .day-night-button').text(day_button);
        addNightStyle();
    }
    else {
        $('style#night').remove();
        $('.Rail .day-night-div .day-night-button').text(night_button);
        addDayStyle();
    }
}
 
function switch_view() {
    if ($('.Rail .day-night-div .day-night-button').text() == night_button) {
        day_night("night");
    }
    else {
        day_night("day");
    }
}
 
if ($('.Rail .day-night-button').text() === "") {
    addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1) {
    $('.WikiaPage .Rail div:last-child').remove()
}

/* Done*/
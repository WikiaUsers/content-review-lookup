//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
importArticles({
    type: 'script',
    articles: [
        'u:kocka:Emoticons/code.js', // EmoticonsWindow
 
        'u:dev:!kick/code.js',
        'u:dev:AjaxEmoticons/code.js', // AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatPMs.js',
        'u:dev:ChatTags/code.js',
        'u:dev:PrivateMessageAlert/code.js',
        'u:dev:Tabinsert.js', // Tab Insert
 
        'u:su:!mods.js'
    ]
});

 
//Switch to night button
var night_button = 'Switch Chat Skin';
 
//Switch to day button
var day_button = 'Revert to Normal';
 
//
//Alternate Color Scheme
//This is a test, I recomment not activating this if you don't like bright colors
//
  //Link color
    var linkColor = '#ff66ff';
 
  //All text Color
    var textColor = '#fa00ff';
 
  //Self text background color
    var selfTextColor = '#66ff66';
 
  //Chat background color
    var backgroundColor = '#20b2aa';
 
  //Chat foreground color
    var foregroundColor = '#4682b4';
 
  //User stats foreground color
    var userStatsColor = '#87ceeb';
 
//Day and night color schemes
//Written by Foodbandlt
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background-color: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColor+';}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info{background-color:'+userStatsColor+';}';
$('head').append(styleElement);
} 
 
 
function addDayNightButton(){
 
$('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
if ($('style#night').size() < 1 && $('style#nightUser').size() < 1){
addDayStyle();
}
}
 
function day_night(which){
if (which == "night"){
$('style#day').remove();
$('.Rail .day-night-div .day-night-button').text(day_button);
 
addNightStyle();
 
}else{
$('style#night').remove();
$('.Rail .day-night-div .day-night-button').text(night_button);
 
addDayStyle();
}
}
 
 
function switch_view(){
if ($('.Rail .day-night-div .day-night-button').text() == night_button){
day_night("night");
}else{
day_night("day");
}
}
 
 
if ($('.Rail .day-night-button').text() == ""){
addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1){
$('.WikiaPage .Rail div:last-child').remove()
}
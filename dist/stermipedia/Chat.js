importScriptPage("ChatTags/code.js", "dev");
importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('!kick.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:ChatBlockButton/code.2.js',
        // ...
    ]
} );
importArticles({
	type: "script",
	articles: [
		"u:dev:ChatInterwikiLinks/code.js"
	]
});
ajaxEmoticonsInterval = 5000;
importScriptPage('AjaxEmoticons/code.js', 'dev');
//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'Blue';
 
  //All text Color
    var textColor = 'White';
 
  //Self text background color
    var selfTextColor = 'Black';
 
  //Chat background color
    var backgroundColor = 'Black';
 
  //Chat foreground color
    var foregroundColor = 'Black';
 
  //User stats foreground color
    var userStatsColor = 'Black';
 //
//Color scheme for DAY Chat
//
  //Link color
    var linkColor = 'Blue';
 
  //All text Color
    var textColor = 'Black';
 
  //Self text background color
    var selfTextColor = 'White';
 
  //Chat background color
    var backgroundColor = 'White';
 
  //Chat foreground color
    var foregroundColor = 'White';
 
  //User stats foreground color
    var userStatsColor = 'White';
//END DAY Chat color scheme
 
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
 
 
if ($('.Rail .day-night-button').text() === ""){
addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1){
$('.WikiaPage .Rail div:last-child').remove();
}
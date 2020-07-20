/* Import Old-School Monchoman Chat Hacks */
importScriptpage('MediaWiki:ChatHacks.js','dev');

/* Tab Insert */
//importScriptPage('User:Joeytje50/tabinsert.js', 'runescape')

/* Courtesy of the My Little Pony Friendship is Magic Wiki */

//Switch to night button
var night_button = 'Switch to Night Chat';

//Switch to day button
var day_button = 'Switch to Day Chat';

//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#CAD3C8';
 
  //All text Color
    var textColorDay = '#FFFFFF';
 
  //Self text background color
    var selfTextColorDay = '#25CCF7';
 
  //Chat background color
    var backgroundColorDay = '#3B3B98';
 
  //Chat foreground color
    var foregroundColorDay = '#1B9CFC';
 
  //User stats foreground color
    var userStatsColorDay = '#82589F';
 
//END DAY Chat color scheme

//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#FF0000';
 
  //All text Color
    var textColor = '#FFFFFF';
 
  //Self text background color
    var selfTextColor = '#000033';
 
  //Chat background color
    var backgroundColor = '#000000';
 
  //Chat foreground color
    var foregroundColor = '#000000';
 
  //User stats foreground color
    var userStatsColor = '#0000FF';

//END NIGHT Chat color scheme

//Day and night color schemes
//Written by Foodbandlt

function addDayStyle(){
var styleElementDay = document.createElement('style');

styleElementDay.setAttribute("id", "day");
styleElementDay.innerHTML='body{background-color: '+backgroundColorDay+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColorDay+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColorDay+';}.Chat .you{background: '+selfTextColorDay+';}a{color: '+linkColorDay+';}.UserStatsMenu .info{background-color:'+userStatsColorDay+';}';
$('head').append(styleElementDay);
}

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

//Clear chat button

function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}

function clearChat(){
   $('.Chat li').remove();
}

window.onload=addClearChatText();

//END Clear chat button
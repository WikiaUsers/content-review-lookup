// Implements an edit restriction for the chat
// Credit to Sonic News Network and Foodbandlt 
importScriptPage('MediaWiki:ChatEditRestriction.js');
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Bella and the Bulldogs wiki chat!';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// END Chat topic
 
//Switch to night button
var night_button = 'Winter';
 
//Switch to day button
var day_button = 'Holiday';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = 'blue';
 
  //All text Color
    var textColorDay = '#7EC056';
 
  //Self text background color
    var selfColorDay = '#E83F3C';
 
  //Self text background color
    var selfTextColorDay = 'white'; 
 
  //Chat background color
    var backgroundColorDay = '#00D1FF';
 
  //Chat foreground color
    var foregroundColorDay = 'white';
 
  //User stats foreground color
    var userStatsColorDay = '#C9D856';
 
//END DAY Chat color scheme
 
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'black';
 
  //All text Color
    var textColor = 'gray';
 
  //Self text background color
    var selfTextColor = '#00D1FF'; 
 
  //Chat background color
    var backgroundColor = ' ';
 
  //Chat foreground color
    var foregroundColor = '#white'; 
 
  //User stats foreground color
    var userStatsColor = '#2B2B2B';
 
//END NIGHT Chat color scheme
 
//Day and night color schemes
//Written by Foodbandlt
 
function addDayStyle(){
var styleElementDay = document.createElement('style');
 
styleElementDay.setAttribute("id", "day");
styleElementDay.innerHTML='body{background-color: '+backgroundColorDay+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColorDay+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColorDay+' !important;}.Chat .you{background: '+selfColorDay+'; color: '+selfTextColorDay+';}a{color: '+linkColorDay+';}.UserStatsMenu .info{background-color:'+userStatsColorDay+';}';
$('head').append(styleElementDay);
}
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background-color: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColor+' !important;}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info{background-color:'+userStatsColor+';}';
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
 
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button
 
 
// Chat options 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:Chat.js/options.js');
}
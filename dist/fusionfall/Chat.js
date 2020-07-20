// Chat Hacks
importScriptPage('User:Monchoman45/ChatHacks.js', 'c'); 
// End Chat Hacks

/* Tab Insert */

importScriptPage('User:Joeytje50/tabinsert.js', 'runescape');


//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#DFFFFF"> Welcome to the Fusion Fall Wiki chat!</font><br />'



$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#FFFFFF;font-weight:bold;line-height:1.6;margin-left:200px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})

//Switch to night button
var night_button = 'Switch to Special Chat';
 
//Switch to day button
var day_button = 'Switch to Default Chat';

//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#ABABAB';
 
  //All text Color
    var textColorDay = '#CCFFFF';
 
  //Self text background color
    var selfTextColorDay = '#061118';
 
  //Chat background color
    var backgroundColorDay = '#000000';
 
  //Chat foreground color
    var foregroundColorDay = 'url("https://images.wikia.nocookie.net/fusionfall/images/8/8c/Chatbackground.png")';

  //User stats foreground color
    var userStatsColorDay = 'url("https://images.wikia.nocookie.net/fusionfall/images/2/2d/Searchlist2.png")';


  //User chat box color
    var messageColorDay = 'url("https://images.wikia.nocookie.net/fusionfall/images/5/5d/Chattext.png")';
 
  //User stats color
    var userstatsmenuColorDay = '#061018';


//END DAY Chat color scheme


//
//Color scheme for Night Chat
//
  //Link color
    var linkColor = '#03CCFF';

  //All text Color
    var textColor = '#D5D4D4';

  //Self text background color
    var selfTextColor = '#0C151A';

  //Chat background color
    var backgroundColor = '#000000';

  //Chat foreground color
    var foregroundColor = '#020C11';

  //User stats foreground color
    var userStatsColor = '#013240';

  //User chat box color
    var messageColor = '#020C11';

//END Night Chat color scheme

//Day and night color schemes
//Written by Foodbandlt

function addDayStyle(){
var styleElementDay = document.createElement('style');
 
styleElementDay.setAttribute("id", "day");
styleElementDay.innerHTML='body{background: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private {color: '+textColor+';}.Write [name="message"] {color: '+textColor+';}.ChatHeader { background: '+foregroundColor+';} .UserStatsMenu { background: '+userStatsColor+';}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info {background: '+foregroundColor+';}.Write [name="message"] { background: '+messageColor+';}.WikiaPage { background: '+foregroundColor+';}';
$('head').append(styleElementDay);
}

function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background: '+backgroundColorDay+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private {color: '+textColorDay+';}.Write [name="message"] {color: '+backgroundColorDay+';}.ChatHeader { background: '+userStatsColorDay+';} .UserStatsMenu { background: '+userStatsColorDay+';}.Chat .you{background: '+selfTextColorDay+';}a{color: '+linkColorDay+';}.UserStatsMenu .info {background: '+userstatsmenuColorDay+';}.Write [name="message"] { background: '+messageColorDay+';}.WikiaPage { background: '+foregroundColorDay+';}';
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
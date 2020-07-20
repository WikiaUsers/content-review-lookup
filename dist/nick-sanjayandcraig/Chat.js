/*Courtesy of the [[runescape:MediaWiki:Chat.js|Runescape Wiki]]*/
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'You are now in the Frycade. <br>Please Read <a href="Sanjay and Craig Wiki:Code of Conduct" target="_blank">the rules</a>.' 
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<divclass="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#000000;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()


/*Tab Insert*/
importScriptPage('User:Joeytje50/tabinsert.js','runescape')
 
//Everything from this point down was taken from the My Little Pony Wiki.
 
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
 
//Switch to night button

var night_button = 'Hot Chat';
 
//Switch to day button
var day_button = 'Cool chat';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#B2FFFF';
 
  //All text Color
    var textColorDay = '#7FFFD4';
 
  //Self text background color
    var selfTextColorDay = '#2E5894';
 
  //Chat background color
    var backgroundColorDay = '#003366';
 
  //Chat foreground color
    var foregroundColorDay = '#00008B';
 
  //User stats foreground color
    var userStatsColorDay = '#002E63';
 
//END DAY Chat color scheme

//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#FF0800';
 
  //All text Color
    var textColor = '#FFA6C9';
 
  //Self text background color
    var selfTextColor = '#D69CBB';
 
  //Chat background color
    var backgroundColor = '#592720';
 
  //Chat foreground color
    var foregroundColor = '#E4717A';
 
  //User stats foreground color
    var userStatsColor = '#C41E3A';
 
//END NIGHT Chat color scheme

//Day and night color schemes
//Written by JECZKIE13
 
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
 
 
if ($('.Rail .day-night-button').text() == ""){
addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1){
$('.WikiaPage .Rail div:last-child').remove()
}
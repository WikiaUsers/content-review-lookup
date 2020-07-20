@import "http://legocritics.wikia.com/index.php?title=MediaWiki:Chat.js/newmessage.js&action=raw&ctype=text/css";

// Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Brick Critics'
 
//Switch to night button
var night_button = 'Switch to Brick Critics Theme';
 
//Switch to day button
var day_button = 'Switch to Night Mode';
 
//
//Color scheme for Night Chat
//
  //Link color
    var linkColor = 'white';
 
  //All text Color
    var textColor = 'white';
 
  //Self text background color
    var selfTextColor = 'white';
 
  //Chat background color
    var backgroundColor = 'black';
 
  //Chat foreground color
    var foregroundColor = 'black';
 
  //User stats foreground color
    var userStatsColor = 'black';
 
//END Night Chat color scheme
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// Change mod icons depending on the time 
// Written by Foodbandlt
 
function nighttime_moon(){
var night = new Date();
var nighthour=night.getHours();
 
if (nighthour >= 19 || nighthour <= 7){
$(".User.chat-mod .username").removeClass("modday");
$(".User.chat-mod .username").addClass("modnight");
}else{
$(".User.chat-mod .username").removeClass("modnight");
$(".User.chat-mod .username").addClass("modday");
}
 
if ($('.User').size() > 2){
$('.Rail .public .chevron').css("display", "block");
$('.Rail .public .chevron.closed').css("display", "block");
}
 
setTimeout("nighttime_moon()", 10*60*1000);
}
nighttime_moon();
 
//Night themed chat
//Written by Foodbandlt
 
function addDayNightButton(){
var dayNightButton = document.createElement('div');
 
$('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
}
 
function day_night(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background-color: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColor+';}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info{background-color:'+userStatsColor+';}';
$('head').append(styleElement);
}
 
function switch_view(){
if ($('.Rail .day-night-div .day-night-button').text() == night_button){
$('.Rail .day-night-button').text(day_button);
day_night();
}else{
$('.Rail .day-night-div .day-night-button').text(night_button);
$('style#night').remove()
}
}
 
if ($('.Rail .day-night-button').text() == ""){
addDayNightButton();
}
 
 
 
while ($('.Rail .day-night-div').size() > 1){
$('.WikiaPage .Rail div:last-child').remove()
}
 
 
// Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()"   style="margin: 10px auto" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove()
}
 
window.onload=addClearChatText()
 
// END Clear chat button
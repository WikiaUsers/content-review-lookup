//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome To BIGNATE WIKI Chat!'

//Switch to night button
var night_button = Night Mode';
 
//Switch to day button
var day_button = 'Day Mode';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = 'green';
 
  //All text Color
    var textColorDay = '#3A3A3A';
 
  //Self text background color
    var selfTextColorDay = '#DEEACA';
 
  //Chat background color
    var backgroundColorDay = 'black';
 
  //Chat foreground color
    var foregroundColorDay = 'orange';
 
  //User stats foreground color
    var userStatsColorDay = '#BFD5A8';
 
//END DAY Chat color scheme
 
 
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#00FFFF';
 
  //All text Color
    var textColor = 'white';
 
  //Self text background color
    var selfTextColor = '#000066';
 
  //Chat background color
    var backgroundColor = 'black';
 
  //Chat foreground color
    var foregroundColor = '#000033';
 
  //User stats foreground color
    var userStatsColor = '#000066';
 
//END NIGHT Chat color scheme
 
 
 
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
 
 if (nighthour >= 19 || nighthour <= 6){
  if ($('.User.chat-mod .username').hasClass("modday")){
  $(".User.chat-mod .username").removeClass("modday");
  $(".User.chat-mod .username").addClass("modnight");
  }else{
  $(".User.chat-mod .username").addClass("modnight");
  }
 }else{
  if ($('.User.chat-mod .username').hasClass("modnight")){
  $(".User.chat-mod .username").removeClass("modnight");
  $(".User.chat-mod .username").addClass("modday");
  }else{
  $(".User.chat-mod .username").addClass("modday");
  }
 }
 
setTimeout("nighttime_moon()", 10*60*1000);
}
nighttime_moon();
 
//Day and night color schemes
//Written by Foodbandlt
 
function addDayStyle(){
var styleElementDay = document.createElement('style');
 
styleElementDay.setAttribute("id", "day");
styleElementDay.innerHTML='body{background: '+backgroundColorDay+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColorDay+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background: '+foregroundColorDay+';}.Chat .you{background: '+selfTextColorDay+';}a{color: '+linkColorDay+';}.UserStatsMenu .info{background:'+userStatsColorDay+';}';
$('head').append(styleElementDay);
}
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background: '+foregroundColor+';}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info{background:'+userStatsColor+';}';
$('head').append(styleElement);
} 
 
 
function addDayNightButton(){
 
 if ($('.day-night-div').size() == 0){
 $('<div class="day-night-div" onclick="switch_view()"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
 }
 
 if ($('style#night').size() == 0 && $('style#nightUser').size() == 0){
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
 
 
if ($('.Rail .day-night-div').size() == 0){
addDayNightButton();
}
 
 
//Clear chat button
 
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear Chat Page</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
 Coding edits by Westonallen0990 of [[Big Nate Wiki]]
//END Clear chat button
// Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Ice Castle! Please no inappropriate behavior or rude language. Elsa wouldn't like that in here.'
 
//Switch to night button
var night_button = 'Switch to Winter Chat';
 
//Switch to day button
var day_button = 'Switch to Summer Chat';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#00a905';
 
  //All text Color
    var textColorDay = 'Yellow';
 
  //Self text background color
    var selfTextColorDay = '#CCCCCC';;
 
  //Chat background color
    var backgroundColorDay = '#9ce4f4';;
 
  //Chat foreground color
    var foregroundColorDay = '#E0E0E0';
 
  //User stats foreground color
    var userStatsColorDay = 'Silver';
 
//END DAY Chat color scheme
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColorNight = '#21A3C7';
 
  //All text Color
    var textColorNight = '#0A3761';
 
  //Self text background color
    var selfTextColorNight = '#000066';
 
  //Chat background color
    var backgroundColorNight = '#21D4F4';
 
  //Chat foreground color
    var foregroundColorNight = 'Black';
 
  //User stats foreground color
    var userStatsColorNight = 'Silver';
 
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
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button
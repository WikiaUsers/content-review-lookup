// Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Rocqué Records!'
 
//Switch to night button
var night_button = 'night';
 
//Switch to day button
var day_button = 'day';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#000000';
 
  //All text Color
    var textColorDay = '#000000';
 
  //Self text background color
    var selfTextColorDay = 'blue';
 
  //Chat background color
    var backgroundColorDay = '#white';
 
  //Chat foreground color
    var foregroundColorDay = '#red';
 
  //User stats foreground color
    var userStatsColorDay = '#grey';
 
//END DAY Chat color scheme
 
 
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'blue';
 
  //All text Color
    var textColor = 'silver';
 
  //Self text background color
    var selfTextColor = 'black';
 
  //Chat background color
    var backgroundColor = 'black';
 
  //Chat foreground color
    var foregroundColor = '#FFFFFF';
 
  //User stats foreground color
    var userStatsColor = '#FFFFFF';
 
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
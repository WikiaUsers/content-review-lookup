// Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Friendship is Magic Wiki Chat!<br />Please make sure to read the rules and other information <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>here</u></a>.'
 

//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#006CB0';
 
  //All text Color
    var textColorDay = '#000000';
 
  //Self text background color
    var selfTextColorDay = '#f5f5f5';
 
  //Chat background color
    var backgroundColorDay = '#e1e8f2';
 
  //Chat foreground color
    var foregroundColorDay = '#FFFFFF';
 
  //User stats foreground color
    var userStatsColorDay = '#cce1ef';
 
//END DAY Chat color scheme
 
 
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#94E1FB';
 
  //All text Color
    var textColor = '#FFFFFF';
 
  //Self text background color
    var selfTextColor = '#658DFF';
 
  //Chat background color
    var backgroundColor = '#050210';
 
  //Chat foreground color
    var foregroundColor = '#6265BB';
 
  //User stats foreground color
    var userStatsColor = '#0f50B0';
 
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
$('.User.chat-mod[data-user="Foodbandlt"] .username').removeClass('modday').removeClass('modnight');
 
setTimeout("nighttime_moon()", 10*60*1000);
}
nighttime_moon();
 

//Day and night color schemes
//Written by Foodbandlt
 
function addDayStyle(){
var styleElementDay = document.createElement('style');
 
styleElementDay.setAttribute("id", "day");
styleElementDay.innerHTML='body{background: '+backgroundColorDay+' !important;}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColorDay+' !important;}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background: '+foregroundColorDay+' !important;}.Chat .you{background: '+selfTextColorDay+' !important;}a{color: '+linkColorDay+' !important;}.UserStatsMenu .info{background:'+userStatsColorDay+' !important;}';
$('head').append(styleElementDay);
}
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background: '+backgroundColor+' !important;}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+' !important;}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background: '+foregroundColor+' !important;}.Chat .you{background: '+selfTextColor+' !important;}a{color: '+linkColor+' !important;}.UserStatsMenu .info{background:'+userStatsColor+' !important;}';
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
   $('.Chat li').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button
/*
//BEGIN Modvoice modification



$(document).keypress(function(e) {
    if(e.keyCode == 13) {
$('span.message:contains("!!modvoice")').addClass("modVoice");
modVoiceText = $('span.modVoice:last').html();
modifiedModVoice = modVoiceText.replace("!!modvoice", "");
$('span.modVoice:last').html(modifiedModVoice);
}
});


//END Modvoice modification
*/
//Test space

// ********************************************
// Implement edit restriction on chat feature
// Written by Foodbandlt for Sonic News Network
// ********************************************
importScriptPage('MediaWiki:ChatEditRestriction.js');
/*

//banCommand=new models.BanCommand({userToBan:"Sdgsa",time:"7200",reason:"This"}); 
//window.mainRoom.socket.send(banCommand.xport());
*/

// *****************************************
// Disallow editing of designated emote page
// Written by Foodbandlt
// *****************************************
//importScriptPage('MediaWiki:EmoteEditing.js');

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('ChatOptions/code.js','dev');
}
 
// ****************
// END Chat options import
// **
/* Replace picture URL with picture
   By AnimatedCartoons (http://animatedcartoons.wikia.com/wiki/MediaWiki:Chat.js)
   Supports pictures in JPG, PNG, GIF, BMP, TIFF, and SVG format */
setInterval(function () {"use strict"; var picture1 = $('.Chat .message a[href$=".jpg"]').text(); if ($('.Chat .message a:contains(".jpg")')) {$('.Chat .message a[href$=".jpg"]').replaceWith('<img src="' + picture1 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture2 = $('.Chat .message a[href$=".jpeg"]').text(); if ($('.Chat .message a:contains(".jpeg")')) {$('.Chat .message a[href$=".jpeg"]').replaceWith('<img src="' + picture2 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture3 = $('.Chat .message a[href$=".png"]').text(); if ($('.Chat .message a:contains(".png")')) {$('.Chat .message a[href$=".png"]').replaceWith('<img src="' + picture3 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture4 = $('.Chat .message a[href$=".gif"]').text(); if ($('.Chat .message a:contains(".gif")')) {$('.Chat .message a[href$=".gif"]').replaceWith('<img src="' + picture4 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture5 = $('.Chat .message a[href$=".bmp"]').text(); if ($('.Chat .message a:contains(".bmp")')) {$('.Chat .message a[href$=".bmp"]').replaceWith('<img src="' + picture5 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture6 = $('.Chat .message a[href$=".tif"]').text(); if ($('.Chat .message a:contains(".tif")')) {$('.Chat .message a[href$=".tif"]').replaceWith('<img src="' + picture6 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture7 = $('.Chat .message a[href$=".tiff"]').text(); if ($('.Chat .message a:contains(".tiff")')) {$('.Chat .message a[href$=".tiff"]').replaceWith('<img src="' + picture7 + '" />'); } }, 1);
setInterval(function () {"use strict"; var picture8 = $('.Chat .message a[href$=".svg"]').text(); if ($('.Chat .message a:contains(".svg")')) {$('.Chat .message a[href$=".svg"]').replaceWith('<img src="' + picture8 + '" />'); } }, 1);
 
/* Courtesy of the Runescape Wiki */
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Jenny\'s Chat\! Please make sure to read the rules and other information <a href="Teenage_Robot_Wiki:Chat_behavior_and_guidelines">here</a>.'
 
/* Creating /me command */
document.getElementsByName('message')[0].onkeypress = function(e) {
	if (e.which == 32) {
		if (this.value == '/me') {
			this.value = '* '+wgUserName;
		}
	}
}
 
/* Tab Insert */
importScript('User:Joeytje50/tabinsert.js')
 
/* Courtesy of the My Little Pony Friendship is Magic Wiki */
 
//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#FFFFF';
 
  //All text Color
    var textColorDay = '#990000';
 
  //Self text background color
    var selfTextColorDay = '#0066CC';
 
  //Chat background color
    var backgroundColorDay = '#00FFFF';
 
  //Chat foreground color
    var foregroundColorDay = '#0099FF';
 
  //User stats foreground color
    var userStatsColorDay = '#00FF33';
 
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
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   $('.Chat li').remove();
}
 
window.onload=addClearChatText();
 
//END Clear chat button
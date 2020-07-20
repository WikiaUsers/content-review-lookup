/*Courtesy of the [[runescape:MediaWiki:Chat.js|Runescape Wiki]]*/
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'You are now in an Infected Zone. <br>Read  <a href="http://fusionfallfanonsite.wikia.com/wiki/FanonFall_A_FusionFall_Fan_Fiction_Wiki:Discussion_policy" target="_blank">the rules</a> or be teleported out.' 
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<divclass="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#000000;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
/* Creating /me command */ 
document.getElementsByName('message')[0].onkeypress = function(e) {
if (e.which == 32) {
if (this.value == '/me')
{ this.value = '* '+wgUserName; 
}
}
}
 
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
var night_button = 'Switch to Default Chat';
 
//Switch to day button
var day_button = 'Switch to Grid Chat';


//
//Color scheme for DAY Chat
//
  //Link color
    var linkColorDay = '#94E1FB';
 
  //All text Color
    var textColorDay = '#FFFFFF';
 
  //Self text background color
    var selfTextColorDay = '#0A2C51';
 
  //Chat background color
    var backgroundColorDay = '#050210';
 
  //Chat foreground color
    var foregroundColorDay = 'url("https://images.wikia.nocookie.net/fusionfallfanonsite/images/6/60/Grid.png")'

  //User stats foreground color
    var userStatsColorDay = '#0f50B0';
 
//END DAY Chat color scheme


//
//Color scheme for Night Chat
//
  //Link color
    var linkColor = '#FFC000';

  //All text Color
    var textColor = '#FFFAFA';

  //Self text background color
    var selfTextColor = '#143457';

  //Chat background color
    var backgroundColor = '#071427';

  //Chat foreground color
    var foregroundColor = '#0f142f';

  //User stats foreground color
    var userStatsColor = '#3B4940';

//END Night Chat color scheme
 
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
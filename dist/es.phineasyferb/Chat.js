// Credit to Runescape and Call of Duty Wiki


//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.

var chatTopic = '¡Bienvenido al chat de Phineas y Ferb Wiki!</a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()


// Change mod icons depending on the time 
// Written by Foodbandlt

function nighttime_moon(){
var night = new Date();
var nighthour=night.getHours();

if (nighthour >= 19 || nighthour <= 7){
$(".chat-mod .username").removeClass("modday");
$(".chat-mod .username").addClass("modnight");
}else{
$(".chat-mod .username").removeClass("modnight");
$(".chat-mod .username").addClass("modday");
}
setTimeout("nighttime_moon()", 10*60*1000);
}

nighttime_moon();

//Switch to night button
var night_button = 'Modo Nocturno';
 
//Switch to day button
var day_button = 'Modo Diurno';

//
//Color scheme for Night Chat
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

//END Night Chat color scheme
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

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
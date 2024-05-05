/* Tab Insert */
importScript('User:Joeytje50/tabinsert.js', 'runescape')
 
/* Rate Limit */
function setMaxLength(e) {
    if (this.value.length>=1000) {
        this.value = this.value.substring(0,1000);
        if (e.type == 'keypress') {
            e.preventDefault();
            return false;
        }
    }
}
$('[name="message"]').keyup(setMaxLength).keypress(setMaxLength).keydown(setMaxLength);
 
// Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Main Room.'
//Switch to night button
var night_button = 'Switch to Day Chat';
 
//Switch to day button
var day_button = 'Switch to Night Chat';
 
//
//Color scheme for Day Chat
//
  //Link color
    var linkColor = 'Purple';
 
  //All text Color
    var textColor = 'black';
 
  //Self text background color
    var selfTextColor = 'Grey';
 
  //Chat background color
    var backgroundColor = 'Purple';
 
  //Chat foreground color
    var foregroundColor = '#FFFFFF';
 
  //User stats foreground color
    var userStatsColor = '#000080';
 
//END Day Chat color scheme
 
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
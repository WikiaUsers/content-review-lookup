// Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Greetings, This is the Deadliest Fiction Chat! Please make sure to read the rules. <a href="/wiki/Deadliest_Fiction_Wiki:Chat_Policy" target="_blank" title="Deadliest Fiction Wiki:Chat" style="position:relative;text-decoration:underline;">Chat rules</a> • <a href="/wiki/Deadliest_Fiction_Wiki:Policies" target="_blank" title="Policies" style="position:relative;text-decoration:underline;">Policies</a> • <a href="/wiki/Deadliest_Fiction_Wiki:Chat_Moderators" target="_blank" title="Chat Mods" style="position:relative;text-decoration:underline;">Chat moderators</a> • <a href="/wiki/Deadliest_Fiction_Wiki:Administrators" target="_blank" title="Admins" style="position:relative;text-decoration:underline;">Administrators</a>'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 13px;color:#3A3A3A;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

//Switch to day button
var night_button = 'Switch to Day Chat';
 
//Switch to night button
var day_button = 'Switch to Night Chat';
 
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColorDay = '#8B0000';
 
  //All text Color
    var textColorDay = '#FFFFFF';
 
  //Self text background color
    var selfTextColorDay = '#424242';
 
  //Chat background color
    var backgroundColorDay = '#0B0D0E';
 
  //Chat foreground color
    var foregroundColorDay = '#000000';
 
  //User stats foreground color
    var userStatsColorDay = '#4D4D4D';
 
//END NIGHT Chat color scheme
 
 
 
//
//Color scheme for DAY Chat
//
  //Link color
    var linkColor = '#9d9d9d';
 
  //All text Color
    var textColor = '#FFFFFF';
 
  //Self text background color
    var selfTextColor = '#b30000';
 
  //Chat background color
    var backgroundColor = '#7f0000';
 
  //Chat foreground color
    var foregroundColor = '000000';
 
  //User stats foreground color
    var userStatsColor = '000000';
 
//END DAY Chat color scheme
 
 
 
/*$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 */
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
 
$('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
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
 
// ************ // Chat options import // ************ 
// Written by Sactage, Callofduty4 and Madnessfan34537 
var chatOptionsLoaded; 
if (chatOptionsLoaded != 1){ 
chatOptionsLoaded = 1; 
importScriptPage('MediaWiki:ChatOptions/code.js','dev'); 
} 
// **************** // END Chat options import // ****************


//Chat Tags

importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
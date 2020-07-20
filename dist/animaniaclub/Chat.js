/* 
**Some of the following coding is borrowed from LEGO Universe Stories Wiki(like the party feature)
**http://lustories.wikia.com/wiki/LEGO_Universe_Stories_Wiki
**And we give them full credit for their coding.
*/

 
/*Chat Party - by ShermanTheMythran*/
var partyLink1 =
"http://ia700400.us.archive.org/3/items/DeathNoteNightmare/DeathNote-1Opening-Nightmare-TheWorld493.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"http://ia600400.us.archive.org/3/items/DeathNoteNightmare/DeathNote-1Opening-Nightmare-TheWorld493.mp3"; //link to first song in mp3
 
var partyLinkText1 =
"The World - Death Note opening 1"; //text for first song
 
var partyLink2 =
"https://images.wikia.nocookie.net/legouniversestories/images/a/a5/Song_of_time_-_Dance_Remix.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"http://k007.kiwi6.com/hotlink/3osgiw3sk6/song_of_time_-_dance_remix.mp3"; //link to second song in mp3
 
var partyLinkText2 =
"Song of Time (Dance Remix)"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/legouniversestories/images/4/46/Alex_Clare_-_Too_Close_%28OFFICIAL_VIDEO%29.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"http://k007.kiwi6.com/hotlink/00s8g96z89/alex_clare_-_too_close_official_video_.mp3"; //link to third song in ogg
 
var partyLinkText3 =
"Too Close - Alex Clare"; //text for third song
 
importScriptPage('MediaWiki:ChatParty.js','animaniaclub');


//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'gold';
 
  //All text Color
    var textColor = '#FFFFFF';
 
  //Self text background color
    var selfTextColor = 'none';
 
  //Chat background color
    var backgroundColor = '#000000';
 
  //Chat foreground color
    var foregroundColor = 'black';
 
  //User stats foreground color
    var userStatsColor = 'none';
 
//END NIGHT Chat color scheme
 
//Day and night color schemes
//Written by Foodbandlt
 
 
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
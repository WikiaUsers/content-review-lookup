chatBlockReason = "You have forsaken the policies of this chat";
chatBlockExpiry = "3 months";
var chatags = { images: true, videos: true };
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
    chatOptionsLoaded = 1;
}
importArticles({
    type: 'script',
    articles: [
        'u:shining-armor:MediaWiki:ChatTags/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        'u:dev:NewMessageCount/code.js',
        'u:dev:MediaWiki:FixAdminKick/code.js',
        'u:dev:MediaWiki:ChatAnnouncements/code.js',
        'u:dev:MediaWiki:!kick/code.js',
        'u:dev:MediaWiki:ChatBlockButton/code.3.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:ChatUserPageButton.js',
        'u:dev:MediaWiki:ClassicModIcons.js'
    ]
});
//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'lightblue';
 
  //All text Color
    var textColor = 'white';
 
  //Self text background color
    var selfTextColor = 'lightblue';
 
  //Chat background color
    var backgroundColor = 'black';
 
  //Chat foreground color
    var foregroundColor = 'black';
 
  //User stats foreground color
    var userStatsColor = 'navy';
 
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
 
function emoteFix(chat) {
    $('.message').each(function(){$(this).children('img:gt(4)').remove()});
  if (mainRoom.userMain.attributes.isModerator == false) {
     $('.message img[src="https://images.wikia.nocookie.net/legomessageboards/images/0/0c/Yellow_X.png"], .message img[src="https://images.wikia.nocookie.net/legomessageboards/images/7/72/Red_X_Face.jpg"]').remove();
  }
}
mainRoom.model.chats.bind('afteradd', emoteFix);
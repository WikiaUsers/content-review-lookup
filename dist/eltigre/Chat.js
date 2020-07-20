/*Chat Block button*/
chatBlockReason = "ToU violation";
chatBlockExpiry = "2 weeks";
importScriptPage('ChatBlockButton/code.2.js','dev');

/*Kick cmd customization*/
window.absentMessage = '<user> is currently not in the El Tigre chat.';
importScriptPage('!kick.js', 'dev');

/*Chat Delay Config*/
window.dev = window.dev || {};
window.dev.chatdelay = {
	max: 5,
	mainOnly: false
};

/*Custom Statuses*/
window.ChatStatus = {
	statuses: {
		afk: "AFK",
		edit: "Editing",
		food: "Eating",
		tv: "Watching TV",
		game: "Playing games",
		el_tigre: "Watching El Tigre",
	},
	debug: false
};

/**CHAT ADDONS**/
/*Chat Enhancements*/
importArticles({
    type: 'script',
    articles: [
        'u:runescape:User:Joeytje50/tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)
        'u:dev:ChatAnnouncements/code.js', //ChatAnnouncements (so that chat mods can make custom chat announcements within the chat)
        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js', //!mods cmd
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatEditTools/code.js',
        'u:dev:CustomChatPings/code.js',
        'u:dev:ChatModHover/code.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:SpellingBee/startup.js', //In-chat spelling bee 
        "u:dev:jumbles/startup.js", //In-chat Jumbles
        'u:dev:ChatObject/code.js',
        "u:dev:tictactoe/code.js",
        'u:dev:ChatRefresh/code.js',
        "u:dev:ChatInterwikiLinks/code.js",
        "u:dev:MediaWiki:ChatStatus/code.js",
        'u:kocka:MediaWiki:Emoticons/code.js' //Easier emojis
    ]
});
 
/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(dayNightButton(), clearChatText());
    }
}
 
/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}
 
/* Day/Night Switch Feature */
function dayNightButton()
{
    var dayText = 'Day theme';
    var nightText = 'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}
 
window.onload = addButtons();
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to El Tigre Wiki chat. <br>Please read  <a href="El Tigre Wiki:Chat_Guidelines" target="_blank">the rules</a> before chatting.';
 
$(function() { 
$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#FFFFFF;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
/*Removed hilites for now, needs to be moved to CSS*/

/*Chat Nof.*/
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}

//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = 'A COLOR NAME';
 
  //All text Color
    var textColor = '#EXAMPLE';
 
  //Self text background color
    var selfTextColor = 'none';
 
  //Chat background color
    var backgroundColor = '#EXAMPLE';
 
  //Chat foreground color
    var foregroundColor = 'COLOR NAME';
 
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

//Anti-curse filter
alertMessage = 'Do not curse!';
window.badWords = ["pussy", "boner", "felch", "fuck", "shit", "bastard", "bitch", "faggot", "fag", "nigger", "dick", "whore", "cunt"]; // add bad words to pre-generated list
importScriptPage('WordFilter/code.js','dev');

//ChatImages
importScriptPage('ChatImages/code.js', 'dev');

//Music in chat
var textSound = $('#myText').val();
$('ul.WikiChatList').prepend('<div>Type here the URL of the <abbr style="border-bottom:1px dotted black" title="MP3, OGG & WAV"> audio file</abbr> and press Enter<audio></audio></div><div><input type="text" /></div><a href="//www.google.com/search?q=mp3">Search MP3 files</a>');
$('#playAudio').click(function() {
var audiowtf = document.getElementById("audiowtf"); 
audiowtf.play();
});
 
var audioElement = document.getElementsByTagName('audio')[0];
var inputElement = document.getElementsByTagName('input')[0];
 
$('input').keyup(function() {
  if (event.keyCode == 13) {
    loadAndPlay(inputElement.value);
  }
});
 
function loadAndPlay(src) {
  audioElement.pause();
  audioElement.src = src;
  audioElement.load();
  audioElement.play();
}
 
loadAndPlay(inputElement.value);

//Chat changer
importScriptPage( 'ChatObject/code.js', 'dev' );

//Chat time post
chatTimestamps24Hour = true;
importScriptPage('ChatTimestamps/code.js','dev');
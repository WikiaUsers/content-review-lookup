/**
 * Clear chat
 */
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
    }
}
 
function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}
 
window.onload = addClearChatText();
 
/**
 * Chat options
 *   By [[User:Callofduty4]], [[User:Madnessfan34537]], and [[User:Sactage]]
 *   From the Call of Duty Wiki
 */
var chatOptionsLoaded = false;
if (!chatOptionsLoaded) {
    chatOptionsLoaded = true;
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
}

importScriptPage('ChatOptions/code.js', 'dev');

// Credits to the My Little Pony Friendship is Magic Wiki
 
/* Night mode
   Modified by AnimatedCartoons
   Original code (http://mlp.wikia.com/wiki/MediaWiki:Chat.js) written by Foodbandlt */
var night_button = 'Switch to Night Chat';
var day_button = 'Switch to Day Chat';
var linkColorDay = '#6699FF';
var textColorDay = '#3A3A3A';
var selfTextColorDay = '#F5F5E6';
var backgroundColorDay = '#F1F1F1';
var foregroundColorDay = '#FFFFF0';
var userStatsColorDay = '#E0EAF3';
var linkColor = '#02A4F7';
var textColor = '#C5C5C5';
var selfTextColor = '#0A0A19';
var backgroundColor = '#00000F';
var foregroundColor = '#00000F';
var userStatsColor = '#00000F';
 
function addDayStyle() {
    var styleElementDay = document.createElement('style');
    styleElementDay.setAttribute("id", "day");
    styleElementDay.innerHTML = 'body{background: ' + backgroundColorDay + ';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"], .label, .Chat .username:after{color: ' + textColorDay + ';}.WikiaPage, #WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"], .Write .message, .Write, .Rail, .Chat{background: ' + foregroundColorDay + '; background-color: ' + foregroundColorDay + ';}.Chat .you{background: ' + selfTextColorDay + ';}a{color: ' + linkColorDay + ';}.UserStatsMenu .info{background:' + userStatsColorDay + ';}';
    $('head').append(styleElementDay);
}
 
function addNightStyle() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute("id", "night");
    styleElement.innerHTML = 'body{background: ' + backgroundColor + ';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"], .label, .Chat .username:after{color: ' + textColor + ';}.WikiaPage, #WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"], .Write .message, .Write, .Rail, .Chat{background: ' + foregroundColor + '; background-color: ' + foregroundColor + ';}.Chat .you{background: ' + selfTextColor + ';}a{color: ' + linkColor + ';}.UserStatsMenu .info{background:' + userStatsColor + ';}';
    $('head').append(styleElement);
}
 
function addDayNightButton() {
    if ($('.day-night-div').size() == 0) {
        $('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="day-night-button wikia-button">' + night_button + '</a></div>').prependTo('.Rail');
    }
    if ($('style#night').size() == 0 && $('style#nightUser').size() == 0) {
        addDayStyle();
    }
}
 
function day_night(which) {
    if (which == "night") {
        $('style#day').remove();
        $('.Rail .day-night-div .day-night-button').text(day_button);
        addNightStyle();
    } else {
        $('style#night').remove();
        $('.Rail .day-night-div .day-night-button').text(night_button);
        addDayStyle();
    }
}
 
function switch_view() {
    if ($('.Rail .day-night-div .day-night-button').text() == night_button) {
        day_night("night");
    } else {
        day_night("day");
    }
}
 
if ($('.Rail .day-night-div').size() == 0) {
    addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1) {
    $('.WikiaPage .Rail div:last-child').remove();
}
/**
 * Chat topic
 *   From the RuneScape Wiki
 */
var chatTopic = 'Por favor, leia as <a href="O Incrível Mundo de Gumball Wiki:Regras do Chat" target="_blank">Regras do Chat</a> antes de conversar.';
 
$(function () {
    "use strict";
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#FFFFFF; font-weight:bold; line-height:1.6; margin-left:110px;">' + chatTopic + '</div>').find('a').attr('style', 'position:relative; text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
  
/**
 * Clear chat
 */
function addClearChatText() {
    "use strict";
    if ($('.clearChatText').length <= 0) {
        var clearChatText = document.createElement('span');
        $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; user-select: none;" align="center"><a class="clearChatButton wikia-button">Limpar chat</a></div>').prependTo('.Rail');
    }
}
 
function clearChat() {
    "use strict";
    var chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}
 
window.onload = addClearChatText();
 
/**
 * Spam protection
 *   By [[User:Joeytje50]]
 *   From the RuneScape Wiki
 */
 
var maxLimit = 6, // Limit for sent lines
    maxLength = 1250, // Limit for how long a line can be (in chars)
    limitTimeout = 2000, // Timeout for the sent lines limiter
    rate = 0;
 
function ratelimit(e) {
    if (rate > maxLimit) {
        this.disabled = true;
        e.preventDefault();
        mainRoom.sendMessage({
            which: 13,
            shiftKey: false,
            preventDefault: function () {}
        });
        document.location.href = wgServer + "/wiki/Main_Page";
        return false;
    }
    if (this.value.length >= maxLength || this.value.split('\n').length >= 6) {
        var val = this.value.substring(0, maxLength).split('\n');
        val = val[0] + '\n' + val[1] + '\n' + val[2] + '\n' + val[3] + '\n' + val[4];
        this.value = val;
        if (e.type === 'keypress') {
            e.preventDefault();
            return false;
        }
    }
    if (e.type === 'keypress' && e.which === 13 && !e.shiftKey && this.value !== '') {
        rate += 1;
        setTimeout(function () {
            if (rate > 0) {
                rate -= 1;
            }
        }, limitTimeout);
    }
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
 
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
 
/**
 * Day and night chat
 * By [[User:Foodbandlt]]
 * From the MLP:FiM Wiki
 */
// Switch to night button
var night_button = 'Switch to Night Chat',
 
    // Switch to day button
    day_button = 'Switch to Day Chat',
 
    /**
     * Color scheme for Day Chat
     */
    // Link color
    linkColorDay = '#ABABAB',
 
    // All text Color
    textColorDay = '#CCFFFF',
 
    // Self text background color
    selfTextColorDay = '#061118',
 
    // Chat background color
    backgroundColorDay = '#000000',
 
    // Chat foreground color
    foregroundColorDay = 'url("http://images.wikia.com/fusionfall/images/8/8c/Chatbackground.png")',
 
    // User stats foreground color
    userStatsColorDay = 'url("http://images.wikia.com/fusionfall/images/2/2d/Searchlist2.png")',
 
    // User chat box color
    messageColorDay = 'url("http://images.wikia.com/fusionfall/images/5/5d/Chattext.png")',
 
    // User stats color
    userstatsmenuColorDay = '#061018',
 
    /**
     * Color scheme for Night Chat
     */
    // Link color
    linkColor = '#03CCFF',
 
    // All text Color
    textColor = '#D5D4D4',
 
    // Self text background color
    selfTextColor = '#0C151A',
 
    // Chat background color
    backgroundColor = '#000000',
 
    // Chat foreground color
    foregroundColor = '#020C11',
 
    // User stats foreground color
    userStatsColor = '#013240',
 
    // User chat box color
    messageColor = '#020C11';
 
function addDayStyle() {
    "use strict";
    var styleElementDay = document.createElement('style');
    styleElementDay.setAttribute("id", "day");
    styleElementDay.innerHTML = 'body{background: ' + backgroundColor + ';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private {color: ' + textColor + ';}.Write [name="message"] {color: ' + textColor + ';}.ChatHeader { background: ' + foregroundColor + ';} .UserStatsMenu { background: ' + userStatsColor + ';}.Chat .you{background: ' + selfTextColor + ';}a{color: ' + linkColor + ';}.UserStatsMenu .info {background: ' + foregroundColor + ';}.Write [name="message"] { background: ' + messageColor + ';}.WikiaPage { background: ' + foregroundColor + ';}';
    $('head').append(styleElementDay);
}
 
function addNightStyle() {
    "use strict";
    var styleElement = document.createElement('style');
    styleElement.setAttribute("id", "night");
    styleElement.innerHTML = 'body{background: ' + backgroundColorDay + ';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private {color: ' + textColorDay + ';}.Write [name="message"] {color: ' + backgroundColorDay + ';}.ChatHeader { background: ' + userStatsColorDay + ';} .UserStatsMenu { background: ' + userStatsColorDay + ';}.Chat .you{background: ' + selfTextColorDay + ';}a{color: ' + linkColorDay + ';}.UserStatsMenu .info {background: ' + userstatsmenuColorDay + ';}.Write [name="message"] { background: ' + messageColorDay + ';}.WikiaPage { background: ' + foregroundColorDay + ';}';
    $('head').append(styleElement);
}
 
function addDayNightButton() {
    "use strict";
    $('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="day-night-button wikia-button">' + night_button + '</a></div>').prependTo('.Rail');
    if ($('style#night').size() < 1 && $('style#nightUser').size() < 1) {
        addDayStyle();
    }
}
 
function day_night(which) {
    "use strict";
    if (which === "night") {
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
    "use strict";
    if ($('.Rail .day-night-div .day-night-button').text() === night_button) {
        day_night("night");
    } else {
        day_night("day");
    }
}
 
if ($('.Rail .day-night-button').text() === "") {
    addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1) {
    $('.WikiaPage .Rail div:last-child').remove();
}
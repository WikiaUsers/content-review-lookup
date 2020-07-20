/*---------------------Based on Phineas and Ferb Wiki-------------------------*/
// Heading
var heading = 'Chào mừng đến với sân sau của Wikia Phineas and Ferb';
 
$(function () {
    $('#ChatHeader .public.wordmark').prepend('<div class="heading">' + heading + '</div>').find('a').attr('style', 'position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
// Clear chat
function clearChat() {
    $('.Chat li').remove();
}
$('<div class="clear" onclick="clearChat()" style="margin: 10px auto;" align="center"><a class="wikia-button">Xóa Chat</a></div>').prependTo('.Rail');
 
// Credits to the RuneScape Wiki
 
/* Rate limit
   Modified by AnimatedCartoons
   Original code (http://runescape.wikia.com/wiki/User:Joeytje50/ratelimit.js) written by Joeytje50 */
var rate = 0;
 
function ratelimit(e) {
    if (rate > 5) {
        this.disabled = true;
        e.preventDefault();
        $('[name="message"]').val('Automated message: Rate limit passed. If necessary, click [[Special:Contributions/' + wgUserName + '|here]] to ban me from the chat.');
        mainRoom.sendMessage({
            which: 13,
            shiftKey: false,
            preventDefault: function () {},
            target: $('[name="message"]')
        })
        document.location.href = wgServer + "/wiki/Project:Chat/Rate_limit_triggered";
        return false;
    }
    var len = this.value.length;
    if (len >= 1000 || this.value.split('\n').length >= 6) {
        var val = this.value.substring(0, 1000).split('\n');
        val = val.slice(0, 5).join('\n');
        this.value = val;
        if (e.type == 'keypress') {
            e.preventDefault();
            return false;
        }
    }
    if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
        rate += Math.floor(len / 500) + 1;
        if (!Math.floor(len / 500)) {
            setTimeout(function () {
                if (rate > 0) {
                    rate -= 1
                }
            }, 5000);
        } else if (Math.floor(len / 500) == 1) {
            setTimeout(function () {
                if (rate > 0) {
                    rate -= 2
                }
            }, 5000);
        } else if (len == 1000) {
            setTimeout(function () {
                if (rate > 0) {
                    rate -= 3
                }
            }, 5000);
        }
    }
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
 
// Credits to the My Little Pony Friendship is Magic Wiki
 
/* Night mode
   Modified by AnimatedCartoons
   Original code (http://mlp.wikia.com/wiki/MediaWiki:Chat.js) written by Foodbandlt */
var night_button = 'Chuyển đến Chat Ban ngày';
var day_button = 'Chuyển đến Chat Ban đêm';
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
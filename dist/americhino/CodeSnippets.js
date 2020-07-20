/***************************************************************************
 *********************** Interesting Code Snippets *************************
 ************************ By various FANDOM users **************************
 ************************ Compiled by Americhino ***************************
 ***************************************************************************
*/
/* 
 * @description     Delete info on a user's masthead.
 * @author          KockaAdmiralac
 * @notes           Be sure to clear cache and reload page. Occupation can
 *                  be replaced with any valid attribute.
*/
$.ajax({
    type: 'DELETE',
    url: 'https://services.wikia.com/user-attribute/user/' + mw.config.get('wgTrackID') + '/attr/occupation',
    success: function(d) {
        console.log('Success', d);
    },
    error: function(e) {
        console.error(e);
    },
    xhrFields: {
        withCredentials: true
    }
});
/* 
 * @description     IRC-style Chat
 * @author          Messenger of Heaven
 * @notes           CSS could be more reader-friendly but still neat.
*/
var irc_button = 'Go to IRC Chat';
var citadel_button = 'Switch to citadel Chat';
function addcitadelircButton(){
    var citadelircButton = document.createElement('div');
    $('<div class="citadel-irc-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="citadel-irc-button wikia-button">'+irc_button+'</a></div>').prependTo('.Rail');
}
 
    function citadel_irc(){
    var styleElement = document.createElement('style');
    styleElement.setAttribute("id", "irc");
    styleElement.innerHTML='.Rail .selected {display:none;}.Chat li {font-family:consolas;color:#000;}.Chat >ul> li {padding:0px;margin:0px !important;margin-right:20px !important;position:static;min-height:0px;}.Chat .avatar {float:right;left:auto;right:10px;top:auto;}.Chat .time {display:inline;float:none;color:inherit;}.Chat .time:before {content:"[";}.Chat .time:after {content:"]";}.Chat .username {display:inline;font-weight:normal;}.Chat .username:before {content:"<";color:#000;text-decoration:none;}.Chat .username.chat-mod:before {content:"<@";} .Chat .username:after {content:">";color:#000;text-decoration:none;}.Chat .continued .time, .Chat .continued .username {display:inline;}.Chat li img {height:15px;width:15px;}.Chat .inline-alert {text-align:left;padding:0px;}.Chat .inline-alert:before {content:"== ";margin-left:50px;}.Chat .inline-alert:after {content:"";}.Chat a:not(.username) {color:#002BB8;text-decoration:underline;}.Chat a:not(.username):visited {color:#5A3696;}.Chat a:not(.username):active {color:#FAA700;content:" |Away"}.Chat a:not(.username):active:after{content:" | "}.Rail .User img {display: none;}#WikiChatList > li {padding: 1px;}.Write img {display: none;}.User.away .status:before {content:" | ";}.User.away. status:after {content:"";}.ChatHeader .User img {display: none;}.User.chat-mod .username:before {content:"@"}.User.chat-mod.staff .username:before { content:"+";}.User.chat-mod .username:after {content:""}.User.chat-mod.staff .username:after{content:"";}.Chat .avatar {display:none;}.User.chat-mod .username {float:left;}.User .username {float:left;}.User .details {padding-left: 2px;}.Rail .private {background: transparent;background-image: transparent;border-top:1px solid black;border-bottom:none;ffont-size:0px;}.Chat {border-right: 1px solid gray;border-bottom: 1px solid gray;}';
    $('head').append(styleElement);
}
 
function switch_view(){
    if ($('.Rail .citadel-irc-div .citadel-irc-button').text() == irc_button){
        $('.Rail .citadel-irc-button').text(citadel_button);
        citadel_irc();
    } else {
    $('.Rail .citadel-irc-div .citadel-irc-button').text(irc_button);
        $('style#irc').remove()
    }
}
 
if ($('.Rail .citadel-irc-button').text() == ""){
    addcitadelircButton();
}
/* 
 * @description     Revives Monobook
 * @author          Railfail536?
 * @notes           Can be changed to any date/skin (?)
*/
document.cookie = "useskin=monobook; expires=01 Jan 2100 00:00:00 GMT; path=/"

/* 
 * @description     "?" parameters
 * @author          Llanulall
 * @notes           "?" parameters as in ?useusercss=0
*/
var currentPage = new URL(window.location.href);
var parameter = currentPage.searchParams.get('spoilers') === '1'; // just an example
if (parameter) {
    console.warn('What am I if I can\'t be yours?')
}
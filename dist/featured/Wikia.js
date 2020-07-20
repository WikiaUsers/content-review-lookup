
if ($("hgroup .tag").length > 0){
	$("body.page-User_Cap123 hgroup .tag:last-child").after('<span class="tag" style="margin-left: 5px;">Featured Wiki Staff</span>');
	$("body.page-User_talk_Cap123 hgroup .tag:last-child").after('<span class="tag" style="margin-left: 5px;">Featured Wiki Staff</span>');
	$("body.page-User_blog_Cap123 hgroup .tag:last-child").after('<span class="tag" style="margin-left: 5px;">Featured Wiki Staff</span>');
	$("body.page-Special_Contributions_Cap123 hgroup .tag:last-child").after('<span class="tag" style="margin-left: 5px;">Featured Wiki Staff</span>');
}
/*
 * Anonymous Chat
 * By Cap123
 *
var embeddable;
embeddable = false;
var anonChat = {
function embed() {
if (wgCanonicalSpecialPageName == 'AnonChat') {
if (!embeddable) {
window.document.getElementById('mw-content-text').innerHTML = '<div id="rail"></div><div id="log"></div><form action="" method="POST" id="anonchat" name="anonchat" onSubmit="SendMessage()"><input type="hidden" name="ip" id="ip" value=' + ip() + '<textarea name="msg"></textarea></form>'
} else {
window.document.getElementById('mw-content-text').innerHTML = '<h1>Incorrect App ID!</h1>';
} else {
return;
}
function userLogon() {
var divgetip = '#' + window.document.anonchat.ip.value;
var ip4 = window.document.createElement('p');
ip4.setAttribute('id',getip);
window.document.getElementById('rail').appendChild('ip4');
$(divgetip).hover(anonChat.dispMenu(getip));
}
function dispMenu(ipaddress) {
var dispMW = 'menuMW' + ipaddress;
var menu = window.document.createElement('div');
menu.setAttribute('id', dispMW);
window.document.getElementById(dispMW).innerHTML = '<a href="" onClick=kick("' + ipaddress + '")>Kick</a>';
}
}
function appID(appid) {
if (appid == 'hjk63sdh') {
embeddable = true;
} else {
return;
}
}
function SendMessage() {
var chat-message = window.document.anonchat.msg.value;
var getip = window.document.anonchat.ip.value;
var msg3 = getip + nmbr;
var nmbr;
nmbr = 0;
nmbr = nmbr + 1;

var core = window.document.createElement("div");
core.setAttribute('class','hidden');
window.document.getElementByTag('body').appendChild('core');
$('.hidden').hide();

var post = window.document.createElement("div");
post.setAttribute('id',math.random());
post.setAttribute('class', msg3);
window.document.getElementById('log').appendChild('post');

window.document.getElementByClassName(msg3).innerHTML = '<b>' + getip + '</b><br />' + chat-message;

}
function Kick(IP) {
var groups = mw.config.get("wgUserGroups");
if ((!groups.indexOf("chatmoderator")) {
pefKick(IP5);
} else {
alert('Your not a Chat Moderator!');
}
}
function pefKick() {
if (window.document.anonchat.ip.value == IP5) {
window.document.getElementById('mw-content-text').innerHTML = '<h1>You have been kicked!</h1>';
}
}
function ip(json) {
window.document.write(json);
}
var script = window.document.createElement("script")
script.setAttribute('src','http://tampisid.x10.mx/ip.php?callback=ip');
window.document.getElementByTag('head').appendChild('script');
window.document.getElementByTag("body").onload = "anonChat.userLogon()"';

appID('hjk63sdh');
*/
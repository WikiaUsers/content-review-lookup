 /* Credit to Runescape and Call of Duty Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking. var chatTopic = 'Welcome to the Friendship is Magic Wiki Chat! Please make sure to read the rules and other information <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat">here</a>.
Take part in discussion concerning the chat <a href="/wiki/Forum:Chat_discussion" target="_blank">here</a>.'

$(function() {
$('#ChatHeader .public.wordmark').prepend('
'+chatTopic+'
')

.find('a').attr('style','position:relative;text-decoration:underline;') }) $('#ChatHeader .public.wordmark div:not(:first-child)').remove()


// Change mod icons depending on the time // Written by Foodbandlt

function nighttime_moon(){
var night = new Date();
var nighthour=night.getHours();

if (nighthour >= 19 || nighthour <= 7){
 if ($('.User.chat-mod .username').hasClass("modday")){
 $(".User.chat-mod .username").removeClass("modday");
 $(".User.chat-mod .username").addClass("modnight");
 }else{
 $(".User.chat-mod .username").addClass("modnight");
 }
}else{
 if ($('.User.chat-mod .username').hasClass("modnight")){
 $(".User.chat-mod .username").removeClass("modnight");
 $(".User.chat-mod .username").addClass("modday");
 }else{
 $(".User.chat-mod .username").addClass("modday");
 }
}
$('.User.chat-mod[data-user="Foodbandlt"] .username').removeClass('modday').removeClass('modnight');
setTimeout("nighttime_moon()", 10*60*1000); } nighttime_moon();

// Chat options // Written by Callofduty4 and Madnessfan34537 var chatOptionsLoaded; if (chatOptionsLoaded != 1){ chatOptionsLoaded = 1; importScriptPage('MediaWiki:Chat.js/options.js','cod'); }

    / 

/*Chat Party - by ShermanTheMythran*/ $(document).ready(function(){if(wgUserName.indexOf("Norvik")!==-1){$('.ChatWindow').remove();}});

var partyLink1 = "https://images.wikia.nocookie.net/lmbtest/images/0/02/Dynamite_-_Taio_Cruz.ogg"; //link to first song in ogg

var partyLinkIE1 = "http://k007.kiwi6.com/hotlink/u7fi5mxu6j/taio_cruz_-_dynamite_clean_hqdownload_link_.mp3"; //link to first song in mp3

var partyLinkText1 = "Dynamite - Taio Cruz"; //text for first song

var partyLink2 = "https://images.wikia.nocookie.net/lmbtest/images/8/81/Good_Time_-_Owl_City_ft_Carly_Rae_Jepson.ogg"; //link to second song in ogg

var partyLinkIE2 = "http://k007.kiwi6.com/hotlink/tsns3w9kp9/owl_city_feat._carly_rae_jepsen_-_good_time_full_song_.mp3"; //link to second song in mp3

var partyLinkText2 = "Good Time - Owl City ft Carly Rae Jepson"; //text for second song

var partyLink3 = "https://images.wikia.nocookie.net/lmbtest/images/4/41/Daybreak_-_Barry_Manilow.ogg"; //link to third song in ogg

var partyLinkIE3 = "http://k007.kiwi6.com/hotlink/06j03kbbu3/daybreak_-_barry_manilow.mp3"; //link to third song in ogg

var partyLinkText3 = "Daybreak - Barry Manilow"; //text for third song

importScriptPage('MediaWiki:ChatParty.js','lmbtest');
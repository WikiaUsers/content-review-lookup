/* Credit to Runescape and Call of Duty Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Friendship is Magic Wiki Chat! Please make sure to read the rules and other information <a href="/wiki/Project:Chat" target="_blank" title="Project:Chat"><u>here</u></a>.<br />Take part in discussion concerning the chat <a href="/wiki/Forum:Chat_discussion" target="_blank">here</a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
 
// Change mod icons depending on the time 
// Written by Foodbandlt
 
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
setTimeout("nighttime_moon()", 10*60*1000);
}
nighttime_moon();
 
// Chat options 
// Written by Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
chatOptionsLoaded = 1;
importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
*/

/*Chat Party - by Supreme Kuzon*/
$(document).ready(function(){if(wgUserName.indexOf("Norvik")!==-1){$('.ChatWindow').remove();}});

var partyLink1 =
"http://images.wikia.com/lmbtest/images/c/c3/Troublemaker.ogg"; //link to first song in ogg

var partyLinkIE1 =
" http://k007.kiwi6.com/hotlink/b03m0jweud/troublemaker.mp3"; //link to first song in mp3

var partyLinkText1 =
"Troublemaker - Olly Murs"; //text for first song

var partyLink2 =
"http://images.wikia.com/lmbtest/images/7/7d/Viva_La_Vida.ogg"; //link to second song in ogg

var partyLinkIE2 =
"http://k007.kiwi6.com/hotlink/1q82nrxp54/viva_la_vida.mp3"; //link to second song in mp3

var partyLinkText2 =
"Viva La Vida - Coldplay"; //text for second song

var partyLink3 =
"http://images.wikia.com/lmbtest/images/7/71/Blastoff.ogg"; //link to third song in ogg

var partyLinkIE3 =
"http://k007.kiwi6.com/hotlink/o7l4fk9hm5/blastoff.mp3"; //link to third song in ogg

var partyLinkText3 =
"Blastoff - The Deviled Eggs"; //text for third song

importScriptPage('MediaWiki:ChatParty.js','lmbtest');

/*Chat Rules - by Supreme Kuzon*/ 

importScriptPage('MediaWiki:Cookies.js','lustories');$(document).ready(function(){var chatRules=$.cookie('rules');if(chatRules=="hidden"){}else{$('#WikiaPage').append('<div id="rules" class="Chat" style="background:#E36600;color:white;cursor:pointer;padding:10px;"></div>');$('#Write textarea').attr('disabled','disabled');$.get('/index.php',{action:'render',title:'Lego_Message_Boards_Wiki:General_Policy'},function success(data){$('#rules').html(data+'<h1 style="color:#FFA726;font-size:300%;position:absolute;bottom:20px;">click to accept</h1>');});$('#rules').click(function(){$(this).slideUp('slow');$('#Write textarea').removeAttr('disabled');$.cookie('rules','hidden',{expires: 365});});}});


/*Remove blocked words - by Supreme Kuzon*/
/*Spam filter - by Seaside98*/

function emoteFix(chat) {
    $('.message').each(function(){$(this).children('img:gt(4)').remove()});
  if (mainRoom.userMain.attributes.isModerator == false) {
     $('.message img[src="http://images2.wikia.nocookie.net/legomessageboards/images/0/0c/Yellow_X.png"], .message img[src="http://images2.wikia.nocookie.net/legomessageboards/images/7/72/Red_X_Face.jpg"]').remove();
  }
}
mainRoom.model.chats.bind('afteradd', emoteFix);
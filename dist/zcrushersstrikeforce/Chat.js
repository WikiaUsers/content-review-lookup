 /*Chat Party - by ShermanTheMythran Modified by Lil' Trunks*/
var partyLink1 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/4/45/Blue_Falcon_Groove.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/4/45/Blue_Falcon_Groove.ogg"; //link to first song in mp3
 
var partyLinkText1 =
"Blue Falcon Groove"; //text for first song
 
var partyLink2 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/e/e1/Mark_Ronson.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/e/e1/Mark_Ronson.ogg"; //link to second song in mp3
 
var partyLinkText2 =
"Uptown Funk"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/2/20/Kill_Yourself.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/2/20/Kill_Yourself.ogg"; //link to third song in ogg
 
var partyLinkText3 =
"Kill Yourself"; //text for third song

importScriptPage('MediaWiki:ChatParty.js','zcrushersstrikeforce');


/* Chat options */
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
chatOptionsLoaded = 1;
importScriptPage('ChatOptions/code.js', 'dev');
}
/* END chat options */
 
/* Clear chat button */
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Muffin button</a></div>').prependTo('.Rail');
   }
}
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
 
window.onload=addClearChatText();
/* END Clear chat button */

/* Spam protection */
// Credit to Joeytje50, script modified slightly for more leniency/easier changing
// Change these variables to modify the leniency of the script

var maxLimit = 6; // limit for sent lines
var maxLength = 1250; // limit for how long a line can be (in chars)
var limitTimeout = 2000; // timeout for the sent lines limiter

var rate = 0;
function ratelimit(e) {
	if (rate > maxLimit) {
		this.disabled = true;//disabling input in case they press ESC before the redirect is complete
		e.preventDefault();
		mainRoom.sendMessage({which : 13, shiftKey : false, preventDefault : function() {} })
		document.location.href = wgServer+"/wiki/Project:Chat/Ratelimit_triggered";
		return false;
	}
	if (this.value.length>=maxLength || this.value.split('\n').length>=6) {
		var val = this.value.substring(0,maxLength).split('\n');
		val = val[0]+'\n'+val[1]+'\n'+val[2]+'\n'+val[3]+'\n'+val[4];//remove all lines after the 5th line.
		this.value = val;
		if (e.type == 'keypress') {
			e.preventDefault();
			return false;
		}
	}
	if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
		rate += 1;
		setTimeout(function() {
			if (rate > 0) { rate -= 1 }
		},limitTimeout);
	}
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
/* END Spam protection */
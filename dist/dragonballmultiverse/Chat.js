importArticles({
    type: "script",
    articles: [
        "external:dragonballmultiverse:MediaWiki:Chat.js/ChatNotifications.js"
    ]
});

/*Chat Party - by ShermanTheMythran, modified by IStoleThePies*/

var partyLink1 =
"https://images.wikia.nocookie.net/dragonballmultiverse/images/0/03/HikarinoWillpower.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"https://images.wikia.nocookie.net/dragonballmultiverse/images/0/03/HikarinoWillpower.ogg"; //link to first song in ogg
 
var partyLinkText1 =
"Hikari no Willpower"; //text for first song

var partyLink2 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/4/45/Blue_Falcon_Groove.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/4/45/Blue_Falcon_Groove.ogg"; //link to second song in mp3
 
var partyLinkText2 =
"Blue Falcon Groove"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/e/e1/Mark_Ronson.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/e/e1/Mark_Ronson.ogg"; //link to third song in mp3
 
var partyLinkText3 =
"Uptown Funk"; //text for third song

importScriptPage('MediaWiki:ChatParty.js');


/* Chat options */
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
    chatOptionsLoaded = 1;
    importScriptPage('ChatOptions/code.js', 'dev');
}
/* END chat options */

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
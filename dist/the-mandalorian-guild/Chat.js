/* ######################################################## */
/* ################### Party Chat Theme ################### */
/* ###################### Taken from ###################### */
/* ############## Lego Universe Stories Wiki ############## */
/* ################## Modified by Yuzura ################## */
/* ######################################################## */
var partyLink1 =
"http://images.wikia.com/legouniversestories/images/a/a5/Song_of_time_-_Dance_Remix.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"http://images.wikia.com/legouniversestories/images/a/a5/Song_of_time_-_Dance_Remix.ogg"; //link to first song in mp3
 
var partyLinkText1 =
"Song of Time (Dance Remix)"; //text for first song
 
var partyLink2 =
"http://images.wikia.com/yuzura/images/5/57/Fullmetal_Alchemist_and_the_Broken_Angel_OST_-_fight_it_out%21.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"http://images.wikia.com/yuzura/images/5/57/Fullmetal_Alchemist_and_the_Broken_Angel_OST_-_fight_it_out%21.ogg"; //link to second song in mp3
 
var partyLinkText2 =
"Fullmetal Alchemist"; //text for second song
 
var partyLink3 =
"http://images.wikia.com/nexusadventures/images/d/d0/Nyan_Cat.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"http://images.wikia.com/nexusadventures/images/d/d0/Nyan_Cat.ogg"; //link to third song in mp3
 
var partyLinkText3 =
"Nyan Cat"; //text for third song
 
var partyLink4 =
"http://images.wikia.com/yuzura/images/8/89/Daft_Punk_-_Get_Lucky_%28Full_Video%29.ogg"; //link to fourth song in ogg
 
var partyLinkIE4 =
"http://images.wikia.com/yuzura/images/8/89/Daft_Punk_-_Get_Lucky_%28Full_Video%29.ogg"; //link to fourth song in mp3
 
var partyLinkText4 =
"Get Lucky - Daft Punk"; //text for fourth song
 
$('head').append('<style type="text/css">#partyTrigger,#partyMenuButton{margin:0 !important;font-size:16px;cursor:pointer;vertical-align:top;color:silver;display:inline-block;}#partyTrigger{padding:0 10px;}#WikiaPage,#partyMenu{transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-ms-transition:background .5s;}</style>');
 
navigator.info = (function() {
	var N = navigator.appName, ua = navigator.userAgent, tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i))!== null) M[2] = tem[1];
	M = M? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
 
	return M; }
)();
 
if (navigator.info[0] == "Chrome") {
	$('#ChatHeader .public').append('<div style="width: 40px; color:black; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('ChatParty initialized');
}
else if (navigator.info[0] == "MSIE" && navigator.info[1] >= 10) {
	$('#ChatHeader .public').append('<div style="color: black; width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('ChatParty initialized');
}
else if (navigator.info[0] == "Firefox" && navigator.info[1] >= 5) {
	$('#ChatHeader .public').append('<div style="color: black; width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('ChatParty initialized');
}
else if (navigator.info[0] == "Safari" && navigator.platform == "Mac" || "iPad" ) {
	$('#ChatHeader .public').append('<div style="color: black; width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('ChatParty initialized');
}
else {
}
 
$('#partyTrigger').toggle(function() {
	$('.ChatWindow').append('<div id="partyMode"><div id="discoBall"><div class="light blue" style="top: 5%; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 5%; animation-delay: 2s; -moz-animation-delay: 2s; -webkit-animation-delay: 2s; -ms-animation-delay: 2s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 5%; animation-delay: 4s; -moz-animation-delay: 4s; -webkit-animation-delay: 4s; -ms-animation-delay: 4s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 25%; animation-delay: 1s; -moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 25%; animation-delay: 3s; -moz-animation-delay: 3s; -webkit-animation-delay: 3s; -ms-animation-delay: 3s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light blue" style="top: 25%; animation-delay: 5s; -moz-animation-delay: 5s; -webkit-animation-delay: 5s; -ms-animation-delay: 5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 45%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 45%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 45%; animation-delay: 7.5s; -moz-animation-delay: 7.5s; -webkit-animation-delay: 7.5s; -ms-animation-delay: 7.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 65%; animation-delay: 0.5s; -moz-animation-delay: 0.5s; -webkit-animation-delay: 0.5s; -ms-animation-delay: 0.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light blue" style="top: 65%; animation-delay: 2.5s; -moz-animation-delay: 2.5s; -webkit-animation-delay: 2.5s; -ms-animation-delay: 2.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 65%; animation-delay: 4.5s; -moz-animation-delay: 4.5s; -webkit-animation-delay: 4.5s; -ms-animation-delay: 4.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 85%; animation-delay: 1.5s; -moz-animation-delay: 1.5s; -webkit-animation-delay: 1.5s; -ms-animation-delay: 1.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 85%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 85%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 80px 40px white;"></div></div><audio autoplay loop><source src="' + partyLink1 + '" type="audio/ogg"></audio><style type="text/css">#ChatHeader .public.wordmark a.active:hover{background-image:none !important;background-color:transparent !important;}#partyMenu{padding:5px;position:absolute;z-index:1;cursor:default;min-width:250px;}#partyMenuButton>span{padding:11px 10px;}.light{position:fixed;border-radius:100%;opacity:.4;left:-100px;z-index:10;animation:lights 6s linear infinite;-moz-animation:lights 6s linear infinite;-webkit-animation:lights 6s linear infinite;-ms-animation:lights 6s linear infinite;}@keyframes lights{from{left:100%;}to{left:-100px;}}@-moz-keyframes lights{from{left:100%;}to{left:-100px;}}@-webkit-keyframes lights{from{left:100%;}to{left:-100px;}}@-ms-keyframes lights{from{left:100%;}to{left:-100px;}}#partyMenu label{display:block;}#partyMenu table{width:100%;}</style><div id="style"></div></div>');
	$('#ChatHeader .public').append('<a id="partyMenuButton"><span>Settings</span><div id="partyMenu" class="GlobalModule" style="display: none; text-shadow: none;"><form id="music" class="group" style="padding: 0 10px; font-size: 14px;"><p style="margin-bottom: -15px; font-weight: bold;">Music</p><label><input type="radio" id="option-1" name="music" value="option-1" checked /><span style="text-shadow: 0 0 5px white;">' + partyLinkText1 + '</span></label><label><input type="radio" id="option-2" name="music" value="option-2" /><span>' + partyLinkText2 + '</span></label><label><input type="radio" id="option-3" name="music" value="option-3" /><span>' + partyLinkText3 + '</span><label><input type="radio" id="option-4" name="music" value="option-3" /><span>' + partyLinkText4 + '</span></label><label><input type="radio" id="option-5" name="music" value="option-4" /><span>Off</span></label></form><form id="lights" class="group" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Lights</p><table><tr><td><label><input type="radio" id="white" name="lights" value="white" checked /><span style="text-shadow: 0 0 5px white;">White</span></label></td><td><label><input type="radio" id="colored" name="lights" value="colored" /><span>Colored</span></label></td><td><label><input type="radio" id="off" name="lights" value="off" /><span>Off</span></label></td></tr></table></form><form id="skin" class="group" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Skin</p><table><tr><td><label><input type="radio" id="skinDarkNexus" name="skin" value="skinDarkNexus" checked /><span style="text-shadow: 0 0 5px white;">Default</span></label></td><td><label><input type="radio" id="skinAssembly" name="skin" value="skinAssembly" /><span>Hell Demon</span></label></td><td><label><input type="radio" id="skinVenture" name="skin" value="skinVenture" /><span>Dragons</span></label></td></tr><tr><td><label><input type="radio" id="skinSentinels" name="skin" value="skinSentinels" /><span>Bleach</span></label></td><td><label><input type="radio" id="skinParadox" name="skin" value="skinParadox" /><span>Mortal Kombat</span></label></td></tr></table></form></div></a>');
	skinDarkNexus();
	if (navigator.info[0] == "MSIE") {
		$('#partyMode source[type="audio/ogg"]').remove();
		$('#partyMode audio').append('<source src="' + partyLinkIE1 + '" type="audio/mpeg">');
	}
	$('#partyMenuButton > span').click(function() {
		$('#partyMenuButton').toggleClass('active');
		$('#partyMenu').toggle(); }
	);
	$('#white').click(function() {
		$('#discoBall').show();
		$('.light').css({'background':'white','boxShadow':'0 0 80px 40px white'}); }
	);
	$('#colored').click(function() {
		$('#discoBall').show();
		$('.light.blue').css({'background':'blue','boxShadow':'0 0 80px 40px blue'});
		$('.light.orange').css({'background':'orange','boxShadow':'0 0 80px 40px orange'});
		$('.light.red').css({'background':'red','boxShadow':'0 0 80px 40px red'});
		$('.light.green').css({'background':'green','boxShadow':'0 0 80px 40px green'});
		$('.light.yellow').css({'background':'yellow','boxShadow':'0 0 80px 40px yellow'}); }
	);
	$('#off').click(function() {
		$('#discoBall').hide(); }
	);
	$('#partyMenu input').click(function() {
		$(this).parents('.group').find('span').css('textShadow','none');
		$(this).next('span').css('textShadow','0 0 4px white'); }
	);
	$('#option-1').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (navigator.info[0] == "MSIE" && source != partyLinkIE1) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLinkIE1 + '" type="audio/mpeg"></audio>');
		}
		else if (navigator.info[0] == "Firefox" && source != partyLink1) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLink1 + '" type="audio/ogg"></audio>');
		}
		else if (source != partyLink1) {
			$('#partyMode source').remove();
			$('#partyMode audio').append('<source src="' + partyLink1 + '" type="audio/ogg">');
		}
		else {
		} }
	);
	$('#option-2').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (navigator.info[0] == "MSIE" && source != partyLinkIE2) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLinkIE2 + '" type="audio/mpeg"></audio>');
		}
		else if (navigator.info[0] == "Firefox" && source != partyLink2) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLink2 + '" type="audio/ogg"></audio>');
		}
		else if (source != partyLink2) {
			$('#partyMode source').remove();
			$('#partyMode audio').append('<source src="' + partyLink2 + '" type="audio/ogg">');
		}
		else {
		} }
	);
	$('#option-3').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (navigator.info[0] == "MSIE" && source != partyLinkIE3) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLinkIE3 + '" type="audio/mpeg"></audio>');
		}
		else if (navigator.info[0] == "Firefox" && source != partyLink3) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLink3 + '" type="audio/ogg"></audio>');
		}
		else if (source != partyLink3) {
			$('#partyMode source').remove();
			$('#partyMode audio').append('<source src="' + partyLink3 + '" type="audio/ogg">');
		}
		else {
		} }
	);
	$('#option-4').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (navigator.info[0] == "MSIE" && source != partyLinkIE4) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLinkIE4 + '" type="audio/mpeg"></audio>');
		}
		else if (navigator.info[0] == "Firefox" && source != partyLink4) {
			$('#partyMode audio').remove();
			$('#partyMode').append('<audio autoplay loop><source src="' + partyLink4 + '" type="audio/ogg"></audio>');
		}
		else if (source != partyLink4) {
			$('#partyMode source').remove();
			$('#partyMode audio').append('<source src="' + partyLink4 + '" type="audio/ogg">');
		}
		else {
		} }
	);
	$('#option-5:not(:checked)').on('click',function() {
		$('#partyMode audio').remove();
		if (navigator.info[0] == "MSIE" || navigator.info[0] == "Firefox") {
		}
		else {
			$('#partyMode').append('<audio autoplay loop></audio>');
		} }
	);
	$('#skinDarkNexus').click(function() {
		$('#style style').remove();
		skinDarkNexus(); }
	);
	$('#skinAssembly').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;background-image:url(http://images3.wikia.nocookie.net/yuzura/images/8/85/Hell_background2.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(89,44,1,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(89,44,1,.9) !important;}.ChatWindow .Write::after{background:rgba(89,44,1,.7);}.ChatWindow .Rail{border-left:1px solid rgba(89,44,1,.7) !important;}</style>'); }
	);
	$('#skinVenture').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;background-image:url(http://images3.wikia.nocookie.net/__cb20130210152827/yuzura/images/c/c4/Dragons_background.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(46,89,1,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(46,89,1,.9) !important;}.ChatWindow .Write::after{background:rgba(46,89,1,.7);}.ChatWindow .Rail{border-left:1px solid rgba(46,89,1,.7) !important;}</style>'); }
	);
	$('#skinSentinels').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;background-image:url(http://images3.wikia.nocookie.net/__cb20130210152827/yuzura/images/9/98/FGT_Ichigo_wallpaper.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(1,2,89,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(1,2,89,.9) !important;}.ChatWindow .Write::after{background:rgba(1,2,89,.7);}.ChatWindow .Rail{border-left:1px solid rgba(1,2,89,.7) !important;}</style>'); }
	);
	$('#skinParadox').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;background-image:url(http://images4.wikia.nocookie.net/__cb20130210152826/yuzura/images/0/0c/Mortal_Kombat_background.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(89,1,2,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(89,1,2,.9) !important;}.ChatWindow .Write::after{background:rgba(89,1,2,.7);}.ChatWindow .Rail{border-left:1px solid rgba(89,1,2,.7) !important;}</style>'); }
	);
	function skinDarkNexus() {
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;}</style>');
	} },
	function() {
		$('#partyMode audio').off();
		$('#partyMode, #partyMenuButton').remove();
	}
);
 
/* Chat options */
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
chatOptionsLoaded = 1;
importScriptPage('MediaWiki:Chat.js/options.js','xiaolinpedia');
}
/* END chat options */
 
/* Clear chat button */
function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear chat</a></div>').prependTo('.Rail');
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
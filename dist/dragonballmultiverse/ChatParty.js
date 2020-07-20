$('head').append('<style type="text/css">#partyMenuButton{margin:0 !important;font-size:16px;cursor:pointer;vertical-align:top;color:silver;display:inline-block;}#WikiaPage,#partyMenu{transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-ms-transition:background .5s;}</style>');

/* Retrieve */
var song1 = localStorage.getItem("song1") == "true";
var song2 = localStorage.getItem("song2") == "true";
var song3 = localStorage.getItem("song3") == "true";

var whiteLights = localStorage.getItem("whiteLights") == "true";
var coloredLights = localStorage.getItem("coloredLights") == "true";

var checkSong1 = " ", //Mute by default
    checkSong2 = " ",
    checkSong3 = " ",
    checkSong4 = "checked",
    glowSong1 = "",
    glowSong2 = "",
    glowSong3 = "",
    glowSong4 = 'style="text-shadow: 0 0 5px white;"',
    usedLink = partyLink1;

var checkLights1 = " ", //No lights by default
    checkLights2 = " ",
    checkLights3 = "checked",
    glowLights1 = "",
    glowLights2 = "",
    glowLights3 = 'style="text-shadow: 0 0 5px white;"';

navigator.info = (function() {
	var N = navigator.appName, ua = navigator.userAgent, tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i))!== null) M[2] = tem[1];
	M = M? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
 
	return M; }
)();
 
if (navigator.info[0] == "Chrome") {
	if (!$("#partyMenuButton").length) {
	$('.Rail').prepend('<br><div id="partyTrigger" style="text-shadow: 0 0 5px gold; margin:auto; cursor: pointer; font-size:130%; font: black; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="https://i.imgur.com/7IAYwgt.png" width="18px"/>&nbsp;Muffin Button</div><br>'); // Prevent multiple buttons from being appended
    }
	console.log('ChatParty initialized');
}
else if (navigator.info[0] == "MSIE" && navigator.info[1] >= 10) {
	if (!$("#partyMenuButton").length) {
	$('.Rail').prepend('<br><div id="partyTrigger" style="text-shadow: 0 0 5px gold; margin:auto; cursor: pointer; font-size:130%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="https://i.imgur.com/7IAYwgt.png" width="18px"/>&nbsp;Muffin Button</div><br>'); // Prevent multiple buttons from being appended
    }
	console.log('ChatParty initialized');
}
else if (navigator.info[0] == "Firefox" && navigator.info[1] >= 5) {
	if (!$("#partyMenuButton").length) {
	$('.Rail').prepend('<br><div id="partyTrigger" style="text-shadow: 0 0 5px gold; margin:auto; cursor: pointer; font-size:130%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="https://i.imgur.com/7IAYwgt.png" width="18px"/>&nbsp;Muffin Button</div><br>'); // Prevent multiple buttons from being appended
    }
	console.log('ChatParty initialized');
}
else if (navigator.info[0] == "Safari" && navigator.platform == "Mac" || "iPad" ) {
	if (!$("#partyMenuButton").length) {
	$('.Rail').prepend('<br><div id="partyTrigger" style="text-shadow: 0 0 5px gold; margin:auto; cursor: pointer; font-size:130%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="https://i.imgur.com/7IAYwgt.png" width="18px"/>&nbsp;Muffin Button</div><br>'); // Prevent multiple buttons from being appended
    }
	console.log('ChatParty initialized');
}

if (song1 === true) {
    checkSong1 = "checked"; //Check selected song
    checkSong4 = " "; //Uncheck default song
    glowSong1 = 'style="text-shadow: 0 0 5px white;"';
    glowSong4 = "";
    usedLink = partyLink1;
}
else if (song2 === true) {
    checkSong2 = "checked"; //Check selected song
    checkSong4 = " "; //Uncheck default song
    glowSong2 = 'style="text-shadow: 0 0 5px white;"';
    glowSong4 = "";
    usedLink = partyLink2;
}
else if (song3 === true) {
    checkSong3 = "checked"; //Check selected song
    checkSong4 = " "; //Uncheck default song
    glowSong3 = 'style="text-shadow: 0 0 5px white;"';
    glowSong4 = "";
    usedLink = partyLink3;
}


if (whiteLights === true) {
    checkLights1 = "checked"; //Check selected lights
    checkLights3 = " "; //Uncheck default lights
    glowLights1 = 'style="text-shadow: 0 0 5px white;"',
    glowLights3 = "";
}
else if (coloredLights === true) {
    checkLights2 = "checked"; //Check selected lights
    checkLights3 = " "; //Uncheck default lights
    glowLights2 = 'style="text-shadow: 0 0 5px white;"',
    glowLights3 = "";
}

	$('.ChatWindow').append('<div id="partyMode"><div id="discoBall"><div class="light blue" style="top: 5%; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 5%; animation-delay: 2s; -moz-animation-delay: 2s; -webkit-animation-delay: 2s; -ms-animation-delay: 2s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 5%; animation-delay: 4s; -moz-animation-delay: 4s; -webkit-animation-delay: 4s; -ms-animation-delay: 4s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 25%; animation-delay: 1s; -moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 25%; animation-delay: 3s; -moz-animation-delay: 3s; -webkit-animation-delay: 3s; -ms-animation-delay: 3s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light blue" style="top: 25%; animation-delay: 5s; -moz-animation-delay: 5s; -webkit-animation-delay: 5s; -ms-animation-delay: 5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 45%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 45%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 45%; animation-delay: 7.5s; -moz-animation-delay: 7.5s; -webkit-animation-delay: 7.5s; -ms-animation-delay: 7.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 65%; animation-delay: 0.5s; -moz-animation-delay: 0.5s; -webkit-animation-delay: 0.5s; -ms-animation-delay: 0.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light blue" style="top: 65%; animation-delay: 2.5s; -moz-animation-delay: 2.5s; -webkit-animation-delay: 2.5s; -ms-animation-delay: 2.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 65%; animation-delay: 4.5s; -moz-animation-delay: 4.5s; -webkit-animation-delay: 4.5s; -ms-animation-delay: 4.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 85%; animation-delay: 1.5s; -moz-animation-delay: 1.5s; -webkit-animation-delay: 1.5s; -ms-animation-delay: 1.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 85%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 85%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 80px 40px white;"></div></div><audio autoplay loop><source src="' + usedLink + '" type="audio/ogg"></audio><style type="text/css">#ChatHeader .public.wordmark a.active:hover{background-image:none !important;background-color:transparent !important;}#partyMenu{padding:5px;position:absolute;z-index:1;cursor:default;min-width:250px;}#partyMenuButton>span{padding:11px 10px;}.light{position:fixed;border-radius:100%;opacity:.4;left:-100px;z-index:10;animation:lights 6s linear infinite;-moz-animation:lights 6s linear infinite;-webkit-animation:lights 6s linear infinite;-ms-animation:lights 6s linear infinite;}@keyframes lights{from{left:100%;}to{left:-100px;}}@-moz-keyframes lights{from{left:100%;}to{left:-100px;}}@-webkit-keyframes lights{from{left:100%;}to{left:-100px;}}@-ms-keyframes lights{from{left:100%;}to{left:-100px;}}#partyMenu label{display:block;}#partyMenu table{width:100%;}</style><div id="style"></div></div>');
	$('#ChatHeader .public').append('<a id="partyMenuButton"><span></span><div id="partyMenu" class="GlobalModule" style="display: none; text-shadow: none;"><form id="music" class="group" style="padding: 0 10px; font-size: 14px;"><p style="margin-bottom: -15px; font-weight: bold;">Music</p><label><input type="radio" id="option-1" name="music" value="option-1"' + checkSong1 + '/><span ' + glowSong1 + '">' + partyLinkText1 + '</span></label><label><input type="radio" id="option-2" name="music" value="option-2"' + checkSong2 + '/><span ' + glowSong2 + '">' + partyLinkText2 + '</span></label><label><input type="radio" id="option-3" name="music" value="option-3"' + checkSong3 + '/><span ' + glowSong3 + '">' + partyLinkText3 + '</span></label><label><input type="radio" id="option-4" name="music" value="option-4"' + checkSong4 + '/><span ' + glowSong4 + '">Off</span></label></form><form id="lights" class="group" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Lights</p><table><tr><td><label><input type="radio" id="colored" name="lights" value="colored"' + checkLights2 + '/><span ' + glowLights2 + '">Colored</span></label></td><td><label><input type="radio" id="white" name="lights" value="white"' + checkLights1 + '/><span ' + glowLights1 + '">White</span></label></td><td><label><input type="radio" id="off" name="lights" value="off"' + checkLights3 + '/><span ' + glowLights3 + '">Off</span></label></td></tr></table></form><form id="skin" class="group" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Skin</p><table><tr><td><label><input type="radio" id="skinOriginal" name="skin" value="skinOriginal" checked /><span style="text-shadow: 0 0 5px white;">Original</span></label></td><td><label><input type="radio" id="skinGoku" name="skin" value="skinGoku" /><span>Son Gokū</span></label></td><td><label><input type="radio" id="skinBroly" name="skin" value="skinBroly" /><span>Vegetto & Broly</span></label></td></tr><tr><td><label><input type="radio" id="skinBlue" name="skin" value="skinBlue" /><span>Blue</span></label></td><td><label><input type="radio" id="skinGotenAndTrunks" name="skin" value="skinGotenAndTrunks" /><span>Goten & Trunks</span></label></td></tr></table></form></div></a>');
	
	if (coloredLights === true) {
        $('.light.blue').css({'background':'blue','boxShadow':'0 0 80px 40px blue'});
		$('.light.orange').css({'background':'orange','boxShadow':'0 0 80px 40px orange'});
		$('.light.red').css({'background':'red','boxShadow':'0 0 80px 40px red'});
		$('.light.green').css({'background':'green','boxShadow':'0 0 80px 40px green'});
		$('.light.yellow').css({'background':'yellow','boxShadow':'0 0 80px 40px yellow'});
	}

	if (song1 === false && song2 === false && song3 === false) {
		$('#partyMode audio').remove();
		if (navigator.info[0] == "MSIE" || navigator.info[0] == "Firefox") {
		}
		else {
			$('#partyMode').append('<audio autoplay loop></audio>');
		}
    }
    if (whiteLights === false && coloredLights === false) {
        $('#discoBall').hide();
    }

	skinOriginal();
	if (navigator.info[0] == "MSIE") {
		$('#partyMode source[type="audio/ogg"]').remove();
		$('#partyMode audio').append('<source src="' + partyLinkIE1 + '" type="audio/mpeg">');
	}
	$('#partyTrigger').click(function() {
		$('#partyTrigger').toggleClass('active');
		$('#partyMenu').toggle();
	});
	$('#white').click(function() {
        localStorage.setItem("whiteLights", true);
        localStorage.setItem("coloredLights", false);
		$('#discoBall').show();
		$('.light').css({'background':'white','boxShadow':'0 0 80px 40px white'});
	});
	$('#colored').click(function() {
        localStorage.setItem("whiteLights", false);
        localStorage.setItem("coloredLights", true);
		$('#discoBall').show();
		$('.light.blue').css({'background':'blue','boxShadow':'0 0 80px 40px blue'});
		$('.light.orange').css({'background':'orange','boxShadow':'0 0 80px 40px orange'});
		$('.light.red').css({'background':'red','boxShadow':'0 0 80px 40px red'});
		$('.light.green').css({'background':'green','boxShadow':'0 0 80px 40px green'});
		$('.light.yellow').css({'background':'yellow','boxShadow':'0 0 80px 40px yellow'});
	});
	$('#off').click(function() {
        localStorage.setItem("whiteLights", false);
        localStorage.setItem("coloredLights", false);
		$('#discoBall').hide();
	});
	$('#partyMenu input').click(function() {
		$(this).parents('.group').find('span').css('textShadow','none');
		$(this).next('span').css('textShadow','0 0 4px white');
	});
	$('#option-1').on('click',function() {
        localStorage.setItem("song1", true);
        localStorage.setItem("song2", false);
        localStorage.setItem("song3", false);
        $('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop></audio>');
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
		}
	});
	$('#option-2').on('click',function() {
        localStorage.setItem("song1", false);
        localStorage.setItem("song2", true);
        localStorage.setItem("song3", false);
        $('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop></audio>');
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
		}
	});
	$('#option-3').on('click',function() {
        localStorage.setItem("song1", false);
        localStorage.setItem("song2", false);
        localStorage.setItem("song3", true);
        $('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop></audio>');
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
		}
	});
	$('#option-4').on('click',function() {
        localStorage.setItem("song1", false);
        localStorage.setItem("song2", false);
        localStorage.setItem("song3", false);
		$('#partyMode audio').remove();
		if (navigator.info[0] == "MSIE" || navigator.info[0] == "Firefox") {
		}
		else {
			$('#partyMode').append('<audio autoplay loop></audio>');
		}
	});
	$('#skinOriginal').click(function() {
		$('#style style').remove();
		skinOriginal();
	});
	$('#skinGoku').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important; background-size:cover; background-image:url(http://orig03.deviantart.net/7252/f/2010/139/6/2/goku_final_battle_by_goku003.png) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(89,44,1,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(89,44,1,.9) !important;}.ChatWindow .Write::after{background:rgba(89,44,1,.7);}.ChatWindow .Rail{border-left:1px solid rgba(89,44,1,.7) !important;}</style>'); }
	);
	$('#skinBroly').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important; background-size:cover; background-image:url(http://orig00.deviantart.net/fd61/f/2013/175/a/8/dragonball_multiverse___bejito_vs_broly_by_hocbo-d31qp0i.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(46,89,1,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(46,89,1,.9) !important;}.ChatWindow .Write::after{background:rgba(46,89,1,.7);}.ChatWindow .Rail{border-left:1px solid rgba(46,89,1,.7) !important;}</style>'); }
	);
	$('#skinBlue').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;background-image:url(http://art.ngfiles.com/images/172/nonn3rs_fionna-and-marshal-lee-x-s.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(1,2,89,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(1,2,89,.9) !important;}.ChatWindow .Write::after{background:rgba(1,2,89,.7);}.ChatWindow .Rail{border-left:1px solid rgba(1,2,89,.7) !important;}</style>'); }
	);
	$('#skinGotenAndTrunks').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important; background-size:cover; background-image:url(http://images4.fanpop.com/image/photos/17800000/Goten-and-Trunks-little-goten-17896885-2560-1600.jpg) !important;}#ChatHeader,.ChatWindow #WikiaPage,.ChatWindow #Write,.ChatWindow #UserStatsMenu,.ChatWindow #UserStatsMenu .info,#partyMenu{background-color:rgba(89,1,2,.7) !important;}.ChatHeader:hover,.ChatWindow #Write:hover,.ChatWindow #UserStatsMenu:hover,#partyMenu:hover{background-color:rgba(89,1,2,.9) !important;}.ChatWindow .Write::after{background:rgba(89,1,2,.7);}.ChatWindow .Rail{border-left:1px solid rgba(89,1,2,.7) !important;}</style>'); }
	);
	function skinOriginal() {
		$('#style').append('<style type="text/css">.ChatWindow{background-color:black !important;}</style>');
	}
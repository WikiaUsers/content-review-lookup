/*************************************/
/*********** Chat Party **************/
/*** Created by ShermanTheMythran ****/
/*************************************/
/* Modified by Ultimate Dark Carnage */
/*************************************/

$('head').append('<style type="text/css">#partyTrigger,#partyMenuButton,#partyVolume{ margin: 0 !important; font-size: 16px; cursor: pointer; vertical-align: top; color: red; display: inline-block;} #partyTrigger { padding: 0 10px;}</style>');
 
navigator.info = (function(){
        var N = navigator.appName, ua = navigator.userAgent, tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i))!== null) M[2] = tem[1];
	M = M? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
 
	return M; 
})();
 
if (navigator.info[0] == "Chrome") {
	$('#ChatHeader .public').append('<div style="width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('Chat Party Mode activated!');
}
 
else if (navigator.info[0] == "MSIE" && navigator.info[1] >= 10) {
	$('#ChatHeader .public').append('<div style="width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('Chat Party Mode activated!');
}
 
else if (navigator.info[0] == "Firefox" && navigator.info[1] >= 5) {
	$('#ChatHeader .public').append('<div style="width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('Chat Party Mode activated!');
}
 
else if (navigator.info[0] == "Safari" && navigator.platform == "Mac" || "iPad" ) {
	$('#ChatHeader .public').append('<div style="width: 40px; display: inline-block;"></div><a id="partyTrigger">Party Mode</a>');
	console.log('Chat Party Mode activated!');
}
 
else {
}
 
$('#partyTrigger').toggle(function(){
    $('.ChatWindow').append('<div id="partyMode"><div id="discoBall"><div class="light blue" style="top: 5%; background: white; box-shadow: 0 0 80px 40px white"></div><div class="light orange" style="top: 5%; animation-delay: 2s; -moz-animation-delay: 2s; -webkit-animation-delay: 2s; -ms-animation-delay: 2s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 5%; animation-delay: 4s; -moz-animation-delay: 4s; -webkit-animation-delay: 4s; -ms-animation-delay: 4s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 25%; animation-delay: 1s; -moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 25%; animation-delay: 3s; -moz-animation-delay: 3s; -webkit-animation-delay: 3s; -ms-animation-delay: 3s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light blue" style="top: 25%; animation-delay: 5s; -moz-animation-delay: 5s; -webkit-animation-delay: 5s; -ms-animation-delay: 5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 45%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 45%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 45%; animation-delay: 7.5s; -moz-animation-delay: 7.5s; -webkit-animation-delay: 7.5s; -ms-animation-delay: 7.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 65%; animation-delay: 0.5s; -moz-animation-delay: 0.5s; -webkit-animation-delay: 0.5s; -ms-animation-delay: 0.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light blue" style="top: 65%; animation-delay: 2.5s; -moz-animation-delay: 2.5s; -webkit-animation-delay: 2.5s; -ms-animation-delay: 2.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light orange" style="top: 65%; animation-delay: 4.5s; -moz-animation-delay: 4.5s; -webkit-animation-delay: 4.5s; -ms-animation-delay: 4.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light red" style="top: 85%; animation-delay: 1.5s; -moz-animation-delay: 1.5s; -webkit-animation-delay: 1.5s; -ms-animation-delay: 1.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light green" style="top: 85%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light yellow" style="top: 85%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light cyan" style="top: 90%; animation-delay: 7.5s; -moz-animation-delay: 7.5s; -webkit-animation-delay: 7.5s; -ms-animation-delay: 7.5s; background: white; box-shadow: 0 0 80px 40px white;"></div><div class="light magenta" style="top: 90%; animation-delay: 7.5s; -moz-animation-delay: 7.5s; -webkit-animation-delay: 7.5s; -ms-animation-delay: 7.5s; background: white; box-shadow: 0 0 80px 40px white;"></div></div><style type="text/css">#ChatHeader .public.wordmark a.active:hover{background-image:none !important;background-color:transparent !important;}#partyMenu{padding:5px;position:absolute;z-index:1;cursor:default;min-width:250px;}#partyMenuButton>span{padding:11px 10px;}.light{position:fixed;border-radius:100%;opacity:.4;left:-100px;z-index:10;animation:lights 6s linear infinite;-moz-animation:lights 6s linear infinite;-webkit-animation:lights 6s linear infinite;-ms-animation:lights 6s linear infinite;}@keyframes lights{from{left:100%;}to{left:-100px;}}@-moz-keyframes lights{from{left:100%;}to{left:-100px;}}@-webkit-keyframes lights{from{left:100%;}to{left:-100px;}}@-ms-keyframes lights{from{left:100%;}to{left:-100px;}}#partyMenu label{display:block;}#partyMenu table{width:100%;}</style><div id="style"></div></div>');
    $('#ChatHeader .public').append('<a id="partyMenuButton"><span>Party Settings</span><div id="partyMenu" class="GlobalModule glass" style="display: none; text-shadow: none;"><form id="music" class="group" style="padding: 0 10px; font-size: 14px;"><p style="margin-bottom: -15px; font-weight: bold;">Music</p><label><input type="radio" id="option-1" name="music" value="option-1" checked /><span style="text-shadow: 0 0 5px white;">' + partyLinkText + '</span></label><label><input type="radio" id="option-2" name="music" value="option-2" /><span>' + partyLinkText2 + '</span></label> <label><input type="radio" id="option-3" name="music" value="option-3" /><span>' + partyLinkText3 + '</span></label><label><input type="radio" id="option-4" name="music" value="option-4" /><span>' + partyLinkText4 + '</span></label><label><input type="radio" id="option-5" name="music" value="option-5" /><span>' + partyLinkText5 + '</span></label><label><input type="radio" id="option-6" name="music" value="option-6" /><span>Off</span></label></form><form id="lights" class="group" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Lights</p><table><tr><td><label><input type="radio" id="white" name="lights" value="white" checked /><span style="text-shadow: 0 0 5px white;">White</span></label></td><td><label><input type="radio" id="colored" name="lights" value="colored" /><span>Colored</span></label></td><td><label><input type="radio" id="monochrome" name="lights" value="monochrome" /><span>Monochrome</span></label></td></tr><tr><td><label><input type="radio" id="monochrome-2" name="lights" value="monochrome-2" /><span>Monochrome 2</span></label></td><td><label><input type="radio" id="sepia" name="lights" value="sepia" /><span>Sepia</span></label></td><td><label><input type="radio" id="off" name="lights" value="off" /><span>Off</span></label></td></tr></table></form><form id="skin" class="group" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Skin</p><table><tr><td><label><input type="radio" name="skin" id="skinEpic" value="skinEpic" checked /><span style="font-weight: bold;">Epic (Awesome Face)</span></label></td><td><label><input type="radio" name="skin" id="skinSharingan" value="skinSharingan" /><span>Sharingan</span></label></td><td><label><input type="radio" name="skin" id="skinTest" value="skinTest" /><span>Test</span></label></td></tr><tr><td><label><input type="radio" name="skin" id="skinInvert" value="skinInvert" /><span>Invert</span></label></td><td><label><input type="radio" name="skin" id="skinNight" value="skinNight" /><span>Night Skin</span></label></td></tr></table></form></div></a>');
    skinEpic();
    if (navigator.info[0] == "MSIE") {
	$('#partyMode source[type="audio/ogg"]').remove();
	$('#partyMode audio').append('<source src="' + partyLinkIE + '" type="audio/mpeg">');
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
	$('.light.yellow').css({'background':'yellow','boxShadow':'0 0 80px 40px yellow'});
         $('.light.cyan').css({'background':'cyan', 'boxShadow':'0 0 80px 40px cyan'});
         $('.light.magenta').css({'background':'magenta', 'boxShadow':'0 0 80px 40px magenta'}); 
    });

    $('#monochrome').click(function() {
         $('.light.blue').css({'background':'rgb(40, 40, 40)', 'boxShadow':'0 0 80px 40px rgb(40, 40, 40)'});
         $('.light.orange').css({'background':'rgb(59, 59, 59)', 'boxShadow':'0 0 80px 40px rgb(59, 59, 59)'});
         $('.light.red').css({'background':'rgb(85, 85, 85)', 'boxShadow':'0 0 80px 40px rgb(85, 85, 85)'});
         $('.light.green').css({'background':'rgb(67, 67, 67)', 'boxShadow':'0 0 80px 40px rgb(67, 67, 67)'});
         $('.light.yellow').css({'background':'rgb(95, 95, 95)', 'boxShadow':'0 0 80px 40px rgb(95, 95, 95)'});
         $('.light.cyan').css({'background':'rgb(121, 121, 121)', 'boxShadow':'0 0 80px 40px rgb(121, 121, 121)'});
         $('.light.magenta').css({'background':'rgb(173, 173, 173)', 'boxShadow':'0 0 80px 40px rgb(173, 173, 173)'});
    });

    $('#monochrome-2').click(function() {
         $('.light.blue').css({'background':'#da1f0a', 'boxShadow':'0 0 80px 40px #da1f0a'});
         $('.light.orange').css({'background':'#ad12af', 'boxShadow':'0 0 80px 40px #ad12af'});
         $('.light.red').css({'background':'#8a1a0a', 'boxShadow':'0 0 80px 40px #8a1a0a'});
         $('.light.green').css({'background':'#a11a0f', 'boxShadow':'0 0 80px 40px #a11a0f'});
         $('.light.yellow').css({'background':'#df1f0a', 'boxShadow':'0 0 80px 40px #df1f0a'});
         $('.light.cyan').css({'background':'#7d1a0f', 'boxShadow':'0 0 80px 40px #7d1a0f'});
         $('.light.magenta').css({'background':'#5d1a11', 'boxShadow':'0 0 80px 40px #5d1a11'});
    });

    $('#sepia').click(function() {
         $('.light').css({'background':'rgb(112, 66, 20)', 'boxShadow':'0 0 80px 40px rgb(112, 66, 20)'});
    });

    $('#off').click(function() {
	$('#discoBall').hide(); }
    );
 
    $('#partyMenu input:not([type="range"])').click(function() {
	$(this).parents('.group').find('span').css('textShadow','none');
	$(this).next('span').css('textShadow','0 0 4px white'); }
    );
 
    $('#option-1').on('click',function() {
	source = $('#partyMode source').attr('src');
	if (navigator.info[0] == "MSIE" && source != partyLinkIE) {
		$('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop><source src="' + partyLinkIE + '" type="audio/mpeg"></audio>');
	}
        else if (navigator.info[0] == "Firefox" && source != partyLink) {
		$('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop><source src="' + partyLink + '" type="audio/ogg"></audio>');
	}
	else if (source != partyLink) {
		$('#partyMode source').remove();
		$('#partyMode audio').append('<source src="' + partyLink + '" type="audio/ogg">');
	}
	else {
	} 
     });
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
	} 
     });
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
	} 
     });
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
	} 
     });
     $('#option-5').on('click',function() {
	source = $('#partyMode source').attr('src');
	if (navigator.info[0] == "MSIE" && source != partyLinkIE5) {
		$('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop><source src="' + partyLinkIE5 + '" type="audio/mpeg"></audio>');
	}
	else if (navigator.info[0] == "Firefox" && source != partyLink3) {
		$('#partyMode audio').remove();
		$('#partyMode').append('<audio autoplay loop><source src="' + partyLink5 + '" type="audio/ogg"></audio>');
	}
	else if (source != partyLink3) {
		$('#partyMode source').remove();
		$('#partyMode audio').append('<source src="' + partyLink5 + '" type="audio/ogg">');
	}
	else {
	} 
     });
     $('#option-6:not(:checked)').click(function() {
	$('#partyMode audio').remove();
	if (navigator.info[0] == "MSIE" || navigator.info[0] == "Firefox") {
	}
	else {
	     $('#partyMode').append('<audio autoplay loop></audio>');
	} 
     });
     $('#skinEpic').click(function(){
	$('#style style').remove();
	skinEpic(); 
     });
     $('#skinSharingan').click(function(){
        $('#style style').remove();
        $('#style').append('<style type="text/css">.ChatWindow { background-color: black; background-image: url(http://th07.deviantart.net/fs71/PRE/i/2011/240/2/c/madara__s_eternal_mangekyou_by_alpha_element-d47xun4.jpg) !important; background-size: 50% 50%; background-position: center !important; background-repeat: no-repeat !important;}</style>');
     });
     $('#skinTest').click(function(){
        $('#style style').remove();
        $('#style').append('<style type="text/css">.ChatWindow { background-color: white; background-image: url(); background-size: cover; background-repeat: no-repeat; }</style>');
     });
     $('#skinInvert').click(function(){
        $('#style style').remove();
        $('#style').append('<style type="text/css">.ChatWindow { background-color: #0a0a0a; color: #1a1a1a; } .Rail, .Chat, .ChatHeader, .Chat .you { background-color: #ffffff; }</style>');
     });
     function skinEpic(){
        $('#style').append('<style type="text/css">.ChatWindow { background-color: black; background-image: url(https://images.wikia.nocookie.net/fairytail/images/1/13/Awesome.png); background-size: 500px !important; background-position: center !important; background-repeat: repeat-x !important; }</style>');
     }
    },
    function(){
         $('#partyMode audio').off();
	$('#partyMode, #partyMenuButton').remove();
    }
);
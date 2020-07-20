$('head').append('<style type="text/css">#partyTrigger,#partyMenuButton,#partyHelp,#partyInfo{margin:0 !important;font-size:16px;cursor:pointer;vertical-align:top;color:white;}#partyTrigger,#partyHelp,#partyTech,#partyInfo{padding:0 10px;}#ChatHeader{z-index:1;}#partyTech{margin:0 !important;font-size:10px;vertical-align:top;color:white;line-height:10px;display:inline-block;padding-top:5px;}</style>');

navigator.info = (function() {
	var N = navigator.appName, ua = navigator.userAgent, tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i))!== null) M[2] = tem[1];
	M = M? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

	return M; }
)();

var cpVersion = "1.3.1";
var chatParty = false;
var holiday = false;
var holidayName = "";
var holidayFont = "";
var holidayStyle = "";

function inlineAlert(text) {
	mainRoom.model.chats.add(new models.InlineAlert( {text:(text)} ));
}

if ((navigator.info[0] == "Chrome") || (navigator.info[0] == "MSIE" && navigator.info[1] >= 10) || (navigator.info[0] == "Firefox" && navigator.info[1] >= 5) || (navigator.info[0] == "Safari" && navigator.platform == "Mac") || (navigator.info[0] == "Safari" && navigator.platform == "iPad")) {
	$('#ChatHeader .public').append('<a id="partyTrigger">Party Mode</a>');
	console.log('ChatParty v' + cpVersion + ' initialized in Chrome ' + navigator.info[1]);
	inlineAlert('ChatParty successfully initialized.');
	chatParty = true;
}
else {
	$('#ChatHeader .public').append('<a href="/wiki/Project:Chat/Party_Mode" target="_blank" id="partyHelp">Help</a><a id="partyInfo">Tech</a><div id="partyTech" style="display: none;"><ul><li>Browser: ' + navigator.info[0] + '</li><li>Version: ' + navigator.info[1] + '</li><li>OS: ' + navigator.platform + '</li></ul></div>');
	$('#partyInfo').click(function() {
		$(this).hide();
		$('#partyTech').show(); }
	);
	inlineAlert('ChatParty was not initialized successfully.<br/>Please update your browser, or see the "Help" button for a list of supported browsers.');
}

function shell() {
partyLink1 = "https://images.wikia.nocookie.net/marbleblast/images/2/22/The_Race.ogg";
partyLinkText1 = "The Race - Platinum Team";
partyLink2 = "https://images.wikia.nocookie.net/marbleblast/images/f/f7/Seaside_Revisited.ogg";
partyLinkText2 = "Seaside Revisited - Platinum Team";
partyLink3 = "https://images.wikia.nocookie.net/marbleblast/images/a/ac/Tim_Trance.ogg";
partyLinkText3 = "Tim Trance - Tim Clarke";
$('#partyTrigger').toggle(function() {
	$('.ChatWindow').append('<div id="partyMode"><div id="discoBall"><div class="light blue" style="top: 5%; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light orange" style="top: 5%; animation-delay: 2s; -moz-animation-delay: 2s; -webkit-animation-delay: 2s; -ms-animation-delay: 2s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light red" style="top: 5%; animation-delay: 4s; -moz-animation-delay: 4s; -webkit-animation-delay: 4s; -ms-animation-delay: 4s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light green" style="top: 25%; animation-delay: 1s; -moz-animation-delay: 1s; -webkit-animation-delay: 1s; -ms-animation-delay: 1s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light yellow" style="top: 25%; animation-delay: 3s; -moz-animation-delay: 3s; -webkit-animation-delay: 3s; -ms-animation-delay: 3s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light blue" style="top: 25%; animation-delay: 5s; -moz-animation-delay: 5s; -webkit-animation-delay: 5s; -ms-animation-delay: 5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light orange" style="top: 45%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light red" style="top: 45%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light green" style="top: 45%; animation-delay: 7.5s; -moz-animation-delay: 7.5s; -webkit-animation-delay: 7.5s; -ms-animation-delay: 7.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light yellow" style="top: 65%; animation-delay: 0.5s; -moz-animation-delay: 0.5s; -webkit-animation-delay: 0.5s; -ms-animation-delay: 0.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light blue" style="top: 65%; animation-delay: 2.5s; -moz-animation-delay: 2.5s; -webkit-animation-delay: 2.5s; -ms-animation-delay: 2.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light orange" style="top: 65%; animation-delay: 4.5s; -moz-animation-delay: 4.5s; -webkit-animation-delay: 4.5s; -ms-animation-delay: 4.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light red" style="top: 85%; animation-delay: 1.5s; -moz-animation-delay: 1.5s; -webkit-animation-delay: 1.5s; -ms-animation-delay: 1.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light green" style="top: 85%; animation-delay: 3.5s; -moz-animation-delay: 3.5s; -webkit-animation-delay: 3.5s; -ms-animation-delay: 3.5s; background: white; box-shadow: 0 0 20px 20px white;"></div><div class="light yellow" style="top: 85%; animation-delay: 5.5s; -moz-animation-delay: 5.5s; -webkit-animation-delay: 5.5s; -ms-animation-delay: 5.5s; background: white; box-shadow: 0 0 20px 20px white;"></div></div><audio autoplay loop><source src="' + partyLink1 + '" type="audio/ogg"></audio><style type="text/css">#ChatHeader .public.wordmark a.active:hover{background-image:none !important;background-color:transparent !important;}#partyMenu{padding:5px;position:absolute;z-index:1;cursor:default;min-width:250px;}#partyMenuButton>span{padding:11px 10px;}.light{position:fixed;width:10px;height:10px;border-radius:100%;opacity:.4;left:-100px;z-index:10;animation:lights 6s linear infinite;-moz-animation:lights 6s linear infinite;-webkit-animation:lights 6s linear infinite;-ms-animation:lights 6s linear infinite;}@keyframes lights{from{left:100%;}to{left:-100px;}}@-moz-keyframes lights{from{left:100%;}to{left:-100px;}}@-webkit-keyframes lights{from{left:100%;}to{left:-100px;}}@-ms-keyframes lights{from{left:100%;}to{left:-100px;}}#partyMenu label{display:block;}#partyMenu table{width:100%;}</style><div id="style"></div><h1 id="holidayName" style="display:none;text-align:center;font-size:1000%;">' + holidayName + '</h1></div>');
	$('#ChatHeader .public').append('<a id="partyMenuButton"><span>Settings</span><div id="partyMenu" style="display: none;"><form id="music" style="padding: 0 10px; font-size: 14px;"><p style="margin-bottom: -15px; font-weight: bold;">Music</p><label><input type="radio" id="option-1" name="music" value="option-1" checked="checked" /><span style="text-shadow: 0 0 5px white;">' + partyLinkText1 + '</span></label><label><input type="radio" id="option-2" name="music" value="option-2" /><span>' + partyLinkText2 + '</span></label><label><input type="radio" id="option-3" name="music" value="option-3" /><span>' + partyLinkText3 + '</span></label><label id="option-special-group" style="display: none; font-weight: bold;"><input type="radio" id="option-special" name="music" value="option-special" /><span style="font-weight:bold;">Special Track</span>&nbsp;(<span id="option-special-descrip">Special Event</span>)</label><label id="option-1-group" style="display: none;"><input type="radio" id="option-4" name="music" value="option-4" /><span>Custom #1</span></label><label id="option-2-group" style="display: none;"><input type="radio" id="option-5" name="music" value="option-5" /><span>Custom #2</span></label><label id="option-3-group" style="display: none;"><input type="radio" id="option-6" name="music" value="option-6" /><span>Custom #3</span></label><label><input type="radio" id="option-7" name="music" value="option-7" /><span>Off</span></label></form><form id="lights" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Lights</p><table><tr><td><label><input type="radio" id="white" name="lights" value="white" checked="checked" /><span style="text-shadow: 0 0 5px white;">White</span></label></td><td><label><input type="radio" id="colored" name="lights" value="colored" /><span>Colored</span></label></td><td><label><input type="radio" id="off" name="lights" value="off" /><span>Off</span></label></td></tr></table></form><form id="skin" style="padding: 0 10px; font-size: 14px; margin-top: 5px;"><p style="margin-bottom: -15px; font-weight: bold;">Skin</p><table><tr><td><label><input type="radio" id="inverted" name="skin" value="inverted" checked="checked" /><span style="text-shadow: 0 0 5px white;">Inverted</span></label></td><td><label><input type="radio" id="neon" name="skin" value="neon" /><span>Neon</span></label></td><td><label><input type="radio" id="glass" name="skin" value="glass" /><span>Glass</span></label></td></tr><tr><td><label><input type="radio" id="metallic" name="skin" value="metallic" /><span>Metallic</span></label></td><td><label><input type="radio" id="metro" name="skin" value="metro" /><span>Metro</span></label></td><td id="special-skin-td" style="display:none;"><label><input type="radio" id="special-skin" name="skin" value="special" /><span style="font-weight:bold;">Special</span></label></td></tr></table></form></div></a><a href="/wiki/Project:Chat/Party_Mode" target="_blank" id="partyHelp">Help</a><a id="partyInfo">Tech</a><div id="partyTech" style="display: none;"><ul><li>Browser: ' + navigator.info[0] + '</li><li>Version: ' + navigator.info[1] + '</li><li>OS: ' + navigator.platform + '</li></ul></div>');
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
		$('.light').css({'background':'white','boxShadow':'0 0 20px 20px white'}); }
	);
	$('#colored').click(function() {
		$('#discoBall').show();
		$('.light.blue').css({'background':'blue','boxShadow':'0 0 20px 20px blue'});
		$('.light.orange').css({'background':'orange','boxShadow':'0 0 20px 20px orange'});
		$('.light.red').css({'background':'red','boxShadow':'0 0 20px 20px red'});
		$('.light.green').css({'background':'green','boxShadow':'0 0 20px 20px green'});
		$('.light.yellow').css({'background':'yellow','boxShadow':'0 0 20px 20px yellow'}); }
	);
	$('#off').click(function() {
		$('#discoBall').hide(); }
	);
	$('#music input').click(function() {
		$('#music span').css('textShadow','none');
		$(this).next('span').css('textShadow','0 0 4px white'); }
	);
	$('#lights input').click(function() {
		$('#lights span').css('textShadow','none');
		$(this).next('span').css('textShadow','0 0 4px white'); }
	);
	$('#skin input').click(function() {
		$('#skin span').css('textShadow','none');
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
	if (navigator.info[0] == "MSIE") {
		$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-ie-1'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.customLink1 = data; $('#option-1-group').show(); } });
		$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-ie-2'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.customLink2 = data; $('#option-2-group').show(); } });
		$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-ie-3'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.customLink3 = data; $('#option-3-group').show(); } });
		$.get('/index.php', {action: 'raw', title: 'MediaWiki:Party-special-ie'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.specialLink = data; $('#option-special-group').show(); } });
	}
	else {
		$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-1'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.customLink1 = data; $('#option-1-group').show(); } });
		$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-2'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.customLink2 = data; $('#option-2-group').show(); } });
		$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-3'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.customLink3 = data; $('#option-3-group').show(); } });
		$.get('/index.php', {action: 'raw', title: 'MediaWiki:Party-special'}, function success(data) { if(data.substring(0, 7) == 'http://') { window.specialLink = data; $('#option-special-group').show();  } });
	}
	$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-1-text'}, function success(data) { $('#option-4').next('span').text(data); });
	$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-2-text'}, function success(data) { $('#option-5').next('span').text(data); });
	$.get('/index.php', {action: 'raw', title: 'User:' + wgUserName + '/Party-link-3-text'}, function success(data) { $('#option-6').next('span').text(data); });
	$.get('/index.php', {action: 'raw', title: 'MediaWiki:Party-special-text'}, function success(data) { $('#option-special').next('span').text(data); });
	$.get('/index.php', {action: 'raw', title: 'MediaWiki:Party-special-descrip'}, function success(data) { $('#option-special-descrip').text(data); });
	$('#option-4').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (source != customLink1) {
			$('#partyMode audio').remove();
			if (navigator.info[0] == "MSIE") {
				$('#partyMode').append('<audio autoplay loop><source src="' + customLink1 + '" type="audio/mpeg"></audio>');
		}
			else {
				$('#partyMode').append('<audio autoplay loop><source src="' + customLink1 + '" type="audio/ogg"></audio>');
			}
		} }
	);
	$('#option-5').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (source != customLink2) {
			$('#partyMode audio').remove();
			if (navigator.info[0] == "MSIE") {
				$('#partyMode').append('<audio autoplay loop><source src="' + customLink2 + '" type="audio/mpeg"></audio>');
			}
			else {
				$('#partyMode').append('<audio autoplay loop><source src="' + customLink2 + '" type="audio/ogg"></audio>');
			}
		} }
	);
	$('#option-6').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (source != customLink3) {
			$('#partyMode audio').remove();
			if (navigator.info[0] == "MSIE") {
				$('#partyMode').append('<audio autoplay loop><source src="' + customLink3 + '" type="audio/mpeg"></audio>');
			}
			else {
				$('#partyMode').append('<audio autoplay loop><source src="' + customLink3 + '" type="audio/ogg"></audio>');
			}
		} }
	);
	$('#option-special').on('click',function() {
		source = $('#partyMode source').attr('src');
		if (source != specialLink) {
			$('#partyMode audio').remove();
			if (navigator.info[0] == "MSIE") {
				$('#partyMode').append('<audio autoplay loop><source src="' + specialLink + '" type="audio/mpeg"></audio>');
			}
			else {
				$('#partyMode').append('<audio autoplay loop><source src="' + specialLink + '" type="audio/ogg"></audio>');
			}
		} }
	);
	$('#option-7').on('click',function() {
		if ( $('#partyMode audio')[0] ) {
			$('#partyMode audio').remove();
			if (navigator.info[0] == "MSIE" || navigator.info[0] == "Firefox") {
			}
			else {
				$('#partyMode').append('<audio autoplay loop></audio>');
			}
		} }
	);
	$('#inverted').click(function() {
		$('#style style').remove();
		skinInverted(); }
	);
	$('#neon').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background:black;}#ChatHeader{border-radius:0 !important;background:black !important;box-shadow:0 0 10px 5px #00E6E6;z-index:1;}#WikiaPage{background:black;border-radius:0 !important;box-shadow:0 0 10px 5px #E6E600 !important;top:65px !important;}#WikiaPage .Chat span{color:white;text-shadow:0 0 10px #00E6E6;}#WikiaPage .Chat .you{background:black;}#WikiaPage .Chat .you span{text-shadow:0 0 10px #E600E6 !important;}#Write .message{border:none !important;border-radius:0 !important;background:black !important;padding:8px;}#Write textarea{box-shadow:0 0 10px 5px #E600E6;color:white;padding:2px;}#Rail .User{color:white;}#Rail .User.away{color:#828282;}#Rail .selected{background:none !important;box-shadow:0 0 10px 5px #00E6E6 inset !important;}#Rail .User:hover{background:none !important;text-shadow:0 0 10px #00E6E6;}#UserStatsMenu{background:black !important;border:none !important;border-radius:0 !important;box-shadow:0 0 10px 5px #E6E600 !important;color:white !important;}#UserStatsMenu .info li{color:white !important;}#UserStatsMenu .actions span{color:white !important;}#UserStatsMenu .actions li:hover{background:none !important;text-shadow:0 0 10px #E6E600;}.ChatWindow #Rail .private{background:none !important;box-shadow: 0 0 10px 5px #E600E6 inset;}#ChatHeader .public.wordmark>a:not(#partyMenuButton):hover,#partyMenuButton>span:hover{background:none !important;box-shadow:0 0 10px 5px #E6E600 inset;text-shadow:0 0 5px #E6E600;}#partyMenu{background:black;box-shadow:0 0 10px 5px #E600E6 inset;}#partyMenuButton.active>span{box-shadow:0 0 10px 5px #E600E6 inset;}#partyMenuButton.active>span:hover{text-shadow:0 0 5px #E600E6;}#ChatHeader #partyMenuButton:hover{background:none !important;}</style>'); }
	);
	$('#glass').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background:black;}#ChatHeader{border-radius:100%/10px !important;background:rgba(152,192,192,.4) url(https://images.wikia.nocookie.net/legouniversestories/images/8/88/Glasslrg.png) !important;z-index:1;box-shadow:0px 3px 15px -3px silver;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;}#ChatHeader:hover{background-color:rgba(152,192,192,.6) !important;}.ChatHeader .public a{display:inline-block;margin-top:2px;color:silver;font-style:normal;opacity:1;}.ChatHeader .private{color:silver;font-weight:normal;font-size:20px;margin-top:-1px;}.ChatHeader .User{border:none;width:auto;top:0;padding:8px;}.ChatHeader .User>img{display:none;}.ChatHeader .username{color:silver;margin:5px 10px 0 0;display:inline-block;}.ChatHeader .username::after{display:none;}.ChatHeader .details{color:silver;display:inline-block;}.ChatHeader .status::before{content:"(";}.ChatHeader .status::after{content:")";}#WikiaPage{top:10px !important;bottom:60px;border-radius:100% 100% 0 0/10px 10px 0 0 !important;background:rgba(152,192,192,.4);background-image:url(https://images.wikia.nocookie.net/legouniversestories/images/8/88/Glasslrg.png);color:silver;}.ChatWindow #WikiaPage>div{margin-top:42px;}.Chat{overflow-x:hidden;border:none;bottom:20px;}.Chat .you{background:none;}.Chat .message img{margin-top:-6px;vertical-align:middle;}.Chat .time,.Chat .inline-alert{color:silver;}#Write{background-color:rgba(152,192,192,.4) !important;background-image:url(https://images.wikia.nocookie.net/legouniversestories/images/8/88/Glasslrg.png);border-radius:100%/10px;box-shadow:0px -3px 15px -3px silver;bottom:-50px;right:0;height:70px;opacity:1 !important;transition:background-color .5s;-moz-transition:background-color .5s;-webkit-transition:background-color .5s;}#Write .message{background:none !important;border:none !important;padding:0 150px 0 0;}#Write.blocked .message{opacity:0;}#Write:hover{background-color:rgba(152,192,192,.6) !important;}#Write::after{content:"";width:100%;height:50px;background:rgba(152,192,192,.4);position:absolute;margin:-22px 0 0 -55px;z-index:-1;border-radius:0 0 100% 100%/0 0 10px 10px;}#Write textarea{margin:10px 0;padding:5px 0;color:white;background:rgba(192,192,192,.1);border-radius:100%/10px;transition:background .5s,box-shadow .5s;-moz-transition:background .5s,box-shadow .5s;-webkit-transition:background .5s,box-shadow .5s;}#Write textarea:hover{box-shadow:0 0 15px -3px silver;background:rgba(192,192,192,.2);}#Write textarea:focus{box-shadow:0 0 15px -3px silver inset;}#Write img{margin-top:15px;border-radius:100%/5px !important;}.ChatWindow .Rail{border-left:1px solid rgba(152,192,192,.4) !important;border-left:1px solid silver;top:-4px;bottom:18px;}.ChatWindow .Rail .selected{box-shadow:none;-webkit-box-shadow:none;background:rgba(192,192,192,.1) !important;background:silver;border-radius:100%/10px;-webkit-border-radius:100%/10px;}.WikiaForm input[type="text"]{border:none !important;}.Rail .User:hover{background:rgba(192,192,192,.1) !important;background:silver;}.Rail .User img{border:none;border-radius:100%/5px;-webkit-border-radius:100%/5px;}.Rail .User.away .status{display:block;margin-top:-5px;margin-bottom:-3px;}#UserStatsMenu{border-radius:100%/10px !important;border:none !important;background:rgba(152,192,192,.4) url(https://images.wikia.nocookie.net/legouniversestories/images/8/88/Glasslrg.png) !important;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;}#UserStatsMenu:hover{background:rgba(152,192,192,.6) !important;}#UserStatsMenu .info{border-radius:100%/10px;background:rgba(152,192,192,.4) !important;}#UserStatsMenu .actions{padding:5px 10px;}#UserStatsMenu .separator{border-top-color:rgba(192, 192, 192, 0.1) !important;}#UserStatsMenu .actions li{border-radius:100%/10px;transition:background-color .5s,box-shadow .5s;-moz-transition:background-color .5s,box-shadow .5s;-webkit-transition:background-color .5s,box-shadow .5s;}.ChatWindow .UserStatsMenu .actions li:hover{background:rgba(192, 192, 192, 0.1) !important;background:silver;box-shadow:0px 3px 15px -3px silver inset;}.ChatWindow a{font-style:italic;}.ChatWindow .UserStatsMenu a,.ChatWindow .modalWrapper a{font-style:normal;}.ChatWindow .edits img{display:none;}#UserStatsMenu span,#UserStatsMenu li{color:silver !important;}#ChatHeader .public.wordmark>a:hover{background:none !important;}#ChatHeader .public>a:not(#partyMenuButton):hover,#partyMenuButton>span:hover{text-shadow:0 0 5px silver;}#partyMenu{background:rgba(152,192,192,.4) url(https://images.wikia.nocookie.net/legouniversestories/images/8/88/Glasslrg.png);border-radius:100%/10px;box-shadow:0 3px 15px -3px silver;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;}#partyMenu:hover{background-color:rgba(152,192,192,.6);}</style>'); }
	);
	$('#metallic').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background:black;}#ChatHeader,#partyMenu,#ChatHeader .public>a:not(#partyMenuButton):hover,#partyMenuButton>span:hover,#Rail .selected,#UserStatsMenu,#UserStatsMenu .actions li:hover,.ChatWindow #Rail .private{background:linear-gradient(135deg,rgb(192,192,192) 0%,rgb(172,172,172) 50%,rgb(152,152,152) 50%,rgb(192,192,192) 100%) !important;background:-moz-linear-gradient(-45deg,rgb(192,192,192) 0%,rgb(172,172,172) 50%,rgb(152,152,152) 50%,rgb(192,192,192) 100%) !important;background:-webkit-linear-gradient(-45deg,rgb(192,192,192) 0%,rgb(172,172,172) 50%,rgb(152,152,152) 50%,rgb(192,192,192) 100%) !important;background:-ms-linear-gradient(-45deg,rgb(192,192,192) 0%,rgb(172,172,172) 50%,rgb(152,152,152) 50%,rgb(192,192,192) 100%) !important;border-radius:2px !important;box-shadow:0 1px 1px gray;}#ChatHeader .public>a:not(#partyMenuButton):active,#partyMenuButton>span:active,#UserStatsMenu .actions li:active,#partyMenuButton.active>span{background:linear-gradient(135deg,rgb(192,192,192) 0%,rgb(152,152,152) 50%,rgb(172,172,172) 50%,rgb(192,192,192) 100%) !important;background:-moz-linear-gradient(-45deg,rgb(192,192,192) 0%,rgb(152,152,152) 50%,rgb(172,172,172) 50%,rgb(192,192,192) 100%) !important;background:-webkit-linear-gradient(-45deg,rgb(192,192,192) 0%,rgb(152,152,152) 50%,rgb(172,172,172) 50%,rgb(192,192,192) 100%) !important;background:-ms-linear-gradient(-45deg,rgb(192,192,192) 0%,rgb(152,152,152) 50%,rgb(172,172,172) 50%,rgb(192,192,192) 100%) !important;box-shadow:0 1px 1px gray inset;}#WikiaPage,#Rail .User:hover,#Write .message{background:linear-gradient(135deg,rgba(192,192,192,.5) 0%,rgba(172,172,172,.5) 50%,rgba(152,152,152,.5) 50%,rgba(192,192,192,.5) 100%) !important;background:-moz-linear-gradient(-45deg,rgba(192,192,192,.5) 0%,rgba(172,172,172,.5) 50%,rgba(152,152,152,.5) 50%,rgba(192,192,192,.5) 100%) !important;background:-webkit-linear-gradient(-45deg,rgba(192,192,192,.5) 0%,rgba(172,172,172,.5) 50%,rgba(152,152,152,.5) 50%,rgba(192,192,192,.5) 100%) !important;background:-ms-linear-gradient(-45deg,rgba(192,192,192,.5) 0%,rgba(172,172,172,.5) 50%,rgba(152,152,152,.5) 50%,rgba(192,192,192,.5) 100%) !important;}#WikiaPage{border-radius:2px !important;}#UserStatsMenu{border:none !important;}#UserStatsMenu span,#UserStatsMenu li,#UserStatsMenu a{color:white !important;}#Rail .User,.Chat span{color:white;}.Chat .you{background:none;}#Write img{border-radius:2px !important;}#Write .message{border:none !important;border-radius:2px !important;}#Write textarea{color:white;}</style>'); }
	);
	$('#metro').click(function() {
		$('#style style').remove();
		$('#style').append('<style type="text/css">.ChatWindow{background:black;}#ChatHeader,#Write .message{border-radius:0 !important;background:#7800f0 !important;border:none !important;}#WikiaPage{border-radius:0 !important;background:black;}#ChatHeader .public>a:not(.partyMenuButton):hover,#partyMenuButton>span:hover,#Rail .User:hover,#UserStatsMenu .actions li:hover{background:#78f000 !important;}#partyMenuButton.active>span,#partyMenu,#Rail .selected,#UserStatsMenu{background:#f00078 !important;border:none !important;border-radius:0 !important;}#Rail,#Write textarea{color:white;}#UserStatsMenu span,#UserStatsMenu li,#UserStatsMenu a{color:white !important;}.Chat span,.Chat li{color:white !important;}.Chat .you{background:none;}</style>'); }
	);
	function skinInverted() {
		$('#style').append('<style type="text/css">.ChatWindow,#Rail .selected{background-color:black !important;background-image:-moz-linear-gradient(top,rgb(30,30,30) 0%,black 100%) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgb(30,30,30)),color-stop(100%,black)) !important;background-image:-webkit-linear-gradient(top,rgb(30,30,30) 0%,black 100%) !important;background-image:-ms-linear-gradient(top,rgb(30,30,30) 0%,black 100%) !important;background-image:linear-gradient(to bottom,rgb(30,30,30) 0%,black 100%) !important;}.WikiaPage{background:rgb(15,15,15);}.Chat .you{background:rgb(20,20,20);}.Write .message{background:rgb(15,15,15) !important;border-color:rgb(30,30,30) !important;}.Write textarea{color:white !important;}.Chat span{color:white;}#ChatHeader,.ChatWindow #Rail .private{background-color:#305599 !important;background-image:-moz-linear-gradient(top,#3966B7 0%,#27447B 100%) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3966B7),color-stop(100%,#27447B)) !important;background-image:-webkit-linear-gradient(top,#3966B7 0%,#27447B 100%) !important;background-image:-ms-linear-gradient(top, #3966B7 0%,#27447B 100%) !important;background-image:linear-gradient(to bottom,#3966B7 0%,#27447B 100%) !important;}.User{color:rgb(195, 195, 195);}#partyMenuButton.active>span{background-image:-moz-linear-gradient(top,#27447B 0%,#3966B7 100%) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#27447B),color-stop(100%,#3966B7)) !important;background-image:-webkit-linear-gradient(top,#27447B 0%,#3966B7 100%) !important;background-image:-ms-linear-gradient(top,#27447B 0%,#3966B7 100%) !important;background-image:linear-gradient(to bottom,#27447B 0%,#3966B7 100%) !important;}#ChatHeader .public.wordmark a:hover{background-image:-moz-linear-gradient(top,#4572C5 0%,#2D4F8E 100%) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#4572C5),color-stop(100%,#2D4F8E)) !important;background-image:-webkit-linear-gradient(top,#4572C5 0%,#2D4F8E 100%) !important;background-image:-ms-linear-gradient(top, #4572C5 0%,#2D4F8E 100%) !important;background-image:linear-gradient(to bottom,#4572C5 0%,#2D4F8E 100%) !important;}#ChatHeader .public.wordmark a:active,#ChatHeader .public #partyMenuButton.active>span:hover{background-image:-moz-linear-gradient(top,#2D4F8E 0%,#4572C5 100%) !important;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#2D4F8E),color-stop(100%,#4572C5)) !important;background-image:-webkit-linear-gradient(top,#2D4F8E 0%,#4572C5 100%) !important;background-image:-ms-linear-gradient(top, #2D4F8E 0%,#4572C5 100%) !important;background-image:linear-gradient(to bottom,#2D4F8E 0%,#4572C5 100%) !important;}#partyMenu{background:#3966B7;border-radius:0 10px 10px;}#Rail .User:hover{background:#27447B !important;}#partyMenu form{background:#27447B;border-radius:10px;}</style>');
	}
	$('#partyInfo').click(function() {
		$(this).hide();
		$('#partyTech').show(); }
	);
	//if (navigator.info[0] == "MSIE") {
		//$.get('/index.php', {action: 'raw', title: 'MediaWiki:Party-special-ie'}, function success(data) { if(data.substring(0, 7) == 'http://') { $('#option-special').click(); } });
	//}
	//else {
		//$.get('/index.php', {action: 'raw', title: 'MediaWiki:Party-special'}, function success(data) { if(data.substring(0, 7) == 'http://') { $('#option-special').click(); } });
	//}
	if (holiday == true) {
		$('#special-skin-td').show();
		$('#special-skin-td span').text(specialSkinName);
		$('#music label:nth-of-type(1) span, #music label:nth-of-type(2) span, #music label:nth-of-type(3) span').css('fontWeight','bold');
		$('#special-skin').click(function() {
			$('#style style').remove();
			$('#style').append('<style type="text/css">' + specialSkin + '</style>'); }
		);
		$('#special-skin').click();
		if (holidayFont != '') {
			$('head').append('<style type="text/css">@import url(http://fonts.googleapis.com/css?family=' + holidayFont.split(' ').join('+') + ');#holidayName{font-family:' + holidayFont + ';' + holidayStyle + '</style>');
			$('#holidayName').fadeIn('slow','swing').delay('3800').fadeOut('slow','swing');
		}
	}
	else {
		skinInverted();
	}
	$('.aminf').hide();
	$('#skin').append( $('#skin').find('#special-skin').parent('label') ); },
	function() {
		$('#partyMode, #partyMenuButton, #partyHelp, #partyTech, #partyInfo').remove();
		$('.aminf').show();
	}
);
}
shell();

$('#Write textarea').keydown(function(e) {
	if($ ('#Write textarea').val() == "/valentines" && e.keyCode == 13 && chatParty == true) {
		$(this).unbind('keypress').val('');
		importScriptPage('MediaWiki:ChatParty.js/Valentines.js','lmbtest');
	}

	if ($('#Write textarea').val() == "/override" && e.keyCode == 13 && chatParty == false) {
		$('#ChatHeader .public').append('<a id="partyTrigger">Party Mode</a>');
		inlineAlert('ChatParty successfully initialized.<br/>Bugs are unlikely to be fixed, as the source code is dead.<br/>Each person who requests a song is responsible for the content of that song.');
		chatParty = true; }
	}
);
//importScriptPage('MediaWiki:ChatParty.js/Valentines.js','lmbtest');
//importScriptPage('MediaWiki:ChatParty.js/Pattys.js','lmbtest');

/*temp
inlineAlert("ChatParty disabled until the move to Brickimedia.");*/
//$('head').append('<style type="text/css">#music label:nth-of-type(3),#music #option-special-group,#option-1-group,#option-3-group,#skin table{display:none !important;}</style>');
$('head').append('<style type="text/css">#option-special-group,#skin>label{display:none !important;}</style>');

function ghost() {
$('.inline-alert:contains("TheMachine.Wiki"),#WikiChatList li[data-user="TheMachine.Wiki"]').remove();
}
mainRoom.model.chats.bind('afteradd',ghost);
$(document.head).append('<style>#WikiChatList li[data-user="TheMachine.Wiki"]{display:none !important;}</style>');
$('#WikiChatList li[data-user="TheMachine.Wiki"]').remove();
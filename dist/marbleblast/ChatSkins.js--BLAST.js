/* BLAST! Skin */
$('.ChatWindow').attr('id','ChatWindow');
 
var snowOn = false;
var skinType = 'normal';
var snowLeft = 0;
var snowAmount = 0;
 
$('#Write textarea').keydown(function(e) {
	if( $('#Write textarea').val() == "/lag" && e.keyCode == 13 ) {
		unKey(this);
		if(skinType != 'normal'){ if(snowOn) { $('#snowflakesContainer i').remove(); snowOn = false; } else { createSnow(snowAmount); } }
	} else if( $('#Write textarea').val() == "/blast" && e.keyCode == 13 ) {
		unKey(this);
		if(skinType != 'blast') { addBlastSkin(); } else { removeSkin(); }
	} else if( $('#Write textarea').val() == "/normal" && e.keyCode == 13 ) {
		unKey(this);
		removeSkin();
	}
});
 
function removeSkin() {
	skinType = 'normal';
	$('#skinBackground').remove();
}
 
function addBlastSkin() {
	skinType = 'blast';
	snowLeft = 25;
	snowAmount = 20;
	$('.ChatWindow').prepend('<div id="skinBackground"><div class="blastHover"></div><div id="snowflakesContainer"></div><style type="text/css">.ping { color: red !important; } .WikiaPage { background-color: transparent; } .client-js { height: 100%; }  .ChatWindow { background-image: url(https://images.wikia.nocookie.net/__cb20130714004253/marbleblast/images/5/54/Presents.jpg); background-repeat: no-repeat; background-size: contain; background-color: black; background-position: center; -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; -ms-transition: all 1s ease; transition: all 1s ease; overflow: hidden; height: 100%; }  #skinBackground { position: absolute; height: 100%; width: 100%; margin-top: -10px; background-color: rgba(0, 0, 0, 0.3); }  .blastHover { -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; -ms-transition: all 1s ease; transition: all 1s ease; background-image: url(https://images.wikia.nocookie.net/__cb20130714004253/marbleblast/images/5/54/Presents.jpg); opacity: 100; width: 100%; height: 100%; background-repeat: no-repeat; background-size: contain; background-position: center; position: relative; z-index: -1; } .ChatWindow:hover .blastHover { opacity: 1; }  #snowflakesContainer { top: 0px; position: absolute; width: 100%; }  .snowflake { -webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; -ms-transition: all 1s ease; transition: all 1s ease; position: absolute; display: inline-block; background-image: url(https://images.wikia.nocookie.net/runescape/images/2/21/1x1-pixel.png); background-repeat: no-repeat; background-size: contain; background-position: center; opacity: 0.5; width: 4%; height: 0; padding-bottom: 4%; z-index: -1; border-radius: 50%; -webkit-border-radius: 50%; -webkit-transform-origin: left -20px; -webkit-animation: falling 7.7s linear 2s infinite; transform-origin: left -20px; animation: falling 7.7s linear 2s infinite; } .ChatWindow:hover .snowflake { background-image: url(https://images.wikia.nocookie.net/runescape/images/2/21/1x1-pixel.png); } #ChatHeader { border-radius: 20px 20px 0 !important; background-color: rgba(255, 255, 255, 0) !important; background-image: none !important; pointer-events: all; transition: background .4s; -moz-transition: background .4s; -webkit-transition: background .4s; -ms-transition: background .4s; }  .Chat .you { background: none; } .Chat .inline-alert { text-shadow: 0 0 5px black; } #Write .message { background: rgba(255, 255, 255, 0) !important; border: none !important; transition: background .4s; -moz-transition: background .4s; -webkit-transition: background .4s; -ms-transition: background .4s; }  #Write .message:hover,#ChatHeader:hover { background: rgba(255, 255, 255, 0) !important; }  #ChatHeader a:not(#partyMenuButton),#partyMenuButton>span,#Rail .User,#Rail .public,#UserStatsMenu .actions li, #chatOptionsButton { transition: background .4s; -moz-transition: background .4s; -webkit-transition: background .4s; -ms-transition: background .4s; }  #ChatHeader .public.wordmark a#partyMenuButton:hover { background: none !important; }  #ChatHeader a:not(#partyMenuButton):hover,#partyMenuButton>span:hover,#partyMenuButton.active>span,#partyMenu,#Rail .User:hover,#Rail .public:hover,#UserStatsMenu .actions li:hover, #chatOptionsButton:hover { background: rgba(255, 255, 255, 0) !important; }  #Rail .selected, .ChatWindow #WikiaPage #Rail .private { background: rgba(255, 255, 255, 0) !important; }  #Rail .selected:hover,#UserStatsMenu { background: rgba(255, 255, 255, 0) !important; }  #UserStatsMenu { border: none !important; border-radius: 20px !important; }  #ChatHeader span,#ChatHeader a,#UserStatsMenu li,#UserStatsMenu a,#Rail,.Chat span,#Write textarea { color: white !important; text-shadow: 0 0 5px black; }  #Write input { border-radius: 0 20px 20px 0 !important; }  #partyMenu { border-radius: 0 0 20px 20px; } #Write .message { border-radius: 20px !important; padding: 0 20px; } .ChatWindow #Rail .private { background-color: transparent !important; background-image: none !important; } @keyframes falling { 0% { transform: translate3d(0, 0, 0) rotate(0deg); } 100% { transform: translate3d(0, 1000px, 0) rotate(360deg); } } @-webkit-keyframes falling { 0% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); } 100% { -webkit-transform: translate3d(0, 1000px, 0) rotate(360deg); } } .snowflakeSizeLRG { padding-bottom: 4%; width: 4%; -webkit-transform-origin: left -30px; transform-origin: left -30px; } .snowflakeSizeMED { padding-bottom: 3%; width: 3%; -webkit-transform-origin: left -30px; transform-origin: left -30px; } .snowflakeSizeSM { padding-bottom: 2%; width: 2%; -webkit-transform-origin: -30px 0; transform-origin: left -30px; } .snowflakeSpeedSlow { -webkit-animation-duration: 7.1s; -webkit-animation-iteration-count: infinite; -webkit-transform-origin: -10px -20px; animation-duration: 7.1s; animation-iteration-count: infinite; transform-origin: -10px -20px; } .snowflakeSpeedMed { -webkit-animation-duration: 6.6s; -webkit-animation-iteration-count: infinite; -webkit-transform-origin: -10px -20px; animation-duration: 6.6s; animation-iteration-count: 12; transform-origin: -10px -20px; } .snowflakeSpeedFast { -webkit-animation-duration: 5.9s; -webkit-animation-iteration-count: infinite; -webkit-transform-origin: -10px -20px; animation-duration: 5.9s; animation-iteration-count: 12; transform-origin: -10px -20px; } .snowflakeOpacityFaint { opacity: 0.1; } .snowflakeOpacityLight { opacity: 0.3; } .snowflakeOpacityDark { opacity: 0.7; } .snowflakeDelay1 { -webkit-animation-delay: 3.4s; animation-delay: 3.4s; } .snowflakeDelay2 { -webkit-animation-delay: 1.5s; animation-delay: 1.5s; } .snowflakeDelay3 { -webkit-animation-delay: 4.6s; animation-delay: 4.6s; } .snowflakeDelay4 { -webkit-animation-delay: 6.3s; animation-delay: 6.3s; } .snowflakeDelay5 { -webkit-animation-delay: 0.4s; animation-delay: 0.4s; } .snowflakeDelay6 { -webkit-animation-delay: 8.1s; animation-delay: 8.1s; } .snowflakeSizeLRG.snowflakeDelay2 { -webkit-animation-timing-function:ease-in-out; } .snowflakeSizeLRG.snowflakeDelay1 { -webkit-animation-timing-function:ease-out; } .snowflakeSizeLRG.snowflakeDelay2 { animation-timing-function:ease-in-out; } .snowflakeSizeLRG.snowflakeDelay1 { animation-timing-function:ease-out; } .snowflakeSpeedMed.snowflakeDelay2 { opacity: 0.5 } .snowflakeSpeedMed.snowflakeDelay1 { opacity: 0.3 } .snowflakeSpeedFast.snowflakeDelay2 { opacity: 0.7 } .snowflakeSpeedFast.snowflakeDelay1 { opacity: 0.6; -webkit-animation-timing-function:ease-in; -webkit-transform-origin: left 10px; animation-timing-function:ease-in; transform-origin: left 10px; } .snowflakeSpeedSlow { opacity: 0.8 }</style></div>');
	createSnow(snowAmount);
	inlineAlert('Blast Skin initialized.');
}
 
function createSnow(number) {
	if ((navigator.info[0] == "Chrome") || (navigator.info[0] == "MSIE" && navigator.info[1] >= 10) || (navigator.info[0] == "Safari" && navigator.platform == "Mac") || (navigator.info[0] == "Safari" && navigator.platform == "iPad")) {
		var snowflakes = new Snowflakes('ChatWindow', 'snowflakesContainer');
		snowflakes.create(number);
		snowOn = true;
	}
}
 
function unKey(that) {
	$(that).unbind('keypress').val('');
}
 
/* FUNCTIONS FOR FALLING STUFF */
navigator.info = (function() {
	var N = navigator.appName, ua = navigator.userAgent, tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i))!== null) M[2] = tem[1];
	M = M? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
	return M; }
) ();
function Snowflakes(_pageContainer, _snowflakesContainer) {
	this.snowID = 1;
	this.sizes = new Array('', 'snowflakeSizeSM', 'snowflakeSizeMED', 'snowflakeSizeLRG');
	this.speeds = new Array('', 'snowflakeSpeedSlow', 'snowflakeSpeedMed', 'snowflakeSpeedFast');
	this.opacities = new Array('', 'snowflakeOpacityFaint', 'snowflakeOpacityLight', 'snowflakeOpacityDark');
	this.delays = new Array('', 'snowflakeDelay1', 'snowflakeDelay2', 'snowflakeDelay3', 'snowflakeDelay4', 'snowflakeDelay5', 'snowflakeDelay6');
	this.pageContainer = document.getElementById(_pageContainer);
	this.snowflakesContainer = document.getElementById(_snowflakesContainer);
}
Snowflakes.prototype.randomFromTo = function (from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
};
Snowflakes.prototype.findKeyframeAnimation = function (a) {
	var ss = document.styleSheets;
	for (var i = ss.length - 1; i >= 0; i--) {
		try {
			var s = ss[i],
				rs = s.cssRules ? s.cssRules : s.rules ? s.rules : [];
 
			for (var j = rs.length - 1; j >= 0; j--) {
				if ((rs[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE || rs[j].type === window.CSSRule.MOZ_KEYFRAMES_RULE) && rs[j].name == a) {
					return rs[j];
				}
			}
		} catch (e) {
		}
	}
	return null;
};
Snowflakes.prototype.updateKeyframeHeight = function() {
	if (keyframes = this.findKeyframeAnimation("falling")) {
		var height = this.pageContainer.offsetHeight;
		if ((window.innerHeight) > height) {
			height = window.innerHeight;
		}
		if (keyframes.cssText.match(new RegExp('webkit'))) {
			var newRule = "100% { -webkit-transform: translate3d(0,"+height+"px,0) rotate(360deg); }";
		} else {
			var newRule = "transform: translate(0,"+height+"px) rotate(360deg);";
		}
		keyframes.insertRule(newRule);
	}
};
Snowflakes.prototype.create = Snowflakes.prototype.moreSnow = function (snowflakeCount) {
	var i = 0;
	this.updateKeyframeHeight();
	while (i < snowflakeCount) {
		var snowflake = document.createElement('i');
		var size = this.sizes[this.randomFromTo(0, this.sizes.length - 1)];
		var speed = this.speeds[this.randomFromTo(0, this.speeds.length - 1)];
		var opacity = this.opacities[this.randomFromTo(0, this.opacities.length - 1)];
		var delay = this.delays[this.randomFromTo(0, this.delays.length - 1)];
		snowflake.setAttribute('id', 'snowId' + this.snowID);
		snowflake.setAttribute('class', 'snowflake ' + size + ' ' + speed + ' ' + opacity + ' ' + delay);
		snowflake.setAttribute('style', 'left: ' + this.randomFromTo(snowLeft, 100) + '%;');
		this.snowflakesContainer.appendChild(snowflake);
		i++;
		this.snowID++;
	}
};
Snowflakes.prototype.lessSnow = function(snowflakeCount) {
	if (this.snowflakesContainer.childNodes.length > snowflakeCount) {
		var snowRemoveCount = 0;
		while (snowRemoveCount < snowflakeCount) {
			this.snowflakesContainer.removeChild(this.snowflakesContainer.lastChild);
			snowRemoveCount++;
		}
	}
};
/* Fall Skin - by Seaside98
   Winter Skin - by Nxtstep101
   JavaScript - by Seaside98 
   Version 2.2.1
   Change Log:
	1.0.0 - Fall skin and script
	2.0.0 - Winter skin and rewrite of script
		2.1.0 - Fixed css loading problems
		2.2.0 - Added cookies
		2.2.1 - Winter skin is no longer default */
// Set initial skin
setTimeout(function() { 
	if($.cookie('skinType')=='normal') {
		goNormal();
	} else if($.cookie('skinType')=='fall') {
		goFall();
	} else if($.cookie('skinType')=='winter') {
		goWinter();
	}
}, 1000);
console.log("Chat skins intitialized.");
inlineAlert("Commands: /fall, /winter, /valentines /normal, /more, /less");
$('.ChatWindow').attr('id','ChatWindow');
// Variable delcarations
var fallCss = '<link href="http://lmbtest.wikia.com/index.php?title=MediaWiki:Fall.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var valentinesCss = '<link href="http://klintran.wikia.com/index.php?title=MediaWiki:Valentines.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var winterCss = '<link href="http://lmbtest.wikia.com/index.php?title=MediaWiki:Winter.css&action=raw&ctype=text/css" rel="stylesheet" type="text/css" id="ChatSkins"/>';
var skinType = 'normal';
var snowLeft = 0;
var snowflakes;
var totalSnow = 0;
var defaultSnow = 0;
// Chat commands
$('#Write textarea').keydown(function(e) {
	if( $('#Write textarea').val() == "/more" && e.keyCode == 13 && skinType != 'normal' ) {
		unKey(this);
		handleSnow(true);
	} else if( $('#Write textarea').val() == "/less" && e.keyCode == 13 && skinType != 'normal' ) {
		unKey(this);
		handleSnow(false);
	} else if( $('#Write textarea').val() == "/fall" && e.keyCode == 13 ) {
		unKey(this);
		if(skinType != 'fall') {
			goFall();
		} else {
			goNormal();
		}
	} else if( $('#Write textarea').val() == "/normal" && e.keyCode == 13 ) {
		unKey(this);
		goNormal();
	} else if( $('#Write textarea').val() == "/winter" && e.keyCode == 13 ) {
		unKey(this);
		if(skinType != 'winter') {
			goWinter();
		} else {
			goNormal();
		}
                } else if( $('#Write textarea').val() == "/normal" && e.keyCode == 13 ) {
		unKey(this);
		goNormal();
	} else if( $('#Write textarea').val() == "/valentines" && e.keyCode == 13 ) {
		unKey(this);
		if(skinType != 'valentines') {
			goValentines();
		} else {
			goNormal();
		}
	}
});
// Prevent message from sending
function unKey(that) {
	$(that).unbind('keypress').val('');
}
// Inline alerts
function inlineAlert(text) {
	mainRoom.model.chats.add(new models.InlineAlert( {text:(text)} ));
}
// Create initial snow
function createSnow(number) {
	snowflakes = new Snowflakes('ChatWindow', 'snowflakesContainer');
	if(!$.cookie('skinClear')) {
		snowflakes.create(number);
		totalSnow = number;
	}
	console.log("There are a total of "+totalSnow+" objects.");
}
// Add or remove snow
function handleSnow(addSub) {
	if(addSub) {
		snowflakes.moreSnow(defaultSnow);
		totalSnow+=defaultSnow;
		$.cookie('skinClear',null);
	} else {
		if(totalSnow == defaultSnow) {
			snowflakes.lessSnow(defaultSnow);
			totalSnow = 0;
			$.cookie('skinClear','0',{expires: 5});
		} else {
			snowflakes.lessSnow(totalSnow-defaultSnow);
			totalSnow = defaultSnow;
		}
	}
	console.log("There are a total of "+totalSnow+" objects.");
}
// Switch to normal skin
function goNormal() {
	skinType = 'normal';
	totalSnow = 0;
	defaultSnow = 0;
	$('#skinBackground').remove();
	$('#ChatSkins').remove();
	$.cookie('skinType','normal',{expires: 5});
}
// Switch to fall skin
function goFall() {
	clearOld();
	skinType = 'fall';
	defaultSnow = 20;
	snowLeft = 25;
	$('.ChatWindow').prepend('<div id="skinBackground"><div class="fallHover"></div><div id="snowflakesContainer"></div></div>');
	$('head').append(fallCss);
	createSnow(20);
	$.cookie('skinType','fall',{expires: 5});
}
// Switch to winter skin
function goWinter() {
	clearOld();
	skinType = 'winter';
	defaultSnow = 50;
	snowLeft = 0;
	$('.ChatWindow').prepend('<div id="skinBackground"><div id="snowflakesContainer"></div></div>');
	$('head').append(winterCss);
	createSnow(50);
	$.cookie('skinType','winter',{expires: 5});
}
// Reset page for new skin
function clearOld() {
	totalSnow = 0;
	$('#skinBackground').remove();
	$('#ChatSkins').remove();
}
 
// Falling Things
// https://github.com/dmolsen/CSS3-Snowflakes
function Snowflakes(_pageContainer, _snowflakesContainer) {
	this.snowID = 1;
	this.sizes = new Array('', 'snowflakeSizeSM', 'snowflakeSizeMED', 'snowflakeSizeLRG');
	this.speeds = new Array('', 'snowflakeSpeedSlow', 'snowflakeSpeedMed', 'snowflakeSpeedFast');
	this.opacities = new Array('', 'snowflakeOpacityFaint', 'snowflakeOpacityLight', 'snowflakeOpacityDark');
	this.delays = new Array('', 'snowflakeDelay1', 'snowflakeDelay2', 'snowflakeDelay3''snowflakeDelay4', 'snowflakeDelay5', 'snowflakeDelay6');
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
		} else if (keyframes.cssText.match(new RegExp('moz'))) {
            var newRule = "-moz-transform: translate(0,"+height+"px) rotate(360deg);";
		} else {
			var newRule = "transform: translate(0,"+height+"px) rotate(360deg);";
		}
		if (navigator.userAgent.indexOf("Firefox")!=-1) { keyframes.appendRule(newRule); } else { keyframes.insertRule(newRule); }
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
	if (this.snowflakesContainer.childNodes.length >= snowflakeCount) {
		var snowRemoveCount = 0;
		while (snowRemoveCount < snowflakeCount) {
			this.snowflakesContainer.removeChild(this.snowflakesContainer.lastChild);
			snowRemoveCount++;
		}
	}
};
/* plok */
 
if (["view", "history"].indexOf(mw.config.get("wgAction")) > -1) {
$(function() {
    var urlRand = new Array(); 
  urlRand[0] = 'https://vignette.wikia.nocookie.net/corpseparty/images/c/ce/Ryou_sprite.gif';
  urlRand[1] = 'https://vignette.wikia.nocookie.net/corpseparty/images/5/53/Sachiko_sprite.gif';
  urlRand[2] = 'https://vignette.wikia.nocookie.net/corpseparty/images/0/09/Tokiko_sprite.gif';
  urlRand[3] = 'https://vignette.wikia.nocookie.net/corpseparty/images/4/46/Yuki_sprite.gif';
 
  var chosenUrl = Math.floor( Math.random() * urlRand.length );
  
  var url = urlRand[chosenUrl],
		duration = 8,
		el = $('<figure id="timer-animation"><img src="' + url + '" height="32"/></figure>');
	$(el).on("contextmenu", function(e) {
		if (e.target.nodeName != "A") {
			e.preventDefault();
		}
	});
	function keyframes(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "",
			b = (
				// img
				'@' + a + 'keyframes animation-plok-img {\n' +
					'\tfrom {margin-top: 20px}\n' +
					'\tto {margin-top: 80px;}\n' +
				'}\n' +
				// figure
				'@' + a + 'keyframes animation-plok-figure {\n' +
					'\t0% {left: -200px;}\n' +
					'\t0.35% {left: ' + ($(window).width() + 10) + 'px;}\n' + // 0.22 is the equivalent to 8 seconds, but 0.35 is better per the up-down waving
					'\t100% {left: ' + ($(window).width() + 10) + 'px;}\n' +
				'}'
			);
		return b;
	}
	function propertiesImg(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "";
		return (
			'\t' + a + 'animation-name: animation-plok-img;\n' +
			'\t' + a + 'animation-duration: 2500ms;\n' +
			'\t' + a + 'animation-delay: 0s;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-direction: alternate;\n'
		);
	}
	function propertiesFigure(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "";
		return (
			'\t' + a + 'animation-name: animation-plok-figure;\n' +
			'\t' + a + 'animation-duration: 3600s;\n' +
			'\t' + a + 'animation-delay: ' + (3600 - (new Date().getMinutes() * 60 + new Date().getSeconds())) + 's;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-timing-function: linear;\n'
		);
	}
	mw.util.addCSS(
		'figure#timer-animation {\n'+
			'\tz-index: 99999999999;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 250px;\n' +
			'\tleft: -200px;\n' +
			'\ttext-align: center;\n' +
			propertiesFigure("moz") +
			propertiesFigure("webkit") +
			propertiesFigure("o") +
			propertiesFigure() +
		'}\n' +
		'figure#timer-animation img {\n'+
			'\tmargin-top: 0;\n' +
			propertiesImg("moz") +
			propertiesImg("webkit") +
			propertiesImg("o") +
			propertiesImg() +
		'}\n' +
		keyframes("moz") + '\n' +
		keyframes("webkit") + '\n' +
		keyframes("o") + '\n' +
		keyframes()
	);
	$("body").append(el);
});
}

/* plok2 */
 
if (["view", "history"].indexOf(mw.config.get("wgAction")) > -1) {
$(function() {
    var urlRand = new Array(); 
  urlRand[0] = 'https://vignette.wikia.nocookie.net/corpseparty/images/3/32/Ayumi_sprite.gif';
  urlRand[1] = 'https://vignette.wikia.nocookie.net/corpseparty/images/f/f2/Naomi_sprite.gif';
  urlRand[2] = 'https://vignette.wikia.nocookie.net/corpseparty/images/5/54/Satoshi_sprite.gif';
  urlRand[3] = 'https://vignette.wikia.nocookie.net/corpseparty/images/e/eb/Seiko_sprite.gif';
  urlRand[4] = 'https://vignette.wikia.nocookie.net/corpseparty/images/2/28/Yoshiki_sprite.gif';
  urlRand[5] = 'https://vignette.wikia.nocookie.net/corpseparty/images/a/a5/Yuka_sprite.gif';
  
   var chosenUrl = Math.floor( Math.random() * urlRand.length );
   
    var url =  urlRand[chosenUrl],
		duration = 8,
		el = $('<figure id="timer-animation-2"><img src="' + url + '" height="32"/></figure>');
	$(el).on("contextmenu", function(e) {
		if (e.target.nodeName != "A") {
			e.preventDefault();
		}
	});
	function keyframes(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "",
			b = (
				// img
				'@' + a + 'keyframes animation-plok-img2 {\n' +
					'\tfrom {margin-top: 20px}\n' +
					'\tto {margin-top: 80px;}\n' +
				'}\n' +
				// figure
				'@' + a + 'keyframes animation-plok-figure2 {\n' +
					'\t0% {left: -100px;}\n' +
					'\t0.35% {left: ' + ($(window).width() + 10) + 'px;}\n' + // 0.22 is the equivalent to 8 seconds, but 0.35 is better per the up-down waving
					'\t100% {left: ' + ($(window).width() + 10) + 'px;}\n' +
				'}'
			);
		return b;
	}
	function propertiesImg(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "";
		return (
			'\t' + a + 'animation-name: animation-plok-img2;\n' +
			'\t' + a + 'animation-duration: 2500ms;\n' +
			'\t' + a + 'animation-delay: 0s;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-direction: alternate;\n'
		);
	}
	function propertiesFigure(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "";
		return (
			'\t' + a + 'animation-name: animation-plok-figure2;\n' +
			'\t' + a + 'animation-duration: 3500s;\n' +
			'\t' + a + 'animation-delay: ' + (3600 - (new Date().getMinutes() * 60 + new Date().getSeconds())) + 's;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-timing-function: linear;\n'
		);
	}
	mw.util.addCSS(
		'figure#timer-animation-2 {\n'+
			'\tz-index: 99999999999;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 250px;\n' +
			'\tleft: -100px;\n' +
			'\ttext-align: center;\n' +
			propertiesFigure("moz") +
			propertiesFigure("webkit") +
			propertiesFigure("o") +
			propertiesFigure() +
		'}\n' +
		'figure#timer-animation-2 img {\n'+
			'\tmargin-top: 0;\n' +
			propertiesImg("moz") +
			propertiesImg("webkit") +
			propertiesImg("o") +
			propertiesImg() +
		'}\n' +
		keyframes("moz") + '\n' +
		keyframes("webkit") + '\n' +
		keyframes("o") + '\n' +
		keyframes()
	);
	$("body").append(el);
});
}
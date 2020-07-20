/* plok */
 
if (["view", "history"].indexOf(mw.config.get("wgAction")) > -1) {
$(function() {
	var url = "http://s15.postimg.org/5z40yhfhn/pluto_copy.png",
		duration = 8,
		el = $('<figure id="timer-animation"><img src="' + url + '" title="Click to dismiss"/></figure>');
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
					'\tfrom {margin-top: 0px}\n' +
					'\tto {margin-top: 80px;}\n' +
				'}\n' +
				// figure
				'@' + a + 'keyframes animation-plok-figure {\n' +
				/* At this point, you can figure out the amount
				of pixels for it to be pushed leftward using this
				algorithm:
				w + 40 = x
				Where w is the width in pixels and x is the sum. */
					'\t0% {left: -240px;}\n' +
					'\t0.35% {left: ' + ($(window).width() + 240) + 'px;}\n' + // 0.22 is the equivalent to 8 seconds, but 0.35 is better per the up-down waving
					'\t100% {left: ' + ($(window).width() + 240) + 'px;}\n' +
				'}'
			);
		return b;
	}
	function propertiesImg(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "";
		return (
			'\t' + a + 'animation-name: animation-plok-img;\n' +
			'\t' + a + 'animation-duration: 5000ms;\n' +
			'\t' + a + 'animation-delay: 0s;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-direction: alternate;\n'
		);
	}
	function propertiesFigure(type) {
		var a = typeof type === "string" ? "-" + type + "-" : "";
		return (
			'\t' + a + 'animation-name: animation-plok-figure;\n' +
			'\t' + a + 'animation-duration: 7200s;\n' +
			'\t' + a + 'animation-delay: 300000ms;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-timing-function: linear;\n'
		);
	}
	mw.util.addCSS(
		'figure#timer-animation {\n'+
			'\tz-index: 999999999999;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 80px;\n' +
			/* At this point, you can figure out the amount
			of pixels for it to be pushed leftward using this
			algorithm:
			w + 40 = x
			Where w is the width in pixels and x is the sum. */
			'\tleft: -240px;\n' +
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
$(document).ready(function(){
   $("#timer-animation").click(function(event){
     $("#timer-animation").hide();
   });
 });
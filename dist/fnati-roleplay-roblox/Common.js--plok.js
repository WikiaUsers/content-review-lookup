/* Any JavaScript here will be loaded for all users on every page load. */
/* -------------------------------------- */
/* =================plok================= */
/* thx Five Nights at Treasure Island Wiki and Club Penguin Wiki */
if (["view", "history"].indexOf(mw.config.get("wgAction")) > -1) {
$(function() {
	var url = "http://i.imgur.com/qcyuvZx.gif",
		junk = ["http://i.imgur.com/qcyuvZx.gif"], // Extras
		duration = 8,
		el = $('<figure id="timer-animation"><img src="' + url + '" height="180px" /></figure>');
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
			'\t' + a + 'animation-duration: 8000s;\n' +
			'\t' + a + 'animation-delay: 30000ms;\n' +
			'\t' + a + 'animation-iteration-count: infinite;\n' +
			'\t' + a + 'animation-timing-function: linear;\n'
		);
	}
	mw.util.addCSS(
		'figure#timer-animation {\n'+
			'\tz-index: 999999999999;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 80px;\n' +
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
/* -------------------------------------- */
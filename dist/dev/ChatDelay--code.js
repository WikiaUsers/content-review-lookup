// <syntaxhighlight lang="javascript">
$(function() {

var obj = {
	data: {},
	fn: {}
};

/* ========================= *\
	# data
\* ========================= */

/* is disabled */
obj.data.disabled = false;

/* delay after a 1000-char message */
obj.data.maxDelay = 4;
try {
	if (3 <= window.dev.chatdelay.max && window.dev.chatdelay.max <= 10 && $.isNumeric(window.dev.chatdelay.max)) {
		// only numeric values from 3 to 10 (including)
		// 'window.dev.chatdelay.max' exists as a numeric value
		obj.data.maxDelay = Number(window.dev.chatdelay.max);
	}
} catch(err) {}

/* main chat only */
obj.data.mainOnly = true;
try {
	if (window.dev.chatdelay.mainOnly === false) {
		obj.data.mainOnly = false;
	}
} catch(err) {}

/* ========================= *\
	# functions
\* ========================= */

/* calculate timer duration */
obj.fn.calc = function(len) {
	var a;
	if (len > 10) {
		a = Math.log10(len) + (obj.data.maxDelay - 3) * (len - 10) / 990;
		/*
		where 'x' is msg length, and 'a' is the maximum delay:
			[log(x)] + [(a - 3) * (x - 10) / 990]
		when 'x' is 10, the right section is equals to '0' and the result is just 1
		when 'x' is 1000, the left and right sections combined would return the maximum waiting time
		*/
	} else {
		a = 1;
	}
	return a * 1000;
}

/* handle timer */
obj.fn.handleTime = function(len) {
	if (0 < len && len <= NodeRoomController.prototype.maxCharacterLimit) {
		// message does not exceed room's maximum allowed characters
		// also make sure that the message isn't empty
		obj.data.disabled = true;
		this.addTimer(len);
	}
}

/* start a new timer */
obj.fn.addTimer = function(len) {
	console.info("A: " + new Date().getTime());
	var time = Math.round(this.calc(len));
	setTimeout(
		this.ontimerover,
		time
	);
	// add animated bar
	$('<div class="chattimer-animated" />').css({
		"-moz-animation-duration": time + "ms",
		"-webkit-animation-duration": time + "ms",
		"-o-animation-duration": time + "ms",
		"animation-duration": time + "ms"
	}).appendTo("#chattimer-progress");
}

/* on timer end */
obj.fn.ontimerover = function() {
	obj.data.disabled = false;
	$(obj.data.input).focus();
	$("#chattimer-progress div").remove();
	console.info("B: " + new Date().getTime());
}

/* add css animation keyframes */
obj.fn.addCSSKeyframes = function() {
	var prefixes = ["", "-moz-", "-webkit-", "-o-"]
		output = "";
	while (prefixes.length > 0) {
		output += '@' + prefixes.shift() + 'keyframes chattimer-ani{0%{width:0px;background-color:#f00;}50%{background-color:#ff0;}100%{width:41px;background-color:#0f0;}}';
	}
	return output;
}

/* ========================= *\
	# implementations
\* ========================= */

/* interface */
// add css
mw.util.addCSS(
	obj.fn.addCSSKeyframes() + "\n" +
	'#chattimer-progress {\n' +
		'\twidth: 41px;\n' +
		'\theight: 5px;\n' +
		'\tposition: absolute;\n' +
		'\tbottom: 3px;\n' +
		'\tleft: 8px;\n' +
		'\tbackground: rgba(0, 0, 0, 0.35);\n' +
	'}\n' +
	'#chattimer-progress div {\n' +
		'\theight: 5px;\n' +
	'}\n' +
	'.chattimer-animated {\n' +
		'\t-moz-animation-name: chattimer-ani;\n' +
		'\t-webkit-animation-name: chattimer-ani;\n' +
		'\t-o-animation-name: chattimer-ani;\n' +
		'\tanimation-name: chattimer-ani;\n' +
		'\t-moz-animation-timing-function: linear;\n' +
		'\t-webkit-animation-timing-function: linear;\n' +
		'\t-o-animation-timing-function: linear;\n' +
		'\tanimation-timing-function: linear;\n' +
		/*
		'\t-webkit-animation-play-state: paused;\n' +
		'\tanimation-play-state: paused;\n' +*/
	'}'
);

// add progress bar
$("#Write").append('<div id="chattimer-progress" />');

/* triggers */
$('[name="message"]').keydown(function(e) {
	// check if timer is disabled in pms
	var pmMode = obj.data.mainOnly && $('.Chat:not([style*="display: none;"])').attr("id") != "Chat_" + mainRoom.roomId;
	// check conditions
	if (e.keyCode == 13 && !e.shiftKey && !pmMode) {
		// submit event
		if (obj.data.disabled) {
			// attempting to submit while timer is still running
			e.preventDefault();
		} else {
			obj.fn.handleTime($(this).val().length);
		}
	}
});

});
// </syntaxhighlight>
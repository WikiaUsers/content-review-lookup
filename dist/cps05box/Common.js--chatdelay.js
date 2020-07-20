// meshy prototype

// need to adjust the blocking system, to allow typing even when blocked, but
// prevent user from sending while blocked
// also make background animation a bit nicer




$(function() {
	/* global object */
	var obj = {
		data: {
			maxDelay: 4, // delay after sending a 1000-character message
			isBlocked: false,
			input: $('[name="message"]')
		},
		fn: {}
	};
	// see if global variable has already been defined
	try {
		if (0 < window.dev.chatdelay.max && window.dev.chatdelay.max <= 10 && $.isNumeric(window.dev.chatdelay.max)) {
			// 'window.dev.chatdelay.max' exists as a numeric value
			obj.data.naxDelay = Number(window.dev.chatdelay.max);
		}
	} catch(err) {}

	/* functions */
	// calculate time
	obj.fn.calc = function(len) {
		var a;
		if (len > 10) {
			a = Math.log10(len) + (len - 10) / 990;
		} else {
			a = 1;
		}
		return a * 1000;
	}
	// add timer
	obj.fn.addTimer = function(len) {
		var time = Math.round(obj.fn.calc(len));
		setTimeout(
			obj.fn.ontimerover,
			obj.fn.calc(len)
		);
		NodeChatController.prototype.active = false;
		// add animated bar
		$('<div class="chattimer-animated" />').css({
			"-moz-animation-duration": time + "ms",
			"-webkit-animation-duration": time + "ms",
			"-o-animation-duration": time + "ms",
			"animation-duration": time + "ms"
		}).appendTo("#chattimer-progress");
	}

	// on timer end
	obj.fn.ontimerover = function() {
		//obj.data.isBlocked = false;
		NodeChatController.prototype.active = true;
		$(obj.data.input).focus();
		$("#chattimer-progress div").remove();
		console.log("Done!");
	}

	// handle time
	obj.fn.handleTime = function(len) {
		if (len <= NodeRoomController.prototype.maxCharacterLimit) {
			// message does not exceed room's maximum allowed characters
			//obj.data.isBlocked = true;
			obj.fn.addTimer(len);
		}
	}

	// add css keyframes
	obj.fn.addCSSKeyframes = function() {
		var prefixes = ["", "-moz-", "-webkit-", "-o-"]
			output = "";
		while (prefixes.length > 0) {
			output += '@' + prefixes.shift() + 'keyframes chattimer-ani{0%{width:0px;background-color:#f00;}63%{background-color:#ff0;}100%{width:41px;background-color:#0f0;}}';
		}
		return output;
	}

	/* implementations */

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
			'\t-moz-animation-timing-function: chattimer-ani;\n' +
			'\t-webkit-animation-timing-function: chattimer-ani;\n' +
			'\t-o-animation-timing-function: chattimer-ani;\n' +
			'\tanimation-timing-function: chattimer-ani;\n' +
			/*
			'\t-webkit-animation-play-state: paused;\n' +
			'\tanimation-play-state: paused;\n' +*/
		'}'
	);

	// add progress bar
	$("#Write").append('<div id="chattimer-progress" />');

	// triggers
	$(obj.data.input).keydown(function(e) {
		if (e.keyCode == 13 && !e.shiftKey) {
			// sending message (enter + without shift)
			if (/*!obj.data.isBlocked && */NodeChatController.prototype.active) {
				// not blocked right now
				obj.fn.handleTime($(this).val().length);
			} else {
				// blocked
				console.info("Blocked");
			}
		}
	});
});
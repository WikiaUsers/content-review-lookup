/* nemesis */
$(function() {
	mw.util.addCSS('@keyframes nemesis-modal-vertical{0%{transform:translate(0,-42px);}50%{transform: translate(0,42px);}100%{transform:translate(0,-42px);}}nav#nemesis-modal{position:fixed;top:120px;left:0;z-index:100000;}nav#nemesis-modal .nemesis-modal-vertical{animation: nemesis-modal-vertical 3s ease-in-out infinite;}nav#nemesis-modal .nemesis-modal-horizontal{position:absolute;}');
	var container,
		nemesis,
		horizontalOffset = -200, // x axis initial distance in pixels
		horizontalSpeed = 200, // 'horizontalSpeed'px every second
		horizontalSpeedFactor = 1, // change velocity relatively
		triggerMoment = 0, // minutes (as in hh:mm) at which it is triggered
		isRunning = false;
	container = $(
		'<nav id="nemesis-modal">\n' +
			'\t<div class="nemesis-modal-horizontal">\n' +
				'\t\t<div class="nemesis-modal-vertical">\n' +
					'\t\t\t<div class="nemesis-modal-container">\n' +
					'\t\t\t</div>\n' +
				'\t\t</div>\n' +
			'\t</div>\n' +
		'</nav>'
	);
	nemesis = $('<img src="http://galaxyonfire.wikia.com/wiki/File:Nemesis_Transparent.png" width="120" />');
 
 
	function onTrigger() {
		console.log("triggered");
		// once an hour, this shall be triggered
		var rnd = Math.random();
		if (rnd < 0.001) {
			$(container).find(".nemesis-modal-container").html("").append(
				'<div style="position: relative;">' +
					'\t<iframe src="https://www.youtube.com/embed/DLzxrzFCyOs?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0&amp;autoplay=1" width="120" height="90" />\n' +
					'\t<div style="width: 120px; height: 90px; position: absolute; top: 0; left: 0;"></div>\n' +
				'</div>'
			);
			horizontalSpeedFactor = 0.25;
			setTimeout(function() {
				horizontalSpeedFactor = 1;
				$(container).find(".nemesis-modal-container").html(nemesis); // return back to normal
			},60000);
		}
	}
	function setPosition() {
		requestAnimationFrame(setPosition);
		var t = new Date(),
			currPos,
			minutes = t.getUTCMinutes();
		if (minutes === triggerMoment) {
			if (!isRunning) {
				onTrigger();
			}
			isRunning = true;
			currPos = horizontalOffset + horizontalSpeed * horizontalSpeedFactor * (t.getUTCSeconds() + t.getUTCMilliseconds() / 1000);
			$(container).find(".nemesis-modal-horizontal").css("left", String(currPos) + "px");
		}
		if (isRunning && minutes !== triggerMoment) {
			// animation over
			isRunning = false;
		}
	}
	$(container).find(".nemesis-modal-horizontal").css("left", String(horizontalOffset) + "px");
	setPosition();
	$(container).find(".nemesis-modal-container").append(nemesis).on("contextmenu click mouseover", function(e) {
		e.preventDefault();
	});
	$("body").append(container);
});
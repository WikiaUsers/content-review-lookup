/* Any JavaScript here will be loaded for all users on every page load. */

/* plok */
$(function() {
	mw.util.addCSS('@keyframes plok-modal-vertical{0%{transform:translate(0,-42px);}50%{transform: translate(0,42px);}100%{transform:translate(0,-42px);}}nav#plok-modal{position:fixed;top:120px;left:0;z-index:100000;}nav#plok-modal .plok-modal-vertical{animation: plok-modal-vertical 3s ease-in-out infinite;}nav#plok-modal .plok-modal-horizontal{position:absolute;}');
	var container,
		plok,
		horizontalOffset = -200, // x axis initial distance in pixels
		horizontalSpeed = 200, // 'horizontalSpeed'px every second
		horizontalSpeedFactor = 1, // change velocity relatively
		triggerMoment = 0, // minutes (as in hh:mm) at which it is triggered
		isRunning = false;
	container = $(
		'<nav id="plok-modal">\n' +
			'\t<div class="plok-modal-horizontal">\n' +
				'\t\t<div class="plok-modal-vertical">\n' +
					'\t\t\t<div class="plok-modal-container">\n' +
					'\t\t\t</div>\n' +
				'\t\t</div>\n' +
			'\t</div>\n' +
		'</nav>'
	);
	plok = $('<img src="https://images.wikia.com/cp3d/images/thumb/2/26/Plokcropped.png/170px-Plokcropped.png" width="120" />');


	function onTrigger() {
		console.log("triggered");
		// once an hour, this shall be triggered
		var rnd = Math.random();
		if (rnd < 0.001) {
			$(container).find(".plok-modal-container").html("").append(
				'<div style="position: relative;">' +
					'\t<iframe src="https://www.youtube.com/embed/fLbVLB8HnjM?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0&amp;autoplay=1" width="120" height="90" />\n' +
					'\t<div style="width: 120px; height: 90px; position: absolute; top: 0; left: 0;"></div>\n' +
				'</div>'
			);
			horizontalSpeedFactor = 0.25;
			setTimeout(function() {
				horizontalSpeedFactor = 1;
				$(container).find(".plok-modal-container").html(plok); // return back to normal
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
			$(container).find(".plok-modal-horizontal").css("left", String(currPos) + "px");
		}
		if (isRunning && minutes !== triggerMoment) {
			// animation over
			isRunning = false;
		}
	}
	$(container).find(".plok-modal-horizontal").css("left", String(horizontalOffset) + "px");
	setPosition();
	$(container).find(".plok-modal-container").append(plok).on("contextmenu click mouseover", function(e) {
		e.preventDefault();
	});
	$("body").append(container);
});
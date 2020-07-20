// REMEMBER to remove the comments on deployment: closure, audio src, date check
(function(window,$,mw) {
	var bgList = [
			'https://vignette.wikia.nocookie.net/hitlerparody/images/6/61/Schenck_and_the_elderly.jpg',
			'https://vignette.wikia.nocookie.net/hitlerparody/images/c/c5/Battle_Scenes_under_artillery_fire.jpg',
			'https://vignette.wikia.nocookie.net/hitlerparody/images/d/d3/T-34_Street.jpg',
			'https://vignette.wikia.nocookie.net/hitlerparody/images/f/f6/Bunker_Entrance.jpg',
			'https://vignette.wikia.nocookie.net/hitlerparody/images/2/29/Schenck_walks_paper_burning.jpg',
			'https://vignette.wikia.nocookie.net/hitlerparody/images/7/72/Fegelbrothel_crowd.jpg'
		],
		lastBgIndex = null,
		bgChgCues = [10, 13.84, 17.68, 21.51, 25.36],
		keyframeList = ['bgScrollLeft', 'bgScrollRight', 'bgScrollUp', 'bgScrollDown', 'bgZoomIn', 'bgZoomOut'];
	
	var $fegelFlop, $fegelDebug; // holds the fegelFlop 
	var vector = [{x: 0, y: 0}, {x: 0, y: 0}]; // last and current coordinates of the mouse, to position fegelFlop
	var vm = 0.02; // magnitude - how much distance to cover per step
	var cScale = 0.05; // scale coefficient. final scale is delta*cScale
	var timeStep = 40; // milliseconds per frame
	//var angle = 0; // angle of the above vector
	var animating = false; // flag for the animation function
	var animId; // holds interval ID for the animating function
	var lastMove = 0, // date of last mouse position update
		mouseThrottled = false; // time between mouse pos updates
	
	function initAF() {
		// remove conflicting elements
		$('.wordmark audio, style.AF17, #fegelFlop, #fegelDebug').remove();
		// add keyframe styles
		var keyframeCSS = '\
			@keyframes bgScrollLeft {\
				from {background-position: center right}\
				to   {background-position: center left}\
			} @keyframes bgScrollRight {\
				from {background-position: center left}\
				to   {background-position: center right}\
			} @keyframes bgScrollUp {\
				from {background-position: bottom center}\
				to   {background-position: top center}\
			} @keyframes bgScrollDown {\
				from {background-position: top center}\
				to   {background-position: bottom center}\
			} @keyframes bgZoomIn {\
				from {background-size: cover}\
				to   {background-size: 130% !important}\
			} @keyframes bgZoomOut {\
				from {background-size: 130% !important}\
				to   {background-size: cover}\
			}';
		$('<style class="AF17">').text(keyframeCSS).appendTo(document.body);
		
		// add FegelFlop
		$fegelFlop = $('<div>').prop({id: 'fegelFlop'}).css({
			display: 'inline-block',
			background: 'url(https://vignette.wikia.nocookie.net/hitlerparody/images/b/b3/FegelFlop.gif)',
			position: 'fixed',
			left: '50%', top: '50%',
			width: '320px', height: '180px',
			transform: 'translate(-50%, -50%)'
		}).hide().prependTo('body');
		$fegelDebug = $('<span>').prop({id:'fegelDebug'}).css({position: 'fixed', left: 0, bottom: '27px', "z-index":9000}).hide().appendTo('body');
		
		// add audio 
		var $au = $('<audio>').prop({
				id: 'ShootingStars',
				controls: true,
				//src: 'https://vignette.wikia.nocookie.net/communitytest/images/e/e9/AF17.ogg'
				 src: 'https://vignette.wikia.nocookie.net/hitlerparody/images/e/e9/AF17.ogg/revision/latest'
		});
		$au.on('ended', function (e) {
			// when audio ended
			// seek back to 10.96s and play
			this.currentTime = 10.96;
			this.play();
		}).on('pause', function (e) {
			// when paused
			// move back to start
			// animating=false;
			this.currentTime = 0;
		}).on('play', function (e) {
			// start playing
			// rmv bg and preload images
			if (this.currentTime > 9) return;
			$('body.skin-oasis').css({ // default bg here
				"background-image": 'url(https://vignette.wikia.nocookie.net/hitlerparody/images/6/63/AF17_default.png)',
				"background-size" : 'auto auto',
				"background-repeat": "repeat",
				"animation" : "none"
			});
			$('.wordmark img').get(0).src = 'https://vignette.wikia.nocookie.net/hitlerparody/images/6/6e/Wordmark_blank.png' // blank wordmark here
			animating = false;
			$fegelFlop.hide();
			preloadBgs();
		}).appendTo($('.wordmark'));
	
		// cue track
		var track = $au.get(0).addTextTrack('metadata');
		track.mode = 'showing';
		track.default = true;
		for (var i=0; i<bgChgCues.length; i++) {
			var cue = new VTTCue(bgChgCues[i], bgChgCues[i]+0.02, "");
			if (i===0) {
				cue.onenter = function() { 
					randBg();
					//console.log('first!')
					animating = true;
					animate();
					animId = setInterval(function () { animate() }, timeStep);
				};
			} else {
				cue.onenter = function() { randBg(); }
			}
			track.addCue(cue);
		}
	}
	
	function randBg(start) {
		// randomize background
		if (!isNaN(lastBgIndex)) {
			var lastBg = bgList.splice(lastBgIndex,1)[0]; // make sure bgs not consecutive
		}
		var keyframe = keyframeList[Math.floor(Math.random()*keyframeList.length)];
		var newBgIdx = Math.floor(Math.random()*bgList.length);
		$('body.skin-oasis').css({
			//"background-attachment": "normal", // fix
			"background-image": 'url('+bgList[newBgIdx] + ')',
			"background-size" : 'cover',
			"animation" : '3.9s linear 0s 1 normal ' + keyframe + ''
		});
		bgList.push(lastBg); // put back last bg into the list
		$('.wordmark img').get(0).src = 'https://vignette.wikia.nocookie.net/hitlerparody/images/4/49/Wordmark_AF17.png'; // synthwave wordmark here
		
		// randomize fegelFlop position
		vector[0].x = Math.floor(Math.random() * window.innerWidth);
		vector[0].y = Math.floor(Math.random() * window.innerHeight);
		
		console.log(keyframe);
	}
	
	// do this only when started (pressing play)
	function preloadBgs() {
		var imgArray = [];
		for(var i=0; i<bgList.length; i++) {
			imgArray[i] = new Image();
			imgArray[i].src = bgList[i];
		}
	}
	
	// the main animating function for fegelFlop
	function animate() {
		if (!animating) {
			clearInterval(animId);
			return;
		}
		
		var delta = {
			x: (vector[1].x - vector[0].x) * vm,
			y: (vector[1].y - vector[0].y) * vm
		}, 
			angle = Math.atan2(delta.y, delta.x) * 180/ Math.PI, // get angle
			dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y),
			scale = 0.5 + (dist * 0.05),
			//scale = 1,
			cssScale = (Math.abs(angle)>90)
				? 'scale(-'+scale+',-'+scale+') ' // flip vertically if over 90deg
				: 'scale(-'+scale+','+scale+') ',
			//cssScale = fmtScale.replace(/%s/g, scale),
			cssRotate = 'rotate(' + angle + 'deg) ',
			cssTransform = 'translate(-50%, -50%) ' + cssRotate + cssScale;
		
		// update vector
		vector[0].x = vector[0].x + delta.x;
		vector[0].y = vector[0].y + delta.y;
		
		$fegelFlop.css({
			left: vector[0].x + 'px',
			top: vector[0].y + 'px',
			transform: cssTransform
		}).show();
		$fegelDebug.text(JSON.stringify(vector) + ', ' + angle.toString())
	}
	
	$(document).on('mousemove', function(e) {
		var now = new Date();
		if (animating /*&& (!mouseThrottled)*/) {
			//console.log('updating mouse position!')
			//lastMove = now;
			vector[1].x = e.clientX;
			vector[1].y = e.clientY;
			//mouseThrottled = true;
			//setTimeout( function() {mouseThrottled=false;}, 25);
		}
	})
	
	var now = new Date();
	//lastMove = now;
	if (true) initAF();
}(window,jQuery,mediaWiki));

// null edit
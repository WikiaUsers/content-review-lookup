var trainAnimation = function () {
	var trains = document.querySelectorAll(".train-animation");
	var wrap;
	var train;
	for (var i = trains.length; i > 0; i--) {
		wrap = document.querySelectorAll(".train-animation div div")[i - 1];
		train = wrap.querySelector(".train-animation a");
		train.style.setProperty('--train-distance', train.offsetWidth - wrap.offsetWidth + 'px');
		train.style.setProperty('--train-speed', (train.offsetWidth - wrap.offsetWidth) / 24 + 's');
	}
	//console.log('SCRIPT EXECUTED');
};

setInterval(trainAnimation, 1000);
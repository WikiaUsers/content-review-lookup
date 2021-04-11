(function () {
	var init = function() {
		var bData = document.querySelector('.booster-data');
		window.boosterInfo = JSON.parse(bData.innerHTML);
		bData.innerHTML = null;
	};

	mw.hook('wikipage.content').add(init);
}());
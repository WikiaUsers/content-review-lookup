/* Activates random tab in specific tabbers */
(function activateRandomTab() {
	document
		.querySelectorAll('.random-tab .wds-tabber')
		.forEach(function(tabber) {
			tabber
				.querySelectorAll('.wds-is-current')
				.forEach(function(element) {
					element.classList.remove('wds-is-current');
				});

			var tabs = document.querySelectorAll('.wds-tabs__tab');
			var contents = document.querySelectorAll('.wds-tab__content');
			var index = Math.floor(Math.random() * tabs.length);

			tabs[index].classList.add('wds-is-current');
			contents[index].classList.add('wds-is-current');
		});
})();
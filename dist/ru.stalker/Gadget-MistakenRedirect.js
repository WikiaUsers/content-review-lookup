/* Shows specific message box if the article was reached from the right redirect */
(function mistakenRedirect() {
	document
		.querySelectorAll('.mistaken-redirect')
		.forEach(function (messageBox) {
			messageBox.dataset.redirect.split('|').forEach(function (redirectName) {
				var redirectLink = document.querySelector('.mw-redirectedfrom a');
				if (!redirectLink) return;
				if (redirectLink.title == redirectName) {
					messageBox.style.display = 'block';
				}
			});
		});
})();
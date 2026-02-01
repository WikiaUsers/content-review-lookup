mw.hook('dev.wds').add(function(wds) {
	document.querySelectorAll('.mw-highlight pre').forEach(function(block) {
		const button = document.createElement('button');
		button.classList.add('highlight-copy', 'wds-button', 'wds-is-secondary');
		button.innerHTML = '<div id="dev-wds-icons-pages"></div>';

		block.append(button);
		
		button.addEventListener('click', function(event) {
			const self = event.target;
			navigator.clipboard.write([new ClipboardItem({ 'text/plain': block.innerText })]);
			self.disabled = true;
			self.innerHTML = '<div id="dev-wds-icons-checkmark"></div>';
			wds.render(self);
			
			setTimeout(function() {
				self.disabled = false;
			self.innerHTML = '<div id="dev-wds-icons-pages"></div>';
			wds.render(self);
			}, 2000);
		});
	});
    wds.render('.mw-highlight pre');
});
mw.hook('wikipage.collapsibleContent').add(function() {
	document.querySelectorAll('.tree').forEach(function(tree) {
		const showButton = document.createElement('button');
		showButton.classList.add('wds-button');
		showButton.innerText = 'Mostrar todos';
		
		const hideButton = document.createElement('button');
		hideButton.classList.add('wds-button');
		hideButton.classList.add('wds-is-secondary');
		hideButton.innerText = 'Ocultar todos';
		
		showButton.addEventListener('click', function() {
			const click = new Event('click');
			tree.querySelectorAll('.mw-collapsible-toggle-collapsed').forEach(function(toggle) {
				toggle.dispatchEvent(click);
			});
		});
		
		hideButton.addEventListener('click', function() {
			const click = new Event('click');
			tree.querySelectorAll('.mw-collapsible-toggle-default:not(.mw-collapsible-toggle-collapsed), .mw-collapsible-toggle-expanded').forEach(function(toggle) {
				toggle.dispatchEvent(click);
			});
		});

		tree.prepend(hideButton);
		tree.prepend(showButton);
	});
});
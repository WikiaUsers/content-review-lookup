(function () {
	var init = function() {
		document.querySelectorAll('.search-container').forEach(function(container) {
			var items = container.querySelectorAll('.search-item');
			var inputWrapper = container.querySelector('.search-input');
			
			var input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('placeholder', inputWrapper.dataset.placeholder || 'Search...');
			input.addEventListener('input', function(e) {
				var val = e.target.value.toLowerCase();
				items.forEach(function(item) {
					if (!item.dataset.search.toLowerCase().includes(val)) {
						item.style.display = 'none';
					} else {
						item.style.display = null;
					}
				});
			});
			
			inputWrapper.appendChild(input);
		});
	};
	
	mw.hook('wikipage.content').add(init);
}());
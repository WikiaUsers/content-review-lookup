(function () {
	var init = function() {
		document.querySelectorAll('.search-container').forEach(function(container) {
			var isBooster = container.classList.contains('booster-content-list');
			var items = container.querySelectorAll('.search-item');
			var inputWrapper = container.querySelector('.search-input');
			var counterEls,counts;
			if (isBooster) {
				counterEls = container.querySelectorAll('.booster-content-count > th');
				counts = Array.apply(null, Array(counterEls.length)).map(function () {return 0;});
			}

			var input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('placeholder', inputWrapper.dataset.placeholder || 'Search...');
			input.addEventListener('input', function(e) {
				if (isBooster) {counts.forEach(function(_e,i){counts[i]=0;});}
				var val = e.target.value.toLowerCase();
				items.forEach(function(item) {
					if (!item.dataset.search.toLowerCase().includes(val)) {
						item.style.display = 'none';
					} else {
						item.style.display = null;
						if (isBooster) {
							Array.from(item.children).forEach(function(td, i) {
								if (td.className === 'yea') {
									counts[i] += 1;
								}
							});
						}
					}
				});
				if (isBooster) {
					counterEls.forEach(function(c, i) {
						if (i === 0) {return;}
						c.textContent = counts[i];
					});
				}
			});

			inputWrapper.appendChild(input);
		});
	};

	mw.hook('wikipage.content').add(init);
}());
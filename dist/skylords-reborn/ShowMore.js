mw.hook('wikipage.content').add(function() {
	// Handle TOC navigation
	window.addEventListener('hashchange', function () {
		if (['Plot', 'Conclusion'].includes(location.hash.substring(1))) {
			document.querySelectorAll('.show-more:not(.expanded) > .show-more-ctrl > button').forEach(function(el) {
				el.click();
			});
		}
	});
	
	document.querySelectorAll('.show-more').forEach(function(container) {

        var ctrl = container.querySelector('.show-more-ctrl');

        if (!ctrl) return;
        if (container.scrollHeight < (container.style.maxHeight - 50)) {
            ctrl.remove();
            return;
        }

        var btn = document.createElement('button');
        btn.innerHTML = "Show more";
        btn.type = "button";
        // prevent focus
        btn.addEventListener('mousedown', function (e) {
            e.preventDefault();
        });
        btn.addEventListener('click', function () {
            if (container.classList.contains('expanded')) {
                container.classList.remove('expanded');
                btn.innerHTML = 'Show more';
                if (container.getBoundingClientRect().top <= 0)
                	window.scrollBy({top: container.getBoundingClientRect().top - 100, behavior: 'smooth'});
            } else {
                container.classList.add('expanded');
                btn.innerHTML = 'Show less';
            }
        });
        ctrl.appendChild(btn);
	});
});
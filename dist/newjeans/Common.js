mw.loader.using(['jquery'], function () {

	function setupInfobox(infobox) {

		// Don't initialise twice
		if (infobox.dataset.animated === 'true') return;
		infobox.dataset.animated = 'true';

		// Create wrapper
		const wrapper = document.createElement('div');
		wrapper.className = 'mw-made-collapsible-wrapper';

		infobox.parentNode.insertBefore(wrapper, infobox);
		wrapper.appendChild(infobox);

		// Add content class to all rows except the toggle/header row
		const rows = infobox.querySelectorAll('tr');

		rows.forEach(function (row, index) {
			if (index > 0) {
				row.classList.add('mw-made-collapsible-content');
			}
		});

		const toggle = infobox.querySelector('.mw-collapsible-toggle');

		if (!toggle) return;

		toggle.addEventListener('click', function (event) {

			// Stop Fandom's normal instant toggle
			event.preventDefault();
			event.stopImmediatePropagation();

			const isClosed = infobox.classList.contains('mw-collapsed');

			// Get current height
			const startHeight = wrapper.scrollHeight;

			// Temporarily disable transition
			wrapper.style.transition = 'none';
			wrapper.style.height = startHeight + 'px';

			// Force browser to register height
			wrapper.offsetHeight;

			if (isClosed) {

				// ==========================
				// OPEN
				// ==========================

				infobox.classList.remove('mw-collapsed');

				rows.forEach(function (row, index) {
					if (index > 0) {
						row.style.display = 'table-row';
					}
				});

				wrapper.classList.remove('is-closing');
				wrapper.classList.add('is-opening');
				wrapper.classList.add('is-animating');

				const targetHeight = wrapper.scrollHeight;

				wrapper.style.transition = 'height 0.3s ease';
				wrapper.style.height = targetHeight + 'px';

				setTimeout(function () {
					wrapper.style.height = 'auto';

					wrapper.classList.remove('is-opening');
					wrapper.classList.remove('is-animating');
				}, 300);

			} else {

				// ==========================
				// CLOSE
				// ==========================

				wrapper.classList.add('is-closing');
				wrapper.classList.add('is-animating');

				// Force reflow
				wrapper.offsetHeight;

				// Get header height
				const header = rows[0];
				const headerHeight = header ? header.offsetHeight : 0;

				wrapper.style.transition = 'height 0.3s ease';
				wrapper.style.height = headerHeight + 'px';

				setTimeout(function () {

					// Tell Fandom that the infobox is now collapsed
					infobox.classList.add('mw-collapsed');

					rows.forEach(function (row, index) {
						if (index > 0) {
							row.style.display = 'none';
						}
					});

					/*
					 * Keep the wrapper at its actual collapsed height.
					 * This prevents the little bump that happens when
					 * changing height from a fixed value to "auto".
					 */
					wrapper.style.height = wrapper.scrollHeight + 'px';

					wrapper.classList.remove('is-closing');
					wrapper.classList.remove('is-animating');

				}, 300);
			}

		}, true);
	}


	function initialise() {

		document
			.querySelectorAll('table.mw-made-collapsible')
			.forEach(setupInfobox);

	}


	// Initial page load
	initialise();


	// Catch dynamically-added infoboxes
	const observer = new MutationObserver(function () {
		initialise();
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true
	});

});

$(function () {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	const FADE_DURATION = 300;

	document.addEventListener("click", function (event) {
		const tab = event.target.closest(
			".pi-image-collection .wds-tabs__tab"
		);

		if (!tab) return;

		const collection = tab.closest(".pi-image-collection");

		if (!collection) return;

		const currentPanel = collection.querySelector(
			".wds-tab__content.wds-is-current"
		);

		if (!currentPanel) return;

		const oldImage = currentPanel.querySelector(".pi-image img");

		if (!oldImage) return;

		/*
		 * Create a copy of the current image.
		 * This copy will stay visible even after Fandom
		 * sets the old tab to display:none.
		 */
		const rect = oldImage.getBoundingClientRect();

		const clone = oldImage.cloneNode(true);

		clone.classList.add("infobox-image-transition");

		clone.style.left = rect.left + "px";
		clone.style.top = rect.top + "px";
		clone.style.width = rect.width + "px";
		clone.style.height = rect.height + "px";

		document.body.appendChild(clone);

		/*
		 * Wait until Fandom has finished switching the tab.
		 */
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				clone.classList.add("is-fading");

				setTimeout(function () {
					clone.remove();
				}, FADE_DURATION);
			});
		});
	}, true);
});
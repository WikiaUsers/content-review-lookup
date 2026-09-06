$(function () {
	function animateFade(items) {
		items.forEach(el => {
			el.style.transition = "opacity 500ms ease";
			el.style.opacity = "0";

			requestAnimationFrame(() => {
				el.style.opacity = "1";
			});
		});
	}

	function sortItems(key, direction) {
		var container = document.getElementById("container");
		var items = Array.from(container.querySelectorAll(":scope > .item"));

		items.sort(function (a, b) {
			var valA = a.querySelector("." + key).dataset.value;
			var valB = b.querySelector("." + key).dataset.value;

			var numA = parseFloat(valA);
			var numB = parseFloat(valB);

			let result;

			if (!isNaN(numA) && !isNaN(numB)) {
				result = numA - numB;
			} else {
				result = valA.localeCompare(valB);
			}

			return direction === "desc" ? -result : result;
		});

		items.forEach(item => container.appendChild(item));

		animateFade(items);
	}

	const buttons = document.querySelectorAll(".mw-sort-btn");

	buttons.forEach(btn => {
		btn.dataset.direction = "asc";

		btn.addEventListener("click", () => {
			const key = btn.dataset.sort;
			const label = btn.dataset.label;

			btn.dataset.direction = btn.dataset.direction === "asc" ? "desc" : "asc";

			sortItems(key, btn.dataset.direction);

			buttons.forEach(b => {
				b.textContent = b.dataset.label;
			});

			btn.textContent = label + (btn.dataset.direction === "asc" ? " ▲" : " ▼");
		});
	});
});
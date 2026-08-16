$(function () {
	function getPositions(items) {
		return items.map(item => {
			const rect = item.getBoundingClientRect();
			return { item, top: rect.top, left: rect.left };
		});
	}

	function animateFLIPFade(oldPos, newPos) {
		newPos.forEach((pos, i) => {
			const old = oldPos[i];
			const dx = old.left - pos.left;
			const dy = old.top - pos.top;

			const el = pos.item;

			// Start: alte Position + Fade-Out
			el.style.transform = `translate(${dx}px, ${dy}px)`;
			el.style.opacity = "0";
			el.style.transition = "opacity 0s";

			requestAnimationFrame(() => {
				// Bewegung + Fade-In
				el.style.transform = "translate(0, 0)";
				el.style.opacity = "1";
				el.style.transition = "opacity 1000ms ease";
			});
		});
	}

	function sortItems(key, direction) {
		var container = document.getElementById("container");
		var items = Array.from(container.querySelectorAll(":scope > .item"));

		const oldPositions = getPositions(items);

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

		const newPositions = getPositions(items);

		animateFLIPFade(oldPositions, newPositions);
	}

	const buttons = document.querySelectorAll(".mw-sort-btn");

	buttons.forEach(btn => {
		btn.dataset.direction = "asc";

		btn.addEventListener("click", () => {
			const key = btn.dataset.sort;

			btn.dataset.direction = btn.dataset.direction === "asc" ? "desc" : "asc";

			sortItems(key, btn.dataset.direction);

			buttons.forEach(b => {
				b.textContent = b.dataset.sort;
			});

			btn.textContent = key + (btn.dataset.direction === "asc" ? " ▲" : " ▼");
		});
	});
});
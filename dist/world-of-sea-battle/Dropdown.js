console.log("[Dropdown] Dropdown.js loaded, initializing...");

document.querySelectorAll(".dropdown").forEach(drop => {
	console.log("[Dropdown] Initializing dropdown:", drop);
	
	const selectedId = drop.dataset.selected;
	const label = drop.querySelector(".dropdown-label");
	const items = drop.querySelectorAll(".dropdown-menu-item");
	
	console.log("[Dropdown] Selected attribute - ", selectedId);
	console.log("[Dropdown] Found", items.length, "menu items");
	
	// Initial selected
	let foundSelected = false;
	items.forEach(item => {
		if(item.dataset.id && item.dataset.id === selectedId) {
			item.classList.add("selected");
			label.textContent = item.textContent;
			foundSelected = true;
			console.log("[Dropdown] Matching default item found ->", item.textContent);
		}
	});
	if(!foundSelected) {
		console.warn("[Dropdown] No item found for selected id:", selectedId);
	}
	
	// Click events
	items.forEach(item => {
		item.addEventListener("click", () => {
			console.log("[Dropdown] Clicked item:", item.dataset.id, item.textContent);
			
			items.forEach(i => i.classList.remove("selected"));
			
			item.classList.add("selected");
			label.textContent = item.textContent;
			drop.dataset.selected = item.dataset.id;
			
			console.log("[Dropdown] Updated label & data-selected:", item.textContent, drop.dataset.selected);
			
			const event = new CustomEvent("dropdown:selected", {
				detail: {
					id: item.dataset.id,
					text: item.textContent,
					dropdown: drop
				}
			});
			drop.dispatchEvent(event);
		});
	});
	
	/*
	// Show initial selected
	if (selected) {
		const sel = drop.querySelector(`.dropdown-menu[data-id="${selected}"]`);
		if(sel) {
			console.log("[Dropdown] Matching default item found ->", sel.textContext);
			sel.classList.add("selected");
			label.textContent = sel.textContent;
		} else {
			console.warn("[Dropdown] No item found for selected id:", selected);
		}
	}
	
	// Interactivity
	items.forEach(item => {
		item.addEventListener("click", () => {
			console.log("[Dropdown] Clicked item:", item.dataset.id, item.textContext);
			
			items.forEach(i => {
				if(i.classList.contains("selected")) {
					console.log("[Dropdown] Removing selected from:", i.textContext);
				}
				i.classList.remove("selected");
			});
			
			items.classList.add("selected");
			console.log("[Dropdown] Marked as selected:", item.textContext);
			
			label.textContent = item.textContent;
			console.log("[Dropdown] Updated label text to:", item.textContext);
			
			drop.dataset.selected = item.dataset.id;
			console.log("[Dropdown] Updated data-selected ->", drop.dataset.selected);
		});
	});
	*/
});
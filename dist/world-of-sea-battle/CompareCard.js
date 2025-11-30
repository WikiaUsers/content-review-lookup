document.querySelectorAll(".compare-card.ship-card").forEach(card => {
	const dropdown = card.querySelector(".dropdown");
	const table = card.querySelector(".compare-stats-table");
	
	dropdown.addEventListener("dropdown:selected", async e => {
		const shipName = e.detail.text;
		const data = await GameData.getShip("Pickle");
		console.log("Ship Data:", data);
		
		/*
		const data = window.ShipData?.[shipName];
		if(!data) {
			console.warn("[ShipCard] No data for:", shipName);
			return;
		}
		
		Object.keys(data).forEach(stat => {
			const row = table.querySelector(`#${stat}`);
			if(row) {
				const valueCell = row.querySelector(".compare-stat-value");
				valueCell.textContent = (window.Core && Core.fmt)
					? Core.fmt(data[stat])
					: data[stat];
			}
		});
		*/
	});
});
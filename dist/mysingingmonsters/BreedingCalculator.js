// Import script
mw.loader.using('mediawiki.api').then(function () {
	switch (mw.config.get('wgPageName')) {
		case 'Breeding_Calculator':
			BreedingCalculator();
	}
});

async function BreedingCalculator() {
	// ----------------------
	// -- Define Functions --
	// ----------------------
	function findDataFor(dataName, arrayTS) {
		return arrayTS[arrayTS.findIndex(subArray => subArray.includes(dataName))];
	}

	function findCombo(parentA, parentB) {
		var A = "", B = "";
		if (parentA == parentB) {
			return (unrare.includes(parentA) ? [ [parentA, 0]] : [ [parentA, 1]]);
		} else {
			A = (inconsistent.includes(parentA) ? null : (unrare.includes(parentA) ? [parentA, 0] : [parentA, 1]));
			B = (inconsistent.includes(parentB) ? null : (unrare.includes(parentB) ? [parentB, 0] : [parentB, 1]));
		}
		var combo = allCombos.findIndex(subArray => subArray[0] == parentA & subArray[1] == parentB);
		if(combo > -1) {
			combo = allCombos[combo][2];
			(A != null) ? combo.unshift(A) : null;
			(B != null) ? combo.unshift(B) : null;
			return combo;
		}
		combo = allCombos.findIndex(subArray => subArray[1] == parentA & subArray[0] == parentB);
		if(combo > -1) {
			combo = allCombos[combo][2];
			(A != null) ? combo.unshift(A) : null;
			(B != null) ? combo.unshift(B) : null;
			return combo;
		}
		combo = [];
		(A != null) ? combo.unshift(A) : null;
		(B != null) ? combo.unshift(B) : null;
		return combo;
	}

	function getImageUrl(filename) {
		return "/wiki/Special:Redirect/file/" + encodeURIComponent(filename);
	}

	function resetPortrait() {
		$("#portrait").html(`<img src="https://static.wikia.nocookie.net/mysingingmonsters/images/3/36/Random_Portrait.png/revision/latest" style="width:100px; height:100px;"><br>`);
		$("#times").html('');
	}

	function getRarity(monster) {
		if(monster.substring(0, 5) == "Rare ") {
			return 2;
		}
		if(monster.substring(0, 5) == "Epic ") {
			return 3;
		}
		return 1;
	}

	function toTime(time) {
		[d, h, m, s] = [Math.floor(time/86400), Math.floor(time/3600) % 24, Math.floor(time/60) % 60, Math.floor(time) % 60];
		if(d > 0){
			return `${d}:${h.toString().padStart(2,0)}:${m.toString().padStart(2,0)}:${s.toString().padStart(2,0)}`;
		} else if(h > 0) {
			return `${h}:${m.toString().padStart(2,0)}:${s.toString().padStart(2,0)}`;
		} else {
			return `${m}:${s.toString().padStart(2,0)}`;
		}
	}
	
	window.customInput = function(blah) {
		const id = blah.id;
		if(blah.type == "text") {
			blah.value = (id == "mult") ? blah.value.replace(/[^0-9\.]/g, "") : blah.value.replace(/[^0-9]/g, ""); blah.value = (blah.value.indexOf('.') === -1) ? blah.value : blah.value.slice(0, blah.value.indexOf('.') + 1) + blah.value.slice(blah.value.indexOf('.') + 1).replace(/\./g, '');
			const val = blah.value;

			val < 0 ? blah.value = 0 : null;
			if(id == "dd") {
				val > 6 ? blah.value = 6 : null;
			}
			if(id == "hh") {
				val > 23 ? blah.value = 23 : null;
			}
			if(id == "mm" || id == "ss") {
				val > 59 ? blah.value = 59 : null;
			}
			if(id == "mult") {
				val > 1000 ? blah.value = 1000 : null;
			}
			if(['dd', 'hh', 'mm', 'ss'].includes(id)) {
				const d = document.getElementById("dd").value * 86400, h = document.getElementById("hh").value * 3600, m = document.getElementById("mm").value * 60, s = document.getElementById("ss").value * 1;
				$(".customOutput").html(`${toTime(d+h+m+s)} (${Math.round((d+h+m+s) / $(".customOutput").attr('time')*1000)/1000}x)`);
			} else {
				$(".customOutput").html(`${toTime($(".customOutput").attr('time')*blah.value)} (${Math.round(blah.value*1000)/1000}x)`);
			}
		} else {
			if(id == "time") {
				const d = document.getElementById("dd").value * 86400, h = document.getElementById("hh").value * 3600, m = document.getElementById("mm").value * 60, s = document.getElementById("ss").value * 1;
				$(".customOutput").html(`${toTime(d+h+m+s)} (${Math.round((d+h+m+s) / $(".customOutput").attr('time')*1000)/1000}x)`);
			} else {
				$(".customOutput").html(`${toTime($(".customOutput").attr('time')*document.getElementById("mult").value)} (${Math.round(document.getElementById("mult").value*1000)/1000}x)`);
			}
		}
	};
	
	// --------------
	// -- Get data --
	// --------------
	const response = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Breeding_Calculator/data.js',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	
	let data = null;
	api = new mw.Api();
    await api.get(response).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        data = JSON.parse(content);
    });

	// -----------------------------------
	// -- Initialize variables & consts --
	// -----------------------------------
	var island = "Plant";
	var parent1 = "?";
	var parent2 = "?";
	var viewing = "?";

	const order = data.order;
	const iMonsters = data.islands;
	const allCombos = data.combos;
	const monsterTimes = data.times;
	
	const weirdos = data.weirdos;
	const changing = data.changing;
	const unrare = data.unrare;
	const inconsistent = data.inconsistent;

	// -------------
	// -- Buttons --
	// -------------
	window.breedMonsters = function() {
		$("#output").html("");
		resetPortrait();
		if (parent1 != "?" && parent2 != "?") {
			const noRares = findCombo(parent1, parent2);
			var tmp = [];
			noRares.forEach(function(cur, index) {
				tmp.includes(cur[0]) ? null : tmp.push(cur[0]);
				tmp.includes("Rare " + cur[0]) ? null : (cur[1] == 1 ? tmp.push("Rare " + cur[0]) : null);
			});
			const results = tmp;
			if(results.length > 0) {
				var ordered = [];
				results.forEach(function(cur, index) {
					if(order.includes(cur) == true){
						try {
							ordered.forEach(function(cor, ondex) {
								if(order.indexOf(cur) < order.indexOf(cor)) {
									ordered.splice(ondex, 0, cur);
									throw new Error();
								}
							});
						} catch (error) {}
						if(ordered.includes(cur) == false) {
							ordered.push(cur);
						}
					}
				});
				for(let i = 0; i < ordered.length; i++) {
					var imageBM = `<img src="${getImageUrl(ordered[i] + "-egg.png")}" style="height:50px">`;
					var buttonBM = `<button id="${ordered[i]}" class="egg" style="background: transparent; border: none;">`;
					$("#output").append(buttonBM + imageBM + "</btn>");
				}

				$(".egg").on("click", function() {
					viewing = $(this).attr("id");
					if(viewing != "Placeholder") {
						$("#portrait").html(`<a href="/wiki/${viewing}" title="${viewing}" style="color: black !important; text-shadow: 0 0 #000000;">
						<img src="${getImageUrl(viewing + " Portrait.png")}" style="width:100px; height:100px;"><br>
						<span style="color: black; text-shadow: 0 0 #000000;">${viewing}</span></a>`);
						var rarity = getRarity(viewing);
						if(rarity > 1) {
							viewing = viewing.substring(5, viewing.length);
							if(viewing == "Gnarl") {
								viewing = "Gnarls";
							}
						}
						if(changing.includes(viewing) == true) {
							viewing = `${viewing} (${island})`;
						}

						var time = findDataFor(viewing, monsterTimes)[rarity];

						$("#times").html(`<img src="${getImageUrl("Breeding Map Icon.png")}" style="width:30px"><img src="${getImageUrl("Hatching Map Icon.png")}" style="width:30px"> ${toTime(time)}<br>
						<img src="${getImageUrl("Enhanced Breeding Icon.png")}" style="width:30px"><img src="${getImageUrl("Hatching Map Icon.png")}" style="width:30px"> ${toTime(Math.floor(time * 0.75))}<br>
						<img src="${getImageUrl("Breeding Map Icon.png")}" style="width:30px"><img src="${getImageUrl("Other Upgrade Map Icon.png")}" style="width:30px"> ${toTime(Math.floor(time * 0.9))}<br>
						<img src="${getImageUrl("Enhanced Breeding Icon.png")}" style="width:30px"><img src="${getImageUrl("Other Upgrade Map Icon.png")}" style="width:30px"> ${toTime(Math.floor(time * 0.65))}<br>
						<img src="${getImageUrl("Breeding Map Icon.png")}" style="width:30px"><img src="${getImageUrl("Mystery Like.png")}" style="width:30px"> <div class="customOutput" time="${time}" style="display: inline;">Input required</div><br>
						<div style="height: 25px; align-items: center; display: flex;"><input type="text" id="dd" oninput="customInput(this)" placeholder="dd" style="width:50px"></input>:<input type="text" id="hh" oninput="customInput(this)" placeholder="hh" style="width:50px"></input>:<input type="text" id="mm" oninput="customInput(this)" placeholder="mm" style="width:50px"></input>:<input type="text" id="ss" oninput="customInput(this)" placeholder="ss" style="width:50px"></input><input type="button" id="time" onClick="customInput(this)" style="position: relative; left: 2px; width: 23px; height: 23px; background-color: #B6B6B6; border-radius: 6px; border: 1px solid #8f8f9d; transition: background-color 0.15s;" onmouseover="this.style.backgroundColor='#a5a5a5'" onmouseout="this.style.backgroundColor='#B6B6B6'"></input></div>
						<div style="height: 25px; align-items: center; display: flex;"><input type="text" class="mult" id="mult" oninput="customInput(this)" placeholder="Multiplier" style="width:212px"></input><input type="button" id="multi" onClick="customInput(this)" style="position: relative; left: 2px; width: 23px; height: 23px; background-color: #B6B6B6; border-radius: 6px; border: 1px solid #8f8f9d; transition: background-color 0.15s;" onmouseover="this.style.backgroundColor='#a5a5a5'" onmouseout="this.style.backgroundColor='#B6B6B6'"></input></div>`
						);
					} else { 
						resetPortrait();
						$("#times").html(`This monster has not been discovered yet!`);
					}
				});
			} else {
				$("#output").html("No results found for this combination");
				resetPortrait();
			}
		}
	};

	// Create Island tabs
	for(let i = 0; i < iMonsters.length; i++) {
		var button = iMonsters[i][1];
		var image = `<img src="${getImageUrl(button + ".png")}" style="width:50px">`;

		var final = `<button id="${iMonsters[i][2]}" class="islandbutton" style="background-color: #d2d2d2; border-radius: 10px 10px 0 0;">${image}<br><small><small>${iMonsters[i][2]}</small></small></button>`;
		$("#island-select").append(final);
	}

	// Give Island tabs functionality
	$('#Plant').css('background-color', '#969696');
	$(".islandbutton").on("click", function() {
		$('.islandbutton').css('background-color', '#d2d2d2');
		$(this).css('background-color', '#969696');
		island = $(this).attr("id");
		$("#output").html("");
		makeMonsters();
	});

	// Create Monster buttons
	function makeMonsters() {
		resetPortrait();
		$("#monster-select-a").html("Parent A: ");
		$("#monster-select-b").html("Parent B: ");
		const monsters = findDataFor(island, iMonsters)[0];
		for(let i = 0; i < monsters.length; i++) {
			var button = monsters[i];
			var image = `<img src="${getImageUrl(button + " Portrait.png")}" style="width:60px">`;

			if(!weirdos.includes(island) || i == 0) {
				var finala = `<button id="${button}" class="monsterbuttonA" style="padding: 0; background: transparent; border: none; width: 60px; height:60px;">${image}</button>`;
				$("#monster-select-a").append(finala);
			}
			if(!weirdos.includes(island) || i > 0) {
				var finalb = `<button id="${button}" class="monsterbuttonB" style="padding: 0; background: transparent; border: none; width: 60px; height:60px;">${image}</button>`;
				$("#monster-select-b").append(finalb);
			}
		}
		parent1 = "?";
		parent2 = "?";
		viewing = "?";

		// Give Monster buttons functionality
		$(".monsterbuttonA").on("click", function() {
			$(".monsterbuttonA").attr("style", "padding: 0; background: transparent; border: none; width: 60px; height:60px;");
			parent1 = $(this).attr("id");
			$(this).attr("style", "padding: 0; background: #ffffff; border: none; border-radius: 10px 10px 10px 10px; width: 60px; height:60px;");
			breedMonsters();
		});
		$(".monsterbuttonB").on("click", function() {
			$(".monsterbuttonB").attr("style", "padding: 0; background: transparent; border: none; width: 60px; height:60px;");
			parent2 = $(this).attr("id");
			$(this).attr("style", "padding: 0; background: #ffffff; border: none; border-radius: 10px 10px 10px 10px; width: 60px; height:60px;");
			breedMonsters();
		});
	}

	makeMonsters();
}
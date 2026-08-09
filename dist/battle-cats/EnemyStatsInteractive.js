/* Display the stats calculator part in template:Enemy Stats V2 Automatic */
mw.hook('wikipage.content').add(($content) => {
	$content[0].querySelectorAll('.enemy_stats_v2_automatic').forEach(template => {
		const STATS_HP = 0;
		const STATS_ATK_1 = 3;
		const STATS_ATK_2 = 55;
		const STATS_ATK_3 = 56;
		const STATS_TRAIT_ALIEN = 18;
		const STATS_TRAIT_ALIEN_STARRED = 69;
		// Aku shield is also scalable

		const FRAME_PER_SECOND = 30;

		let raw_stats = String(template.dataset.raw).split(",");
		const tba = Number(template.dataset.tba);

		const is_alien = raw_stats.length > STATS_TRAIT_ALIEN && Number(raw_stats[STATS_TRAIT_ALIEN]) != 0;
		const is_starred_alien = raw_stats.length > STATS_TRAIT_ALIEN_STARRED && Number(raw_stats[STATS_TRAIT_ALIEN_STARRED]) != 0;

		let interactive_table = template.querySelector('.enemy_stats_v2_interactive_table');
		if (interactive_table == null)
			return;
		interactive_table.style.display = "";

		let interactive_area = template.querySelector('.enemy_stats_v2_interactive');
		if (interactive_area == null)
			return;

		let html = "<table style='width: 100%;'>" +
		"<tr><th class='bg-light1' style='text-align:center' colspan=2>Ultilities</th></tr>" +
		"<tr><td class='bg-light4'><b>Copy to Clipboard</b></td>" +
		"<td class='bg-light2'><button class='enemy_stats_clipboard'>Base stats (csv)</button></td></tr>" +

		"<tr><th class='bg-light1' style='text-align:center' colspan=2>Stats Calculator</th></tr>" +
		"<tr><td class='bg-light4'><b>Multiplier</b></td>" + 
		"<td class='bg-light2'><input type='number' style='width:200px' class='enemy_stats_multiplier' min='0' value='100' /> %</td></tr>";

		if (is_starred_alien) {
			html += "<tr><td class='bg-light4'><b>CotC anti-Alien treasures</b></td>" + 
		"<td class='bg-light2'><input type='number' style='width:200px' class='anti_alien_treasure' min='0' max='1500' value='1500' /> % (MAX: 1500)</td></tr>";
		} else 
		if (is_alien) {
			html += "<tr><td class='bg-light4'><b>ItF anti-Alien treasures</b></td>" + 
		"<td class='bg-light2'><input type='number' style='width:200px' class='anti_alien_treasure' min='0' max='600' value='600' /> % (MAX: 600)</td></tr>";
		} 

		html += "<tr><td></td>" + 
		"<td><button class='enemy_stats_submit'>Calculate</button> <button class='enemy_stats_clear'>Clear</button></td></tr></table>" + 
		"<div class='enemy_stats_result'></div>";

		interactive_area.innerHTML = html;

		const multiplier_input = interactive_area.querySelector('.enemy_stats_multiplier');
		const anti_alien_treasure_input = interactive_area.querySelector('.anti_alien_treasure');

		const copy_to_clipboard_button = interactive_area.querySelector('.enemy_stats_clipboard');
		const submit_button = interactive_area.querySelector('.enemy_stats_submit');
		const clear_button = interactive_area.querySelector('.enemy_stats_clear');

		const result_html = interactive_area.querySelector('.enemy_stats_result');

		// Button events
		// clear button
		clear_button.addEventListener("click", () => {
			result_html.innerHTML = "";
		});
		// submit button
		submit_button.addEventListener("click", () => {
            let multiplier = Number(multiplier_input.value);
            if (anti_alien_treasure_input != null) {
            	let treasure = Number(anti_alien_treasure_input.value);
            	if (is_starred_alien)
            		multiplier = multiplier * (1600 - treasure) / 100;
            	else if (is_alien)
            		multiplier = multiplier * (700 - treasure) / 100;
            }
			result_html.innerHTML = "<table style='width:100%'>" +
			"<tr><th style='width:20%' class='bg-light4'>HP</th><td class='bg-light2'>" + (multiplier * Number(raw_stats[STATS_HP]) / 100).toLocaleString() + "</td></tr>" +
			"<tr><th style='width:20%' class='bg-light4'>ATK</th><td class='bg-light2'>" + build_result_atk(multiplier) + "</td></tr>" +
			"<tr><th style='width:20%' class='bg-light4'>DPS</th><td class='bg-light2'>" + build_result_dps(multiplier) + "</td></tr>" +
			"</table";
        });
        // copy raw stats to clipboard button
        copy_to_clipboard_button.addEventListener("click", () => {
			navigator.clipboard.writeText(template.dataset.raw)
				.then(function() {
					console.log("Copied to clipboard.");
				})
		        .catch(function(err) {
			        console.log("Copy to clipboard failed: " + err);
		        });
        });
		// Utility functions
		// Display attack power
		function build_result_atk(multiplier) {
			let base_atk_1 = Number(raw_stats[STATS_ATK_1]);
			let base_atk_2 = raw_stats.length > STATS_ATK_2 ? Number(raw_stats[STATS_ATK_2]) : 0;
			let base_atk_3 = raw_stats.length > STATS_ATK_3 ? Number(raw_stats[STATS_ATK_3]) : 0;

			if (base_atk_2 == 0) {
				return (multiplier * base_atk_1 / 100).toLocaleString();
			} else if (base_atk_3 == 0) {
				return (multiplier * base_atk_1 / 100).toLocaleString() + " + " + (multiplier * base_atk_2 / 100).toLocaleString() + " = " + (multiplier * (base_atk_1 + base_atk_2) / 100).toLocaleString();
			}
			return (multiplier * base_atk_1 / 100).toLocaleString() + " + " + (multiplier * base_atk_2 / 100).toLocaleString()  + " + " + (multiplier * base_atk_3 / 100).toLocaleString() + " = " + (multiplier * (base_atk_1 + base_atk_2 + base_atk_3) / 100).toLocaleString();
		}
		// Display DPS
		function build_result_dps(multiplier) {
			let base_atk_1 = Number(raw_stats[STATS_ATK_1]);
			let base_atk_2 = raw_stats.length > STATS_ATK_2 ? Number(raw_stats[STATS_ATK_2]) : 0;
			let base_atk_3 = raw_stats.length > STATS_ATK_3 ? Number(raw_stats[STATS_ATK_3]) : 0;

			let sum_atk = base_atk_1 + base_atk_2 + base_atk_3;

			let dps = (multiplier * sum_atk / 100) / (tba / FRAME_PER_SECOND);
			return dps.toLocaleString();
		}
	});
});
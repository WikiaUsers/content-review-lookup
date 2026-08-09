/* Display the stats calculator part in template:Enemy Stats V2 Automatic */
mw.hook('wikipage.content').add(($content) => {
	$content[0].querySelectorAll('.cat_stats_v2_automatic').forEach(template => {
		const STATS_HP = 0;
		const STATS_ATK_1 = 3;
		const STATS_ATK_2 = 59;
		const STATS_ATK_3 = 60;

		let tba = Number(template.dataset.tba);
		let raw_multiplier = String(template.dataset.growth).split(",");
		let raw_stats = String(template.dataset.raw).split(",");

		let interactive_table = template.querySelector('.cat_stats_v2_interactive_table');
		if (interactive_table == null)
			return;
		interactive_table.style.display = "";

		let interactive_area = template.querySelector('.cat_stats_v2_interactive');
		if (interactive_area == null)
			return;

		// also allow copying the level multiplier
		let html = "<table style='width: 100%;'>" +
		"<tr><th class='bg-light1' style='text-align:center' colspan=2>Ultilities</th></tr>" +
		"<tr><td class='bg-light4'><b>Copy to Clipboard</b></td>" +
		"<td class='bg-light2'><button class='cat_stats_clipboard'>Base stats (csv)</button></td></tr>" +

		"<tr><th class='bg-light1' style='text-align:center' colspan=2>Stats Calculator</th></tr>" +
		"<tr><td class='bg-light4'><b>EoC Treasures</b></td>" + 
		"<td class='bg-light2'><input type='number' style='width:200px' class='cat_stats_eoc_treasure' min='0' max='300' value='300' /> % (MAX: 300)</td></tr>" +
		"<tr><td class='bg-light4'><b>Level</b></td>" + 
		"<td class='bg-light2'><input type='number' style='width:200px' class='cat_stats_level' min='1' max='200' value='30' /> (MAX: 200)</td></tr>" +
		"<tr><td></td>" +
		"<td><button class='cat_stats_submit'>Calculate</button> <button class='cat_stats_clear'>Clear</button></td></tr>" +
		"<table>" + 
		"<div class='cat_stats_result'></div>";

		interactive_area.innerHTML = html;

		const eoc_treasure_input = interactive_area.querySelector('.cat_stats_eoc_treasure');
		const level_input = interactive_area.querySelector('.cat_stats_level');

		const copy_to_clipboard_button = interactive_area.querySelector('.cat_stats_clipboard');
		const submit_button = interactive_area.querySelector('.cat_stats_submit');
		const clear_button = interactive_area.querySelector('.cat_stats_clear');

		const result_html = interactive_area.querySelector('.cat_stats_result');

		// Button events
		// clear button
		clear_button.addEventListener("click", () => {
			result_html.innerHTML = "";
		});
		// submit button
		submit_button.addEventListener("click", () => {
            let eoc_treasure_multiplier = 0.5 * (parseInt(eoc_treasure_input.value) / 100);
            let level = parseInt(level_input.value);

			let base_hp = Number(raw_stats[STATS_HP]);
			let base_atk_1 = Number(raw_stats[STATS_ATK_1]);
			let base_atk_2 = raw_stats.length > STATS_ATK_2 ? Number(raw_stats[STATS_ATK_2]) : 0;
			let base_atk_3 = raw_stats.length > STATS_ATK_3 ? Number(raw_stats[STATS_ATK_3]) : 0;

            let multiplier = 1.0 + eoc_treasure_multiplier;

			let calculated_hp = Math.floor(calculate_stat(base_hp, level, multiplier));
			let calculated_atk_1 = Math.floor(calculate_stat(base_atk_1, level, multiplier));
			let calculated_atk_2 = Math.floor(calculate_stat(base_atk_2, level, multiplier));
			let calculated_atk_3 = Math.floor(calculate_stat(base_atk_3, level, multiplier));

			result_html.innerHTML = "<table style='width:100%'>" +
			"<tr><th style='width:20%' class='bg-light4'>HP</th><td class='bg-light2'>" + calculated_hp.toLocaleString() + "</td></tr>" +
			"<tr><th style='width:20%' class='bg-light4'>ATK</th><td class='bg-light2'>" + build_result_atk(calculated_atk_1, calculated_atk_2, calculated_atk_3) + "</td></tr>" +
			"<tr><th style='width:20%' class='bg-light4'>DPS</th><td class='bg-light2'>" + build_result_dps(calculated_atk_1 + calculated_atk_2 + calculated_atk_3) + "</td></tr>" +
			"</table";
        });
        // copy raw stats to csv button
        copy_to_clipboard_button.addEventListener("click", () => {
			navigator.clipboard.writeText(template.dataset.raw_stats)
				.then(function() {
					console.log("Copied to clipboard.");
				})
		        .catch(function(err) {
			        console.log("Copy to clipboard failed: " + err);
		        });
        });

		// utility function
		function calculate_stat(base_stat, level, multiplier) {
			let cumulator = 0;
			for (let i = 1; i < level; i++) {
				cumulator += base_stat * Number(raw_multiplier[Math.floor(i / 10)]) / 100;
			}
			return (base_stat + cumulator) * multiplier;
		}
		function build_result_atk(atk_1, atk_2, atk_3) {
			if (atk_2 == 0) {
				return atk_1.toLocaleString();
			} else
			if (atk_3 == 0) {
				return atk_1.toLocaleString() + " + " + atk_2.toLocaleString() + " = " + (atk_1 + atk_2).toLocaleString();
			}
			return atk_1.toLocaleString() + " + " + atk_2.toLocaleString() + " + " + atk_3.toLocaleString() + " = " + (atk_1 + atk_2 + atk_3).toLocaleString();
		}
		function build_result_dps(atk) {
			let dps = atk / (tba / 30);
			return dps.toLocaleString();
		}
	});
});
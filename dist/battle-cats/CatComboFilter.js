/* Filter Cat Combos by various criteria */

mw.loader.using('mediawiki.api').then(function () {
	if (mw.config.get('wgPageName') == 'Cat_Combo') {
		handleComboFilter();
	}
});

function handleComboFilter() {
	// tool customization
	const MINIMUM_DISPLAY_LIMIT = 30;
	const CAT_RELEASE_ORDER_PAGENAME = "Cat_Release_Order";
	const SELECT_MULTIPLE_TOOLTIP_MSG = "On PC, hold Ctrl, Command or Shift keys to select multiple options";
	const INCLUDE_LEGACY_TOOLTIP_MSG = "Also include legacy combos prior to version 4.7";
	const DISPLAY_LIMIT_TOOLTIP_MSG = `Leave this field empty to display all (Min: ` + MINIMUM_DISPLAY_LIMIT.toString() + `)`;

	function input_tooltip_html(message) {
		return `<sup><span style="text-decoration-line: underline; text-decoration-style: dotted" title="` + message + `">[?]</span></sup>`;
	}

	$("#search_form").append(`<h2>Combo Filter</h2>
<table style="border: 1px #000000">
	<tr style="text-align: right">
		<td style="text-align: left"><b>Slot</b></td>
		<td>1-slot<input type="checkbox" value="1" class="slot_amount" checked></td>
		<td>2-slot<input type="checkbox" value="2" class="slot_amount" checked></td>
		<td>3-slot<input type="checkbox" value="3" class="slot_amount" checked></td>
		<td>4-slot<input type="checkbox" value="4" class="slot_amount" checked></td>
		<td>5-slot<input type="checkbox" value="5" class="slot_amount" checked></td>
	</tr>
	<tr style="text-align: right">
		<td style="text-align: left"><b>Strength</b></td>
		<td>Sm<input type="checkbox" value="0" class="effect_power" checked></td>
		<td>M<input type="checkbox" value="1" class="effect_power" checked></td>
		<td>L<input type="checkbox" value="2" class="effect_power" checked></td>
		<td>XL<input type="checkbox" value="3" class="effect_power" checked></td>
		<!-- <td>DOWN<input type="checkbox" value="4" class="effect_power" checked></td> -->
	</tr>
	<tr>
		<td><b>Effect</b></td>
		<td colspan=5><select id="effect_types" multiple></select> ` + input_tooltip_html(SELECT_MULTIPLE_TOOLTIP_MSG) + `</td>
	</tr>
	<tr>
		<td><b>Unlock</b></td>
		<td colspan=5><select id="unlock_conditions" multiple></select> ` + input_tooltip_html(SELECT_MULTIPLE_TOOLTIP_MSG) + `</td>
	</tr>
	<tr>
		<td><b><span style="text-decoration-line: underline; text-decoration-style: dotted" title="` + INCLUDE_LEGACY_TOOLTIP_MSG + `">Incl. pre-v4.7</span></b></td>
		<td colspan=5><input type="checkbox" id="include_legacy"></td>
	</tr>
	<tr>
		<td><b><a href='/` + CAT_RELEASE_ORDER_PAGENAME + `'>CRO</a></b></td>
		<td>#1 <input type="number" class="cat_search" min="0" style="width: 50px"></td>
		<td>#2 <input type="number" class="cat_search" min="0" style="width: 50px"></td>
		<td>#3 <input type="number" class="cat_search" min="0" style="width: 50px"></td>
		<td>#4 <input type="number" class="cat_search" min="0" style="width: 50px"></td>
		<td>#5 <input type="number" class="cat_search" min="0" style="width: 50px"></td>
	</tr>
	<tr>
		<td><b>Display Limit</b></td>
		<td colspan=5><input type="number" style="width:50px" id="search_limit" min="` + MINIMUM_DISPLAY_LIMIT.toString() + `" value=""> ` + input_tooltip_html(DISPLAY_LIMIT_TOOLTIP_MSG) +`</td>
	</tr>
	<tr>
		<td></td>
		<td><button id="btnFilter">Filter</button></td>
		<td><button id="btnReset">Reset</button></td>
	</tr>
</table>`);
	// constants
	const UNLOCK_CONDITION = 1;
	const LEGACY_COMBO_FLAG = "-1";
	const SLOT_OFFSET = 2;
	const EMPTY_SLOT = "-1";
	const COMBO_EFFECT = 12;
	const COMBO_STRENGTH = 13;

	const FORM_CHAR_MAP = {
		"0": "f",
		"1": "c",
		"2": "s",
		"3": "u",
	};

	const COMBO_STRENGTH_MAP = {
		"0": "Sm",
		"1": "M",
		"2": "L",
		"3": "XL",
		"4": "DOWN",
	};

	const UNLOCK_CONDITION_MAP = {
		"-1": "Legacy combo",
		"1": "Post-EoC-1",
		"4": "Post-ItF-1",
		"5": "Post-ItF-2",
		"6": "Post-ItF-3",
		"10001": "User Rank 1450",
		"10002": "User Rank 2150",
		"10003": "User Rank 2700",
	};

	const EFFECT_DETAIL = {
		"0":  "Unit attack power increased by X%",
		"1":  "Unit HP increased by X%",
		"2":  "Unit speed increased by X%",
		"3":  "Cat Cannon starts at X% charge",
		"4":  "Adds X level(s) to Worker Cat at battle start",
		"5":  "Starts the battle with X cash",
		"6":  "Cat Cannon attack power increased by X%",
		"7":  "Cat Cannon recharge time (variable value) reduced by X%",
		"8":  "Worker Cat speed increased by X%",
		"9":  "Wallet size increased by X%",
		"10": "Cat Base s HP increased by X%",
		"11": "At max level & treasure, Unit recharging time (min: 60f) reduced by 264*X/100f",
		"12": "Money gained from defeating enemies increased by X%",
		"13": "XP gained from victory battle increased by X%",
		"14": "Strong effect increased by X%",
		"15": "Massive Damage effect increased by X%",
		"16": "Resistance effect increased by X%",
		"17": "Knockback distance increased by X%",
		"18": "Slow duration increased by X%",
		"19": "Freeze duration increased by X%",
		"20": "Weaken duration increased by X%",
		"21": "Strengthen damage boost increased by X%",
		"22": "Witch Killer effect increased by X%",
		"23": "Eva Angel Killer effect increased by X%",
		"24": "Adds X% to Critical hit rate",
	};
	// data source
	let combo_data = null;
	let combo_effect = null;
	let combo_name = null;
	let cat_link = null;

	const PARAMS_COMBO_DATA = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_combo_data.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_COMBO_EFFECTS = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_combo_effects.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_COMBO_NAMES = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_combo_names.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const PARAMS_CRO_TO_WIKILINK = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_id_to_wikilink.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};

	// JSON parsing
	api = new mw.Api();
    api.get(PARAMS_COMBO_DATA).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        combo_data = JSON.parse(content);
    });
    api.get(PARAMS_COMBO_EFFECTS).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        combo_effect = JSON.parse(content);
        // populate dropdown
		for (const [key, value] of Object.entries(combo_effect)) {
			$("#effect_types").append("<option value='" + key + "'>" + value[0] + "</option>");
		}
    });
    api.get(PARAMS_COMBO_NAMES).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        combo_name = JSON.parse(content);
    });
    api.get(PARAMS_CRO_TO_WIKILINK).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        cat_link = JSON.parse(content);
    });
    
    // populate unlock_conditions dropdown
    for (const [key, value] of Object.entries(UNLOCK_CONDITION_MAP)) {
		if (key != LEGACY_COMBO_FLAG)
			$("#unlock_conditions").append("<option value='" + key + "' selected>" + value + "</option>");
	}

	$("#btnReset").on("click", function() {
		$("#result").html("");

		$("input[type=checkbox].slot_amount").prop("checked", true);
		$("input[type=checkbox].effect_power").prop("checked", true);
		$("#include_legacy").prop("checked", false);
		$("#effect_types option").prop('selected', false);
		$("#unlock_conditions option").prop('selected', 'selected');
		$("input[type=number].cat_search").val("");
		$("#search_limit").val("");
	});

	$("#btnFilter").on("click", function() {
		// retrieve input
		// number of slots
		let slot_amount = [];
		$('input:checkbox.slot_amount').each(function () {
			if (this.checked)
				slot_amount.push(parseInt($(this).val()));
		});
		// strength of effect
		let effect_power = [];
		$('input:checkbox.effect_power').each(function () {
			if (this.checked)
				effect_power.push($(this).val());
		});
		// which effect
		let effect_types = [];
		$('#effect_types option:selected').each(function () {
			effect_types.push($(this).val());
		});
		// which cat (optional)
		let cats = [];
		$('input.cat_search').each(function () {
			if ($(this).val() != "")
				cats.push($(this).val());
		});
		// which condition
		let selected_conditions = [];
		$('#unlock_conditions option:selected').each(function () {
			selected_conditions.push($(this).val());
		});
		// include legacy combos?
		if ($("#include_legacy").is(":checked"))
			selected_conditions.push(LEGACY_COMBO_FLAG);
		// get display limit
		let limit = parseInt($("#search_limit").val());
		if (!isNaN(limit))
			limit = limit < MINIMUM_DISPLAY_LIMIT ? MINIMUM_DISPLAY_LIMIT : limit;

		let input = {
			slot_amount: slot_amount,
			effect_power: effect_power,
			effect_types: effect_types,
			selected_conditions: selected_conditions,
			cats: cats,
			limit: limit
		};
		// validate input
		let error_msg = validate(input);
		if (error_msg != "") {
			$("#result").html(error_msg);
			return;
		}
		// filter
		filter(input);
	});

	// utilities
	function validate(input) {
		if (input.slot_amount.length == 0)
			return "<p>Please select the prefered number of slots</p>";
		if (input.effect_power.length == 0) 
			return "<p>Please select the prefered strength of the combo</p>";
		if (input.effect_types.length == 0)
			return "<p>Please select at least one combo effect</p>";
		if (input.selected_conditions.length == 0) {
			$("#result").html("<p>Please select at least one unlock condition or include legacy combos</p>");
			return;
		}
		return "";
	}
	function filter(input) {
		$("#result").html("");
		// actually filter
		let result = [];
		for (const [key, value] of Object.entries(combo_data)) {
			// is the unlock condition prefered?
			// if is_include_legacy is checked. also include combos before v4.7
			if (input.selected_conditions.indexOf(value[UNLOCK_CONDITION]) < 0)
				continue;
			// what Cats made up this combo
			let this_combo_cats = [];
			for (let i = 1; i < 6; i++) {
				if (value[SLOT_OFFSET*i] == EMPTY_SLOT)
					break;
				this_combo_cats.push(value[SLOT_OFFSET*i]);
			}
			// is the number of slot prefered?
			if (input.slot_amount.indexOf(this_combo_cats.length) < 0)
				continue;
			// is the combo strength prefered?
			if (input.effect_power.indexOf(value[COMBO_STRENGTH]) < 0)
				continue;
			// is the effect type prefered?
			if (input.effect_types.indexOf(value[COMBO_EFFECT]) < 0)
				continue;
			// are all selected Cats included in this combo?
			if (input.cats.length > 0) {
				let isQualified = input.cats.every(function(val) {
					return this_combo_cats.indexOf(val) >= 0;
				});
				if (!isQualified)
					continue;
			}
			result.push(key);
		}
		// tally
		$("#result").append("<p>Found " + result.length + " combo(s).</p>");
		let total_rows = result.length;
		// return if there is no matching combo to display
		if (total_rows == 0)
			return;
		// pagination
		if (!isNaN(input.limit) && total_rows > input.limit) {
			// calculate display range
			let max_pages = total_rows / input.limit;
			max_pages = total_rows % input.limit != 0 ? max_pages + 1 : max_pages;
			// dropdown
			$("#result").append("<p>Display page: <select id='pagination'></select></p>");
			// append valid pages
			for (let i = 1; i <= max_pages; i++) {
				$("#pagination").append(`<option value=` + i + `>` + i + `</option>`);
			}
			// dropdown change event
			$("#result").on("change", "#pagination", function() {
				$("#table_area").html("");
				// calculate new index range
				let selected_page = parseInt($("#pagination option:selected").val());
				let begin_index = (selected_page - 1) * input.limit;
				let end_index = begin_index + input.limit > total_rows ? total_rows : begin_index + input.limit;
				// display selected page
				display_combo(result, begin_index, end_index);
			});
		}
		$("#result").append("<div id='table_area'></div>");
		// display all or the first page
		if (isNaN(input.limit)) {
			display_combo(result, 0, total_rows);
		} else {
			display_combo(result, 0, input.limit > total_rows ? total_rows : input.limit);
		}
	}
	// display combos in a specific range
	function display_combo(result, begin_index, end_index) {
		// decorate the resulting table
		$("#table_area").append(`
<table id="filter_result" style='border: 1px solid black;'>
	<thead style='background-color:#00000050'>
	<tr>
		<th>ID</th>
		<th>Name (EN/JP)</th>
		<th>Unlock</th>
		<th>Effect</th>
		<th>Pwr</th>
		<th>Icons & CROs</th>
	</tr>
	</thead>
	<tbody>
	</tbody>
</table>`);
		// fill matching combos
		for (let i = begin_index; i < end_index; i++) {
			$("#filter_result tbody").append("<tr>" +
				"<td>" + combo_data[result[i]][0] + "</td>" +
				"<td>" + build_combo_link(combo_name[result[i]][1], combo_data[result[i]][UNLOCK_CONDITION]) + "<br />" + combo_name[result[i]][0] + "</td>" +
				"<td>" + UNLOCK_CONDITION_MAP[combo_data[result[i]][UNLOCK_CONDITION]] + "</td>" +
				"<td>" + display_effect(combo_data[result[i]][COMBO_EFFECT]) + "</td>" +
				"<td>" + display_strength(combo_data[result[i]][COMBO_EFFECT], combo_data[result[i]][COMBO_STRENGTH]) + "</td>" +
				"<td>" + display_icons(combo_data[result[i]]) + "<br />" + display_cats(combo_data[result[i]]) + "</td></tr>"
			);
		}
		// decorate the rows in the resulting table
		$("#filter_result tr:even").css({"background": "#00000020"});
		$("#filter_result tr td").css({"padding-right": "15px"});
	}
	// display the detailed value of the combo strength
	function display_strength(effect, strength) {
		return "<span title='" + combo_effect[effect][parseInt(strength)+1] + "'>" + COMBO_STRENGTH_MAP[strength] + "</span>";
	}
	// display the detail of the combo effect
	function display_effect(effect) {
		if (!EFFECT_DETAIL.hasOwnProperty(effect))
			return combo_effect[effect][0];
		return "<span title='" + EFFECT_DETAIL[effect] + "'>" + combo_effect[effect][0] + "</span>";
	}
	// display a list of Cat CROs
	function display_cats(combo) {
		let this_combo_cats = [];
		for (let i = 1; i < 6; i++) {
			if (combo[SLOT_OFFSET*i] == EMPTY_SLOT)
				break;
			this_combo_cats.push(combo[SLOT_OFFSET*i] + "-" + (parseInt(combo[SLOT_OFFSET*i+1])+1));
		}
		return this_combo_cats.join("; ");
	}
	// display Cat icons
	function display_icons(combo) {
		let this_combo_cats = [];
		for (let i = 1; i < 6; i++) {
			if (combo[SLOT_OFFSET*i] == EMPTY_SLOT)
				break;
			this_combo_cats.push("<a href='" + cat_link[combo[SLOT_OFFSET*i]] + "'><img style='width:64px' src='/Special:Redirect/file/Uni" + padding(combo[SLOT_OFFSET*i]) + "_" + FORM_CHAR_MAP[combo[SLOT_OFFSET*i+1]] +"00.png' /></a>");
		}
		return this_combo_cats.join("");
	}
	// contruct valid cro for the image filename
	function padding(num) {
		let str = num.toString();
		while (str.length < 3) {
			str = "0" + str;
		}
		return str;
	}
	// add wiki link to combo
	function build_combo_link(combo_name, unlock_condition) {
		let postfix = unlock_condition != LEGACY_COMBO_FLAG ? " (Combo)" : " (Removed Combo)";
		if (combo_name.length == 0)
			return "<i>name not found</i>";
		return "<a href='" + combo_name + postfix + "'>" + combo_name + "</a>";
	}
}
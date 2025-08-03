/* Filter Cat evolutions from specific required material */

mw.loader.using('mediawiki.api').then(function () {
	switch (mw.config.get('wgPageName')) {
		case 'Catfruit':
			handleCatfruitFilter();
			break;
	}
});

function handleCatfruitFilter() {
	// data source
	const params_catfruit_tf = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/catfruit tf data.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const params_catfruit_uf = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/catfruit_uf_data.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const params_catfruit_tf_text = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/catfruit_tf_text.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const params_catfruit_uf_text = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/catfruit_uf_text.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	const params_cro_to_wikilink = {
		action: 'query',
		format: 'json',
		formatversion: '2',
	    prop: 'revisions',
	    titles: 'MediaWiki:Custom-DataSource/cat_id_to_wikilink.json',
	    rvprop: 'content',
	    rvslots: 'main'
	};
	// constants: messages
	const MSG_SEARCH_BY_CRO_EXPLANATION = "Input space-separated values e.g. \"75 106 188 619\"";
	const MSG_CLICK_FOR_DETAILS = "Click on an icon for details";
	const ERR_INVALID_DISTINCT_MATS_NUMBER = "Please input a valid number of distinct materials between 1 and 5";
	const ERR_INVALID_DISTINCT_MATS_RANGE = "Please input a valid range of distinct materials";
	const ERR_NO_EVOLUTION_TYPE_SELECTED = "Please select at least one evolution type";
	const PANIC_DESC_NOT_FOUND = "INFO: evolution text is either missing, or this evolution is not yet available in BCEN";
	// constants: common
	const CAT_RELEASE_ORDER_PAGENAME = "Cat_Release_Order";
	const CRO_INPUT_SEPARATOR = " ";
	const MAXIMUM_MATS = 5;
	const MINIMUM_DISPLAY_LIMIT = 30;
	const TF_BACKGROUND = "#ffff0025";
	const UF_BACKGROUND = "#ff000025";
	// constants: item ID
	const PURPLE_SEED = "30";
	const RED_SEED = "31";
	const BLUE_SEED = "32";
	const GREEN_SEED = "33";
	const YELLOW_SEED = "34";

	const PURPLE_FRUIT = "35";
	const RED_FRUIT = "36";
	const BLUE_FRUIT = "37";
	const GREEN_FRUIT = "38";
	const YELLOW_FRUIT = "39";

	const EPIC_FRUIT = "40";
	const ELDER_SEED = "41";
	const ELDER_FRUIT = "42";
	const EPIC_SEED = "43";
	const GOLD_FRUIT = "44";

	const AKU_SEED = "160";
	const AKU_FRUIT = "161";
	const GOLD_SEED = "164";

	const PURPLE_STONE = "167";
	const RED_STONE = "168";
	const BLUE_STONE = "169";
	const GREEN_STONE = "170";
	const YELLOW_STONE = "171";

	const PURPLE_GEM = "179";
	const RED_GEM = "180";
	const BLUE_GEM = "181";
	const GREEN_GEM = "182";
	const YELLOW_GEM = "183";
	const EPIC_STONE = "184";
	// map item ID to item name/wikipage
	const item_name_mapper = {
		[PURPLE_SEED]: "Purple Seed",
		[RED_SEED]: "Red Seed",
		[BLUE_SEED]: "Blue Seed",
		[GREEN_SEED]: "Green Seed",
		[YELLOW_SEED]: "Yellow Seed",

		[PURPLE_FRUIT]: "Purple Catfruit",
		[RED_FRUIT]: "Red Catfruit",
		[BLUE_FRUIT]: "Blue Catfruit",
		[GREEN_FRUIT]: "Green Catfruit",
		[YELLOW_FRUIT]: "Yellow Catfruit",
	
		[EPIC_FRUIT]: "Epic Catfruit",
		[ELDER_SEED]: "Elder Seed",
		[ELDER_FRUIT]: "Elder Catfruit",
		[EPIC_SEED]: "Epic Seed",
		[GOLD_FRUIT]: "Gold Catfruit",
	
		[AKU_SEED]: "Aku Seed",
		[AKU_FRUIT]: "Aku Catfruit",
		[GOLD_SEED]: "Gold Seed",
	
		[PURPLE_STONE]: "Purple B. Stone",
		[RED_STONE]: "Red B. Stone",
		[BLUE_STONE]: "Blue B. Stone",
		[GREEN_STONE]: "Green B. Stone",
		[YELLOW_STONE]: "Yellow B. Stone",
	
		[PURPLE_GEM]: "Purple B. Gem",
		[RED_GEM]: "Red B. Gem",
		[BLUE_GEM]: "Blue B. Gem",
		[GREEN_GEM]: "Green B. Gem",
		[YELLOW_GEM]: "Yellow B. Gem",
		[EPIC_STONE]: "Epic B. Stone",
	};
	// stored as strings for now
	// map item ID to wiki's image filename
	const image_mapper = {
		[PURPLE_SEED]: "Seed_purple.png",
	    [RED_SEED]: "Seed_red.png",
	    [BLUE_SEED]: "Seed_blue.png",
	    [GREEN_SEED]: "Seed_green.png",
	    [YELLOW_SEED]: "Seed_yellow.png",

		[PURPLE_FRUIT]: "Purple_actinidia.png",
	    [RED_FRUIT]: "Red_actinidia.png",
	    [BLUE_FRUIT]: "Blue_actinidia.png",
	    [GREEN_FRUIT]: "Green_actinidia.png",
	    [YELLOW_FRUIT]: "Yellow_actinidia.png",
	
	    [EPIC_FRUIT]: "Catfruit_icon.png",
	    [ELDER_SEED]: "Elder_CatFruit_Seed.png",
	    [ELDER_FRUIT]: "AncientFruit.png",
	    [EPIC_SEED]: "Epic_Catfruit_Seed.png",
	    [GOLD_FRUIT]: "GoldenFruit.png",
	
	    [AKU_SEED]: "Seed_aku.png",
	    [AKU_FRUIT]: "AkuFruit2.png",
	    [GOLD_SEED]: "GoldSeed.png",
	
	    [PURPLE_STONE]: "PurpleStone.png",
	    [RED_STONE]: "RedStone.png",
	    [BLUE_STONE]: "BlueStone.png",
	    [GREEN_STONE]: "GreenStone.png",
	    [YELLOW_STONE]: "YellowStone.png",
	
	    [PURPLE_GEM]: "PurpleGem.png",
	    [RED_GEM]: "RedGem.png",
	    [BLUE_GEM]: "BlueGem.png",
	    [GREEN_GEM]: "GreenGem.png",
	    [YELLOW_GEM]: "YellowGem.png",
	    [EPIC_STONE]: "RainbowStone.png",
	};
	// fetch data
	let data_tf = null;
	let data_uf = null;
	let data_text_tf = null;
	let data_text_uf = null;
	let data_link = null;

	api = new mw.Api();
    api.get(params_catfruit_tf).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        data_tf = JSON.parse(content);
    });
    api.get(params_catfruit_uf).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        data_uf = JSON.parse(content);
    });
    api.get(params_catfruit_tf_text).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        data_text_tf = JSON.parse(content);
    });
    api.get(params_catfruit_uf_text).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        data_text_uf = JSON.parse(content);
    });
    api.get(params_cro_to_wikilink).done(function (res) {
    	let content = res.query.pages[0].revisions[0].slots.main.content;
        data_link = JSON.parse(content);
    });
	// decorate input form
	decorateInput();
	// aggregate button
	$("#btnCalculate").on("click", function() {
		// empty out the result area
		$("#result").html("");
		$("#result_detail").html("");
		$("#result_detail").css({"border": "0px solid black"});
		// begin validating
		// get material input
		let selected = [];
		$('input:checkbox.sort_item').each(function () {
			if (this.checked)
				selected.push($(this).val());
		});
		// get distinct material input
		let distinct_min = parseInt($("#min_mats").val());
		let distinct_max = parseInt($("#max_mats").val());
		// invalid value
		if (isNaN(distinct_max) || distinct_max < 1 || distinct_max > MAXIMUM_MATS) {
			$("#result").html("<p>" + ERR_INVALID_DISTINCT_MATS_NUMBER + "</p>");
			return;
		}
		if (isNaN(distinct_min) || distinct_min < 1 || distinct_min > MAXIMUM_MATS) {
			$("#result").html("<p>" + ERR_INVALID_DISTINCT_MATS_NUMBER + "</p>");
			return;
		}
		// min > max
		if (distinct_min > distinct_max) {
			$("#result").html("<p>" + ERR_INVALID_DISTINCT_MATS_RANGE + "</p>");
			return;
		}
		// validate evolution type
		if (!$("#search_tf").is(":checked") && !$("#search_uf").is(":checked")) {
			$("#result").html("<p>" + ERR_NO_EVOLUTION_TYPE_SELECTED + "</p>");
			return;
		}
		// get display limit
		let limit = parseInt($("#search_limit").val());
		// get inputted CROs if exist
		let selected_cros_initial = $("#cros").val().trim().split(CRO_INPUT_SEPARATOR);
		let selected_cros = [];
		for (let i = 0; i < selected_cros_initial.length; i++) {
			if (selected_cros_initial[i].length == 0 || isNaN(parseInt(selected_cros_initial[i])))
				continue;
			selected_cros.push(selected_cros_initial[i]);
		}
		// finish validating, now filter
		// store TF and UF separatedly
		let result_tf = [];
		let result_uf = [];
		// OR mode
		if ($("#filter_or").is(":checked")) {
			if ($("#search_tf").is(":checked"))
				result_tf = filter_mode_or(data_tf, selected, distinct_min, distinct_max, selected_cros);
			if ($("#search_uf").is(":checked"))
				result_uf = filter_mode_or(data_uf, selected, distinct_min, distinct_max, selected_cros);
		}
		// AND mode
		else {
			if ($("#search_tf").is(":checked"))
				result_tf = filter_mode_and(data_tf, selected, distinct_min, distinct_max, selected_cros);
			if ($("#search_uf").is(":checked"))
				result_uf = filter_mode_and(data_uf, selected, distinct_min, distinct_max, selected_cros);
		}
		// finish filtering, now display the result
		// count the result
		$("#result").append(
			"<p>Found " + result_tf.length + " True Form(s) and " + result_uf.length + " Ultra Form(s)</p>"
		);
		// if there is no Cat sastified the inputs, return
		let total_rows = result_tf.length + result_uf.length;
		if (total_rows == 0)
			return;
		// display the detail area if there is at least 1 Cat to click
		$("#result_detail").html("<p>" + MSG_CLICK_FOR_DETAILS + "</p>");
		$("#result_detail").css({"border": "1px solid black", "padding": "10px"});
		// do pagination if a display limit is set
		if (!isNaN(limit) && total_rows > limit) {
			// silently set the minimum display value
			limit = limit < MINIMUM_DISPLAY_LIMIT ? MINIMUM_DISPLAY_LIMIT : limit;
			// calculate display range
			let max_pages = total_rows / limit;
			max_pages = total_rows % limit != 0 ? max_pages + 1 : max_pages;
			// dropdown
			$("#result").append("<p>Display page: <select id='pagination'></select></p>");
			// append valid pages
			for (let i = 1; i <= max_pages; i++) {
				$("#pagination").append(`<option value=` + i + `>` + i + `</option>`);
			}
			// dropdown change event
			$("#result").on("change", "#pagination", function() {
				$("#icon_area").html("");
				// calculate new index range
				let selected_page = parseInt($("#pagination option:selected").val());
				let begin_index = (selected_page - 1) * limit;
				let end_index = begin_index + limit > total_rows ? total_rows : begin_index + limit;
				// display selected page
				displayIcons(result_tf, result_uf, begin_index, end_index);
			});
		}
		// area for displaying the icons
		$("#result").append("<div id='icon_area'></div>");
		// display icons
		if (isNaN(limit)) {
			displayIcons(result_tf, result_uf, 0, total_rows);
		} else {
			displayIcons(result_tf, result_uf, 0, limit > total_rows ? total_rows : limit);
		}
		// count material
		let sum_material = countSumMaterial(result_tf, result_uf);
		// display the total material needed
		$("#result").append("<br /><p>Total material:</p><div>" + displaySumMaterial(sum_material) + "</div>");
		// add event to display the detail of the evolution
		$("#result").on("click", "span.cat_image", function() {
			let cro = $(this).data("cro");
			buildTooltip(cro);
		});
	});
	// reset button
	$("#btnReset").on("click", function() {
		$("#result").html("");
		$("#result_detail").html("");
		$("#result_detail").css({"border": "0px solid black"});

		$("input[type=checkbox].sort_item").prop("checked", false);
		$("#search_tf").prop("checked", true);
		$("#search_uf").prop("checked", true);
		$("#filter_and").prop("checked", true);
		$("#min_mats").val("1");
		$("#max_mats").val("5");
		$("#search_limit").val("");
	});
	// utility functions
	// filter for OR mode
	function filter_mode_or(data, selected, distinct_min, distinct_max, selected_cros) {
		let result = [];
		for (const [key, value] of Object.entries(data)) {
			if (value[distinct_min*2-2] == '0')
				continue;
			if (distinct_max < MAXIMUM_MATS && value[distinct_max*2] != '0')
				continue;
			if (selected_cros.length > 0 && selected_cros.indexOf(key) < 0)
				continue;
			if (selected.length == 0) {
				result.push(key);
				continue;
			}
			for (let i = 0; i < MAXIMUM_MATS; i++) {
				if (selected.includes(value[i*2])) {
					result.push(key);
					break;
				}
			}
		}
		return result;
	}
	// filter for AND mode
	function filter_mode_and(data, selected, distinct_min, distinct_max, selected_cros) {
		let result = [];
		for (const [key, value] of Object.entries(data)) {
			// duplicate, maybe it can be truncated?
			if (value[distinct_min*2-2] == '0')
				continue;
			if (distinct_max < MAXIMUM_MATS && value[distinct_max*2] != '0')
				continue;
			if (selected_cros.length > 0 && selected_cros.indexOf(key) < 0)
				continue;
			if (selected.length == 0) {
				result.push(key);
				continue;
			}
			let isQualified = selected.every(function(val) {
				return value.indexOf(val) >= 0;
			});
			if (isQualified)
				result.push(key);
		}
		return result;
	}
	// build html for a Cat icon
	function buildResultIcon(cro, isTrueFormImage) {
		let imageType = isTrueFormImage ? "s" : "u";
		let color = isTrueFormImage ? TF_BACKGROUND : UF_BACKGROUND;
		return "<span class='cat_image' data-cro='" + cro + "' title='UF: CRO-" + cro + "'><img style='background: " + color + "' src='/Special:Redirect/file/Uni" + paddingZero(cro) + "_" + imageType + "00.png' /></span>";
	}
	// count the material required for all Cats in the search result
	function countSumMaterial(list_tf, list_uf) {
		let sum_material = {};
		// count TF
		for (let i = 0; i < list_tf.length; i++) {
			sum_material = countMaterial(sum_material, data_tf[list_tf[i]]);
		}
		// count UF
		for (let i = 0; i < list_uf.length; i++) {
			sum_material = countMaterial(sum_material, data_uf[list_uf[i]]);
		}
		return sum_material;
	}
	// count the material required for a Cat in the search result
	function countMaterial(sum, data) {
		for (let i = 0; i < MAXIMUM_MATS; i++) {
			if (data[i*2] == "0")
				break;
			if (!Object.hasOwn(sum, data[i*2]))
				sum[data[i*2]] = parseInt(data[i*2 + 1]);
			else
				sum[data[i*2]] += parseInt(data[i*2 + 1]);
		}
		return sum;
	}
	// display the material counted from countMaterial()
	function displaySumMaterial(sum) {
		let text = "";
		let count = 1;
		for (const [key, value] of Object.entries(sum)) {
			text += `<span title='` + item_name_mapper[key] + `'><img style='width: 50px; vertical-align: middle' src='/Special:Redirect/file/` + image_mapper[key] + `' /> = ` + value + `;</span>`;
			if (count % 10 == 0)
				text += "<br />";
			count++;
		}
		return text;
	}
	// display icons of specific range
	function displayIcons(list_tf, list_uf, begin_index, end_index) {
		let tf_length = list_tf.length;
		let uf_length = list_uf.length;

		for (let i = begin_index; i < end_index; i++) {
			if (i < tf_length) {
				$("#icon_area").append( buildResultIcon(list_tf[i], true) );
			} else if (i - tf_length < uf_length) {
				$("#icon_area").append( buildResultIcon(list_uf[i - tf_length], false) );
			} else
				break;
		}
	}
	// display the evolution detail of the selected Cat
	function buildTooltip(cro) {
		$("#result_detail").html("");
		// link to the Cat's page
		let wikilink = data_link.hasOwnProperty(cro) ? data_link[cro] : "#";
		// TF
		let text = buildTooltipDetail(wikilink, cro, data_text_tf, data_tf, true);
		// UF
		if (data_uf.hasOwnProperty(cro))
			text += buildTooltipDetail(wikilink, cro, data_text_uf, data_uf, false);
		$("#result_detail").append(text);
	}
	// build the evolution detail of a Cat
	function buildTooltipDetail(wikilink, cro, data_text, data_item, isTrueFormImage) {
		// image and CRO
		let imageType = isTrueFormImage ? "s" : "u";
		let formIndex = isTrueFormImage ? "3" : "4";
		let text = "<table><tr>" + 
			"<td><a href='/" + wikilink + "'><img style='vertical-align: middle' src='/Special:Redirect/file/Uni" + paddingZero(cro.toString()) + "_" + imageType + "00.png'></a><b>" + cro + "-" + formIndex + "</b></td>";
		// form description
		if (data_text.hasOwnProperty(cro))
			text += "<td><p style='margin-left:20px'>" + data_text[cro] + "</p></td>";
		else
			text += "<td><p style='color: red; margin-left:20px'>" + PANIC_DESC_NOT_FOUND + "</p></td>";
		text += "</tr></table>";
		// required material
		text += "<i>Required material(s):</i><table>";
		for (let i = 0; i < MAXIMUM_MATS; i++) {
			if (data_item[cro][i*2] == "0")
				break;
			text += "<td><span title='" + item_name_mapper[data_item[cro][i*2]] + "'><img style='width: 50px' src='/Special:Redirect/file/" + image_mapper[data_item[cro][i*2]] + "' />x" + data_item[cro][i*2 + 1] + "</span></td>";
		}
		text += "</table>";
		return text;
	}
	// add leading 0s to contruct valid file name
	function paddingZero(num) {
		while (num.length < 3) {
			num = "0" + num;
		}
		return num;
	}
	// input form html, very ugly I know
	function decorateInput() {
	$("#search_form").html(`
<h2>Catfruit Filter</h2>
<table>
	<tr style='text-align: right'>
		<td>` + item_name_mapper[PURPLE_SEED] + `<input type="checkbox" value="` + PURPLE_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[RED_SEED] + `<input type="checkbox" value="` + RED_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[BLUE_SEED] + `<input type="checkbox" value="` + BLUE_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[GREEN_SEED] + `<input type="checkbox" value="` + GREEN_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[YELLOW_SEED] + `<input type="checkbox" value="` + YELLOW_SEED + `" class="sort_item"></td>
	</tr>
	<tr style='text-align: right'>
		<td>` + item_name_mapper[PURPLE_FRUIT] + `<input type="checkbox" value="` + PURPLE_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[RED_FRUIT] + `<input type="checkbox" value="` + RED_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[BLUE_FRUIT] + `<input type="checkbox" value="` + BLUE_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[GREEN_FRUIT] + `<input type="checkbox" value="` + GREEN_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[YELLOW_FRUIT] + `<input type="checkbox" value="` + YELLOW_FRUIT + `" class="sort_item"></td>
	</tr>
	<tr style='text-align: right'>
		<td>` + item_name_mapper[EPIC_SEED] + `<input type="checkbox" value="` + EPIC_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[ELDER_SEED] + `<input type="checkbox" value="` + ELDER_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[AKU_SEED] + `<input type="checkbox" value="` + AKU_SEED + `" class="sort_item"></td>
		<td>` + item_name_mapper[GOLD_SEED] + `<input type="checkbox" value="` + GOLD_SEED + `" class="sort_item"></td>
	</tr>
	<tr style='text-align: right'>
		<td>` + item_name_mapper[EPIC_FRUIT] + `<input type="checkbox" value="` + EPIC_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[ELDER_FRUIT] + `<input type="checkbox" value="` + ELDER_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[AKU_FRUIT] + `<input type="checkbox" value="` + AKU_FRUIT + `" class="sort_item"></td>
		<td>` + item_name_mapper[GOLD_FRUIT] + `<input type="checkbox" value="` + GOLD_FRUIT + `" class="sort_item"></td>
	</tr>
	<tr style='text-align: right'>
		<td>` + item_name_mapper[PURPLE_STONE] + `<input type="checkbox" value="` + PURPLE_STONE + `" class="sort_item"></td>
		<td>` + item_name_mapper[RED_STONE] + `<input type="checkbox" value="` + RED_STONE + `" class="sort_item"></td>
		<td>` + item_name_mapper[BLUE_STONE] + `<input type="checkbox" value="` + BLUE_STONE + `" class="sort_item"></td>
		<td>` + item_name_mapper[GREEN_STONE] + `<input type="checkbox" value="` + GREEN_STONE + `" class="sort_item"></td>
		<td>` + item_name_mapper[YELLOW_STONE] + `<input type="checkbox" value="` + YELLOW_STONE + `" class="sort_item"></td>
		<td>` + item_name_mapper[EPIC_STONE] + `<input type="checkbox" value="` + EPIC_STONE + `" class="sort_item"></td>
	</tr>
	<tr style='text-align: right'>
		<td>` + item_name_mapper[PURPLE_GEM] + `<input type="checkbox" value="` + PURPLE_GEM + `" class="sort_item"></td>
		<td>` + item_name_mapper[RED_GEM] + `<input type="checkbox" value="` + RED_GEM + `" class="sort_item"></td>
		<td>` + item_name_mapper[BLUE_GEM] + `<input type="checkbox" value="` + BLUE_GEM + `" class="sort_item"></td>
		<td>` + item_name_mapper[GREEN_GEM] + `<input type="checkbox" value="` + GREEN_GEM + `" class="sort_item"></td>
		<td>` + item_name_mapper[YELLOW_GEM] + `<input type="checkbox" value="` + YELLOW_GEM + `" class="sort_item"></td>
	</tr>
	<tr style='text-align: right'>
		<td style="background-color:` + TF_BACKGROUND + `">True Form<input type="checkbox" id="search_tf" checked></td>
		<td style="background-color:` + UF_BACKGROUND + `">Ultra Form<input type="checkbox" id="search_uf" checked></td>
	</tr>
	<tr>
		<td colspan=6>Between <input type="number" id="min_mats" min="1" max="` + MAXIMUM_MATS.toString() + `" value="1"> and <input type="number" id="max_mats" min="1" max="` + MAXIMUM_MATS.toString() + `" value="5"> different material(s)</td>
	</tr>
	<tr style='text-align: right'>
		<td>OR<input type="radio" name="filter_mode" id="filter_or"></td>
		<td>AND<input type="radio" name="filter_mode" id="filter_and" checked></td>
	</tr>
	<tr>
		<td colspan=6>Specific <a href='/` + CAT_RELEASE_ORDER_PAGENAME + `'>CROs</a> <textarea rows="4" id="cros" placeholder='` + MSG_SEARCH_BY_CRO_EXPLANATION + `'></textarea></td>
	</tr>
	<tr>
		<td colspan=6>Display limit <input type="number" style="width:50px" id="search_limit" min="` + MINIMUM_DISPLAY_LIMIT.toString() + `" value=""> * leave this field empty to display all (Min: ` + MINIMUM_DISPLAY_LIMIT.toString() + `)</td>
	</tr>
	<tr style='text-align: right'>
		<td><button id="btnCalculate" type="button">Search</button></td>
		<td><button id="btnReset" type="button">Reset</button></td>
	</tr>
</table>`);
	}
}